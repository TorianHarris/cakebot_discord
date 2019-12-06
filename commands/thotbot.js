const Discord = require('discord.js');
module.exports = {
  name: "thotbot",
  description:
    "Search for a random doujin from nHentai using keywords. Excludes doujins with certain keywords. Use thot.fetish to bypass this restriction.",
  aliases: ["thot", "thot.search", "thot.fetish"],
  args: true,
  usage: "[keywords]",
  cooldown: 10,
  excludedKeyWords: [
    "lolicon",
    "shotacon",
    "rape",
    "bestiality",
    "scat",
    "incest",
    "guro",
    "snuff"
  ],
  execute(message, args, N, write) {
    const command = message.content.split(" ")[0];
    const query = `english ${args.join(" ")} ${
      command !== "!thot.fetish" ? "-" + this.excludedKeyWords.join(" -") : " "
    }`;
    N.search(query)
      .then(res => {
        const numPages = res.num_pages ? res.num_pages : 1;
		const randPage = Math.ceil(Math.random() * numPages);
		
        N.search(query, randPage).then(pageRes => {
          const results = pageRes.results;
          if (results.length === 0)
            return message.channel.send("No results found. Try checking your keywords.");
          const randResult = results[Math.floor(Math.random() * results.length)];
          N.g(randResult.id).then(gallery => {
            const properties = gallery.tags;
			const artists = []
			const tags = [];
			properties.forEach(prop => {
				if (prop.type === "artist")
					artists.push(prop.name)
				if (prop.type === "tag")
					tags.push(prop.name)
			});
			let popularity = '';
			switch (true) {
				case gallery.num_favorites > 10000:
					popularity = 'Extremely Popular';
					break;
				case gallery.num_favorites > 1000:
					popularity = 'Very Popular';
					break;
				case gallery.num_favorites > 100:
					popularity = 'Popular';
					break;	
				default:
					popularity = 'Not Popular'
					break;
			}
			
			const embed = new Discord.RichEmbed()
			.setColor('#f06292')
			.setTitle(`${gallery.title.pretty.replace("&#039;", "'")} (by: ${
                artists.length < 4 ? artists.join(", ") : "Multiple Artists"
              })`)
			.setURL('https://nhentai.net/g/' + gallery.id)
			.setThumbnail(gallery.getCover())
			.addField(popularity, tags.join(", "))
			message.channel.send('Hope you enjoy <3');
			message.channel.send(embed);

            write(`${message.author.username}: ${message} (${message.createdAt})`,
              `---${gallery.title.pretty.replace("&#039;", "'")} (${gallery.id})`);
            console.log(`${message.author.username}: ${message} (${message.createdAt})`);
		  })
		  .catch(function(error) {
			console.log('3' + error);
			message.channel.send("There was an error for your request.");
		  })
		})
		.catch(function(error) {
			console.log('1' + error);
			message.channel.send("There was an error for your request.");
		  });
      })
      .catch(function(error) {
        console.log('1' + error);
        message.channel.send("There was an error for your request.");
      });
  }
};
