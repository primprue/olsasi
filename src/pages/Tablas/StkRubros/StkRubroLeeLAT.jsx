import request from "superagent";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

// Lee Rubro por codigo de gupo

export const stkrubroleelat = () => {

  return new Promise(resolve => {
    // setTimeout(() => {
    let hebillas = [], carros = [], placajus = [], cuartaparte

    const url = IpServidor + "/stkrubroleerLAT/";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkrubrolat = JSON.parse(res.text);

        stkrubrolat.forEach((element) => {
          cuartaparte = element.StkRubroDescLAT.substring(0, 4);
          if (cuartaparte === "HEBI" || cuartaparte === "KIT ") {
            hebillas.push(element)
          }
          //  else {
          if (cuartaparte === "CARR") {
            carros.push(element)
          }
          if (cuartaparte === "PLAC") {
            placajus.push(element)
          }
          //  }
        });

        resolve([hebillas, carros, placajus]);
      })
      .catch((err) => MuestraMensaje(err));
    // }, 300);
  });
};
