import express from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
const ruta = process.env.RUTA_EXTERNA_MEDCLI;
import scans from "./routes/scanear/scans.mjs";
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

import bancosleer from "./routes/bancos/bancosleer.mjs";
import bancosleercod from "./routes/bancos/bancosleercod.mjs";
import bancosagregar from "./routes/bancos/bancosagregar.mjs";
import bancosborrar from "./routes/bancos/bancosborrar.mjs";
import bancosmodificar from "./routes/bancos/bancosmodificar.mjs";
import bancosleercconcta from "./routes/bancos/bancosleercconcta.mjs";


import chequesleer from "./routes/cajaie/cheques/chequesleer.mjs";
import chequesleercod from "./routes/cajaie/cheques/chequesleercod.mjs";
import chequesagregar from "./routes/cajaie/cheques/chequesagregar.mjs";
import chequesmodificar from "./routes/cajaie/cheques/chequesmodificar.mjs";
import cheqencart from "./routes/cajaie/cheques/cheqencart.mjs";

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

import medclileercodfac from "./routes/medidasclientes/medclileercodfac.mjs";
import medcliagregar from "./routes/medidasclientes/medcliagregar.mjs";
import medcliimagen from "./routes/medidasclientes/medcliimagen.mjs";
import medclileerultot from "./routes/medidasclientes/medclileerultot.mjs";
import medcliconvertidor from "./routes/medidasclientes/medcliconvertidor.mjs";

import buscaigualarcli from "./routes/procesp/buscaigualarcli.mjs";
import modificclientedc from "./routes/procesp/modificclientedc.mjs";
import clientescambnom from "./routes/procesp/clientescambnom.mjs";

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
import movstockleemovele from "./routes/stock/movstock/movstockleemovele.mjs";


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
import presupborrar from "./routes/presupuesto/presupborrar.mjs";
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

import otgraba from "./routes/ordentrabajo/otgraba.mjs";
import otleeencab from "./routes/ordentrabajo/otleeencab.mjs";
import otrengleerpot from "./routes/ordentrabajo/otrengleerpot.mjs";
import otguardapdf from "./routes/ordentrabajo/otguardapdf.mjs";
import otmodificaestado from "./routes/ordentrabajo/otmodificaestado.mjs";


import otcondpagoleer from "./routes/otcondpago/otcondpagoleer.mjs";
import otcondpagoleercod from "./routes/otcondpago/otcondpagoleercod.mjs";
import otcondpagoagregar from "./routes/otcondpago/otcondpagoagregar.mjs";
import otcondpagomodificar from "./routes/otcondpago/otcondpagomodificar.mjs";
import otcondpagoborrar from "./routes/otcondpago/otcondpagoborrar.mjs";

import otestadoleer from "./routes/otestado/otestadoleer.mjs";
import otestadomodificar from "./routes/otestado/otestadomodificar.mjs";
import otestadoborrar from "./routes/otestado/otestadoborrar.mjs";
import otestadoagregar from "./routes/otestado/otestadoagregar.mjs";
import otestadoleercod from "./routes/otestado/otestadoleercod.mjs";

// import otdatoslee from "./routes/ordentrabajo/otdatos/otdatoslee.mjs";
import otdatosleer from "./routes/ordentrabajo/otdatos/otdatosleer.mjs";
import otdatosagregar from "./routes/ordentrabajo/otdatos/otdatosagregar.mjs";
import otdatosborrar from "./routes/ordentrabajo/otdatos/otdatosborrar.mjs";
import otdatosagregaselec from "./routes/ordentrabajo/otdatos/otdatosagregaselec.mjs";
import otdatosborrarselec from "./routes/ordentrabajo/otdatos/otdatosborrarselec.mjs";
import otdatosmodificar from "./routes/ordentrabajo/otdatos/otdatosmodificar.mjs";
import otdatosreordentabla from "./routes/ordentrabajo/otdatos/otdatosreordentabla.mjs";
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
import pbitemsmodificar from "./routes/prebalance/items/pbitemsmodificar.mjs";
import pbitemsborrar from "./routes/prebalance/items/pbitemsborrar.mjs";
import pblistamovpsubrubro from "./routes/prebalance/pblistamovpsubrubro.mjs";

