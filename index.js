const express = require("express");
const { connectToDb } = require("./db");

const app = express();

// db connection
connectToDb((error) => {
  if (!error) {
    // if everything is ok, the error doesnt exist,
    // start listening
    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  }
});

// routes
const {getBooks, getOneBook} = require('./routes')

app.get("/books", getBooks);
app.get("/books/:id", getOneBook);
