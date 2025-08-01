// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],

//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:4000', // Dirección del backend
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''), // Ajusta según sea necesario
//       },
//     },
//   },
//   css: {
//     modules: {
//       localsConvention: "camelCase",
//     },
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
})
