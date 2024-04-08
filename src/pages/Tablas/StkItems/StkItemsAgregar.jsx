import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function StkItemsAgregar(props) {
	// (newData, codigonuevo)
	return new Promise(function () {
		setTimeout(() => {
			const {
				StkItemsRubroAbr,
				StkItemsDesc,
				StkItemsOTD,
				StkItemsCantidad,
				StkItemsFAct,
				StkItemsMin,
				StkItemsMax,
				// stkrubro,
				// stkgrupo,
			} = props;

			const StkItemsGrupo = codigonuevo[1][0].StkItemsGrupo;
			const StkItemsRubro = codigonuevo[1][0].StkItemsRubro;
			const UltItem = codigonuevo[0][0].UltItem;

			const url1 = IpServidor + "/stkitemsagregar/";
			request
				.post(url1)
				.set("Content-Type", "application/json")
				.send({ idStkItems: UltItem + 1 })
				.send({ StkItemsGrupo: StkItemsGrupo })
				.send({ StkItemsRubro: StkItemsRubro })
				.send({ StkItemsRubroAbr: StkItemsRubroAbr })
				.send({ StkItemsDesc: StkItemsDesc })
				.send({ StkItemsOTD: StkItemsOTD })
				.send({ StkItemsCantidad: StkItemsCantidad })
				.send({ StkItemsFAct: StkItemsFAct })
				.send({ StkItemsMin: StkItemsMin })
				.send({ StkItemsMax: StkItemsMax })
				.then((res) => {
					MuestraMensaje(res);
				})
				.catch((err) => {
					MuestraMensaje(err);
				});
		}, 500);
	});
}
