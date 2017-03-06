
var MongoClient = require('mongodb').MongoClient,
assert = require('assert');

var state = {
	db: null
};

exports.takeIntoAccount = function(num,ans){
	assert(state.db,"DB is not connected");
	var current;
	var collection = state.db.collection('questions');
	collection.find({'id': num}).toArray(function(err, docs) {
		console.log("err");
    	assert.equal(err, null);
    	console.log("docs");
    	current = docs.Stats;   
	});
	console.log(current);
	current[ans]+=1;    
	collection.updateOne({ 'id' : num }
    , { $inc: {Stats: current} }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Succesfully apdated");
    return result;
  });  
}


exports.getQuestion = function(num){
	assert(state.db,"DB is not connected"); 
	console.log("getting question ",num);
	var collection = state.db.collection('questions');
	var question;
	collection.find({'id': num}).toArray(function(err, docs){
    	assert.equal(err, null);
    	question = docs;
    	console.log(question);
  });
return question;
}

exports.importData = function(arr){
	assert(state.db,"DB is not connected"); 
	for(a in arr){
		state.db.collection('questions').insert(arr[a],function(err,result){
			if(err){
				return console.log(err);
			}
			console.log("data imported succesfully");
		})
	} 
}

exports.connect = function(url,done){
 	if(state.db){
 		return done();
 	}
 	MongoClient.connect(url,function(err,db){
 		if(err){
 			return done(err);
 		}
 		state.db = db;
 		done();
 	});

}