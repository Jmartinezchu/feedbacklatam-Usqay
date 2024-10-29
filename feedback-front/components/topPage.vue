<template>
    <div class="topPage">
        <div class="cont_logo">
            <div class="flex_center">
                <img :src="`${images}/${qrData.filename}`" alt="" style="width:150px; border-radius: 50%;">
                <h2>{{ qrData.nameSucursal }}</h2>
                <h4> {{ qrData.nameForm }}</h4>

            </div>
        </div>
    </div>
</template>

<script>
import Api from '../api/API_feedback';
import images from '../api/URL_imges';

export default {
    props: {
        image: String,
        autor: String
    },
    data() {
        return {
            route: {},
            qrData: [],
            images: images
            // name_empresa: "jajajaj",
        };
    },

    mounted() {
        this.route = this.$route.params
        // this.qrData = JSON.parse(localStorage.getItem("qrData"))
        this.getDataqr()
    },

    methods: {
        async getDataqr() {
            let id = this.route.idQr
            const data = await this.$axios.$get(`${Api}/generateQr/one/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.qrData = data[0]
            // console.log(data[0]);
            // localStorage.setItem("companie", JSON.stringify(data[0]));

        },
        geturl() {
            location.href = "/"
        }
    },
};
</script>
<style>
/* .topPage {
    margin-top: 0px;
} */
</style>