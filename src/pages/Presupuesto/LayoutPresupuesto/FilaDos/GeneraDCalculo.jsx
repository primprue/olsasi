export const GeneraDCalculo = (props, presuptipo, cotidivisa) => {

	var faltadato = false
	if (props.PresupMnMy === '') faltadato = true
	if (props.PresupIVA === '') faltadato = true
	if (props.PresupCantidad === 0) faltadato = true
	if (props.StkRubroAbr === '') faltadato = true
	// if (props.PresupProducto === 'PE') { if (props.StkRubroAbr === '') faltadato = false }
	// if (props.PresupMnMy === 'my') { if (props.PresupIVA === '') faltadato = false }
	let datosobligatorios = {
		StkRubroAbr: props.StkRubroAbr,
		minmay: props.PresupMnMy,
		ivasn: props.PresupIVA,
		cantidad: props.PresupCantidad,
		detallep: props.DetallePresup,
		detaller: props.DetalleRenglon,
		largo: props.PresupLargo,
		ancho: props.PresupAncho,
		tipopresup: presuptipo,
		cotdivisa: cotidivisa,
		signomonet: props.signomoneda,
		faltadato: faltadato,
	};
	if (presuptipo === "CARGA DESCRIPCION") {

		datosobligatorios = {
			StkRubroAbr: props.StkRubroAbr,
			minmay: props.PresupMnMy,
			ivasn: props.PresupIVA,
			cantidad: props.PresupCantidad,
			detallep: props.DetallePresup,
			detaller: props.DetalleRenglon,
			largo: 0,
			importe: props.PresupLargo,
			ancho: props.PresupAncho,
			tipopresup: presuptipo,
			cotdivisa: cotidivisa,
			signomonet: props.signomoneda,
			faltadato: faltadato,
		};
	}
	let objetoModificado = { ...datosobligatorios };

	if (presuptipo === "CONFECCIONADA") {
		if (props.PresupCsSs === '') faltadato = true
		if (props.PresupOB === '') faltadato = true
		if (props.PresupAncho === 0) faltadato = true
		if (props.PresupLargo === 0) faltadato = true
		objetoModificado.tipoconf = props.PresupCsSs;
		objetoModificado.tipoojale = props.PresupOB;
		objetoModificado.faltadato = faltadato;

	}
	if (presuptipo === "TOLDO ABANICO") {
		if (props.CantBrazos === '') faltadato = true
		if (props.LargoBrazo === 0) faltadato = true
		objetoModificado.cantbrazos = props.CantBrazos;
		objetoModificado.largobrazo = props.LargoBrazo;
		objetoModificado.voladosd = props.VolDS;
		objetoModificado.altovolado = props.AltoVolado;
		objetoModificado.fajabrazo = props.FajaBrazoEleg;
		objetoModificado.faltadato = faltadato;
	}

	if (presuptipo === "ABOLINADA") {
		if (props.PresupOjalesC === '') faltadato = true
		if (props.PresupAncho === 0) faltadato = true
		if (props.PresupLargo === 0) faltadato = true

		objetoModificado.tipoojale = props.PresupOB;
		objetoModificado.presupojalesc = props.PresupOjalesC;
		objetoModificado.faltadato = faltadato;
	}

	if (presuptipo === "LONAS ENROLLABLES") {
		if (props.TamCristal === '') faltadato = true
		if (props.AltoVolado === '') faltadato = true
		if (props.SobranteMarco === '') faltadato = true
		if (props.PresupAncho === 0) faltadato = true
		if (props.PresupLargo === 0) faltadato = true

		objetoModificado.tamcristal = props.TamCristal;
		objetoModificado.altovolado = props.AltoVolado;
		objetoModificado.sobrantemarco = props.SobranteMarco;
		objetoModificado.faltadato = faltadato;
	}

	if (presuptipo === "CAMBIO PAÑO") {
		objetoModificado.tipoconf = props.PresupCsSs;
		objetoModificado.tipoojale = props.PresupOB;
		objetoModificado.lonanuestraafuera = props.PreuspLNLF;

	}

	if (presuptipo === "COMEDERO") {

		if (props.AnchoComederoEleg === '0.00') {
			faltadato = true
		}
		if (props.PresupLargo === 0) faltadato = true

		objetoModificado.tipoojale = props.PresupOB;
		objetoModificado.presupojalesc = props.PresupOjalesC;
		objetoModificado.anchocomedero = props.AnchoComederoEleg;
		objetoModificado.faltadato = faltadato;
	}

	if (presuptipo === "LATERAL CORREDIZO") {
		if (props.CantHeb === 0) faltadato = true
		if (props.tipoheb === '') faltadato = true
		if (props.CantCarro === 0) faltadato = true
		if (props.tipocarro === '') faltadato = true
		if (props.CantPlaca === 0) faltadato = true
		if (props.tipoplaca === '') faltadato = true
		if (props.colocacion === '') faltadato = true
		if (props.PresupAncho === 0) faltadato = true
		if (props.PresupLargo === 0) faltadato = true

		objetoModificado.cantHeb = props.CantHeb;
		objetoModificado.tipoheb = props.tipoheb;
		objetoModificado.cantCarro = props.CantCarro;
		objetoModificado.tipocarro = props.tipocarro;
		objetoModificado.cantPlaca = props.CantPlaca;
		objetoModificado.tipoplaca = props.tipoplaca;
		objetoModificado.colocacion = props.colocacion;
		objetoModificado.faltadato = faltadato;
	}

	if (presuptipo === "MODIFICA MEDIDAS") {
		if (props.PresupLargoN === 0) faltadato = true
		if (props.PresupAnchoN === 0) faltadato = true
		if (props.PresupAncho === 0) faltadato = true
		if (props.PresupLargo === 0) faltadato = true

		objetoModificado.tipoconf = props.PresupCsSs;
		objetoModificado.tipoojale = props.PresupOB;
		objetoModificado.largon = props.PresupLargoN;
		objetoModificado.anchon = props.PresupAnchoN;
		objetoModificado.lonanuestraafuera = props.PreuspLNLF;
		objetoModificado.faltadato = faltadato;
	}

	if (presuptipo === "PILETA ENROLLABLE") {
		if (props.PresupAncho === 0) faltadato = true
		if (props.PresupLargo === 0) faltadato = true

		objetoModificado.drenajesn = props.PresupDrenaje;
		objetoModificado.tipoojale = props.PresupOB;
		objetoModificado.faltadato = faltadato;
	}

	if (presuptipo === "BOLSON PARA TANQUE") {
		if (props.anchopared === 0) faltadato = true
		if (props.medida === 0) faltadato = true
		if (props.alto === 0) faltadato = true

		objetoModificado.tipomedeleg = props.TipoMedidaEleg;
		objetoModificado.termbordeeleg = props.TermBordeEleg;
		objetoModificado.anchopared = props.AnchoPared;
		objetoModificado.medida = props.Medida;
		objetoModificado.alto = props.Alto;
		objetoModificado.faltadato = faltadato;
	}

	if (presuptipo === "PILETA CAÑOS ALUMINIO") {
		if (props.PresupAncho === 0) faltadato = true
		if (props.PresupLargo === 0) faltadato = true

		objetoModificado.drenajesn = props.PresupDrenaje;
		objetoModificado.tipoojale = props.PresupOB;
		objetoModificado.faltadato = faltadato;
	}

	if (presuptipo === "TOLDO BARRACUADRA") {
		objetoModificado.tipomecanismo = props.TipoMecanismo;
		objetoModificado.stkrubroabrtbr = props.StkRubroAbrTBR;
		objetoModificado.altovolado = props.AltoVolado;
	}

	if (presuptipo === "PAÑO UNIDO") {
		objetoModificado.veces = props.PresupVeces;
	}
	if (presuptipo === "PAÑO UNI. RECORTADO") {
		objetoModificado.veces = 1;
	}
	return objetoModificado;
};
