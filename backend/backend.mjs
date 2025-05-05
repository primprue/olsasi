import express from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
//  var routes = require('./routes/index');

// require('events').EventEmitter.defaultMaxListeners = 20;

//el mensaje que larga al ejecutarse el backend es el de la pimer linea del requiere en este caso proveedoresleer
import proveedoresleer from "./routes/proveedores/proveedoresleer.mjs";

import proveedoresleercod from "./routes/proveedores/proveedoresleercod.mjs";
import proveedoresagregar from "./routes/proveedores/proveedoresagregar.mjs";
import proveedoresborrar from "./routes/proveedores/proveedoresborrar.mjs";
import proveedoresmodificar from "./routes/proveedores/proveedoresmodificar.mjs";
import proveedoresleertipo26 from "./routes/proveedores/proveedoresleertipo26.mjs";


import stkbgsubrubroleer from "./routes/proveedores/stkbgsubrubroleer.mjs";
import clientesleer from "./routes/clientes/clientesleer.mjs";
import clientesleercod from "./routes/clientes/clientesleercod.mjs";
import clientesleerdesc from "./routes/clientes/clientesleerdesc.mjs";
import clientesagregar from "./routes/clientes/clientesagregar.mjs";
import clientesborrar from "./routes/clientes/clientesborrar.mjs";
import clientesmodificar from "./routes/clientes/clientesmodificar.mjs";
import clientesleercodmayor from "./routes/clientes/clientesleercodmayor.mjs";
import clientesleerdescmayigual from "./routes/clientes/clientesleerdescmayigual.mjs";
import clientesleerpresup from "./routes/clientes/clientesleerpresup.mjs";
import clientestraenuevos from "./routes/clientes/clientestraenuevos.mjs";
import clientescobol from "./routes/clientes/clientescobol.mjs";
import clientesleerot from "./routes/clientes/clientesleerot.mjs";
import clientesleerencabot from "./routes/clientes/clientesleerencabot.mjs";
import clientesleerdescod from "./routes/clientes/clientesleerdescod.mjs";

// var clientespresupagregar = require("./routes/clientes/clientespresupagregar");


import transporteleer from "./routes/transporte/transporteleer.mjs";

import transporteleercod from "./routes/transporte/transporteleercod.mjs";
import transporteagregar from "./routes/transporte/transporteagregar.mjs";
import transportemodificar from "./routes/transporte/transportemodificar.mjs";
import transporteborrar from "./routes/transporte/transporteborrar.mjs";
import stkmonedasleer from "./routes/monedas/stkmonedasleer.mjs";
import stkmonedasleerp from "./routes/monedas/stkmonedasleerp.mjs";
import stkmonedasleercod from "./routes/monedas/stkmonedasleercod.mjs";
import stkmonedasagregar from "./routes/monedas/stkmonedasagregar.mjs";
import stkmonedasmodificar from "./routes/monedas/stkmonedasmodificar.mjs";
import stkmonedasborrar from "./routes/monedas/stkmonedasborrar.mjs";
import stkmonedasleerred from "./routes/monedas/stkmonedasleerred.mjs";
import stkmonedasleerorig from "./routes/monedas/stkmonedasleerorig.mjs";

// var stkbgsubrubroleer = require('./routes/stkbgsubrubroleer');

import stktipoproveedleer from "./routes/proveedores/stktipoproveedleer.mjs";

import stkunmedleer from "./routes/stock/unidadmedidas/stkunmedleer.mjs";
import stkunmedleercod from "./routes/stock/unidadmedidas/stkunmedleercod.mjs";
import stkunmedagregar from "./routes/stock/unidadmedidas/stkunmedagregar.mjs";
import stkunmedmodificar from "./routes/stock/unidadmedidas/stkunmedmodificar.mjs";
import stkunmedborrar from "./routes/stock/unidadmedidas/stkunmedborrar.mjs";
import stkunmedleerred from "./routes/stock/unidadmedidas/stkunmedleerred.mjs";
import stkgrupoleer from "./routes/stock/grupos/stkgrupoleer.mjs";
import stkgrupoleeselec from "./routes/stock/grupos/stkgrupoleeselec.mjs";
import stkgrupoleercod from "./routes/stock/grupos/stkgrupoleercod.mjs";
import stkgrupoagregar from "./routes/stock/grupos/stkgrupoagregar.mjs";
import stkgrupomodificar from "./routes/stock/grupos/stkgrupomodificar.mjs";
import stkgrupoborrar from "./routes/stock/grupos/stkgrupoborrar.mjs";
import stkgrupoleerred from "./routes/stock/grupos/stkgrupoleerred.mjs";
import stkgrupoleerredrubros from "./routes/stock/grupos/stkgrupoleerredrubros.mjs";
import stkubfisicaleer from "./routes/stock/ubfisica/stkubfisicaleer.mjs";

