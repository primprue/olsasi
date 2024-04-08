import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function StkUnMedModificar(props) {
	const { StkUnMedDesc, id } = props;
	const url = IpServidor + "/stkunmedmodificar/" + id;

	request
		.post(url)
		.set("Content-Type", "application/json")
		.send({ idStkUnMed: id })
		.send({ StkUnMedDesc: StkUnMedDesc })
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}
