import IpServidor from '../VariablesDeEntorno'
import request from "superagent";
// import { resolveTypeReferenceDirective } from 'typescript';

export function transporteleercod(props) {
  var idcliente = props
  return new Promise(function (resolve) {

    const url = IpServidor + "/transporteleercod/?id=" + idcliente
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const transporte = JSON.parse(res.text);
        resolve(transporte)
      });
  });
}
