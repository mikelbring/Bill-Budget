module.exports = function(app, db, config, dateFormat){

	/**
	 * Create a new bill
	 **/
	app.get('/bill/new', function(req, res){
		res.render('bill/new');
	});
	
	app.post('/bill/new', function(req, res){
		
		var data = req.body;
		var date = Date.parse(data.date);
		
		var values = [
			data.name,
			data.amount,
			dateFormat(date, 'yyyy-mm-dd  00:00:00')
		];
		
		console.log('Date: ' + dateFormat(date, 'yyyy-mm-dd 00:00:00'));
		
		db.query('INSERT INTO `bills` (name, amount, date) VALUES (?, ?, ?)', values, function(err, info){
			
			if(err){
				console.log(err)
			}else{
				res.redirect('/');
			}

		});
	});
	
	/**
	 * Change bill's paid status
	 * Called with ajax
	 **/
	app.post('/bill/:id/toggle/:action', function(req, res){
		
		var id = req.params.id;
		var action = req.params.action;
		
		db.query('UPDATE bills SET paid = ? WHERE id = ? LIMIT 1', [action, id], function(err, info){
			if(err){
				console.log(err)
			}
			
			res.send('Action: ' + action);
		});
		
	});

};