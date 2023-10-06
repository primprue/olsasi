import { ClientesAgregar } from "./ClientesAgregar";

export function onRowAdd(newData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      ClientesAgregar(newData);
      // }
      resolve();
    }, 1000);
  });
}
