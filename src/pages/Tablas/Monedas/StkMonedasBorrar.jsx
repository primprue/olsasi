import request from "superagent";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

export function StkMonedasBorrar(props) {
	const url = IpServidor + "/stkmonedasborrar/?id=" + props;
	request
		.delete(url)
		.set("Content-Type", "application/json")
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}
