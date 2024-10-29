<template>
    <div>
        <v-tour name="createsucursales" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/${companie.name}/sucursales`">
                    <div data-v-step="2"
                        style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <v-btn icon>
                            <v-icon>arrow_back_ios_new</v-icon>
                        </v-btn><strong class="text-dark pr-2">
                            <h5>Regresar -</h5>
                        </strong>
                    </div>
                </nuxt-link>
                <div class="mt-2">
                    <h5>Nueva Sucursal para --> {{ companie.name }}</h5>
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
                        <button @click="getcreate()" data-v-step="1" class="btn btn-danger btn-sm ms-auto mx-5"
                            style="font-size: 15px;">Crear</button>
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
            form: {
                name: "",
                city: "",
                state: 1,
                address: "",
                id_companie: null,
            },
            companie: {},
            user: [],
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
                    content: `Despues de completar todos los campos click en crear y listo`,
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
        this.form.id_companie = this.user.idCompanie
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
        async addSucursal() {
            const params = {
                name: this.form.name,
                city: this.form.city,
                state: this.form.state,
                address: this.form.address,
                id_companie: this.form.id_companie,

            }
            const data = await this.$axios.$post(`${Api}/branchoffices`, params).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data.deploy.insertId);
            let idSucu = data.deploy.insertId
            await this.addCupon(idSucu)

        },
        async addCupon(idSucu) {
            let fechHoy = new Date()
            let fechFin = new Date()
            fechFin.setFullYear(fechFin.getFullYear() + 2)
            const params = {
                nombre: 'Sigue Intentando',
                valor: 'Hasta la proxima',
                stock: 999999,
                inicio: `${fechHoy.getFullYear() + '-' + fechHoy.getMonth() + '-' + fechHoy.getDate()}`,
                final: `${fechFin.getFullYear() + '-' + fechFin.getMonth() + '-' + fechFin.getDate()}`,
                state: 1,
                recurrencia: 3,
                branch_id: idSucu,
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
        iniciar() {
            this.$tours['createsucursales'].start();
        },

        getcreate() {
            if (this.form.name != "" && this.form.address != "" && this.form.city != "") {

                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn mx-1 btn-success',
                        cancelButton: 'btn mx-1 btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: `¿Seguro de crear ${this.form.name} ?`,
                    text: "Se creara la sucursal",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '<i class="far fa-save me-2"></i> Si, Crear!',
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
                        this.addSucursal()
                        swalWithBootstrapButtons.fire(
                            {
                                title: 'Creado!',
                                text: 'Se creo la Sucursal',
                                icon: 'success',
                                timer: 2000,
                            }
                        ).then(() => {
                            // Aquí la alerta se ha cerrado
                            // location.href = '/sucursales'
                            this.form.name = ""
                            this.form.city = ""
                            this.form.address = ""
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
                    confirmButtonColor: '#ff0000'
                })
                // console.log('ingresar todos los datos');
            }

        }
    },
};
</script>

<style scoped></style>