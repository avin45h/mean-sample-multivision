var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');


var userSchema = mongoose.Schema({
    firstName: {type: String, required : '${PATH} is required'},
    lastName: {type: String, required : '${PATH} is required'},
    userName: {type: String, required : '${PATH} is required', unique:true},
    salt: {type: String, required : '${PATH} is required'},
    hashed_pwd: {type: String, required : '${PATH} is required'},
    roles: [String]
});


userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers(){
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'igdefault');
            User.create({firstName: 'Avinash', lastName: 'Verma', userName: 'avin45h', salt: salt, hashed_pwd: hash, roles: ['admin']});
            User.create({firstName: 'Avinash1', lastName: 'Verma1', userName: 'avin45h1', salt: salt, hashed_pwd: hash, roles: []});
            User.create({firstName: 'Avinash2', lastName: 'Verma2', userName: 'avin45h2', salt: salt, hashed_pwd: hash});
        }
    });
};

exports.createDefaultUsers = createDefaultUsers;