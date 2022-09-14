<template>
    <ul v-if="errors.length > 0" class="errors">
        <li v-for="error in errors" :key="`error-${error.id}`">
        {{ error }}
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        errors: {
            required: true
        }
    }
}
</script>

<style>
    .errors li{
        color: red;
    }
</style>