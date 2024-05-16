const User = require("../models/Users");
const bcrypt = require("bcrypt");
const genneralToken = require("./JwtService");

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
        });
      }
      const comparePassword = bcrypt.compareSync(Password, checkUser.Password);
      console.log("comparePassword", comparePassword);
      if (!comparePassword) {
        resolve({
          status: "OK",
          message: "The password or user is incorrect",
        });
      }

      const access_token = await genneralToken.genneralAccessToken({
        id: checkUser._id,
      });

      const refresh_token = await genneralToken.genneralRefreshToken({
        id: checkUser._id,
      });

      resolve({
        status: "OK",
        message: "Success",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const DeleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "ERROR",
          message: "User does not exist",
        });
      }

      const DeletedUser = await User.findByIdAndDelete(id)
      resolve({
        status: "OK",
        message: "User deleted successfully",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const GetAllUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find(id);
      resolve({
        status: "OK",
        message: "User getted successfully",
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const GetDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      if (user === null) {
        resolve({
          status: "ERROR",
          message: "User does not exist",
        });
      }

      resolve({
        status: "OK",
        message: "Success",
        data: user
      });
    } catch (e) {
      reject(e);
    }
  });
};

const RefreshTokenService = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const user = await User.findOne({
      //   _id: id,
      // });
      // if (user === null) {
      //   resolve({
      //     status: "ERROR",
      //     message: "User does not exist",
      //   });
      // }
      console.log("token", token);
      resolve({
        status: "OK",
        message: "Success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  CreateUser,
  LoginUser,
  DeleteUser,
  GetAllUser,
  GetDetailsUser,
  RefreshTokenService,
};
