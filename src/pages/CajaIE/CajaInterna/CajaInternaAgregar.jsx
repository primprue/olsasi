import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function CajaInternaAgregar(props) {
	return new Promise(function () {
		setTimeout(() => {
			const { CajaInternaFecha, CajaInternaConcepto, CajaInternaMoneda, CajaInternaES, CajaInternaMT, CajaInternaImporte } = props;
			const url = IpServidor + "/cajainternaagregar";
			request
				.post(url)
				.set("Content-Type", "application/json")
				.send({ CajaInternaFecha: CajaInternaFecha })
				.send({ CajaInternaConcepto: CajaInternaConcepto })
				.send({ CajaInternaMoneda: CajaInternaMoneda })
				.send({ CajaInternaES: CajaInternaES })
				.send({ CajaInternaMT: CajaInternaMT })
				.send({ CajaInternaImporte: CajaInternaImporte })
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
/*		setTimeout(() => {
			console.log('rows CajaInternaAgregar  ', rows)
			const url = IpServidor + "/cajainternaagregar";
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
		}, 300);*/