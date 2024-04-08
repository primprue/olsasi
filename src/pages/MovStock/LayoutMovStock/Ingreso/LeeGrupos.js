import request from "superagent";
import IpServidor from "../../../VariablesDeEntorno.js";
// Lee Grupo
export const stkgrupoleer = () => {
  return new Promise(resolve => {
    const url = IpServidor + "/stkgrupoleerred";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkgrupos = JSON.parse(res.text);

        resolve(stkgrupos);
      });
  });
};
