import request from "superagent";
import IpServidor from "../VariablesDeEntorno";

export const presupcalculador = (DatosPresupEleg, datoscalculo, tipo) => {
	console.log("datoscalculo  ", datoscalculo);
	var datotraido = DatosPresupEleg;
	var backend = "",
		url = "";
	if (
		datotraido === null ||
		datotraido === "" ||
		DatosPresupEleg.PresupConfTipoBack === null ||
		DatosPresupEleg.PresupConfTipoBack === "" ||
		DatosPresupEleg.PresupConfTipoBack === " "
	) {
		url =
			IpServidor +
			"/presupconftipocalc/?tipo=" +
			tipo +
			"&datoscalculo=" +
			datoscalculo;
	} else {
		backend = DatosPresupEleg.PresupConfTipoBack;
		url = IpServidor + backend + "/?datoscalculo=" + datoscalculo;
		console.log("url  ", url);
	}

	return new Promise((resolve, reject) => {
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const presuprenglon = JSON.parse(res.text);
				resolve(presuprenglon);
			})
			.catch((err) => {
				console.error("Error al hacer la solicitud:", err);
				reject(err);
			});
	});
};
