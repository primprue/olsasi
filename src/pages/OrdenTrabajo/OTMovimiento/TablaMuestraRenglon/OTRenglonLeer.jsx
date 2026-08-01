import request from "superagent";

import IpServidor from "../../../VariablesDeEntorno.js";
import MuestraMensaje from "../../../../components/lib/MuestraMensaje.js";

export const OTRenglonLeer = (NroOT) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/otrengleerpot/?id=" + NroOT;
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const rengloot = JSON.parse(res.text);
					resolve(rengloot);
				})
				.catch((err) => {
					MuestraMensaje(err);
				});
		}, 300);
	});
};
