
import estilotabla from "../../../Styles/Tabla.module.css";
import { ProveedoresValueLeer } from "../../Tablas/Proveedores/ProveedoresValueLeer";
import { PBRubrosValueLeer } from "../PBRubros/PBRubrosValueLeer";
import { PBSubRubrosValueLeer } from "../PBSubRubros/PBSubRubrosValueLeer";
export async function llenarcolumns() {
	const pbrubro = await PBRubrosValueLeer();
	const pbsubrubro = await PBSubRubrosValueLeer();
	console.log('pbsubrubro', pbsubrubro);
	const proveedor = await ProveedoresValueLeer();
	console.log('proveedor', proveedor);
	return columnsFill(pbrubro, pbsubrubro, proveedor);
}

function columnsFill(pbrubro, pbsubrubro, proveedor) {
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
				headerName: "Rubro",
				field: "PBItemsRubro",
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
				headerName: "SubRubros",
				field: "PBItemsSubRubro",
				type: "singleSelect",
				required: true,
				width: 250,
				valueOptions: pbsubrubro,
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
				headerName: "Tipo Comp.",
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
			{
				headerName: "Nro.Comp.",
				field: "PBItemsNroComp",
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
			{
				headerName: "Proveedor",
				field: "PBItemsProv",

				width: 250,
				editable: true,
				readOnly: false,
				autoFocus: true,
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Proveedor",
				field: "PBItemsProv",
				type: "singleSelect",
				required: true,
				width: 250,
				valueOptions: proveedor,
				editable: true,
				readOnly: false,
				autoFocus: true,
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
		]);
	});
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