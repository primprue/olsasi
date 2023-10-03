import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import MuestraMensaje from "../../../components/lib/MuestraMensaje";
// import "react-table/react-table.css";

export function StkMonedasModificar(props) {
	const { id, StkMonedasDescripcion, StkMonedasCotizacion } = props;
	const idStkMonedas = id;
	const url = IpServidor + "/stkmonedasmodificar/" + idStkMonedas;
	request
		.post(url)
		.set("Content-Type", "application/json")
		.send({ StkMonedasDescripcion: StkMonedasDescripcion })
		.send({ StkMonedasCotizacion: StkMonedasCotizacion })
		.set("X-API-Key", "foobar")
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}
