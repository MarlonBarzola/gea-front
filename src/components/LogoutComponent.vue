<template>
  <button class="btn btn-danger" @click="onLogout">Cerrar sesión</button>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {

    computed: {
        ...mapState(['token']),
    },

    methods: {
    ...mapActions(['logout']),

    onLogout() {

        this.axios.post('/auth/logout').then(() => {
            this.logout()
        }).catch(error => {
            console.log(error)
        })
    }

  }

}
</script>

<style>

</style>