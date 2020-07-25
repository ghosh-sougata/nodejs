const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports.addUser = (req, res, next) =>{
	console.log('inside register function');
	var user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.password = req.body.password;
	
	user.save( (err, doc) =>{
		if(!err){
			res.send(doc);
		}
		else{
			console.log(err);
			if(err.code == 11000){
				res.status(422).send(['duplicate email found']);
			}else{
				next(err);	
			}
		}
	});
}

module.exports.getUser = (req, res, next) =>{
	console.log('inside get user');
	User.findById(req.params.id, function (err, docs) { 
    	if (err){ 
        	console.log(err); 
		next(err);
	} 
    	else{ 
        	console.log("Result : ", docs); 
		if(docs == null){
                        res.status(404).send(['user not found']);
                }else{
                        res.json(docs);
                }
    	} 
	}); 

}

module.exports.deleteUser = (req, res, next) =>{
        console.log('inside delete user');
        User.remove({_id:req.params.id}, function (err, result) {
        if (err){
                console.log(err);
		next(err);
        }
        else{
		if(result.deletedCount == 0){
			res.status(404).send(['user not found']);
		}else{
                	res.json(result);
		}
        }
        });

}

