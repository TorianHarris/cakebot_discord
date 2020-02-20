const moment = require("moment");

module.exports = {
  name: "day",
  aliases: ["create", "new"],
  description: "Create a birthday",
  args: true,
  usage: "MM/DD",
  cooldown: 5,
  execute(message, args, Data) {
    const regex = new RegExp(/(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])/);
    if (!regex.test(args[0]))
      return message.channel.send(
        `I don't think that was a valid birthday.\nPlease write your birthday in MM/DD format.`
      );

    Data.findOneAndUpdate(
      { user: message.author.id },
      { user: message.author.id, bday: moment(args[0], "MM-DD") },
      { new: true, upsert: true },
      err => {
        if (err) {
          message.channel.send(`Couldn't save that date.\nCheck again to make sure you wrote it right.`);
          console.log("Day Command Error: " + err);
          return;
        }
        message.channel.send(`Saved ${message.author}'s birthday!\nI'll alert everyone on ${args[0]}.`);
      }
    );
  }
};