// var stkubfisicaleercod = require('./routes/ubfisica/stkubfisicaleercod');
import stkubfisicaagregar from "./routes/stock/ubfisica/stkubfisicaagregar.mjs";

// var stkubfisicamodificar = require('./routes/ubfisica/stkubfisicamodificar');
import stkubfisicaborrar from "./routes/stock/ubfisica/stkubfisicaborrar.mjs";

import stkubfisicaleerUbG from "./routes/stock/ubfisica/stkubfisicaleerUbG.mjs";
import stkrubroleer from "./routes/stock/rubros/stkrubroleer.mjs";
import stkrubroleeselec from "./routes/stock/rubros/stkrubroleeselec.mjs";
import stkrubroleermezcla from "./routes/stock/rubros/stkrubroleermezcla.mjs";
import stkrubroleercod from "./routes/stock/rubros/stkrubroleercod.mjs";
import stkrubroagregar from "./routes/stock/rubros/stkrubroagregar.mjs";
import stkrubromodificar from "./routes/stock/rubros/stkrubromodificar.mjs";
import stkrubroborrar from "./routes/stock/rubros/stkrubroborrar.mjs";
import stkrubroleecodgrupo from "./routes/stock/rubros/stkrubroleecodgrupo.mjs";
import stkrubroleecodgryrb from "./routes/stock/rubros/stkrubroleecodgryrb.mjs";
import stkrubroleeultnro from "./routes/stock/rubros/stkrubroleeultnro.mjs";
import stkrubroleecodgrupored from "./routes/stock/rubros/stkrubroleecodgrupored.mjs";
import stkrubroleeproveedor from "./routes/stock/rubros/stkrubroleeproveedor.mjs";
import stkrubroleerdesc from "./routes/stock/rubros/stkrubroleerdesc.mjs";
import stkrubroleerconf from "./routes/stock/rubros/stkrubroleerconf.mjs";
import stkrubroleerTBR from "./routes/stock/rubros/stkrubroleerTBR.mjs";
import stkrubroleerprov from "./routes/stock/rubros/stkrubroleerprov.mjs";
import stkrubroleerconfgrp from "./routes/stock/rubros/stkrubroleerconfgrp.mjs";
import stkrubroleerabr from "./routes/stock/rubros/stkrubroleerabr.mjs";


//01-06-2023
import stkrubroleerLAT from "./routes/stock/rubros/stkrubroleerLAT.mjs";

import stkitemsleer from "./routes/stock/items/stkitemsleer.mjs";
import stkitemsagregar from "./routes/stock/items/stkitemsagregar.mjs";
import stkitemsmodificar from "./routes/stock/items/stkitemsmodificar.mjs";
import stkitemsborrar from "./routes/stock/items/stkitemsborrar.mjs";
import stkitemsleecod from "./routes/stock/items/stkitemsleecod.mjs";
import stkitemsleecodgryrb from "./routes/stock/items/stkitemsleecodgryrb.mjs";
import stkitemsleecodgrrbit from "./routes/stock/items/stkitemsleecodgrrbit.mjs";
import stkitemsleedetalles from "./routes/stock/items/stkitemsleedetalles.mjs";
import stkitemsleedisp from "./routes/stock/items/stkitemsleedisp.mjs";
import stkitemsmoddisp from "./routes/stock/items/stkitemsmoddisp.mjs";
import stkitemsmodstock from "./routes/stock/items/stkitemsmodstock.mjs";
import stkitemslistaprecios from "./routes/stock/items/stkitemslistaprecios.mjs";
import stkitemscodabr from "./routes/stock/items/stkitemscodabr.mjs";
import stkitemsborrarabr from "./routes/stock/items/stkitemsborrarabr.mjs";
import stkitemsleeabrrub from "./routes/stock/items/stkitemsleeabrrub.mjs";
import stkitemsleecodgr from "./routes/stock/items/stkitemsleecodgr.mjs";

//15-02-2023 OT
import stkitemsleedescabrrub from "./routes/stock/items/stkitemsleedescabrrub.mjs";

