# Asset Handling

## Referencing Static Assets

All Markdown files are compiled into Vue components and processed by [Vite](https://vitejs.dev/guide/assets.html). You can, **and should**, reference any assets using relative URLs:

```md
![An image](./image.png)
```

You can reference static assets in your markdown files, your `*.vue` components in the theme, styles and plain `.css` files either using absolute public paths (based on project root) or relative paths (based on your file system). The latter is similar to the behavior you are used to if you have used Vite, Vue CLI, or webpack's `file-loader`.

Common image, media, and font filetypes are detected and included as assets automatically.

All referenced assets, including those using absolute paths, will be copied to the output directory with a hashed file name in the production build. Never-referenced assets will not be copied. Image assets smaller than 4kb will be base64 inlined - this can be configured via the [`vite`](https://vitepress.dev/reference/site-config#vite) config option.

All **static** path references, including absolute paths, should be based on your working directory structure.

## The Public Directory

Sometimes you may need to provide static assets that are not directly referenced in any of your Markdown or theme components, or you may want to serve certain files with the original filename. Examples of such files include `robots.txt`, favicons, and PWA icons.

You can place these files in the `public` directory under the [source directory](https://vitepress.dev/guide/routing#source-directory). For example, if your project root is `./docs` and using default source directory location, then your public directory will be `./docs/public`.

Assets placed in `public` will be copied to the root of the output directory as-is.

Note that you should reference files placed in `public` using root absolute path - for example, `public/icon.png` should always be referenced in source code as `/icon.png`.
