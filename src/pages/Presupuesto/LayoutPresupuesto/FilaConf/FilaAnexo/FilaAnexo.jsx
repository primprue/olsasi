import React, { useEffect, useState } from "react";

import MaterialTable from "material-table";
import { tableIcons } from "../../../../../../lib/material-table/tableIcons";
import { localization } from "../../../../../../lib/material-table/localization";
import { presupcalculador } from "../../../PresupCalculador";
import { filaanexosColumns } from "./filaanexosColumns";
// import filaanexosData from "./filaanexosData";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { Grid, Dialog, DialogTitle } from "@material-ui/core";
import { red, teal } from "@material-ui/core/colors";
// Context
import { useContext } from "react";
import { PresupPantContext } from "../../../PresupPant";

export default function FilaAnexo(props) {
	const { state, setState } = useContext(PresupPantContext);
	const [columns, setColumns] = useState([]);
	// const [data, setData] = useState([]);
	const [datosanexo, setDatosAnexo] = useState([]);
	const [sumaanexo, setSumaAnexo] = React.useState(0.0);
	// const [detalle, setDetalle] = useState('')

	async function columnsFetch() {
		const col = await filaanexosColumns();
		setColumns(() => col);
	}

	var dcalculo = [
		{
			StkRubroAbr: state.StkRubroAbr,
			minmay: state.PresupMnMy,
			cantidad: state.PresupCantidad,
			largo: state.PresupLargo,
			ancho: state.PresupAncho,
			tipoconf: state.PresupCsSs,
			tipoojale: state.PresupOB,
			ivasn: state.PresupIVA,
		},
	];
	function sumar() {
		var nombre = "";
		var importetotal = 0.0;
		var i = 0;
		while (i < datosanexo.length) {
			importetotal = importetotal + datosanexo[i].importea;
			if (datosanexo[i].PresupConfTipoImprime === "S") {
				nombre =
					nombre +
					" c/" +
					datosanexo[i].AnexoMedida +
					" " +
					datosanexo[i].PresupConfTipoDesc;
			}
			i++;
		}
		setSumaAnexo(importetotal);

		var datospresup = [
			{
				StkRubroDesc: nombre,
				ImpItemAnexo: importetotal,
			},
		];
		setState({ ...state, renglonanexo: datospresup[0] });
		cierraanexos();

		console.log(
			"state.renglonanexo.length FilaAnexo  ",
			state.renglonanexo.length
		);
	}

	function cierraanexos() {
		props.setOpen({ anexos: false });
	}
	function cierraanexos1() {
		setState({ ...state, renglonanexo: [] });
		props.setOpen({ anexos: false });
	}

	async function initialFetch() {
		columnsFetch();
		//   dataFetch();
	}

	useEffect(() => {
		initialFetch();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<Dialog
				open={props.open}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle>Anexos</DialogTitle>
				<Grid container item xs={6}>
					<MaterialTable
						localization={localization}
						style={props.style}
						title={
							<CurrencyTextField
								label={
									<tableIcons.AddShoppingCart
										style={{ color: teal[500] }}
										onClick={() => sumar()}
									/>
								}
								//label='Suma Total'
								color="#FF0000"
								value={sumaanexo}
							>
								{" "}
							</CurrencyTextField>
						}
						icons={tableIcons}
						columns={columns}
						data={datosanexo}
						options={{
							search: false,
							addRowPosition: "first",
							actionsColumnIndex: -1,
							pagesize: 2,
						}}
						actions={[
							{
								icon: () => <tableIcons.Cancel style={{ color: red[500] }} />,
								tooltip: "Cerrar",
								isFreeAction: true,
								onClick: () => cierraanexos1(),
							},
						]}
						editable={{
							onRowAdd: (newData) =>
								new Promise((resolve) => {
									setTimeout(() => {
										var datoscalculos = JSON.stringify(dcalculo);
										var datosrenglon1 = presupcalculador(
											// "", "",
											"",
											datoscalculos,
											newData.PresupConfTipoDesc
										);

										Promise.resolve(datosrenglon1).then((jsonResults) => {
											newData.importea = jsonResults[0] * newData.AnexoMedida;
											newData.PresupConfTipoImprime = jsonResults[1];
											//   newData.importea = jsonResults * newData.AnexoMedida
											setDatosAnexo([...datosanexo, newData]);
										});
										resolve();
									}, 1000);
								}),

							onRowUpdate: (newData, oldData) =>
								new Promise((resolve) => {
									setTimeout(() => {
										const dataUpdate = [...datosanexo];
										var datoscalculos = JSON.stringify(dcalculo);
										var datosrenglon1 = presupcalculador(
											// "", "",
											"",
											datoscalculos,
											newData.PresupConfTipoDesc
										);
										Promise.resolve(datosrenglon1).then((jsonResults) => {
											//   newData.importea = jsonResults[0].ImpUnitario * newData.AnexoMedida
											// newData.importea = jsonResults * newData.AnexoMedida
											newData.importea = jsonResults[0] * newData.AnexoMedida;
											newData.PresupConfTipoImprime = jsonResults[1];
											const index = oldData.tableData.id;
											dataUpdate[index] = newData;

											setDatosAnexo([...dataUpdate]);
										});
										resolve();
									}, 1000);
								}),

							onRowDelete: (oldData) =>
								new Promise((resolve) => {
									setTimeout(() => {
										const dataDelete = [...datosanexo];
										const index = oldData.tableData.id;
										dataDelete.splice(index, 1);
										setDatosAnexo([...dataDelete]);

										resolve();
									}, 1000);
								}),
						}}
					/>
				</Grid>
			</Dialog>
		</>
	);
}
