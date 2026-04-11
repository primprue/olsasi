import React from 'react';
import { createSvgIcon } from '@mui/material/utils';

// Icono 1: Reorder (el que ya tienes)
export const RecargaIcon = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 16a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -2" />
            <path d="M10 16a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -2" />
            <path d="M17 16a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -2" />
            <path d="M5 11v-3a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v3" />
            <path d="M16.5 8.5l2.5 2.5l2.5 -2.5" />
        </g>
    </React.Fragment>,
    'RecargaIcon'
);

// Icono 2: Ejemplo (supongamos un icono de Check personalizado)
export const BorrarIcono = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </g>
    </React.Fragment>,
    'BorrarIcono'
);

// Icono 3: Ejemplo (supongamos un icono de Alerta)
export const CustomAlertIcon = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
        <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
    </React.Fragment>,
    'CustomAlertIcon'
);



export const AgregarIcon = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <g
            fill="none"
            stroke="#48a40a"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 9h8" />
            <path d="M8 13h6" />
            <path d="M12.5 20.5l-.5 .5l-3 -3h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5" />
            <path d="M16 19h6" />
            <path d="M19 16v6" />
        </g>
    </React.Fragment>,
    'AgregarIcon'
);


export const EstadIcons = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <g
            fill="none"
            stroke="#0aa49a"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -6" />
            <path d="M9 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -10" />
            <path d="M15 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -14" />
            <path d="M4 20h14" />

        </g>
    </React.Fragment>,
    'EstadIcons'
);

export const CierreCajaIcon = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <g
            fill="none"
            stroke="#fb1d04"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
        >

            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 10h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
            <path d="M12 9v1" /><path d="M12 16v1" />
            <path d="M17 4v1.882c0 .685 .387 1.312 1 1.618s1 .933 1 1.618v8.882a3 3 0 0 1 -3 3h-8a3 3 0 0 1 -3 -3v-8.882c0 -.685 .387 -1.312 1 -1.618s1 -.933 1 -1.618v-1.882" />
            <path d="M6 4h12l-12 0" />

        </g>
    </React.Fragment>,
    'CierreCajaIcon'
);


export const HistorialIcon = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <g
            fill="none"
            stroke='#bdc009f9'
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
        >

            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 8l0 4l2 2" />
            <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />

        </g>
    </React.Fragment>,
    'HistorialIcon'
);


// export const GrabarIcon = createSvgIcon(
//     <React.Fragment>
//         <path stroke="none" d="M0 0h24v24H0z" fill="none" />

//         <g
//             width="24"
//             height="24"
//             fill="none" stroke='#790566fb'
//             viewBox="0 0 24 24"
//             stroke-width="1.25"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//         >
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <path d="M8 12l4 4l4 -4" />
//             <path d="M12 8v8" />
//             <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14" />

//         </g>
//     </React.Fragment>,
//     'GrabarIcon'
// );


export const GrabarIcon = createSvgIcon(
    <React.Fragment>
        {/* Fondo transparente para el área de click */}
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />

        <g
            fill="none"
            stroke="#790566fb"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M8 12l4 4l4 -4" />
            <path d="M12 8v8" />
            <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14" />
        </g>
    </React.Fragment>,
    'GrabarIcon'
);

export const AgregaInsIcon = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <g
            fill="none"
            stroke='#0703f8e6'
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 5.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666" />
            <path d="M4.012 7.26a2.005 2.005 0 0 0 -1.012 1.737v10c0 1.1 .9 2 2 2h10c.75 0 1.158 -.385 1.5 -1" />
            <path d="M11 7h5" />
            <path d="M11 10h6" />
            <path d="M11 13h3" />

        </g>
    </React.Fragment>,
    'AgregaInsIcon'
);



export const TresProsVerIcons = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <g

            fill="none"
            stroke='#121212'
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M11 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M11 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />

        </g>
    </React.Fragment>,
    'TresProsVerIcons'
);






