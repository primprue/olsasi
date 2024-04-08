import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function StkItemsBorrar(props) {
  return new Promise(function () {
    const { idStkItems, StkItemsGrupo, StkItemsRubro } = props;

    // //Delete
    var url =
      IpServidor +
      "/stkitemsborrar/?idStkItems=" +
      idStkItems +
      "&StkItemsGrupo=" +
      StkItemsGrupo +
      "&StkItemsRubro=" +
      StkItemsRubro;
    request
      .delete(url)
      .set("Content-Type", "application/json")
      .then(function (res) {
        MuestraMensaje(res);
      })
      .catch((err) => MuestraMensaje(err));
  });
}
