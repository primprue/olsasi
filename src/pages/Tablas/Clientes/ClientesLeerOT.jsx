import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";

export function ClientesLeerOT() {
	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/clientesleerot";
			// + "&t=" + new Date().getTime();
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
