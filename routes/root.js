module.exports = function(app, db, config, dateFormat){
	
	var bills = require('../lib/bills');
	
	/**
	 * Loads bills from current month
	 **/
	app.get('/', function(req, res){
		
		var date = new Date();

		db.query('SELECT * FROM bills WHERE MONTH(date) = ? ORDER BY date ASC', [dateFormat(date, 'm')], function(error, results, fields){

			res.render('root', {
				locals: {
					bills: bills.build_bills(results),
					date: date,
					dateFormat: dateFormat,
					month: dateFormat(date, 'mmmm yyyy'),
					next: bills.get_next_month(date),
					previous: bills.get_previous_month(date)
				}
			});
		});
			
	});
	
	/**
	 * Loads bills from given month and year
	 **/
	app.get('/:year/:month', function(req, res){
		var date = Date.parse(req.params.month + '/1/' + req.params.year);
		
		var query = db.query('SELECT * FROM bills WHERE MONTH(date) = ? AND YEAR(date) = ? ORDER BY date ASC', [dateFormat(date, 'm'), dateFormat(date, 'yyyy')], function(error, results, fields){
			
			res.render('root', {
				locals: {
					bills: bills.build_bills(results),
					dateFormat: dateFormat,
					month: dateFormat(date, 'mmmm yyyy'),
					next: bills.get_next_month(date),
					previous: bills.get_previous_month(date)
				}
			});
			
		});
		
	});
	
}
