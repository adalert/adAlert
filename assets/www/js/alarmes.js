var db;
 
function connexWS() {
	//Connectem al WS per baixar tipus d'alarmes
	var sURL;
	db.transaction( function(tx) {
		 tx.executeSql("SELECT * FROM parametres WHERE key='adreca'", [],
             function(tx, result){
			 	alert(result.rows.item(0)['value']);
			 	sURL = result.rows.item(0)['value'] + "/GetTypeAlarms";
			 	alert(sURL);
			 	$.ajax({
					url: sURL,
			        type: "POST",
			        dataType: "xml",
			        data: "",
			        contentType: "text/xml; charset=\"utf-8\"",
			        success: OnSuccess,
			        error: OnError
			    });
             }
		 );
     });
}

function OnSuccess(data, status)
{
    var output = [];
   
    $(data).find('Type').each(function( index ) {
    	addAlarmesTipus($(this).find('ID').text(), $(this).find('NOM').text()); 	
    });
}

function OnError(request, status, error)
{
	alert('Error intentant connectar amb el WebService');
}  

function enviar(pDispositiu,pTipus,pMsg){
	var sURL;
	db.transaction( function(tx) {
		 tx.executeSql("SELECT * FROM parametres WHERE key='adreca'", [],
             function(tx, result){
			 	alert(result.rows.item(0)['value']);
			 	sURL = result.rows.item(0)['value'] + "/SendAlarm";
			 	alert(sURL);
			 	$.ajax({
					url: sURL,
			        type: "POST",
			        dataType: "html",
			        data: {pIdDispositiu : pDispositiu, pTypeAlarm : pTipus, pMissatge : pMsg},
			        contentType: "text/xml; charset=\"utf-8\"",
			        success: GravacioOnSuccess,
			        error: GravacioOnError
			    });
             }
		 );
     });

}

function GravacioOnSuccess(data, status)
{
	alert('Missatge enviat correctament!')
}

function GravacioOnError(request, status, error)
{
	alert('Error intentant connectar amb el WebService');
}

 

