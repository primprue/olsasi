import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function PresupConfTipoModificar(props) {
	const {
		idPresupConfTipo,
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

	const url = IpServidor + "/presupconftipomodificar/?id=" + idPresupConfTipo;
	request
		.post(url)
		.set("Content-Type", "application/json")
		.send({ PresupConfTipoAnexo: PresupConfTipoAnexo })
		.send({ PresupConfTipoLargo: PresupConfTipoLargo })
		.send({ PresupConfTipoAncho: PresupConfTipoAncho })
		.send({ PresupConfTipoM2: PresupConfTipoM2 })
		.send({ PresupConfTipoCant: PresupConfTipoCant })
		.send({ PresupConfTipoDesc: PresupConfTipoDesc })
		.send({ PresupConfTipoRubro: PresupConfTipoRubro })
		.send({ PresupConfTipoImprime: PresupConfTipoImprime })
		.send({ PresupConfTipoMinMOT: PresupConfTipoMinMOT })
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}
