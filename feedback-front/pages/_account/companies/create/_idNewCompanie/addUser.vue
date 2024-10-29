<template>
    <div>
        <v-tour name="createsucursales" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/${user.nameCompanie}/companies`">
                    <div data-v-step="2"
                        style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <!-- <h6>Crear</h6> -->
                        <v-btn icon>
                            <v-icon>arrow_back_ios_new</v-icon>
                        </v-btn>
                    </div>
                </nuxt-link>
                <div class="mt-2">
                    <h5>Registra una contraseña - Administrador</h5>
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
                                        <label for="example-text-input" class="form-control-label">Ruc</label>
                                        <input class="form-control" type="text" :value="companie.ruc" disabled
                                            placeholder="Empresa">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Razon Social</label>
                                        <input class="form-control" type="text" :value="companie.razon_social" disabled
                                            placeholder="Empresa">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Empresa</label>
                                        <input class="form-control" type="text" :value="companie.name" disabled
                                            placeholder="Empresa">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Ciudad</label>
                                        <input class="form-control" type="text" :value="companie.city" disabled
                                            placeholder="Ciudad">
                                    </div>
                                </div>
                                <hr class="horizontal dark">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Identificador de
                                            Usuario*</label>
                                        <input class="form-control" v-model="form.name" type="text" disabled
                                            placeholder="Empresa">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Cuenta Administrativa
                                            *</label>
                                        <input class="form-control" v-model="form.email" type="text" disabled value=""
                                            placeholder="Ciudad">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Password *</label>
                                        <input class="form-control" v-model="form.password" type="text" value=""
                                            placeholder="Descripcion">
                                    </div>
                                </div>
                                <!-- <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Tipo de
                                            comidas*</label>
                                        <select class="form-select" aria-label="Default select example"
                                            v-model="form.typeFood">
                                            <option v-for="data in typefoods" :key="data.id" :value="data.id">
                                                {{ data.name }}</option>
                                        </select>
                                    </div>

                                </div> -->
                            </div>
                            <hr class="horizontal dark">
                        </div>
                        <button @click="getcreate()" data-v-step="1" class="btn btn-danger btn-sm ms-auto mx-5"
                            style="font-size: 15px;">Registrar usuario</button>

                        <!-- <pre>{{ form }}</pre> -->
                        <!-- {{ form.compani_id }} -->

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../../../../../api/API_feedback';

export default {
    name: 'FeedbackAppIdEdit',
    data() {
        return {
            user: [],
            companie: {},
            typefoods: [],
            form: {
                name: "",
                email: "",
                password: "",
                compani_id: this.$route.params.idNewCompanie,
                rol_id: 1,
            },
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
        // this.companie = JSON.parse(localStorage.getItem("companie"))
        // console.log(this.$route.params.idNewCompanie);
        await this.verCompanie()
        this.form.name = this.companie.name;
        this.form.email = this.companie.email
    },

    methods: {
        async verCompanie() {
            let id = this.form.compani_id
            const data = await this.$axios.$get(`${Api}/companies/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.companie = data[0]
            // console.log(data[0]);
        },


        async addUser() {
            const params = {
                name: this.form.name,
                email: this.form.email,
                password: this.form.password,
                token: null,
                compani_id: this.form.compani_id,
                rol_id: this.form.rol_id

            }
            const data = await this.$axios.$post(`${Api}/users`, params).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
            await this.addSucursal()
        },
        async addSucursal() {
            const params = {
                name: this.companie.name,
                city: this.companie.city,
                state: 1,
                address: this.companie.direccion,
                id_companie: this.companie.id
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
                id_companie: this.companie.id
            }
            const data = await this.$axios.$post(`${Api}/cupones`, params).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
        },

        iniciar() {
            this.$tours['createsucursales'].start();
        },
        getcreate() {

            if (this.form.name != "" && this.form.email != "" && this.form.password != "") {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn mx-1 btn-success',
                        cancelButton: 'btn mx-1 btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: `¿Seguro de registrar a ${this.form.name} ?`,
                    text: `Se registrara como admin de ${this.companie.name}`,
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
                        this.addUser()
                        swalWithBootstrapButtons.fire(
                            {
                                title: 'Creado!',
                                text: 'Se creo Registro el Administrador',
                                icon: 'success',
                                timer: 2000,
                            }
                        ).then(() => {
                            // Aquí la alerta se ha cerrado
                            location.href = `/${this.user.nameCompanie}/companies`
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

<style scoped></style>