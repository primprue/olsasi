import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import MuestraMensaje from "../../components/lib/MuestraMensaje";

export const BuscaIE = (fechaDesde, fechaHasta) => {
    return new Promise((resolve) => {
        const url = IpServidor + "/buscaie/?fechaDesde=" + fechaDesde + "&fechaHasta=" + fechaHasta;
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then((res) => {
                const buscaie = JSON.parse(res.text);
                resolve(buscaie);
            })
            .catch((err) => MuestraMensaje(err));
    });
};