import { Route, Routes } from "react-router-dom";
// , BrowserRouter as Router,
import React from 'react'
import Home from "./pages/Home.jsx";
// import StkMonedas from "./pages/Monedas/StkMonedas.jsx";
import Proveedores from "./pages/Stock/Proveedores/Proveedores.jsx";
import Clientes from "./pages/Clientes/Clientes.jsx";
// import Transporte from "./pages/Transporte/Transporte.jsx";
// import StkUnMed from "./pages/Stock/UnidadMedidas/StkUnMed.jsx";
// import StkRubro from "./pages/Stock/Rubros/StkRubro";
// import StkGrupo from "./pages/Stock/Grupos/StkGrupo.jsx";
// import StkUbFisica from "./pages/Stock/UbicacionFisica/StkUbFisica";
// import ListaPrecios from "./pages/ListaPrecios/ListaPrecios";
// import ModPrecios from "./pages/ListaPrecios/ModPrecios";


// import MovStockPant from "./pages/MovStock/MovStockPant.jsx";
// // import SalidaDisponible from "./pages/MovStock/LayoutMovStock/SalidaDisp/SalidaDisponible.js";
// // import PantallaIngreso from "./pages/MovStock/Ingreso/LayoutIngreso/PantallaIngreso.js";

// import StkMovEntrada from "./pages/Stock/Movimientos/Entrada/StkMovEntrada";
// // import StkMovSalida from "./pages/Stock/Movimientos/Salida/StkMovSalida";
// import StkMovSalida from "./pages/Stock/Movimientos/Salida/LayoutMovSalida/StkMovSalida";
// import ImprimeDisponible from "./pages/Stock/Movimientos/Impresion/ImprimeDisponible";
// import StkMovSalidaFinal from "./pages/Stock/Movimientos/Salida/LayoutMovSalidaFinal/StkMovSalidaFinal";
// import StkItems from "./pages/Stock/Items/StkItems";

// import PresupPant from "./pages/Presupuesto/PresupPant.jsx";
// import PresupMuestra from "./pages/Presupuesto/LayoutPresupuesto/PrespuConMod/PresupMuestra.jsx"
// import OrdenTrabajoPant from "./pages/OrdenTrabajo/OrdenTrabajoPant.jsx";
// import PresupConfTipo from "./pages/Presupuesto/PresupConfTipo/PresupConfTipo";
// import PresupDetPie from "./pages/Presupuesto/PresupDetPie/PresupDetPie";
// import ImprimeQR from "./pages/Impresion/ImprimeQR";



// import BackupDiario from "./pages/ProcInternos/BackupDiario";
// import RecuperaDatos from "./pages/ProcInternos/RecuperaDatos";


// TODO 👀📐 nothing changed here, just auto-formatting
// all this auto-formatting is coming from the Prettier extension
// https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
// and the setting "format on save"
// check out my fave extensions for vs code at https://shortcut.school/vs-code#extensions 😎

const Main = () => (
  /* para agregar un item debo agregar en :
  /home/sandra/SistOLSA/OlsaSG/src/components/Main/index.js
  /home/sandra/SistOLSA/OlsaSG/src/components/Header/Header.js
  /home/sandra/SistOLSA/OlsaSG/src/components/Header/menues.js*/
  <>
  < main >
    {/*
            Para poder usar la opción que si no encuentra la ruta especificada tire un error. tengo que usar swicth como wrapper
            de lo contrario el error se va a mostrar en todas las paginas

            <Route component={Error}/>
            uso esta ruta para cuando no coincide ninguna ruta (hay que hacer el componente Error)
        */}

    < div className="container" >
      {/* <Route path="/StkMonedas" component={StkMonedas} /> */}
<Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Proveedores" element={<Proveedores/>} />
      <Route path="/Clientes" element={Clientes} />
      </Routes>
      {/*
      <Route path="/Transporte" component={Transporte} />
      <Route path="/StkUnMed" component={StkUnMed} />

      <Route path="/StkMovSalida" component={StkMovSalida} />
      <Route path="/ImprimeDisponible" component={ImprimeDisponible} />
      <Route path="/StkMovSalidaFinal" component={StkMovSalidaFinal} />
      <Route path="/ListaPrecios" component={ListaPrecios} />
      <Route path="/PresupPant" component={PresupPant} />
      <Route path="/PresupMuestra" component={PresupMuestra} />
      <Route path="/OrdenTrabajoPant" component={OrdenTrabajoPant} />

      <Route path="/ImprimeQR" component={props => <ImprimeQR {...props} />} />
      <Route path="/StkRubro" component={StkRubro} />
      <Route path="/StkGrupo" component={StkGrupo} />
      <Route path="/StkItems" component={StkItems} />


      <Route path="/MovStockPant" component={MovStockPant} /> */}




      {/* <Route path="/StkMovEntrada" component={StkMovEntrada} />
      <Route path="/StkUbFisica" component={StkUbFisica} />
      <Route path="/PresupConfTipo" component={PresupConfTipo} />
      <Route path="/PresupDetPie" component={PresupDetPie} />
      <Route path="/ModPrecios" component={ModPrecios} />

      <Route path="/BackupDiario" component={BackupDiario} />
      <Route path="/RecuperaDatos" component={RecuperaDatos} /> */}


    </div >
  </main >
  </>
);

export default Main;
