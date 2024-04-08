import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export const stkitemsleecodgr = (idStkGrupo) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/stkitemsleecodgr/?idStkGrupo= " + idStkGrupo;
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const stkitems = JSON.parse(res.text);
					resolve(stkitems);
				})
				.catch((err) => {
					MuestraMensaje(err);
				});
		}, 500);
	});
};
