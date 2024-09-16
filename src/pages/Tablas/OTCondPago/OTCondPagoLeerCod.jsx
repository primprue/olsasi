import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";

export function OTCondPagoLeer(props) {
	var id = props;

	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/otcondpagoleercod?id=" + id;
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const otcondpago = JSON.parse(res.text);
					resolve(otcondpago);
				})
				.catch((err) => MuestraMensaje(err));
		}, 500);
	});
}
