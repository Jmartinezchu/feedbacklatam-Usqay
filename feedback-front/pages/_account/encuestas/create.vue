<template>
    <div>
        <div class="flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/${companie.name}/encuestas`">
                    <div style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <!-- <h6>Crear</h6> -->
                        <v-btn icon>
                            <v-icon>arrow_back_ios_new</v-icon>
                        </v-btn><strong class="text-dark pr-2">
                            <h5>Regresar -</h5>
                        </strong>
                    </div>
                </nuxt-link>
                <div>
                    <h5 class="mt-2">Nuevo Encuesta</h5>
                </div>
            </div>

        </div>
        <div class="row">
            <div class="col-md-12 mb-3">
                <div class="card">
                    <div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Nombre
                                            encuesta *</label>
                                        <input class="form-control" v-model="form.name" type="text" value=""
                                            placeholder="nombre de la encuesta ">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Autor *</label>
                                        <input class="form-control" type="text" disabled :value="user.nameUser"
                                            placeholder="Ciudad">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Compañia *</label>
                                        <input class="form-control" type="text" disabled :value="companie.name"
                                            placeholder="Dirección">
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
                    <!-- <pre>{{ form }}</pre> -->
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
            user: [],
            companie: {},
            form: {
                name: "",
                id_companie: null,
                autor: null,
                gmail_user: null,
            },
            id_form: null

        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"))
        this.companie = JSON.parse(localStorage.getItem("companie"))
        this.form.id_companie = this.user.idCompanie
        this.form.autor = this.user.nameUser
        this.form.gmail_user = this.user.email
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
        async addFormulario() {
            const frm = {
                name: this.form.name,
                id_companie: this.form.id_companie,
                autor: this.form.autor,
                gmail_user: this.form.gmail_user
            }
            const qsts = [{
                titulo: null,
                question: "¿Es la primera vez que nos visitas?",
                icon: null,
                val: null,
                tipo: 'booleam',
                id_form: null
            },
            {
                titulo: null,
                question: "¿Que tan probable es que nos recomiendes a un amigo o conocido?",
                icon: '1f914',
                val: 50,
                tipo: 'numbers',
                id_form: null
            }]
            const params = {
                frm,
                qsts
            }
            const data = await this.$axios.$post(`${Api}/formularios`, params).catch(error => {
                console.log('Request canceled', error)
            })
            console.log(data);

            let id = this.user.idCompanie
            const datahome = await this.$axios.$get(`${Api}/home/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            localStorage.setItem("datacompanie", JSON.stringify(datahome));
        },
        async addQuestionSIYNO() {
            const qst1 = {
                titulo: null,
                question: "¿Es la primera vez que nos visitas?",
                icon: null,
                val: null,
                tipo: 'booleam',
                id_form: this.id_form
            }
            // console.log(params)
            const data = await this.$axios.$post(`${Api}/question`, qst1).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
            // addQuestion();
        },
        async addQuestion10() {
            const qst2 = {
                titulo: null,
                question: "¿Que tan probable es que nos recomiendes a un amigo o conocido?",
                icon: '1f914',
                val: 50,
                tipo: 'numbers',
                id_form: this.id_form
            }
            // console.log(params)
            const data = await this.$axios.$post(`${Api}/question`, qst2).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
            // addQuestion();
        },
        getCreate() {
            if (this.form.name != "") {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn mx-1 btn-success',
                        cancelButton: 'btn mx-1 btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: `¿Seguro de Crear Encuesta?`,
                    text: `Se creara encuesta con nombre ${this.form.name}`,
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
                        this.addFormulario();
                        swalWithBootstrapButtons.fire(
                            {
                                title: '¡Creado!',
                                text: 'Se creo la encuesta',
                                icon: 'success',
                                timer: 1500,
                            }
                        ).then(() => {
                            // Aquí la alerta se ha cerrado
                            this.form.name = ""
                            // location.href = `/${this.user.nameCompanie}/encuestas`
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
                    text: 'Ingresar el nombre de la Encuesta diferente a las ya creadas!',
                    customClass: {
                        confirmButton: 'btn mx-1 btn-danger',
                        cancelButton: 'btn mx-1 btn-danger'
                    },
                })
                // console.log('ingresar todos los datos');
            }

        }
    }
};
</script>

<style lang="scss" scoped></style>