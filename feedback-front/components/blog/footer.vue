<template>
    <section id="footer-Content" style="background-color:#333 !important;">
        <br>
        <!-- <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-mb-12" style="margin: auto;">
                    <div class="widget" style="text-align:center;">
                        <h3 class="block-title">Subscribete a nuestras novedades</h3>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-mb-12" style="margin: auto;">
                    <div class="widget" style="text-align:center;">
                        <div class="" style="">
                            <input type="email" class="form-control imput_gmail" placeholder="Escribe tu correo">
                        </div>
                        <br>
                        <div>
                            <button class="btn" style="color: #f00; background-color: #fff;border-radius: 10px;"
                                type="submit">Suscribirme</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <br>

        <div class="copyright">
            <div class="">
                <div class="row">
                    <div class="col-md-12 bg-gradient-primary">
                        <div class="site-info text-center text-white d-flex" style="justify-content: space-around;">
                            <div>
                                <img src="img/Logo_b.png" alt="" width="200">
                                <!-- <span>&copy; {{ new Date().getFullYear() }} Feedback</span> -->
                            </div>
                            <div class="social-buttons">
                                <button class="social-button "
                                    @click="openLink('https://www.instagram.com/feedback_peru/')">
                                    <img src="img/sociales/ig.png" alt="" style="border-radius: 20%;" width="35">
                                </button>
                                <button class="social-button "
                                    @click="openLink('https://www.facebook.com/profile.php?id=100093679806678')">
                                    <img src="img/sociales/fb.png" alt="" style="border-radius: 20%;" width="30"> </button>
                                <button class="social-button " @click="pageWhatsapp()">
                                    <img src="img/sociales/ws.png" alt="" style="border-radius: 20%;" width="35"> </button>
                                <button class="social-button "
                                    @click="openLink('mailto:cuentafeedback@gmail.com, jeanmarcols6@gmail.com')">
                                    <img src="img/sociales/cr.png" alt="" style="border-radius: 20%;" width="35"> </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <br><br><br>
                <div class="row">
                    <div class="col-md-12 bg-gradient-primary">
                        <div class="site-info text-center text-white d-flex" style="justify-content: space-around;">
                            <div>
                                <span>&copy; {{ new Date().getFullYear() }}</span>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'FeedbackFooter',

    data() {
        return {

        };
    },

    mounted() {

    },

    methods: {
        openLink(url) {
            window.open(url, '_blank'); // Abre la URL en una nueva pestaña
        },
        pageWhatsapp() {
            let num = 949641210
            // 
            let mensaje = `Hola Vengo de tu web 😉, Quiero Mayor informacion de Feedback
            Espero tu respuesta`
            window.open(`https://api.whatsapp.com/send?phone=51${num}&text=${mensaje}`, "Whatsapp")
        }
    },
};
</script>

<style scoped>
.imput_gmail {
    background: #3D3D3D;
    border: navajowhite;
    text-align: center;
    font-weight: bolder;
    border-bottom: 2px solid #707070;
}

.social-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
}

.social-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 10px;
    /* background-color: #3f51b5; */
    /* Cambia el color de fondo según tus preferencias */
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
}

.social-button:hover {
    background-color: rgb(232, 23, 23);
    /* Cambia el color de fondo al pasar el mouse */
    transform: scale(1.1);
}

.facebook {
    background-color: #191919;
    /* Cambia el color de fondo de Facebook */
}

.instagram {
    background-color: #191919;
    /* Cambia el color de fondo de Instagram */
}

.whatsapp {
    background-color: #191919;
    /* Cambia el color de fondo de WhatsApp */
}

.email {
    background-color: #191919;
    /* Cambia el color de fondo del correo */
}
</style>