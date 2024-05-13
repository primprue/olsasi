import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import request from "superagent";

export const OTDatosLeer = (props) => {
	const datosde = props;
	return new Promise((resolve) => {
		const url = IpServidor + "/otdatosleer/?datosaleer=" + datosde;
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