import stkitemsventa from "./routes/stock/items/stkitemsventa.mjs"; //una prueba
import stkverificadisp from "./routes/stock/movimientos/stkverificadisp.mjs";
import stkmovsalfinal from "./routes/stock/movimientos/stkmovsalfinal.mjs";
import stkgrabamovsalfinal from "./routes/stock/movimientos/stkgrabamovsalfinal.mjs";
import stkmovenvase from "./routes/stock/movimientos/stkmovenvase.mjs";
import stkmovvtaagregar from "./routes/stock/envase/stkmovvtaagregar.mjs";
import stkenvaseagregar from "./routes/stock/envase/stkenvaseagregar.mjs";
import stkenvaseleeimp from "./routes/stock/envase/stkenvaseleeimp.mjs";
import stkenvasecambiaimp from "./routes/stock/envase/stkenvasecambiaimp.mjs";
import leedatosingreso from "./routes/stock/ingresos/leedatosingreso.mjs";
import sumaingreso from "./routes/stock/ingresos/sumaingreso.mjs";
import listaprecios from "./routes/listaprecios/listaprecios.mjs";
import modprecios from "./routes/listaprecios/modprecios.mjs";

//Movimiento Stock
import leestock from "./routes/movstock/leestock.mjs";

import inventario from "./routes/movstock/inventario.mjs";

//CONSULTAS
//var consultastock = require("./routes/consultas/consultastock");

// PRESUPUESTO
import presupunid from "./routes/presupuesto/presupunid.mjs";

import presuppu from "./routes/presupuesto/presuppu.mjs";
import presuppurec from "./routes/presupuesto/presuppurec.mjs";
import presupfajas from "./routes/presupuesto/presupfajas.mjs";
import presuplonaconf from "./routes/presupuesto/presuplonaconf.mjs";
import presupgraba from "./routes/presupuesto/presupgraba.mjs";
import presupdesfac from "./routes/presupuesto/presupdesfac.mjs";
import presupenrollables from "./routes/presupuesto/presupenrollables.mjs";
import presupbolsontanque from "./routes/presupuesto/presupbolsontanque.mjs";
import presuppiletaenr from "./routes/presupuesto/presuppiletaenr.mjs";
import presupbrazosextens from "./routes/presupuesto/presupbrazosextens.mjs";
import presuplonapiletaelas from "./routes/presupuesto/presuplonapiletaelas.mjs";
import presupcargadesc from "./routes/presupuesto/presupcargadesc.mjs";
import presuplonaabolinada from "./routes/presupuesto/presuplonaabolinada.mjs";
import presupcomedero from "./routes/presupuesto/presupcomedero.mjs";
import presupcambpanio from "./routes/presupuesto/presupcambpanio.mjs";
import presuppiletafca from "./routes/presupuesto/presuppiletafca.mjs";
import presupponchorie from "./routes/presupuesto/presupponchorie.mjs";
import presupmodificamed from "./routes/presupuesto/presupmodificamed.mjs";
import presupabanico from "./routes/presupuesto/presupabanico.mjs";
import presupparcalclee from "./routes/presupuesto/presupparcalc/presupparcalclee.mjs"

//22-12-2022
import presuppisopil from "./routes/presupuesto/presuppisopil.mjs";

//12/06/2023
import presuplatcorr from "./routes/presupuesto/presuplatcorr.mjs";

import presupencableer from "./routes/presupuesto/presupencableer.mjs";
import presupencableenro from "./routes/presupuesto/presupencableenro.mjs";
import presuprenglonleer from "./routes/presupuesto/presuprenglonleer.mjs";
import presupnombre from "./routes/presupuesto/presupnombre.mjs";
import presuprengleer from "./routes/presupuesto/presuprengleer.mjs";
import presupborrar from "./routes/presupuesto/presupborrar.mjs";
import presupborrarenpreview from "./routes/presupuesto/presupborrarenpreview.mjs";

import presupconftipoleer from "./routes/presupuesto/presupconftipo/presupconftipoleer.mjs";
import presupconftipoleerdesc from "./routes/presupuesto/presupconftipo/presupconftipoleerdesc.mjs";
import presupconftipoleeanexo from "./routes/presupuesto/presupconftipo/presupconftipoleeanexo.mjs";
import presupconftipomodificar from "./routes/presupuesto/presupconftipo/presupconftipomodificar.mjs";
import presupconftipoborrar from "./routes/presupuesto/presupconftipo/presupconftipoborrar.mjs";
import presupconftipoagregar from "./routes/presupuesto/presupconftipo/presupconftipoagregar.mjs";
import presupconftipocalc from "./routes/presupuesto/presupconftipo/presupconftipocalc.mjs";
import presupconftipoleerunif from "./routes/presupuesto/presupconftipo/presupconftipoleerunif.mjs";


