import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

// Lee Grupo
export const stkgrupolee = (_) => {
	return new Promise((resolve) => {
		const url = IpServidor + "/stkgrupoleer";
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const stkgrupo = JSON.parse(res.text);
				resolve(stkgrupo);
			});
	});
};
