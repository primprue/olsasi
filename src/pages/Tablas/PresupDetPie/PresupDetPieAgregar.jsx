import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function PresupDetPieAgregar(props) {
	const { PresupDetPieLeyenda } = props;

	const url = IpServidor + "/presupdetpieagregar";
	request
		.post(url)
		.set("Content-Type", "application/json")
		.send({ PresupDetPieLeyenda: PresupDetPieLeyenda })
		// .send({ PresupDetPieSelec: PresupDetPieSelec })
		.set("X-API-Key", "foobar")
		.then((res) => {
			MuestraMensaje(res);
		})
		.catch((err) => {
			MuestraMensaje(err);
		});
}
