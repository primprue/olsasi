import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import request from "superagent";

export function ClientesModificar(props) {
	return new Promise(function () {
		setTimeout(() => {
			const {
				id,
				ClientesDesc,
				ClientesDomicilio,
				ClientesCodPos,
				ClientesLoc,
				ClientesPcia,
				ClientesTel,
				ClientesMail,
				ClientesIVA,
				ClientesCUIT,
				ClientesTipo,
				ClientesContacto,
				ClientesCategoria,
				ClientesObserv1,
				ClientesObserv2,
			} = props;
			const url = IpServidor + "/clientesmodificar/" + id;
			request
				.post(url)
				.set("Content-Type", "application/json")
				.send({ ClientesDesc: ClientesDesc })
				.send({ ClientesDomicilio: ClientesDomicilio })
				.send({ ClientesCodPos: ClientesCodPos })
				.send({ ClientesLoc: ClientesLoc })
				.send({ ClientesPcia: ClientesPcia })
				.send({ ClientesTel: ClientesTel })
				.send({ ClientesMail: ClientesMail })
				.send({ ClientesIVA: ClientesIVA })
				.send({ ClientesCUIT: ClientesCUIT })
				.send({ ClientesTipo: ClientesTipo })
				.send({ ClientesContacto: ClientesContacto })
				.send({ ClientesCategoria: ClientesCategoria })
				.send({ ClientesObserv1: ClientesObserv1 })
				.send({ ClientesObserv2: ClientesObserv2 })

				.set("X-API-Key", "foobar")
				.then(function (res) {
					MuestraMensaje(res);
				})
				.catch((err) => MuestraMensaje(err));
		});
	}, 500);
}
