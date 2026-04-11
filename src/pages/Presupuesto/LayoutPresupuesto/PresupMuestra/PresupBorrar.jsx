import request from "superagent";

import IpServidor from "../../../VariablesDeEntorno";
import MuestraMensaje from "../../../../components/lib/MuestraMensaje";

export function PresupBorrar(props) {
	const url = IpServidor + "/presupborrar/?id=" + props;
	request
		.delete(url)
		.set("Content-Type", "application/json")
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}
