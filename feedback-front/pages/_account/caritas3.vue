<template>
    <div class="d-flex justify-content-between align-items-center">
        <div> <img src='/img/svg/1.svg' alt="Muy insatisfecho" @click="rating = 1" class="rating-icon"
                :class="{ backColor1: this.rating === 1 }" /></div>
        <div> <img src='/img/svg/2.svg' alt="Insatisfecho" @click="rating = 2" class="rating-icon"
                :class="{ backColor2: this.rating === 2 }" /></div>
        <div> <img src='/img/svg/3.svg' alt="Neutral" @click="rating = 3" class="rating-icon"
                :class="{ backColor3: this.rating === 3 }" /></div>
        <div> <img src='/img/svg/4.svg' alt="Satisfecho" @click="rating = 4" class="rating-icon"
                :class="{ backColor4: this.rating === 4 }" /></div>
        <div><img src='/img/svg/5.svg' alt="Muy satisfecho" @click="rating = 5" class="rating-icon"
                :class="{ backColor5: this.rating === 5 }" /></div>
    </div>
</template>
  
<script>
export default {
    layout: 'clientes',
    data() {
        return {
            rating: 3
        }
    },
}
</script>
  
<style>
.rating-icon {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
}

.rating-icon:hover:active {
    border-radius: 50%;
    /* background-color: #F00 */
}

.backColor1 {
    box-shadow: 0px 0px 12px 9px #f00;
    border-radius: 50%;

}

.backColor2 {
    box-shadow: 0px 0px 12px 9px rgb(160, 55, 55);
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
}

.backColor3 {
    box-shadow: 0px 0px 12px 9px rgb(75, 44, 44);
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
}

.backColor4 {
    box-shadow: 0px 0px 12px 9px rgb(53, 120, 53);
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
}

.backColor5 {
    box-shadow: 0px 0px 12px 9px rgb(17, 175, 25);
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
}
</style>
  