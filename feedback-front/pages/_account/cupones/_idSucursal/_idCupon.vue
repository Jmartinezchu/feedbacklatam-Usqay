<template>
    <div>
        <v-tour name="editCupones" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/${companie.name}/cupones/${idSucursal}`">
                    <div data-v-step="2"
                        style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <!-- <h6>Crear</h6> -->
                        <v-btn icon>
                            <v-icon>arrow_back_ios_new</v-icon>
                        </v-btn><strong class="text-dark pr-2">
                            <h5>Regresar -</h5>
                        </strong>
                    </div>
                </nuxt-link>
                <div class="mt-2">
                    <h5>Editar Cupón</h5>
                </div>
            </div>

            <div class="col-3 text-center">
                <button @click="iniciar" class="d-flex">
                    <v-icon>mouse</v-icon>
                    <h6> ¿Que hago aqui?</h6>
                </button>
            </div>
        </div>
        <div class="row">
            <!-- crad info cada encuesta -->
            <div class="col-md-12 mt-4">
                <div class="card" data-v-step="0">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Nombre *</label>
                                    <input class="form-control" v-model="cupon.nombre" type="text" value=""
                                        placeholder="Prmoción">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Detalle *</label>
                                    <input class="form-control" v-model="cupon.valor" type="text" value=""
                                        placeholder="Detalle">
                                </div>
                            </div>
                            <div class="row" data-v-step="1">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Fecha Incio</label>
                                        <input class="form-control" v-model="cupon.inicio" type="date" value="" disabled>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Fecha Fin</label>
                                        <input class="form-control" v-model="cupon.final" type="date" value="">
                                    </div>
                                </div>
                            </div>
                            <div class="row" data-v-step="1">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label" data-v-step="2">
                                            Selecciones la
                                            recurrencia con la que el cliente puede ganar este cupón</label>
                                        <v-radio-group v-model="cupon.recurrencia" row>
                                            <v-radio v-for="data in recurrencias" :key="data.id" color="red"
                                                :label="data.valor" :value="data.id"></v-radio>
                                        </v-radio-group>

                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Stock *</label>
                                        <input class="form-control" v-model="cupon.stock" type="number" value=""
                                            style="width: 100%;" placeholder="Stock">
                                    </div>
                                </div>
                            </div>
                            <!-- <pre>{{ cupon }}</pre> -->

                        </div>
                        <hr class="horizontal dark">
                        <button @click="getEdit(cupon)" data-v-step="3" class="btn btn-danger btn-sm ms-auto mx-5"
                            style="font-size: 15px;">Editar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../../../../api/API_feedback';

export default {
    name: 'FeedbackAppIndex',

    data() {
        return {
            user: [],
            companie: {},
            datacompanie: {},
            cupones: [],
            sucursales: [],
            recurrenciaCupon: null,
            recurrencias: [],
            cupon: {},
            ruta: this.$route.params,
            idSucursal: this.$route.params.idSucursal,
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
                    content: `Modidfica los capos necesarios de este cupón`,
                    params: {
                        placement: 'top'
                    }
                },//Regresa a tus cupones <strong>Aqui</strong>! 
                {
                    target: '[data-v-step="1"]',
                    content: `Despues de completar todos los capos edita tu cupón y listo`,
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '[data-v-step="2"]',
                    content: '<strong>Aqui</strong> para regresar a ver tus Cupones',
                    params: {
                        placement: 'right'
                    }
                },
            ]
        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"))
        this.companie = JSON.parse(localStorage.getItem("companie"))
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        this.sucursales = this.datacompanie.lists.sucursales
        this.recurrencias = this.datacompanie.lists.recurrencias
        this.verdataa(this.sucursales);


        // await this.verdata()
        // await this.verdataRecurrencias();
        // await this.getDataCompanie()
    },

    methods: {
        async updateCupon() {
            const params = {
                nombre: this.cupon.nombre,
                valor: this.cupon.valor,
                stock: this.cupon.stock,
                final: this.cupon.final,
                recurrencia: this.cupon.recurrencia,
            }
            let id = this.$route.params.idCupon
            const data = await this.$axios.$put(`${Api}/cupones/form/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            let idCompanie = this.user.idCompanie
            const datahome = await this.$axios.$get(`${Api}/home/${idCompanie}`).catch(error => {
                console.log('Request canceled', error)
            })
            localStorage.setItem("datacompanie", JSON.stringify(datahome));
        },
        // async verdata() {
        //     // let rparams = this.$route.params
        //     const data = await this.$axios.$get(`${Api}/cupones/${this.ruta.idSucursal}/${this.ruta.idCupon}`).catch(error => {
        //         console.log('Request canceled', error)
        //     })
        //     this.cupon = data[0];
        //     // console.log(data[0]);
        // },
        verdataa(sucursales) {
            const lengthsucu = sucursales.length
            for (let index = 0; index < lengthsucu; index++) {
                if (sucursales[index].id == this.ruta.idSucursal) {
                    // this.sucursal = sucursales[index]
                    // this.cupones = this.sucursal.cupones[0]
                    // console.log(sucursales[index].cupones[0]);
                    this.getcuponID(sucursales[index].cupones[0])
                }
            }
            // console.log(this.sucursal);
        },
        getcuponID(cuponesArray) {
            let lenghtcupones = cuponesArray.length
            for (let index = 0; index < lenghtcupones; index++) {

                if (cuponesArray[index].id == this.ruta.idCupon) {
                    this.cupon = cuponesArray[index]


                }

            }
        },
        async verdataRecurrencias() {
            const data = await this.$axios.$get(`${Api}/recurenciaCupon`).catch(error => {
                console.log('Request canceled', error)
            })
            this.recurrencias = data;
            // console.log(data);
        },
        iniciar() {
            this.$tours['editCupones'].start();
        },

        getEdit(data) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: `¿Seguro de editar Cupón?`,
                text: `Se editaran los datos del cupón ${data.nombre}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-save me-2"></i> Si, Editar!',
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
                    // console.log('funcion Crear')
                    this.updateCupon();
                    swalWithBootstrapButtons.fire(
                        {
                            title: '¡Editar!',
                            text: 'Se Edito el cupón',
                            icon: 'success',
                            timer: 2000,
                        }
                    ).then(() => {
                        // Aquí la alerta se ha cerrado
                        let idSucu = this.$route.params.idSucursal
                        location.href = `/${this.user.nameCompanie}/cupones/${idSucu}`
                    });
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    // console.log('no se crea')
                }
            })
        }
    },
};
</script>

<style lang="scss" scoped></style>