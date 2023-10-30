import { stkProveedoresAgregar } from "../pages/Tablas/Proveedores/ProveedoresAgregar";
import { StkMonedasAgregar } from "../pages/Tablas/Monedas/StkMonedasAgregar";
import { TransporteAgregar } from "../pages/Tablas/Transporte/TransporteAgregar";
import { StkGruposAgregar } from "../pages/Tablas/StkGrupos/StkGruposAgregar";
import { StkRubroAgregar } from "../pages/Tablas/StkRubros/StkRubroAgregar";
import { StkItemsAgregar } from "../pages/Tablas/StkItems/StkItemsAgregar";
export function onRowAdd(newData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (newData.tablabase === 'Proveedores') {
        stkProveedoresAgregar(newData)
      }

      if (newData.tablabase === 'Monedas') {
        StkMonedasAgregar(newData);
      }
      if (newData.tablabase === 'Transportes') {
        TransporteAgregar(newData);
      }
      if (newData.tablabase === 'Grupos') {
        StkGruposAgregar(newData);
      }
      if (newData.tablabase === 'Rubros') {
        StkRubroAgregar(newData);
      }
      if (newData.tablabase === 'Items') {
        StkItemsAgregar(newData);
      }
      resolve();
    }, 1000);
  });
}
