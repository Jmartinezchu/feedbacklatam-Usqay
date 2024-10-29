<template>
    <section id="home" class="section ">
        <div class="row mt-5  container">
            <div class="col-md-6 text_home">
                <div>
                    <div>
                        <h3 class="title_home">
                            Feedback
                        </h3>
                    </div>
                    <div>
                        <h3>
                            Tu sistema de <span>encuestas</span>, listo para <span>gestionar la opinion</span> de tus
                            <span>clientes</span>
                        </h3>
                    </div>
                    <div>
                        <p><i>Inpulsa tu negocio: Opiniones de clientes, mejoras, gestion multi-sucursal y más. ¡Hecho a tu
                                medidia!</i></p>
                    </div>
                    <br><br><br><br>
                    <div>
                        <button @click="pageWhatsapp()" class="btn btn-singin btniniciarahora" to="/auth/login">Comenzar
                            Ahora</button>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <img src="/img/home.png" alt="" style="width:100%">
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
        pageWhatsapp() {
            let num = 949641210
            let mensaje = `Quiero Mayor informacion de Feedback`
            window.open(`https://api.whatsapp.com/send?phone=51${num}&text=${mensaje}`, "Whatsapp")
        }

    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap');

.text_home {
    display: flex;
    justify-items: center;
    align-items: center;
}

.title_home {
    font-weight: 800;
    color: red;
    font-size: xxx-large;
}

div h3 {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 28px;
    color: #333;
    line-height: 1.7;
    letter-spacing: 2px;
}

div h3 span {
    color: red
}

p i {
    color: #3338;
    font-size: 20px;
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