var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var db = require('./db.js')
var url = require('./secret.js').url;
//var data = require('./quiz.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', (process.env.PORT || 5000));

app.get("/quiz/:id", function(req,res){
	db.getQuestion(Number(req.params.id),res)
})

app.get("/quiz",function(req,res){
	db.getAll(res);
})

app.get('',function(req,res){
	res.send('This Api was created by pustovitDmytro');
})

app.post('/quiz/answer',function(req,res){
	db.takeIntoAccount(Number(req.body.id), Number(req.body.answer),res);
})

db.connect(url, function (err) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  }else{
    console.log('Connection established');	
	app.listen(app.get('port'), function() {
  		console.log('Node app is running on port', app.get('port'));
	});

  }
})