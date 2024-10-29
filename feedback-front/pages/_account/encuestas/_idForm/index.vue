<template>
    <div>
        <div class="flex  justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/${companie.name}/encuestas`">
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
                    <h5 class="mt-2">Encuesta</h5>
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
                                        <input class="form-control" type="text" disabled v-model="form.autor"
                                            placeholder="Ciudad">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Compañia *</label>
                                        <input class="form-control" type="text" disabled v-model="form.nameCompanie"
                                            placeholder="Dirección">
                                    </div>
                                </div>
                            </div>
                            <hr class="horizontal dark">
                        </div>
                        <!-- <div class=" flex align-items-center"> -->
                        <!-- <p class="mb-0">Nueva Encuesta</p> -->
                        <button @click="getEdit()" class="btn btn-danger btn-sm ms-auto mx-5"
                            style="font-size: 15px;">Editar</button>
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
import Api from '../../../../api/API_feedback';


export default {
    name: 'FeedbackAppCreate',
    data() {
        return {
            user: [],
            companie: {},
            ruta: this.$route.params,
            form: {
            },
            datacompanie: {},
            forms: []
        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"))
        this.companie = JSON.parse(localStorage.getItem("companie"))
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        this.verdataa(this.datacompanie.lists.formularios)
        // await this.verdata()
    },

    methods: {
        verdataa(forms) {
            // console.log(this.ruta);
            for (let index = 0; index < forms.length; index++) {
                if (this.ruta.idForm == forms[index].id) {
                    // console.log(forms[index]);
                    this.form = forms[index];
                }
            }
        },
        async updateForm() {
            let id = this.form.id
            const params = {
                name: this.form.name,
            }
            const data = await this.$axios.$put(`${Api}/formularios/form/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            let idCompanie = this.user.idCompanie
            const datahome = await this.$axios.$get(`${Api}/home/${idCompanie}`).catch(error => {
                console.log('Request canceled', error)
            })
            localStorage.setItem("datacompanie", JSON.stringify(datahome));
            // this.users = data;
            // console.log(data);
        },
        async verdata() {
            let id = this.$route.params.idForm
            const data = await this.$axios.$get(`${Api}/formularios/${this.user.idCompanie}/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            this.form = data.result[0]
            // console.log(data[0]);
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
                title: '¿Seguro de Editar el nombre del formulario?',
                text: "Se editará el nombre",
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
                    this.updateForm();
                    swalWithBootstrapButtons.fire(
                        {
                            title: 'Editado!',
                            text: 'Se Editó el formulario',
                            icon: 'success',
                            timer: 2000,
                        }
                    ).then(() => {
                        // Aquí la alerta se ha cerrado
                        location.href = `/${this.user.nameCompanie}/encuestas`
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