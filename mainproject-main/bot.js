const { Client, Intents, Collection } = require('discord.js');
const { readdirSync, fs } = require('fs');
var mysql = require("mysql");

let bot = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

bot.settings = require("./botsettings.json");
bot.commands = new Collection();
bot.mql = mysql.createPool({
    host: bot.settings.mqlhost,
    user: bot.settings.mqlid,
    password: bot.settings.mqlpass,
    port: bot.settings.mqlport,
    database: bot.settings.mqlbase,
  });
const events = readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of events) {
    const event = require(`./events/${file}`);
    console.log(`-> Loaded event ${file.split('.')[0]}`);
    bot.on(file.split('.')[0], event.bind(null, bot));
    delete require.cache[require.resolve(`./events/${file}`)];
};
console.log(`-> Loading commands...`);
readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`${command.config.name.toLowerCase()} Loaded`);
        bot.commands.set(command.config.name.toLowerCase(), command);
        delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
    };
});
console.log('||| Loaded Commands ! |||')

if(bot.settings.token){
bot.login(bot.settings.token).catch(e => {
console.log("The Bot Token You Entered Into Your Project Is Incorrect Or Your Bot's INTENTS Are OFF!")
})
} else {
console.log("Please Write Your Bot Token Opposite The Token In The config.js File In Your Project!")
}
