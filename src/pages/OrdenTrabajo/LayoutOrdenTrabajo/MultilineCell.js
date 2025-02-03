import { styled } from "@mui/system";
// esto es porque si lo pongo directamente en el componente me da un Warning
const MultilineCell = styled("span")`
  white-space: normal;
  line-height: 1.2;
  max-height: 3.6em; /* Puedes ajustar esta altura según tu necesidad */
  overflow: hidden;
`;

export default MultilineCell;