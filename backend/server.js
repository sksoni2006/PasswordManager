const express=require('express')

//npm i dotenv
 const dotenv=require('dotenv')

//npm install mongodb
const { MongoClient } = require('mongodb');

//npm i body-parser
const bodyparser =require("body-parser")

//npm install cors  follow from manager.jss 
const cors = require('cors')

dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
const app=express()
const port=3000
app.use(bodyparser.json())
app.use(cors())

// async function main() {
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     const collection = db.collection('documents');


client.connect();

//Get all the passwords
app.get('/',async (req,res)=>{
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})
 
//Save a password
app.post('/',async (req,res)=>{
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('password');
    //const findResult = await collection.find({}).toArray();
   const findResult = await collection.insertOne(password)
   //res.send(req.body())
   //res.json(findResult)  //to show apiin post in pretty
    res.send({success:true,result:findResult})
})

//Delete a password

app.delete('/',async (req,res)=>{
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('password');
   const findResult = await collection.deleteOne(password)
    res.send({success:true,result:findResult})
})




app.listen(port,()=>{
console.log(`Example app listen on port ${port}`)
})






