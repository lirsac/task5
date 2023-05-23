const { createApp } = Vue;

const app = createApp( {

  data() {
    return {
      arrayEventos: [],  
      evento: null, 
    }
  },

  created() {
    const url = "https://mindhub-xj03.onrender.com/api/amazing";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.arrayEventos = data.events;
        let params = new URLSearchParams(location.search);
        let idParam = params.get("id");

        this.evento = this.arrayEventos.find(evento => evento._id == idParam);
      })
      .catch((error) => console.log(error));
  },
});

app.mount("#app");
