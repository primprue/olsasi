import { stkProveedoresAgregar } from "./ProveedoresAgregar";

export function onRowAdd(newData) {
  console.log(newData);
  return new Promise((resolve) => {
    setTimeout(() => {

      stkProveedoresAgregar(newData);

      resolve();

    }, 1000);

  });
}
