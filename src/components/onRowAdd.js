
import { DatosAgregar } from "./DatosAgregar";
let isSaving = false;
export async function onRowAdd(newData, formdatos) {
  console.log("onRowAdd newData ", newData);
  console.log("onRowAdd formdatos ", formdatos);
  if (isSaving) return; // Si ya está guardando, ignora la segunda llamada
  isSaving = true;
  try {

    await DatosAgregar(newData, formdatos.nombackagregar)

  } catch (error) {
    console.error(error);
  } finally {
    isSaving = false; // Se libera para la próxima vez
  }
}
