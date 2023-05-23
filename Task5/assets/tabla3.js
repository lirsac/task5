
const app2 = Vue.createApp({
  data() {
    return {
      eventosPasados: [],
      categoriasPasadas: [],
    };
  },
  mounted() {
    const url = "https://mindhub-xj03.onrender.com/api/amazing"
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const currentDate = new Date(data.currentDate);
        const eventosPasados = data.events.filter(
          (evento) => new Date(evento.date) < currentDate
        );
        this.eventosPasados = eventosPasados;
        this.categoriasPasadas = this.obtenerCategorias(eventosPasados);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  },
  methods: {
    calculateRevenuesForCategoryPasado(categoria) {
      const eventosCategoria = this.eventosPasados.filter(
        (evento) => evento.category === categoria
      );
      const totalRevenues = eventosCategoria.reduce((sum, evento) => {
        if (evento.assistance && evento.price) {
          return sum + parseFloat(evento.assistance) * parseFloat(evento.price);
        }
        return sum;
      }, 0);
      return `$${totalRevenues.toLocaleString()}`;
    },
    calculateAttendancePercentageForCategoryPasado(categoria) {
      const eventosCategoria = this.eventosPasados.filter(
        (evento) => evento.category === categoria
      );
      const capacidadTotal = eventosCategoria.reduce(
        (sum, evento) => sum + parseFloat(evento.capacity),
        0
      );
      const totalAttendance = eventosCategoria.reduce(
        (sum, evento) => sum + parseFloat(evento.assistance || 0),
        0
      );
      const promedioAsistencia =
        (totalAttendance / capacidadTotal) * 100 || 0; 
      return `${promedioAsistencia.toFixed(2)}%`;
    },
    obtenerCategorias(eventos) {
      const categoriasSet = new Set();
      eventos.forEach((evento) => {
        categoriasSet.add(evento.category);
      });
      return Array.from(categoriasSet);
    },
  },
});

app2.mount("#app2");
