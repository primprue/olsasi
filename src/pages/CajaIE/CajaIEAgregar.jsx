import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import MuestraMensaje from "../../components/lib/MuestraMensaje";

export function CajaIEAgregar(props) {
	console.log('props', props);

	return new Promise(function () {
		setTimeout(() => {
			const { rows } = props;
			// 	const { idCajaIE, CajaIECliente, CajaIEConcepto, CajaIEPunto, CajaIEImporte, CajaIECodIP, CajaIEImpIP } = props;
			const url = IpServidor + "/cajaieagregar";
			request
				.post(url)
				.set("Content-Type", "application/json")
				.send({ rows: rows })
				// 		.send({ CajaIECliente: CajaIECliente })
				// 		.send({ CajaIEConcepto: CajaIEConcepto })
				// 		.send({ CajaIEPunto: CajaIEPunto })
				// 		.send({ CajaIEImporte: CajaIEImporte })
				// 		.send({ CajaIECodIP: CajaIECodIP })
				// 		.send({ CajaIEImpIP: CajaIEImpIP })
				.set("X-API-Key", "foobar")
				.then((res) => {
					MuestraMensaje(res);
				})
				.catch((err) => {
					MuestraMensaje(err);
				});
		}, 300);
	});
}

/*	.then(function (res) {
			const respuesta = JSON.parse(res.text);
			if (respuesta.affectedRows !== 0)
				Mensaje("error", "Grupo agregado correctamente");
			else Mensaje("error", "No se pudo modificar");
		})
		.catch((err) => CodigoError(err));*/
