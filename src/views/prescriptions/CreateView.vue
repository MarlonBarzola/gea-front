<template>
  <div class="container">
    <h1 class="mb-3">Añadir prescripción para {{ user.name }}</h1>

    <ErrorsComponent :errors="errors" />

    <div class="text-end">
        <button class="btn btn-danger mb-3">
            <router-link :to="{ name: 'prescriptions-index', params: { id } }">
                Ver prescripciones
            </router-link>
        </button>
    </div>

    <div class="card mb-4">
      <form @submit.prevent="savePrescription" class="card-body">
        <div class="mb-2">
          <label for="name">Título</label>
          <br />
          <input
            class="form-control"
            v-model="prescription.title"
            id="name"
            type="text"
            placeholder="Razón de la prescripción"
          />
        </div>

        <div class="mb-2">
          <label for="description">Título</label>
          <br />
          <textarea
            class="form-control"
            v-model="prescription.description"
            id="description"
            placeholder="Descripción"
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary btn-sm">Guardar</button>
      </form>
    </div>

  </div>
</template>

<script>
import ErrorsComponent from "@/components/ErrorsComponent.vue";

export default {
  props: {
    id: {
      required: true,
      type: Number,
    },
  },

  components: { ErrorsComponent },

  data() {
    return {
      prescription: {
        title: "",
        description: "",
        user_id: this.id,
      },
      user: {},
      errors: [],
    }
  },

  created() {
    this.getUser()
  },

  methods: {

    getUser() {
      this.axios
        .get(`/users/${ this.id }`)
        .then(({ data }) => {
            this.user = data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },

    savePrescription() {
      this.axios
        .post("/prescriptions", this.prescription)
        .then(() => {
          this.prescription = {
            title: "",
            description: "",
          }
          this.errors = []
          alert("Prescripción creada correctamente")
        })
        .catch((error) => {
          console.log(error)
          this.errors = Object.values(error.response.data.errors).flat()
        })
    },
  }
  

};
</script>

<style>
    .btn a{
        color: white;
        text-decoration: none;
    }
</style>
