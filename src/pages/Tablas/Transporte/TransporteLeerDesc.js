import IpServidor from '../VariablesDeEntorno'
import request from "superagent";


export function transporteleerdescmayigual() {

  return new Promise(function (resolve) {

    //  const url = IpServidor + "/transporteleerdescmayigual/?clientenuevo=" + clientenuevo;
    const url = IpServidor + "/transporteleerdesc";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const transporte = JSON.parse(res.text);
        resolve(transporte);
      });
  });
}
