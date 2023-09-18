import CodigoError from "../../../../lib/CodigoError";
import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function modificarRubros(props) {
  return new Promise(function (resolve) {
    const {
      idStkRubro,
      StkRubroCodGrp,
      StkRubroDesc,
      StkRubroAbr,
      StkRubroProv,
      StkRubroAncho,
      StkRubroPres,
      StkRubroPresDes,
      StkRubroUM,
      StkRubroCosto,
      StkRubroTM,
      StkRubroConf,
    } = props;

    // ModificaRubro = (_) => {
    const url =
      IpServidor +
      "/stkrubromodificar/?idStkRubro=" +
      idStkRubro +
      "&StkRubroCodGrp=" +
      StkRubroCodGrp;
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({
        StkRubroDesc: StkRubroDesc,
        StkRubroAbr: StkRubroAbr,
        StkRubroProv: StkRubroProv,
        StkRubroAncho: StkRubroAncho,
        StkRubroPres: StkRubroPres,
        StkRubroPresDes: StkRubroPresDes,
        StkRubroUM: StkRubroUM,
        StkRubroCosto: StkRubroCosto,
        StkRubroTM: StkRubroTM,
        StkRubroConf: StkRubroConf,
      })
      .then(function () { })
      .catch((err) => CodigoError(err));
    resolve();
    // };
  });
}
