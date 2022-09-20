<template>
  <div class="container">
    <h1>Pacientes</h1>

    <input
      class="form-control mb-3"
      v-model="search"
      id="name"
      type="text"
      placeholder="Buscar por nombre o apellido"
      autocomplete="off"
    />

    <table class="table">
      <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Surname</th>
          <th scope="col">Cédula</th>
          <th scope="col">Historial</th>
          <th scope="col" colspan="2">Historia clínica</th>
          <th scope="col" colspan="2">Paciente</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="'user-' + user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>
          <td>{{ user.dni }}</td>
          <td>{{ user.history_count }}</td>
          <td>
            <router-link :to="{ name: 'patients-history', params: {id: user.id} }">
              Ver
            </router-link>
          </td>
          <td>
            <router-link :to="{ name: 'prescriptions-create', params: { id: user.id } }">
              Añadir
            </router-link>
          </td>
          <td>
            <router-link :to="{ name: 'patients-edit', params: { id: user.id } }">
              Editar
            </router-link>
          </td>
          <td>
            <a class="delete" href="#" @click.prevent="deleteUser(user.id)"> Eliminar </a>
          </td>
        </tr>
      </tbody>
    </table>

    <PaginationComponent :pagination="pagination" />
  </div>
</template>

<script>
import usePagination from "@/composables/usePagination";
import PaginationComponent from "@/components/PaginationComponent.vue";

export default {
  components: {
    PaginationComponent,
  },

  setup() {
    const { pagination, setPagination, page } = usePagination();
    return {
      pagination,
      setPagination,
      page,
    };
  },

  data() {
    return {
      users: [],
      search: ''
    };
  },

  watch: {
    page() {
      this.getUsers()
    },
    search() {
      this.getUsers()
    }
  },

  created() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      this.axios
        .get("/patients", {
            params: {
                page: this.page,
                search: this.search
            }
        })
        .then(({ data }) => {
          const users = data.data;
          this.users = users;
          this.setPagination(data.meta);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteUser(id) {
      this.axios
        .delete(`/patients/${id}`)
        .then(() => {
          alert('Paciente eliminado correctamente')
          this.getUsers();
        })
        .catch((error) => {
          console.log(error);
        });
    },

  },
};
</script>

<style scoped>
  .delete {
    color: red;
  }
</style>
