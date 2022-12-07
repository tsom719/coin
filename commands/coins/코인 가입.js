const { Client, Intents, Collection } = require("discord.js");
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
var mysql = require("mysql");
const fs = require("fs");
require("moment-duration-format");
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
let hour = today.getHours(); //시간
let min = today.getMinutes(); //분
let sec = today.getSeconds(); //초

module.exports.run = async (bot, message, args) => {
  var userid = message.author.id;
  var walcheck =
    "SELECT * FROM user_account WHERE discord_id=" + mysql.escape(userid); //지갑 확인
  function callmql(err, rows, fields) {
    if (err) {
      throw err;
    } else if (!rows.length) {
      var sqlQuery = "INSERT INTO user_account (discord_id) VALUES (?)";
      function callback(err, rows, fields) {
        if (err) {
          throw err;
        }
      }
      var params = [userid];
      mql.query(sqlQuery, params, callback);
      message.channel.send(
        "> 등록되었습니다. 초기 지원금 1000만원이 지급되었습니다. `!지갑`으로 지갑을 여세요."
      );
      fs.appendFileSync(
        "coinreg_log.txt",
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
          "초   =>  코인시스탬 가입 디스코드아이디 : " +
          userid
      );
    } else {
      message.channel.send(
        "> 이미 등록되었거나 등록이 불가능합니다. 제작자에게 문의하세요"
      );
    }
  }
  mql.query(walcheck, callmql);
};

module.exports.config = {
  name: "투자가입",
  alias: "코인가입"
};
