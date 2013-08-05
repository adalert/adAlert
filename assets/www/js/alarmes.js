var db;
 
function carregaMenu() {
	db.transaction( function(tx) {
		 var output = [];
		 tx.executeSql("SELECT * FROM alarmesTipus", [],
           function(tx, result){
               for(var i=0; i < result.rows.length; i++) {
              	 output.push([result.rows.item(i)['key'],
                           result.rows.item(i)['value']]);
               }
               var div_res = _.template($("#alarmes_template").html());
               $("#alarmes").html(div_res({output: output}));
           }
		 );
   });
}
 

