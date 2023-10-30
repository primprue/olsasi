import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function TransporteBorrar(props) {
	const url = IpServidor + "/transporteborrar/?id=" + props;
	request
		.delete(url)
		.set("Content-Type", "application/json")
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}
