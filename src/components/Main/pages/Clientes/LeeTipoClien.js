import IpServidor from "../VariablesDeEntorno";
import request from "superagent";

export function leeTipoClien() {
  return new Promise((resolve) => {
    const url = IpServidor + "/stkbgsubrubroleer";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const tipoprov = JSON.parse(res.text);
        resolve(tipoprov);
      });
  });
}
