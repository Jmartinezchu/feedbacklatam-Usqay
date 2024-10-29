<template>
    <div class="container_index">
        <div class="card_todo_question">
            <topPage></topPage>
            <btnEvaluacion class="animate__animated animate__fadeInRight"></btnEvaluacion>
            <div class="btnPrimary animate__animated animate__fadeInRight">
                <nuxt-link
                    :to="`/forms/${this.route.idQr}/${route.idCompanie}/${route.idSucursal}/${route.idForm}/pageContact`"><button>Omitir</button></nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    layout: 'clientes',
    data() {
        return {
            route: {},
        };
    },
    mounted() {
        this.route = this.$route.params
    },
    methods: {},
};
</script>

<style lang="scss" scoped></style>