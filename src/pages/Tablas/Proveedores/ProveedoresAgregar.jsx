import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";
export function stkProveedoresAgregar(props) {
	return new Promise(function () {
		setTimeout(() => {
			const {
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
			const url = IpServidor + "/proveedoresagregar";
			request
				.post(url)
				.set("Content-Type", "application/json")
				.send({ provdesc: ProveedoresDesc })
				.send({ provtipo: ProveedoresTipo })
				.send({ provcuit: ProveedoresCUIT })
				.send({ provcalle: ProveedoresCalle })
				.send({ provnrocalle: ProveedoresNroCalle })
				.send({ provpiso: ProveedoresPiso })
				.send({ provdto: ProveedoresDto })
				.send({ provcodpostal: ProveedoresCodPos })
				.send({ provlocalidad: ProveedoresLoc })
				.send({ provprovincia: ProveedoresPcia })
				.send({ provtelefono: ProveedoresTel })
				.send({ provcontacto: ProveedoresContacto })
				.send({ provmail: ProveedoresMail })
				.send({ provpagweb: ProveedoresWeb })
				.send({ provcodmon: ProveedoresCodMon })

				.then((res) => {
					MuestraMensaje(res);
				})
				.catch((err) => {
					MuestraMensaje(err);
				});
		}, 500);
	});
}
