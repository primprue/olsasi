import IpServidor from '../VariablesDeEntorno'
import request from "superagent";

// export function clientesleerdescmayigual(props) {

export function clientesleerdescmayigual() {
  // console.log('clientes de props  ', props)
  // var clientenuevo = props;
  // if (typeof clientenuevo === 'undefined' || clientenuevo === '') {
  //   clientenuevo = ''
  // }
  return new Promise(function (resolve) {

    //  const url = IpServidor + "/clientesleerdescmayigual/?clientenuevo=" + clientenuevo;
    const url = IpServidor + "/clientesleerdesc";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const clientes = JSON.parse(res.text);
        resolve(clientes);
      });
  });
}
