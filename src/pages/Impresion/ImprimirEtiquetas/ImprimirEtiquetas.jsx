import React from "react";
import request from "superagent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useContext } from "react";
import { StkMovEntradaContext } from "../../Stock/Movimientos/Entrada/StkMovEntrada";

import { initial_state } from "../../Stock/Movimientos/Entrada/Initial_State"
import { imprimirQr } from "./imprimirQR";

import IpServidor from "../../VariablesDeEntorno";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        },
        background: {
            background: "secondary",
        }
    },
}));


export default function ImprimirEtiquetas(props) {
    const classes = useStyles();
    const { state, setState } = useContext(StkMovEntradaContext);
    // const { open, handleClose, title, contentText } = props;
    const { open, handleClose } = props;

    const imprimir_etiquetas = () => {
        //esta sentencia la saqué el 8-9-2021 para empezar a cargar la mercadería sin imprimir etiquetas
        // imprimirQr(state.StkEnvaseUbG);
        setState({ ...state, impOk: true });
    };

    // Cambio el estado de las etiquetas a impreso SI
    const stkenvasecambiaimp = () => {
        const url = IpServidor + "/stkenvasecambiaimp/?id=" + state.StkEnvaseUbG;
        console.log(url);
        request
            .post(url)
            .set("Content-Type", "application/json")
            .then(() => {
            });
        setState(initial_state)
    };


    // }


    return (
        <div className={classes.root} >
            {/* Pregunto si imprimo o no ? */}
            <Dialog
                className={classes.background}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">¿ Desea Imprimir Las Etiquetas ?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {/* {contentText} */}

                        {/* Desea Imprimir? */}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="contained" onClick={imprimir_etiquetas} autoFocus>
                        SI
          </Button>
                    <Button color="secondary" variant="contained" onClick={() => setState(initial_state)} autoFocus>
                        NO
          </Button>
                </DialogActions>
            </Dialog>

            {/* Pregunto si Imprimio Bien ? */}
            <Dialog
                open={state.impOk}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">¿ Imprimió Bien ?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {/* {contentText} */}

                        {/* Imprimió bien ? */}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="contained" onClick={stkenvasecambiaimp} autoFocus>
                        SI
          </Button>

                    <Button color="secondary" variant="contained" onClick={() => setState({ ...state, imp_etiquetas: false, noImp: true, impOk: false })} autoFocus>
                        NO
          </Button>
                </DialogActions>
            </Dialog>

            {/* Si contesta que NO Pregunto si quiero Reimprimmir */}
            <Dialog
                open={state.noImp}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle color="success" id="alert-dialog-title">¿ Quiere Reimprimir ?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {/* {contentText} */}

                        {/* desea reimprimir? */}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" variant="contained" onClick={imprimir_etiquetas} autoFocus>
                        SI
          </Button>

                    <Button color="secondary" variant="contained" onClick={() => setState(initial_state)} autoFocus>
                        NO
          </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}