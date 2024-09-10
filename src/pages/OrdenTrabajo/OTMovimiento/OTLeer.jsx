import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";
export function OTLeer() {
	return new Promise(function (resolve) {
		setTimeout(() => {
			const url = IpServidor + "/otleeencab";
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const monedas = JSON.parse(res.text);
					resolve(monedas);
				})
				.catch((err) => MuestraMensaje(err));
		}, 500);
	});
}
