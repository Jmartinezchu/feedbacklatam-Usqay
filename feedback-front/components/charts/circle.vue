<template>
    <pie-chart :chart-options='chartOptionsCircle' :chart-data='chartDataCircle' />
</template>

<script>
import Api from '../../api/API_feedback';

export default {
    name: 'FeedbackAppCircle',
    // props: {
    //     valGraficos: Object
    // },
    data() {
        return {
            user: {},
            chartDataCircle: {},
            chartOptionsCircle: {
                responsive: true,
                maintainAspectRatio: false
            },
            valGraficos: {
                countFeli: 0,
                countSuge: 0,
                countRecla: 0
            },
            datacompanie: {}
        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"));
        this.valGraficos = this.datacompanie.valGraficos
        // this.getValores()
        // await this.getValoresBarra()
        this.verdata(this.valGraficos.countFeli, this.valGraficos.countSuge, this.valGraficos.countRecla)
    },

    methods: {
        getValores() {
            try {
                this.countFeli = this.valGraficos.countFeli
                this.countSuge = this.valGraficos.countSuge
                this.countRecla = this.valGraficos.countRecla
            } catch (error) {
                console.log(error);
            }
            console.log(this.countFeli, this.countSuge, this.countRecla)


            this.verdata(this.countFeli, this.countSuge, this.countRecla)
        },
        async getValoresBarra() {
            let countFeli = 0;
            let countSuge = 0;
            let countRecla = 0;
            let id = this.user.idCompanie;

            const countval1 = await this.$axios.$get(`${Api}/comentarios/countType/${id}/1`).catch(error => {
                console.log('Request canceled', error)
            })
            // this.allComentsCompanie = data[0].total;
            if (countval1.length != 0) {
                countFeli = countval1[0].total;
            } else {
                countFeli = 0;
            }
            const countval2 = await this.$axios.$get(`${Api}/comentarios/countType/${id}/2`).catch(error => {
                console.log('Request canceled', error)
            })
            // this.allComentsCompanie = data[0].total;
            if (countval2.length != 0) {
                countSuge = countval2[0].total;
            } else {
                countSuge = 0;
            }
            const countval3 = await this.$axios.$get(`${Api}/comentarios/countType/${id}/3`).catch(error => {
                console.log('Request canceled', error)
            })
            // this.allComentsCompanie = data[0].total;
            if (countval3.length != 0) {
                countRecla = countval3[0].total;
            } else {
                countRecla = 0;
            }
            this.verdata(countFeli, countSuge, countRecla)
            // let datasss = {
            //     labels: ['felitaciones', 'Sugerencias', 'Reclamos'],
            //     datasets: [
            //         {
            //             label: 'Ocultar',
            //             backgroundColor: ['green', '#d2d13c', 'red'],
            //             data: [countFeli, countSuge, countRecla]
            //         }
            //     ]
            // }
            // this.chartBarra = datasss

        },
        verdata(countFeli, countSuge, countRecla) {

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
        }
    },
};
</script>

<style lang="scss" scoped></style>