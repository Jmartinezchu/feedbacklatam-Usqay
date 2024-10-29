<template>
    <div>
        <!-- <v-tour name="personal" :steps="steps" :options="myOptions"></v-tour> -->
        <nuxt-link :to="`/${companie.name}/configNotifications`">
            <div data-v-step="4" style="display:flex; border-radius:15px; align-items:center; ">
                <!-- <h6>Crear</h6> -->
                <v-btn icon>
                    <v-icon>arrow_back_ios_new</v-icon>
                </v-btn><strong class="text-dark pr-2">
                    <h5>Regresar</h5>
                </strong>
            </div>
        </nuxt-link>
        <div v-if="addcoments != false">
            <div class="d-flex justify-content-between" style="align-items:center ">
                <div class="col-9 flex">
                    <div class="mt-2">
                        <h5>
                            <v-icon>notification_add</v-icon> Registra y habilita tus notificaciones automaticas
                        </h5>
                    </div>
                </div>
            </div>
            <!-- info encuensta -->
            <div class="row">
                <div class="col-md-4 mt-4">
                    <nuxt-link :to="`${ruta}/create/Felicitaciones`" v-if="Felicitaciones != false" style="cursor: pointer;"
                        class="card " data-v-step="1">
                        <div class="card-header pb-0 px-3" style="text-align:center">
                            <v-icon style="font-size:30px;color: #fff;">🥳</v-icon>
                        </div>
                        <div class="card-body p-3">
                            <div class="d-flex flex-column text-center">
                                <h5 class="text-sm">Felicitaciones</h5>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
                <div class="col-md-4 mt-4">
                    <nuxt-link :to="`${ruta}/create/Sugerencias`" v-if="Sugerencias != false" style="cursor: pointer;"
                        class="card" data-v-step="1">
                        <div class="card-header pb-0 px-3" style="text-align:center">
                            <v-icon style="font-size:30px; color: #fff;">🤔</v-icon>
                        </div>
                        <div class="card-body p-3">
                            <div class="d-flex flex-column text-center">
                                <h5 class="text-sm">Sugerencias</h5>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
                <div class="col-md-4 mt-4">
                    <nuxt-link :to="`${ruta}/create/Reclamos`" v-if="Reclamos != false" style="cursor: pointer;"
                        class="card" data-v-step="1">
                        <div class="card-header pb-0 px-3" style="text-align:center">
                            <v-icon style="font-size:30px;color: #fff;">🤕</v-icon>
                        </div>
                        <div class="card-body p-3">
                            <div class="d-flex flex-column text-center">
                                <h5 class="text-sm">Reclamos</h5>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </div>

        <br>
        <div class="row">
            <div class="d-flex justify-content-between" style="align-items:center ">
                <h5>
                    <v-icon>notifications_active</v-icon> Notificaciones Configuradas
                </h5>
            </div>
        </div>
        <!-- info encuensta -->
        <div class="row" v-if="notifications.length != 0">
            <!-- crad info cada encuesta -->
            <div class="col-md-4 mt-4" v-for="nt in notifications" :key="nt.id">
                <div class="card" data-v-step="1">
                    <div class="card-header pb-0 px-3" style="text-align:center">
                        <!-- <v-icon style="font-size:30px">campaign</v-icon> -->
                        <v-icon v-if="nt.valor === 'Felicitaciones'" style="font-size:30px;color: #fff;">🥳</v-icon>
                        <v-icon v-if="nt.valor === 'Sugerencias'" style="font-size:30px; color: #fff;">🤔</v-icon>
                        <v-icon v-if="nt.valor === 'Reclamos'" style="font-size:30px;color: #fff;">🤕</v-icon>
                        <!-- TODO: btn Editar -->
                        <nuxtLink :to="`${ruta}/${nt.valor}/${nt.id}`" style="position: absolute;right: 0;" data-v-step="2"
                            class="btn btn-link text-dark px-3 mb-0"><i class="fas fa-pencil-alt text-dark me-2"
                                aria-hidden="true"></i>
                        </nuxtLink>
                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                                <div class="d-flex flex-column text-center">
                                    <h5 class="">{{ nt.valor }}</h5>
                                </div>
                                <div class="ms-auto text-center">
                                    <ModalsModal01 :nt="nt" :logo="companie.filename" />
                                    <button @click="getStateActive(nt)" v-if="nt.state != 1"
                                        class="w-100 btn btn-link text-secondary bg-dark text-gradient px-3 mb-0"><i
                                            class="far fa-eye-slash me-2"></i>Desactivado</button>
                                    <button @click="getStateInactive(nt)" v-else
                                        class="w-100 btn btn-link text-success text-gradient px-3 mb-0"><i
                                            class="far fa-eye me-2"></i>Activado</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-md-12 mt-4">
                <div class="card" data-v-step="1">
                    <div class="card-header pb-0 px-3" style="text-align:center">
                        <v-icon style="font-size:30px">campaign</v-icon>
                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                                <div class="d-flex flex-column text-center">
                                    <h5 class="">Registra el mensaje de notificacion automatica</h5>
                                    <b>Aqui apareceran los mensajes creados</b>
                                    <h6>🥳🤔🤕</h6>
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
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../../../../api/API_feedback';
import images from '../../../../api/URL_imges';
export default {
    name: 'FeedbackAppSucursales',

    data() {
        return {
            addcoments: true,
            Felicitaciones: true,
            Sugerencias: true,
            Reclamos: true,
            user: [],
            companie: {},
            ruta: null,
            images: images,
            notifications: [],
            valores: [],

        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"))
        this.companie = JSON.parse(localStorage.getItem("companie"))
        this.ruta = this.$route.params.idSucursal
        await this.verdata()
    },

    methods: {
        // addNotification(typeComent) {
        //     console.log('click', typeComent);
        // },
        async verdata() {
            const data = await this.$axios.$get(`${Api}/notifications/${this.user.idCompanie}/${this.ruta}`).catch(error => {
                console.log('Request canceled', error)
            })
            this.notifications = data;
            localStorage.setItem("notificatons", JSON.stringify(data));
            // console.log(this.notifications);
            for (let index = 0; index < data.length; index++) {
                // this.valores.push(data[index].valor);
                if (data[index].valor === 'Felicitaciones') {
                    this.Felicitaciones = false;
                } else if (data[index].valor === 'Sugerencias') {
                    this.Sugerencias = false;
                } else if (data[index].valor === 'Reclamos') {
                    this.Reclamos = false;
                }
            }
            if (this.Felicitaciones != true && this.Sugerencias != true && this.Reclamos != true) {
                this.addcoments = false
            }
        },
        iniciar() {
            this.$tours['personal'].start();
        },
        async putActiveNotification(nt) {
            const params = {
                state: 1
            }
            const data = await this.$axios.$put(`${Api}/notifications/state/${nt.id_companie}/${nt.id_sucursal}/${nt.id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            this.verdata();
        },
        async putDesactivNotification(nt) {
            const params = {
                state: 0
            }
            const data = await this.$axios.$put(`${Api}/notifications/state/${nt.id_companie}/${nt.id_sucursal}/${nt.id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            this.verdata();
        },
        getStateActive(data) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: `¿Seguro de Activar a ${data.valor}`,
                text: "Tus encuestados recibiran este mensaje es su correo",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-trash-alt me-2"></i> Si, Activar!',
                cancelButtonText: 'No, cancelar!',
                reverseButtons: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // console.log('funcion cambiar estado')
                    this.putActiveNotification(data);
                    swalWithBootstrapButtons.fire(
                        {
                            title: 'Listo!',
                            text: 'Se habilito la notificación',
                            icon: 'success',
                            timer: 1500,
                        }
                    )
                }

            })
        },
        getStateInactive(data) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: `¿Seguro de Desactivar las ${data.valor}`,
                text: "Los encuestados no recibiran correos",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-trash-alt me-2"></i> Si, Desactivar!',
                cancelButtonText: 'No, cancelar!',
                reverseButtons: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // console.log('funcion cambiar estado')
                    this.putDesactivNotification(data);
                    swalWithBootstrapButtons.fire(
                        {
                            title: 'Listo!',
                            text: 'Se Desactivo la notificación',
                            icon: 'success',
                            timer: 1500,
                        }
                    )
                }
            })
        }

    },
};
</script>

<style  scoped></style>