import request from "superagent";
import "react-table/react-table.css";
import IpServidor from "../../VariablesDeEntorno";
import CodigoError from "../../../../lib/CodigoError";

export function borrarRubros(props) {
  return new Promise(function (resolve) {
    const { idStkRubro, StkRubroCodGrp } = props;

    var url =
      IpServidor +
      "/stkrubroborrar/" +
      "?idStkRubro=" +
      idStkRubro +
      "&StkRubroCodGrp=" +
      StkRubroCodGrp;
    request
      .get(url)
      .set("Content-Type", "application/json")
      // .then(function(res) {
      //     // res.body, res.headers, res.status
      // })
      //alert("Borrado")
      .catch((err) => CodigoError(err));

    resolve();
  });
}
