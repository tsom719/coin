const { Client, Intents, Collection } = require("discord.js");
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
var mysql = require("mysql");
const fs = require("fs");
const fetch = require("node-fetch");
require("moment-duration-format");
const { MessageEmbed } = require("discord.js");
const settings = require("../../botsettings.json");
var mql = mysql.createPool({
  host: settings.mqlhost,
  user: settings.mqlid,
  password: settings.mqlpass,
  port: settings.mqlport,
  database: settings.mqlbase,
});


module.exports.run = async (bot, message, args) => {
  var userid = message.author.id;
  var walcheck =
    "SELECT * FROM user_account WHERE discord_id=" + mysql.escape(userid); //지갑 확인
  function callmql(err, rows, fields) {
    if (err) {
      throw err;
    } else if (!rows.length) {
      message.channel.send(
        "> 등록되지 않은 유저입니다. `!코인가입`으로 코인시스템에 가입하세요"
      );
    } else {
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].banned == 1)
          return message.channel.send("> 밴 처리된 유저입니다.");

        let userid = rows[i].user_id;
        let won = rows[i].have_won;
        let corr = {
          NaN: "0",
          Infinity: "0",
        };
        let btc = rows[i].have_btc;
        let btc_all = rows[i].btc_all;
        let btc_now;

        let eth = rows[i].have_eth;
        let eth_all = rows[i].eth_all;
        let eth_now;

        let doge = rows[i].have_doge;
        let doge_all = rows[i].doge_all;
        let doge_now;

        let xrp = rows[i].have_xrp;
        let xrp_all = rows[i].xrp_all;
        let xrp_now;

        let etc = rows[i].have_etc;
        let etc_all = rows[i].etc_all;
        let etc_now;

        let sand = rows[i].have_sand;
        let sand_all = rows[i].sand_all;
        let sand_now;

        fetch(`https://api.bithumb.com/public/ticker/BTC/`)
          .then((response) => response.json())
          .then((data) => {
            btc_now = data.data.closing_price; //현재가
            fetch(`https://api.bithumb.com/public/ticker/ETH/`)
              .then((response) => response.json())
              .then((data) => {
                eth_now = data.data.closing_price; //현재가
                fetch(`https://api.bithumb.com/public/ticker/DOGE/`)
                  .then((response) => response.json())
                  .then((data) => {
                    doge_now = data.data.closing_price; //현재가
                    fetch(`https://api.bithumb.com/public/ticker/XRP/`)
                      .then((response) => response.json())
                      .then((data) => {
                        xrp_now = data.data.closing_price; //현재가
                        fetch(`https://api.bithumb.com/public/ticker/ETC/`)
                          .then((response) => response.json())
                          .then((data) => {
                            etc_now = data.data.closing_price; //현재가
                            fetch(`https://api.bithumb.com/public/ticker/SAND/`)
                              .then((response) => response.json())
                              .then((data) => {
                                sand_now = data.data.closing_price; //현재가
                                console.log(
                                  btc_now +
                                    "  " +
                                    eth_now +
                                    "  " +
                                    doge_now +
                                    "  " +
                                    xrp_now
                                );

                                let btc_nowhave = btc_now * btc;
                                let btc_pgs = Math.floor(btc_nowhave - btc_all);
                                let btc_pgspe =
                                  corr[(btc_nowhave / btc_all) * 100 - 100] ||
                                  Math.round(
                                    (btc_nowhave / btc_all) * 10000 - 10000
                                  ) / 100;
                                let btcwon = Math.floor(btc * btc_now);

                                let eth_nowhave = eth_now * eth;
                                let eth_pgs = Math.floor(eth_nowhave - eth_all);
                                let eth_pgspe =
                                  corr[(eth_nowhave / eth_all) * 100 - 100] ||
                                  Math.round(
                                    (eth_nowhave / eth_all) * 10000 - 10000
                                  ) / 100;
                                let ethwon = Math.floor(eth * eth_now);

                                let doge_nowhave = doge_now * doge;
                                let doge_pgs = Math.floor(
                                  doge_nowhave - doge_all
                                );
                                let doge_pgspe =
                                  corr[(doge_nowhave / doge_all) * 100 - 100] ||
                                  Math.round(
                                    (doge_nowhave / doge_all) * 10000 - 10000
                                  ) / 100;
                                let dogewon = Math.floor(doge * doge_now);

                                let xrp_nowhave = xrp_now * xrp;
                                let xrp_pgs = Math.floor(xrp_nowhave - xrp_all);
                                let xrp_pgspe =
                                  corr[(xrp_nowhave / xrp_all) * 100 - 100] ||
                                  Math.round(
                                    (xrp_nowhave / xrp_all) * 10000 - 10000
                                  ) / 100;
                                let xrpwon = Math.floor(xrp * xrp_now);

                                let etc_nowhave = etc_now * etc;
                                let etc_pgs = Math.floor(etc_nowhave - etc_all);
                                let etc_pgspe =
                                  corr[(etc_nowhave / etc_all) * 100 - 100] ||
                                  Math.round(
                                    (etc_nowhave / etc_all) * 10000 - 10000
                                  ) / 100;
                                let etcwon = Math.floor(etc * etc_now);

                                let sand_nowhave = sand_now * sand;
                                let sand_pgs = Math.floor(
                                  sand_nowhave - sand_all
                                );
                                let sand_pgspe =
                                  corr[(sand_nowhave / sand_all) * 100 - 100] ||
                                  Math.round(
                                    (sand_nowhave / sand_all) * 10000 - 10000
                                  ) / 100;
                                let sandwon = Math.floor(sand * sand_now);

                                const embed = new MessageEmbed()
                                  .setColor("#9678b6")
                                  .setTitle("지갑")
                                  //.setDescription('	'`원`')
                                  .addFields(
                                    {
                                      name: "User ID",
                                      value: "JCS" + userid.toString(),
                                      inline: true,
                                    },
                                    {
                                      name: "Discord ID",
                                      value: message.author.id,
                                      inline: true,
                                    },
                                    {
                                      name: "보유원화",
                                      value: won.toString() + "won",
                                      inline: true,
                                    },
                                    {
                                      name: "-------------------------------------------------------",
                                      value: "```코인 현황```",
                                      inline: false,
                                    },
                                    {
                                      name: "보유(BTC)",
                                      value: btc.toString() + "btc",
                                      inline: true,
                                    },
                                    {
                                      name: "보유(ETH)",
                                      value: eth.toString() + "eth",
                                      inline: true,
                                    },
                                    {
                                      name: "보유(DOGE)",
                                      value: doge.toString() + "doge",
                                      inline: true,
                                    },
                                    {
                                      name: "보유(won/BTC)",
                                      value: btcwon.toString() + "won",
                                      inline: true,
                                    },
                                    {
                                      name: "보유(won/ETH)",
                                      value: ethwon.toString() + "won",
                                      inline: true,
                                    },
                                    {
                                      name: "보유(won/DOGE)",
                                      value: dogewon.toString() + "won",
                                      inline: true,
                                    },
                                    {
                                      name: "평가손익(BTC)",
                                      value:
                                        btc_pgs.toString() +
                                        "won (" +
                                        btc_pgspe.toString() +
                                        "%)",
                                      inline: true,
                                    },
                                    {
                                      name: "평가손익(ETH)",
                                      value:
                                        eth_pgs.toString() +
                                        "won (" +
                                        eth_pgspe.toString() +
                                        "%)",
                                      inline: true,
                                    },
                                    {
                                      name: "평가손익(DOGE)",
                                      value:
                                        doge_pgs.toString() +
                                        "won (" +
                                        doge_pgspe.toString() +
                                        "%)",
                                      inline: true,
                                    },
                                    {
                                      name: "-------------------------------------------------------",
                                      value: "```---```",
                                      inline: false,
                                    },
                                    {
                                      name: "보유(XRP)",
                                      value: xrp.toString() + "xrp",
                                      inline: true,
                                    },
                                    {
                                      name: "보유(ETC)",
                                      value: etc.toString() + "etc",
                                      inline: true,
                                    },
                                    {
                                      name: "보유(SAND)",
                                      value: sand.toString() + "sand",
                                      inline: true,
                                    },
                                    {
                                      name: "보유(won/XRP)",
                                      value: xrpwon.toString() + "won",
                                      inline: true,
                                    },
                                    {
                                      name: "보유(won/ETC)",
                                      value: etcwon.toString() + "won",
                                      inline: true,
                                    },
                                    {
                                      name: "보유(won/SAND)",
                                      value: sandwon.toString() + "won",
                                      inline: true,
                                    },
                                    {
                                      name: "평가손익(XRP)",
                                      value:
                                        xrp_pgs.toString() +
                                        "won (" +
                                        xrp_pgspe.toString() +
                                        "%)",
                                      inline: true,
                                    },
                                    {
                                      name: "평가손익(ETC)",
                                      value:
                                        etc_pgs.toString() +
                                        "won (" +
                                        etc_pgspe.toString() +
                                        "%)",
                                      inline: true,
                                    },
                                    {
                                      name: "평가손익(SAND)",
                                      value:
                                        sand_pgs.toString() +
                                        "won (" +
                                        sand_pgspe.toString() +
                                        "%)",
                                      inline: true,
                                    }
                                  )
                                  .setFooter(
                                    "JaydenBot COIN System | 원화는 1의 자리까지 버림되어 처리하여 차이가 있을 수 있습니다."
                                  );

                                message.channel.send({ embeds: [embed] });
                              });
                          });
                      });
                  });
              });
          });
      }
    }
  }
  mql.query(walcheck, callmql);
};

module.exports.config = {
  name: "323sd1fs3d21fsdf54sds3d21fsd56f4sd3f21sd65f4sd3f21sd65f4s3d2f1s6d54fsd32f1s6d5f49we87rs3dfe5sd8e2ds8e1e56s8d8e5d7gf7w9s24h8k4u8r9e6fd5ffg4g394g449err8gh4jd6w9e8t7tf5h1h1s45s2s5sd2fs8e7h4g5s6d5",
};
