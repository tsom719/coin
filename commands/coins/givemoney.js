const { Client, Intents, Collection } = require("discord.js");
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const settings = require("../../botsettings.json");
const { MessageEmbed } = require("discord.js");
var mysql = require("mysql");
var mql = mysql.createPool({
  host: "localhost",
  user: "coin",
  password: "a071907a",
  port: 3306,
  database: "coin",
});

module.exports.run = async (bot, message, args) => {
  if (message.author.id == settings.itsme) {
    var text = message.content.split(" ").slice(1).join(" ");
    var ids = text.indexOf(" ");
    var id = text.indexOf(" ", ids + 1);
    var target = text.substring(ids, id);
    var amountwon = Number(text.split(" ").slice(1).join(" "));
    var walcheck = "SELECT * FROM user_account WHERE user_id=" + target; //지갑 확인
    function callmql(err, rows, fields) {
      if (err) {
        throw err;
      } else if (!rows.length) {
        message.channel.send("> no such");
      }
      for (var i = 0; i < rows.length; i++) {
        var firstwon = Number(rows[i].have_won);

        var sqlQuery = "UPDATE user_account SET have_won='?' WHERE user_id=?";
        function callback(err, rows, fields) {
          if (err) {
            throw err;
          }
        }
        var params = [Number(firstwon + amountwon), target];
        mql.query(sqlQuery, params, callback);
      }
    }
    mql.query(walcheck, callmql);
    message.channel.send("> 완료 ID : JCS" + target);
  } else {
    message.channel.send("> 권한이 없습니다.");
  }
};

module.exports.config = {
  name: "!지급",
};
