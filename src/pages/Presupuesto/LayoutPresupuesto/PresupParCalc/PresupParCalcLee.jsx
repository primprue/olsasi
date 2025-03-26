
import MuestraMensaje from "../../../../components/lib/MuestraMensaje";
import IpServidor from "../../../VariablesDeEntorno";

import request from "superagent";

export function PresupParCalcLee(props) {
  var paracalculo = props;
  return new Promise((resolve) => {
    const url = IpServidor + "/presupparcalclee/?id=" + paracalculo;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const paracalcular = JSON.parse(res.text);
        resolve(paracalcular);
      })
      .catch((err) => MuestraMensaje(err));
  });
}