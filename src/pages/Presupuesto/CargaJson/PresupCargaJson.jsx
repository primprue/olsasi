import { Box, Button, IconButton, MenuItem, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import guardarConfiguracionEnDB from "./guardarConfiguracionEnDB.jsx";

function PresupCargaJson() {
  const [campos, setCampos] = useState([
    { nombre: '', tipo: 'text', label: '', opciones: '', data_source: '' }
  ]);

  // Función para añadir un nuevo campo a la fila
  const agregarCampo = () => {
    setCampos([...campos, { nombre: '', tipo: 'text', label: '', opciones: '', data_source: '' }]);
  };

  // Función para actualizar una propiedad de un campo específico
  const manejarCambioCampo = (index, propiedad, valor) => {
    const nuevosCampos = [...campos];
    nuevosCampos[index][propiedad] = valor;
    setCampos(nuevosCampos);
  };
  return (
    <>
      <div>PresupCargaJson</div>
      <Box p={3}>
        <Typography variant="h5">Configurador de Tipo de Presupuesto</Typography>

        {campos.map((campo, index) => (
          <Paper key={index} sx={{ p: 2, mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
            {/* Etiqueta que verá el usuario */}
            <TextField
              label="Etiqueta (Label)"
              value={campo.label}
              onChange={(e) => manejarCambioCampo(index, 'label', e.target.value)}
            />

            {/* Nombre interno (columna JSON) */}
            <TextField
              label="Nombre Variable (id)"
              value={campo.nombre}
              onChange={(e) => manejarCambioCampo(index, 'nombre', e.target.value)}
            />

            {/* Selector de tipo de input */}
            <TextField
              select
              label="Tipo"
              value={campo.tipo}
              onChange={(e) => manejarCambioCampo(index, 'tipo', e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="text">Texto</MenuItem>
              <MenuItem value="number">Número</MenuItem>
              <MenuItem value="select_estatico">Lista Fija</MenuItem>
              <MenuItem value="select_dinamico">Lista de Base de Datos</MenuItem>
            </TextField>

            {/* Mostrar configuración extra según el tipo seleccionado */}
            {campo.tipo === 'select_dinamico' && (
              <TextField
                label="Endpoint (API)"
                placeholder="/api/catalogo/colores"
                value={campo.data_source}
                onChange={(e) => manejarCambioCampo(index, 'data_source', e.target.value)}
              />
            )}

            <IconButton onClick={() => setCampos(campos.filter((_, i) => i !== index))}>
              <FolderDeleteIcon color="error" />
            </IconButton>
          </Paper>
        ))}

        <Button variant="outlined" onClick={agregarCampo} sx={{ mt: 2 }}>
          + Añadir Campo
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={guardarConfiguracionEnDB(campos)}
          sx={{ mt: 2, ml: 2 }}
        >
          Guardar en MySQL
        </Button>
      </Box>
    </>
  )
}

export default PresupCargaJson