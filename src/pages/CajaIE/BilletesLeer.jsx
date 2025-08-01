import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import MuestraMensaje from "../../components/lib/MuestraMensaje";
// Lee Rubro por codigo de gupo

export const BilletesLeer = () => {
    return new Promise((resolve) => {
        const url = IpServidor + "/billetesleer";
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then((res) => {
                const billetesleer = JSON.parse(res.text);
                resolve(billetesleer);
            })
            .catch((err) => MuestraMensaje(err));
    });
};