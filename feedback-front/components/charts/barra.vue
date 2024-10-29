<template>
    <bar-chart :chart-options='chartOptionsBarra' :chart-data='chartBarra' />
</template>

<script>
import Api from '../../api/API_feedback';

export default {
    name: 'FeedbackAppBarra',
    // props: {
    //     valGraficos: Object
    // },

    data() {
        return {
            user: {},
            chartBarra: {},
            chartOptionsBarra: {
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
        // await this.getValoresBarra()

        // this.getValores()
        // console.log(this.valGraficos.countFeli, this.valGraficos.countSuge, this.valGraficos.countRecla);
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

<style lang="scss" scoped></style>