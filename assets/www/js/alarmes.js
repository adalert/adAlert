var db;

function connexWS() {
	// Connectem al WS per baixar tipus d'alarmes
	var sURL;
	db.transaction( function(tx) {
		 tx.executeSql("SELECT * FROM parametres WHERE key='adreca'", [],
             function(tx, result){
			 	sURL = result.rows.item(0)['value'] + "/GetTypeAlarms";
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

function OnSuccess(data, status) {
    var output = [];
   
    $(data).find('Type').each(function( index ) {
    	addAlarmesTipus($(this).find('ID').text(), $(this).find('NOM').text()); 	
    });
    
    app.logoWithConnection();
}

function OnError(request, status, error) {
	app.logoWithoutConnection();
	
}  

function obtenirDadesUsuari(pidDispositiu) {
	//Connectem al WS per baixar l'edifici al qual pertany l'usuari
	var sURL;
	db.transaction( function(tx) {
		 tx.executeSql("SELECT * FROM parametres", [],
             function(tx, result){
			 	sURL = result.rows.item(0)['value'] + "/GetUserData";
			 	$.ajax({
					url: sURL,
			        type: "POST",
			        dataType: "xml",
			        data: {pUser: result.rows.item(1)['value'], pDispositiu: pidDispositiu},
			        success: DadesUsuOnSuccess,
			        error: DadesUsuOnError
			    });
             }
		 );
    });
}

function DadesUsuOnSuccess(data, status) {
	var edifici = "";
	var usuari = ""
	
	$("#usuEdificis").html(edifici);
	$("#usuNom").html(usuari);
	
	$("#usuNom").html($(data).find('Usu').text());

	$(data).find('Edifici').each(function( index ) {
		if(edifici=='')
			edifici = $(this).find('Nom').text();
		else
			edifici = edifici + ', ' + $(this).find('Nom').text();
    });

	if (edifici=='00') {
		edifici = 'No es troba dispositiu';
	} 
	
	$("#usuEdificis").html(edifici);
	
	if(edifici == 'No es troba dispositiu'){
		app.logoWithoutConnection();
	} else {
		app.logoWithConnection();	
	}
}

function DadesUsuOnError(request, status, error) {
	//alert('Error intentant connectar amb el WebService per obtenir Edificis');
	app.logoWithoutConnection();
}  

function enviar(pidDispositiu, pTipus, pMsg) {
	var sURL;
	
	db.transaction( function(tx) {
		tx.executeSql("SELECT * FROM parametres", [],
             function(tx, result){
			 	sURL = result.rows.item(0)['value'] + "/SendAlarm";
			 	$.ajax({
					url: sURL,
			        type: "POST",
			        data: {pDispositiu : pidDispositiu, pTypeAlarm : pTipus, pMissatge : pMsg, pUsu : result.rows.item(1)['value'], pPass : result.rows.item(2)['value']},
			        success: EnviamentOnSuccess,
			        error: EnviamentOnError
			    });
             }
		 );
	});
}

function EnviamentOnSuccess(data, status) {
	//alert('Missatge enviat correctament!');
	app.logoWithConnection();
}

function EnviamentOnError(request, status, error) {
	app.logoWithoutConnection();
	alert('Error: ' + $(error));
	alert('Request: ' + request.responseText);
	alert('status: ' + status);
}

function RecibeAlarmas(pIdDispositiu) {
	// Connectem al WS per baixar alarmes	
	var sURL;

	db.transaction( function(tx) {
		 tx.executeSql("SELECT * FROM parametres", [],
            function(tx, result){
			 	sURL = result.rows.item(0)['value'] + "/GetAlarms";
			 	$.ajax({
					url: sURL,
			        type: "POST",
			        dataType: "xml",
			        data: {pIdDispositiu: pIdDispositiu},
			        success: RecibeOnSuccess,
			        error: RecibeOnError
			    });
            }
		 );
   });
}

function RecibeOnSuccess(data, status) {
	var texto;
	var vacia = false;
	
	if($(data).find('Alarm').length>1){
		texto = $(data).find('Alarm').length + ' missatges nous';
	}else{
		texto = $(data).find('Alarm').length + ' missatge nou';
		if($(data).find('TipusAlarma').text()=='00'){ //Si el tipus de alarma es 00, quiere decir que NO hay mensaje.
			vacia = true;
		}
	}
	
	if(vacia==false) {
		navigator.notification.vibrate(2000);
		
		window.plugins.statusBarNotification.notify('Noves notificacions rebudes', {
		   body: texto,
		   tag: 'download',
		   onclick: function() {
				app.compruebaAlarmas($(data));
				//$(data).find('Alarm').each(function( index ) {
				//	app.compruebaAlarmas(this);
				//});
		   }
		});
		
		navigator.notification.beep(1);	
	}
	
	app.logoWithConnection();
}

function RecibeOnError(request, status, error) {
	//alert("Error intentant connectar amb el WebService per rebre missatges.\n(" + error + ")");
	app.logoWithoutConnection();
}
 


