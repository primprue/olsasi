import{b as te,g as ne,s as se,Y as re,U as ae,a as c,u as oe,f as X,j as s,_ as P,i as ie,k as le,p as ce,H as ue,Z as J,$ as de,a0 as pe,a1 as me,a2 as Y,r as O,I as F,t as he,v as fe,M as _,R as q,O as Z,B as V,S as ge,a3 as xe}from"./index-r_yxv9AL.js";import{e as l,D as Ce,a as be,c as we,G as K,b as ve,d as ye}from"./esES-o6LdUFzd.js";import{D as Te,G as Ee,a as Ne,b as Pe,d as je,c as Se}from"./GridToolbarFilterButton-3Qg5vE7b.js";import{s as Re}from"./TextField-KyvZr_kk.js";import{D as Q,G as $e}from"./DataGrid-_mhzC7gF.js";import{P as De}from"./PresupPreview-k5xZ7PUE.js";import"./Checkbox-C-VidIdO.js";import"./Boton.module-EkP_IAWQ.js";function Me(t){return te("MuiDialogContentText",t)}ne("MuiDialogContentText",["root"]);const ke=["children","className"],_e=t=>{const{classes:e}=t,n=le({root:["root"]},Me,e);return P({},e,n)},Ie=se(re,{shouldForwardProp:t=>ae(t)||t==="classes",name:"MuiDialogContentText",slot:"Root",overridesResolver:(t,e)=>e.root})({}),Oe=c.forwardRef(function(e,o){const n=oe({props:e,name:"MuiDialogContentText"}),{className:a}=n,u=X(n,ke),d=_e(u);return s.jsx(Ie,P({component:"p",variant:"body1",color:"text.secondary",ref:o,ownerState:u,className:ie(d.root,a)},n,{classes:d}))}),Fe=Oe,Be=["addEndListener","appear","children","container","direction","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Ae(t,e,o){const n=e.getBoundingClientRect(),a=o&&o.getBoundingClientRect(),u=J(e);let d;if(e.fakeTransform)d=e.fakeTransform;else{const p=u.getComputedStyle(e);d=p.getPropertyValue("-webkit-transform")||p.getPropertyValue("transform")}let f=0,m=0;if(d&&d!=="none"&&typeof d=="string"){const p=d.split("(")[1].split(")")[0].split(",");f=parseInt(p[4],10),m=parseInt(p[5],10)}return t==="left"?a?`translateX(${a.right+f-n.left}px)`:`translateX(${u.innerWidth+f-n.left}px)`:t==="right"?a?`translateX(-${n.right-a.left-f}px)`:`translateX(-${n.left+n.width-f}px)`:t==="up"?a?`translateY(${a.bottom+m-n.top}px)`:`translateY(${u.innerHeight+m-n.top}px)`:a?`translateY(-${n.top-a.top+n.height-m}px)`:`translateY(-${n.top+n.height-m}px)`}function Le(t){return typeof t=="function"?t():t}function I(t,e,o){const n=Le(o),a=Ae(t,e,n);a&&(e.style.webkitTransform=a,e.style.transform=a)}const Ge=c.forwardRef(function(e,o){const n=ce(),a={enter:n.transitions.easing.easeOut,exit:n.transitions.easing.sharp},u={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:d,appear:f=!0,children:m,container:p,direction:g="down",easing:x=a,in:b,onEnter:T,onEntered:j,onEntering:S,onExit:R,onExited:v,onExiting:$,style:y,timeout:E=u,TransitionComponent:w=de}=e,N=X(e,Be),h=c.useRef(null),D=ue(m.ref,h,o),C=r=>i=>{r&&(i===void 0?r(h.current):r(h.current,i))},B=C((r,i)=>{I(g,r,p),me(r),T&&T(r,i)}),A=C((r,i)=>{const H=Y({timeout:E,style:y,easing:x},{mode:"enter"});r.style.webkitTransition=n.transitions.create("-webkit-transform",P({},H)),r.style.transition=n.transitions.create("transform",P({},H)),r.style.webkitTransform="none",r.style.transform="none",S&&S(r,i)}),L=C(j),G=C($),M=C(r=>{const i=Y({timeout:E,style:y,easing:x},{mode:"exit"});r.style.webkitTransition=n.transitions.create("-webkit-transform",i),r.style.transition=n.transitions.create("transform",i),I(g,r,p),R&&R(r)}),U=C(r=>{r.style.webkitTransition="",r.style.transition="",v&&v(r)}),z=r=>{d&&d(h.current,r)},k=c.useCallback(()=>{h.current&&I(g,h.current,p)},[g,p]);return c.useEffect(()=>{if(b||g==="down"||g==="right")return;const r=pe(()=>{h.current&&I(g,h.current,p)}),i=J(h.current);return i.addEventListener("resize",r),()=>{r.clear(),i.removeEventListener("resize",r)}},[g,b,p]),c.useEffect(()=>{b||k()},[b,k]),s.jsx(w,P({nodeRef:h,onEnter:B,onEntered:L,onEntering:A,onExit:M,onExited:U,onExiting:G,addEndListener:z,appear:f,in:b,timeout:E},N,{children:(r,i)=>c.cloneElement(m,P({ref:D,style:P({visibility:r==="exited"&&!b?"hidden":void 0},y,m.props.style)},i))}))}),Ue=Ge,ze=t=>new Promise(function(e){const o=F+"/presupencableer/?id="+t;O.get(o).set("Content-Type","application/json").then(n=>{const a=JSON.parse(n.text);e(a)})});async function He(){return Ve()}function Ve(){return new Promise(function(t){t([{headerName:"Nro.",field:"id",editable:"never",headerClassName:l.encabcolumns},{headerName:"Cliente ",field:"NombreCliente",width:350,headerClassName:l.encabcolumns},{headerName:"Fecha",field:"PresupEncabFecha",order:!0,width:100,editable:!1,required:!1,maxLength:10,pattern:/^/,xs:8,placeholder:"_____",headerClassName:l.encabcolumns},{headerName:"MayMin",field:"PresupEncabMayMin",headerClassName:l.encabcolumns},{headerName:"Total",field:"PresupEncabTotal",type:"text",width:100,placeholder:"999999,99",required:!0,editable:!0,maxLength:9,xs:4,pattern:/^[0-9]{0,6}.[0-9]{0,2}$/,align:"right",renderCell:e=>s.jsxs("span",{style:{textAlign:"right"},children:[e.value&&`$ ${e.value}`," "]}),headerClassName:l.encabcolumns},{headerName:"Explicación",field:"PresupEncabExplic",width:350,headerClassName:l.encabcolumns}])})}var W={},qe=fe;Object.defineProperty(W,"__esModule",{value:!0});var ee=W.default=void 0,We=qe(he()),Ye=s,Xe=(0,We.default)((0,Ye.jsx)("path",{d:"M4 9h16v2H4zm12-5h-3V1h-2v3H8l4 4zM8 19h3v3h2v-3h3l-4-4zm-4-7h16v2H4z"}),"CompressSharp");ee=W.default=Xe;const Je=t=>new Promise(e=>{const o=F+"/presuprenglonleer/?id="+t;O.get(o).set("Content-Type","application/json").then(n=>{const a=JSON.parse(n.text);e(a)})}),Ze=Re("span")`
	white-space: normal;
	line-height: 1.2;
	max-height: 3.6em; /* Puedes ajustar esta altura según tu necesidad */
	overflow: hidden;
`;async function Ke(){return Qe()}function Qe(){return new Promise(function(t){t([{headerName:"id",field:"id",editable:"never",headerClassName:l.encabcolumnsmt},,{headerName:"Cant.",field:"PresupRenglonCant",editable:"never",width:80,pattern:/^[0-9]{0,6}.[0-9]{0,2}/,align:"right",headerClassName:l.encabcolumnsmt},{headerName:"Descripción",field:"PresupRenglonDesc",editable:"never",renderCell:e=>s.jsx(Ze,{children:e.value}),width:700,headerAlign:"center",headerClassName:l.encabcolumnsmt},{headerName:"Largo",field:"PresupRenglonLargo",type:"numeric",width:100,pattern:/^[0-9]{0,4}.[0-9]{0,2}/,align:"right",editable:"never",headerClassName:l.encabcolumnsmt},{headerName:"Ancho",field:"PresupRenglonAncho",type:"numeric",width:100,pattern:/^[0-9]{0,4}.[0-9]{0,2}/,align:"right",editable:"never",headerClassName:l.encabcolumnsmt},{headerName:"Imp.Unit.",field:"PresupRenglonImpUnit",type:"text",width:150,placeholder:"99999999,99",required:!0,maxLength:9,xs:4,pattern:/^[0-9]{0,8}.[0-9]{0,2}$/,align:"right",renderCell:e=>s.jsxs("span",{style:{textAlign:"right"},children:[e.value&&`$ ${e.value}`," "]}),editable:"never",headerClassName:l.encabcolumnsmt},{headerName:"Imp.Item.",field:"PresupRenglonImpItem",type:"text",width:150,placeholder:"99999999,99",required:!0,editable:!0,maxLength:9,xs:4,pattern:/^[0-9]{0,8}.[0-9]{0,2}$/,align:"right",renderCell:e=>s.jsxs("span",{style:{textAlign:"right"},children:[e.value&&`$ ${e.value}`," "]}),headerClassName:l.encabcolumnsmt},{headerName:"Detalles internos del presupuesto",field:"PresupRenglonParamInt",width:4500,editable:"never",headerClassName:l.encabcolumnsmt}])})}function et(t){const e=F+"/presupborrar/?id="+t;O.delete(e).set("Content-Type","application/json").then(function(o){_(o[0]),_(o[1]),_(o[2])}).catch(o=>{_(o)})}const tt=q.forwardRef(function(e,o){return s.jsx(Ue,{direction:"up",ref:o,...e})});function nt(t){const{otdatos:e,setOTdatos:o}=c.useContext(Z),{open:n,handleClose:a,Presup:u,origen:d}=t,[f,m]=c.useState([]),[p,g]=c.useState([]);let x="";async function b(w){const N=await Je(w);m(N)}async function T(){var w=await Ke();g(()=>w)}d==="Borrar"?x=`Borrará el Presupuesto nro. ${u.id} de ${u.NombreCliente}`:x=`Renglones de Presupuesto nro. ${u.id} de ${u.NombreCliente}`;const j=()=>{et(u.id),a()};async function S(){o({...e,renglonespresup:v})}const R=()=>{a()};c.useEffect(()=>{b(u.id)},[u]),c.useEffect(()=>{T()},[]);const[v,$]=c.useState([]),y=w=>{const N=w.map((h,D)=>f.filter(C=>C.id==h));$(N)};function E(){return s.jsx(K,{className:l.tablamuestrarenglon,children:"Seleccione Items de Orden de Trabajo"})}return s.jsx(s.Fragment,{children:s.jsxs(Ce,{fullWidth:!0,maxWidth:"xl",open:n,TransitionComponent:tt,keepMounted:!0,onClose:a,"aria-labelledby":"alert-dialog-slide-title","aria-describedby":"alert-dialog-slide-description",children:[s.jsx(be,{id:"alert-dialog-slide-title",children:x}),s.jsx(Te,{children:s.jsx(Fe,{x:{height:500,width:"100%"},id:"alert-dialog-slide-description",children:s.jsx(Q,{columnHeaderHeight:35,columns:p,rows:f,checkboxSelection:!0,onRowSelectionModelChange:y,selectionModel:v,slots:{toolbar:E}})})}),s.jsxs(we,{children:[s.jsx(V,{onClick:R,color:"secondary",children:"Cerrar"}),d==="Borrar"&&s.jsx(V,{onClick:j,color:"secondary",children:"Borrar"})||s.jsx(V,{onClick:S,color:"secondary",children:"Aceptar"})]})]})})}const st=t=>{var e="";if(t){var o=t.NombreCliente.trimRight();o=o.replace(/ /g,"\\ "),e=`Presupuesto\\ nro\\ ${t.id}*.pdf`}return e=encodeURIComponent(e),new Promise(n=>{setTimeout(()=>{const a=F+"/presupnombre/?id="+e;O.get(a).set("Content-Type","application/json").then(u=>{n(u)})},1e3)})};function pt(){var r;const{valor:t,setValor:e}=c.useContext(ge),{otdatos:o,setOTdatos:n}=c.useContext(Z),[a,u]=q.useState([]),[d,f]=c.useState([]);var m=new Date;m.setDate(m.getDate()-360);const[p,g]=c.useState(m),[x,b]=c.useState(),[T,j]=c.useState(!1),S=q.useCallback(i=>{setSnackbar({children:i.message,severity:"error"})},[]),[R,v]=c.useState({ppreview:!1}),[$,y]=c.useState(""),[E,w]=c.useState(!0),N=xe(),h=()=>{w(!1),N("/OTrabajo")};async function D(){var i=await He();f(()=>i)}async function C(){const i=await ze(p);u(i)}async function B(){D(),C()}const A=({row:i})=>{b(i)},L=()=>{y("Borrar"),M()},G=i=>{y("Mostrar"),M()},M=()=>{j(!0)},U=()=>{C(),j(!T),o.renglonespresup&&h()};async function z(i){(await st(i)).text==='[{"error":1}]'?alert(`El presupuesto nro ${i.id} no se encuentra`):v({ppreview:!0})}c.useEffect(()=>{B(),e("Muestra Presupuesto")},[]);function k(){return s.jsxs(K,{className:l.tablasgenerales,children:[s.jsx(Ee,{className:l.coloropcioncol}),s.jsx(Ne,{className:l.coloropcioncol}),s.jsx(Pe,{className:l.coloropcioncol}),s.jsx($e,{className:l.coloropcioncol}),s.jsx(ee,{onClick:()=>G(x.id),className:l.iconomodificar,titleAccess:"Ve datos Presupuesto"}),s.jsx(je,{onClick:()=>z(x),className:l.iconomodificar,titleAccess:"Preview Presupuesto"}),s.jsx(ye,{onClick:()=>setImprimirTF(!0),className:l.iconoimpresora,titleAccess:"Imprimir"}),s.jsx(Se,{variant:"contained",titleAccess:"Borrar",className:l.iconoborrar,onClick:()=>L()})]})}return s.jsxs(s.Fragment,{children:[E&&s.jsx(Q,{rows:a,columns:d,localeText:ve.components.MuiDataGrid.defaultProps.localeText,onRowClick:A,onProcessRowUpdateError:S,showCellVerticalBorder:!0,columnHeaderHeight:35,slots:{toolbar:k},initialState:{...a.initialState,pagination:{...(r=a.initialState)==null?void 0:r.pagination,paginationModel:{pageSize:25}}}}),x!==void 0&&s.jsx(nt,{open:T,handleClose:U,Presup:x,origen:$}),s.jsx(De,{open:R.ppreview,setOpen:v})]})}export{pt as default};