import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function PresupDetPieModificar(props) {
	const {
		id,
		PresupDetPieLeyenda,
		// PresupDetPieSelec
	} = props;

	const url = IpServidor + "/presupdetpiemodificar/?id=" + id;
	request
		.post(url)
		.set("Content-Type", "application/json")
		.send({ PresupDetPieLeyenda: PresupDetPieLeyenda })
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}