import pbcomprobantesleer from "./routes/prebalance/pbcomprobantes/pbcomprobantesleer.mjs";
import pbcomprobantesborrar from "./routes/prebalance/pbcomprobantes/pbcomprobantesborrar.mjs";
import pbcomprobantesmodificar from "./routes/prebalance/pbcomprobantes/pbcomprobantesmodificar.mjs";
import pbcomprobantesleervalue from "./routes/prebalance/pbcomprobantes/pbcomprobantesleervalue.mjs";
import pblistaprebalance from "./routes/prebalance/pblistaprebalance.mjs";

import porivaleer from "./routes/poriva/porivaleer.mjs";
import porivaagregar from "./routes/poriva/porivaagregar.mjs";
import porivamodificar from "./routes/poriva/porivamodificar.mjs";
import porivaborrar from "./routes/poriva/porivaborrar.mjs";
import porivavalueleer from "./routes/poriva/porivavalueleer.mjs";

import pbivapagleer from "./routes/prebalance/pbivapag/pbivapagleer.mjs";
import pbivapagagregar from "./routes/prebalance/pbivapag/pbivapagagregar.mjs";
import pbivapagmodificar from "./routes/prebalance/pbivapag/pbivapagmodificar.mjs";
import pbivapagborrar from "./routes/prebalance/pbivapag/pbivapagborrar.mjs";

import pbvtasleeabierto from "./routes/prebalance/pbvtas/pbvtasleeabierto.mjs";
import pbvtasmodificar from "./routes/prebalance/pbvtas/pbvtasmodificar.mjs";
import pbvtasmodifcierre from "./routes/prebalance/pbvtas/pbvtasmodifcierre.mjs";
import pbvtasmodivta from "./routes/prebalance/pbvtas/pbvtasmodivta.mjs";

import genimppresup from "./routes/impresion/genimppresup.mjs";
import generarpdfpresup from "./routes/impresion/generarpdfpresup.mjs";
// import genpdfprebalance from "./routes/impresion/genpdfprebalance.mjs";
// import { pblismov } from "./routes/impresion/pblismov.mjs";
// import enviowa from "./routes/comuicacionexterna/enviowa.mjs";

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json()); // Reemplaza a bodyParser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", genimppresup);
app.use("/api", generarpdfpresup);
app.use('/archivos', express.static(ruta));
app.use("/api/scans", scans);
// app.use("/api", genpdfprebalance);
// app.use("/api", pblismov);

app.use("/api/verificaclave", verificaclave);


app.use("/api/proveedoresleer", proveedoresleer);
app.use("/api/proveedoresagregar", proveedoresagregar);
app.use("/api/proveedoresmodificar", proveedoresmodificar);
app.use("/api/proveedoresleertipo26", proveedoresleertipo26);
app.use("/api/proveedoresvalueleer", proveedoresvalueleer);
app.use("/api/proveedoresborrar", proveedoresborrar);

app.use("/api/cajaieleer", cajaieleer);
app.use("/api/cajaipleer", cajaipleer);
app.use("/api/cajacpleer", cajacpleer);
app.use("/api/cajaieagregar", cajaieagregar);
app.use("/api/cajacierre", cajacierre);
app.use("/api/cajacierreparamlee", cajacierreparamlee);
app.use("/api/billetesleer", billetesleer);
app.use("/api/cajasaldoefleer", cajasaldoefleer);
app.use("/api/cajasaldoefagregar", cajasaldoefagregar);
app.use("/api/cajaiesumamov", cajaiesumamov);
app.use("/api/buscaie", buscaie);
app.use("/api/cajaieestadistica", cajaieestadistica);

app.use("/api/bancosleer", bancosleer);
app.use("/api/bancosagregar", bancosagregar);
app.use("/api/bancosborrar", bancosborrar);
app.use("/api/bancosmodificar", bancosmodificar);
app.use("/api/bancosleercod", bancosleercod);
app.use("/api/bancosleercconcta", bancosleercconcta);

app.use("/api/chequesleer", chequesleer);
app.use("/api/chequesleercod", chequesleercod);
app.use("/api/chequesagregar", chequesagregar);
app.use("/api/chequesmodificar", chequesmodificar);
app.use("/api/cheqencart", cheqencart);

app.use("/api/cajainternaleer", cajainternaleer);
app.use("/api/cajainternaagregar", cajainternaagregar);
app.use("/api/cajainternaborrar", cajainternaborrar);
app.use("/api/cajainternamodificar", cajainternamodificar);
app.use("/api/cajainternasileer", cajainternasileer);
app.use("/api/cajainternasumatot", cajainternasumatot);


