import React, { Component } from "react";
import request from "superagent";
import QRCode from "qrcode.react";
import printJS from "print-js";

import IpServidor from "../VariablesDeEntorno";
// import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableHead from '@material-ui/core/TableHead';
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

const CustomTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class StkGenImpQR extends Component {
  constructor(props) {
    super();
    this.state = {
      envaseimp: [],
      stkrubro: [],
      grupostk: 0,
      rubrostk: 0,
      itemsstk: 0,
      open: true,
    };
  }

  stkenvaseleeimp = (_) => {
    const url = IpServidor + "/stkenvaseleeimp/?id=" + this.props.ubicaG;
    console.log(url);
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const envaseimp = JSON.parse(res.text);
        // this.setState({envaseimp: envaseimp})
        console.log("envaseimp dendtro de stkenvaseleeimp : ");
        console.log(envaseimp);
        this.setState(() => {
          return { envaseimp: envaseimp };
        });
      });
  };
  stkenvasecambiaimp = (_) => {
    const url = IpServidor + "/stkenvasecambiaimp/?id=" + this.props.ubicaG;
    console.log(url);
    request
      .post(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        // const envasecambiaimp = JSON.parse(res.text)
      });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
    console.log(name + " :");
    console.log(this.state[name]);
  };

  UNSAFE_componentDidMount() {
    console.log("Props = ", this.props.ubicaG);
    this.stkenvaseleeimp();
  }

  render() {
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <Paper id="mostrar">
          <Table>
            {/* <TableHead>
                <TableRow className={this.props.classes.row} >
                    <CustomTableCell className="headerFijo"  ></CustomTableCell>
                    {columns.map((row, index) => {
                        return (<CustomTableCell className="headerFijo"  key={index} onClick={() => { return row.order && this.sortBy(row.accessor) }} >{row.Header}</CustomTableCell>)
                    })
                    }
                </TableRow>
            </TableHead> */}

            <TableBody>
              {/* {this.state.envaseimp.map((option, indice) => { */}
              {this.state.envaseimp.map((option, indice) => {
                console.log(option);
                console.log(`option : ${option}`);
                console.log(`index : ${indice}`);
                console.log(`option[indice] : ${option[indice]}`);

                // console.log("Indice con this.state : "+this.state.indice)
                // console.log("Indice : "+indice)

                // const idc = `${option.idStkEnvase}`+`${option.StkEnvaseGrupo}`+`${option.StkEnvaseRubro}`+`${option.StkEnvaseItem}`
                const idc = `${option.idStkEnvase}${option.StkEnvaseGrupo}${option.StkEnvaseRubro}${option.StkEnvaseItem}`;

                console.log("idc = " + idc);
                return (
                  <TableRow key={idc}>
                    {/* <CustomTableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          // checked={option.StkEnvaseImprimio=='S'||this.state[indice]?true:false}
                          checked={this.state[idc]?true:false}
                          // checked={this.state[idc]?false:true}
                          // onChange={this.handleChange('checkedB')}
                          // onChange={this.handleChange(indice)}
                          onChange={this.handleChange(idc)}
                          // value="checkedB"
                          // value={indice}
                          value={idc}
                          color="primary"
                        />
                      }
                      // label="Secondary"
                    />
                  </CustomTableCell> */}
                    <CustomTableCell>
                      <Typography variant="body2" gutterBottom>
                        Envase : {option.idStkEnvase}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {option.StkGrupoDesc}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {option.StkRubroDesc}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {option.StkItemsDesc}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Partida : {option.StkEnvasePartida}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Cant. : {option.StkEnvaseCant}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Fecha : {option.StkEnvaseFechaAct}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Ubicación : {option.StkEnvaseUbG} --{" "}
                        {option.StkEnvaseUbF}{" "}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Observ. : {option.StkEnvaseObserv}
                      </Typography>
                    </CustomTableCell>
                    <CustomTableCell>
                      <QRCode
                        id="codigo-QR"
                        value={
                          option.StkEnvaseObserv +
                          "     " +
                          option.idStkEnvase +
                          ":" +
                          option.StkEnvaseGrupo +
                          ":" +
                          option.StkEnvaseRubro +
                          ":" +
                          option.StkEnvaseItem +
                          ": Envase Nro = " +
                          option.idStkEnvase +
                          " - " +
                          option.StkGrupoDesc +
                          " - " +
                          option.StkRubroDesc +
                          " - " +
                          option.StkItemsDesc +
                          " - Cant " +
                          option.StkEnvaseCant +
                          " - Ubic " +
                          option.StkEnvaseUbG +
                          "--" +
                          option.StkEnvaseUbF +
                          " - " +
                          option.stkenvasefecha
                          // + ' - ' + option.StkEnvaseObserv
                        }
                        style={{ width: 256 }}
                        renderAs="svg"
                      />
                    </CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            right: "25px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              printJS({
                maxWidth: 800,
                scanStyles: false,
                printable: "mostrar",
                type: "html",
              })
            }
          >
            Imprime
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.props.cancelaImpresion()}
          >
            Cancelar
          </Button>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(StkGenImpQR);
