import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function leetipoprov() {
	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/stkbgsubrubroleer"; //porque lee el tipo de subrubro de prebalance
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const tipoprov = JSON.parse(res.text);
					resolve(tipoprov);
				})
				.catch((err) => MuestraMensaje(err));
		});
	}, 500);
}
