<template>
    <div>
        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/${companie.name}/configNotifications/${ruta.idSucursal}`">
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
                    <h5>Mensaje a comentarios de {{ datatypeComent.valor }}</h5>
                </div>
            </div>


        </div>
        <!-- formulario crear cupón -->
        <div class="row">
            <!-- crad info cada encuesta -->
            <div class="col-md-12 mt-4">
                <div class="card" data-v-step="0">
                    <div class="card-header pb-0 px-3" style="text-align:center">
                        <h6 class="mb-0">Puedes modificar el contenido</h6>
                    </div>
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Asunto *</label>
                                    <input class="form-control" v-model="datatypeComent.subject" type="text" value=""
                                        placeholder="Asunto">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Slogan *</label>
                                    <input class="form-control" v-model="datatypeComent.slogan" type="text" value=""
                                        placeholder="Slogan">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Mensaje *</label>
                                    <textarea class="form-control" rows="10" v-model="datatypeComent.mensaje"
                                        placeholder="Mensaje" id="floatingTextarea"></textarea>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Pie de Mensaje*</label>
                                    <input class="form-control" v-model="datatypeComent.pie_mensaje" type="text" value=""
                                        placeholder="Slogan">
                                </div>
                            </div>
                        </div>
                        <hr class="horizontal dark">
                        <!-- <pre>{{ datatypeComent }}</pre> -->
                        <button @click="getEdit(datatypeComent)" data-v-step="3" class="btn btn-danger btn-sm ms-auto mx-5"
                            style="font-size: 15px;">Editar!</button>
                        <hr class="horizontal dark">
                        <div class="card-header pb-0 px-3">
                            <h6 class="mb-0">Visualización en tiempo real</h6>
                        </div>
                        <hr class="horizontal dark">
                        <div class="col-md-12">
                            <v-card>
                                <v-card-title class="text-h5 grey lighten-2">
                                    {{ datatypeComent.subject }} {{ icons }}
                                </v-card-title>
                                <v-card-text>
                                    <div>
                                        <div style="text-align: center">
                                            <img style="width:100px; border-radius: 50%"
                                                :src="`https://feedback-backend-buzg8.ondigitalocean.app/logos/${companie.filename}`"
                                                alt="empresa">
                                        </div>
                                        <h5 style="text-align: center">{{ datatypeComent.slogan }}</h5>
                                        <p>
                                        </p>
                                        <p>¡Hola <span style="text-transform: uppercase;"> <b>Nombre
                                                    Cliente!🙋🏽</b></span>; </p>
                                        <textarea disabled class="form-control" rows="11" :value="datatypeComent.mensaje"
                                            placeholder="Mensaje"
                                            style="background-color: #ffffff; border: none; color: #000000"
                                            id="floatingTextarea"></textarea>
                                        <br>
                                        <p>{{ datatypeComent.pie_mensaje }} <b style="text-transform: uppercase;">Nombre
                                                Cliente</b></p>
                                        <div>
                                            <img style="width: 150px;"
                                                src="https://feedback-backend-buzg8.ondigitalocean.app/images/Logo.png"
                                                alt="feedbackLatam">
                                        </div>
                                    </div>
                                </v-card-text>

                                <v-divider></v-divider>
                            </v-card>
                        </div>

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
    name: 'FeedbackAppCreate',

    data() {
        return {
            user: [],
            companie: {},
            icons: '',
            ruta: this.$route.params,
            notifications: [],
            datatypeComent: {},
        };
    },

    mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.companie = JSON.parse(localStorage.getItem("companie"));
        this.notifications = JSON.parse(localStorage.getItem("notificatons"))
        // console.log(this.companie, this.sucursal);
        this.getDataComent(this.notifications);
        this.geticons();
    },

    methods: {
        geticons() {
            if (this.datatypeComent.valor === 'Felicitaciones') {
                this.icons = '🥳🎉';
            }
            if (this.datatypeComent.valor === 'Sugerencias') {
                this.icons = '📌📝';
            }
            if (this.datatypeComent.valor === 'Reclamos') {
                this.icons = '😓🤕';
            }
        },
        getDataComent(array) {
            for (let index = 0; index < array.length; index++) {
                if (array[index].id == this.ruta.idNotification) {
                    this.datatypeComent = array[index]
                }
            }
        },


        async updateNotificacion(nt) {
            const params = {
                subject: nt.subject,
                slogan: nt.slogan,
                mensaje: nt.mensaje,
                pie_mensaje: nt.pie_mensaje,
            }
            const data = await this.$axios.$put(`${Api}/notifications/form/${nt.id_companie}/${nt.id_sucursal}/${nt.id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(nt);
            // console.log(data);
        },


        getEdit(data) {
            if (this.datatypeComent.subject != "" && this.datatypeComent.slogan != "" && this.datatypeComent.mensaje != "" && this.datatypeComent.pie_mensaje != "") {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn mx-1 btn-success',
                        cancelButton: 'btn mx-1 btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: `¿Seguro de Editar la notificacion automática?`,
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
                        // console.log('funcion Editar')
                        this.updateNotificacion(data)
                        swalWithBootstrapButtons.fire(
                            {
                                title: 'Creado!',
                                text: 'Se registro la noticicación',
                                icon: 'success',
                                timer: 1500,
                            }
                        ).then(() => {
                            location.href = `/${this.companie.name}/configNotifications/${this.ruta.idSucursal}`
                        });
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