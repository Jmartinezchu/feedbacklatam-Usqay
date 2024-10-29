<template>
    <div>
        <v-tour name="createpersonal" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/${user.nameCompanie}/generateQrCards`">
                    <div data-v-step="3"
                        style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <v-btn icon>
                            <v-icon>arrow_back_ios_new</v-icon>
                        </v-btn>
                        <strong class="text-dark pr-2">
                            <h5>Regresar</h5>
                        </strong>
                    </div>
                </nuxt-link>

            </div>

            <!-- <div class="col-3 text-center">
                <button @click="iniciar" class="d-flex">
                    <v-icon>mouse</v-icon>
                    <h6> ¿Como funciona esta pantalla?</h6>
                </button>
            </div> -->
        </div>
        <div class="row">
            <div class="col-md-12 mb-3" data-v-step="0">
                <div class="card">
                    <div>
                        <div class="card-body pt-4 p-3">
                            <ul class="list-group">
                                <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg"
                                    style="justify-content: space-around">
                                    <div class="d-flex flex-column">
                                        <span class="mb-2 text-xs">Sucursal: <span
                                                class="text-dark font-weight-bold ms-sm-2">{{
                                                    qr.sucursal }}</span></span>
                                        <span class="mb-2 text-xs">Ciudad <span
                                                class="text-dark ms-sm-2 font-weight-bold">{{
                                                    qr.city }}</span></span>
                                        <span class="mb-2 text-xs">Ciudad <span
                                                class="text-dark ms-sm-2 font-weight-bold">{{
                                                    qr.address }}</span></span>
                                        <span class="mb-2 text-xs">Link: <a target="_blank"
                                                :href="`${front}/links/${qr.id}`"
                                                class="text-dark ms-sm-2 font-weight-bold">
                                                {{ front }}/links/{{ qr.id }}</a></span>
                                    </div>
                                    <div class="d-flex flex-column" style="height: 32px;">

                                        <a class="btn btn-link bg-danger text-white px-3 mb-0" :href="getUrlQrcard"
                                            :download="namearchivo">
                                            Descargar QR
                                            <v-icon class="text-white me-2">qr_code_scanner</v-icon>
                                        </a>
                                    </div>
                                    <!-- {{ qr }} -->

                                </li>
                                <a class="btn btn-link text-white px-3 mb-0" :href="getUrlQrcard" :download="namearchivo">
                                    <vue-qr class="card_border" :text="urlqr" :logoSrc="`${images}/${companie.filename}`"
                                        :size="350" :callback="test">
                                    </vue-qr>
                                </a>

                            </ul>
                        </div>

                        <!-- <pre>{{ qrLink }}</pre> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '../../../../api/API_feedback';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import front from '../../../../api/URL_feedback';
import images from '../../../../api/URL_imges';

export default {
    name: 'FeedbackAppCreate',
    components: {
    },
    data() {
        return {
            front: front,
            urlqr: '',
            namearchivo: '',
            images: images,
            companie: {},
            datacompanie: [],
            user: [],
            qr: {},
            getUrlQrcard: null,
            src2: "/img/icon2.png",
            bg_qr: "/img/rojo.webp",
            id_QR: null,
            myOptions: {
                useKeyboardNavigation: true,
                labels: {
                    buttonSkip: 'Terminar',
                    buttonPrevious: 'Atras',
                    buttonNext: 'Siguiente',
                    buttonStop: 'Finalizar'
                }
            },
            steps: [
                {
                    target: '[data-v-step="0"]',  // We're using document.querySelector() under the hood
                    content: `Completa todos los datos de este formulario`,
                    params: {
                        placement: 'top'
                    }
                },//Regresa a tus cupones <strong>Aqui</strong>! 
                {
                    target: '[data-v-step="1"]',
                    content: `<strong>Con este campo</strong> podra ingresar al sistema`,
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '[data-v-step="2"]',
                    content: 'Luego de completar todos los capos del formulario click para crear',
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '[data-v-step="3"]',
                    content: `<strong>Aqui</strong> para regresar a ver tus Cupones`,
                    params: {
                        // placement: 'top'
                    }
                }
            ],
            ruta: this.$route.params,
            dataQrLink: {}
        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.companie = JSON.parse(localStorage.getItem("companie"));
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"));
        // await this.verdata();
        this.id_QR = this.$route.params.idQr;
        this.getDatalinks(this.datacompanie.lists.multilinks);
        // console.log(this.$route.params.idQr);
        await this.getrutaqr(this.qr)
    },

    methods: {
        async getrutaqr(qr) {
            console.log(qr);
            this.urlqr = `${this.front}/links/${qr.id}`
            this.namearchivo = `Multilink-${qr.sucursal}-${qr.city}.png`
            // console.log(this.urlqr, this.namearchivo);
        },
        async test(url, id) {
            this.getUrlQrcard = await url
            // console.log(id)
        },
        // async verdata() {
        //     let id = this.$route.params.idQr
        //     const data = await this.$axios.$get(`${Api}/qrlinks/one/` + id).catch(error => {
        //         console.log('Request canceled', error)
        //     })
        //     this.qr = data[0];
        //     // console.log(this.qr)
        // },
        getDatalinks(array) {
            for (let index = 0; index < array.length; index++) {
                if (array[index].id == this.ruta.idQr) {
                    this.qr = array[index]
                    // console.log(this.qr);
                }
            }
        },

        iniciar() {
            this.$tours['createpersonal'].start();
        },
    },
};
</script>

<style scoped>
.Blurred {
    display: none !important;
}

.card_border {

    max-width: 350px !important;
    min-width: 150px !important;
    width: 100%;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.37) 0px 0px 20px 0px;
    /* margin: 10px 25px;
    padding: 15px 0; */
}
</style>