<template>
    <div>
        <h2>Calificación: {{ rating }}</h2>
        <OptionsStarts :max-stars="5" :rating.sync="rating"></OptionsStarts>
    </div>
</template>
  

<script>


export default {

    data() {
        return {
            rating: 0
        }
    },
    mounted() {

    },
    watch: {
        rating: function () {
            console.log(this.rating);
        }
    },
    methods: {
    },
}
</script>
  