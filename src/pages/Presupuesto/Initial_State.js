export const initial_state = {
  //Funcions agregaStock BEGIN ***//

  //FilaUno
  PresupMnMy: "mn",
  PresupIVA: "CIVA",
  PresupProducto: "PAE",
  // PresupTipo: "UNIDAD",
  //FilaDos
  dolaressn: false, //
  cotdiv: 0.00,
  //FilaAbolinada
  PresupOjalesC: 20,

  //FilaConf
  PresupCsSs: "cs",
  // Presup Ojal de Bronce
  PresupOB: 'hz',
  PresupDrenaje: 'cd',
  //FilaEnrollables
  TamFaja: '2P',
  TamCristal: 'PVC05',
  //FilaEnrollables - abanico -  Brazos extensibles
  AltoVolado: 20,
  SobranteMarco: 20,
  //cambio PAño
  PreuspLNLF: "LN",
  //Brazos extensibles
  TipoMecanismo: 'Manual',
  TamToldoEleg: '',
  //Abanico
  CantBrazos: 0,
  LargoBrazo: 0,
  VolDS: 'S',
  FajaBrazo: [
    {
      value: 20,
      label: '20 x 20'
    },
    {
      value: 25,
      label: '25 x 25'
    },
    {
      value: 30,
      label: '30 x 30'
    },
    {
      value: 40,
      label: '30 x 40'
    }
  ],
  //FilaTanques
  TipoMedidaEleg: 'CC',
  // ParedSN: 'SP',
  TermBordeEleg: 'SF',
  AnchoPared: 0,
  Medida: 0,
  Alto: 1.10,
  TipoMedida: [
    {
      value: 'CC',
      label: 'Chapas'
    },
    {
      value: 'DI',
      label: 'Diámetro Interno'
    },
    {
      value: 'DE',
      label: 'Diámetro Externo'
    },
    {
      value: 'PE',
      label: 'Perímetro Externo'
    }
  ],
  TermBorde: [
    {
      value: 'SF',
      label: 'Sin Forma'
    },
    {
      value: 'CF',
      label: 'Con Forma'
    },
    {
      value: 'CFS',
      label: 'Con Forma y Soga'
    },
    {
      value: 'CFC',
      label: 'Con Forma y Criquet'
    }
  ],

  AnchoComederoEleg: '0.68',
  AnchoComedero: [
    {
      value: '0.42',
      label: 'Ancho 0.42'
    },
    {
      value: '0.68',
      label: 'Ancho 0.68'
    },
    {
      value: '0.90',
      label: 'Ancho 0.90'
    },
    {
      value: '1.2',
      label: 'Ancho 1.2'
    }
  ],
  //FilaDos
  AnexoMedida: 0,
  PresupCantidad: 1.0,
  PresupVeces: 1.0,
  PresupTipo: "",
  // DescripPresup: "",
  ImporteAnexo: 0.0,
  renglonanexo: [],
  DetalleAnexo: "",
  stkrubro: [],
  stkrubrotbr: [],
  clientes: [],
  PresupLargo: 0.0,
  PresupAncho: 0.0,
  PresupLargoN: 0.0,
  PresupAnchoN: 0.0,
  AnexoLargo: 0.0,
  StkRubroAbr: "",
  StkRubroAbrTBR: "",
  idClientes: 0,
  PresupConfTipoDesc: "",
  LabelMed: "",
  DatosPresupEleg: [],
  tipoanexo: [],
  renglonfinal: [],
  tipopresup: [],
  indexborrado: 1000,
  DetallePresup: '',
  DetalleRenglon: '',
  ExplicaPresup: '',
  ClientesDesc: '',
  //FilaTres
  dcalculoppresup: [],
  //condiciones de pago
  condpagoeleg: [],

  //FilaDos
  labellargo: 'Largo',
  labelancho: 'Ancho',
  labellargoN: 'Largo Nuevo',
  labelanchoN: 'Ancho Nuevo',
  columns: [
    {
      headerName: "Cant.",
      field: "PresupCantidad",
      width: 10,
      headerAlign: 'center',
    },
    {
      headerName: "Descripción",
      field: "StkRubroDesc",
      // maxLength: 500,
      width: 700,
      headerAlign: 'center',
      showCellVerticalBorder: true,

    },
    {
      headerName: "Largo",
      field: "PresupLargo",
      width: 150,
      headerAlign: 'center',
    },
    {
      headerName: "Ancho",
      field: "PresupAncho",
      width: 150,
      headerAlign: 'center',
    },
    {
      headerName: "Imp. Unit.",
      field: "ImpUnitario",
      type: "number",
      pattern: /^[0-9]{0,10}.[0-9]{0,2}$/,
      alignItems: "right",
      width: 220,
      headerAlign: 'center',
    },
    {
      headerName: "Imp. Item.",
      field: "ImpItem",
      type: "number",
      // format: (field) => field.valor.toLocaleString('USD'),
      pattern: /^[0-9]{0,10}.[0-9]{0,2}$/,
      alignItems: "right",
      width: 220,
      headerAlign: 'center',
    },
    {
      headerName: "datospresup",
      field: "datoscalculos",
      hideable: false,

    },

  ],


  idStkGrupo: "",
  idStkRubro: "",
  idStkItems: "",
  cantidad: 1.0,
  // StkRubroPres: null,

  disponibilidad: 0,
  //Funcions agregaStock END ***//

  stkgrupo: [],

  stkitems: [],

  stkrubrocr: [],


  //F2C2
  stkitemsele: [],

  //FilaTres
  StkItemsFAct: "",
  StkRubroPres: "",
  StkRubroPresDes: "",
  StkRubroUM: "",
  StkRubroAncho: 0,

  //FilaCuatro
  nomCliente: "",
  // telCliente: "",
  otraCondicion: "",
  NroPresupuesto: 0,
  //Lateral Corredizo
  CantHeb: 0,
  CantCarro: 0,
  CantPlaca: 0,
  tipocarro: '',
  tipoplaca: '',
  tipoheb: '',
  colocacion: '',
  stkrubrolat: [],
  StkRubroAbrLAT: '',

  indicetp: 0,

};
