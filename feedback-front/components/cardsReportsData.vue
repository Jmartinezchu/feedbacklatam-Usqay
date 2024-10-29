<template>
    <div class="row" data-v-step="0">
        <div class="col-xl-6 col-md-6 col-sm-6 mb-xl-0 mb-4">
            <div class="card" style="height: 100px;">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-8">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-uppercase font-weight-bold">NPS</p>
                                <h3 class="font-weight-bolder">
                                    45
                                </h3>
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
        <div class="col-xl-6 col-md-6 col-sm-6 mb-xl-0 mb-4">
            <div class="card" style="height: 100px;">
                <div class="card-body p-3">
                    <div class="row">
                        <div class="col-8">
                            <div class="numbers">
                                <p class="text-sm mb-0 text-uppercase font-weight-bold">CSAT</p>
                                <h3 class="font-weight-bolder">
                                    CSAT
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
                                    {{ questions.length }}
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
</template>

<script>
import Api from '../api/API_feedback';

export default {
    name: 'FeedbackCardsReportsData',

    data() {
        return {
            idForm: null,
            allRegistersForm: 0,
            questions: [],
        };
    },

    async mounted() {
        this.idForm = this.$route.params.idForm;
        await this.getAllRegistersForm();
        await this.verdata()
    },

    methods: {
        async getAllRegistersForm() {
            let id_qr = this.$route.params.idQr
            let id_form = this.$route.params.idForm
            const data = await this.$axios.$get(`${Api}/reportes_form/${id_qr}/${id_form}`).catch(error => {
                console.log('Request canceled', error)
            })
            this.allRegistersForm = data[0].total
            // console.log(data[0]);
        },
        async verdata() {
            // console.log(this.idForm);
            const data = await this.$axios.$get(`${Api}/question/${this.idForm}`).catch(error => {
                console.log('Request canceled', error)
            });
            this.questions = data;
        },
    },
};
</script>

<style lang="scss" scoped></style>