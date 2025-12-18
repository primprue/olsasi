import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import "react-toastify/dist/ReactToastify.css";
export const PresupImprime = (
	props,
	nomCliente,
	otraCondicion,
	suma,
	nroPresupuesto,
	descrip,
	condpagoeleg,
	PresupMnMy,
	Tlargo,
	Tancho,
	dolaressn
) => {
	console.log('nroPResup PresupImprime ', nroPresupuesto)
	const url1 = IpServidor + "/imppresup";
	console.log('url1  ', url1)
	request
		.post(url1)
		.set("Content-Type", "application/json")
		.send({ datospresup: props })
		.send({ nomCliente: nomCliente })
		.send({ otraCondicion: otraCondicion })
		.send({ suma: suma })
		.send({ nroPresupuesto: nroPresupuesto })
		.send({ descrip: descrip })
		.send({ condpagoeleg: condpagoeleg })
		.send({ PresupMnMy: PresupMnMy })
		.send({ Tlargo: Tlargo })
		.send({ Tancho: Tancho })
		.send({ dolaressn: dolaressn })
		.set("X-API-Key", "foobar")
		.then((res) => {
			MuestraMensaje(res);
		})
		.catch((err) => {
			MuestraMensaje(err);
		});
};
