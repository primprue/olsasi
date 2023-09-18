import { borrarRubros } from "./StkRubroBorrar";

export function onRowDelete(oldData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // console.log("oldata ");
      // console.log(oldData);
      borrarRubros(oldData);
    }, 600);
    resolve();
  });
}
