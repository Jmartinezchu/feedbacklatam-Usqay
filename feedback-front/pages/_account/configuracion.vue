<template>
    <div>
        <div class="flex" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/${user.nameCompanie}`">
                    <div style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <!-- <h6>Crear</h6> -->
                        <v-btn icon>
                            <v-icon>arrow_back_ios_new</v-icon>
                        </v-btn>
                        <strong class="text-dark pr-2">
                            <h5>Regresar -</h5>
                        </strong>
                    </div>
                </nuxt-link>
                <div>
                    <h5 class="mt-2">Mi configuracion</h5>
                </div>
            </div>

        </div>
        <div class="row" v-if="user.rol_id != 2 && user.rol_id != 5">
            <div class="col-md-12 mb-3">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class=" flex align-items-center">
                            <p class="mb-0">Edit Profile</p>
                            <button @click="getUpdate()" class="btn btn-danger ms-auto">
                                <v-icon color="#fff">save</v-icon>
                            </button>
                        </div>
                    </div>
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
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Email
                                            Notificaciones*</label>
                                        <input class="form-control" v-model="form.gmail_notifications" type="text" value=""
                                            placeholder="Gmail Notificaciones">
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
                                                :class="{ Blurred: data.name == 'Usqay' }">
                                                {{ data.name }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6" v-if="boxctegori != false">
                                    <div class="form-group">
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
                            <!-- {{ form }} -->
                            <hr class="horizontal dark">
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="row" v-if="user.rol_id === 5">
            <div class="col-md-12 mb-3">
                <div class="card">
                    <div class="card-header pb-0">
                        <div class=" flex align-items-center">
                            <p class="mb-0">Edit Profile</p>
                            <button @click="getUpdateCliente()" class="btn btn-danger ms-auto">
                                <v-icon color="#fff">save</v-icon>
                            </button>
                        </div>
                    </div>
                    <div>
                        <div class="card-body">
                            <p class="text-uppercase text-sm">Datos Generales</p>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Nombre y
                                            Apellidos</label>
                                        <input class="form-control" v-model="user.nombre" type="text" value=""
                                            placeholder="Empresa">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Documento de
                                            identidad</label>
                                        <input class="form-control w-100" v-model="user.doc" type="text" value=""
                                            placeholder="Documento">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Email</label>
                                        <input disabled class="form-control" v-model="user.email" type="text" value=""
                                            placeholder="Razon Social">
                                    </div>
                                </div>
                            </div>
                            <hr class="horizontal dark">
                            <p class="text-uppercase text-sm">Mi Info</p>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Direccion *</label>
                                        <input class="form-control" v-model="user.direccion" type="text" value=""
                                            placeholder="Direccion">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Ciudad *</label>
                                        <input class="form-control" v-model="user.ciudad" type="text" value=""
                                            placeholder="Ciudad">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label"> Pais
                                            *</label>
                                        <input class="form-control w-100" v-model="user.pais" type="text" value=""
                                            placeholder="Pais">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Telefono/Celular
                                            *</label>
                                        <input class="form-control w-100" v-model="user.celular" type="number" value=""
                                            placeholder="Celular">
                                    </div>
                                </div>
                            </div>
                            <hr class="horizontal dark">

                            <hr class="horizontal dark">
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!-- <pre>{{ user }}</pre> -->
    </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../../api/API_feedback';
import front from '../../api/URL_feedback';
export default {
    name: 'FeedbackAppConfiguracion',
    components: {
        vue2Dropzone
    },
    data() {
        return {
            rutaPrevius: this.$route.params.account,
            user: {},
            form: {},
            typefoods: [],
            typecompanies: [],
            boxctegori: false,
            companie_logo: "",
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
                dictDefaultMessage: "Actualiza el Logo de la compañia",
            },
        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"))
        // console.log(this.$route.params);
        await this.verdata();
        await this.getTypeFoods();
        await this.getTypeCompanie()
    },


    methods: {
        jajaja() {
            console.log('diste click');
        },
        async sendingEvent(file) {
            // console.log('diste click');
            const formdata = new FormData();
            formdata.append('image', file);
            const data = await this.$axios.$post(`${Api}/images`, formdata).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
            this.form.logo = data.res.insertId
        },
        async getRuc() {
            let ruc = this.form.ruc
            const data = await this.$axios.$get(`https://clientapi.sistemausqay.com/ruc.php?documento=${ruc}`).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data.nombres + ' ' + data.apellidos);
            this.form.razon_social = data.razon_social
        },
        async updateCompanie() {

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
                gmail_notifications: this.form.gmail_notifications
            }
            const data = await this.$axios.$put(`${Api}/companies/form/${this.form.id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
        },
        async updateCliente() {
            const params = {
                doc: this.user.doc,
                nombre: this.user.nombre,
                pais: this.user.pais,
                ciudad: this.user.ciudad,
                direccion: this.user.direccion,
                nacimiento: this.user.nacimiento,
                celular: this.user.celular,
            }
            const data = await this.$axios.$put(`${Api}/clientes/form/${this.user.idUser}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
            if (data.message === 'update') {
                this.getDataCliente(this.user.idUser)
            }
        },
        async getDataCliente(id) {
            const data = await this.$axios.$get(`${Api}/clientes/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            // this.user = data[0]
            localStorage.setItem("user", JSON.stringify(data[0]));
            // console.log(data[0]);
        },
        getUpdateCliente() {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: '¿Seguro de Actualizar sus Datos?',
                text: "Se actualizaran los datos",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-save me-2"></i> Si, Actualizar!',
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
                    // console.log('funcion Actualizar')
                    this.updateCliente()
                    swalWithBootstrapButtons.fire(
                        {
                            title: 'Actualizado!',
                            text: 'Se Actualizaron los datos',
                            icon: 'success',
                            timer: 2000,
                        }
                    ).then(() => {
                        // Aquí la alerta se ha cerrado
                        location.href = `/${this.rutaPrevius}`
                    });
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    // console.log('no se crea')
                }
            })
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
            // console.log(data);
        },
        async verdata() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/companies/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.form = data[0]
            console.log(data[0]);
        },
        maxFilesAlertFoto(file) {
            Swal.fire({
                title: "No permitido",
                text: "Solo se permite 1 foto",
                type: "error",
                confirmButtonText: "OK",
            });
            this.$refs.companie_logo.removeFile(file);
        },
        getUpdate() {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: '¿Seguro de Actualizar sus Datos?',
                text: "Se actualizaran los datos",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-save me-2"></i> Si, Actualizar!',
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
                    // console.log('funcion Actualizar')
                    this.updateCompanie()
                    swalWithBootstrapButtons.fire(
                        {
                            title: 'Actualizado!',
                            text: 'Se Actualizaron los datos',
                            icon: 'success',
                            timer: 2000,
                        }
                    ).then(() => {
                        // Aquí la alerta se ha cerrado
                        location.href = `/${this.rutaPrevius}`
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

<style lang="scss" scoped></style>