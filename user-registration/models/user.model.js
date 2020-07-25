const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: 'name required'
	},
	email: {
		type: String,
		required: 'email required',
		unique: true,
		index: true

	},
	password: {
		type: String,
		required: 'password required'
	},
	saltSecret: String
});


userSchema.method("toJSON", function() {
    const { password, saltSecret, __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });


userSchema.pre('save', function(next){
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(this.password, salt, (err, hash) => {
			this.password = hash;
			this.saltSecret = salt;
			next();
		});
	});
});

mongoose.model('User', userSchema);
