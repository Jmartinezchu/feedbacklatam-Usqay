<template>
    <div>
        <v-tour name="personal" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`personal/create`">
                    <div data-v-step="0"
                        style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <!-- <h6>Crear</h6> -->
                        <v-btn icon>
                            <v-icon>add_circle</v-icon>
                        </v-btn>
                        <strong class="text-dark pr-2">
                            <h5>Añadir -</h5>
                        </strong>
                    </div>
                </nuxt-link>
                <div class="mt-2">
                    <h5>Mi Personal</h5>
                </div>
            </div>

            <div class="col-3 text-center">
                <button @click="iniciar" class="d-flex">
                    <v-icon>mouse</v-icon>
                    <h6> ¿Que puedo hacer aqui?</h6>
                </button>
            </div>
        </div>

        <!-- info encuensta -->
        <div class="row" v-if="personals.length > 0">
            <!-- crad info cada encuesta -->
            <div class="col-md-4 mt-4" v-for="user in personals" :key="user.id">
                <div class="card" data-v-step="1">
                    <div class="card-header pb-0 px-3" style="text-align:center">
                        <!-- <img width="100" src="/img/empresa.png" alt=""> -->
                        <v-icon style="font-size:50px">badge</v-icon>
                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <!-- todas la sub categorias -->
                            <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                                <div class="d-flex flex-column text-center">
                                    <h5 class="text-sm">{{ user.name }}</h5>
                                    <h5 class="text-sm">{{ user.usuario }}</h5>
                                    <!-- <span class="mb-2 text-xs"> Options<span
                                            class="text-dark font-weight-bold ms-sm-2">Si / No</span></span> -->
                                </div>
                                <div class="ms-auto text-center ">
                                    <!-- <a data-v-step="3" @click="getDelete(user.id)"
                                        class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                            class="far fa-trash-alt me-2"></i>Delete</a> -->
                                    <!-- <nuxt-link :to="'personal/' + user.id" data-v-step="2"
                                        class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i
                                            class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit
                                    </nuxt-link> -->


                                    <button data-v-step="3" @click="getDelete(user)"
                                        class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                            class="far fa-trash-alt me-2"></i>Delete</button>
                                    <nuxtLink :to="'personal/' + user.id" data-v-step="2"
                                        class="btn btn-link text-dark px-3 mb-0"><i class="fas fa-pencil-alt text-dark me-2"
                                            aria-hidden="true"></i>Edit
                                    </nuxtLink>
                                    <button v-if="user.state == 0" @click="getStateActive(user)"
                                        class="w-100 btn btn-link text-secondary bg-dark text-gradient px-3 mb-0"
                                        href="javascript:;"><i class="far fa-eye-slash me-2"></i>Sin Acceso</button>
                                    <button v-if="user.state == 1" @click="getStateInactive(user)"
                                        class="w-100 btn btn-link text-success text-gradient px-3 mb-0"
                                        href="javascript:;"><i class="far fa-eye me-2"></i>Habilitado</button>
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
                    <img width="100" :src="`${images}/${user.filename}`" alt="">
                    <!-- <h6 class="mb-0">Informacion Encuesta</h6> -->
                </div>
                <div class="card-body p-3">
                    <ul class="list-group flex_card_question">
                        <!-- todas la sub categorias -->
                        <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                            <div class="d-flex flex-column text-center">
                                <h5 class="text-sm">No se han asigando personas a esta compañia, inicia en el icono
                                    <nuxt-link :to="`personal/create`">
                                        <div data-v-step="0"
                                            style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                                            <!-- <h6>Crear</h6> -->
                                            <v-btn icon>
                                                <v-icon>add_circle</v-icon>
                                            </v-btn>
                                        </div>
                                    </nuxt-link>
                                </h5>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../../../api/API_feedback';
import images from '../../../api/URL_imges';
export default {
    name: 'FeedbackAppSucursales',

    data() {
        return {
            user: [],
            images: images,
            personals: [],
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
        this.user = JSON.parse(localStorage.getItem("user"))
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        this.personals = this.datacompanie.lists.personal
        // await this.verdata()
    },

    methods: {
        async actualizarData() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/home/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            localStorage.setItem("datacompanie", JSON.stringify(data));
            this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"));
            this.personals = this.datacompanie.lists.personal
            // this.verdata(this.sucursales);
        },
        async verdata() {
            const data = await this.$axios.$get(`${Api}/personal/` + this.user.idCompanie).catch(error => {
                console.log('Request canceled', error)
            })
            this.personals = data;
            // console.log(data);
        },
        iniciar() {
            this.$tours['personal'].start();
        },
        async deletePersonal(id) {
            const data = await this.$axios.$delete(`${Api}/personal/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
            // this.verdata();
            this.actualizarData();

        },
        getDelete(data) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: `¿Seguro de Eliminar el usuario ${data.name}?`,
                text: "se eliminara el Usuario y perdera los accesos",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-trash-alt me-2"></i> Si, Eliminar!',
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
                    // console.log('funcion eliminar')
                    this.deletePersonal(data.id);
                    swalWithBootstrapButtons.fire(
                        {
                            title: '¡Eliminado!',
                            text: 'Se elimino el cupón',
                            icon: 'success',
                            timer: 3000,
                        }
                    )
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    // console.log('no se elimina')
                }
            })
        },
        async putActivePersonal(id) {
            const params = {
                state: 1
            }
            const data = await this.$axios.$put(`${Api}/personal/state/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            // this.verdata();
            this.actualizarData();
        },
        async putDesactivPersonal(id) {
            const params = {
                state: 0
            }
            const data = await this.$axios.$put(`${Api}/personal/state/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            // this.verdata();
            this.actualizarData();
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
                title: `¿Seguro de Activar a ${data.name}`,
                text: "Se activaran las credenciales del usuario",
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
                    this.putActivePersonal(data.id);
                    swalWithBootstrapButtons.fire(
                        {
                            title: 'Listo!',
                            text: 'Se habilito al Usuario',
                            icon: 'success',
                            timer: 1500,
                        }
                    )
                    // this.verdata();
                    // let idSucu = this.$route.params.idSucursal
                    // location.href = `/${this.user.nameCompanie}/cupones/${idSucu}`
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    // console.log('no se elimina')
                    // this.verdata();
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
                title: `¿Seguro de ocultar a ${data.name}`,
                text: "El usuario no podra acceder al sistema",
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
                    this.putDesactivPersonal(data.id);
                    swalWithBootstrapButtons.fire(
                        {
                            title: 'Listo!',
                            text: 'Se Inhabilito al Usuario',
                            icon: 'success',
                            timer: 2500,
                        }
                    )
                    // this.verdata();
                    // let idSucu = this.$route.params.idSucursal
                    // location.href = `/${this.user.nameCompanie}/cupones/${idSucu}`
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    // console.log('no se elimina')
                    // this.verdata();
                }
            })
        }

    },
};
</script>

<style  scoped></style>