const { Client, Intents, Collection } = require("discord.js");
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { MessageEmbed } = require("discord.js");
const coins = require("../../coins.json");
const fetch = require("node-fetch");
module.exports.run = async (bot, message, args) => {
  var text = message.content.split(" ").slice(1).join(" ");
  if (!text) return message.reply("> 코인 이름을 적어주세요");
  let coinsym = coins[text];

  fetch(`https://api.bithumb.com/public/ticker/${coinsym}/`)
    .then((response) => response.json())
    .then((data) => {
      if (
        coinsym == "BTC" ||
        coinsym == "ETH" ||
        coinsym == "DOGE" ||
        coinsym == "XRP" ||
        coinsym == "ETC" ||
        coinsym == "SAND" ||
        coinsym == "BTT" ||
        coinsym == "BNB"
      ) {
      } else return message.channel.send("> 거래 불가능한 코인입니다.");
      let nowprice = data.data.closing_price;
      let untr24 = data.data.units_traded_24H;
      let minprice = data.data.min_price;
      let maxprice = data.data.max_price;
      let closingp = data.data.prev_closing_price;
      let color;
      if ((nowprice - closingp) >> 0) {
        color = "ff0000";
      }
      if ((nowprice - closingp) << 0) {
        color = "0000ff";
      }
      if (nowprice - closingp == 0) {
        color = "#808080";
      }
      const embed = new MessageEmbed()
        .setColor(color)
        .setTitle("시세조회 - " + coinsym)
        .setURL("https://www.bithumb.com/trade/order/" + coinsym + "_KRW")
        .addFields(
          { name: "현재가", value: nowprice + "/won", inline: true },
          { name: "전일종가", value: closingp + "/won", inline: true },
          {
            name: "전일대비",
            value: nowprice - closingp + "/won",
            inline: true,
          },
          { name: "당일저가", value: minprice + "/won", inline: true },
          { name: "당일고가", value: maxprice + "/won", inline: true },
          { name: "거래량(24h)", value: untr24 + "/" + coinsym, inline: true }
        );
      //message.author.send({embeds: [embed]});
      message.channel.send({ embeds: [embed] });
    });
};

module.exports.config = {
  name: "시세",
  alias: "price",
};
