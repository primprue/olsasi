import React from "react";
import {
	Input,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
const columns1 = [
	// { id: "id", label: "ID" },
	// { id: "PresupRenglonNroPresup", label: "Nro. Presupuesto" },
	{ id: "detalle", label: "varios" },
];
const columns = [
	// { id: "id", label: "ID" },
	// { id: "PresupRenglonNroPresup", label: "Nro. Presupuesto" },
	{ id: "PresupRenglonCant", label: "Cantidad" },
	{ id: "PresupRenglonDesc", label: "Descripción" },
	{ id: "PresupRenglonLargo", label: "Largo" },
	{ id: "PresupRenglonAncho", label: "Ancho" },
	// { id: "PresupRenglonImpUnit", label: "Importe Unitario" },
	{ id: "PresupRenglonImpItem", label: "Importe Total" },
	// Agregar más columnas según sea necesario
];

export function TablaDinamica({ arregloDef }) {
	console.log("arre  ", arregloDef);
	const renderRows = (arregloDef) => {
		return arregloDef.map((row) => (
			<TableRow key={row.id}>
				{row.id === undefined &&
					Object.entries(row).forEach(([key, value]) => {
						<TableRow>
							<TableBody>
								<TableCell align="right">Calories</TableCell>
								<TableCell align="right">Fat&nbsp;(g)</TableCell>
								{/* <TableCell key={columns1.id}>{value.ColorMaterial}</TableCell>; */}
								{/* <TableCell key={value.idrenglon}>
									{"value.ColorMaterial"}
								</TableCell> */}
								;
							</TableBody>
						</TableRow>;
						console.log(value);
						console.log(key);
					})}

				{columns.map((column) => (
					<TableCell key={column.id}>{row[column.id]}</TableCell>
				))}
			</TableRow>
		));
	};
	console.log("renderRows  ", renderRows(arregloDef));
	return (
		<>
			<Table>
				<TableHead>
					<TableRow>
						{columns.map((column) => (
							<TableCell key={column.id}>{column.label}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>{renderRows(arregloDef)}</TableBody>
			</Table>
		</>
	);
}
