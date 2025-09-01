import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import MuestraMensaje from "../../components/lib/MuestraMensaje";
// Lee Rubro por codigo de gupo

export const CajaIESumaMov = () => {
    return new Promise((resolve) => {
        const url = IpServidor + "/cajaiesumamov";
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then((res) => {
                const cajaiesumam = JSON.parse(res.text);
                resolve(cajaiesumam);
            })
            .catch((err) => MuestraMensaje(err));
    });
};