import { useState } from "react";
import { Button, Dialog, DialogContent, DialogActions } from "@mui/material";

import CustomSwitch from "../../components/comppropios/CustomSwitch";
import { ValidatedTextField } from "../../hooks/useValidTextField";
import Scanner from "../Scanear/Scanner";
import { DatosAgregar } from "../../components/DatosAgregar";

export default function MedCliAltaMed(props) {
    // Nota: Eliminamos 'open' de aquí si es que este mismo componente va a controlar su propia apertura con el botón
    const { open, handleClose, datoot } = props;
    const [openScanner, setOpenScanner] = useState(false);
    const [grabasn, setGrabasn] = useState(false);

    // 1. Creamos un estado único para todo el formulario
    const [formData, setFormData] = useState({
        FechaMedida: '',
        DetalleMedida: '',
        PatenteMedida: '',
        IdentificacionMedida: '',
        FrenteDorso: 'F' // Valor inicial por defecto para el Switch
    });

    // Estado local para abrir/cerrar el Dialog si lo manejas desde este botón
    const [openDialog, setOpenDialog] = useState(false);

    // 2. Manejador de cambios genérico
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Manejador específico para el CustomSwitch (MUI a veces no pasa el target estándar en componentes personalizados)
    const handleSwitchChange = (newValue) => {
        setFormData((prev) => ({
            ...prev,
            FrenteDorso: newValue
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        formData.NumeroClienteDC = datoot[0].NumeroClienteDC;
        formData.NombreClienteDC = datoot[0].NombreClienteDC;
        formData.NumeroOrdenDC = parseInt(datoot[0].NumeroOrdenDC) + 1;
        formData.NroClienteFacDC = datoot[0].NroClienteFacDC;
        // Aquí haces tu petición asíncrona
        setOpenScanner(true);
        // setOpenDialog(false); // Cierra el modal al terminar
        // if (handleClose) handleClose();
    };

    const grabarnuevamedida = async (formData) => {
        console.log("grabarnuevamedida");
        console.log(formData);

        // const url = IpServidor + "/medidacli/?id=" + formData.NumeroClienteDC;
        // request
        //     .get(url)
        //     .set("Content-Type", "application/json")
        //     .then((res) => {
        //         const listaprecios = JSON.parse(res.text);
        //         setGrabasn(true);
        //         setFormData(listaprecios[0]);
        //     })
        //     .catch((err) => MuestraMensaje(err));
    };
    const handleGuardarEnBaseDeDatos = async (datosDelEscaner) => {
        console.log('esta en handleGuardarEnBaseDeDatos  ', datosDelEscaner)
        formData.imagenUrl = datosDelEscaner.imagenUrl;
        console.log('esta en handleGuardarEnBaseDeDatos formData ', formData)

        try {

            await DatosAgregar(formData, 'medcliagregar')

        } catch (error) {
            console.error(error);
        } finally {
            isSaving = false; // Se libera para la próxima vez
        }
        // try {
        //     // Aquí haces tu llamada al backend/API para guardar en la BD
        //     console.log("Guardando en la BD con los datos:", datosDelEscaner);

        //     // Opcional: Cerrar el scanner después de guardar
        //     setOpenScanner(false);
        // } catch (error) {
        //     console.error("Error al guardar:", error);
        // }
    };
    return (
        <>
            {/* El Dialog debe envolver a los inputs dentro de su contenido */}
            <Dialog
                open={open}
                onClose={handleClose}>
                {/* open={openDialog} onClose={() => setOpenDialog(false)}> */}
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <label>Medida</label>
                        <ValidatedTextField
                            id="FechaMedida"
                            name="FechaMedida" // El atributo 'id' debe coincidir con la clave del estado
                            type="date"
                            label="Fecha Medida"
                            value={formData.FechaMedida}
                            onChange={handleChange}
                            width="100px"
                        />

                        <ValidatedTextField
                            id="DetalleMedida"
                            name="DetalleMedida"
                            type="text"
                            label="Detalle"
                            value={formData.DetalleMedida}
                            onChange={handleChange}
                            width="100px"
                        />
                        <CustomSwitch
                            id="FrenteDorso"
                            name="FrenteDorso"
                            value={formData.FrenteDorso}
                            // Si tu CustomSwitch devuelve directamente el valor ('F' o 'D'), usamos la función adaptada
                            onChange={handleSwitchChange}
                            opcion1={'F'}
                            opcion2={'D'}
                            titulo1={'Frente'}
                            titulo2={'Dorso'}
                        />
                        <ValidatedTextField
                            id="PatenteMedida"
                            name="PatenteMedida"
                            type="text"
                            label="Patente"
                            value={formData.PatenteMedida}
                            onChange={handleChange}
                            width="100px"
                        />
                        <ValidatedTextField
                            id="IdentificacionMedida"
                            name="IdentificacionMedida"
                            type="text"
                            label="Identificacion"
                            value={formData.IdentificacionMedida}
                            onChange={handleChange}
                            width="100px"
                        />
                    </DialogContent>

                    <DialogActions>
                        {/* <Button onClick={() => setOpenDialog(false)}>Cancelar</Button> */}
                        <Button type="submit" variant="contained" color="primary">
                            Scanear
                        </Button>
                        {/* <Button onClick={() => setOpenScanner(false)}>Cancelar</Button> */}
                        <Button onClick={() => handleClose()}>Cerrar</Button>

                    </DialogActions>
                    {openScanner &&
                        <Scanner onSave={handleGuardarEnBaseDeDatos} />}
                    {/* <Scanner datos={formData} onSave={handleGuardarEnBaseDeDatos} />} */}


                    {/* onSave={handleGuardarEnBaseDeDatos} />} */}
                    {grabasn &&
                        grabarnuevamedida(formData)
                    }
                </form>
            </Dialog >
        </>
    );
}