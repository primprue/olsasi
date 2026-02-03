import React from 'react';
import { createSvgIcon } from '@mui/material/utils';

// Icono 1: Reorder (el que ya tienes)
export const RecargaIcon = createSvgIcon(
    <React.Fragment>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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
            strokeWidth="2"
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
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="M9 14h6" />
            <path d="M12 17v-6" />
        </g>
    </React.Fragment>,
    'AgregarIcon'
);
