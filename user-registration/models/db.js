const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, (err) => {
	if(!err){
		console.log('connected to db');
	}else{
		console.log('failed to connect db' + JSON.stringify(err, undefined, 2));
	}
});

require('./user.model');
