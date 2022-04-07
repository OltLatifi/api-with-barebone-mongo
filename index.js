const express = require("express");
const { connectToDb } = require("./db");

const app = express();
app.use(express.json());
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
const {getBooks, getOneBook, makeBook, deleteOneBook, updateOneBook} = require('./routes')

// read
app.get("/books", getBooks);
app.get("/books/:id", getOneBook);

// post
app.post("/books", makeBook);

// update
app.put("/books/:id", updateOneBook);

// delete
app.delete("/books/:id", deleteOneBook);
