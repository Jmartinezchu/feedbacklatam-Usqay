<template>
    <div>
        <v-tour name="cupones" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="this.idSucursal + `/create`">
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
                    <h5>Cupones de {{ sucursal.name }}/<span style="opacity: 0;">/</span></h5>
                </div>
                <!-- <br> -->
                <div class="mt-2">
                    <h5>Total {{ cupones.length }}</h5>
                </div>
            </div>

            <div class="col-3 text-center">
                <button @click="iniciar" class="d-flex">
                    <v-icon>mouse</v-icon>
                    <h6> ¿Como creo mi cupón?</h6>
                </button>
            </div>
        </div>

        <!-- info encuensta -->
        <div class="row" v-if="cupones.length > 0">
            <!-- crad info cada encuesta -->
            <div class="col-md-4 mt-4" v-for="data in cupones" :key="data.id">
                <div class="card" data-v-step="1">
                    <div class="card-header pb-0 px-3" style="text-align:center">
                        <v-icon style="font-size:50px">redeem</v-icon>
                        <h6 class="mb-0">{{ data.nombre }} <span
                                v-if="data.nombre === 'Sigue intentando'"><i>Predeterminado</i></span></h6>
                        <!-- <h6 class="m-0" ></h6> -->
                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <!-- todas la sub categorias -->
                            <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                                <div class="d-flex flex-column text-center">
                                    <h6 class="text">{{ data.valor }}</h6>
                                    <span class="mb-2 text-xs">
                                        <span class="text-dark font-weight-bold ms-sm-2">
                                            inicio: {{ data.inicio }}
                                        </span>
                                        <!-- <br> -->
                                        <span class="text-dark font-weight-bold ms-sm-2">
                                            final: {{ data.final }}
                                            <!-- {{ mostrarFechas(data) }} -->
                                        </span>
                                    </span>
                                    <span class="mb-2 text-xs">
                                        <span class="text-dark font-weight-bold ms-sm-2">
                                            Stock: {{ data.stock }}
                                        </span>
                                    </span>
                                </div>
                                <div class="ms-auto text-center ">
                                    <a data-v-step="3" @click="getDelete(data)"
                                        class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                            class="far fa-trash-alt me-2"></i>Delete</a>
                                    <nuxtLink data-v-step="2" :to="idSucursal + `/` + data.id"
                                        class="btn btn-link text-dark px-3 mb-0"><i class="fas fa-pencil-alt text-dark me-2"
                                            aria-hidden="true"></i>Edit
                                    </nuxtLink>
                                    <a v-if="data.state == 0" @click="validarActivStock(data)"
                                        class="w-100 btn btn-link text-secondary bg-dark text-gradient px-3 mb-0"
                                        href="javascript:;"><i class="far fa-eye-slash me-2"></i>Oculto</a>
                                    <a v-if="data.state == 1" @click="getStateInactive(data)"
                                        class="w-100 btn btn-link text-success text-gradient px-3 mb-0"
                                        href="javascript:;"><i class="far fa-eye me-2"></i>Activado</a>
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
                    <!-- <h6 class="mb-0">Informacion Encuesta</h6> -->
                </div>
                <div class="card-body p-3">
                    <ul class="list-group flex_card_question">
                        <!-- todas la sub categorias -->
                        <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                            <div class="d-flex flex-column text-center">
                                <h5 class="text-sm">No se han creado Cupones para esta sucursal, inicia en el icono
                                    <nuxt-link @click="evento()" :to="this.idSucursal + `/create`">
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
        <!-- {{ fechahoy }}
        <pre>{{ cupones }}</pre> -->
    </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../../../../api/API_feedback';
import images from '../../../../api/URL_imges';

