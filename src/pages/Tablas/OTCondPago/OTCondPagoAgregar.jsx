import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function OTCondPagoAgregar(props) {
	return new Promise(function () {
		setTimeout(() => {
			const { OTCondPagoDesc, OTCondPagolinea } = props;
			console.log(" OTCondPagoDesc ", OTCondPagoDesc);
			const url = IpServidor + "/otcondpagoagregar";
			request
				.post(url)
				.set("Content-Type", "application/json")
				.send({ otcondpagodesc: OTCondPagoDesc })
				.send({ otcondpagolinea: OTCondPagolinea })

				.set("X-API-Key", "foobar")
				.then((res) => {
					MuestraMensaje(res);
				})
				.catch((err) => {
					MuestraMensaje(err);
				});
		}, 1000);
	});
}
