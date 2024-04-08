import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";

export const stkgrupolee = (_) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/stkgrupoleer";
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const stkgrupo = JSON.parse(res.text);
					resolve(stkgrupo);
				})
				.catch((err) => MuestraMensaje(err));
		}, 500);
	});
};
