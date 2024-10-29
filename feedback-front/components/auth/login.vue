<template>
    <div>
        <div class="card_todo_question cente">
            <div class="topPage">
                <div class="cont_logo">
                    <div class="flex_center">
                        <!-- <img :src="`${images}/1679406402252-Logo.png`" alt=""> -->
                        <img @click="homeHref()" src="/img/Logo.png" alt="" style="cursor: pointer;">
                    </div>
                </div>
            </div>
            <div class=" row animate__animated animate__fadeInRight mx-2">
                <div class="col-md-12">
                    <v-text-field v-model="form.email" :rules="emailRules" label="E-mail" required>
                    </v-text-field>
                </div>

                <div class="col-md-12">
                    <!-- @keyup="submitForm()" -->
                    <v-text-field v-model="form.password" :rules="passRules" label="Contraseña" required :type="'password'"
                        name="password" class="input-group--focused"></v-text-field>
                </div>
                <div class="col-md-12" md="4">
                    <v-switch v-model="checked" label="Recordar Usuario" color="red" hide-details></v-switch>
                </div>


                <!-- <pre class="m-0">{{ form }}</pre> -->

            </div>
            <div class="btnPrimary">
                <button @click="submitForm()">Ingresar</button>
                <!-- <nuxt-link :to="`/Zhu Roll`"><button>Ingresar</button></nuxt-link> -->
            </div>

        </div>
    </div>
</template>
  
<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../../api/API_feedback'
import images from '../../api/URL_imges';
export default {
    name: 'FeedbackAppCpanel',
    data() {
        return {
            images: images,
            show3: false,
            password: 'Password',
            form: {
                email: null,
                password: '',
                // checked: true,
            },
            checked: true,
            valid: false,
            passRules: [
                v => !!v || 'Password requerido',
                v => v.length <= 25 || 'Fuera de limite',
            ],
            emailRules: [
                v => !!v || 'E-mail es requerido',
                v => /.+@.+/.test(v) || 'E-mail no valido',
            ],
        };
    },

    mounted() {
        // },
        // created() {
        // this.storage();
    },

    methods: {
        homeHref() {
            location.href = `/`
        },
        async submitForm() {
            const params = {
                email: this.form.email,
                password: this.form.password
            }
            if (!this.form.password || !this.form.email) {
                // console.log('INGRESAR DATOS ... ');
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Ingresar todos los datos',
                    timer: 2500,
                    confirmButtonColor: '#ff0000'
                })
            } else {
                const data = await this.$axios.$post(`${Api}/login`, params).catch(error => {
                    console.log('Request canceled', error)
                })
                if (data.length === 0) {
                    // console.log('no existen datos');
                    Swal.fire({
                        icon: 'info',
                        title: 'Oops...',
                        text: 'Correo o contraseña incorrectas',
                        timer: 2500,
                        confirmButtonColor: '#ff0000'
                    })
                    // this.form.email = ""
                    this.form.password = ""
                } else if (data.user.stateCompanie === 1) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("companie", JSON.stringify(data.companie[0]));
                    localStorage.setItem("items", JSON.stringify(data.items));
                    Swal.fire({
                        icon: 'success',
                        title: 'Bienvenido a Feedback',
                        text: 'Correo y contraseña Correctas',
                        timer: 2500,
                        confirmButtonColor: '#ff0000',
                        showConfirmButton: false,
                    }).then(() => {
                        // Aquí la alerta se ha cerrado
                        // location.href = '/sucursales'
                        this.locationHref()
                    })
                    // this.locationHref()
                    // console.log('todo corecto');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: `La compañia ${data.user.nameCompanie} esta Inhabilitada`,
                        text: 'Comunicte con Soporte',
                        timer: 3000,
                        confirmButtonColor: '#ff0000'
                    })
                    // this.locationHref()
                    // console.log('Compañia Inhabilitada');
                }

            }
        },

        // login() {
        //     localStorage.setItem("user", JSON.stringify(this.form));
        //     // location.href = `/${JSON.parse(localStorage.getItem("user.email"))}`
        //     this.locationHref();

        // },
        locationHref() {
            let user = JSON.parse(localStorage.getItem("user"))
            // console.log(nameRute.nameCompanie);

            if (user.rol_id === 10) {
                location.href = `/${user.nameCompanie}/companies`
            } else if (user.rol_id === 5) {
                location.href = `/${user.nombre}/controlpanel`
            } else {
                location.href = `/${user.nameCompanie}/cpanel`
            }



        }
    },
};
</script>
  
<style>
.v-messages__message {
    color: red;
}
</style>