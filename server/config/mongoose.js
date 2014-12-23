var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error........'));
    db.once('open', function callback() {
        console.log('DB connection established');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });


    userSchema.methods = {
        authenticate: function (passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    };

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'igdefault');
            User.create({firstName: 'Avinash', lastName: 'Verma', userName: 'avin45h', salt: salt, hashed_pwd: hash, roles: ['admin']});
            User.create({firstName: 'Avinash1', lastName: 'Verma1', userName: 'avin45h1', salt: salt, hashed_pwd: hash, roles: []});
            User.create({firstName: 'Avinash2', lastName: 'Verma2', userName: 'avin45h2', salt: salt, hashed_pwd: hash});
        }
    });
};


var createSalt = function () {
    return crypto.randomBytes(128).toString('base64');
};

var hashPwd = function (salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
};