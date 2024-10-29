<template>
    <section id="jajaj">
        <div class="container-fluid">
            <div class="row pading_seccion">
                <div class="col-lg-12">
                    <div class="showcase-text section-header text-center">
                        <h2 class="section-title" style="color: red">Nuestros clientes nos recomiendan</h2>
                        <div class="carousel-wrapper" v-if="imagesLoaded">
                            <!-- Renderizar solo si las imágenes están cargadas -->
                            <VueSlickCarousel v-bind="slickOptions" :arrows="false">
                                <!-- <div v-for="logo in logos" :key="logo.filename" class="img-warpper">
                                    <img :src="`${images}/${logo.filename}`" class="img-fluid" />
                                </div> -->
                                <div v-for="logo in logos" :key="logo.filename" class="img-slide">
                                    <div class="img-wrapper">
                                        <img :src="`${images}/${logo.filename}`" class="img-fluid" />
                                    </div>
                                </div>
                            </VueSlickCarousel>
                        </div>
                        <div v-else>
                            Cargando imágenes... <!-- Mostrar mensaje mientras las imágenes se cargan -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Api from "../../api/API_feedback"
import images from "../../api/URL_imges"
import VueSlickCarousel from 'vue-slick-carousel'
export default {
    name: 'FeedbackClients',
    components: {
        VueSlickCarousel
    },

    data() {
        return {
            images: images,
            slickOptions: {
                slidesToShow: 6.5,
                arrows: false
            },
            logos: [],
            imagesLoaded: false, // Variable para rastrear si las imágenes se cargaron

        };
    },

    async mounted() {
        await this.getImages();
        console.log(window.innerWidth);
        if (window.innerWidth <= 480) {
            this.slickOptions.slidesToShow = 3.2
        } else if (window.innerWidth <= 680) {
            this.slickOptions.slidesToShow = 4.2
        } else if (window.innerWidth <= 930) {
            this.slickOptions.slidesToShow = 4.5
        } else {
            this.slickOptions.slidesToShow = 5.2
        };

        // this.logos = JSON.parse(localStorage.getItem("logos"));
    },
    watch: {
        logos: {
            handler(newLogos) {
                if (newLogos.length > 0) {
                    this.imagesLoaded = true; // Marcar las imágenes como cargadas
                }
            },
            immediate: true, // Ejecutar el watcher inmediatamente después de montar
        },
    },

    methods: {

        getImagePath(filename) {
            return `${images}/${filename}`;
        },
        async getImages() {
            const data = await this.$axios.$get(`${Api}/home/logos/clientes/img`).catch(error => {
                console.log('Request canceled', error);
            });

            this.logos = data;
        },
    },
};
</script>


<style scoped>
/*  */
.pading_seccion {
    padding-bottom: 100px;
}

.img-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    /* Centra verticalmente */
}

.img-wrapper {
    max-width: 100%;
    text-align: center;
    /* Centra horizontalmente */
}

.img-fluid {
    width: 180px;
    /* Ajusta el tamaño deseado */
    height: 180px;
    min-height: 100px;
    /* Ajusta el tamaño deseado */
    object-fit: cover;
    /* Mantiene la relación de aspecto y recorta si es necesario */
    border-radius: 50%;
    /* Agrega el radio de borde del 50% */
}

.carousel-wrapper {
    padding: 40px;
    height: 150px;
}

.img-warpper img {
    border-radius: 50%;
    margin: auto;
    width: 200px;
    height: 150px;
    background-image: linear-gradient(rgb(255, 255, 255) 100%, transparent 0);
}

@media screen and (max-width:1300px) {
    .img-fluid {
        width: 170px;
        height: 170px;
    }
}

@media screen and (max-width:1024px) {
    .img-fluid {
        width: 120px;
        height: 120px;
    }

    .pading_seccion {
        padding-bottom: 5px;
    }

    /* .img-warpper img {
        width: auto;
        height: 60px;
    } */
}

.slick-next:before,
.slick-prev:before {
    color: black;
}
</style>