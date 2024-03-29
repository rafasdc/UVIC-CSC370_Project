"use strict";

var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var session    = require('express-session');
var cookieParser = require('cookie-parser')
var favicon    = require('serve-favicon');
var config     = require('./config');
var database   = require('./app/database')

database.connect(config.mysql);

app.use(session({
  secret:'pr0jec7_csc3702016',
  resave: true,
  saveUnintialized: true
}))

app.use(cookieParser('pr0jec7_csc3702016'))

// use the parse to get JSON objects out of the request.
app.use(bodyParser.json());

// server static files from the public/ directory.
app.use(express.static(__dirname+'/public'));

// API ROUTES ------------------------
var apiRoutes = require('./app/routes')(app, express);
app.use('/', apiRoutes);

app.use(favicon('./public/assets/images/favicon.ico'));

app.get("/gettop", function(req,res){
  console.log("GET Request to :/gettop");
  var response;
  var query = database.getConnection().query("SELECT title,SUM(rating) AS 'rating',url FROM posts LEFT JOIN post_ratings ON posts.id = post_ratings.post GROUP BY title,rating,url ORDER BY rating DESC", function(error,results,fields){
  //TODO: change value of 0 to what we consider top AND add sort by descending
    if (error){
      console.log(error);
    } else {
      //console.log(results);
      for(var i = 0; i < results.length; i++) {
        if(!results[i].rating) {
          results[i].rating = 0;
        }
      }
      res.json(results);
    }
  })
});


app.get("/getSubsaiddits", function(req,res){
  console.log("GET Request to :/getSubsaiddits");
  var response;
  var query = database.getConnection().query('SELECT title FROM subsaiddits', function(error,results,fields){
    if (error){
      console.log(error);
    } else {
      //console.log(results);
      res.json(results);
    }
  })
});




//send HTML via get request
app.get("/test",function(req,res){
   return res.sendFile('public/subsaiddit.html',{root: __dirname});
  //res.send({ redirect: '/register.html' });
});

/*
app.post("/testPost",function(req,res){
  console.log("POST to testPost");
  //res.status(302).redirect("/register.html");
});
*/

/*
app.use('/user/:id/:post', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

app.get('/user/:id/:post', function (req, res, next) {
  res.send(req.params.post);
});
*/


app.listen(config.port, function () {
    console.log('Listening on port ' + config.port);
});
