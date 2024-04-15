import { useEffect } from "react";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
export default function OTRecRenglon() {
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	const [datosppa, setDatosPpa] = useState([]);

	console.log("otdatos.renglonespresup  ", otdatos.renglonespresup);
	return (
		<div>
			{otdatos.renglonespresup.map((nivel1, index1) => (
				<div key={index1}>
					{nivel1.map((nivel2, index2) => (
						<div key={index2}>
							<p>ID: {nivel2.id}</p>
							<p>Número de Presupuesto: {nivel2.PresupRenglonNroPresup}</p>
							<p>Cantidad: {nivel2.PresupRenglonCant}</p>
							<p>Descripción: {nivel2.PresupRenglonDesc}</p>
							<p>Importe Unitario: {nivel2.PresupRenglonImpUnit}</p>
							<p>Importe Item: {nivel2.PresupRenglonImpItem}</p>

							{nivel1.map((item) => {
								const paramObjeto = JSON.parse(item.PresupRenglonParamInt);
								return Object.entries(paramObjeto).map(([campo, valor]) => (
									<li key={campo}>
										<strong>{campo}:</strong> {valor}
									</li>
								));
							})}
						</div>
					))}
				</div>
			))}
		</div>
	);
}

/*
PresupRenglonAncho
: 
5
PresupRenglonCant
: 
1
PresupRenglonDesc
: 
"Lona con ojales reforzados, chicotes y soga en dobladillo en : COB. 840  "
PresupRenglonImpItem
: 
572780
PresupRenglonImpUnit
: 
572780
PresupRenglonLargo
: 
8
PresupRenglonNroPresup
: 
6394
PresupRenglonParamInt
: 
"{\"StkRubroAbr\":\"ST840\",\"minmay\":\"mn\",\"ivasn\":\"CIVA\",\"cantidad\":1,\"detallep\":\"\",\"detaller\":\"\",\"largo\":\"8\",\"ancho\":\"5\",\"tipopresup\":\"CONFECCIONADA\",\"cotdivisa\":0,\"signomonet\":\"$\",\"tipoconf\":\"cs\",\"tipoojale\":\"hz\"}"
id
: 
1
idPresupRenglon
: 
1*/
{
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
}
