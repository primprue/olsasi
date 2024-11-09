import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function PBRubrosModificar(props) {
	const { PBRubrosDetalle, id } = props;

	const url = IpServidor + "/pbrubrosmodificar/?id=" + id;
	request
		.post(url)
		.set("Content-Type", "application/json")
		.send({ PBRubrosDetalle: PBRubrosDetalle })
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}
