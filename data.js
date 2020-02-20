const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    user: String,
    bday: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Birthday", DataSchema);