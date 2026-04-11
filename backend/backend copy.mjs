import express from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import fs from 'fs';
//el mensaje que larga al ejecutarse el backend es el de la pimer linea del requiere en este caso proveedoresleer
import verificaclave from "./routes/controlusuarios/verificaclave.mjs";

import proveedoresleer from "./routes/proveedores/proveedoresleer.mjs";

import proveedoresagregar from "./routes/proveedores/proveedoresagregar.mjs";
import proveedoresborrar from "./routes/proveedores/proveedoresborrar.mjs";
import proveedoresmodificar from "./routes/proveedores/proveedoresmodificar.mjs";
import proveedoresleertipo26 from "./routes/proveedores/proveedoresleertipo26.mjs";
import proveedoresvalueleer from "./routes/proveedores/proveedoresvalueleer.mjs";

import cajaieleer from "./routes/cajaie/cajaieleer.mjs";
import cajaipleer from "./routes/cajaie/cajaipleer.mjs";
import cajacpleer from "./routes/cajaie/cajacpleer.mjs";
import cajaieagregar from "./routes/cajaie/cajaieagregar.mjs";
import cajacierre from "./routes/cajaie/cajacierre.mjs";
import cajacierreparamlee from "./routes/cajaie/cajacierreparamlee.mjs";
import billetesleer from "./routes/cajaie/billetesleer.mjs";
import cajasaldoefleer from "./routes/cajaie/cajasaldoefleer.mjs";
import cajasaldoefagregar from "./routes/cajaie/cajasaldoefagregar.mjs";
import cajaiesumamov from "./routes/cajaie/cajaiesumamov.mjs";
import buscaie from "./routes/cajaie/buscaie.mjs";
import cajaieestadistica from "./routes/cajaie/cajaieestadistica.mjs";


import cajainternaleer from "./routes/cajaie/cajainterna/cajainternaleer.mjs";
import cajainternaagregar from "./routes/cajaie/cajainterna/cajainternaagregar.mjs";
import cajainternaborrar from "./routes/cajaie/cajainterna/cajainternaborrar.mjs";
import cajainternamodificar from "./routes/cajaie/cajainterna/cajainternamodificar.mjs";
import cajainternasileer from "./routes/cajaie/cajainterna/cajainternasileer.mjs";
import cajainternasumatot from "./routes/cajaie/cajainterna/cajainternasumatot.mjs";

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
import clientesleerencabot from "./routes/clientes/clientesleerencabot.mjs";
import clientesleerdescod from "./routes/clientes/clientesleerdescod.mjs";

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
import stkubfisicaagregar from "./routes/stock/ubfisica/stkubfisicaagregar.mjs";
import stkubfisicaborrar from "./routes/stock/ubfisica/stkubfisicaborrar.mjs";
import stkubfisicaleerUbG from "./routes/stock/ubfisica/stkubfisicaleerUbG.mjs";

import stkrubroleer from "./routes/stock/rubros/stkrubroleer.mjs";
import stkrubroleeselec from "./routes/stock/rubros/stkrubroleeselec.mjs";
import stkrubroleermezcla from "./routes/stock/rubros/stkrubroleermezcla.mjs";
import stkrubroagregar from "./routes/stock/rubros/stkrubroagregar.mjs";
import stkrubromodificar from "./routes/stock/rubros/stkrubromodificar.mjs";
import stkrubroborrar from "./routes/stock/rubros/stkrubroborrar.mjs";
import stkrubroleeultnro from "./routes/stock/rubros/stkrubroleeultnro.mjs";
import stkrubroleeproveedor from "./routes/stock/rubros/stkrubroleeproveedor.mjs";
import stkrubroleerdesc from "./routes/stock/rubros/stkrubroleerdesc.mjs";
import stkrubroleerconf from "./routes/stock/rubros/stkrubroleerconf.mjs";
import stkrubroleerTBR from "./routes/stock/rubros/stkrubroleerTBR.mjs";
import stkrubroleerprov from "./routes/stock/rubros/stkrubroleerprov.mjs";
import stkrubroleerabr from "./routes/stock/rubros/stkrubroleerabr.mjs";


