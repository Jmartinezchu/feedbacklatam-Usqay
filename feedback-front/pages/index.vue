<template>
  <div>
    <!-- <header class="hero-area">
      <div class="container">
        <div class="row space-100">
          <div class="col-lg-6 col-md-12 col-xs-12">
            <div class="contents" style="height:100vh">
              <h2 class="head-title"><span style="font-size:50px; color: red">Feedback</span>

              </h2>
              <div>
                <h4>
                  Tu sistema de <span>encuenstas</span>, listo para <span>gestionar la opinion</span> de tus
                  <span>clientes</span>
                </h4>
              </div>
              <div>
                <p><i>Inpulsa tu negocio: Opiniones de clientes, mejoras, gestion multi-sucursal y más. ¡Hecho a tu
                    medidia!</i></p>
              </div>
              <div class="header-button">
                <nuxt-link to="/home/register" class="btn btn-border page-scroll">
                  <strong>
                    INICIA GRATIS AHORA
                  </strong>
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="col-lg-6 mt-5">
            <img src="/img/home.png" alt="" style="width:100%">
          </div>
          <div class=" col-md-2 col-xs-12 p-0">
            <div class="intro-img animate__fadeInDown">
              <img src="/img/views/home1.png" alt="">
              <img src="/img/home.png" alt="" style="width:auto">
            </div>
          </div>
        </div>
      </div>
    </header> -->
    <NewlandingHome style="height:100vh" />



    <div style="height:30px; background-color:#c7c7c7"></div>
    <div style="height:30px; background-color:#929292"></div>
    <div style="height:30px; background-color:#606060"></div>
    <div style="height:30px; background-color:#333333"></div>
    <NewlandingDescubre style="background-color:#222222" />
    <div style="height:30px; background-color:#333333"></div>
    <div style="height:30px; background-color:#606060"></div>
    <div style="height:30px; background-color:#929292"></div>
    <div style="height:30px; background-color:#c7c7c7"></div>


    <!-- Services Section Start -->
    <BlogServices />
    <!-- Services Section End -->
    <!-- Cool Fetatures Section Start -->
    <BlogFeatures />
    <!-- Cool Fetatures Section End -->
    <!-- Business Plan Section Start -->
    <BlogBusinessplan />
    <!-- Business Plan Section End -->

    <!-- Recent Clientes Section Start -->
    <BlogClients />
    <div style="height:30px; background-color:#c7c7c7"></div>
    <div style="height:30px; background-color:#929292"></div>
    <div style="height:30px; background-color:#606060"></div>
    <!-- <div style="height:30px; background-color:#333333"></div> -->
    <!-- Recent Clientes Section End -->
    <!-- Our Pricing Plan Section Start -->
    <!-- <BlogCardPrice /> -->
    <!-- Our Pricing Plan Section End -->
    <!-- Client Testimoninals Section Start -->
    <!-- <BlogVideo /> -->
    <!-- Client Testimoninals Section End -->
    <!-- Team section Start -->
    <!-- <BlogTeam /> -->
    <!-- Team section End -->
    <!-- Blog Section -->
    <!-- <BlogComents /> -->
    <!-- blog Section End -->
    <!-- Contact Us Section -->
    <!-- <BlogContact /> -->
    <!-- Contact Us Section End -->

  </div>
</template>

<script>
export default {
  name: 'FeedbackIndex',
  layout: 'blog',
  data() {
    return {
      model: null,
    };
  },

  mounted() {
  },

  methods: {

  },
};
</script>

<style scoped>
.v-slide-group__content {
  justify-content: center;
}

div h4 {
  /* font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */
  font-weight: 800;
  color: #333;
  line-height: 1.5;
  letter-spacing: 4px
}

div h4 span {
  color: red
}

p i {
  color: #3338;
  font-size: 25px
}
</style>