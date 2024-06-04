import React from "react";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
const MultilineCell = styled("span")`
	white-space: normal;
	line-height: 1.2;
	max-height: 3.6em; /* Puedes ajustar esta altura según tu necesidad */
	overflow: hidden;
`;
export async function llenarcolumns() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			// { field: "id", headerName: "ID", width: 90 },
			{
				headerName: "ID Presup Renglon",
				field: "idPresupRenglon",
				width: 150,
			},
			{
				headerName: "Nro Presup",
				field: "PresupRenglonNroPresup",
				width: 150,
			},
			{
				headerName: "Cantidad",
				field: "PresupRenglonCant",
				width: 80,
				pattern: /^[0-9]{0,6}.[0-9]{0,2}/,
				align: "right",
				editable: true,
			},
			{
				headerName: "Descripción",
				field: "PresupRenglonDesc",
				width: 400,
				renderCell: (params) => <MultilineCell>{params.value}</MultilineCell>,
				editable: true,
			},
			{
				headerName: "Largo",
				field: "PresupRenglonLargo",
				width: 80,
				pattern: /^[0-9]{0,6}.[0-9]{0,2}/,
				align: "right",
				editable: true,
			},
			{
				headerName: "Ancho",
				field: "PresupRenglonAncho",
				width: 80,
				pattern: /^[0-9]{0,6}.[0-9]{0,2}/,
				align: "right",
				editable: true,
			},
			{
				headerName: "Importe Unitario",
				field: "PresupRenglonImpUnit",
				width: 150,
				placeholder: "99999999,99",
				maxLength: 9,
				xs: 4,
				pattern: /^[0-9]{0,8}.[0-9]{0,2}$/,
				align: "right",
				renderCell: (params) => (
					<span style={{ textAlign: "right" }}>
						{params.value && `$ ${params.value}`}{" "}
						{/* Agrega el signo monetario */}
					</span>
				),
				editable: "never",
			},
			{
				headerName: "Importe Item",
				field: "PresupRenglonImpItem",
				width: 150,
				placeholder: "99999999,99",
				maxLength: 9,
				xs: 4,
				pattern: /^[0-9]{0,8}.[0-9]{0,2}$/,
				align: "right",
				renderCell: (params) => (
					<span style={{ textAlign: "right" }}>
						{params.value && `$ ${params.value}`}{" "}
						{/* Agrega el signo monetario */}
					</span>
				),
				editable: "never",
			},
		]);
		// }, 500);
	});
}
