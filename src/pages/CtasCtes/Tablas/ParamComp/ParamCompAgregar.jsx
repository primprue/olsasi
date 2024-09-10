import MuestraMensaje from "../../../../components/lib/MuestraMensaje";
import IpServidor from "../../../VariablesDeEntorno";

import request from "superagent";
// import "react-table/react-table.css";

export function ParamCompAgregar(props) {
	return new Promise(function () {
		setTimeout(() => {
			const {
				idParamComp,
				ParamCompLetra,
				ParamCompAbrev,
				ParamCompSuc,
				ParamCompNro,
				ParamCompSR,
				ParamCompDesc,
				ParamCompDisc,
				ParamCompIVAAsoc,
			} = props;
			const url = IpServidor + "/paramcompagregar";
			request
				.post(url)
				.set("Content-Type", "application/json")
				.send({ idParamComp: idParamComp })
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
		}, 500);
	});
}
