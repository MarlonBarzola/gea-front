<template>
    <div class="container">
    <h1 v-if="patient">Historial de {{ patient.name }}</h1>

    <div class="text-end">
        <router-link
          :to="{ name: 'prescriptions-create', params: {id} }"
          class="btn btn-danger mb-3">
          Añadir historial clínico
        </router-link>
    </div>

    <table class="table" v-if="histories">
      <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Razón</th>
          <th scope="col">Signos vitales</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="history in histories" :key="'history-' + history.id">
          <th scope="row">{{ history.id }}</th>
          <td>{{ history.reason }}</td>
          <td>{{ shortText(history.vital_signs) }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {

    props: {
        id: {
            type: Number,
            required: true
        }
    },

    data() {
        return {
            histories: null,
            patient: null
        }
    },

    created() {
        this.getHistory();
        this.getPatient()
    },

    methods: {
        shortText(text) {
            return (text.length > 130)
            ? text.substr(0, 130) + '...'
            : text
        },
        async getHistory() {
            const { data } = await this.axios.get(`/history/${ this.id }/patient`)
            this.histories = data.data
        },

        async getPatient() {
            const { data } = await this.axios.get(`/patients/${ this.id }`)
            this.patient = data.data
        }

    }

}
</script>

<style>

</style>