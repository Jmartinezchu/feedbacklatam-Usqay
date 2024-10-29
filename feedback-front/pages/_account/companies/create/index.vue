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
                    <h5>Nueva Compañia</h5>
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
                            <p class="text-uppercase text-sm">Datos Generales</p>
                            <div class="row">
                                <div class="col-md-12">
                                    <vue2Dropzone ref="companie_logo" id="dropzone"
                                        v-on:vdropzone-max-files-exceeded="maxFilesAlertFoto"
                                        v-on:vdropzone-sending="sendingEvent" :options="dropzoneOptionsImgs"
                                        style=" height: 90%;display: flex; justify-content: center; align-items: center;     z-index: 1;">
                                    </vue2Dropzone>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Nombre Compañia *</label>
                                        <input class="form-control" v-model="form.name" type="text" value=""
                                            placeholder="Empresa">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Ruc
                                            *</label>
                                        <input @change="getRuc()" class="form-control w-100" v-model="form.ruc"
                                            type="number" max="11" value="" placeholder="Ruc">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Razon Social *</label>
                                        <input class="form-control" v-model="form.razon_social" type="text" value=""
                                            placeholder="Razon Social">
                                    </div>
                                </div>
                            </div>
                            <hr class="horizontal dark">
                            <p class="text-uppercase text-sm">ubicacion y contacto</p>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Direccion *</label>
                                        <input class="form-control" v-model="form.direccion" type="text" value=""
                                            placeholder="Direccion">
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
                                        <label for="example-text-input" class="form-control-label">Telefono/Celular
                                            *</label>
                                        <input class="form-control w-100" v-model="form.telefono" type="number" max="11"
                                            value="" placeholder="Telefono o Celular">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Email de la Compañia
                                            *</label>
                                        <input class="form-control" v-model="form.email" type="email" value=""
                                            placeholder="Email de la compañia">
                                    </div>
                                </div>
                            </div>
                            <hr class="horizontal dark">
                            <p class="text-uppercase text-sm">Tipo de compañia</p>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Tipo de compañia*</label>
                                        <select class="form-select" aria-label="Default select example"
                                            v-model="form.type_companie" @click="getTypeFoods()">
                                            <option v-for="data in typecompanies" :key="data.id" :value="data.id"
                                                v-if="data.name != 'Usqay'">
                                                {{ data.name }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group" v-if="boxctegori != false">
                                        <label for="example-text-input" class="form-control-label">Tipo de
                                            comidas*</label>
                                        <select class="form-select" aria-label="Default select example"
                                            v-model="form.typesfoodid">
                                            <option v-for="data in typefoods" :key="data.id" :value="data.id"
                                                :class="{ Blurred: data.name == 'Usqay' }">
                                                {{ data.name }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Descripcion *</label>
                                        <textarea class="form-control" name="" id="example-text-input" rows="3"
                                            v-model="form.description" type="text" value=""
                                            placeholder="Descripcion"></textarea>
                                        <!-- <textarea > -->
                                    </div>
                                </div>
                            </div>
                            <hr class="horizontal dark">
                        </div>
                        <button @click="getcreate()" data-v-step="1" class="btn btn-danger btn-sm ms-auto mx-5"
                            style="font-size: 15px;">Crear</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../../../../api/API_feedback';
import front from '../../../../api/URL_feedback';
export default {
    name: 'FeedbackAppIdEdit',
    components: {
        vue2Dropzone
    },
    data() {
        return {
            boxctegori: false,
            user: [],
            typefoods: [],
            typecompanies: [],
            idNewCompanie: null,
            form: {
                name: "",
                description: "",
                city: "",
                state: 1,
                type_companie: null,
                typesfoodid: null,
                logo: null,
                ruc: "",
                razon_social: "",
                telefono: null,
                email: "",
                direccion: ""
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
            companie_logo: '',
            dropzoneOptionsImgs: {
                url: front,
                thumbnailWidth: 200,
                thumbnailHeight: 200,
                maxFilesize: 1.5,
                addRemoveLinks: true,
                autoProcessQueue: true,
                // headers: { "My-Awesome-Header": "header value" },
                maxFiles: 1,
                uploadMultiple: true,
                dictDefaultMessage: "Subir Logo de la compañia",
            },
        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"))
        // await this.getTypeFoods();
        await this.getTypeCompanie()
    },

    methods: {
        async getRuc() {
            let ruc = this.form.ruc
            const data = await this.$axios.$get(`https://clientapi.sistemausqay.com/ruc.php?documento=${ruc}`).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data.nombres + ' ' + data.apellidos);
            this.form.razon_social = data.razon_social
        },
        async sendingEvent(file) {
            const formdata = new FormData();
            formdata.append('image', file);
            const data = await this.$axios.$post(`${Api}/images`, formdata).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
            this.form.logo = data.res.insertId
        },
        maxFilesAlertFoto(file) {
            Swal.fire({
                title: "No permitido",
                text: "Solo se permite 1 foto",
                type: "error",
                confirmButtonText: "OK",
            });
            // console.log(file)
            this.$refs.companie_logo.removeFile(file);
        },
        async getTypeFoods() {
            const data = await this.$axios.$get(`${Api}/types/${this.form.type_companie}`).catch(error => {
                console.log('Request canceled', error)
            })
            this.typefoods = data;
            if (this.typefoods.length != 0) {
                this.boxctegori = true
            } else {
                this.boxctegori = false
            }
            // console.log(data);
        },
        async getTypeCompanie() {
            const data = await this.$axios.$get(`${Api}/type_companie/`).catch(error => {
                console.log('Request canceled', error)
            })
            this.typecompanies = data;
            // console.log(this.typecompanies);
        },
        iniciar() {
            this.$tours['createsucursales'].start();
        },

        async addCompanie() {
            // let valtypefood
            if (this.form.type_companie != 1) {
                this.form.typesfoodid = null
            }
            const params = {
                name: this.form.name,
                description: this.form.description,
                city: this.form.city,
                state: this.form.state,
                type_companie: this.form.type_companie,
                typesfoodid: this.form.typesfoodid,
                logo: this.form.logo,
                ruc: this.form.ruc,
                razon_social: this.form.razon_social,
                telefono: this.form.telefono,
                email: this.form.email,
                direccion: this.form.direccion,
            }
            const data = await this.$axios.$post(`${Api}/companies`, params).catch(error => {
                console.log('Request canceled', error)
            })
            this.idNewCompanie = data.deploy.insertId
            // console.log(data);
        },
        getcreate() {
            if (this.form.name != "" && this.form.ruc != "" && this.form.razon_social != "" && this.form.direccion != "" && this.form.telefono != "" && this.form.email != "" && this.form.type_companie != null && this.form.type_companie != "" && this.form.city != "" && this.form.state != "") {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn mx-1 btn-success',
                        cancelButton: 'btn mx-1 btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: `¿Seguro de crear ${this.form.name} como compañia?`,
                    text: `Se creara ${this.form.name}`,
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
                        this.addCompanie();
                        swalWithBootstrapButtons.fire(
                            {
                                title: 'Creado!',
                                text: 'Se creo la compañia',
                                icon: 'success',
                                timer: 2000,
                            }
                        ).then(() => {
                            // Aquí la alerta se ha cerrado
                            // location.href = `/${this.user.nameCompanie}/companies`
                            // console.log('registrado');
                            // this.form.name = "";
                            // this.form.city = "";
                            // this.form.description = "";
                            // this.form.typesfoodid = null
                            location.href = `create/${this.idNewCompanie}/addUser`

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
.dropzone .dz-preview {
    position: relative;
    display: inline-block;
    vertical-align: top;
    margin: 16px;
    z-index: 1;
    min-height: 100px;
}
</style>