// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();

// const authMiddleware = (req, res) => {
//   console.log("checkToken", req.headers.token);
//   const token = req.headers.token.split(" ")[1];
//   jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
//     if (err) {
//       return res.status(401).json({
//         status: "ERROR",
//         message: "Unauthorized",
//       });
//     }
//     const {payload} = user
//   });
// };

// module.exports = {
//   authMiddleware,
// };
