<template>
    <div class="container">
      <h1>Editar un paciente</h1>
  
      <ErrorsComponent :errors="errors" />
  
      <div class="card mb-4">
        <form @submit.prevent="updatePatient" class="card-body">
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

    props: {
        id: {
            required: true,
            type: Number
        }
    },
  
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

    created() {
        this.getPatient()
    },
  
    methods: {
      updatePatient() {
        this.axios
          .put(`/patients/${ this.id }`, this.patient)
          .then(() => {
            this.errors = [];
            alert("Paciente actualizado correctamente");
          })
          .catch((error) => {
            console.log(error);
            this.errors = Object.values(error.response.data.errors).flat();
          });
      },

      async getPatient() {
        const { data } = await this.axios.get(`/patients/${ this.id }`)
        this.patient = data.data
      }

    },
  };
  </script>
  
  <style></style>
  