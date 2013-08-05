var db;
 
function initBDAlarmesTipus() {
	// http://zbutton.wordpress.com/2010/10/16/html5-y-bases-de-datos-locales/
	db = openDatabase("DB Prueba", "0.1", "Database Prueba", 200000);
	if (db) {
		// Database opened
		db.transaction( function(tx) {
			tx.executeSql("CREATE TABLE IF NOT EXISTS alarmesTipus(key text primary key, value text)");
			tx.executeSql("INSERT INTO alarmesTipus(key, value) VALUES('88','Sanitària')");
			tx.executeSql("INSERT INTO alarmesTipus(key, value) VALUES('89','Agressió')");
		});
	}
}

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
 

