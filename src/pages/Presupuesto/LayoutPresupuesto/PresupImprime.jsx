import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import "react-toastify/dist/ReactToastify.css";
// import { PresupPreview } from './PresupPreview'
// Lee Rubro por codigo de gupo
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
	const url1 = IpServidor + "/imppresup";
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
			// datoserroneos = false;
			MuestraMensaje(res);
		})
		.catch((err) => {
			// datoserroneos = true;
			MuestraMensaje(err);
		});
};
