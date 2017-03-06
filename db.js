
var MongoClient = require('mongodb').MongoClient,
assert = require('assert');

var state = {
	db: null
};

exports.test = function(){
	console.log("test");
	insertDocuments(state.db,function(err){
		if(err){
			console.log(err);
		}
	})

}

var insertDocuments = function(db, callback) {
  var collection = db.collection('documents');
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}


exports.getQuestion = function(num){
	assert(state.db,"DB is not connected"); 
	console.log("getting question ",num);
	var collection = state.db.collection('questions');
	collection.find({'id': num}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log(docs);
    return docs;
  });      

}


var importData = function(db, arr){
	for(a in arr){
		db.collection('questions2').insert(arr[a],function(err,result){
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

exports.get = function(){
	return state.db; 
}