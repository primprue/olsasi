import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

// Lee Rubro por codigo de gupo

export const stkrubroleeproveedor = () => {
  return new Promise(resolve => {
    const url = IpServidor + "/stkrubroleeproveedor";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkrubroprov = JSON.parse(res.text);
        resolve(stkrubroprov);
      });
  });
};
