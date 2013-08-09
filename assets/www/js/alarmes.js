var db;
 
function connexWS() {
	//Connectem al WS per baixar tipus d'alarmes
	
	$.ajax({
        url: 'http://192.168.1.71/adAlert_WS/adAlert_WS.asmx/GetTypeAlarms',
        type: "POST",
        dataType: "xml",
        data: "",
        contentType: "text/xml; charset=\"utf-8\"",
        success: OnSuccess,
        error: OnError
    });
}

function OnSuccess(data, status)
{
    var output = [];
    
    $(data).find('Type').each(function( index ) {
    	addAlarmesTipus($(this).find('ID').text(), $(this).find('NOM').text()); 	
    	
    	//output.push([$(this).find('ID').text(),$(this).find('NOM').text()]);
    	//var div_res = _.template($("#ws_template").html());
        //$("#ws").html(div_res({output: output}));
    });
}

function OnError(request, status, error)
{
    alert('error');
}  

function enviar(){
	
	alert('Missatge enviat correctament')
}

 

