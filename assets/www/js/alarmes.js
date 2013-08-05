var db;
 
function carregaMenu() {
     var div_res = _.template($("#alarmes_template").html());
     $("#alarmes").html(div_res({}));
}
 

