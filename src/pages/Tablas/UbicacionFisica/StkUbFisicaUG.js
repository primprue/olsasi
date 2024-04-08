import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

// Lee Ubicación Física por Ubicación Geográfica

export const stkubfisicaleerUbG = StkUbFisicaGeo => {
  return new Promise(resolve => {
    if (StkUbFisicaGeo !== '') {
    const url = IpServidor + "/stkubfisicaleerUbG/" + StkUbFisicaGeo;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const ubicacionf = JSON.parse(res.text);
        resolve(ubicacionf);
      });
    }
  });

};
