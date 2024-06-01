const { get } = require("mongoose");
const Btc = require("../models/Btc");

const addBtc = async (btcData) => {
  const btc = new Btc(btcData);
  return btc.save();
};

const deleteBtc = async (BtcId) => {
  return Btc.findOneAndDelete({ BtcId: BtcId });
};

module.exports = {
  addBtc,
  deleteBtc,
};