app.use("/api/clientesleer", clientesleer);
app.use("/api/clientesleercod", clientesleercod);
app.use("/api/clientesleerdesc", clientesleerdesc);
app.use("/api/clientesagregar", clientesagregar);
app.use("/api/clientesmodificar", clientesmodificar);
app.use("/api/clientesborrar", clientesborrar);
app.use("/api/clientesleercodmayor", clientesleercodmayor);
app.use("/api/clientesleerdescmayigual", clientesleerdescmayigual);
app.use("/api/clientesleerpresup", clientesleerpresup);
app.use("/api/clientestraenuevos", clientestraenuevos);
app.use("/api/clientescobol", clientescobol);
app.use("/api/clientesleerencabot", clientesleerencabot);
app.use("/api/clientesleerdescod", clientesleerdescod);

app.use("/api/medclileercodfac", medclileercodfac);
app.use("/api/medcliagregar", medcliagregar);
app.use("/api/medcliimagen", medcliimagen);
app.use("/api/medclileerultot", medclileerultot);
app.use("/api/medcliconvertidor", medcliconvertidor);

app.use("/api/buscaigualarcli", buscaigualarcli);
app.use("/api/modificclientedc", modificclientedc);
app.use("/api/clientescambnom", clientescambnom);

app.use("/api/transporteleer", transporteleer);
app.use("/api/transporteleercod", transporteleercod);
app.use("/api/transporteagregar", transporteagregar);
app.use("/api/transportemodificar", transportemodificar);
app.use("/api/transporteborrar", transporteborrar);

app.use("/api/stkbgsubrubroleer", stkbgsubrubroleer);

app.use("/api/stkmonedasleer", stkmonedasleer);
app.use("/api/stkmonedasleerp", stkmonedasleerp);
app.use("/api/stkmonedasleercod", stkmonedasleercod);
app.use("/api/stkmonedasagregar", stkmonedasagregar);
app.use("/api/stkmonedasmodificar", stkmonedasmodificar);
app.use("/api/stkmonedasborrar", stkmonedasborrar);
app.use("/api/stkmonedasleerred", stkmonedasleerred);
app.use("/api/stkmonedasleerorig", stkmonedasleerorig);

app.use("/api/stkunmedleer", stkunmedleer);
app.use("/api/stkunmedleercod", stkunmedleercod);
app.use("/api/stkunmedagregar", stkunmedagregar);
app.use("/api/stkunmedmodificar", stkunmedmodificar);
app.use("/api/stkunmedborrar", stkunmedborrar);
app.use("/api/stkunmedleerred", stkunmedleerred);



app.use("/api/stkgrupoleer", stkgrupoleer);
app.use("/api/stkgrupoleeselec", stkgrupoleeselec);
app.use("/api/stkgrupoleercod", stkgrupoleercod);
app.use("/api/stkgrupoagregar", stkgrupoagregar);
app.use("/api/stkgrupomodificar", stkgrupomodificar);
app.use("/api/stkgrupoborrar", stkgrupoborrar);
app.use("/api/stkgrupoleerred", stkgrupoleerred);
app.use("/api/stkgrupoleerredrubros", stkgrupoleerredrubros);

app.use("/api/stkubfisicaleer", stkubfisicaleer);
app.use("/api/stkubfisicaagregar", stkubfisicaagregar);
app.use("/api/stkubfisicaborrar", stkubfisicaborrar);
app.use("/api/stkubfisicaleerUbG", stkubfisicaleerUbG);

app.use("/api/stkrubroleer", stkrubroleer);
app.use("/api/stkrubroleeselec", stkrubroleeselec);
app.use("/api/stkrubroleermezcla", stkrubroleermezcla);
app.use("/api/stkrubroagregar", stkrubroagregar);
app.use("/api/stkrubromodificar", stkrubromodificar);
app.use("/api/stkrubroborrar", stkrubroborrar);
app.use("/api/stkrubroleeultnro", stkrubroleeultnro);
app.use("/api/stkrubroleeproveedor", stkrubroleeproveedor);
app.use("/api/stkrubroleerdesc", stkrubroleerdesc);
app.use("/api/stkrubroleerconf", stkrubroleerconf);
app.use("/api/stkrubroleerTBR", stkrubroleerTBR);
app.use("/api/stkrubroleerprov", stkrubroleerprov);
app.use("/api/stkrubroleerLAT", stkrubroleerLAT);
app.use("/api/stkrubroleerabr", stkrubroleerabr);


