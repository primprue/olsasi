import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";
// import "react-table/react-table.css";

export function StkMonedasAgregar(props) {
	return new Promise(function () {
		setTimeout(() => {
			const {
				id,
				StkMonedasDescripcion,
				StkMonedasCotizacion,
				StkMonedasSigno,
			} = props;
			const url = IpServidor + "/stkmonedasagregar";
			request
				.post(url)
				.set("Content-Type", "application/json")
				.send({ idStkMonedas: id })
				.send({ StkMonedasDescripcion: StkMonedasDescripcion })
				.send({ StkMonedasCotizacion: StkMonedasCotizacion })
				.send({ StkMonedasSigno: StkMonedasSigno })
				.set("X-API-Key", "foobar")
				.then(function (res) {
					MuestraMensaje(res);
				})
				.catch((err) => MuestraMensaje(err));
		}, 500);
	});
}
