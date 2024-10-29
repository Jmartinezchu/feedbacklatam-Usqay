<template>
    <div>
        <header class="hero-area">
            <div class="container">
                <div class="row space-100">
                    <div class="col-lg-12 col-md-12 col-xs-12">
                        <div class="contents">
                            <h2 class="head-title"><span>Registrate con nosotros</span>
                                <br>Tu Sistema de encuestas, lista para gestionar la opinion de tus clientes
                            </h2>
                            <v-stepper v-model="e1" style="border-radius: 25px;">
                                <v-stepper-header>
                                    <v-stepper-step :complete="e1 > 1" step="1">
                                        Datos Generales
                                    </v-stepper-step>

                                    <v-divider></v-divider>

                                    <v-stepper-step :complete="e1 > 2" step="2">
                                        Ubicacion y Contacto
                                    </v-stepper-step>

                                    <v-divider></v-divider>

                                    <v-stepper-step step="3">
                                        Tipo de Compañia
                                    </v-stepper-step>

                                </v-stepper-header>

                                <v-stepper-items>
                                    <v-stepper-content step="1">
                                        <v-card class="mb-12" color="grey lighten-1" height="200px">

                                        </v-card>

                                        <v-btn color="primary" @click="e1 = 2">
                                            Continue
                                        </v-btn>

                                        <v-btn text>
                                            Cancel
                                        </v-btn>
                                    </v-stepper-content>

                                    <v-stepper-content step="2">
                                        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

                                        <v-btn color="primary" @click="e1 = 3">
                                            Continue
                                        </v-btn>

                                        <v-btn text>
                                            Cancel
                                        </v-btn>
                                    </v-stepper-content>

                                    <v-stepper-content step="3">
                                        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

                                        <v-btn color="primary" @click="e1 = 1">
                                            Continue
                                        </v-btn>

                                        <v-btn text>
                                            Cancel
                                        </v-btn>
                                    </v-stepper-content>
                                </v-stepper-items>
                            </v-stepper>
                            <div class=" header-button">
                                <!-- <a href="#" class="btn btn-border-filled">Inicia Ahora! </a> -->
                                <nuxt-link to="/home/register" class="btn btn-border page-scroll"><strong>Inicia
                                        ahora</strong></nuxt-link>
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
    name: 'FeedbackRegister',
    layout: 'blog',
    data() {
        return {
            e1: 1,
        };
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style lang="scss" scoped></style>