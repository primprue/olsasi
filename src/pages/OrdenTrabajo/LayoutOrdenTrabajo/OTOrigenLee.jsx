import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";
// Lee Rubro por codigo de gupo

export const OTOrigenLee = () => {
	return new Promise((resolve) => {
		const url = IpServidor + "/otorigenlee";
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const ordtrabdatorigen = JSON.parse(res.text);
				resolve(ordtrabdatorigen);
			})
			.catch((err) => MuestraMensaje(err));
	});
};
