<template>
    <div class="container-fluid">
        <div class="flex " style="align-items:center ">
            <div class="col-2 flex">
                <nuxt-link :to="`/${companie.name}/comentarios`">
                    <div style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <v-btn icon>
                            <v-icon>arrow_back_ios_new</v-icon>
                        </v-btn>
                        <strong class="text-dark pr-2">
                            <h5>Regresar </h5>
                        </strong>
                    </div>
                </nuxt-link>
            </div>
            <div class="flex">
                <h5>Comentarios de {{ typeComents }} </h5>
                <span style="opacity: 0;">0</span>
                <v-row>
                    <v-btn-toggle v-model="typelist" rounded>
                        <v-btn>
                            <v-icon>view_agenda</v-icon> Cards
                        </v-btn>
                        <v-btn>
                            <v-icon>format_list_bulleted</v-icon>List
                        </v-btn>
                    </v-btn-toggle>
                </v-row>
            </div>
        </div>
        <!-- info encuensta -->
        <div v-if="typelist === 0" class="animate__animated animate__fadeInRight row">
            <div class="col-md-12 mt-4" v-for="coment in comentarios" :key="coment.id">
                <div class="card" data-v-step="2">
                    <div class="card-header py-2" :class="colorText" style="text-align:center">
                        <div class="d-flex justify-content-between  flex-wrap">
                            <h6 class="mb-0 text-white">
                                <v-icon class="text-white">account_circle</v-icon> {{ coment.nombre }}
                            </h6>
                            <h6 class="mb-0 opacity-0"></h6>
                            <h6 class="mb-0 text-white">{{ coment.fecha_up }}</h6>
                        </div>

                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <!-- todas la sub categorias -->
                            <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                                <div class="d-flex flex-column text-center">
                                    <!-- <h5 class="text-sm">Zuh Roll</h5> -->
                                    <!-- <h5 class="text-sm">Angamos N-122</h5> -->
                                    <span class="mb-2 text-xs">
                                        <span class="text-dark font-weight-bold ms-sm-2">{{ coment.comentario }} </span>
                                    </span>
                                </div>
                            </li>
                        </ul>
                        <div class="d-flex justify-content-center flex-wrap">
                            <h5 class="mb-0" style="font-size: 11px;">{{ coment.email }} - {{ coment.celular }}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="comentarios.length === 0">
                <div class="col-md-12 mt-4">
                    <div class="card" data-v-step="2">
                        <div class="card-body p-3">
                            <h6><v-icon>warning</v-icon> Por ahora no tienes ningun comentario de {{ typeComents }} :(</h6>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div v-if="typelist === 1" class="animate__animated animate__fadeInRight row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="flex" style="justify-content: space-between;">
                        <div class="card-header pb-0 flex ">
                            <h6>Comentarios {{ typeComents }}</h6>
                        </div>
                        <div class="mr-2">
                            <v-text-field v-model="search" append-icon="search" label="Search" single-line
                                hide-details></v-text-field>
                        </div>

                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <v-data-table :headers="headers" :items="comentarios" :search="search" :items-per-page="5"
                                class="elevation-1">
                                <template v-slot:items="props">
                                    <td><v-icon>mark_unread_chat_alt</v-icon></td>
                                    <td>{{ props.item.fecha_up }}</td>
                                    <td>{{ props.item.nombre }}</td>
                                    <td>{{ props.item.celular }}</td>
                                    <td>{{ props.item.email }}</td>
                                    <td>{{ props.item.comentario }}</td>
                                    <td><button @click="mensajeWts(props.item.celular, props.item.nombre)"><svg
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263">
                                                </path>
                                            </svg></button></td>
                                </template>
                                <template v-slot:no-data>
                                    <v-alert :value="true" color="errorl" style="color:#000" icon="warning">
                                        Por ahora no tienes ningun comentario de {{ typeComents }} :(
                                    </v-alert>
                                </template>
                            </v-data-table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '../../../../api/API_feedback'

export default {
    name: 'FeedbackAppSlug',

    data() {
        return {
            companie: {},
            typelist: 1,
            user: [],
            toggle_exclusive: null,
            idSucursal: null,
            typeComents: null,
            search: '',
            headers: [
                {
                    text: '',
                    align: 'start',
                    sortable: false,
                    value: 'icon',
                },
                { sortable: false, text: 'Fecha Ingreso', value: 'fecha' },
                {
                    text: 'Nombre',
                    // align: 'start',
                    sortable: false,
                    value: 'nombre',
                },
                { sortable: false, text: 'Telefono', value: 'celular' },
                { sortable: false, text: 'Email', value: 'email' },
                { sortable: false, text: 'Comentario', value: 'comentario' },
                { sortable: false, text: 'Opciones', value: 'difusion' },
            ],
            comentarios: [],
            datacompanie: {},
            ruta: this.$route.params
        }
    },
    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"))
        this.companie = JSON.parse(localStorage.getItem("companie"))
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))

        this.typeComents = this.$route.params.slug
        this.idSucursal = this.$route.params.idSucursal
        // await this.getListComent(this.idSucursal, this.typeComents)

        await this.getDataComentarios(this.datacompanie.lists.sucursales)
        // console.log(this.idSucursal, this.typeComents);
    },
    methods: {
        async getDataComentarios(sucursales) {
            // console.log();
            const lengthSucus = sucursales.length
            for (let index = 0; index < lengthSucus; index++) {
                if (sucursales[index].id == this.ruta.idSucursal) {
                    for (let i = 0; i < sucursales[index].valgrafic[0].length; i++) {
                        if (sucursales[index].valgrafic[0][i].valor === this.ruta.slug) {
                            // console.log(sucursales[index].valgrafic[0][i].list);
                            this.comentarios = sucursales[index].valgrafic[0][i].list
                        }
                    }
                }
            }
        },
        mensajeWts(cel, nombre) {

            // console.log(`mensaje a ${cel}`);
            window.open(`https://api.whatsapp.com/send?phone=51${cel}&text=Hola%20${nombre}!%20Muchas%20gracias%20por%20brindarnos%20tu%20${this.typeComents}!`, "_blank");
        },
        async getListComent(idSucu, valTypeComent) {
            const data = await this.$axios.$get(`${Api}/comentarios/list/${idSucu}/${valTypeComent}`).catch(error => {
                console.log('Request canceled', error)
            })
            this.comentarios = data;
        },
    },

    created() {
        // this.typeComents = this.$route.params.slug
        // console.log(this.typeComents);
        // console.log(this.$route);

    },

    computed: {
        colorText: function () {
            let postcolor = "";
            let text = this.typeComents;
            if (text == "Felicitaciones") {
                postcolor = `bg-gradient-success`;//verde
            } else if (text == "Sugerencias") {
                postcolor = `bg-gradient-sugerencia`;//amarillo
            } else if (text == "Reclamos") {
                postcolor = `bg-gradient-danger`;//rojo
            }
            return postcolor;
        }
    }
}
</script>
<style>
.bg-gradient-sugerencia {
    background-image: linear-gradient(310deg, #bec12e 0%, #c5d93a 100%);
}
</style>