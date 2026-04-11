import MuestraMensaje from "./lib/MuestraMensaje";
import IpServidor from "../pages/VariablesDeEntorno";

import request from "superagent";
export async function DatosLeer(ejecutorbackend) {
	const url = `${IpServidor}/${ejecutorbackend}`;
	try {
		const res = await request
			.get(url)
			.set("Content-Type", "application/json")
			.set("X-API-Key", "foobar")
		// Superagent coloca el JSON parseado en res.body automáticamente
		const resultadolectura = res.body || JSON.parse(res.text);
		// Opcional: Mostrar mensaje de éxito
		// MuestraMensaje(res);

		return resultadolectura;
	} catch (err) {
		MuestraMensaje(err);
		throw err; // Es importante lanzar el error para que el llamador lo detecte
	}

}
