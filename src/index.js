const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
dotenv.config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mongodbuser:TicketX.88@ticketx88.itndfbh.mongodb.net/?retryWrites=true&w=majority&appName=TicketX88";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const app = express();
const port = process.env.PORT || 8888;

// app.use(bodyParser.json());

// routes(app);

// mongoose
//   .connect(`${process.env.MONGODB}`)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.log("Error: ", error);
//   });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