//01-06-2023
import stkrubroleerLAT from "./routes/stock/rubros/stkrubroleerLAT.mjs";

import stkitemsagregar from "./routes/stock/items/stkitemsagregar.mjs";
import stkitemsmodificar from "./routes/stock/items/stkitemsmodificar.mjs";
import stkitemsborrar from "./routes/stock/items/stkitemsborrar.mjs";
import stkitemsleecod from "./routes/stock/items/stkitemsleecod.mjs";
import stkitemsleedetalles from "./routes/stock/items/stkitemsleedetalles.mjs";
import stkitemslistaprecios from "./routes/stock/items/stkitemslistaprecios.mjs";
import stkitemscodabr from "./routes/stock/items/stkitemscodabr.mjs";
import stkitemsleeabrrub from "./routes/stock/items/stkitemsleeabrrub.mjs";

//15-02-2023 OT
import stkitemsleedescabrrub from "./routes/stock/items/stkitemsleedescabrrub.mjs";

import leedatosingreso from "./routes/stock/movstock/leedatosingreso.mjs";
import sumaingreso from "./routes/stock/movstock/sumaingreso.mjs";
import realizacambiostock from "./routes/stock/movstock/realizacambiostock.mjs";
import listaprecios from "./routes/listaprecios/listaprecios.mjs";
import modprecios from "./routes/listaprecios/modprecios.mjs";
import movstockagregar from "./routes/stock/movstock/movstockagregar.mjs";
import movstockleer from "./routes/stock/movstock/movstockleer.mjs";
import movstockleetipoconf from "./routes/stock/movstock/movstockleetipoconf.mjs";


//Movimiento Stock
import inventario from "./routes/movstock/inventario.mjs";

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
import presuppiletacadsol from "./routes/presupuesto/presuppiletacadsol.mjs";
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
// import presupnombre from "./routes/presupuesto/presupnombre.mjs";
// import presupborrar from "./routes/presupuesto/presupborrar.mjs";
// import presupborrarenpreview from "./routes/presupuesto/presupborrarenpreview.mjs";

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


import presupcalexpleer from "./routes/presupuesto/presupcalexp/presupcalexpleer.mjs";
import presupcalexpmodificar from "./routes/presupuesto/presupcalexp/presupcalexpmodificar.mjs";
import presupcalexpborrar from "./routes/presupuesto/presupcalexp/presupcalexpborrar.mjs";
import presupcalexpagregar from "./routes/presupuesto/presupcalexp/presupcalexpagregar.mjs";



//programas para backup
import copiafact from "./routes/procinternos/copiafact.mjs";

// //programas para ordenes de trabajo
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
import otdatosmodificar from "./routes/ordentrabajo/otdatos/otdatosmodificar.mjs";
//para ctacte
// var conectaafip = require("./routes/afip/conectaafip"

import paramcompleer from "./routes/ctacte/paramcomp/paramcompleer.mjs";

import paramcompborrar from "./routes/ctacte/paramcomp/paramcompborrar.mjs";
import paramcompagregar from "./routes/ctacte/paramcomp/paramcompagregar.mjs";
import paramcompmodificar from "./routes/ctacte/paramcomp/paramcompmodificar.mjs";
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
import pbsubrubrosborrar from "./routes/prebalance/subrubros/pbsubrubrosborrar.mjs";
import pbsubrubrosvalueleer from "./routes/prebalance/subrubros/pbsubrubrosvalueleer.mjs";
import pbitemsleer from "./routes/prebalance/items/pbitemsleer.mjs";
import pbitemsagregar from "./routes/prebalance/items/pbitemsagregar.mjs";

