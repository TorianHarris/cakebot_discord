const Discord = require("discord.js");
const ud = require("urban-dictionary")
module.exports = {
  name: "urban",
  description: "Search for word on Urban Dictionary",
  aliases: ["u"],
  args: true,
  usage: "[word]",
  cooldown: 10,
  execute(message, args) {
    ud.term(args.join(" ")).then((result) => {
        const regex = /(\[|\])/g;
        //fields have a 1024 character limit
        const fieldLimit = 900;
        const entry = result.entries[0];
        let definition = entry.definition.replace(regex, "");
        let example = entry.example.replace(regex, "");
        if(definition.length > fieldLimit) {
          definition = definition.substring(0, fieldLimit) + `...[(click here for full definition)](https://www.urbandictionary.com/define.php?term=${entry.word})`
        }
        if(example.length > fieldLimit) {
          example = example.substring(0, fieldLimit) + `...[(click here for full example)](https://www.urbandictionary.com/define.php?term=${entry.word})`
        }
        const embed = new Discord.RichEmbed()
        .setColor('#f06292')
        .setTitle('Urban Dictionary')
        .addField(entry.word, definition)
        .addField('Example:', example)
        .setFooter('Powered by Thotbot');

        message.channel.send(embed);
      }).catch((error) => {
        message.channel.send(`Oops! I got an error that says: ${error}`);
        message.channel.send(`Someone should do something about that, huh?`);
      })
  }
};
