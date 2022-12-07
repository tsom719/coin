const { Client, Intents, Collection } = require("discord.js");
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { MessageEmbed } = require("discord.js");
const fs = require("fs");
var mysql = require("mysql");
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
    var text = message.content.split(" ").slice(1).join(" ");
    if (!text) return message.reply("> 삭제할 유저의 아이디를 적어주세요");
    message.channel.send(
      "> 한번 삭제한 계정은 되돌릴 수 없습니다.\n> 계정을 삭제하시려면 본인의 디스코드아이디를 보내주세요."
    );
    const filter = (m) => m.author.id == message.author.id;
    message.channel
      .awaitMessages({ filter, max: 1, time: 15000, errors: ["time"] })
      .then((collected) => {
        if (collected.first().content == message.author.id) {
          var sqlQuery =
            "DELETE FROM user_account  WHERE user_id = " + text + ";";
          function callback(err, rows, fields) {
            if (err) {
              throw err;
            }
          }
          mql.query(sqlQuery, callback);
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
              "초   =>  코인 관리 | 계정삭제 | 삭제된 유저 : JCS" +
              text +
              " | 담당 관리자 : " +
              message.author.tag
          );

          message.channel.send("> 삭제가 완료되었습니다.");
        } else {
          message.channel.send("> ID가 일치하지 않습니다. 삭제를 취소합니다.");
        }
      })
      .catch((collected) => {
        message.channel.send("> 시간이 초과되었습니다. 삭제를 취소합니다.");
      });
  } else {
    message.channel.send("> 권한이 없습니다.");
  }
};

module.exports.config = {
  name: "!유저삭제",
};
