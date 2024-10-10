import React from 'react'

export function CreaTabla(valora, valorb) {
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
    { field: 'id', headerName: '', width: 50}, // Columna de filas
    ...columnTitles.map((num) => ({
    //   field: `col_${num}`,
    field: `${num}`,
        headerName: num.toString(),
        width: 70,
         headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        sortable: false,
        showCellVerticalBorder: true,
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
        
            NroA = 5.00 * colum;
            NroB = 5.00 * fila;
            PrimerValor = ((NroA * NroB * valora * valorb) / 100);
            SegundoValor = (NroA * NroB * valora);
            ValorParc = 0.00;
            ValorParc = ((PrimerValor - SegundoValor)/10) + ( 25.00 * valora)
            rowData[`${colNum}`] = ValorParc; // Valor de la celda
            });
            return rowData;
});

resolve([rows, columns])
})}
