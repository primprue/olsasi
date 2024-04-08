import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function proveedoresleer(_) {
	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/proveedoresleer";
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const proveedoresleido = JSON.parse(res.text);
					resolve(proveedoresleido);
				})
				.catch((err) => MuestraMensaje(err));
		});
	}, 500);
}
