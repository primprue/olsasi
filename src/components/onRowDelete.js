import { ProveedoresBorrar } from "../pages/Tablas/Proveedores/ProveedoresBorrar";
import { StkMonedasBorrar } from "../pages/Tablas/Monedas/StkMonedasBorrar";
import { TransporteBorrar } from "../pages/Tablas/Transporte/TransporteBorrar"
import { StkGrupoBorrar } from "../pages/Tablas/StkGrupos/StkGrupoBorrar";
import { StkRubroBorrar } from "../pages/Tablas/StkRubros/StkRubroBorrar";
import { StkItemsBorrar } from "../pages/Tablas/StkItems/StkItemsBorrar";
import { StkUnMedBorrar } from "../pages/Tablas/UnidadMedidas/StkUnMedBorrar";
import { PresupDetPieBorrar } from "../pages/Tablas/PresupDetPie/PresupDetPieBorrar";
import { ParamCompBorrar } from "../pages/CtasCtes/Tablas/ParamComp/ParamCompBorrar";
import { OTCondPagoBorrar } from "../pages/OrdenTrabajo/OTTablas/OTCondPago/OTCondPagoBorrar";
import { PBRubrosBorrar } from "../pages/PreBalance/PBRubros/PBRubrosBorrar";
import { PBSubRubrosBorrar } from "../pages/PreBalance/PBSubRubros/PBSubRubrosBorrar";
import { PBComprobantesBorrar } from "../pages/PreBalance/PBComprobantes/PBComprobantesBorrar";
import { PBPorIVABorrar } from "../pages/PreBalance/PBPorIVA/PBPorIVABorrar";
import { CajaInternaBorrar } from "../pages/CajaIE/CajaInterna/CajaInternaBorrar";
// import { PresupBorrar } from "../pages/Presupuesto/LayoutPresupuesto/PrespuConMod/PresupBorrar";
export async function onRowDelete(paramsid, newData, paramsbor) {
  try {
    if (newData.tablabase === 'Proveedores') {
      await ProveedoresBorrar(paramsid)
    }
    if (newData.tablabase === 'Monedas') {
      await StkMonedasBorrar(paramsid);
    }
    if (newData.tablabase === 'Transportes') {
      await TransporteBorrar(paramsid);
    }
    if (newData.tablabase === 'StkGrupos') {
      await StkGrupoBorrar(paramsid)
    }
    if (newData.tablabase === 'StkRubros') {
      await StkRubroBorrar(paramsid)
    }
    if (newData.tablabase === 'StkItems') {
      await StkItemsBorrar(paramsbor)
    }
    if (newData.tablabase === 'UniMedidas') {
      await StkUnMedBorrar(paramsid)
    }
    if (newData.tablabase === 'PresupDetPie') {
      await PresupDetPieBorrar(paramsid)
    }
    if (newData.tablabase === 'ParamComp') {
      await ParamCompBorrar(paramsid)
    }
    if (newData.tablabase === 'OTCondPago') {
      await OTCondPagoBorrar(paramsid)
    }
    if (newData.tablabase === 'PBRubros') {
      await PBRubrosBorrar(paramsid)
    }
    if (newData.tablabase === 'PBSubRubros') {
      await PBSubRubrosBorrar(paramsid)
    }
    if (newData.tablabase === 'PBComprobantes') {
      await PBComprobantesBorrar(paramsid)
    }
    if (newData.tablabase === 'PBPorIVA') {
      await PBPorIVABorrar(paramsid)
    }
    if (newData.tablabase === 'CajaInterna') {
      await CajaInternaBorrar(paramsid)
    }
    return true; // Todo salió bien
  } catch (error) {
    console.error("Error en onrowDelete:", error);
    throw error; // Re-lanzamos el error para manejarlo en el Dialogo
  }
}
