var express = require("express");
var path = require("path");
var cors = require("cors");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
//  var routes = require('./routes/index');

require('events').EventEmitter.defaultMaxListeners = 20;

//el mensaje que larga al ejecutarse el backend es el de la pimer linea del requiere en este caso proveedoresleer
var proveedoresleer = require("./routes/proveedores/proveedoresleer");
var proveedoresleercod = require("./routes/proveedores/proveedoresleercod");
var proveedoresagregar = require("./routes/proveedores/proveedoresagregar");
var proveedoresborrar = require("./routes/proveedores/proveedoresborrar");
var proveedoresmodificar = require("./routes/proveedores/proveedoresmodificar");
var stkbgsubrubroleer = require("./routes/proveedores/stkbgsubrubroleer");

var clientesleer = require("./routes/clientes/clientesleer");
var clientesleercod = require("./routes/clientes/clientesleercod");
var clientesleerdesc = require("./routes/clientes/clientesleerdesc");
var clientesagregar = require("./routes/clientes/clientesagregar");
var clientesborrar = require("./routes/clientes/clientesborrar");
var clientesmodificar = require("./routes/clientes/clientesmodificar");
var clientesleercodmayor = require("./routes/clientes/clientesleercodmayor");
var clientesleerdescmayigual = require("./routes/clientes/clientesleerdescmayigual");
var clientesleerpresup = require("./routes/clientes/clientesleerpresup");
var clientestraenuevos = require("./routes/clientes/clientestraenuevos");
var clientescobol = require("./routes/clientes/clientescobol");
var clientesleerot = require("./routes/clientes/clientesleerot");
var clientesleerencabot = require("./routes/clientes/clientesleerencabot");
var clientesleerdescod = require("./routes/clientes/clientesleerdescod");

// var clientespresupagregar = require("./routes/clientes/clientespresupagregar");


var transporteleer = require("./routes/transporte/transporteleer");
var transporteleercod = require("./routes/transporte/transporteleercod");
var transporteagregar = require("./routes/transporte/transporteagregar");
var transportemodificar = require("./routes/transporte/transportemodificar");
var transporteborrar = require("./routes/transporte/transporteborrar");


var stkmonedasleer = require("./routes/monedas/stkmonedasleer");
var stkmonedasleerp = require("./routes/monedas/stkmonedasleerp");
var stkmonedasleercod = require("./routes/monedas/stkmonedasleercod");
var stkmonedasagregar = require("./routes/monedas/stkmonedasagregar");
var stkmonedasmodificar = require("./routes/monedas/stkmonedasmodificar");
var stkmonedasborrar = require("./routes/monedas/stkmonedasborrar");
var stkmonedasleerred = require("./routes/monedas/stkmonedasleerred");
var stkmonedasleerorig = require("./routes/monedas/stkmonedasleerorig");



// var stkbgsubrubroleer = require('./routes/stkbgsubrubroleer');

var stktipoproveedleer = require("./routes/proveedores/stktipoproveedleer");

var stkunmedleer = require("./routes/stock/unidadmedidas/stkunmedleer");
var stkunmedleercod = require("./routes/stock/unidadmedidas/stkunmedleercod");
var stkunmedagregar = require("./routes/stock/unidadmedidas/stkunmedagregar");
var stkunmedmodificar = require("./routes/stock/unidadmedidas/stkunmedmodificar");
var stkunmedborrar = require("./routes/stock/unidadmedidas/stkunmedborrar");
var stkunmedleerred = require("./routes/stock/unidadmedidas/stkunmedleerred");

var stkgrupoleer = require("./routes/stock/grupos/stkgrupoleer");
var stkgrupoleeselec = require("./routes/stock/grupos/stkgrupoleeselec");
var stkgrupoleercod = require("./routes/stock/grupos/stkgrupoleercod");
var stkgrupoagregar = require("./routes/stock/grupos/stkgrupoagregar");
var stkgrupomodificar = require("./routes/stock/grupos/stkgrupomodificar");
var stkgrupoborrar = require("./routes/stock/grupos/stkgrupoborrar");
var stkgrupoleerred = require("./routes/stock/grupos/stkgrupoleerred");
var stkgrupoleerredrubros = require("./routes/stock/grupos/stkgrupoleerredrubros");

