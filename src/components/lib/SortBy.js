function sortBy(key,tipo){
    tipo === "numero"
        ?      
            this.sortByNumero(key)
        :   
        
        this.sortByTexto(key)
}

// Ordena Numeros
function  sortByNumero(key) {
        this.setState({
          monedas: this.state.monedas.sort((a, b) =>
            this.state.direction[key] === "asc" ? Number(a[key]) - Number(b[key]) : Number(b[key]) - Number(a[key])
          ),
          direction: {
            [key]: this.state.direction[key] === "asc" ? "desc" : "asc"
          }
        });
      }
      // ordena Texto
function sortByTexto(key) {
        this.setState({
          monedas: this.state.monedas.sort((a, b) =>
            // this.state.direction[key] === "asc" ? a[key].toUpperCase() < b[key].toUpperCase() : a[key].toUpperCase() > b[key].toUpperCase()
            this.state.direction[key] === "asc" 
                ?  
                    a[key] < b[key] 
                    ?
                     1
                    :
                     -1
                : 
                    a[key] > b[key]
                    ?
                    1
                   :
                    -1
          ),
          direction: {
            [key]: this.state.direction[key] === "asc" ? "desc" : "asc"
          }
        });
      }

export default SortBy;
