// console.log('may node be with you');
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const uri = "mongodb+srv://dbRainUser:Pbvt3OX8TwOcwNg7@cluster0.kut1l.mongodb.net/dbDrops?retryWrites=true&w=majority";
const dbConnectionString = process.env.MONGODB_URI || uri;
console.log(process.env.MONGODB_URI);
//we need the bodyParser to parse the data coming with the html form
app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:'1mb'}));
//make it able to read JSON
// app.use(bodyParser.json());
//make a use of the public folder for the static files
app.use(express.static('public'));
MongoClient.connect(dbConnectionString,{ useNewUrlParser: true, useUnifiedTopology: true})
  .then(client=>{
    console.log('Connected to Database');
    const db = client.db('dbDrops');
    const collection = db.collection('raindots');

    app.get('/raindots', (req, res) => {
      //do something
      // res.sendFile(__dirname + '/public/');
      db.collection('raindots').find().toArray()
        .then(results =>{
          console.log(results);
          res.json(results);
          // res.render('index.ejs',{turtles:results})
        })
        .catch(error=>console.error(error));

    })
    app.post('/raindots',(req,res)=>{
      console.log(req.body);
      collection.insertOne(req.body)
        .then(result=>{
          console.log(result);
          res.json(result);
          // res.redirect('/')
        })
        .catch(error => console.error(error));
    })
  })
  .catch(error => console.error(error));

app.listen(port, function(){
  console.log(`listening on ${port}`);
})
