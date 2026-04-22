import MuestraMensaje from "./lib/MuestraMensaje";
import IpServidor from "../pages/VariablesDeEntorno";

import request from "superagent";
export async function DatosModificar(props, ejecutorbackend) {
	const { id, ...datos } = props;
	// const url = `${IpServidor}/${ejecutorbackend}/?id=${id}`;
	console.log('...datos  ', props)
	const url = `${IpServidor}/${ejecutorbackend}/?id=${id}`;
	try {
		const res = await request
			.post(url)
			.set("Content-Type", "application/json")
			.send(datos); // Enviamos todo el objeto de una vez

		MuestraMensaje(res);

		return res.statusCode; // Esto resuelve la promesa
	} catch (err) {
		MuestraMensaje(err);
		throw err; // Es importante lanzar el error para que el llamador lo detecte
	}

}
