import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";
export function OTEstadoLeer() {
	return new Promise(function (resolve) {
		setTimeout(() => {
			const url = IpServidor + "/otestadoleer";
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const otestado = JSON.parse(res.text);
					resolve(otestado);
				})
				.catch((err) => MuestraMensaje(err));
		}, 500);
	});
}
