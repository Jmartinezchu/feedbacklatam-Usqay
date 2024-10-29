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
                                <label v-if="lengthlinks != 20" @click="aumentar()"
                                    class="btn btn-secondary mt-2 w-10 btn_yes_no">
                                    +</label>
                                <label v-if="lengthlinks != lengthIni" @click="disminuir()"
                                    class="btn btn-secondary mt-2 w-10 btn_yes_no">
                                    - </label>
                                <label class="btn mt-2  " style="cursor: auto;"> Links = {{ lengthlinks }}
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <v-select v-model="dataEdit.id_sucursal" :items="sucursales" menu-props="auto"
                                    :item-text="sucursales => `${sucursales.name} / ${sucursales.city} `" item-value="id"
                                    label="Selecciona tu sucursal" hide-details prepend-icon="other_houses"
                                    dense></v-select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="card-body">
                            <div class="row mb-2" v-for="(link, i) in dataEdit.qr_linksdata" :key="i"
                                style="box-shadow: 0px 0px 1px 0px black; border-radius: 5px;">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <v-text-field v-model="link.name" label="Nombre o identificador"
                                            :rules="rules"></v-text-field>
                                    </div>
                                </div>
                                <div class="col-md-7">
                                    <div class="form-group">
                                        <v-text-field v-model="link.link" label="Link" :rules="rules"></v-text-field>
                                    </div>
                                </div>
                                <div v-if="lengthlinkstodo != 1" class="col-md-1"
                                    style="text-align: center; margin: auto; cursor: pointer;">
                                    <div v-if="link.id != undefined" class="form-group"
                                        @click="deleteLink(dataEdit.qr_linksdata, link.id, i)">
                                        <v-icon class="hoverdelete">delete</v-icon>
                                    </div>
                                </div>
                            </div>

                            <hr class="horizontal dark">
                        </div>
                        <button @click="getCreate(dataEdit)" class="btn btn-danger btn-sm ms-auto mx-5" data-v-step="2"
                            style="font-size: 15px;">Editar <v-icon
                                style="color:#fff;font-size: 15px;">qr_code</v-icon></button>

                        <!-- <pre>{{ dataEdit }}</pre> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '../../../../api/API_feedback';
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
    name: 'FeedbackAppCreate',
    components: {
    },
    data() {
        return {
            ruta: this.$route.params,
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

            dataEdit: {},
            lengthlinks: 0,
            lengthIni: 0,
            lengthlinkstodo: 0,
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
        // let arrregisterLinks = JSON.parse(localStorage.getItem("qrLinks"))

        this.user = JSON.parse(localStorage.getItem("user"));
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        await this.getSucursales(this.datacompanie.lists.sucursales)
        this.getDatalinks(this.datacompanie.lists.multilinks);

    },

    methods: {
        async deleteLink(arraylinks, id, i) {
            const data = await this.$axios.$delete(`${Api}/qrlinks/links/one/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            arraylinks.splice(i, 1);
            this.actualizarData();
            this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"));
            this.getDatalinks(this.datacompanie.lists.multilinks);
        },
        async actualizarData() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/home/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            localStorage.setItem("datacompanie", JSON.stringify(data));
        },

        getDatalinks(array) {
            // console.log(array);
            for (let index = 0; index < array.length; index++) {
                if (array[index].id == this.ruta.idQr) {
                    this.dataEdit = array[index]
                    this.lengthlinks = this.dataEdit.qr_linksdata.length
                    this.lengthlinkstodo = this.dataEdit.qr_linksdata.length
                    this.lengthIni = this.lengthlinks
                    // console.log(array[index]);
                }
                // console.log(array[index].id, this.ruta.idNotification);
            }
        },
        async getSucursales(sucursalestodos) {
            let lengthsucu = sucursalestodos.length
            for (let index = 0; index < lengthsucu; index++) {
                if (sucursalestodos[index].state === 1) {
                    this.sucursales.push(sucursalestodos[index])
                }
            }
        },
        disminuir() {
            if (this.lengthlinks != this.lengthIni) {
                this.dataEdit.qr_linksdata.pop();
                this.lengthlinks--
            }
        },
        aumentar() {
            if (this.lengthlinks < 20) {
                this.agregarlink();
                this.lengthlinks++
            }
        },
        agregarlink() {
            this.dataEdit.qr_linksdata.push({
                link: '',
                name: '',
                id_register_links: this.ruta.idQr
            },)
        },


        async addQr(data) {
            const params = {
                dataeditQr: data
            }
            const registro = await this.$axios.$put(`${Api}/qrlinks/links/${data.id_companie}/${data.id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            await this.actualizarData()
            // console.log(registro);
        },

        iniciar() {
            this.$tours['createpersonal'].start();
        },
        getCreate(data) {
            let contadorArray = 0
            let arraylinks = data.qr_linksdata;
            const lengtharry = arraylinks.length
            for (let index = 0; index < lengtharry; index++) {
                if (arraylinks[index].link != '' && arraylinks[index].name != '') {
                    contadorArray++
                }
            }
            if (contadorArray != lengtharry) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Todos los campos son necesarios',
                    text: 'Faltan campos por completar',
                    confirmButtonColor: '#ff0000'
                })
            } else {
                // console.log('enviamos data');
                this.añadirListalinks(data)
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
                title: `¿Seguro de modificar la lista de links?`,
                text: "Se generará el Qr",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-save me-2"></i> Si, Modificar!',
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

.hoverdelete:hover {
    color: red;
}
</style>