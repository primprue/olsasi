import estilotabla from "../../Styles/Tabla.module.css";
export function columnasdi() {

  return new Promise(function (resolve) {
    resolve([
      {
        headerName: "id",
        field: "id",
        editable: "never",
        width: 10,
        headerClassName: estilotabla.encabcolumnsstock,
      },
      {
        headerName: "Items",
        field: "StkItemsDesc",
        editable: "never",
        width: 300,
        headerClassName: estilotabla.encabcolumnsstock,
      },

      {
        headerName: "Fecha ",
        field: "StkItemsFAct",
        width: 100,
        editable: "never",
        headerClassName: estilotabla.encabcolumnsstock,
      },

      {
        headerName: "Stock Mín ",
        field: "StkItemsMin",
        editable: "never",
        width: 100,
        align: "right",
        headerClassName: estilotabla.encabcolumnsstock,
      },
      {
        headerName: "Stock Máx ",
        field: "StkItemsMax",
        editable: "never",
        width: 100,
        align: "right",
        headerClassName: estilotabla.encabcolumnsstock,
      },
      {
        headerName: "Stock",
        field: "StkItemsCantidad",
        editable: "never",
        width: 100,
        align: "right",
        headerClassName: estilotabla.encabcolumnsstock,
      },
      {
        headerName: "Stock Disponible",
        field: "StkItemsCantDisp",
        editable: "never",
        width: 120,
        align: "right",
        headerClassName: estilotabla.encabcolumnsstock,
      },

    ]);
  });
}
