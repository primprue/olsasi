import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function StkRubroBorrar(props) {
	return new Promise(function () {
		setTimeout(() => {
			const url = IpServidor + "/stkrubroborrar/?id=" + props;
			request
				.delete(url)
				.set("Content-Type", "application/json")
				.then(function (res) {
					MuestraMensaje(res);
				})
				.catch((err) => {
					console.log('err en st  ', err)
					MuestraMensaje(err);
				});
		}, 300);
	});
}



