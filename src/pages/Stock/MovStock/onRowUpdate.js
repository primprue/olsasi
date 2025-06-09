import { StockModificar } from "./LayoutMovStock/Ingreso/StockModificar";

export function onRowUpdate(newData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      StockModificar(newData);
      // }
      resolve();
    }, 1000);
  });
}
