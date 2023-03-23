import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import unocss from "unocss/astro";
import { vritePlugin } from "@vrite/sdk/astro";
import { loadEnv } from "vite";

const { VRITE_ACCESS_TOKEN, VRITE_CONTENT_GROUP_ID } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  ""
);

export default defineConfig({
  integrations: [
    unocss(),
    solidJs(),
    sitemap(),
    vritePlugin({
      accessToken: VRITE_ACCESS_TOKEN,
      contentGroupId: VRITE_CONTENT_GROUP_ID,
    }),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  site: "https://vrite.io",
  server: {
    port: 3000,
    host: true,
  },
});
