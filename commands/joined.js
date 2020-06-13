const moment = require("moment");
module.exports = {
  name: "joined",
  aliases: ["age", "followage"],
  description: "Discover when a user joined the Discord Server",
  args: false,
  usage: "[optional mentioned user]",
  cooldown: 5,
  execute(message, args) {
    //message.channel.send(message.member.joinedAt)
    // console.log(message.member.joinedAt)
    const mention = message.mentions.members.first();
    const member = mention ? mention : message.member;
    const time = moment.duration(moment().diff(member.joinedAt))._data;
    // console.log("MENTION")
    // console.log(message.mentions.users.first());
    // console.log("AUTHOR")
    // console.log(message.member);
    message.channel.send(
      member +
        " has been a part of this server for " +
        this.validate([
          { type: "years", value: time.years },
          { type: "months", value: time.months },
          { type: "days", value: time.days },
        ])
    );

    // console.log(message.mentions.users.first())
    // message.channel.send(`
    // ${this.validate(time.years, "years, ")}${this.validate(time.months, "months, ")}${this.validate(time.days, "days")}
    // `);
  },

  // validate each time argument
  validate(arr) {
    const newArr = [];
    for (i = 0; i < arr.length; i++) {
      //
      if (arr[i].value > 0) {
        //if (arr[i].value === 1) arr[i].type = arr[i].type.replace("s", "");
        newArr.push(`${arr[i].value} ${arr[i].value === 1 ? arr[i].type.replace("s", "") : arr[i].type}`);
      }
      // if (arr[i].value === 1) arr[i].type = arr[i].type.replace("s", "");
      // if (arr[i].value !== 0) return;
    }
    return newArr.length > 0 ? newArr.join(", ") : 'not long at all!';
    // if (time === 0) return "";
    // if (time === 1) message = message.replace("s", "");
    // return `${time} ${message}`;
  },
};
