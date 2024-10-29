<template>
    <section class="section">
        <div class="row mt-5 pt-5 container">
            <div class="col-md-6 text_home">
                <div>
                    <div>
                        <h4 class="title_home text-white">
                            Descubre<span> Feedback</span>
                        </h4>
                    </div>
                    <div>
                        <p style="text-align:justify"><i>
                                Feedback te ofrece servicios excepcionales que impulsarán el
                                éxito de tu negocio. Nuestra tecnología de encuestas y análisis
                                convierte las opiniones de tus clientes en información valiosa
                                para tu negocio, identificando áreas de mejora y ayudándote
                                a satisfacer mejor sus necesidades.
                            </i></p>
                    </div>
                    <!-- <br><br> -->
                    <div>





                        <h6 style="color :#f9d9d9"><v-icon color="red">task_alt</v-icon> Configurar multiples sucursales
                        </h6>
                        <h6 style="color :#f9d9d9"><v-icon color="red">task_alt</v-icon> Crear cupones para tus clientes
                        </h6>
                        <h6 style="color :#f9d9d9"><v-icon color="red">task_alt</v-icon> Crear y editar multiples encuestas
                            para tu negocio</h6>
                        <h6 style="color :#f9d9d9"><v-icon color="red">task_alt</v-icon> Delegar multiples usuarios</h6>
                        <h6 style="color :#f9d9d9"><v-icon color="red">task_alt</v-icon> Generar QR por cada encuesta</h6>
                        <h6 style="color :#f9d9d9"><v-icon color="red">task_alt</v-icon> Configurar multiples sucursales
                        </h6>
                        <h6 style="color :#f9d9d9"><v-icon color="red">task_alt</v-icon> Reportes con indicadores
                            internacionales</h6>
                    </div>
                    <br>
                    <div>
                        <button class="btn btn-singin btniniciarahora" to="/auth/login">Comenzar
                            Ahora</button>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <!-- <img src="/img/home.png" alt="" style="width:100%"></img> -->
                <div class="row">
                    <img src="/img/desc1.png" alt="" class="col-md-6 mb-2">
                    <img src="/img/desc2.png" alt="" class="col-md-6 mb-2">
                    <!-- <br><br><br><br><br><br> -->
                    <img src="/img/desc3.png" alt="" class="col-md-6">
                    <img src="/img/desc4.png" alt="" class="col-md-6">
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'FeedbackFrontHome',

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
.text_home {
    display: flex;
    justify-items: center;
    align-items: center;
}

.title_home {
    font-weight: 800;
    font-size: 30px;
}

.title_home span {

    color: red;
    /* font-size: xxx-large; */
}

div h3 {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 800;
    font-size: 28px;
    color: #333;
    line-height: 1.7;
    letter-spacing: 2px;
}

div h3 span {
    color: red
}

p i {
    color: #f9d9d9;
    font-size: 17px;
    font-weight: 100;
}

div .btniniciarahora {
    width: auto !important;
}

@media screen and (max-width:767px) {
    div img {
        display: none
    }

    div .btniniciarahora {
        width: 80% !important;
    }
}
</style>