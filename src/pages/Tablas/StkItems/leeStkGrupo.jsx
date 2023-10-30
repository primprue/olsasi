import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function leeStkGrupo(_) {
	return new Promise((resolve) => {
		const url = IpServidor + "/stkgrupoleeselec";
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const stkgrupo = JSON.parse(res.text);
				resolve(stkgrupo);
			});
	});
}
