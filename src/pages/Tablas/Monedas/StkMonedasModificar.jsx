import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function StkMonedasModificar(props) {
	const { id, StkMonedasDescripcion, StkMonedasCotizacion, StkMonedasSigno } =
		props;
	const idStkMonedas = id;
	const url = IpServidor + "/stkmonedasmodificar/" + idStkMonedas;
	request
		.post(url)
		.set("Content-Type", "application/json")
		.send({ StkMonedasDescripcion: StkMonedasDescripcion })
		.send({ StkMonedasCotizacion: StkMonedasCotizacion })
		.send({ StkMonedasSigno: StkMonedasSigno })

		.set("X-API-Key", "foobar")
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}
