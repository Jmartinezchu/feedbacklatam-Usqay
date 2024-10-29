<template>
    <div class="star-rating">
        <span v-for="n in maxStars" :key="n" class="star" :class="{ filled: n <= rating }" @click="setRating(n)">
            <i class="fa fa-star"></i>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        maxStars: {
            type: Number,
            default: 5
        },
        rating: {
            type: Number,
            default: 3
        }
    },
    mounted() {

    },
    methods: {
        setRating(n) {
            this.$emit('update:rating', n);
        },
    }
}
</script>

<style scoped>
.star-rating {
    display: flex;
}

.star {
    color: #ccc;
    cursor: pointer;
    font-size: 1.5rem;
}

.filled {
    color: #fd4;
}

span i {
    padding: 0 10px;
    font-size: 30px;

}
</style>
