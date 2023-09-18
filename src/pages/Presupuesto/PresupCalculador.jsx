import request from "superagent";
import IpServidor from "../VariablesDeEntorno";

export const presupcalculador = (DatosPresupEleg, datoscalculo, tipo) => {
	var datotraido = DatosPresupEleg;
	var backend, url;
	if (
		datotraido === null ||
		datotraido === "" ||
		DatosPresupEleg.PresupConfTipoBack === null ||
		DatosPresupEleg.PresupConfTipoBack === "" ||
		DatosPresupEleg.PresupConfTipoBack === " "
	) {
		// if ((DatosPresupEleg.PresupConfTipoBack === null)
		//   || (DatosPresupEleg.PresupConfTipoBack === "")) {
		url =
			IpServidor +
			"/presupconftipocalc/?tipo=" +
			tipo +
			"&datoscalculo=" +
			datoscalculo;
	} else {
		backend = DatosPresupEleg.PresupConfTipoBack;
		url = IpServidor + backend + "/?datoscalculo=" + datoscalculo;
	}

	return new Promise((resolve) => {
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const presuprenglon = JSON.parse(res.text);

				resolve(presuprenglon);
			});
	});
};
