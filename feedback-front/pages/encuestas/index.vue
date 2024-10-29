<template>
    <div>
        <div class="flex" style="align-items:center ">
            <div class="col-1">
                <nuxt-link :to="`encuestas/create`">
                    <div style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <!-- <h6>Crear</h6> -->
                        <v-btn icon>
                            <v-icon>add_circle</v-icon>
                        </v-btn>
                    </div>
                </nuxt-link>
            </div>
            <div>
                <h5>Mis Formularios</h5>
            </div>
        </div>

        <!-- info encuensta -->
        <div class="row">
            <!-- crad info cada encuesta -->
            <div class="col-md-6 mt-4">
                <div class="card">
                    <div class="card-header pb-0 px-3">
                        <h6 class="mb-0">Informacion Encuesta</h6>
                    </div>
                    <div class="card-body pt-4 p-3">
                        <ul class="list-group">
                            <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                                <div class="d-flex flex-column">
                                    <h6 class="mb-3 text-sm">General</h6>
                                    <span class="mb-2 text-xs">Autor: <span
                                            class="text-dark font-weight-bold ms-sm-2">Feedback</span></span>
                                    <span class="mb-2 text-xs">Email: <span
                                            class="text-dark ms-sm-2 font-weight-bold">autor@example.com</span></span>
                                    <span class="text-xs">Estado: <span
                                            class="badge badge-sm bg-gradient-success">Online</span></span>

                                </div>

                                <div class="ms-auto text-end flex" style="flex-direction: column;">
                                    <!-- <i class="far fa-comments"></i> -->
                                    <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;">
                                        <i class="far fa-trash-alt me-2"></i>Delete</a>
                                    <nuxtLink to="/encuestas/1" class="btn btn-link text-dark px-3 mb-0"
                                        href="javascript:;"><i class="fas fa-pencil-alt text-dark me-2"
                                            aria-hidden="true"></i>Edit</nuxtLink>
                                    <nuxtLink to="/encuestas/1" class="btn btn-link text-dark px-3 mb-0"
                                        href="javascript:;"><i class="fas fa-list text-dark me-2"
                                            aria-hidden="true"></i>Questions</nuxtLink>
                                </div>
                            </li>
                            <button class="flex justify-content-center"><a :href="getUrlQr" download=""> Descargar QR
                                    <v-icon>qr_code_scanner</v-icon>
                                </a>
                            </button>

                            <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg d-none">
                                <a :href="getUrlQr" download="">
                                    <vue-qr text="https://github.com" bgSrc="img/rojo.webp" :logoSrc="src2" :size="200"
                                        qid="testid" :callback="test">
                                    </vue-qr>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FeedbackAppIndex',
    data() {
        return {
            user: [],
            getUrlQr: null,
            src2: "img/icon2.png"
        };
    },

    mounted() {

        this.user = JSON.parse(localStorage.getItem("user"))
    },

    methods: {
        test(url, id) {
            this.getUrlQr = url
            // console.log(url, id)
        }
    },
};
</script>

<style lang="scss" scoped></style>