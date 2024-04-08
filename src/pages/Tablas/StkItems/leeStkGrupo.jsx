import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function leeStkGrupo(_) {
	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/stkgrupoleeselec";
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const stkgrupo = JSON.parse(res.text);
					resolve(stkgrupo);
				})
				.catch((err) => {
					MuestraMensaje(err);
				});
		}, 500);
	});
}
