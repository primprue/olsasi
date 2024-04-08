import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function leeStkItemsDetalles() {
	return new Promise(function (resolve) {
		setTimeout(() => {
			const url = IpServidor + "/stkitemsleedetalles";
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const items = JSON.parse(res.text);
					resolve(items);
				})
				.catch((err) => MuestraMensaje(err));
		});
	}, 500);
}
