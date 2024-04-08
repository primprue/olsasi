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
	const url = IpServidor + "/modprecios/";
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
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
};
