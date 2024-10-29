<template>
    <div>
        <div class="flex" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link to="generateQrCards/create">
                    <div style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <v-btn icon>
                            <v-icon>add_circle</v-icon>
                        </v-btn>
                        <strong class="text-dark pr-2">
                            <h5>Añadir</h5>
                        </strong>
                    </div>
                </nuxt-link>
                <div>
                    <h5 class="mt-2">Mis QRs Links</h5>
                </div>
            </div>
        </div>
        <!-- info encuensta -->
        <div class="row" v-if="qrsLinks.length > 0">
            <div class="col-md-6 mt-4" v-for="data in qrsLinks" :key="data.id">
                <div class="card">
                    <div class="card-header pb-0 px-3 d-flex" style="justify-content: space-between;">
                        <h6 class="mb-0">{{ data.sucursal }}/ {{ data.city }}</h6>
                        <div class="dropdown" style="display: flex; justify-content: end;">
                            <button class="btn btn-secondary bg-danger dropdown-toggle" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <nuxtLink :to="`generateQrCards/` + data.id" class="dropdown-item" type="button"><i
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
                    <div class="card-body p-3">
                        <ul class="list-group">
                            <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg"
                                style="justify-content: space-around">
                                <div class="d-flex flex-column">

                                    <!-- <span class="mb-2 text-xs">Compañia <span class="text-dark ms-sm-2 font-weight-bold">{{
                                        data.nameCompanie }}</span></span> -->
                                    <span class="mb-2 text-xs">Link: <a target="_blank"
                                            :href="`${URL_feedback}/links/${data.id}`"
                                            class="text-dark ms-sm-2 font-weight-bold">
                                            {{ URL_feedback }}/links/{{ data.id }}
                                        </a></span>
                                </div>
                                <div class="d-flex flex-column" style="height: 32px;">
                                    <span v-if="data.state == 1"
                                        class="badge px-3 py-2 my-1 badge-sm bg-gradient-success">Online</span>
                                    <span v-if="data.state == 0"
                                        class="badge px-3 py-2 my-1 badge-sm bg-gradient-danger">Offline</span>
                                </div>

                            </li>
                            <nuxt-link :to="`generateQrCards/${data.id}/miQr`"
                                class="btn btn-link bg-danger text-white px-3 mb-0">
                                <div style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                                    Ver Qr <span style="opacity: 0;">//</span><v-icon
                                        class="text-white me-2">visibility</v-icon>
                                </div>
                            </nuxt-link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="card" data-v-step="1">
                <div class="card-header pb-0 px-3" style="text-align:center">
                    <v-icon style="font-size:100px">link</v-icon>
                </div>
                <div class="card-body p-3">
                    <ul class="list-group flex_card_question">
                        <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                            <div class="d-flex flex-column text-center">
                                <h5 class="text-sm">No se ha creado ningun Qr Link para descargar, inicia en el icono
                                    <nuxt-link :to="`generateQrCards/create`">
                                        <div data-v-step="0"
                                            style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
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
import Api from '../../../api/API_feedback';
import front from '../../../api/URL_feedback';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import images from '../../../api/URL_imges';
import URL_feedback from '../../../api/URL_feedback';
export default {
    name: 'FeedbackAppIndex',
    data() {
        return {
            URL_feedback,
            images: images,
            front: front,
            user: [],
            qrs: [],
            qrsLinks: [],
            datacompanie: {},
            getUrlQr: null,
            src2: "/img/icon2.png",
            bg_qr: "/img/rojo.webp",
            companie: {},
        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.companie = JSON.parse(localStorage.getItem("companie"));
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        this.qrsLinks = this.datacompanie.lists.multilinks
        // await this.verdata();

    },

    methods: {
        // async getDataCompanie() {
        //     let id = this.user.idCompanie
        //     const data = await this.$axios.$get(`${Api}/companies/` + id).catch(error => {
        //         console.log('Request canceled', error)
        //     })
        //     this.companie = data[0]
        //     // console.log(data[0]);
        // },
        async actualizarData() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/home/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            localStorage.setItem("datacompanie", JSON.stringify(data));
            this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"));
            this.qrsLinks = this.datacompanie.lists.multilinks;
        },

        async verdataOld() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/qrlinks/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.qrs = data;
            // console.log(data);
        },
        async verdata() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/qrlinks/links/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.qrsLinks = data;
            // console.log(data);
            localStorage.setItem("qrLinks", JSON.stringify(this.qrsLinks));
        },
        async putActiveQr(id) {
            const params = {
                state: 1
            }
            const data = await this.$axios.$put(`${Api}/qrlinks/state/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            // this.verdata();
            this.actualizarData();
        },
        async putDesactivQr(id) {
            const params = {
                state: 0
            }
            const data = await this.$axios.$put(`${Api}/qrlinks/state/${id}`, params).catch(error => {
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
                title: `¿Seguro de Activar a este QR`,
                text: "Se activara el QR",
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
                    this.putActiveQr(data.id);
                    swalWithBootstrapButtons.fire(
                        {
                            title: 'Listo!',
                            text: 'Se habilito al Usuario',
                            icon: 'success',
                            timer: 1500,
                        }
                    )

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
                title: `¿Seguro de ocultar este QR?`,
                text: "El usuario no podra acceder al QR",
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
                    this.putDesactivQr(data.id);
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
                    console.log('no se elimina')
                    // this.verdata();
                }
            })
        },
        async deleteQr(id) {
            const data = await this.$axios.$delete(`${Api}/qrlinks/links/${id}`).catch(error => {
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
                title: `¿Seguro de Eliminar este Qr?`,
                text: "Si no quieres borrar puedes ocultar",
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
                    this.deleteQr(data.id);
                    swalWithBootstrapButtons.fire(
                        {
                            title: '¡Eliminado!',
                            text: 'Se elimino el Qr',
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
    },
};
</script>

<style lang="scss" scoped></style>
