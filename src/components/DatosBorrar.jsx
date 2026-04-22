import request from "superagent";
import MuestraMensaje from "./lib/MuestraMensaje";
import IpServidor from "../pages/VariablesDeEntorno";


export async function DatosBorrar(params, ejecutorbackend) {
	// const {id, ...datos} = paramsid;
	const { id, ...datos } = params;

	const url = `${IpServidor}/${ejecutorbackend}/?id=${id}&&datos=${JSON.stringify(datos)}`;
	// const url = `${IpServidor}/${ejecutorbackend}/?id=${paramsid}`;
	try {
		const res = await request
			.delete(url)
			.set("Content-Type", "application/json")
		MuestraMensaje(res);

		return res.statusCode; // Esto resuelve la promesa
	} catch (err) {
		MuestraMensaje(err);
		throw err; // Es importante lanzar el error para que el llamador lo detecte
	}
}
