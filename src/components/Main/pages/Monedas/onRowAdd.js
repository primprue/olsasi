import { StkMonedasAgregar } from "./StkMonedasAgregar";

export function onRowAdd(newData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      StkMonedasAgregar(newData);
      // }
      resolve();
    }, 1000);
  });
}