import pbcomprobantesleer from "./routes/prebalance/pbcomprobantes/pbcomprobantesleer.mjs";
import pbcomprobantesborrar from "./routes/prebalance/pbcomprobantes/pbcomprobantesborrar.mjs";
import pbcomprobantesmodificar from "./routes/prebalance/pbcomprobantes/pbcomprobantesmodificar.mjs";

import porivaleer from "./routes/poriva/porivaleer.mjs";
import porivaagregar from "./routes/poriva/porivaagregar.mjs";
import porivamodificar from "./routes/poriva/porivamodificar.mjs";
import porivaborrar from "./routes/poriva/porivaborrar.mjs";
import porivavalueleer from "./routes/poriva/porivavalueleer.mjs";

import genimppresup from "./routes/impresion/genimppresup.mjs";
import generarpdfpresup from "./routes/impresion/generarpdfpresup.mjs";

// --- 1. MIDDLEWARES BÁSICOS ---
var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json()); // Reemplaza a bodyParser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", genimppresup);
app.use("/", generarpdfpresup);
app.use("/verificaclave", verificaclave);


app.use("/proveedoresleer", proveedoresleer);
app.use("/proveedoresagregar", proveedoresagregar);
app.use("/proveedoresmodificar", proveedoresmodificar);
app.use("/proveedoresleertipo26", proveedoresleertipo26);
app.use("/proveedoresvalueleer", proveedoresvalueleer);
app.use("/proveedoresborrar", proveedoresborrar);

app.use("/cajaieleer", cajaieleer);
app.use("/cajaipleer", cajaipleer);
app.use("/cajacpleer", cajacpleer);
app.use("/cajaieagregar", cajaieagregar);
app.use("/cajacierre", cajacierre);
app.use("/cajacierreparamlee", cajacierreparamlee);
app.use("/billetesleer", billetesleer);
app.use("/cajasaldoefleer", cajasaldoefleer);
app.use("/cajasaldoefagregar", cajasaldoefagregar);
app.use("/cajaiesumamov", cajaiesumamov);
app.use("/buscaie", buscaie);
app.use("/cajaieestadistica", cajaieestadistica);


app.use("/cajainternaleer", cajainternaleer);
app.use("/cajainternaagregar", cajainternaagregar);
app.use("/cajainternaborrar", cajainternaborrar);
app.use("/cajainternamodificar", cajainternamodificar);
app.use("/cajainternasileer", cajainternasileer);
app.use("/cajainternasumatot", cajainternasumatot);


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
app.use("/clientesleerencabot", clientesleerencabot);
app.use("/clientesleerdescod", clientesleerdescod);

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
app.use("/stkubfisicaagregar", stkubfisicaagregar);
app.use("/stkubfisicaborrar", stkubfisicaborrar);
app.use("/stkubfisicaleerUbG", stkubfisicaleerUbG);

app.use("/stkrubroleer", stkrubroleer);
app.use("/stkrubroleeselec", stkrubroleeselec);
app.use("/stkrubroleermezcla", stkrubroleermezcla);
app.use("/stkrubroagregar", stkrubroagregar);
app.use("/stkrubromodificar", stkrubromodificar);
app.use("/stkrubroborrar", stkrubroborrar);
app.use("/stkrubroleeultnro", stkrubroleeultnro);
app.use("/stkrubroleeproveedor", stkrubroleeproveedor);
app.use("/stkrubroleerdesc", stkrubroleerdesc);
app.use("/stkrubroleerconf", stkrubroleerconf);
app.use("/stkrubroleerTBR", stkrubroleerTBR);
app.use("/stkrubroleerprov", stkrubroleerprov);
app.use("/stkrubroleerLAT", stkrubroleerLAT);
app.use("/stkrubroleerabr", stkrubroleerabr);


app.use("/stkitemsagregar", stkitemsagregar);
app.use("/stkitemsmodificar", stkitemsmodificar);
app.use("/stkitemsborrar", stkitemsborrar);
app.use("/stkitemsleecod", stkitemsleecod);
app.use("/stkitemsleedetalles", stkitemsleedetalles);
app.use("/stkitemscodabr", stkitemscodabr);
app.use("/stkitemsleeabrrub", stkitemsleeabrrub);
//15-02-2023 OT
app.use("/stkitemsleedescabrrub", stkitemsleedescabrrub);



