import MuestraMensaje from "../../../../components/lib/MuestraMensaje";
import IpServidor from "../../../VariablesDeEntorno";

import request from "superagent";
export function ParamCompLeer() {
	return new Promise(function (resolve) {
		setTimeout(() => {
			const url = IpServidor + "/paramcompleer";
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const paramcomp = JSON.parse(res.text);
					resolve(paramcomp);
				})
				.catch((err) => MuestraMensaje(err));
		}, 500);
	});
}
