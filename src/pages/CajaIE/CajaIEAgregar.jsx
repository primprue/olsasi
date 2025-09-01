import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import MuestraMensaje from "../../components/lib/MuestraMensaje";

export function CajaIEAgregar(props) {
	// return new Promise(function () {
	return new Promise(function (resolve, reject) {
		setTimeout(() => {
			const { rows } = props;

			const url = IpServidor + "/cajaieagregar";
			request
				.post(url)
				.set("Content-Type", "application/json")
				.send({ rows: rows })
				.set("X-API-Key", "foobar")
				.then((res) => {
					MuestraMensaje(res);
					resolve(res); // avisamos que terminó
				})
				.catch((err) => {
					MuestraMensaje(err);
					reject(err); // avisamos que falló
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
