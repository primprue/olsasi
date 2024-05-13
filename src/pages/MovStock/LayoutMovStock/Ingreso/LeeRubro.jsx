import request from "superagent";
import IpServidor from "../../../VariablesDeEntorno.js";
import MuestraMensaje from "../../../../components/lib/MuestraMensaje.js";
export const stkrubrolee = (idStkGrupo) => {
	return new Promise((resolve) => {
		const url = IpServidor + "/stkrubroleerprov/" + idStkGrupo;
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const stkrubro = JSON.parse(res.text);
				resolve(stkrubro);
			})
			.catch((err) => {
				MuestraMensaje(err);
			});
	});
};
