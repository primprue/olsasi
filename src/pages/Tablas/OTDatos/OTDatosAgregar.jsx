import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function OTDatosAgregar(props) {
	return new Promise(function () {
		setTimeout(() => {
			const { OTDatosTipoConf, OTDatosDesc, OTDatosOpciones, OTDatosTipoPed, OTDatosRequerido, OTDatosOrdenAparicion, OTDatosAncho } = props;
			const url = IpServidor + "/otdatosagregar";
			request
				.post(url)
				.set("Content-Type", "application/json")
				.send({ OTDatosTipoConf: OTDatosTipoConf })
				// .send({ OTDatosConfCod: OTDatosConfCod })
				.send({ OTDatosDesc: OTDatosDesc })
				.send({ OTDatosOpciones: OTDatosOpciones })
				.send({ OTDatosTipoPed: OTDatosTipoPed })
				.send({ OTDatosRequerido: OTDatosRequerido })
				.send({ OTDatosOrdenAparicion: OTDatosOrdenAparicion })
				.send({ OTDatosAncho: OTDatosAncho })

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
