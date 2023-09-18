import CodigoError from "../../../lib/CodigoError";
import IpServidor from "../VariablesDeEntorno";
import request from "superagent";
// import { resolve } from "dns";

export const leerMonedas = () => {
  return new Promise((resolve) => {
    const url = IpServidor + "/stkmonedasleerred";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const monedas = JSON.parse(res.text);
        resolve(monedas);
      });
  });
};
