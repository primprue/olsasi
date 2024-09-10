import request from "superagent";
import IpServidor from "../../../VariablesDeEntorno";

import MuestraMensaje from "../../../../components/lib/MuestraMensaje";

export function ParamCompModificar(props) {
	console.log("props ParamCompModificar  ", props);
	const {
		id,
		ParamCompLetra,
		ParamCompAbrev,
		ParamCompSuc,
		ParamCompNro,
		ParamCompSR,
		ParamCompDesc,
		ParamCompDisc,
		ParamCompIVAAsoc,
	} = props;
	const url = IpServidor + "/paramcompmodificar/" + id;
	request
		.post(url)
		.set("Content-Type", "application/json")
		.send({ ParamCompLetra: ParamCompLetra })
		.send({ ParamCompAbrev: ParamCompAbrev })
		.send({ ParamCompSuc: ParamCompSuc })
		.send({ ParamCompNro: ParamCompNro })
		.send({ ParamCompSR: ParamCompSR })
		.send({ ParamCompDesc: ParamCompDesc })
		.send({ ParamCompDisc: ParamCompDisc })
		.send({ ParamCompIVAAsoc: ParamCompIVAAsoc })
		.set("X-API-Key", "foobar")
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}
