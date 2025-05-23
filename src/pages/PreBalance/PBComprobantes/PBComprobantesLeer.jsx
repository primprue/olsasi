import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";


export const PBComprobantesLeer = () => {
	return new Promise(resolve => {
		const url = IpServidor + "/pbcomprobantesleer";
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const pbcomprobantes = JSON.parse(res.text);
				resolve(pbcomprobantes);
			})
			.catch((err) => MuestraMensaje(err));
	}, 300);

};


