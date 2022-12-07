const { Client, Intents, Collection } = require("discord.js");
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { MessageEmbed } = require("discord.js");
const settings = require("../../botsettings.json");

module.exports.run = async (bot, message, args) => {
  if (!message.member.roles.cache.some((r) => r.name === settings.role)) {
    message.channel.send("> 관리자 전용 명령어 입니다.");
    console.log("Jayden Bot : Say > Insufficient Permission");
    return;
  }
  let text = message.content.split(" ").slice(1).join(" ");
  if (!text) return message.reply("> 보낼 말을 적어주세요");
  const embed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("공지 - Notice")
    .setDescription(text);
  message.channel.send({ embeds: [embed] });
  message.delete();
  console.log("Jadyen Bot : Say >> " + text);
};

module.exports.config = {
  name: "say",
};