var stkubfisicaleer = require("./routes/stock/ubfisica/stkubfisicaleer");
// var stkubfisicaleercod = require('./routes/ubfisica/stkubfisicaleercod');
var stkubfisicaagregar = require("./routes/stock/ubfisica/stkubfisicaagregar");
// var stkubfisicamodificar = require('./routes/ubfisica/stkubfisicamodificar');
var stkubfisicaborrar = require("./routes/stock/ubfisica/stkubfisicaborrar");
var stkubfisicaleerUbG = require("./routes/stock/ubfisica/stkubfisicaleerUbG");

var stkrubroleer = require("./routes/stock/rubros/stkrubroleer");
var stkrubroleeselec = require("./routes/stock/rubros/stkrubroleeselec");
var stkrubroleermezcla = require("./routes/stock/rubros/stkrubroleermezcla");
var stkrubroleercod = require("./routes/stock/rubros/stkrubroleercod");
var stkrubroagregar = require("./routes/stock/rubros/stkrubroagregar");
var stkrubromodificar = require("./routes/stock/rubros/stkrubromodificar");
var stkrubroborrar = require("./routes/stock/rubros/stkrubroborrar");
var stkrubroleecodgrupo = require("./routes/stock/rubros/stkrubroleecodgrupo");
var stkrubroleecodgryrb = require("./routes/stock/rubros/stkrubroleecodgryrb");
var stkrubroleeultnro = require("./routes/stock/rubros/stkrubroleeultnro");
var stkrubroleecodgrupored = require("./routes/stock/rubros/stkrubroleecodgrupored");
var stkrubroleeproveedor = require("./routes/stock/rubros/stkrubroleeproveedor");
var stkrubroleerdesc = require("./routes/stock/rubros/stkrubroleerdesc");
var stkrubroleerconf = require("./routes/stock/rubros/stkrubroleerconf");
var stkrubroleerTBR = require("./routes/stock/rubros/stkrubroleerTBR");
var stkrubroleerprov = require("./routes/stock/rubros/stkrubroleerprov");
var stkrubroleerconfgrp = require("./routes/stock/rubros/stkrubroleerconfgrp");
//01-06-2023
var stkrubroleerLAT = require("./routes/stock/rubros/stkrubroleerLAT");


var stkitemsleer = require("./routes/stock/items/stkitemsleer");
var stkitemsagregar = require("./routes/stock/items/stkitemsagregar");
var stkitemsmodificar = require("./routes/stock/items/stkitemsmodificar");
var stkitemsborrar = require("./routes/stock/items/stkitemsborrar");
var stkitemsleecod = require("./routes/stock/items/stkitemsleecod");
var stkitemsleecodgryrb = require("./routes/stock/items/stkitemsleecodgryrb");
var stkitemsleecodgrrbit = require("./routes/stock/items/stkitemsleecodgrrbit");
var stkitemsleedetalles = require("./routes/stock/items/stkitemsleedetalles");
var stkitemsleedisp = require("./routes/stock/items/stkitemsleedisp");
var stkitemsmoddisp = require("./routes/stock/items/stkitemsmoddisp");
var stkitemsmodstock = require("./routes/stock/items/stkitemsmodstock");
var stkitemslistaprecios = require("./routes/stock/items/stkitemslistaprecios");
var stkitemscodabr = require("./routes/stock/items/stkitemscodabr");
var stkitemsborrarabr = require("./routes/stock/items/stkitemsborrarabr");
var stkitemsleeabrrub = require("./routes/stock/items/stkitemsleeabrrub");
var stkitemsleecodgr = require("./routes/stock/items/stkitemsleecodgr");
//15-02-2023 OT
var stkitemsleedescabrrub = require("./routes/stock/items/stkitemsleedescabrrub");


var stkitemsventa = require("./routes/stock/items/stkitemsventa"); //una prueba

var stkverificadisp = require("./routes/stock/movimientos/stkverificadisp");
var stkmovsalfinal = require("./routes/stock/movimientos/stkmovsalfinal");
var stkgrabamovsalfinal = require("./routes/stock/movimientos/stkgrabamovsalfinal");

var stkmovenvase = require("./routes/stock/movimientos/stkmovenvase");

var stkmovvtaagregar = require("./routes/stock/envase/stkmovvtaagregar");
var stkenvaseagregar = require("./routes/stock/envase/stkenvaseagregar");
var stkenvaseleeimp = require("./routes/stock/envase/stkenvaseleeimp");
var stkenvasecambiaimp = require("./routes/stock/envase/stkenvasecambiaimp");

