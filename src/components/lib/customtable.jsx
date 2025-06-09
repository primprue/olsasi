import {
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
} from '@mui/x-data-grid';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton
                sx={{
                    color: 'rgb(250, 11, 11)',
                    '&:hover': {
                        backgroundColor: '#ffe0e0',
                    },
                }}
            />
            <GridToolbarFilterButton
                sx={{
                    color: 'rgb(250, 11, 11)',
                    '&:hover': {
                        backgroundColor: '#ffe0e0',
                    },
                }}
            />
            <GridToolbarDensitySelector
                sx={{
                    color: 'rgb(250, 11, 11)',
                    '&:hover': {
                        backgroundColor: '#ffe0e0',
                    },
                }}
            />
            <GridToolbarExport
                sx={{
                    color: 'rgb(250, 11, 11)',
                    '&:hover': {
                        backgroundColor: '#ffe0e0',
                    },
                }}
            />
        </GridToolbarContainer>
    );
}
