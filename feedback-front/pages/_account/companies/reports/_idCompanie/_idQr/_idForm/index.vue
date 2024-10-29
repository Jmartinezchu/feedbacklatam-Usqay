<template>
    <div class="container-fluid">
        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/${companie.name}/companies/reports/${route.idCompanie}`">
                    <div data-v-step="2"
                        style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <!-- <h6>Crear</h6> -->
                        <v-btn icon>
                            <v-icon>arrow_back_ios_new</v-icon>
                        </v-btn>
                        <strong class="text-dark pr-2">
                            <h5>Regresar -</h5>
                        </strong>
                    </div>
                </nuxt-link>
                <div class="mt-2">
                    <h5>Reportes de {{ qrData.nameForm }}/{{ qrData.nameSucursal }}</h5>
                </div>
            </div>
        </div>
        <div class="row" data-v-step="0">
            <div class="col-xl-6 col-md-6 col-sm-6 mb-xl-0 mb-4">
                <div class="card" style="height: 100px;">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-sm mb-0 text-uppercase font-weight-bold">NPS</p>
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
            <div class="col-xl-6 col-md-6 col-sm-6 mb-xl-0 mb-4">
                <div class="card" style="height: 100px;">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-sm mb-0 text-uppercase font-weight-bold">CSAT de {{ qrData.nameForm }}
                                    </p>
                                    <h3 class="font-weight-bolder" :class="{ 'text-danger': datacountCsatFomr < 0 }">
                                        {{ datacountCsatFomr }}%
                                    </h3>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="icon icon-shape bg-gradient-danger shadow-primary text-center"
                                    style="cursor: pointer;">
                                    <!-- <v-icon style="color: #fff; ">insights</v-icon> -->
                                    <v-dialog v-model="dialogCsat" width="500">
                                        <template v-slot:activator="{ on, attrs }">
                                            <button v-bind="attrs" v-on="on">
                                                <v-icon style="color: #fff; ">question_mark</v-icon>
                                            </button>
                                        </template>
                                        <v-card>
                                            <v-card-title class="text-h5 grey lighten-2">
                                                ¿Qué es CSAT?
                                            </v-card-title>

                                            <v-card-text>
                                                El acrónimo CSAT significa <i>Customer Satisfaction Score</i> en español
                                                puntuación de satisfacción del cliente. También se lo conoce como
                                                <strong style="text-transform: uppercase;">índice de satisfacción del
                                                    cliente</strong>. <br>

                                                <span>Con Feedback utilizamos las siguientes opciones</span>
                                                <ul>
                                                    <li>Muy satisfecho = 5</li>
                                                    <li>Satisfecho = 4</li>
                                                    <li>Puede mejorar = 3</li>
                                                    <li>Insatisfecho = 2</li>
                                                    <li>Muy insatisfecho = 1</li>
                                                </ul>
                                                <!-- <br> -->
                                                Para calcular el CSAT <strong>Feedback</strong> suma la cantidad de clientes
                                                que respondieron 4 y 5, es decir, <strong>satisfechos</strong> y <strong>muy
                                                    satisfechos</strong> y luego divide por la cantidad total de encuestados
                                                convirtiéndolo a porcentaje.
                                            </v-card-text>

                                            <v-divider></v-divider>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="bg-danger text-white" text @click="dialogCsat = false">
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
            <div class="col-xl-6 col-md-6 col-sm-6 mb-xl-0 mb-4">
                <div class="card" style="height: 100px;">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-sm mb-0 text-uppercase font-weight-bold">Total Enuestados</p>
                                    <h3 class="font-weight-bolder">
                                        {{ allRegistersForm }}
                                    </h3>
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
            <div class="col-xl-6 col-md-6 col-sm-6 mb-xl-0 mb-4">
                <div class="card" style="height: 100px;">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-sm mb-0 text-uppercase font-weight-bold">Preguntas Habilitadas</p>
                                    <h3 class="font-weight-bolder">
                                        {{ questions.length + questionsDf.length }}
                                    </h3>
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

            <!-- <pre>{{ qrData }}</pre> -->
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="flex" style="justify-content: space-between;">
                        <div class="card-header pb-0 flex ">
                            <h6>Mis Preguntas</h6>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <div justify="center" v-if="questions.length != 0">
                                <v-expansion-panel focusable>
                                    <v-expansion-panel-content v-for="qst in questions" :key="qst.id"
                                        v-if="qst.tipo === 'simple'">
                                        <div class="col-md-12 my-2" slot="header" @click="getValoresBarraSimple(qst.id)">
                                            <h6 class=""><span>Simple: </span>{{ qst.question }}</h6>
                                        </div>
                                        <v-card>
                                            <div class="row flex" style="justify-content: center;">
                                                <div class="col-xl-7 col-md-6 col-xs-12 flex"
                                                    style="flex-direction:column; justify-content: center;">
                                                    <div class="card bg-successv mx-5 my-2"
                                                        style="height: 45px;background-color:rgb(203 203 203)">
                                                        <div class="card-body p-3  ">
                                                            <div class="d-flex flex-column text-center">
                                                                <h5 class="text-dark">
                                                                    CSAT 🎉 = {{ datacountCsat }}%
                                                                </h5>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card bg-successv mx-5 my-2"
                                                        style="height: 45px;background-color:#2adf5e">
                                                        <div class="card-body p-3  ">
                                                            <div class="d-flex flex-column text-center">
                                                                <h5 class="text-dark">
                                                                    Muy Satisfecho 😉 = {{ datacount5 }}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card mx-5 my-2"
                                                        style="height: 45px;background-color:#3aad5bbf">
                                                        <div class="card-body p-3  ">
                                                            <div class="d-flex flex-column text-center">
                                                                <h5 class="text-dark">
                                                                    Satisfecho 🙂 = {{ datacount4 }}</h5>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="card mx-5 my-2"
                                                        style="height: 45px;background-color:#f1e848">
                                                        <div class="card-body p-3  ">
                                                            <div class="d-flex flex-column text-center">
                                                                <h5 class="text-dark">
                                                                    Puede mejorar 🙄 = {{ datacount3 }}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card mx-5 my-2"
                                                        style="height: 45px; background-color:#f7a51b">
                                                        <div class="card-body p-3  ">
                                                            <div class="d-flex flex-column text-center">
                                                                <h5 class="text-dark">
                                                                    Insatisfecho 🥱 = {{ datacount2 }}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card bg-danger mx-5 my-2" style="height: 45px;">
                                                        <div class="card-body p-3  ">
                                                            <div class="d-flex flex-column text-center">
                                                                <h5 class="text-dark">
                                                                    Muy insatisfecho 😒 = {{ datacount1 }}</h5>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="col-xl-5 col-md-6 ">
                                                    <div class="card pb-0 px-3"
                                                        style="display:flex; justify-content:center">
                                                        <bar-chart :chart-options='chartOptionsBarra'
                                                            :chart-data='chartBarra' />
                                                    </div>
                                                </div>

                                            </div>
                                        </v-card>
                                    </v-expansion-panel-content>
                                    <v-expansion-panel-content v-for="qst in questions" :key="qst.id"
                                        v-if="qst.tipo === 'multiple'">
                                        <div class="col-md-12 my-2" slot="header">
                                            <h6 class=""><span>Multiple: </span>{{ qst.question }}</h6>
                                        </div>
                                        <v-card>
                                            <v-expansion-panel focusable>
                                                <v-expansion-panel-content v-for="mult in qst.sub_titulos" :key="mult.id">
                                                    <div class="col-md-12 my-2" slot="header"
                                                        @click="getValoresBarraMultiple(mult.id_question, mult.id)">
                                                        <h6 class=""><span>Item: </span>{{ mult.titulo }}</h6>
                                                    </div>
                                                    <v-card>
                                                        <div class="row flex" style="justify-content: center;">
                                                            <div class="col-xl-7 col-md-6 col-xs-12 flex"
                                                                style="flex-direction:column; justify-content: center;">
                                                                <div class="card bg-successv mx-5 my-2"
                                                                    style="height: 45px;background-color:rgb(203 203 203)">
                                                                    <div class="card-body p-3  ">
                                                                        <div class="d-flex flex-column text-center">
                                                                            <h5 class="text-dark">
                                                                                CSAT 🎉 = {{ datacountCsat }}%
                                                                            </h5>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card bg-successv mx-5 my-2"
                                                                    style="height: 45px;background-color:#2adf5e">
                                                                    <div class="card-body p-3  ">
                                                                        <div class="d-flex flex-column text-center">
                                                                            <h5 class="text-dark">
                                                                                Muy Satisfecho 😉 ={{ datacount5 }} </h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card mx-5 my-2"
                                                                    style="height: 45px;background-color:#3aad5bbf">
                                                                    <div class="card-body p-3  ">
                                                                        <div class="d-flex flex-column text-center">
                                                                            <h5 class="text-dark">
                                                                                Satisfecho 🙂 ={{ datacount4 }} </h5>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div class="card mx-5 my-2"
                                                                    style="height: 45px;background-color:#f1e848">
                                                                    <div class="card-body p-3  ">
                                                                        <div class="d-flex flex-column text-center">
                                                                            <h5 class="text-dark">
                                                                                Puede mejorar 🙄 ={{ datacount3 }} </h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card mx-5 my-2"
                                                                    style="height: 45px; background-color:#f7a51b">
                                                                    <div class="card-body p-3  ">
                                                                        <div class="d-flex flex-column text-center">
                                                                            <h5 class="text-dark">
                                                                                Insatisfecho 🥱 ={{ datacount2 }}</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card bg-danger mx-5 my-2" style="height: 45px;">
                                                                    <div class="card-body p-3  ">
                                                                        <div class="d-flex flex-column text-center">
                                                                            <h5 class="text-dark">
                                                                                Muy insatisfecho 😒 ={{ datacount1 }} </h5>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div class="col-xl-5 col-md-6 ">
                                                                <div class="card pb-0 px-3"
                                                                    style="display:flex; justify-content:center">
                                                                    <bar-chart :chart-options='chartOptionsBarra'
                                                                        :chart-data='chartBarra' />
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </v-card>
                                                </v-expansion-panel-content>

                                            </v-expansion-panel>
                                        </v-card>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </div>
                            <div justify="center" v-else>
                                <v-expansion-panel focusable>
                                    <div><v-icon>warning</v-icon>No tienes ninguna Pregunta registrada :(</div>
                                </v-expansion-panel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <pre>creadas: {{ questions }}</pre> -->
            <!-- <pre>default: {{ questionsDf }}</pre> -->
            <!-- <pre>{{ allRegistersForm }}</pre> -->
        </div>
    </div>
</template>

<script>
import Api from '../../../../../../../api/API_feedback';



export default {
    name: 'FeedbackIndex',

    data() {
        return {
            companie: {},
            panel: 0,
            user: [],
            qrData: {},
            route: {},
            typeComents: "",
            chartBarra: {},
            chartOptionsBarra: {
                responsive: true,
            },
            datacount1: 0,
            datacount2: 0,
            datacount3: 0,
            datacount4: 0,
            datacount5: 0,
            datacountCsat: 0,
            dialog: false,
            dialogCsat: false,
            idForm: null,
            questions: [],
            questionsDf: [],
            options: null,
            allRegistersForm: 0,
            calculoNps: 0,
            datacountCsatFomr: 0,
        };
    },

    async mounted() {
        // console.log(this.$route);

        this.user = JSON.parse(localStorage.getItem("user"))
        this.companie = JSON.parse(localStorage.getItem("companie"))
        this.route = this.$route.params
        this.idForm = this.$route.params.idForm;
        // await this.getDataCompanie();
        await this.getDataqr();
        await this.getAllRegistersForm();

        await this.getOptions();
        // this.getValoresBarra()
        await this.verdata();
        await this.getCsatform();

    },

    methods: {
        async getCsatform() {
            let id_companie = this.$route.params.idCompanie
            let id_form = this.$route.params.idForm

            let countval1S = 0; let countval2S = 0; let countval3S = 0; let countval4S = 0; let countval5S = 0;
            let countval1M = 0; let countval2M = 0; let countval3M = 0; let countval4M = 0; let countval5M = 0;
            const val1S = await this.$axios.$get(`${Api}/calculocsat/simple/${id_form}/${id_companie}/1`).catch(error => {
                console.log('Request canceled', error)
            })
            // if (val4S.length != 0) {
            countval1S = val1S[0].total;
            const val2S = await this.$axios.$get(`${Api}/calculocsat/simple/${id_form}/${id_companie}/2`).catch(error => {
                console.log('Request canceled', error)
            })
            // if (val4S.length != 0) {
            countval2S = val2S[0].total;
            const val3S = await this.$axios.$get(`${Api}/calculocsat/simple/${id_form}/${id_companie}/3`).catch(error => {
                console.log('Request canceled', error)
            })
            // if (val4S.length != 0) {
            countval3S = val3S[0].total;
            const val4S = await this.$axios.$get(`${Api}/calculocsat/simple/${id_form}/${id_companie}/4`).catch(error => {
                console.log('Request canceled', error)
            })
            // if (val4S.length != 0) {
            countval4S = val4S[0].total;
            // } else {
            //     countval4S = 0;
            // }
            const val5S = await this.$axios.$get(`${Api}/calculocsat/simple/${id_form}/${id_companie}/5`).catch(error => {
                console.log('Request canceled', error)
            })
            // if (val5S.length != 0) {
            countval5S = val5S[0].total;
            // } else {
            //     countval5S = 0;
            // }
            const val1M = await this.$axios.$get(`${Api}/calculocsat/multiple/${id_form}/${id_companie}/1`).catch(error => {
                console.log('Request canceled', error)
            })
            // if (val4M.length != 0) {
            countval1M = val1M[0].total;
            const val2M = await this.$axios.$get(`${Api}/calculocsat/multiple/${id_form}/${id_companie}/2`).catch(error => {
                console.log('Request canceled', error)
            })
            // if (val4M.length != 0) {
            countval2M = val2M[0].total;
            const val3M = await this.$axios.$get(`${Api}/calculocsat/multiple/${id_form}/${id_companie}/3`).catch(error => {
                console.log('Request canceled', error)
            })
            // if (val4M.length != 0) {
            countval3M = val3M[0].total;
            const val4M = await this.$axios.$get(`${Api}/calculocsat/multiple/${id_form}/${id_companie}/4`).catch(error => {
                console.log('Request canceled', error)
            })
            // if (val4M.length != 0) {
            countval4M = val4M[0].total;
            // } else {
            //     countval4M = 0;
            // }
            const val5M = await this.$axios.$get(`${Api}/calculocsat/multiple/${id_form}/${id_companie}/5`).catch(error => {
                console.log('Request canceled', error)
            })
            // if (val5M.length != 0) {
            countval5M = val5M[0].total;
            // } else {
            //     countval5M = 0;
            // }

            let valor4 = countval4S + countval4M
            let valor5 = countval5S + countval5M
            let totalrespons = valor4 + valor5 + countval1S + countval1M + countval2S + countval2M + countval3S + countval3M
            let calcCsat = ((valor4 + valor5) / totalrespons) * 100
            // let calcCsat = ((valor4 + valor5) / this.allRegistersForm)
            // let calcCsat = ((valor4 + valor5) / this.allRegistersForm) * 100



            this.datacountCsatFomr = calcCsat.toFixed(2)
            if (this.datacountCsatFomr === 'NaN') {
                this.datacountCsatFomr = ''
            }
            // console.log(valor4, valor5, this.allRegistersForm,);
        },
        // async getDataCompanie() {
        //     let id = this.$route.params.idCompanie
        //     const data = await this.$axios.$get(`${Api}/companies/` + id).catch(error => {
        //         console.log('Request canceled', error)
        //     })
        //     this.companie = data[0]
        //     // console.log(data[0]);
        // },
        async getDataqr() {
            let id = this.route.idQr;
            const data = await this.$axios.$get(`${Api}/generateQr/one/` + id).catch(error => {
                console.log('Request canceled', error)
            });
            this.qrData = data[0];
            this.idForm = data[0].id_form;
            // console.log(this.qrData);
            // localStorage.setItem("companie", JSON.stringify(data[0]));

        },
        async getOptions() {
            const data = await this.$axios.$get(`${Api}/question/options`).catch(error => {
                console.log('Request canceled', error)
            });
            this.options = data;
            // console.log(this.options);
        },
        async verdata() {
            // console.log(this.idForm);
            const data = await this.$axios.$get(`${Api}/question/${this.idForm}`).catch(error => {
                console.log('Request canceled', error)
            });
            // this.questions = data;
            // let qsts = this.questions;
            let qsts = data
            for (let index = 0; index < qsts.length; index++) {
                if (qsts[index].tipo === 'simple') {
                    this.questions.push(qsts[index])
                    // qsts[index].options = this.options
                } else if (qsts[index].tipo === 'multiple') {
                    this.questions.push(qsts[index])
                    await this.getSubquestions(qsts[index])
                } else {
                    this.questionsDf.push(qsts[index])
                }

            }
            await this.questionDef(this.questionsDf);
            // console.log(qsts);
            // if (data.length != 0) {
            //     // this.getValoresBarra(qsts[0].id);
            //     // this.getValoresBarraSimple()
            // }
        },
        async getSubquestions(qst) {
            let id = qst.id
            const data = await this.$axios.$get(`${Api}/questionSub/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            qst.sub_titulos = data;
            for (let index = 0; index < qst.sub_titulos.length; index++) {
                qst.sub_titulos[index].options = this.options
            }
            // console.log(data);
        },
        async getValoresBarraSimple(id_question) {
            let id_qr = this.$route.params.idQr
            let id_form = this.$route.params.idForm
            let count1 = 0;
            let count2 = 0;
            let count3 = 0;
            let count4 = 0;
            let count5 = 0;

            const countval1 = await this.$axios.$get(`${Api}/reportes_form/${id_qr}/${id_form}/${id_question}/1`).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(countval1);
            // if (countval1.length != 0) {
            count1 = await countval1[0].total;
            // } else {
            //     count1 = 0;
            // }
            const countval2 = await this.$axios.$get(`${Api}/reportes_form/${id_qr}/${id_form}/${id_question}/2`).catch(error => {
                console.log('Request canceled', error)
            })
            // if (countval2.length != 0) {
            count2 = await countval2[0].total;
            // } else {
            //     count2 = 0;
            // }
            const countval3 = await this.$axios.$get(`${Api}/reportes_form/${id_qr}/${id_form}/${id_question}/3`).catch(error => {
                console.log('Request canceled', error)
            })
            // if (countval3.length != 0) {
            count3 = await countval3[0].total;
            // } else {
            //     count3 = 0;
            // }
            const countval4 = await this.$axios.$get(`${Api}/reportes_form/${id_qr}/${id_form}/${id_question}/4`).catch(error => {
                console.log('Request canceled', error)
            })
            // if (countval4.length != 0) {
            count4 = await countval4[0].total;
            // } else {
            //     count4 = 0;
            // }
            const countval5 = await this.$axios.$get(`${Api}/reportes_form/${id_qr}/${id_form}/${id_question}/5`).catch(error => {
                console.log('Request canceled', error)
            })
            // if (countval5.length != 0) {
            count5 = await countval5[0].total;
            // } else {
            //     count5 = 0;
            // }
            let calcCsat = ((count4 + count5) / (count1 + count2 + count3 + count4 + count5)) * 100
            this.datacountCsat = calcCsat.toFixed(2)
            if (this.datacountCsat === 'NaN') {
                this.datacountCsat = ''
            }
            this.datacount1 = count1
            this.datacount2 = count2
            this.datacount3 = count3
            this.datacount4 = count4
            this.datacount5 = count5
            // console.log(count1, count2, count3, count4, count5, 'simple');
            this.verchartBarra(count1, count2, count3, count4, count5)
            // console.log(this.datacountCsat, 'simple');

        },
        async getValoresBarraMultiple(id_question, id_item) {
            let id_qr = this.$route.params.idQr
            let id_form = this.$route.params.idForm
            let count1 = 0;
            let count2 = 0;
            let count3 = 0;
            let count4 = 0;
            let count5 = 0;

            const countval1 = await this.$axios.$get(`${Api}/reportes_form/${id_qr}/${id_form}/${id_question}/${id_item}/1`).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(countval1);
            if (countval1.length != 0) {
                count1 = await countval1[0].total;
            } else {
                count1 = 0;
            }
            const countval2 = await this.$axios.$get(`${Api}/reportes_form/${id_qr}/${id_form}/${id_question}/${id_item}/2`).catch(error => {
                console.log('Request canceled', error)
            })
            if (countval2.length != 0) {
                count2 = await countval2[0].total;
            } else {
                count2 = 0;
            }
            const countval3 = await this.$axios.$get(`${Api}/reportes_form/${id_qr}/${id_form}/${id_question}/${id_item}/3`).catch(error => {
                console.log('Request canceled', error)
            })
            if (countval3.length != 0) {
                count3 = await countval3[0].total;
            } else {
                count3 = 0;
            }
            const countval4 = await this.$axios.$get(`${Api}/reportes_form/${id_qr}/${id_form}/${id_question}/${id_item}/4`).catch(error => {
                console.log('Request canceled', error)
            })
            if (countval4.length != 0) {
                count4 = await countval4[0].total;
            } else {
                count4 = 0;
            }
            const countval5 = await this.$axios.$get(`${Api}/reportes_form/${id_qr}/${id_form}/${id_question}/${id_item}/5`).catch(error => {
                console.log('Request canceled', error)
            })
            if (countval5.length != 0) {
                count5 = await countval5[0].total;
            } else {
                count5 = 0;
            }
            let calcCsat = ((count4 + count5) / (count1 + count2 + count3 + count4 + count5)) * 100

            this.datacountCsat = calcCsat.toFixed(2)
            // console.log(this.datacountCsat);
            if (this.datacountCsat === 'NaN') {
                this.datacountCsat = ''
            }
            this.datacount1 = count1
            this.datacount2 = count2
            this.datacount3 = count3
            this.datacount4 = count4
            this.datacount5 = count5
            // console.log(count1, count2, count3, count4, count5, 'multiple');
            this.verchartBarra(count1, count2, count3, count4, count5)

        },
        verchartBarra(count1, count2, count3, count4, count5) {

            let datasss = {
                labels: ['Calificaciones'],
                datasets: [
                    {
                        label: '😒',
                        backgroundColor: ['#f5365c'],
                        data: [count1]
                    },
                    {
                        label: '🥱',
                        backgroundColor: ['#f7a51b'],
                        data: [count2]
                    },
                    {
                        label: '🙄',
                        backgroundColor: ['#f1e848'],
                        data: [count3]
                    },
                    {
                        label: '🙂',
                        backgroundColor: ['#3aad5bbf'],
                        data: [count4]
                    },
                    {
                        label: '😉',
                        backgroundColor: ['#2adf5e'],
                        data: [count5]
                    }
                ]
            }
            this.chartBarra = datasss
        },
        async questionDef(arr) {
            // console.log(arr);
            for (let index = 0; index < arr.length; index++) {
                if (arr[index].tipo === 'numbers') {
                    await this.getNPS(arr[index].id)
                    // console.log(arr[index]);
                }
            }
        },
        async getNPS(id_question) {
            let id_qr = this.$route.params.idQr
            let id_form = this.$route.params.idForm
            let red = 0;
            let yellow = 0;
            let green = 0;


            const countval1 = await this.$axios.$get(`${Api}/reportes_form/${id_qr}/${id_form}/${id_question}/1`).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(countval1);
            // if (countval1.length != 0) {
            red = await countval1[0].total;
            // } else {
            //     red = 0;
            // }
            const countval2 = await this.$axios.$get(`${Api}/reportes_form/${id_qr}/${id_form}/${id_question}/2`).catch(error => {
                console.log('Request canceled', error)
            })
            // if (countval2.length != 0) {
            yellow = await countval2[0].total;
            // } else {
            //     yellow = 0;
            // }
            const countval3 = await this.$axios.$get(`${Api}/reportes_form/${id_qr}/${id_form}/${id_question}/3`).catch(error => {
                console.log('Request canceled', error)
            })
            // if (countval3.length != 0) {
            green = await countval3[0].total;
            // } else {
            //     green = 0;
            // }

            let valred = (red / this.allRegistersForm) * 100
            let valyellow = (yellow / this.allRegistersForm) * 100
            let valgreen = (green / this.allRegistersForm) * 100

            valred.toFixed(2);
            valyellow.toFixed(2);
            valgreen.toFixed(2);
            // this.red = red
            // this.yellow = yellow
            // this.green = green
            let calcNPS = valgreen - valred
            // console.log(calcNPS);
            // console.log(red.toFixed(2), yellow.toFixed(2), green.toFixed(2), this.allRegistersForm, `${red + yellow + green}`);

            // this.calculoNps = 0
            this.calculoNps = calcNPS.toFixed(2)
            // console.log(this.calculoNps);
            if (this.calculoNps === 'NaN') {
                this.calculoNps = ''
            }
            // this.verchartBarra(count1, count2, count3, count4, count5)

        },
        async getAllRegistersForm() {
            let id_qr = this.$route.params.idQr
            let id_form = this.$route.params.idForm
            const data = await this.$axios.$get(`${Api}/reportes_form/${id_qr}/${id_form}`).catch(error => {
                console.log('Request canceled', error)
            })
            this.allRegistersForm = await data[0].total
            // console.log(data[0]);
        },

    },
};
</script>

<style lang="scss" scoped></style>