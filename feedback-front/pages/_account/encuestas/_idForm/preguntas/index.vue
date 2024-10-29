<template>
    <div>
        <div class="row">
            <div class="flex col-md-8" style="align-items:center ">
                <div class="col-1">
                    <nuxt-link to="preguntas/createQuestion">
                        <div style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                            <v-btn icon>
                                <v-icon>add_circle</v-icon>
                            </v-btn>
                            <strong class="text-dark pr-2">
                                <h5>Añadir </h5>
                            </strong>
                        </div>
                    </nuxt-link>
                </div>
                <div style="margin: 0 auto;">
                    <h6> Preguntas generadas por feedback</h6>
                </div>
            </div>

            <div class="col-md-4">
                <div class="form-floating">
                    <select class="form-select" v-model="form.type_options" id="floatingSelect"
                        aria-label="Floating label select" @change="updateTypeOptions(form.type_options)">
                        <option v-for="opt in type_options" :key="opt.id" :value="opt.id">
                            {{ opt.valor }}</option>
                    </select>
                    <label for="floatingSelect">Diseño de las Opciones</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div v-for="qst in questions" :key="qst.id" class="col-md-12 mt-4">
                <div class="card" v-if="qst.tipo === 'booleam'">
                    <div class="flex" style="justify-content: space-between; align-items: baseline;">
                        <div class="card-header pb-0 px-3">
                            <h6 class="mb-0 text-center">Default</h6>
                        </div>
                        <div class="ms-auto text-center ">
                            <button v-if="qst.state === 1" @click="updateQuestion(qst.id, 0)"
                                class="btn btn-link text-success px-3 mb-0"><i class="fas fa-eye text-success me-2"
                                    aria-hidden="true"></i>Activado</button>
                            <button v-if="qst.state === 0" @click="updateQuestion(qst.id, 1)"
                                class="btn btn-link text-dark px-3 mb-0"><i class="fas fa-eye-slash text-dark me-2"
                                    aria-hidden="true"></i>Oculto</button>
                        </div>
                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <li class=" list-group-item border-0 mb-2 bg-gray-100 border-radius-lg w-100"
                                style="margin: 0 3px">
                                <div class="d-flex flex-column">
                                    <h6 class="text-sm">{{ qst.question }}</h6>
                                    <span class="mb-2 text-xs"> Options<span class="text-dark font-weight-bold ms-sm-2">Si /
                                            No</span></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="card" v-if="qst.tipo === 'simple'">
                    <div class="flex" style="justify-content: space-between; align-items: baseline;">
                        <div class="card-header pb-0 px-3">
                            <h6 class="mb-0">{{ qst.titulo }}</h6>
                            <!-- <h6 class="mb-0 text-center">Simple</h6> -->
                            <!-- <p class="mb-0 text-center">Comidas</p> -->
                        </div>
                        <div class="ms-auto text-center ">
                            <nuxtLink :to="`preguntas/${qst.id}/${qst.tipo}`" class="btn btn-link text-dark px-3 mb-0"
                                href="javascript:;"><i class="fas fa-pencil-alt text-dark me-2"
                                    aria-hidden="true"></i>Editar</nuxtLink>
                            <button @click="getDelete(qst)" class="btn btn-link text-danger text-gradient px-3 mb-0"
                                href="javascript:;"><i class="far fa-trash-alt me-2"></i>Eliminar</button>
                            <button v-if="qst.state === 1" @click="updateQuestion(qst.id, 0)"
                                class="btn btn-link text-success px-3 mb-0"><i class="fas fa-eye text-success me-2"
                                    aria-hidden="true"></i>Activado</button>
                            <button v-if="qst.state === 0" @click="updateQuestion(qst.id, 1)"
                                class="btn btn-link text-dark px-3 mb-0"><i class="fas fa-eye-slash text-dark me-2"
                                    aria-hidden="true"></i>Oculto</button>
                        </div>
                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <!-- todas la sub categorias -->
                            <li class=" list-group-item border-0 mb-2 bg-gray-100 border-radius-lg w-100"
                                style="margin: 0 3px">
                                <div class="d-flex flex-column">
                                    <h6 class="">{{ qst.question }}</h6>
                                    <span class="mb-2 text-sm"> Icono:{{ String.fromCodePoint("0x" + qst.icon) }}</span>
                                    <span class="mb-2 text-sm"> Opciones de Barra</span>

                                </div>
                                <!-- <div class="ms-auto text-center ">
                                    <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                            class="far fa-trash-alt me-2"></i>Delete</a>
                                    <nuxtLink to="/encuestas/1" class="btn btn-link text-dark px-3 mb-0"
                                        href="javascript:;"><i class="fas fa-pencil-alt text-dark me-2"
                                            aria-hidden="true"></i>Edit</nuxtLink>
                                </div> -->
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="card" v-if="qst.tipo === 'multiple'">
                    <div class="flex" style="justify-content: space-between; align-items: baseline;">
                        <div class="card-header pb-0 px-3">
                            <h6 class="mb-0 text-center">{{ qst.question }}</h6>
                            <!-- <p class="mb-0 text-center">Comidas</p> -->
                        </div>
                        <div class="ms-auto text-center ">
                            <nuxtLink :to="`preguntas/${qst.id}/${qst.tipo}`" class="btn btn-link text-dark px-3 mb-0"
                                href="javascript:;"><i class="fas fa-pencil-alt text-dark me-2"
                                    aria-hidden="true"></i>Editar</nuxtLink>
                            <button @click="getDelete(qst)" class="btn btn-link text-danger text-gradient px-3 mb-0"
                                href="javascript:;"><i class="far fa-trash-alt me-2"></i>Eliminar</button>
                            <button v-if="qst.state === 1" @click="updateQuestion(qst.id, 0)"
                                class="btn btn-link text-success px-3 mb-0"><i class="fas fa-eye text-success me-2"
                                    aria-hidden="true"></i>Activado</button>
                            <button v-if="qst.state === 0" @click="updateQuestion(qst.id, 1)"
                                class="btn btn-link text-dark px-3 mb-0"><i class="fas fa-eye-slash text-dark me-2"
                                    aria-hidden="true"></i>Oculto</button>
                        </div>
                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <li v-for="mult in qst.sub_titulos" :key="mult.id"
                                class=" list-group-item border-0 mb-2 bg-gray-100 border-radius-lg w-100"
                                style="margin: 0 3px">
                                <div class="d-flex flex-column">
                                    <h6 class="">{{ mult.titulo }}</h6>
                                    <span class="mb-2 text-sm"> Icono:{{ String.fromCodePoint("0x" + mult.icon) }}</span>
                                    <span class="mb-2 text-sm"> Opciones de Barra</span>

                                </div>
                                <div class="ms-auto text-center" v-if="qst.sub_titulos.length > 2">
                                    <button @click.prevent="getDeletesubmultiple(mult)"
                                        class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                            class="far fa-trash-alt me-2"></i>Eliminar</button>

                                </div>
                            </li>

                        </ul>
                    </div>
                </div>

                <div class="card" v-if="qst.tipo === 'numbers'">
                    <div class="flex" style="justify-content: space-between; align-items: baseline;">
                        <div class="card-header pb-0 px-3">
                            <h6 class="mb-0 text-center">NPS</h6>
                        </div>
                        <div class="ms-auto text-center ">
                            <button v-if="qst.state === 1" @click="updateQuestion(qst.id, 0)"
                                class="btn btn-link text-success px-3 mb-0"><i class="fas fa-eye text-success me-2"
                                    aria-hidden="true"></i>Activado</button>
                            <button v-if="qst.state === 0" @click="updateQuestion(qst.id, 1)"
                                class="btn btn-link text-dark px-3 mb-0"><i class="fas fa-eye-slash text-dark me-2"
                                    aria-hidden="true"></i>Oculto</button>
                        </div>
                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <li class=" list-group-item border-0 mb-2 bg-gray-100 border-radius-lg w-100"
                                style="margin: 0 3px">
                                <div class="d-flex flex-column">
                                    <h6 class="text-sm">{{ qst.question }}</h6>
                                    <span class="mb-2 text-xs"> Options<span class="text-dark font-weight-bold ms-sm-2">01/
                                            10</span></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- <pre>{{ questions }}</pre> -->
        </div>
    </div>
