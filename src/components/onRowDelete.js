
import { DatosBorrar } from "./DatosBorrar";
let isDelete = false;
export async function onRowDelete(paramsid, formdatos) {
  if (isDelete) return; // Si ya está guardando, ignora la segunda llamada
  isDelete = true;
  try {
    await DatosBorrar(paramsid, formdatos.nombackborrar)

  } catch (error) {
    console.error(error);
  } finally {
    isDelete = false; // Se libera para la próxima vez
  }

}

