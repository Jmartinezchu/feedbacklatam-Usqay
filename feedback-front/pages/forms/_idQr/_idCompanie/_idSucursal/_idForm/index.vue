<template>
    <div class="container_index ">
        <div class="card_todo_question">

            <div style="">
                <v-stepper v-model="e1" style="box-shadow: none ;">
                    <v-stepper-items>
                        <topPage class=""></topPage>
                        <v-stepper-content step="1">
                            <div class="animate__animated animate__fadeInDown card_question" v-for="qst in questions"
                                :key="qst.id" v-if="qst.tipo === 'booleam'"
                                :class="{ 'animate__animated animate__fadeOut': qst.res_question === '1' || qst.res_question === '0' }">
                                <div>
                                    <div class="card_parts">
                                        <h2 class="categoria">{{ qst.titulo }}</h2>
                                        <p class="question">{{ qst.question }}</p>
                                    </div>
                                    <div class="card_parts_end">
                                        <div class="btnYesNo">
                                            <input v-model="qst.res_question" @click="e1 = 2" value="1" type="radio"
                                                class="btn-check" name="options1" id="option11" autocomplete="off">
                                            <label class="btn btn-secondary btn_yes_no text-white"
                                                style="background-color:green !important" for="option11">Si</label>

                                            <input v-model="qst.res_question" @click="e1 = 2" value="0" type="radio"
                                                class="btn-check" name="options1" id="option12" autocomplete="off">
                                            <label class="btn btn-secondary btn_yes_no text-white"
                                                style="background-color:#f00 !important" for="option12">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
                <div class="card_question  animate__animated animate__fadeInDown" v-for="qst in questions" :key="qst.id"
                    v-if="qst.tipo != 'numbers' && qst.tipo != 'booleam'">
                    <div class="card_parts">
                        <h2 class="categoria">{{ qst.titulo }}</h2>
                        <!-- <p class="question">{{ qst.question }}</p> -->
                    </div>
                    <div class="card_parts_end card_border">
                        <h6 class="question">{{ qst.question }}</h6>
                        <div class="btnYesNo flex " style="flex-direction: column;" v-if="qst.sub_titulos === null">
                            <div v-if="form.type_options === 1" style="width: 100%;">
                                <div v-if="qst.options != null" class="slider ">
                                    <label style="display: none;" class="response_question" for="range"
                                        :style="{ color: getHappinessColor }">
                                        {{ mostrar(qst) }}</label>
                                    <input v-model="qst.val" type="range" min="0" max="100" />

                                    <div class="outer">
                                        <label :style="{ width: `${qst.val}%`, borderRadius: greaterThanFifty }" for="range"
                                            aria-hidden="true" class="inner">
                                            <span :style="{ right: getPlacement }">
                                                {{ String.fromCodePoint("0x" + qst.icon) }}</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="flex pt-1 pb-3 w-100">
                                    <div style="width: 20% !important;"><img src="/img/svg/1.svg" alt="" style="width:25px">
                                    </div>
                                    <div style="width: 20% !important;"><img src="/img/svg/2.svg" alt="" style="width:25px">
                                    </div>
                                    <div style="width: 20% !important;"><img src="/img/svg/3.svg" alt="" style="width:25px">
                                    </div>
                                    <div style="width: 20% !important;"><img src="/img/svg/4.svg" alt="" style="width:25px">
                                    </div>
                                    <div style="width: 20% !important;"><img src="/img/svg/5.svg" alt="" style="width:25px">
                                    </div>
                                </div>
                            </div>
                            <div v-if="form.type_options === 2">
                                <div v-if="qst.options != null">
                                    <div class="wrapper">
                                        <input type="radio" :checked="qst.res_question === 1" name="rate"
                                            :id="qst.id + 'str-' + 1" class="star-1" @click="qst.res_question = 1">
                                        <input type="radio" :checked="qst.res_question === 2" name="rate"
                                            :id="qst.id + 'str-' + 2" class="star-2" @click="qst.res_question = 2">
                                        <input type="radio" :checked="qst.res_question === 3" name="rate"
                                            :id="qst.id + 'str-' + 3" class="star-3" @click="qst.res_question = 3">
                                        <input type="radio" :checked="qst.res_question === 4" name="rate"
                                            :id="qst.id + 'str-' + 4" class="star-4" @click="qst.res_question = 4">
                                        <input type="radio" :checked="qst.res_question === 5" name="rate"
                                            :id="qst.id + 'str-' + 5" class="star-5" @click="qst.res_question = 5">
                                        <div class="content">
                                            <OptionsStarts :max-stars="5" :rating.sync="qst.res_question"></OptionsStarts>
                                            <span class="numb"></span>
                                        </div>
                                        <div class="footer" v-if="qst.res_question === 1">
                                            <span class="text">Muy Insatisfecho</span>
                                            <span class="numb">1 de 5</span>
                                        </div>
                                        <div class="footer" v-if="qst.res_question === 2">
                                            <span class="text">Insatisfecho</span>
                                            <span class="numb">2 de 5</span>
                                        </div>
                                        <div class="footer" v-if="qst.res_question === 3">
                                            <span class="text">Puede Mejorar</span>
                                            <span class="numb">3 de 5</span>
                                        </div>
                                        <div class="footer" v-if="qst.res_question === 4">
                                            <span class="text">Satisfecho</span>
                                            <span class="numb">4 de 5</span>
                                        </div>
                                        <div class="footer" v-if="qst.res_question === 5">
                                            <span class="text">Muy Satisfecho</span>
                                            <span class="numb">5 de 5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="form.type_options === 3">
                                <div class="rating-container">
                                    <div class="rating-control">
                                        <div class="rating-option">
                                            <div class="icon">
                                                <img @click="qst.res_question = 1"
                                                    :class="{ backColor1: qst.res_question === 1 }" src="/img/svg/1.svg"
                                                    alt="">
                                            </div>
                                            <div class="label">Muy Insatisfecho</div>
                                            <!-- <div class="touch-marker"></div> -->
                                        </div>
                                        <div class="rating-option">
                                            <div class="icon">
                                                <img @click="qst.res_question = 2"
                                                    :class="{ backColor2: qst.res_question === 2 }" src="/img/svg/2.svg"
                                                    alt="">
                                            </div>
                                            <div class="label"></div>
                                            <!-- <div class="touch-marker"></div> -->
                                        </div>
                                        <div class="rating-option">
                                            <div class="icon">
                                                <img @click="qst.res_question = 3"
                                                    :class="{ backColor3: qst.res_question === 3 }" src="/img/svg/3.svg"
                                                    alt="">
                                            </div>
                                            <div class="label">Puede Mejorar</div>
                                            <!-- <div class="touch-marker"></div> -->
                                        </div>
                                        <div class="rating-option">
                                            <div class="icon">
                                                <img @click="qst.res_question = 4"
                                                    :class="{ backColor4: qst.res_question === 4 }" src="/img/svg/4.svg"
                                                    alt="">
                                            </div>
                                            <div class="label"></div>
                                            <!-- <div class="touch-marker"></div> -->
                                        </div>
                                        <div class="rating-option">
                                            <div class="icon">
                                                <img @click="qst.res_question = 5"
                                                    :class="{ backColor5: qst.res_question === 5 }" src="/img/svg/5.svg"
                                                    alt="">
                                            </div>
                                            <div class="label">Muy Satisfecho</div>
                                            <!-- <div class="touch-marker"></div> -->
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="btnYesNo flex " style="flex-direction: column;" v-for="data in qst.sub_titulos"
                            :key="data.id">
                            <h5>{{ data.titulo }}</h5>
                            <div v-if="form.type_options === 1" style="width: 100%;">
                                <div v-if="data.options != null" class="slider">
                                    <label class="response_question d-none" for="range">
                                        <span>{{ data.titulo }}</span>
                                        <span :style="{ color: getHappinessColor }" style="display:none;"> - {{
                                            mostrar(data)
                                        }}</span>
                                    </label>
                                    <input v-model="data.val" type="range" min="0" max="100" />
                                    <div class="outer">
                                        <label :style="{ width: `${data.val}%`, borderRadius: greaterThanFifty }"
                                            for="range" aria-hidden="true" class="inner">
                                            <span :style="{ right: getPlacement }">
                                                {{ String.fromCodePoint("0x" + data.icon) }}</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="flex pt-1 pb-3 w-100">
                                    <div style="width: 20% !important;"><img src="/img/svg/1.svg" alt="" style="width:25px">
                                    </div>
                                    <div style="width: 20% !important;"><img src="/img/svg/2.svg" alt="" style="width:25px">
                                    </div>
                                    <div style="width: 20% !important;"><img src="/img/svg/3.svg" alt="" style="width:25px">
                                    </div>
                                    <div style="width: 20% !important;"><img src="/img/svg/4.svg" alt="" style="width:25px">
                                    </div>
                                    <div style="width: 20% !important;"><img src="/img/svg/5.svg" alt="" style="width:25px">
                                    </div>
                                </div>
                            </div>
                            <div v-if="form.type_options === 2">
                                <div v-if="data.options != null">
                                    <div class="wrapper">
                                        <input type="radio" :checked="data.res_question === 1" name="rate"
                                            :id="data.id + 'str-' + 1" class="star-1" @click="data.res_question = 1">
                                        <input type="radio" :checked="data.res_question === 2" name="rate"
                                            :id="data.id + 'str-' + 2" class="star-2" @click="data.res_question = 2">
                                        <input type="radio" :checked="data.res_question === 3" name="rate"
                                            :id="data.id + 'str-' + 3" class="star-3" @click="data.res_question = 3">
                                        <input type="radio" :checked="data.res_question === 4" name="rate"
                                            :id="data.id + 'str-' + 4" class="star-4" @click="data.res_question = 4">
                                        <input type="radio" :checked="data.res_question === 5" name="rate"
                                            :id="data.id + 'str-' + 5" class="star-5" @click="data.res_question = 5">
                                        <div class="content">
                                            <OptionsStarts :max-stars="5" :rating.sync="data.res_question"></OptionsStarts>
                                            <span class="numb"></span>
                                        </div>
                                        <div class="footer" v-if="data.res_question === 1">
                                            <span class="text">Muy Insatisfecho</span>
                                            <span class="numb">1 de 5</span>
                                        </div>
                                        <div class="footer" v-if="data.res_question === 2">
                                            <span class="text">Insatisfecho</span>
                                            <span class="numb">2 de 5</span>
                                        </div>
                                        <div class="footer" v-if="data.res_question === 3">
                                            <span class="text">Puede Mejorar</span>
                                            <span class="numb">3 de 5</span>
                                        </div>
                                        <div class="footer" v-if="data.res_question === 4">
                                            <span class="text">Satisfecho</span>
                                            <span class="numb">4 de 5</span>
                                        </div>
                                        <div class="footer" v-if="data.res_question === 5">
                                            <span class="text">Muy Satisfecho</span>
                                            <span class="numb">5 de 5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="form.type_options === 3">
                                <div class="rating-container">
                                    <div class="rating-control">
                                        <div class="rating-option">
                                            <div class="icon">
                                                <img @click="data.res_question = 1"
                                                    :class="{ backColor1: data.res_question === 1 }" src="/img/svg/1.svg"
                                                    alt="">
                                            </div>
                                            <div class="label">Muy Insatisfecho</div>
                                            <!-- <div class="touch-marker"></div> -->
                                        </div>
                                        <div class="rating-option">
                                            <div class="icon">
                                                <img @click="data.res_question = 2"
                                                    :class="{ backColor2: data.res_question === 2 }" src="/img/svg/2.svg"
                                                    alt="">
                                            </div>
                                            <div class="label"></div>
                                            <!-- <div class="touch-marker"></div> -->
                                        </div>
                                        <div class="rating-option">
                                            <div class="icon">
                                                <img @click="data.res_question = 3"
                                                    :class="{ backColor3: data.res_question === 3 }" src="/img/svg/3.svg"
                                                    alt="">
                                            </div>
                                            <div class="label">Puede Mejorar</div>
                                            <!-- <div class="touch-marker"></div> -->
                                        </div>
                                        <div class="rating-option">
                                            <div class="icon">
                                                <img @click="data.res_question = 4"
                                                    :class="{ backColor4: data.res_question === 4 }" src="/img/svg/4.svg"
                                                    alt="">
                                            </div>
                                            <div class="label"></div>
                                            <!-- <div class="touch-marker"></div> -->
                                        </div>
                                        <div class="rating-option">
                                            <div class="icon">
                                                <img @click="data.res_question = 5"
                                                    :class="{ backColor5: data.res_question === 5 }" src="/img/svg/5.svg"
                                                    alt="">
                                            </div>
                                            <div class="label">Muy Satisfecho</div>
                                            <!-- <div class="touch-marker"></div> -->
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="card_question animate__animated animate__fadeInRight" v-for="qstnum in questions"
                    :key="qstnum.id" v-if="qstnum.tipo === 'numbers'">
                    <!-- <div> -->
                    <div class="card_parts">
                        <!-- <h2 class="categoria">{{ qstnum.titulo }}</h2> -->
                        <p class="question">
                            <!-- {{ qstnum.question }} -->
                            ¿Con qué probabilidad recomendarías {{ form.nameCompanie }} a tus familiares y amigos?
                            {{ String.fromCodePoint("0x" + qstnum.icon) }}
                        </p>
                    </div>
                    <div class="card_parts_end">
                        <div class="btnYesNo ">
                            <div class="slider" style="text-align: center;">
                                <div style="display:flex; justify-content: center;">
                                    <div>
                                        <input v-model="qstnum.res_question" value="1" type="radio" class="btn-check"
                                            name="options" id="option1">
                                        <label class="btn btn-secondary option_red" for="option1">1</label>
                                        <input v-model="qstnum.res_question" value="1" type="radio" class="btn-check"
                                            name="options" id="option2">
                                        <label class="btn btn-secondary option_red" for="option2">2</label>
                                        <input v-model="qstnum.res_question" value="1" type="radio" class="btn-check"
                                            name="options" id="option3">
                                        <label class="btn btn-secondary option_red" for="option3">3</label>
                                        <input v-model="qstnum.res_question" value="1" type="radio" class="btn-check"
                                            name="options" id="option4">
                                        <label class="btn btn-secondary option_red" for="option4">4</label>
                                        <input v-model="qstnum.res_question" value="1" type="radio" class="btn-check"
                                            name="options" id="option5">
                                        <label class="btn btn-secondary option_red" for="option5">5</label>
                                        <input v-model="qstnum.res_question" value="2" type="radio" class="btn-check"
                                            name="options" id="option6">
                                        <label class="btn btn-secondary option_yellow" for="option6">6</label>
                                        <input v-model="qstnum.res_question" value="2" type="radio" class="btn-check"
                                            name="options" id="option7">
                                        <label class="btn btn-secondary option_yellow" for="option7">7</label>
                                        <input v-model="qstnum.res_question" value="2" type="radio" class="btn-check"
                                            name="options" id="option8">
                                        <label class="btn btn-secondary option_yellow" for="option8">8</label>
                                        <input v-model="qstnum.res_question" value="3" type="radio" class="btn-check"
                                            name="options" id="option9">
                                        <label class="btn btn-secondary option_green" for="option9">9</label>
                                        <input v-model="qstnum.res_question" value="3" type="radio" class="btn-check"
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
                    <!-- </div> -->
                </div>
                <!-- <pre style="height: 0 !important; display: none !important;">{{ questions }}</pre> -->
                <!-- <pre>{{ questions }}</pre> -->
            </div>
            <div class="btnPrimary">
                <button @click="validarRespons(questions)">Siguente</button>
                <!-- <nuxt-link
                    :to="`/forms/${route.idCompanie}/${route.idSucursal}/${route.idForm}/pageEvaluacion`"><button>Siguente</button></nuxt-link> -->
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../../../../../../api/API_feedback';
import images from '../../../../../../api/URL_imges';


