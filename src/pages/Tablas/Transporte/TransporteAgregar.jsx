import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function TransporteAgregar(props) {
	return new Promise(function () {
		setTimeout(() => {
			const {
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
			const url = IpServidor + "/transporteagregar";
			request
				.post(url)
				.set("Content-Type", "application/json")
				.send({ transdesc: TransporteDesc })
				.send({ transtel1: TransporteTel1 })
				.send({ transtel2: TransporteTel2 })
				.send({ transwa: TransporteWA })
				.send({ transnromail: TransporteMail })
				.send({ transdom: TransporteDom })
				.send({ transloc: TransporteLoc })
				.send({ transdestino: TransporteDestino })
				.send({ transobser: TransporteObser })
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
