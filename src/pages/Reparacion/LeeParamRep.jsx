import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import MuestraMensaje from "../../components/lib/MuestraMensaje";
// Lee Rubro por codigo de gupo

export const LeeParamRep = () => {
	return new Promise((resolve) => {
		const url = IpServidor + "/repleecob";
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const paramrep = JSON.parse(res.text);
				resolve(paramrep);
			})
			.catch((err) => MuestraMensaje(err));
	});
};
