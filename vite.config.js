<<<<<<< Updated upstream
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
>>>>>>> Stashed changes

// https://vite.dev/config/
export default defineConfig({
  define: {
    "import.meta.env.MODE": '"production"',
  },
  plugins: [react()],
<<<<<<< Updated upstream
})
=======
  build: {
    rollupOptions: {
      external: ["@rollup/rollup-linux-x64-gnu"],
    },
  },
});
>>>>>>> Stashed changes
