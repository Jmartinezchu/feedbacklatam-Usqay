<template>
    <div>
        <div class="rating-container">
            <div class="rating-control">
                <div class="rating-option" rating="1" selected-fill="#FFA98D">
                    <div class="icon" @click="consol()">
                        <img src="/img/svg/1.svg" alt="">
                    </div>
                    <div class="label">Muy Insatisfecho</div>
                    <!-- <div class="touch-marker"></div> -->
                </div>
                <div class="rating-option" rating="2" selected-fill="#FFC385">
                    <div class="icon" @click="consol()">
                        <img src="/img/svg/2.svg" alt="">
                    </div>
                    <div class="label"></div>
                    <!-- <div class="touch-marker"></div> -->
                </div>
                <div class="rating-option" rating="3">
                    <div class="icon" @click="consol()">
                        <img src="/img/svg/3.svg" alt="">
                    </div>
                    <div class="label">Puede Mejorar</div>
                    <!-- <div class="touch-marker"></div> -->
                </div>
                <div class="rating-option" rating="4">
                    <div class="icon" @click="consol()">
                        <img src="/img/svg/4.svg" alt="">
                    </div>
                    <div class="label"></div>
                    <!-- <div class="touch-marker"></div> -->
                </div>
                <div class="rating-option" rating="5">
                    <div class="icon" @click="consol()">
                        <img src="/img/svg/5.svg" alt="">
                    </div>
                    <div class="label">Muy Satisfecho</div>
                    <!-- <div class="touch-marker"></div> -->
                </div>


                <!-- <div class="current-rating">
                    <div class="svg-wrapper"></div>
                    <div class="touch-marker"></div>
                </div> -->
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'FeedbackCaritas',
    layout: 'clientes',
    header: {
        scripts: {
            type: 'text/javascript',
            src: ' https://unpkg.com/vue'
        }
    },
    data() {
        return {
            message: ''
        };
    },
    mounted: function () {
    },

    methods: {
        consol() {
            // console.log('click');
        }
    },
};
</script>

<style lang="stylus" scoped>
body.dragging,
body.dragging .rating-option {
  cursor: -webkit-grabbing !important;
  cursor: grabbing !important;
  -webkit-font-smoothing: antialiased;
}
.rating-container {
    display: flex;
    justify-content: center;
}

.touch-marker {
    position: absolute;
    width: 37px;
    height: 37px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.06);
    -webkit-transform: scale(2);
    transform: scale(2);
    opacity: 0;
    transition-property: -webkit-transform, opacity;
    transition-property: transform, opacity;
    transition-duration: .25s;
    transition-timing-function: cubic-bezier(.215, .61, .355, 1);
    pointer-events: none;
    will-change: transform
}

.show-touch .touch-marker {
    -webkit-transform: none;
    transform: none;
    opacity: 1
}

.rating-control {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    position: relative;
    width: 100%;
    max-width: 300px;
    padding-bottom: 9px
}

.rating-control::before {
    content: "";
    position: absolute;
    width: 80%;
    height: 2px;
    top: 50%;
    margin-top: -13px;
    left: 10%;
    background-color: #E9ECEE
}

.rating-control .current-rating {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: absolute;
    width: 20%;
    height: 55px;
    top: 0;
    left: 0;
    will-change: transform;
    cursor: -webkit-grab;
    cursor: grab
    opacity 0
    transition opacity 0.4875s cubic-bezier(.215, .61, .355, 1)
}

.rating-control .current-rating:active {
    cursor: -webkit-grabbing;
    cursor: grabbing
}

.rating-control .current-rating .svg-wrapper {
    position: relative;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.08);
    pointer-events: none
}

.rating-control .current-rating .svg-wrapper svg {
    position: absolute;
    width: 55px;
    height: 55px;
    top: 0;
    left: 0;
    will-change: transform
}

@media (-webkit-min-device-pixel-ratio:2),
(min-device-pixel-ratio:2),
(min-resolution:2dppx) {
    .rating-control .current-rating .svg-wrapper svg {
        -webkit-transform: translate(.5px, .5px);
        transform: translate(.5px, .5px)
    }
}

.rating-control .current-rating .touch-marker {
    bottom: -10px;
    left: 50%;
    margin-left: -5px
}

.rating-control .rating-option 
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin-top: 9px;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)

.rating-control .rating-option
  animation fadein 0.75s cubic-bezier(0.25, 0.25, 0.25, 1.25) both 
  for num in (1..5)
    &:nth-child({num})
      animation-delay num * (.02s)

.rating-control .current-rating 
  opacity 1


@keyframes fadein
  0% 
    opacity 0
    transform translateX(50%) scale(0) rotateZ(-60deg)
  100%
    opacity 1
    transform translateX(0) scale(1) rotateZ(0deg)

.rating-control .rating-option:active .icon img,
.rating-control .rating-option.active .icon img{
    fill: #8B959A
}

.rating-control .rating-option:active .label,
.rating-control .rating-option.active .label {
    color: #313B3F !important
}

.rating-control .rating-option .icon {
    width: 36px;
    height: 36px;
    will-change: transform
}

.rating-control .rating-option .icon img {

}

.rating-control .rating-option .icon img {
    transition: fill .1s ease-in-out
}

.rating-control .rating-option .label {
    font-size: 12px;
    font-weight: 500;
    color: #ABB2B6;
    margin-top: 8px;
    will-change: transform;
    transition: color .1s ease-in-out
}


.rating-control .rating-option .touch-marker {
    bottom: 15px;
    left: 50%;
    margin-left: -18px
}</style>