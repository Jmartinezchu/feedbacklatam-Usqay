<template>
    <div>
        <nuxt />
    </div>
</template>
<script>
export default {
    head: {
        title: "Feedback",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            {
                "http-equiv": "Content-Language",
                content: "es",
            },],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons",
            },
            { rel: "stylesheet", type: "text/css", href: "/css/nucleo-icons.css" },
            { rel: "stylesheet", type: "text/css", href: "/css/nucleo-svg.css" },
            { rel: "stylesheet", type: "text/css", href: "/css/panel.css" },
            { rel: "stylesheet", type: "text/css", href: "/css/panel-02.css" },
            // { rel: "stylesheet", type: "text/css", href: "/css/app.styl" },
            { rel: "stylesheet", type: "text/css", href: "/css/styles.css" },
        ],
        script: [
            //  { type: 'text/javascript', src: 'https://kit.fontawesome.com/42d5adcbca.js', crossorigin: 'anonymous' },
            { type: "text/javascript", src: "/js/kit_fontawasome.js" },
            { type: "text/javascript", src: "/js/popper.min.js" },
            { type: "text/javascript", src: "/js/bootstrap.min.js" },
            { type: "text/javascript", src: "/js/perfect-scrollbar.min.js" },
            { type: "text/javascript", src: "/js/smooth-scrollbar.min.js" },
            // { type: "text/javascript", src: "/js/ruleta.js" },
        ],

    },

    data() {
        return {
            fixed: false,
        }
    },
}
</script>