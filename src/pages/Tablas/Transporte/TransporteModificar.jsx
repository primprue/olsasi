import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function TransporteModificar(props) {
	const {
		idTransporte,
		TransporteDesc,
		TransporteTel1,
		TransporteTel2,
		TransporteWA,
		TransporteMail,
		TransporteDom,
		TransporteLoc,
		TransporteDestino,
		TransporteObser,
	} = props;

	const url = IpServidor + "/transportemodificar/" + idTransporte;
	request
		.post(url)
		.set("Content-Type", "application/json")
		.send({ TransporteDesc: TransporteDesc })
		.send({ TransporteTel1: TransporteTel1 })
		.send({ TransporteTel2: TransporteTel2 })
		.send({ TransporteWA: TransporteWA })
		.send({ TransporteMail: TransporteMail })
		.send({ TransporteDom: TransporteDom })
		.send({ TransporteLoc: TransporteLoc })
		.send({ TransporteDestino: TransporteDestino })
		.send({ TransporteObser: TransporteObser })
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}