var leedatosingreso = require("./routes/stock/ingresos/leedatosingreso");
var sumaingreso = require("./routes/stock/ingresos/sumaingreso");



var listaprecios = require("./routes/listaprecios/listaprecios");
var modprecios = require("./routes/listaprecios/modprecios");

//Movimiento Stock
var leestock = require("./routes/movstock/leestock");
var inventario = require("./routes/movstock/inventario");

//CONSULTAS
//var consultastock = require("./routes/consultas/consultastock");

// PRESUPUESTO
var presupunid = require("./routes/presupuesto/presupunid");
var presuppu = require("./routes/presupuesto/presuppu");
var presuppurec = require("./routes/presupuesto/presuppurec");
var presupfajas = require("./routes/presupuesto/presupfajas");
var presuplonaconf = require("./routes/presupuesto/presuplonaconf");
var presupgraba = require("./routes/presupuesto/presupgraba");
var presupdesfac = require("./routes/presupuesto/presupdesfac");
var presupenrollables = require("./routes/presupuesto/presupenrollables");
var presupbolsontanque = require("./routes/presupuesto/presupbolsontanque");
var presuppiletaenr = require("./routes/presupuesto/presuppiletaenr");
var presupbrazosextens = require("./routes/presupuesto/presupbrazosextens");
var presuplonapiletaelas = require("./routes/presupuesto/presuplonapiletaelas");
var presupcargadesc = require("./routes/presupuesto/presupcargadesc");
var presuplonaabolinada = require("./routes/presupuesto/presuplonaabolinada");
var presupcomedero = require("./routes/presupuesto/presupcomedero");
var presupcambpanio = require("./routes/presupuesto/presupcambpanio");
var presuppiletafca = require("./routes/presupuesto/presuppiletafca");
var presupponchorie = require("./routes/presupuesto/presupponchorie");
var presupmodificamed = require("./routes/presupuesto/presupmodificamed");
var presupabanico = require("./routes/presupuesto/presupabanico");
//22-12-2022
var presuppisopil = require("./routes/presupuesto/presuppisopil");
//12/06/2023
var presuplatcorr = require("./routes/presupuesto/presuplatcorr");


var presupencableer = require("./routes/presupuesto/presupencableer");
var presupencableenro = require("./routes/presupuesto/presupencableenro");

var presuprenglonleer = require("./routes/presupuesto/presuprenglonleer");
var presupnombre = require("./routes/presupuesto/presupnombre");
var presuprengleer = require("./routes/presupuesto/presuprengleer");
var presupborrar = require("./routes/presupuesto/presupborrar");

var presupconftipoleer = require("./routes/presupuesto/presupconftipo/presupconftipoleer");
var presupconftipoleerdesc = require("./routes/presupuesto/presupconftipo/presupconftipoleerdesc");
var presupconftipoleeanexo = require("./routes/presupuesto/presupconftipo/presupconftipoleeanexo");
var presupconftipomodificar = require("./routes/presupuesto/presupconftipo/presupconftipomodificar");
var presupconftipoborrar = require("./routes/presupuesto/presupconftipo/presupconftipoborrar");
var presupconftipoagregar = require("./routes/presupuesto/presupconftipo/presupconftipoagregar");
var presupconftipocalc = require("./routes/presupuesto/presupconftipo/presupconftipocalc");


var presupdetpieleer = require("./routes/presupuesto/presupdetpie/presupdetpieleer");
var presupdetpiemodificar = require("./routes/presupuesto/presupdetpie/presupdetpiemodificar");
var presupdetpieborrar = require("./routes/presupuesto/presupdetpie/presupdetpieborrar");
var presupdetpieagregar = require("./routes/presupuesto/presupdetpie/presupdetpieagregar");

var imppresup = require("./routes/impresion/imppresup");
// var muestrapdf = require("./routes/impresion/muestrapdf");
// var generadoc = require("./routes/impresion/generadoc");

// const router = require("./routes/impresion/imppresup");


//programas para backup
var copiafact = require("./routes/procinternos/copiafact");

