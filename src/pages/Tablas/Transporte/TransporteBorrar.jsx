import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function TransporteBorrar(props) {
	console.log('props', props);
	const url = IpServidor + "/transporteborrar/?id=" + props;
	console.log('url', url);
	request
		.delete(url)
		.set("Content-Type", "application/json")
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err))
		.finally((res) => {
			console.log("termino  ", res);
		});
}
