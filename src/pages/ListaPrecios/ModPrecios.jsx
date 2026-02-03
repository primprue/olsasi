import request from "superagent";
import MuestraMensaje from "../../components/lib/MuestraMensaje";
import IpServidor from "../VariablesDeEntorno";

export const ModPrecios = (
	idProveedores,
	idStkGrupo,
	StkRubroAbr,
	Importe,
	Porcentaje
) => {

	return new Promise((resolve, reject) => {
		const url = IpServidor + "/modprecios";
		request
			.post(url)
			.set("Content-Type", "application/json")
			.send({
				idProveedores: idProveedores,
				idStkGrupo: idStkGrupo,
				StkRubroAbr: StkRubroAbr,
				importemod: Importe,
				porcentmod: Porcentaje,
			})
			.then((res) => {
				console.log('res  ', res)
				MuestraMensaje(res);
				resolve(res); // <--- IMPORTANTE: Esto avisa que la función terminó con éxito
			})
			.catch((err) => {
				console.log('err  ', err)
				MuestraMensaje(err);
				reject(err);  // <--- IMPORTANTE: Esto avisa que hubo un error
			});
	})
}
