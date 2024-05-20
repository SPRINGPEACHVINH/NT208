const mongoose = require("mongoose");
const { type } = require("os");
const btcSchema = new mongoose.Schema(
  {
    BtcId: { type: String, required: true, unique: true },
    BtcName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    PhoneNumber: { type: String, required: true },
    BtcAddress: { type: String, required: true },
    User: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);
const Btc = mongoose.model("Btc", userSchema);
module.exports = Btc;
