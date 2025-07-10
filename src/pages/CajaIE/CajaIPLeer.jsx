import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import MuestraMensaje from "../../components/lib/MuestraMensaje";
// Lee Rubro por codigo de gupo

export const CajaIPLeer = () => {
    return new Promise((resolve) => {
        const url = IpServidor + "/cajaipleer";
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then((res) => {
                const cajaipleer = JSON.parse(res.text);
                resolve(cajaipleer);
            })
            .catch((err) => MuestraMensaje(err));
    });
};