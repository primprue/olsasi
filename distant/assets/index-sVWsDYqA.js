import{a as t,T as P,S as f,R as d,j as o}from"./index-r_yxv9AL.js";import{P as x}from"./PresupDetPieLee-4Y-VDx8h.js";import{l as D}from"./columns-gM_PrAgX.js";import{T as w}from"./TablaMuestra-Of9vopW1.js";import"./esES-o6LdUFzd.js";import"./DataGrid-_mhzC7gF.js";import"./TextField-KyvZr_kk.js";import"./Checkbox-C-VidIdO.js";import"./ClientesLeer-J_VJC4ey.js";import"./StkGrupoLee-dUMQdOe9.js";import"./GridToolbarFilterButton-3Qg5vE7b.js";import"./SelecCampos-gf-pdEJA.js";const C={idPresupDetPie:0,PresupDetPieLeyenda:"",PresupDetPieSelec:"",datoserroneos:!0,tablabase:"PresupDetPie"};function V(){const{formdatos:s,setFormdatos:a}=t.useContext(P),{valor:F,setValor:r}=t.useContext(f),[n,i]=d.useState([]),[c,m]=t.useState([]);async function u(){var e=await D();m(()=>e)}async function p(){const e=await x();i(e)}async function l(){u(),p()}return t.useEffect(()=>{l(),r("Detalle de Pie"),a(C)},[]),o.jsx(o.Fragment,{children:o.jsx(w,{rows1:n,columns1:c,formdatos:s})})}export{V as default};
