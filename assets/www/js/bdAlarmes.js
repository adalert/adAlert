var db;
function initBDAlarmes() {
	// http://zbutton.wordpress.com/2010/10/16/html5-y-bases-de-datos-locales/
	db = openDatabase("DB Prueba", "0.1", "Database Prueba", 200000);
	if (db) {
		// Database opened
		db.transaction( function(tx) {
			tx.executeSql("CREATE TABLE IF NOT EXISTS parametres(key text primary key, value text)");
			tx.executeSql("INSERT INTO parametres(key, value) VALUES('adreca','http://213.27.242.251:8000/adAlert_WS/adAlert_WS.asmx')");
			tx.executeSql("INSERT INTO parametres(key, value) VALUES('Usuari','usuDispositiu')");
			tx.executeSql("INSERT INTO parametres(key, value) VALUES('Password','usuDispositiu')");
		});
		db.transaction( function(tx) {
			tx.executeSql("CREATE TABLE IF NOT EXISTS alarmesTipus(ID text primary key, NOM text)");
		});
		db.transaction( function(tx) {
			tx.executeSql("CREATE TABLE IF NOT EXISTS edificis(codiEdifici text primary key, Nom text)");
		});
	}
}
  
function listParametres() {
	 db.transaction( function(tx) {
		 var output = [];
		 tx.executeSql("SELECT * FROM parametres", [],
             function(tx, result){
                 for(var i=0; i < result.rows.length; i++) {
                	 output.push([result.rows.item(i)['key'],
                             result.rows.item(i)['value']]);
                 }
                 var div_res = _.template($("#parametres_template").html());
                 $("#parametres").html(div_res({output: output}));
             }
		 );
     });
}

function listAlarmesTipus() {
	db.transaction( function(tx) {
		 var output = [];
		 tx.executeSql("SELECT * FROM alarmesTipus", [],
            function(tx, result){
                for(var i=0; i < result.rows.length; i++) {
               	 output.push([result.rows.item(i)['ID'],
                            result.rows.item(i)['NOM']]);
                }
                
                listEdificis(output);
            }
		 );
    });
}

function listEdificis(output) {
	db.transaction( function(tx) {
		 var outputEdif = [];
		 tx.executeSql("SELECT * FROM edificis", [],
            function(tx, result){
			 	for(var i=0; i < result.rows.length; i++) {
                	outputEdif.push([result.rows.item(i)['codiEdifici'],
                            result.rows.item(i)['Nom']]);
                }
			 	outputEdif.push(['TOTS','TOTS']);
			 	
                var div_res = _.template($("#alarmes_template").html());
                $("#alarmes").html(div_res({output: output,
                	outputEdif: outputEdif}));
                
                if(result.rows.length==1){
                	$("#divEdificis").hide();
                } else {
                	$("#divEdificis").show();
                }
                
                $("#alarmes").show();
            }
		 );
    });
}
 
function addParametre(pKey, pValue) {
	db.transaction( function(tx) {
		tx.executeSql("INSERT INTO parametres(key, value) VALUES(?,?)", [pKey, pValue]);
	});
		
	listParametres();
}
 
function removeParametre(pKey) {
	db.transaction(function(tx) {
		tx.executeSql("DELETE FROM parametres WHERE key = ?", [pKey], listParametres);
	});
}

function modifParametre(pKey, pValue) {
	db.transaction(function(tx) {
		tx.executeSql("UPDATE parametres SET value = ? WHERE key = ?", [pValue, pKey]);
	});
	
	listParametres();
	
}

function addAlarmesTipus(pKey, pValue) {
	db.transaction( function(tx) {
		tx.executeSql("DELETE FROM alarmesTipus");
		tx.executeSql("INSERT INTO alarmesTipus(ID, NOM) VALUES(?,?)", [pKey, pValue]);
	});
}

function addEdificis(pKey, pValue) {
	db.transaction( function(tx) {
		tx.executeSql("DELETE FROM edificis");
		tx.executeSql("INSERT INTO edificis(codiEdifici, Nom) VALUES(?,?)", [pKey, pValue]);
	});
}
