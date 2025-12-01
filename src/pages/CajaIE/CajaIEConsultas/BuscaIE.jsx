import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function BuscaIE(props) {
    const { FechaDesde, FechaHasta } = props;

    return new Promise((resolve) => {
        setTimeout(() => {
            const url = IpServidor + "/buscaie/?FechaDesde=" + FechaDesde + "&FechaHasta=" + FechaHasta;
            request
                .get(url)
                .set("Content-Type", "application/json")
                .then((res) => {
                    const buscaie = JSON.parse(res.text);
                    resolve(buscaie);
                })
                .catch((err) => MuestraMensaje(err));
        });
    }, 300);
}
