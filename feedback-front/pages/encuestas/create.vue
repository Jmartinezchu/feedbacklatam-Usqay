<template>
    <div>
        <div class="flex" style="align-items:center ">
            <div class="col-1">
                <nuxt-link to="/encuestas">
                    <div style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <!-- <h6>Crear</h6> -->
                        <v-btn icon>
                            <v-icon>arrow_back_ios_new</v-icon>
                        </v-btn>
                    </div>
                </nuxt-link>
            </div>
            <div>
                <h5>Nuevo Encuesta</h5>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-3">
                <div class="card">
                    <div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Nombre
                                            encuesta</label>
                                        <input class="form-control" type="text" value="" placeholder="Empresa">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Autor *</label>
                                        <input class="form-control" type="text" value="" placeholder="Ciudad">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Email *</label>
                                        <input class="form-control" type="text" value="" placeholder="Dirección">
                                    </div>
                                </div>
                            </div>
                            <hr class="horizontal dark">
                        </div>
                        <!-- <div class=" flex align-items-center"> -->
                        <!-- <p class="mb-0">Nueva Encuesta</p> -->
                        <button @click="getCreate()" class="btn btn-danger btn-sm ms-auto mx-5"
                            style="font-size: 15px;">Crear</button>
                        <!-- </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
    name: 'FeedbackAppCreate',
    data() {
        return {
        };
    },

    mounted() {

    },

    methods: {

        getCreate() {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: '¿Seguro de Crear Encuesta?',
                text: "Se creara encuesta",
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
                    swalWithBootstrapButtons.fire(
                        {
                            title: '¡Creado!',
                            text: 'Se creo la encuesta',
                            icon: 'success',
                            timer: 2000,
                        }
                    ).then(() => {
                        // Aquí la alerta se ha cerrado
                        location.href = '/encuestas'
                    });
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    // console.log('no se crea')
                }
            })
        }
    }
};
</script>

<style lang="scss" scoped></style>