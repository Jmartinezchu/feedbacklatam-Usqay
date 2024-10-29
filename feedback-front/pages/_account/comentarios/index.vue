<template>
    <div>
        <div class="flex" style="align-items:center ">
            <div>
                <h5>Comentarios recibidos</h5>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mt-4">
                <div class="card mb-4">
                    <div class="card-header pb-0 px-3">
                        <div class="row">
                            <div class="col-md-12">
                                <h6 class="mb-0">Todos los comentarios graficamente</h6>
                                <h6 class="text-uppercase text-body text-xs font-weight-bolder">Todos</h6>
                            </div>
                        </div>
                    </div>
                    <div class="px-2">
                        <div class="row">
                            <div class="col-md-6 mt-4">
                                <div class="card h-100 mb-4">
                                    <chartsBarra></chartsBarra>
                                </div>
                            </div>
                            <div class="col-md-6 mt-4">
                                <div class="card h-100 mb-4">
                                    <chartsCircle></chartsCircle>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="flex" style="justify-content: space-between;">
                        <div class="card-header pb-0 flex ">
                            <h6>Mis sucursales</h6>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <!-- {{ panel }} -->
                            <div justify="center" v-if="sucursales.length != 0">
                                <v-expansion-panel v-model="panel" focusable>
                                    <v-expansion-panel-content v-for="sucu in sucursales" :key="sucu.id">
                                        <div @click.prevent="getValoresBarraSi(sucu.valgrafic[0])" class="col-md-12  my-2"
                                            slot="header">
                                            <h6>Cometarios de
                                                la Sucursal- {{ sucu.name }}</h6>
                                        </div>
                                        <v-card>
                                            <div class="row" v-if="showgrafico != false">
                                                <div class="col-md-6">
                                                    <div class="card-body p-3">
                                                        <div class="row text-center">
                                                            <div class="col-md-12 mt-4">
                                                                <div class="card  bg-success">
                                                                    <div class="card-body p-3  ">
                                                                        <nuxt-link
                                                                            :to="`comentarios/${sucu.id}/Felicitaciones`">
                                                                            <div class="d-flex flex-column text-center">
                                                                                <h5 class="text-white">
                                                                                    Ver Felicitaciones</h5>
                                                                            </div>
                                                                        </nuxt-link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-12 mt-4">
                                                                <div class="card" style="background-color: #d2d13c ;">
                                                                    <div class="card-body p-3  ">
                                                                        <nuxt-link
                                                                            :to="`comentarios/${sucu.id}/Sugerencias`">
                                                                            <div class="d-flex flex-column text-center">
                                                                                <h5 class="text-white">
                                                                                    Ver Sugerencias</h5>
                                                                            </div>
                                                                        </nuxt-link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-12 mt-4">
                                                                <div class="card" style="background-color: var(--red1)">
                                                                    <div class="card-body p-3  ">
                                                                        <nuxt-link :to="`comentarios/${sucu.id}/Reclamos`">
                                                                            <div class="d-flex flex-column text-center">
                                                                                <h5 class="text-white">
                                                                                    Ver Reclamos</h5>
                                                                            </div>
                                                                        </nuxt-link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="card pb-0 px-3"
                                                        style="display:flex; justify-content:center">
                                                        <bar-chart :chart-options='chartOptionsBarra'
                                                            :chart-data='chartBarra' />
                                                    </div>
                                                </div>

                                            </div>
                                            <div v-else class="row">
                                                <div class="container_msj">
                                                    <h1 class="title"><v-icon>warning</v-icon>No tienes comentarios en esta
                                                        sucursal</h1>
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
        <hr class="horizontal dark">

    </div>
</template>

<script>
import Api from '../../../api/API_feedback';

export default {
    name: 'FeedbackAppIndex',

    data() {
        return {
            panel: 0,
            user: [],
            sucursales: [],
            typeComents: "",
            chartBarra: {
            },
            chartOptionsBarra: {
                responsive: true,
                maintainAspectRatio: false
            },
            showgrafico: false,
            datacompanie: {},
        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"))
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        this.sucursales = this.datacompanie.lists.sucursales
        // await this.getSucursales()
        this.getValoresBarraSi(this.sucursales[0].valgrafic[0])
    },

    methods: {
        async getSucursales() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/branchoffices/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.sucursales = await data;
            if (data.length != 0) {
                await this.getValoresBarra(data[0].id)
            }
        },
        getValoresBarraSi(valores) {
            if (valores[0].count || valores[1].count || valores[2].count != 0) {
                this.showgrafico = true
                this.verchartBarra(valores[0].count, valores[1].count, valores[2].count)

            } else {
                this.showgrafico = false
            }

        },
        async getValoresBarra(id) {
            let countFeli = 0;
            let countSuge = 0;
            let countRecla = 0;
            // let id = this.user.idCompanie;

            const countval1 = await this.$axios.$get(`${Api}/comentarios/countTypeSucu/${id}/Felicitaciones`).catch(error => {
                console.log('Request canceled', error)
            })
            // this.allComentsCompanie = data[0].total;
            if (countval1.length != 0) {
                countFeli = await countval1[0].total;
            } else {
                countFeli = 0;
            }
            const countval2 = await this.$axios.$get(`${Api}/comentarios/countTypeSucu/${id}/Sugerencias`).catch(error => {
                console.log('Request canceled', error)
            })
            // this.allComentsCompanie = data[0].total;
            if (countval2.length != 0) {
                countSuge = await countval2[0].total;
            } else {
                countSuge = 0;
            }
            const countval3 = await this.$axios.$get(`${Api}/comentarios/countTypeSucu/${id}/Reclamos`).catch(error => {
                console.log('Request canceled', error)
            })
            // this.allComentsCompanie = data[0].total;
            if (countval3.length != 0) {
                countRecla = await countval3[0].total;
            } else {
                countRecla = 0;
            }
            if (countFeli != 0 || countSuge != 0 || countRecla != 0) {
                this.showgrafico = true
                await this.verchartBarra(countFeli, countSuge, countRecla)

            } else {
                this.showgrafico = false
            }
            // await this.verchartBarra(countFeli, countSuge, countRecla)

        },
        async verchartBarra(countFeli, countSuge, countRecla) {

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
        }
    },
};
</script>

<style scoped>
.container_msj {
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: vh; */
    background-color: #e3e3e3;
}

.title {
    font-family: 'Arial', sans-serif;
    font-size: 4rem;
    color: #060606;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

@media screen and (max-width:600px) {
    .contencardsComent {
        flex-direction: column;
    }
}

.Blurred {
    display: none !important;
}

.ddd {
    color: #c4d735
}
</style>