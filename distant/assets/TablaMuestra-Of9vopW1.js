import{g as Y,b as ee,c as q,j as r,s as O,P as xe,d as _,e as fe,l as be,_ as y,a as T,u as te,f as V,h as $e,i as ye,k as oe,m as me,n as ve,o as Ee,p as _e,q as Ne,G as Be,r as h,M as c,I as g,t as K,v as J,T as W,R as L,w as Ge,B as Ce}from"./index-r_yxv9AL.js";import{C as Ue}from"./ClientesLeer-J_VJC4ey.js";import{P as He}from"./PresupDetPieLee-4Y-VDx8h.js";import{p as Fe,s as Ve}from"./StkGrupoLee-dUMQdOe9.js";import{D as We,G as qe,a as Ke,b as Je,d as Xe,c as Ze}from"./GridToolbarFilterButton-3Qg5vE7b.js";import{D as Qe,a as Ye,b as et,G as tt,e as I,d as ot}from"./esES-o6LdUFzd.js";import{T as nt}from"./TextField-KyvZr_kk.js";import{S as st}from"./SelecCampos-gf-pdEJA.js";import{C as rt,a as at,D as it,G as ct}from"./DataGrid-_mhzC7gF.js";function lt(e){return ee("MuiAlert",e)}const ut=Y("MuiAlert",["root","action","icon","message","filled","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),he=ut,dt=q(r.jsx("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),pt=q(r.jsx("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),ft=q(r.jsx("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),bt=q(r.jsx("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),mt=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],vt=e=>{const{variant:t,color:o,severity:n,classes:s}=e,u={root:["root",`${t}${_(o||n)}`,`${t}`],icon:["icon"],message:["message"],action:["action"]};return oe(u,lt,s)},Ct=O(xe,{name:"MuiAlert",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[o.variant],t[`${o.variant}${_(o.color||o.severity)}`]]}})(({theme:e,ownerState:t})=>{const o=e.palette.mode==="light"?fe:be,n=e.palette.mode==="light"?be:fe,s=t.color||t.severity;return y({},e.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px"},s&&t.variant==="standard"&&{color:e.vars?e.vars.palette.Alert[`${s}Color`]:o(e.palette[s].light,.6),backgroundColor:e.vars?e.vars.palette.Alert[`${s}StandardBg`]:n(e.palette[s].light,.9),[`& .${he.icon}`]:e.vars?{color:e.vars.palette.Alert[`${s}IconColor`]}:{color:e.palette[s].main}},s&&t.variant==="outlined"&&{color:e.vars?e.vars.palette.Alert[`${s}Color`]:o(e.palette[s].light,.6),border:`1px solid ${(e.vars||e).palette[s].light}`,[`& .${he.icon}`]:e.vars?{color:e.vars.palette.Alert[`${s}IconColor`]}:{color:e.palette[s].main}},s&&t.variant==="filled"&&y({fontWeight:e.typography.fontWeightMedium},e.vars?{color:e.vars.palette.Alert[`${s}FilledColor`],backgroundColor:e.vars.palette.Alert[`${s}FilledBg`]}:{backgroundColor:e.palette.mode==="dark"?e.palette[s].dark:e.palette[s].main,color:e.palette.getContrastText(e.palette[s].main)}))}),ht=O("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(e,t)=>t.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),gt=O("div",{name:"MuiAlert",slot:"Message",overridesResolver:(e,t)=>t.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),ge=O("div",{name:"MuiAlert",slot:"Action",overridesResolver:(e,t)=>t.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),ke={success:r.jsx(dt,{fontSize:"inherit"}),warning:r.jsx(pt,{fontSize:"inherit"}),error:r.jsx(ft,{fontSize:"inherit"}),info:r.jsx(bt,{fontSize:"inherit"})},kt=T.forwardRef(function(t,o){var n,s,u,p,v,m;const i=te({props:t,name:"MuiAlert"}),{action:f,children:l,className:C,closeText:k="Close",color:x,components:P={},componentsProps:M={},icon:b,iconMapping:a=ke,onClose:S,role:A="alert",severity:D="success",slotProps:w={},slots:z={},variant:N="standard"}=i,B=V(i,mt),j=y({},i,{color:x,severity:D,variant:N}),R=vt(j),$=(n=(s=z.closeButton)!=null?s:P.CloseButton)!=null?n:$e,G=(u=(p=z.closeIcon)!=null?p:P.CloseIcon)!=null?u:rt,E=(v=w.closeButton)!=null?v:M.closeButton,U=(m=w.closeIcon)!=null?m:M.closeIcon;return r.jsxs(Ct,y({role:A,elevation:0,ownerState:j,className:ye(R.root,C),ref:o},B,{children:[b!==!1?r.jsx(ht,{ownerState:j,className:R.icon,children:b||a[D]||ke[D]}):null,r.jsx(gt,{ownerState:j,className:R.message,children:l}),f!=null?r.jsx(ge,{ownerState:j,className:R.action,children:f}):null,f==null&&S?r.jsx(ge,{ownerState:j,className:R.action,children:r.jsx($,y({size:"small","aria-label":k,title:k,color:"inherit",onClick:S},E,{children:r.jsx(G,y({fontSize:"small"},U))}))}):null]}))}),St=kt;function Tt(e={}){const{autoHideDuration:t=null,disableWindowBlurListener:o=!1,onClose:n,open:s,resumeHideDuration:u}=e,p=T.useRef();T.useEffect(()=>{if(!s)return;function b(a){a.defaultPrevented||(a.key==="Escape"||a.key==="Esc")&&(n==null||n(a,"escapeKeyDown"))}return document.addEventListener("keydown",b),()=>{document.removeEventListener("keydown",b)}},[s,n]);const v=me((b,a)=>{n==null||n(b,a)}),m=me(b=>{!n||b==null||(clearTimeout(p.current),p.current=setTimeout(()=>{v(null,"timeout")},b))});T.useEffect(()=>(s&&m(t),()=>{clearTimeout(p.current)}),[s,t,m]);const i=b=>{n==null||n(b,"clickaway")},f=()=>{clearTimeout(p.current)},l=T.useCallback(()=>{t!=null&&m(u??t*.5)},[t,u,m]),C=b=>a=>{const S=b.onBlur;S==null||S(a),l()},k=b=>a=>{const S=b.onFocus;S==null||S(a),f()},x=b=>a=>{const S=b.onMouseEnter;S==null||S(a),f()},P=b=>a=>{const S=b.onMouseLeave;S==null||S(a),l()};return T.useEffect(()=>{if(!o&&s)return window.addEventListener("focus",l),window.addEventListener("blur",f),()=>{window.removeEventListener("focus",l),window.removeEventListener("blur",f)}},[o,l,s]),{getRootProps:(b={})=>{const a=y({},ve(e),ve(b));return y({role:"presentation"},b,a,{onBlur:C(a),onFocus:k(a),onMouseEnter:x(a),onMouseLeave:P(a)})},onClickAway:i}}function Pt(e){return ee("MuiSnackbarContent",e)}Y("MuiSnackbarContent",["root","message","action"]);const Mt=["action","className","message","role"],xt=e=>{const{classes:t}=e;return oe({root:["root"],action:["action"],message:["message"]},Pt,t)},yt=O(xe,{name:"MuiSnackbarContent",slot:"Root",overridesResolver:(e,t)=>t.root})(({theme:e})=>{const t=e.palette.mode==="light"?.8:.98,o=Ee(e.palette.background.default,t);return y({},e.typography.body2,{color:e.vars?e.vars.palette.SnackbarContent.color:e.palette.getContrastText(o),backgroundColor:e.vars?e.vars.palette.SnackbarContent.bg:o,display:"flex",alignItems:"center",flexWrap:"wrap",padding:"6px 16px",borderRadius:(e.vars||e).shape.borderRadius,flexGrow:1,[e.breakpoints.up("sm")]:{flexGrow:"initial",minWidth:288}})}),jt=O("div",{name:"MuiSnackbarContent",slot:"Message",overridesResolver:(e,t)=>t.message})({padding:"8px 0"}),Rt=O("div",{name:"MuiSnackbarContent",slot:"Action",overridesResolver:(e,t)=>t.action})({display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8}),It=T.forwardRef(function(t,o){const n=te({props:t,name:"MuiSnackbarContent"}),{action:s,className:u,message:p,role:v="alert"}=n,m=V(n,Mt),i=n,f=xt(i);return r.jsxs(yt,y({role:v,square:!0,elevation:6,className:ye(f.root,u),ownerState:i,ref:o},m,{children:[r.jsx(jt,{className:f.message,ownerState:i,children:p}),s?r.jsx(Rt,{className:f.action,ownerState:i,children:s}):null]}))}),At=It;function wt(e){return ee("MuiSnackbar",e)}Y("MuiSnackbar",["root","anchorOriginTopCenter","anchorOriginBottomCenter","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft"]);const Lt=["onEnter","onExited"],Ot=["action","anchorOrigin","autoHideDuration","children","className","ClickAwayListenerProps","ContentProps","disableWindowBlurListener","message","onBlur","onClose","onFocus","onMouseEnter","onMouseLeave","open","resumeHideDuration","TransitionComponent","transitionDuration","TransitionProps"],Dt=e=>{const{classes:t,anchorOrigin:o}=e,n={root:["root",`anchorOrigin${_(o.vertical)}${_(o.horizontal)}`]};return oe(n,wt,t)},Se=O("div",{name:"MuiSnackbar",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[`anchorOrigin${_(o.anchorOrigin.vertical)}${_(o.anchorOrigin.horizontal)}`]]}})(({theme:e,ownerState:t})=>{const o={left:"50%",right:"auto",transform:"translateX(-50%)"};return y({zIndex:(e.vars||e).zIndex.snackbar,position:"fixed",display:"flex",left:8,right:8,justifyContent:"center",alignItems:"center"},t.anchorOrigin.vertical==="top"?{top:8}:{bottom:8},t.anchorOrigin.horizontal==="left"&&{justifyContent:"flex-start"},t.anchorOrigin.horizontal==="right"&&{justifyContent:"flex-end"},{[e.breakpoints.up("sm")]:y({},t.anchorOrigin.vertical==="top"?{top:24}:{bottom:24},t.anchorOrigin.horizontal==="center"&&o,t.anchorOrigin.horizontal==="left"&&{left:24,right:"auto"},t.anchorOrigin.horizontal==="right"&&{right:24,left:"auto"})})}),zt=T.forwardRef(function(t,o){const n=te({props:t,name:"MuiSnackbar"}),s=_e(),u={enter:s.transitions.duration.enteringScreen,exit:s.transitions.duration.leavingScreen},{action:p,anchorOrigin:{vertical:v,horizontal:m}={vertical:"bottom",horizontal:"left"},autoHideDuration:i=null,children:f,className:l,ClickAwayListenerProps:C,ContentProps:k,disableWindowBlurListener:x=!1,message:P,open:M,TransitionComponent:b=Be,transitionDuration:a=u,TransitionProps:{onEnter:S,onExited:A}={}}=n,D=V(n.TransitionProps,Lt),w=V(n,Ot),z=y({},n,{anchorOrigin:{vertical:v,horizontal:m},autoHideDuration:i,disableWindowBlurListener:x,TransitionComponent:b,transitionDuration:a}),N=Dt(z),{getRootProps:B,onClickAway:j}=Tt(y({},z)),[R,$]=T.useState(!0),G=Ne({elementType:Se,getSlotProps:B,externalForwardedProps:w,ownerState:z,additionalProps:{ref:o},className:[N.root,l]}),E=H=>{$(!0),A&&A(H)},U=(H,F)=>{$(!1),S&&S(H,F)};return!M&&R?null:r.jsx(at,y({onClickAway:j},C,{children:r.jsx(Se,y({},G,{children:r.jsx(b,y({appear:!0,in:M,timeout:a,direction:v==="top"?"down":"up",onEnter:U,onExited:E},D,{children:f||r.jsx(At,y({message:P,action:p},k))}))}))}))}),$t=zt;function Et(e){const{id:t,TransporteDesc:o,TransporteTel1:n,TransporteTel2:s,TransporteWA:u,TransporteMail:p,TransporteDom:v,TransporteLoc:m,TransporteDestino:i,TransporteObser:f}=e,l=g+"/transportemodificar/"+t;h.post(l).set("Content-Type","application/json").send({TransporteDesc:o}).send({TransporteTel1:n}).send({TransporteTel2:s}).send({TransporteWA:u}).send({TransporteMail:p}).send({TransporteDom:v}).send({TransporteLoc:m}).send({TransporteDestino:i}).send({TransporteObser:f}).then(function(C){c(C)}).catch(C=>c(C))}function _t(){return new Promise(e=>{setTimeout(()=>{const t=g+"/transporteleer";h.get(t).set("Content-Type","application/json").then(o=>{const n=JSON.parse(o.text);e(n)}).catch(o=>c(o))},500)})}function Nt(e){return new Promise(function(){setTimeout(()=>{const{idClientes:t,ClientesDesc:o,ClientesCalle:n,ClientesNroCalle:s,ClientesPiso:u,ClientesDto:p,ClientesCodPos:v,ClientesLoc:m,ClientesPcia:i,ClientesTel:f,ClientesMail:l,ClientesIVA:C,ClientesCUIT:k,ClientesTipo:x}=e,P=g+"/clientesmodificar/"+t;h.post(P).set("Content-Type","application/json").send({ClientesDesc:o}).send({ClientesCalle:n}).send({ClientesNroCalle:s}).send({ClientesPiso:u}).send({ClientesDto:p}).send({ClientesCodPos:v}).send({ClientesLoc:m}).send({ClientesPcia:i}).send({ClientesTel:f}).send({ClientesMail:l}).send({ClientesIVA:C}).send({ClientesCUIT:k}).send({ClientesTipo:x}).set("X-API-Key","foobar").then(function(M){c(M)}).catch(M=>c(M))})},500)}function Bt(){return new Promise(function(e){setTimeout(()=>{const t=g+"/stkmonedasleer";h.get(t).set("Content-Type","application/json").then(o=>{const n=JSON.parse(o.text);e(n)}).catch(o=>c(o))},500)})}function Gt(e){const{id:t,StkMonedasDescripcion:o,StkMonedasCotizacion:n,StkMonedasSigno:s}=e,u=t,p=g+"/stkmonedasmodificar/"+u;h.post(p).set("Content-Type","application/json").send({StkMonedasDescripcion:o}).send({StkMonedasCotizacion:n}).send({StkMonedasSigno:s}).set("X-API-Key","foobar").then(function(v){c(v)}).catch(v=>c(v))}function Ut(){return new Promise(function(e){setTimeout(()=>{const t=g+"/presupconftipoleer";h.get(t).set("Content-Type","application/json").then(o=>{const n=JSON.parse(o.text);e(n)}).catch(o=>c(o))},500)})}function Ht(e){const{idPresupConfTipo:t,PresupConfTipoLargo:o,PresupConfTipoAncho:n,PresupConfTipoM2:s,PresupConfTipoAnexo:u,PresupConfTipoCant:p,PresupConfTipoDesc:v,PresupConfTipoRubro:m,PresupConfTipoImprime:i,PresupConfTipoMinMOT:f}=e,l=g+"/presupconftipomodificar/?id="+t;h.post(l).set("Content-Type","application/json").send({PresupConfTipoAnexo:u}).send({PresupConfTipoLargo:o}).send({PresupConfTipoAncho:n}).send({PresupConfTipoM2:s}).send({PresupConfTipoCant:p}).send({PresupConfTipoDesc:v}).send({PresupConfTipoRubro:m}).send({PresupConfTipoImprime:i}).send({PresupConfTipoMinMOT:f}).then(function(C){c(C)}).catch(C=>c(C))}function Ft(e){const{id:t,PresupDetPieLeyenda:o}=e,n=g+"/presupdetpiemodificar/?id="+t;h.post(n).set("Content-Type","application/json").send({PresupDetPieLeyenda:o}).then(function(s){c(s)}).catch(s=>c(s))}function Vt(e){return new Promise(function(){const{id:t,ProveedoresDesc:o,ProveedoresTipo:n,ProveedoresCUIT:s,ProveedoresCalle:u,ProveedoresNroCalle:p,ProveedoresPiso:v,ProveedoresDto:m,ProveedoresCodPos:i,ProveedoresLoc:f,ProveedoresPcia:l,ProveedoresTel:C,ProveedoresContacto:k,ProveedoresMail:x,ProveedoresWeb:P,ProveedoresCodMon:M}=e,b=g+"/proveedoresmodificar/"+t;h.post(b).set("Content-Type","application/json").send({ProveedoresDesc:o}).send({ProveedoresTipo:n}).send({ProveedoresCUIT:s}).send({ProveedoresCalle:u}).send({ProveedoresNroCalle:p}).send({ProveedoresPiso:v}).send({ProveedoresDto:m}).send({ProveedoresCodPos:i}).send({ProveedoresLoc:f}).send({ProveedoresPcia:l}).send({ProveedoresTel:C}).send({ProveedoresContacto:k}).send({ProveedoresMail:x}).send({ProveedoresWeb:P}).send({ProveedoresCodMon:M}).then(function(a){c(a)}).catch(a=>c(a))})}function Wt(e){const{StkGrupoAbr:t,StkGrupoDesc:o,StkGrupoContRubro:n,id:s}=e,u=g+"/stkgrupomodificar/?id="+s;h.post(u).set("Content-Type","application/json").send({StkGrupoDesc:o}).send({StkGrupoAbr:t}).send({StkGrupoContRubro:n}).then(function(p){c(p)}).catch(p=>c(p))}const qt=()=>new Promise(e=>{const t=g+"/stkrubroleermezcla";h.get(t).set("Content-Type","application/json").then(o=>{const n=JSON.parse(o.text);e(n)}).catch(o=>c(o))});function Kt(e){return new Promise(function(t){const{idStkRubro:o,StkRubroCodGrp:n,StkRubroDesc:s,StkRubroAbr:u,StkRubroProv:p,StkRubroAncho:v,StkRubroPres:m,StkRubroPresDes:i,StkRubroUM:f,StkRubroCosto:l,StkRubroTM:C,StkRubroConf:k}=e,x=g+"/stkrubromodificar/?idStkRubro="+o+"&StkRubroCodGrp="+n;h.post(x).set("Content-Type","application/json").send({StkRubroDesc:s,StkRubroAbr:u,StkRubroProv:p,StkRubroAncho:v,StkRubroPres:m,StkRubroPresDes:i,StkRubroUM:f,StkRubroCosto:l,StkRubroTM:C,StkRubroConf:k}).then(function(P){c(P)}).catch(P=>c(P)),t()})}function Jt(){return new Promise(function(e){setTimeout(()=>{const t=g+"/stkitemsleedetalles";h.get(t).set("Content-Type","application/json").then(o=>{const n=JSON.parse(o.text);e(n)}).catch(o=>c(o))})},500)}function Xt(e){return new Promise(function(t){const{idStkItems:o,StkItemsGrupo:n,StkItemsRubro:s,StkItemsRubroAbr:u,StkItemsDesc:p,StkItemsOTD:v,StkItemsCantidad:m,StkItemsCantDisp:i,StkItemsMin:f,StkItemsMax:l}=e,C=g+"/stkitemsmodificar/?idStkItems="+o+"&StkItemsGrupo="+n+"&StkItemsRubro="+s;h.post(C).set("Content-Type","application/json").send({StkItemsRubroAbr:u,StkItemsDesc:p,StkItemsOTD:v,StkItemsCantidad:m,StkItemsCantDisp:i,StkItemsMin:f,StkItemsMax:l}).then(function(k){c(k)}).catch(k=>c(k))})}function Zt(){return new Promise(function(e){const t=g+"/stkunmedleer";h.get(t).set("Content-Type","application/json").then(o=>{const n=JSON.parse(o.text);e(n)})})}function Qt(e){const{StkUnMedDesc:t,id:o}=e,n=g+"/stkunmedmodificar/"+o;h.post(n).set("Content-Type","application/json").send({idStkUnMed:o}).send({StkUnMedDesc:t}).then(function(s){c(s)}).catch(s=>c(s))}function Yt(){return new Promise(function(e){const t=g+"/stkubfisicaleer";h.get(t).set("Content-Type","application/json").then(o=>{const n=JSON.parse(o.text);e(n)})})}var ne={},eo=J;Object.defineProperty(ne,"__esModule",{value:!0});var je=ne.default=void 0,to=eo(K()),Te=r,oo=(0,to.default)([(0,Te.jsx)("path",{d:"M20 4H8v12h12V4zm-1 7h-4v4h-2v-4H9V9h4V5h2v4h4v2z",opacity:".3"},"0"),(0,Te.jsx)("path",{d:"M4 22h14v-2H4V6H2v14c0 1.1.9 2 2 2zm4-4h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2zM8 4h12v12H8V4zm7 1h-2v4H9v2h4v4h2v-4h4V9h-4z"},"1")],"AddToPhotosTwoTone");je=ne.default=oo;var se={},no=J;Object.defineProperty(se,"__esModule",{value:!0});var Re=se.default=void 0,so=no(K()),Pe=r,ro=(0,so.default)([(0,Pe.jsx)("path",{d:"M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm-2 13-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",opacity:".3"},"0"),(0,Pe.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"},"1")],"CheckCircleTwoTone");Re=se.default=ro;var re={},ao=J;Object.defineProperty(re,"__esModule",{value:!0});var Ie=re.default=void 0,io=ao(K()),Me=r,co=(0,io.default)([(0,Me.jsx)("path",{d:"M3 12v2h8.77l-1.11 5.34L15 15V5H6z",opacity:".3"},"0"),(0,Me.jsx)("path",{d:"M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5c0-1.1-.9-2-2-2zm0 12-4.34 4.34L11.77 14H3v-2l3-7h9v10zm4-12h4v12h-4z"},"1")],"ThumbDownAltTwoTone");Ie=re.default=co;var ae={},lo=J;Object.defineProperty(ae,"__esModule",{value:!0});var Ae=ae.default=void 0,uo=lo(K()),po=r,fo=(0,uo.default)((0,po.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckCircle");Ae=ae.default=fo;function bo(e){const{formdatos:t,setFormdatos:o}=T.useContext(W),[n,s]=T.useState(!0),u=e.label,p=m=>{(m.key==="Enter"||m.key==="Tab")&&v(m)},v=m=>{const i=e.pattern,f=e.id,{value:l}=m.target,C=i,k=new RegExp(C).test(l);s(k),s(l.length>0&&l.length<=e.maxLength),k&&o({...t,[f]:l,datoserroneos:!k})};return r.jsx(nt,{...e,label:u,inputProps:{"data-testid":`validated-textfield-${u}`},InputProps:{startAdornment:n?r.jsx(Ae,{color:"success"}):r.jsx(Ie,{color:"error"})},onKeyDown:p})}function mo(e){return new Promise(function(){setTimeout(()=>{const{ProveedoresDesc:t,ProveedoresTipo:o,ProveedoresCUIT:n,ProveedoresCalle:s,ProveedoresNroCalle:u,ProveedoresPiso:p,ProveedoresDto:v,ProveedoresCodPos:m,ProveedoresLoc:i,ProveedoresPcia:f,ProveedoresTel:l,ProveedoresContacto:C,ProveedoresMail:k,ProveedoresWeb:x,ProveedoresCodMon:P}=e,M=g+"/proveedoresagregar";h.post(M).set("Content-Type","application/json").send({provdesc:t}).send({provtipo:o}).send({provcuit:n}).send({provcalle:s}).send({provnrocalle:u}).send({provpiso:p}).send({provdto:v}).send({provcodpostal:m}).send({provlocalidad:i}).send({provprovincia:f}).send({provtelefono:l}).send({provcontacto:C}).send({provmail:k}).send({provpagweb:x}).send({provcodmon:P}).then(b=>{c(b)}).catch(b=>{c(b)})},500)})}function vo(e){return new Promise(function(){setTimeout(()=>{const{id:t,StkMonedasDescripcion:o,StkMonedasCotizacion:n,StkMonedasSigno:s}=e,u=g+"/stkmonedasagregar";h.post(u).set("Content-Type","application/json").send({idStkMonedas:t}).send({StkMonedasDescripcion:o}).send({StkMonedasCotizacion:n}).send({StkMonedasSigno:s}).set("X-API-Key","foobar").then(function(p){c(p)}).catch(p=>c(p))},500)})}function Co(e){return new Promise(function(){setTimeout(()=>{const{TransporteDesc:t,TransporteTel1:o,TransporteTel2:n,TransporteWA:s,TransporteMail:u,TransporteDom:p,TransporteLoc:v,TransporteDestino:m,TransporteObser:i}=e,f=g+"/transporteagregar";h.post(f).set("Content-Type","application/json").send({transdesc:t}).send({transtel1:o}).send({transtel2:n}).send({transwa:s}).send({transnromail:u}).send({transdom:p}).send({transloc:v}).send({transdestino:m}).send({transobser:i}).set("X-API-Key","foobar").then(l=>{c(l)}).catch(l=>{c(l)})},1e3)})}function ho(e){return new Promise(function(){setTimeout(()=>{const{StkGrupoAbr:t,StkGrupoDesc:o}=e,n=g+"/stkgrupoagregar";h.post(n).set("Content-Type","application/json").send({StkGrupoDesc:o}).send({StkGrupoAbr:t}).send({StkGrupoContRubro:0}).set("X-API-Key","foobar").then(s=>{c(s)}).catch(s=>{c(s)})},500)})}function go(e){return new Promise(function(t){const{StkRubroCodGrp:o,StkRubroDesc:n,StkRubroAbr:s,StkRubroProv:u,StkRubroAncho:p,StkRubroPresDes:v,StkRubroPres:m,StkRubroUM:i,StkRubroCosto:f,StkRubroTM:l,StkRubroConf:C,StkRubroFecha:k,ItemsSN:x}=e;async function P(){var b=g+"/stkrubroleeultnro/?id="+o;await h.get(b).set("Content-Type","application/json").then(a=>{const A=JSON.parse(a.text)[0].CodRubroNuevo;M(A)})}async function M(b){const a=g+"/stkrubroagregar/";h.post(a).set("Content-Type","application/json").send({idStkRubro:b}).send({StkRubroCodGrp:o}).send({StkRubroDesc:n}).send({StkRubroAbr:s}).send({StkRubroProv:u}).send({StkRubroAncho:p}).send({StkRubroPresDes:v}).send({StkRubroPres:m}).send({StkRubroUM:i}).send({StkRubroCosto:f}).send({StkRubroTM:l}).send({StkRubroConf:C}).send({StkRubroFecha:k}).send({ItemsSN:x}).then(S=>{c(S)}).catch(S=>{c(S)}),t()}P()})}function ko(e){return new Promise(function(){setTimeout(()=>{const{StkItemsRubroAbr:t,StkItemsDesc:o,StkItemsOTD:n,StkItemsCantidad:s,StkItemsFAct:u,StkItemsMin:p,StkItemsMax:v}=e,m=codigonuevo[1][0].StkItemsGrupo,i=codigonuevo[1][0].StkItemsRubro,f=codigonuevo[0][0].UltItem,l=g+"/stkitemsagregar/";h.post(l).set("Content-Type","application/json").send({idStkItems:f+1}).send({StkItemsGrupo:m}).send({StkItemsRubro:i}).send({StkItemsRubroAbr:t}).send({StkItemsDesc:o}).send({StkItemsOTD:n}).send({StkItemsCantidad:s}).send({StkItemsFAct:u}).send({StkItemsMin:p}).send({StkItemsMax:v}).then(C=>{c(C)}).catch(C=>{c(C)})},500)})}function So(e){const{StkUnMedDesc:t,id:o}=e,n=g+"/stkunmedagregar";h.post(n).set("Content-Type","application/json").send({idStkUnMed:o}).send({StkUnMedDesc:t}).set("X-API-Key","foobar").then(s=>{c(s)}).catch(s=>{c(s)})}function To(e){const{PresupDetPieLeyenda:t}=e,o=g+"/presupdetpieagregar";h.post(o).set("Content-Type","application/json").send({PresupDetPieLeyenda:t}).set("X-API-Key","foobar").then(n=>{c(n)}).catch(n=>{c(n)})}function Po(e){return new Promise(t=>{setTimeout(()=>{e.tablabase==="Proveedores"&&mo(e),e.tablabase==="Monedas"&&vo(e),e.tablabase==="Transportes"&&Co(e),e.tablabase==="Grupos"&&ho(e),e.tablabase==="Rubros"&&go(e),e.tablabase==="UniMedidas"&&So(e),e.tablabase==="Items"&&ko(e),e.tablabase==="PresupDetPie"&&To(e),t(50)},500)})}function Mo(e){return new Promise(function(){const t=g+"/proveedoresborrar/"+e;h.delete(t).set("Content-Type","application/json").then(function(o){c(o)}).catch(o=>c(o))})}function xo(e){const t=g+"/stkmonedasborrar/?id="+e;h.delete(t).set("Content-Type","application/json").then(function(o){c(o)}).catch(o=>c(o))}function yo(e){const t=g+"/transporteborrar/?id="+e;h.delete(t).set("Content-Type","application/json").then(function(o){c(o)}).catch(o=>c(o)).finally(o=>{console.log("termino  ",o)})}function jo(e){const t=g+"/stkgrupoborrar/"+e;h.delete(t).set("Content-Type","application/json").then(function(o){c(o)}).catch(o=>c(o))}function Ro(e){return new Promise(function(t){const{idStkRubro:o,StkRubroCodGrp:n}=e;var s=g+"/stkrubroborrar/?idStkRubro="+o+"&StkRubroCodGrp="+n;h.get(s).set("Content-Type","application/json").then(function(u){c(u)}).catch(u=>c(u)),t()})}function Io(e){return new Promise(function(){const{idStkItems:t,StkItemsGrupo:o,StkItemsRubro:n}=e;var s=g+"/stkitemsborrar/?idStkItems="+t+"&StkItemsGrupo="+o+"&StkItemsRubro="+n;h.delete(s).set("Content-Type","application/json").then(function(u){c(u)}).catch(u=>c(u))})}function Ao(e){const t=g+"/stkunmedborrar/"+e;h.delete(t).set("Content-Type","application/json").then(function(o){c(o)}).catch(o=>c(o))}function wo(e){const t=g+"/presupdetpieborrar/"+e;h.delete(t).set("Content-Type","application/json").then(function(o){c(o)}).catch(o=>c(o))}function Lo(e,t){return new Promise(o=>{setTimeout(()=>{t.tablabase==="Proveedores"&&Mo(e),t.tablabase==="Monedas"&&xo(e),t.tablabase==="Transportes"&&yo(e),t.tablabase==="Grupos"&&jo(e),t.tablabase==="Rubros"&&Ro(e),t.tablabase==="Items"&&Io(e),t.tablabase==="UniMedidas"&&Ao(e),t.tablabase==="PresupDetPie"&&wo(e),o(50)},500)})}function Oo(e){const{formdatos:t,setFormdatos:o}=T.useContext(W),{datoborrado:n,setDatoborrado:s}=T.useContext(W),[u,p]=L.useState(""),{open:v,handleClose:m,columns:i,nombrebtn:f,paramsbor:l,titulodial:C}=e,[k,x]=T.useState({error:!1,message:""}),P=b=>{p(b.target.value),o({...t,[b.target.id]:b.target.value})},M=b=>{b.preventDefault(),setTimeout(()=>{if(f==="Enviar")Po(t);else{let a=Lo(l.id,t);s(a)}},1e3)};return r.jsxs(Qe,{open:v,onClose:m,children:[r.jsx(Ye,{children:C}),r.jsx("b",{}),r.jsx(We,{children:r.jsxs("form",{onSubmit:M,children:[r.jsx(Ge,{container:!0,spacing:2,alignItems:"center",children:i&&i.slice(length).map((b,a)=>(i[a].editable,i[a].type!=="singleSelect"&&r.jsx(bo,{id:i[a].field,label:i[a].headerName,color:i[a].color,autoFocus:!0,value:l[i[a].field],required:i[a].required,type:i[a].type,margin:"dense",variant:"outlined",error:k.error,maxLength:i[a].maxLength,placeholder:i[a].placeholder,campo:i[a].field,pattern:i[a].pattern,alignitems:i[a].alignItems},a)||r.jsxs("select",{id:i[a].field,label:i[a].headerName,variant:"outlined",defaultValue:l[i[a].field],required:i[a].required,onChange:P,children:[r.jsx("option",{value:"",children:i[a].headerName},""),i[a].valueOptions.map(S=>r.jsx("option",{value:S.value,children:S.label},S.value))]},a)))}),r.jsx(Ce,{type:"submit",variant:"outlined",sx:{mt:2},children:f}),r.jsx(Ce,{onClick:m,variant:"outlined",sx:{mt:2},children:"Cerrar"})]})})]})}L.createContext();function Fo(e){var ue;const{rows1:t,columns1:o,formdatos:n}=e,{datoborrado:s,setDatoborrado:u}=T.useContext(W),[p,v]=T.useState(!1),[m,i]=T.useState([]),[f,l]=T.useState([]),[C,k]=T.useState(""),[x,P]=T.useState(""),[M,b]=T.useState(0);T.useEffect(()=>{a()},[t,o]);async function a(){S(),A()}async function S(){var d=o;i(()=>d)}async function A(){var d=t;l(d)}const[D,w]=L.useState(!1),[z,N]=T.useState(),[B,j]=T.useState(),[R,$]=T.useState(),G=()=>{v(!1)};async function E(){if(n.tablabase==="Transportes"){const d=await _t();l(d)}if(n.tablabase==="Clientes"){const d=await Ue();l(d)}if(n.tablabase==="Monedas"){const d=await Bt();l(d)}if(n.tablabase==="PresupConfTipo"){const d=await Ut();l(d)}if(n.tablabase==="PresupDetPie"){const d=await He();l(d)}if(n.tablabase==="Proveedores"){const d=await Fe();l(d)}if(n.tablabase==="Grupos"){const d=await Ve();l(d)}if(n.tablabase==="Rubros"){const d=await qt();l(d)}if(n.tablabase==="Items"){const d=await Jt();l(d)}if(n.tablabase==="UniMedidas"){const d=await Zt();l(d)}if(n.tablabase==="UbiFisica"){const d=await Yt();l(d)}}const U=()=>{E(),s!==0&&l(f.filter(d=>d.id!==M.id)),w(!1)},H=()=>{k("Enviar"),P(`Alta de ${n.tablabase}`),w(!0)},F=d=>{setTimeout(()=>{n.tablabase==="Transportes"&&Et(d),n.tablabase==="Clientes"&&Nt(d),n.tablabase==="Monedas"&&Gt(d),n.tablabase==="PresupConfTipo"&&Ht(d),n.tablabase==="PresupDetPie"&&Ft(d),n.tablabase==="Proveedores"&&Vt(d),n.tablabase==="Grupos"&&Wt(d),n.tablabase==="Rubros"&&Kt(d),n.tablabase==="Items"&&Xt(d),n.tablabase==="UniMedidas"&&Qt(d),E()},100)},we=()=>{u(0),k("Borrar"),P("BORRA ESTE DATO!!!!!"),b(R),w(!0)},ie=L.useCallback(d=>new Promise((Z,Q)=>{setTimeout(()=>{var de,pe;((de=d.name)==null?void 0:de.trim())===""?Q(new Error("Error el campo no puede estar vacío")):Z({...d,name:(pe=d.name)==null?void 0:pe.toUpperCase()})},200)}),[]),Le=L.useCallback(async(d,Z)=>{j(d),N(Z);const Q=await ie(d);return X({children:"Modificado no confirmado",severity:"success"}),Q},[ie]),Oe=({row:d})=>{$(d)},[ce,X]=L.useState(null),le=()=>X(null),De=L.useCallback(d=>{X({children:d.message,severity:"error"})},[]);function ze(){return r.jsxs(tt,{className:I.tablasgenerales,children:[r.jsx(qe,{className:I.coloropcioncol}),r.jsx(Ke,{className:I.coloropcioncol}),r.jsx(Je,{className:I.coloropcioncol}),r.jsx(ct,{className:I.coloropcioncol}),n.tablabase!=="MuestraPresupuesto"&&r.jsxs(L.Fragment,{children:[r.jsx(je,{className:I.iconoagregar,size:"large",titleAccess:"Agregar",onClick:()=>H()}),r.jsx(Re,{variant:"contained",titleAccess:"Confirma Modificación",className:I.iconomodificar,onClick:()=>F(B)})]})||r.jsx(Xe,{onClick:()=>F(R.id),className:I.iconomodificar,titleAccess:"Ve datos Presupuesto"}),r.jsx(ot,{onClick:()=>v(!0),className:I.iconoimpresora,titleAccess:"Imprimir"}),r.jsx(Ze,{variant:"contained",titleAccess:"Borrar",className:I.iconoborrar,onClick:()=>we()})]})}return r.jsxs(r.Fragment,{children:[r.jsx(it,{rows:f,columns:m,localeText:et.components.MuiDataGrid.defaultProps.localeText,processRowUpdate:Le,onRowClick:Oe,onProcessRowUpdateError:De,showCellVerticalBorder:!0,columnHeaderHeight:35,slots:{toolbar:ze},initialState:{...f.initialState,pagination:{...(ue=f.initialState)==null?void 0:ue.pagination,paginationModel:{pageSize:25}}}}),r.jsx(Oo,{open:D,columns:m,handleClose:U,nombrebtn:C,paramsbor:M,titulodial:x}),r.jsx(st,{columns:m,datos:f,open:p,setOpen:v,handleClose:G}),!!ce&&r.jsx($t,{open:!0,anchorOrigin:{vertical:"bottom",horizontal:"center"},onClose:le,autoHideDuration:900,children:r.jsx(St,{...ce,variant:"filled",onClose:le})})]})}export{Ut as P,Zt as S,Fo as T,_t as a,Jt as b,Yt as c,Bt as l,qt as s};