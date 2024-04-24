import { useEffect } from "react";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
import { OTLeeEncPresup } from "./OTLeeEncPresup.jsx";
import { clientesleercod } from "../../Tablas/Clientes/ClientesLeerCod.jsx";
import estiloinput from "../../../Styles/Inputs.module.css";
import { isNumber } from "@mui/x-data-grid/internals";
import { TextField } from "@mui/material";
export default function OTRecRenglon() {
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	let esnumerico = false;
	let clientepresup = "";
	// const [datosppa, setDatosPpa] = useState([]);
	// const [datoscliente, setDatosCliente] = useState([]);
	async function datosencab() {
		const encabezamiento = await OTLeeEncPresup(
			otdatos.renglonespresup[0][0].PresupRenglonNroPresup
		);
		setOTdatos({ ...otdatos, datosppa: encabezamiento });
	}
	async function leedatoscliente(clientepresup, esnumerico) {
		if (esnumerico) {
			const result = await clientesleercod(clientepresup);
			setOTdatos({ ...otdatos, datoscliente: result });
		} else {
			setOTdatos({
				...otdatos,
				datoscliente: clientepresup,
			});
		}
	}
	//  && !otdatos.datoscliente
	useEffect(() => {
		if (!otdatos.datosppa) datosencab();

		if (otdatos.datosppa) {
			console.log(
				"otdatos.datosppa[0].PresupEncabCliente  ",
				otdatos.datosppa[0].PresupEncabCliente
			);
			clientepresup = parseFloat(otdatos.datosppa[0].PresupEncabCliente); // o parseInt(value, 10) si esperas un número entero
			const isNumeric = !isNaN(clientepresup) && isFinite(clientepresup);
			if (isNumeric) {
				esnumerico = true;
			} else {
				clientepresup = otdatos.datosppa[0].PresupEncabCliente;
				esnumerico = false;
			}
			leedatoscliente(clientepresup, esnumerico);
		}
	}, [otdatos.datosppa]); // eslint-disable-line react-hooks/exhaustive-deps

	// <p>Cliente : {datosppa}</p>;
	{
		/* <p>Cliente : {datosppa[0].PresupEncabCliente}</p> */
	}
	// if (otdatos.datosppa.length > 0) {

	if (otdatos.datosppa) {
		return (
			<>
				{/* <div className="form-container">
					{inputs.map((input, index) => (
						<input
							key={index}
							type="text"
							placeholder={`Campo ${index + 1}`}
							value={input.value}
							onChange={(e) => input.onChange(e.target.value)}
						/>
					))}
				</div> */}
				<div className={estiloinput.formcontainer}>
					<table>
						<p>
							Número de Presupuesto:{" "}
							{otdatos.datosppa[0].PresupRenglonNroPresup}
						</p>

						{otdatos.renglonespresup.map((nivel1, index1) => (
							<div key={index1}>
								{nivel1.map((nivel2) => (
									<div key={nivel2.id}>
										<tbody>
											<th> {nivel2.id}</th>
											<th> {nivel2.PresupRenglonCant}</th>
											<th> {nivel2.PresupRenglonDesc}</th>
											<th> {nivel2.PresupRenglonImpUnit}</th>
											<th>{nivel2.PresupRenglonImpItem}</th>
										</tbody>
										{nivel1.map((item) => {
											const paramObjeto = JSON.parse(
												item.PresupRenglonParamInt
											);
											return Object.entries(paramObjeto).map(
												([campo, valor]) => (
													<li key={campo}>
														<strong>{campo}:</strong> {valor}
													</li>
												)
											);
										})}
									</div>
								))}
							</div>
						))}
					</table>
				</div>
			</>
		);
	} else {
		return "";
	}
}

/*<div className={estilotabla.tablecontainer}>
					{console.log("datoscliente  ", otdatos.datoscliente)}
					<p>
						Número de Presupuesto: {otdatos.datosppa[0].PresupRenglonNroPresup}
					</p>
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Cantidad</th>
								<th>Descripción</th>
								<th>Importe Unitario</th>
								<th>Importe Item</th>
							</tr>
						</thead>
						{otdatos.renglonespresup.map((nivel1, index1) => (
							<div key={index1}>
								{nivel1.map((nivel2) => (
									<div key={nivel2.id}>
										<tbody>
											<th> {nivel2.id}</th>
											<th> {nivel2.PresupRenglonCant}</th>
											<th> {nivel2.PresupRenglonDesc}</th>
											<th> {nivel2.PresupRenglonImpUnit}</th>
											<th>{nivel2.PresupRenglonImpItem}</th>
										</tbody>
										{nivel1.map((item) => {
											const paramObjeto = JSON.parse(
												item.PresupRenglonParamInt
											);
											return Object.entries(paramObjeto).map(
												([campo, valor]) => (
													<li key={campo}>
														<strong>{campo}:</strong> {valor}
													</li>
												)
											);
										})}
									</div>
								))}
							</div>
						))}
					</table>
				</div> */
/* {otdatos.renglonespresup.map((renglon, index) => (
	<div key={index}>
		<h3>Renglón {index + 1}:</h3>
		{renglon.map((item) => {
			const paramObjeto = JSON.parse(item.PresupRenglonParamInt);
			return Object.entries(paramObjeto).map(([campo, valor]) => (
				<ul>
					<li key={campo}>
						<strong>{campo}:</strong> {valor}
					</li>
				</ul>
			));
		})}
	</div>
))} */
