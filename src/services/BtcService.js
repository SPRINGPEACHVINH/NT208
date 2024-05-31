const { get } = require("mongoose");
const Btc = require("../models/Btc");

const addBtc = async (btcData) => {
  const btc = new Btc(btcData);
  return btc.save();
};

module.exports = {
  addBtc,
};
