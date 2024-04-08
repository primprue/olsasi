import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export const stkrubroleer = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/stkrubroleer";
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const rubros = JSON.parse(res.text);
					resolve(rubros);
				})
				.catch((err) => MuestraMensaje(err));
		}, 500);
	});
};
