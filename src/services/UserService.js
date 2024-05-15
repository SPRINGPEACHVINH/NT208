const User = require("../models/Users");
const bcrypt = require("bcrypt");
const genneralAccessToken = require("./JwtService")

const CreateUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { UserName, Email, Password, confirmPassword, PhoneNumber } = newUser;
    try {
      const checkUser = await User.findOne({
        Email,
      });
      if (checkUser !== null) {
        resolve({
          status: "ERROR",
          message: "Email already exists",
        });
      }
      const hash = bcrypt.hashSync(Password, 10);
      console.log("hash", hash);

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

const LoginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { UserName, Email, Password, confirmPassword, PhoneNumber } =
      userLogin;
    try {
      const checkUser = await User.findOne({
        Email: Email,
      });
      if (checkUser === null) {
        resolve({
          status: "ERROR",
          message: "The user does not exist",
        })
      }
      const comparePassword = bcrypt.compareSync(Password, checkUser.Password)
      console.log('comparePassword', comparePassword)
      if (!comparePassword) {
        resolve({
          status: "OK",
          message: "The password or user is incorrect",
        })
      }

      const access_token = genneralAccessToken.genneralAccessToken({
        id: checkUser._id
      })
      console.log('access_token', access_token)
      resolve({
        status: "OK",
        message: "Success",
        data: userLogin
      })
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = {
  CreateUser,
  LoginUser,
}
