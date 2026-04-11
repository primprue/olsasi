import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";

export const PorIVALeer = (_) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/porivaleer";
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const pbrubros = JSON.parse(res.text);
					resolve(pbrubros);
				})
				.catch((err) => MuestraMensaje(err));
		}, 300);
	});
};
