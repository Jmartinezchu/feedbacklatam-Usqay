<template>
    <div>
        <v-tour name="home" :steps="steps" :options="myOptions"></v-tour>
        <v-navigation-drawer :mini-variant.sync="miniVariant" :clipped="clipped" v-model="drawer" fixed app>
            <v-list>
                <v-list-tile style="margin:10px 0">
                    <v-list-tile-action>
                        <v-btn icon @click.stop="miniVariant = !miniVariant">
                            <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
                        </v-btn> </v-list-tile-action>
                    <v-list-tile-content v-if="user.rol_id != 5" style="height:80px">
                        <!-- <img style="width: 80px; margin: 0 ;" class="rounded-circle py-1"
                            :src="`${images}/${companie.filename}`" alt=""> -->
                        <img style="width: 130px; margin: 0 ;" src="/img/Logo.png" alt="">
                    </v-list-tile-content>
                    <v-list-tile-content v-if="user.rol_id === 5" style="height:80px">
                        <!-- <img style="width: 80%; margin: 0 ;" class="" :src="`${images}/1679406402252-Logo.png`" alt=""> -->
                        <img style="width: 130px; margin: 0 ;" src="/img/Logo.png" alt="">
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="user.rol_id != 5" router :to="`/${companie.name}/${item.route}`" :key="i"
                    v-for="(item, i) in items" exact>
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-if="user.rol_id === 5" router :to="`/${user.nameCompanie}/${item.route}`" :key="i"
                    v-for="(item, i) in items" exact>
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="user.rol_id != 5" router :to="`/${companie.name}`" exact>
                    <v-list-tile-action>
                        <v-icon>account_circle</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Perfil</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="user.rol_id === 5" router :to="`/${user.nameCompanie}`">
                    <v-list-tile-action>
                        <v-icon>account_circle</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Perfil</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="getCloce()" exact>
                    <v-list-tile-action>
                        <v-icon>logout</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Salir</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

            </v-list>

        </v-navigation-drawer>
        <v-toolbar fixed app :clipped-left="clipped">
            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>
                <!-- <img :src="`${images}/1679406402252-Logo.png`" alt="Logo Empresa" style="width: 130px"> -->
                <img src="/img/Logo.png" alt="Logo Empresa" style="width: 130px">
            </v-toolbar-title>
            <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-btn> -->
            <v-spacer></v-spacer>
            <!-- <nuxt-link :to="`/${companie.name}/notificaciones`">
                <v-btn icon>
                    <v-icon>notifications_active</v-icon>
                </v-btn>
            </nuxt-link> -->
            <nuxt-link v-if="user.rol_id != 5" :to="`/${companie.name}`">
                <v-btn icon>
                    <v-icon>account_circle</v-icon>
                </v-btn>
            </nuxt-link>
            <nuxt-link v-if="user.rol_id === 5" :to="`/${user.nameCompanie}`">
                <v-btn icon>
                    <v-icon>account_circle</v-icon>
                </v-btn>
            </nuxt-link>
            <div>
                <v-btn @click="getCloce()" icon>
                    <v-icon>logout</v-icon>
                </v-btn>
            </div>
            <div></div>
        </v-toolbar>
    </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../../api/API_feedback';
import images from '../../api/URL_imges';

export default {
    name: 'FeedbackAppHeaderPanel',

    data() {
        return {
            companie: {},
            user: {},
            images: images,
            clipped: true,
            drawer: true,
            items: [],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Feedback',
            myOptions: {
                useKeyboardNavigation: true,
                labels: {
                    buttonSkip: 'Terminar',
                    buttonPrevious: 'Atras',
                    buttonNext: 'Siguiente',
                    buttonStop: 'Finalizar'
                }
            },
            steps: [
                {
                    target: '[data-v-step="0"]',  // We're using document.querySelector() under the hood
                    content: `Aqui estas ahora`,
                    params: {
                        placement: 'left'
                    }
                },
                {
                    target: '[data-v-step="1"]',
                    content: 'Despues de crear tu sucursal, aqui se visualizara con los datos que has creado',
                    params: {
                        placement: 'left'
                    }
                },
                {
                    target: '[data-v-step="2"]',
                    content: 'Aqui puedes modificar datos de la sucursal',
                    params: {
                        placement: 'left'
                    }
                },
                {
                    target: '[data-v-step="3"]',
                    content: 'Aqui puedes elimirar la sucursal',
                    params: {
                        placement: 'left'
                    }
                }
            ]
        }
    },
    //     watch:{
    //     name(newName) {
    //       localStorage.name = newName;
    //     }
    //   },
    async mounted() {
        // Swal.fire({
        //     icon: 'success',
        //     title: 'Procesando...',
        //     showConfirmButton: false,
        //     didOpen: () => {
        //         Swal.showLoading()
        //     },
        //     timer: 3500
        // })
        this.user = JSON.parse(localStorage.getItem("user"))
        this.companie = JSON.parse(localStorage.getItem("companie"))
        this.items = JSON.parse(localStorage.getItem("items"))
        // console.log(this.companie);

        // console.log(this.companie.rol_id);
        // let idRol = this.user.rol_id;
        // await this.getRoutes(idRol);
        // await this.getDataCompanie()
        // this.iniciar()
    },

    methods: {
        iniciar() {
            this.$tours['home'].start();
        },
        async getDataCompanie() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/companies/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.companie = data[0]
            localStorage.setItem("companie", JSON.stringify(data[0]));
            // console.log(data[0]);
        },
        agregarStep() {
            this.steps.push({
                target: '[data-v-step="0"]',  // We're using document.querySelector() under the hood
                content: `Aqui estas ahora`,
                params: {
                    placement: 'left'
                }
            },)
        },
        async getRoutes(id) {
            const data = await this.$axios.$get(`${Api}/login/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            this.items = data
            // console.log(data);
        },
        getCloce() {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: '¿Seguro de Cerrar Sessión?',
                text: "Se cerará la sessión",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, Salir!',
                cancelButtonText: 'No, cancelar!',
                reverseButtons: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // console.log('funcion Actualizar')
                    swalWithBootstrapButtons.fire(
                        {
                            title: 'Saliendo!',
                            // text: 'Se Actualizaron los datos',
                            icon: 'success',
                            showConfirmButton: false,

                            timer: 1500,
                        }
                    ).then(() => {
                        // Aquí la alerta se ha cerrado
                        localStorage.removeItem('user');
                        localStorage.removeItem('companie');
                        localStorage.removeItem('datacompanie');
                        localStorage.removeItem('items');
                        location.href = `/auth/login`
                    })
                    // location.href = `/auth/login`;
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    // console.log('no se crea')
                }
            })
        }
    },
};
</script>

<style scoped>
::-webkit-scrollbar {
    display: none;
}
</style>