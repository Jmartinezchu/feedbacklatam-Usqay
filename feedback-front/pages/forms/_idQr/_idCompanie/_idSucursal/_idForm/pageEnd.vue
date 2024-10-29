<template>
    <div class="container_index">
        <div class="card_todo_question cente">
            <div class="cente animate__animated animate__fadeInRight">
                <div class="topPage animate__animated animate__rotateInDownLeft">
                    <div class="cont_logo">
                        <div class="flex_center">
                            <img :src="`${images}/1679406402252-Logo.png`" alt="">
                            <!-- <h2>{{ autor }}</h2> -->
                        </div>
                    </div>
                </div>
                <h4>Gracias por participar</h4>
            </div>

        </div>
    </div>
</template>

<script>
import images from '../../../../../../api/URL_imges';

export default {
    name: 'FeedbackPageEnd',
    layout: 'clientes',
    data() {
        return {
            images: images
        };
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style scoped>
.cente {
    display: flex;
    flex-direction: column;
    justify-content: center !important;
    align-items: center !important;
    align-content: center !important;
}
</style>