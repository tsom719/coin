const { Client, Intents, Collection } = require("discord.js");
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const embed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("도움말 - 투자")
    .setDescription(
      "투자시스탬은 빗썸과 네이버의 api를 활용하며, 실제와 5초내외의 차이가 있을 수 있습니다.\n오토트레이딩 사용시 제제할 수 있습니다."
    )
    .addFields(
      { name: "!투자가입", value: "코인시스탬에 가입합니다.", inline: false },
      {
        name: "!매수 (종목 이름) (금액)",
        value: "금액만큼 해당 종목을 매수합니다.",
        inline: false,
      },
      {
        name: "!매도 (종목 이름) (금액)",
        value: "금액만큼 해당 종목을 매도합니다.",
        inline: false,
      },
      {
        name: "!시세 (종목 이름)",
        value: "해당 종목의 시세를 조회합니다.",
        inline: false,
      },
      { name: "!투자계삭", value: "투자시스탬에서 탈퇴합니다.", inline: false }
    )
    .setFooter("Made By Seungjae Lee JaydenBot v.210522.001");
  //message.author.send({embeds: [embed]});
  message.channel.send({ embeds: [embed] });
};

module.exports.config = {
  name: "투자",
};
