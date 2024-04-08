import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function StkRubroBorrar(props) {
	return new Promise(function (resolve) {
		const { idStkRubro, StkRubroCodGrp } = props;

		var url =
			IpServidor +
			"/stkrubroborrar/" +
			"?idStkRubro=" +
			idStkRubro +
			"&StkRubroCodGrp=" +
			StkRubroCodGrp;
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then(function (res) {
				MuestraMensaje(res);
			})
			.catch((err) => MuestraMensaje(err));

		resolve();
	});
}
