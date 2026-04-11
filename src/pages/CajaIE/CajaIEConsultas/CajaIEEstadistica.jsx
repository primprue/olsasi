import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function CajaIEEstadistica(props) {
    const { FechaDesde, FechaHasta } = props;

    return new Promise((resolve) => {
        setTimeout(() => {
            const url = IpServidor + "/cajaieestadistica/?FechaDesde=" + FechaDesde + "&FechaHasta=" + FechaHasta;
            request
                .get(url)
                .set("Content-Type", "application/json")
                .then((res) => {
                    const cajaieestadistica = JSON.parse(res.text);
                    resolve(cajaieestadistica);
                })
                .catch((err) => MuestraMensaje(err));
        });
    }, 300);
}
