<template>
    <div class="container">
        <header class="hero-area">
            <div class="container">
                <div class="row space-100">
                    <div class="col-lg-6 col-md-12 col-xs-12">
                        <div class="divImg contents" style="padding-bottom: 0 !important;">
                            <div class=" animate_animate animate__fadeInDown text-center pt-5"
                                style="padding-top: 0 !important">
                                <img src="/img/404.png" alt="" class="img404">
                            </div><br><br>

                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12 col-xs-12 " style="margin:auto">
                        <div class="contents" style="padding: 0 !important">
                            <br>
                            <h2 class="head-title text-center" style="font-size:30px"><strong>Pagina no encontrada</strong>
                            </h2>
                            <div class="header-button">
                                <!-- <a href="#" class="btn btn-border-filled">Inicia Ahora! </a> -->
                                <nuxt-link to="/" class="btn btn-border page-scroll">
                                    <strong>
                                        ir al inicio
                                    </strong>
                                </nuxt-link>
                                <!-- <img src="/img/gif/gif1.gif" alt="" style="width:50px"> -->
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    name: 'FeedbackError',
    layout: 'blog',
    data() {
        return {

        };
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style scoped>
.img404 {
    border-radius: 20px;
    max-width: 500px !important;
}

@media screen and (max-width:1178px) {
    .img404 {
        border-radius: 20px;
        max-width: 400px !important;
    }

    .divImg {
        padding-top: 80px !important;
    }
}

@media screen and (max-width:425px) {
    .img404 {
        border-radius: 20px;
        max-width: 300px !important;
    }
}
</style>