app.use("/stkitemslistaprecios", stkitemslistaprecios);



app.use("/leedatosingreso", leedatosingreso);
app.use("/sumaingreso", sumaingreso);
app.use("/realizacambiostock", realizacambiostock);
app.use("/movstockagregar", movstockagregar);
app.use("/movstockleer", movstockleer);
app.use("/movstockleetipoconf", movstockleetipoconf);

// app.use('/imprime1', imprime1);
// app.use("/stkmovvtaagregar", stkmovvtaagregar);

app.use("/listaprecios", listaprecios);
app.use("/modprecios", modprecios);

//Movimiento stock
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
app.use("/presuppiletacadsol", presuppiletacadsol);
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
// app.use("/presupnombre", presupnombre);
// app.use("/presupborrar", presupborrar);
// app.use("/presupborrarenpreview", presupborrarenpreview);


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



app.use("/presupcalexpleer", presupcalexpleer);
app.use("/presupcalexpmodificar", presupcalexpmodificar);
app.use("/presupcalexpborrar", presupcalexpborrar);
app.use("/presupcalexpagregar", presupcalexpagregar);

app.use("/presupparcalclee", presupparcalclee);







app.use("/copiafact", copiafact);

//programas para ordenes de trabajo
app.use("/otorigenpresupagregar", otorigenpresupagregar);
app.use("/otdatosleer", otdatosleer);
app.use("/otgraba", otgraba);
app.use("/otleeencab", otleeencab);
app.use("/otestadoleer", otestadoleer);
app.use("/otrengleerpot", otrengleerpot);
app.use("/otguardapdf", otguardapdf);
app.use("/otdatosmodificar", otdatosmodificar);



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
app.use("/pbsubrubrosborrar", pbsubrubrosborrar);
app.use("/pbsubrubrosvalueleer", pbsubrubrosvalueleer);
app.use("/pbitemsleer", pbitemsleer);
app.use("/pbitemsagregar", pbitemsagregar);

app.use("/pbcomprobantesleer", pbcomprobantesleer);
app.use("/pbcomprobantesborrar", pbcomprobantesborrar);
app.use("/pbcomprobantesmodificar", pbcomprobantesmodificar);

app.use("/porivaleer", porivaleer);
app.use("/porivaagregar", porivaagregar);
app.use("/porivamodificar", porivamodificar);
app.use("/porivaborrar", porivaborrar);
app.use("/porivavalueleer", porivavalueleer);

// app.use("/", proveedoresleer);


// app.use('/documentos', express.static(path.join(process.env.RUTA_INTERNA_DOC, 'public')));
// app.use(express.static(path.join(__dirname, 'dist')));
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const rutaDist = path.join(__dirname, 'dist');
// app.use(express.static(rutaDist));
// // --- 5. EL COMODÍN (Catch-all para React) ---

// app.get('*', (req, res) => {
//   // Si la ruta es de API y no existe, damos 404
//   if (req.path.startsWith('/api') || req.path.startsWith('/clientes')) {
//     return res.status(404).json({ error: "Ruta no encontrada" });
//   }

//   // Si no, mandamos el index.html
//   const indexFile = path.join(rutaDist, 'index.html');
//   res.sendFile(indexFile, (err) => {
//     if (err) {
//       console.error("❌ No se encontró index.html en:", indexFile);
//       res.status(500).send("Error: No existe la carpeta dist o el index.html");
//     }
//   });
// });
export default app;
// //esto debo agregarlo en el backend cuando estoy en producción
// // const PORT = 4000;
// // app.listen(PORT, () => {
// //   console.log(`🚀 API del Backend corriendo en http://localhost:${PORT}`);
// // });
