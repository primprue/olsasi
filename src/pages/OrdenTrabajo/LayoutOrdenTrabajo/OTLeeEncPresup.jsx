import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import request from "superagent";

export const OTLeeEncPresup = (props) => {
	return new Promise((resolve) => {
		const url = IpServidor + "/presupencableenro/?idPresupP=" + props;
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const resultado = JSON.parse(res.text);
				resolve(resultado);
			})
			.catch((err) => {
				MuestraMensaje(err);
			});
	});
};
