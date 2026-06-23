import request from "superagent";
import IpServidor from "../../../../VariablesDeEntorno.js";
import MuestraMensaje from "../../../../../components/lib/MuestraMensaje.js";
// Lee Grupo
export async function MovStockLeeMovEle(StkRubroAbr, StkItemsDesc) {
	const url = IpServidor + "/movstockleemovele?StkRubroAbr=" + StkRubroAbr + "&StkItemsDesc=" + StkItemsDesc;

	try {
		const res = await request
			.get(url)
			.set("Content-Type", "application/json")
			.set("X-API-Key", "foobar")
		const resultadolectura = res.body || JSON.parse(res.text);
		return resultadolectura;
	} catch (err) {
		MuestraMensaje(err);
		throw err; // Es importante lanzar el error para que el llamador lo detecte
	}

}

