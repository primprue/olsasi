import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import MuestraMensaje from "../../components/lib/MuestraMensaje";
// Lee Rubro por codigo de gupo

export const CajaCPLeer = () => {
    return new Promise((resolve) => {
        const url = IpServidor + "/cajacpleer";
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then((res) => {
                const cajacpleer = JSON.parse(res.text);
                resolve(cajacpleer);
            })
            .catch((err) => MuestraMensaje(err));
    });
};