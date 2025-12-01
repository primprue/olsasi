import MuestraMensaje from "../../../../../components/lib/MuestraMensaje";
import IpServidor from "../../../../VariablesDeEntorno";

import request from "superagent";

export function MovStockLeer(props) {
	const { FechaDesde, FechaHasta, tipolist } = props;
	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/movstockleer/?FechaDesde=" + FechaDesde + "&FechaHasta=" + FechaHasta + "&tipolist=" + tipolist;
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const movstock = JSON.parse(res.text);
					resolve(movstock);
				})
				.catch((err) => MuestraMensaje(err));
		});
	}, 300);

}
