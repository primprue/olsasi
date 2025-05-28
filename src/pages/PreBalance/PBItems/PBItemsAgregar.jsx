import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function PBItemsAgregar(props) {

	return new Promise(function () {
		setTimeout(() => {
			const { PBItemsRubro, PBItemsSubRubro, PBItemsFecha,
				PBItemsTipoComp, PBItemsNroComp, PBItemsProv, PBItemsImp,
				PBItemsPorcIVA, PBItemsIVA, PBItemsIIBB, PBItemsOtros, PBItemsOtros1,
				PBItemsOtros2, PBItemsOtros3, PBItemsOtros4 } = props;

			const url = IpServidor + "/pbitemsagregar";
			request
				.post(url)
				.set("Content-Type", "application/json")
				.send({ PBItemsRubro: PBItemsRubro })
				.send({ PBItemsSubRubro: PBItemsSubRubro })
				.send({ PBItemsFecha: PBItemsFecha })
				.send({ PBItemsTipoComp: PBItemsTipoComp })
				.send({ PBItemsNroComp: PBItemsNroComp })
				.send({ PBItemsProv: PBItemsProv })
				.send({ PBItemsImp: PBItemsImp })
				.send({ PBItemsPorcIVA: PBItemsPorcIVA })
				.send({ PBItemsIVA: PBItemsIVA })
				.send({ PBItemsIIBB: PBItemsIIBB })
				.send({ PBItemsOtros: PBItemsOtros })
				.send({ PBItemsOtros1: PBItemsOtros1 })
				.send({ PBItemsOtros2: PBItemsOtros2 })
				.send({ PBItemsOtros3: PBItemsOtros3 })
				.send({ PBItemsOtros4: PBItemsOtros4 })
				.then((res) => {
					MuestraMensaje(res);
				})
				.catch((err) => {
					MuestraMensaje(err);
				});
		}, 300);
	});
}

