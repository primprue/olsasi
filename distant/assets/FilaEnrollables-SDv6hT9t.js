import{a as P,x as v,R as d,j as e,w as r}from"./index-r_yxv9AL.js";import{R as m,a as t}from"./RadioGroup-ey9wJ9fG.js";import{F as n,T as u}from"./TextField-KyvZr_kk.js";function F(l){console.log("props en fila enrollables  ",l);const{state:s,setState:i}=P.useContext(v),[c,x]=d.useState("2P"),[b,j]=d.useState("PVC05"),o=a=>{const h=a.target.id;i({...s,[h]:a.target.value})},g=a=>{j(a.target.value),i({...s,TamCristal:a.target.value})},C=a=>{x(a.target.value),i({...s,TamFaja:a.target.value})};return e.jsxs(e.Fragment,{children:[e.jsx(r,{item:!0,xs:3,children:e.jsxs(m,{row:!0,size:"small",name:"CristalSN",label:"Cristal",value:b,onChange:g,margin:"dense",children:[e.jsx(n,{size:"small",value:"PVC05",control:e.jsx(t,{}),label:"Cristal 1.35",labelPlacement:"top",disabled:l.disable,margin:"dense"}),e.jsx(n,{size:"small",value:"PVC06",control:e.jsx(t,{}),label:"Cristal 1.80",labelPlacement:"top",disabled:l.disable,margin:"dense"}),e.jsx(n,{size:"small",value:"NOPVC",control:e.jsx(t,{}),label:"s/Cristal",labelPlacement:"top",disabled:l.disable,margin:"dense"})]})}),e.jsx(r,{item:!0,xs:2,children:e.jsxs(m,{row:!0,size:"small",name:"Faja",value:c,onChange:C,margin:"dense",children:[e.jsx(n,{size:"small",value:"2P",control:e.jsx(t,{}),label:"2''",labelPlacement:"top",disabled:l.disable,margin:"dense"}),e.jsx(n,{size:"small",value:"25P",control:e.jsx(t,{}),label:"2''y 1/2",labelPlacement:"top",disabled:l.disable,margin:"dense"})]})}),e.jsx(r,{item:!0,xs:1,children:e.jsx(u,{inputProps:{maxLength:3},size:"small",variant:"outlined",id:"AltoVolado",type:"number",label:"Volado en cm :  ",fullWidth:!0,margin:"dense",value:s.AltoVolado,onChange:o})}),e.jsx(r,{item:!0,xs:1,children:e.jsx(u,{inputProps:{maxLength:3},size:"small",variant:"outlined",id:"SobranteMarco",type:"number",margin:"dense",label:"Marco en cm : ",fullWidth:!0,value:s.SobranteMarco,onChange:o})})]})}export{F as default};