app.use("/api/stkitemsagregar", stkitemsagregar);
app.use("/api/stkitemsmodificar", stkitemsmodificar);
app.use("/api/stkitemsborrar", stkitemsborrar);
app.use("/api/stkitemsleecod", stkitemsleecod);
app.use("/api/stkitemsleedetalles", stkitemsleedetalles);
app.use("/api/stkitemscodabr", stkitemscodabr);
app.use("/api/stkitemsleeabrrub", stkitemsleeabrrub);
//15-02-2023 OT
app.use("/api/stkitemsleedescabrrub", stkitemsleedescabrrub);



app.use("/api/stkitemslistaprecios", stkitemslistaprecios);



app.use("/api/leedatosingreso", leedatosingreso);
app.use("/api/sumaingreso", sumaingreso);
app.use("/api/realizacambiostock", realizacambiostock);
app.use("/api/movstockagregar", movstockagregar);
app.use("/api/movstockleer", movstockleer);
app.use("/api/movstockleetipoconf", movstockleetipoconf);
app.use("/api/movstockleemovele", movstockleemovele);

// app.use('/imprime1', imprime1);
// app.use("/api/stkmovvtaagregar", stkmovvtaagregar);

app.use("/api/listaprecios", listaprecios);
app.use("/api/modprecios", modprecios);

//Movimiento stock
app.use("/api/inventario", inventario);

//PRESUPUESTO
app.use("/api/presupunid", presupunid);
app.use("/api/presuppu", presuppu);
app.use("/api/presuppurec", presuppurec);
app.use("/api/presupfajas", presupfajas);
app.use("/api/presuplonaconf", presuplonaconf);
app.use("/api/presupgraba", presupgraba);
app.use("/api/presupdesfac", presupdesfac);
app.use("/api/presupenrollables", presupenrollables);
app.use("/api/presupbolsontanque", presupbolsontanque);
app.use("/api/presuppiletaenr", presuppiletaenr);
app.use("/api/presupbrazosextens", presupbrazosextens);
app.use("/api/presuplonapiletaelas", presuplonapiletaelas);
app.use("/api/presupcargadesc", presupcargadesc);
app.use("/api/presuplonaabolinada", presuplonaabolinada);
app.use("/api/presupcomedero", presupcomedero);
app.use("/api/presupcambpanio", presupcambpanio);
app.use("/api/presuppiletafca", presuppiletafca);
app.use("/api/presuppiletacadsol", presuppiletacadsol);
app.use("/api/presupponchorie", presupponchorie);
app.use("/api/presupmodificamed", presupmodificamed);
app.use("/api/presupabanico", presupabanico);
//22-12-2022
app.use("/api/presuppisopil", presuppisopil);
//12-06-2023
app.use("/api/presuplatcorr", presuplatcorr);


app.use("/api/presupencableer", presupencableer);
app.use("/api/presupencableenro", presupencableenro);
app.use("/api/presuprenglonleer", presuprenglonleer);
// app.use("/api/presupnombre", presupnombre);
app.use("/api/presupborrar", presupborrar);
// app.use("/api/presupborrarenpreview", presupborrarenpreview);


app.use("/api/presupconftipoleer", presupconftipoleer);
app.use("/api/presupconftipoleerdesc", presupconftipoleerdesc);
app.use("/api/presupconftipoleeanexo", presupconftipoleeanexo);
app.use("/api/presupconftipomodificar", presupconftipomodificar);
app.use("/api/presupconftipoborrar", presupconftipoborrar);
app.use("/api/presupconftipoagregar", presupconftipoagregar);
app.use("/api/presupconftipocalc", presupconftipocalc);
app.use("/api/presupconftipoleerunif", presupconftipoleerunif);


app.use("/api/presupdetpieleer", presupdetpieleer);
app.use("/api/presupdetpiemodificar", presupdetpiemodificar);
app.use("/api/presupdetpieborrar", presupdetpieborrar);
app.use("/api/presupdetpieagregar", presupdetpieagregar);



app.use("/api/presupcalexpleer", presupcalexpleer);
app.use("/api/presupcalexpmodificar", presupcalexpmodificar);
app.use("/api/presupcalexpborrar", presupcalexpborrar);
app.use("/api/presupcalexpagregar", presupcalexpagregar);

app.use("/api/presupparcalclee", presupparcalclee);

app.use("/api/copiafact", copiafact);

