<template>
    <div>
        <!--TODO: 1679406402252-Logo.png -->
        <div class="flex_center animate__animated animate__fadeInDown">
            <img :src="`${images}/${this.qr.filename}`" :alt="qr.sucursal" style="width:150px; border-radius: 50%;">
            <!-- <br> -->
            <h4>{{ qr.sucursal }}-{{ qr.city }}</h4>
            <p>{{ qr.address }}</p>
        </div>
        <!-- <pre>{{ qr }}</pre> -->
        <a :href="link.link" v-for="(link, i) in qr.qr_linksdata" :key="i" class="btn btn-btn  mb-4 cardbtnLink">
            <!-- {{ qr.qr_linksdata }} -->
            <h5 :href="link.link" class="animate__animated animate__fadeInDown"
                style="display: flex;text-align: center;justify-content: center;">
                <v-icon style="font-size: 20px;color: rgb(0, 0, 0);">task_alt</v-icon>
                {{ link.name }}
            </h5>
            <a :href="link.link"><v-icon style="font-size: 20px;color:#4e4ead; font-weight: bold">open_in_new</v-icon></a>

        </a>
        <div
            style="background-color: #00000052; height: 1px; width: 200px; margin: 0 auto; box-shadow: 1px 1px 20px 0px black;">
        </div>
        <div style="height:100px"></div>

        <p style="    text-align: center; position: fixed; bottom: 0; background-color: #fff;">
            {{ qr.description }}
        </p>
    </div>
</template>

<script>
import Api from '../../../api/API_feedback';
import images from '../../../api/URL_imges';
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
    name: 'FeedbackIndex',
    layout: 'clientes',
    data() {
        return {
            images: images,
            qr: {}
        };
    },

    async mounted() {
        // console.log(this.$route.params);
        await this.verdata();
        // setTimeout(() => {
        //     location.href = `${this.qr.link}`
        //     // console.log('han pasado 2 segundos');
        // }, 2500);
    },

    methods: {
        async verdata() {
            let id = this.$route.params.link
            const data = await this.$axios.$get(`${Api}/qrlinks/links/one/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
            if (data === 'error') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Enlace no valido',
                    text: 'Comunicate con la empresa',
                    confirmButtonColor: '#ff0000'
                }).then(() => { location.href = 'https://feedbacklatam.com' })

            }

            if (data[0].state === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Enlace Inhabilitado',
                    text: 'Comunicate con la empresa',
                    confirmButtonColor: '#ff0000'
                }).then(() => { location.href = 'https://feedbacklatam.com' })
            }
            this.qr = data[0];

            if (this.qr.qr_linksdata === null) {
                alert('no hay linsk registrados');
                location.href = 'https://feedbacklatam.com'

            }

            // console.log(this.qr)
        },

    },
};
</script>


<style scoped>
/* . {
    display: flex;
    flex-direction: column;
    justify-content: r !important;
    align-items: r !important;
    align-content: r !important;
} */

.cardbtnLink::before {
    width: 20px;
    height: 20px;
    background-color: red
}

.cardbtnLink {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 15px;
}
</style>