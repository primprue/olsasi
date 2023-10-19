import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function TransporteBorrar(props) {
	const { idTransporte } = props;
	const url = IpServidor + "/transporteborrar/?id=" + idTransporte;
	request
		.delete(url)
		.set("Content-Type", "application/json")
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}
