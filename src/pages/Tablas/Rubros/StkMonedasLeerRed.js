import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";
// import { resolve } from "dns";

export const stkMonedasleerRed = () => {
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