import presupdetpieleer from "./routes/presupuesto/presupdetpie/presupdetpieleer.mjs";
import presupdetpiemodificar from "./routes/presupuesto/presupdetpie/presupdetpiemodificar.mjs";
import presupdetpieborrar from "./routes/presupuesto/presupdetpie/presupdetpieborrar.mjs";
import presupdetpieagregar from "./routes/presupuesto/presupdetpie/presupdetpieagregar.mjs";
import imppresup from "./routes/impresion/imppresup.mjs";

// var muestrapdf = require("./routes/impresion/muestrapdf");
// var generadoc = require("./routes/impresion/generadoc");

// const router = require("./routes/impresion/imppresup");


//programas para backup
import copiafact from "./routes/procinternos/copiafact.mjs";

// //programas para ordenes de trabajo
// var datosencabpresupeleg = require("./routes/ordentrabajo/datosencabpresupeleg")
// var otarmatabla = require("./routes/ordentrabajo/otarmatabla")
import otorigenpresupagregar from "./routes/ordentrabajo/otorigenpresupagregar.mjs";

import otdatosleer from "./routes/ordentrabajo/otdatosleer.mjs";
import otgraba from "./routes/ordentrabajo/otgraba.mjs";
import otleeencab from "./routes/ordentrabajo/otleeencab.mjs";
import otestadoleer from "./routes/ordentrabajo/otestadoleer.mjs";
import otrengleerpot from "./routes/ordentrabajo/otrengleerpot.mjs";
import otguardapdf from "./routes/ordentrabajo/otguardapdf.mjs";
import otcondpagoleer from "./routes/otcondpago/otcondpagoleer.mjs";
import otcondpagoleercod from "./routes/otcondpago/otcondpagoleercod.mjs";
import otcondpagoagregar from "./routes/otcondpago/otcondpagoagregar.mjs";
import otcondpagomodificar from "./routes/otcondpago/otcondpagomodificar.mjs";
import otcondpagoborrar from "./routes/otcondpago/otcondpagoborrar.mjs";

import otdatoslee from "./routes/ordentrabajo/otdatos/otdatoslee.mjs";
import otdatosagregar from "./routes/ordentrabajo/otdatos/otdatosagregar.mjs";
import otdatosagregaselec from "./routes/ordentrabajo/otdatos/otdatosagregaselec.mjs";

//para ctacte
// var conectaafip = require("./routes/afip/conectaafip")

import paramcompleer from "./routes/ctacte/paramcomp/paramcompleer.mjs";

import paramcompborrar from "./routes/ctacte/paramcomp/paramcompborrar.mjs";
import paramcompagregar from "./routes/ctacte/paramcomp/paramcompagregar.mjs";
import paramcompmodificar from "./routes/ctacte/paramcomp/paramcompmodificar.mjs";
import reparacionleer from "./routes/reparacion/reparacionleer.mjs";
import repleecob from "./routes/reparacion/repleecob.mjs";
import repleevalorhs from "./routes/reparacion/repleevalorhs.mjs";

//prebalance
import pbrubrosagregar from "./routes/prebalance/pbrubros/pbrubrosagregar.mjs";
import pbrubrosleer from "./routes/prebalance/pbrubros/pbrubrosleer.mjs";
import pbrubrosmodificar from "./routes/prebalance/pbrubros/pbrubrosmodificar.mjs";
import pbrubrosborrar from "./routes/prebalance/pbrubros/pbrubrosborrar.mjs";
import pbsubrubrosleer from "./routes/prebalance/subrubros/pbsubrubrosleer.mjs";
import pbrubrosvalueleer from "./routes/prebalance/pbrubros/pbrubrosvalueleer.mjs";
import pbsubrubrosmodificar from "./routes/prebalance/subrubros/pbsubrubrosmodificar.mjs";
import pbsubrubrosagregar from "./routes/prebalance/subrubros/pbsubrubrosagregar.mjs";


function perimitirCrossDomain(req, res, next) {
  // const allowedOrigins = ['*'];
  const allowedOrigins = ['http://localhost:3000',
    'http://192.168.2.108:4000/',
    'http://192.168.2.11',
    'http://localhost:4000',
    'http://localhost:5173'];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"); // Métodos permitidos
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization,X-API-Key" // Incluye el encabezado X-API-Key
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
}



// //traido del viejo backend

// // const { RouterSharp } = require("@material-ui/icons");

// // function agregada por el error CORS
// function perimitirCrossDomain(req, res, next) {
//   //en vez de * se puede definir SÓLO los orígenes que permitimos
//   res.header("Access-Control-Allow-Origin", "*");
//   //metodos http permitidos para CORS
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// }

var app = express();
app.use(cors()); //esto estaba antes de que se colgara


app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, 'public')));

app.use(perimitirCrossDomain);






