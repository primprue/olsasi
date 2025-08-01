// import { Box, Typography } from '@mui/material';

// export default function TextoPesos({ value, label, variant = 'body1', color = 'inherit' }) {
//     const formatear = (val) =>
//         new Intl.NumberFormat('es-AR', {
//             style: 'currency',
//             currency: 'ARS',
//             minimumFractionDigits: 2,
//         }).format(val);

//     return (
//         <Typography variant={variant} component="div">
//             <Box display="flex" justifyContent="space-between" width="100%">
//                 <span style={{ color }}>{label} :&nbsp;&nbsp;   </span>
//                 <span style={{ color }}>{formatear(value)}</span>
//             </Box>
//         </Typography>

//     );
// }


import { Box, Typography } from '@mui/material';

export default function TextoPesos({ value, label, variant = 'body1', color = 'inherit', fontSize }) {
    const formatear = (val) =>
        new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
        }).format(val);

    return (
        <Typography variant={variant} component="div">
            <Box display="flex" justifyContent="space-between" width="100%">
                <span style={{ color, fontSize }}>{label} :&nbsp;&nbsp;</span>
                <span style={{ color, fontSize }}>{formatear(value)}</span>
            </Box>
        </Typography>
    );
}
