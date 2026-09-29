# CesiumJS

[![Build Status](https://github.com/CesiumGS/cesium/actions/workflows/dev.yml/badge.svg)](https://github.com/CesiumGS/cesium/actions/workflows/dev.yml)
[![npm](https://img.shields.io/npm/v/cesium)](https://www.npmjs.com/package/cesium)
[![Docs](https://img.shields.io/badge/docs-online-orange.svg)](https://cesium.com/learn/)

![Cesium](https://github.com/CesiumGS/cesium/wiki/logos/Cesium_Logo_Color.jpg)

CesiumJS is a JavaScript library for creating 3D globes and 2D maps in a web browser without a plugin. It uses WebGL for hardware-accelerated graphics, and is cross-platform, cross-browser, and tuned for dynamic-data visualization.
CesiumJS 是一个用于在无需插件的 Web 浏览器中创建 3D 地球和 2D 地图的 JavaScript 库。它使用 WebGL 进行硬件加速图形渲染，具备跨平台、跨浏览器特性，并针对动态数据可视化进行了专门调优。

Built on open formats, CesiumJS is designed for robust interoperability and scaling for massive datasets.
CesiumJS 基于开放格式构建，专为强大的互操作性以及海量数据集的规模扩展而设计。

---

[**Examples**](https://sandcastle.cesium.com/) :earth_asia: [**Docs**](https://cesium.com/learn/cesiumjs-learn/) :earth_americas: [**Website**](https://cesium.com/cesiumjs) :earth_africa: [**Forum**](https://community.cesium.com/) :earth_asia: [**User Stories**](https://cesium.com/user-stories/)
[**示例**](https://sandcastle.cesium.com/) :earth_asia: [**文档**](https://cesium.com/learn/cesiumjs-learn/) :earth_americas: [**官网**](https://cesium.com/cesiumjs) :earth_africa: [**论坛**](https://community.cesium.com/) :earth_asia: [**用户故事**](https://cesium.com/user-stories/)

---

## :rocket: Get started / 快速入门

Visit the [Downloads page](https://cesium.com/downloads/) to download a pre-built copy of CesiumJS.
访问[下载页面](https://cesium.com/downloads/)下载预构建的 CesiumJS 副本。

### npm & yarn

If you’re building your application using a module bundler such as Webpack, Parcel, or Rollup, you can install CesiumJS via the [`cesium` npm package](https://www.npmjs.com/package/cesium):
如果您使用 Webpack、Parcel 或 Rollup 等模块打包器构建应用程序，可以通过 [`cesium` npm 包](https://www.npmjs.com/package/cesium) 安装 CesiumJS：

```sh
npm install cesium --save
```

Then, import CesiumJS in your app code. Import individual modules to benefit from tree shaking optimizations through most build tools:
然后，在应用程序代码中引入 CesiumJS。导入单独的模块可以通过大多数构建工具享受 Tree Shaking（摇树优化）带来的优化：

```js
import { Viewer } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

const viewer = new Viewer("cesiumContainer");
```

In addition to the `cesium` package, CesiumJS is also [distributed as scoped npm packages for better dependency management](https://cesium.com/blog/2022/12/07/modular-structure-in-cesiumjs/):
除了 `cesium` 主包之外，CesiumJS 还[以作用域 npm 包的形式分发，以便更好地管理依赖项](https://cesium.com/blog/2022/12/07/modular-structure-in-cesiumjs/)：

- [`@cesium/engine`](./packages/engine/README.md) - CesiumJS's core, rendering, and data APIs
  [`@cesium/engine`](./packages/engine/README.md) - CesiumJS 的核心、渲染与数据 API
- [`@cesium/widgets`](./packages/widgets/README.md) - A widgets library for use with CesiumJS
  [`@cesium/widgets`](./packages/widgets/README.md) - 用于 CesiumJS 的小部件（widgets）组件库

### What next? / 下一步？

See our [Quickstart Guide](https://cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/) for more information on getting a CesiumJS app up and running.
请参阅我们的[快速入门指南](https://cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/)，了解有关启动并运行 CesiumJS 应用程序的更多信息。

Instructions for serving local data are in the CesiumJS
[Offline Guide](./Documentation/OfflineGuide/README.md).
有关提供本地数据的说明，请参见 CesiumJS [离线指南](./Documentation/OfflineGuide/README.md)。

Interested in contributing? See [CONTRIBUTING.md](CONTRIBUTING.md). :heart:
有兴趣参与贡献？请参阅 [CONTRIBUTING.md](CONTRIBUTING.md)。:heart:

## :green_book: License / 开源许可

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html). CesiumJS is free for both commercial and non-commercial use.
[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)。CesiumJS 免费提供商业和非商业用途。

## :earth_americas: Where does the Global 3D Content come from? / 全球 3D 内容来自哪里？

The Cesium platform follows an [open-core business model](https://cesium.com/why-cesium/open-ecosystem/cesium-business-model/) with open source runtime engines such as CesiumJS and optional commercial subscription to Cesium ion.
Cesium 平台遵循[开源核心（open-core）商业模式](https://cesium.com/why-cesium/open-ecosystem/cesium-business-model/)，包括诸如 CesiumJS 之类的开源运行时引擎，以及可选的 Cesium ion 商业订阅。

CesiumJS can stream [3D content such as terrain, imagery, and 3D Tiles from the commercial Cesium ion platform](https://cesium.com/platform/cesium-ion/content/) alongside open standards from other offline or online services. We provide Cesium ion as the quickest option for all users to get up and running, but you are free to use any combination of content sources with CesiumJS that you please.
CesiumJS 可以从[商业化的 Cesium ion 平台流式传输 3D 内容（如地形、影像和 3D Tiles）](https://cesium.com/platform/cesium-ion/content/)，也可以从其他离线或在线服务中流式传输基于开放标准的内容。我们提供 Cesium ion 作为所有用户快速启动运行的最便捷途径，但您可以根据需要自由搭配使用任何内容源与 CesiumJS。

Bring your own data for tiling, hosting, and streaming from Cesium ion. [Using Cesium ion](https://cesium.com/ion/signup/) helps support CesiumJS development.
您可以将自己的数据上传至 Cesium ion 进行切片瓦片化（tiling）、托管与流式传输。[使用 Cesium ion](https://cesium.com/ion/signup/) 有助于支持 CesiumJS 的持续开发。

## :white_check_mark: Features / 功能特性

- Stream in 3D Tiles and other standard formats from Cesium ion or another source
  从 Cesium ion 或其他数据源流式传输 3D Tiles 及其他标准格式
- Visualize and analyze on a high-precision WGS84 globe
  在高精度 WGS84 椭球体地球上进行可视化与分析
- Share with users on desktop or mobile
  与桌面端或移动端用户进行共享

See more in the [CesiumJS Features Checklist](https://github.com/CesiumGS/cesium/wiki/CesiumJS-Features-Checklist).
更多内容请参阅 [CesiumJS 功能清单（Features Checklist）](https://github.com/CesiumGS/cesium/wiki/CesiumJS-Features-Checklist)。
