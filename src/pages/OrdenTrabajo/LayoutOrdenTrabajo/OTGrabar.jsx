import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";
export async function OTGrabar(otdatos) {
	const url = `${IpServidor}/otgraba`;
	try {
		const res = await request
			.post(url)
			.set("Content-Type", "application/json")
			.set("X-API-Key", "foobar")
			.send({ otdatos: otdatos })

		const respuesta = typeof res.body === 'object' ? res.body : JSON.parse(res.text);
		if (respuesta.ok) {
			MuestraMensaje(
				{ response: { status: 201, body: { leyenda: "Orden de Trabajo grabada correctamente" } } }
				, "Orden de Trabajo grabada correctamente");
		}
		return respuesta.nroot;

	} catch (err) {
		MuestraMensaje(err);
		throw err; // Es importante lanzar el error para que el llamador lo detecte
	}
};
