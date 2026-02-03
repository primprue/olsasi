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
import { CajaInternaAgregar } from "../pages/CajaIE/CajaInterna/CajaInternaAgregar";
export async function onRowAdd(newData, formdatos) {
  // Eliminamos el setTimeout artificial y usamos async/await
  try {
    // export function onRowAdd(newData, formdatos) {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    if (formdatos.tablabase === 'Clientes') {
      await ClientesAgregar(newData)
    }
    if (formdatos.tablabase === 'Proveedores') {
      await stkProveedoresAgregar(newData)
    }
    if (formdatos.tablabase === 'Monedas') {
      await StkMonedasAgregar(newData);
    }
    if (formdatos.tablabase === 'Transportes') {
      await TransporteAgregar(newData);
    }
    if (formdatos.tablabase === 'StkGrupos') {
      await StkGruposAgregar(newData);
    }
    if (formdatos.tablabase === 'StkRubros') {
      await StkRubroAgregar(newData);
    }
    if (formdatos.tablabase === 'UniMedidas') {
      await StkUnMedAgregar(newData);
    }
    if (formdatos.tablabase === 'StkItems') {
      await stkItemsBuscaCod(newData)
    }
    // if (formdatos.tablabase === 'StkItemsAgregar') {
    //   // StkItemsAgregar(newData);
    //   StkItemsAgregar(newData)
    // }
    if (formdatos.tablabase === 'PresupDetPie') {
      await PresupDetPieAgregar(newData);
    }
    if (formdatos.tablabase === 'ParamComp') {
      await ParamCompAgregar(newData);
    }
    if (formdatos.tablabase === 'OTCondPago') {
      await OTCondPagoAgregar(newData);
    }
    if (formdatos.tablabase === 'PBRubros') {
      await PBRubrosAgregar(newData);
    }
    if (formdatos.tablabase === 'PBSubRubros') {
      await PBSubRubrosAgregar(newData);
    }
    if (formdatos.tablabase === 'PBItems') {
      await PBItemsAgregar(newData);
    }
    if (formdatos.tablabase === 'PBPorIVA') {
      await PBPorIVAAgregar(newData);
    }
    if (formdatos.tablabase === 'OTDatos') {
      await OTDatosAgregar(newData);
    }
    if (formdatos.tablabase === 'CajaIE') {
      await CajaIEAgregar(newData);
    }
    if (formdatos.tablabase === 'CajaInterna') {
      await CajaInternaAgregar(newData);
    }
    //       resolve(50);
    //     }, 100);
    //   });
    // }

    return true; // Todo salió bien
  } catch (error) {
    console.error("Error en onRowAdd:", error);
    throw error; // Re-lanzamos el error para manejarlo en el Dialogo
  }
}