</template>

<script>
import Api from '../../../../../api/API_feedback';
import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
    name: 'FeedbackAppId',

    data() {
        return {
            user: [],
            datacompanie: {},
            id: null,
            idForm: null,
            questions: [],
            options: [],
            type_options: [],

            form: {},
        };
    },

    async mounted() {
        this.idForm = this.$route.params.idForm;
        this.user = JSON.parse(localStorage.getItem("user"))
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        this.type_options = this.datacompanie.lists.type_optionsForms
        await this.verdataForm(this.datacompanie.lists.formularios);
        // await this.verdata();

    },

    methods: {
        async actualizarData() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/home/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            localStorage.setItem("datacompanie", JSON.stringify(data));
            this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"));
            await this.verdataForm(this.datacompanie.lists.formularios);

        },
        async verdataForm(forms) {
            let id = this.$route.params.idForm
            for (let index = 0; index < forms.length; index++) {
                if (id == forms[index].id) {
                    this.form = forms[index]
                    // console.log(this.form);
                    this.questions = this.form.questions[0]
                }
            }
        },
        async deletesubMultiple(id) {
            const data = await this.$axios.$delete(`${Api}/questionSub/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            await this.actualizarData();
        },
        getDeletesubmultiple(data) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: `¿Seguro de Eliminar sub Area ${data.titulo}?`,
                text: "Se eliminara de la encueta y de los reportes",
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
                    this.deletesubMultiple(data.id);
                    swalWithBootstrapButtons.fire(
                        {
                            title: '¡Eliminado!',
                            text: 'Se elimino el cupón',
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
        },

        async putTypeOptionsForm(val) {
            const params = {
                type_options: val
            }
            const data = await this.$axios.$put(`${Api}/type_options/${this.idForm}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            await this.actualizarData();
        },
        updateTypeOptions(data) {
            this.putTypeOptionsForm(data)
            Swal.fire({
                icon: 'success',
                title: 'Actualizando...!',
                showConfirmButton: false,
                timer: 2000
            })
        },

        // async verdata() {
        //     const data = await this.$axios.$get(`${Api}/question/admin/${this.idForm}`).catch(error => {
        //         console.log('Request canceled', error)
        //     })
        //     this.questions = data;

        // },
        async putStateQuestion(id, val) {
            const params = {
                state: val
            }
            const data = await this.$axios.$put(`${Api}/question/state/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            await this.actualizarData();
        },

        updateQuestion(id, val) {
            this.putStateQuestion(id, val)
            Swal.fire({
                icon: 'success',
                title: 'Actualizando...!',
                showConfirmButton: false,
                timer: 2000
            })
        },
        async deleteQuestion(id) {
            const data = await this.$axios.$delete(`${Api}/question/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
            await this.actualizarData();

        },
        getDelete(data) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: `¿Seguro de Eliminar la Pregunta ${data.question}?`,
                text: "Se eliminaran todos los datos recibidos de esta pregunta",
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
                    this.deleteQuestion(data.id);
                    swalWithBootstrapButtons.fire(
                        {
                            title: '¡Eliminado!',
                            text: 'Se elimino la Pregunta',
                            icon: 'success',
                            timer: 15000,
                        }
                    )
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    // console.log('no se elimina')
                }
            })
        },
    },

};
</script>

<style>
.flex_card_question {
    display: flex;
    justify-content: center;
    flex-direction: row;
}

@media screen and (max-width:700px) {
    .flex_card_question {
        flex-direction: column !important;
    }
}
</style>