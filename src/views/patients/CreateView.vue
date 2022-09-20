<template>
  <div class="container">
    <h1>Añadir un paciente</h1>

    <ErrorsComponent :errors="errors" />

    <div class="card mb-4">
      <form @submit.prevent="savePatient" class="card-body">
        <div class="mb-2">
          <label for="name">Nombre</label>
          <br />
          <input
            class="form-control"
            v-model="patient.name"
            id="name"
            type="text"
            placeholder="Nombre del paciente"
          />
        </div>

        <div class="mb-2">
          <label for="surname">Email</label>
          <br />
          <input
            class="form-control"
            v-model="patient.surname"
            id="surname"
            type="text"
            placeholder="Apellido del paciente"
          />
        </div>

        <div class="mb-2">
          <label for="dni">Cédula</label>
          <br />
          <input
            class="form-control"
            v-model="patient.dni"
            id="dni"
            type="text"
            placeholder="Cédula del usuario"
          />
        </div>

        <div class="mb-2">
          <label for="email">Correo electrónico</label>
          <br />
          <input
            class="form-control"
            v-model="patient.email"
            id="email"
            type="email"
            placeholder="Correo electrónico del paciente"
          />
        </div>

        <div class="mb-2">
          <label for="phone">Teléfono</label>
          <br />
          <input
            class="form-control"
            v-model="patient.phone"
            id="phone"
            type="text"
            placeholder="Teléfono del paciente"
          />
        </div>

        <div class="mb-2">
          <label for="birthday">Fecha de nacimiento</label>
          <br />
          <input
            class="form-control"
            v-model="patient.birthday"
            id="birthday"
            type="date"
            placeholder="Fecha de nacimiento del paciente"
          />
        </div>

        <button type="submit" class="btn btn-primary btn-sm">Guardar</button>
      </form>
    </div>
    
  </div>
</template>

<script>
import ErrorsComponent from "@/components/ErrorsComponent.vue"

export default {
  components: { ErrorsComponent },

  data() {
    return {
      patient: {
        name: "",
        surname: "",
        dni: "",
        email: "",
        phone: "",
        birthday: ""
      },
      errors: [],
    };
  },

  methods: {
    savePatient() {
      this.axios
        .post("/patients", this.patient)
        .then(() => {
          this.patient = {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
          };
          this.errors = [];
          alert("Paciente creado correctamente");
        })
        .catch((error) => {
          console.log(error);
          this.errors = Object.values(error.response.data.errors).flat();
        });
    },
  },
};
</script>

<style></style>
