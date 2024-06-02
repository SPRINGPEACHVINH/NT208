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

const deleteById = async (req, res) => {
  try {
    const result = await BtcService.deleteBtc(req.params.id);

    if (!result) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "Btc not found" });
    }

    return res
      .status(200)
      .json({ status: "OK", message: "Btc deleted successfully" });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message });
  }
};

module.exports = {
  add,
  deleteById,
};
