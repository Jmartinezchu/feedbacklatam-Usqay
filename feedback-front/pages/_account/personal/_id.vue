<template>
    <div>
        <v-tour name="editpersonal" :steps="steps" :options="myOptions"></v-tour>

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
                    <h5>Editar Personal</h5>
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
                                            minlength="8" maxlength="8" placeholder="DNI" disabled>
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
                                                :class="{ Blurred: rol.name == `Admin Usqay` }">
                                                {{ rol.name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <hr class="horizontal dark">
                        </div>
                        <button @click="getEdit()" class="btn btn-danger btn-sm ms-auto mx-5" data-v-step="2"
                            style="font-size: 15px;">Editar</button>
                        <!-- <pre>{{ data }}</pre> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../../../api/API_feedback';
export default {
    name: 'FeedbackAppCreate',
    data() {
        return {
            companie: {},
            user: [],
            datacompanie: {},
            ruta: this.$route.params,
            roles: [],
            // data: [],
            person: {},
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
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        // await this.getRoles()
        // await this.verdata();
        this.verdataa(this.datacompanie.lists.personal)
        this.roles = this.datacompanie.lists.roles
        // await this.getDataCompanie()
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
            let dni = this.data.dni
            const data = await this.$axios.$get(`https://clientapi.sistemausqay.com/dni.php?documento=${dni}`).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data.nombres + ' ' + data.apellidos);
            this.data.name = data.nombres + ' ' + data.apellidos
        },
        async getRoles() {
            const data = await this.$axios.$get(`${Api}/roles`).catch(error => {
                console.log('Request canceled', error)
            })
            this.roles = data;
            // console.log(data);
        },
        // async verdata() {
        //     let id = this.$route.params.id
        //     const data = await this.$axios.$get(`${Api}/personal/${this.user.idCompanie}/${id}`).catch(error => {
        //         console.log('Request canceled', error)
        //     })
        //     this.data = data[0]
        //     // console.log(data[0]);
        // },
        verdataa(personal) {
            console.log(this.ruta);
            const lengthsucu = personal.length
            for (let index = 0; index < lengthsucu; index++) {
                if (personal[index].id == this.ruta.id) {
                    // console.log(personal[index]);
                    this.person = personal[index]
                }
                // console.log(personal[index].id);

            }
            // console.log(this.sucursal);
        },

        async updatePersonal() {
            let id = this.$route.params.id
            const params = {
                celular: this.person.celular,
                usuario: this.person.usuario,
                password: this.person.password,
                rol: this.person.rol,
            }
            const data = await this.$axios.$put(`${Api}/personal/form/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            let idCompanie = this.user.idCompanie
            const datahome = await this.$axios.$get(`${Api}/home/${idCompanie}`).catch(error => {
                console.log('Request canceled', error)
            })
            localStorage.setItem("datacompanie", JSON.stringify(datahome));
        },

        iniciar() {
            this.$tours['editpersonal'].start();
        },
        maxFilesAlertFoto(file) {
            Swal.fire({
                title: "No permitido",
                text: "Solo se permite 1 foto",
                type: "error",
                confirmButtonText: "OK",
            });
            this.$refs.update_foto.removeFile(file);
        },
        getEdit() {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: '¿Seguro de Editar Personal?',
                text: "Se editará el personal",
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
                    this.updatePersonal();
                    swalWithBootstrapButtons.fire(
                        {
                            title: 'Editado!',
                            text: 'Se Editó el Personal',
                            icon: 'success',
                            timer: 2000,
                        }
                    ).then(() => {
                        // Aquí la alerta se ha cerrado
                        location.href = `/${this.user.nameCompanie}/personal`
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

<style >
.Blurred {
    display: none !important;
}
</style>