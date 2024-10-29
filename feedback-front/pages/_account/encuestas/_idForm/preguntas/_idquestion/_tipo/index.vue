<template>
    <div>
        <div class="flex" style="align-items:center ">
            <div class="col-9 flex">
                <nuxt-link :to="`/${companie.name}/encuestas/${route.idForm}/preguntas`">
                    <div style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <!-- <h6>Crear</h6> -->
                        <v-btn icon>
                            <v-icon>arrow_back_ios_new</v-icon>
                        </v-btn>
                        <strong class="text-dark pr-2">
                            <h5>Regresar -</h5>
                        </strong>
                    </div>
                </nuxt-link>
                <div>
                    <h5 class="mt-2">Modificar pregunta</h5>
                </div>
            </div>

        </div>
        <div class="row">
            <div class="col-md-12 mb-3">
                <div class="card">
                    <div>
                        <div class="card-body">
                            <div class="row">
                                <div v-if="typeQuestion === 'simple'">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="example-text-input" class="form-control-label">Ingresa el
                                                titulo</label>
                                            <input class="form-control" type="text" value="" v-model="qstSimple.titulo"
                                                placeholder="Estadia">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <div class="row">
                                                            <div class="col-md-2">
                                                                <label class="form-control-label">
                                                                    <v-dialog v-model="dialog" width="500">
                                                                        <template v-slot:activator="{ on, attrs }">
                                                                            <button v-bind="attrs" v-on="on">
                                                                                <div class="flex"
                                                                                    style="align-items: center;">
                                                                                    <span>Como Añadir Icono</span>
                                                                                    <v-icon class="mx-2">info</v-icon>
                                                                                </div>


                                                                            </button>
                                                                        </template>
                                                                        <v-card>
                                                                            <v-card-title class="text-h5 grey lighten-2">
                                                                                Añadir un icono
                                                                            </v-card-title>

                                                                            <v-card-text>
                                                                                Windows: <br>
                                                                                <span style="opacity: 0;">---</span>Pulsa
                                                                                Windows
                                                                                + . (Punto) y selecciona el Emoji de tu
                                                                                preferencia<br>
                                                                                Mac: <br>
                                                                                Pulsa Control + Comando + espacio. Haz clic
                                                                                en el menú Teclado de la barra de menús y
                                                                                selecciona “Mostrar emojis y símbolos”. <br>
                                                                            </v-card-text>

                                                                            <v-divider></v-divider>

                                                                            <v-card-actions>
                                                                                <v-spacer></v-spacer>
                                                                                <v-btn color="bg-danger text-white" text
                                                                                    @click="dialog = false">
                                                                                    ok
                                                                                </v-btn>
                                                                            </v-card-actions>
                                                                        </v-card>
                                                                    </v-dialog>
                                                                </label>
                                                                <!-- {{ qstSimple.icon.length }} -->
                                                                <input class="form-control" pattern="[]{1,15}" type="text"
                                                                    value="" @change="validLengthIcon(qstSimple.icon)"
                                                                    v-model="qstSimple.icon" placeholder="windows + .">
                                                            </div>
                                                            <div class="col-md-10 pt-2">
                                                                <label for="example-text-input"
                                                                    class="form-control-label">Ingresa la pregunta
                                                                </label>
                                                                <input class="form-control" type="text"
                                                                    v-model="qstSimple.question" value=""
                                                                    placeholder="¿Que te parecio la estadia dentro del local?">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <pre>{{ qstSimple }}</pre> -->
                                </div>

                                <div v-if="typeQuestion === 'multiple'">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="example-text-input" class="form-control-label">Ingresa el
                                                Area General de trabajo</label>
                                            <input class="form-control" type="text" value="" placeholder="Atencion"
                                                v-model="qstMultiple.titulo">
                                            <label for="example-text-input" class="form-control-label">Ingresa la pregunta
                                            </label>
                                            <input class="form-control" type="text" v-model="qstMultiple.question"
                                                placeholder="¿Como calificas el servicio de Atención?">
                                        </div>
                                        <div class="form-group">
                                            <label @click="aumentar()" class="btn btn-secondary mt-2 w-10 btn_yes_no">
                                                +</label>
                                            <label @click="disminuir()" class="btn btn-secondary mt-2 w-10 btn_yes_no">
                                                - </label>
                                            <label class="btn mt-2  " style="cursor: auto;"> Areas = {{ contador }}
                                            </label>
                                            <label class="btn mt-2  " style="cursor: auto;">
                                                <v-dialog v-model="dialog" width="500">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <button v-bind="attrs" v-on="on">
                                                            <div class="flex" style="align-items: center;">
                                                                <span>Como Añadir Icono</span>
                                                                <v-icon class="mx-2">info</v-icon>
                                                            </div>


                                                        </button>
                                                    </template>
                                                    <v-card>
                                                        <v-card-title class="text-h5 grey lighten-2">
                                                            Añadir un icono
                                                        </v-card-title>

                                                        <v-card-text>
                                                            Windows: <br>
                                                            <span style="opacity: 0;">---</span>Pulsa
                                                            Windows
                                                            + . (Punto) y selecciona el Emoji de tu
                                                            preferencia<br>
                                                            Mac: <br>
                                                            Pulsa Control + Comando + espacio. Haz clic
                                                            en el menú Teclado de la barra de menús y
                                                            selecciona “Mostrar emojis y símbolos”. <br>
                                                        </v-card-text>

                                                        <v-divider></v-divider>

                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn color="bg-danger text-white" text
                                                                @click="dialog = false">
                                                                ok
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                            </label>
                                        </div>


                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <div class="row" v-for="(data, index) in qstMultiple.sub_titulos" :key="index">
                                                <div class="col-md-2">
                                                    <label class="form-control-label">Icono {{ index + 1 }}</label>
                                                    <input class="form-control" type="text" v-model="data.icon"
                                                        @change="validLengthIconMultiple(data.icon, qstMultiple.sub_titulos, index)"
                                                        placeholder="windows + .">
                                                    <div>
                                                    </div>
                                                </div>
                                                <div class="col-md-10 pt-2">
                                                    <label for="example-text-input" class="form-control-label">Area
                                                        {{ index + 1 }}</label>
                                                    <input class="form-control" type="text" value="" v-model="data.titulo"
                                                        placeholder="Meseros">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <pre>{{ qstMultiple }}</pre> -->
                                </div>
                            </div>
                            <hr class="horizontal dark">
                        </div>
                        <div>
                            <!-- <pre class="m-0">{{ question }}</pre> -->
                        </div>

                        <button v-if="typeQuestion === 'simple'" @click.prevent="updateQuestionSimple(qstSimple)"
                            class="btn btn-danger btn-sm ms-auto mx-5" style="font-size: 15px;">Editar</button>
                        <button v-if="typeQuestion === 'multiple'" @click.prevent="validarQuestionMultiple(qstMultiple)"
                            class="btn btn-danger btn-sm ms-auto mx-5" style="font-size: 15px;">Editar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EmojiPicker from 'vue-emoji-picker'
