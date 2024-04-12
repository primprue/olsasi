import { useEffect } from "react";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
export default function OTRecRenglon() {
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);

	console.log(
		"otdatos en otdatosOTO  renglonespresup: ",
		otdatos.renglonespresup
	);
	console.log(
		"otdatos en otdatosOTO  renglonespresup[0][0]: ",
		otdatos.renglonespresup[0][0].idPresupRenglon
	);

	// async function initialFetch() {
	// 	//	columnsFetch();
	// 	dataOTO();
	// }
	const informacionPresupRenglonParamInt = [];
	const informacion = [];
	const recorredatos = () => {
		// Recorre el array de datos y extrae la información de los campos deseados
		otdatos.renglonespresup.forEach((nivel1) => {
			nivel1.forEach((nivel2) => {
				const {
					id,
					PresupRenglonNroPresup,
					PresupRenglonImpItem,
					PresupRenglonImpUnit,
					PresupRenglonDesc,
					PresupRenglonParamInt,
				} = nivel2;
				// Aquí puedes hacer lo que quieras con la información extraída, por ejemplo, almacenarla en un nuevo array
				// informacion.push({
				// 	id,
				// 	numeroPresupuesto: PresupRenglonNroPresup,
				// 	cantidad: PresupRenglonCant,
				// 	descripcion: PresupRenglonDesc,
				// });
				if (PresupRenglonParamInt) {
					// Aquí puedes hacer lo que quieras con la información extraída
					informacionPresupRenglonParamInt.push(PresupRenglonParamInt);
				}
			});
		});

		// Devuelve el JSX (en este caso, no estamos mostrando nada)
		return null;
	};
	/*

                renglot1[j] =
                {
                    "ordtrabitem": j + 1,
                    "ordtrabcantidad": datotraido[i].PresupRenglonCant,
                    "ordtrabdescripcion": datotraido[i].PresupRenglonDesc,
                    "materialselec": '',
                    "colorselec": '',
                    "ordtrablargo": datotraido[i].PresupRenglonLargo * 1,
                    "ordtrabancho": datotraido[i].PresupRenglonAncho * 1,
                    "ordtrabimpitemsiva": datotraido[i].PresupRenglonImpUnit * 1 / 1.21,
                    "ordtrabimpitemciva": datotraido[i].PresupRenglonImpUnit * 1,
                    "ordtrabimpsiva": impsiva,
                    "ordtrabimpciva": datotraido[i].PresupRenglonImpItem * 1,
                    "ordtrabmaterial": datoselegidosaux.StkRubroAbr,
                    "ordtrabparametros": datoselegidosaux,
                }
*/
	useEffect(() => {
		recorredatos();
		// setValor("Lista de Precios");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
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
143200
PresupRenglonImpUnit
: 
143200
PresupRenglonLargo
: 
2
PresupRenglonNroPresup
: 
6393
PresupRenglonParamInt
: 
"{\"StkRubroAbr\":\"ST840\",\"minmay\":\"mn\",\"ivasn\":\"CIVA\",\"cantidad\":1,\"veces\":1,\"largo\":\"2\",\"ancho\":\"5\",\"largon\":0,\"anchon\":0,\"tipoconf\":\"cs\",\"tipoojale\":\"hz\",\"drenajesn\":\"cd\",\"detallep\":\"\",\"detaller\":\"\",\"tamfaja\":\"2P\",\"tamcristal\":\"PVC05\",\"altovolado\":20,\"presupojalesc\":20,\"sobrantemarco\":20,\"tipomedeleg\":\"CC\",\"termbordeeleg\":\"SF\",\"anchopared\":0,\"medida\":0,\"alto\":1.1,\"stkrubroabrtbr\":\"\",\"tipomecanismo\":\"Manual\",\"anchocomedero\":\"0.68\",\"lonanuestraafuera\":\"LN\",\"cantbrazos\":0,\"largobrazo\":0,\"voladosd\":\"S\",\"cantHeb\":0,\"cantCarro\":0,\"tipocarro\":\"\",\"tipoheb\":\"\",\"colocacion\":\"\",\"tipoplaca\":\"\",\"cantPlaca\":0,\"tipopresup\":\"CONFECCIONADA\",\"cotdivisa\":0,\"signomonet\":\"$\"}"
id
: 
1
idPresupRenglon
: 
1
	*/
	console.log("estoy en fialuno de orden de ptrabajo  ");
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
							{/* Agrega más campos según tus necesidades */}
						</div>
					))}
				</div>
			))}
		</div>
	);
}
