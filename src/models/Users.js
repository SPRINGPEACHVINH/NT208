const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    UserName: { type: String, required: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    PhoneNumber: { type: String, required: true },
    // AccessToken: { type: String, required: true },
    // RefreshToken: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
