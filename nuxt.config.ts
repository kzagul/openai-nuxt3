// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            openaiApiKey: process.env.OPENAI_API_KEY
        },
    },
    css: [
        '~/assets/css/main.css'
    ],
})
