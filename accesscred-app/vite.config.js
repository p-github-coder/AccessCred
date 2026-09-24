import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev-time proxies avoid CORS problems when calling the public job APIs.
const proxy = {
  '/proxy/remotive': { target: 'https://remotive.com', changeOrigin: true, rewrite: (p) => p.replace(/^\/proxy\/remotive/, '/api') },
  '/proxy/arbeitnow': { target: 'https://www.arbeitnow.com', changeOrigin: true, rewrite: (p) => p.replace(/^\/proxy\/arbeitnow/, '/api') },
}
export default defineConfig({ plugins: [react()], server: { proxy }, preview: { proxy } })
