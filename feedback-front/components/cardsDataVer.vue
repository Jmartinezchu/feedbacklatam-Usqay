<template>
    <div class="row" data-v-step="0">
        <div class="col-xl-3 col-md-6 col-sm-6 mb-xl-0 mb-4">
            <div class="card" style="height: 100px;">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-8">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-uppercase font-weight-bold">NPS General</p>
                                <h3 class="font-weight-bolder" :class="{ 'text-danger': calculoNps < 0 }">
                                    {{ calculoNps }}%
                                </h3>
                            </div>
                        </div>
                        <div class="col-4 text-end">
                            <div class="icon icon-shape bg-gradient-danger shadow-primary text-center"
                                style="cursor: pointer;">
                                <!-- <v-icon style="color: #fff; ">insights</v-icon> -->
                                <v-dialog v-model="dialog" width="500">
                                    <template v-slot:activator="{ on, attrs }">
                                        <button v-bind="attrs" v-on="on">
                                            <v-icon style="color: #fff; ">question_mark</v-icon>
                                        </button>
                                    </template>
                                    <v-card>
                                        <v-card-title class="text-h5 grey lighten-2">
                                            ¿Qué es una buena puntuación de NPS en general?
                                        </v-card-title>

                                        <v-card-text>
                                            La puntuación de NPS por encima de 0 es <strong>BUENA 😉</strong>,<br>
                                            por encima de 20 es <strong>GENIAL 😁</strong> <br>
                                            y por encima de 50 es <strong>INCREIBLE 🍾</strong>. <br>
                                            Por encima de 80 se encuentra el percentil más alto. 🥳👌 <br>
                                            <br>
                                            Si la puntuacion es menor a 0, <strong>ALGO NO ESTA SALIENDO BIEN CON EL
                                                NEGOCIO</strong>
                                            es necesario realizar ajustes en tu compañia, revisa los
                                            <strong>REPORTES</strong> por pregunta.
                                        </v-card-text>

                                        <v-divider></v-divider>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="bg-danger text-white" text @click="dialog = false">
                                                ok
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 col-sm-6 mb-xl-0 mb-4">
            <div class="card" style="height: 100px;">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-8">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-uppercase font-weight-bold">Sucursales</p>
                                <h3 class="font-weight-bolder">
                                    {{ sucursales.length }}
                                </h3>
                                <!-- <p class="mb-0">
                                                <span class="text-success text-sm font-weight-bolder">+2 Activos</span>
                                                <span class="text-danger text-sm font-weight-bolder">-1 Inactivo</span>
                                            </p> -->
                            </div>
                        </div>
                        <div class="col-4 text-end">
                            <div class="icon icon-shape bg-gradient-danger shadow-primary text-center">
                                <v-icon style="color: #fff">other_houses</v-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 col-sm-6 mb-xl-0 mb-4">
            <div class="card" style="height: 100px;">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-8">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-uppercase font-weight-bold">Cupones</p>
                                <h3 class="font-weight-bolder">
                                    {{ allCuponesCompanie }}
                                </h3>
                                <!-- <p class="mb-0">
                                                <span class="text-success text-sm font-weight-bolder">+2 Activos</span>
                                                <span class="text-danger text-sm font-weight-bolder">-1 Inactivo</span>
                                            </p> -->
                            </div>
                        </div>
                        <div class="col-4 text-end">
                            <div class="icon icon-shape bg-gradient-danger shadow-primary text-center">
                                <v-icon style="color: #fff">redeem</v-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 col-sm-6 mb-xl-0 mb-4">
            <div class="card" style="height: 100px;">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-8">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-uppercase font-weight-bold">Registrados</p>
                                <h3 class="font-weight-bolder">
                                    {{ allClienteRegister }}
                                </h3>
                            </div>
                        </div>
                        <div class="col-4 text-end">
                            <div class="icon icon-shape bg-gradient-danger shadow-primary text-center">
                                <v-icon style="color: #fff">library_add</v-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 col-sm-6 mb-xl-0 mb-4">
            <div class="card" style="height: 100px;">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-8">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-uppercase font-weight-bold">Encuestados</p>
                                <h3 class="font-weight-bolder">
                                    {{ allRegisterCompanie }}
                                    <v-icon>group</v-icon>
                                </h3>
                            </div>
                        </div>
                        <div class="col-4 text-end">
                            <div class="icon icon-shape bg-gradient-danger shadow-primary text-center">
                                <v-icon style="color: #fff">playlist_add</v-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 col-sm-6 mb-xl-0 mb-4">
            <div class="card" style="height: 100px;">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-8">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-uppercase font-weight-bold">Encuestas</p>
                                <h3 class="font-weight-bolder">
                                    {{ formularios.length }}
                                </h3>
                                <!-- <p class="mb-0">
                                                <span class="text-success text-sm font-weight-bolder">+2 Activos</span>
                                                <span class="text-danger text-sm font-weight-bolder">-1 Inactivo</span>
                                            </p> -->
                            </div>
                        </div>
                        <div class="col-4 text-end">
                            <div class="icon icon-shape bg-gradient-danger shadow-primary text-center">
                                <v-icon style="color: #fff">format_list_bulleted_add</v-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 col-sm-6 mb-xl-0 mb-4">
            <div class="card" style="height: 100px;">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-8">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-uppercase font-weight-bold">Comentarios</p>
                                <h3 class="font-weight-bolder">
                                    {{ allComentsCompanie }}
                                    <v-icon>comment</v-icon>
                                </h3>
                            </div>
                        </div>
                        <div class="col-4 text-end">
                            <div class="icon icon-shape bg-gradient-danger shadow-primary text-center">
                                <v-icon style="color: #fff">forum</v-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 col-sm-6 mb-xl-0 mb-4">
            <div class="card" style="height: 100px;">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-8">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-uppercase font-weight-bold">QRs</p>
                                <h3 class="font-weight-bolder">
                                    {{ qrs.length }}
                                    <v-icon>qr_code</v-icon>
                                </h3>
                            </div>
                        </div>
                        <div class="col-4 text-end">
                            <div class="icon icon-shape bg-gradient-danger shadow-primary text-center">
                                <v-icon style="color: #fff">qr_code_scanner</v-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 col-sm-6 mb-xl-0 mb-4">
            <div class="card" style="height: 100px;">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-8">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-uppercase font-weight-bold">Personal</p>
                                <h3 class="font-weight-bolder">
                                    {{ personal.length }}
                                    <v-icon>badge</v-icon>
                                </h3>
                            </div>
                        </div>
                        <div class="col-4 text-end">
                            <div class="icon icon-shape bg-gradient-danger shadow-primary text-center">
                                <v-icon style="color: #fff">group_add</v-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 col-sm-6 mb-xl-0 mb-4">
            <div class="card" style="height: 100px;">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-8">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-uppercase font-weight-bold">Multi-Links</p>
                                <h3 class="font-weight-bolder">
                                    {{ personal.length }}
                                    <v-icon>badge</v-icon>
                                </h3>
                            </div>
                        </div>
                        <div class="col-4 text-end">
                            <div class="icon icon-shape bg-gradient-danger shadow-primary text-center">
                                <v-icon style="color: #fff">group_add</v-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 col-sm-6 mb-xl-0 mb-4">
            <div class="card" style="height: 100px;">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-8">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-uppercase font-weight-bold">Ultimo Encuestado</p>
                                <h5 class="font-weight-bolder ">
                                    {{ ultimoEncuestado }}
                                    <!-- <v-icon>badge</v-icon> -->
                                </h5>
                            </div>
                        </div>
                        <div class="col-4 text-end">
                            <div class="icon icon-shape bg-gradient-danger shadow-primary text-center">
                                <v-icon style="color: #fff">group_add</v-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '../api/API_feedback';

