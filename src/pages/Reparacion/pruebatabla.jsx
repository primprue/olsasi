import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { llenarcolumnschicotes } from './columchicotes';
import { useEffect } from 'react';

export const pruebatabla = () => {
  const apiRef = useGridApiRef();
  async function columnsChicotes() {
	var col = await llenarcolumnschicotes();
	setColChicotes(() => col);
}

async function initialFetch() {

    columnsChicotes();
    setRowsChicotes(Array.from({ length: 20 }, (_, i) => ({ id: i, cantchicote: '', medchicote: '', impchicote: '', imptchicote: '' })));
}

useEffect(() => {
initialFetch();
}, []); // eslint-disable-line react-hooks/exhaustive-deps

  const estaeditando = (params, event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Esto debería evitar el avance hacia abajo

      const nextRowId = 5; // Asegúrate de que este sea el ID de la fila (no el índice)
      const nextColumnField = 'medchicote'; // Nombre de la columna

      // Cambiar el foco a la nueva celda
      apiRef.current.setCellFocus(nextRowId, nextColumnField);
    }
  };

  const handleEditCellPropsChange = (params, event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevenir el comportamiento predeterminado aquí también
    }
  };

};
