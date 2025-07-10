import { stkProveedoresAgregar } from "../pages/Tablas/Proveedores/ProveedoresAgregar";
import { StkMonedasAgregar } from "../pages/Tablas/Monedas/StkMonedasAgregar";
import { TransporteAgregar } from "../pages/Tablas/Transporte/TransporteAgregar";
import { StkGruposAgregar } from "../pages/Tablas/StkGrupos/StkGruposAgregar";
import { StkRubroAgregar } from "../pages/Tablas/StkRubros/StkRubroAgregar";
import { StkItemsAgregar } from "../pages/Tablas/StkItems/StkItemsAgregar";
import { stkItemsBuscaCod } from "../pages/Tablas/StkItems/StkItemsBuscaCod";
import { StkUnMedAgregar } from "../pages/Tablas/UnidadMedidas/StkUnMedAgregar";
import { PresupDetPieAgregar } from "../pages/Tablas/PresupDetPie/PresupDetPieAgregar";
import { ClientesAgregar } from "../pages/Tablas/Clientes/ClientesAgregar";
import { ParamCompAgregar } from "../pages/CtasCtes/Tablas/ParamComp/ParamCompAgregar";
import { OTCondPagoAgregar } from "../pages/OrdenTrabajo/OTTablas/OTCondPago/OTCondPagoAgregar";
import { PBRubrosAgregar } from "../pages/PreBalance/PBRubros/PBRubrosAgregar";
import { PBSubRubrosAgregar } from "../pages/PreBalance/PBSubRubros/PBSubRubrosAgregar";
import { PBItemsAgregar } from "../pages/PreBalance/PBItems/PBItemsAgregar";
import { PBPorIVAAgregar } from "../pages/PreBalance/PBPorIVA/PBPorIVAAgregar";
import { OTDatosAgregar } from "../pages/OrdenTrabajo/OTTablas/OTDatos/OTDatosAgregar";
import { CajaIEAgregar } from "../pages/CajaIE/CajaIEAgregar";
export function onRowAdd(newData, formdatos) {
  console.log('newData onRowAdd ', newData);
  console.log('formdatos onRowAdd', formdatos);
  return new Promise((resolve) => {
    setTimeout(() => {
      if (formdatos.tablabase === 'Clientes') {
        ClientesAgregar(newData)
      }
      if (formdatos.tablabase === 'Proveedores') {
        stkProveedoresAgregar(newData)
      }
      if (formdatos.tablabase === 'Monedas') {
        StkMonedasAgregar(newData);
      }
      if (formdatos.tablabase === 'Transportes') {

        TransporteAgregar(newData);
      }
      if (formdatos.tablabase === 'StkGrupos') {
        StkGruposAgregar(newData);
      }
      if (formdatos.tablabase === 'StkRubros') {
        StkRubroAgregar(newData);
      }
      if (formdatos.tablabase === 'UniMedidas') {
        StkUnMedAgregar(newData);

      }
      if (formdatos.tablabase === 'StkItems') {
        // StkItemsAgregar(newData);
        console.log('stkitems', newData);
        stkItemsBuscaCod(newData)
      }
      // if (formdatos.tablabase === 'StkItemsAgregar') {
      //   // StkItemsAgregar(newData);
      //   StkItemsAgregar(newData)
      // }
      if (formdatos.tablabase === 'PresupDetPie') {
        PresupDetPieAgregar(newData);
      }
      if (formdatos.tablabase === 'ParamComp') {
        ParamCompAgregar(newData);
      }
      if (formdatos.tablabase === 'OTCondPago') {
        OTCondPagoAgregar(newData);
      }
      if (formdatos.tablabase === 'PBRubros') {
        PBRubrosAgregar(newData);
      }
      if (formdatos.tablabase === 'PBSubRubros') {
        PBSubRubrosAgregar(newData);
      }
      if (formdatos.tablabase === 'PBItems') {
        PBItemsAgregar(newData);
      }
      if (formdatos.tablabase === 'PBPorIVA') {
        PBPorIVAAgregar(newData);
      }
      if (formdatos.tablabase === 'OTDatos') {
        OTDatosAgregar(newData);
      }
      if (formdatos.tablabase === 'CajaIE') {
        CajaIEAgregar(newData);
      }
      resolve(50);
    }, 100);
  });
}
