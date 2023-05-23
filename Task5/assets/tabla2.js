
const app1 = Vue.createApp({
  data() {
    return {
      eventos: [],
      categorias: [],
    };
  },
  mounted() {
    const url = "https://mindhub-xj03.onrender.com/api/amazing"
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const currentDate = new Date(data.currentDate);
        const eventosFuturos = data.events.filter(
          (evento) => new Date(evento.date) >= currentDate
        );
        this.eventos = eventosFuturos;
        this.categorias = this.obtenerCategorias(eventosFuturos);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  },
  methods: {
    
    
    obtenerCategorias(eventos) {
      let categorias = eventos.map(evento => evento.category)
    .filter((category, index, array) => array.indexOf(category) === index);
  return categorias;
    },
    calculateRevenuesForCategory(categoria) {
      const eventosCategoria = this.eventos.filter(
        (evento) => evento.category === categoria
      );
      const totalRevenues = eventosCategoria.reduce((sum, evento) => {
        if (evento.estimate && evento.price) {
          return sum + parseFloat(evento.estimate) * parseFloat(evento.price);
        }
        return sum;
      }, 0);
      return `$${totalRevenues.toLocaleString()}`;
    },
    calculateAttendancePercentageForCategory(categoria) {
      const eventosCategoria = this.eventos.filter(
        (evento) => evento.category === categoria
      );
      const capacidadTotal = eventosCategoria.reduce(
        (sum, evento) => sum + parseFloat(evento.capacity),
        0
      );
      const totalAttendance = eventosCategoria.reduce(
        (sum, evento) => sum + parseFloat(evento.estimate || 0),
        0
      );
      const promedioAsistencia =
        (totalAttendance / capacidadTotal) * 100 || 0; 
      return `${promedioAsistencia.toFixed(2)}%`;
    },
  },
});

app1.mount("#app1");
