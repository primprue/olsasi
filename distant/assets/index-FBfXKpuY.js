import{a,T as c,S as f,R as h,j as s}from"./index-r_yxv9AL.js";import{T as C,P as b}from"./TablaMuestra-Of9vopW1.js";import{l as T}from"./leeStkRubro-92-6WEst.js";import{e}from"./esES-o6LdUFzd.js";import"./ClientesLeer-J_VJC4ey.js";import"./PresupDetPieLee-4Y-VDx8h.js";import"./StkGrupoLee-dUMQdOe9.js";import"./GridToolbarFilterButton-3Qg5vE7b.js";import"./DataGrid-_mhzC7gF.js";import"./TextField-KyvZr_kk.js";import"./Checkbox-C-VidIdO.js";import"./SelecCampos-gf-pdEJA.js";async function x(){const r=await T();return P(r)}function P(r){return new Promise(function(o){o([{headerName:"Descripción",field:"PresupConfTipoDesc",order:!0,width:200,editable:!0,required:!0,maxLength:100,pattern:/^/,xs:8,placeholder:"__________________________________________________________",headerClassName:e.encabcolumns},{headerName:"Rubro Abr",field:"PresupConfTipoRubro",type:"singleSelect",valueOptions:r,order:!0,width:200,editable:!0,headerClassName:e.encabcolumns},{headerName:"Cantidad",field:"PresupConfTipoCant",order:!1,width:150,type:"number",editable:!0,required:!1,maxLength:5,pattern:/^/,xs:8,placeholder:"______",headerClassName:e.encabcolumns},{headerName:"Es m2 S/N",field:"PresupConfTipoM2",order:!0,width:150,editable:!0,required:!0,maxLength:1,pattern:/^/,xs:8,placeholder:"____",headerClassName:e.encabcolumns},{headerName:"Es Anexo?",field:"PresupConfTipoAnexo",order:!0,width:150,editable:!0,required:!0,maxLength:1,pattern:/^/,xs:8,placeholder:"____",headerClassName:e.encabcolumns},{headerName:"Pide Largo?",field:"PresupConfTipoLargo",order:!0,width:150,editable:!0,required:!0,maxLength:1,pattern:/^/,xs:8,placeholder:"____",headerClassName:e.encabcolumns},{headerName:"Pide Ancho?",field:"PresupConfTipoAncho",order:!0,width:150,editable:!0,required:!0,maxLength:1,pattern:/^/,xs:8,placeholder:"____",headerClassName:e.encabcolumns},{headerName:"Imprime?",field:"PresupConfTipoImprime",order:!0,width:150,editable:!0,required:!0,maxLength:1,pattern:/^/,xs:8,placeholder:"____",headerClassName:e.encabcolumns},{headerName:"Min. MOT",field:"PresupConfTipoMinMOT",order:!1,width:150,type:"number",editable:!0,required:!1,maxLength:5,pattern:/^/,xs:8,placeholder:"______",headerClassName:e.encabcolumns}])})}const N={idPresupConfTipo:0,PresupConfTipoDesc:"",PresupConfTipoRubro:"",PresupConfTipoCant:0,PresupConfTipoM2:"",PresupConfTipoAnexo:"",PresupConfTipoLargo:"",PresupConfTipoAncho:"",PresupConfTipoImprime:"",PresupConfTipoMinMOT:0,PresupConfTipoBack:"",PresupConfTipoPElab:"",datoserroneos:!0,tablabase:"PresupConfTipo"};function k(){const{formdatos:r,setFormdatos:o}=a.useContext(c),{valor:w,setValor:n}=a.useContext(f),[i,u]=h.useState([]),[_,p]=a.useState([]);async function d(){var t=await x();p(()=>t)}async function l(){const t=await b();u(t)}async function m(){d(),l()}return a.useEffect(()=>{m(),n("Confección Tipo"),o(N)},[]),s.jsx(s.Fragment,{children:s.jsx(C,{rows1:i,columns1:_,formdatos:r})})}export{k as default};