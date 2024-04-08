import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

// Lee Rubro por codigo de gupo

export const stkrubroleeconf = (cuallee) => {
	return new Promise((resolve) => {
		const url = IpServidor + "/stkrubroleerconf/" + cuallee;
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const stkrubroconf = JSON.parse(res.text);
				resolve(stkrubroconf);
			})
			.catch((err) =>
				console.log("codigo de error stkrubroleeconf que no es error", err)
			);
	});
};
