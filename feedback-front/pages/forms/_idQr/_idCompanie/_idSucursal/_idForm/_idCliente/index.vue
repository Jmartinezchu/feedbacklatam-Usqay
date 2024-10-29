<template>
    <div class="container_index">
        <div class="card_todo_question ">
            <topPage></topPage>
            <div class="flex_center animate__animated animate__fadeInRight">
                <div class="flex_center">
                    <h6 style="text-align:center;">Participa de los diferentes cupones que tenemos para ti 😉</h6>
                </div>
                <nuxt-link
                    :to="`/forms/${this.route.idQr}/${route.idCompanie}/${route.idSucursal}/${route.idForm}/${route.idCliente}/pageRuleta`">
                    <div class="content_btn btn_feli">
                        <!-- <div class="ico_btn">🥳</div> -->
                        <div class="text-white">Obtener mi cupon <v-icon class="text-white">redeem</v-icon></div>
                    </div>
                </nuxt-link>
            </div>
            <div class="btnPrimary animate__animated animate__fadeInRight">
                <nuxt-link
                    :to="`/forms/${this.route.idQr}/${route.idCompanie}/${route.idSucursal}/${route.idForm}/pageEnd`"><button>Omitir</button></nuxt-link>
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