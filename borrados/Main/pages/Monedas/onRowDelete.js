import { StkMonedasBorrar } from "./StkMonedasBorrar";

export function onRowDelete(oldData) {

  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      StkMonedasBorrar(oldData);
      // }
      resolve();
    }, 1000);
  });
}
