import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import MuestraMensaje from "../../components/lib/MuestraMensaje";
// Lee Rubro por codigo de gupo

export const leelistaprecios = () => {
	return new Promise((resolve) => {
		const url = IpServidor + "/listaprecios";
		console.log("leelistaprecios  ", url);
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const listaprecios = JSON.parse(res.text);
				resolve(listaprecios);
			})
			.catch((err) => MuestraMensaje(err));
	});
};