<template>
    <div>
        <div v-if="user.rol_id != 5">
            <AcountCompanie />
        </div>
        <div v-if="user.rol_id === 5">
            <AcountCliente />
        </div>
    </div>
</template>

<script>
export default {
    name: 'FeedbackAppIndexAccount',

    data() {
        return {
            user: []
        };
    },

    mounted() {
        this.user = JSON.parse(localStorage.getItem("user"))
        // console.log(this.user);
        if (this.user === {} || this.user.length === 0 || this.user === null || this.user === undefined) {
            location.href = '/'
        }
    },


    methods: {
    },
};
</script>

<style lang="scss" scoped></style>