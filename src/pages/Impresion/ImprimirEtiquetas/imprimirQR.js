import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import "react-table/react-table.css";

export function imprimirQr(props) {
  return new Promise(function (resolve) {
    const ubicaG = props;
    const url = IpServidor + "/stkenvaseleeimp/?id=" + ubicaG;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const envaseimp = JSON.parse(res.text);
      });
    console.log("envio la impresion ......");
    resolve();
  });
}
