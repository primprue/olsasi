import { ClientesBorrar } from "./ClientesBorrar";

export function onRowDelete(oldData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      ClientesBorrar(oldData);
      // }
      resolve();
    }, 1000);
  });
}
