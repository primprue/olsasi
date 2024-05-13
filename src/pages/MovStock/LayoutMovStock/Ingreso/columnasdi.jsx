
export function columnasdi() {

  return new Promise(function (resolve) {
    resolve([
      {
        headerName: "Items",
        field: "StkItemsDesc",
        editable: "never",
        //   order: true,
      },

      {
        headerName: "Fecha ",
        field: "StkItemsFAct",
        type: "date",
        editable: "never",
      },
      {
        headerName: "Stock Mín ",
        field: "StkItemsMin",
        editable: "never",
      },
      {
        headerName: "Stock Máx ",
        field: "StkItemsMax",
        editable: "never",
      },
      {
        headerName: "Stock",
        field: "StkItemsCantidad",
        editable: "never",

      },
      {
        headerName: "Stock Disponible",
        field: "StkItemsCantDisp",
        editable: "never",
      },

    ]);
  });
}