// //programas para ordenes de trabajo
// var datosencabpresupeleg = require("./routes/ordentrabajo/datosencabpresupeleg")
// var otarmatabla = require("./routes/ordentrabajo/otarmatabla")
var otorigenpresupagregar = require("./routes/ordentrabajo/otorigenpresupagregar")
var otdatosleer = require("./routes/ordentrabajo/otdatosleer")
var otgraba = require("./routes/ordentrabajo/otgraba")
var otleeencab = require("./routes/ordentrabajo/otleeencab")
var otestadoleer = require("./routes/ordentrabajo/otestadoleer")
var otrengleerpot = require("./routes/ordentrabajo/otrengleerpot")
var otguardapdf = require("./routes/ordentrabajo/otguardapdf")


var otcondpagoleer = require("./routes/otcondpago/otcondpagoleer");
var otcondpagoleercod = require("./routes/otcondpago/otcondpagoleercod");
var otcondpagoagregar = require("./routes/otcondpago/otcondpagoagregar");
var otcondpagomodificar = require("./routes/otcondpago/otcondpagomodificar");
var otcondpagoborrar = require("./routes/otcondpago/otcondpagoborrar");


//para ctacte
// var conectaafip = require("./routes/afip/conectaafip")

var paramcompleer = require("./routes/ctacte/paramcomp/paramcompleer")
var paramcompborrar = require("./routes/ctacte/paramcomp/paramcompborrar")
var paramcompagregar = require("./routes/ctacte/paramcomp/paramcompagregar")
var paramcompmodificar = require("./routes/ctacte/paramcomp/paramcompmodificar")


// const { RouterSharp } = require("@material-ui/icons");

// function agregada por el error CORS
function perimitirCrossDomain(req, res, next) {
  //en vez de * se puede definir SÓLO los orígenes que permitimos

  res.header("Access-Control-Allow-Origin", "*");
  //metodos http permitidos para CORS
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
}

var app = express();
app.use(cors()); //esto estaba antes de que se colgara

// app.use(cors({
//   origin: 'http://localhost:5173', // O puedes usar '*' para permitir cualquier origen
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type, Authorization'
// }));
// app.listen(4000, () => {
//   console.log('Servidor escuchando en el puerto 4000');
// });
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(perimitirCrossDomain);





app.use("/proveedoresleer", proveedoresleer);
app.use("/proveedoresleercod", proveedoresleercod);
app.use("/proveedoresagregar", proveedoresagregar);
app.use("/proveedoresmodificar", proveedoresmodificar);
app.use("/proveedoresborrar", proveedoresborrar);


app.use("/clientesleer", clientesleer);
app.use("/clientesleercod", clientesleercod);
app.use("/clientesleerdesc", clientesleerdesc);
app.use("/clientesagregar", clientesagregar);
app.use("/clientesmodificar", clientesmodificar);
app.use("/clientesborrar", clientesborrar);
app.use("/clientesleercodmayor", clientesleercodmayor);
app.use("/clientesleerdescmayigual", clientesleerdescmayigual);
app.use("/clientesleerpresup", clientesleerpresup);
app.use("/clientestraenuevos", clientestraenuevos);
app.use("/clientescobol", clientescobol);
app.use("/clientesleerot", clientesleerot);
app.use("/clientesleerencabot", clientesleerencabot);
app.use("/clientesleerdescod", clientesleerdescod);

// app.use("/clientespresupagregar", clientespresupagregar);

app.use("/transporteleer", transporteleer);
app.use("/transporteleercod", transporteleercod);
app.use("/transporteagregar", transporteagregar);
app.use("/transportemodificar", transportemodificar);
app.use("/transporteborrar", transporteborrar);

app.use("/stkbgsubrubroleer", stkbgsubrubroleer);

app.use("/stkmonedasleer", stkmonedasleer);
app.use("/stkmonedasleerp", stkmonedasleerp);
app.use("/stkmonedasleercod", stkmonedasleercod);
app.use("/stkmonedasagregar", stkmonedasagregar);
app.use("/stkmonedasmodificar", stkmonedasmodificar);
app.use("/stkmonedasborrar", stkmonedasborrar);
app.use("/stkmonedasleerred", stkmonedasleerred);
app.use("/stkmonedasleerorig", stkmonedasleerorig);

// app.use('/stkbgsubrubroleer', stkbgsubrubroleer);

app.use("/stktipoproveedleer", stktipoproveedleer);
// app.use('/stktipoproveedleercod', stktipoproveedleercod);
// app.use('/stktipoproveedagregar', stktipoproveedagregar);
// app.use('/stktipoproveedmodificar', stktipoproveedmodificar);
// app.use('/stktipoproveedborrar', stktipoproveedborrar);

