
import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../../pages/VariablesDeEntorno";
import request from "superagent";

export async function OTDatosReordenTabla(ordenIds, ejecutorbackend) {
    const url = `${IpServidor}/${ejecutorbackend}`;
    try {
        const res = await request
            .post(url)
            .set("Content-Type", "application/json")
            // PASA EL ARRAY DIRECTO, NO EL STRING. Superagent se encarga del resto.
            .send(ordenIds);

        MuestraMensaje(res);

        return res.statusCode;
    } catch (err) {
        MuestraMensaje(err);
        throw err;
    }
}