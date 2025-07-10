import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function RowSpanningSimulada() {
    const [enabled, setEnabled] = React.useState(true);

    const rows = React.useMemo(
        () => [
            {
                id: 1,
                code: 'A101',
                description: 'Wireless Mouse',
                quantity: 2,
                unitPrice: 50,
                totalPrice: 100,
            },
            {
                id: 2,
                code: 'A102',
                description: 'Mechanical Keyboard',
                quantity: 1,
                unitPrice: 75,
            },
            {
                id: 3,
                code: 'A103',
                description: 'USB Dock Station',
                quantity: 1,
                unitPrice: 400,
            },
            {
                id: 4,
                code: 'A104',
                description: 'Laptop',
                quantity: 1,
                unitPrice: 1800,
                totalPrice: 2050,
            },
            {
                id: 5,
                code: 'A104',
                description: '- 16GB RAM Upgrade',
                quantity: 1,
                unitPrice: 100,
                totalPrice: 2050,
            },
            {
                id: 6,
                code: 'A104',
                description: '- 512GB SSD Upgrade',
                quantity: 1,
                unitPrice: 150,
                totalPrice: 2050,
            },
            {
                id: 7,
                code: 'TOTAL',
                totalPrice: 2625,
                summaryRow: true,
            },
        ],
        []
    );

    const columns = [
        {
            field: 'code',
            headerName: 'Item Code',
            width: 100,
            renderCell: (params) => {
                if (!enabled) return params.value;

                const currentIndex = rows.findIndex((r) => r.id === params.id);
                const currentRow = rows[currentIndex];
                const previousRow = rows[currentIndex - 1];

                if (previousRow && previousRow.code === currentRow.code) {
                    return ''; // Oculta valor para simular rowspan
                }

                return <strong>{params.value}</strong>;
            },
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 170,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 80,
        },
        {
            field: 'unitPrice',
            headerName: 'Unit Price',
            type: 'number',
            valueFormatter: (params) => {
                const value = params?.value ?? 0;
                return `$${value}.00`;
            }

        },
        {
            field: 'totalPrice',
            headerName: 'Total Price',
            type: 'number',
            valueGetter: (params) =>
                params.row.totalPrice ?? params.row.unitPrice,
            valueFormatter: ({ value }) => `$${value}.00`,
            cellClassName: ({ row }) => (row.summaryRow ? 'bold' : ''),
        },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <FormControlLabel
                checked={enabled}
                onChange={(event) => setEnabled(event.target.checked)}
                control={<Switch />}
                label="Simular rowSpan"
            />
            <Box sx={{ height: 400 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    density="compact"
                    showCellVerticalBorder
                    showColumnVerticalBorder
                    disableRowSelectionOnClick
                    hideFooter
                    sx={{
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: 'transparent',
                        },
                        '& .bold': {
                            fontWeight: 'bold',
                        },
                        '& .MuiDataGrid-cell': {
                            borderTop: '1px solid #ddd',
                        },
                    }}
                />
            </Box>
        </Box>
    );
}
