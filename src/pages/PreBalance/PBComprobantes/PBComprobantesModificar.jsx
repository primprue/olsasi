import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function PBComprobantesModificar(props) {
	console.log('modificando ', props);
	const { PBCompDesc, PBCompSumaResta, id } = props;

	const url = IpServidor + "/pbcomprobantesmodificar/?id=" + id;
	request
		.post(url)
		.set("Content-Type", "application/json")
		.send({ PBCompDesc: PBCompDesc })
		// .send({ PBCompAbre: PBCompAbre })
		.send({ PBCompSumaResta: PBCompSumaResta }) // Esto va a ser Cero inicialmente.
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}
