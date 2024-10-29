<template>
    <div>
        <div class="flex_center">
            <div class="coment">
                <h5>Estamos muy felices de que nos ayudes a mejorar</h5>
                <p>Escribe aqui tus <span :style="{ color: colorText }">{{ typemsg }}</span></p>
                <div class="form-floating mb-3">
                    <textarea v-model="text" class="form-control input_large" placeholder="Dejanos tu comentraio"
                        id="mensaje"></textarea>
                    <label for="floatingTextarea">Dejanos aqui tus <span :style="{ color: colorText }">{{ typemsg
                    }}</span></label>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            typemsg: JSON.parse(localStorage.getItem("typeEval")),
            text: ''
        };
    },

    computed: {
        colorText: function () {
            let postcolor = "";
            let text = this.typemsg;
            if (text == "Felicitaciones") {
                postcolor = `rgb(49, 221, 49)`;//verde
            } else if (text == "Sugerencias") {
                postcolor = `rgb(211, 187, 45)`;//amarillo
            } else if (text == "Reclamos") {
                postcolor = `rgb(234, 22, 22)`;//rojo
            }
            return postcolor;
        }
    }


}
</script>
<style>

</style>