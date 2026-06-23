
import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import MuestraMensaje from "../../components/lib/MuestraMensaje";

/**
 * Graba un presupuesto en el servidor.
 * @param {Object} DatosPresup - Datos principales del presupuesto (props)
 * @param {string} maymin - Tipo de cliente
 * @param {string} nomCliente - Nombre del cliente
 * @param {number|string} idClientes - ID del cliente
 * @param {string} explicacionPresup - Descripción o notas
 * @returns {Promise<number>} Número de presupuesto generado
 */
export const PresupGrabar = async (
	DatosPresup,
	maymin,
	nomCliente,
	idClientes,
	explicacionPresup,
	renglonanexodetalle
) => {
	const url = `${IpServidor}/presupgraba`;
	try {
		const res = await request
			.post(url)
			.set("Content-Type", "application/json")
			.set("X-API-Key", "foobar")
			.send({
				DatosPresup,
				maymin,
				nomCliente,
				idClientes,
				explicacionPresup,
				renglonanexodetalle
			});

		// Superagent ya parsea el JSON si el Content-Type de respuesta es correcto
		// Si no, usamos JSON.parse(res.text)
		const respuesta = typeof res.body === 'object' ? res.body : JSON.parse(res.text);
		if (respuesta.ok) {
			MuestraMensaje(
				{ response: { status: 201, body: { leyenda: "Presupuesto grabado correctamente" } } }
				, "Presupuesto grabado correctamente");
		}
		return respuesta.nropresup;

	} catch (err) {
		MuestraMensaje(err);
		// Lanzamos el error para que el componente que llama a esta función 
		// sepa que la grabación falló y pueda mostrar un mensaje al usuario.
		throw err;
	}
};