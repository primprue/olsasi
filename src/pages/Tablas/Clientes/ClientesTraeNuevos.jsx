import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";

export function clientestraeNuevos() {
	console.log("esta en clientes trae   ");
	return new Promise(function (resolve) {
		setTimeout(() => {
			const url = IpServidor + "/clientestraenuevos";
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const clientes = JSON.parse(res.text);
					resolve(clientes);
				})
				.catch((err) => MuestraMensaje(err));
		});
	}, 500);
}
