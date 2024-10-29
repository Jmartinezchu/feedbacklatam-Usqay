<template>
    <div>
        <!-- {{ id }} pagina de la encuesta -->
        <div class="flex" style="align-items:center ">
            <div class="col-1">
                <nuxt-link to="/encuestas/1/createQuestion">
                    <div style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <!-- <h6>Crear</h6> -->
                        <v-btn icon>
                            <v-icon>add_circle</v-icon>
                        </v-btn>
                    </div>
                </nuxt-link>
            </div>
            <div style="margin: 0 auto;">
                <h6> Preguntas generadas por feedback</h6>
            </div>
        </div>

        <!-- info encuensta -->
        <div class="row">
            <!-- crad info cada pregunta -->
            <div class="col-md-12 mt-4">
                <div class="card">
                    <div class="flex" style="justify-content: space-between; align-items: baseline;">
                        <div class="card-header pb-0 px-3">
                            <h6 class="mb-0 text-center">¿Es la primera vez que nos visitas?</h6>
                            <!-- <p class="mb-0 text-center">Comidas</p> -->
                        </div>
                        <div class="ms-auto text-center ">
                            <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                    class="far fa-trash-alt me-2"></i></a>
                            <nuxtLink to="/encuestas/1" class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i
                                    class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i></nuxtLink>
                        </div>
                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <!-- todas la sub categorias -->
                            <li class=" list-group-item border-0 mb-2 bg-gray-100 border-radius-lg w-100"
                                style="margin: 0 3px">
                                <div class="d-flex flex-column">
                                    <h6 class="text-sm">Default</h6>
                                    <span class="mb-2 text-xs"> Options<span
                                            class="text-dark font-weight-bold ms-sm-2">Si / No</span></span>
                                </div>
                                <div class="ms-auto text-center ">
                                    <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                            class="far fa-trash-alt me-2"></i>Delete</a>
                                    <nuxtLink to="/encuestas/1" class="btn btn-link text-dark px-3 mb-0"
                                        href="javascript:;"><i class="fas fa-pencil-alt text-dark me-2"
                                            aria-hidden="true"></i>Edit</nuxtLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            <!-- pregunta con categorias -->
            <div class="col-md-12 mt-4">
                <div class="card">
                    <div class="flex" style="justify-content: space-between; align-items: baseline;">
                        <div class="card-header pb-0 px-3">
                            <h6 class="mb-0 text-center">¿Como calificas la experiencia de nuestos platos?</h6>
                            <p class="mb-0 text-center">Comidas</p>
                        </div>
                        <div class="ms-auto text-center ">
                            <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                    class="far fa-trash-alt me-2"></i></a>
                            <nuxtLink to="/encuestas/1" class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i
                                    class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i></nuxtLink>
                        </div>
                    </div>

                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <!-- todas la sub categorias -->
                            <li class=" list-group-item border-0 mb-2 bg-gray-100 border-radius-lg w-100"
                                style="margin: 0 3px">
                                <div class="d-flex flex-column">
                                    <h6 class="text-sm">Sabor</h6>
                                    <span class="mb-2 text-xs"> Options<span
                                            class="text-dark font-weight-bold ms-sm-2">Multiple</span></span>
                                </div>
                                <div class="ms-auto text-center ">
                                    <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                            class="far fa-trash-alt me-2"></i>Delete</a>
                                    <nuxtLink to="/encuestas/1" class="btn btn-link text-dark px-3 mb-0"
                                        href="javascript:;"><i class="fas fa-pencil-alt text-dark me-2"
                                            aria-hidden="true"></i>Edit</nuxtLink>
                                </div>
                            </li>
                            <li class="list-group-item border-0 mb-2 bg-gray-100 border-radius-lg w-100"
                                style="margin: 0 3px;">
                                <div class="d-flex flex-column">
                                    <h6 class="text-sm">Presentacion</h6>
                                    <span class="mb-2 text-xs"> Options<span
                                            class="text-dark font-weight-bold ms-sm-2">Multiple</span></span>
                                </div>
                                <div class="ms-auto text-center ">
                                    <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                            class="far fa-trash-alt me-2"></i>Delete</a>
                                    <nuxtLink to="/encuestas/1" class="btn btn-link text-dark px-3 mb-0"
                                        href="javascript:;"><i class="fas fa-pencil-alt text-dark me-2"
                                            aria-hidden="true"></i>Edit</nuxtLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- pregunta con categorias -->
            <div class="col-md-12 mt-4">
                <div class="card">
                    <div class="flex" style="justify-content: space-between; align-items: baseline;">
                        <div class="card-header pb-0 px-3">
                            <h6 class="mb-0 text-center">¿Como calificas el servicio de Atención?</h6>
                            <p class="mb-0 text-center">Atención</p>
                        </div>
                        <div class="ms-auto text-center ">
                            <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                    class="far fa-trash-alt me-2"></i></a>
                            <nuxtLink to="/encuestas/1" class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
                                <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>
                            </nuxtLink>
                        </div>
                    </div>

                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <!-- todas la sub categorias -->
                            <li class=" list-group-item border-0 mb-2 bg-gray-100 border-radius-lg w-100"
                                style="margin: 0 3px">
                                <div class="d-flex flex-column">
                                    <h6 class="text-sm">Meseros</h6>
                                    <span class="mb-2 text-xs"> Options<span
                                            class="text-dark font-weight-bold ms-sm-2">Multiple</span></span>
                                </div>
                                <div class="ms-auto text-center ">
                                    <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                            class="far fa-trash-alt me-2"></i>Delete</a>
                                    <nuxtLink to="/encuestas/1/1" class="btn btn-link text-dark px-3 mb-0"
                                        href="javascript:;"><i class="fas fa-pencil-alt text-dark me-2"
                                            aria-hidden="true"></i>Edit</nuxtLink>
                                </div>
                            </li>
                            <li class="list-group-item border-0 mb-2 bg-gray-100 border-radius-lg w-100"
                                style="margin: 0 3px;">
                                <div class="d-flex flex-column">
                                    <h6 class="text-sm">Tiempo de entrega</h6>
                                    <span class="mb-2 text-xs"> Options<span
                                            class="text-dark font-weight-bold ms-sm-2">Multiple</span></span>
                                </div>
                                <div class="ms-auto text-center ">
                                    <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                            class="far fa-trash-alt me-2"></i>Delete</a>
                                    <nuxtLink to="/encuestas/1/1" class="btn btn-link text-dark px-3 mb-0"
                                        href="javascript:;"><i class="fas fa-pencil-alt text-dark me-2"
                                            aria-hidden="true"></i>Edit</nuxtLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- crad info cada pregunta -->
            <div class="col-md-12 mt-4">
                <div class="card">
                    <div class="flex" style="justify-content: space-between; align-items: baseline;">
                        <div class="card-header pb-0 px-3">
                            <h6 class="mb-0 text-center">¿Nos Recomendarias?</h6>
                            <!-- <p class="mb-0 text-center">Comidas</p> -->
                        </div>
                        <div class="ms-auto text-center ">
                            <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                    class="far fa-trash-alt me-2"></i></a>
                            <nuxtLink to="/encuestas/1" class="btn btn-link text-dark px-3 mb-0" href="javascript:;"><i
                                    class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i></nuxtLink>
                        </div>
                    </div>
                    <div class="card-body p-3">
                        <ul class="list-group flex_card_question">
                            <!-- todas la sub categorias -->
                            <li class=" list-group-item border-0 mb-2 bg-gray-100 border-radius-lg w-100"
                                style="margin: 0 3px">
                                <div class="d-flex flex-column">
                                    <h6 class="text-sm">Default</h6>
                                    <span class="mb-2 text-xs"> Options<span
                                            class="text-dark font-weight-bold ms-sm-2">01/ 10</span></span>
                                </div>
                                <div class="ms-auto text-center ">
                                    <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i
                                            class="far fa-trash-alt me-2"></i>Delete</a>
                                    <nuxtLink to="/encuestas/1" class="btn btn-link text-dark px-3 mb-0"
                                        href="javascript:;"><i class="fas fa-pencil-alt text-dark me-2"
                                            aria-hidden="true"></i>Edit</nuxtLink>
                                </div>
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
    name: 'FeedbackAppId',

    data() {
        return {
            id: null,
        };
    },

    mounted() {

    },
    created() {
        this.id = this.$route.params.id
        console.log(this.$route)
    },

    methods: {

    },
};
</script>

<style>
.flex_card_question {
    display: flex;
    justify-content: center;
    flex-direction: row;
}

@media screen and (max-width:700px) {
    .flex_card_question {
        flex-direction: column !important;
    }
}
</style>