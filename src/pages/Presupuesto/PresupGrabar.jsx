import request from "superagent";

import IpServidor from "../VariablesDeEntorno";
var nroPresupuesto = 0;
export const PresupGrabar = (
	props,
	ClienteMayMin,
	nomCliente,
	idClientes,
	explicacionPresup
) => {
	return new Promise((resolve) => {
		const url = IpServidor + "/presupgraba";
		request
			.post(url)
			.set("Content-Type", "application/json")
			.send({ DatosPresup: props })
			.send({ maymin: ClienteMayMin })
			.send({ nomCliente: nomCliente })
			.send({ idClientes: idClientes })
			.send({ explicacionPresup: explicacionPresup })

			.set("X-API-Key", "foobar")
			.then((res) => {
				const respuesta = JSON.parse(res.text);
				nroPresupuesto = respuesta.insertId;
				resolve(nroPresupuesto);
			});
	}).catch(
		(err) => console.log("codigo de error presupgrabar que no es error", err)
		// CodigoError(err)
	);
};
