import request from 'superagent'

import IpServidor from "../VariablesDeEntorno";

export const stkitemsred = (CodGrupo, CodRubro) => {
  return new Promise(resolve => {
    const url = IpServidor + "/stkitemslistaprecios/?idStkGrupo=" + CodGrupo + '&idStkRubro=' + CodRubro;
    request
      .get(url)
      .set('Content-Type', 'application/json')
      .then(res => {
        const stkitems = JSON.parse(res.text);
        resolve(stkitems);

      })


  })
}

