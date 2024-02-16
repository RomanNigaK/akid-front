/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
// eslint-disable-next-line no-undef
module.exports = {
  entry: {
    index: "./src/index.tsx",
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
      // eslint-disable-next-line no-undef
      directory: path.join(__dirname, "dist"),
    },
    proxy: {
      //"/api": "http://46.8.19.222:8081/",
      "/api": "http://localhost:8081/",
      "/act": "http://localhost:8081/",
    },
    port: 8889,
    hot: true,
    historyApiFallback: true,
  },
  output: {
    assetModuleFilename: "assets/[name][ext]",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      //  favicon: "./public/logo.ico",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".scss"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(css|scss|sass)$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        exclude: /node_modules/,
        type: "asset/resource",
      },
      {
        test: /\.(svg)$/i,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "icons/[hash][ext]",
        },
      },
      {
        test: /\.(mov|mp4)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
};
