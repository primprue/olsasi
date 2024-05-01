import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";
export const StkItemsLeeAbrRub = (StkRubroAbr) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/stkitemsleeabrrub/?abr=" + StkRubroAbr;
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const colores = JSON.parse(res.text);
					resolve(colores);
				})
				.catch((err) => {
					MuestraMensaje(err);
				});
		}, 200);
	});
};