import { TwemojiTextarea } from "@kevinfaguiar/vue-twemoji-picker";
import EmojiData from "@kevinfaguiar/vue-twemoji-picker/emoji-data/en/emoji-all-groups.json";
import EmojiGroups from "@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json";
import Api from '../../../../../../../api/API_feedback.js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
// import VueEmoji from 'emoji-vue'
// import VEmojiPicker from 'v-emoji-picker';
// import packData from 'v-emoji-picker/data/emojis.json';

export default {

    name: 'FeedbackAppCreateQuestion',
    components: {
        "twemoji-textarea": TwemojiTextarea,
        // VueEmoji,
        // VEmojiPicker
        EmojiPicker
    },
    data() {
        return {
            companie: {},
            user: [],
            route: {},
            dialog: false,
            // pack: packData,
            emojiData: EmojiData,
            emojiGroups: EmojiGroups,
            id_Form: null,
            qstSimple: {
            },
            qstMultiple: {},
            input: '',
            search: '',


            myText: "🥗",
            typeQuestion: null,
            row: 0,
            contador: 2,
            lang: "en",
            valorEmoji: '',
            datacompanie: {},
        };
    },
    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.companie = JSON.parse(localStorage.getItem("companie"))
        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        this.route = this.$route.params
        this.typeQuestion = this.route.tipo
        // this.qstSimple.id_Form = this.$route.params.idForm
        // this.qstMultiple[0].id_Form = this.$route.params.idForm

        await this.verdataForm(this.datacompanie.lists.formularios);
        // await this.getDataCompanie()
    },
    computed: {
        getPlacement: function () {
            return `${-0.009 * (50 * -1 + 104)}em`;
        },
        greaterThanFifty: function () {
            return 51 > 50 ? `var(--roundness)` : `0`;
        },
        getHappinessColor: function () {
            return `rgba(255, ${50 + (50 / 100) * 50}, ${Math.floor((50 * -1) / 7.692) + 13}`;
        },
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus()
            },
        },
    },
    methods: {
        async verdataForm(forms) {
            let idform = this.route.idForm
            let idquestion = this.route.idquestion
            for (let index = 0; index < forms.length; index++) {
                if (idform == forms[index].id) {
                    for (let i = 0; i < forms[index].questions[0].length; i++) {
                        if (idquestion == forms[index].questions[0][i].id) {
                            // console.log(forms[index].questions[0][i]);
                            if (forms[index].questions[0][i].tipo === 'simple') {
                                this.qstSimple = forms[index].questions[0][i]
                                this.qstSimple.icon = String.fromCodePoint("0x" + forms[index].questions[0][i].icon)
                                console.log(this.qstSimple);
                            } else {
                                // console.log(forms[index].questions[0][i].sub_titulos);
                                this.qstMultiple = forms[index].questions[0][i]
                                for (let j = 0; j < this.qstMultiple.sub_titulos.length; j++) {
                                    this.qstMultiple.sub_titulos[j].icon = String.fromCodePoint("0x" + this.qstMultiple.sub_titulos[j].icon)
                                }
                            }
                        }
                    }
                }
            }
        },
        validLengthIcon(lengthIcon) {
            if (lengthIcon.length === 0) {
                Swal.fire(
                    {// position: 'top-end',
                        icon: 'error',
                        title: 'No hay nada en el campo del Icono',
                        text: 'Agrega o copia un icono',
                        // showConfirmButton: false,
                        timer: 2500
                    }
                )
                // console.log('no hay nada en el campo');
            } else if (lengthIcon.length != 2) {

                Swal.fire(
                    {// position: 'top-end',
                        icon: 'warning',
                        title: 'Es valido solo Iconos y sin espacios',
                        text: 'Revisa el Campo Icono',
                        // showConfirmButton: false,
                        // timer: 2500
                    }
                ).then((result) => {
                    if (result.isConfirmed) {
                        // console.log('funcion Crear')
                        this.qstSimple.icon = ''
                    }
                })
                // console.log('Es valido solo un Icono y sin espacios');
            } else {
                Swal.fire(
                    {// position: 'top-end',
                        icon: 'success',
                        title: 'Icono Valido',
                        text: 'Icono Correcto',
                        showConfirmButton: false,
                        timer: 1500
                    }
                )
                // console.log('todo correcto');
            }
        },
        validLengthIconMultiple(data, arr, pos) {
            if (data.length === 0) {
                Swal.fire(
                    {// position: 'top-end',
                        icon: 'error',
                        title: 'No hay nada en el campo del Icono',
                        text: 'Agrega o copia un icono',
                        // showConfirmButton: false,
                        // timer: 2500
                    }
                )
                // console.log('no hay nada en el campo');
            } else if (data.length != 2) {

                Swal.fire(
                    {// position: 'top-end',
                        icon: 'warning',
                        title: 'Es valido solo Iconos y sin espacios',
                        text: 'Revisa el Campo Icono',
                        // showConfirmButton: false,
                        // timer: 2500
                    }
                ).then((result) => {
                    if (result.isConfirmed) {
                        arr[pos].icon = ''
                        // console.log('se cambia');
                    }
                })
                // console.log('Es valido solo un Icono y sin espacios');
            } else {
                Swal.fire(
                    {// position: 'top-end',
                        icon: 'success',
                        title: 'Icono Valido',
                        text: 'Icono Correcto',
                        showConfirmButton: false,
                        timer: 1500
                    }
                )
                console.log('todo correcto');
            }
        },
        async updateQuestionSimple(qst) {
            if (qst.titulo != '' && qst.question != '' && qst.icon != '') {
                const params = {
                    titulo: qst.titulo,
                    question: qst.question,
                    icon: qst.icon.codePointAt(0).toString(16),
                }
                let idform = this.route.idForm
                let idquestion = this.route.idquestion
                let tipo = this.route.tipo
                // console.log(params)
                const data = await this.$axios.$put(`${Api}/question/${idform}/${idquestion}/${tipo}`, params).catch(error => {
                    console.log('Request canceled', error)
                })
                let idCompanie = this.user.idCompanie
                const datahome = await this.$axios.$get(`${Api}/home/${idCompanie}`).catch(error => {
                    console.log('Request canceled', error)
                })
                localStorage.setItem("datacompanie", JSON.stringify(datahome));
                // console.log(data);
                if (data === 'Actualizado!!') {
                    Swal.fire({
                        // position: 'top-end',
                        icon: 'success',
                        title: 'Pregunta Actualizado!!',
                        showConfirmButton: false,
                        timer: 1200
                    })
                    location.href = `/${this.companie.name}/encuestas/${this.route.idForm}/preguntas`
                } else {
                    Swal.fire({
                        // position: 'top-end',
                        icon: 'error',
                        title: 'No se Registro la pregunta',
                        text: 'Vuelve a intentarlo',
                        // showConfirmButton: false,
                        timer: 1200
                    })
                }
            } else {
                Swal.fire(
                    {// position: 'top-end',
                        icon: 'question',
                        title: 'Todos los campos son necesarios',
                        text: 'Faltan campos por completar',
                        // showConfirmButton: false,
                        timer: 1200
                    }
                )
            }

        },
        async validarQuestionMultiple(qst) {
            if (qst.titulo != '' && qst.question != '') {
                if (qst.sub_titulos.length != 1) {
                    let array = qst.sub_titulos
                    let contadorArray = 0
                    for (let index = 0; index < array.length; index++) {
                        if (array[index].titulo != null && array[index].titulo != "") {
                            contadorArray++
                        }
                    }
                    if (contadorArray != array.length) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Todos los campos son necesarios',
                            text: 'Faltan campos por completar',
                        })
                    } else {
                        await this.addQuestionMultiple(qst)
                    }
                } else {//validacion de una sola area ingresada
                    Swal.fire({
                        icon: 'warning',
                        title: 'No es multiple',
                        text: 'Para que sea una pregunta multime minimo tiene que tener dos Areas',
                        timer: 1500
                    })
                }
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Todos los campos son necesarios',
                    text: 'Para que sea una pregunta multime minimo tiene que tener dos Areas',
                    timer: 1500
                })
            }
        },
        async addQuestionMultiple(array) {
            let qst = array
            const params = {
                titulo: qst.titulo,
                question: qst.question,
                sub_titulos: qst.sub_titulos,
            }
            let idform = this.route.idForm
            let idquestion = this.route.idquestion
            let tipo = this.route.tipo
            const data = await this.$axios.$put(`${Api}/question/${idform}/${idquestion}/${tipo}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            let idCompanie = this.user.idCompanie
            const datahome = await this.$axios.$get(`${Api}/home/${idCompanie}`).catch(error => {
                console.log('Request canceled', error)
            })
            localStorage.setItem("datacompanie", JSON.stringify(datahome));
            // console.log(data);
            if (data === 'Actualizado!!') {
                Swal.fire({
                    // position: 'top-end',
                    icon: 'success',
                    title: 'Pregunta Actualizada!!',
                    showConfirmButton: false,
                    timer: 1200
                })
                location.href = `/${this.companie.name}/encuestas/${this.route.idForm}/preguntas`
            } else {
                Swal.fire({
                    // position: 'top-end',
                    icon: 'error',
                    title: 'No se Registro la pregunta',
                    text: 'Vuelve a intentarlo',
                    // showConfirmButton: false,
                    timer: 1200
                })
            }
        },
        async addSubAreas(qst) {
            const params = {
                titulo: qst.titulo,
                icon: qst.icon.codePointAt(0).toString(16),
                id_question: qst.id_question
            }
            const data = await this.$axios.$post(`${Api}/questionSub`, params).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
        },
        append(emoji) {
            this.input += emoji
        },
        insert(emoji) {
            this.input += emoji
        },
        onInput(event) {
            //event.data contains the value of the textarea
        },
        clearTextarea() {
            this.$refs.emoji.clear()
        },
        // selectEmoji(emoji) {
        //     console.log(emoji)
        // },
        agregarsubcategoria() {
            this.qstMultiple.sub_titulos.push({
                titulo: null,
                icon: '🥳',
                id_question: this.route.idquestion
            })
        },

        mostrar(txt) {
            const arr = txt.options;
            let todoArr = arr?.length;
            let paso = 100 / todoArr;
            let response = txt.res_question;
            let num_id_res = txt.id;
            let numStop = 100 / (todoArr - 1);
            for (let i = 0; i < todoArr; i++) {
                // let limbarr =txt.options[index].id;
                if (txt.val >= paso * i && txt.val <= paso * (i + 1)) {
                    response = arr[i].valor;
                    num_id_res = arr[i].id
                    txt.res_question = arr[i].id
                    txt.val = i * numStop;
                    // console.log(txt.res_question);
                }
            };
            return `${response}`;
        },

        disminuir() {
            if (this.contador > 2) {
                this.qstMultiple.sub_titulos.pop();
                this.contador--;
            } else {
                console.log("no se puede menos");

            }
        },
        aumentar() {
            if (this.contador < 3) {
                this.agregarsubcategoria(this.contador);
                this.contador++;

            } else {
                console.log("no se puede más");
            }
        },
    },
};
</script>

<style scoped>
.wrapper {
    position: relative;
    display: inline-block;
}

.regular-input {
    /* padding: 0.5rem 1rem; */
    border-radius: 3px;
    border: 1px solid #ccc;
    /* width: 20rem; */
    /* height: 12rem; */
    /* outline: none; */
}

.regular-input:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, .5);
}

.emoji-invoker {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
    padding: 0;
    background: transparent;
    border: 0;
}

.emoji-invoker:hover {
    transform: scale(1.1);
}

.emoji-invoker>svg {
    fill: #b1c6d0;
}

.emoji-picker {
    position: absolute;
    z-index: 1;
    font-family: Montserrat;
    border: 1px solid #ccc;
    width: 15rem;
    height: 20rem;
    overflow: scroll;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    background: #fff;
    box-shadow: 1px 1px 8px #c7dbe6;
}
</style>