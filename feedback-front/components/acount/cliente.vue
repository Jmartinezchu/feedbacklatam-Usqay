<template>
    <div>
        <div class="row mb-4 justify-content-center">
            <div class="col-md-4">
                <div class="card card-profile">
                    <!-- <img src="img/bg-profile.jpg" alt="Image placeholder" class="card-img-top"> -->
                    <div style="height:70px"></div>
                    <div class="row justify-content-center">
                        <div class="col-4 col-lg-4 order-lg-2">
                            <div class="mt-n4 mt-lg-n6 mb-lg-0">
                                <!-- <a href="javascript:;"> -->
                                <!-- <img :src="`${images}/1679406402252-Logo.png`"
                                    class=" img-fluid border border-2 border-white"> -->
                                <img src="/img/Logo.png" class=" img-fluid border border-2 border-white">
                                <!-- </a> -->
                            </div>
                        </div>
                    </div>
                    <!-- <div class="text-center mt-4">
                        <h5>
                            {{ companie.name }}<span class="font-weight-light">, {{ companie.city }}</span>
                        </h5>
                        <div class="h6 font-weight-300">
                            <i class="ni location_pin mr-2"></i>{{ user.nameRol }}
                        </div>
                    </div> -->
                    <!-- <div class="card-body pt-0">
                        <div class="row">
                            <div class="col">
                                <div class="d-flex justify-content-center">

                                    <div class="d-grid text-center">
                                        <span class="text-lg font-weight-bolder">2</span>
                                        <span class="text-sm opacity-8">Sursales</span>
                                    </div>

                                    <div class="d-grid text-center">
                                        <span class="text-lg font-weight-bolder">3</span>
                                        <span class="text-sm opacity-8">Encuentas</span>
                                    </div>

                                    <div class="d-grid text-center mx-4">
                                        <span class="text-lg font-weight-bolder">50</span>
                                        <span class="text-sm opacity-8">Encuesdos</span>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div> -->
                </div>
            </div>
        </div>
        <!-- perfil cuenta -->
        <div class="card shadow-lg mb-3">
            <div class="card-body p-3">
                <div class="row gx-4">
                    <div class="col-auto">
                        <div class="avatar avatar-xl position-relative">
                            <v-icon>account_circle</v-icon>
                        </div>
                    </div>
                    <div class="col-auto my-auto">
                        <div class="h-100">
                            <h5 class="mb-1">
                                {{ user.nameCompanie }}
                            </h5>
                            <p class="mb-0 font-weight-bold text-sm">
                                {{ user.email }}
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                        <div class="nav-wrapper position-relative end-0">
                            <ul class="nav nav-pills nav-fill p-1" role="tablist">
                                <li v-if="user.rol_id != 2" class="nav-item mx-2">
                                    <nuxtLink class="nav-link mb-0 px-0 py-1 " :to="`/${user.nameCompanie}/configuracion`"
                                        role="tab" aria-selected="false">
                                        <i class="ni ni-settings-gear-65"></i>
                                        <span class="ms-2">Configuracion</span>
                                    </nuxtLink>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card shadow-lg mb-3">
            <div class="card-body p-3">
                <div class="row gx-4">
                    <div class="col-auto">
                        <div class="avatar avatar-xl position-relative">
                            <v-icon>badge</v-icon>
                        </div>
                    </div>
                    <div class="col-auto my-auto">
                        <div class="h-100">
                            <h5 class="mb-1">
                                Telefono / Celular
                            </h5>
                            <p class="mb-0 font-weight-bold text-sm">
                                {{ user.celular }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row gx-4" v-if="user.doc != null && user.doc != ''">
                    <div class="col-auto">
                        <div class="avatar avatar-xl position-relative">
                            <v-icon>badge</v-icon>
                        </div>
                    </div>
                    <div class="col-auto my-auto">
                        <div class="h-100">
                            <h5 class="mb-1">
                                Doc. Identidad
                            </h5>
                            <p class="mb-0 font-weight-bold text-sm">
                                {{ user.doc }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row gx-4">
                    <div class="col-auto">
                        <div class="avatar avatar-xl position-relative">
                            <v-icon>badge</v-icon>
                        </div>
                    </div>
                    <div class="col-auto my-auto">
                        <div class="h-100">
                            <h5 class="mb-1">
                                Fecha de Nacimiento
                            </h5>
                            <p class="mb-0 font-weight-bold text-sm">
                                {{ user.fechaNacimiento }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="user.direccion != null" class="card shadow-lg mb-3">
            <div class="card-body p-3">
                <div class="row gx-4">
                    <div class="col-auto">
                        <div class="avatar avatar-xl position-relative">
                            <v-icon>badge</v-icon>
                        </div>
                    </div>
                    <div class="col-auto my-auto">
                        <div class="h-100">
                            <h5 class="mb-1">
                                Ubicacion
                            </h5>
                            <p class="mb-0 font-weight-bold text-sm">
                                {{ user.direccion }} - {{ user.ciudad }} - {{ user.pais }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <pre>{{ user }}</pre> -->
    </div>
</template>

<script>
import Api from '../../api/API_feedback'
import images from '../../api/URL_imges'
export default {
    name: 'FeedbackAppIndexAccount',

    data() {
        return {
            sheet: false,
            user: [],
            images: images,
            companie: {},
            hora: new Date().toLocaleTimeString()
        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"))
        this.companie = JSON.parse(localStorage.getItem("companie"))
        // await this.getDataCompanie()

    },


    methods: {
        // async getDataCompanie() {
        //     let id = this.user.idCompanie
        //     const data = await this.$axios.$get(`${Api}/companies/` + id).catch(error => {
        //         console.log('Request canceled', error)
        //     })
        //     this.companie = data[0]
        //     // console.log(data[0]);
        // },
    },
};
</script>

<style lang="scss" scoped></style>