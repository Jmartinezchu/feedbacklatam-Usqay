<template>
    <div>
        <v-tour name="cupones" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`${id_type}/create`">
                    <div data-v-step="0"
                        style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <v-btn icon>
                            <v-icon>add_circle</v-icon>
                        </v-btn><strong class="text-dark pr-2">
                            <h5>Añadir -</h5>
                        </strong>
                    </div>
                </nuxt-link>
                <div class="mt-2">
                    <h5>Categorias de {{ typeCompanie.name }} </h5>
                </div>
            </div>

            <div class="col-3 text-center">
                <button @click="iniciar" class="d-flex">
                    <v-icon>mouse</v-icon>
                    <h6> ¿Como creo mi cupón?</h6>
                </button>
            </div>
        </div>
        <div class="row" v-if="typesCompanies.length != 0">
            <div class="col-md-4 mt-4" v-for="typec in typesCompanies" :key="typec.id" v-if="typec.name != 'Usqay'">
                <div class="card" data-v-step="1">
                    <div class="card-header pb-0 px-3" style="text-align:center">
                        <v-icon style="font-size:50px">category</v-icon>
                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                                <div class="d-flex flex-column text-center">
                                    <h6 class="text">{{ typec.name }}</h6>
                                </div>
                                <div class="ms-auto text-center ">
                                    <a data-v-step="3" @click="getDelete(typec)"
                                        class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                            class="far fa-trash-alt me-2"></i></a>
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
                        <v-icon style="font-size:50px">category</v-icon>
                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                                <div class="d-flex flex-column text-center">
                                    <h6 class="text">No tienes Categorias para esta compañia</h6>
                                    <p>inicia en el icono +</p>
                                </div>
                                <nuxt-link :to="`${id_type}/create`">
                                    <div data-v-step="0"
                                        style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                                        <v-btn icon>
                                            <v-icon>add_circle</v-icon>
                                        </v-btn>
                                    </div>
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import images from '../../../../api/URL_imges';
import Api from '../../../../api/API_feedback';

export default {
    name: 'FeedbackAppIndex',

    data() {
        return {
            fechahoy: new Date(),
            companie: {},
            images: images,
            user: [],
            sucursal: [],
            idSucursal: null,
            typesCompanies: {},
            typeCompanie: {},
            id_type: null,
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
                    content: `En este icono podras crear todos cupones que quieras ofrecerle al tus encuestados que ingrrsen sus datos en el formulario`,
                },
                {
                    target: '[data-v-step="1"]',
                    content: 'Despues de crear tu cupon aqui se visualizara y se elimiaran de acuerdo a la fecha establecida',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '[data-v-step="2"]',
                    content: 'Aqui puedes modificar datos del cupón',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '[data-v-step="3"]',
                    content: 'Aqui puedes elimirar el cupónn',
                    params: {
                        // placement: 'top'
                    }
                }
            ]
        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"))

        this.id_type = this.$route.params.idType
        await this.verdata();
        await this.vertypecom();
        // console.log(this.$route.params);
    },

    methods: {
        async verdata() {
            const data = await this.$axios.$get(`${Api}/types/${this.id_type}`).catch(error => {
                console.log('Request canceled', error)
            })
            this.typesCompanies = data;
            // console.log(data);
        },
        async vertypecom() {
            const data = await this.$axios.$get(`${Api}/type_companie/${this.id_type}`).catch(error => {
                console.log('Request canceled', error)
            })
            this.typeCompanie = data[0];
            // console.log(this.typeCompanie);
        },
        iniciar() {
            this.$tours['cupones'].start();
        },
        async deleteCupon(id) {
            const data = await this.$axios.$delete(`${Api}/types/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
            this.verdata();

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
                title: `¿Seguro de Eliminar la categoria ${data.name}?`,
                text: "Se eliminara la categoria",
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
                    this.deleteCupon(data.id);
                    swalWithBootstrapButtons.fire(
                        {
                            title: '¡Eliminado!',
                            text: 'Se elimino',
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
        }
    },
};
</script>

<style></style>