import IpServidor from '../VariablesDeEntorno'
import request from "superagent";
// import { resolveTypeReferenceDirective } from 'typescript';

export function clientesleercod(props) {
  var idcliente = props
  return new Promise(function (resolve) {

    const url = IpServidor + "/clientesleercod/?id=" + idcliente
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const clientes = JSON.parse(res.text);
        resolve(clientes)
      });
  });
}
