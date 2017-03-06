
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
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  console.log("collection")
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

exports.importData = function(arr){
	for(a in arr){
		state.db.collection('questions2').insert(arr[a],function(err,result){
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