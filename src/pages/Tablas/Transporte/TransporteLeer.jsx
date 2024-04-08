import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";

export function leerTransporte() {
	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/transporteleer";
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const transporte = JSON.parse(res.text);
					resolve(transporte);
				})
				.catch((err) => MuestraMensaje(err));
		}, 500);
	});
}