app.use("/stkunmedleer", stkunmedleer);
app.use("/stkunmedleercod", stkunmedleercod);
app.use("/stkunmedagregar", stkunmedagregar);
app.use("/stkunmedmodificar", stkunmedmodificar);
app.use("/stkunmedborrar", stkunmedborrar);
app.use("/stkunmedleerred", stkunmedleerred);



app.use("/stkgrupoleer", stkgrupoleer);
app.use("/stkgrupoleeselec", stkgrupoleeselec);
app.use("/stkgrupoleercod", stkgrupoleercod);
app.use("/stkgrupoagregar", stkgrupoagregar);
app.use("/stkgrupomodificar", stkgrupomodificar);
app.use("/stkgrupoborrar", stkgrupoborrar);
app.use("/stkgrupoleerred", stkgrupoleerred);
app.use("/stkgrupoleerredrubros", stkgrupoleerredrubros);

app.use("/stkubfisicaleer", stkubfisicaleer);
// app.use('/stkubfisicaleercod', stkubfisicaleercod);
app.use("/stkubfisicaagregar", stkubfisicaagregar);
// app.use('/stkubfisicamodificar', stkubfisicamodificar);
app.use("/stkubfisicaborrar", stkubfisicaborrar);
app.use("/stkubfisicaleerUbG", stkubfisicaleerUbG);

app.use("/stkrubroleer", stkrubroleer);
app.use("/stkrubroleeselec", stkrubroleeselec);
app.use("/stkrubroleermezcla", stkrubroleermezcla);
app.use("/stkrubroleercod", stkrubroleercod);
app.use("/stkrubroagregar", stkrubroagregar);
app.use("/stkrubromodificar", stkrubromodificar);
app.use("/stkrubroborrar", stkrubroborrar);
app.use("/stkrubroleecodgrupo", stkrubroleecodgrupo);
app.use("/stkrubroleecodgryrb", stkrubroleecodgryrb);
app.use("/stkrubroleeultnro", stkrubroleeultnro);
app.use("/stkrubroleecodgrupored", stkrubroleecodgrupored);
app.use("/stkrubroleeproveedor", stkrubroleeproveedor);
app.use("/stkrubroleerdesc", stkrubroleerdesc);
app.use("/stkrubroleerconf", stkrubroleerconf);
app.use("/stkrubroleerTBR", stkrubroleerTBR);
app.use("/stkrubroleerprov", stkrubroleerprov);
app.use("/stkrubroleerconfgrp", stkrubroleerconfgrp);
//01-06-2023
app.use("/stkrubroleerLAT", stkrubroleerLAT);

app.use("/stkitemsleer", stkitemsleer);
app.use("/stkitemsagregar", stkitemsagregar);
app.use("/stkitemsmodificar", stkitemsmodificar);
app.use("/stkitemsborrar", stkitemsborrar);
app.use("/stkitemsleecod", stkitemsleecod);
app.use("/stkitemsleecodgryrb", stkitemsleecodgryrb);
app.use("/stkitemsleecodgrrbit", stkitemsleecodgrrbit);
app.use("/stkitemsleedetalles", stkitemsleedetalles);
app.use("/stkitemsleedisp", stkitemsleedisp);
app.use("/stkitemsmoddisp", stkitemsmoddisp);
app.use("/stkverificadisp", stkverificadisp);
app.use("/stkitemscodabr", stkitemscodabr);
app.use("/stkitemsborrarabr", stkitemsborrarabr);
app.use("/stkitemsleeabrrub", stkitemsleeabrrub);
app.use("/stkitemsleecodgr", stkitemsleecodgr);
//15-02-2023 OT
app.use("/stkitemsleedescabrrub", stkitemsleedescabrrub);



app.use("/stkitemsmodstock", stkitemsmodstock);
app.use("/stkitemslistaprecios", stkitemslistaprecios);

app.use("/stkmovsalfinal", stkmovsalfinal);
app.use("/stkgrabamovsalfinal", stkgrabamovsalfinal);
app.use("/stkmovenvase", stkmovenvase);

app.use("/stkitemsventa", stkitemsventa);
app.use("/stkenvaseagregar", stkenvaseagregar);
app.use("/stkenvaseleeimp", stkenvaseleeimp);
app.use("/stkenvasecambiaimp", stkenvasecambiaimp);

