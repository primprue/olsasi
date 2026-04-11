


import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";

export function OTDatosLee(props) {

	return new Promise((resolve) => {
		const url = IpServidor + "/otdatoslee/?id=" + props;
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const otdatoslee = JSON.parse(res.text);
				resolve(otdatoslee);
			})
			.catch((err) => MuestraMensaje(err));
	});
}
