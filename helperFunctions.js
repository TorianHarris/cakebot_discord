const axios = require("axios");
const fs = require("fs");
const stream = fs.createWriteStream("append.txt", { flags: "a" });

const log = function(user, response) {
  stream.write("\r\n" + user + "\r\n" + response + "\r\n");
};

async function search(query, fullSearch = false) {
  const api = "https://nhentai.net/api/galleries/search?query=english+";
  const excludedKeyWords = [
    "lolicon",
    "shotacon",
    "rape",
    "bestiality",
    "scat",
    "incest",
    "guro",
    "snuff"
  ];
  try {
    const pageResponse = await axios.get(
      api +`${query.join("+")}${fullSearch ? "" : "+-" + excludedKeyWords.join("+-")}`
	);
	const randPage = Math.ceil(Math.random() * pageResponse.data.num_pages);
	const mainResponse = await axios.get(
		api +`${query.join("+")}${fullSearch ? "" : "+-" + excludedKeyWords.join("+-")}&page=${randPage}`
	)
	const res = mainResponse.data.result;
	const result = res[Math.floor(Math.random() * res.length)];
	if(result.error === true)
		return 'error';
	const data = {
		title: result.title.pretty,
		id: result.id,
		favorites: result.num_favorites,
		page: randPage
	}
	console.log(data);
	return data;
  } catch (e) {
	  console.log('error: ' + e)
    return `error`;
  }
}
module.exports = { log, search };
