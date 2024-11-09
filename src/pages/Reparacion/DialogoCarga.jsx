import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react'
const DialogoCarga = ({ open, handleClose, titulodialogo, inputRef, inputValue, setInputValue, inputRef2, inputValue2, setInputValue2, pidesegundovalor, primerlabel, segundolabel, botonRef, handleKeyDown, handleConfirm }) => {

    return (
        <Dialog open={open} onClose={handleClose} style={{ height: 350, width: '20%' }}>
            <DialogTitle>{titulodialogo}</DialogTitle>
            <DialogContent>
                <TextField
                    inputRef={inputRef} // Asignar la referencia al campo de texto
                    autoFocus
                    margin="dense"
                    label={primerlabel}
                    type="number"
                    fullWidth
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, inputRef2)}
                />
                {pidesegundovalor &&
                    <TextField
                        inputRef={inputRef2} // Asignar la referencia al campo de texto
                        autoFocus
                        margin="dense"
                        label={segundolabel}
                        type="number"
                        fullWidth
                        value={inputValue2}
                        onChange={(e) => setInputValue2(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, botonRef)}
                    />}
            </DialogContent>
            <DialogActions>
                <Button ref={botonRef} onClick={handleConfirm}>Confirmar</Button>
                <Button onClick={handleClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>

    )
}
export default DialogoCarga;