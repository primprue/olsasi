import React, { useEffect, useState } from "react";
import "../../../../Styles/TableHeader.css";
import MaterialTable from "material-table";
import { tableIcons } from "../../../lib/material-table/tableIcons";
import { llenarColumns } from "./columns";
import { leerClientes } from "./ClientesLeer";
import { clientestraeNuevos } from "./ClientesTraeNuevos";
// import { clientesagregaFac } from "./ClientesAgregaFac";
import { onRowUpdate } from "./onRowUpdate";
import { onRowDelete } from "./onRowDelete";
import { localization } from "../../../lib/material-table/localization";
import Imprimir from "../Impresion/Imprimir/Imprimir";
import { teal } from "@material-ui/core/colors";

import { useContext } from "react";
import { globalContext } from "../../../App";

export default function Clientes() {
	const { setValor } = useContext(globalContext);
	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);
	const [imprimirTF, setImprimirTF] = useState({ imprimir: false });

	async function columnsFetch() {
		const col = await llenarColumns();
		setColumns(() => col);
	}

	async function dataFetch() {
		const data = await leerClientes();
		setData(data);
	}

	async function initialFetch() {
		columnsFetch();
		dataFetch();
	}

	async function traenuevo() {
		const result = await clientestraeNuevos();
		// const result1 = await clientesagregaFac();
		console.log("result de trae  ", result);
		// console.log('result1 de trae  ', result1)
	}
	useEffect(() => {
		initialFetch();
		setValor("Clientes");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div>
			<MaterialTable
				actions={[
					{
						icon: () => <tableIcons.Print />,
						tooltip: "Imprimir",
						isFreeAction: true,
						onClick: () => setImprimirTF({ imprimir: true }),
					},
					{
						icon: () => <tableIcons.GroupAdd style={{ color: teal[500] }} />,
						tooltip: "Agrega Clientes",
						isFreeAction: true,
						onClick: () => traenuevo(),
					},
				]}
				title="CLIENTES"
				localization={localization}
				icons={tableIcons}
				columns={columns}
				data={data}
				options={{
					exportAllData: true,
					exportButton: true,
					grouping: true,
					addRowPosition: "first",
					actionsColumnIndex: -1,
					tableLayout: "fixed",
					// tableLayout: "fixed", //con esta opcion entran todas las columnas en la pantalla pero superpone informacion
				}}
				editable={{
					// onRowAdd: newData =>
					//   onRowAdd(newData).then(() => dataFetch()),
					onRowUpdate: (newData, oldData) =>
						onRowUpdate(newData, oldData).then(() => dataFetch()),
					onRowDelete: (oldData) =>
						onRowDelete(oldData).then(() => dataFetch()),
				}}
			/>
			<Imprimir
				columns={columns}
				datos={data}
				open={imprimirTF.imprimir}
				setOpen={setImprimirTF}
			/>
		</div>
	);
}
