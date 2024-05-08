const UserServices = require("../services/UserService");

const CreateUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^[a-zA-Z0-9._%+-]+@(gmail\.com|gm\.uit\.edu\.vn)$/
    const isCheckEmail = reg.test(email);
    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(200).json({
        status: "ERROR",
        message: "The input is required",
    });
    } 
    else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERROR",
        message: "Password and confirmPassword are not the same",
      });
    }
    else if(!isCheckEmail) {
        return res.status(200).json({
            status: "ERROR",
            message: "Email is not valid",
        });
    }   
    console.log("isCheckEmail", isCheckEmail);
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      error: e.message,
    });
  }
};

module.exports = {
  CreateUser,
};
