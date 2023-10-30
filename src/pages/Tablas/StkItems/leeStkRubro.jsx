import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function leeStkRubro() {
	return new Promise((resolve) => {
		const url = IpServidor + "/stkrubroleeselec";
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const stkrubro = JSON.parse(res.text);
				resolve(stkrubro);
			});
	});
}
