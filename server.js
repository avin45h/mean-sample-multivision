var express = require('express'),
    stylus = require('stylus'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;

var app = express();

var compile = function(str,path){
  return stylus(str).set('filename',path);
};

app.set('port', process.env.PORT || port);

app.set('views',__dirname + '/server/views');
app.set('view engine', 'jade');

//set up static, body parser
app.use(express.static(__dirname + '/public'));

//set up stylus
app.use(stylus.middleware({
    src : __dirname + '/public',
    compile : compile
})
);

mongoose.connect("mongodb://localhost/multivision");
var db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error........'));
db.once('open', function callback(){
    console.log('DB connection established');
});


app.get('/partials/*',function(req,res){
    res.render('../../public/app/'+req.params[0]);
});




app.get('*',function(req,res){
    res.render('index');
});


app.listen(app.get('port'),function(){
    console.log('Express started on http://localhost:'+app.get('port')+';');
});