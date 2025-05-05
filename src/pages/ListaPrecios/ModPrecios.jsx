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
	return new Promise((resolve) => {
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
				MuestraMensaje(res);
			})
			.catch((err) => MuestraMensaje(err));
	})
}
