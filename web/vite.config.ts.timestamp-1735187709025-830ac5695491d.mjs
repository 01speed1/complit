// vite.config.ts
import { vitePlugin as remix } from "file:///code/node_modules/.pnpm/@remix-run+dev@2.15.2_@remix-run+react@2.15.2_react-dom@18.3.1_react@18.3.1__react@18.3.1_typ_i2z627cnqa2qhg4ovwo3nu3be4/node_modules/@remix-run/dev/dist/index.js";
import { defineConfig } from "file:///code/node_modules/.pnpm/vite@5.4.11_@types+node@22.10.2/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///code/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.7.2_vite@5.4.11_@types+node@22.10.2_/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true
      }
    }),
    tsconfigPaths()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvY29kZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2NvZGUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2NvZGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyB2aXRlUGx1Z2luIGFzIHJlbWl4IH0gZnJvbSBcIkByZW1peC1ydW4vZGV2XCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcblxuZGVjbGFyZSBtb2R1bGUgXCJAcmVtaXgtcnVuL25vZGVcIiB7XG4gIGludGVyZmFjZSBGdXR1cmUge1xuICAgIHYzX3NpbmdsZUZldGNoOiB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZW1peCh7XG4gICAgICBmdXR1cmU6IHtcbiAgICAgICAgdjNfZmV0Y2hlclBlcnNpc3Q6IHRydWUsXG4gICAgICAgIHYzX3JlbGF0aXZlU3BsYXRQYXRoOiB0cnVlLFxuICAgICAgICB2M190aHJvd0Fib3J0UmVhc29uOiB0cnVlLFxuICAgICAgICB2M19zaW5nbGVGZXRjaDogdHJ1ZSxcbiAgICAgICAgdjNfbGF6eVJvdXRlRGlzY292ZXJ5OiB0cnVlLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICB0c2NvbmZpZ1BhdGhzKCksXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaU0sU0FBUyxjQUFjLGFBQWE7QUFDck8sU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxtQkFBbUI7QUFRMUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLE1BQ0osUUFBUTtBQUFBLFFBQ04sbUJBQW1CO0FBQUEsUUFDbkIsc0JBQXNCO0FBQUEsUUFDdEIscUJBQXFCO0FBQUEsUUFDckIsZ0JBQWdCO0FBQUEsUUFDaEIsdUJBQXVCO0FBQUEsTUFDekI7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGNBQWM7QUFBQSxFQUNoQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
