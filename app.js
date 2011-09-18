var express		= require('express'),
	sys 		= require('sys'),
	mysql		= require('mysql'),
	config 		= require('./config').config,
	dateFormat 	= require('dateformat'),
	app 		= module.exports = express.createServer(),
	db			= mysql.createClient(config.mysql_information);

app.configure(function(){
	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'))
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

db.query('USE ' + config.mysql_information.database);

/* Load Routes */
require('./routes/bill')(app, db, config, dateFormat);
require('./routes/root')(app, db, config, dateFormat);


app.listen(config.port);