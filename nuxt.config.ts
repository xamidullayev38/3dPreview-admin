// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-08-08',
  devtools: { enabled: true },
  srcDir: '.',
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss'],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'model-viewer'
    }
  },
  app: {
    head: {
      title: '3dView — Admin Management Console',
      meta: [
        { name: 'description', content: 'Admin panel to manage, inspect, and upload 3D models.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap' }
      ],
      script: [
        {
          type: 'module',
          src: 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js'
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://vi-e40df1d09e0c41b8a2027511c9203ac9.ecs.eu-north-1.on.aws'
    }
  }
})
