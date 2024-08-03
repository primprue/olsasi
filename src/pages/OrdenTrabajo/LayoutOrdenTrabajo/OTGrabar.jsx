import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
export const OTGrabar = (otdatos) => {
	//esta forma de pasar los datos la tome de chatgpt funciona igual que la forma que yo uso habitualmente
	const payload = {
		// datosconfec: datosconfec,
		// renglonespresup: renglonespresup,
		// datosencab: datosencab,
		otdatos: otdatos,
	};
	return new Promise((resolve) => {
		const url = IpServidor + "/otgraba";
		request
			.post(url)
			.set("Content-Type", "application/json")
			.set("X-API-Key", "foobar")
			.send(JSON.stringify(payload))

			// .post(url)
			// .set("Content-Type", "application/json")
			// .send({ datosconfec: datosconfec })
			// .send({ renglonespresup: renglonespresup })
			// .send({ datosencab: datosencab })

			.set("X-API-Key", "foobar")
			.then((res) => {
				const respuesta = JSON.parse(res.text);
				// nroPresupuesto = respuesta.insertId;
				// resolve(nroPresupuesto);
			});
	}).catch(
		(err) => console.log("codigo de error presupgrabar que no es error", err)
		// CodigoError(err)
	);
};
