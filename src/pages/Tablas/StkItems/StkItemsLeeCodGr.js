import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

export const stkitemsleecodgr = (idStkGrupo) => {
  return new Promise((resolve) => {
    const url = IpServidor + "/stkitemsleecodgr/?idStkGrupo= " + idStkGrupo;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const stkitems = JSON.parse(res.text);
        resolve(stkitems);
      });
  });
};