export const CajaIcons = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <g

            fill="none"
            stroke='#fc00fc'
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 11v.01" />
            <path d="M5.173 8.378a3 3 0 1 1 4.656 -1.377" />
            <path d="M16 4v3.803a6.019 6.019 0 0 1 2.658 3.197h1.341a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-1.342c-.336 .95 -.907 1.8 -1.658 2.473v2.027a1.5 1.5 0 0 1 -3 0v-.583a6.04 6.04 0 0 1 -1 .083h-4a6.04 6.04 0 0 1 -1 -.083v.583a1.5 1.5 0 0 1 -3 0v-2l0 -.027a6 6 0 0 1 4 -10.473h2.5l4.5 -3" />


        </g>
    </React.Fragment>,
    'CajaIcons'
);





export const ListaIcons = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <g

            fill="none"
            stroke='#055af8'
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 20h3" /><path d="M17 20h3" />
            <path d="M10.5 20h3" /><path d="M4 16h3" />
            <path d="M17 16h3" /><path d="M10.5 16h3" />
            <path d="M4 12h3" /><path d="M17 12h3" />
            <path d="M10.5 12h3" />
            <path d="M4 8h3" />
            <path d="M17 8h3" />
            <path d="M4 4h3" />
        </g>
    </React.Fragment>,
    'ListaIcons'
);




export const HomeIcons = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <g

            fill="none"
            stroke='#03d403'
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 9l-6 -6l-9 9h2v7a2 2 0 0 0 2 2h3.5" />
            <path d="M9 21v-6a2 2 0 0 1 2 -2h2" />
            <path d="M16 17.5l-.585 -.578a1.516 1.516 0 0 0 -2 0c-.477 .433 -.551 1.112 -.177 1.622l1.762 2.456c.37 .506 1.331 1 2 1h3c1.009 0 1.497 -.683 1.622 -1.593c.252 -.938 .378 -1.74 .378 -2.407c0 -1 -.939 -1.843 -2 -2h-1v-2.636c0 -.754 -.672 -1.364 -1.5 -1.364s-1.5 .61 -1.5 1.364v4.136" />

        </g>
    </React.Fragment>,
    'HomeIcons'
);



export const PresupIcons = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <g

            fill="none"
            stroke='#f51808f4'
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M13 21h-7a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3" />
            <path d="M16 3v4" />
            <path d="M8 3v4" />
            <path d="M4 11h12.5" />
            <path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
            <path d="M19 21v1m0 -8v1" />
        </g>
    </React.Fragment>,
    'PresupIcons'
);


export const ReparacionIcons = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <g

            fill="none"
            stroke='#1d5f09'
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5" />
        </g>
    </React.Fragment>,
    'ReparacionIcons'
);




export const StockIcons = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <g

            fill="none"
            stroke='#f86605'
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 3h1a2 2 0 0 1 2 2v10a2 2 0 0 0 2 2h15" />
            <path d="M9 9a3 3 0 0 1 3 -3h4a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-4a3 3 0 0 1 -3 -3l0 -2" />
            <path d="M7 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M16 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        </g>
    </React.Fragment>,
    'StockIcons'
);



export const OrdTrabIcons = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <g

            fill="none"
            stroke='#050463'
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 7a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -10" />
            <path d="M7 10a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M15 8l2 0" />
            <path d="M15 12l2 0" />
            <path d="M7 16l10 0" />
        </g>
    </React.Fragment>,
    'OrdTrabIcons'
);



export const BalanceIcons = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <g

            fill="none"
            stroke='#07c2a9cc'
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 20l10 0" />
            <path d="M6 6l6 -1l6 1" />
            <path d="M12 3l0 17" />
            <path d="M9 12l-3 -6l-3 6a3 3 0 0 0 6 0" />
            <path d="M21 12l-3 -6l-3 6a3 3 0 0 0 6 0" />

        </g>
    </React.Fragment>,
    'BalanceIcons'
);




export const TablasIcons = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <g

            fill="none"
            stroke='#c52c11'
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 13v-8a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8" />
            <path d="M3 10h18" />
            <path d="M10 3v11" />
            <path d="M2 22l5 -5" />
            <path d="M7 21.5v-4.5h-4.5" />


        </g>
    </React.Fragment>,
    'TablasIcons'
);