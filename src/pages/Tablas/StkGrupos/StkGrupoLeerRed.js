import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

// Lee Grupo
export const stkgrupoleerred = () => {
  return new Promise(resolve => {
    const url = IpServidor + "/stkgrupoleerred";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkgrupo = JSON.parse(res.text);
        resolve(stkgrupo);
      });
  });
};
