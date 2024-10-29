<template>
    <div>
        <div class="btnPrimary" style="display:flex; flex-direction:column">
            <p style="text-align:center; margin-bottom:-10px">click aqui para conocer tu premio</p>
            <button type="button" style="float:left;" id="spin">Promoción</button>
        </div>
        <canvas id="canvas" width="500" height="500"></canvas>
    </div>
    <!-- <div>aqui va la ruleta</div> -->
</template>

<script>
// import "../../static/js/ruleta"

export default {
    name: 'FeedbackIndexRuleta',
    head: {
        script: [
            { type: 'text/javascript', src: '/js/ruleta.js' }
        ]
    },
    data() {
        return {

        };
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style lang="scss" scoped></style>