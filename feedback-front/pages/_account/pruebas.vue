<template>
    <div>
        <v-expansion-panel v-model="panel" focusable>
            <v-expansion-panel-content v-for="qst in questions" :key="qst.id"
                v-if="qst.tipo != 'numbers' && qst.tipo != 'booleam'">
                <div class="col-md-12 my-2" slot="header">
                    <h6 class=""><span>{{ qst.titulo }} </span></h6>
                </div>
                <v-card>
                    <div class="card_parts">
                        <!-- <h2 class="categoria">{{ qst.titulo }}</h2> -->
                        <p class="question">{{ qst.question }}</p>
                    </div>
                    <div class="card_parts_end">
                        <div class="btnYesNo " v-if="qst.sub_titulos === null">
                            <div v-if="qst.options != null">
                                <div class="slider">
                                    <label class="response_question" for="range" :style="{ color: getHappinessColor }">
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
                            </div>
                        </div>
                        <div class="slider" v-else v-for="data in qst.sub_titulos" :key="data.id">
                            <label class="response_question" for="range" :style="{ color: getHappinessColor }">
                                <span>{{ data.titulo }}-</span>{{ mostrar(data) }}</label>
                            <input v-model="data.val" type="range" min="0" max="100" />

                            <div class="outer">
                                <label :style="{ width: `${data.val}%`, borderRadius: greaterThanFifty }" for="range"
                                    aria-hidden="true" class="inner">
                                    <span :style="{ right: getPlacement }">
                                        {{ String.fromCodePoint("0x" + data.icon) }}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script>
export default {
    name: 'FeedbackPruebas',

    data() {
        return {
            panel: 0,
        };
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style lang="scss" scoped></style>