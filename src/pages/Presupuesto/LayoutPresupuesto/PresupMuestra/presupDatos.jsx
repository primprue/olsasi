import IpServidor from "../../../VariablesDeEntorno.js";
import request from "superagent";

export const presupDatos = (date) => {
	return new Promise(function (resolve) {
		const url = IpServidor + "/presupencableer/?id=" + date;
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const datosencabpresup = JSON.parse(res.text);
				resolve(datosencabpresup);
			});
	});
};
