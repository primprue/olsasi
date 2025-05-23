
import estilotabla from "../../../Styles/Tabla.module.css";
import { PBRubrosValueLeer } from "../PBRubros/PBRubrosValueLeer";
export async function llenarcolumns() {
	const pbrubro = await PBRubrosValueLeer();
	return columnsFill(pbrubro);
}
/*  PBidItems: 0,
  PBItemsRubro: 0,
  PBItemsSubRubro: 0,
  PBItemsFecha: '',
  PBItemsTipoComp: '',
  PBItemsNroComp: 0,
  PBItemsProv: 0,
  PBItemsImp: 0,
  PBItemsPorcIVA: 0,
  PBItemsIVA: 0,
  PBItemsIIBB: 0,
  PBItemsOtros: 0,
  PBItemsOtros1: 0,
  PBItemsOtros2: 0,
  PBItemsOtros3: 0,
  PBItemsOtros4: 0,*/
function columnsFill(pbrubro) {
	return new Promise(function (resolve) {
		resolve([
			// {
			// 	headerName: "SubRubros(ID)",
			// 	field: "id",
			// 	editable: "never",
			// 	required: false,
			// 	order: true,
			// 	headerClassName: "encabcolumns",
			// },
			{
				headerName: "SubRubros(ID)",
				field: "PBidSubRubro",
				editable: false,
				required: false,
				order: true,
				autoFocus: false,

				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Rubro",
				field: "PBItemsSubRubro",
				type: "singleSelect",
				required: true,
				width: 250,
				valueOptions: pbrubro,
				editable: true,
				readOnly: false,
				autoFocus: true,
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Fecha",
				field: "PBItemsFecha",
				//header ClassName: "encabcolumns",
				width: 150,
				align: "right", //alinea el contenido
				headerAlign: "center",
				editable: true,
			},
			{
				headerName: "Tipo Comprobante",
				field: "PBItemsTipoComp",
				order: true,
				width: 20,
				editable: true,
				readOnly: false,
				required: true,
				autoFocus: true,
				maxLength: 20,
				pattern: /^/,
				xs: 8,
				placeholder: "______________________________",
				// alignItems: "left",
				headerClassName: estilotabla.encabcolumns,
			},

		]);
	});
}
