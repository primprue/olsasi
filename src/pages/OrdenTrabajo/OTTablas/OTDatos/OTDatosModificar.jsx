import request from "superagent";
import IpServidor from "../../../VariablesDeEntorno";

import MuestraMensaje from "../../../../components/lib/MuestraMensaje";

export function OTDatosModificar(props) {
	console.log('props  ', props)
	const { idOTDatos,
		OTDatosTipoConf,
		OTDatosDesc,
		OTDatosOpciones,
		OTDatosTipoPed,
		OTDatosRequerido,
		OTDatosOrdenAparicion,
		OTDatosAncho } = props;

	const url = IpServidor + "/otdatosmodificar/?id=" + idOTDatos;
	request
		.post(url)
		.set("Content-Type", "application/json")
		.send({ OTDatosTipoConf: OTDatosTipoConf })
		.send({ OTDatosDesc: OTDatosDesc })
		.send({ OTDatosOpciones: OTDatosOpciones })
		.send({ OTDatosTipoPed: OTDatosTipoPed })
		.send({ OTDatosRequerido: OTDatosRequerido })
		.send({ OTDatosOrdenAparicion: OTDatosOrdenAparicion })
		.send({ OTDatosAncho: OTDatosAncho })
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}
