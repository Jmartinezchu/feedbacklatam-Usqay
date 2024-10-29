
<template>
    <div>
        <h2>Califica nuestro servicio:</h2>
        <!-- <RangoCaritas :valorInicial="3" /> -->
        <div class="wrapper">
            <input type="radio" :checked="valor === 1" name="rate" id="star-1" class="star-1" @click="valor = 1">
            <input type="radio" :checked="valor === 2" name="rate" id="star-2" class="star-2" @click="valor = 2">
            <input type="radio" :checked="valor === 3" name="rate" id="star-3" class="star-3" @click="valor = 3">
            <input type="radio" :checked="valor === 4" name="rate" id="star-4" class="star-4" @click="valor = 4">
            <input type="radio" :checked="valor === 5" name="rate" id="star-5" class="star-5" @click="valor = 5">
            <!-- {{ valor }} -->
            <div class="content">
                <div class="outer">
                    <div class="emojis">
                        <li class="slideImg"><img src="https://tinypic.host/images/2023/03/11/pngegg-5.png" alt=""></li>
                        <li><img src="https://tinypic.host/images/2023/03/11/pngegg-4.png" alt=""></li>
                        <li><img src="https://tinypic.host/images/2023/03/11/pngegg-2.png" alt=""></li>
                        <li><img src="https://tinypic.host/images/2023/03/11/pngegg-3.png" alt=""></li>
                        <li><img src="https://tinypic.host/images/2023/03/11/pngegg-6.png" alt=""></li>
                    </div>
                </div>
                <div class="stars">
                    <label for="star-1" class="star-1 fas fa-star"></label>
                    <label for="star-2" class="star-2 fas fa-star"></label>
                    <label for="star-3" class="star-3 fas fa-star"></label>
                    <label for="star-4" class="star-4 fas fa-star"></label>
                    <label for="star-5" class="star-5 fas fa-star"></label>
                </div>
                <span class="numb"></span>
            </div>
            <div class="footer">
                <span class="text"></span>
                <span class="numb"></span>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'FeedbackCaritas2',

    data() {
        return {
            valor: 1
        };
    },

    mounted() {

    },

    methods: {
        // mensaje() {
        //     console.log(this.valor);
        // }
    },
    watch: {
        valor: function () {
            // console.log(this.valor);
        }
    }
};
</script>
<style>
.wrapper {
    background: #f6f6f6;
    max-width: 360px;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
}

.wrapper .content {
    padding: 30px;
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
    margin-top: 30px;
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

.wrapper .footer {
    border-top: 1px solid #ccc;
    background: #f2f2f2;
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

.footer .text::before {
    content: "Rate your experience";
}

.footer .numb::before {
    content: "0 out of 5";
}

.star-1:checked~.footer .text::before {
    content: "I just hate it";
}

.star-1:checked~.footer .numb::before {
    content: "1 out of 5";
}

.star-2:checked~.footer .text::before {
    content: "I don't like it";
}

.star-2:checked~.footer .numb::before {
    content: "2 out of 5";
}

.star-3:checked~.footer .text::before {
    content: "This is awesome";
}

.star-3:checked~.footer .numb::before {
    content: "3 out of 5";
}

.star-4:checked~.footer .text::before {
    content: "I just like it";
}

.star-4:checked~.footer .numb::before {
    content: "4 out of 5";
}

.star-5:checked~.footer .text::before {
    content: "I just love it";
}

.star-5:checked~.footer .numb::before {
    content: "5 out of 5";
}

input[type="radio"] {
    display: none;
}
</style>