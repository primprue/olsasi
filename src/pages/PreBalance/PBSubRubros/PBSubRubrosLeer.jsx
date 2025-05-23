import request from "superagent";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

// Lee Rubro por codigo de gupo

export const PBSubRubrosLeer = () => {

    return new Promise(resolve => {
        const url = IpServidor + "/pbsubrubrosleer";
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then((res) => {
                const monedas = JSON.parse(res.text);
                resolve(monedas);
            })
            .catch((err) => MuestraMensaje(err));
    }, 300);

};
