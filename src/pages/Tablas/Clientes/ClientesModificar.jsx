import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import request from "superagent";

export function ClientesModificar(props) {
	return new Promise(function () {
		setTimeout(() => {
			const {
				idClientes,
				ClientesDesc,
				ClientesCalle,
				ClientesNroCalle,
				ClientesPiso,
				ClientesDto,
				ClientesCodPos,
				ClientesLoc,
				ClientesPcia,
				ClientesTel,
				ClientesMail,
				ClientesIVA,
				ClientesCUIT,
				ClientesTipo,
			} = props;

			const url = IpServidor + "/clientesmodificar/" + idClientes;

			request
				.post(url)
				.set("Content-Type", "application/json")
				.send({ ClientesDesc: ClientesDesc })
				.send({ ClientesCalle: ClientesCalle })
				.send({ ClientesNroCalle: ClientesNroCalle })
				.send({ ClientesPiso: ClientesPiso })
				.send({ ClientesDto: ClientesDto })
				.send({ ClientesCodPos: ClientesCodPos })
				.send({ ClientesLoc: ClientesLoc })
				.send({ ClientesPcia: ClientesPcia })
				.send({ ClientesTel: ClientesTel })
				.send({ ClientesMail: ClientesMail })
				.send({ ClientesIVA: ClientesIVA })
				.send({ ClientesCUIT: ClientesCUIT })
				.send({ ClientesTipo: ClientesTipo })

				.set("X-API-Key", "foobar")
				.then(function (res) {
					MuestraMensaje(res);
				})
				.catch((err) => MuestraMensaje(err));
		});
	}, 500);
}
