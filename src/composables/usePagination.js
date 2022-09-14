import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default function usePagination() {
    const pagination = ref({});
    const route = useRoute();
    const router = useRouter();

    //Propiedades computadas
    const page = computed( () => {
        let page = route.query.page ?? 1;

        if(page > pagination.value.last_page) {
            router.replace({
                query: {
                    page: pagination.value.last_page
                }
            });

            return pagination.value.last_page;
        }
        
        return page;
    });

    //Métodos
    const setPagination = (response) => {
        pagination.value = {
            links: response.links,
            last_page: response.last_page
        }
    }

    const changePage = ( url ) => {
        let page = url.split('page=')[1];
        router.replace(
            {
                query: {
                    page
                }
            }
        );
    }

    return {
        pagination,
        setPagination,
        page,
        changePage
    }
}
