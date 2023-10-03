import IpServidor from "../VariablesDeEntorno";
import request from "superagent";

export default function leePresupConfTipoLeeAnexo(anexo, prodelab) {
	return new Promise((resolve) => {
		const url =
			IpServidor +
			"/presupconftipoleeanexo/?anexo=" +
			anexo +
			"&prodelab=" +
			prodelab;
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const presupconftipoleeanexo = JSON.parse(res.text);

				resolve(presupconftipoleeanexo);
			});
	});
}
