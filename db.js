var MongoClient = require('mongodb').MongoClient,
assert = require('assert');
var state = {
	db: null
};
exports.takeIntoAccount = function(num,ans,res){
	var collection = this.getCollection();
	var obj = JSON.parse('{ "Stats.'+ans+'":1 }');
	collection.updateOne({ 'id' : num }
    , { $inc: obj }, function(err, result) {
   		if(err){
				console.log(err);
				return res.sendStatus(500);
			}
			res.sendStatus(200)
    	console.log("Succesfully updated");
  });  
}
exports.getCollection = function(){
	return state.db.collection('questions');
}
exports.getQuestion = function(num,res){
	collection = this.getCollection();
	collection.find({'id': num}).toArray(function(err, docs){
    	if(err){
				console.log(err);
				return res.sendStatus(500);
			}
			res.send(docs);
});

}
exports.getAll = function(res){
	collection = this.getCollection();
	collection.find().toArray(function(err,arr){
		if(err){
				console.log(err);
				return res.sendStatus(500);
			}
			res.send(arr);
	});
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