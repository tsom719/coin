module.exports = (bot, message) => {
    let prefix = bot.settings.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
  
    if (!message.content.startsWith(prefix)) return;
    let commandfile =
      bot.commands.get(cmd.slice(prefix.length)) ||
      bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    if (commandfile) commandfile.run(bot, message, args);
};