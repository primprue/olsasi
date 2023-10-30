import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

export const stkitemsleecodgrrbit = (idStkGrupo, idStkRubro, idStkItems) => {
  return new Promise((resolve) => {
    if (idStkGrupo !== "" && idStkRubro !== "" && idStkItems !== "") {
      const url =
        IpServidor +
        "/stkitemsleecodgrrbit/?idStkGrupo=" +
        idStkGrupo +
        "&idStkRubro=" +
        idStkRubro +
        "&idStkItems=" +
        idStkItems;
      request
        .get(url)
        .set("Content-Type", "application/json")
        .then((res) => {
          const stkitems = JSON.parse(res.text);
          resolve(stkitems);
        });
    }
  });
};
