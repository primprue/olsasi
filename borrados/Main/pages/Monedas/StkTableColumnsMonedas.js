export function StkMonedasColumns() {

  return new Promise(function (resolve) {
    resolve([
      {
        title: "Código",
        field: "idStkMonedas",
        order: true,
      },
      {
        title: "Descripción",
        field: "StkMonedasDescripcion",
        order: true,
      },
      {
        title: "Cotización",
        field: "StkMonedasCotizacion",
        type: "currency",
        order: true,
      },
    ]);
  });
}

