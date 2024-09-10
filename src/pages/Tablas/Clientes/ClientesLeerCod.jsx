import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";

export function clientesleercod(props) {
	var idcliente = props;

	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/clientesleercod/?id=" + idcliente;
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const clientes = JSON.parse(res.text);
					resolve(clientes);
				})
				.catch((err) => MuestraMensaje(err));
		});
	}, 500);
}
