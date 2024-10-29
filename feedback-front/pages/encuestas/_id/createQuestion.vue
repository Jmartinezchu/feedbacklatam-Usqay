<template>
    <div>
        <div class="flex" style="align-items:center ">
            <div class="col-1">
                <nuxt-link to="/sucursales">
                    <div style="display:flex; border-radius:15px; align-items:center; justify-content: center;">
                        <!-- <h6>Crear</h6> -->
                        <v-btn icon>
                            <v-icon>arrow_back_ios_new</v-icon>
                        </v-btn>
                    </div>
                </nuxt-link>
            </div>
            <div>
                <h5>Nueva pregunta</h5>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-3">
                <div class="card">
                    <div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="example-text-input" class="form-control-label">Ingresa la pregunta
                                        </label>
                                        <input class="form-control" type="text" placeholder="Pregunta">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <!-- <p>{{ row }}</p> -->
                                    <input v-model="row" value="0" type="radio" class="btn-check" name="options2"
                                        id="option0" autocomplete="off">
                                    <label class="btn w-30 btn-secondary btn_yes_no" for="option0">Por areas</label>
                                    <input v-model="row" value="1" type="radio" class="btn-check" name="options2"
                                        id="option1" autocomplete="off">
                                    <label class="btn w-30 btn-secondary btn_yes_no" for="option1">Si y no</label>
                                    <!-- <input v-model="row" value="2" type="radio" class="btn-check" name="options2"
                                        id="option2" autocomplete="off">
                                    <label class="btn w-30 btn-secondary btn_yes_no" for="option2">Multiple
                                        1-10</label> -->
                                </div>
                                <div v-if="row == 0">
                                    <div class="col-md-12" v-for="qst in questions" :key="qst">
                                        <div class="form-group">
                                            <label for="example-text-input" class="form-control-label">Ingresa la
                                                categoria en general</label>
                                            <input class="form-control" type="text" value="" v-model="qst.categoria"
                                                placeholder="Categoria">

                                            <label @click="aumentar(contador)"
                                                class="btn btn-secondary mt-2 w-10 btn_yes_no">
                                                +</label>
                                            <label @click="disminuir" class="btn btn-secondary mt-2 w-10 btn_yes_no">
                                                - </label>
                                            <label class="btn mt-2  "> Sub Categorias - {{ contador }} </label>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div v-for="qst in questions" :key="qst" class="form-group">
                                            <div class="row" v-for="data in qst.subcategia" :key="data.id">
                                                <div class="col-md-10">
                                                    <label for="example-text-input" class="form-control-label">Sub
                                                        Categoria
                                                        {{ data.id }}</label>
                                                    <input class="form-control" type="text" value=""
                                                        v-model="data.description" placeholder="Categoria">
                                                </div>
                                                <div class="col-md-2">
                                                    <label class="form-control-label">Icono {{ data.id }}</label>
                                                    <div>
                                                        <twemoji-textarea :emojiData="emojiData" :emojiGroups="emojiGroups"
                                                            :skinsSelection="false" :searchEmojisFeat="true"
                                                            searchEmojiPlaceholder="Search here."
                                                            searchEmojiNotFound="Emojis not found." placeholder="<- Select"
                                                            isLoadingLabel="Loading..." :pickerWidth="400"
                                                            :content.sync="data.icon" :initialContent=data.icon />
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <label class="form-control-label">Opciones a mostar</label>
                                                    <div class="card_question">
                                                        <div class="card_parts_end">
                                                            <!-- opciones con sub categorias -->
                                                            <div class="slider">
                                                                <label class="response_question" for="range"
                                                                    :style="{ color: getHappinessColor }"><span>
                                                                        sub categoria
                                                                        -</span>
                                                                    {{ mostrar(data) }}- {{ data.res_question }}</label>
                                                                <input v-model="data.val" type="range" min="0" max="100" />

                                                                <div class="outer">
                                                                    <label
                                                                        :style="{ width: `${data.val}%`, borderRadius: greaterThanFifty }"
                                                                        for="range" aria-hidden="true" class="inner">
                                                                        <span :style="{ right: getPlacement }">{{
                                                                            // data.icon.codePointAt(0).toString(16)
                                                                            data.icon
                                                                        }}</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div v-if="row == 1">
                                    <h6 style="text-align:center;" class="pt-3">Opciones a mostrar</h6>

                                    <div class="slider" style="text-align: center;">
                                        <div style="display:flex; justify-content: center;">
                                            <div>
                                                <input value="0" type="radio" class="btn-check" name="options1"
                                                    id="option11" autocomplete="off">
                                                <label class="btn btn-secondary btn_yes_no" for="option11">Si</label>

                                                <input value="1" type="radio" class="btn-check" name="options1"
                                                    id="option12" autocomplete="off">
                                                <label class="btn btn-secondary btn_yes_no" for="option12">No</label>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div v-if="row == 2">
                                    <h6 style="text-align:center;" class="pt-3">Opciones a mostrar</h6>

                                    <div class="slider" style="text-align: center;">
                                        <div style="display:flex; justify-content: center;">
                                            <!-- {{ qst.res_question }} -->
                                            <div>
                                                <input value="0" type="radio" class="btn-check" name="options" id="option1">
                                                <label class="btn btn-secondary option_red" for="option1">1</label>
                                                <input value="1" type="radio" class="btn-check" name="options" id="option2">
                                                <label class="btn btn-secondary option_red" for="option2">2</label>
                                                <input value="2" type="radio" class="btn-check" name="options" id="option3">
                                                <label class="btn btn-secondary option_red" for="option3">3</label>
                                                <input value="3" type="radio" class="btn-check" name="options" id="option4">
                                                <label class="btn btn-secondary option_red" for="option4">4</label>
                                                <input value="4" type="radio" class="btn-check" name="options" id="option5">
                                                <label class="btn btn-secondary option_red" for="option5">5</label>
                                                <input value="5" type="radio" class="btn-check" name="options" id="option6">
                                                <label class="btn btn-secondary option_yellow" for="option6">6</label>
                                                <input value="6" type="radio" class="btn-check" name="options" id="option7">
                                                <label class="btn btn-secondary option_yellow" for="option7">7</label>
                                                <input value="7" type="radio" class="btn-check" name="options" id="option8">
                                                <label class="btn btn-secondary option_yellow" for="option8">8</label>
                                                <input value="8" type="radio" class="btn-check" name="options" id="option9">
                                                <label class="btn btn-secondary option_green" for="option9">9</label>
                                                <input value="9" type="radio" class="btn-check" name="options"
                                                    id="option10">
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
                            <hr class="horizontal dark">
                        </div>
                        <div>
                            <!-- <pre class="m-0">{{ questions }}</pre> -->
                        </div>

                        <button class="btn btn-danger btn-sm ms-auto mx-5" style="font-size: 15px;">Crear</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { TwemojiTextarea } from "@kevinfaguiar/vue-twemoji-picker";
