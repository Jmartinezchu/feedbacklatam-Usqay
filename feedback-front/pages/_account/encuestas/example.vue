<template>
    <div class="container_index">
        <div class="card_todo_question">
            <div class="topPage">
                <div class="cont_logo">
                    <div class="flex_center">
                        <img :src="`${images}/${companie.filename}`" alt="" style="width:150px; border-radius: 50%;">
                        <h2>{{ companie.city }}</h2>
                    </div>
                </div>
            </div>
            <div>
                <div class="card_question" v-for="qst in questions" :key="qst.id">
                    <div class="card_parts">
                        <h2 class="categoria">{{ qst.categoria }}</h2>
                        <p class="question">{{ qst.question }}</p>
                    </div>
                    <div class="card_parts_end">
                        <div class="btnYesNo " v-if="qst.subcategia === null">
                            <div v-if="qst.options.length != 0">
                                <div class="slider">
                                    <label class="response_question" for="range" :style="{ color: getHappinessColor }">
                                        {{ mostrar(qst) }} - {{ qst.res_question }}</label>
                                    <input v-model="qst.val" type="range" min="0" max="100" />

                                    <div class="outer">
                                        <label :style="{ width: `${qst.val}%`, borderRadius: greaterThanFifty }" for="range"
                                            aria-hidden="true" class="inner">
                                            <span :style="{ right: getPlacement }">{{ qst.icon }}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div v-if="qst.tipo === 'booleam'">
                                    <!-- {{ qst.res_question }} -->
                                    <input v-model="qst.res_question" value="0" type="radio" class="btn-check"
                                        name="options1" id="option11" autocomplete="off">
                                    <label class="btn btn-secondary btn_yes_no" for="option11">Si</label>

                                    <input v-model="qst.res_question" value="1" type="radio" class="btn-check"
                                        name="options1" id="option12" autocomplete="off">
                                    <label class="btn btn-secondary btn_yes_no" for="option12">No</label>

                                </div>
                                <div v-else>
                                    <div class="slider" style="text-align: center;">
                                        <div style="display:flex; justify-content: center;">
                                            <!-- {{ qst.res_question }} -->
                                            <div>
                                                <input v-model="qst.res_question" value="0" type="radio" class="btn-check"
                                                    name="options" id="option1">
                                                <label class="btn btn-secondary option_red" for="option1">1</label>
                                                <input v-model="qst.res_question" value="1" type="radio" class="btn-check"
                                                    name="options" id="option2">
                                                <label class="btn btn-secondary option_red" for="option2">2</label>
                                                <input v-model="qst.res_question" value="2" type="radio" class="btn-check"
                                                    name="options" id="option3">
                                                <label class="btn btn-secondary option_red" for="option3">3</label>
                                                <input v-model="qst.res_question" value="3" type="radio" class="btn-check"
                                                    name="options" id="option4">
                                                <label class="btn btn-secondary option_red" for="option4">4</label>
                                                <input v-model="qst.res_question" value="4" type="radio" class="btn-check"
                                                    name="options" id="option5">
                                                <label class="btn btn-secondary option_red" for="option5">5</label>
                                                <input v-model="qst.res_question" value="5" type="radio" class="btn-check"
                                                    name="options" id="option6">
                                                <label class="btn btn-secondary option_yellow" for="option6">6</label>
                                                <input v-model="qst.res_question" value="6" type="radio" class="btn-check"
                                                    name="options" id="option7">
                                                <label class="btn btn-secondary option_yellow" for="option7">7</label>
                                                <input v-model="qst.res_question" value="7" type="radio" class="btn-check"
                                                    name="options" id="option8">
                                                <label class="btn btn-secondary option_yellow" for="option8">8</label>
                                                <input v-model="qst.res_question" value="8" type="radio" class="btn-check"
                                                    name="options" id="option9">
                                                <label class="btn btn-secondary option_green" for="option9">9</label>
                                                <input v-model="qst.res_question" value="9" type="radio" class="btn-check"
                                                    name="options" id="option10">
                                                <label class="btn btn-secondary option_green" for="option10">10</label>
                                            </div>
                                        </div>
                                        <div style="display:flex; justify-content:space-between">
                                            <div>No recomendable</div>
                                            <div>Muy recomendable</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- opciones con sub categorias -->
                        <div class="slider" v-else v-for="data in qst.subcategia" :key="data.id">
                            <label class="response_question" for="range" :style="{ color: getHappinessColor }"><span>{{
                                data.description
                            }}
                                    -</span>
                                {{ mostrar(data) }}- {{ data.res_question }}</label>
                            <input v-model="data.val" type="range" min="0" max="100" />

                            <div class="outer">
                                <label :style="{ width: `${data.val}%`, borderRadius: greaterThanFifty }" for="range"
                                    aria-hidden="true" class="inner">
                                    <span :style="{ right: getPlacement }">{{ data.icon }}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btnPrimary">
                <button @click="mensaje()">Siguente</button>
                <!-- <nuxt-link
                    :to="`/forms/${route.idCompanie}/${route.idSucursal}/${route.idForm}/pageEvaluacion`"><button>Siguente</button></nuxt-link> -->
            </div>
            <!-- <pre class="m-0">{{ questions }}</pre> -->
            <!-- <pre class="m-0">{{ route }}</pre> -->
        </div>
    </div>
</template>

