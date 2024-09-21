import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";
export function StkUnMedAgregar(props) {
	const { StkUnMedDesc, id } = props;
	console.log(" props StkUnMedAgregar ", props);
	const url = IpServidor + "/stkunmedagregar";
	request
		.post(url)
		.set("Content-Type", "application/json")
		.send({ idStkUnMed: id })
		.send({ StkUnMedDesc: StkUnMedDesc })
		.set("X-API-Key", "foobar")
		.then((res) => {
			MuestraMensaje(res);
		})
		.catch((err) => {
			MuestraMensaje(err);
		});
}
