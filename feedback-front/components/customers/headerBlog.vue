<template>
    <nav class="navbar navbar-expand-md bg-inverse fixed-top scrolling-navbar" style="background: #fff">
        <div class="newHeigth container">
            <nuxt-link to="/" class="navbar-brand "><img src="/img/Logo.png" alt=""
                    style="height: 50px; width: 100%;"></nuxt-link>
            <!-- <nuxt-link to="/" class="navbar-brand "><img src="/img/Logo_b.png" alt=""
                    style="height: 50px; width: 100%;"></nuxt-link> -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <v-icon class="text-white">menu</v-icon>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mr-auto w-100 justify-content-center">
                    <li class="nav-item">
                        <nuxt-link to="/" class="nav-link page-scroll" href="#home">Inicio</nuxt-link>
                    </li>
                    <!-- <li class="nav-item">
                            <a class="nav-link page-scroll" href="#services">About</a>
                        </li> -->
                    <li class="nav-item">
                        <a class="nav-link page-scroll" href="#services">Servicios</a>
                    </li>
                    <!-- <li class="nav-item">
                        <a class="nav-link page-scroll" href="#business-plan">Calculos</a>
                    </li> -->
                    <li class="nav-item">
                        <a class="nav-link page-scroll" href="#clientes">Clientes</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link page-scroll" href="#proceso">Proceso</a>
                    </li>
                    <!-- <li class="nav-item">
                        <a class="nav-link page-scroll" href="#pricing">Planes</a>
                    </li> -->
                    <!-- <li class="nav-item">
                            <a class="nav-link page-scroll" href="#team">Team</a>
                        </li> -->
                    <!-- <li class="nav-item">
                            <a class="nav-link page-scroll" href="#blog">Blog</a>
                        </li> -->
                    <!-- <li class="nav-item">
                            <a class="nav-link page-scroll" href="#contact">Contact</a>
                        </li> -->
                    <li class="nav-item displaymovil">
                        <nuxt-link class="btn btn-singin" to="/auth/login">Login</nuxt-link>
                    </li>
                </ul>
            </div>
            <nuxt-link class="btn btn-singin displaypc" to="/auth/login">Login</nuxt-link>
        </div>
        <!-- <nuxt-link class="btn btn-singin" to="/auth/login">Login</nuxt-link> -->
    </nav>
</template>

<script>
export default {
    name: 'FeedbackHeaderBlog',

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
.displaymovil {
    display: none
}

@media screen and (max-width:767px) {
    .displaymovil {
        display: block
    }

    .displaymovil a {
        width: 90%;
        margin: 0 15px;
    }

    .displaypc {
        display: none
    }
}
</style>