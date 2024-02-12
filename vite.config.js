import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.TMDB_ACCESS_TOKEN": JSON.stringify(env.TMDB_ACCESS_TOKEN),
      "process.env.TMDB_API_KEY": JSON.stringify(env.TMDB_API_KEY),
      "process.env.YOUTUBE_API_KEY": JSON.stringify(env.YOUTUBE_API_KEY),
    },
    plugins: [react()],
  };
});
