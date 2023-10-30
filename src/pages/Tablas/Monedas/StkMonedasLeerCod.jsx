import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";
// import { resolve } from "dns";

export const stkmonedasleercod = () => {
	return new Promise((resolve) => {
		const url = IpServidor + "/stkmonedasleercod/";
		// const url = IpServidor + `/stkmonedasleercod?id="${idStkMonedas}"`;
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const monedas = JSON.parse(res.text);
				MuestraMensaje(res);
				resolve(monedas);
			})
			.catch((err) => MuestraMensaje(err));
	});
};