export default {
    name: 'FeedbackAppPageQuestions',
    layout: 'clientes',

    data() {
        return {
            e1: 1,
            form: {},
            idFormFespons: null,
            route: {},
            row: null,
            text: '',
            color: "rgb(30, 30, 208)",
            questions: null,
            options: null,
            images: images,
        };
    },

    async mounted() {

        this.route = this.$route.params
        await this.getForm();
        await this.getQr();
        // console.log(t);
        // await this.getOptions();
        await this.verdata();
        history.forward()
    },

    methods: {
        async getForm() {
            let idCompanie = this.route.idCompanie
            let idForm = this.route.idForm
            const data = await this.$axios.$get(`${Api}/formularios/${idCompanie}/${idForm}`).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data[0]);
            this.form = data.result[0]
            let formInfo = this.form
            if (formInfo.state != 1) {
                this.getStateActive()
            }
        },
        async getQr() {
            let id = this.route.idQr
            const data = await this.$axios.$get(`${Api}/generateQr/one/` + id).catch(error => {
                console.log('Request canceled', error)
            })
            localStorage.setItem("qrData", JSON.stringify(data[0]));
            let qrInfo = data[0];
            if (qrInfo.state != 1) {
                this.getStateActive()
            }
        },
        getStateActive() {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false,
            })

            swalWithBootstrapButtons.fire({
                allowOutsideClick: false,
                title: `El formulario esta Inhabilitado`,
                text: "A llegado al limite por mes o ya no esta disponible",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonText: 'Inicio',
                // cancelButtonText: 'No, cancelar!',
                reverseButtons: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    location.href = "/"

                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    // console.log('no se elimina')
                }

            })
        },
        async validarRespons(data) {
            let array = data;
            let contador = 0;
            let sub_titulos = 0;
            let qstmult = 0;
            for (let index = 0; index < array.length; index++) {
                if (array[index].tipo != 'multiple') {
                    // console.log(array[index].res_question);
                    if (array[index].res_question != null) {
                        contador++
                    }
                } else {
                    if (array[index].tipo === 'multiple') {

                        let arrmult = array[index].sub_titulos;
                        qstmult = qstmult + 1
                        sub_titulos = sub_titulos + arrmult.length;
                        // console.log(array[index].sub_titulos);
                        for (let index = 0; index < arrmult.length; index++) {

                            if (arrmult[index].res_question != null) {
                                contador++
                            }
                        }
                    }
                }
            }

            let complete = array.length - qstmult + sub_titulos
            // console.log(sub_titulos, qstmult, complete, contador);
            // if (contador != array.length) {
            if (contador != complete) {
                Swal.fire({
                    icon: 'warning',
                    title: `Falta por responder ${complete - contador} items`,
                    text: 'Para poder registrar tu calificacion tienes que responder a todos los items',
                })
            } else {
                // console.log('funcion añadir');
                await this.addFormRespon(array);
                // console.log(array);

            }
        },
        async addResponsMultiple(qst, idFormRespon) {
            const params = {
                id_qr: this.route.idQr,
                id_form: qst.id_form,
                id_sucursal: this.route.idSucursal,
                id_companie: this.route.idCompanie,
                id_question: qst.id,
                tipo: qst.tipo,
                res_question: null,
                id_formrespon: idFormRespon
            }
            // console.log(params);
            const data = await this.$axios.$post(`${Api}/respons`, params).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
            const id_subresp = data.deploy.insertId
            let subcategories = qst.sub_titulos
            for (let index = 0; index < subcategories.length; index++) {
                await this.addSubRespons(subcategories[index], id_subresp, idFormRespon)
            }
        },
        async addSubRespons(qst, id_respon, idFormRespon) {
            const params = {
                id_respon: id_respon,
                id_question: qst.id_question,
                id_question_sub: qst.id,
                titulo: qst.titulo,
                res_question: qst.res_question,
                id_form_respon: idFormRespon
            }
            const data = await this.$axios.$post(`${Api}/respons_sub`, params).catch(error => {
                console.log('Request canceled', error)
            })
            console.log(data);
        },
        async addRespons(qst, idFormRespon) {
            const params = {
                id_qr: this.route.idQr,
                id_form: qst.id_form,
                id_sucursal: this.route.idSucursal,
                id_companie: this.route.idCompanie,
                id_question: qst.id,
                tipo: qst.tipo,
                res_question: qst.res_question,
                id_formrespon: idFormRespon
            }
            const data = await this.$axios.$post(`${Api}/respons`, params).catch(error => {
                console.log('Request canceled', error)
            })
            console.log(data);
        },
        async addFormRespon(array) {
            const params = {
                id_qr: this.route.idQr,
                id_form: this.route.idForm,
                id_sucursal: this.route.idSucursal,
                id_companie: this.route.idCompanie,
                questions: array
            }
            const data = await this.$axios.$post(`${Api}/formRespon`, params).catch(error => {
                console.log('Request canceled', error)
            })

            Swal.fire({
                icon: 'success',
                title: 'Procesando...',
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading()
                },
                timer: 1580
            }).then(() => {
                location.href = `/forms/${this.route.idQr}/${this.route.idCompanie}/${this.route.idSucursal}/${this.route.idForm}/pageEvaluacion`

            })
            // if (index === array.length - 1) {
            //     location.href = `/forms/${this.route.idQr}/${this.route.idCompanie}/${this.route.idSucursal}/${this.route.idForm}/pageEvaluacion`
            // } else {

            // }



            // const idFormRes = data.deploy.insertId
            // // = this.idFormFespons
            // for (let index = 0; index < array.length; index++) {
            //     if (array[index].tipo != 'multiple') {
            //         await this.addRespons(array[index], idFormRes)
            //     } else {
            //         // console.log('se añade multiple');
            //         await this.console.log(result);(array[index], idFormRes)
            //     }
            //     if (index === array.length - 1) {
            //         location.href = `/forms/${this.route.idQr}/${this.route.idCompanie}/${this.route.idSucursal}/${this.route.idForm}/pageEvaluacion`
            //     } else {
            //         Swal.fire({
            //             icon: 'success',
            //             title: 'Procesando...',
            //             showConfirmButton: false,
            //             didOpen: () => {
            //                 Swal.showLoading()
            //             }
            //             // timer: 1000
            //         })
            //     }
            // }
            // console.log(this.idFormFespons);
        },
        async getOptions() {
            const data = await this.$axios.$get(`${Api}/question/options`).catch(error => {
                console.log('Request canceled', error)
            })
            this.options = data;
        },
        async verdata() {
            const data = await this.$axios.$get(`${Api}/question/${this.route.idForm}`).catch(error => {
                console.log('Request canceled', error)
            })
            this.questions = await data;

        },
        async getSubquestions(qst) {
            let id = qst.id
            const data = await this.$axios.$get(`${Api}/questionSub/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            qst.sub_titulos = data;
            for (let index = 0; index < qst.sub_titulos.length; index++) {
                qst.sub_titulos[index].options = this.options
                if (this.form.type_options != 1) {
                    qst.sub_titulos[index].res_question = null
                }
            }
            // console.log(data);
        },
        mostrar(txt) {
            const arr = txt.options;
            let todoArr = arr?.length;
            let paso = 100 / todoArr;
            let response = txt.res_question;
            let num_id_res = txt.id;
            let numStop = 100 / (todoArr - 1);
            let emoji = '1f612'
            let icon
            for (let i = 0; i < todoArr; i++) {
                // let limbarr =txt.options[index].id;
                if (txt.val >= paso * i && txt.val <= paso * (i + 1)) {
                    response = arr[i].valor;
                    icon = String.fromCodePoint("0x" + arr[i].icon)
                    num_id_res = arr[i].id
                    txt.res_question = arr[i].id
                    txt.val = i * numStop;
                    // console.log(txt.res_question);
                }
            };
            return `${response}${icon}`;
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

<style>
.card_border {
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.37) 0px 0px 20px 0px;
    margin: 10px 25px;
    padding: 15px 0;
}

/* .btn:hover:not(.btn-icon-only) {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-22px);
} */

.distNone {
    display: none !important;
}

.v-btn-toggle--selected {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0), 0px 2px 2px 0px rgba(0, 0, 0, 0), 0px 1px 5px 0px rgba(0, 0, 0, 0) !important;
}

.wrapper {
    background: #ffffff;
    max-width: 360px;
    width: 100%;
    /* border-radius: 10px;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1); */
}

.wrapper .content {
    padding: 5px 30px 30px 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.wrapper .outer {
    height: 135px;
    width: 135px;
    overflow: hidden;
}

.outer .emojis {
    height: 500%;
    display: flex;
    flex-direction: column;
}

.outer .emojis li {
    height: 20%;
    width: 100%;
    list-style: none;
    transition: all 0.3s ease;
}

.outer li img {
    height: 100%;
    width: 100%;
}

.star-2:checked~.content .emojis .slideImg {
    margin-top: -135px;
}

.star-3:checked~.content .emojis .slideImg {
    margin-top: -270px;
}

.star-4:checked~.content .emojis .slideImg {
    margin-top: -405px;
}

.star-5:checked~.content .emojis .slideImg {
    margin-top: -540px;
}

.wrapper .stars {
    margin-top: 0px;
}

.stars label {
    font-size: 30px;
    margin: 0 3px;
    color: #ccc;
}

.star-1:hover~.content .stars .star-1,
.star-1:checked~.content .stars .star-1,

.star-2:hover~.content .stars .star-1,
.star-2:hover~.content .stars .star-2,
.star-2:checked~.content .stars .star-1,
.star-2:checked~.content .stars .star-2,

.star-3:hover~.content .stars .star-1,
.star-3:hover~.content .stars .star-2,
.star-3:hover~.content .stars .star-3,
.star-3:checked~.content .stars .star-1,
.star-3:checked~.content .stars .star-2,
.star-3:checked~.content .stars .star-3,

.star-4:hover~.content .stars .star-1,
.star-4:hover~.content .stars .star-2,
.star-4:hover~.content .stars .star-3,
.star-4:hover~.content .stars .star-4,
.star-4:checked~.content .stars .star-1,
.star-4:checked~.content .stars .star-2,
.star-4:checked~.content .stars .star-3,
.star-4:checked~.content .stars .star-4,

.star-5:hover~.content .stars .star-1,
.star-5:hover~.content .stars .star-2,
.star-5:hover~.content .stars .star-3,
.star-5:hover~.content .stars .star-4,
.star-5:hover~.content .stars .star-5,
.star-5:checked~.content .stars .star-1,
.star-5:checked~.content .stars .star-2,
.star-5:checked~.content .stars .star-3,
.star-5:checked~.content .stars .star-4,
.star-5:checked~.content .stars .star-5 {
    color: #fd4;
}

.goold {
    color: #fd4;
}

.wrapper .footer {
    border-top: 1px solid #ccc;
    background: #fff;
    width: 100%;
    height: 55px;
    padding: 0 20px;
    border-radius: 0 0 10px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.footer span {
    font-size: 17px;
    font-weight: 400;
}

/* .footer .text::before {
    content: "Muy insatisfecho";

}

.footer .numb::before {
    content: "1 de 5";
}

.star-1:checked~.footer .text::before {
    content: "Muy insatisfecho";
}

.star-1:checked~.footer .numb::before {
    content: "1 de 5";
}

.star-2:checked~.footer .text::before {
    content: "Insatisfecho";
}

.star-2:checked~.footer .numb::before {
    content: "2 de 5";
}

.star-3:checked~.footer .text::before {
    content: "Puede mejorar";
}

.star-3:checked~.footer .numb::before {
    content: "3 de 5";
}

.star-4:checked~.footer .text::before {
    content: "Satisfecho";
}

.star-4:checked~.footer .numb::before {
    content: "4 de 5";
}

.star-5:checked~.footer .text::before {
    content: "Muy Satisfecho";
}

.star-5:checked~.footer .numb::before {
    content: "5 de 5";
} */

input[type="radio"] {
    display: none;
}

.backColor1 {
    box-shadow: 0px 0px 12px 9px #f00;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
}

.backColor2 {
    box-shadow: 0px 0px 12px 9px rgb(160, 55, 55);
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
}

.backColor3 {
    box-shadow: 0px 0px 12px 9px rgb(75, 44, 44);
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
}

.backColor4 {
    box-shadow: 0px 0px 12px 9px rgb(53, 120, 53);
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
}

.backColor5 {
    box-shadow: 0px 0px 12px 9px rgb(17, 175, 25);
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
}
</style>

<style lang="stylus" scoped>
body.dragging,
body.dragging .rating-option {
  cursor: -webkit-grabbing !important;
  cursor: grabbing !important;
  -webkit-font-smoothing: antialiased;
}
.rating-container {
    display: flex;
    justify-content: center;
}

.touch-marker {
    position: absolute;
    width: 37px;
    height: 37px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.06);
    -webkit-transform: scale(2);
    transform: scale(2);
    opacity: 0;
    transition-property: -webkit-transform, opacity;
    transition-property: transform, opacity;
    transition-duration: .25s;
    transition-timing-function: cubic-bezier(.215, .61, .355, 1);
    pointer-events: none;
    will-change: transform
}

.show-touch .touch-marker {
    -webkit-transform: none;
    transform: none;
    opacity: 1
}

.rating-control {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    position: relative;
    width: 100%;
    max-width: 300px;
    padding-bottom: 9px
}

.rating-control::before {
    content: "";
    position: absolute;
    width: 80%;
    height: 2px;
    top: 50%;
    margin-top: -13px;
    left: 10%;
    background-color: #E9ECEE
}

.rating-control .current-rating {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: absolute;
    width: 20%;
    height: 55px;
    top: 0;
    left: 0;
    will-change: transform;
    cursor: -webkit-grab;
    cursor: grab
    opacity 0
    transition opacity 0.4875s cubic-bezier(.215, .61, .355, 1)
}

.rating-control .current-rating:active {
    cursor: -webkit-grabbing;
    cursor: grabbing
}

.rating-control .current-rating .svg-wrapper {
    position: relative;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.08);
    pointer-events: none
}

.rating-control .current-rating .svg-wrapper svg {
    position: absolute;
    width: 55px;
    height: 55px;
    top: 0;
    left: 0;
    will-change: transform
}

@media (-webkit-min-device-pixel-ratio:2),
(min-device-pixel-ratio:2),
(min-resolution:2dppx) {
    .rating-control .current-rating .svg-wrapper svg {
        -webkit-transform: translate(.5px, .5px);
        transform: translate(.5px, .5px)
    }
}

.rating-control .current-rating .touch-marker {
    bottom: -10px;
    left: 50%;
    margin-left: -5px
}

.rating-control .rating-option 
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin-top: 9px;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)

.rating-control .rating-option
  animation fadein 0.75s cubic-bezier(0.25, 0.25, 0.25, 1.25) both 
  for num in (1..5)
    &:nth-child({num})
      animation-delay num * (.02s)

.rating-control .current-rating 
  opacity 1


@keyframes fadein
  0% 
    opacity 0
    transform translateX(50%) scale(0) rotateZ(-60deg)
  100%
    opacity 1
    transform translateX(0) scale(1) rotateZ(0deg)

.rating-control .rating-option:active .icon img,
.rating-control .rating-option.active .icon img{
    fill: #8B959A
}

.rating-control .rating-option:active .label,
.rating-control .rating-option.active .label {
    color: #313B3F !important
}

.rating-control .rating-option .icon {
    width: 36px;
    height: 36px;
    will-change: transform
}

.rating-control .rating-option .icon img {

}

.rating-control .rating-option .icon img {
    transition: fill .1s ease-in-out
}

.rating-control .rating-option .label {
    font-size: 12px;
    font-weight: 500;
    color: #ABB2B6;
    margin-top: 8px;
    will-change: transform;
    transition: color .1s ease-in-out
    padding-top: 8px;
}


.rating-control .rating-option .touch-marker {
    bottom: 15px;
    left: 50%;
    margin-left: -18px
}</style>