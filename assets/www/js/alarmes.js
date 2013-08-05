var db;
 
function carregaMenu() {
     var div_res = _.template($("#alarmes_template").html());
     $("#alarmes").html(div_res({}));
}

function carregaTextEnviament() {
    var div_res = _.template($("#enviamentAlarmes_template").html());
    $("#enviamentAlarmes").html(div_res({}));
}
 

