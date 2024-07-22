import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";

export function ClientesAgregar(props) {
	return new Promise(function () {
		setTimeout(() => {
			const {
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
			const url = IpServidor + "/clientesagregar";
			request
				.post(url)
				.set("Content-Type", "application/json")
				.send({ cliendesc: ClientesDesc })
				.send({ cliendomicilio: ClientesDomicilio })
				.send({ cliencodpostal: ClientesCodPos })
				.send({ clienlocalidad: ClientesLoc })
				.send({ clienprovincia: ClientesPcia })
				.send({ clientelefono: ClientesTel })
				.send({ clienmail: ClientesMail })
				.send({ clieniva: ClientesIVA })
				.send({ cliencuit: ClientesCUIT })
				.send({ clientipo: ClientesTipo })
				.send({ cliencontacto: ClientesContacto })
				.send({ cliencategoria: ClientesCategoria })
				.send({ clienobserv1: ClientesObserv1 })
				.send({ clienobserv2: ClientesObserv2 })
				.set("X-API-Key", "foobar")
				.then(function (res) {
					MuestraMensaje(res);
				})
				.catch((err) => MuestraMensaje(err));
		}, 500);
	});
}
