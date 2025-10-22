import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import MuestraMensaje from "../../components/lib/MuestraMensaje";

export function CajaSaldoEfAgregar(datoagrabar) {

	return new Promise(function (resolve, reject) {
		setTimeout(() => {
			const url = IpServidor + "/cajasaldoefagregar";
			request
				.post(url)
				.set("Content-Type", "application/json")
				.send({ datoagrabar: datoagrabar })
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

