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

function connexWS(){
	
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
    alert('Status: ' + status);
    
    DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
    DocumentBuilder docBuilder = docBuilderFactory.newDocumentBuilder();
    Document doc = docBuilder.parse($(data));
    
    NodeList listaPersonas = doc.getElementsByTagName("type");
    int totalPersonas = listaPersonas.getLength();
    
    alert('total: ' + totalPersonas);
    
    var div_res = _.template($("#ws_template").html());
    $("#ws").html(div_res({data: data}));
}

function OnError(request, status, error)
{
    alert('error');
}  
	

 

