// CustomDataGrid.jsx
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const CustomDataGrid = ({ rows, columns, toolbar, onDeleteRow, onCellDoubleClick, onRowSelectionModelChange, id, customStyles }) => {
    const handleCellKeyDown = (params, event) => {
        if (event.key === 'Delete') { // Detectar tecla "Supr"
            onDeleteRow(id, params.id); // Llamar a la función para borrar y actualizar el totalizador
        }

    };

    const handleCellDoubleClick = (params, event) => {

        onCellDoubleClick(id, params.id); // Llamar a la función para borrar y actualizar el totalizador

    };

    return (
        <div style={{ height: 200, width: customStyles.width, paddingLeft: customStyles.paddingLeft }}>
            <DataGrid
                id={id}
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                hideFooter
                rowHeight={20}
                columnHeaderHeight={25}
                showCellVerticalBorder
                showCellHorizontalBorder
                onCellKeyDown={handleCellKeyDown}
                onCellDoubleClick={handleCellDoubleClick}
                onRowSelectionModelChange={onRowSelectionModelChange}
                slots={{
                    toolbar: toolbar,
                }}
            />
        </div>
    );
};

export default CustomDataGrid;
