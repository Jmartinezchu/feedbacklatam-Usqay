<template>
    <v-app>
        <!-- <header id="home" class="hero-area">
            <div class="overlay" style="height: 100vh;">
                <span></span>
                <span></span>
            </div>
            <CustomersHeaderBlog></CustomersHeaderBlog>

        </header> -->
        <CustomersHeaderBlog></CustomersHeaderBlog>
        <nuxt />
        <footer>
            <BlogFooter />
        </footer>
        <!-- Footer Section End -->


        <!-- Go To Top Link -->
        <a href="#" class="back-to-top">
            <v-icon class="text-white">expand_less</v-icon>
        </a>
    </v-app>
</template>
<script>
export default {
    head: {
        title: "Feedback-Blog",
        link: [
            { rel: "stylesheet", type: "text/css", href: "/css/blog_bootstrap.min.css" },
            { rel: "stylesheet", type: "text/css", href: "/css/blog_owl.carousel.css" },
            { rel: "stylesheet", type: "text/css", href: "/css/blog.css" },
            { rel: "stylesheet", type: "text/css", href: "/css/blog_responsive.css" },
        ],
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            {
                "http-equiv": "Content-Language",
                content: "es",
            },],
        script: [
            { type: "text/javascript", src: "/js/blog_jquery-min.js" },
            { type: "text/javascript", src: "/js/blog_bootstrap.min.js" },
            { type: "text/javascript", src: "/js/blog_owl.carousel.js" },
            { type: "text/javascript", src: "/js/blog.js" },
        ],

    },
}
</script>