import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function PBSubRubrosModificar(props) {
	const { PBSubRubroDetalle, PBSubRubroIdRubro, PBidSubRubro } = props;

	const url = IpServidor + "/pbsubrubrosmodificar/?id=" + PBidSubRubro;
	request
		.post(url)
		.set("Content-Type", "application/json")
		.send({ PBSubRubroDetalle: PBSubRubroDetalle })
		.send({ PBSubRubroIdRubro: PBSubRubroIdRubro })
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}
