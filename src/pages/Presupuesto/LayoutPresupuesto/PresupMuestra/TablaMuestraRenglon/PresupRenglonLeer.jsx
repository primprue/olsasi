import request from "superagent";

import IpServidor from "../../../../VariablesDeEntorno.js";

export const presuprenglonleer = (Presup) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/presuprenglonleer/?id=" + Presup;
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const renglones = JSON.parse(res.text);
					resolve(renglones);
				});
		}, 500);
	});
};
