<template>
  <div class="d-flex justify-content-center">
        <nav aria-label="...">
            <ul class="pagination">
                <li
                    v-for="pagination in pagination.links" 
                    :key="pagination.label"
                    class="page-item"
                    :class="{
                        disabled: pagination.url == null,
                        active: pagination.active
                    }"
                >
                    <a
                        @click="changePage(pagination.url)"
                        class="page-link"
                        v-html="pagination.label"
                        style="cursor: pointer">
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import usePagination from "@/composables/usePagination"

export default {
    props: {
        pagination: {
            required: true,
            type: Object
        }
    },
    setup() {
    const {changePage } = usePagination()
        return {
            changePage
        }
    }
}
</script>
