<template>
    <div>
        <div class="flex" style="align-items:center ">
            <div class="mx-2">
                <h5>Registrados</h5>
            </div>
        </div>
        <!-- tabla de registrados -->
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="flex" style="justify-content: space-between;">
                        <div class="card-header pb-0 flex ">
                            <h6>Clientes registrados</h6>
                        </div>
                        <div class="mr-2">
                            <v-text-field v-model="search" append-icon="search" label="Search" single-line
                                hide-details></v-text-field>
                        </div>

                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <v-data-table :headers="headers" :items="clientes" :search="search" :items-per-page="5"
                                class="elevation-1">
                                <template v-slot:items="props">
                                    <td><v-icon>how_to_reg</v-icon></td>

                                    <td>{{ props.item.nombre }}</td>
                                    <td>{{ props.item.email }}</td>
                                    <td>{{ props.item.celular }}</td>
                                    <td>{{ props.item.fechaNacimiento }}</td>
                                    <td>{{ props.item.create_up }}</td>
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
                                        No tienes ningun cliente registrado con tu compañia :(
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
import Api from '../../../api/API_feedback';

export default {
    name: 'FeedbackAppIndex',

    data() {
        return {
            user: {},
            search: '',
            headers: [
                {
                    text: '',
                    align: 'start',
                    sortable: false,
                    value: 'icon',
                },
                {
                    text: 'Nombre',
                    value: 'nombre',
                    sortable: false,
                },
                { sortable: false, text: 'Email', value: 'emial' },
                { sortable: false, text: 'Telefono', value: 'celular' },
                { sortable: false, text: 'Cumpleaños', value: 'cumpleaños' },
                { sortable: false, text: 'Registrado', value: 'registrado' },
                { sortable: false, text: 'Opciones', value: 'difusion' },
            ],
            clientes: [],
            datacompanie: {}
        }
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        this.clientes = this.datacompanie.lists.clientes_registrados
        // await this.getListRegisterCompanie()
    },

    methods: {
        async getListRegisterCompanie() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/clientes/list/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            this.clientes = data;
            console.log(this.clientes);
        },
        mensajeWts(cel, nombre) {
            // console.log(`mensaje a ${cel}`);
            window.open(`https://api.whatsapp.com/send?phone=51${cel}&text=Hola%20${nombre}!%20Muchas%20gracias%20por%20visitarnos!`, "_blank");
        },
    },
};
</script>

<style lang="scss" scoped></style>
