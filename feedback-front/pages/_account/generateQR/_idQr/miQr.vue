<template>
    <div>
        <v-tour name="createpersonal" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/${user.nameCompanie}/generateQr`">
                    <div data-v-step="3"
                        style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <v-btn icon>
                            <v-icon>arrow_back_ios_new</v-icon>
                        </v-btn>
                        <strong class="text-dark pr-2">
                            <h5>Regresar -</h5>
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
                                        <span class="mb-2 text-xs">Encuesta: <span
                                                class="text-dark font-weight-bold ms-sm-2">{{
                                                    qr.nameForm }}</span></span>
                                        <span class="mb-2 text-xs">Compañia <span
                                                class="text-dark ms-sm-2 font-weight-bold">{{
                                                    qr.nameCompanie }}</span></span>
                                        <span class="mb-2 text-xs">Susursal: <span
                                                class="text-dark ms-sm-2 font-weight-bold">{{
                                                    qr.nameSucursal
                                                }}-{{ qr.citySucu }}</span></span>
                                        <span class="mb-2 text-xs">Link: <a target="_blank"
                                                :href="`${front}/forms/${qr.id}/${qr.id_companie}/${qr.id_sucursal}/${qr.id_form}`"
                                                class="text-dark ms-sm-2 font-weight-bold">
                                                {{ front }}/forms/{{ qr.id }}/{{ qr.id_companie }}/{{ qr.id_sucursal }}/{{
                                                    qr.id_form }}</a>
                                        </span>
                                    </div>
                                    <div class="d-flex flex-column" style="height: 32px;">
                                        <!-- <span v-if="qr.state == 1"
                                            class="badge px-3 py-2 my-1 badge-sm bg-gradient-success">Online</span>
                                        <span v-if="qr.state == 0"
                                            class="badge px-3 py-2 my-1 badge-sm bg-gradient-danger">Offline</span> -->
                                        <a class="btn btn-link bg-danger text-white px-3 mb-0" :href="getUrlQr"
                                            :download="namearchivo">
                                            Descargar QR
                                            <v-icon class="text-white me-2">qr_code_scanner</v-icon>
                                        </a>
                                        <!-- <span class="badge px-3 py-2 my-1 badge-sm bg-danger">Descargar QR</span> -->
                                    </div>
                                </li>
                                <a class="btn btn-link text-white px-3 mb-0" :href="getUrlQr" :download="namearchivo">
                                    <vue-qr class="card_border" :text="urlqr" :bgSrc="bg_qr" :logoSrc="src2" :size="350"
                                        :callback="test">
                                    </vue-qr>
                                </a>

                                <!-- <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg ">
                                    <a class="btn btn-link text-white px-3 mb-0" :href="getUrlQr"
                                        :download="qr.nameSucursal + ' ' + qr.nameForm">
                                        <vue-qr class="card_border"
                                            :text="`${front}/forms/${qr.id}/${qr.id_companie}/${qr.id_sucursal}/${qr.id_form}`"
                                            :bgSrc="bg_qr" :logoSrc="src2" :size="350" :callback="test">
                                        </vue-qr>
                                    </a>
                                </li> -->
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

export default {
    name: 'FeedbackAppCreate',
    components: {
    },
    data() {
        return {
            front: front,
            urlqr: '',
            namearchivo: '',
            user: [],
            datacompanie: {},
            ruta: this.$route.params,
            qr: {},
            getUrlQr: null,
            src2: "/img/icon2.png",
            bg_qr: "/img/rojo.webp",
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
            ]
        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"))
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        // await this.verdata()
        this.verdataa(this.datacompanie.lists.qrs)
        await this.getrutaqr(this.qr)
    },

    methods: {
        test(url, id) {
            this.getUrlQr = url
            // console.log(id)
        },
        async getrutaqr(qr) {
            // console.log(this.qr);
            this.urlqr = `${this.front}/forms/${qr.id}/${qr.id_companie}/${qr.id_sucursal}/${qr.id_form}`
            this.namearchivo = `${qr.nameSucursal}-${qr.nameForm}.png`
            // console.log(this.urlqr, this.namearchivo);
        },
        async verdata() {
            let id = this.$route.params.idQr
            const data = await this.$axios.$get(`${Api}/generateQr/one/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.qr = data[0];
        },
        verdataa(qrs) {
            // console.log(this.ruta);
            const lengthsucu = qrs.length
            for (let index = 0; index < lengthsucu; index++) {
                if (qrs[index].id == this.ruta.idQr) {
                    // console.log(personal[index]);
                    this.qr = qrs[index]
                }
                // console.log(personal[index].id);

            }
            // console.log(this.sucursal);
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