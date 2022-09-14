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
          <label for="name">Email</label>
          <br />
          <input
            class="form-control"
            v-model="patient.email"
            id="name"
            type="text"
            placeholder="Correo del paciente"
          />
        </div>

        <div class="mb-2">
          <label for="password">Contraseña</label>
          <br />
          <input
            class="form-control"
            v-model="patient.password"
            id="password"
            type="password"
            placeholder="Contraseña para el usuario"
          />
        </div>

        <div class="mb-2">
          <label for="password-repeat">Confirmar Contraseña</label>
          <br />
          <input
            class="form-control"
            v-model="patient.password_confirmation"
            id="password-repeat"
            type="password"
            placeholder="Repetir contraseña"
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
        email: "",
        password: "",
        password_confirmation: "",
      },
      errors: [],
    };
  },

  methods: {
    savePatient() {
      this.axios
        .post("/users", this.patient)
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
