import request from "superagent";
import IpServidor from "../../../../VariablesDeEntorno.js";
import MuestraMensaje from "../../../../../components/lib/MuestraMensaje.js";
// Lee Grupo
export const RealizaCambioStock = (infingreso) => {
	return new Promise((resolve) => {
		const url1 = IpServidor + "/realizacambiostock";
		request
			.post(url1)
			.set("Content-Type", "application/json")
			.send({ infingreso: infingreso })
			// .set("X-API-Key", "foobar")
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				MuestraMensaje(err);
			});
	});
};
