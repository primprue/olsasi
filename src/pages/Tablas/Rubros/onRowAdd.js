import { agregarRubros } from "./StkRubroAgregar";

export function onRowAdd(newData) {

  return new Promise((resolve) => {
    setTimeout(() => {
      agregarRubros(newData);
      resolve();
    }, 600);
  });
}
