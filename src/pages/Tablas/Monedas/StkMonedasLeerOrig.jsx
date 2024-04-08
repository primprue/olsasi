import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";

export const stkmonedasleerorig = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/stkmonedasleerorig";
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
};
