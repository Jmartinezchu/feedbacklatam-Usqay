<template>
    <div>
        <v-tour name="sucursales" :steps="steps" :options="myOptions"></v-tour>
        <div class="flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`companies/create`">
                    <div data-v-step="0"
                        style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <!-- <h6>Crear</h6> -->
                        <v-btn icon>
                            <v-icon>add_circle</v-icon>
                        </v-btn><strong class="text-dark pr-2">
                            <h5>Añadir -</h5>
                        </strong>

                    </div>
                </nuxt-link>
                <div class="mt-2">
                    <h5>Compañias</h5>
                </div>
            </div>
            <div class="col-3 text-center">
                <!-- <button @click="iniciar" class="d-flex">
                    <v-icon>mouse</v-icon>
                    <h6> ¿Como funciona esta pantalla??</h6>
                </button> -->
                <!-- <v-select :items="typecompanies" item-text="name" label="Todos" solo dense></v-select> -->
                <v-combobox :items="typecompanies" item-text="name" item-value="name" label="Todos" solo dense
                    v-model="typecompanie" @change="mostar(typecompanie)" @keyup="mostar(typecompanie)"></v-combobox>
                <!-- <v-switch v-model="switch1" :label="`Vista: ${typewiew}`"></v-switch> -->
            </div>
        </div>

        <!-- info encuensta -->
        <div class="row" v-if="sucursales.length != 0">
            <div class="col-md-4 mt-4" v-for="data in sucursales" :key="data.id" :class="{ Blurred: data.name == 'Usqay' }">
                <div class="card" data-v-step="1">
                    <div class="card-header pb-0 px-3" style="text-align:center">
                        <div class="dropdown"
                            style="display: flex;position: absolute;width: 90%;justify-content: space-between;">
                            <button class="btn btn-secondary bg-danger dropdown-toggle" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <!-- <v-icon>more_vert</v-icon> -->
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <nuxtLink :to="`companies/reports/` + data.id" class="dropdown-item" type="button"><i
                                            class="fas fa-route text-dark me-2" aria-hidden="true"></i>Ir a Repostes
                                    </nuxtLink>
                                </li>
                                <li v-if="data.state == 1"><button class="dropdown-item text-secondary" type="button"
                                        @click="getStateInactive(data)"><i
                                            class="far fa-eye-slash me-2"></i>Ocultar</button></li>
                                <li v-if="data.state == 0"><button class="dropdown-item text-success" type="button"
                                        @click="getStateActive(data)"><i class="far fa-eye me-2"></i>Activar</button></li>
                                <li><button @click="getDelete(data)" class="dropdown-item text-danger" type="button"><i
                                            class="far fa-trash-alt me-2"></i>Eliminar</button></li>

                            </ul>
                            <nuxtLink :to="`companies/` + data.id" type="button"><i class="fas fa-pencil-alt text-dark me-2"
                                    aria-hidden="true"></i></nuxtLink>
                        </div>
                        <img width="100" :src="`${images}/${data.filename}`" alt="" style=" border-radius: 50%">
                        <!-- <h6 class="mb-0">Informacion Encuesta</h6> -->
                    </div>
                    <div class="card-body p-3">

                        <ul class="list-group flex_card_question">
                            <!-- todas la sub categorias -->
                            <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                                <div class="d-flex flex-column text-center">
                                    <h5 class="text-sm">{{ data.name }}</h5>
                                    <h5 class="text-sm">{{ data.city }}</h5>
                                    <h5 class="text-sm">{{ data.iniOperaciones }}</h5>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-md-12 mt-4">
                <div class="card" data-v-step="1">
                    <div class="card-header pb-0 px-3" style="text-align:center">

                        <!-- <img width="100" :src="`${images}/${data.filename}`" alt="" style=" border-radius: 50%"> -->
                        <h6 class="mb-0">No hay empresas con este tipo de negocio</h6>
                    </div>
                    <div class="card-body p-3">

                        <ul class="list-group flex_card_question">
                            <!-- todas la sub categorias -->
                            <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                                <div class="d-flex flex-column text-center">
                                    <h5 class="text-sm">No se han encontrado empresas</h5>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- <pre>{{ sucursales }}</pre> -->
    </div>
</template>

