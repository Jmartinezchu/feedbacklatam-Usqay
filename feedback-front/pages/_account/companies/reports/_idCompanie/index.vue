<template>
    <div>
        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/${user.nameCompanie}/companies`">
                    <div data-v-step="3"
                        style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <v-btn icon>
                            <v-icon>arrow_back_ios_new</v-icon>
                        </v-btn>
                        <strong class="text-dark pr-2">
                            <h5>Regresar a las compañias /-/</h5>
                        </strong>
                    </div>
                </nuxt-link>
                <div class="mt-2">
                    <h5> Reportes de {{ companie.name }} </h5>
                </div>
            </div>

            <!-- <div class="col-3 text-center">
                <button @click="iniciar" class="d-flex">
                    <v-icon>mouse</v-icon>
                    <h6> ¿Como funciona esta pantalla?</h6>
                </button>
            </div> -->
        </div>
        <!-- card top -->
        <div class="row">
            <div class="col-md-12">
                <!-- card top -->
                <CardsDataVer :idCompanie="idCompanie" />
            </div>
        </div>
        <div class="row" v-if="qrs.length > 0">
            <div class="col-md-4 mt-4" v-for="(data, index) in qrs" :key="index" :class="{ Blurred: data.state == '0' }">
                <div class="card" data-v-step="1">
                    <div class="card-header pb-0 px-3" style="text-align:center">
                        <img style="border-radius: 50%;" width="100" :src="`${images}/${companie.filename}`" alt="">
                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                                <div class="d-flex flex-column text-center">
                                    <h5 class="text-sm">Formulario:{{ data.nameForm }}</h5>
                                    <h5 class="text-sm">Sucursal:{{ data.nameSucursal }}</h5>
                                    <h5 class="text-sm">Ciudad:{{ data.citySucu }}</h5>
                                </div>
                                <div class="ms-auto text-center ">
                                    <nuxt-link :to="`${idCompanie}/${data.id}/${data.id_form}`" data-v-step="2"
                                        class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
                                        <i class="fas fa-gift text-dark me-2" aria-hidden="true"></i>Ver
                                        Reportes</nuxt-link>

                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="card" data-v-step="1">
                <div class="card-header pb-0 px-3" style="text-align:center">
                    <img width="100" :src="`${images}/${companie.filename}`" alt="">
                </div>
                <div class="card-body p-3">
                    <ul class="list-group flex_card_question">
                        <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                            <div class="d-flex flex-column text-center">
                                <h5 class="text-sm">No se han creado Encuestas para analizar, inicia en el icono <nuxt-link
                                        :to="`generateQR/create`">
                                        <div data-v-step="0"
                                            style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                                            <v-btn icon>
                                                <v-icon>add_circle</v-icon>
                                            </v-btn>
                                        </div>
                                    </nuxt-link></h5>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mt-4">
                <div class="card mb-4">
                    <div class="card-header pb-0 px-3">
                        <div class="row">
                            <div class="col-md-12">
                                <h6 class="mb-0">Comentarios Recibidos</h6>
                                <h6 class="text-uppercase text-body text-xs font-weight-bolder">Todos</h6>
                            </div>
                        </div>
                    </div>
                    <div class="px-2">
                        <div class="row">
                            <div class="col-md-6 mt-4">
                                <div class="card h-100 mb-4">
                                    <chartsUsqBarra :idCompanie="idCompanie" />
                                </div>
                            </div>
                            <div class="col-md-6 mt-4">
                                <div class="card h-100 mb-4">
                                    <chartsUsqCircle :idCompanie="idCompanie" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Api from '../../../../../api/API_feedback';
import images from '../../../../../api/URL_imges';


export default {
    name: 'FeedbackAppIndexReportes',
    data() {
        return {
            idCompanie: null,
            user: {},
            qrs: [],
            images: images,
            companie: {},
        }
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.idCompanie = parseInt(this.$route.params.idCompanie)
        // console.log(this.$route.params);
        await this.getDataCompanie();
        await this.getQrs()
        // await this.getDataCompanie()
    },

    methods: {
        async getDataCompanie() {
            let id = this.$route.params.idCompanie
            const data = await this.$axios.$get(`${Api}/companies/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.companie = data[0]
            // console.log(data[0]);
        },
        async getQrs() {
            let id = this.$route.params.idCompanie
            const data = await this.$axios.$get(`${Api}/generateQr/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.qrs = data;
            // console.log(data);
        },
    },
};
</script>

<style scoped>
@media screen and (max-width:600px) {
    .contencardsComent {
        flex-direction: column;
    }
}

.Blurred {
    display: none !important;
}
</style>