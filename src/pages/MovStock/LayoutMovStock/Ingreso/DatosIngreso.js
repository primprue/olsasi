import request from "superagent";
import IpServidor from "../../../VariablesDeEntorno.js";
import MuestraMensaje from "../../../../components/lib/MuestraMensaje.js";
export const datosingreso = (abrRubro) => {
  return new Promise(resolve => {
    const url = IpServidor + "/leedatosingreso/?abr=" + abrRubro;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkitemsderubro = JSON.parse(res.text);

        resolve(stkitemsderubro);
      })
      .catch((err) => {
        MuestraMensaje(err);
      });
  });
};
