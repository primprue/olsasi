import{a as e,T as p,S as f,R as x,j as s}from"./index-r_yxv9AL.js";import{T as h,S as b}from"./TablaMuestra-Of9vopW1.js";import{e as r}from"./esES-o6LdUFzd.js";import"./ClientesLeer-J_VJC4ey.js";import"./PresupDetPieLee-4Y-VDx8h.js";import"./StkGrupoLee-dUMQdOe9.js";import"./GridToolbarFilterButton-3Qg5vE7b.js";import"./DataGrid-_mhzC7gF.js";import"./TextField-KyvZr_kk.js";import"./Checkbox-C-VidIdO.js";import"./SelecCampos-gf-pdEJA.js";async function S(){return C()}function C(){return new Promise(function(t,o){t([{headerName:"Código",field:"id",editable:!0,required:!0,maxLength:4,xs:8,placeholder:"_____",headerClassName:r.encabcolumns},{headerName:"Descripción",field:"StkUnMedDesc",order:!0,width:200,editable:!0,required:!0,maxLength:45,pattern:/^/,xs:8,placeholder:"_________________",headerClassName:r.encabcolumns}])})}const M={idStkUnMed:"",StkUnMedDesc:"",datoserroneos:!0,tablabase:"UniMedidas"};function L(){const{formdatos:t,setFormdatos:o}=e.useContext(p),{valor:w,setValor:n}=e.useContext(f),[i,c]=x.useState([]),[d,m]=e.useState([]);async function u(){var a=await S();m(()=>a)}async function l(){const a=await b();c(a)}async function _(){u(),l()}return e.useEffect(()=>{_(),n("Unidad de Medidas"),o(M)},[]),s.jsx(s.Fragment,{children:s.jsx(h,{rows1:i,columns1:d,formdatos:t})})}export{L as default};