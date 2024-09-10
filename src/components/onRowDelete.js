import { ProveedoresBorrar } from "../pages/Tablas/Proveedores/ProveedoresBorrar";
import { StkMonedasBorrar } from "../pages/Tablas/Monedas/StkMonedasBorrar";
import { TransporteBorrar } from "../pages/Tablas/Transporte/TransporteBorrar"
import { StkGrupoBorrar } from "../pages/Tablas/StkGrupos/StkGrupoBorrar";
import { StkRubroBorrar } from "../pages/Tablas/StkRubros/StkRubroBorrar";
import { StkItemsBorrar } from "../pages/Tablas/StkItems/StkItemsBorrar";
import { StkUnMedBorrar } from "../pages/Tablas/UnidadMedidas/StkUnMedBorrar";
import { PresupDetPieBorrar } from "../pages/Tablas/PresupDetPie/PresupDetPieBorrar";
import { ParamCompBorrar } from "../pages/CtasCtes/Tablas/ParamComp/ParamCompBorrar";
import { OTCondPagoBorrar } from "../pages/Tablas/OTCondPago/OTCondPagoBorrar";
// import { PresupBorrar } from "../pages/Presupuesto/LayoutPresupuesto/PrespuConMod/PresupBorrar";
export function onRowDelete(paramsid, newData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (newData.tablabase === 'Proveedores') {
        ProveedoresBorrar(paramsid)
      }
      if (newData.tablabase === 'Monedas') {
        StkMonedasBorrar(paramsid);
      }
      if (newData.tablabase === 'Transportes') {
        TransporteBorrar(paramsid);
      }
      if (newData.tablabase === 'Grupos') {
        StkGrupoBorrar(paramsid)
      }
      if (newData.tablabase === 'Rubros') {
        StkRubroBorrar(paramsid)
      }
      if (newData.tablabase === 'Items') {
        StkItemsBorrar(paramsid)
      }
      if (newData.tablabase === 'UniMedidas') {
        StkUnMedBorrar(paramsid)
      }
      if (newData.tablabase === 'PresupDetPie') {
        PresupDetPieBorrar(paramsid)
      }
      if (newData.tablabase === 'ParamComp') {
        ParamCompBorrar(paramsid)
      }
      if (newData.tablabase === 'OTCondPago') {
        OTCondPagoBorrar(paramsid)
      }
      // if (newData.tablabase === 'MuestraPresupuesto') {
      //   PresupBorrar(paramsid)
      // }
      resolve(50);
    }, 500);
  });
}
