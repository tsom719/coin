const { Client, Intents, Collection } = require("discord.js");
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
module.exports.run = async (bot, message, args) => {
  message.channel.send("> 핑테스트중 ...").then((msg) => {
    msg.edit(
      "> Jayden Bot Ping: " + (Date.now() - msg.createdTimestamp) + "ms"
    );
    console.log(
      "Jayden Bot Ping: " + (Date.now() - msg.createdTimestamp) + "ms"
    );
  });
};
module.exports.config = {
  name: "ping",
};
