import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";
// import { resolve } from "dns";

export const stkUnMedLeerRed = () => {
  return new Promise(resolve => {
    const url = IpServidor + "/stkunmedleerred";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const unidadmed = JSON.parse(res.text);
        resolve(unidadmed);
      });
  });
};
