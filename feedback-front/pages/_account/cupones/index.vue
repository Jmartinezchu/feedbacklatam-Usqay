<template>
    <!-- en este index se filtran todas las sucursales de la compañia  -->
    <div>
        <v-tour name="sucursales" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <div class="mt-2">
                    <h5> Mis Sucursales Activas
                        <v-dialog v-model="dialog" width="500">
                            <template v-slot:activator="{ on, attrs }">
                                <button v-bind="attrs" v-on="on">
                                    <v-icon class="mx-2">info</v-icon>
                                </button>
                            </template>
                            <v-card>
                                <v-card-title class="text-h5 grey lighten-2">
                                    Minimo de Cupones 3
                                </v-card-title>

                                <v-card-text>
                                    Para que los clientes puedan participar de los cupones brindados por su negocio nimino
                                    tiene que crear 3 cupones con stock diferente de 0 y habilitados
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="bg-danger text-white" text @click="dialog = false">
                                        ok
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <!-- <button><v-icon class="mx-2">info</v-icon></button> -->
                    </h5>

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
            <div class="col-md-4 mt-4" v-for="(data, index) in sucursales" :key="index"
                :class="{ Blurred: data.state == '0' }">
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
                                    <button @click="storageSucrsalid(data)" data-v-step="2"
                                        class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
                                        <i class="fas fa-gift text-dark me-2" aria-hidden="true"></i>Cupones</button>

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
                                <h5 class="text-sm">No se han creado Sucursales, inicia en el icono <nuxt-link
                                        :to="`sucursales/create`">
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
        <!-- <pre>{{ sucursales }}</pre> -->
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
        this.companie = JSON.parse(localStorage.getItem("companie"))
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        this.sucursales = this.datacompanie.lists.sucursales

        // console.log(this.sucursales);
        // await this.verdata();
        // await this.getDataCompanie()
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
        storageSucrsalid(data) {
            localStorage.setItem("sucursal", JSON.stringify(data));
            location.href = `cupones/${data.id}`
        },
        async verdata() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/branchoffices/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.sucursales = data;
            // console.log(data);
        },
        iniciar() {
            this.$tours['sucursales'].start();
        },
        getDelete(id) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: '¿Seguro de Eliminar sucursal?',
                text: "Se eliminaran todos los datos que tengan relacion con la sucursal",
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
                    this.sucursalDelete(id);
                    swalWithBootstrapButtons.fire(
                        {
                            title: '¡Eliminado!',
                            text: 'Se elimino la Sucursal',
                            icon: 'success',
                            timer: 3000,
                        }
                    )
                    // location.href = 'Zhu Roll/sucursales'
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

<style scoped>
.Blurred {
    display: none !important;
}
</style>