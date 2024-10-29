<template>
    <div>
        <v-tour name="editsucursales" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/${companie.name}/sucursales`">
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
                    <h5>Editar Sucursal</h5>
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
            <div class="col-md-12 mb-3">
                <div class="card" data-v-step="0">
                    <div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Nombre *</label>
                                        <input class="form-control" v-model="form.name" type="text" value=""
                                            placeholder="Sucursal">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Ciudad *</label>
                                        <input class="form-control" v-model="form.city" type="text" value=""
                                            placeholder="Ciudad">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Direccion *</label>
                                        <input class="form-control" v-model="form.address" type="text" value=""
                                            placeholder="Direccion">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Compañia</label>
                                        <input class="form-control" type="text" :value="companie.name" disabled
                                            placeholder="Descripcion">
                                    </div>
                                </div>
                            </div>
                            <hr class="horizontal dark">
                        </div>
                        <button @click="getEdit()" data-v-step="1" class="btn btn-danger btn-sm ms-auto mx-5"
                            style="font-size: 15px;">Editar</button>
                        <!-- <pre>{{ form }}</pre> -->

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../../../api/API_feedback';
export default {
    name: 'FeedbackAppIdEdit',
    data() {
        return {
            companie: {},
            user: [],
            form: [],
            ruta: this.$route.params,
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
                    content: `Modidfica los capos necesarios de esta sucursal`,
                    params: {
                        placement: 'top'
                    }
                },//Regresa a tus cupones <strong>Aqui</strong>! 
                {
                    target: '[data-v-step="1"]',
                    content: `Despues de completar todos los campos click en editar y listo`,
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '[data-v-step="2"]',
                    content: '<strong>Aqui</strong> para regresar a ver tus sucursales',
                    params: {
                        // placement: 'right'
                    }
                },
            ],
        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"))
        this.companie = JSON.parse(localStorage.getItem("companie"))
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        this.sucursales = this.datacompanie.lists.sucursales
        this.verdata(this.sucursales);
    },

    methods: {
        async updateOffice() {
            const params = {
                name: this.form.name,
                city: this.form.city,
                address: this.form.address,
            }
            let id = this.$route.params.idSucursal
            const data = await this.$axios.$put(`${Api}/branchoffices/form/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            let idCompanie = this.user.idCompanie
            const datahome = await this.$axios.$get(`${Api}/home/${idCompanie}`).catch(error => {
                console.log('Request canceled', error)
            })
            localStorage.setItem("datacompanie", JSON.stringify(datahome));
        },
        verdata(sucursales) {
            const lengthsucu = sucursales.length
            for (let index = 0; index < lengthsucu; index++) {
                if (sucursales[index].id == this.ruta.idSucursal) {
                    this.form = sucursales[index]
                }
            }
        },
        iniciar() {
            this.$tours['editsucursales'].start();
        },
        getEdit() {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: '¿Seguro de editar sucursal?',
                text: "Se editaran los datos la sucursal",
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
                    this.updateOffice();
                    swalWithBootstrapButtons.fire(
                        {
                            title: '¡Editar!',
                            text: 'Se Edito la Sucursal',
                            icon: 'success',
                            timer: 2000,
                        }
                    ).then(() => {
                        // Aquí la alerta se ha cerrado
                        location.href = `/${this.user.nameCompanie}/sucursales`
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

<style scoped></style>