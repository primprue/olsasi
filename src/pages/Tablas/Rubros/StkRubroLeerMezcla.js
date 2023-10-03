import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

// Lee Rubro por codigo de gupo

export const stkrubroleermezcla = () => {
  return new Promise(resolve => {
    const url = IpServidor + "/stkrubroleermezcla";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const rubro1 = JSON.parse(res.text);
        resolve(rubro1);
      });
  });
};
