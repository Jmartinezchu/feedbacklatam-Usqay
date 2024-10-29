<template>
    <div>
        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <div class="mt-2">
                    <h5>
                        <v-icon>notifications_active</v-icon> Configura las notificaciones automaticas de tus clientes
                    </h5>
                </div>
            </div>
        </div>
        <!-- info encuensta -->
        <div class="row" v-if="sucursales.length > 0">
            <div class="col-md-4 mt-4" v-for="(data, index) in sucursales" :key="index"
                :class="{ Blurred: data.state == '0' }">
                <div class="card" data-v-step="1">
                    <div class="card-header pb-0 px-3" style="text-align:center">
                        <img style="border-radius: 50%;" width="100" :src="`${images}/${companie.filename}`" alt="">
                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                                <div class="d-flex flex-column text-center">
                                    <h5 class="text-sm">{{ data.name }} - {{ data.city }}</h5>
                                    <h5 class="text-sm">{{ data.address }}</h5>
                                </div>
                                <div class="ms-auto text-center ">
                                    <button @click="storageSucrsalid(data)" data-v-step="2"
                                        class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
                                        <i class="fas fa-bell text-dark me-2" aria-hidden="true"></i>
                                        Notificaciones</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '../../../api/API_feedback'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import images from '../../../api/URL_imges';
export default {
    name: 'FeedbackAppSucursales',

    data() {
        return {
            companie: {},
            dialog: false,
            user: [],
            images: images,
            sucursales: [],
            datacompanie: {},
            myOptions: {
                useKeyboardNavigation: true,
                labels: {
                    buttonSkip: 'Terminar',
                    buttonPrevious: 'Atras',
                    buttonNext: 'Siguiente',
                    buttonStop: 'Finalizar'
                }
            },
        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"))
        this.companie = JSON.parse(localStorage.getItem("companie"))
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        this.sucursales = this.datacompanie.lists.sucursales
        // await this.verdata();
    },

    methods: {
        storageSucrsalid(data) {
            localStorage.setItem("sucursal", JSON.stringify(data));
            location.href = `configNotifications/${data.id}`
        },
        async verdata() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/branchoffices/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.sucursales = data;
        }

    },
};
</script>

<style scoped>
.Blurred {
    display: none !important;
}
</style>