import EmojiData from "@kevinfaguiar/vue-twemoji-picker/emoji-data/en/emoji-all-groups.json";
import EmojiGroups from "@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json";


export default {

    name: 'FeedbackAppCreateQuestion',
    components: {
        "twemoji-textarea": TwemojiTextarea,
    },
    data() {
        return {
            row: null,
            contador: 1,

            emojiData: EmojiData,
            emojiGroups: EmojiGroups,
            lang: "en",
            valorEmoji: '',
            syncedContent: "",
            contentChangedValue: "",
            contentChangedHtmlValue: "",

            questions: [{

                categoria: null,
                question: null,
                res_question: null,
                subcategia: [
                    {
                        id: 1,
                        description: null,
                        icon: '🥗',
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
                ],
                options: [],
                icon: null,
                val: null,
                tipo: null
            }
            ]
        };
    },
    mounted() {
        // this.stringEmoji('🥗');
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

    methods: {
        agregarsubcategoria(val) {
            this.questions[0].subcategia.push({
                id: val,
                description: null,
                icon: '🥗',
                val: 50,
                res_question: '',
                options: [
                    { id: 1, valor: 'Muy insatisfecho 😒' },
                    { id: 2, valor: 'Insatisfecho 🥱' },
                    { id: 3, valor: 'Puede Mejorar 🙄' },
                    { id: 4, valor: 'Satisfecho 🙂' },
                    { id: 5, valor: 'Muy Satisfecho 😉' },
                ]
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

            if (this.contador > 1) {
                this.questions[0].subcategia.pop();
                this.contador--;
            } else {
                // console.log("cantidad no valida");
            }
        },
        aumentar() {
            if (this.contador < 3) {
                this.contador++;
                this.agregarsubcategoria(this.contador);
            } else {
                // console.log("cantidad no valida");
            }
        },
    },
};
</script>

<style scoped>
.exampleInputEmoji {
    position: absolute;
    padding-bottom: 50px;
}

.your-input-box {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>