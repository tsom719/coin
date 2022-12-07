console.log("> Started Loading...");
const { Client, Intents, Collection } = require("discord.js");
const bot = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const settings = require("./botsettings.json");
const coinversion = require("./coins.json");
const { readdirSync } = require('fs');
bot.commands = new Collection();
bot.aliases = new Collection();

console.log("> Loading commands...");

readdirSync('./commands/').forEach(dirs => {
  const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
  for (const file of commands) {
      const command = require(`./commands/${dirs}/${file}`);
      console.log(`${command.name.toLowerCase()} Load Command!`);
      bot.commands.set(command.name.toLowerCase(), command);
      delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
  };
});

console.log("> Loaded commands");

bot.on("ready", () => {
  let statuses = [
    "!코인  | (Beta) JaydenBot By Seungjae Lee",
    "!help | JaydenBot By Seungjae Lee",
  ];
  setInterval(function () {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status);
  }, 5000);
  console.log("__________________________________________________");
  console.log("");
  console.log("");
  console.log(`TT Bot ${coinversion.appver} Ready to Do`);
  console.log("");
  console.log("__________________________________________________");
});
bot.on("messageCreate", (message) => {
  let prefix = settings.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (!message.content.startsWith(prefix)) return;
  let commandfile =
    bot.commands.get(cmd.slice(prefix.length)) ||
    bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
  if (commandfile) commandfile.run(bot, message, args);
});
bot.login(settings.token);
