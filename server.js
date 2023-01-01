// Importing the required libraries
const express = require("express");
const cors = require("cors");
// setting up the app
const app = express();
app.use(cors());

app.post("/api/headers", async (req, res) => {
  try {
    // Retrieve the headers data from the request body
    // Store the incoming headers in a data object
    const headers = req.headers;
    const data = { headers };

    // Connecting with mongoDB
    const MongoClient = require("mongodb").MongoClient;
    const client = new MongoClient("mongodb://localhost:27017", {
      useNewUrlParser: true,
    });

    // Inserting the data object into a collection
    const collection = client.db("testDB").collection("headers");
    await collection.insertOne(data);

    // Closing the connection and send a response
    client.close();
    res.send("Headers saved to the database");
  } catch (error) {
    // Handling any errors
    console.error(error);
    res.status(500).send(error);
  }
});

// Starting the server
app.listen(3000, () => {
  console.log("API server listening on port 3000");
});
