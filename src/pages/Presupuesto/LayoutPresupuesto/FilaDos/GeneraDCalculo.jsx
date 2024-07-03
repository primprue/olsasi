export const GeneraDCalculo = (props, presuptipo, cotidivisa) => {
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
		};
	}
	let objetoModificado = { ...datosobligatorios };

	if (presuptipo === "CONFECCIONADA") {
		objetoModificado.tipoconf = props.PresupCsSs;
		objetoModificado.tipoojale = props.PresupOB;
	}
	if (presuptipo === "TOLDO ABANICO") {
		objetoModificado.cantbrazos = props.CantBrazos;
		objetoModificado.largobrazo = props.LargoBrazo;
		objetoModificado.voladosd = props.VolDS;
		objetoModificado.altovolado = props.AltoVolado;
		objetoModificado.fajabrazo = props.FajaBrazoEleg;
	}

	if (presuptipo === "ABOLINADA") {
		objetoModificado.tipoojale = props.PresupOB;
		objetoModificado.presupojalesc = props.PresupOjalesC;
	}

	if (presuptipo === "LONAS ENROLLABLES") {
		objetoModificado.tamcristal = props.TamCristal;
		objetoModificado.altovolado = props.AltoVolado;
		objetoModificado.sobrantemarco = props.SobranteMarco;
	}

	if (presuptipo === "CAMBIO PAÑO") {
		objetoModificado.tipoconf = props.PresupCsSs;
		objetoModificado.tipoojale = props.PresupOB;
		objetoModificado.lonanuestraafuera = props.PreuspLNLF;
	}

	if (presuptipo === "COMEDERO") {
		objetoModificado.tipoojale = props.PresupOB;
		objetoModificado.presupojalesc = props.PresupOjalesC;
		objetoModificado.anchocomedero = props.AnchoComederoEleg;
	}

	if (presuptipo === "LATERAL CORREDIZO") {
		objetoModificado.cantHeb = props.CantHeb;
		objetoModificado.tipoheb = props.tipoheb;
		objetoModificado.cantCarro = props.CantCarro;
		objetoModificado.tipocarro = props.tipocarro;
		objetoModificado.cantPlaca = props.CantPlaca;
		objetoModificado.tipoplaca = props.tipoplaca;
		objetoModificado.colocacion = props.colocacion;
	}

	if (presuptipo === "MODIFICA MEDIDAS") {
		objetoModificado.tipoconf = props.PresupCsSs;
		objetoModificado.tipoojale = props.PresupOB;
		objetoModificado.largon = props.PresupLargoN;
		objetoModificado.anchon = props.PresupAnchoN;
		objetoModificado.lonanuestraafuera = props.PreuspLNLF;
	}

	if (presuptipo === "PILETA ENROLLABLE") {
		objetoModificado.drenajesn = props.PresupDrenaje;
		objetoModificado.tipoojale = props.PresupOB;
	}

	if (presuptipo === "BOLSON PARA TANQUE") {
		objetoModificado.tipomedeleg = props.TipoMedidaEleg;
		objetoModificado.termbordeeleg = props.TermBordeEleg;
		objetoModificado.anchopared = props.AnchoPared;
		objetoModificado.medida = props.Medida;
		objetoModificado.alto = props.Alto;
	}

	if (presuptipo === "PILETA CAÑOS ALUMINIO") {
		objetoModificado.drenajesn = props.PresupDrenaje;
		objetoModificado.tipoojale = props.PresupOB;
	}

	if (presuptipo === "TOLDO BARRACUADRA") {
		objetoModificado.tipomecanismo = props.TipoMecanismo;
		objetoModificado.stkrubroabrtbr = props.StkRubroAbrTBR;
		objetoModificado.altovolado = props.AltoVolado;
	}
	return objetoModificado;
};
