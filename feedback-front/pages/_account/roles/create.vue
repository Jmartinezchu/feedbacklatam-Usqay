<template>
    <div>
        <v-tour name="createCupones" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/Zhu Roll/roles`">
                    <div data-v-step="4"
                        style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <!-- <h6>Crear</h6> -->
                        <v-btn icon>
                            <v-icon>arrow_back_ios_new</v-icon>
                        </v-btn>
                    </div>
                </nuxt-link>
                <div class="mt-2">
                    <h5>Nuevo Rol</h5>
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
                        <h6 class="mb-0">Nombre de la promocion</h6>
                    </div>
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Nombre del nueo
                                        rol*</label>
                                    <input class="form-control" type="text" value="" placeholder="Promoción">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group" data-v-step="1">
                                        <h6>Vistas</h6>
                                        <pre>{{ selected }}</pre>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <v-checkbox color="red" v-model="selected" label="Home" value="Home"></v-checkbox>
                                </div>
                                <div class="col-md-4">
                                    <v-checkbox color="red" v-model="selected" label="Sucursales"
                                        value="Sucursales"></v-checkbox>
                                </div>
                                <div class="col-md-4">
                                    <v-checkbox color="red" v-model="selected" label="Encuesta"
                                        value="Encuesta"></v-checkbox>
                                </div>
                                <div class="col-md-4">
                                    <v-checkbox color="red" v-model="selected" label="Presonal"
                                        value="Presonal"></v-checkbox>
                                </div>
                                <div class="col-md-4">
                                    <v-checkbox color="red" v-model="selected" label="Roles" value="Roles"></v-checkbox>
                                </div>
                                <div class="col-md-4">
                                    <v-checkbox color="red" v-model="selected" label="Comentarios"
                                        value="Comentarios"></v-checkbox>
                                </div>
                                <div class="col-md-4">
                                    <v-checkbox color="red" v-model="selected" label="Registrados"
                                        value="Registrados"></v-checkbox>
                                </div>
                                <div class="col-md-4">
                                    <v-checkbox color="red" v-model="selected" label="Cupones" value="Cupones"></v-checkbox>
                                </div>
                                <div class="col-md-4">
                                    <v-checkbox color="red" v-model="selected" label="Reportes"
                                        value="Reportes"></v-checkbox>
                                </div>
                            </div>
                            <div class="row" data-v-step="1">

                                <div class="col-md-12">
                                    <div class="form-group" data-v-step="2">
                                        <h6>Acciones</h6>
                                        <pre>{{ acctions }}</pre>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <v-checkbox color="red" v-model="acctions" label="Crear" value="Crear"></v-checkbox>
                                </div>
                                <div class="col-md-4">
                                    <v-checkbox color="red" v-model="acctions" label="Editar" value="Editar"></v-checkbox>
                                </div>
                                <div class="col-md-4">
                                    <v-checkbox color="red" v-model="acctions" label="Eliminar"
                                        value="Eliminar"></v-checkbox>
                                </div>

                            </div>
                            <!-- <div class="col-md-12">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label" data-v-step="2">
                                        Selecciones la
                                        recurrencia con la que el cliente puede ganar este cupón</label>
                                    <v-radio-group v-model="recurrenciaCupon" row>
                                        <v-radio color="red" label="Unica vez" value="0" active></v-radio>
                                        <v-radio color="red" label="Semanalmente" value="1"></v-radio>
                                        <v-radio color="red" label="Sin limite" value="2"></v-radio>
                                    </v-radio-group>

                                </div>
                            </div> -->
                            <!-- <p>{{ recurrenciaCupon }}</p> -->

                        </div>
                        <hr class="horizontal dark">
                        <button @click="getCreate()" data-v-step="3" class="btn btn-danger btn-sm ms-auto mx-5"
                            style="font-size: 15px;">Crear</button>
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
            selected: [],
            acctions: [],
            recurrenciaCupon: "0",
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
                    content: `Establece que <strong>Vistas</strong> se podran visualizar con este rol`,
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '[data-v-step="2"]',
                    content: `Establece que <strong>Acciones</strong> se podran Realizar con este rol`,
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '[data-v-step="3"]',
                    content: 'Despues de completar todos los campos crea el rol y listo',
                    params: {
                        // placement: 'top'
                    }
                },
                {
                    target: '[data-v-step="4"]',
                    content: `<strong>Aqui</strong> para regresar a ver tus roles`,
                    params: {
                        // placement: 'top'
                    }
                }
            ]
        };
    },

    mounted() {
    },
    created() {

    },

    methods: {

        iniciar() {
            this.$tours['createCupones'].start();
        },



        getCreate() {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: '¿Seguro de Crear Cupón?',
                text: "Se creara el cupón",
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
                            text: 'Se creo el cupón',
                            icon: 'success',
                            timer: 2000,
                        }
                    ).then(() => {
                        // Aquí la alerta se ha cerrado
                        location.href = '/cupones'
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

<style>
.theme--light.v-label {
    color: rgb(0 0 0 / 77%) !important;
    font-size: 11px !important;
    margin: 0 !important;
}
</style>