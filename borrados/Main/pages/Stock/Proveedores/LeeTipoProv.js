import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function leetipoprov() {
  return new Promise((resolve) => {
    const url = IpServidor + "/stkbgsubrubroleer"; //porque lee el tipo de subrubro de prebalance
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const tipoprov = JSON.parse(res.text);
        resolve(tipoprov);
      });
  });
}
