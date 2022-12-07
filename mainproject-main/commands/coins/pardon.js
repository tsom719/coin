const { Client, Intents, Collection } = require("discord.js");
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
var mysql = require("mysql");
const fs = require("fs");
const fetch = require("node-fetch");
require("moment-duration-format");
const { MessageEmbed } = require("discord.js");
const settings = require("../../botsettings.json");
var mql = mysql.createPool({
  host: settings.mqlhost,
  user: settings.mqlid,
  password: settings.mqlpass,
  port: settings.mqlport,
  database: settings.mqlbase,
});


let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); // 날짜
let day = today.getDay(); // 요일
let hour = today.getHours(); //시간
let min = today.getMinutes(); //분
let sec = today.getSeconds(); //초

module.exports.run = async (bot, message, args) => {
  if (message.author.id == settings.itsme) {
    var userid = message.author.id;
    var userid = message.content.split(" ").slice(1).join(" ");

    var walcheck = "SELECT * FROM user_account WHERE user_id=" + userid; //지갑 확인
    function callmql(err, rows, fields) {
      if (err) {
        throw err;
      } else if (!rows.length) {
        message.channel.send(
          "> 등록되지 않은 유저입니다. `!코인가입`으로 코인시스템에 가입하세요"
        );
      } else {
        for (var i = 0; i < rows.length; i++) {
          var sqlQuery = "UPDATE user_account SET banned=0 WHERE user_id=?";
          function callback(err, rows, fields) {
            if (err) {
              throw err;
            }
          }
          var params = [userid];
          mql.query(sqlQuery, params, callback);
          message.channel.send("> 사면처리가 완료되었습니다.");
          fs.appendFileSync(
            "coinadm_log.txt",
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
              "초   =>  코인시스탬 언밴 | 아이디 : JCS" +
              userid +
              " | 담당 관리자 : " +
              message.author.tag
          );
        }
      }
    }
    mql.query(walcheck, callmql);
  } else {
    message.channel.send("> 권한이 없습니다.");
  }
};

module.exports.config = {
  name: "!사면",
};
