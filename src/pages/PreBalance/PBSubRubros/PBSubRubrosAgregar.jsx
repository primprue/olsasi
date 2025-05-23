import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function PBSubRubrosAgregar(props) {

	return new Promise(function () {
		setTimeout(() => {
			const { PBSubRubroIdRubro, PBSubRubroDetalle } = props;

			const url = IpServidor + "/pbsubrubrosagregar";
			request
				.post(url)
				.set("Content-Type", "application/json")
				.send({ PBSubRubroIdRubro: PBSubRubroIdRubro })
				.send({ PBSubRubroDetalle: PBSubRubroDetalle })
				.then((res) => {
					MuestraMensaje(res);
				})
				.catch((err) => {
					MuestraMensaje(err);
				});
		}, 300);
	});
}

