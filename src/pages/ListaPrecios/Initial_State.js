export const initial_state = {
  

  listaprecios: [],
  stkitems : [],
  itemsleidos : [],
  datositems : [],
  CodGrupo : 0,
  CodRubro : 0,
  columns : [
    {
      label: "Descripción",
      id: "StkRubroDesc",
      tipo:"",
      align: 'left',
      minWidth: 170,
      order: true,
    },
    {
      label: "Precio Púb.",
      id: "PPub",
      format: value =>  value.toFixed(2) ,
      align: 'right',
      minWidth: 100,
      order: true,
    },
    {
      label: "Precio May",
      id: "PMay",
      format: value => value.toFixed(2),
      align: 'right',
      minWidth: 100,
      order: true,
    },
    {
      label: "Paño Unido",
      id: "PMayPU",
      format: value => value.toFixed(2),
      align: 'right',
      minWidth: 100,
      order: true,
    },
    {
      label: "Paño Unido Rec",
      id: "PMayPUR",
      format: value => value.toFixed(2),
      align: 'right',
      minWidth: 100,
      order: true,
    },
    
  ]
};
