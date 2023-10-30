import { ProveedoresBorrar } from "../pages/Tablas/Proveedores/ProveedoresBorrar";
import { StkMonedasBorrar } from "../pages/Tablas/Monedas/StkMonedasBorrar";
import { TransporteBorrar } from "../pages/Tablas/Transporte/TransporteBorrar"
import { StkGrupoBorrar } from "../pages/Tablas/StkGrupos/StkGrupoBorrar";
import { StkRubroBorrar } from "../pages/Tablas/StkRubros/StkRubroBorrar";
import { StkItemsBorrar } from "../pages/Tablas/StkItems/StkItemsBorrar";
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
      resolve();
    }, 1000);
  });
}
