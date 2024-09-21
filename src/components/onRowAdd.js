import { stkProveedoresAgregar } from "../pages/Tablas/Proveedores/ProveedoresAgregar";
import { StkMonedasAgregar } from "../pages/Tablas/Monedas/StkMonedasAgregar";
import { TransporteAgregar } from "../pages/Tablas/Transporte/TransporteAgregar";
import { StkGruposAgregar } from "../pages/Tablas/StkGrupos/StkGruposAgregar";
import { StkRubroAgregar } from "../pages/Tablas/StkRubros/StkRubroAgregar";
import { StkItemsAgregar } from "../pages/Tablas/StkItems/StkItemsAgregar";
import { StkUnMedAgregar } from "../pages/Tablas/UnidadMedidas/StkUnMedAgregar";
import { PresupDetPieAgregar } from "../pages/Tablas/PresupDetPie/PresupDetPieAgregar";
import { ClientesAgregar } from "../pages/Tablas/Clientes/ClientesAgregar";
import { ParamCompAgregar } from "../pages/CtasCtes/Tablas/ParamComp/ParamCompAgregar";
import { OTCondPagoAgregar } from "../pages/Tablas/OTCondPago/OTCondPagoAgregar";
export function onRowAdd(newData) {
  return new Promise((resolve) => {
    console.log(' newData onRowAdd ', newData)
    setTimeout(() => {
      if (newData.tablabase === 'Clientes') {
        ClientesAgregar(newData)
      }
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
      if (newData.tablabase === 'UniMedidas') {
        StkUnMedAgregar(newData);

      }
      if (newData.tablabase === 'Items') {
        StkItemsAgregar(newData);
      }
      if (newData.tablabase === 'PresupDetPie') {
        PresupDetPieAgregar(newData);
      }
      if (newData.tablabase === 'ParamComp') {
        ParamCompAgregar(newData);
      }
      if (newData.tablabase === 'OTCondPago') {

        OTCondPagoAgregar(newData);
      }
      console.log(' resolve ', resolve)
      resolve(50);
    }, 500);
  });
}
