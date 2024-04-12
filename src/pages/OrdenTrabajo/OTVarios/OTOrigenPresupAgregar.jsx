import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function OTOrigenPresupAgregar(selectionModel) {
	const relegidos = selectionModel.flatMap((arr) =>
		arr.map((obj) => ({
			idPresupRenglon: obj.idPresupRenglon,
			PresupRenglonNroPresup: obj.PresupRenglonNroPresup,
		}))
	);

	return new Promise(function () {
		relegidos.forEach((element) => {
			let renglonelegido = JSON.stringify(element);
			setTimeout(() => {
				const url =
					IpServidor +
					"/otorigenpresupagregar/?renglonelegido=" +
					renglonelegido;
				request
					.post(url)
					.set("Content-Type", "application/json")
					.set("X-API-Key", "foobar")

					.then((res) => {
						MuestraMensaje(res);
					})
					.catch((err) => {
						MuestraMensaje(err);
					});
			}, 300);
		});
	});
}
