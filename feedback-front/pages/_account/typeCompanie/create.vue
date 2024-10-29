<template>
    <div>
        <v-tour name="createpersonal" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/${user.nameCompanie}/typeCompanie`">
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
                    <h5>Ingresa un nuevo tipo de compañia </h5>
                </div>
            </div>

            <!-- <div class="col-3 text-center">
                <button @click="iniciar" class="d-flex">
                    <v-icon>mouse</v-icon>
                    <h6> ¿Como funciona esta pantalla?</h6>
                </button>
            </div> -->
        </div>
        <div class="row">
            <div class="col-md-12 mb-3" data-v-step="0">
                <div class="card">
                    <div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <v-text-field v-model="nameTypo" label="Nuevo Tipo de Compañia"
                                            :rules="rules"></v-text-field>
                                    </div>
                                </div>

                            </div>

                            <hr class="horizontal dark">
                        </div>
                        <button @click="getCreate(nameTypo)" class="btn btn-danger btn-sm ms-auto mx-5" data-v-step="2"
                            style="font-size: 15px;">Crear <v-icon
                                style="color:#fff;font-size: 15px;">save</v-icon></button>
                        <!-- <pre>{{ nameTypo }}</pre> -->
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
            rules: [
                value => !!value || 'Required.',
                value => (value && value.length >= 3) || 'Min 3 characters',
            ],
            rol: null,
            user: [],
            sucursales: [],
            encuestas: [],
            nameTypo: null,


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

    },

    methods: {
        async addQr() {
            const params = {
                name: this.nameTypo,

            }
            const data = await this.$axios.$post(`${Api}/type_companie`, params).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
        },

        iniciar() {
            this.$tours['createpersonal'].start();
        },
        getCreate(data) {
            if (this.nameTypo != null) {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn mx-1 btn-success',
                        cancelButton: 'btn mx-1 btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: `¿Seguro de crear el nuevo tipo ?`,
                    text: "Se se creará",
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
                            this.nameTypo = null
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