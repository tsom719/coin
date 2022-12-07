module.exports = async (bot) => {
  console.log("__________________________________________________");
  console.log("");
  console.log("");
  console.log(`${bot.user.tag}${bot.settings.version} Ready to Do`);
  console.log("");
  console.log("__________________________________________________");
    let statuses = [
        "!코인  | (Beta) JaydenBot By Seungjae Lee",
        "!help | JaydenBot By Seungjae Lee",
      ];
      setInterval(function () {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status);
      }, 5000);

};