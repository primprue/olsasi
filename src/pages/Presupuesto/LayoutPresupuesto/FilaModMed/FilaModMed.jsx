import React from "react";
import { Grid, Radio, RadioGroup, FormControlLabel } from "@mui/material";
// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function FilaModMed(props) {
  const [selectedValue, setSelectedValue] = React.useState("cs");
  const { state, setState } = useContext(PresupPantContext);
  const [ojalbronce, setOjalBronce] = React.useState('hz');
  const [lonanuesafu, setLonaNuesAfu] = React.useState("LN");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setState({ ...state, PresupCsSs: event.target.value });
  };

  const handleChange2 = (event) => {
    setOjalBronce(event.target.value);
    setState({ ...state, PresupOB: event.target.value });
  };

  const handleChange3 = (event) => {
    setLonaNuesAfu(event.target.value);
    setState({ ...state, PreuspLNLF: event.target.value });
  };





  return (
    <>

      <Grid item xs={2}>
        <RadioGroup
          row
          size="small"
          name="tipoDobladillo"
          value={selectedValue}
          onChange={handleChange}
          margin="dense"
        >

          <FormControlLabel
            size="small"
            value="cs"
            control={<Radio />}
            label="C/S"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"
          />
          <FormControlLabel
            size="small"
            value="ss"
            control={<Radio />}
            label="S/S"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"
          />

        </RadioGroup>
      </Grid>
      <Grid item xs={2}>
        <RadioGroup
          row
          size="small"
          name="tipoOjal"
          value={ojalbronce}
          onChange={handleChange2}
          margin="dense"
        >

          <FormControlLabel
            size="small"
            value="hz"
            control={<Radio />}
            label="HZ"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"
          />
          <FormControlLabel
            size="small"
            value="br"
            control={<Radio />}
            label="BR"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"
          />

        </RadioGroup>
      </Grid>
      <Grid item xs={2}>
        <RadioGroup
          row
          size="small"
          name="lonadeAca"
          value={lonanuesafu}
          onChange={handleChange3}
          margin="dense"
        >

          <FormControlLabel
            size="small"
            value="LN"
            control={<Radio />}
            label="LN"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"
          />
          <FormControlLabel
            size="small"
            value="LA"
            control={<Radio />}
            label="LA"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"
          />
        </RadioGroup>
      </Grid>


    </>
  );
}
