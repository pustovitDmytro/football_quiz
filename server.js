var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var db = require('./db.js')
var url = require('./secret.js').url;
var data = require('./quiz.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/quiz/:id", function(req,res){
	console.log(req.params);
})

app.get("/quiz",function(req,res){
	db.get().collection('questions').find().toArray(function(err,arr){
		if(err){
				console.log(err);
				return res.sendStatus(500);
			}
			res.send(arr);
	});
})

app.get('',function(req,res){
	res.send('This Api was created by pustovitDmytro');
})

app.post('/quiz/answer',function(req,res){
	console.log(req.body);
	db.get().collection("questions").update(
		{id : req.body.id},
		{Stats: "[1,0,0]"},
		function(err,res){
			if(err){
				console.log(err);
				return res.sendStatus(500);
			}
			res.sendStatus(200);
		}
		);
	res.sendStatus(200);
})

db.connect(url, function (err) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  }else {
    console.log('Connection established');
	
	app.listen(2000, function(){
		console.log("Api started");
		
	});
  }
});
