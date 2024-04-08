import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";

export function clientesCobol() {
	return new Promise(function (resolve) {
		console.log("vino a cleitnes Cobol  ", resolve);
		setTimeout(() => {
			const url = IpServidor + "/clientescobol";
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					//const clientes = JSON.parse(res.text);
					console.log("res  clientesCobol  ", res);
					resolve(res);
				})
				.catch((err) => MuestraMensaje(err));
		});
	}, 500);
}
