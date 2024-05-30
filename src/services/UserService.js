const User = require("../models/Users");
const bcrypt = require("bcrypt");
const genneralToken = require("./JwtService");
require("dotenv").config();

const CreateUser = async (newUser) => {
  const { UserName, Email, Password, PhoneNumber } = newUser;
  const bcrypt_salt = `${process.env.BCRYPT_SALT}`;
  const hash = bcrypt.hashSync(Password, 10);

  const createdUser = await User.create({
    UserName,
    Email,
    Password: hash,
    PhoneNumber,
  });

  return createdUser;
};

const LoginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { UserName, Password } = userLogin;
    try {
      const checkUser = await User.findOne({
        UserName: UserName,
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
          status: "ERROR",
          message: "The password is incorrect",
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

      const DeletedUser = await User.findByIdAndDelete(id);
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

const GetDetailsUserByUserName = (UserName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ UserName: UserName });
      if (!user) {
        resolve({
          status: "ERROR",
          message: "User does not exist",
        });
      } else {
        resolve({
          status: "OK",
          message: "User fetched successfully",
          data: user,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const FindUserByUserName = (UserName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ UserName: UserName });
      if (!user) {
        resolve(null);
      } else {
        resolve(user);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const CheckPassword = (inputPassword, userPassword) => {
  return bcrypt.compareSync(inputPassword, userPassword);
};

module.exports = {
  CreateUser,
  LoginUser,
  DeleteUser,
  GetAllUser,
  GetDetailsUserByUserName,
  FindUserByUserName,
  CheckPassword,
};
