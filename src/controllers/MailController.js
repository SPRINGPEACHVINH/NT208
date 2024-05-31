const nodeMailer = require("nodemailer");
const MailService = require("../services/MailService");
const UserService = require("../services/UserService");
const bcrypt = require("bcrypt");

const sendMail = async (req, res) => {
  const { Email, Subject, Content } = req.body;
  if(!Email || !Subject || !Content){
    return res.status(200).json({
      status: "ERROR",
      message: "The input is required",
    });
  }
  const findEmail = await UserService.FindUserByEmail(Email);
  if (findEmail === null) {
    return res.status(200).json({
      status: "ERROR",
      message: "User does not exist",
    });
  }
  const sendMail = await MailService.sendMail(Email, Subject, Content);
  console.log(sendMail);
  return res.status(200).json({
    status: "OK",
    message: "Email sent successfully",
    data: sendMail,
  });

};

module.exports = {
  sendMail,
};
