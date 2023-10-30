import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function StkGruposAgregar(props) {
	return new Promise(function () {
		setTimeout(() => {
			const { StkGrupoAbr, StkGrupoDesc } = props;

			const url = IpServidor + "/stkgrupoagregar";
			request
				.post(url)
				.set("Content-Type", "application/json")
				.send({ StkGrupoDesc: StkGrupoDesc })
				.send({ StkGrupoAbr: StkGrupoAbr })
				.send({ StkGrupoContRubro: 0 }) // Esto va a ser Cero inicialmente.
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

/*	.then(function (res) {
			const respuesta = JSON.parse(res.text);
			if (respuesta.affectedRows !== 0)
				Mensaje("error", "Grupo agregado correctamente");
			else Mensaje("error", "No se pudo modificar");
		})
		.catch((err) => CodigoError(err));*/
