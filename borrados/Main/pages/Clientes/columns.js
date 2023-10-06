// import { stkMonedasleerRed } from "../../Stock/Rubros/StkMonedasLeerRed";
import { leeTipoClien } from "./LeeTipoClien";

export async function llenarColumns() {
  const tipoprov = await leeTipoClien();
  var objstktipoprov = await tipoprov.reduce(function (acc, cur) {
    acc[cur.idSubRubro] = cur.SubRubroDetalle;
    return acc;

  }, {});



  return columnsFill(objstktipoprov);
  //, objstkMonedas);
}

function columnsFill(objstktipoprov) {
  return new Promise(function (resolve) {
    resolve([

      { title: "Cód", field: "idClientes", width: "25%", defaultGroupOrder: 1 },
      { title: "Descripción", field: "ClientesDesc", width: "130%", defaultGroupOrder: 0 },
      { title: "Domicilio", field: "ClientesDomicilio", width: "150%", defaultValue: "" },
      { title: "CodPos", field: "ClientesCodPos", width: "50%", defaultValue: "" },
      { title: "Loc", field: "ClientesLoc", width: "50%", defaultValue: "" },
      { title: "Pcia", field: "ClientesPcia", width: "50%", defaultValue: "" },
      { title: "Tel-WA", field: "ClientesTel", width: "100%", defaultValue: "" },
      { title: "IVA", field: "ClientesIVA", width: "50%", defaultValue: "" },
      { title: "CUIT", field: "ClientesCUIT", width: "100%", defaultValue: "" },
      { title: "Mail", field: "ClientesMail", width: "50%", defaultValue: "" },
      { title: "Tipo", field: "ClientesTipo", width: "50%", lookup: objstktipoprov },
      { title: "Contacto", field: "ClientesContacto", width: "50%", defaultValue: "" },
      { title: "Categoría", field: "ClientesCategoria", width: "50%", defaultValue: "" },
      { title: "Observación", field: "ClientesObserv1", width: "50%", defaultValue: "" },
      { title: "Observación", field: "ClientesObserv2", width: "50%", defaultValue: "" },
      { title: "Fecha", field: "ClientesFecha", width: "50%", defaultValue: "" },
    ]);
  });
}
