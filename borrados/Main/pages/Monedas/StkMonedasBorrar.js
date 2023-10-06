import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import CodigoError from "../../../lib/CodigoError";
import "react-table/react-table.css";

export function StkMonedasBorrar(props) {
  const { idStkMonedas } = props;
  const url = IpServidor + "/stkmonedasborrar/?id=" + idStkMonedas;
  console.log(' url ', url)
  request
    .delete(url)
    .set("Content-Type", "application/json")
    .then(function () {
      // res.body, res.headers, res.status
    })
    .catch((err) => CodigoError(err));
}


