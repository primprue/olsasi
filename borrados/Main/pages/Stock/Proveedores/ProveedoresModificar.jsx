import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import MuestraMensaje from "../../../../lib/MuestraMensaje";

export function ProveedoresModificar(props) {
	return new Promise(function () {
		const {
			id,
			ProveedoresDesc,
			ProveedoresTipo,
			ProveedoresCUIT,
			ProveedoresCalle,
			ProveedoresNroCalle,
			ProveedoresPiso,
			ProveedoresDto,
			ProveedoresCodPos,
			ProveedoresLoc,
			ProveedoresPcia,
			ProveedoresTel,
			ProveedoresContacto,
			ProveedoresMail,
			ProveedoresWeb,
			ProveedoresCodMon,
		} = props;
		const url = IpServidor + "/proveedoresmodificar/" + id;

		request
			.post(url)
			.set("Content-Type", "application/json")
			.send({ ProveedoresDesc: ProveedoresDesc })
			.send({ ProveedoresTipo: ProveedoresTipo })
			.send({ ProveedoresCUIT: ProveedoresCUIT })
			.send({ ProveedoresCalle: ProveedoresCalle })
			.send({ ProveedoresNroCalle: ProveedoresNroCalle })
			.send({ ProveedoresPiso: ProveedoresPiso })
			.send({ ProveedoresDto: ProveedoresDto })
			.send({ ProveedoresCodPos: ProveedoresCodPos })
			.send({ ProveedoresLoc: ProveedoresLoc })
			.send({ ProveedoresPcia: ProveedoresPcia })
			.send({ ProveedoresTel: ProveedoresTel })
			.send({ ProveedoresContacto: ProveedoresContacto })
			.send({ ProveedoresMail: ProveedoresMail })
			.send({ ProveedoresWeb: ProveedoresWeb })
			.send({ ProveedoresCodMon: ProveedoresCodMon })

			//.set("X-API-Key", "foobar")
			.then(function (res) {
				MuestraMensaje(res);
				// res.body, res.headers, res.status
			})
			.catch((err) => MuestraMensaje(err));
	});
}
