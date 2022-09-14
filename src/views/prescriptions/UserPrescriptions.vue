<template>

    <div class="container">
        <h1>Prescripciones de {{ user.name }}</h1>

        <table class="table">
        <thead class="table-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="prescription in prescriptions" :key="prescription.id">
                <td>{{ prescription.id }}</td>
                <td>{{ prescription.title }}</td>
                <td>
                    <router-link
                      :to="{ name: 'prescriptions-edit', params: { id: prescription.id } }">
                        Editar
                    </router-link>
                </td>
            </tr>
        </tbody>
        </table>
    </div>

</template>

<script>
export default {
    props: {
    id: {
      required: true,
      type: Number,
    },
  },

  data() {
    return {
      prescriptions: {},
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
            this.prescriptions = this.user.prescriptions
        })
        .catch((error) => {
          console.log(error)
        })
    },
  }

}
</script>

<style>

</style>