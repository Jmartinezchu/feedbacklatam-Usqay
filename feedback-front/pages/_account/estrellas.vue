<template>
    <div>
        <div>
            <v-rating v-model=rating background-color="deep-danger lighten-2" color="amber"
                @input="changeVal(rating, itemId)" dense size="20"></v-rating>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FeedbackEstrellas',
    props: {
        // itemId: Number,
        // itemRating: String
    },
    data() {
        return {
            itemId: 1,
            itemRating: 5,
            rating: parseInt(this.itemRating)
        };
    },

    mounted() {

    },

    methods: {
        changeVal(value, itemId) {
            console.log(value);
        }

    },
};
</script>

<style lang="scss" scoped></style>