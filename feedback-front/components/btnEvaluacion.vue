<template>
    <div class="flex_center">
        <div class="flex_center">
            <h6 style="text-align:center;">¿Tienes algun comentario para nosotros?, tu opinion es lo más importante para
                nosotros</h6>
        </div>
        <nuxt-link :to="`/forms/${this.route.idQr}/${route.idCompanie}/${route.idSucursal}/${route.idForm}/pageComent`">
            <div @click="getEvaluacion('Felicitaciones')" class="content_btn btn_feli">
                <div class="ico_btn">🥳</div>
                <div class="text">Felicitaciones</div>
            </div>
        </nuxt-link>
        <nuxt-link :to="`/forms/${this.route.idQr}/${route.idCompanie}/${route.idSucursal}/${route.idForm}/pageComent`">
            <div @click="getEvaluacion('Sugerencia')" class="content_btn btn_Suge">
                <div class="ico_btn">😐</div>
                <div class="text">Sugerencia</div>
            </div>
        </nuxt-link>
        <nuxt-link :to="`/forms/${this.route.idQr}/${route.idCompanie}/${route.idSucursal}/${route.idForm}/pageComent`">
            <div @click="getEvaluacion('Reclamos')" class="content_btn btn_Recla">
                <div class="ico_btn">😠</div>
                <div class="text">Reclamo</div>
            </div>
        </nuxt-link>


    </div>
</template>
<script>
export default {
    data() {
        return {
            route: {},
            evaluacionText: '',
        };
    },

    mounted() {
        this.route = this.$route.params

    },

    methods: {
        getEvaluacion(text) {
            if (text == 'Felicitaciones') {
                this.evaluacionText = "Felicitaciones";
            } else if (text == 'Sugerencia') {
                this.evaluacionText = "Sugerencias";
            } else {
                this.evaluacionText = "Reclamos"
            }
            localStorage.setItem("typeEval", JSON.stringify(this.evaluacionText));
        }
    },
}
</script>
<style></style>