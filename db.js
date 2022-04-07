const {MongoClient} = require('mongodb')

let dbConnection;
const URL = "mongodb://localhost:27017/bookstore"

const connectDB =(cb)=>{
  MongoClient.connect(URL)
  .then((client)=>{
    dbConnection = client.db()
    return cb()
  })
  .catch((error)=>{
    console.log(error)
    return cb(error)
  })
}


module.exports={
  connectToDb: connectDB,
  getDb: ()=> dbConnection,
}