export default {
    name: 'FeedbackCardsData',
    props: {
        idCompanie: Number,
    },
    data() {
        return {
            ultimoEncuestado: {},
            user: [],
            sucursales: [],
            formularios: [],
            personal: [],
            qrs: [],
            allCuponesCompanie: 0,
            allComentsCompanie: 0,
            allClienteRegister: 0,
            allRegisterCompanie: 0,
            calculoNps: 0,
            dialog: false,
        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
        await this.getQrs();
        await this.getPersonal();
        await this.getForms();
        await this.getSucursales();
        await this.getComentsAll();
        await this.getRegistersAll();
        await this.getCuponesAll();
        await this.getClientsRegister();
        await this.getNPS();
        await this.getUltimoFrm();
    },

    methods: {
        async getUltimoFrm() {
            let id = this.idCompanie
            const data = await this.$axios.$get(`${Api}/companies/ultimaRespons/` + id).catch(error => {
                console.log('Request canceled', error)
            })


            if (data.length != 0) {
                this.ultimoEncuestado = data[0].iniOperaciones;
            } else {
                this.ultimoEncuestado = 'no hay datos'
            }
        },
        async getQrs() {
            let id = this.idCompanie
            const data = await this.$axios.$get(`${Api}/generateQr/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.qrs = data;
            // console.log(data);
        },
        async getPersonal() {
            const data = await this.$axios.$get(`${Api}/personal/` + this.idCompanie).catch(error => {
                console.log('Request canceled', error)
            })
            this.personal = data;
            // console.log(data);
        },
        async getForms() {
            let id = this.idCompanie
            const data = await this.$axios.$get(`${Api}/formularios/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.formularios = data;
            // console.log(data);
        },
        async getSucursales() {
            let id = this.idCompanie
            const data = await this.$axios.$get(`${Api}/branchoffices/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.sucursales = data;
            // if (data.length != 0) {
            //     this.getCupones(data[0].id)
            // }
        },
        async getComentsAll() {
            let id = this.idCompanie;
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
            let id = this.idCompanie;
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
            let id = this.idCompanie;
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
            let id = this.idCompanie;
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
        async getNPS() {
            let idCompanie = this.idCompanie
            let red = 0;
            let yellow = 0;
            let green = 0;

            const countval1 = await this.$axios.$get(`${Api}/reportes_form/numbers/${idCompanie}/1`).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(countval1);
            if (countval1.length != 0) {
                red = countval1[0].total;
            } else {
                red = 0;
            }
            const countval2 = await this.$axios.$get(`${Api}/reportes_form/numbers/${idCompanie}/2`).catch(error => {
                console.log('Request canceled', error)
            })
            if (countval2.length != 0) {
                yellow = countval2[0].total;
            } else {
                yellow = 0;
            }
            const countval3 = await this.$axios.$get(`${Api}/reportes_form/numbers/${idCompanie}/3`).catch(error => {
                console.log('Request canceled', error)
            })
            if (countval3.length != 0) {
                green = countval3[0].total;
            } else {
                green = 0;
            }

            red = (red / this.allRegisterCompanie) * 100
            yellow = (yellow / this.allRegisterCompanie) * 100
            green = (green / this.allRegisterCompanie) * 100

            red.toFixed(2);
            yellow.toFixed(2);
            green.toFixed(2);
            // this.red = red
            // this.yellow = yellow
            // this.green = green
            let calcNPS = green - red
            // console.log(calcNPS);
            // console.log(red.toFixed(2), yellow.toFixed(2), green.toFixed(2), this.allRegisterCompanie, `${red + yellow + green}`);

            // this.calculoNps = 0
            this.calculoNps = calcNPS.toFixed(2)
            if (this.calculoNps === 'NaN') {
                this.calculoNps = ''
            }
            // this.verchartBarra(count1, count2, count3, count4, count5)

        },
    },
};
</script>

<style lang="scss" scoped></style>
