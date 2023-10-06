//https://github.com/Borja95/crudSencilloReact/blob/master/src/App.css
import React from "react";
import { useState } from 'react';
// import logo from "./logo.svg";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  // ModalHeader,
  // ModalBody,
  FormGroup,
  // ModalFooter,
} from  "@mui/material";

const data = [
  { id: 1, personaje: "Naruto", anime: "Naruto" },
  { id: 2, personaje: "Goku", anime: "Dragon Ball" },
  { id: 3, personaje: "Kenshin Himura", anime: "Rurouni Kenshin" },
  { id: 4, personaje: "Monkey D. Luffy", anime: "One Piece" },
  { id: 5, personaje: "Edward Elric", anime: "Fullmetal Alchemist: Brotherhood"},
  { id: 6, personaje: "Seto Kaiba", anime: "Yu-Gi-Oh!" },
];
export default function Proveedores() {
// class App extends React.Component {
  const [state, setState] = useState({
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      personaje: "",
      anime: "",
    },
  })
  // state = {
  //   data: data,
  //   modalActualizar: false,
  //   modalInsertar: false,
  //   form: {
  //     id: "",
  //     personaje: "",
  //     anime: "",
  //   },
  // };

 const mostrarModalActualizar = (dato) => {
    setState({
      form: dato,
      modalActualizar: true,
    });
  };

  const  cerrarModalActualizar = () => {
    setState({ modalActualizar: false });
  };

  const mostrarModalInsertar = () => {
    setState({
      modalInsertar: true,
    });
  };

  const  cerrarModalInsertar = () => {
    setState({ modalInsertar: false });
  };

  const  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].personaje = dato.personaje;
        arreglo[contador].anime = dato.anime;
      }
      contador++;
    });
    setState({ data: arreglo, modalActualizar: false });
  };

  const  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      setState({ data: arreglo, modalActualizar: false });
    }
  };

  const  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    setState({ modalInsertar: false, data: lista });
  }

  const handleChange = (e) => {
    setState({
      form: {
        ...state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  // render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Personaje</th>
                <th>Anime</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.personaje}</td>
                  <td>{dato.anime}</td>
                  {/* <td>
                    <Button
                      color="primary"
                      onClick={() => mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> eliminar(dato)}>Eliminar</Button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={modalActualizar}>
          {/* <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader> */}

          {/* <ModalBody> */}
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Personaje: 
              </label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={handleChange}
                value={form.personaje}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Anime: 
              </label>
              <input
                className="form-control"
                name="anime"
                type="text"
                onChange={handleChange}
                value={form.anime}
              />
            </FormGroup>
          {/* </ModalBody> */}

          {/* <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter> */}
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          {/* <ModalHeader>
           <div><h3>Insertar Personaje</h3></div>
          </ModalHeader> */}

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Personaje: 
              </label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Anime: 
              </label>
              <input
                className="form-control"
                name="anime"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
// }
// export default App;