export default {
    name: 'FeedbackAppIndex',

    data() {
        return {
            fechahoy: new Date(),
            companie: {},
            images: images,
            user: [],
            ruta: this.$route.params,
            sucursales: [],
            sucursal: [],
            idSucursal: null,
            cupones: [],
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
                    content: `En este icono podras crear todos cupones que quieras ofrecerle al tus encuestados que ingrrsen sus datos en el formulario`,
                },
                {
                    target: '[data-v-step="1"]',
                    content: 'Despues de crear tu cupon aqui se visualizara y se elimiaran de acuerdo a la fecha establecida',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '[data-v-step="2"]',
                    content: 'Aqui puedes modificar datos del cupón',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '[data-v-step="3"]',
                    content: 'Aqui puedes elimirar el cupónn',
                    params: {
                        // placement: 'top'
                    }
                }
            ]
        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"))
        this.companie = JSON.parse(localStorage.getItem("companie"))
        this.idSucursal = this.$route.params.idSucursal


        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        this.sucursales = this.datacompanie.lists.sucursales
        this.verdata(this.sucursales);
    },

    methods: {
        mostrarFechas(txt) {
            let fechaini = new Date(txt.inicio).toLocaleDateString();
            let fechafin = new Date(txt.final).toLocaleDateString();
            return `Inicio: ${fechaini} - Fin: ${fechafin}`;
        },
        verdata(sucursales) {
            const lengthsucu = sucursales.length
            for (let index = 0; index < lengthsucu; index++) {
                if (sucursales[index].id == this.ruta.idSucursal) {
                    this.sucursal = sucursales[index]
                    this.cupones = this.sucursal.cupones[0]
                }
            }
            // console.log(this.sucursal);
        },
        iniciar() {
            this.$tours['cupones'].start();
        },
        async actualizarData() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/home/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            localStorage.setItem("datacompanie", JSON.stringify(data));
            this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"));
            this.sucursales = this.datacompanie.lists.sucursales;
            this.verdata(this.sucursales);
        },
        async deleteCupon(id) {
            const data = await this.$axios.$delete(`${Api}/cupones/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
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
                title: `¿Seguro de Eliminar Cupón ${data.nombre}?`,
                text: "Los que tengan ganado este cupón podran reclamarlo hasta la fecha limite ",
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
                    this.deleteCupon(data.id);
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
        async putActiveCupon(id) {
            const params = {
                state: 1
            }
            const data = await this.$axios.$put(`${Api}/cupones/state/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            this.actualizarData();
        },
        async putDesactivCupon(id) {
            const params = {
                state: 0
            }
            const data = await this.$axios.$put(`${Api}/cupones/state/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            this.actualizarData();
        },
        async putSockcero(id) {
            const params = {
                stock: 0
            }
            const data = await this.$axios.$put(`${Api}/cupones/stock/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            // this.verdata();
        },
        async putDesactivCuponSock(id) {
            const params = {
                stock: 0
            }
            const data = await this.$axios.$put(`${Api}/cupones/stock/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            this.actualizarData();
        },
        validarActivStock(data) {
            // console.log(data.stock);
            let editable = false
            const fechahoyc = new Date();
            const dateInicio = new Date(data.inicio);
            const dateFinal = new Date(data.final);
            dateFinal.setDate(dateFinal.getDate() + 1);

            const fechahoynum = fechahoyc.getTime();
            const inicionum = dateInicio.getTime();
            const finalnum = dateFinal.getTime();

            if (fechahoynum >= inicionum && fechahoynum <= finalnum) {
                editable = true
            }
            if (data.stock === 0 && editable === true) {
                Swal.fire({
                    icon: 'error',
                    title: 'El stock esta en 0',
                    text: 'Edite el Stock del cupón',
                    customClass: {
                        confirmButton: 'btn mx-1 btn-danger',
                        cancelButton: 'btn mx-1 btn-danger'
                    },
                })
            } else if (editable === false) {
                Swal.fire({
                    icon: 'error',
                    title: 'El cupón esta caducado, Actualiza!',
                    text: 'Edite la Fecha de finnalización del cupón',
                    customClass: {
                        confirmButton: 'btn mx-1 btn-danger',
                        cancelButton: 'btn mx-1 btn-danger'
                    },
                })
            } else {
                this.getStateActive(data)
            }


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
                title: `¿Seguro de Activar a ${data.nombre}`,
                text: "sus Clientes podran participar por este cupon",
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
                    this.putActiveCupon(data.id);
                    swalWithBootstrapButtons.fire(
                        {
                            title: 'Listo!',
                            text: 'Se habilito la Compañia',
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
                title: `Inhabilitar <b>${data.nombre}</b>`,
                text: "Los usuarios no podran obtener este cupón porque estara oculto",
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
                    this.putDesactivCupon(data.id);
                    swalWithBootstrapButtons.fire(
                        {
                            title: 'Listo!',
                            text: 'Se Inhabilito el cupón',
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

<style></style>