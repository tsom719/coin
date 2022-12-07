const { Client, Intents, Collection } = require("discord.js");
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const mysql = require("mysql");
const fs = require("fs");
const fetch = require("node-fetch");
require("moment-duration-format");
const { MessageEmbed } = require("discord.js");
const settings = require("../../botsettings.json");
const mql = mysql.createPool({
  host: settings.mqlhost,
  user: settings.mqlid,
  password: settings.mqlpass,
  port: settings.mqlport,
  database: settings.mqlbase,
});

const coins = require("../../coins.json");

let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); // 날짜
let day = today.getDay(); // 요일
let hour = today.getHours(); //시간
let min = today.getMinutes(); //분
let sec = today.getSeconds(); //초

module.exports.run = async (bot, message, args) => {
  let userid = message.author.id;
  let coin = message.content.split(" ").slice(1).join(" ");
  let ids = coin.indexOf(" ");
  let id = coin.indexOf(" ", ids + 1);
  let coinname = coin.substring(ids, id);
  let amountwon = coin.split(" ").slice(1).join(" ");

  let walcheck =
    "SELECT * FROM user_account WHERE discord_id=" + mysql.escape(userid); //지갑 확인
  function callmql(err, rows, fields) {
    if (err) {
      throw err;
    } else if (!rows.length) {
      message.channel.send(
        "> 등록되지 않은 유저입니다. `!코인가입`으로 코인시스템에 가입하세요"
      );
    } else {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].banned == 1)
          return message.channel.send("> 밴 처리된 유저입니다.");
        let coinsym = coins[coinname];
        let have_coin = 0;
        let userid = rows[i].user_id;
        let won = rows[i].have_won;
        let coin_all;
        let sqlsym;
        let corr = {
          NaN: "0",
          Infinity: "0",
        };

        if (coinsym == "BTC") {
          have_coin = rows[i].have_btc;
          coin_all = rows[i].btc_all;
          sqlsym = "btc";
        } else if (coinsym == "ETH") {
          have_coin = rows[i].have_eth;
          coin_all = rows[i].eth_all;

          sqlsym = "eth";
        } else if (coinsym == "DOGE") {
          have_coin = rows[i].have_doge;
          coin_all = rows[i].doge_all;
          sqlsym = "doge";
        } else if (coinsym == "XRP") {
          have_coin = rows[i].have_xrp;
          coin_all = rows[i].xrp_all;
          sqlsym = "xrp";
        } else if (coinsym == "ETC") {
          have_coin = rows[i].have_etc;
          coin_all = rows[i].etc_all;
          sqlsym = "etc";
        } else if (coinsym == "SAND") {
          have_coin = rows[i].have_sand;
          coin_all = rows[i].sand_all;
          sqlsym = "sand";
        } else if (coinsym == "BTT") {
          have_coin = rows[i].have_btt;
          coin_all = rows[i].btt_all;
          sqlsym = "btt";
        } else if (coinsym == "BNB") {
          have_coin = rows[i].have_bnb;
          coin_all = rows[i].bnb_all;
          sqlsym = "bnb";
        } else return message.channel.send("> 거래 불가능한 코인입니다.");

        fetch(`https://api.bithumb.com/public/ticker/${coinsym}/`)
          .then((response) => response.json())
          .then((data) => {
            let coin_now = data.data.closing_price; //현재가

            let cgs = Math.floor((amountwon / coin_now) * 1000000) / 1000000;

            let cgw = Math.floor(cgs * coin_now);

            let finalwon = won - cgw;

            let finalcoin = have_coin + cgs;

            let finalpg = coin_all + cgw;
            if (cgs >= 0.000001) {
            } else
              return message.channel.send(
                "> 0.000001코인부터 거래가 가능합니다."
              );

            if (won >= cgw) {
            } else return message.channel.send("> 원화가 부족합니다.");

            let sqlQuery =
              "UPDATE user_account SET have_won=?, have_" +
              sqlsym +
              "=? , " +
              sqlsym +
              "_all=? WHERE discord_id=?";
            function callback(err, rows, fields) {
              if (err) {
                throw err;
              }
            }
            let params = [finalwon, finalcoin, finalpg, message.author.id];
            mql.query(sqlQuery, params, callback);

            const embed = new MessageEmbed()
              .setColor("#ff0000")
              .setTitle("매수 체결 - " + coinsym)
              .addFields(
                {
                  name: "User ID",
                  value: "JCS" + userid.toString(),
                  inline: true,
                },
                { name: "잔여원화", value: won - cgw + " won", inline: true },
                {
                  name: "-------------------------------------------------------",
                  value: "```매수정보```",
                  inline: false,
                },
                {
                  name: "체결가격",
                  value: coin_now.toString() + " won",
                  inline: true,
                },
                {
                  name: "체결금액",
                  value: cgw.toString() + " won",
                  inline: true,
                },
                {
                  name: "체결수량",
                  value: cgs.toString() + "/" + coinsym,
                  inline: true,
                }
              )
              .setFooter(
                "JaydenBot COIN System | 매수, 매도시 편의상 원화의 1의자리수까지 버림되어 처리됩니다."
              );

            message.channel.send({ embeds: [embed] });
            fs.appendFileSync(
              "coinbs_log.txt",
              "\n" +
                year +
                "년 " +
                month +
                "월 " +
                date +
                "일 " +
                hour +
                "시 " +
                min +
                "분 " +
                sec +
                "초   =>  코인시스탬 매수 | 아이디 : JCS" +
                userid +
                " | 코인종류 : " +
                coinsym +
                " | 체결가격 : " +
                coin_now +
                "원 | 체결금액 : " +
                cgw +
                "원 | 체결수량 : " +
                cgs
            );
            console.log(
              year +
                "년 " +
                month +
                "월 " +
                date +
                "일 " +
                hour +
                "시 " +
                min +
                "분 " +
                sec +
                "초   =>  코인시스탬 매수 | 아이디 : JCS" +
                userid +
                " | 코인종류 : " +
                coinsym +
                " | 체결가격 : " +
                coin_now +
                "원 | 체결금액 : " +
                cgw +
                "원 | 체결수량 : " +
                cgs
            );
          });
      }
    }
  }
  mql.query(walcheck, callmql);
};

module.exports.config = {
  name: "매수",
};
