
const {createApp} = Vue;

const app = createApp( {


    data(){
      return{
        arrayEventos: [],
        nombreIngre: "",
        filtradosBusq: [],
        categorias: [],
        categoriaSeleccionada: [],
        evento: [],
      }

    },

    created(){
      const urlParams = new URLSearchParams(window.location.search);
      const eventId = urlParams.get('id');
    
      const url = "https://mindhub-xj03.onrender.com/api/amazing"
      fetch(url)
      .then(response => response.json())
      .then(data => {
        const currentDate = new Date(data.currentDate);
        this.arrayEventos = data.events.filter(event => new Date(event.date) > currentDate);

        this.categorias = this.arrayEventos.map(categoria => categoria.category).filter((category, index, array) => array.indexOf(category) == index);



  })
  .catch(error => console.log(error));

    },




   methods:{
    mostrarInformacion(eventoId) {
      window.location.href = `./information.html?id=${eventoId}`;
    }
   },


   computed:{
    filtrarBusqueda() {
      if (this.categoriaSeleccionada.length === 0) {
        this.filtradosBusq = this.arrayEventos.filter(evento =>
          evento.name.toLowerCase().includes(this.nombreIngre)
        );
      } else {
        this.filtradosBusq = this.arrayEventos.filter(evento =>
          evento.name.toLowerCase().includes(this.nombreIngre) &&
          this.categoriaSeleccionada.includes(evento.category)
        );
      }
    }
      

      
   
    }

} )

app.mount("#app")
