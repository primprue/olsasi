import { stkMonedasleerRed } from "../../Stock/Rubros/StkMonedasLeerRed";
import { leeTipoProv } from "./LeeTipoProv";

export async function llenarColumns() {
  const tipoprov = await leeTipoProv();
  var objstktipoprov = await tipoprov.reduce(function (acc, cur) {
    acc[cur.idSubRubro] = cur.SubRubroDetalle;
    // return acc;
    // return Object.values(acc).sort(function (a, b) {
    //   return acc[a] - acc[b];
    // });
    return acc;
  }, {});

  const stkMonedas = await stkMonedasleerRed();
  var objstkMonedas = await stkMonedas.reduce(function (acc, cur) {
    acc[cur.idStkMonedas] = cur.StkMonedasDescripcion;
    return acc;
    // return Object.values(acc).sort(function (a, b) {
    //   return acc[a] - acc[b];
    // });
  }, {});

  return columnsFill(objstktipoprov, objstkMonedas);
}

function columnsFill(objstktipoprov, objstkMonedas) {
  return new Promise(function (resolve) {
    resolve([
      // { title: "idProveedores", field: "idProveedores" },
      // { title: "Tipo", field: "ProveedoresTipo" }, //Proveedores Tipo idStkTipoProveed
      { title: "Descripción", field: "ProveedoresDesc" },
      { title: "Tipo", field: "ProveedoresTipo", lookup: objstktipoprov },
      { title: "CUIT", field: "ProveedoresCUIT" },
      { title: "Calle", field: "ProveedoresCalle" },
      { title: "Calle Nro.", field: "ProveedoresNroCalle" },
      { title: "Piso", field: "ProveedoresPiso" },
      { title: "Dto", field: "ProveedoresDto" },
      { title: "CodPos", field: "ProveedoresCodPos" },
      { title: "Loc", field: "ProveedoresLoc" },
      { title: "Pcia", field: "ProveedoresPcia" },
      { title: "Tel", field: "ProveedoresTel" },
      { title: "Contacto", field: "ProveedoresContacto" },
      { title: "Mail", field: "ProveedoresMail" },
      { title: "Web", field: "ProveedoresWeb" },
      {
        title: "CodMon",
        field: "ProveedoresCodMon",
        lookup: objstkMonedas,
      },
    ]);
  });
}