<script>
import images from '../../../api/URL_imges';
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
    name: 'FeedbackAppPageQuestions',
    layout: 'clientes',
    data() {
        return {
            images: images,
            companie: {},
            route: {},
            row: null,
            text: '',
            color: "rgb(30, 30, 208)",
            questions: [{
                id: 1,
                categoria: null,
                question: '¿Es la primera vez que nos visitas?',
                subcategia: null,
                res_question: null,
                options: [],
                icon: null,
                val: null,
                tipo: "booleam"
            }, {
                id: 2,
                categoria: 'Comidas',
                question: '¿Como calificas la experiencia de nuestos platos?',
                res_question: null,
                subcategia: null,
                options: [
                    { id: 1, valor: 'Muy insatisfecho 😒' },
                    { id: 2, valor: 'Insatisfecho 🥱' },
                    { id: 3, valor: 'Puede Mejorar 🙄' },
                    { id: 4, valor: 'Satisfecho 🙂' },
                    { id: 5, valor: 'Muy Satisfecho 😉' },
                ],
                icon: '🍽️',
                val: 50,
                tipo: null
            }, {
                id: 3,
                categoria: 'Atención',
                question: '¿Como calificas el servicio de Atención?',
                res_question: null,
                subcategia: [
                    {
                        id: 1,
                        description: 'Meseros',
                        icon: '🤵',
                        val: 50,
                        res_question: '',
                        options: [
                            { id: 1, valor: 'Muy insatisfecho 😒' },
                            { id: 2, valor: 'Insatisfecho 🥱' },
                            { id: 3, valor: 'Puede Mejorar 🙄' },
                            { id: 4, valor: 'Satisfecho 🙂' },
                            { id: 5, valor: 'Muy Satisfecho 😉' },
                        ]
                    },
                    {
                        id: 2,
                        description: 'Tiempo de entrega',
                        icon: '🛎️',
                        val: 50,
                        res_question: '',
                        options: [
                            { id: 1, valor: 'Muy insatisfecho 😒' },
                            { id: 2, valor: 'Insatisfecho 🥱' },
                            { id: 3, valor: 'Puede Mejorar 🙄' },
                            { id: 4, valor: 'Satisfecho 🙂' },
                            { id: 5, valor: 'Muy Satisfecho 😉' },
                        ]
                    }
                ],
                options: [],
                icon: null,
                val: null,
                tipo: null
            }, {
                id: 4,
                categoria: 'Ambiente',
                question: '¿Como calificas la experiencia en nuesto local?',
                res_question: null,
                subcategia: [
                    {
                        id: 1,
                        description: 'Ambiente',
                        icon: '🛕',
                        val: 50,
                        res_question: '',
                        options: [
                            { id: 1, valor: 'Muy insatisfecho 😒' },
                            { id: 2, valor: 'Insatisfecho 🥱' },
                            { id: 3, valor: 'Puede Mejorar 🙄' },
                            { id: 4, valor: 'Satisfecho 🙂' },
                            { id: 5, valor: 'Muy Satisfecho 😉' },
                        ]
                    },
                    {
                        id: 2,
                        description: 'Limpieza',
                        icon: '🛗',
                        val: 50,
                        res_question: '',
                        options: [
                            { id: 1, valor: 'Muy insatisfecho 😒' },
                            { id: 2, valor: 'Insatisfecho 🥱' },
                            { id: 3, valor: 'Puede Mejorar 🙄' },
                            { id: 4, valor: 'Satisfecho 🙂' },
                            { id: 5, valor: 'Muy Satisfecho 😉' },
                        ]
                    }
                ],
                options: [],
                icon: null,
                val: null,
                tipo: null
            },
            {
                id: 5,
                categoria: 'Calidad',
                question: '¿Como califica el precio de nuestros productos?',
                res_question: null,
                subcategia: [
                    {
                        id: 1,
                        description: 'Precio',
                        icon: '💸',
                        val: 50,
                        res_question: '',
                        options: [
                            { id: 1, valor: 'Muy costoso 😒' },
                            { id: 2, valor: 'costoso 🥱' },
                            { id: 3, valor: 'Precio justo 🙄' },
                            { id: 4, valor: 'Barato 🙂' },
                            { id: 5, valor: 'Muy Barato 😉' },
                        ]
                    },

                ],
                options: [],
                icon: null,
                val: null,
                tipo: null
            },
            {
                id: 6,
                categoria: null,
                question: '¿En general cual es tu grado de satisfacción?',
                subcategia: null,
                icon: null,
                val: null,
                res_question: null,
                options: [
                    { id: 1, valor: 'Muy insatisfecho 😒' },
                    { id: 2, valor: 'Insatisfecho 🥱' },
                    { id: 3, valor: 'Puede Mejorar 🙄' },
                    { id: 4, valor: 'Satisfecho 🙂' },
                    { id: 5, valor: 'Muy Satisfecho 😉' },
                ],
                icon: '❤️',
                val: 50,
                tipo: null
            },
            {
                id: 7,
                categoria: null,
                question: '¿Nos recomendarias?  🤔',
                subcategia: null,
                icon: null,
                val: null,
                res_question: null,
                options: [],
                icon: '❤️',
                val: 50,
                tipo: "multiple"
            },
            ]
        };
    },

    mounted() {
        this.companie = JSON.parse(localStorage.getItem("user"));
        // let camco = document.getElementsByClassName("container_index");
        // camco.style.backgroundColor = blue;
        this.route = this.$route.params
        // console.log(this.$route.params);
        history.forward()
    },

    methods: {
        mensaje() {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: `Esta es solo una desmostracion`,
                text: "Es lo que veran tus clientes",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonText: 'ok!',
                reverseButtons: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
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
};
</script>

<style scoped>
.v-btn-toggle--selected {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0), 0px 2px 2px 0px rgba(0, 0, 0, 0), 0px 1px 5px 0px rgba(0, 0, 0, 0) !important;
}
</style>
