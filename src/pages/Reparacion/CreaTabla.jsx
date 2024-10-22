import { gridClasses } from '@mui/material';
import { he } from 'date-fns/locale';
import React from 'react'

export function CreaTabla(valora) {
    return new Promise((resolve) => {
        // Definir los títulos de las columnas en múltiplos de 10
        const generateNumbers = (start, end, step) => {
            let numbers = [];
            for (let i = start; i <= end; i += step) {
                numbers.push(i);
            }
            return numbers;
        };

        const columnTitles = generateNumbers(5, 100, 5); // De 10 en 10 para las columnas
        const rowTitles = generateNumbers(5, 100, 5);    // De 10 en 10 para las filas

        // Crear columnas para el DataGrid, con identificador y título
        const columns = [
            {
                field: 'id',
                headerName: '',
                width: 50,
                sortable: false,
                showCellVerticalBorder: true,
                textAlign: "right",
                type: 'number',
                renderCell: (params) => (
                    <div style={{
                        textAlign: "right",
                        backgroundColor: '#5787e1a7',
                        color: '#1a3e72',
                        fontWeight: 'bold',
                        width: '100%',
                        height: "100%",

                    }}>
                        {params.value}
                    </div>
                ),
            }, // Columna de filas
            ...columnTitles.map((num) => ({
                renderCell: (params) => (
                    <div style={{
                        backgroundColor: '#c7e0ee3c',
                        textAlign: "right",
                        width: '100%',
                        height: '100%'
                    }}>
                        {params.value}
                    </div>
                ),

                field: `${num}`,
                headerName: num.toString(),
                width: 50,
                // textAlign: "right",
                headerAlign: 'center',
                sortable: false,
                showCellVerticalBorder: true,

                headerClassName: 'super-app-theme--header',
            }))
        ];
        let fila = 0
        let colum = 0
        let NroA = 0
        let NroB = 0
        let PrimerValor = 0
        let SegundoValor = 0
        let ValorParc = 0.00;

        // Crear las filas del DataGrid, agregando el número de la fila y los valores de cada celda
        const rows = rowTitles.map((rowNum) => {
            fila++
            let rowData = { id: rowNum }; // Primer campo es el identificador de la fila
            colum = 0
            columnTitles.forEach((colNum) => {
                colum++
                NroA = valora / 100 / 100
                NroB = NroA * fila * 5 * colum * 5
                ValorParc = 0;
                ValorParc = NroB
                // NroA = 5.00 * colum;
                // NroB = 5.00 * fila;
                // PrimerValor = ((NroA * NroB * valora * valorb) / 100);
                // SegundoValor = (NroA * NroB * valora);
                // ValorParc = 0;
                // ValorParc = ((PrimerValor - SegundoValor) / 10) + (25.00 * valora)
                rowData[`${colNum}`] = Math.round(ValorParc, 0); // Valor de la celda
            });

            return rowData;
        });

        resolve([rows, columns])
    })
}
