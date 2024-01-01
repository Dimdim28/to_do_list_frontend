import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import sass from 'sass'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: '',
    server: {
      open: true,
      port: 3000,
    },
    plugins: [react(), viteTsconfigPaths()],
    css: {
      modules: true,
      preprocessorOptions: {
        scss: {
          implementation: sass,
        },
      },
    },
    define: {
      'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL),
      'process.env.REACT_SOCKETS_API_URL': JSON.stringify(env.REACT_SOCKETS_API_URL),
    },
    optimizeDeps: {
      exclude: ['events'],
    },
  }
})
