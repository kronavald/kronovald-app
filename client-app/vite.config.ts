import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                rewrite: (path) => path.replace(/^\/api/, ""),
                changeOrigin: true,
                secure: false,
                ws: true,
                configure: (proxy) => {
                    proxy.on("error", (err) => {
                        console.log("proxy error", err)
                    })
                    proxy.on("proxyReq", (_, req) => {
                        console.log("Sending Request to the Target:", req.method, req.url)
                    })
                    proxy.on("proxyRes", (proxyRes, req) => {
                        console.log("Received Response from the Target:", proxyRes.statusCode, req.url)
                    })
                },
            },
        },
    },
})
