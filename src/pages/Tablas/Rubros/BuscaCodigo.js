import CodigoError from "../../../../lib/CodigoError";
import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

// function onRowAdd() {
//   return (newData) =>
//     new Promise((resolve, reject) => {
//       agregarMonedas(newData);
//       initialFetch();
//       resolve();
//     }, 1000);
// }

export const buscaCodigo = (_) => {
  return () => {
    new Promise((resolve, reject) => {
      var url =
        IpServidor + "/stkrubroleeultnro/?id=" + this.state.StkRubroCodGrp;
      request
        .get(url)
        .set("Content-Type", "application/json")
        .then((res) => {
          const codigorubro = JSON.parse(res.text);
          //   this.setState({ codigorubro: codigorubro })
          //   this.add(codigorubro[0].CodRubroNuevo);
          resolve(codigorubro);
        });
    });
  };
};
