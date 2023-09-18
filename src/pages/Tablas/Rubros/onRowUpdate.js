import { modificarRubros } from "./StkRubroModificar";

export function onRowUpdate(newData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // {
      modificarRubros(newData);
      // }
      resolve();
    }, 600);
  });
}
