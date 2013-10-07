/**
 * adAlert.js
 * Llibreria de funcions de adAlert
 * (c) 2013 
**/

var WIN_MENU = "botonera";
var WIN_INFO_TELEFON = "infoTelefon";
var WIN_PARAMETRES = "parametres";
var WIN_ALARMES = "alarmes";
var WIN_WS ="recepcio";

var app = (function() {
    var phoneType = "";
    var deviceId = "";
    var deviceSoftwareVersion = "";
    var line1Number = "";
    var subscriberId = "";
    var simState = "";
    var simCountryIso = "";
    var simOperatorName = "";
    var simSerialNumber = "";
    var networkCountryIso = "";
    var networkOperator = "";
    var networkOperatorName = "";
	
	return {	
	    // Application Constructor
	    initialize: function() {
	        this.bindEvents();
	    },
	    // Bind Event Listeners
	    //
	    // Bind any events that are required on startup. Common events are:
	    // 'load', 'deviceready', 'offline', and 'online'.
	    bindEvents: function() {
	        document.addEventListener('deviceready', this.onDeviceReady, false);
	        //document.addEventListener("backbutton", this.onBackKeyDown, false);	        
	    },
	    // deviceready Event Handler
	    //
	    // The scope of 'this' is the event. In order to call the 'receivedEvent'
	    // function, we must explicity call 'app.receivedEvent(...);'
	    onDeviceReady: function() {
	    	initBDAlarmes();
	    	connexWS();
	    	app.activa("botonera");
	    	
	        window.plugins.phoneinfoplugin.onSuccess = function(data) {
				if (data.action == "getPhoneInfo") {
				    phoneType = data.getPhoneType; 
				    deviceId = device.uuid;
				    deviceSoftwareVersion = data.getDeviceSoftwareVersion; 
				    line1Number = data.getLine1Number; 
				    subscriberId = data.getSubscriberId;
				} else {
					if (data.action == "getSIMInfo") {
					    simState = data.getSimState;
					    simCountryIso = data.getSimCountryIso;
					    simOperatorName = data.getSimOperatorName;
					    simSerialNumber = data.getSimSerialNumber;
					} else {
					    networkCountryIso = data.getMetworkCountryIso;
					    networkOperator = data.getMetworkOperator;
					    networkOperatorName = data.getMetworkOperatorName;						
					}
				}
			};
			
			window.plugins.phoneinfoplugin.onError = function(data) { };
			
	    	window.plugins.phoneinfoplugin.getPhoneInfo();
			window.plugins.phoneinfoplugin.getSIMInfo();
			window.plugins.phoneinfoplugin.getNetworkInfo();

			window.setInterval(RecibeAlarmas, 30000, deviceId); //30 segons

			obtenirDadesUsuari(deviceId);
			
			document.addEventListener("backbutton", app.onBackKeyDown, false);

	    },
	    
	    onBackKeyDown: function() {
	    	//De moment, farem que al intentar tornar a enrere, l'aplicacio no faci res
	    	//alert('Has apretado el boton atras');
	    },
	    	    
	    // Menú prinicpal
	    menu: function() {
	    	app.activa(WIN_MENU);
	    },
	    
	    // Menú alarmes
	    alarmes: function() {
	    		    	
	    	listAlarmesTipus();
	    		    	
	    	app.activa(WIN_ALARMES);
	    },

	    // Paràmetres de l'aplicació
	    parametres: function() {
	    	listParametres();
	    	
	    	app.activa(WIN_PARAMETRES);
	    },
	    
	    ws: function() {
	    	connexWS();
	    	
	    	app.activa(WIN_WS);
	    },
	    
	    enviamentAlarma: function() {
    	
			var option;
			var missatge;
			var edifici="";
			
	    	$('option[id^="t"]').each(function() {
	    		if ($(this).attr("selected")){
	    			option = ($(this).val());
	    		}
	    	});	
	    	
	    	$('textarea[id^="t"]').each(function() {
	    		missatge = ($(this).val());
	    	});
	    	
	    	$('option[id^="e"]').each(function() {
	    		if ($(this).attr("selected")){
	    			if(!($(this).val())=="TOTS"){
	    				edifici = ($(this).val());
	    			}
	    		}
	    	});	
	    	

	    	console.log(deviceId);
	    	
	    	if ($("#usuEdificis").text()=='No es troba dispositiu'){
	    		alert('No pot enviar alarmes. No es troba el dispositiu a la BBDD.');
	    	} else {
	    		enviar(deviceId,option,edifici,missatge);
	    	}
	    	
	    	app.activa(WIN_MENU);
	    },
	    
	    
	    
	    modifParametres: function(){
	    	
	    	$('textarea[id^="t"]').each(function() {
	    		console.log($(this).attr("id").substring(1));
	    		console.log($(this).val());
	    		modifParametre($(this).attr("id").substring(1), $(this).val());
	    	});
	    	
	    	$('input[id^="t"]').each(function() {
	    		console.log($(this).attr("id").substring(1));
	    		console.log($(this).val());
	    		modifParametre($(this).attr("id").substring(1), $(this).val());
	    	});

	    	window.plugins.phoneinfoplugin.getPhoneInfo();
	    	obtenirDadesUsuari(deviceId);	
	    	
	    	app.activa(WIN_PARAMETRES);
	    },
	    
	    compruebaAlarmas: function(obj){
	    	var output = [];
	    
	    	$(obj).find('Alarm').each(function( index ) {
	    		//output.push(['Alarma ',index+1]);
	    		if($(this).find('IDAprovador').text()=='00'){
	    			output.push(['Alarma ',index+1]);
	    			output.push(['Edifici', $(this).find('Edifici').text()]);
	    			output.push(['Data i Hora', $(this).find('dataHora').text()]);
		    		output.push(['Tipus Alarma', $(this).find('TipusAlarma').text()]);
		    		output.push(['Missatge', $(this).find('Missatge').text()]);
		    		output.push(['Emissor', $(this).find('Nom').text()]);
		    		output.push(['Ubicacio', $(this).find('UbicacioE').text()]);
		    		output.push(['Area', $(this).find('AreaE').text()]);
		    		output.push([' ',' ']);
		    		output.push([' ',' ']);
	    		} else {
	    			output.push(['Falsa Alarma ',index+1]);
	    			output.push(['Edifici', $(this).find('Edifici').text()]);
	    			output.push(['Data i Hora', $(this).find('dataHora').text()]);
		    		output.push(['Tipus Alarma', $(this).find('TipusAlarma').text()]);
		    		output.push(['Missatge', $(this).find('text_FalsaAlarma').text()]);
		    		output.push(['Aprovador', $(this).find('NomAprovador').text()]);
		    		output.push(['Ubicacio', $(this).find('UbicacioA').text()]);
		    		output.push(['Area', $(this).find('AreaA').text()]);
		    		output.push([' ',' ']);
		    		output.push([' ',' ']);
	    		}
	    	});
    		
	    	var div_res = _.template($("#recepcio_template").html());
	    	$("#recepcio").html(div_res({output: output}));
	    	$("#recepcio").show();
	    	
	    	app.logoWithConnection();
	    	
	    	app.activa(WIN_WS);
	    },
	    
	    // Informació telèfon
	    infoTelefon: function() {
	    	var div_res;
	
			div_res = _.template($("#infoTelefon_template").html());
			$("#infoTelefon").html(div_res({deviceName: device.name, 
			        deviceCordova: device.cordova, 
			        devicePlatform: device.platform, 
			        deviceUUID: device.uuid, 
			        deviceVersion: device.version, 
			        phoneType: phoneType,
			        deviceId: device.getDeviceId,
			        deviceSoftwareVersion: deviceSoftwareVersion, 
			        line1Number: line1Number,
			        subscriberId: subscriberId,
			        simState: simState,
			        simCountryIso: simCountryIso,
			        simOperatorName: simOperatorName,
			        simSerialNumber: simSerialNumber,
			        networkCountryIso: networkCountryIso,
			        networkOperator: networkOperator,
			        networkOperatorName: networkOperatorName} ));

			app.activa(WIN_INFO_TELEFON);
	    },
	    
		// Muestra en el logo de la APP indicando que SI tiene conexión.
		logoWithConnection: function(){
		  	var logo = $('#logoApp');
		   	if( logo.hasClass('twinkle') ){
		    	logo.attr('src', 'img/logo.png');
		    	logo.removeClass('twinkle');
		    	$('.headerNoConnectionTxt').hide();
		    	$('.headerLogo').show();
		    }
		    return true;
		},
	    
		// Muestra en el logo de la APP indicando que NO tiene conexión.
		logoWithoutConnection: function(){
		    var logo = $('#logoApp');
		    if( !logo.hasClass('twinkle') ){
			   	logo.attr('src', 'img/logo_rojo.png');
			   	logo.addClass('twinkle');
			   	$('.headerNoConnectionTxt').show();
			}
		    return true;
		},
	    
	    activa: function(obj) {
	    	$("#botonera").hide();
	    	$("#infoTelefon").hide();
	    	$("#parametres").hide();
	    	$("#alarmes").hide();
	    	$("#recepcio").hide();
	    		    	
	    	$("#" + obj).show();
	    }
  	}    
}());
