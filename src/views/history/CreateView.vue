<template>
  <div class="container" v-if="user">
    <h1 class="mb-3">Añadir historia clínica para {{ user.name }}</h1>

    <ErrorsComponent :errors="errors" />

    <div class="text-end" v-if="user">
        <router-link
          :to="{ name: 'patients-history', params: {id: user.id} }"
          class="btn btn-danger mb-3">
          Ver historial clínico
        </router-link>
    </div>

    <div class="card mb-4">
      <form @submit.prevent="savePrescription" class="card-body">
        <div class="mb-2">
          <label for="name">Motivo</label>
          <br />
          <input
            class="form-control"
            v-model="prescription.reason"
            id="name"
            type="text"
            placeholder="Motivo de la prescripción"
          />
        </div>

        <div class="mb-2">
          <label for="personal_history">Antecedentes patológicos personales</label>
          <br />
          <textarea
            class="form-control"
            v-model="prescription.personal_history"
            id="personal_history"
            placeholder="Antecedentes patológicos personales"
          ></textarea>
        </div>

        <div class="mb-2">
          <label for="family_history">Antecedentes patológicos familiares</label>
          <br />
          <textarea
            class="form-control"
            v-model="prescription.family_history"
            id="family_history"
            placeholder="Antecedentes patológicos familiares"
          ></textarea>
        </div>

        <div class="mb-2">
          <label for="family_history">Signos vitales</label>
          <br />
          <textarea
            class="form-control"
            v-model="prescription.vital_signs"
            id="vital_signs"
            placeholder="Signos vitales"
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
        reason: "",
        personal_history: "",
        family_history: "",
        vital_signs: "",
        patient_id: this.id
      },
      user: null,
      errors: [],
    }
  },

  created() {
    this.getUser()
  },

  methods: {

    getUser() {
      this.axios
        .get(`/patients/${ this.id }`)
        .then(({ data }) => {
            this.user = data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },

    savePrescription() {
      this.axios
        .post("/histories", this.prescription)
        .then(() => {
          this.prescription = {
            title: "",
            description: "",
          }
          this.errors = []
          alert("Historial creado correctamente")
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