//programas para ordenes de trabajo
app.use("/api/otorigenpresupagregar", otorigenpresupagregar);
app.use("/api/otdatosleer", otdatosleer);
app.use("/api/otgraba", otgraba);
app.use("/api/otleeencab", otleeencab);
app.use("/api/otrengleerpot", otrengleerpot);
app.use("/api/otguardapdf", otguardapdf);
app.use("/api/otdatosmodificar", otdatosmodificar);
app.use("/api/otdatosreordentabla", otdatosreordentabla);
app.use("/api/otmodificaestado", otmodificaestado);


app.use("/api/otcondpagoleer", otcondpagoleer);
app.use("/api/otcondpagoleercod", otcondpagoleercod);
app.use("/api/otcondpagoagregar", otcondpagoagregar);
app.use("/api/otcondpagomodificar", otcondpagomodificar);
app.use("/api/otcondpagoborrar", otcondpagoborrar);

app.use("/api/otestadoleer", otestadoleer);
app.use("/api/otestadomodificar", otestadomodificar);
app.use("/api/otestadoborrar", otestadoborrar);
app.use("/api/otestadoagregar", otestadoagregar);
app.use("/api/otestadoleercod", otestadoleercod);

// app.use("/api/otdatoslee", otdatoslee);
app.use("/api/otdatosagregar", otdatosagregar);
app.use("/api/otdatosborrar", otdatosborrar);
app.use("/api/otdatosagregaselec", otdatosagregaselec);
app.use("/api/otdatosborrarselec", otdatosborrarselec);


//temas ctacte
// app.use("/api/conectaafip", conectaafip);
app.use("/api/paramcompleer", paramcompleer);
app.use("/api/paramcompborrar", paramcompborrar);
app.use("/api/paramcompagregar", paramcompagregar);
app.use("/api/paramcompmodificar", paramcompmodificar);

app.use("/api/repleecob", repleecob);
app.use("/api/repleevalorhs", repleevalorhs);

//prebalance
app.use("/api/pbrubrosagregar", pbrubrosagregar);
app.use("/api/pbrubrosleer", pbrubrosleer);
app.use("/api/pbrubrosmodificar", pbrubrosmodificar);
app.use("/api/pbrubrosborrar", pbrubrosborrar);
app.use("/api/pbsubrubrosleer", pbsubrubrosleer);
app.use("/api/pbrubrosvalueleer", pbrubrosvalueleer);
app.use("/api/pbsubrubrosmodificar", pbsubrubrosmodificar);
app.use("/api/pbsubrubrosagregar", pbsubrubrosagregar);
app.use("/api/pbsubrubrosborrar", pbsubrubrosborrar);
app.use("/api/pbsubrubrosvalueleer", pbsubrubrosvalueleer);
app.use("/api/pbitemsleer", pbitemsleer);
app.use("/api/pbitemsagregar", pbitemsagregar);
app.use("/api/pbitemsmodificar", pbitemsmodificar);
app.use("/api/pbitemsborrar", pbitemsborrar);
app.use("/api/pblistamovpsubrubro", pblistamovpsubrubro);

app.use("/api/pbcomprobantesleer", pbcomprobantesleer);
app.use("/api/pbcomprobantesborrar", pbcomprobantesborrar);
app.use("/api/pbcomprobantesmodificar", pbcomprobantesmodificar);
app.use("/api/pbcomprobantesleervalue", pbcomprobantesleervalue);
app.use("/api/pblistaprebalance", pblistaprebalance);

app.use("/api/porivaleer", porivaleer);
app.use("/api/porivaagregar", porivaagregar);
app.use("/api/porivamodificar", porivamodificar);
app.use("/api/porivaborrar", porivaborrar);
app.use("/api/porivavalueleer", porivavalueleer);

app.use("/api/pbivapagleer", pbivapagleer);
app.use("/api/pbivapagagregar", pbivapagagregar);
app.use("/api/pbivapagmodificar", pbivapagmodificar);
app.use("/api/pbivapagborrar", pbivapagborrar);

app.use("/api/pbvtasleeabierto", pbvtasleeabierto);
app.use("/api/pbvtasmodificar", pbvtasmodificar);
app.use("/api/pbvtasmodifcierre", pbvtasmodifcierre);
app.use("/api/pbvtasmodivta", pbvtasmodivta);

app.use("/api/", proveedoresleer);

// app.use("/api/enviowa", enviowa);

// app.listen(PORT, () => {
//     console.log(`Servidor unificado corriendo en http://localhost:${PORT}`);
// });
export default app;
