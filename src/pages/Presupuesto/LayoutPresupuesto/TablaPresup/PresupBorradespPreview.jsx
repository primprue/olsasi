import request from "superagent";
import IpServidor from "../../../VariablesDeEntorno";

export const PresupBorradespPreview = (
	nombrepresupue
) => {
	return new Promise((resolve) => {
		const url = IpServidor + "/presupborrarenpreview/?nombrepresup=" + nombrepresupue;
		request
			.delete(url)
			.set("Content-Type", "application/json")
			.set("X-API-Key", "foobar")
			.then((res) => {
				resolve(res);
			});
	}).catch(
		(err) => console.log("codigo de error PresupBorradespPreview que no es error", err)
		// CodigoError(err)
	);
};
