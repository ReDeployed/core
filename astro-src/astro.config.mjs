import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import deno from "@astrojs/deno";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  output: "server",
  adapter: deno()
});