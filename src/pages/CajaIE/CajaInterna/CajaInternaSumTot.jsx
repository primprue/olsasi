import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export const CajaInternaSumTot = (props) => {
    const { fechadesde, fechahasta } = props;
    console.log('CajaInternaSumTot ', props)
    return new Promise((resolve) => {
        const url = IpServidor + "/cajainternasumtot/?fechad=" + fechadesde + "&fechah=" + fechahasta;
        console.log('ur  ', url)
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then((res) => {
                const cajainternasumtot = JSON.parse(res.text);
                resolve(cajainternasumtot);
            })
            .catch((err) => MuestraMensaje(err));

    });
};
