import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { load } from "cheerio";
import { createHash } from "node:crypto";
const routes = [
  "",
  "rolunk",
  "palyak",
  "ghost-padel",
  "dicsosegfal",
  "kapcsolat",
  "mi-az-a-padel",
  "impresszum",
  "hazirend",
  "adatkezelesi-tajekoztato",
];
const normalize = (s) => s.replace(/\s/g, "");
let checked = 0;
for (const route of routes) {
  const file = `out/${route ? route + "/" : ""}index.html`;
  const $ = load(await readFile(file, "utf8"));
  assert.equal($("html").attr("lang"), "hu");
  assert.equal($("h1").length, 1, file);
  assert.ok($("title").text());
  assert.ok($('meta[name="description"]').attr("content"));
  assert.ok($('link[rel="canonical"]').attr("href"));
  assert.ok($("main#main").length);
  for (const el of $("a[href]").toArray()) {
    const href = $(el).attr("href");
    assert.notEqual(href, "#");
    if (href.startsWith("/")) {
      const [pathname, hash] = href.split("#");
      const target = `out${pathname.endsWith("/") ? pathname + "index.html" : pathname}`;
      assert.ok((await stat(target)).isFile(), `${file}: ${href}`);
      if (hash && pathname === "/") {
        const h = load(await readFile(target, "utf8"));
        assert.ok(h(`[id="${hash}"]`).length, href);
      }
      checked++;
    }
  }
  for (const img of $("img").toArray()) {
    assert.ok($(img).attr("alt") !== undefined);
    for (const src of [
      $(img).attr("src"),
      ...($(img).attr("srcset") || "")
        .split(",")
        .map((s) => s.trim().split(" ")[0]),
    ].filter(Boolean)) {
      if (src.startsWith("/"))
        assert.ok((await stat("out" + src)).isFile(), src);
    }
  }
  assert.equal($('script[src*="googletagmanager"],iframe').length, 0);
}
for (const slug of ["impresszum", "hazirend", "adatkezelesi-tajekoztato"]) {
  const $ = load(await readFile(`docs/original-${slug}.html`, "utf8"));
  const texts = [];
  $("main .elementor-widget-heading, main .elementor-widget-text-editor").each(
    (_, el) =>
      texts.push($(el).find(".elementor-widget-container").first().text()),
  );
  const actual = JSON.parse(await readFile(`content/${slug}.json`, "utf8"))
    .map((b) => b.text)
    .join("");
  assert.equal(
    normalize(actual),
    normalize(texts.join("")),
    `Legal content changed: ${slug}`,
  );
}
const hash = (buffer) => createHash("sha256").update(buffer).digest("hex");
assert.equal(
  hash(await readFile("public/images/logo.png")),
  hash(await readFile("../padel pictures/budapest-padel-head-3.png")),
);
console.log(
  `PASS: ${routes.length} routes; ${checked} internal links; image sources; Hungarian metadata; unchanged legal text; identical original logo; no trackers/embeds.`,
);