app.use("/leedatosingreso", leedatosingreso);
app.use("/sumaingreso", sumaingreso);


// app.use('/imprime1', imprime1);
app.use("/stkmovvtaagregar", stkmovvtaagregar);

app.use("/listaprecios", listaprecios);
app.use("/modprecios", modprecios);

//Movimiento stock
app.use("/leestock", leestock);
app.use("/inventario", inventario);

//PRESUPUESTO
app.use("/presupunid", presupunid);
app.use("/presuppu", presuppu);
app.use("/presuppurec", presuppurec);
app.use("/presupfajas", presupfajas);
app.use("/presuplonaconf", presuplonaconf);
app.use("/presupgraba", presupgraba);
app.use("/presupdesfac", presupdesfac);
app.use("/presupenrollables", presupenrollables);
app.use("/presupbolsontanque", presupbolsontanque);
app.use("/presuppiletaenr", presuppiletaenr);
app.use("/presupbrazosextens", presupbrazosextens);
app.use("/presuplonapiletaelas", presuplonapiletaelas);
app.use("/presupcargadesc", presupcargadesc);
app.use("/presuplonaabolinada", presuplonaabolinada);
app.use("/presupcomedero", presupcomedero);
app.use("/presupcambpanio", presupcambpanio);
app.use("/presuppiletafca", presuppiletafca);
app.use("/presupponchorie", presupponchorie);
app.use("/presupmodificamed", presupmodificamed);
app.use("/presupabanico", presupabanico);
//22-12-2022
app.use("/presuppisopil", presuppisopil);
//12-06-2023
app.use("/presuplatcorr", presuplatcorr);


app.use("/presupencableer", presupencableer);
app.use("/presupencableenro", presupencableenro);
app.use("/presuprenglonleer", presuprenglonleer);
app.use("/presupnombre", presupnombre);
app.use("/presuprengleer", presuprengleer);
app.use("/presupborrar", presupborrar);


app.use("/presupconftipoleer", presupconftipoleer);
app.use("/presupconftipoleerdesc", presupconftipoleerdesc);
app.use("/presupconftipoleeanexo", presupconftipoleeanexo);
app.use("/presupconftipomodificar", presupconftipomodificar);
app.use("/presupconftipoborrar", presupconftipoborrar);
app.use("/presupconftipoagregar", presupconftipoagregar);
app.use("/presupconftipocalc", presupconftipocalc);


app.use("/presupdetpieleer", presupdetpieleer);
app.use("/presupdetpiemodificar", presupdetpiemodificar);
app.use("/presupdetpieborrar", presupdetpieborrar);
app.use("/presupdetpieagregar", presupdetpieagregar);


app.use("/imppresup", imppresup);
// app.use("/muestrapdf", muestrapdf);

// app.use("/generadoc", generadoc);




app.use("/copiafact", copiafact);

//programas para ordenes de trabajo
// app.use("/datosencabpresupeleg", datosencabpresupeleg);
// app.use("/otarmatabla", otarmatabla);
app.use("/otorigenpresupagregar", otorigenpresupagregar);
app.use("/otdatosleer", otdatosleer);
app.use("/otgraba", otgraba);
app.use("/otleeencab", otleeencab);
app.use("/otestadoleer", otestadoleer);
app.use("/otrengleerpot", otrengleerpot);
app.use("/otguardapdf", otguardapdf);


app.use("/otcondpagoleer", otcondpagoleer);
app.use("/otcondpagoleercod", otcondpagoleercod);
app.use("/otcondpagoagregar", otcondpagoagregar);
app.use("/otcondpagomodificar", otcondpagomodificar);
app.use("/otcondpagoborrar", otcondpagoborrar);


//temas ctacte
// app.use("/conectaafip", conectaafip);
app.use("/paramcompleer", paramcompleer);
app.use("/paramcompborrar", paramcompborrar);
app.use("/paramcompagregar", paramcompagregar);
app.use("/paramcompmodificar", paramcompmodificar);




app.use("/", proveedoresleer);


app.use(function (req, res, next) {
  var err = new Error("El programa de backend no se encuentra");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.Error
  //estaba puesta la linea de abajo la cambié por la de arriba por el error que daba aunque andaba
  //res.render("error ");
});

module.exports = app;
