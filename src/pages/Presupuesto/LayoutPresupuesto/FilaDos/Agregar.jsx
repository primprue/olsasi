const Agregar = async (
	datosrenglon1,
	indicetp1,
	rubrosn,
	PresupCantidadM,
	otramoneda,
	sDescripPresup,
	srenglonanexo,
	dcalculo,
	renglonanexodetalle
) => {
	return new Promise((resolve) => {
		// setTimeout(() => {
		var detalle = dcalculo[0].tipopresup;
		var StkRubroDesc = "";
		var PresupLargo = 0;
		var PresupAncho = 0;
		var ImpUnitario = 0.0;
		var importeanexo = 0.0;
		var ImpItem = 0.0;
		var datoimpunitario = 0.0;


		if (datosrenglon1.length === 1) {
			const array2D = datosrenglon1.map(x => [x]);
			datosrenglon1 = array2D;
		}
		if (rubrosn === "S") {
			var unidmed = "";

			if (datosrenglon1[0][0].StkRubroUM) {
				unidmed = datosrenglon1[0][0].StkRubroUM + " ";
			}

			StkRubroDesc =
				unidmed +
				datosrenglon1[0][0].Detalle;

			if (datosrenglon1[0][0].MDesc === "S") {
				StkRubroDesc =
					StkRubroDesc + " " + sDescripPresup + " " + dcalculo[0].detaller;
			}
			datoimpunitario = datosrenglon1[0][0].ImpUnitario;

			ImpUnitario = Number(
				Math.ceil(datoimpunitario / dcalculo[0].cotdivisa)
			).toFixed(2);
			ImpItem = Number(
				Math.ceil(datoimpunitario / dcalculo[0].cotdivisa) * PresupCantidadM
			).toFixed(2);


			PresupLargo = datosrenglon1[0][0].Largo;
			PresupAncho = datosrenglon1[0][0].Ancho;

			importeanexo = 0;
			// cuando pregunta srenglonanexo.length !== 0, y tiene anexos viene indefinido, por lo tanto ingresa por ser undefined que es distinto de 0
			if (srenglonanexo.length !== 0) {

				importeanexo = srenglonanexo.ImpItemAnexo / dcalculo[0].cotdivisa;
				ImpUnitario = Number(Math.ceil(ImpUnitario * 1 + importeanexo)).toFixed(2);
				ImpItem = Number(Math.ceil(ImpItem * 1 + importeanexo * dcalculo[0].cantidad)).toFixed(2);
				StkRubroDesc = StkRubroDesc + srenglonanexo.StkRubroDesc;

			}

			//acá veo si es paño unido o no porque sino tiene ancho o largo en 0, no es confección

			if (PresupLargo === 0 || PresupAncho === 0) {
				ImpItem = ImpUnitario * 1 * dcalculo[0].veces;
			}


			if (PresupLargo === 0 && PresupAncho === 0) {
				ImpItem = ImpUnitario * PresupCantidadM;
			}

			if (dcalculo[0].tipopresup === "BOLSON PARA TANQUE") {
				ImpItem = ImpUnitario * PresupCantidadM;
			}
		}
		//si no es algo que se necesita rubro
		else {
			//acá entra cuando es unidad
			StkRubroDesc = detalle;
			// ImpUnitario = Number(datosrenglon1[0].ImpUnitario) / Number(dcalculo[0].cotdivisa);
			ImpUnitario = Number(datosrenglon1[0][0].ImpUnitario) / Number(dcalculo[0].cotdivisa);
			ImpItem = ImpUnitario * PresupCantidadM;
			// ImpItem =
			// 	(datosrenglon1[0] / dcalculo[0].cotdivisa) * PresupCantidadM;
		}

		if (dcalculo[0].tipopresup === "MODIFICA MEDIDAS") {
			PresupLargo = "-";
			PresupAncho = "-";
		}
		const ImpUnitarion = ImpUnitario * 1;
		const ImpUnitariofa = ImpUnitarion.toLocaleString("es-AR", {
			style: "currency",
			currency: "ARS",
		});

		let ImpUnitariof = ImpUnitariofa.replace(/ARS/g, dcalculo[0].signomonet)
			.replace(/€|USD|\$/g, "")
			.trim();
		ImpUnitariof = dcalculo[0].signomonet + " " + ImpUnitariof;
		const ImpItemn = ImpItem * 1;
		const ImpItemfa = ImpItemn.toLocaleString("es-AR", {
			style: "currency",
			currency: "ARS",
		});
		let ImpItemf = ImpItemfa.replace(/ARS/g, dcalculo[0].signomonet)
			.replace(/€|USD|\$/g, "")
			.trim();
		ImpItemf = dcalculo[0].signomonet + " " + ImpItemf;
		// dcalculo[0].anexos = (renglonanexodetalle.flat())
		const datosanexos = (renglonanexodetalle.flat())
		var datospresup = [
			{
				id: indicetp1, //agregado porque en tablapresup me exige un indice id
				PresupCantidad: dcalculo[0].cantidad,
				StkRubroDesc,
				PresupLargo,
				PresupAncho,
				ImpUnitario,
				ImpUnitariof,
				ImpItem,
				ImpItemf,
				sDescripPresup,
				dcalculo,
				datosanexos
			},
		];

		resolve(datospresup);
		// }, 500);
	});
};
export default Agregar;
