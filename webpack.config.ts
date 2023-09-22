import "webpack-dev-server";
import { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";

const isProduction = process.env.NODE_ENV === "production";

const config: Configuration = {
  entry: "./src/index.ts",
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? "source-map" : "eval-source-map",
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"],
    },
  },
  watchOptions: {
    ignored: ["public"],
  },
  output: {
    path: __dirname + "/dist",
    filename: "index.js",
    publicPath: "/",
  },
  stats: "minimal",
};

export default config;
