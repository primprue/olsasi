import { stkProveedoresAgregar } from "../pages/Tablas/Proveedores/ProveedoresAgregar";
import { StkMonedasAgregar } from "../pages/Tablas/Monedas/StkMonedasAgregar";
export function onRowAdd(newData) {

  return new Promise((resolve) => {
    setTimeout(() => {
      if (newData.tablabase === 'Proveedores') {
        stkProveedoresAgregar(newData)

      }
      if (newData.tablabase === 'Monedas') {
        StkMonedasAgregar(newData);
      }
      resolve();
    }, 1000);
  });
}
