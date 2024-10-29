<template>
    <v-dialog v-model="dialog" width="550">
        <template v-slot:activator="{ on, attrs }">
            <button v-bind="attrs" v-on="on" class="w-100 btn btn-link bg-dark text-gradient px-3 mb-0">
                <v-icon style="font-size:15px">open_in_full</v-icon>
                Demostración</button>
        </template>
        <v-card>
            <v-card-title class="text-h5 grey lighten-2">
                {{ nt.subject }}{{ icons }}
            </v-card-title>

            <v-card-text>
                <div>
                    <div style="text-align: center">
                        <img style="width:100px; border-radius: 50%"
                            :src="`https://feedback-backend-buzg8.ondigitalocean.app/logos/${logo}`" alt="empresa">
                    </div>
                    <h3 style="text-align: center">{{ nt.slogan }}</h3>
                    <p>
                    </p>
                    <p>¡Hola <span style="text-transform: uppercase;"> <b>Nombre Cliente!🙋🏽</b></span>; </p>
                    <textarea disabled class="form-control" rows="11" :value="nt.mensaje" placeholder="Mensaje"
                        style="background-color: #ffffff; border: none; color: #000000" id="floatingTextarea"></textarea>
                    <!-- <p>
                    <pre> {{ nt.mensaje }}</pre>
                    </p> -->
                    <br>
                    <p>{{ nt.pie_mensaje }} <b style="text-transform: uppercase;">Nombre Cliente</b></p>

                    <div>
                        <img style="width: 150px;" src="https://feedback-backend-buzg8.ondigitalocean.app/images/Logo.png"
                            alt="feedbackLatam">
                    </div>
                </div>
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
</template>

<script>
export default {
    name: 'FeedbackFrontModal01',
    props: {
        nt: Object,
        logo: String
    },

    data() {
        return {
            dialog: false,
            icons: ''
        };
    },

    mounted() {

        this.geticons();
    },

    methods: {
        geticons() {
            if (this.nt.valor === 'Felicitaciones') {
                this.icons = '🥳🎉';
            }
            if (this.nt.valor === 'Sugerencias') {
                this.icons = '📌📝';
            }
            if (this.nt.valor === 'Reclamos') {
                this.icons = '😓🤕';
            }
        }
    },
};
</script>

<style lang="scss" scoped></style>