import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";
// Lee Rubro por codigo de gupo

export const LeeInventario = () => {
	return new Promise((resolve) => {
		const url = IpServidor + "/inventario";
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const inventario = JSON.parse(res.text);
				resolve(inventario);
			})
			.catch((err) => MuestraMensaje(err));
	});
};
