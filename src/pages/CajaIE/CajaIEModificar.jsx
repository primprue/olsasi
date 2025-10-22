import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import MuestraMensaje from "../../components/lib/MuestraMensaje";

export function ProveedoresModificar(props) {
	return new Promise(function () {
		const {
			idCajaIE, CajaIEFecha, CajaIECliente, CajaIEConcepto, CajaIEMT, CajaIEImporte

		} = props;
		//const url = IpServidor + "/proveedoresmodificar/?id=" + id;

		request
			.post(url)
			.set("Content-Type", "application/json")
			.send({ CajaIEFecha: CajaIEFecha })
			.send({ CajaIECliente: CajaIECliente })
			.send({ CajaIEConcepto: CajaIEConcepto })
			.send({ CajaIEMT: CajaIEMT })
			.send({ CajaIEImporte: CajaIEImporte })
			.then(function (res) {
				MuestraMensaje(res);
			})
			.catch((err) => MuestraMensaje(err));
	});
}
