import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function PresupConfTipoAgregar(props) {
	const {
		PresupConfTipoLargo,
		PresupConfTipoAncho,
		PresupConfTipoM2,
		PresupConfTipoAnexo,
		PresupConfTipoCant,
		PresupConfTipoDesc,
		PresupConfTipoRubro,
		PresupConfTipoImprime,
		PresupConfTipoMinMOT,
	} = props;

	const url = IpServidor + "/presupconftipoagregar";
	request
		.post(url)
		.set("Content-Type", "application/json")
		.send({ PresupConfTipoLargo: PresupConfTipoLargo })
		.send({ PresupConfTipoAncho: PresupConfTipoAncho })
		.send({ PresupConfTipoM2: PresupConfTipoM2 })
		.send({ PresupConfTipoAnexo: PresupConfTipoAnexo })
		.send({ PresupConfTipoCant: PresupConfTipoCant })
		.send({ PresupConfTipoDesc: PresupConfTipoDesc })
		.send({ PresupConfTipoRubro: PresupConfTipoRubro })
		.send({ PresupConfTipoImprime: PresupConfTipoImprime })
		.send({ PresupConfTipoMinMOT: PresupConfTipoMinMOT })
		// .send({ '': PresupConfTipoBack })

		.set("X-API-Key", "foobar")
		.then((res) => {
			MuestraMensaje(res);
		})
		.catch((err) => {
			MuestraMensaje(err);
		});
}
