Service that registers and updates microfrontends and javascript bundles to be included as import maps

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


| Endpoint    | Method   | Description                       | Body           | Response  |
| ----------- | -------- | --------------------------------- | -------------- | --------- |
| `/mfe`      | `GET`    | returns all entries               | `N/A`          | `MfeInfo` |
| `/mfe/:env` | `POST`   | creates or updates existing entry | `MfeDto`       | `MfeInfo` |
| `/mfe/:env` | `DELETE` | deletes existing entry            | `DeleteMfeDto` | `N/A`     |


> ### Note:
>
> `:env` can be one of `development`, `production` or `sandbox`;
