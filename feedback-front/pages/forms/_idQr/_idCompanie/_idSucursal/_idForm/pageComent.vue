<template>
    <div class="container_index">
        <div class="card_todo_question">
            <topPage></topPage>
            <!-- <cardComent class="animate__animated animate__fadeInRight"></cardComent> -->
            <div class="animate__animated animate__fadeInRight">
                <div class="flex_center">
                    <div class="coment">
                        <h5>Estamos muy felices de que nos ayudes a mejorar</h5>
                        <p>Escribe aqui tus <span :style="{ color: colorText }">{{ typemsg }}</span></p>
                        <div v-if="stateAddCliente === 1" class="form-floating mb-3">
                            <strong>Registrate ahora y participa de los cupones</strong> <br>que esta y otras compañias
                            tienen
                            para ti 🥳
                        </div>
                        <div class="form-floating mb-3">
                            <textarea v-model="coment.comentario" class="form-control input_large"
                                placeholder="Dejanos tu comentraio" id="mensaje"></textarea>
                            <label for="floatingTextarea">* Dejanos aqui tus <span :style="{ color: colorText }">{{
                                typemsg
                            }}</span></label>
                        </div>

                    </div>
                </div>
            </div>
            <div class="animate__animated animate__fadeInRight">
                <div class="flex">
                    <div class="form-group">
                        <div class="form-floating mb-3">
                            <input v-model="form.celular" @change="verifyCliente()" type="number"
                                class="form-control input_large" id="floatingInput" placeholder="Ingresa tu Email">
                            <label for="floatingInput">* Celular</label>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="stateAddCliente != 0" class="animate__animated animate__fadeInRight">
                <div class="flex">
                    <div class="form-group">
                        <div class="form-floating mb-3">
                            <input v-model="form.nombre" type="text" class="form-control input_large" id="floatingInput"
                                placeholder="Tu nombre aqui">
                            <label for="floatingInput">* Nombres</label>
                            <!-- {{ form.nombre.length }}/50 -->
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <!-- <div class="row"> -->
                    <div class=" form-group">
                        <div class="form-floating mb-3">
                            <input v-model="form.nacimiento" type="date" class="form-control input_cort" id="floatingInput"
                                placeholder="Ingresa tu cumpleaños aqui">
                            <label for="floatingInput">* Cumpleaños</label>
                        </div>
                    </div>
                    <div class=" form-group">
                        <div class="form-floating mb-3">
                            <input @change="verifyEmail()" v-model="form.email" type="email" class="form-control input_cort"
                                id="floatingInput" placeholder="Ingresa tu celular aqui">
                            <label for="floatingInput">* Email</label>
                        </div>
                        <div v-if="validEmail === 1"
                            style="position: fixed;padding: auto;height: 25px; width: -webkit-fill-available; background-color: #98e398;border-radius: 5px;">
                            <label>
                                <span style="opacity: 0;">00</span>Email Valido</label>
                        </div>
                        <div v-if="validEmail === 0"
                            style="position: fixed;padding: auto;height: 25px; width: -webkit-fill-available; background-color: rgb(247 141 141);border-radius: 5px;">
                            <label>
                                <span style="opacity: 0;">00</span> Email ya a sido registrado</label>
                        </div>
                    </div>
                    <!-- </div> -->
                </div>
                <div class="">
                    <label class="form-check-label" for="rememberMe">* Campos obligatorios</label>
                </div>
            </div>
            <div class="btnPrimary">
                <nuxt-link
                    :to="`/forms/${this.route.idQr}/${route.idCompanie}/${route.idSucursal}/${route.idForm}/pageEnd`"><button
                        class="omitir">Omitir</button></nuxt-link>
                <a @click.prevent="getcreate()"><button>Enviar</button></a>
            </div>
            <div v-if="searchCliente != null" class="animate__animated animate__fadeInRight">
                <div class="flex">
                    <div class=" alert alert-success">
                        Hola <span style="font-size:18px"><strong>{{ searchCliente.nombre }}</strong></span> Gracias por
                        desarrollar una encuensta más con <sapn style="font-size:18px">
                            <strong>Feedback</strong>
                        </sapn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2/dist/sweetalert2';
