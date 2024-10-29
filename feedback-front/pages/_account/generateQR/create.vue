<template>
    <div>
        <v-tour name="createpersonal" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/${user.nameCompanie}/generateQR`">
                    <div data-v-step="3"
                        style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <v-btn icon>
                            <v-icon>arrow_back_ios_new</v-icon>
                        </v-btn>
                        <strong class="text-dark pr-2">
                            <h5>Regresar -</h5>
                        </strong>
                    </div>
                </nuxt-link>
                <div class="mt-2">
                    <h5>Genera Aqui tu QR </h5>
                </div>
            </div>

            <div class="col-3 text-center">
                <button @click="iniciar" class="d-flex">
                    <v-icon>mouse</v-icon>
                    <h6> ¿Como funciona esta pantalla?</h6>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-3" data-v-step="0">
                <div class="card">
                    <div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <v-text-field v-model="user.nameCompanie" disabled menu-props="auto"
                                            label="Compañia" hide-details prepend-icon="apartment" dense></v-text-field>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <v-text-field v-model="user.nameUser" label="autor" disabled prepend-icon="person"
                                            placeholder="Placeholder"></v-text-field>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <v-select v-model="form.id_sucursal" :items="sucursales" menu-props="auto"
                                            :item-text="sucursales => `${sucursales.name} / ${sucursales.city} `"
                                            item-value="id" label="Sucrusal" hide-details prepend-icon="other_houses"
                                            dense></v-select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <v-select v-model="form.id_form" :items="encuestas" menu-props="auto"
                                            :item-text="encuestas => `${encuestas.name}`" item-value="id" label="Encuesta"
                                            hide-details prepend-icon="receipt_long" dense></v-select>
                                    </div>
                                </div>

                            </div>

                            <hr class="horizontal dark">
                        </div>
                        <button @click="getCreate(form)" class="btn btn-danger btn-sm ms-auto mx-5" data-v-step="2"
                            style="font-size: 15px;">Crear</button>
                        <!-- <pre>{{ form }}</pre> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '../../../api/API_feedback';
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
    name: 'FeedbackAppCreate',
    components: {
    },
    data() {
        return {
            roles: [],
            rol: null,
            user: [],
            datacompanie: {},
            ruta: this.$route.params,
            sucursales: [],
            sucursalestodos: [],
            encuestas: [],
            encuestastodos: [],
            form: {
                autor: null,
                gmail: null,
                id_companie: null,
                id_sucursal: null,
                id_form: null
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
                    content: `Completa todos los datos de este formulario`,
                    params: {
                        placement: 'top'
                    }
                },//Regresa a tus cupones <strong>Aqui</strong>! 
                {
                    target: '[data-v-step="1"]',
                    content: `<strong>Con este campo</strong> podra ingresar al sistema`,
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '[data-v-step="2"]',
                    content: 'Luego de completar todos los capos del formulario click para crear',
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '[data-v-step="3"]',
                    content: `<strong>Aqui</strong> para regresar a ver tus Cupones`,
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
        this.form.autor = this.user.nameUser
        this.form.gmail = this.user.email
        this.form.id_companie = this.user.idCompanie
        this.sucursalestodos = this.datacompanie.lists.sucursales
        this.encuestastodos = this.datacompanie.lists.formularios

        await this.getSucursales(this.sucursalestodos)
        await this.getEncuestas(this.encuestastodos)
    },

    methods: {
        // getIdsucu() {
        //     this.form.id_sucursal = this.sucursal.id
        // },
        async getSucursales(sucursalestodos) {
            let lengthsucu = sucursalestodos.length
            for (let index = 0; index < lengthsucu; index++) {
                // console.log(sucursalestodos[index].state);
                if (sucursalestodos[index].state === 1) {
                    this.sucursales.push(sucursalestodos[index])
                }
            }
            // console.log(this.sucursales.length);
        },
        async getEncuestas(encuestastodos) {
            let lengthsucu = encuestastodos.length
            for (let index = 0; index < lengthsucu; index++) {
                // console.log(encuestastodos[index].state);
                if (encuestastodos[index].state === 1) {
                    this.encuestas.push(encuestastodos[index])
                }
            }
            // console.log(encuestastodos);
        },

        async addQr() {
            const params = {
                autor: this.form.autor,
                gmail: this.form.gmail,
                id_companie: this.form.id_companie,
                id_sucursal: this.form.id_sucursal,
                id_form: this.form.id_form
            }
            const data = await this.$axios.$post(`${Api}/generateQr`, params).catch(error => {
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
            this.$tours['createpersonal'].start();
        },
        getCreate(data) {
            if (this.form.autor != null &&
                this.form.gmail != null &&
                this.form.id_companie != null &&
                this.form.id_sucursal != null &&
                this.form.id_form != null) {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn mx-1 btn-success',
                        cancelButton: 'btn mx-1 btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: `¿Seguro de crear Qr ?`,
                    text: "Se generará el Qr",
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
                        this.addQr()
                        swalWithBootstrapButtons.fire(
                            {
                                title: 'Creado!',
                                text: 'Se creo el Qr',
                                icon: 'success',
                                timer: 2000,
                            }
                        ).then(() => {
                            // Aquí la alerta se ha cerrado
                            // location.href = '/sucursales'
                            this.form.id_sucursal = null
                            this.form.id_form = null
                            location.href = `/${this.user.nameCompanie}/generateQR`
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

<style>
.Blurred {
    display: none !important;
}
</style>