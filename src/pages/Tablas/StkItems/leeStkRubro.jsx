import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function leeStkRubro() {
	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/stkrubroleeselec";
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const stkrubro = JSON.parse(res.text);
					resolve(stkrubro);
				})
				.catch((err) => {
					MuestraMensaje(err);
				});
		}, 500);
	});
}
