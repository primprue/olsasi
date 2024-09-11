import request from "superagent";

import IpServidor from "../../../VariablesDeEntorno.js";
import MuestraMensaje from "../../../../components/lib/MuestraMensaje.js";

export const OTRenglonLeer = (NroOT) => {
	return new Promise((resolve) => {
		setTimeout(() => {
<<<<<<< Updated upstream
			const url = IpServidor + "/otrengleerpot/?id=" + NroOT;
			// +
			// "&t=" +
			// new Date().getTime(); // Esto garantiza que cada solicitud sea única y no sea cacheada
=======
			const url =
				IpServidor +
				"/otrengleerpot/?id=" +
				NroOT +
				"&t=" +
				new Date().getTime(); // Esto garantiza que cada solicitud sea única y no sea cacheada
>>>>>>> Stashed changes
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
