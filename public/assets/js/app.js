$(function(){

	$('.datepicker').datepicker();

});

function toggle_bill(id, action){
	
	$.post('/bill/' + id + '/toggle/' + action, function(data){
		if(action == 1){
			$('#bill' + id + ' .status').html('<span class="label success">Paid</span>')
		}else{
			$('#bill' + id + ' .status').html('');
		}
	});
}