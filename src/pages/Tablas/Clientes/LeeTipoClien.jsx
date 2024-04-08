import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";

export function leeTipoClien() {
	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/stkbgsubrubroleer";
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const tipoprov = JSON.parse(res.text);
					resolve(tipoprov);
				})
				.catch((err) => MuestraMensaje(err));
		});
	}, 500);
}
