const { get } = require("mongoose");
const BtcService = require("../services/BtcService");

const add = async (req, res) => {
  try {
    const btc = await BtcService.addBtc(req.body);

    return res.status(201).json({ status: "OK", data: btc });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message });
  }
};

module.exports = {
  add,
};
