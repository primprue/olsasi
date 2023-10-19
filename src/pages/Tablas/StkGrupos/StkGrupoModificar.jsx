import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function StkGrupoModificar(props) {
	const { StkGrupoAbr, StkGrupoDesc, StkGrupoContRubro, idStkGrupo } = props;

	const url = IpServidor + "/stkgrupomodificar/?id=" + idStkGrupo;
	request
		.post(url)
		.set("Content-Type", "application/json")
		.send({ StkGrupoDesc: StkGrupoDesc })
		.send({ StkGrupoAbr: StkGrupoAbr })
		.send({ StkGrupoContRubro: StkGrupoContRubro }) // Esto va a ser Cero inicialmente.
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}
