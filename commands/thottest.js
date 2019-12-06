const axios = require("axios");

module.exports = {
  name: "thot.test",
  description:
    "Search for a random doujin from nHentai using keywords. Excludes doujins with certain keywords. Use thot.fetish to bypass this restriction.",
  aliases: ["thot.t"],
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
    axios
      .get("https://nhentai.net/api/galleries/search?query=english+female")
      .then(function(response) {
        console.log(response.data.result[0]);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
