import { ClientesModificar } from "./ClientesModificar";

export function onRowUpdate(newData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      ClientesModificar(newData);
      // }
      resolve();
    }, 1000);
  });
}
