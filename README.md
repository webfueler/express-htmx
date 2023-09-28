# Import Maps registry using Express and HTMX

Service that registers and updates micro-frontends and javascript bundles to be included as import maps.
This registry supports reading from a manifest file (`manifest.json`) that should be available in the root folder of your micro-frontend bundle.
This file - `manifest.json` - should have the urls for you `javascript` and `css` bundle.
Example:

```json
{
  "main.js": "main.1234567890.js",
  "index.css": "index.0987654321.css"
}
```

In webpack builds, you can use [webpack manifest plugin](https://www.npmjs.com/package/webpack-manifest-plugin).

This service will save the information environment files, so that you can easily setup a CDN to and get better performance.
Environment files can be accessed at `<host>/<environment>.json`. Example: `https://example.com/production.json`

## Types

```ts
type MfeInfo = {
  [name: string]: {
    jsBundle: string;
    cssBundle?: string | undefined;
  };
};

type MfeDto = {
  /* name of your module, example: @my-custom-scope/package */
  name: string;
  /* url of your package, example:
   * - http://cdn.example.com/package.js
   * - http://cdn.example.com/ if `manifest` is `true`
   */
  url: string;
  /* if `true` will try to parse `<url>/manifest.json` */
  manifest?: boolean | undefined;
};

type DeleteMfeDto = {
  /* name of your module, example: @my-custom-scope/package */
  name: string;
};
```

## API Endpoints

| Endpoint        | Method   | Description                       | Body           | Response  |
| --------------- | -------- | --------------------------------- | -------------- | --------- |
| `/api/mfe`      | `GET`    | returns all entries               | `N/A`          | `MfeInfo` |
| `/api/mfe/:env` | `POST`   | creates or updates existing entry | `MfeDto`       | `MfeInfo` |
| `/api/mfe/:env` | `DELETE` | deletes existing entry            | `DeleteMfeDto` | `N/A`     |

> ### Note:
>
> `:env` can be one of `development`, `production` or `sandbox`;
