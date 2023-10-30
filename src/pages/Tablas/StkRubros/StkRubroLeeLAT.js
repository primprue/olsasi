import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

// Lee Rubro por codigo de gupo

export const stkrubroleelat = () => {
  return new Promise(resolve => {
    const url = IpServidor + "/stkrubroleerLAT/";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkrubrolat = JSON.parse(res.text);
        resolve(stkrubrolat);
      });
  });
};
