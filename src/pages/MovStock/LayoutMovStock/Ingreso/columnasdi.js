
export function columnasdi() {

  return new Promise(function (resolve) {
    resolve([
      {
        title: "Items",
        field: "StkItemsDesc",
        editable: "never",
        //   order: true,
      },
      // {
      //   title: "Pres.Desc ",
      //   field: "StkRubroPresDes",
      //   editable: "never",

      // },
      // {
      //   title: "Presentación ",
      //   field: "StkRubroPres",
      //   editable: "never",

      // },
      // {
      //   title: "Unid.Medida ",
      //   field: "StkRubroUM",
      //   editable: "never",

      // },



      // {
      //   title: "Ancho",
      //   field: "StkRubroAncho",
      //   editable: "never",
      // },
      {
        title: "Fecha ",
        field: "StkItemsFAct",
        type: "date",
        editable: "never",
      },
      {
        title: "Stock Mín ",
        field: "StkItemsMin",
        editable: "never",
      },
      {
        title: "Stock Máx ",
        field: "StkItemsMax",
        editable: "never",
      },
      {
        title: "Stock",
        field: "StkItemsCantidad",
        editable: "never",

      },
      {
        title: "Stock Disponible",
        field: "StkItemsCantDisp",
        editable: "never",
      },
      // {
      //   title: "Cant.Ingreso",
      //   field: "CantIngreso",
      // },
    ]);
  });
}