app.use("/proveedoresleer", proveedoresleer);
app.use("/proveedoresleercod", proveedoresleercod);
app.use("/proveedoresagregar", proveedoresagregar);
app.use("/proveedoresmodificar", proveedoresmodificar);
app.use("/proveedoresleertipo26", proveedoresleertipo26);

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
//02/05/20025
app.use("/stkrubroleerabr", stkrubroleerabr);


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
app.use("/presupborrarenpreview", presupborrarenpreview);


app.use("/presupconftipoleer", presupconftipoleer);
app.use("/presupconftipoleerdesc", presupconftipoleerdesc);
app.use("/presupconftipoleeanexo", presupconftipoleeanexo);
app.use("/presupconftipomodificar", presupconftipomodificar);
app.use("/presupconftipoborrar", presupconftipoborrar);
app.use("/presupconftipoagregar", presupconftipoagregar);
app.use("/presupconftipocalc", presupconftipocalc);
app.use("/presupconftipoleerunif", presupconftipoleerunif);


app.use("/presupdetpieleer", presupdetpieleer);
app.use("/presupdetpiemodificar", presupdetpiemodificar);
app.use("/presupdetpieborrar", presupdetpieborrar);
app.use("/presupdetpieagregar", presupdetpieagregar);
app.use("/presupparcalclee", presupparcalclee);


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

app.use("/otdatoslee", otdatoslee);
app.use("/otdatosagregar", otdatosagregar);
app.use("/otdatosagregaselec", otdatosagregaselec);


//temas ctacte
// app.use("/conectaafip", conectaafip);
app.use("/paramcompleer", paramcompleer);
app.use("/paramcompborrar", paramcompborrar);
app.use("/paramcompagregar", paramcompagregar);
app.use("/paramcompmodificar", paramcompmodificar);

app.use("/reparacionleer", reparacionleer);
app.use("/repleecob", repleecob);
app.use("/repleevalorhs", repleevalorhs);

//prebalance
app.use("/pbrubrosagregar", pbrubrosagregar);
app.use("/pbrubrosleer", pbrubrosleer);
app.use("/pbrubrosmodificar", pbrubrosmodificar);
app.use("/pbrubrosborrar", pbrubrosborrar);
app.use("/pbsubrubrosleer", pbsubrubrosleer);
app.use("/pbrubrosvalueleer", pbrubrosvalueleer);
app.use("/pbsubrubrosmodificar", pbsubrubrosmodificar);
app.use("/pbsubrubrosagregar", pbsubrubrosagregar);


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
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });
export default app;


// const app = express();
// app.use(express.json());
// app.disable('x-powered-by');

// app.use(cors({
//   origin: (origin, callback) => {
//     const ACCEPTED_ORIGINS = [
//       'http://localhost:3000',
//       'http://localhost:7000',
//       'http://192.168.2.108:4000/',
//       'http://192.168.2.11',
//       'http://localhost:4000',
//       'http://localhost:5173'
//     ]

//     if (ACCEPTED_ORIGINS.includes(origin)) {
//       return callback(null, true)
//     }

//     if (!origin) {
//       return callback(null, true)
//     }

//     return callback(new Error('Not allowed by CORS'))
//   }
// }))
// app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express
// const perimitirCrossDomain = (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Permitir solo este origen
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Métodos permitidos
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-API-KEY"); // Agrega aquí tus encabezados personalizados
//   res.header("Access-Control-Allow-Credentials", "true"); // Si necesitas enviar cookies o credenciales

//   // Responde automáticamente a las solicitudes OPTIONS (preflight)
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(204);
//   }

//   next();
// };



// Middleware personalizado para CORS
// app.use(perimitirCrossDomain);

// // Manejo de preflight para CORS
// app.options("*", (req, res) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5137");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
//   res.sendStatus(200);
// });

// Otros middlewares
// app.use(logger("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// // Servir archivos estáticos desde el directorio "public"
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, "public")));

// // Ejemplo de una ruta
// app.get("/api", (req, res) => {
//   res.json({ message: "CORS configurado correctamente" });
// });

// Iniciar servidor
// app.listen(3000, () => {
//   console.log("Servidor corriendo en http://localhost:3000");
// });


/*
// const { RouterSharp } = require("@material-ui/icons");

// function agregada por el error CORS
function perimitirCrossDomain(req, res, next) {
  //en vez de * se puede definir SÓLO los orígenes que permitimos

  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  //metodos http permitidos para CORS
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
}

var app = express();
// app.use(cors()); //esto estaba antes de que se colgara


app.use(perimitirCrossDomain);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, 'public')));

app.use(perimitirCrossDomain);
*/