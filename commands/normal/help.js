const { Client, Intents, Collection } = require("discord.js");
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const embed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("도움말 - Help")
    .setDescription("Made By Seungjae Lee JaydenBot v.211213.001")
    .addFields({
      name: "!코인",
      value: "코인 도움말을 출력합니다",
      inline: false,
    });
  //message.author.send({embeds: [embed]});
  message.channel.send({ embeds: [embed] });
};

module.exports.config = {
  name: "help",
};
