import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import rehypePrettyCode from "rehype-pretty-code";
import customPro from "./src/styles/custom-pro.json";
import rehypeMermaid from "rehype-mermaid";

import cloudflare from "@astrojs/cloudflare";

const options = {
  // Specify the theme to use or a custom theme json, in our case
  // it will be a moonlight-II theme from
  // https://github.com/atomiks/moonlight-vscode-theme/blob/master/src/moonlight-ii.json
  theme: customPro,
};

const isPreview =
  process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== "main";

export default defineConfig({
  site: isPreview ? process.env.CF_PAGES_URL : "https://ramp.codes",
  integrations: [mdx(), sitemap({}), tailwind()],
  output: "server",

  markdown: {
    syntaxHighlight: false, // Disable syntax built-in syntax hightlighting from astro
    rehypePlugins: [rehypeMermaid, [rehypePrettyCode, options]],
    extendDefaultPlugins: true,
  },

  adapter: cloudflare(),
});
