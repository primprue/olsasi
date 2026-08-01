import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
var nroOrdTrab = 0;
export const OTGrabar = (otdatos) => {
	return new Promise((resolve) => {
		const url = IpServidor + "/otgraba";
		request
			.post(url)
			.set("Content-Type", "application/json")
			.set("X-API-Key", "foobar")
			.send({ otdatos: otdatos })

			// .post(url)
			// .set("Content-Type", "application/json")
			// .send({ datosconfec: datosconfec })
			// .send({ renglonespresup: renglonespresup })
			// .send({ datosencab: datosencab })

			.set("X-API-Key", "foobar")
			.then((res) => {
				const respuesta = JSON.parse(res.text);
				nroOrdTrab = respuesta.insertId;
				resolve(nroOrdTrab);
			});
	}).catch(
		(err) => console.log("codigo de error presupgrabar que no es error", err)
		// CodigoError(err)
	);
};