import Api from '../../../../../../api/API_feedback';
export default {
    name: 'FeedbackComentEval',
    layout: 'clientes',
    data() {
        return {
            stateAddCliente: 0,
            route: {},
            oldCli: {},
            typemsg: null,
            confirEmail: null,
            text: '',
            identificadores: {
                Api: Api,
                id_companie: null,
                id_sucursal: null,
                id_form: null,
                id_cliente: null
            },

            id_cliente: null,
            linkEnd: null,
            coment: {
                comentario: "",
                id_typeComent: null,
                id_companie: null,
                id_sucursal: null,
                id_client: null
            },
            form: {
                doc: null,
                nombre: "",
                email: "",
                pais: null,
                celular: "",
                nacimiento: "",
                rol_id: 5,
            },
            searchCliente: null,
            validEmail: null
        }
    },
    mounted() {
        // history.forward()
        this.route = this.$route.params
        this.coment.id_companie = this.route.idCompanie
        this.coment.id_sucursal = this.route.idSucursal

        this.identificadores.id_companie = this.route.idCompanie
        this.identificadores.id_sucursal = this.route.idSucursal
        this.identificadores.id_form = this.route.idForm
        this.typemsg = JSON.parse(localStorage.getItem("typeEval"))
        this.getIdTypeComent()
        // this.verifyCupones()
    },

    computed: {
        colorText: function () {
            let postcolor = "";
            let text = this.typemsg;
            if (text == "Felicitaciones") {
                postcolor = `rgb(49, 221, 49)`; //verde
            } else if (text == "Sugerencias") {
                postcolor = `rgb(211, 187, 45)`;//amarillo
            } else if (text == "Reclamos") {
                postcolor = `rgb(234, 22, 22)`;//rojo
            }
            return postcolor;
        }
    },

    methods: {
        async getcreate() {
            if (this.stateAddCliente === 0) {
                if (this.form.celular != "" && this.coment.comentario != "") {
                    await this.addComent()
                    await this.sendEmail(this.searchCliente)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ingresar todos los datos!',
                        customClass: {
                            confirmButton: 'btn mx-1 btn-danger',
                            cancelButton: 'btn mx-1 btn-danger'
                        },
                    })
                    // console.log('ingresar todos los datos');
                }
            } else {
                if (this.form.nombre != "" && this.form.email != "" && this.form.celular != "" && this.form.nacimiento != "" && this.coment.comentario != "" && this.validEmail === 1) {
                    // console.log('se pide todo');
                    await this.addCliente()
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ingresar todos los datos!',
                        customClass: {
                            confirmButton: 'btn mx-1 btn-danger',
                            cancelButton: 'btn mx-1 btn-danger'
                        },
                    })
                    // console.log('ingresar todos los datos');
                }
            }
        },
        async verifyCliente() {
            if (this.form.celular === '') {
                this.form.celular = ""
                this.stateAddCliente = 0
                this.searchCliente = null
            } else {
                let celular = this.form.celular
                const data = await this.$axios.$get(`${Api}/clientes/verifiCel/${celular}`).catch(error => {
                    console.log('Request canceled', error)
                })
                // console.log(data);
                if (data.length === 0) {
                    this.stateAddCliente = 1
                    this.searchCliente = null
                } else {
                    this.stateAddCliente = 0
                    this.searchCliente = data[0]
                    // console.log(this.searchCliente);
                    this.coment.id_client = data[0].id;
                    this.id_cliente = data[0].id
                    this.identificadores.id_cliente = data[0].id
                    localStorage.setItem("identificadores", JSON.stringify(this.identificadores));
                }
            }

        },
        async verifyEmail() {
            if (this.form.email.length === 0) {
                this.form.email = ""
                this.validEmail = null
            } else {
                let email = this.form.email
                const data = await this.$axios.$get(`${Api}/clientes/email/${email}`).catch(error => {
                    console.log('Request canceled', error)
                })
                if (data.length === 0) {
                    this.validEmail = 1
                    // console.log('el email no existe');
                } else {
                    // console.log('si existe');
                    this.validEmail = 0
                }
            }

        },
        async addCliente() {
            const params = {
                doc: this.form.doc,
                nombre: this.form.nombre,
                email: this.form.email,
                pais: this.form.pais,
                celular: this.form.celular,
                nacimiento: this.form.nacimiento,
                rol_id: this.form.rol_id,
                id_companie: this.route.idCompanie,
                id_sucursal: this.route.idSucursal
            }
            const data = await this.$axios.$post(`${Api}/clientes`, params).catch(error => {
                console.log('Request canceled', error)
            })
            this.coment.id_client = data.deploy.insertId;
            this.id_cliente = data.deploy.insertId
            this.identificadores.id_cliente = data.deploy.insertId
            localStorage.setItem("identificadores", JSON.stringify(this.identificadores));
            await this.addComent()
            await this.sendEmail(params)
        },
        async sendEmail(dataCliente) {
            const dataemail = {
                typeComent: this.typemsg,
                cliente: dataCliente,
                empresa: {
                    idcompanie: this.identificadores.id_companie,
                    idsucursal: this.identificadores.id_sucursal
                }
            }
            // console.log('solo email y comentario');
            const sendEmail = await this.$axios.$post(`${Api}/email/`, dataemail).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(params);
            // await this.verifyCupones()
        },
        async addComent() {
            const params = {
                comentario: this.coment.comentario,
                id_typeComent: this.coment.id_typeComent,
                id_companie: this.coment.id_companie,
                id_sucursal: this.coment.id_sucursal,
                id_client: this.coment.id_client,
            }
            const data = await this.$axios.$post(`${Api}/comentarios`, params).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
            await this.verifyCupones()
        },
        async verifyCupones() {
            let id = this.route.idSucursal;
            const data = await this.$axios.$get(`${Api}/cupones/ruleta/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            // this.cupones = data;

            if (data.length >= 3) {
                localStorage.setItem("list_cupones", JSON.stringify(data));
                localStorage.setItem("cuponganado", JSON.stringify({}));
                location.href = `/forms/${this.route.idQr}/${this.route.idCompanie}/${this.route.idSucursal}/${this.route.idForm}/${this.id_cliente}`
            } else {
                location.href = `/forms/${this.route.idQr}/${this.route.idCompanie}/${this.route.idSucursal}/${this.route.idForm}/pageEnd`
            }
        },
        async getDNI() {
            let dni = this.form.doc
            const data = await this.$axios.$get(`https://clientapi.sistemausqay.com/dni.php?documento=${dni}`).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
            this.form.nombre = data.nombres + ' ' + data.apellidos
        },
        getIdTypeComent() {
            let text = this.typemsg;
            if (text == "Felicitaciones") {
                this.coment.id_typeComent = 1
            } else if (text == "Sugerencias") {
                this.coment.id_typeComent = 2
            } else if (text == "Reclamos") {
                this.coment.id_typeComent = 3
            }
        },
        onSubmit(event) {
            event.preventDefault()
            alert(JSON.stringify(this.form))
        },
        onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.form.nombres = '';
            this.form.cumpleaños = '';
            this.form.celular = null;
            this.form.email = null;
            this.form.checked = false;
        }
    },



};
</script>