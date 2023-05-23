const app = Vue.createApp({
  data() {
    return {
      arrayEventos: [],
      nombreIngre: "",
      filtradosBusq: [],
      categorias: [],
      categoriaSeleccionada: [],
      evento: null,
      mayorAsistencia: "",
      menorAsistencia: "",
      mayorCapacidad: "",
      currentDate: [],
      eventos: []
    };
  },
  created() {
    const url = "https://mindhub-xj03.onrender.com/api/amazing"
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const currentDate = new Date(data.currentDate);
        const eventos = data.events.filter(
          (evento) => new Date(evento.date) < currentDate
        );
        
        this.eventos = eventos;
        

        this.calcularMayorAsistencia(eventos);
        this.calcularMenorAsistencia(eventos);
        this.calcularMayorCapacidad(eventos);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  },
  methods: {
    
    calcularMayorAsistencia(eventos) {
      const eventoMayorAsistencia = eventos.reduce((prev, current) => {
        const prevPorcentaje = (prev.assistance / prev.capacity) * 100;
        const currentPorcentaje = (current.assistance / current.capacity) * 100;
        return prevPorcentaje > currentPorcentaje ? prev : current;
      });
      this.mayorAsistencia = `${eventoMayorAsistencia.name} (${(
        (eventoMayorAsistencia.assistance /
          eventoMayorAsistencia.capacity) *
        100
      ).toFixed(2)}%)`;
    },
    calcularMenorAsistencia(eventos) {
      const eventoMenorAsistencia = eventos.reduce((prev, current) => {
        const prevPorcentaje = (prev.assistance / prev.capacity) * 100;
        const currentPorcentaje = (current.assistance / current.capacity) * 100;
        return prevPorcentaje < currentPorcentaje ? prev : current;
      });
      this.menorAsistencia = `${eventoMenorAsistencia.name} (${(
        (eventoMenorAsistencia.assistance /
          eventoMenorAsistencia.capacity) *
        100
      ).toFixed(2)}%)`;
    },
    calcularMayorCapacidad(eventos) {
      const eventoMayorCapacidad = eventos.reduce((prev, current) => {
        return prev.capacity > current.capacity ? prev : current;
      });
      this.mayorCapacidad = eventoMayorCapacidad.name;
    }
  }
});

app.mount("#app");
