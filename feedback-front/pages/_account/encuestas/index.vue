<template>
    <div>
        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`encuestas/create`">
                    <div style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <!-- <h6>Crear</h6> -->
                        <v-btn icon>
                            <v-icon>add_circle</v-icon>
                        </v-btn><strong class="text-dark pr-2">
                            <h5>Añadir -</h5>
                        </strong>
                    </div>
                </nuxt-link>
                <div class="mt-2">
                    <h5>Mis Formularios</h5>
                </div>
            </div>
            <div class="col-3 text-center">
                <nuxt-link target="_blank" :to="`encuestas/example`" class="d-flex">
                    <h6><v-icon>visibility</v-icon>Demo</h6>
                </nuxt-link>
            </div>
        </div>

        <!-- info encuensta -->
        <div class="row" v-if="encuestas.length > 0">
            <!-- crad info cada encuesta -->
            <div class="col-md-6 mt-4" v-for="data in encuestas" :key="data.id">
                <div class="card">
                    <div class="card-header pb-0 px-3 d-flex" style="justify-content: space-between;">
                        <h6 class="mb-0">Informacion Encuesta</h6>
                        <div class="dropdown" style="    display: flex; justify-content: end;">
                            <button class="btn btn-secondary bg-danger dropdown-toggle" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <!-- <v-icon>more_vert</v-icon> -->
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <nuxtLink :to="`encuestas/` + data.id" class="dropdown-item" type="button"><i
                                            class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</nuxtLink>
                                </li>
                                <li v-if="data.state == 1"><button class="dropdown-item text-secondary" type="button"
                                        @click="getStateInactive(data)"><i
                                            class="far fa-eye-slash me-2"></i>Ocultar</button></li>
                                <li v-if="data.state == 0"><button class="dropdown-item text-success" type="button"
                                        @click="getStateActive(data)"><i class="far fa-eye me-2"></i>Activar</button></li>
                                <li><button @click="getDelete(data)" class="dropdown-item text-danger" type="button"><i
                                            class="far fa-trash-alt me-2"></i>Eliminar</button></li>
                            </ul>
                        </div>
                    </div>

                    <div class="card-body pt-4 p-3">
                        <ul class="list-group">
                            <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg"
                                style="    justify-content: space-around">
                                <div class="d-flex flex-column">
                                    <h6 class="mb-3 text-sm">{{ data.name }}</h6>
                                    <span class="mb-2 text-xs">Autor: <span class="text-dark font-weight-bold ms-sm-2">{{
                                        data.autor }}</span></span>
                                    <span class="mb-2 text-xs">Email: <span class="text-dark ms-sm-2 font-weight-bold">{{
                                        data.gmail_user }}</span></span>
                                </div>
                                <div class="d-flex flex-column" style="height: 32px;">
                                    <span v-if="data.state == 1"
                                        class="badge px-3 py-2 my-1 badge-sm bg-gradient-success">Online</span>
                                    <span v-if="data.state == 0"
                                        class="badge px-3 py-2 my-1 badge-sm bg-gradient-danger">Offline</span>
                                </div>

                            </li>
                            <nuxtLink :to="`encuestas/${data.id}/preguntas`"
                                class="btn btn-link bg-danger text-white px-3 mb-0" href="javascript:;"><i
                                    class="fas fa-list text-white me-2" aria-hidden="true"></i>Ver
                                Preguntas</nuxtLink>
                            <!-- <button class="flex justify-content-center"><a :href="getUrlQr" download=""> Descargar QR
                                    <v-icon>qr_code_scanner</v-icon>
                                </a>
                            </button> -->

                            <!-- <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg d-none">
                                <a :href="getUrlQr" download="">
                                    <vue-qr text="https://github.com" bgSrc="img/rojo.webp" :logoSrc="src2" :size="200"
                                        qid="testid" :callback="test">
                                    </vue-qr>
                                </a>
                            </li> -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="card" data-v-step="1">
                <div class="card-header pb-0 px-3" style="text-align:center">
                    <!-- <img width="100" src="/img/empresa.png" alt=""> -->
                    <!-- <h6 class="mb-0">Informacion Encuesta</h6> -->
                    <v-icon style="font-size:100px">library_add</v-icon>
                </div>
                <div class="card-body p-3">
                    <ul class="list-group flex_card_question">
                        <!-- todas la sub categorias -->
                        <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                            <div class="d-flex flex-column text-center">
                                <h5 class="text-sm">No se ha creado ninguna encuesta, inicia en el icono
                                    <nuxt-link :to="`encuestas/create`">
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
import Api from '../../../api/API_feedback'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
    name: 'FeedbackAppIndex',
    data() {
        return {
            user: [],
            // getUrlQr: null,
            // src2: "img/icon2.png",
            encuestas: [],
            datacompanie: {},
        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        this.encuestas = this.datacompanie.lists.formularios

        // await this.verdata()
        // console.log(this.user);
    },
    methods: {
        // test(url, id) {
        //     this.getUrlQr = url
        //     // console.log(url, id)
        // },
        async actualizarData() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/home/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            localStorage.setItem("datacompanie", JSON.stringify(data));
            this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"));
            this.encuestas = this.datacompanie.lists.formularios

        },
        async verdata() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/formularios/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.encuestas = data;
            // console.log(data);
        },
        async deleteform(id) {
            const data = await this.$axios.$delete(`${Api}/formularios/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
            // await this.verdata();
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
                title: `¿Seguro de Eliminar el formulario ${data.name}?`,
                text: "Si no quieres perder todos tus datos, ocultar es mejor",
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
                    this.deleteform(data.id);
                    swalWithBootstrapButtons.fire(
                        {
                            title: '¡Eliminado!',
                            text: 'Se elimino el formulario',
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
            const data = await this.$axios.$put(`${Api}/formularios/state/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            // this.verdata();
            this.actualizarData();
        },
        async putDesactivPersonal(id) {
            const params = {
                state: 0
            }
            const data = await this.$axios.$put(`${Api}/formularios/state/${id}`, params).catch(error => {
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

<style lang="scss" scoped></style>