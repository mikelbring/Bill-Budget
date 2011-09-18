var express = require('express'),
    sys = require('sys');

var Sequelize = require("sequelize")		
var sequelize = new Sequelize('blog', 'root', '', {
	host: '127.0.0.1'
});

/* Configure Application */
var app = module.exports = express.createServer();

app.configure(function(){
	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public'))
});


/* Models */
var Post = sequelize.define('post',{}, {
	timestamps: false
});

/* Root Routes */
app.get('/', function(req, res){

	Post.find(1).on('success', function(post){
		res.send(post.body);
	});

});

app.listen(4000);