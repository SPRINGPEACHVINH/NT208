const User = require("../models/Users")
const bcrypt = require("bcrypt")

const CreateUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { UserName, Email, Password, confirmPassword, PhoneNumber } = newUser;
    try {
      const checkUser = await User.findOne({ 
        Email 
    });
      if (checkUser !== null) {
        resolve({
          status: "ERROR",
          message: "Email already exists",
        });
      }
      const hash = bcrypt.hashSync(Password, 10)
      console.log('hash', hash)

      const createdUser = await User.create({
        UserName,
        Email,
        Password: hash,
        confirmPassword: hash,
        PhoneNumber,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "User created successfully",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  CreateUser,
};
