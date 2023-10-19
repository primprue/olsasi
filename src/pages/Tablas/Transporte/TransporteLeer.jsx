import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function leerTransporte() {
	return new Promise(function (resolve) {
		const url = IpServidor + "/transporteleer";
		console.log("url  ", url);
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const transporte = JSON.parse(res.text);
				resolve(transporte);
			});
	});
}
