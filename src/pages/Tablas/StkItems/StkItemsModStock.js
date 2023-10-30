import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import CodigoError from "../../../../lib/CodigoError";

// Lee Rubro por codigo de gupo

export const stkitemsmodstock = state => {
  console.log("estoy en  stkitemsmodstock ");
  return new Promise(resolve => {
    const url =
      IpServidor +
      "/stkitemsmodstock/?idStkItems=" +
      state.idStkItems +
      "&idStkGrupo=" +
      state.idStkGrupo +
      "&idStkRubro=" +
      state.idStkRubro;

    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ cantidad: state.cantidad })
      .send({ StkRubroPres: state.StkRubroPres })
      .send({ StkEnvaseUbG: state.StkEnvaseUbG })
      .then(resolve("ok"))
      .catch(err => {
        CodigoError(err);
      });
  });
};
// .catch(err => {CodigoError(err)});});
