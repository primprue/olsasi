var express = require("express");
var path = require("path");
var cors = require("cors");
//var favicon = require('serve-favicon');
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
//  var routes = require('./routes/index');


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
// var clientespresupagregar = require("./routes/clientes/clientespresupagregar");


var transporteleer = require("./routes/transporte/transporteleer");
var transporteleercod = require("./routes/transporte/transporteleercod");
var transporteagregar = require("./routes/transporte/transporteagregar");
var transportemodificar = require("./routes/transporte/transportemodificar");
var transporteborrar = require("./routes/transporte/transporteborrar");


var stkmonedasleer = require("./routes/monedas/stkmonedasleer");
var stkmonedasleercod = require("./routes/monedas/stkmonedasleercod");
var stkmonedasagregar = require("./routes/monedas/stkmonedasagregar");
var stkmonedasmodificar = require("./routes/monedas/stkmonedasmodificar");
var stkmonedasborrar = require("./routes/monedas/stkmonedasborrar");
var stkmonedasleerred = require("./routes/monedas/stkmonedasleerred");


// var stkbgsubrubroleer = require('./routes/stkbgsubrubroleer');

var stktipoproveedleer = require("./routes/proveedores/stktipoproveedleer");

var stkunmedleer = require("./routes/stock/unidadmedidas/stkunmedleer");
var stkunmedleercod = require("./routes/stock/unidadmedidas/stkunmedleercod");
var stkunmedagregar = require("./routes/stock/unidadmedidas/stkunmedagregar");
var stkunmedmodificar = require("./routes/stock/unidadmedidas/stkunmedmodificar");
var stkunmedborrar = require("./routes/stock/unidadmedidas/stkunmedborrar");
var stkunmedleerred = require("./routes/stock/unidadmedidas/stkunmedleerred");

var stkgrupoleer = require("./routes/stock/grupos/stkgrupoleer");
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

var listaprecios = require("./routes/listaprecios/listaprecios");
var modprecios = require("./routes/listaprecios/modprecios");

//Movimiento Stock
var leestock = require("./routes/movstock/leestock");

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


var presupencableer = require("./routes/presupuesto/presupencableer");
var presuprenglonleer = require("./routes/presupuesto/presuprenglonleer");
var presupnombre = require("./routes/presupuesto/presupnombre");


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
// var generadoc = require("./routes/impresion/generadoc");

// const router = require("./routes/impresion/imppresup");


//programas para backup
var copiafact = require("./routes/procinternos/copiafact");


const { RouterSharp } = require("@material-ui/icons");

// function agregada por el error CROS
function perimitirCrossDomain(req, res, next) {
  //en vez de * se puede definir SÓLO los orígenes que permitimos
  res.header("Access-Control-Allow-Origin", "*");
  //metodos http permitidos para CORS
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
}

var app = express();
app.use(cors());

// routes.initialize(app);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
// app.use("/clientespresupagregar", clientespresupagregar);

app.use("/transporteleer", transporteleer);
app.use("/transporteleercod", transporteleercod);
app.use("/transporteagregar", transporteagregar);
app.use("/transportemodificar", transportemodificar);
app.use("/transporteborrar", transporteborrar);


app.use("/stkbgsubrubroleer", stkbgsubrubroleer);

app.use("/stkmonedasleer", stkmonedasleer);
app.use("/stkmonedasleercod", stkmonedasleercod);
app.use("/stkmonedasagregar", stkmonedasagregar);
app.use("/stkmonedasmodificar", stkmonedasmodificar);
app.use("/stkmonedasborrar", stkmonedasborrar);
app.use("/stkmonedasleerred", stkmonedasleerred);
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

// app.use('/imprime1', imprime1);
app.use("/stkmovvtaagregar", stkmovvtaagregar);

app.use("/listaprecios", listaprecios);
app.use("/modprecios", modprecios);

//Movimiento stock
app.use("/leestock", leestock);


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



app.use("/presupencableer", presupencableer);
app.use("/presuprenglonleer", presuprenglonleer);
app.use("/presupnombre", presupnombre);


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
// app.use("/generadoc", generadoc);




app.use("/copiafact", copiafact);


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
