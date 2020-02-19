const fs = require("fs");
const stream = fs.createWriteStream("append.txt", { flags: "a" });

const log = function(user, response) {
  stream.write("\r\n" + user + "\r\n" + response + "\r\n");
};

module.exports = { log };
