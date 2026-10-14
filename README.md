# Budapest Padel

Hungarian Budapest Padel website built with Next.js and TypeScript. The application source, assets, checks and detailed documentation live in `site/`.

## Local development

Use Node.js 22.13+ or Node.js 24 LTS.

```sh
cd site
npm ci
npm run dev
```

## Production checks

```sh
cd site
npm run build
npm run lint
npm run typecheck
npm test
```

The static website is generated in `site/out/`. See [the application README](site/README.md) for configuration and deployment notes.

`padel pictures/` contains the supplied original image assets. Generated preview screenshots, deployment archives, dependencies and build outputs are intentionally excluded from version control.
