import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function OTCondPagoBorrar(props) {
	const url = IpServidor + "/otcondpagoborrar/?id=" + props;
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
