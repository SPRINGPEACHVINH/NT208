const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
dotenv.config();

const app = express();
const port = process.env.PORT || 8888;

app.get("/", (req, res) => {
    return res.send("Hello World");
})

mongoose.connect(`mongodb+srv://mongodbuser:${process.env.MONGODB}@ticketx88.itndfbh.mongodb.net/`)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.log("Error: ", error);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
