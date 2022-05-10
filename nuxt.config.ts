import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Nuxt3 Example',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    },
  },
  css: [
    '~/assets/main.css'
  ],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    }
  }
  
})
