const express = require('express');
const mustache = require('mustache-express');
const app = express();
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/restaurants';

/// Before you run this, run this to load
///
//curl -o primer-dataset.json https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json
//mongoimport --db restaurants --collection restaurants --file primer-dataset.json



app.listen(3000);

app.get('/', function(req,res){

  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw err;
    } else {
      console.log('Successfully connected to the database');
    }

    db.collection('restaurants')
      .find({"grades.grade": {$nin: ["A"]}})
      .limit(100)
      .toArray( function(err, documents){

        console.log(documents)

        // res.json(documents)

        res.render("index", {restaurants: documents})
      })
  })


});
