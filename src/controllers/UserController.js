const UserService = require("../services/UserService");
const jwtservice = require("../services/JwtService");
const User = require("../models/Users");

const CreateUser = async (req, res) => {
  try {
    const { UserName, Email, Password, confirmPassword, PhoneNumber } =
      req.body;
    const regEmail = /^[a-zA-Z0-9._%+-]+@(gmail\.com|gm\.uit\.edu\.vn)$/;
    const isCheckEmail = regEmail.test(Email);
    const regPhone = /^\d{10}$/;
    const isCheckPhone = regPhone.test(PhoneNumber);
    if (!UserName || !Email || !Password || !confirmPassword || !PhoneNumber) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is required",
      });
    } else if (Password !== confirmPassword) {
      return res.status(200).json({
        status: "ERROR",
        message: "The password and confirm password are not the same",
      });
    }
    else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERROR",
        message: "Email is not valid",
      });
    } else if (!isCheckPhone) {
      return res.status(200).json({
        status: "ERROR",
        message: "Phone number is not valid",
      });
    }

    const checkEmail = await User.findOne({ Email });
    if (checkEmail !== null) {
      return res.status(200).json({
        status: "ERROR",
        message: "Email already exists",
      });
    }

    const checkPhoneNumber = await User.findOne({ PhoneNumber });
    if (checkPhoneNumber !== null) {
      return res.status(200).json({
        status: "ERROR",
        message: "PhoneNumber already exists",
      });
    }

    const newUser = await UserService.CreateUser(req.body);
    return res.status(200).json({
      status: "OK",
      message: "User created successfully",
      data: newUser,
    });
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { UserName, Password } = req.body;
    if (!UserName || !Password) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is required",
      });
    }
    const user = await UserService.FindUserByUserName(UserName);
    if (!user) {
      return res.status(200).json({
        status: "ERROR",
        message: "The user does not exist",
      });
    }
    const isPasswordMatch = await UserService.CheckPassword(
      Password,
      user.Password
    );
    if (!isPasswordMatch) {
      return res.status(200).json({
        status: "ERROR",
        message: "The password is incorrect",
      });
    }
    const response = await UserService.LoginUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

const GoogleSignIn = async (req, res) => {
  try {
    const { UserName, Email, Password } = req.body;
    if (!UserName || !Email || !Password) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is required",
      });
    }

    const isCheckEmail = await UserService.FindUserByEmail(Email);
    if (isCheckEmail !== null) {
      return res.status(200).json({
        status: "ERROR",
        message: "Email already exist",
      });
    }

    const newUser = await UserService.GoogleSignIn(req.body);
    return res.status(200).json({
      status: "OK",
      message: "User created successfully",
      data: newUser,
    });
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

const ForgotPassword = async (req, res) => {};

const UpdateUser = async (req, res) => {
  try {
    const userId = req.query.id;
    const response = await UserService.LoginUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERROR",
        message: "The userId is required",
      });
    }
    const response = await UserService.DeleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

const GetAllUser = async (req, res) => {
  try {
    const response = await UserService.GetAllUser();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

const GetDetailsUser = async (req, res) => {
  try {
    const userName = req.params.UserName;
    if (!userName) {
      return req.status(200).json({
        status: "ERROR",
        message: "The UserName is required",
      });
    }
    const response = await UserService.GetDetailsUserByUserName(userName);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

const RefreshToken = async (req, res) => {
  try {
    const token = req.headers.token.split(" ")[1];
    if (!token) {
      return req.status(200).json({
        status: "ERROR",
        message: "The token is required",
      });
    }
    const response = await jwtservice.refreshToken(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

const GetEvents = async (req, res) => {
  try {
    const result = await UserService.GetEventsByUser(req.params.UserName);
    if (!result) {
      return res.status(404).json({
        status: "ERROR",
        message: "UserName not found",
      });
    }

    return res.status(200).json({
      status: "OK",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      status: "ERROR",
      message: e.message,
    });
  }
};

module.exports = {
  CreateUser,
  LoginUser,
  UpdateUser,
  DeleteUser,
  GetAllUser,
  GetDetailsUser,
  RefreshToken,
  GoogleSignIn,
  GetEvents,
  ForgotPassword,
};
