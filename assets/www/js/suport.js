/**
 * suport.js
 * Funcions de suport generals
 * (c) 2013, moga 
**/



/* -----------------------
 * Funcions de sistema
 */
 

/**
 * Funci� gen�rica per obtenir l'enlla� a un element HTML
 **/
function getElement(id) {
  return document.getElementById(id);
}

/**
 * Incorpora un temps sense activitat
 * @param milisegons - Temps de bloqueig
 **/
function sleep(milisegons) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milisegons){
      break;
    }
  }
}



/* -----------------------
 * Tractament de cadenes
 */


/**
 * Depura una cadena substituint car�cters especials i codificats
 * @param text - Cadena a tractar
 **/
function formataText(text) {
	// Tractament de la marca de CR
	while (text.toString().indexOf("$(n)$") != -1)
		text = text.toString().replace("$(n)$", "<br/>");
	
	// Tractament de la marca de mail
	coincidencia = text.toString().indexOf("$(mail:");
	while (coincidencia != -1) {
		mail = text.substr(coincidencia + 7, text.indexOf(")$", coincidencia) - coincidencia - 7);
		mailCurt = mail;
		if (mailCurt.length > 25) mailCurt = mailCurt.substr(1, 25) + "...";
		text = text.replace("$(mail:" + mail + ")$", "<a href='mailto:" + mail + "'>" + mailCurt + "</a>");
		
		coincidencia = text.indexOf("$(mail:");
	}

	// Tractament de la marca de web
	coincidencia = text.toString().indexOf("$(web:");
	while (coincidencia != -1) {
		web = text.substr(coincidencia + 6, text.indexOf(")$", coincidencia) - coincidencia - 6);
		webCurt = web;
		if (webCurt.length > 25) webCurt = webCurt.substr(1, 25) + "...";
		text = text.replace("$(web:" + web + ")$", "<a href='" + web + "'>" + webCurt + "</a>");
		
		coincidencia = text.indexOf("$(web:");
	}

	return text;
}

/**
 * Talla un text en files/columnes
 * @param str - Cadena a tractar
 * @param width - Ample del par�graf
 * @param brk - Cadena que sincorpora al tall de l'ample
 * @param cut - boole�. Amb true talla paraules. Amb false respecta paraules
 */ 
function wordwrap( str, width, brk, cut ) {
    brk = brk || '\n';
    width = width || 75;
    cut = cut || false;
 
    if (!str) { return str; }
 
    var regex = '.{1,' +width+ '}(\\s|$)' + (cut ? '|.{' +width+ '}|.+$' : '|\\S+?(\\s|$)');
 
    return str.match( RegExp(regex, 'g') ).join( brk );
}




/* -----------------------
 * Tractament de dates
 */


/**
 * Retorna dia setmana complet
 * @param dia - Abreviaci�o del dia de la setmana
 **/
function transformaDiaSetmana(dia) {
	var res = dia;
	
	switch(res) {
		case 'dl':
			res = "dilluns";
			break;
		case 'dm':
			res = "dimarts";
			break;
		case 'dc':
			res = "dimecres";
			break;
		case 'dj':
			res = "dijous";
			break;
		case 'dv':
			res = "divendres";
			break;
		case 'ds':
			res = "dissabte";
			break;
		case 'dg':
			res = "diumenge";
			break;
	}
	
	return res;
}


/**
 * Determina si alguna data d'un conjunt de dates separades per coma, entren entre un rang de dates.
 * Nom�s que una data del conjunt entri en el rang, la funci� retorna TRUE
 **/
function entraEnDates(dataInici, dataFi, dates) {
	var res = false;
	
	var dt = dates.split(",");
	var di = new Date(dataInici);
	var df = new Date(dataFi);

	for (t = 0; t < dt.length; t++) {
		var da = new Date(dt[t].substr(6, 4) + "-" + dt[t].substr(3, 2) + "-" + dt[t].substr(0, 2));
		
		if (da.getTime() >= di.getTime() && da.getTime() <= df.getTime()) {
			res = true;
			break;
		}
	}
	
	return res;
}

/**
 * Redueix un rang de dates per a mostrar-ho visualment.
 **/
function acotaDates(dates) {
	var dt = dates.split(",");

	if (dt.length > 4) {
		return dt[0] + ", " + dt[1] + " ... " + dt[dt.length - 2] + ", " + dt[dt.length - 1];
	} else return dates;
}

// Retorna una data en format YYYY-MM-DD
function formataData(data) {
	dt = new Date(data);
	return dt.getFullYear() + "-" + ((dt.getMonth()+1) < 9 ? '0' : '' ) + (dt.getMonth()+1) + "-" + ( dt.getDate() < 9 ? '0' : '') + dt.getDate();
}

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

function getSunday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? 0:7); 
  return new Date(d.setDate(diff));
}