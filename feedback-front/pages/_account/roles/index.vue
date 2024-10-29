<template>
    <div>
        <v-tour name="cupones" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`roles/create`">
                    <div data-v-step="0"
                        style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <!-- <h6>Crear</h6> -->
                        <v-btn icon>
                            <v-icon>add_circle</v-icon>
                        </v-btn>
                    </div>
                </nuxt-link>
                <div class="mt-2">
                    <h5>Mis Roles</h5>
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
        <div class="row">
            <!-- crad info cada encuesta -->
            <div class="col-md-4 mt-4">
                <div class="card d-flex" data-v-step="1">
                    <div class="card-header pb-0 px-3" style="text-align:center">
                        <!-- <img width="100" src="img/empresa.png" alt=""> -->
                        <h6 class="mb-0">Nombre del Rol</h6>
                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                                <div class="ms-auto text-center">
                                    <a data-v-step="3" @click="getDelete()"
                                        class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                            class="far fa-trash-alt me-2"></i>Delete</a>
                                    <nuxtLink data-v-step="2" :to="`roles/1`" class="btn btn-link text-dark px-3 mb-0"
                                        href="javascript:;"><i class="fas fa-pencil-alt text-dark me-2"
                                            aria-hidden="true"></i>Edit</nuxtLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
    name: 'FeedbackAppIndex',

    data() {
        return {

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
                    content: `En este icono podras crear todos roles que quieras para tu personal`,
                },
                {
                    target: '[data-v-step="1"]',
                    content: 'Despues de crear tu rol aqui se visualizara y podras eliminar o editar los permisos',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '[data-v-step="2"]',
                    content: 'Aqui puedes modificar datos del rol',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '[data-v-step="3"]',
                    content: 'Aqui puedes elimirar el rol',
                    params: {
                        // placement: 'top'
                    }
                }
            ]
        };
    },

    mounted() {
        // this.iniciar()
    },

    methods: {
        iniciar() {
            this.$tours['cupones'].start();
        },
        getDelete() {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: '¿Seguro de Eliminar Rol?',
                text: "Se eliminaran todos los datos que tengan relacion con el Rol",
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
                    swalWithBootstrapButtons.fire(
                        {
                            title: '¡Eliminado!',
                            text: 'Se elimino el Rol',
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
        }
    },
};
</script>

<style></style>