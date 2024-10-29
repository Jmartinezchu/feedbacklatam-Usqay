<template>
    <div class="container_index">
        <div class="card_todo_question">
            <topPage></topPage>
            <btnEvaluacion class="animate__animated animate__fadeInRight"></btnEvaluacion>
            <div class="btnPrimary animate__animated animate__fadeInRight">
                <button @click="verifyCupones()">Omitir</button>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '../../../../../../api/API_feedback';

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
    methods: {
        async verifyCupones() {
            let id = this.route.idSucursal;
            const data = await this.$axios.$get(`${Api}/cupones/ruleta/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            // this.cupones = data;

            if (data.length >= 3) {
                localStorage.setItem("list_cupones", JSON.stringify(data));
                localStorage.setItem("cuponganado", JSON.stringify({}));
                location.href = `/forms/${this.route.idQr}/${this.route.idCompanie}/${this.route.idSucursal}/${this.route.idForm}/pageContact`
            } else {
                location.href = `/forms/${this.route.idQr}/${this.route.idCompanie}/${this.route.idSucursal}/${this.route.idForm}/pageEnd`
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>