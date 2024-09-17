import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function OTCondPagoModificar(props) {
	const { id, OTCondPagoDesc } = props;

	const url = IpServidor + "/otcondpagomodificar/" + id;
	request
		.post(url)
		.set("Content-Type", "application/json")
		.send({ OTCondPagoDesc: OTCondPagoDesc })

		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}
