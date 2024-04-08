import React, { Component } from "react";
// import request from "superagent";

// import IpServidor from "../VariablesDeEntorno";
import Button from "@material-ui/core/Button";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableRow from "@material-ui/core/TableRow";
// import TableHead from "@material-ui/core/TableHead";
import { withStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import CodigoError from "../../../lib/CodigoError";
// import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 100,
    maxWidth: 400,
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
});

// const CustomTableCell = withStyles(theme => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white
//   },
//   body: {
//     fontSize: 14
//   }
// }))(TableCell);

// const TipoConfeccion = [
//   {
//     indiceconf: 1,
//     detalle: "Por Unidad"
//   },
//   {
//     indiceconf: 2,
//     detalle: "Paño Unido"
//   },
//   {
//     indiceconf: 3,
//     detalle: "Con Fajas"
//   },
//   {
//     indiceconf: 4,
//     detalle: "Con Dobladillo"
//   },
//   {
//     indiceconf: 5,
//     detalle: "Enrollable"
//   },
//   {
//     indiceconf: 6,
//     detalle: "Con Ojales cada :"
//   }
// ];

class PresupPant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stkrubro: [],
      renglon: [],
      open: true,
      Cliente: "",
      cantidad: 1.0,
      datoscalculo: "",
    };
  }

  imprime = () => {
    var datoscalculo =
      "^XA" +
      "^FO100,10" +
      "^BQ,2,10,H,5" +
      "^FDQA,esto es así^FS" +
      "^CFf" +
      "^CF0,30" +
      "^FO450,25" +
      "^FD cualquier texto^FS" +
      "^FO450,55" +
      "^FH_ ^FD así ni_a4o ser_a0 2^FS" +
      "^XZ";
    console.log(datoscalculo);
    //el comando en el sistema es : lpr -P Zebra_GK420t nombre del archivo
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };
  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogActions>
            <Button
              id="button--submit"
              onClick={this.imprime("lpr")}
              color="primary"
              variant="contained"
            >
              Imprime QR
            </Button>
          </DialogActions>
          <div className="article-content">
            {document.write("datoscalculo")}
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PresupPant);
