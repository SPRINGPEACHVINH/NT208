const mongoose = require("mongoose");
const { type } = require("os");
const btcSchema = new mongoose.Schema(
  {
    BtcId: { type: String, required: true, unique: true },
    BtcName: { type: String, required: true },
    BtcInfo: { type: String, required: true },
    EnterpriseName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    PhoneNumber: { type: String, required: true },
    BtcAddress: { type: String, required: true },
    Logo_btc: { type: String, required: true },
    User: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);
const Btc = mongoose.model("Btc", btcSchema);
module.exports = Btc;
