import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function CajaInternaModificar(props) {
	const { id, CajaInternaFecha, CajaInternaConcepto, CajaInternaMoneda, CajaInternaES, CajaInternaMT, CajaInternaImporte } = props;


	const url = IpServidor + "/cajainternamodificar/?id=" + id;
	request
		.post(url)
		.set("Content-Type", "application/json")
		.send({ CajaInternaFecha: CajaInternaFecha })
		.send({ CajaInternaConcepto: CajaInternaConcepto })
		.send({ CajaInternaMoneda: CajaInternaMoneda })
		.send({ CajaInternaES: CajaInternaES })
		.send({ CajaInternaMT: CajaInternaMT })
		.send({ CajaInternaImporte: CajaInternaImporte })
		.set("X-API-Key", "foobar")
		.then((res) => {
			MuestraMensaje(res);
		})
		.catch((err) => {
			MuestraMensaje(err);
		});
}

