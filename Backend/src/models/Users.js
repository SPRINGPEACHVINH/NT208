const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    UserName: { type: String, required: true, unique: true},
    Password: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    PhoneNumber: { type: String, required: true },
    AccessToken: { type: String },
    RefreshToken: { type: String }
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
