import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";

export function OTCondPagoLeer() {
	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/otcondpagoleer";
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const otcondpago = JSON.parse(res.text);
					resolve(otcondpago);
				})
				.catch((err) => MuestraMensaje(err));
		}, 300);
	});
}
