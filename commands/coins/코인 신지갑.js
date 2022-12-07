
var mysql = require("mysql");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");


module.exports.run = async (bot, message, args) => {
  message.channel
    .send(`${message.author.tag}님의 지갑을 불러오는중입니다...`)
    .then((stt) => {
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

            let btt = rows[i].have_btt;
            let btt_all = rows[i].btt_all;
            let btt_now;

            let bnb = rows[i].have_bnb;
            let bnb_all = rows[i].bnb_all;
            let bnb_now;

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
                                fetch(
                                  `https://api.bithumb.com/public/ticker/SAND/`
                                )
                                  .then((response) => response.json())
                                  .then((data) => {
                                    sand_now = data.data.closing_price; //현재가
                                    fetch(
                                      `https://api.bithumb.com/public/ticker/btt/`
                                    )
                                      .then((response) => response.json())
                                      .then((data) => {
                                        btt_now = data.data.closing_price; //현재가
                                        fetch(
                                          `https://api.bithumb.com/public/ticker/bnb/`
                                        )
                                          .then((response) => response.json())
                                          .then((data) => {
                                            bnb_now = data.data.closing_price; //현재가
                                            //console.log(btc_now + '  ' + eth_now + '  ' + doge_now + '  ' + xrp_now)

                                            let btc_nowhave = btc_now * btc;
                                            let btc_pgs = Math.floor(
                                              btc_nowhave - btc_all
                                            );
                                            let btc_pgspe =
                                              corr[
                                                (btc_nowhave / btc_all) * 100 -
                                                  100
                                              ] ||
                                              Math.round(
                                                (btc_nowhave / btc_all) *
                                                  10000 -
                                                  10000
                                              ) / 100;
                                            let btcwon = Math.floor(
                                              btc * btc_now
                                            );
                                            var btc_av =
                                              corr[Math.floor(btc_all / btc)] ||
                                              Math.floor(btc_all / btc);
                                            if (btc_pgs >= 0) {
                                              btc_pgs = "+" + btc_pgs;
                                              btc_pgspe = "+" + btc_pgspe;
                                            }

                                            let eth_nowhave = eth_now * eth;
                                            let eth_pgs = Math.floor(
                                              eth_nowhave - eth_all
                                            );
                                            let eth_pgspe =
                                              corr[
                                                (eth_nowhave / eth_all) * 100 -
                                                  100
                                              ] ||
                                              Math.round(
                                                (eth_nowhave / eth_all) *
                                                  10000 -
                                                  10000
                                              ) / 100;
                                            let ethwon = Math.floor(
                                              eth * eth_now
                                            );
                                            var eth_av =
                                              corr[Math.floor(eth_all / eth)] ||
                                              Math.floor(eth_all / eth);
                                            if (eth_pgs >= 0) {
                                              eth_pgs = "+" + eth_pgs;
                                              eth_pgspe = "+" + eth_pgspe;
                                            }

                                            let etc_nowhave = etc_now * etc;
                                            let etc_pgs = Math.floor(
                                              etc_nowhave - etc_all
                                            );
                                            let etc_pgspe =
                                              corr[
                                                (etc_nowhave / etc_all) * 100 -
                                                  100
                                              ] ||
                                              Math.round(
                                                (etc_nowhave / etc_all) *
                                                  10000 -
                                                  10000
                                              ) / 100;
                                            let etcwon = Math.floor(
                                              etc * etc_now
                                            );
                                            var etc_av =
                                              corr[Math.floor(etc_all / etc)] ||
                                              Math.floor(etc_all / etc);
                                            if (etc_pgs >= 0) {
                                              etc_pgs = "+" + etc_pgs;
                                              etc_pgspe = "+" + etc_pgspe;
                                            }

                                            let doge_nowhave = doge_now * doge;
                                            let doge_pgs = Math.floor(
                                              doge_nowhave - doge_all
                                            );
                                            let doge_pgspe =
                                              corr[
                                                (doge_nowhave / doge_all) *
                                                  100 -
                                                  100
                                              ] ||
                                              Math.round(
                                                (doge_nowhave / doge_all) *
                                                  10000 -
                                                  10000
                                              ) / 100;
                                            let dogewon = Math.floor(
                                              doge * doge_now
                                            );
                                            var doge_av =
                                              corr[
                                                Math.floor(doge_all / doge)
                                              ] || Math.floor(doge_all / doge);
                                            if (doge_pgs >= 0) {
                                              doge_pgs = "+" + doge_pgs;
                                              doge_pgspe = "+" + doge_pgspe;
                                            }

                                            let xrp_nowhave = xrp_now * xrp;
                                            let xrp_pgs = Math.floor(
                                              xrp_nowhave - xrp_all
                                            );
                                            let xrp_pgspe =
                                              corr[
                                                (xrp_nowhave / xrp_all) * 100 -
                                                  100
                                              ] ||
                                              Math.round(
                                                (xrp_nowhave / xrp_all) *
                                                  10000 -
                                                  10000
                                              ) / 100;
                                            let xrpwon = Math.floor(
                                              xrp * xrp_now
                                            );
                                            var xrp_av =
                                              corr[Math.floor(xrp_all / xrp)] ||
                                              Math.floor(xrp_all / xrp);
                                            if (xrp_pgs >= 0) {
                                              xrp_pgs = "+" + xrp_pgs;
                                              xrp_pgspe = "+" + xrp_pgspe;
                                            }

                                            let sand_nowhave = sand_now * sand;
                                            let sand_pgs = Math.floor(
                                              sand_nowhave - sand_all
                                            );
                                            let sand_pgspe =
                                              corr[
                                                (sand_nowhave / sand_all) *
                                                  100 -
                                                  100
                                              ] ||
                                              Math.round(
                                                (sand_nowhave / sand_all) *
                                                  10000 -
                                                  10000
                                              ) / 100;
                                            let sandwon = Math.floor(
                                              sand * sand_now
                                            );
                                            var sand_av =
                                              corr[
                                                Math.floor(sand_all / sand)
                                              ] || Math.floor(sand_all / sand);
                                            if (sand_pgs >= 0) {
                                              sand_pgs = "+" + sand_pgs;
                                              sand_pgspe = "+" + sand_pgspe;
                                            }

                                            let btt_nowhave = btt_now * btt;
                                            let btt_pgs = Math.floor(
                                              btt_nowhave - btt_all
                                            );
                                            let btt_pgspe =
                                              corr[
                                                (btt_nowhave / btt_all) * 100 -
                                                  100
                                              ] ||
                                              Math.round(
                                                (btt_nowhave / btt_all) *
                                                  10000 -
                                                  10000
                                              ) / 100;
                                            let bttwon = Math.floor(
                                              btt * btt_now
                                            );
                                            var btt_av =
                                              corr[Math.floor(btt_all / btt)] ||
                                              Math.floor(btt_all / btt);
                                            if (btt_pgs >= 0) {
                                              btt_pgs = "+" + btt_pgs;
                                              btt_pgspe = "+" + btt_pgspe;
                                            }

                                            let bnb_nowhave = bnb_now * bnb;
                                            let bnb_pgs = Math.floor(
                                              bnb_nowhave - bnb_all
                                            );
                                            let bnb_pgspe =
                                              corr[
                                                (bnb_nowhave / bnb_all) * 100 -
                                                  100
                                              ] ||
                                              Math.round(
                                                (bnb_nowhave / bnb_all) *
                                                  10000 -
                                                  10000
                                              ) / 100;
                                            let bnbwon = Math.floor(
                                              bnb * bnb_now
                                            );
                                            var bnb_av =
                                              corr[Math.floor(bnb_all / bnb)] ||
                                              Math.floor(bnb_all / bnb);
                                            if (bnb_pgs >= 0) {
                                              bnb_pgs = "+" + bnb_pgs;
                                              bnb_pgspe = "+" + bnb_pgspe;
                                            }

                                            const embed = new MessageEmbed()
                                              .setColor("#9678b6")
                                              .setTitle("지갑")
                                              //.setDescription('	'`원`')
                                              .addFields(
                                                {
                                                  name: "User ID",
                                                  value:
                                                    "JCS" + userid.toString(),
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
                                                  name: "비트코인(BTC)",
                                                  value:
                                                    "```보유 : " +
                                                    btc.toString() +
                                                    "btc | " +
                                                    btcwon.toString() +
                                                    "krw | 평균매수가 : " +
                                                    btc_av +
                                                    "krw | 평가손익 : " +
                                                    btc_pgs +
                                                    "(" +
                                                    btc_pgspe +
                                                    "%)```",
                                                  inline: false,
                                                },
                                                {
                                                  name: "이더리움(ETH)",
                                                  value:
                                                    "```보유 : " +
                                                    eth.toString() +
                                                    "eth | " +
                                                    ethwon.toString() +
                                                    "krw | 평균매수가 : " +
                                                    eth_av +
                                                    "krw | 평가손익 : " +
                                                    eth_pgs +
                                                    "(" +
                                                    eth_pgspe +
                                                    "%)```",
                                                  inline: false,
                                                },
                                                {
                                                  name: "이더리움클래식(ETC)",
                                                  value:
                                                    "```보유 : " +
                                                    etc.toString() +
                                                    "etc | " +
                                                    etcwon.toString() +
                                                    "krw | 평균매수가 : " +
                                                    etc_av +
                                                    "krw | 평가손익 : " +
                                                    etc_pgs +
                                                    "(" +
                                                    etc_pgspe +
                                                    "%)```",
                                                  inline: false,
                                                },
                                                {
                                                  name: "도지코인(DOGE)",
                                                  value:
                                                    "```보유 : " +
                                                    doge.toString() +
                                                    "doge | " +
                                                    dogewon.toString() +
                                                    "krw | 평균매수가 : " +
                                                    doge_av +
                                                    "krw | 평가손익 : " +
                                                    doge_pgs +
                                                    "(" +
                                                    doge_pgspe +
                                                    "%)```",
                                                  inline: false,
                                                },
                                                {
                                                  name: "리플(XRP)",
                                                  value:
                                                    "```보유 : " +
                                                    xrp.toString() +
                                                    "xrp | " +
                                                    xrpwon.toString() +
                                                    "krw | 평균매수가 : " +
                                                    xrp_av +
                                                    "krw | 평가손익 : " +
                                                    xrp_pgs +
                                                    "(" +
                                                    xrp_pgspe +
                                                    "%)```",
                                                  inline: false,
                                                },
                                                {
                                                  name: "샌드박스(SAND)",
                                                  value:
                                                    "```보유 : " +
                                                    sand.toString() +
                                                    "sand | " +
                                                    sandwon.toString() +
                                                    "krw | 평균매수가 : " +
                                                    sand_av +
                                                    "krw | 평가손익 : " +
                                                    sand_pgs +
                                                    "(" +
                                                    sand_pgspe +
                                                    "%)```",
                                                  inline: false,
                                                },
                                                {
                                                  name: "비트토렌트(BTT)",
                                                  value:
                                                    "```보유 : " +
                                                    btt.toString() +
                                                    "btt | " +
                                                    bttwon.toString() +
                                                    "krw | 평균매수가 : " +
                                                    btt_av +
                                                    "krw | 평가손익 : " +
                                                    btt_pgs +
                                                    "(" +
                                                    btt_pgspe +
                                                    "%)```",
                                                  inline: false,
                                                },
                                                {
                                                  name: "바이낸스코인(BNB)",
                                                  value:
                                                    "```보유 : " +
                                                    bnb.toString() +
                                                    "bnb | " +
                                                    bnbwon.toString() +
                                                    "krw | 평균매수가 : " +
                                                    bnb_av +
                                                    "krw | 평가손익 : " +
                                                    bnb_pgs +
                                                    "(" +
                                                    bnb_pgspe +
                                                    "%)```",
                                                  inline: false,
                                                }
                                              )
                                              .setFooter(
                                                "JaydenBot COIN System | 원화는 1의 자리까지 버림되어 처리하여 차이가 있을 수 있습니다."
                                              );
                                            stt.delete();
                                            message.channel.send({
                                              embeds: [embed],
                                            });
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  });
              });
          }
        }
      }
      bot.mql.query(walcheck, callmql);
    });
};

module.exports.config = {
  name: "지갑",
};
