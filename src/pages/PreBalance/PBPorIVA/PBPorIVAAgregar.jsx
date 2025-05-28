import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function PBPorIVAAgregar(props) {
	console.log('props ', props)
	return new Promise(function () {
		setTimeout(() => {
			const { PBPorcIVA } = props.PBPorcIVA;

			const url = IpServidor + "/pbporivaagregar";
			request
				.post(url)
				.set("Content-Type", "application/json")
				.send({ PBPorcIVA: PBPorcIVA })
				.set("X-API-Key", "foobar")
				.then((res) => {
					MuestraMensaje(res);
				})
				.catch((err) => {
					MuestraMensaje(err);
				});
		}, 300);
	});
}

/*	.then(function (res) {
			const respuesta = JSON.parse(res.text);
			if (respuesta.affectedRows !== 0)
				Mensaje("error", "Grupo agregado correctamente");
			else Mensaje("error", "No se pudo modificar");
		})
		.catch((err) => CodigoError(err));*/
