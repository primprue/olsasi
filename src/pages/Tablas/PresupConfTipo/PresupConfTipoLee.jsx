import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";

export function PresupConfTipoLee() {
	return new Promise(function (resolve) {
		setTimeout(() => {
			const url = IpServidor + "/presupconftipoleer";
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const presupconftipo = JSON.parse(res.text);
					resolve(presupconftipo);
					//.catch() //Todo: agregar el catch error.
				})
				.catch((err) => MuestraMensaje(err));
		}, 500);
	});
}
