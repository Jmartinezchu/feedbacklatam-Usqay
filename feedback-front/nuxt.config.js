const nodeExternals = require("webpack-node-externals");
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "feedback-app",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        "http-equiv": "Content-Language",
        content: "es",
      },
      {
        hid: "description",
        name: "description",
        content:
          "Tu app de encuestas, lista para gestionar la opinion de tus clientes",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons",
      },
    ],
    script: [
      //  { type: 'text/javascript', src: 'https://kit.fontawesome.com/42d5adcbca.js', crossorigin: 'anonymous' },
      // { type: "text/javascript", src: "/js/kit_fontawasome.js" },
      // { type: "text/javascript", src: "/js/popper.min.js" },
      // { type: "text/javascript", src: "/js/bootstrap.min.js" },
      // { type: "text/javascript", src: "/js/perfect-scrollbar.min.js" },
      // { type: "text/javascript", src: "/js/smooth-scrollbar.min.js" },
      // { type: "text/javascript", src: "/js/ruleta.js" },
    ],
  },
  // target: "static",
  server: {
    // host: "34.202.64.13", // default: localhost,
    // port: 80, // default: 3000
  },
  modules: [
    "@nuxtjs/pwa",
    "@neneos/nuxt-animate.css",
    "vue-sweetalert2/nuxt",
    "@nuxtjs/axios",
  ],

  axios: {
    proxy: true,
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  css: [
    "normalize.css/normalize.css",
    // '~/assets/bootstrap/bootstrap.min.css',
    "animate.css/animate.min.css",
    "vue-slick-carousel/dist/vue-slick-carousel.css",
    "vue-slick-carousel/dist/vue-slick-carousel-theme.css",
    // "~/static/css/nucleo-icons.css",
    // "~/static/css/nucleo-svg.css",
    // "~/static/css/panel.css",
    // "~/static/css/panel-02.css",
    // "~/assets/css/app.styl",
    // "~/static/css/styles.css",
  ],

  plugins: [
    { src: "~/plugins/vuetify.js" },
    { src: "~/plugins/EmojiPicker.js" },
    { src: "~/plugins/vueQR.js", mode: "client" },
    { src: "~/plugins/vue-emojis/vue-emojis.js", mode: "client" },
    { src: "~/plugins/vue-tour/vue-tour.js", mode: "client" },
    { src: "~/plugins/chart/chart.js", mode: "client" },
    // { src: "~/plugins/carrusel/carrusel.js", mode: "client" },
    // { src: "~/plugins/sweetalert2.js", mode: "client" }
  ],
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#ff0000" },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^vuetify/],
    plugins: [new VuetifyLoaderPlugin()],
    extractCSS: true,
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        });
      }
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/],
          }),
        ];
      }
    },
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        });
      }
    },
  },

  // buildModules: [
  //   // Simple usage
  //   "@nuxtjs/vuetify",

  //   // With options
  //   [
  //     "@nuxtjs/vuetify",
  //     {
  //       /* module options */
  //     },
  //   ],
  // ],
  pwa: {
    meta: {
      title: "FeedBack",
      author: "FeddBack",
      // mobileAppIOS: true,
    },
    manifest: {
      lang: "en",
      useWebmanifestExtension: false,
      icons: [
        {
          purpose: "any maskable",
          sizes: "512x512",
          src: "/icon.png",
          type: "image/png",
        },
      ],
    },
  },
};
