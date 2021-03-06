var auth  = require('./auth'),
    users = require('../controllers/users');

module.exports = function(app){

    app.get('/api/users',auth.requiresRole('admin'),users.getUsers);
    app.post('/api/users',users.createUser);

    app.get('/partials/*',function(req,res){
        res.render('../../public/app/'+req.params[0]);
    });

    app.post('/login',auth.authenticate);
    app.post('/logout',auth.logout);

    app.get('*',function(req,res){
        res.render('index',{bootstrappedUser : req.user});
    });
};

