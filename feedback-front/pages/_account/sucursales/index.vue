<template>
    <div>
        <v-tour name="sucursales" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`sucursales/create`">
                    <div data-v-step="0"
                        style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <v-btn icon>
                            <v-icon>add_circle</v-icon>
                        </v-btn><strong class="text-dark pr-2">
                            <h5>Añadir -</h5>
                        </strong>
                    </div>
                </nuxt-link>
                <div class="mt-2">
                    <h5 class="text-center w-100">Mis Sucursales</h5>
                </div>
            </div>

            <div class="col-3 text-center">
                <button @click="iniciar" class="d-flex">
                    <v-icon>mouse</v-icon>
                    <h6> ¿Como funciona esta pantalla??</h6>
                </button>
            </div>
        </div>
        <!-- info encuensta -->
        <div class="row" v-if="sucursales.length > 0">
            <!-- crad info cada encuesta -->
            <div class="col-md-4 mt-4" v-for="data in sucursales" :key="data.id">
                <div class="card" data-v-step="1">
                    <div class="card-header pb-0 px-3" style="text-align:center">
                        <img style="border-radius: 50%;" width="100" :src="`${images}/${companie.filename}`" alt="">
                        <!-- <h6 class="mb-0">Informacion Encuesta</h6> -->
                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <!-- todas la sub categorias -->
                            <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                                <div class="d-flex flex-column text-center">
                                    <h5 class="text-sm">{{ data.name }} - {{ data.city }}</h5>
                                    <h5 class="text-sm">{{ data.address }}</h5>
                                </div>
                                <div class="ms-auto text-center ">

                                    <nuxtLink data-v-step="2" :to="'sucursales/' + data.id"
                                        class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i
                                            class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit
                                    </nuxtLink>
                                    <!-- <a data-v-step="3" @click="getDelete(data.id)"
                                        class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                            class="far fa-trash-alt me-2"></i>Delete</a> -->

                                    <a v-if="data.state == 1" data-v-step="3" @click="getStateInactive(data)"
                                        class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                            class="far fa-eye-slash me-2"></i>Inhabilitar</a>
                                    <a v-if="data.state == 0" data-v-step="3" @click="getStateActive(data)"
                                        class="btn btn-link text-info text-gradient px-3 mb-0" href="javascript:;"><i
                                            class="far fa-eye me-2"></i>Activar</a>
                                    <!-- <a v-if="data.state == 0" data-v-step="3" @click="getStateActive(data)"
                                        class="btn btn-link text-info text-gradient px-3 mb-0" href="javascript:;"><i
                                            class="far fa-trash-alt me-2"></i>Activar</a> -->
                                    <!-- <nuxtLink data-v-step="2" :to="'cupones/' + data.id"
                                        class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i
                                            class="fas fa-gift text-dark me-2" aria-hidden="true"></i>Cupones
                                    </nuxtLink> -->
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
                    <img width="100" style="border-radius: 50%;" :src="`${images}/${companie.filename}`" alt="">
                    <!-- <h6 class="mb-0">Informacion Encuesta</h6> -->
                </div>
                <div class="card-body p-3">
                    <ul class="list-group flex_card_question">
                        <!-- todas la sub categorias -->
                        <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                            <div class="d-flex flex-column text-center">
                                <h5 class="text-sm">No se han creado Sucursales, inicia en el icono <nuxt-link
                                        :to="`sucursales/create`">
                                        <div data-v-step="0"
                                            style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                                            <!-- <h6>Crear</h6> -->
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
        <!-- <pre>{{ sucursales }}</pre> -->
    </div>
</template>

<script>
import Api from '../../../api/API_feedback';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import images from '../../../api/URL_imges';
export default {
    name: 'FeedbackAppSucursales',

    data() {
        return {
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
            user: [],
            companie: {},
            steps: [
                {
                    target: '[data-v-step="0"]',  // We're using document.querySelector() under the hood
                    content: `En este icono podras crear una nueva sucursal`,
                },
                {
                    target: '[data-v-step="1"]',
                    content: 'Despues de crear tu sucursal, aqui se visualizara con los datos que has creado',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '[data-v-step="2"]',
                    content: 'Aqui puedes modificar datos de la sucursal',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '[data-v-step="3"]',
                    content: 'Aqui puedes elimirar la sucursal',
                    params: {
                        // placement: 'top'
                    }
                }
            ]
        };
    },

    async mounted() {
        // console.log(this.$route);
        this.user = JSON.parse(localStorage.getItem("user"))
        this.companie = JSON.parse(localStorage.getItem("companie"))
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        this.sucursales = this.datacompanie.lists.sucursales
        // await this.verdata();
        // await this.getDataCompanie()
    },

    methods: {
        async verdata() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/home/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            localStorage.setItem("datacompanie", JSON.stringify(data));
            this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
            this.sucursales = this.datacompanie.lists.sucursales
        },
        iniciar() {
            this.$tours['sucursales'].start();
        },
        async putActiveOffice(id) {
            const params = {
                state: 1
            }
            const data = await this.$axios.$put(`${Api}/branchoffices/state/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            await this.verdata();
        },
        async putDesactivOffice(id) {
            const params = {
                state: 0
            }
            const data = await this.$axios.$put(`${Api}/branchoffices/state/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            await this.verdata();
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
                title: `¿Seguro de Activar a ${data.name}-${data.address}`,
                text: "El personal ya podran acceder a esta compañia",
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
                    this.putActiveOffice(data.id);
                    swalWithBootstrapButtons.fire(
                        {
                            title: 'Listo!',
                            text: 'Se habilito la Compañia',
                            icon: 'success',
                            timer: 1500,
                        }
                    )
                    // this.verdata();
                    // location.href = `/${this.user.nameCompanie}/sucursales`
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    // console.log('no se elimina')
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
                title: `¿Seguro de inhabilitar a ${data.name}-${data.address}?`,
                text: "El personal no podra acceder a esta compañia",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-trash-alt me-2"></i> Si, Inhabilitar!',
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
                    this.putDesactivOffice(data.id);
                    swalWithBootstrapButtons.fire(
                        {
                            title: 'Listo!',
                            text: 'Se Inhabilito la Compañia',
                            icon: 'success',
                            timer: 1500,
                        }
                    )
                    // this.verdata();
                    // location.href = `/${this.user.nameCompanie}/sucursales`
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    // console.log('no se elimina')
                }
            })
        }

    },
};
</script>

<style  scoped></style>