const { Client, Intents, Collection } = require("discord.js");
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { MessageEmbed } = require("discord.js");
var mysql = require("mysql");
const settings = require("../../botsettings.json");
var mql = mysql.createPool({
  host: settings.mqlhost,
  user: settings.mqlid,
  password: settings.mqlpass,
  port: settings.mqlport,
  database: settings.mqlbase,
});
module.exports.run = async (bot, message, args) => {
  var walcheck =
    "SELECT * FROM user_account WHERE discord_id=" + message.author.id; //지갑 확인
  function callmql(err, rows, fields) {
    if (err) {
      throw err;
    } else if (!rows.length) {
      message.channel.send(
        "> 등록되지 않은 유저입니다. `!코인가입`으로 코인시스템에 가입하세요"
      );
    } else {
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].banned == 1)
          return message.channel.send("> 밴 처리된 유저입니다.");
        mql.query(walcheck, callmql);
        message.channel.send(
          "> 한번 삭제한 계정은 되돌릴 수 없습니다.\n> 계정을 삭제하시려면 본인의 디스코드아이디를 보내주세요."
        );
        const filter = (m) => m.author.id == message.author.id;
        message.channel
          .awaitMessages({ filter, max: 1, time: 15000, errors: ["time"] })
          .then((collected) => {
            if (collected.first().content == message.author.id) {
              var sqlQuery =
                "DELETE FROM user_account  WHERE discord_id = " +
                message.author.id +
                ";";
              function callback(err, rows, fields) {
                if (err) {
                  throw err;
                }
              }
              mql.query(sqlQuery, callback);

              message.channel.send("> 삭제가 완료되었습니다.");
            } else {
              message.channel.send(
                "> ID가 일치하지 않습니다. 삭제를 취소합니다."
              );
            }
          })
          .catch((collected) => {
            message.channel.send("> 시간이 초과되었습니다. 삭제를 취소합니다.");
          });
      }
    }
  }
  mql.query(walcheck, callmql);
};

module.exports.config = {
  name: "투자계삭",
};
