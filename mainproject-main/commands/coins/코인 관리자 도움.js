const { Client, Intents, Collection } = require("discord.js");
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const embed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("도움말 - 코인 관리자")
    .addFields(
      {
        name: "!!밴 (유저 아이디)",
        value: "해당 유저를 차단합니다.",
        inline: false,
      },
      {
        name: "!!사면 (유저 아이디)",
        value: "해당 유저를 사면합니다.",
        inline: false,
      },
      {
        name: "!!조회 (유저 아이디)",
        value: "해당 유저의 지갑을 조회합니다.",
        inline: false,
      },
      {
        name: "!!지급 (유저 아이디) (금액)",
        value: "해당 유저에게 금액만픔 원화를 지급합니다.",
        inline: false,
      },
      {
        name: "!!회수 (유저 아이디) (금액)",
        value: "해당 유저에게 금액만큼 원화를 회수합니다.",
        inline: false,
      },
      {
        name: "!!유저삭제 (유저 아이디)",
        value: "해당 유저의 계정을 삭제합니다.",
        inline: false,
      }
    )
    .setFooter("Made By Seungjae Lee JaydenBot v.210522.001");
  //message.author.send({embeds: [embed]}); //dm 도움말
  message.channel.send({ embeds: [embed] });
};

module.exports.config = {
  name: "!코인",
};
