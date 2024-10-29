<template>
    <div>
        <v-tour name="createpersonal" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/${companie.name}/personal`">
                    <div data-v-step="3"
                        style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <!-- <h6>Crear</h6> -->
                        <v-btn icon>
                            <v-icon>arrow_back_ios_new</v-icon>
                        </v-btn>
                        <strong class="text-dark pr-2">
                            <h5>Regresar -</h5>
                        </strong>
                    </div>
                </nuxt-link>
                <div class="mt-2">
                    <h5>Nuevo Personal</h5>
                </div>
            </div>

            <div class="col-3 text-center">
                <button @click="iniciar" class="d-flex">
                    <v-icon>mouse</v-icon>
                    <h6> ¿Como funciona esta pantalla??</h6>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-3" data-v-step="0">
                <div class="card">
                    <div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Documento de
                                            identidad *</label>
                                        <input @change="getDNI()" class="form-control" type="text" v-model="person.dni"
                                            minlength="8" maxlength="8" placeholder="DNI">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Nombre *</label>
                                        <input class="form-control" type="text" disabled v-model="person.name"
                                            placeholder="Nombre">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Celular*
                                            (Whatsapp)</label>
                                        <input class="form-control" type="text" v-model="person.celular" minlength="9"
                                            maxlength="9" placeholder="Celular">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group" data-v-step="1">
                                        <label for="example-text-input" class="form-control-label">E-MAIL</label>
                                        <input class="form-control" type="text" v-model="person.usuario"
                                            placeholder="Usuario">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Contraseña *</label>
                                        <input class="form-control" type="text" v-model="person.password"
                                            placeholder="Contraseña">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Rol *</label>

                                        <select v-model="person.rol" class="form-select"
                                            aria-label="Default select example">
                                            <option v-for="rol in roles" :key="rol.id" :value="rol.id"
                                                :class="{ Blurred: rol.name == 'Admin Usqay' }">
                                                {{ rol.name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <hr class="horizontal dark">
                            <!-- <a href="feeet.com" _blank="false">jajajajaj</a> -->
                            <!-- <img class="w-4" src="/img/iconWhatsapp.png" alt="whatsapp"> -->
                        </div>
                        <button @click="getCreate()" class="btn btn-danger btn-sm ms-auto mx-5" data-v-step="2"
                            style="font-size: 15px;">Crear</button>
                        <!-- <pre>{{ data }}</pre> -->
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
            companie: {},
            user: [],
            roles: [],
            person: {
                dni: '',
                name: '',
                celular: '',
                usuario: '',
                password: '',
                rol: null,
                compani_id: null
            },

            datacompanie: {},
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
        this.companie = JSON.parse(localStorage.getItem("companie"))
        this.person.compani_id = this.user.idCompanie
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        this.roles = this.datacompanie.lists.roles
        // await this.getRoles()
        // await this.getDataCompanie()
        // this.getDNI()
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
        async getDNI() {
            let dni = this.person.dni
            const data = await this.$axios.$get(`https://clientapi.sistemausqay.com/dni.php?documento=${dni}`).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data.nombres + ' ' + data.apellidos);
            this.person.name = data.nombres + ' ' + data.apellidos
        },
        async getRoles() {
            const data = await this.$axios.$get(`${Api}/roles`).catch(error => {
                console.log('Request canceled', error)
            })
            this.roles = data;
            // console.log(data);
        },

        async addPersonal() {
            const params = {
                dni: this.person.dni,
                name: this.person.name,
                celular: this.person.celular,
                usuario: this.person.usuario,
                password: this.person.password,
                rol: this.person.rol,
                compani_id: this.person.compani_id
            }
            const data = await this.$axios.$post(`${Api}/personal`, params).catch(error => {
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
        getCreate() {
            if (this.person.dni != '' && this.person.celular != '' && this.person.usuario != '' && this.person.password != '' && this.person.rol != null) {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn mx-1 btn-success',
                        cancelButton: 'btn mx-1 btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: '¿Seguro de Crear a este usuario como parte de su personal?',
                    text: `${this.person.name}`,
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
                        this.addPersonal();
                        swalWithBootstrapButtons.fire(
                            {
                                title: '¡Creado!',
                                text: 'Se creo la Sucursal',
                                icon: 'success',
                                html:
                                    '<b>Enviar Informacion</b>' +
                                    '<a href=""><img class="w-8" src="/img/iconWhatsapp.png" alt="whatsapp"></a> ' +
                                    'and other HTML tags',
                                // timer: 2000,
                                showCancelButton: true,
                                reverseButtons: true,
                                cancelButtonText: 'Terminar',
                                confirmButtonText: 'Enviar Whatsapp!',
                            }
                        ).then((result) => {
                            if (result.isConfirmed) {
                                // console.log('enviar whatsapp');
                                let num = this.person.celular
                                let mensaje = `Bienvenido a Feedback,<br> ${this.person.name} tu usuario es ${this.person.usuario} y contraseña ${this.person.password}, ingresa a feedback.com`
                                window.open(`https://api.whatsapp.com/send?phone=51${num}&text=${mensaje}`, "Whatsapp")

                            } else if (
                                result.dismiss === Swal.DismissReason.cancel
                            ) {
                                // console.log('termino')
                            }
                            this.person.dni = ''
                            this.person.name = ''
                            this.person.celular = ''
                            this.person.usuario = ''
                            this.person.password = ''
                            this.person.rol = null
                            // location.href = `/${this.user.nameCompanie}/personal`

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
.Blurred {
    display: none !important;
}
</style>