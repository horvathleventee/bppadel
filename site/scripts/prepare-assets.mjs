import sharp from "sharp";
import { readdir, writeFile, readFile } from "node:fs/promises";
import { load } from "cheerio";
const widths = [160, 320, 360, 640, 960, 1440, 1920];
for (const file of await readdir("content")) {
  if (!/\.(png|jpg|webp)$/.test(file)) continue;
  for (const width of widths)
    await sharp(`content/${file}`)
      .resize(width, undefined, { withoutEnlargement: true })
      .webp({ quality: 83 })
      .toFile(`public/images/${file.replace(/\.[^.]+$/, "")}-${width}.webp`);
}
for (const slug of ["impresszum", "adatkezelesi-tajekoztato"]) {
  const $ = load(await readFile(`docs/original-${slug}.html`, "utf8"));
  const root = $("main").length
    ? $("main")
    : $('[data-elementor-type="wp-page"]');
  const blocks = [];
  root
    .find(".elementor-widget-heading, .elementor-widget-text-editor")
    .each((_, el) => {
      const heading = $(el).find(".elementor-heading-title");
      if (heading.length) {
        const text = heading.text().trim();
        if (text) blocks.push({ type: "heading", text });
      } else {
        const c = $(el).find(".elementor-widget-container");
        c.find("br").replaceWith("\n");
        c.find("h1,h2,h3,h4,h5,h6,p,li").each((_, node) => {
          const text = $(node).text().trim();
          if (text)
            blocks.push({
              type: /^h[1-6]$/.test(node.tagName) ? "heading" : "text",
              text,
            });
        });
      }
    });
  if (blocks.length < 4) throw new Error(`Legal extraction failed: ${slug}`);
  await writeFile(`content/${slug}.json`, JSON.stringify(blocks, null, 2));
  console.log(
    slug,
    blocks.length,
    "blocks",
    blocks[0].text,
    blocks.at(-1).text.slice(0, 50),
  );
}
console.log("Responsive WebP images prepared.");
