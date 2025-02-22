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
                    proxy.on("error", (err, _req, _res) => {
                        console.log("proxy error", err)
                        console.table({
                            err,
                            request: _req,
                            response: _res,
                        })
                    })
                    proxy.on("proxyReq", (_, req, _res) => {
                        console.log("Sending Request to the Target:", req.method, req.url)
                        console.table({
                            request: req,
                            response: _res,
                        })
                    })
                    proxy.on("proxyRes", (proxyRes, req, _res) => {
                        console.log("Received Response from the Target:", proxyRes.statusCode, req.url)
                        console.table({
                            proxyRes,
                            request: req,
                            response: _res,
                        })
                    })
                },
            },
        },
    },
})
