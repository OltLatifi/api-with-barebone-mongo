const { getDb } = require("./db");
const {ObjectId} = require('mongodb')

// GET all books

const getBooks = (req, res) => {
  let books = [];
  
  getDb().collection("books")
  .find()
  .sort({ author: 1 })
  .forEach(book=> books.push(book))
  .then(()=>{
    res.status(200).json(books)
  })
  .catch(()=>{
    res.status(500).json({error:"Could not fetch the documents"})
  });
}

// GET single book

const getOneBook =(req, res)=>{
  let id = req.params.id;
  if(ObjectId.isValid(id)){

    getDb().collection("books")
     .findOne({_id:ObjectId(req.params.id)})
     .then((document)=>{
       if(document === null){
         res.status(404).json({error:"Could not find a book with that id"})
       }else{
         res.status(200).json(document)
       }
     })
     .catch(()=>{
       res.status(500).json({error:"Could not fetch the document"})
     })

  } else{
    res.status(500).json({error:"Invalid id"})
  }

  
}


const makeBook = (req, res) =>{
  let data = req.body;
  getDb().collection("books").insertOne(data)
   .then((result)=>{
     res.status(201).json(data);
   })
   .catch(()=>{
     res.status(500).json({error:"Could not create a book, perhaps you didnt enter valid data"})
   });
}

module.exports = {getBooks, getOneBook, makeBook}