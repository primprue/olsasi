import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function StkItemsModificar(props) {
	return new Promise(function (resolve) {
		const {
			idStkItems,
			StkItemsGrupo,
			StkItemsRubro,
			StkItemsRubroAbr,
			StkItemsDesc,
			StkItemsOTD,
			StkItemsCantidad,
			StkItemsCantDisp,
			// StkItemsFAct,
			StkItemsMin,
			StkItemsMax,
		} = props;

		const url =
			IpServidor +
			"/stkitemsmodificar/?idStkItems=" +
			idStkItems +
			"&StkItemsGrupo=" +
			StkItemsGrupo +
			"&StkItemsRubro=" +
			StkItemsRubro;
		request
			.post(url)
			.set("Content-Type", "application/json")
			.send({
				StkItemsRubroAbr: StkItemsRubroAbr,
				StkItemsDesc: StkItemsDesc,
				StkItemsOTD: StkItemsOTD,
				StkItemsCantidad: StkItemsCantidad,
				StkItemsCantDisp: StkItemsCantDisp,
				StkItemsMin: StkItemsMin,
				StkItemsMax: StkItemsMax,
			})
			.then(function (res) {
				MuestraMensaje(res);
			})
			.catch((err) => MuestraMensaje(err));
	});
}
