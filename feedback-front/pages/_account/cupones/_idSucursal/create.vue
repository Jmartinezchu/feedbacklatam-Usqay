<template>
    <div>
        <v-tour name="createCupones" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/${companie.name}/cupones/${idSucursal}`">
                    <div data-v-step="4"
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
                    <h5>Nuevo Cupón</h5>
                </div>
            </div>

            <div class="col-3 text-center">
                <button @click="iniciar" class="d-flex">
                    <v-icon>mouse</v-icon>
                    <h6> ¿Que hago aqui?</h6>
                </button>
            </div>
        </div>
        <!-- formulario crear cupón -->
        <div class="row">
            <!-- crad info cada encuesta -->
            <div class="col-md-12 mt-4">
                <div class="card" data-v-step="0">
                    <div class="card-header pb-0 px-3" style="text-align:center">
                        <!-- <img width="100" src="img/empresa.png" alt=""> -->
                        <h6 class="mb-0">Nombre de la promocion</h6>
                    </div>
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Nombre *</label>
                                    <input class="form-control" v-model="cupon.name" type="text" value=""
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
                                        <input class="form-control" v-model="cupon.inicio" type="date" value=""
                                            placeholder="Ciudad">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Fecha Fin</label>
                                        <input class="form-control" v-model="cupon.final" type="date" value=""
                                            placeholder="Dirección">
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

                            <!-- <pre>{{ user }}</pre> -->

                        </div>
                        <hr class="horizontal dark">
                        <button @click="getcreate()" data-v-step="3" class="btn btn-danger btn-sm ms-auto mx-5"
                            style="font-size: 15px;">Crear</button>
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
    name: 'FeedbackAppCreate',

    data() {
        return {
            user: [],
            companie: {},
            sucursal: [],
            idSucursal: this.$route.params.idSucursal,
            recurrencias: [],
            cupon: {
                name: "",
                valor: "",
                stock: null,
                inicio: "",
                final: "",
                state: 1,
                recurrencia: 3,
                branch_id: ""
            },
            recurrenciaCupon: "3",
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
                    content: `Completa todos los datos de este formulario`,
                    params: {
                        placement: 'top'
                    }
                },//Regresa a tus cupones <strong>Aqui</strong>! 
                {
                    target: '[data-v-step="1"]',
                    content: `Establece el <strong>inicio</strong> y muy importate el <strong>fin</strong> de este cupón`,
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '[data-v-step="2"]',
                    content: 'Elige cuantas veces se pueden ganar este Cupón',
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '[data-v-step="3"]',
                    content: 'Despues de completar todos los capos crea tu cupón y listo',
                    params: {
                        // placement: 'top'
                    }
                },
                {
                    target: '[data-v-step="4"]',
                    content: `<strong>Aqui</strong> para regresar a ver tus Cupones`,
                    params: {
                        // placement: 'top'
                    }
                }
            ]
        };
    },

    async mounted() {
        // console.log(this.nameComanie);
        this.user = JSON.parse(localStorage.getItem("user"));
        this.companie = JSON.parse(localStorage.getItem("companie"))
        this.sucursal = JSON.parse(localStorage.getItem("idSucursal"))
        // console.log(this.$route.params.idSucursal);
        this.cupon.branch_id = this.$route.params.idSucursal
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        this.recurrencias = this.datacompanie.lists.recurrencias
        // await this.verdataRecurrencias();
        // await this.getDataCompanie()
    },
    created() {


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

        iniciar() {
            this.$tours['createCupones'].start();
        },
        async verdataRecurrencias() {
            const data = await this.$axios.$get(`${Api}/recurenciaCupon`).catch(error => {
                console.log('Request canceled', error)
            })
            this.recurrencias = data;
            // console.log(data);
        },

        async addCupon() {
            const params = {
                nombre: this.cupon.name,
                valor: this.cupon.valor,
                stock: this.cupon.stock,
                inicio: this.cupon.inicio,
                final: this.cupon.final,
                state: this.cupon.state,
                recurrencia: this.cupon.recurrencia,
                branch_id: this.cupon.branch_id,
                id_companie: this.user.idCompanie
            }
            const data = await this.$axios.$post(`${Api}/cupones`, params).catch(error => {
                console.log('Request canceled', error)
            })
            let id = this.user.idCompanie
            const datahome = await this.$axios.$get(`${Api}/home/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            localStorage.setItem("datacompanie", JSON.stringify(datahome));
            // console.log(data);
        },


        getcreate() {

            if (this.cupon.name != "" && this.cupon.valor != "" && this.cupon.inicio != "" && this.cupon.final != "" && this.cupon.stock != null) {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn mx-1 btn-success',
                        cancelButton: 'btn mx-1 btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: `¿Seguro de registrar el cupon ${this.cupon.name} ?`,
                    text: `Se descripcion = ${this.cupon.valor}`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '<i class="far fa-save me-2"></i> Si, crear!',
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
                        this.addCupon()
                        swalWithBootstrapButtons.fire(
                            {
                                title: 'Creado!',
                                text: 'Se creo el Cupón',
                                icon: 'success',
                                timer: 2000,
                            }
                        ).then(() => {
                            // Aquí la alerta se ha cerrado
                            this.cupon.name = ""
                            this.cupon.valor = ""
                            this.cupon.inicio = ""
                            this.cupon.final = ""
                            // location.href = `/${this.user.nameCompanie}/companies`
                        });
                    } else if (
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        // console.log('no se crea')
                    }
                })

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ingresar todos los datos!',
                    customClass: {
                        confirmButton: 'btn mx-1 btn-danger',
                        cancelButton: 'btn mx-1 btn-danger'
                    },
                })
                // console.log('ingresar todos los datos');
            }

        }
    },
};
</script>

<style>
.theme--light.v-label {
    color: rgb(0 0 0 / 77%) !important;
    font-size: 11px !important;
    margin: 0 !important;
}
</style>