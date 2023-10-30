import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export function StkRubroAgregar(props) {
	return new Promise(function (resolve) {
		const {
			// idStkRubro,
			StkRubroCodGrp,
			StkRubroDesc,
			StkRubroAbr,
			StkRubroProv,
			StkRubroAncho,
			StkRubroPresDes,
			StkRubroPres,
			StkRubroUM,
			StkRubroCosto,
			StkRubroTM,
			StkRubroConf,
			StkRubroFecha,
			ItemsSN,
		} = props;

		async function codigo() {
			var url = IpServidor + "/stkrubroleeultnro/?id=" + StkRubroCodGrp;
			await request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					const codigorubro = JSON.parse(res.text);
					const rubroNuevo = codigorubro[0].CodRubroNuevo;
					agregarRubro(rubroNuevo);
				});
		}

		async function agregarRubro(rubroNuevo) {
			const url = IpServidor + "/stkrubroagregar/";
			request
				.post(url)
				.set("Content-Type", "application/json") // .send({ idStkRubro: this.state.idStkRubro }) este lo genero en el back-end
				.send({ idStkRubro: rubroNuevo })
				.send({ StkRubroCodGrp: StkRubroCodGrp })
				.send({ StkRubroDesc: StkRubroDesc })
				.send({ StkRubroAbr: StkRubroAbr })
				.send({ StkRubroProv: StkRubroProv })
				.send({ StkRubroAncho: StkRubroAncho })
				.send({ StkRubroPresDes: StkRubroPresDes })
				.send({ StkRubroPres: StkRubroPres })
				.send({ StkRubroUM: StkRubroUM })
				.send({ StkRubroCosto: StkRubroCosto })
				.send({ StkRubroTM: StkRubroTM })
				.send({ StkRubroConf: StkRubroConf })
				.send({ StkRubroFecha: StkRubroFecha })
				.send({ ItemsSN: ItemsSN })
				.then((res) => {
					MuestraMensaje(res);
				})
				.catch((err) => {
					MuestraMensaje(err);
				});
			resolve();
		}
		codigo();
	});
}