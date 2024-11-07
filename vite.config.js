import { defineConfig } from "vite";

export default defineConfig(() => ({
  build: {
  },
  test: {
    poolOptions: { threads: 'singleThread' },
    globals: true,
    environment: ['happy-dom'],
    reporters: ['verbose'],
  },
}))
