var dateFormat = require('dateFormat');

module.exports.get_next_month = function(date){
	
	var next_month = +dateFormat(date, 'm') + 1;
	
	if(next_month > 12){
		return {
			year: +dateFormat(date, 'yyyy') + 1,
			month: 1
		}
	}else{
		return {
			year: dateFormat(date, 'yyyy'),
			month: next_month
		}
	}
	
}
	
module.exports.get_previous_month = function(date){
	var previous_month = +dateFormat(date, 'm') - 1 ;
	
	if(previous_month < 1){
		return {
			year: +dateFormat(date, 'yyyy') - 1,
			month: 12
		}
	}else{
		return {
			year: dateFormat(date, 'yyyy'),
			month: previous_month
		}
	}
}
	
module.exports.build_bills = function(results){
	var bills 			= [],
		total_overdue 	= 0,
		total_paid		= 0,
		date 			= new Date();

	results.forEach(function(bill){
		bill.date  = Date.parse(bill.date);
	
		if(date > bill.date && bill.paid == 0){
			bill.overdue = true;
			total_overdue = total_overdue + bill.amount;
		}else{
			bill.overdue = false;
			total_paid = total_paid + bill.amount;
		}

		bills.push(bill);
	});

	return {
		results: bills,
		total_overdue: total_overdue,
		total_paid: total_paid,
		total: total_paid + total_overdue
	}
}
