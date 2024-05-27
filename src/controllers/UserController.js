const UserService = require("../services/UserService");
const jwtservice = require("../services/JwtService");

const CreateUser = async (req, res) => {
  try {
    const { UserName, Email, Password, confirmPassword, PhoneNumber } =
      req.body;
    const reg = /^[a-zA-Z0-9._%+-]+@(gmail\.com|gm\.uit\.edu\.vn)$/;
    const isCheckEmail = reg.test(Email);
    if (!UserName || !Email || !Password || !confirmPassword || !PhoneNumber) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is required",
      });
    } else if (Password !== confirmPassword) {
      return res.status(200).json({
        status: "ERROR",
        message: "Password and confirmPassword are not the same",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERROR",
        message: "Email is not valid",
      });
    }
    console.log("isCheckEmail", isCheckEmail);
    const response = await UserService.CreateUser(req.body);
    return res.status(200).json(response);
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

const UpdateUser = async (req, res) => {
  try {
    // const { UserName, Email, Password, confirmPassword, PhoneNumber } =
    //   req.body
    // const reg = /^[a-zA-Z0-9._%+-]+@(gmail\.com|gm\.uit\.edu\.vn)$/;
    // const isCheckEmail = reg.test(Email);
    // if (!UserName || !Email || !Password || !confirmPassword || !PhoneNumber) {
    //   return res.status(200).json({
    //     status: "ERROR",
    //     message: "The input is required",
    //   })
    // } else if (Password !== confirmPassword) {
    //   return res.status(200).json({
    //     status: "ERROR",
    //     message: "Password and confirmPassword are not the same",
    //   })
    // } else if (!isCheckEmail) {
    //   return res.status(200).json({
    //     status: "ERROR",
    //     message: "Email is not valid",
    //   })
    // }
    // console.log("isCheckEmail", isCheckEmail);
    const userId = req.query.id;
    console.log("userId", userId);
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
    const userId = req.params.id;
    if (!userId) {
      return req.status(200).json({
        status: "ERROR",
        message: "The userId is required",
      });
    }
    const response = await UserService.GetDetailsUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

const RefreshToken = async (req, res) => {
  try {
    const token = req.headers.token.split(' ')[1]
    if (!token) {
      return req.status(200).json({
        status: "ERROR",
        message: "The token is required",
      });
    }
    const response = await jwtservice.refreshToken(token)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({
      error: e.message,
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
  RefreshToken
};
