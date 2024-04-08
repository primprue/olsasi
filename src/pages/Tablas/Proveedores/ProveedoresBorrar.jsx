import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function ProveedoresBorrar(props) {
	return new Promise(function () {
		// const { id } = props;
		const url = IpServidor + "/proveedoresborrar/" + props;
		request
			.delete(url)
			.set("Content-Type", "application/json")
			.then(function (res) {
				MuestraMensaje(res);
			})
			.catch((err) => MuestraMensaje(err));
	});
}
