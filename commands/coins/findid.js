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
  if (message.author.id == settings.itsme) {
    var text = message.content.split(" ").slice(1).join(" ");
    var walcheck = "SELECT * FROM user_account WHERE discord_id=" + text; //지갑 확인
    function callmql(err, rows, fields) {
      if (err) {
        throw err;
      } else if (!rows.length) {
        message.channel.send("> no such");
      }
      for (var i = 0; i < rows.length; i++) {
        message.channel.send(
          "> 찾은 유저의 아이디는 `JCS" + rows[i].user_id + "` 입니다."
        );
      }
    }
    mql.query(walcheck, callmql);
  } else {
    message.channel.send("> 권한이 없습니다.");
  }
};

module.exports.config = {
  name: "!아이디",
};
