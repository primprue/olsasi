import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

import { stkItemsAgregar } from "./StkItemsAgregar";

export function stkItemsBuscaCod(props) {
	return new Promise(function () {
		setTimeout(() => {
			const { StkItemsRubroAbr } = props;

			var url =
				IpServidor + "/stkitemscodabr/?StkItemsRubroAbr=" + StkItemsRubroAbr;
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((datosenv) => {
					const codigoitems = JSON.parse(datosenv.text);
					stkItemsAgregar(props, codigoitems);
				})
				.catch((err) => {
					MuestraMensaje(err);
				});
		}, 500);
	});
}
