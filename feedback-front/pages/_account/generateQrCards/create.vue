<template>
    <div>
        <v-tour name="createpersonal" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/${user.nameCompanie}/generateQrCards`">
                    <div data-v-step="3"
                        style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <v-btn icon>
                            <v-icon>arrow_back_ios_new</v-icon>
                        </v-btn>
                        <strong class="text-dark pr-2">
                            <h5>Regresar -</h5>
                        </strong>
                    </div>
                </nuxt-link>
                <div class="mt-2">
                    <h5>Genera Aqui tu QR </h5>
                </div>
            </div>

            <div class="col-3 text-center">
                <button @click="iniciar" class="d-flex">
                    <v-icon>mouse</v-icon>
                    <h6> ¿Como funciona esta pantalla?</h6>
                </button>
            </div>
        </div>
        <div class="row">

            <div class="col-md-12 mb-3" data-v-step="0">
                <div class="card">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label v-if="dataSubmit.links.length != 20" @click="aumentar()"
                                    class="btn btn-secondary mt-2 w-10 btn_yes_no">
                                    +</label>
                                <label v-if="dataSubmit.links.length != 1" @click="disminuir()"
                                    class="btn btn-secondary mt-2 w-10 btn_yes_no">
                                    - </label>
                                <label class="btn mt-2  " style="cursor: auto;"> Links = {{ dataSubmit.links.length }}
                                </label>

                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <v-select v-model="dataSubmit.id_sucursal" :items="sucursales" menu-props="auto"
                                    :item-text="sucursales => `${sucursales.name} / ${sucursales.city} `" item-value="id"
                                    label="Selecciona tu sucursal" hide-details prepend-icon="other_houses"
                                    dense></v-select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="card-body">
                            <div class="row mb-2" v-for="(link, i) in dataSubmit.links" :key="i"
                                style="box-shadow: 0px 0px 1px 0px black; border-radius: 5px;">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <v-text-field v-model="link.name" label="Nombre o identificador"
                                            :rules="rules"></v-text-field>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <div class="form-group">
                                        <v-text-field v-model="link.link" label="Link" :rules="rules"></v-text-field>
                                    </div>
                                </div>
                            </div>

                            <hr class="horizontal dark">
                        </div>
                        <button @click="getCreate(dataSubmit)" class="btn btn-danger btn-sm ms-auto mx-5" data-v-step="2"
                            style="font-size: 15px;">Generar QR <v-icon
                                style="color:#fff;font-size: 15px;">qr_code</v-icon></button>
                        <!-- <pre>{{ dataSubmit }}</pre> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '../../../api/API_feedback';
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
    name: 'FeedbackAppCreate',
    components: {
    },
    data() {
        return {
            contador: 1,
            aumentarbtn: true,
            disminuirbtn: false,
            roles: [],
            rules: [
                value => !!value || 'Required.',
                value => (value && value.length >= 3) || 'Min 3 characters',
            ],
            rol: null,
            user: [],
            datacompanie: {},
            sucursales: [],
            encuestas: [],

            dataSubmit: {
                id_companie: null,
                id_sucursal: null,
                id_user: null,
                links: [
                    {
                        link: '',
                        name: '',
                        id_register_links: null
                    },
                ],
            },

            links: [
                {
                    link: '',
                    nombre: '',
                    autor: null,
                    gmail: null,
                    id_companie: null,
                },
            ],
            qrLink: {
                link: '',
                nombre: '',
                autor: null,
                gmail: null,
                id_companie: null,
            },


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
                    content: `Completa todos los datos de este formulario`,
                    params: {
                        placement: 'top'
                    }
                },//Regresa a tus cupones <strong>Aqui</strong>! 
                {
                    target: '[data-v-step="1"]',
                    content: `<strong>Con este campo</strong> podra ingresar al sistema`,
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '[data-v-step="2"]',
                    content: 'Luego de completar todos los capos del formulario click para crear',
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '[data-v-step="3"]',
                    content: `<strong>Aqui</strong> para regresar a ver tus Cupones`,
                    params: {
                        // placement: 'top'
                    }
                }
            ]
        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.dataSubmit.id_companie = this.user.idCompanie;
        this.dataSubmit.id_user = this.user.idUser;
        // this.links[0].gmail = this.user.email
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        // this.sucursalestodos = 
        await this.getSucursales(this.datacompanie.lists.sucursales)
    },

    methods: {
        async getSucursales(sucursalestodos) {
            let lengthsucu = sucursalestodos.length
            for (let index = 0; index < lengthsucu; index++) {
                if (sucursalestodos[index].state === 1) {
                    this.sucursales.push(sucursalestodos[index])
                }
            }
        },
        disminuir() {
            if (this.dataSubmit.links.length > 1) {
                this.dataSubmit.links.pop();
            }
        },
        aumentar() {
            if (this.dataSubmit.links.length < 20) {
                this.agregarlink();
            }
        },
        agregarlink() {
            this.dataSubmit.links.push({
                link: '',
                name: '',
                id_register_links: null
            },)
        },


        async addQr(data) {
            const params = {
                dataRegisterLinks: data
            }
            const registro = await this.$axios.$post(`${Api}/qrlinks/links`, params).catch(error => {
                console.log('Request canceled', error)
            })
            let id = this.user.idCompanie
            const datahome = await this.$axios.$get(`${Api}/home/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            localStorage.setItem("datacompanie", JSON.stringify(datahome));

            // console.log(registro);
        },

        iniciar() {
            this.$tours['createpersonal'].start();
        },
        getCreate(data) {
            if (data.id_sucursal != null) {
                let contadorArray = 0
                let arraylinks = data.links;
                for (let index = 0; index < arraylinks.length; index++) {
                    if (arraylinks[index].link != '' && arraylinks[index].name != '') {
                        contadorArray++
                    }
                }
                if (contadorArray != arraylinks.length) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Todos los campos son necesarios',
                        text: 'Faltan campos por completar',
                        confirmButtonColor: '#ff0000'
                    })
                } else {
                    this.añadirListalinks(data)
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Seleciona una sucursal!',
                    confirmButtonColor: '#ff0000'
                })
            }
        },
        añadirListalinks(data) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
                title: `¿Seguro de crear la lista de links?`,
                text: "Se generará el Qr",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-save me-2"></i> Si, Crear!',
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
                    this.addQr(data)
                    swalWithBootstrapButtons.fire(
                        {
                            title: 'Creado!',
                            text: 'Se creo el Qr',
                            icon: 'success',
                            timer: 2000,
                        }
                    ).then(() => {
                        // console.log('ruta a index');
                        location.href = `/${this.user.nameCompanie}/generateQrCards`
                    });
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    // console.log('no se crea')
                }
            })
        },
    },
};
</script>

<style>
.Blurred {
    display: none !important;
}
</style>