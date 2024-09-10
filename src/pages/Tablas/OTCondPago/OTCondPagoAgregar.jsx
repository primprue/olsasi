import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function OTCondPagoAgregar(props) {
	return new Promise(function () {
		setTimeout(() => {
			const { OTCondPagoDesc } = props;
			console.log(" OTCondPagoDesc ", OTCondPagoDesc);
			const url = IpServidor + "/otcondpagoagregar";
			request
				.post(url)
				.set("Content-Type", "application/json")
				.send({ OTCondPagoDesc: OTCondPagoDesc })

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
