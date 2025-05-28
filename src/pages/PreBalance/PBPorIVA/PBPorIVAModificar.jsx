import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function PBPorIVAModificar(props) {
	const { PBPorcIVA, id } = props;

	const url = IpServidor + "/pbporivamodificar/" + id;
	request
		.post(url)
		.set("Content-Type", "application/json")
		.send({ PBPorcIVA: PBPorcIVA })
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}
