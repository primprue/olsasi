import { StkMonedasModificar } from "./StkMonedasModificar";

export function onRowUpdate(newData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      StkMonedasModificar(newData);
      // }
      resolve();
    }, 1000);
  });
}
