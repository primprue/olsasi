import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import MuestraMensaje from "../../components/lib/MuestraMensaje";
// Lee Rubro por codigo de gupo

export const CajaSaldoEfLeer = () => {
    return new Promise((resolve) => {
        const url = IpServidor + "/cajasaldoefleer";
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then((res) => {
                const cajasaldoefleer = JSON.parse(res.text);
                resolve(cajasaldoefleer);
            })
            .catch((err) => MuestraMensaje(err));
    });
};