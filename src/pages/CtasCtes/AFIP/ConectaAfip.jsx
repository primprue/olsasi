import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

export const ConectaAfip = () => {
	return new Promise((resolve) => {
		const url = IpServidor + "/conectaafip";
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const resultconexion = JSON.parse(res.text);
				resolve(resultconexion);
			})
			.catch((err) => MuestraMensaje(err));
	});
};
