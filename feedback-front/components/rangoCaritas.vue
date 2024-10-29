<!-- <template>
    <div class="rango-caritas">
        <div v-for="carita in caritas" :key="carita.id" @click="seleccionar(carita)">
            <i :class="carita.icono"></i>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        caritas: {
            type: Array,
            required: true
        },
        valorSeleccionado: {
            type: String,
            default: ''
        }
    },
    methods: {
        seleccionar(carita) {
            this.$emit('seleccionar', carita);
        }
    }
};
</script>
  
<style>
.rango-caritas {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.rango-caritas div {
    cursor: pointer;
}
</style>
   -->

<template>
    <div>
        <i class="far fa-angry" :class="{ 'selected': rating >= 1 }" @click="seleccionar(1)"></i>
        <i class="far fa-frown" :class="{ 'selected': rating >= 2 }" @click="seleccionar(2)"></i>
        <i class="far fa-meh" :class="{ 'selected': rating >= 3 }" @click="seleccionar(3)"></i>
        <i class="far fa-smile" :class="{ 'selected': rating >= 4 }" @click="seleccionar(4)"></i>
        <i class="far fa-grin-stars" :class="{ 'selected': rating >= 5 }" @click="seleccionar(5)"></i>
    </div>
</template>
  
<script>
export default {
    props: {
        valorInicial: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            rating: this.valorInicial
        }
    },
    methods: {
        seleccionar(valor) {
            this.rating = valor;
        }
    }
}
</script>
  
<style>
.selected {
    color: gold;
}
</style>
  