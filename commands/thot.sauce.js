const Discord = require("discord.js");
module.exports = {
  name: "thot.sauce",
  description: "Search for a doujin from nHentai using an id.",
  aliases: ["thot.id"],
  args: true,
  usage: "[id]",
  cooldown: 10,
  execute(message, args, N, write) {
    N.g(args[0])
      .then(gallery => {
        const properties = gallery.tags;
        const artists = [];
        const tags = [];
        properties.forEach(prop => {
          if (prop.type === "artist") artists.push(prop.name);
          if (prop.type === "tag") tags.push(prop.name);
        });
        let popularity = "";
        switch (true) {
          case gallery.num_favorites > 10000:
            popularity = "Extremely Popular";
            break;
          case gallery.num_favorites > 1000:
            popularity = "Very Popular";
            break;
          case gallery.num_favorites > 100:
            popularity = "Popular";
            break;
          default:
            popularity = "Not Popular";
            break;
        }

        const embed = new Discord.RichEmbed()
          .setColor("#f06292")
          .setTitle(
            `${gallery.title.pretty.replace("&#039;", "'")} (by: ${
              artists.length < 4 ? artists.join(", ") : "Multiple Artists"
            })`
          )
          .setURL("https://nhentai.net/g/" + gallery.id)
          .setThumbnail(gallery.getCover())
          .addField(popularity, tags.join(", "));
        message.channel.send("Here's your sauce <3");
        message.channel.send(embed);
      })
      .catch(function(error) {
        console.log("Error: " + error);
        message.channel.send("Couldn't find that sauce. Your pasta's gonna be dry </3");
      });
  }
};
