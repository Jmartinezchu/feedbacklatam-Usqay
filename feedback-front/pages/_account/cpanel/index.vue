<template>
    <div class="container-fluid">
        <v-tour name="homeTour" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between mb-3" style="align-items:center ">
            <div class="col-9 flex">

                <div class="mt-2">
                    <h5>Home</h5>
                </div>
            </div>

            <div class="col-3 text-center">
                <button @click="iniciar" class="d-flex">
                    <v-icon>mouse</v-icon>
                    <h6> ¿Que hago aqui?</h6>
                </button>
            </div>
        </div>
        <CardsData :cards="cards" />

        <div class="row" data-v-step="4">
            <div class="col-md-12 mt-4">
                <div class="card mb-4">
                    <div class="card-header pb-0 px-3">
                        <div class="row">
                            <div class="col-md-12">
                                <h6 class="mb-0">Comentarios Recibidos</h6>
                                <h6 class="text-uppercase text-body text-xs font-weight-bolder">Todos</h6>
                            </div>
                        </div>
                    </div>
                    <div class="px-2">
                        <div v-if="showGrafics != false" class="row">
                            <div class="col-md-6 mt-4">
                                <div class="card h-100 mb-4">
                                    <chartsBarra />
                                    <!-- <bar-chart :chart-options='chartOptionsBarra' :chart-data='chartBarra' /> -->
                                </div>
                            </div>
                            <div class="col-md-6 mt-4">
                                <div class="card h-100 mb-4">
                                    <chartsCircle />
                                    <!-- <pie-chart :chart-options='chartOptionsCircle' :chart-data='chartDataCircle' /> -->
                                </div>
                            </div>
                        </div>
                        <div v-else class="row">
                            <div style="text-align:center">
                                <h5> <v-icon>warning</v-icon> no hay datos registrados</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- list Qrs -->
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="flex" style="justify-content: space-between;">
                        <div class="card-header pb-0 flex ">
                            <h6>
                                <nuxtLink v-if="user.rol_id === 1" :to="`/${user.nameCompanie}/generateQR/create`"
                                    class="font-weight-bolder"
                                    style="margin-right:15px; border-radius:5px; padding:5px; margin: 5px; color :#fff">
                                    <v-icon color="#000" style="margin: 0 3px">
                                        add_circle
                                    </v-icon> Añadir /
                                </nuxtLink> Qrs
                            </h6>
                        </div>
                        <div class="mr-2">
                            <v-text-field v-model="searchQrs" append-icon="search" label="Search" single-line
                                hide-details></v-text-field>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <v-data-table :headers="headersQrs" :items="qrs" :search="searchQrs" :items-per-page="5"
                                class="elevation-1">
                                <template v-slot:items="props">
                                    <td><v-icon>qr_code</v-icon></td>
                                    <td>{{ props.item.nameForm }}</td>
                                    <td>{{ props.item.nameSucursal }}</td>
                                    <td><a target="_blank"
                                            :href="`${front}/forms/${props.item.id}/${props.item.id_companie}/${props.item.id_sucursal}/${props.item.id_form}     `"
                                            class="text-dark ms-sm-2 font-weight-bold">
                                            feedbaklatam.com/forms/{{ props.item.id }}/{{ props.item.id_companie }}/{{
                                                props.item.id_sucursal }}/{{ props.item.id_form }}</a></td>
                                    <td>
                                        <span v-if="props.item.state == 1"
                                            class="badge px-3 py-2 my-1 badge-sm bg-gradient-success">Online</span>
                                        <span v-if="props.item.state == 0"
                                            class="badge px-3 py-2 my-1 badge-sm bg-gradient-danger">Offline</span>
                                    </td>
                                    <!-- <td>
                                        <button @click="mesaje()"><v-icon>edit</v-icon></button>
                                        <button @click="mesaje()"><v-icon>delete</v-icon></button>
                                        <button v-if="props.item.state == 1"
                                            @click="mesaje()"><v-icon>visibility</v-icon></button>
                                        <button v-if="props.item.state == 0"
                                            @click="mesaje()"><v-icon>visibility_off</v-icon></button>
                                    </td> -->
                                </template>
                                <template v-slot:no-data>
                                    <v-alert :value="true" color="errorl" style="color:#000" icon="warning">
                                        Disculpa, no tienes ningun QR registrado :(
                                    </v-alert>
                                </template>
                            </v-data-table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- list Sucursales -->
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="flex" style="justify-content: space-between;">
                        <div class="card-header pb-0 flex ">
                            <h6>
                                <nuxtLink v-if="user.rol_id === 1" :to="`/${user.nameCompanie}/sucursales/create`"
                                    class="font-weight-bolder"
                                    style="margin-right:15px; border-radius:5px; padding:5px; margin: 5px; color :#fff">
                                    <v-icon color="#000" style="margin: 0 3px">
                                        add_circle
                                    </v-icon> Añadir /
                                </nuxtLink> Sucursales
                            </h6>
                        </div>
                        <div class="mr-2">
                            <v-text-field v-model="searchSucu" append-icon="search" label="Search" single-line
                                hide-details></v-text-field>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <v-data-table :headers="headersSucu" :items="sucursales" :search="searchSucu"
                                :items-per-page="5" class="elevation-1">
                                <template v-slot:items="props">
                                    <td><v-icon>other_houses</v-icon></td>
                                    <td>{{ props.item.name }}</td>
                                    <td>{{ props.item.city }}</td>
                                    <td>
                                        <span v-if="props.item.state == 1"
                                            class="badge px-3 py-2 my-1 badge-sm bg-gradient-success">Online</span>
                                        <span v-if="props.item.state == 0"
                                            class="badge px-3 py-2 my-1 badge-sm bg-gradient-danger">Offline</span>
                                    </td>
                                    <!-- <td>
                                        <button @click="mesaje()"><v-icon>edit</v-icon></button>
                                        <button @click="mesaje()"><v-icon>delete</v-icon></button>
                                        <button v-if="props.item.state == 1"
                                            @click="mesaje()"><v-icon>visibility</v-icon></button>
                                        <button v-if="props.item.state == 0"
                                            @click="mesaje()"><v-icon>visibility_off</v-icon></button>
                                    </td> -->
                                </template>
                                <template v-slot:no-data>
                                    <v-alert :value="true" color="errorl" style="color:#000" icon="warning">
                                        Disculpa, no tienes ningun cliente registrado :(
                                    </v-alert>
                                </template>
                            </v-data-table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- list Formularios -->
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="flex" style="justify-content: space-between;">
                        <div class="card-header pb-0 flex ">
                            <h6>
                                <nuxtLink v-if="user.rol_id === 1" :to="`/${user.nameCompanie}/encuestas/create`"
                                    class="font-weight-bolder"
                                    style="margin-right:15px; border-radius:5px; padding:5px; margin: 5px; color :#fff">
                                    <v-icon color="#000" style="margin: 0 3px">
                                        add_circle
                                    </v-icon> Añadir /
                                </nuxtLink> Encuestas
                            </h6>
                        </div>
                        <div class="mr-2">
                            <v-text-field v-model="searchForm" append-icon="search" label="Search" single-line
                                hide-details></v-text-field>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <v-data-table :headers="headersForm" :items="formularios" :search="searchForm"
                                :items-per-page="5" class="elevation-1">
                                <template v-slot:items="props">
                                    <td><v-icon>format_list_bulleted_add</v-icon></td>
                                    <td>{{ props.item.name }}</td>
                                    <td>{{ props.item.autor }}</td>
                                    <!-- <td>{{ props.item.nameCompanie }}</td> -->
                                    <td>
                                        <span v-if="props.item.state == 1"
                                            class="badge px-3 py-2 my-1 badge-sm bg-gradient-success">Online</span>
                                        <span v-if="props.item.state == 0"
                                            class="badge px-3 py-2 my-1 badge-sm bg-gradient-danger">Offline</span>
                                    </td>
                                    <!-- <td>
                                        <button @click="mesaje()"><v-icon>edit</v-icon></button>
                                        <button @click="mesaje()"><v-icon>delete</v-icon></button>
                                        <button v-if="props.item.state == 1"
                                            @click="mesaje()"><v-icon>visibility</v-icon></button>
                                        <button v-if="props.item.state == 0"
                                            @click="mesaje()"><v-icon>visibility_off</v-icon></button>
                                    </td> -->
                                </template>
                                <template v-slot:no-data>
                                    <v-alert :value="true" color="errorl" style="color:#000" icon="warning">
                                        Disculpa, no tienes ningun cliente registrado :(
                                    </v-alert>
                                </template>
                            </v-data-table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- list Personal -->
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="flex" style="justify-content: space-between;">
                        <div class="card-header pb-0 flex ">
                            <h6>
                                <nuxtLink v-if="user.rol_id === 1" :to="`/${user.nameCompanie}/personal/create`"
                                    class="font-weight-bolder"
                                    style="margin-right:15px; border-radius:5px; padding:5px; margin: 5px; color :#fff">
                                    <v-icon color="#000" style="margin: 0 3px">
                                        add_circle
                                    </v-icon> Añadir /
                                </nuxtLink> Personal
                            </h6>
                        </div>
                        <div class="mr-2">
                            <v-text-field v-model="searchPerson" append-icon="search" label="Search" single-line
                                hide-details></v-text-field>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <v-data-table :headers="headersPerson" :items="personal" :search="searchPerson"
                                :items-per-page="5" class="elevation-1">
                                <template v-slot:items="props">
                                    <td><v-icon>group_add</v-icon></td>
                                    <td>{{ props.item.name }}</td>
                                    <td>{{ props.item.usuario }}</td>
                                    <!-- <td>{{ props.item.password }}</td> -->
                                    <td>{{ props.item.celular }}</td>
                                    <td>{{ props.item.dni }}</td>
                                    <td>
                                        <span v-if="props.item.state == 1"
                                            class="badge px-3 py-2 my-1 badge-sm bg-gradient-success">Online</span>
                                        <span v-if="props.item.state == 0"
                                            class="badge px-3 py-2 my-1 badge-sm bg-gradient-danger">Offline</span>
                                    </td>
                                    <!-- <td>
                                        <button @click="mesaje()"><v-icon>edit</v-icon></button>
                                        <button @click="mesaje()"><v-icon>delete</v-icon></button>
                                        <button v-if="props.item.state == 1"
                                            @click="mesaje()"><v-icon>visibility</v-icon></button>
                                        <button v-if="props.item.state == 0"
                                            @click="mesaje()"><v-icon>visibility_off</v-icon></button>
                                    </td> -->
                                </template>
                                <template v-slot:no-data>
                                    <v-alert :value="true" color="errorl" style="color:#000" icon="warning">
                                        No tienes ningun Personal administrativo registrado :(
                                    </v-alert>
                                </template>
                            </v-data-table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- list Cupones por sucursal -->
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="flex" style="justify-content: space-between;">
                        <div class="card-header pb-0 flex ">
                            <h6>Cupones por Sucursal
                            </h6>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <div justify="center" v-if="sucursales.length != 0">
                                <v-expansion-panel focusable v-model="panel">
                                    <v-expansion-panel-content v-for="sucu in sucursales" :key="sucu.id">
                                        <div slot="header" style="width: 100%;" @click.prevent="getCupones(sucu.id)">{{
                                            sucu.name }}
                                        </div>

                                        <v-card>
                                            <div class="flex" style="justify-content: space-between;">
                                                <div class="card-header pb-0 flex ">
                                                    <h6>
                                                        <nuxtLink v-if="user.rol_id === 1"
                                                            :to="`/${user.nameCompanie}/cupones/${sucu.id}/create`"
                                                            class="font-weight-bolder"
                                                            style="margin-right:15px; border-radius:5px; padding:5px; margin: 5px; color :#fff">
                                                            <v-icon color="#000" style="margin: 0 3px">
                                                                add_circle
                                                            </v-icon> Añadir /
                                                        </nuxtLink> Cupón
                                                    </h6>
                                                </div>
                                                <div class="mr-2">
                                                    <v-text-field v-model="searchCupones" append-icon="search"
                                                        label="Search" single-line hide-details></v-text-field>
                                                </div>
                                            </div>
                                            <div class="card-body px-0 pt-0 pb-2">
                                                <div class="table-responsive p-0">
                                                    <v-data-table :headers="headersCupones" :items="cupones"
                                                        :search="searchCupones" :items-per-page="5" class="elevation-1">
                                                        <template v-slot:items="props">
                                                            <td><v-icon>redeem</v-icon></td>
                                                            <td>{{ props.item.nombre }}</td>
                                                            <td>{{ props.item.valor }}</td>
                                                            <!-- <td>{{ props.item.password }}</td> -->
                                                            <td>{{ props.item.stock }}</td>
                                                            <!-- <td>{{ props.item.dni }}</td> -->
                                                            <td>
                                                                <span v-if="props.item.state == 1"
                                                                    class="badge px-3 py-2 my-1 badge-sm bg-gradient-success">Online</span>
                                                                <span v-if="props.item.state == 0"
                                                                    class="badge px-3 py-2 my-1 badge-sm bg-gradient-danger">Offline</span>
                                                            </td>
                                                            <!-- <td>
                                                                <button @click="mesaje()"><v-icon>edit</v-icon></button>
                                                                <button @click="mesaje()"><v-icon>delete</v-icon></button>
                                                                <button v-if="props.item.state == 1"
                                                                    @click="mesaje()"><v-icon>visibility</v-icon></button>
                                                                <button v-if="props.item.state == 0"
                                                                    @click="mesaje()"><v-icon>visibility_off</v-icon></button>
                                                            </td> -->
                                                        </template>
                                                        <template v-slot:no-data>
                                                            <v-alert :value="true" color="errorl" style="color:#000"
                                                                icon="warning">
                                                                No tienes ningun Cupon registrado en esta sucursal :(
                                                            </v-alert>
                                                        </template>
                                                    </v-data-table>

                                                </div>
                                            </div>
                                        </v-card>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </div>
                            <div justify="center" v-else>
                                <v-expansion-panel focusable>
                                    <div><v-icon>warning</v-icon>No tienes ningun Sucursales registradas :(</div>
                                </v-expansion-panel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>
  
<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../../../api/API_feedback';
import front from '../../../api/URL_feedback';

export default {
    name: 'FeedbackAppCpanel',
    data() {
        return {
            datahome: {},
            showGrafics: false,

            idCompanie: null,
            front: front,
            panel: 0,
            isHidden: false,
            user: [],
            searchSucu: '',
            headersSucu: [
                {
                    text: '',
                    align: 'start',
                    sortable: false,
                    value: 'icon',
                },
                { text: 'Nombre', value: 'name' },
                { text: 'Ciudad', value: 'city' },
                { text: 'Estado', value: 'state' },
                // { text: 'Options', value: 'options' }

            ],
            searchForm: '',
            headersForm: [
                {
                    text: '',
                    align: 'start',
                    sortable: false,
                    value: 'icon',
                },
                { text: 'Nombre', value: 'name' },
                { text: 'Autor', value: 'autor' },
                // { text: 'Empresa', value: 'nameCompanie' },
                { text: 'Estado', value: 'state' },
                // { text: 'Options', value: 'options' }
            ],
            searchPerson: '',
            headersPerson: [
                {
                    text: '',
                    align: 'start',
                    sortable: false,
                    value: 'icon',
                },
                { text: 'Nombre', value: 'name' },
                { text: 'Usuario', value: 'usuario' },
                { text: 'Celular', value: 'celular' },
                { text: 'Estado', value: 'state' },
                // { text: 'Options', value: 'options' }
            ],
            searchQrs: '',
            headersQrs: [
                {
                    text: '',
                    align: 'start',
                    sortable: false,
                    value: 'icon',
                },
                { text: 'Formulaio', value: 'nameForm' },
                { text: 'Sucursal', value: 'nameSucursal' },
                { text: 'Link', value: 'link' },
                { text: 'Estado', value: 'state' },
                // { text: 'Options', value: 'options' }
            ],
            searchCupones: '',
            headersCupones: [
                {
                    text: '',
                    align: 'start',
                    sortable: false,
                    value: 'icon',
                },
                { text: 'Nombre', value: 'nombre' },
                { text: 'Valor', value: 'valor' },
                { text: 'Stock', value: 'stock' },
                { text: 'Estado', value: 'state' },
                // { text: 'Options', value: 'options' }
            ],

            qrs: [],
            personal: [],
            formularios: [],
            sucursales: [],
            cupones: [],


            cards: {},
            valGraficos: {},

            chartBarra: {},
            chartOptionsBarra: {
                responsive: true,
                maintainAspectRatio: false
            },
            chartDataCircle: {},
            chartOptionsCircle: {
                responsive: true,
                maintainAspectRatio: false
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
                    content: `Tarjetas de información general`,
                    params: {
                        placement: 'top'
                    }
                },//Regresa a tus cupones <strong>Aqui</strong>! 
                {
                    target: '[data-v-step="1"]',
                    content: `Total comentarios recibidos resumen`,
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '[data-v-step="2"]',
                    content: 'Aqui pordras visualizar todas las encuestas creadas',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '[data-v-step="3"]',
                    content: `<strong>Aqui</strong> puedes ir a crear una nueva encuesta`,
                    params: {
                        placement: 'left'
                    }
                },
                {
                    target: '[data-v-step="4"]',
                    content: `<strong>Aqui</strong> podras visualizar graficamente la cantidad de comentarios recibidos`,
                    params: {
                        placement: 'top'
                    }
                }
            ],
            dialog: false,
        }
    },

    async mounted() {

        this.user = JSON.parse(localStorage.getItem("user"));
        this.idCompanie = this.user.idCompanie
        try {
            await this.getdatahome(this.idCompanie)
        } catch (error) {
            console.log(error);
        }


    },

    methods: {
        async getdatahome(id) {
            Swal.fire({
                icon: 'success',
                title: 'Procesando...',
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading()
                },
                timer: 2780
            })
            const data = await this.$axios.$get(`${Api}/home/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            localStorage.setItem("datacompanie", JSON.stringify(data));
            this.qrs = data.lists.qrs
            this.personal = data.lists.personal
            this.formularios = data.lists.formularios
            this.sucursales = data.lists.sucursales
            this.cupones = data.lists.cupones

            this.cards = data.cards
            this.valGraficos = data.valGraficos

            if (this.cards.allComentsCompanie != 0) {
                this.verdatabarra(this.valGraficos.countFeli, this.valGraficos.countSuge, this.valGraficos.countRecla)
                this.verdatacircle(this.valGraficos.countFeli, this.valGraficos.countSuge, this.valGraficos.countRecla)
                this.showGrafics = true
            }


        },
        // TODO: Esta funcion queda para las tablas dinamicas, al asiganr modifica la posicion de la respuesta 
        async getCupones(id) {
            // this.isHidden = !this.isHidden
            // console.log(this.sucursales);
            for (let index = 0; index < this.sucursales.length; index++) {
                if (id == this.sucursales[index].id) {
                    // console.log(this.sucursales[index].cupones);
                    this.cupones = this.sucursales[index].cupones[0]
                }
            }
        },
        verdatabarra(countFeli, countSuge, countRecla) {

            let datasss = {
                labels: ['Comentarios'],
                datasets: [
                    {
                        label: 'Felicitaciones ',
                        backgroundColor: ['green'],
                        data: [countFeli]
                    },
                    {
                        label: 'Sugerencias',
                        backgroundColor: ['#d2d13c'],
                        data: [countSuge]
                    },
                    {
                        label: 'Reclamos',
                        backgroundColor: ['red'],
                        data: [countRecla]
                    }
                ]
            }
            this.chartBarra = datasss


        },
        verdatacircle(countFeli, countSuge, countRecla) {

            let datasss = {
                labels: ['felitaciones', 'Sugerencias', 'Reclamos'],
                datasets: [
                    {
                        label: 'Ocultar',
                        backgroundColor: ['green', '#d2d13c', 'red'],
                        data: [countFeli, countSuge, countRecla]
                    }
                ]
            }
            this.chartDataCircle = datasss
        },



        // TODO: funciones inhabilitadas
        async getComentsAll() {
            let id = this.user.idCompanie;
            const data = await this.$axios.$get(`${Api}/comentarios/count/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            // this.allComentsCompanie = data[0].total;
            if (data.length != 0) {
                this.allComentsCompanie = data[0].total;
            } else {
                this.allComentsCompanie = 0;
            }
            // console.log(data);
        },
        async getRegistersAll() {
            let id = this.user.idCompanie;
            const data = await this.$axios.$get(`${Api}/companies/countRegister/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            // this.allComentsCompanie = data[0].total;
            if (data.length != 0) {
                this.allRegisterCompanie = data[0].total;
            } else {
                this.allRegisterCompanie = 0;
            }
            // console.log(data);
        },
        async getCuponesAll() {
            let id = this.user.idCompanie;
            const data = await this.$axios.$get(`${Api}/cupones/count/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            if (data.length != 0) {
                this.allCuponesCompanie = data[0].total;
            } else {
                this.allCuponesCompanie = 0;
            }
            // console.log(data);
        },
        async getClientsRegister() {
            let id = this.user.idCompanie;
            const data = await this.$axios.$get(`${Api}/clientes/count/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            if (data.length != 0) {
                this.allClienteRegister = data[0].total;
            } else {
                this.allClienteRegister = 0;
            }

            // console.log(data);
        },
        async getSucursales() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/branchoffices/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.sucursales = data;
            if (data.length != 0) {
                this.getCupones(data[0].id)
            }
        },
        async getForms() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/formularios/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.formularios = data;
            // console.log(data);
        },
        async getPersonal() {
            const data = await this.$axios.$get(`${Api}/personal/` + this.user.idCompanie).catch(error => {
                console.log('Request canceled', error)
            })
            this.personal = data;
            // console.log(data);
        },
        async getQrs() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/generateQr/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.qrs = data;
            // console.log(data);
        },
        mesaje() {
            console.log('click');
        },
        iniciar() {
            this.$tours['homeTour'].start();
        },
    }
};
</script>
  
<style></style>