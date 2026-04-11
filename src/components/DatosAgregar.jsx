import MuestraMensaje from "./lib/MuestraMensaje";
import IpServidor from "../pages/VariablesDeEntorno";

import request from "superagent";
export async function DatosAgregar(props, ejecutorbackend) {
	const url = `${IpServidor}/${ejecutorbackend}`;
	try {
		const res = await request
			.post(url)
			.set("Content-Type", "application/json")
			.send(props)
			.set("X-API-Key", "foobar")
		console.log('res  ', res)
		MuestraMensaje(res);
		return res.statusCode; // Esto resuelve la promesa
	} catch (err) {
		MuestraMensaje(err);
		throw err; // Es importante lanzar el error para que el llamador lo detecte
	}

}