<script>
import Api from '../../../api/API_feedback';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import images from '../../../api/URL_imges';
export default {
    name: 'FeedbackAppSucursales',

    data() {
        return {
            typecompanie: null,
            switch1: true,
            typewiew: 'cards',
            sucursales: [],
            images: images,
            user: {},
            typecompanies: [],
            myOptions: {
                useKeyboardNavigation: true,
                labels: {
                    buttonSkip: 'Terminar',
                    buttonPrevious: 'Atras',
                    buttonNext: 'Siguiente',
                    buttonStop: 'Finalizar',
                }
            },
            steps: [
                {
                    target: '[data-v-step="0"]',  // We're using document.querySelector() under the hood
                    content: `En este icono podras crear una nueva compañia`,
                },
                {
                    target: '[data-v-step="1"]',
                    content: 'Despues de crear tu compañia, aqui se visualizara con los datos que has creado',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '[data-v-step="2"]',
                    content: 'Aqui puedes modificar datos de la compañia',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '[data-v-step="3"]',
                    content: 'Aqui puedes cambiar el estado de la compañia',
                    params: {
                        // placement: 'top'
                    }
                }
            ]
        };
    },

    async mounted() {

        // console.log(this.$route);
        this.user = JSON.parse(localStorage.getItem("user"))
        await this.getTypeCompanie();
        await this.verdata();

    },
    watch: {
        switch1: function (val) {
            if (this.switch1) {
                // console.log('true');
                this.typewiew = 'Cards'
            }
            if (!this.switch1) {
                // console.log('false');
                this.typewiew = 'list'
            }
        }
    },

    methods: {
        async mostar(txt) {
            if (txt != undefined) {
                if (txt.name != undefined) {
                    const data = await this.$axios.$get(`${Api}/companies/filtertcomp/${txt.id}`).catch(error => {
                        console.log('Request canceled', error)
                    })
                    this.sucursales = data;
                }
            } else {
                await this.verdata()
            }
        },
        async getTypeCompanie() {
            const data = await this.$axios.$get(`${Api}/type_companie/`).catch(error => {
                console.log('Request canceled', error)
            })
            this.typecompanies = data;
            // console.log(this.typecompanies);
        },
        async deleteCompanie(id) {
            const data = await this.$axios.$delete(`${Api}/companies/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            if (data === 'se Elimino la compañia') {
                this.deleteUser(id)
            } else {
                //  console.log('no se elimino nada'); 
            }
            // console.log(data);
            this.verdata();
        },
        async deleteUser(id) {
            const data = await this.$axios.$delete(`${Api}/companies/user/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
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
                title: `¿Seguro de Eliminar la compañia ${data.name}?`,
                text: "se eliminara todo",
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
                    this.deleteCompanie(data.id);
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

        async sucursalDelete(id) {
            const data = await this.$axios.$delete(`${Api}/companies/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
        },
        async verdata() {
            const data = await this.$axios.$get(`${Api}/companies`).catch(error => {
                console.log('Request canceled', error)
            })
            this.sucursales = data;
            // console.log(data);
        },
        iniciar() {
            this.$tours['sucursales'].start();
        },
        async putActiveCompanie(id) {
            const params = {
                state: 1
            }
            const data = await this.$axios.$put(`${Api}/companies/state/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
        },
        async putDesactivCompanie(id) {
            const params = {
                state: 0
            }
            const data = await this.$axios.$put(`${Api}/companies/state/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
        },
        getStateActive(data) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: `¿Seguro de Activar a ${data.name}`,
                text: "Los usuarios podran acceder a esta compañia",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-trash-alt me-2"></i> Si, Activar!',
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
                    console.log('funcion cambiar estado')
                    this.putActiveCompanie(data.id);
                    swalWithBootstrapButtons.fire(
                        {
                            title: 'Listo!',
                            text: 'Se habilito la Compañia',
                            icon: 'success',
                            timer: 2500,
                        }
                    )
                    // this.verdata();
                    location.href = `/${this.user.nameCompanie}/companies`
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    // console.log('no se elimina')
                }
            })
        },
        getStateInactive(data) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: `¿Seguro de inhabilitar a ${data.name}`,
                text: "Los usuarios no podran acceder a esta compañia",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-trash-alt me-2"></i> Si, Inhabilitar!',
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
                    // console.log('funcion cambiar estado')
                    this.putDesactivCompanie(data.id);
                    swalWithBootstrapButtons.fire(
                        {
                            title: 'Listo!',
                            text: 'Se Inhabilito la Compañia',
                            icon: 'success',
                            timer: 2500,
                        }
                    )
                    // this.verdata();
                    location.href = `/${this.user.nameCompanie}/companies`
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    // console.log('no se elimina')
                }
            })
        }

    },
};
</script>

<style scoped>
.Blurred {
    display: none !important;
}

.v-input--selection-controls {
    margin-top: 4px;
    padding-top: 3px;
    margin-left: 12px;
}
</style>