const Discord = require("discord.js");

module.exports.run = async (bot, message, args, db, guild) => {
  console.log(`Running command ${this.cmd.name}`);
  // if (config.noLog) {
  //   return {
  //     status: false,
  //     message: "",
  //   };
  // }
  const fs = require("fs");
  try {
    let bananaData;
    try {
      bananaData = JSON.parse(fs.readFileSync("bananas.json"));
    } catch (e) {
      bananaData = {};
    }
    if (bananaData.length === 0) {
      return {
        status: true,
        message: ":x: No users found",
      };
    } else {
      console.log(bananaData);
      let mapped = [];
      Object.keys(bananaData).map(function (key, index) {
        let name = guild.members.cache.find(
          (member) => member.id === key
        ).user.username;
        mapped.push({ id: key, name: name, balance: bananaData[key].balance });
      });
      let sorted = mapped.sort((a, b) => b.balance - a.balance);
      let top10 = sorted.slice(0, 10);
      let top10string = '';
      top10.forEach(user => {
        top10string += `${user.name} - ${user.balance}\n`;
      })
      let embed = new Discord.MessageEmbed()
      .setColor("#e2b714")
      .setTitle(`Top 10 Banana Hoarders`)
      .setThumbnail(
        "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/banana_1f34c.png"
      )
        .setDescription(top10string)
        .setFooter("www.monkey-type.com");
      
      message.channel.send(embed);
      return {
        status: true,
        message: "",
      };
    }
  } catch (e) {
    return {
      status: false,
      message: "Something went wrong when getting top banana hoarders: " + e.message,
    };
  }

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

};

module.exports.cmd = {
  name: "bananatop",
  needMod: false,
  onlyBotCommandsChannel: true,
};