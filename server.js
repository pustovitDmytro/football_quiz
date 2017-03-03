var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();

var url = require('./secret.js').url;

questions = [
{	id: 0,
	question: "1",
	Var: ["A","B","C"],
	Ans:[0,0,0]
},
{	id: 1,
	question: "2",
	Var: ["A","B","C","D"],
	Ans:[0,0,0,0]
},
{	id: 2,
	question: "3",
	Var: ["A","B"],
	Ans:[0,0]
},
];

app.get("/quiz/:id", function(req,res){
	var quest = questions.find(function(q){
		return q.id=== Number(req.params.id)
	});
	res.send(quest)
})

app.get("/quiz",function(req,res){
	res.send(questions)
})

app.get('',function(req,res){
	res.send('Hello Api');
})

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to');
    // do some work here with the database.
	app.listen(3012, function(){
		console.log("Api started");
	})
    //Close connection
    db.close();
  }
});
