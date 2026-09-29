# Change Log

## 1.146 - 2026-10-01

### @cesium/engine

#### Additions :tada:

- Added `vectorBlendOption` to `Cesium3DTileset`, for selecting opaque or translucent modes. `blendOption` can now also be changed after construction on `BufferPointCollection`, `BufferPolylineCollection`, and `BufferPolygonCollection`. [#13764](https://github.com/CesiumGS/cesium/issues/13764)
  在 `Cesium3DTileset` 中新增了 `vectorBlendOption` 属性，用于选择不透明（opaque）或半透明（translucent）混合模式。此外，在 `BufferPointCollection`、`BufferPolylineCollection` 和 `BufferPolygonCollection` 实例化后，其 `blendOption` 属性现在也支持动态修改。 [#13764](https://github.com/CesiumGS/cesium/issues/13764)
- Added `.pickObject` getter/setter to BufferPrimitive. [#13811](https://github.com/CesiumGS/cesium/pull/13811)
  为 `BufferPrimitive` 新增了 `.pickObject` 的 getter/setter 属性。 [#13811](https://github.com/CesiumGS/cesium/pull/13811)

#### Fixes :wrench:

- Reduced load time and memory usage for implicitly-tiled tilesets. [#13808](https://github.com/CesiumGS/cesium/pull/13808)
  减少了隐式切片（implicitly-tiled）瓦片集的加载时间与内存占用。 [#13808](https://github.com/CesiumGS/cesium/pull/13808)
- Reduced load time, memory usage, and rendering overhead for models and 3D Tiles using `EXT_mesh_primitive_edge_visibility` in `EdgeDisplayMode.SURFACES_ONLY` by deferring edge geometry construction until edges are displayed or needed for snapping.
  优化了在 `EdgeDisplayMode.SURFACES_ONLY` 模式下使用 `EXT_mesh_primitive_edge_visibility` 扩展的模型与 3D Tiles：通过延迟边缘几何体的构建（直到边缘真正需要显示或用于吸附捕捉 snapping 时才构建），降低了加载时间、内存消耗及渲染开销。
- Fixed a GPU memory leak where the edge vertex array created for `EXT_mesh_primitive_edge_visibility` rendering was never destroyed when draw commands were rebuilt or the model was destroyed. [#13721](https://github.com/CesiumGS/cesium/pull/13721)
  修复了一个 GPU 内存泄漏问题：当重建绘制命令（draw commands）或模型被销毁时，为 `EXT_mesh_primitive_edge_visibility` 渲染所创建的边缘顶点数组（edge vertex array）此前未被释放销毁。 [#13721](https://github.com/CesiumGS/cesium/pull/13721)
- Fixed `Cesium3DTileset` never enabling the scene edge framebuffer in `EdgeDisplayMode.SURFACES_AND_EDGES`, which rendered interior edges as fainter than intended. [#13765](https://github.com/CesiumGS/cesium/issues/13765)
  修复了 `Cesium3DTileset` 在 `EdgeDisplayMode.SURFACES_AND_EDGES` 模式下从未启用场景边缘帧缓冲区（edge framebuffer），导致内部边缘渲染得比预期更淡的问题。 [#13765](https://github.com/CesiumGS/cesium/issues/13765)
- Changed the typing of `PrimitiveCollection.add` to return the added primitive as the same type instead of `any`. [#13742](https://github.com/CesiumGS/cesium/issues/13742)
  修改了 `PrimitiveCollection.add` 的 TypeScript 类型定义，现在会返回所添加图元的具体类型，而非 `any`。 [#13742](https://github.com/CesiumGS/cesium/issues/13742)
- Fixed typescript error when importing `knockout` from `cesium`. [#12423](https://github.com/CesiumGS/cesium/issues/12423)
  修复了从 `cesium` 中导入 `knockout` 时的 TypeScript 报错问题。 [#12423](https://github.com/CesiumGS/cesium/issues/12423)
- Fixed draped polylines rendering at the wrong width at large widths, in both `"pixels"` and `"meters"` width units. [#13737](https://github.com/CesiumGS/cesium/pull/13737)
  修复了贴地/贴模型折线（draped polylines）在线宽较大时，以像素（`"pixels"`）和米（`"meters"`）为单位均会出现宽度渲染错误的问题。 [#13737](https://github.com/CesiumGS/cesium/pull/13737)
- Fixed geometry clipped by a `ClippingPolygonCollection` still casting shadows. The clipping uv origin is now read from the eye of the pass being rendered, so it matches the delta computed in the vertex shader during shadow casts. [#13768](https://github.com/CesiumGS/cesium/issues/13768)
  修复了被 `ClippingPolygonCollection` 裁剪掉的几何体仍会投射阴影的问题。现在裁剪 UV 的原点改从当前渲染通道的视点（eye）读取，以确保与阴影投射通道中顶点着色器计算的增量保持一致。 [#13768](https://github.com/CesiumGS/cesium/issues/13768)
- Fixed terrain-clamped billboards and labels being mispositioned and not properly rendering in 2D/Columbus view. [#5042](https://github.com/CesiumGS/cesium/issues/5042) [#12531](https://github.com/CesiumGS/cesium/issues/12531)
  修复了贴地（terrain-clamped）广告牌（billboard）和文本标签（label）在二维（2D）与哥伦布视图（Columbus view）下位置偏移且无法正常渲染的问题。 [#5042](https://github.com/CesiumGS/cesium/issues/5042) [#12531](https://github.com/CesiumGS/cesium/issues/12531)

#### Deprecated :hourglass_flowing_sand:

- `Matrix4.fromCamera` has been deprecated and will be removed in 1.151. Use `Camera.prototype.viewMatrix` or `Matrix4.computeView` instead.
  `Matrix4.fromCamera` 已被废弃，并将在 1.151 版本中移除。请改用 `Camera.prototype.viewMatrix` 或 `Matrix4.computeView`。

## 1.145 - 2026-09-02

### @cesium/engine

#### Breaking Changes :mega:

- The positions of `ClippingPolygons` in a `ClippingPolygonCollection` are now considered immutable (via `Object.freeze`) and will throw if changed. Instead of changing positions directly, remove and re-add a new polygon. This breaking change allows us to remove per-frame, per-polygon-vertex checks that ultimately offer vast performance improvements. [#13665](https://github.com/CesiumGS/cesium/pull/13665)
  `ClippingPolygonCollection` 中的 `ClippingPolygons`（裁剪多边形）坐标位置现在被视为不可变（通过 `Object.freeze` 实现），若进行修改将抛出异常。如果需要修改位置，应先移除原有多边形再重新添加新多边形。此破坏性变更消除了逐帧、逐多边形顶点的检查，从而带来了显著的性能提升。[#13665](https://github.com/CesiumGS/cesium/pull/13665)

#### Additions :tada:

- Added support for draping clamped vector tile polygons and polylines onto 3D Tiles, with a new `heightReference` option and matching read-only property on `BufferPrimitiveCollection`, inherited by `BufferPolygonCollection` and `BufferPolylineCollection`. [#13653](https://github.com/CesiumGS/cesium/pull/13653)
  新增对将贴地矢量瓦片多边形和贴地折线贴附到 3D Tiles 上的支持；在 `BufferPrimitiveCollection` 上新增了 `heightReference` 选项以及对应的只读属性，并由 `BufferPolygonCollection` 和 `BufferPolylineCollection` 继承。[#13653](https://github.com/CesiumGS/cesium/pull/13653)
- `ClippingPolygons` now use an algorithm, based on the techniques used for vector tiles, that vastly improves quality across distance scales. Warm-up cost is also modestly decreased. [#13654](https://github.com/CesiumGS/cesium/pull/13654)
  `ClippingPolygons`（裁剪多边形）现采用基于矢量瓦片技术的算法，大幅提升了在不同视距尺度下的质量，同时适度降低了预热开销。[#13654](https://github.com/CesiumGS/cesium/pull/13654)
- `ClippingPolygons` now have support for specifying holes (aka islands) within each polygon. This works in inverse clipping workflows as well. [#13660](https://github.com/CesiumGS/cesium/pull/13660)
  `ClippingPolygons`（裁剪多边形）现已支持在多边形内部指定孔洞（亦称岛洞）。该特性同样适用于反向裁剪工作流。[#13660](https://github.com/CesiumGS/cesium/pull/13660)
- Added a `heightReference` option to `MVTDataProvider.fromUrl`, draping Mapbox Vector Tiles content onto terrain, 3D Tiles, or both. [#13727](https://github.com/CesiumGS/cesium/pull/13727)
  在 `MVTDataProvider.fromUrl` 中新增 `heightReference` 选项，可将 Mapbox 矢量瓦片（MVT）内容贴附到地形、3D Tiles 或两者之上。[#13727](https://github.com/CesiumGS/cesium/pull/13727)
- Added a `heightReference` option to GeoJsonPrimitive constructor, draping GeoJSON content onto terrain, 3D Tiles, or both. [#13711](https://github.com/CesiumGS/cesium/pull/13711)
  在 `GeoJsonPrimitive` 构造函数中新增 `heightReference` 选项，可将 GeoJSON 内容贴附到地形、3D Tiles 或两者之上。[#13711](https://github.com/CesiumGS/cesium/pull/13711)
- Added `surfacePosition` to the result of the experimental `Scene.snap` API: the nearest on-surface point of the snapped object, useful as a seed for server-side snap refinement of edge snaps. [#13699](https://github.com/CesiumGS/cesium/pull/13699)
  在实验性 `Scene.snap` API 的返回结果中新增 `surfacePosition`：即吸附对象上最近的表面点，可用作边缘吸附在服务端进行吸附精细化计算的种子点。[#13699](https://github.com/CesiumGS/cesium/pull/13699)
- Added experimental `IonSnapService` for server-side snap-to-geometry against Cesium ion assets backed by a BIM/CAD Database model, and the `SnapService` interface it implements. [#13682](https://github.com/CesiumGS/cesium/pull/13682)
  新增实验性 `IonSnapService` 及其实现的 `SnapService` 接口，支持对由 BIM/CAD 数据库模型支持的 Cesium ion 资产进行服务端几何吸附（snap-to-geometry）。[#13682](https://github.com/CesiumGS/cesium/pull/13682)
- Added `BufferPolylineCollection` option `widthUnits`, so a draped polyline's width can be measured in meters on the ground instead of screen pixels. [#13703](https://github.com/CesiumGS/cesium/pull/13703)
  在 `BufferPolylineCollection` 中新增 `widthUnits` 选项，使贴地折线的宽度可以用地面上的米为单位计量，而非仅使用屏幕像素。[#13703](https://github.com/CesiumGS/cesium/pull/13703)
- Added two sandcastles: a 3D native vector data showcase and a large river dataset with semantic-based LODs.
  新增两个 Sandcastle 示例：3D 原生矢量数据展示，以及带有基于语义 LOD 的大型河流数据集。

#### Fixes :wrench:

- Fixed vertical exaggeration for models and tilesets with existing scale factors, so they now exaggerate proportionally to the rest of the scene. [#13518](https://github.com/CesiumGS/cesium/pull/13518)
  修复了包含已有缩放因子的模型与瓦片集的高程夸大（vertical exaggeration）问题，使其现在能与场景其他部分按比例夸大。[#13518](https://github.com/CesiumGS/cesium/pull/13518)
- Changed 3D tileset traversal to have more robust replacement refinement behavior for vector data tilesets. [#13686](https://github.com/CesiumGS/cesium/issues/13686)
  改进了 3D 瓦片集遍历机制，使矢量数据瓦片集的替换精细化（replacement refinement）行为更加稳健。[#13686](https://github.com/CesiumGS/cesium/issues/13686)
- Fixed draped vector polylines rendering at twice their specified width, and antialiased their edges. Antialiasing can be turned off with `scene.vectorProvider.antialias` if you prefer the extra performance. [#13675](https://github.com/CesiumGS/cesium/pull/13675)
  修复了贴地矢量折线渲染宽度为其指定值两倍的问题，并对其边缘进行了抗锯齿处理。如果更注重性能，可以通过 `scene.vectorProvider.antialias` 关闭抗锯齿。[#13675](https://github.com/CesiumGS/cesium/pull/13675)
- Updated the minimum version of `dompurify` dependency to `3.4.5`, addressing security vulnerability tracked in [CVE-2026-49458](https://github.com/advisories/GHSA-hpcv-96wg-7vj8). [#13646](https://github.com/CesiumGS/cesium/issues/13646)
  将 `dompurify` 依赖项的最低版本升级至 `3.4.5`，修复了 [CVE-2026-49458](https://github.com/advisories/GHSA-hpcv-96wg-7vj8) 中跟踪的安全漏洞。[#13646](https://github.com/CesiumGS/cesium/issues/13646)
- Fixed the "Data attribution" credit link and the credit lightbox not being usable with a keyboard. Both the link and the lightbox close button are now focusable and can be activated with `Enter` or `Space`, the lightbox is exposed as a modal dialog and can be dismissed with `Escape`, and focus is moved into the lightbox when it opens and restored when it closes. [#13670](https://github.com/CesiumGS/cesium/issues/13670)
  修复了“数据版权”（Data attribution）信用链接及信用浮层灯箱无法使用键盘操作的问题。现在链接和灯箱关闭按钮均可获取焦点并通过 `Enter` 或 `Space` 键激活；灯箱作为模态对话框公开且可按 `Escape` 键关闭；并在灯箱打开时将焦点移入、关闭时恢复原有焦点。[#13670](https://github.com/CesiumGS/cesium/issues/13670)
- Fixed feature ID textures ignoring the wrap mode declared by the glTF sampler. Forcing nearest filtering no longer replaces `wrapS` and `wrapT` with `CLAMP_TO_EDGE`. [#11574](https://github.com/CesiumGS/cesium/issues/11574)
  修复了要素 ID 纹理（feature ID textures）忽略 glTF 采样器所声明环绕模式（wrap mode）的问题。强制使用最近邻滤波不再将 `wrapS` 和 `wrapT` 替换为 `CLAMP_TO_EDGE`。[#11574](https://github.com/CesiumGS/cesium/issues/11574)

#### Deprecated :hourglass_flowing_sand:

- Deprecates the recently added `quality` field on `ClippingPolygonCollection`. The new implementation of `ClippingPolygons` offers the highest possibly quality by default. The `debugShowDistanceTexture` field is also deprecated, as the new implementation no longer uses a distance texture. The `destroy` and `isDestroyed` methods have been deprecated, since the class no longer owns its own resources which require release or destruction. `ClippingPolygon.computeRectangle` has been deprecated in favor of a class-level `rectangle` property.
  废弃 `ClippingPolygonCollection` 上最近添加的 `quality` 字段。`ClippingPolygons` 的新实现默认提供最高质量。同时废弃 `debugShowDistanceTexture` 字段，因为新实现不再使用距离纹理。废弃 `destroy` 和 `isDestroyed` 方法，因为该类不再持有需要释放或销毁的自身资源。废弃 `ClippingPolygon.computeRectangle`，推荐使用类级别的 `rectangle` 属性。

### @cesium/sandcastle

#### Fixes :wrench:

- Updated the minimum version of `dompurify` dependency to `3.4.5`, addressing security vulnerability tracked in [CVE-2026-49458](https://github.com/advisories/GHSA-hpcv-96wg-7vj8). [#13646](https://github.com/CesiumGS/cesium/issues/13646)
  将 `dompurify` 依赖项的最低版本升级至 `3.4.5`，修复了 [CVE-2026-49458](https://github.com/advisories/GHSA-hpcv-96wg-7vj8) 中跟踪的安全漏洞。[#13646](https://github.com/CesiumGS/cesium/issues/13646)

## 1.144 - 2026-08-01

### @cesium/engine

#### Additions :tada:

- Added support for draping clamped vector tile polygons and polylines onto terrain, with screen-space-constant line width and per-feature styling via `Cesium3DTileStyle`. [#13577](https://github.com/CesiumGS/cesium/pull/13577) [#13627](https://github.com/CesiumGS/cesium/pull/13627)
  新增对将贴地矢量瓦片多边形和贴地折线贴附到地形上的支持，具有屏幕空间恒定的线宽，并支持通过 `Cesium3DTileStyle` 进行逐要素样式设置。[#13577](https://github.com/CesiumGS/cesium/pull/13577) [#13627](https://github.com/CesiumGS/cesium/pull/13627)
- Added support for the [`BENTLEY_materials_planar_fill`](https://github.com/CesiumGS/glTF/tree/vendor-extensions/extensions/2.0/Vendor/BENTLEY_materials_planar_fill) glTF extension, enabling CAD-style planar polygon fill rendering with proper depth sorting and configurable fill behavior including background color masking and coplanar geometry ordering. Note: The `wireframeFill` property is currently a no-op. [#13178](https://github.com/CesiumGS/cesium/pull/13178)
  新增对 glTF 扩展 [`BENTLEY_materials_planar_fill`](https://github.com/CesiumGS/glTF/tree/vendor-extensions/extensions/2.0/Vendor/BENTLEY_materials_planar_fill) 的支持，实现了具有正确深度排序的 CAD 风格平面多边形填充渲染，以及可配置的填充行为（包括背景色遮罩和共面几何排序）。注意：`wireframeFill` 属性当前暂无实际效果。[#13178](https://github.com/CesiumGS/cesium/pull/13178)
- Added a minimal set of alternative camera controllers scoped for an asset inspection use case: `HybridScreenSpacePanCameraController`, `ScreenSpaceElevatorCameraController`, `ScreenSpaceMapCameraController` and `ScreenSpaceTiltOrbitCameraController`. [Try the controllers in Sandcastle](https://sandcastle.cesium.com/?id=camera-controllers). [#13604](https://github.com/CesiumGS/cesium/pull/13604).
  新增了一组专用于资产审查场景的备选相机控制器：`HybridScreenSpacePanCameraController`、`ScreenSpaceElevatorCameraController`、`ScreenSpaceMapCameraController` 和 `ScreenSpaceTiltOrbitCameraController`。[在 Sandcastle 中体验这些控制器](https://sandcastle.cesium.com/?id=camera-controllers)。[#13604](https://github.com/CesiumGS/cesium/pull/13604)。
- Added a composable `Controller` framework, which can be added to a scene with either `Viewer.addController` or `Scene.controllerHost`. [#13604](https://github.com/CesiumGS/cesium/pull/13604).
  新增可组合的 `Controller` 框架，可通过 `Viewer.addController` 或 `Scene.controllerHost` 添加到场景中。[#13604](https://github.com/CesiumGS/cesium/pull/13604)。
- Enabled picking of metadata from a `WebMapTileServiceImageryProvider` when draped on 3D Tiles [#13575](https://github.com/CesiumGS/cesium/pull/13575)
  支持在贴附于 3D Tiles 之上时拾取来自 `WebMapTileServiceImageryProvider` 的元数据。[#13575](https://github.com/CesiumGS/cesium/pull/13575)
- Added `Scene.snap`, an experimental snap-to-geometry picking API. It returns the best hit in a screen-space region around a window position (preferring edges (see [`EXT_mesh_primitive_edge_visibility`](https://github.com/KhronosGroup/glTF/pull/2479)) over surfaces) along with its world-space position. [#13531](https://github.com/CesiumGS/cesium/pull/13531)
  新增实验性几何吸附拾取 API `Scene.snap`。该 API 会返回视口窗口位置周围屏幕空间区域中的最佳命中结果（优先选择边缘（参见 [`EXT_mesh_primitive_edge_visibility`](https://github.com/KhronosGroup/glTF/pull/2479)）而非表面）及其世界空间坐标位置。[#13531](https://github.com/CesiumGS/cesium/pull/13531)
- Added support for the [`KHR_mesh_primitive_restart`](https://github.com/KhronosGroup/glTF/pull/2569) glTF extension. [#13634](https://github.com/CesiumGS/cesium/pull/13634)
  新增对 glTF 扩展 [`KHR_mesh_primitive_restart`](https://github.com/KhronosGroup/glTF/pull/2569) 的支持。[#13634](https://github.com/CesiumGS/cesium/pull/13634)
- Added `Texture.defaultColor` static property to allow customizing the default placeholder texture color, to avoid white flashes when a new Material is constructed. [#13597](https://github.com/CesiumGS/cesium/pull/13597)
  在 `Texture` 上新增 `defaultColor` 静态属性，用于自定义默认占位纹理颜色，从而避免构建新材质（Material）时出现白闪。[#13597](https://github.com/CesiumGS/cesium/pull/13597)

#### Fixes :wrench:

- Significantly reduced JavaScript heap usage when loading models and tilesets using the `EXT_mesh_primitive_edge_visibility` glTF extension. Edge visibility accessor data is now loaded as typed arrays instead of plain JavaScript arrays. [#13643](https://github.com/CesiumGS/cesium/pull/13643)
  大幅降低了加载使用 `EXT_mesh_primitive_edge_visibility` glTF 扩展的模型和瓦片集时的 JavaScript 堆内存占用。边缘可见性访问器（accessor）数据现在作为类型化数组（typed arrays）加载，而非普通 JavaScript 数组。[#13643](https://github.com/CesiumGS/cesium/pull/13643)
- Fixed geometry clipped by `ClippingPlaneCollection` or `ClippingPolygonCollection` still casting shadows. [#6261](https://github.com/CesiumGS/cesium/issues/6261)
  修复了被 `ClippingPlaneCollection`（裁剪面集合）或 `ClippingPolygonCollection`（裁剪多边形集合）裁剪掉的几何体仍然会投射阴影的问题。[#6261](https://github.com/CesiumGS/cesium/issues/6261)
- Fixed a one-frame black flash caused by `Framebuffer` construction leaving the context's framebuffer binding cache stale, making subsequent draws render to the wrong framebuffer for the remainder of the frame. [#13662](https://github.com/CesiumGS/cesium/pull/13662)
  修复了因 `Framebuffer`（帧缓冲区）构建导致上下文的帧缓冲区绑定缓存过时，使得该帧后续绘制渲染到错误帧缓冲区而引起的单帧黑闪问题。[#13662](https://github.com/CesiumGS/cesium/pull/13662)
- Fixed a shader bug causing a `PolylineGlowMaterial` rendering issue on Ubuntu. [#13632](https://github.com/CesiumGS/cesium/issues/13632)
  修复了导致 `PolylineGlowMaterial`（发光折线材质）在 Ubuntu 系统上出现渲染异常的着色器缺陷。[#13632](https://github.com/CesiumGS/cesium/issues/13632)
- Fixed a bug in clipping polygons on terrain causing a crash when all polygons are removed from a collection. [#12414](https://github.com/CesiumGS/cesium/issues/12414)
  修复了地形裁剪多边形在从集合中移除所有多边形时引发崩溃的缺陷。[#12414](https://github.com/CesiumGS/cesium/issues/12414)
- Fixed SPZ-compressed Gaussian splat loading to read the compressed payload from the buffer view declared by `KHR_gaussian_splatting_compression_spz_2`, preventing incorrect cache reuse for assets with SPZ payloads in different buffer views. [#12847](https://github.com/CesiumGS/cesium/issues/12847)
  修复了 SPZ 压缩的高斯泼溅（Gaussian splat）加载问题，使其从 `KHR_gaussian_splatting_compression_spz_2` 声明的缓冲区视图（buffer view）中读取压缩负载，防止对具有不同缓冲区视图 SPZ 负载的资产进行错误的缓存复用。[#12847](https://github.com/CesiumGS/cesium/issues/12847)
- Fixed a fatal error when a post-process stage selects more features than the maximum texture size supports. The selected-feature texture is now clamped to the maximum supported width and a one-time warning is logged. [#13656](https://github.com/CesiumGS/cesium/pull/13656)
  修复了当后处理阶段（post-process stage）选取的要素数量超出最大纹理尺寸支持时导致的致命错误。所选要素纹理现在会被限制在最大支持宽度以内，并记录一次性警告日志。[#13656](https://github.com/CesiumGS/cesium/pull/13656)
- Fixed `CzmlDataSource` not inferring the `PathMode` type for custom properties defined with a `pathMode` value. [#13607](https://github.com/CesiumGS/cesium/pull/13607)
  修复了 `CzmlDataSource` 无法为定义了 `pathMode` 值的自定义属性推断 `PathMode` 类型的问题。[#13607](https://github.com/CesiumGS/cesium/pull/13607)
- Auto-normalize non-unit `alignedAxis` in `BillboardCollection` instead of silently ignoring it. [#6596](https://github.com/CesiumGS/cesium/issues/6596)
  在 `BillboardCollection` 中自动归一化非单位向量的 `alignedAxis`（对齐轴），而不再静默忽略。[#6596](https://github.com/CesiumGS/cesium/issues/6596)
- Fixed a bug in `Transforms.computeMoonFixedToIcrfMatrix` which caused the `result` parameter to not be used. [#13463](https://github.com/CesiumGS/cesium/pull/13463)
  修复了 `Transforms.computeMoonFixedToIcrfMatrix` 中导致未正确使用 `result` 参数的缺陷。[#13463](https://github.com/CesiumGS/cesium/pull/13463)
- Fixed a bug in `GeocoderViewModel` where a duplicate `destroy` method silently overwrote the first, preventing `_suggestionSubscription` from being disposed on destroy. [#13580](https://github.com/CesiumGS/cesium/pull/13580)
  修复了 `GeocoderViewModel` 中重复的 `destroy` 方法静默覆盖原有方法，导致 `_suggestionSubscription` 在销毁时未被释放的问题。[#13580](https://github.com/CesiumGS/cesium/pull/13580)
- Fixed incorrect JSDoc description for `offCenterFrustum` in `OrthographicFrustum` and `PerspectiveFrustum`, which was copied from `projectionMatrix` and incorrectly described the property as returning a projection matrix. [#13570](https://github.com/CesiumGS/cesium/pull/13570)
  修复了 `OrthographicFrustum`（正交视锥体）和 `PerspectiveFrustum`（透视视锥体）中 `offCenterFrustum` 错误的 JSDoc 说明，该描述先前复制自 `projectionMatrix` 并错误地将该属性描述为返回投影矩阵。[#13570](https://github.com/CesiumGS/cesium/pull/13570)
- Fixed inconsistent typescript types between `InterpolationAlgorithm` and its implementations. [#13644](https://github.com/CesiumGS/cesium/issues/13644)
  修复了 `InterpolationAlgorithm` 及其各实现类之间 TypeScript 类型定义不一致的问题。[#13644](https://github.com/CesiumGS/cesium/issues/13644)

## 1.143 - 2026-07-01

### @cesium/engine

#### Additions :tada:

- Added support for the [`KHR_meshopt_compression`](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_meshopt_compression) glTF extension, including the v1 attribute codec and the `COLOR` filter. [#13553](https://github.com/CesiumGS/cesium/pull/13553)
  新增对 glTF 扩展 [`KHR_meshopt_compression`](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_meshopt_compression) 的支持，包括 v1 属性编解码器和 `COLOR` 过滤器。[#13553](https://github.com/CesiumGS/cesium/pull/13553)
- Added `PathGraphics.materialMode`. A value of `"PORTIONS"` allows visualizing the path in segments with different materials specified by intervals or sampling. Each segment material is determined by the `material` property value at the corresponding simulation time. The default value of `"WHOLE"` preserves existing material behavior. [#13530](https://github.com/CesiumGS/cesium/pull/13530)
  新增 `PathGraphics.materialMode`。设置为 `"PORTIONS"` 允许按时间间隔或采样指定的不同材质分段可视化路径，每个分段的材质由对应仿真时刻的 `material` 属性值决定；默认值 `"WHOLE"` 保持原有的统一材质行为。[#13530](https://github.com/CesiumGS/cesium/pull/13530)

#### Fixes :wrench:

- Fixed invalid glTF sampler wrap modes causing a `DeveloperError` to be thrown instead of falling back to `TextureWrap.REPEAT`. [#13562](https://github.com/CesiumGS/cesium/pull/13562)
  修复了无效的 glTF 采样器环绕模式会导致抛出 `DeveloperError` 而未回退到 `TextureWrap.REPEAT` 的问题。[#13562](https://github.com/CesiumGS/cesium/pull/13562)
- Fixed missing `InterpolationAlgorithm` documentation page that was returning a 404. [#13550](https://github.com/CesiumGS/cesium/issues/13550)
  修复了缺失的 `InterpolationAlgorithm` 文档页面返回 404 错误的问题。[#13550](https://github.com/CesiumGS/cesium/issues/13550)
- Fixed `EdgeVisibilityRendering` release test failures. [#13545](https://github.com/CesiumGS/cesium/pull/13545)
  修复了 `EdgeVisibilityRendering` 发布测试失败的问题。[#13545](https://github.com/CesiumGS/cesium/pull/13545)
- Fix for `BufferPointCollection` preventing outlineColor from bleeding slightly into the visible area when outlineWidth=0px. [#13543](https://github.com/CesiumGS/cesium/pull/13543)
  修复了 `BufferPointCollection` 在 `outlineWidth=0px` 时 `outlineColor`（轮廓颜色）轻微渗入可见区域的问题。[#13543](https://github.com/CesiumGS/cesium/pull/13543)
- Fixed a bug where callbacks registered with `Scene.updateHeight` could receive positions computed for other tiles, causing clamped entities to show incorrect heights. [#12602](https://github.com/CesiumGS/cesium/issues/12602)
  修复了注册到 `Scene.updateHeight` 的回调函数可能会接收到为其他瓦片计算的位置，导致贴地实体显示错误高程的缺陷。[#12602](https://github.com/CesiumGS/cesium/issues/12602)

## 1.142 - 2026-06-01

### @cesium/engine

#### Breaking Changes :mega:

- The `boundingVolume` property on `BufferPointCollection`, `BufferPolylineCollection`, and `BufferPolygonCollection` is now defined in world space, not local/model space. [#13477](https://github.com/CesiumGS/cesium/pull/13477)
  `BufferPointCollection`、`BufferPolylineCollection` 和 `BufferPolygonCollection` 上的 `boundingVolume`（包围体）属性现在定义在世界空间中，而非局部/模型空间。[#13477](https://github.com/CesiumGS/cesium/pull/13477)

#### Additions :tada:

- Added `GeoJsonPrimitive` for loading GeoJSON directly into `BufferPrimitiveCollection`s, bypassing the entity/DataSource layer for significantly improved performance with large datasets. [#13505](https://github.com/CesiumGS/cesium/pull/13505)
  新增 `GeoJsonPrimitive` 用于将 GeoJSON 直接加载到 `BufferPrimitiveCollection` 中，绕过了 Entity/DataSource 层，大幅提升了处理大规模数据集时的性能。[#13505](https://github.com/CesiumGS/cesium/pull/13505)
- Added `MVTDataProvider` for loading Mapbox Vector Tiles (MVT) directly into CesiumJS as 3D Tiles. Supports per-feature styling via `Cesium3DTileStyle`, feature picking with metadata (`getProperty`), and automatic property table encoding via `EXT_structural_metadata`. [#13404](https://github.com/CesiumGS/cesium/pull/13404)
  新增 `MVTDataProvider` 用于将 Mapbox 矢量瓦片（MVT）作为 3D Tiles 直接加载到 CesiumJS 中。支持通过 `Cesium3DTileStyle` 进行逐要素样式设置、带元数据的要素拾取（`getProperty`），以及通过 `EXT_structural_metadata` 自动进行属性表编码。[#13404](https://github.com/CesiumGS/cesium/pull/13404)
- Added `blendOption` constructor parameter to `BufferPointCollection`, `BufferPolylineCollection`, and `BufferPolygonCollection`, supporting `BufferPrimitiveMaterial#color.alpha`. Added support for `BufferPrimitiveMaterial#outlineColor.alpha` to `BufferPointCollection`. [#13384](https://github.com/CesiumGS/cesium/pull/13384)
  在 `BufferPointCollection`、`BufferPolylineCollection` 和 `BufferPolygonCollection` 构造函数中新增 `blendOption` 参数，支持 `BufferPrimitiveMaterial#color.alpha`。在 `BufferPointCollection` 中新增对 `BufferPrimitiveMaterial#outlineColor.alpha` 的支持。[#13384](https://github.com/CesiumGS/cesium/pull/13384)
- Added experimental support for `EXT_mesh_polygon` draft glTF extension and `3DTILES_content_gltf_vector` draft 3D Tiles extension. [#13478](https://github.com/CesiumGS/cesium/pull/13478)
  新增对草案版 glTF 扩展 `EXT_mesh_polygon` 和草案版 3D Tiles 扩展 `3DTILES_content_gltf_vector` 的实验性支持。[#13478](https://github.com/CesiumGS/cesium/pull/13478)
- Added `boundingVolume` constructor parameter to `BufferPointCollection`, `BufferPolylineCollection`, and `BufferPolygonCollection`. For larger animated collections, providing a precomputed bounding volume can eliminate the performance cost of automatically updating the bounding volume frequently. [#13477](https://github.com/CesiumGS/cesium/pull/13477)
  在 `BufferPointCollection`、`BufferPolylineCollection` 和 `BufferPolygonCollection` 构造函数中新增 `boundingVolume` 参数。对于较大规模的动画集合，传入预先计算的包围体可以避免频繁自动更新包围体所带来的性能开销。[#13477](https://github.com/CesiumGS/cesium/pull/13477)
- Added `EdgeDisplayMode` enum and `edgeDisplayMode` property to `Model` and `Cesium3DTileset` for controlling how edges from the [`EXT_mesh_primitive_edge_visibility`](https://github.com/KhronosGroup/glTF/pull/2479) glTF extension are rendered. Supports three modes: `SURFACES_ONLY`, `SURFACES_AND_EDGES`, and `EDGES_ONLY` (CAD-style wireframe rendering). [#13192](https://github.com/CesiumGS/cesium/pull/13192)
  在 `Model` 和 `Cesium3DTileset` 中新增 `EdgeDisplayMode` 枚举及 `edgeDisplayMode` 属性，用于控制如何渲染来自 glTF 扩展 [`EXT_mesh_primitive_edge_visibility`](https://github.com/KhronosGroup/glTF/pull/2479) 的边缘。支持三种模式：`SURFACES_ONLY`（仅表面）、`SURFACES_AND_EDGES`（表面与边缘）和 `EDGES_ONLY`（仅边缘，CAD 风格线框渲染）。[#13192](https://github.com/CesiumGS/cesium/pull/13192)
- Added support for multiple key modifiers in `ScreenSpaceEventHandler.setInputAction`. [#13307](https://github.com/CesiumGS/cesium/pull/13307)
  在 `ScreenSpaceEventHandler.setInputAction` 中新增对多个按键修饰符组合的支持。[#13307](https://github.com/CesiumGS/cesium/pull/13307)

#### Fixes :wrench:

- Fixed a bug causing `BufferPointCollection` to not update after changes to point positions. [#13465](https://github.com/CesiumGS/cesium/pull/13465)
  修复了点坐标位置变更后 `BufferPointCollection` 未能正确更新的缺陷。[#13465](https://github.com/CesiumGS/cesium/pull/13465)
- Improved the default voxel shader for common metadata types. [#13517](https://github.com/CesiumGS/cesium/pull/13517)
  针对常见元数据类型改进了默认体素（voxel）着色器。[#13517](https://github.com/CesiumGS/cesium/pull/13517)

## 1.141 - 2026-05-01

### cesium

#### Breaking Changes :mega:

- Bumped minimum required Node version to `22.0.0`
  将 Node 最低要求版本提升至 `22.0.0`

### @cesium/engine

#### Breaking Changes :mega:

- `BufferPrimitiveCollection` properties `modelMatrix`, `boundingVolume`, and `boundingVolumeWC` are now readonly. They may be modified, but not reassigned. [#13448](https://github.com/CesiumGS/cesium/pull/13448)
  `BufferPrimitiveCollection` 的 `modelMatrix`、`boundingVolume` 和 `boundingVolumeWC` 属性现在为只读。可以修改其内部属性，但不能重新赋值引用。[#13448](https://github.com/CesiumGS/cesium/pull/13448)

#### Additions :tada:

- Added support for properties (EXT_structural_metadata) in vector tilesets. [#13426](https://github.com/CesiumGS/cesium/pull/13426)
  新增在矢量瓦片集中对属性（EXT_structural_metadata）的支持。[#13426](https://github.com/CesiumGS/cesium/pull/13426)
- Added a new lint step, `npm run sg-scan`, to detect regressions related to JSDoc syntax and type definitions. [#13377](https://github.com/CesiumGS/cesium/pull/13377)
  新增 lint 检查步骤 `npm run sg-scan`，用于检测与 JSDoc 语法和类型定义相关的回归问题。[#13377](https://github.com/CesiumGS/cesium/pull/13377)

#### Fixes :wrench:

- Fixed a `DeveloperError` thrown when loading 3D tiles containing degenerate (zero-area) triangles with edge visibility data. [#13421](https://github.com/CesiumGS/cesium/pull/13421)
  修复了加载包含带有边缘可见性数据的退化（零面积）三角形 3D 瓦片时抛出 `DeveloperError` 的问题。[#13421](https://github.com/CesiumGS/cesium/pull/13421)
- Refactored `pickModel` to use shared util `ModelReader`, reducing duplicated scene-graph walking and vertex-reading logic. [#13433](https://github.com/CesiumGS/cesium/pull/13433)
  重构 `pickModel` 以使用共享工具 `ModelReader`，减少了重复的场景图遍历和顶点读取逻辑。[#13433](https://github.com/CesiumGS/cesium/pull/13433)
- Fixed lighting affecting `EquirectangularPanorama`. [#13369](https://github.com/CesiumGS/cesium/pull/13369)
  修复了光照影响 `EquirectangularPanorama`（等距柱状全景图）的问题。[#13369](https://github.com/CesiumGS/cesium/pull/13369)
- Fixed stale `showsUpdated` state persisting when entities are removed from ground primitive batches. [#13366](https://github.com/CesiumGS/cesium/pull/13366)
  修复了当实体从贴地图元批次（ground primitive batches）中移除时残留过时 `showsUpdated` 状态的问题。[#13366](https://github.com/CesiumGS/cesium/pull/13366)
- Fixed incorrect matrix multiplication for non worldspace instance transforms in `pickModel`. [#13433](https://github.com/CesiumGS/cesium/pull/13433)
  修复了 `pickModel` 中非世界空间实例化变换（instance transforms）矩阵乘法计算错误的问题。[#13433](https://github.com/CesiumGS/cesium/pull/13433)
- Fixed incorrect argument order in `ModelReader.octDecode` for `AttributeCompression.octDecodeInRange` and `Cartesian3.pack` calls. [#13433](https://github.com/CesiumGS/cesium/pull/13433)
  修复了 `ModelReader.octDecode` 中调用 `AttributeCompression.octDecodeInRange` 和 `Cartesian3.pack` 时参数顺序错误的问题。[#13433](https://github.com/CesiumGS/cesium/pull/13433)
- Fix JSDoc for `SkyBox.show` to correctly declare it as a prototype property for TypeScript compatibility. [#13357](https://github.com/CesiumGS/cesium/pull/13357)
  修复 `SkyBox.show` 的 JSDoc，将其正确声明为原型属性以保证 TypeScript 兼容性。[#13357](https://github.com/CesiumGS/cesium/pull/13357)

## 1.140 - 2026-04-01

### @cesium/engine

#### Breaking Changes :mega:

- Billboards and labels now require device support for WebGL 2, or WebGL 1 with ANGLE_instanced_arrays and MAX_VERTEX_TEXTURE_IMAGE_UNITS > 0. [#13053](https://github.com/CesiumGS/cesium/issues/13053) [#13253](https://github.com/CesiumGS/cesium/pull/13253)
  Billboard（广告牌）和 Label（文本标签）现在要求设备支持 WebGL 2，或带有 ANGLE_instanced_arrays 且 MAX_VERTEX_TEXTURE_IMAGE_UNITS > 0 的 WebGL 1。[#13053](https://github.com/CesiumGS/cesium/issues/13053) [#13253](https://github.com/CesiumGS/cesium/pull/13253)

#### Additions :tada:

- Added experimental, performance-focused vector primitive APIs: `BufferPointCollection`, `BufferPolylineCollection`, and `BufferPolygonCollection`. [#13212](https://github.com/CesiumGS/cesium/pull/13212)
  新增面向高性能场景的实验性矢量图元 API：`BufferPointCollection`、`BufferPolylineCollection` 和 `BufferPolygonCollection`。[#13212](https://github.com/CesiumGS/cesium/pull/13212)
- Added support for Reality Data of type `ITwinPlatform.RealityDataType.GaussianSplat3DTiles` to `ITwinData.createTilesetForRealityDataId`. [#13208](https://github.com/CesiumGS/cesium/pull/13208)
  在 `ITwinData.createTilesetForRealityDataId` 中新增对 `ITwinPlatform.RealityDataType.GaussianSplat3DTiles` 类型实景数据（Reality Data）的支持。[#13208](https://github.com/CesiumGS/cesium/pull/13208)
- Added the ability to pass `OffscreenCanvas` as `ImageryTypes`. [#13297](https://github.com/CesiumGS/cesium/pull/13297)
  新增支持将 `OffscreenCanvas` 作为 `ImageryTypes` 传入。[#13297](https://github.com/CesiumGS/cesium/pull/13297)
- Added GetFeatureInfo support to `WebMapTileServiceImageryProvider`, enabling `WebMapTileServiceImageryProvider.pickFeatures` for both KVP and RESTful WMTS services. New class parameters include `enablePickFeatures`, `getFeatureInfoFormats`, `getFeatureInfoUrl`, and `getFeatureInfoParameters`. [#13196](https://github.com/CesiumGS/cesium/pull/13196)
  为 `WebMapTileServiceImageryProvider` 新增 GetFeatureInfo 支持，使 KVP 和 RESTful 风格的 WMTS 服务均可使用 `WebMapTileServiceImageryProvider.pickFeatures`。新增的类参数包括 `enablePickFeatures`、`getFeatureInfoFormats`、`getFeatureInfoUrl` 和 `getFeatureInfoParameters`。[#13196](https://github.com/CesiumGS/cesium/pull/13196)
- Added limited support (via downcasting) for double-precision metadata types in custom shaders. [#13323](https://github.com/CesiumGS/cesium/pull/13323)
  在自定义着色器中新增对双精度元数据类型的有限支持（通过向下类型转换 downcasting 实现）。[#13323](https://github.com/CesiumGS/cesium/pull/13323)
- Added a new experimental property `PathGraphics.relativeTo` which allows entity `PathGraphics` to be displayed in a reference frame relative to another entity, or a different reference frame than the entity's `Position.ReferenceFrame`. [#13223](https://github.com/CesiumGS/cesium/pull/13223)
  新增实验性属性 `PathGraphics.relativeTo`，允许将实体的 `PathGraphics`（路径图形）显示在相对于另一实体的参考系中，或与该实体 `Position.ReferenceFrame` 不同的参考系中。[#13223](https://github.com/CesiumGS/cesium/pull/13223)

#### Fixes :wrench:

- Fixed intermittent label text/background misalignment when using `heightReference` (CLAMP_TO_GROUND, CLAMP_TO_TERRAIN, or CLAMP_TO_TILE). [#13335](https://github.com/CesiumGS/cesium/pull/13335)
  修复了使用 `heightReference`（CLAMP_TO_GROUND、CLAMP_TO_TERRAIN 或 CLAMP_TO_TILE）时标签文本与背景间歇性错位的问题。[#13335](https://github.com/CesiumGS/cesium/pull/13335)
- Fixed a crash when decoding large Gaussian splat SPZ files with high spherical harmonics degree. [#13287](https://github.com/CesiumGS/cesium/pull/13287)
  修复了在解码具有高阶球谐系数（high spherical harmonics degree）的大型高斯泼溅 SPZ 文件时引发崩溃的问题。[#13287](https://github.com/CesiumGS/cesium/pull/13287)
- Fixed Gaussian splat `modelMatrix` not being correctly applied to splat positions, rotations, and scales when the tileset transform changes. Fix spherical harmonic view direction being evaluated in the wrong coordinate frame in Gaussian splat rendering, causing subtle color errors for datasets without an embedded axis-compensation matrix. [#13305](https://github.com/CesiumGS/cesium/pull/13305)
  修复了瓦片集变换改变时高斯泼溅 `modelMatrix` 未能正确应用到泼溅点位置、旋转和缩放上的问题。修复了高斯泼溅渲染中球谐视角方向在错误坐标系下计算的问题（该问题导致未嵌入轴补偿矩阵的数据集出现微小颜色偏差）。[#13305](https://github.com/CesiumGS/cesium/pull/13305)
- Fixed a WebGL crash when rendering Gaussian splat tilesets with more than ~16 million splats. [#13235](https://github.com/CesiumGS/cesium/pull/13235)
  修复了渲染超过约 1600 万个高斯泼溅点的瓦片集时发生的 WebGL 崩溃问题。[#13235](https://github.com/CesiumGS/cesium/pull/13235)
- Fixed memory leak when rendering Gaussian splat 3D tilesets. [#13229](https://github.com/CesiumGS/cesium/pull/13229/)
  修复了渲染高斯泼溅 3D Tiles 瓦片集时的内存泄漏问题。[#13229](https://github.com/CesiumGS/cesium/pull/13229/)
- No longer disables custom shaders for primitives with missing metadata, as long as the metadata exists on the overall class definition. [#13258](https://github.com/CesiumGS/cesium/pull/13258)
  只要元数据存在于整体类定义中，就不再对缺失元数据的图元禁用自定义着色器。[#13258](https://github.com/CesiumGS/cesium/pull/13258)
- Fixed `SkyBox.show` being ignored when set to `false`. [#13315](https://github.com/CesiumGS/cesium/pull/13315)
  修复了将 `SkyBox.show` 设置为 `false` 时被忽略的问题。[#13315](https://github.com/CesiumGS/cesium/pull/13315)
- Fix performance issue with multiple ClippingPolygon on Cesium3DTileset. [#13255](https://github.com/CesiumGS/cesium/pull/13255)
  修复了在 `Cesium3DTileset` 上使用多个 `ClippingPolygon`（裁剪多边形）时的性能问题。[#13255](https://github.com/CesiumGS/cesium/pull/13255)
- Improved Gaussian splat loading and update performance by reducing transform work, reusing aggregate buffers, and lowering repeated sort churn during camera movement. [#13322](https://github.com/CesiumGS/cesium/pull/13322)
  通过减少变换计算、复用聚合缓冲区（aggregate buffers）以及降低相机移动过程中的重复排序抖动（sort churn），显著提升了高斯泼溅的加载与更新性能。[#13322](https://github.com/CesiumGS/cesium/pull/13322)
- Improved Gaussian splat SPZ decode performance by updating `@spz-loader/core` to `0.3.1`. [#13329](https://github.com/CesiumGS/cesium/pull/13329)
  通过将 `@spz-loader/core` 升级到 `0.3.1`，提升了高斯泼溅 SPZ 格式的解码性能。[#13329](https://github.com/CesiumGS/cesium/pull/13329)
- ClippingPolygonCollection performance and quality improvements. [#13308](https://github.com/CesiumGS/cesium/pull/13308)
  `ClippingPolygonCollection` 性能提升与质量改进。[#13308](https://github.com/CesiumGS/cesium/pull/13308)
- Fixed incorrect min and max values for accessors in decodeI3S.js.[#13280](https://github.com/CesiumGS/cesium/pull/13280)
  修复了 `decodeI3S.js` 中访问器（accessors）最小与最大值不正确的问题。[#13280](https://github.com/CesiumGS/cesium/pull/13280)
- Fixed camera zoom behavior when the camera transform is set (for example, when tracking entities or using `lookAt`). [#12999](https://github.com/CesiumGS/cesium/pull/12999)
  修复了设置相机变换矩阵时（例如跟踪实体或使用 `lookAt` 时）的相机缩放（zoom）行为异常。[#12999](https://github.com/CesiumGS/cesium/pull/12999)
- Fixed voxel raymarcher skipping zero step size when shape is infinitely thin. [#13257](https://github.com/CesiumGS/cesium/pull/13257)
  修复了体素光线步进器（voxel raymarcher）在几何形状无限薄时跳过零步长的问题。[#13257](https://github.com/CesiumGS/cesium/pull/13257)
- Fixed regression with point cloud custom styling when using `evaluate`. [#13346](https://github.com/CesiumGS/cesium/issues/13346)
  修复了在使用 `evaluate` 时点云自定义样式的回归缺陷。[#13346](https://github.com/CesiumGS/cesium/issues/13346)

### @cesium/sandcastle

#### Fixes :wrench:

- Performance and UX improvements for semantic search. Adjusted debounce time for semantic search to reduce results slightly less frequently (after 300ms instead of 100ms). Pagefind search now waits for semantic search to complete to reduce the number of visual updates to the gallery. [#13317](https://github.com/CesiumGS/cesium/pull/13317)
  提升了语义搜索的性能和用户体验。调整了语义搜索的防抖时间，从 100ms 调整为 300ms，以降低频繁刷新结果的频率。Pagefind 搜索现在会等待语义搜索完成，从而减少画廊列表的视觉刷新次数。[#13317](https://github.com/CesiumGS/cesium/pull/13317)
- Fixed an issue with globby not reading Windows paths correctly [#13317](https://github.com/CesiumGS/cesium/pull/13317)
  修复了 globby 无法正确读取 Windows 文件路径的问题 [#13317](https://github.com/CesiumGS/cesium/pull/13317)

## 1.139.1 - 2026-03-05

### @cesium/engine

#### Fixes :wrench:

- Fixes a regression with the NGA-GPM local extension and custom shaders. [#13247](https://github.com/CesiumGS/cesium/pull/13247)
  修复了 NGA-GPM 本地扩展与自定义着色器之间的回归缺陷。[#13247](https://github.com/CesiumGS/cesium/pull/13247)
- Fixes a non-invertible matrix crash when zooming into globe without collision detection enabled [#13078](https://github.com/CesiumGS/cesium/issues/13078)
  修复了未启用碰撞检测时向地球缩放导致不可逆矩阵崩溃的问题 [#13078](https://github.com/CesiumGS/cesium/issues/13078)

### @cesium/sandcastle

#### Fixes :wrench:

- Fixed split screen labels and Cartesian3 factory function calls, and edited descriptions for various gallery examples. [#13250](https://github.com/CesiumGS/cesium/pull/13250)
  修复了分屏文本标签和 `Cartesian3` 工厂函数调用，并编辑完善了多个示例画廊的描述文本。[#13250](https://github.com/CesiumGS/cesium/pull/13250)

## 1.139 - 2026-03-02

### @cesium/engine

#### Breaking Changes :mega:

- Fixed precision of point cloud attributes when accessed in a custom fragment shader. [#13170](https://github.com/CesiumGS/cesium/pull/13170)
  修复了在自定义片元着色器（custom fragment shader）中访问点云属性时的精度问题。[#13170](https://github.com/CesiumGS/cesium/pull/13170)
- Cartesian2, Cartesian3, and Cartesian4 are now [ES6 Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). This change should have no impact on most users, but note that using `new` on a static factory method, like `new Cartesian3.fromArray(...)`, will now throw an error. Omit `new` unless you are invoking a constructor directly, for these and all other factory methods, as more classes will be migrated to ES6 Classes soon. [#8359](https://github.com/CesiumGS/cesium/issues/8359)
  Cartesian2、Cartesian3 与 Cartesian4 现已转换为 [ES6 类（Classes）](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)。该改动对大多数用户没有影响，但请注意，在静态工厂方法上使用 `new`（例如 `new Cartesian3.fromArray(...)`）现在将抛出错误。除非直接调用构造函数，否则对于这些方法以及所有其他工厂方法均应省略 `new`，因为后续将有更多类迁移到 ES6 类。[#8359](https://github.com/CesiumGS/cesium/issues/8359)
- [Custom Shaders](https://cesium.com/learn/cesiumjs/ref-doc/CustomShader.html?classFilter=customsh) that rely on metadata derived from the [EXT_structural_metadata extension](https://github.com/CesiumGS/glTF/tree/proposal-EXT_structural_metadata/extensions/2.0/Vendor/EXT_structural_metadata) no longer cast
  unsigned integer metadata types to signed integers. Any existing custom shaders that assign UINT-type metadata to local integers (e.g. `int myMetadata = vsInput.metadata.myUintMetadata`) will no longer compile. Variable assignments must be changed to reflect the underlying signedness of the metadata type.
  [#13135](https://github.com/CesiumGS/cesium/pull/13135)
  依赖于源自 [EXT_structural_metadata 扩展](https://github.com/CesiumGS/glTF/tree/proposal-EXT_structural_metadata/extensions/2.0/Vendor/EXT_structural_metadata) 的元数据的[自定义着色器（Custom Shaders）](https://cesium.com/learn/cesiumjs/ref-doc/CustomShader.html?classFilter=customsh)不再将无符号整型元数据类型强转为有符号整型。任何将 UINT 类型元数据赋值给局部有符号整型（如 `int myMetadata = vsInput.metadata.myUintMetadata`）的现有自定义着色器将无法再编译。必须修改变量赋值以反映元数据类型的底层符号性（signedness）。[#13135](https://github.com/CesiumGS/cesium/pull/13135)

#### Additions :tada:

- Added panorama support via new `EquirectangularPanorama` and `CubeMapPanorama` classes, along with `GoogleStreetViewCubeMapPanoramaProvider` for loading cube map faces from the Google Street View Static API and rendering them in a cube map panorama. [#13153](https://github.com/CesiumGS/cesium/pull/13153/)
  新增全景图支持：提供了全新的 `EquirectangularPanorama`（等距柱状全景）和 `CubeMapPanorama`（立方体贴图全景）类，以及用于从 Google 街景静态 API（Google Street View Static API）加载立方体贴图面并将其渲染为立方体贴图全景的 `GoogleStreetViewCubeMapPanoramaProvider`。[#13153](https://github.com/CesiumGS/cesium/pull/13153/)
- Added more depth testing options for billboards and labels with `BillboardCollection.coarseDepthTestDistance`, `BillboardCollection.threePointDepthTestDistance`, `LabelCollection.coarseDepthTestDistance`, and `LabelCollection.threePointDepthTestDistance`. [#12994](https://github.com/CesiumGS/cesium/pull/12994)
  为广告牌（Billboard）和标签（Label）添加了更多深度测试选项，包括 `BillboardCollection.coarseDepthTestDistance`、`BillboardCollection.threePointDepthTestDistance`、`LabelCollection.coarseDepthTestDistance` 以及 `LabelCollection.threePointDepthTestDistance`。[#12994](https://github.com/CesiumGS/cesium/pull/12994)
- Added support for more metadata types via property textures in custom shaders. See this [issue](https://github.com/CesiumGS/cesium/issues/10248) for the current state of supported types. [#13135](https://github.com/CesiumGS/cesium/pull/13135)
  在自定义着色器中添加了通过属性纹理（property textures）支持更多元数据类型的特性。有关当前支持类型的状态，请参见此 [Issue](https://github.com/CesiumGS/cesium/issues/10248)。[#13135](https://github.com/CesiumGS/cesium/pull/13135)
- Added support for accessing metadata from property tables (from the [EXT_structural_metadata extension](https://github.com/CesiumGS/glTF/tree/proposal-EXT_structural_metadata/extensions/2.0/Vendor/EXT_structural_metadata)) in [custom shaders](https://cesium.com/learn/cesiumjs/ref-doc/CustomShader.html?classFilter=customsh). [#13124](https://github.com/CesiumGS/cesium/issues/13124)
  添加了在[自定义着色器](https://cesium.com/learn/cesiumjs/ref-doc/CustomShader.html?classFilter=customsh)中从属性表（property tables，源自 [EXT_structural_metadata 扩展](https://github.com/CesiumGS/glTF/tree/proposal-EXT_structural_metadata/extensions/2.0/Vendor/EXT_structural_metadata)）访问元数据的支持。[#13124](https://github.com/CesiumGS/cesium/issues/13124)
- Added `AttributeCompression.encodeRGB8` and `decodeRGB8` for packing colors. [#13174](https://github.com/CesiumGS/cesium/pull/13174)
  添加了用于颜色打包与压缩的 `AttributeCompression.encodeRGB8` 和 `decodeRGB8`。[#13174](https://github.com/CesiumGS/cesium/pull/13174)

#### Fixes :wrench:

- Fixed Gaussian splat race conditions in snapshot/sort updates by enforcing explicit snapshot states, preventing stale async results from causing flickering, WebGL draw errors, and unstable LOD transition performance. [#13016](https://github.com/CesiumGS/cesium/pull/13016) [#12965](https://github.com/CesiumGS/cesium/pull/12965)
  通过强制显式快照状态，修复了高斯泼溅（Gaussian splat）在快照/排序更新中的竞态条件，防止陈旧的异步计算结果导致闪烁、WebGL 绘制错误以及不稳定的 LOD 过渡性能。[#13016](https://github.com/CesiumGS/cesium/pull/13016) [#12965](https://github.com/CesiumGS/cesium/pull/12965)
- Fixed flashing when rendering multiple Gaussian splat primitives by storing draw-command model matrices per primitive (`_drawCommandModelMatrix`). [#12967]
  通过按图元存储绘制命令模型矩阵（`_drawCommandModelMatrix`），修复了渲染多个高斯泼溅（Gaussian splat）图元时的闪烁问题。[#12967]
- Fixed depth-testing when `Billboard.disableDepthTestDistance` is `0`. [#13150]
  修复了当 `Billboard.disableDepthTestDistance` 为 `0` 时的深度测试问题。[#13150]
- Fixed billboard depth testing near horizon. [#13159]
  修复了地平线附近广告牌的深度测试问题。[#13159]
- Fixed shader cache lookup for day/night alpha in Columbus View. [#13216]
  修复了哥伦布视图（Columbus View）中昼夜 Alpha 的着色器缓存查找问题。[#13216]
- Fixed precision of point cloud attributes when accessed in a custom fragment shader. [#13170]
  修复了在自定义片元着色器中访问点云属性时的精度问题。[#13170]
- Fixed a point-rendering regression which caused points to render as circles rather than squares. Such points now will only render as circles when their width is specified via the [BENTLEY_materials_point_style](https://github.com/CesiumGS/glTF/pull/91) glTF extension. [#13217]
  修复了一个点渲染回归问题，该问题曾导致点被渲染为圆形而非正方形。现在只有当通过 [BENTLEY_materials_point_style](https://github.com/CesiumGS/glTF/pull/91) glTF 扩展指定点宽时，此类点才会渲染为圆形。[#13217]
- Fixed a coordinate switching bug in `OpenCageGeocoderService`. [#13138]
  修复了 `OpenCageGeocoderService` 中坐标经纬度颠倒的错误。[#13138]
- Fixed a regex expression used to find metadata variables in `CustomShader`s, and extended it to work with `metadataClass` and `metadataStatistics`. [#13231]
  修复了用于在 `CustomShader` 中查找元数据变量的正则表达式，并扩展其以支持 `metadataClass` 和 `metadataStatistics`。[#13231]

### @cesium/sandcastle

- Modified Sandcastle application to use a hybrid text and semantic, embedding based search. [#13090](https://github.com/CesiumGS/cesium/pull/13090)
  修改了 Sandcastle 应用程序，使其使用文本与基于语义嵌入（embedding）的混合搜索。[#13090](https://github.com/CesiumGS/cesium/pull/13090)
- Updated Sandcastle Gallery creation process to leverage MIT licensed Huggingface model to vectorize each sandcastle for embedding search. [#13090](https://github.com/CesiumGS/cesium/pull/13090)
  更新了 Sandcastle Gallery 构建流程，利用 MIT 许可的 Hugging Face 模型对每个 Sandcastle 示例进行向量化，以用于语义嵌入搜索。[#13090](https://github.com/CesiumGS/cesium/pull/13090)
- Further separated the viewer from the rest of the app to enable running them on separate origins. [#13154](https://github.com/CesiumGS/cesium/pull/13154)
  进一步将 Viewer（查看器）与应用程序的其他部分解耦分离，以支持它们在不同源（separate origins）下运行。[#13154](https://github.com/CesiumGS/cesium/pull/13154)

## 1.138 - 2026-02-02

### @cesium/engine

#### Fixes :wrench:

- Fixed jitter artifacts on Intel Arc GPUs. [#12879](https://github.com/CesiumGS/cesium/issues/12879)
  修复了 Intel Arc 显卡上的抖动瑕疵（jitter artifacts）。[#12879](https://github.com/CesiumGS/cesium/issues/12879)
- Improved voxel memory usage by reworking `Megatexture` to use `Texture3D`. [#12570](https://github.com/CesiumGS/cesium/issues/12570)
  通过重构 `Megatexture` 改用 `Texture3D`（三维纹理），改善了体素（voxel）的内存占用。[#12570](https://github.com/CesiumGS/cesium/issues/12570)
- Fixed multiple issues causing undefined pick results in 2D/CV scene modes. [#13083](https://github.com/CesiumGS/cesium/issues/13083)
  修复了导致 2D/CV（二维/哥伦布视图）场景模式下拾取结果为 undefined 的多个问题。[#13083](https://github.com/CesiumGS/cesium/issues/13083)
- Fixed label sizing for some fonts and characters. [#9767](https://github.com/CesiumGS/cesium/issues/9767)
  修复了某些字体和字符的标签尺寸测量问题。[#9767](https://github.com/CesiumGS/cesium/issues/9767)
- Fixed a type error when accessing the ellipsoid of a viewer. [#13123](https://github.com/CesiumGS/cesium/pull/13123)
  修复了访问 Viewer 的椭球体（ellipsoid）时出现的类型错误（TypeError）。[#13123](https://github.com/CesiumGS/cesium/pull/13123)
- Fixed a bug where entities have not been clustered correctly. [#13064](https://github.com/CesiumGS/cesium/pull/13064)
  修复了实体（Entity）未能正确聚合（cluster）的问题。[#13064](https://github.com/CesiumGS/cesium/pull/13064)
- Fixed error with `DynamicEnvironmentMapManager` when `ContextLimits.maximumCubeMapSize` is zero. [#12606](https://github.com/CesiumGS/cesium/pull/12606)
  修复了当 `ContextLimits.maximumCubeMapSize` 为零时 `DynamicEnvironmentMapManager` 抛出错误的问题。[#12606](https://github.com/CesiumGS/cesium/pull/12606)

#### Additions :tada:

- Added support for [EXT_textureInfo_constant_lod](https://github.com/CesiumGS/glTF/pull/92) glTF extension. [#13121](https://github.com/CesiumGS/cesium/pull/13121)
  添加了对 [EXT_textureInfo_constant_lod](https://github.com/CesiumGS/glTF/pull/92) glTF 扩展的支持。[#13121](https://github.com/CesiumGS/cesium/pull/13121)

## 1.137 - 2026-01-05

### @cesium/engine

#### Fixes :wrench:

- Fixes label positioning in workflows that delete and recreate clamped labels [#12949](https://github.com/CesiumGS/cesium/issues/12949)
  修复了在删除并重新创建贴地/贴模型标签（clamped labels）的工作流中标签定位异常的问题。[#12949](https://github.com/CesiumGS/cesium/issues/12949)
- Fixes texture coordinates in large billboard collections [#13042](https://github.com/CesiumGS/cesium/pull/13042)
  修复了大型广告牌集合（billboard collections）中的纹理坐标问题。[#13042](https://github.com/CesiumGS/cesium/pull/13042)

#### Deprecated :hourglass_flowing_sand:

- Beginning in CesiumJS 1.140, billboards and labels will require device support for WebGL 2, or WebGL 1 with ANGLE_instanced_arrays and MAX_VERTEX_TEXTURE_IMAGE_UNITS > 0. For more information or to share feedback, please see [#13053](https://github.com/CesiumGS/cesium/issues/13053). [#13067](https://github.com/CesiumGS/cesium/issues/13067)
  自 CesiumJS 1.140 起，广告牌（billboard）和标签（label）将要求设备支持 WebGL 2，或支持带有 ANGLE_instanced_arrays 扩展且 MAX_VERTEX_TEXTURE_IMAGE_UNITS > 0 的 WebGL 1。欲了解更多信息或反馈意见，请参见 [#13053](https://github.com/CesiumGS/cesium/issues/13053)。[#13067](https://github.com/CesiumGS/cesium/issues/13067)

#### Additions :tada:

- Added support for the proposed [BENTLEY_materials_point_style](https://github.com/CesiumGS/glTF/pull/91) glTF extension. This allows point primitives to have a diameter property specified and respected when loaded via glTF.
  添加了对草案 [BENTLEY_materials_point_style](https://github.com/CesiumGS/glTF/pull/91) glTF 扩展的支持。这使得点图元在通过 glTF 加载时能够指定并在渲染中遵循直径（diameter）属性。
- Added support for the proposed [BENTLEY_materials_line_style](https://github.com/CesiumGS/glTF/pull/89) glTF extension. This enables CAD-style line visualization with variable width and dash patterns. Lines and edges can now have customizable `width` (in screen pixels) and `pattern` (16-bit repeating on/off pattern) properties when loaded via glTF.
  添加了对草案 [BENTLEY_materials_line_style](https://github.com/CesiumGS/glTF/pull/89) glTF 扩展的支持。这实现了具有可变宽度和虚线样式的 CAD 风格线段可视化。通过 glTF 加载时，线条和边现在可以具有可自定义的 `width`（屏幕像素宽度）和 `pattern`（16 位循环虚线开关样式）属性。
- Refactored `EXT_mesh_primitive_edge_visibility` implementation to use quad-based rendering instead of `gl_line` primitives. This enables variable line width support, as WebGL does not support line widths greater than 1. Each edge is now tessellated into a quad (4 vertices, 2 triangles) that expands perpendicular to the edge direction based on the material's width property.
  重构了 `EXT_mesh_primitive_edge_visibility` 的实现，采用基于四边形（quad-based）的渲染替代 `gl_line` 图元。鉴于 WebGL 不支持大于 1 的线宽，此举实现了对可变线宽的支持。每条边现在都被细分为一个四边形（4 个顶点，2 个三角形），并根据材质的宽度属性沿垂直于边方向展开。

## 1.136 - 2025-12-01

### @cesium/engine

#### Fixes :wrench:

- Improved scaling of SVGs in billboards [#13020](https://github.com/CesiumGS/cesium/pull/13020)
  改进了广告牌中 SVG 的缩放效果。[#13020](https://github.com/CesiumGS/cesium/pull/13020)
- Billboards using `imageSubRegion` now render as expected. [#12585](https://github.com/CesiumGS/cesium/issues/12585)
  使用 `imageSubRegion` 的广告牌现在能按预期正确渲染。[#12585](https://github.com/CesiumGS/cesium/issues/12585)
- Fixed depth testing bug with billboards and labels clipping through models [#13012](https://github.com/CesiumGS/cesium/issues/13012)
  修复了广告牌和标签穿透模型裁剪的深度测试错误。[#13012](https://github.com/CesiumGS/cesium/issues/13012)
- Fixed unexpected outline artifacts around billboards [#4525](https://github.com/CesiumGS/cesium/issues/4525)
  修复了广告牌周围异常轮廓瑕疵的问题。[#4525](https://github.com/CesiumGS/cesium/issues/4525)

#### Additions :tada:

- Added `scene.pickAsync` for non GPU blocking picking using WebGL2 [#12983](https://github.com/CesiumGS/cesium/pull/12983)
  添加了基于 WebGL2 的 `scene.pickAsync`，用于实现非 GPU 阻塞的异步拾取。[#12983](https://github.com/CesiumGS/cesium/pull/12983)
- Improves performance of terrain picks via new terrain picking quadtrees [#8481](https://github.com/CesiumGS/cesium/issues/8481)
  通过全新的地形拾取四叉树提升了地形拾取性能。[#8481](https://github.com/CesiumGS/cesium/issues/8481)

## 1.135 - 2025-11-03

### @cesium/engine

#### Breaking Changes :mega:

- Removed support for the `KHR_spz_gaussian_splats_compression` extension in favor of the latest 3D Gaussian splatting extensions for glTF, `KHR_gaussian_splatting` and `KHR_gaussian_splatting_compression_spz_2`. Please re-tile existing Gaussian splatting 3D Tiles [#12837](https://github.com/CesiumGS/cesium/issues/12837)
  移除了对 `KHR_spz_gaussian_splats_compression` 扩展的支持，转而采用最新的 glTF 3D 高斯泼溅扩展：`KHR_gaussian_splatting` 与 `KHR_gaussian_splatting_compression_spz_2`。请重新切片现有的高斯泼溅 3D Tiles 数据。[#12837](https://github.com/CesiumGS/cesium/issues/12837)
- `scene.drillPick` now uses a breadth-first search strategy instead of depth-first. This may change which entities are picked when using large values of `width` and `height` when providing a `limit`, prioritizing entities closer to the camera. [#12916](https://github.com/CesiumGS/cesium/pull/12916)
  `scene.drillPick`（穿透拾取）现在改用广度优先搜索策略而非深度优先。当提供了 `limit` 且使用的 `width` 与 `height` 较大时，这可能会改变拾取到的实体结果，优先选取更靠近相机的实体。[#12916](https://github.com/CesiumGS/cesium/pull/12916)

#### Additions :tada:

- Added experimental support for loading 3D Tiles as terrain, via `Cesium3DTilesTerrainProvider`. See [the PR](https://github.com/CesiumGS/cesium/pull/12963) for limitations on the types of 3D Tiles that can be used. [#12296](https://github.com/CesiumGS/cesium/issues/12296)
  添加了通过 `Cesium3DTilesTerrainProvider` 将 3D Tiles 作为地形加载的实验性支持。有关可使用的 3D Tiles 类型限制，请参见 [PR 说明](https://github.com/CesiumGS/cesium/pull/12963)。[#12296](https://github.com/CesiumGS/cesium/issues/12296)
- Added support for [EXT_mesh_primitive_edge_visibility](https://github.com/KhronosGroup/glTF/pull/2479) glTF extension. [#12765](https://github.com/CesiumGS/cesium/issues/12765)
  添加了对 [EXT_mesh_primitive_edge_visibility](https://github.com/KhronosGroup/glTF/pull/2479) glTF 扩展的支持。[#12765](https://github.com/CesiumGS/cesium/issues/12765)
- Extended edge visibility loading to honor material colors and line-string overrides from EXT_mesh_primitive_edge_visibility.
  扩展了边缘可见性加载逻辑，以支持来自 EXT_mesh_primitive_edge_visibility 的材质颜色和折线重写（line-string overrides）。

#### Fixes :wrench:

- Improved performance of `scene.drillPick`. [#12916](https://github.com/CesiumGS/cesium/pull/12916)
  提升了 `scene.drillPick` 的性能。[#12916](https://github.com/CesiumGS/cesium/pull/12916)
- Improved performance when removing primitives. [#3018](https://github.com/CesiumGS/cesium/pull/3018)
  提升了移除图元（primitives）时的性能。[#3018](https://github.com/CesiumGS/cesium/pull/3018)
- Improved performance of terrain Quadtree handling of custom data [#12907](https://github.com/CesiumGS/cesium/pull/12907)
  提升了地形四叉树处理自定义数据时的性能。[#12907](https://github.com/CesiumGS/cesium/pull/12907)
- Fixed vertical exaggeration of ellipsoid-shaped voxels. [#12811](https://github.com/CesiumGS/cesium/issues/12811)
  修复了椭球形体素的高程夸大（vertical exaggeration）效果。[#12811](https://github.com/CesiumGS/cesium/issues/12811)
- Fixed parsing content bounding volumes contained in 3D Tiles 1.1 subtree files. [#12972](https://github.com/CesiumGS/cesium/pull/12972)
  修复了对 3D Tiles 1.1 subtree（子树）文件中包含的内容包围盒（content bounding volumes）的解析问题。[#12972](https://github.com/CesiumGS/cesium/pull/12972)
- Fixes an event bug following recent changes, where adding a new listener during an event callback caused an infinite loop. [#12955](https://github.com/CesiumGS/cesium/pull/12955)
  修复了近期改动引入的事件缺陷：在事件回调中添加新的监听器会导致死循环。[#12955](https://github.com/CesiumGS/cesium/pull/12955)
- Fix issues with label background when updating properties while `label.show` is `false`. [#12138](https://github.com/CesiumGS/cesium/issues/12138)
  修复了当 `label.show` 为 `false` 时更新属性导致的标签背景问题。[#12138](https://github.com/CesiumGS/cesium/issues/12138)
- Fixed picking of `GroundPrimitive` with multiple `PolygonGeometry` instances selecting the wrong instance. [#12978](https://github.com/CesiumGS/cesium/pull/12978)
  修复了包含多个 `PolygonGeometry` 实例的贴地图元（`GroundPrimitive`）在拾取时选中错误实例的问题。[#12978](https://github.com/CesiumGS/cesium/pull/12978)
- Fixed a bug where the removal of draped imagery layers did not update the rendered state [#12923](https://github.com/CesiumGS/cesium/issues/12923)
  修复了移除贴地/覆盖影像图层（draped imagery layers）时未更新渲染状态的缺陷。[#12923](https://github.com/CesiumGS/cesium/issues/12923)
- Fixed precision issues with Gaussian splat tilesets where the root tile does not have a world transform. [#12925](https://github.com/CesiumGS/cesium/issues/12925)
  修复了根瓦片不含世界变换矩阵时高斯泼溅瓦片集（Gaussian splat tilesets）的精度问题。[#12925](https://github.com/CesiumGS/cesium/issues/12925)
- Fixed infinite recursion that would happen if user append post-render callbacks within existing callbacks [#12983](https://github.com/CesiumGS/cesium/pull/12983)
  修复了用户在已有渲染后回调中追加 post-render 回调时可能发生的无限递归问题。[#12983](https://github.com/CesiumGS/cesium/pull/12983)

## 1.134.1 - 2025-10-10

### @cesium/engine

#### Fixes :wrench:

- Fixed an event bug following recent changes, where adding a new listener during an event callback caused an infinite loop. [#12955](https://github.com/CesiumGS/cesium/pull/12955)
  修复了近期改动引入的事件缺陷：在事件回调中添加新的监听器会导致死循环。[#12955](https://github.com/CesiumGS/cesium/pull/12955)

## 1.134 - 2025-10-01

- [Sandcastle](https://sandcastle.cesium.com/) has been updated at `https://sandcastle.cesium.com`! The [legacy Sandcastle app](https://cesium.com/downloads/cesiumjs/releases/1.134/Apps/Sandcastle/index.html) will remain available through November 3, 2025.
  [Sandcastle](https://sandcastle.cesium.com/) 现已更新至 `https://sandcastle.cesium.com`！[旧版 Sandcastle 应用](https://cesium.com/downloads/cesiumjs/releases/1.134/Apps/Sandcastle/index.html)将保留至 2025 年 11 月 3 日。

### @cesium/engine

#### Breaking Changes :mega:

- Voxel rendering now requires a WebGL2 context, which is [enabled by default since 1.101](https://github.com/CesiumGS/cesium/pull/10894). Make sure the `requestWebGl1` flag in `contextOptions` is NOT set to true.
  体素（Voxel）渲染现在需要 WebGL2 上下文环境，该环境[自 1.101 起已默认启用](https://github.com/CesiumGS/cesium/pull/10894)。请确保 `contextOptions` 中的 `requestWebGl1` 标志未设置为 true。
- The `defaultValue` function has been removed. Instead, use the [nullish coalescing (`??`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) operator. See the [Coding Guide](https://github.com/CesiumGS/cesium/tree/main/Documentation/Contributors/CodingGuide#default-parameter-values) for usage information and examples.
  移除了 `defaultValue` 函数。请改用[空值合并运算符（`??`）](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)。用法与示例请参见[编码指南（Coding Guide）](https://github.com/CesiumGS/cesium/tree/main/Documentation/Contributors/CodingGuide#default-parameter-values)。
- `defaultValue.EMPTY_OBJECT` has been removed. Instead, use `Frozen.EMPTY_OBJECT`. See the [Coding Guide](https://github.com/CesiumGS/cesium/tree/main/Documentation/Contributors/CodingGuide#default-parameter-values) for usage information and examples.
  移除了 `defaultValue.EMPTY_OBJECT`。请改用 `Frozen.EMPTY_OBJECT`。用法与示例请参见[编码指南（Coding Guide）](https://github.com/CesiumGS/cesium/tree/main/Documentation/Contributors/CodingGuide#default-parameter-values)。

#### Additions :tada:

- Added Google2DImageryProvider to load imagery from [Google Maps](https://developers.google.com/maps/documentation/tile/2d-tiles-overview) [#12913](https://github.com/CesiumGS/cesium/pull/12913)
  新增了 Google2DImageryProvider，用于从 [Google Maps](https://developers.google.com/maps/documentation/tile/2d-tiles-overview) 加载影像。[#12913](https://github.com/CesiumGS/cesium/pull/12913)
- Added an async factory method for the Material class that allows callers to wait on resource loading. [#10566](https://github.com/CesiumGS/cesium/issues/10566)
  为 Material 类添加了一个异步工厂方法，允许调用者等待资源加载完成。[#10566](https://github.com/CesiumGS/cesium/issues/10566)

#### Fixes :wrench:

- Fixed vertical misalignment of glyphs in labels with small fonts [#8474](https://github.com/CesiumGS/cesium/issues/8474)
  修复了小字号标签中字形（glyphs）垂直未对齐的问题。[#8474](https://github.com/CesiumGS/cesium/issues/8474)
- Converted voxel raymarching to eye coordinates to fix precision issues in large datasets. [#12061](https://github.com/CesiumGS/cesium/issues/12061)
  将体素光线投射/光线步进（raymarching）转换至相机/视点坐标系（eye coordinates），以解决大型数据集中的精度问题。[#12061](https://github.com/CesiumGS/cesium/issues/12061)
- Fixed flickering artifact in Gaussian splat models caused by incorrect sorting results. [#12662](https://github.com/CesiumGS/cesium/issues/12662)
  修复了因深度排序结果错误导致的高斯泼溅（Gaussian splat）模型闪烁瑕疵。[#12662](https://github.com/CesiumGS/cesium/issues/12662)
- Fixed issue where multiple instances of a Gaussian splat tileset would transform tile positions incorrectly and render out of position. [#12795](https://github.com/CesiumGS/cesium/issues/12795)
  修复了高斯泼溅瓦片集（Gaussian splat tileset）的多实例出现瓦片位置变换错误并渲染位置偏移的问题。[#12795](https://github.com/CesiumGS/cesium/issues/12795)
- Fixed rendering for geometry entities when `requestRenderMode` is enabled. [#12841](https://github.com/CesiumGS/cesium/pull/12841)
  修复了启用按需渲染模式（`requestRenderMode`）时几何图形实体的渲染问题。[#12841](https://github.com/CesiumGS/cesium/pull/12841)
- Improved performance and reduced memory usage of `Event` class. [#12896](https://github.com/CesiumGS/cesium/pull/12896)
  提升了 `Event` 类的性能并降低了其内存占用。[#12896](https://github.com/CesiumGS/cesium/pull/12896)
- Improved performance of clamped labels. [#12905](https://github.com/CesiumGS/cesium/pull/12905)
  提升了贴地/贴模型标签（clamped labels）的性能。[#12905](https://github.com/CesiumGS/cesium/pull/12905)
- Materials loaded from type now respect submaterials present in the referenced material type. [#10566](https://github.com/CesiumGS/cesium/issues/10566)
  从类型加载的材质现在会正确遵循引用材质类型中存在的子材质（submaterials）。[#10566](https://github.com/CesiumGS/cesium/issues/10566)
- Prevent runtime errors for certain forms of invalid PNTS files [#12872](https://github.com/CesiumGS/cesium/issues/12872)
  防止某些特定格式的无效 PNTS（点云）文件导致运行时错误。[#12872](https://github.com/CesiumGS/cesium/issues/12872)
- Revert `createImageBitmap` options update to continue support for older browsers [#12846](https://github.com/CesiumGS/cesium/issues/12846)
  回退了 `createImageBitmap` 选项更新，以继续支持旧版浏览器。[#12846](https://github.com/CesiumGS/cesium/issues/12846)

## 1.133.1 - 2025-09-08

This is an npm-only release to fix a dependency issue published in 1.133.0

这是一个仅限 npm 的补丁发布，用于修复 1.133.0 中发布的依赖问题。

## 1.133 - 2025-09-02

- Give the [new version of Sandcastle](https://dev-sandcastle.cesium.com/) a try today!
  快来体验[新版 Sandcastle](https://dev-sandcastle.cesium.com/)吧！

### @cesium/engine

#### Breaking Changes :mega:

- Removed the argument fallback in `ITwinData.*` functions. Instead, use the new options argument signature. [#12778](https://github.com/CesiumGS/cesium/issues/12778)
  移除了 `ITwinData.*` 系列函数中的参数后备回退（argument fallback）。请改用新的 options 参数签名。[#12778](https://github.com/CesiumGS/cesium/issues/12778)

#### Additions :tada:

- Added support for the [EXT_mesh_primitive_restart](https://github.com/KhronosGroup/glTF/pull/2478) glTF extension. [#12764](https://github.com/CesiumGS/cesium/issues/12764)
  添加了对 [EXT_mesh_primitive_restart](https://github.com/KhronosGroup/glTF/pull/2478) glTF 扩展（图元重启）的支持。[#12764](https://github.com/CesiumGS/cesium/issues/12764)
- Added spherical harmonics support for Gaussian splats, supported with the SPZ compression format. [#12790](https://github.com/CesiumGS/cesium/pull/12790)
  为高斯泼溅（Gaussian splats）添加了球谐函数（spherical harmonics）支持，支持 SPZ 压缩格式。[#12790](https://github.com/CesiumGS/cesium/pull/12790)
- Added `Ellipsoid.MARS` for use with Mars terrain and imagery. [#12828](https://github.com/CesiumGS/cesium/pull/12828)
  添加了用于火星地形和影像的 `Ellipsoid.MARS`（火星参考椭球体）。[#12828](https://github.com/CesiumGS/cesium/pull/12828)
- Allow passing `Cesium3DTileset` constructor options to the tileset that is created with `ITwinData.createTilesetForRealityDataId`. [#12709](https://github.com/CesiumGS/cesium/issues/12709)
  允许将 `Cesium3DTileset` 构造函数选项传递给通过 `ITwinData.createTilesetForRealityDataId` 创建的瓦片集。[#12709](https://github.com/CesiumGS/cesium/issues/12709)

#### Fixes :wrench:

- Fixed issue where a Gaussian splat tileset would be rendered even if out of current camera view. [#12840](https://github.com/CesiumGS/cesium/pull/12840)
  修复了高斯泼溅瓦片集即使超出当前相机视界范围仍会被渲染的问题。[#12840](https://github.com/CesiumGS/cesium/pull/12840)
- Removes the minimum tile threshold of four for WMTS. [#4372](https://github.com/CesiumGS/cesium/issues/4372)
  移除了 WMTS 最小 4 个瓦片的阈值限制。[#4372](https://github.com/CesiumGS/cesium/issues/4372)
- Fixed a crash when loading PNTS (point cloud) data that contained a batch table without a binary part. [#11166](https://github.com/CesiumGS/cesium/issues/11166)
  修复了加载包含不含二进制部分批次表（batch table）的 PNTS（点云）数据时程序崩溃的问题。[#11166](https://github.com/CesiumGS/cesium/issues/11166)
- Fixed an error picking an area hidden by a `ClippingPolygon`. [#12725](https://github.com/CesiumGS/cesium/issues/12725)
  修复了拾取被裁剪多边形（`ClippingPolygon`）隐藏的区域时报错的问题。[#12725](https://github.com/CesiumGS/cesium/issues/12725)

#### Deprecated :hourglass_flowing_sand:

- Deprecated support for the `KHR_spz_gaussian_splats_compression` extension in favor of the latest 3D Gaussian splatting extensions for glTF, `KHR_gaussian_splatting` and `KHR_gaussian_splatting_compression_spz_2`. The deprecated extension will be removed in version 1.135. To ensure support in CesiumJS 1.135 and beyond, Please re-tile existing Gaussian splatting 3D Tiles before November 1, 2025. [#12837](https://github.com/CesiumGS/cesium/issues/12837)
  废弃了对 `KHR_spz_gaussian_splats_compression` 扩展的支持，转而采用最新的 glTF 3D 高斯泼溅扩展：`KHR_gaussian_splatting` 与 `KHR_gaussian_splatting_compression_spz_2`。已废弃的扩展将在 1.135 版本中移除。为确保在 CesiumJS 1.135 及后续版本中的支持，请在 2025 年 11 月 1 日之前重新切片现有的高斯泼溅 3D Tiles 数据。[#12837](https://github.com/CesiumGS/cesium/issues/12837)

## 1.132 - 2025-08-01

### @cesium/engine

#### Fixes :wrench:

- Fixes incorrect polygon culling in 2D scene mode. [#1552](https://github.com/CesiumGS/cesium/issues/1552)
  修复二维场景模式下多边形剔除错误的问题。[#1552](https://github.com/CesiumGS/cesium/issues/1552)
- Fixes material flashing when changing properties. [#1640](https://github.com/CesiumGS/cesium/issues/1640), [#12716](https://github.com/CesiumGS/cesium/issues/12716)
  修复修改属性时材质闪烁的问题。[#1640](https://github.com/CesiumGS/cesium/issues/1640), [#12716](https://github.com/CesiumGS/cesium/issues/12716)
- Fixed an issue where draped imagery on tilesets was not updated based on the visibility of the imagery layer. [#12742](https://github.com/CesiumGS/cesium/issues/12742)
  修复瓦片集上的贴地影像未根据影像图层的可见性进行更新的问题。[#12742](https://github.com/CesiumGS/cesium/issues/12742)
- Fixes an exception when removing a Gaussian splat tileset from the scene primitives when it has more than one tile. [#12726](https://github.com/CesiumGS/cesium/pull/12726)
  修复当高斯泼溅（Gaussian splat）瓦片集包含多个瓦片时，从场景图元列表中移除该瓦片集会抛出异常的问题。[#12726](https://github.com/CesiumGS/cesium/pull/12726)
- Fixes rendering of Gaussian splats when they are scaled by the glTF transform, tileset transform, or model matrix. [#12721](https://github.com/CesiumGS/cesium/issues/12721), [#12718](https://github.com/CesiumGS/cesium/issues/12718)
  修复当高斯泼溅通过 glTF 变换、瓦片集变换或模型矩阵进行缩放时的渲染问题。[#12721](https://github.com/CesiumGS/cesium/issues/12721), [#12718](https://github.com/CesiumGS/cesium/issues/12718)
- Fixes label background translucency issue. [#12673](https://github.com/CesiumGS/cesium/issues/12673)
  修复文本标签（label）背景半透明度问题。[#12673](https://github.com/CesiumGS/cesium/issues/12673)
- Updated the type of many properties and functions of `Scene` to clarify that they may be `undefined`. For the full list check PR: [#12736](https://github.com/CesiumGS/cesium/pull/12736)
  更新了 `Scene` 的多个属性和函数的类型定义，明确它们可能为 `undefined`。完整列表请参见 PR: [#12736](https://github.com/CesiumGS/cesium/pull/12736)
- Fixes Gaussian splats incorrectly rendering when `Cesium3DTileset.show` is `false`. [#12748](https://github.com/CesiumGS/cesium/pull/12748)
  修复当 `Cesium3DTileset.show` 为 `false` 时高斯泼溅仍错误渲染的问题。[#12748](https://github.com/CesiumGS/cesium/pull/12748)
- Fixed the PointCloudShading.normalShading parameter, to disable normal shading when set to false, even if the point cloud contains normals. [#11196](https://github.com/CesiumGS/cesium/issues/11196)
  修复了 `PointCloudShading.normalShading` 参数，在设置为 `false` 时能够禁用法线着色，即使点云本身包含法线。[#11196](https://github.com/CesiumGS/cesium/issues/11196)
- Updated GPU vertex transformations to reduce precision errors. [#4250](https://github.com/CesiumGS/cesium/issues/4250)
  更新了 GPU 顶点变换计算以减少精度误差。[#4250](https://github.com/CesiumGS/cesium/issues/4250)
- Fixes Gaussian splats orientation with respect to glTF up-axis by updating `spz-loader` to version `0.3.0`. [#12737](https://github.com/CesiumGS/cesium/issues/12737), [#12749](https://github.com/CesiumGS/cesium/issues/12749)
  通过将 `spz-loader` 更新至版本 `0.3.0`，修复了高斯泼溅相对于 glTF 上轴（up-axis）的朝向问题。[#12737](https://github.com/CesiumGS/cesium/issues/12737), [#12749](https://github.com/CesiumGS/cesium/issues/12749)

#### Additions :tada:

- Expand the CustomShader Sample to support real-time modification of CustomShader. [#12702](https://github.com/CesiumGS/cesium/pull/12702)
  扩展了 CustomShader 示例，以支持实时修改 CustomShader。[#12702](https://github.com/CesiumGS/cesium/pull/12702)
- Add wrapR property to Sampler and Texture3D, to support the newly added third dimension wrap.[#12701](https://github.com/CesiumGS/cesium/pull/12701)
  为 Sampler 和 Texture3D 添加了 `wrapR` 属性，以支持新增的第三维度寻址/环绕模式（wrap）。[#12701](https://github.com/CesiumGS/cesium/pull/12701)
- Added the ability to load a specific changeset for iTwin Mesh Exports using `ITwinData.createTilesetFromIModelId` [#12778](https://github.com/CesiumGS/cesium/issues/12778)
  增加了使用 `ITwinData.createTilesetFromIModelId` 为 iTwin 网格导出加载特定变更集（changeset）的功能。[#12778](https://github.com/CesiumGS/cesium/issues/12778)

#### Deprecated :hourglass_flowing_sand:

- Updated all of the `ITwinData.*` functions to accept an `options` parameter instead of individual arguments to avoid confusion with multiple optional arguments. There is a fallback to the old signature that will be removed in 1.133 [#12778](https://github.com/CesiumGS/cesium/issues/12778)
  更新了所有 `ITwinData.*` 函数，使其接受 `options` 参数对象而不是单独的位置参数，以避免多重可选参数带来的混淆。保留了对旧函数签名的向后兼容回退，并将在 1.133 中移除。[#12778](https://github.com/CesiumGS/cesium/issues/12778)

## 1.131 - 2025-07-01

### @cesium/engine

#### Fixes :wrench:

- Updates use of deprecated options on createImageBitmap. [#12664](https://github.com/CesiumGS/cesium/pull/12664)
  更新了在 `createImageBitmap` 中对已废弃选项的使用方式。[#12664](https://github.com/CesiumGS/cesium/pull/12664)
- Fixed raymarching step size for cylindrical voxels. [#12681](https://github.com/CesiumGS/cesium/pull/12681)
  修复了圆柱体形状体素（cylindrical voxels）的光线步进（raymarching）步长问题。[#12681](https://github.com/CesiumGS/cesium/pull/12681)
- Fixes handling of tileset `modelMatrix` changes for translations and rotations in `GaussianSplatPrimitive`. [#12706](https://github.com/CesiumGS/cesium/pull/12706)
  修复了 `GaussianSplatPrimitive` 中对瓦片集 `modelMatrix` 平移和旋转变更的处理。[#12706](https://github.com/CesiumGS/cesium/pull/12706)

#### Additions :tada:

- Added `HeightReference` to `Cesium3DTileset.ConstructorOptions` to allow clamping point features in 3D Tile vector data to terrain or 3D Tiles [#11710](https://github.com/CesiumGS/cesium/pull/11710)
  在 `Cesium3DTileset.ConstructorOptions` 中添加了 `HeightReference`，以支持将 3D Tiles 矢量数据中的点要素贴合/贴地（clamping）到地形或 3D Tiles 瓦片集上。[#11710](https://github.com/CesiumGS/cesium/pull/11710)
- Added the ability to pass `OffscreenCanvas` & `ImageBitmap` directly to `Material` uniforms. [#12558](https://github.com/CesiumGS/cesium/pull/12558)
  增加了直接将 `OffscreenCanvas` 和 `ImageBitmap` 传递给 `Material` uniform 变量的功能。[#12558](https://github.com/CesiumGS/cesium/pull/12558)

## 1.130.1 - 2025-06-16

### @cesium/engine

#### Additions :tada:

- Added experimental support for loading 3D Tiles with Gaussian splats encoded with SPZ compression using the draft glTF extension [`KHR_spz_gaussian_splats_compression`](https://github.com/KhronosGroup/glTF/pull/2490). [#12582](https://github.com/CesiumGS/cesium/pull/12582)
  新增对使用草案版 glTF 扩展 [`KHR_spz_gaussian_splats_compression`](https://github.com/KhronosGroup/glTF/pull/2490) 编码为 SPZ 压缩的高斯泼溅（Gaussian splats）3D Tiles 进行加载的实验性支持。[#12582](https://github.com/CesiumGS/cesium/pull/12582)
- Added support for integral texture formats: R32I, RG32I, RGB32I, RGBA32I, R32UI, RG32UI, RGB32UI, RGBA32UI [#12582](https://github.com/CesiumGS/cesium/pull/12582)
  新增对整型纹理格式的支持：R32I、RG32I、RGB32I、RGBA32I、R32UI、RG32UI、RGB32UI、RGBA32UI。[#12582](https://github.com/CesiumGS/cesium/pull/12582)

## 1.130 - 2025-06-02

### @cesium/engine

#### Breaking Changes :mega:

- The `FragmentInput` struct for voxel shaders has been updated to be more consistent with the `CustomShader` documentation. Remaining differences in `CustomShader` usage between `VoxelPrimitive` and `Cesium3DTileset` or `Model` are now documented in the Custom Shader Guide. [#12636](https://github.com/CesiumGS/cesium/pull/12636). Key changes include:
  体素着色器的 `FragmentInput` 结构体已更新，以便与 `CustomShader` 文档更加一致。`VoxelPrimitive` 与 `Cesium3DTileset` 或 `Model` 之间在 `CustomShader` 用法上的剩余差异现已记录在自定义着色器指南（Custom Shader Guide）中。[#12636](https://github.com/CesiumGS/cesium/pull/12636)。主要变更包括：
  - The non-standard position attributes `fsInput.voxel.positionUv`, `fsInput.voxel.positionShapeUv`, and `fsInput.voxel.positionLocal` have been removed, and replaced by a single eye coordinate position `fsInput.attributes.positionEC`.
    移除了非标准位置属性 `fsInput.voxel.positionUv`、`fsInput.voxel.positionShapeUv` 和 `fsInput.voxel.positionLocal`，并替换为单个视坐标（eye coordinates）位置 `fsInput.attributes.positionEC`。
  - The normal in model coordinates `fsInput.voxel.surfaceNormal` has been replaced by a normal in eye coordinates `fsInput.attributes.normalEC`. Example:
    模型坐标系下的法线 `fsInput.voxel.surfaceNormal` 已被替换为视坐标（eye coordinates）下的法线 `fsInput.attributes.normalEC`。示例：

```glsl
// Replace this:
// vec3 voxelNormal = normalize(czm_normal * fsInput.voxel.surfaceNormal);
// with this:
vec3 voxelNormal = fsInput.attributes.normalEC;
```

#### Additions :tada:

- Add basic support for draping imagery on 3D Tiles. [#12567](https://github.com/CesiumGS/cesium/pull/12567)
  增加对在 3D Tiles 上贴附/贴地影像（draping imagery）的基础支持。[#12567](https://github.com/CesiumGS/cesium/pull/12567)
- Add support for 3D Textures and add Volume Cloud sandcastle example. [#12661](https://github.com/CesiumGS/cesium/pull/12611)
  新增对 3D 纹理（3D Textures）的支持，并添加了体积云（Volume Cloud）Sandcastle 示例。[#12661](https://github.com/CesiumGS/cesium/pull/12611)

#### Fixes :wrench:

- Fixed voxel rendering with orthographic cameras. [#12629](https://github.com/CesiumGS/cesium/pull/12629)
  修复了正交相机下的体素渲染问题。[#12629](https://github.com/CesiumGS/cesium/pull/12629)

## 1.129 - 2025-05-01

### @cesium/engine

#### Breaking Changes :mega:

- `VoxelProvider.minimumBounds` and `.maximumBounds` are now specified as physical values, rather than shape space values. [#12592](https://github.com/CesiumGS/cesium/pull/12592)
  `VoxelProvider.minimumBounds` 和 `.maximumBounds` 现在以物理空间值指定，而非形状空间值。[#12592](https://github.com/CesiumGS/cesium/pull/12592)

#### Additions :tada:

- Added `Material with Custom GLSL` Sandbox Demo. [#12549](https://github.com/CesiumGS/cesium/issues/12549)
  新增了“包含自定义 GLSL 的材质”（Material with Custom GLSL）Sandcastle 沙箱示例。[#12549](https://github.com/CesiumGS/cesium/issues/12549)

#### Fixes :wrench:

- `QuadtreePrimitive.updateHeights` now converts position to Cartographic before invoking the callback, ensuring compatibility with change introduced by [commit 53889cb](https://github.com/CesiumGS/cesium/commit/53889cb) and preventing unnecessary computation. [#12555](https://github.com/CesiumGS/cesium/pull/12555)
  `QuadtreePrimitive.updateHeights` 现在在调用回调前将位置转换为 Cartographic（地理制图坐标），确保与 [commit 53889cb](https://github.com/CesiumGS/cesium/commit/53889cb) 引入的更改兼容，并避免不必要的计算。[#12555](https://github.com/CesiumGS/cesium/pull/12555)
- Fixed `Polyline*MaterialProperty` width artifacts (reverted [#12434](https://github.com/CesiumGS/cesium/pull/12434)). [#12506](https://github.com/CesiumGS/cesium/issues/12506)
  修复了 `Polyline*MaterialProperty` 线宽渲染伪影（回滚了 [#12434](https://github.com/CesiumGS/cesium/pull/12434)）。[#12506](https://github.com/CesiumGS/cesium/issues/12506)
- `Check.typeOf.object` now asserts `Record<string|number|symbol, any>` instead of `object` to allow property checks after assertion. [#12572](https://github.com/CesiumGS/cesium/issues/12572)
  `Check.typeOf.object` 现在断言为 `Record<string|number|symbol, any>` 而非 `object`，以便断言后进行属性检查。[#12572](https://github.com/CesiumGS/cesium/issues/12572)

## 1.128 - 2025-04-01

### @cesium/engine

#### Breaking Changes :mega:

- `Camera.getPickRay` was erroneously returning a result in camera coordinates. It is now returned in world coordinates as stated in the documentation. The result can be transformed using `Camera.inverseViewMatrix` to achieve the previous behavior.
  `Camera.getPickRay` 此前错误地返回相机坐标系下的结果。现已按照文档说明改为返回世界坐标系下的结果。可以使用 `Camera.inverseViewMatrix` 变换该结果以获得先前的行为。
- `VoxelMetadataOrder` has been made private, and the `metadataOrder` property has been removed from the `VoxelProvider` interface.
  `VoxelMetadataOrder` 已设为私有，且 `metadataOrder` 属性已从 `VoxelProvider` 接口中移除。

#### Additions :tada:

- Added support for loading iTwin data using share keys as an alternative to user-based OAuth. When using a share key, set `ITwinPlatform.defaultShareKey`. [#12530](https://github.com/CesiumGS/cesium/pull/12530)
  增加了使用共享密钥（share keys）加载 iTwin 数据的支持，作为基于用户的 OAuth 的替代方案。使用共享密钥时，需设置 `ITwinPlatform.defaultShareKey`。[#12530](https://github.com/CesiumGS/cesium/pull/12530)
- Added `Frozen.EMPTY_OBJECT` and `Frozen.EMPTY_ARRAY` for use as default parameter values that avoid unnecessary memory allocations. [#12507](https://github.com/CesiumGS/cesium/pull/12507)
  新增了 `Frozen.EMPTY_OBJECT` 和 `Frozen.EMPTY_ARRAY` 用作默认参数值，以避免不必要的内存分配。[#12507](https://github.com/CesiumGS/cesium/pull/12507)

#### Fixes :wrench:

- Fixed entity tracking for delayed datasource bounding spheres. [#12465](https://github.com/CesiumGS/cesium/issues/12465)
  修复了数据源包围球延迟计算时的实体追踪问题。[#12465](https://github.com/CesiumGS/cesium/issues/12465)
- `Camera.getPickRay` now correctly returns a ray with origin in world coordinates in orthographic mode. [#12500](https://github.com/CesiumGS/cesium/pull/12500)
  `Camera.getPickRay` 现在在正交模式下正确返回原点位于世界坐标系中的射线。[#12500](https://github.com/CesiumGS/cesium/pull/12500)
- Fixed camera zooming in 3D orthographic mode when pixelRatio is not 1. [#12487](https://github.com/CesiumGS/cesium/pull/12487)
  修复了当 `pixelRatio` 不为 1 时三维正交模式下的相机缩放问题。[#12487](https://github.com/CesiumGS/cesium/pull/12487)
- Fixed shape bounds and transforms for cylinder-shaped voxels. [#12522](https://github.com/CesiumGS/cesium/pull/12522)
  修复了圆柱形状体素的形状边界和变换矩阵问题。[#12522](https://github.com/CesiumGS/cesium/pull/12522)
- Fixed metadata ordering for ellipsoid voxel tilesets. [#12544](https://github.com/CesiumGS/cesium/pull/12544)
  修复了椭球体形状体素瓦片集的元数据排序问题。[#12544](https://github.com/CesiumGS/cesium/pull/12544)
- Fixed an issue where clamped entities' height updates could stall when using high-resolution terrain due to a growing queue of tiles in `updateHeights` in `QuadtreePrimitive`. [#12476](https://github.com/CesiumGS/cesium/issues/12476)
  修复了使用高分辨率地形时，由于 `QuadtreePrimitive` 的 `updateHeights` 中瓦片队列不断堆积，导致贴地/贴模型实体（clamped entities）的高程更新停滞的问题。[#12476](https://github.com/CesiumGS/cesium/issues/12476)
- Fixed `VaryingType.MAT3` definition. [#12524](https://github.com/CesiumGS/cesium/issues/12524)
  修复了 `VaryingType.MAT3` 的定义问题。[#12524](https://github.com/CesiumGS/cesium/issues/12524)

#### Deprecated :hourglass_flowing_sand:

- The `defaultValue` function has been deprecated, and will be removed in 1.134. Instead, use the logical OR (`||`) the [nullish coalescing (`??`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) operator. See the [Coding Guide](https://github.com/CesiumGS/cesium/tree/main/Documentation/Contributors/CodingGuide#default-parameter-values) for usage information and examples.
  `defaultValue` 函数已被弃用，并将于 1.134 版本中移除。请改用逻辑或（`||`）或[空值合并运算符（`??`）](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)。有关使用信息和示例，请参阅[编码指南](https://github.com/CesiumGS/cesium/tree/main/Documentation/Contributors/CodingGuide#default-parameter-values)。
- `defaultValue.EMPTY_OBJECT` has been deprecated, and will be removed in 1.134. Instead, use `Frozen.EMPTY_OBJECT`. See the [Coding Guide](https://github.com/CesiumGS/cesium/tree/main/Documentation/Contributors/CodingGuide#default-parameter-values) for usage information and examples.
  `defaultValue.EMPTY_OBJECT` 已被弃用，并将于 1.134 版本中移除。请改用 `Frozen.EMPTY_OBJECT`。有关使用信息和示例，请参阅[编码指南](https://github.com/CesiumGS/cesium/tree/main/Documentation/Contributors/CodingGuide#default-parameter-values)。

## 1.127 - 2025-03-03

### @cesium/engine

#### Breaking Changes :mega:

- Updated `Cesium3DTilesVoxelProvider` to load glTF tiles using the new [`EXT_primitive_voxels` extension](https://github.com/CesiumGS/glTF/pull/69) to more closely align with the rest of the 3D Tiles ecosystem. Tilesets using the previous custom JSON format are no longer supported. [#12432](https://github.com/CesiumGS/cesium/pull/12432)
  更新了 `Cesium3DTilesVoxelProvider`，使用新的 [`EXT_primitive_voxels` 扩展](https://github.com/CesiumGS/glTF/pull/69) 加载 glTF 瓦片，以便更紧密地与 3D Tiles 生态系统对齐。不再支持使用原先自定义 JSON 格式的瓦片集。[#12432](https://github.com/CesiumGS/cesium/pull/12432)
- Updated the `requestData` method of the `VoxelProvider` interface to return a `Promise` to a `VoxelContent`. Custom providers should now use the `VoxelContent.fromMetadataArray` method to construct the returned data object. For example:
  更新了 `VoxelProvider` 接口的 `requestData` 方法，改为返回解析为 `VoxelContent` 的 `Promise`。自定义 Provider 现在应使用 `VoxelContent.fromMetadataArray` 方法来构建返回的数据对象。例如：

```js
CustomVoxelProvider.prototype.requestData = function (options) {
  const metadataColumn = new Float32Array(options.dataLength);
  // ... Fill metadataColumn with metadata values ...
  const content = VoxelContent.fromMetadataArray([metadataColumn]);
  return Promise.resolve(content);
};
```

- Changed `VoxelCylinderShape` to assume coordinates in the order (radius, angle, height). See [CesiumGS/3d-tiles#780](https://github.com/CesiumGS/3d-tiles/pull/780)
  更改了 `VoxelCylinderShape`，使其坐标假定按（半径、角度、高度）的顺序排列。参见 [CesiumGS/3d-tiles#780](https://github.com/CesiumGS/3d-tiles/pull/780)

#### Additions :tada:

- Implemented `texturesByteLength`, `visited`, and `numberOfTilesWithContentReady` in `VoxelPrimitive.statistics`. To use statistics, set `options.calculateStatistics` to `true` in the constructor. Note `VoxelPrimitive` is experimental.
  在 `VoxelPrimitive.statistics` 中实现了 `texturesByteLength`、`visited` 和 `numberOfTilesWithContentReady` 统计指标。如需使用统计功能，请在构造函数中将 `options.calculateStatistics` 设置为 `true`。注意 `VoxelPrimitive` 目前为实验性功能。

#### Fixes :wrench:

- Exposed `CustomShader.prototype.destroy` as a public method. [#12444](https://github.com/CesiumGS/cesium/issues/12444)
  将 `CustomShader.prototype.destroy` 公开为公共方法。[#12444](https://github.com/CesiumGS/cesium/issues/12444)
- Fixed error when there are duplicated points in polygon/polyline geometries with `ArcType.RHUMB` [#12460](https://github.com/CesiumGS/cesium/pull/12460)
  修复了当使用 `ArcType.RHUMB`（恒向线/等角航线）的多边形/折线几何体中存在重复点时报错的问题。[#12460](https://github.com/CesiumGS/cesium/pull/12460)
- Fixed ground atmosphere shaders in 3D orthographic mode [#12484](https://github.com/CesiumGS/cesium/pull/12484)
  修复了三维正交模式下的地面大气着色器问题。[#12484](https://github.com/CesiumGS/cesium/pull/12484)
- Fixed zoom in 3D orthographic mode [#12483](https://github.com/CesiumGS/cesium/pull/12483)
  修复了三维正交模式下的缩放问题。[#12483](https://github.com/CesiumGS/cesium/pull/12483)
- Fixed issue with billboards not clamping properly when nested inside a PrimitiveCollection [#12482](https://github.com/CesiumGS/cesium/pull/12482)
  修复了广告牌嵌套在 `PrimitiveCollection` 内部时无法正确贴地/贴模型（clamping）的问题。[#12482](https://github.com/CesiumGS/cesium/pull/12482)
- Fixed error with black flashes on label and billboard updates. [#12231](https://github.com/CesiumGS/cesium/issues/12231)
  修复了更新标签和广告牌时出现黑屏闪烁的错误。[#12231](https://github.com/CesiumGS/cesium/issues/12231)
- `TextureAtlas` has been refactored and internal APIs have been updated. If relying on the private texture atlas API, see [#12495](https://github.com/CesiumGS/cesium/pull/12495) for details.
  `TextureAtlas` 已被重构，内部 API 也已更新。如果依赖私有纹理图集 API，请参见 [#12495](https://github.com/CesiumGS/cesium/pull/12495) 了解详情。
  - Texture atlas now resizes more conservatively. This should help with texture memory overhead with may labels and billboards. [#172](https://github.com/CesiumGS/cesium/issues/172)
    纹理图集现在的尺寸调整策略更加保守。这将有助于降低拥有大量标签和广告牌时的纹理内存开销。[#172](https://github.com/CesiumGS/cesium/issues/172)
  - Texture atlas now reuses coordinates for existing subregions. [#2094](https://github.com/CesiumGS/cesium/issues/2094)
    纹理图集现在会复用现有子区域的坐标。[#2094](https://github.com/CesiumGS/cesium/issues/2094)

## 1.126 - 2025-02-03

### @cesium/engine

#### Breaking Changes :mega:

- `createGooglePhotorealistic3DTileset(key)` has been removed. Use `createGooglePhotorealistic3DTileset({key})` instead.
  `createGooglePhotorealistic3DTileset(key)` 已被移除。请改用 `createGooglePhotorealistic3DTileset({key})`。
- Changed behavior of `DataSourceDisplay.ready` to always stay `true` once it is initially set to `true`. [#12429](https://github.com/CesiumGS/cesium/pull/12429)
  更改了 `DataSourceDisplay.ready` 的行为，一旦初始设为 `true` 后将始终保持为 `true`。[#12429](https://github.com/CesiumGS/cesium/pull/12429)

#### Additions :tada:

- Add `ITwinData.loadGeospatialFeatures(iTwinId, collectionId)` function to load data from the [Geospatial Features API](https://developer.bentley.com/apis/geospatial-features/operations/get-features/) [#12449](https://github.com/CesiumGS/cesium/pull/12449)
  添加了 `ITwinData.loadGeospatialFeatures(iTwinId, collectionId)` 函数，用于从 [Geospatial Features API](https://developer.bentley.com/apis/geospatial-features/operations/get-features/) 加载数据。[#12449](https://github.com/CesiumGS/cesium/pull/12449)

#### Fixes :wrench:

- Fixed error when resetting `Cesium3DTileset.modelMatrix` to its initial value. [#12409](https://github.com/CesiumGS/cesium/pull/12409)
  修复了将 `Cesium3DTileset.modelMatrix` 重置为其初始值时的错误。[#12409](https://github.com/CesiumGS/cesium/pull/12409)
- Fixed the parameter types of the `ClippingPolygon.equals` function, and fixed cases where parameters to `equals` functions had erroneously not been marked as 'optional'. [#12394](https://github.com/CesiumGS/cesium/pull/12394)
  修复了 `ClippingPolygon.equals`（裁剪多边形相等判断）函数的参数类型，并修复了各 `equals` 函数的参数之前错误地未标记为“可选（optional）”的情况。[#12394](https://github.com/CesiumGS/cesium/pull/12394)
- Fixed Draco decoding for vertex colors that are normalized `UNSIGNED_BYTE` or `UNSIGNED_SHORT`. [#12417](https://github.com/CesiumGS/cesium/pull/12417)
  修复了归一化 `UNSIGNED_BYTE` 或 `UNSIGNED_SHORT` 类型的顶点颜色的 Draco 解码问题。[#12417](https://github.com/CesiumGS/cesium/pull/12417)
- Fixed urls with https in the documentation `basemap.nationalmap.gov` [#12375](https://github.com/CesiumGS/cesium/issues/12375)
  修复了文档中包含 https 的 `basemap.nationalmap.gov` URL。[#12375](https://github.com/CesiumGS/cesium/issues/12375)
- Fixed error in polyline when sinAngle is < 1. the value of expandWidth was too much. [#12434](https://github.com/CesiumGS/cesium/pull/12434)
  修复了折线中当 sinAngle < 1 时 expandWidth 计算值过大的错误。[#12434](https://github.com/CesiumGS/cesium/pull/12434)
- Allow external tilesets in multiple contents. [#12440](https://github.com/CesiumGS/cesium/pull/12440)
  允许在多重内容（multiple contents）中包含外部瓦片集（external tilesets）。[#12440](https://github.com/CesiumGS/cesium/pull/12440)
- Fixed type of `ImageryLayer.fromProviderAsync`, to correctly show that the param `options` is optional. [#12400](https://github.com/CesiumGS/cesium/pull/12400)
  修复了 `ImageryLayer.fromProviderAsync` 的类型定义，正确表明参数 `options` 是可选的。[#12400](https://github.com/CesiumGS/cesium/pull/12400)
- Fixed type error when setting `Viewer.selectedEntity` [#12303](https://github.com/CesiumGS/cesium/issues/12303)
  修复了设置 `Viewer.selectedEntity` 时的类型错误。[#12303](https://github.com/CesiumGS/cesium/issues/12303)

## 1.125 - 2025-01-02

### @cesium/engine

#### Additions :tada:

- Expanded integration with the [iTwin Platform](https://developer.bentley.com/) to load GeoJSON and KML data from the Reality Management API. Use `ITwinData.createDataSourceForRealityDataId` to load data as either GeoJSON or KML`. [#12344](https://github.com/CesiumGS/cesium/pull/12344)
  扩展了与 [iTwin Platform](https://developer.bentley.com/) 的集成，支持从 Reality Management API 加载 GeoJSON 和 KML 数据。使用 `ITwinData.createDataSourceForRealityDataId` 可将数据加载为 GeoJSON 或 KML。 [#12344](https://github.com/CesiumGS/cesium/pull/12344)
- Added `environmentMapOptions` to `ModelGraphics`. For performance reasons by default, the environment map will not update if the entity position change. If environment map updates based on entity position are desired, provide an appropriate `environmentMapOptions.maximumPositionEpsilon` value. [#12358](https://github.com/CesiumGS/cesium/pull/12358)
  在 `ModelGraphics` 中添加了 `environmentMapOptions`。出于性能考虑，默认情况下当实体位置改变时环境贴图不会更新。如果需要根据实体位置更新环境贴图，可提供合适的 `environmentMapOptions.maximumPositionEpsilon` 值。 [#12358](https://github.com/CesiumGS/cesium/pull/12358)
- Added events to `VoxelPrimitive` to match `Cesium3DTileset`, including `allTilesLoaded`, `initialTilesLoaded`, `loadProgress`, `tileFailed`, `tileLoad`, `tileVisible`, `tileUnload`.
  在 `VoxelPrimitive` 中添加了与 `Cesium3DTileset` 一致的事件，包括 `allTilesLoaded`、`initialTilesLoaded`、`loadProgress`、`tileFailed`、`tileLoad`、`tileVisible`、`tileUnload`。

#### Fixes :wrench:

- Reduced memory usage and performance bottlenecks when using environment maps with models. [#12356](https://github.com/CesiumGS/cesium/issues/12356)
  降低了模型使用环境贴图时的内存占用并解决了性能瓶颈。 [#12356](https://github.com/CesiumGS/cesium/issues/12356)
- Fixed `JulianDate` to always generate valid ISO strings for fractional milliseconds. [#12345](https://github.com/CesiumGS/cesium/pull/12345)
  修复了 `JulianDate` 处理毫秒小数时无法始终生成有效 ISO 字符串的问题。 [#12345](https://github.com/CesiumGS/cesium/pull/12345)
- Fixed intermittent z-fighting issue. [#12337](https://github.com/CesiumGS/cesium/issues/12337)
  修复了偶发的深度冲突（Z-fighting）问题。 [#12337](https://github.com/CesiumGS/cesium/issues/12337)

## 1.124 - 2024-12-02

### @cesium/engine

#### Additions :tada:

- Added an integration with the [iTwin Platform](https://developer.bentley.com/) to load iModels as 3D Tiles. Use `ITwinPlatform.defaultAccessToken` to set the access token. Use `ITwinData.createTilesetFromIModelId(iModelId)` to load the iModel as a `Cesium3DTileset`. [#12289](https://github.com/CesiumGS/cesium/pull/12289)
  新增与 [iTwin Platform](https://developer.bentley.com/) 的集成，支持将 iModel 加载为 3D Tiles。使用 `ITwinPlatform.defaultAccessToken` 设置访问令牌，使用 `ITwinData.createTilesetFromIModelId(iModelId)` 可将 iModel 加载为 `Cesium3DTileset`。 [#12289](https://github.com/CesiumGS/cesium/pull/12289)
- Added an integration with the [iTwin Platform](https://developer.bentley.com/) to load Reality Data terrain meshes. Use `ITwinPlatform.defaultAccessToken` to set the access token. Then use `ITwinData.createTilesetForRealityDataId(iTwinId, dataId)` to load terrain meshes as a `Cesium3DTileset` [#12334](https://github.com/CesiumGS/cesium/pull/12334)
  新增与 [iTwin Platform](https://developer.bentley.com/) 的集成，支持加载实景数据（Reality Data）地形网格。使用 `ITwinPlatform.defaultAccessToken` 设置访问令牌，然后使用 `ITwinData.createTilesetForRealityDataId(iTwinId, dataId)` 将地形网格加载为 `Cesium3DTileset`。 [#12334](https://github.com/CesiumGS/cesium/pull/12334)
- Added `getSample` to `SampledProperty` to get the time of samples. [#12253](https://github.com/CesiumGS/cesium/pull/12253)
  在 `SampledProperty` 中添加了 `getSample` 方法以获取采样点的时间。 [#12253](https://github.com/CesiumGS/cesium/pull/12253)
- Added `Entity.trackingReferenceFrame` property to allow tracking entities in various reference frames. [#12194](https://github.com/CesiumGS/cesium/pull/12194), [#12314](https://github.com/CesiumGS/cesium/pull/12314)
  新增 `Entity.trackingReferenceFrame` 属性，支持在多种参考系下追踪实体。 [#12194](https://github.com/CesiumGS/cesium/pull/12194), [#12314](https://github.com/CesiumGS/cesium/pull/12314)
  - `TrackingReferenceFrame.AUTODETECT` (default): uses either VVLH or ENU depending on entity's dynamic. Use `TrackingReferenceFrame.ENU` if your camera orientation flips abruptly from time to time.
    `TrackingReferenceFrame.AUTODETECT`（默认）：根据实体的动力学特性自动选择使用 VVLH 或 ENU。如果相机朝向偶尔出现突变翻转，请使用 `TrackingReferenceFrame.ENU`。
  - `TrackingReferenceFrame.ENU`: uses the entity's local East-North-Up reference frame.
    `TrackingReferenceFrame.ENU`：使用实体局部的东-北-天（ENU）参考系。
  - `TrackingReferenceFrame.INERTIAL`: uses the entity's inertial reference frame.
    `TrackingReferenceFrame.INERTIAL`：使用实体的惯性参考系。
  - `TrackingReferenceFrame.VELOCITY`: uses entity's `VelocityOrientationProperty` as orientation.
    `TrackingReferenceFrame.VELOCITY`：使用实体的 `VelocityOrientationProperty` 作为朝向。
- Added `GoogleGeocoderService` for standalone usage of Google geocoder. [#12299](https://github.com/CesiumGS/cesium/pull/12299)
  新增 `GoogleGeocoderService`，用于独立使用 Google 地理编码服务。 [#12299](https://github.com/CesiumGS/cesium/pull/12299)

#### Breaking Changes :mega:

- `PostProcessStageCollection.ambientOcclusion` has been updated with a new algorithm to provide better results at all scales, with tunable performance cost. To approximate the appearance and performance of the old algorithm, set the following values for `scene.postProcessStages.ambientOcclusion.uniforms`: `{ lengthCap: 0.02, directionCount: 6, stepCount: 8 }`. For best results at long distances, consider setting `Viewer.camera.frustum.near` to `1.0` or more, to improve precision in the depth buffer. [#12316](https://github.com/CesiumGS/cesium/pull/12316)
  `PostProcessStageCollection.ambientOcclusion` 已更新为全新算法，在各个尺度下均能提供更佳效果，并可调节性能开销。若要近似恢复旧算法的外观与性能，可在 `scene.postProcessStages.ambientOcclusion.uniforms` 中设置以下参数值：`{ lengthCap: 0.02, directionCount: 6, stepCount: 8 }`。为在远距离获得最佳效果，建议将 `Viewer.camera.frustum.near`（视锥体近截面）设置为 `1.0` 或更大，以提高深度缓冲区（depth buffer）的精度。 [#12316](https://github.com/CesiumGS/cesium/pull/12316)
- `Rectangle.validate` has been removed.
  `Rectangle.validate` 已被移除。

#### Fixes :wrench:

- Fixed bug where shared external textures from glTF files were not accounted for in resource statistics. [#12331](https://github.com/CesiumGS/cesium/pull/12331)
  修复了 glTF 文件共享的外部纹理未计入资源统计的问题。 [#12331](https://github.com/CesiumGS/cesium/pull/12331)
- Fixed lag or crashes when loading many models in the same frame. [#12320](https://github.com/CesiumGS/cesium/pull/12320)
  修复了在同一帧内加载大量模型时导致卡顿或崩溃的问题。 [#12320](https://github.com/CesiumGS/cesium/pull/12320)
- Fix point cloud filtering performance on certain hardware [#12317](https://github.com/CesiumGS/cesium/pull/12317)
  修复了在特定硬件上点云过滤的性能问题。 [#12317](https://github.com/CesiumGS/cesium/pull/12317)
- Fix label rendering bug in WebGL1 contexts. [#12301](https://github.com/CesiumGS/cesium/pull/12301)
  修复了 WebGL1 上下文中文字标签（Label）渲染的错误。 [#12301](https://github.com/CesiumGS/cesium/pull/12301)
- Updated WMS example URL in UrlTemplateImageryProvider documentation to use an active service. [#12323](https://github.com/CesiumGS/cesium/pull/12323)
  更新了 UrlTemplateImageryProvider 文档中的 WMS 示例 URL，以使用当前有效的在线服务。 [#12323](https://github.com/CesiumGS/cesium/pull/12323)

#### Deprecated :hourglass_flowing_sand:

- `createGooglePhotorealistic3DTileset(key)` has been deprecated. Use `createGooglePhotorealistic3DTileset({key})` instead. It will be removed in 1.126.
  `createGooglePhotorealistic3DTileset(key)` 已废弃。请改用 `createGooglePhotorealistic3DTileset({key})`。该接口将在 1.126 版本中移除。

### @cesium/widgets

#### Additions :tada:

- Added the ability to choose between Bing and Google geocoders. Updated `Viewer` constructor to also accept `IonGeocoderProvider` [#12299](https://github.com/CesiumGS/cesium/pull/12299)
  新增在 Bing 与 Google 地理编码器之间选择的功能。更新了 `Viewer` 构造函数以支持传入 `IonGeocoderProvider`。 [#12299](https://github.com/CesiumGS/cesium/pull/12299)

#### Fixes :wrench:

- Added a `DeveloperError` when `globe` is set to `false` and a `baseLayer` is provided in `Viewer` options. This prevents errors caused by attempting to use a `baseLayer` without a globe. [#12274](https://github.com/CesiumGS/cesium/pull/12274)
  当 `Viewer` 选项中 `globe` 设置为 `false` 但同时提供了 `baseLayer` 时添加了 `DeveloperError`。这可以防止在没有地球时尝试使用 `baseLayer` 所引发的错误。 [#12274](https://github.com/CesiumGS/cesium/pull/12274)

## 1.123.1 - 2024-11-07

### @cesium/engine

#### Additions :tada:

- Added fallback diffuse lighting, `DynamicEnvironmentMapManager.DEFAULT_SPHERICAL_HARMONIC_COEFFICIENTS`, that is used when `DynamicEnvironmentMapManager` is disabled or unsupported. [#12292](https://github.com/CesiumGS/cesium/pull/12292)
  添加了回退漫反射光照参数 `DynamicEnvironmentMapManager.DEFAULT_SPHERICAL_HARMONIC_COEFFICIENTS`，当 `DynamicEnvironmentMapManager` 被禁用或不受支持时使用。 [#12292](https://github.com/CesiumGS/cesium/pull/12292)
- Added `DynamicEnvironmentMapManager.isDynamicUpdateSupported` to check if dynamic environment map updates are supported. [#12292](https://github.com/CesiumGS/cesium/pull/12292)
  添加了 `DynamicEnvironmentMapManager.isDynamicUpdateSupported`，用于检测是否支持动态环境贴图更新。 [#12292](https://github.com/CesiumGS/cesium/pull/12292)

## 1.123 - 2024-11-01

### @cesium/engine

#### Breaking Changes :mega:

- Updated default 3D Tiles and Model lighting when using PBR in order to create a more realistic appearance. To approximate previous default lighting, use the following settings:
  更新了使用 PBR（基于物理渲染）时 3D Tiles 与 Model 的默认光照，以呈现更加真实的外观。若要近似恢复先前的默认光照，请使用以下设置：

  ```js
  const environmentMapManager = model.environmentMapManager; // or tileset.environmentMapManager;
  environmentMapManager.saturation = 0.35;
  environmentMapManager.brightness = 1.4;
  environmentMapManager.gamma = 0.8;
  environmentMapManager.atmosphereScatteringIntensity = 5.0;
  environmentMapManager.groundColor =
    Cesium.Color.fromCssColorString("#001850");
  ```

- `ImageBasedLighting.luminanceAtZenith` has been removed. Use `DynamicEnvironmentMapManager.atmosphereScatteringIntensity` instead. [#12129](https://github.com/CesiumGS/cesium/pull/12129)
  `ImageBasedLighting.luminanceAtZenith` 已被移除。请改用 `DynamicEnvironmentMapManager.atmosphereScatteringIntensity`。 [#12129](https://github.com/CesiumGS/cesium/pull/12129)
- Changed the default `Fog.density` from `0.0002` to `0.0006`. Set `viewer.scene.fog.density = 0.002` to return to the previous behavior. [#12248](https://github.com/CesiumGS/cesium/pull/12248)
  将默认的 `Fog.density` 从 `0.0002` 修改为 `0.0006`。设置 `viewer.scene.fog.density = 0.002` 可恢复之前的表现。 [#12248](https://github.com/CesiumGS/cesium/pull/12248)

#### Additions :tada:

- Updated default 3D Tiles and Model lighting when using PBR in order to create a more realistic appearance. Added `DynamicEnvironmentMapManager` to control lighting parameters. These can be accessed via `Cesium3DTileset.environmentMapManager` and `Model.environmentMapManager`. [#12129](https://github.com/CesiumGS/cesium/pull/12129)
  更新了使用 PBR 时 3D Tiles 与 Model 的默认光照以呈现更加真实的外观。新增 `DynamicEnvironmentMapManager` 用于控制光照参数，可通过 `Cesium3DTileset.environmentMapManager` 和 `Model.environmentMapManager` 访问。 [#12129](https://github.com/CesiumGS/cesium/pull/12129)
- Added `ScreenSpaceCameraController.maximumTiltAngle` to limit how much the camera can tilt. [#12169](https://github.com/CesiumGS/cesium/pull/12169)
  添加了 `ScreenSpaceCameraController.maximumTiltAngle`，用于限制相机的最大俯仰角。 [#12169](https://github.com/CesiumGS/cesium/pull/12169)
- Exposed `Fog.visualDensityScalar` to allow modifying the visual density of fog without affecting the culling aspects. Alongside this, the density calculation was adjusted to make it more smooth across heights. [#12248](https://github.com/CesiumGS/cesium/pull/12248)
  公开了 `Fog.visualDensityScalar`，允许在不影响视锥裁剪（culling）的前提下修改雾的视觉浓度。与此同时调整了浓度计算逻辑，使其在不同高度间过渡更加平滑。 [#12248](https://github.com/CesiumGS/cesium/pull/12248)
- Update Japan Buildings sandcastle to use Japan Regional Terrain [#12259](https://github.com/CesiumGS/cesium/pull/12259)
  更新了 Japan Buildings Sandcastle 示例以使用日本区域地形。 [#12259](https://github.com/CesiumGS/cesium/pull/12259)
- Moved `Viewer` functionality to `CesiumWidget` to increase usability, see the full list added to the `CesiumWidget` below. No functionality was removed from the `Viewer` but convenience helpers like the `entities` collection were added to the `CesiumWidget`. The `CesiumWidget` should be closer to a drop in replacement for the `Viewer` when not utilizing the extra Viewer widgets. [#11967](https://github.com/CesiumGS/cesium/issues/11967).
  将部分 `Viewer` 功能下沉至 `CesiumWidget` 以提高易用性，具体新增内容见下方完整列表。`Viewer` 未移除任何功能，但在 `CesiumWidget` 中新增了 `entities` 集合等便捷辅助属性/方法。当不使用额外的 Viewer 挂件组件时，`CesiumWidget` 更接近于 `Viewer` 的直接替代品。 [#11967](https://github.com/CesiumGS/cesium/issues/11967)。
  - New constructor options: `options.shouldAnimate`, `options.automaticallyTrackDataSourceClocks`, `options.dataSources`
    新增构造函数选项：`options.shouldAnimate`、`options.automaticallyTrackDataSourceClocks`、`options.dataSources`
  - New properties: `dataSourceDisplay`, `entities`, `dataSources`, `allowDataSourcesToSuspendAnimation`, `trackedEntity`, `trackedEntityChanged`, `clockTrackedDataSource`
    新增属性：`dataSourceDisplay`、`entities`、`dataSources`、`allowDataSourcesToSuspendAnimation`、`trackedEntity`、`trackedEntityChanged`、`clockTrackedDataSource`
  - New functions: `zoomTo()`, `flyTo()`
    新增方法：`zoomTo()`、`flyTo()`
- Update Bing Maps attribution link [#12265](https://github.com/CesiumGS/cesium/pull/12265)
  更新了 Bing Maps 署名链接。 [#12265](https://github.com/CesiumGS/cesium/pull/12265)

#### Fixes :wrench:

- Fix flickering issue caused by bounding sphere retrieval being blocked by the bounding sphere of another entity. [#12230](https://github.com/CesiumGS/cesium/pull/12230)
  修复了因包围球获取被另一实体的包围球阻塞而导致的闪烁问题。 [#12230](https://github.com/CesiumGS/cesium/pull/12230)
- Fixed `ImageBasedLighting.imageBasedLightingFactor` not affecting lighting. [#12129](https://github.com/CesiumGS/cesium/pull/12129)
  修复了 `ImageBasedLighting.imageBasedLightingFactor` 未对光照产生影响的问题。 [#12129](https://github.com/CesiumGS/cesium/pull/12129)
- Fix error with normalization of corner points for lines and corridors with collinear points. [#12255](https://github.com/CesiumGS/cesium/pull/12255)
  修复了线和走廊（corridor）存在共线点时拐角点归一化出错的问题。 [#12255](https://github.com/CesiumGS/cesium/pull/12255)
- Properly handle `offset` and `scale` properties when picking metadata from property textures. [#12237](https://github.com/CesiumGS/cesium/pull/12237)
  修复了从属性纹理（property textures）中拾取元数据时正确处理 `offset` 与 `scale` 属性的问题。 [#12237](https://github.com/CesiumGS/cesium/pull/12237)

## 1.122 - 2024-10-01

### @cesium/engine

#### Additions :tada:

- Added `CallbackPositionProperty` to allow lazy entity position evaluation. [#12170](https://github.com/CesiumGS/cesium/pull/12170)
  新增 `CallbackPositionProperty`，支持实体位置的惰性求值。 [#12170](https://github.com/CesiumGS/cesium/pull/12170)
- Added `enableVerticalExaggeration` option to models. Set this value to `false` to prevent model exaggeration when `Scene.verticalExaggeration` is set to a value other than `1.0`. [#12141](https://github.com/CesiumGS/cesium/pull/12141)
  为模型新增 `enableVerticalExaggeration` 选项。将该值设为 `false` 可防止在 `Scene.verticalExaggeration` 设置为非 `1.0` 的值时模型被垂直夸张形变。 [#12141](https://github.com/CesiumGS/cesium/pull/12141)
- Added `Scene.prototype.pickMetadata` and `Scene.prototype.pickMetadataSchema`, enabling experimental support for picking property textures or property attributes [#12075](https://github.com/CesiumGS/cesium/pull/12075)
  新增 `Scene.prototype.pickMetadata` 和 `Scene.prototype.pickMetadataSchema`，提供对拾取属性纹理（property textures）或属性特征（property attributes）的实验性支持。 [#12075](https://github.com/CesiumGS/cesium/pull/12075)
- Added experimental support for the `NGA_gpm_local` glTF extension, for GPM 1.2 [#12204](https://github.com/CesiumGS/cesium/pull/12204)
  新增对用于 GPM 1.2 的 `NGA_gpm_local` glTF 扩展的实验性支持。 [#12204](https://github.com/CesiumGS/cesium/pull/12204)

#### Fixes :wrench:

- Fix `Texture` errors when using a `HTMLVideoElement`. [#12219](https://github.com/CesiumGS/cesium/issues/12219)
  修复了使用 `HTMLVideoElement` 时出现的 `Texture` 错误。 [#12219](https://github.com/CesiumGS/cesium/issues/12219)
- Fixed noise in ambient occlusion post process. [#12201](https://github.com/CesiumGS/cesium/pull/12201)
  修复了环境光遮蔽（ambient occlusion）后处理阶段的噪点问题。 [#12201](https://github.com/CesiumGS/cesium/pull/12201)
- Use first `geometryBuffer` if no best match found in I3SNode. [#12132](https://github.com/CesiumGS/cesium/pull/12132)
  在 I3SNode 中如果未找到最佳匹配项，则使用第一个 `geometryBuffer`。 [#12132](https://github.com/CesiumGS/cesium/pull/12132)
- Update type definitions throughout `Core/` to allow undefined for optional parameters. [#12193](https://github.com/CesiumGS/cesium/pull/12193)
  更新了 `Core/` 模块中的类型定义，允许可选参数为 undefined。 [#12193](https://github.com/CesiumGS/cesium/pull/12193)
- Reverts Firefox OIT temporary fix. [#4815](https://github.com/CesiumGS/cesium/pull/4815)
  还原了针对 Firefox 顺序无关半透明（OIT）的临时修复方案。 [#4815](https://github.com/CesiumGS/cesium/pull/4815)

#### Deprecated :hourglass_flowing_sand:

- `Rectangle.validate` has been deprecated. It will be removed in 1.124.
  `Rectangle.validate` 已废弃。将在 1.124 版本中移除。

## 1.121.1 - 2024-09-04

This is an npm-only release to extra source maps included in 1.121

这是仅发布至 npm 的版本，用于补充 1.121 中包含的 source map。

## 1.121 - 2024-09-03

### @cesium/engine

#### Additions :tada:

- Enable MSAA by default with 4 samples. To turn MSAA off set `scene.msaaSamples = 1` [#12158](https://github.com/CesiumGS/cesium/pull/12158)
  默认启用 4 次采样的多重采样抗锯齿（MSAA）。若要关闭 MSAA，可设置 `scene.msaaSamples = 1`。 [#12158](https://github.com/CesiumGS/cesium/pull/12158)
- Expose the `tonemapper` property of `PostProcessStageCollection` to allow changing the tonemap used when HDR is turned on. This defaults to the [PBR Neutral Tonemap from Khronos](https://github.com/KhronosGroup/ToneMapping/tree/main/PBR_Neutral) [#12160](https://github.com/CesiumGS/cesium/pull/12160)
  公开了 `PostProcessStageCollection` 的 `tonemapper` 属性，允许更改开启 HDR 时使用的色调映射（tonemap）。默认采用 [PBR Neutral Tonemap from Khronos](https://github.com/KhronosGroup/ToneMapping/tree/main/PBR_Neutral)。 [#12160](https://github.com/CesiumGS/cesium/pull/12160)
  - The enum `Tonemapper` contains the list of valid tonemap options to use with the `tonemapper` setting
    枚举 `Tonemapper` 包含了可用于 `tonemapper` 设置的有效色调映射选项列表。
- Expose the `exposure` property of `PostProcessStageCollection` to allow changing the exposure used for the current HDR tonemap [#12160](https://github.com/CesiumGS/cesium/pull/12160)
  公开了 `PostProcessStageCollection` 的 `exposure` 属性，允许修改当前 HDR 色调映射所使用的曝光度。 [#12160](https://github.com/CesiumGS/cesium/pull/12160)
- Added `WaterMask` globe material, which visualizes areas of water or land based on the terrain's water mask. [#12149](https://github.com/CesiumGS/cesium/pull/12149)
  新增 `WaterMask` 地球材质，根据地形的水掩膜（water mask）可视化水体或陆地区域。 [#12149](https://github.com/CesiumGS/cesium/pull/12149)
- Made the `time` parameter optional for `Property`, using `JulianDate.now()` as default. [#12099](https://github.com/CesiumGS/cesium/pull/12099)
  使 `Property` 的 `time` 参数变为可选，默认使用 `JulianDate.now()`。 [#12099](https://github.com/CesiumGS/cesium/pull/12099)
- Exposes `ScreenSpaceCameraController.zoomFactor` to allow adjusting the zoom factor (speed). [#9145](https://github.com/CesiumGS/cesium/pull/9145)
  公开了 `ScreenSpaceCameraController.zoomFactor`，允许调整缩放系数（缩放速度）。 [#9145](https://github.com/CesiumGS/cesium/pull/9145)

#### Fixes :wrench:

- Update `CameraEventAggregator` to only trigger events for the currently held modifier while dragging. Events are canceled for all modifiers when the mouse is lifted. [#11903](https://github.com/CesiumGS/cesium/pull/11903)
  更新了 `CameraEventAggregator`，使其在拖拽时仅针对当前按下的修饰键触发事件。当鼠标松开时取消所有修饰键的事件。 [#11903](https://github.com/CesiumGS/cesium/pull/11903)
- Fixed cube-mapping artifacts in image-based lighting. [#12100](https://github.com/CesiumGS/cesium/pull/12100)
  修复了基于图像的光照（IBL）中立方体贴图的伪影瑕疵。 [#12100](https://github.com/CesiumGS/cesium/pull/12100)
- Fixed specular reflection artifact in PBR direct lighting. [#12116](https://github.com/CesiumGS/cesium/pull/12116)
  修复了 PBR 直接光照中的镜面反射伪影瑕疵。 [#12116](https://github.com/CesiumGS/cesium/pull/12116)
- Added multiscattering terms to diffuse BRDF in image-based lighting. [#12118](https://github.com/CesiumGS/cesium/pull/12118)
  在基于图像的光照（IBL）的漫反射 BRDF 中添加了多重散射项。 [#12118](https://github.com/CesiumGS/cesium/pull/12118)
- Fixed `CallbackProperty` type not being present on entity position. [#12120](https://github.com/CesiumGS/cesium/pull/12120)
  修复了实体位置类型定义中缺失 `CallbackProperty` 的问题。 [#12120](https://github.com/CesiumGS/cesium/pull/12120)
- Additional TypeScript types export in `package.json` to assist some project configurations using Cesium. [#12122](https://github.com/CesiumGS/cesium/pull/12122)
  在 `package.json` 中添加了额外的 TypeScript 类型导出，以适配某些使用 Cesium 的项目配置。 [#12122](https://github.com/CesiumGS/cesium/pull/12122)
- Fixed documentation about default values for Label origins [#12139](https://github.com/CesiumGS/cesium/pull/12139)
  修复了文档中关于 Label 原点默认值的说明。 [#12139](https://github.com/CesiumGS/cesium/pull/12139)

#### Breaking Changes :mega:

- Switched the default (non-HDR) tonemapping for models, atmosphere, and globe from ACES to [PBR Neutral Tonemap from Khronos](https://github.com/KhronosGroup/ToneMapping/tree/main/PBR_Neutral). The widens the gamut of possible colors, and provides more consistent color appearances across renderers. [#12160](https://github.com/CesiumGS/cesium/pull/12160)
  将模型、大气层和地球的默认（非 HDR）色调映射从 ACES 切换为 [PBR Neutral Tonemap from Khronos](https://github.com/KhronosGroup/ToneMapping/tree/main/PBR_Neutral)。这拓宽了可用色域，并在不同渲染器间提供更一致的色彩呈现。 [#12160](https://github.com/CesiumGS/cesium/pull/12160)
- Switched the default tonemapper when HDR is turned _on_ from ACES to [PBR Neutral Tonemap from Khronos](https://github.com/KhronosGroup/ToneMapping/tree/main/PBR_Neutral). To preserve the previous behavior set `viewer.scene.postProcessStages.tonemapper = Cesium.Tonemapper.ACES;` [#12160](https://github.com/CesiumGS/cesium/pull/12160)
  将开启 HDR 时的默认色调映射器从 ACES 切换为 [PBR Neutral Tonemap from Khronos](https://github.com/KhronosGroup/ToneMapping/tree/main/PBR_Neutral)。若要保留之前的行为，请设置 `viewer.scene.postProcessStages.tonemapper = Cesium.Tonemapper.ACES;`。 [#12160](https://github.com/CesiumGS/cesium/pull/12160)
- `SceneTransforms.wgs84ToWindowCoordinates` has been removed. Use `SceneTransforms.worldToWindowCoordinates` instead.
  `SceneTransforms.wgs84ToWindowCoordinates` 已被移除。请改用 `SceneTransforms.worldToWindowCoordinates`。
- `SceneTransforms.wgs84ToDrawingBufferCoordinates` has been removed. Use `SceneTransforms.worldToDrawingBufferCoordinates` instead.
  `SceneTransforms.wgs84ToDrawingBufferCoordinates` 已被移除。请改用 `SceneTransforms.worldToDrawingBufferCoordinates`。
- Removed `jitter` option from `VoxelPrimitive.js`, `VoxelRenderResources.js`, and related test code in `VoxelPrimitiveSpec.js`. [#11913](https://github.com/CesiumGS/cesium/issues/11913)
  从 `VoxelPrimitive.js`、`VoxelRenderResources.js` 以及 `VoxelPrimitiveSpec.js` 的相关测试代码中移除了 `jitter`（抖动）选项。 [#11913](https://github.com/CesiumGS/cesium/issues/11913)
- Custom specular environment maps in `ImageBasedLighting` now require either a WebGL2 context or a WebGL1 context that supports the [`EXT_shader_texture_lod` extension](https://registry.khronos.org/webgl/extensions/EXT_shader_texture_lod/).
  `ImageBasedLighting` 中的自定义镜面反射环境贴图现在需要 WebGL2 上下文，或者支持 [`EXT_shader_texture_lod` 扩展](https://registry.khronos.org/webgl/extensions/EXT_shader_texture_lod/) 的 WebGL1 上下文。

## 1.120 - 2024-08-01

### @cesium/engine

#### Additions :tada:

- Added `Transforms.computeIcrfToMoonFixedMatrix` and `Transforms.computeMoonFixedToIcrfMatrix` to compute the transformations between the Moon's fixed frame and ICRF at a given time.
  新增 `Transforms.computeIcrfToMoonFixedMatrix` 与 `Transforms.computeMoonFixedToIcrfMatrix`，用于计算给定时间月球固连坐标系（Moon's fixed frame）与国际天球参考系（ICRF）之间的变换矩阵。
- Added `Transforms.computeIcrfToCentralBodyFixedMatrix` to specific the default ICRF to fixed frame transformation to use internally, including for lighting calculations.
  新增 `Transforms.computeIcrfToCentralBodyFixedMatrix`，用于指定内部使用的默认 ICRF 到固连坐标系的变换矩阵，包括光照计算。
- Added SplitDirection property for display PointPrimitive and Billboard relative to the `Scene.splitPosition`. [#11982](https://github.com/CesiumGS/cesium/pull/11982)
  为 `PointPrimitive` 和 `Billboard` 新增 `splitDirection` 属性，用于相对于 `Scene.splitPosition` 进行卷帘（split）显示控制。[#11982](https://github.com/CesiumGS/cesium/pull/11982)

#### Fixes :wrench:

- Fixed environment map LOD selection in image-based lighting. [#12070](https://github.com/CesiumGS/cesium/pull/12070)
  修复了基于图像光照（IBL）中环境贴图 LOD（细节层次）选择的问题。[#12070](https://github.com/CesiumGS/cesium/pull/12070)
- Corrected calculation of diffuse component in image-based lighting. [#12082](https://github.com/CesiumGS/cesium/pull/12082)
  修正了基于图像光照中漫反射分量的计算。[#12082](https://github.com/CesiumGS/cesium/pull/12082)
- Updated specular BRDF for image-based lighting. [#12083](https://github.com/CesiumGS/cesium/pull/12083)
  更新了基于图像光照的镜面反射 BRDF（双向反射分布函数）。[#12083](https://github.com/CesiumGS/cesium/pull/12083)
- Fixed environment map transform for image-based lighting. [#12091](https://github.com/CesiumGS/cesium/pull/12091)
  修复了基于图像光照中环境贴图的变换问题。[#12091](https://github.com/CesiumGS/cesium/pull/12091)
- Updated geometric self-shadowing function to improve direct lighting on models using physically-based rendering. [#12063](https://github.com/CesiumGS/cesium/pull/12063)
  更新了几何自遮挡（self-shadowing）函数，以改善使用基于物理渲染（PBR）的模型上的直接光照效果。[#12063](https://github.com/CesiumGS/cesium/pull/12063)
- Prevent Bing Imagery API format issues from throwing errors [#12094](https://github.com/CesiumGS/cesium/pull/12094)
  防止 Bing 影像 API 格式问题抛出异常错误。[#12094](https://github.com/CesiumGS/cesium/pull/12094)

## 1.119 - 2024-07-01

### @cesium/engine

#### Additions :tada:

- Added `Ellipsoid.default` to allow a central place to specify a default ellipsoid value to be used throughout the API where an ellipsoid is not otherwise specified. [#4245](https://github.com/CesiumGS/cesium/issues/4245)
  新增 `Ellipsoid.default`，用于集中指定在整个 API 中未显式指定椭球时所使用的默认椭球值。[#4245](https://github.com/CesiumGS/cesium/issues/4245)
- Various defaults have been updated to adjust when `Ellipsoid.default` is changed to a value other than the WGS84 ellipsoid.
  更新了多处默认配置，以在 `Ellipsoid.default` 被修改为非 WGS84 椭球时进行相应调整。
- Added `Scene.ellipsoid`, `CesiumWidget.ellipsoid`, and `Viewer.ellipsoid` to set the default ellipsoid used for rendering.
  新增 `Scene.ellipsoid`、`CesiumWidget.ellipsoid` 和 `Viewer.ellipsoid`，用于设置渲染时所使用的默认椭球。
- Added `SkyBox.createEarthSkyBox` which creates a skybox instance with the default starmap for the Earth.
  新增 `SkyBox.createEarthSkyBox`，用于创建一个包含地球默认星空图的天空盒实例。
- Added support for the `scale` property of a normal texture in a glTF material. [#12018](https://github.com/CesiumGS/cesium/pull/12018)
  新增对 glTF 材质中法线贴图 `scale` 属性的支持。[#12018](https://github.com/CesiumGS/cesium/pull/12018)

#### Fixes :wrench:

- Fixed diffuse color calculation for PBR materials. Many models will now appear slightly brighter. [#12043](https://github.com/CesiumGS/cesium/pull/12043)
  修复了 PBR 材质的漫反射颜色计算。许多模型现在看起来会略微更明亮一些。[#12043](https://github.com/CesiumGS/cesium/pull/12043)
- Fixed the calculation of base color in materials using the KHR_materials_specular extension [#12041](https://github.com/CesiumGS/cesium/issues/12041).
  修复了在使用 KHR_materials_specular 扩展的材质中基础颜色（base color）的计算[#12041](https://github.com/CesiumGS/cesium/issues/12041)。
- Fixed issue where Entities would not use a custom ellipsoid. [#3543](https://github.com/CesiumGS/cesium/issues/3543)
  修复了 Entity 实体无法使用自定义椭球的问题。[#3543](https://github.com/CesiumGS/cesium/issues/3543)
- Adjusted spacing for on screen Credits and updated recommendations for positioning custom ones. [#11912](https://github.com/CesiumGS/cesium/issues/11912)
  调整了屏幕版权信息（Credits）的间距，并更新了自定义版权信息定位的推荐规范。[#11912](https://github.com/CesiumGS/cesium/issues/11912)
- Fixed issue where Property 'availability' is missing in type 'CustomHeightmapTerrainProvider' but required in type 'TerrainProvider' when using with typescript
  修复了在 TypeScript 中使用时，类型 'CustomHeightmapTerrainProvider' 缺少属性 'availability' 但该属性在类型 'TerrainProvider' 中为必填项的问题。

#### Breaking Changes :mega:

- `CircleGeometry.unpack` now defaults to `Ellipsoid.default` rather than `Ellipsoid.UNIT_SPHERE`.
  `CircleGeometry.unpack` 现在默认使用 `Ellipsoid.default`，而非 `Ellipsoid.UNIT_SPHERE`（单位球体）。

#### Deprecated :hourglass_flowing_sand:

- `SceneTransforms.wgs84ToDrawingBufferCoordinates` has been deprecated. It will be removed in 1.121. Use `SceneTransforms.worldToDrawingBufferCoordinates` instead.
  `SceneTransforms.wgs84ToDrawingBufferCoordinates` 已被废弃，将在 1.121 版本中移除。请改用 `SceneTransforms.worldToDrawingBufferCoordinates`。
- `SceneTransforms.wgs84ToWindowCoordinates` has been deprecated. It will be removed in 1.121. Use `SceneTransforms.worldToWindowCoordinates` instead.
  `SceneTransforms.wgs84ToWindowCoordinates` 已被废弃，将在 1.121 版本中移除。请改用 `SceneTransforms.worldToWindowCoordinates`。

### @cesium/widgets

#### Breaking Changes :mega:

- `BaseLayerPicker` no longer overrides the default imagery or terrain unless `options.selectedImageryProviderViewModel` or `options.selectedTerrainProviderViewModel` is provided respectively.
  除非分别提供了 `options.selectedImageryProviderViewModel` 或 `options.selectedTerrainProviderViewModel`，否则 `BaseLayerPicker` 不再覆盖默认的影像或地形。

## 1.118.2 - 2024-06-03

This is an npm-only release to fix a dependency issue published in 1.118.1

这是一个仅发布于 npm 的版本，用于修复在 1.118.1 中发布的依赖项问题。

## 1.118.1 - 2024-06-03

This is an npm-only release to fix a dependency issue published in 1.118

这是一个仅发布于 npm 的版本，用于修复在 1.118 中发布的依赖项问题。

## 1.118 - 2024-06-03

### @cesium/engine

#### Additions :tada:

- Added support for glTF models with the [KHR_materials_specular extension](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_specular). [#11970](https://github.com/CesiumGS/cesium/pull/11970)
  新增对包含 [KHR_materials_specular 扩展](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_specular) 的 glTF 模型的支持。[#11970](https://github.com/CesiumGS/cesium/pull/11970)
- Added support for glTF models with the [KHR_materials_anisotropy extension](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_anisotropy/README.md). [#11988](https://github.com/CesiumGS/cesium/pull/11988)
  新增对包含 [KHR_materials_anisotropy 扩展](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_anisotropy/README.md)（各向异性材质）的 glTF 模型的支持。[#11988](https://github.com/CesiumGS/cesium/pull/11988)
- Added support for glTF models with the [KHR_materials_clearcoat extension](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_clearcoat/README.md). [#12006](https://github.com/CesiumGS/cesium/pull/12006)
  新增对包含 [KHR_materials_clearcoat 扩展](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_clearcoat/README.md)（清漆层材质）的 glTF 模型的支持。[#12006](https://github.com/CesiumGS/cesium/pull/12006)

#### Fixes :wrench:

- Fixed a bug where `scene.pickPosition` returned incorrect results against the globe when `depthTestAgainstTerrain` is `false`. [#4368](https://github.com/CesiumGS/cesium/issues/4368)
  修复了当 `depthTestAgainstTerrain` 为 `false` 时，`scene.pickPosition` 在地球表面拾取返回错误结果的 Bug。[#4368](https://github.com/CesiumGS/cesium/issues/4368)
- Fixed a bug where `TaskProcessor` worker loading would check the worker module ID rather than the absolute URL when determining if it is cross-origin. [#11833](https://github.com/CesiumGS/cesium/pull/11833)
  修复了 `TaskProcessor` 加载 Worker 时，在判断是否跨域时检查的是 Worker 模块 ID 而非绝对 URL 的 Bug。[#11833](https://github.com/CesiumGS/cesium/pull/11833)
- Fixed a bug where cross-origin workers would error when loaded with the CommonJS `importScripts` shim instead of an ESM `import`. [#11833](https://github.com/CesiumGS/cesium/pull/11833)
  修复了跨域 Worker 在使用 CommonJS 的 `importScripts` shim 而不是 ESM `import` 加载时发生错误的 Bug。[#11833](https://github.com/CesiumGS/cesium/pull/11833)
- Fixed an error in the specular reflection calculations for image-based lighting from supplied environment maps. [#12008](https://github.com/CesiumGS/cesium/issues/12008)
  修复了基于提供的环境贴图进行基于图像光照时，镜面反射计算中的一个错误。[#12008](https://github.com/CesiumGS/cesium/issues/12008)
- Fixed a normalization error in image-based lighting. [#11994](https://github.com/CesiumGS/cesium/issues/11994)
  修复了基于图像光照中的归一化错误。[#11994](https://github.com/CesiumGS/cesium/issues/11994)
- Fixes a bug where `sampleTerrain` did not respect the `rejectOnTileFail` flag for failed requests other than the first. [#11998](https://github.com/CesiumGS/cesium/pull/11998)
  修复了 `sampleTerrain` 在第一个请求之后的失败请求中未遵循 `rejectOnTileFail` 标志的 Bug。[#11998](https://github.com/CesiumGS/cesium/pull/11998)
- Corrected the Typescript types for `Billboard.id` and `Label.id` to be `any` [#11973](https://github.com/CesiumGS/cesium/issues/11973)
  将 `Billboard.id` 和 `Label.id` 的 TypeScript 类型修正为 `any`。[#11973](https://github.com/CesiumGS/cesium/issues/11973)

## 1.117 - 2024-05-01

### @cesium/engine

#### Additions :tada:

- Added `ClippingPolygon` and `ClippingPolygonCollection` for applying multiple clipping regions, with support for concave regions and inverse clipping regions, to 3D Tiles and Terrain. [#11750](https://github.com/CesiumGS/cesium/pull/11750)
  新增 `ClippingPolygon` 和 `ClippingPolygonCollection`，用于对 3D Tiles 和地形应用多个裁剪区域，支持凹多边形区域和反向裁剪区域。[#11750](https://github.com/CesiumGS/cesium/pull/11750)
- Added `Cesium3DTileset.clippingPolygons`, `Globe.clippingPolygons`, and `Model.clippingPolygons` properties for defining clipping regions from world positions. [#11750](https://github.com/CesiumGS/cesium/pull/11750)
  新增 `Cesium3DTileset.clippingPolygons`、`Globe.clippingPolygons` 和 `Model.clippingPolygons` 属性，用于根据世界坐标位置定义裁剪区域。[#11750](https://github.com/CesiumGS/cesium/pull/11750)

#### Fixes :wrench:

- Fixed a bug where a data source was not automatically rendered after is was added in request render mode. [#11934](https://github.com/CesiumGS/cesium/pull/11934)
  修复了在按需渲染模式（request render mode）下添加数据源后未自动触发渲染的 Bug。[#11934](https://github.com/CesiumGS/cesium/pull/11934)
- Fixes Typescript definition for `Event.raiseEvent`. [#10498](https://github.com/CesiumGS/cesium/issues/10498)
  修复了 `Event.raiseEvent` 的 TypeScript 类型定义。[#10498](https://github.com/CesiumGS/cesium/issues/10498)
- Fixed a bug that Label position height may not be correctly updated when its HeightReference is relative. [#11929](https://github.com/CesiumGS/cesium/pull/11929)
  修复了当 Label 的 HeightReference 为相对高度（relative）时，其位置高度可能无法正确更新的 Bug。[#11929](https://github.com/CesiumGS/cesium/pull/11929)

### @cesium/widgets

#### Fixes :wrench:

- Fixed leaked CSS styling from `I3SBuildingSceneLayerExplorer` widget. [#11959](https://github.com/CesiumGS/cesium/pull/11959)
  修复了 `I3SBuildingSceneLayerExplorer` 部件引起的 CSS 样式泄漏问题。[#11959](https://github.com/CesiumGS/cesium/pull/11959)

## 1.116 - 2024-04-01

### @cesium/engine

#### Breaking Changes :mega:

- `Cesium3DTileset.disableCollision` has been removed. Use `Cesium3DTileset.enableCollision` instead.
  `Cesium3DTileset.disableCollision` 已被移除。请改用 `Cesium3DTileset.enableCollision`。
- `Globe.terrainExaggeration` and `Globe.terrainExaggerationRelativeHeight` have been removed. Use `Scene.verticalExaggeration` and `Scene.verticalExaggerationRelativeHeight` instead.
  `Globe.terrainExaggeration` 和 `Globe.terrainExaggerationRelativeHeight` 已被移除。请改用 `Scene.verticalExaggeration` 和 `Scene.verticalExaggerationRelativeHeight`。

#### Additions :tada:

- Surface normals are now computed for clipping and shape bounds in VoxelEllipsoidShape and VoxelCylinderShape. [#11847](https://github.com/CesiumGS/cesium/pull/11847)
  现在为 `VoxelEllipsoidShape`（体素椭球体）和 `VoxelCylinderShape`（体素圆柱体）的裁剪与形状边界计算表面法线。[#11847](https://github.com/CesiumGS/cesium/pull/11847)
- Implemented sharper rendering and lighting on voxels with CYLINDER and ELLIPSOID shape. [#11875](https://github.com/CesiumGS/cesium/pull/11875)
  实现了具有 CYLINDER（圆柱）和 ELLIPSOID（椭球）形状的体素更清晰锐利的渲染与光照效果。[#11875](https://github.com/CesiumGS/cesium/pull/11875)
- Implemented vertical exaggeration for voxels with BOX shape. [#11887](https://github.com/CesiumGS/cesium/pull/11887)
  实现了具有 BOX（长方体）形状的体素的高程垂直夸大（vertical exaggeration）。[#11887](https://github.com/CesiumGS/cesium/pull/11887)
- Added the `Check` object of validators to the public api and types. [#11901](https://github.com/CesiumGS/cesium/pull/11901)
  将参数校验器对象 `Check` 添加到公共 API 和类型定义中。[#11901](https://github.com/CesiumGS/cesium/pull/11901)

#### Fixes :wrench:

- Fixed issue with `BingMapsImageryProvider` where given culture option is ineffective [#11695](https://github.com/CesiumGS/cesium/issues/11695)
  修复了 `BingMapsImageryProvider` 中指定的 culture 区域文化选项无效的问题。[#11695](https://github.com/CesiumGS/cesium/issues/11695)
- Fixed a bug with performance in scenes with multiple tilesets [#11878](https://github.com/CesiumGS/cesium/pull/11878)
  修复了包含多个瓦片集的场景中的性能 Bug。[#11878](https://github.com/CesiumGS/cesium/pull/11878)
- Fixes issue with PolygonGeometry uvs are improperly computed [#11767](https://github.com/CesiumGS/cesium/issues/11767)
  修复了 `PolygonGeometry` 的 UV 坐标计算不正确的问题。[#11767](https://github.com/CesiumGS/cesium/issues/11767)
- Fixed voxel rendering bugs for non-spherical ellipsoid shapes [#11848](https://github.com/CesiumGS/cesium/pull/11848)
  修复了非球形椭球体形状的体素渲染 Bug。[#11848](https://github.com/CesiumGS/cesium/pull/11848)
- Fixed a bug where dynamic geometries caused the Scene to continuously render when running in requestRenderMode [#6631](https://github.com/CesiumGS/cesium/issues/6631)
  修复了在 requestRenderMode（按需渲染模式）下运行时，动态几何体导致场景持续渲染的 Bug。[#6631](https://github.com/CesiumGS/cesium/issues/6631)

## 1.115 - 2024-03-01

### @cesium/engine

#### Breaking Changes :mega:

- By default, instances of `Cesium3DTileset` will no longer default to enable collisions for camera collision or for clamping entities. [#11829](https://github.com/CesiumGS/cesium/pull/11829)
  默认情况下，`Cesium3DTileset` 实例将不再默认启用针对相机碰撞或实体贴地（clamping entities）的碰撞检测。[#11829](https://github.com/CesiumGS/cesium/pull/11829)
  - This behavior can be enabled by setting `Cesium3DTileset.enableCollision` to true.
    可以通过将 `Cesium3DTileset.enableCollision` 设置为 true 来启用该行为。

#### Additions :tada:

- Added support for I3S Building Scene Layer. [#11678](https://github.com/CesiumGS/cesium/pull/11678)
  新增对 I3S 建筑场景图层（Building Scene Layer）的支持。[#11678](https://github.com/CesiumGS/cesium/pull/11678)
- Added `Scene.pickVoxel` to pick individual cells from a `VoxelPrimitive`, and `VoxelCell` to report information about the picked cell. [#11828](https://github.com/CesiumGS/cesium/pull/11828)
  新增 `Scene.pickVoxel` 用于拾取来自 `VoxelPrimitive` 的单个体素单元，以及 `VoxelCell` 用于报告被拾取体素单元的信息。[#11828](https://github.com/CesiumGS/cesium/pull/11828)
- Added `Scene.defaultLogDepthBuffer` to allow changing the default behavior of the `logDepthBuffer` for newly created `Scene` instances. [#11859](https://github.com/CesiumGS/cesium/pull/11859)
  新增 `Scene.defaultLogDepthBuffer`，允许更改新创建 `Scene` 实例的对数深度缓冲区（`logDepthBuffer`）的默认行为。[#11859](https://github.com/CesiumGS/cesium/pull/11859)
- Added `SensorVolumePortionToDisplay` to assist `CzmlDataSource` in parsing CZML. [#11859](https://github.com/CesiumGS/cesium/pull/11859)
  新增 `SensorVolumePortionToDisplay` 以协助 `CzmlDataSource` 解析 CZML。[#11859](https://github.com/CesiumGS/cesium/pull/11859)

#### Fixes :wrench:

- Fixed a bug where the camera can stay underground when 3D Tiles are loading in. [#11824](https://github.com/CesiumGS/cesium/issues/11824)
  修复了在 3D Tiles 加载过程中相机可能停留在地下的 Bug。[#11824](https://github.com/CesiumGS/cesium/issues/11824)
- Fixed a bug with where a mix of empty and non-empty tiles were not refining. [#9356](https://github.com/CesiumGS/cesium/issues/9356)
  修复了空瓦片与非空瓦片混合存在时未进行细分细化（refine）的 Bug。[#9356](https://github.com/CesiumGS/cesium/issues/9356)
- Fixed a bug with camera collision with tilesets containing tiles with interleaved buffers [#11812](https://github.com/CesiumGS/cesium/issues/11812)
  修复了相机与包含交错缓冲区（interleaved buffers）瓦片的瓦片集发生碰撞时的 Bug。[#11812](https://github.com/CesiumGS/cesium/issues/11812)
- Fixed a bug affecting voxel shader compilation in WebGL1 contexts. [#11798](https://github.com/CesiumGS/cesium/pull/11798)
  修复了影响 WebGL1 环境下体素着色器编译的 Bug。[#11798](https://github.com/CesiumGS/cesium/pull/11798)
- Fixed a bug where legacy B3DM files that contained glTF 1.0 data that used a `CONSTANT` technique in the `KHR_material_common` extension and only defined ambient- or emissive textures (but no diffuse textures) showed up without any texture [#11825](https://github.com/CesiumGS/cesium/pull/11825)
  修复了传统的 B3DM 文件若包含使用 `KHR_material_common` 扩展中 `CONSTANT` technique 的 glTF 1.0 数据，且仅定义了环境贴图或自发光贴图（但没有漫反射贴图）时，显示为完全没有纹理的 Bug。[#11825](https://github.com/CesiumGS/cesium/pull/11825)
- Fixed an error when the `screenSpaceEventHandler` was destroyed before `Viewer` [#10576](https://github.com/CesiumGS/cesium/issues/10576)
  修复了在 `Viewer` 之前销毁 `screenSpaceEventHandler` 时抛出的错误。[#10576](https://github.com/CesiumGS/cesium/issues/10576)
- Fixed how `Camera.changed` handles changes in `roll`. [#11844](https://github.com/CesiumGS/cesium/pull/11844)
  修复了 `Camera.changed` 处理翻滚角（`roll`）变化时的行为。[#11844](https://github.com/CesiumGS/cesium/pull/11844)

#### Deprecated :hourglass_flowing_sand:

- `Cesium3DTileset.disableCollision` has been deprecated and will be removed in 1.116. Use `Cesium3DTileset.enableCollision` instead.
  `Cesium3DTileset.disableCollision` 已被废弃，将在 1.116 版本中移除。请改用 `Cesium3DTileset.enableCollision`。

### @cesium/widgets

#### Additions :tada:

- Added `I3SBuildingSceneLayerExplorer` widget for working with I3S Building Scene Layer data. [#11678](https://github.com/CesiumGS/cesium/pull/11678)
  新增 `I3SBuildingSceneLayerExplorer` 部件，用于操作和浏览 I3S 建筑场景图层数据。[#11678](https://github.com/CesiumGS/cesium/pull/11678)

## 1.114 - 2024-02-01

### @cesium/engine

#### Breaking Changes :mega:

- By default, the screen space camera controller will no longer go inside or under instances of `Cesium3DTileset`. [#11581](https://github.com/CesiumGS/cesium/pull/11581)
  默认情况下，屏幕空间相机控制器将不再穿入或沉入 `Cesium3DTileset` 实例的内部或下方。[#11581](https://github.com/CesiumGS/cesium/pull/11581)
  - This behavior can be disabled by setting `Cesium3DTileset.disableCollision` to true.
    可以通过将 `Cesium3DTileset.disableCollision` 设置为 true 来禁用此行为。
  - This feature is enabled by default only for WebGL 2 and above, but can be enabled for WebGL 1 by setting the `enablePick` option to true when creating the `Cesium3DTileset`.
    该特性仅在 WebGL 2 及以上环境中默认启用，但对于 WebGL 1，可以在创建 `Cesium3DTileset` 时将 `enablePick` 选项设置为 true 来启用。
- Clamping to ground, `HeightReference.CLAMP_TO_GROUND`, and `HeightReference.RELATIVE_TO_GROUND` now take into account 3D Tilesets. These options will clamp to either 3D Tilesets or Terrain, whichever has a greater height. [#11604](https://github.com/CesiumGS/cesium/pull/11604)
  贴地（Clamping to ground）、`HeightReference.CLAMP_TO_GROUND` 以及 `HeightReference.RELATIVE_TO_GROUND` 现在会考虑 3D Tileset。这些选项将贴合到 3D Tileset 或地形中高度较高的一方。[#11604](https://github.com/CesiumGS/cesium/pull/11604)
  - To restore previous behavior where an entity is clamped only to terrain or relative only to terrain, set `heightReference` to `HeightReference.CLAMP_TO_TERRAIN` or `HeightReference.RELATIVE_TO_TERRAIN` respectively.
    若要恢复仅贴合地形或仅相对于地形的原有行为，请分别将 `heightReference` 设置为 `HeightReference.CLAMP_TO_TERRAIN` 或 `HeightReference.RELATIVE_TO_TERRAIN`。
- Removed the need for node internal packages `http`, `https`, `url` and `zlib` in the `Resource` class. This means they do not need to be marked external by build tools anymore. [#11773](https://github.com/CesiumGS/cesium/pull/11773)
  在 `Resource` 类中移除了对 Node.js 内置包 `http`、`https`、`url` 和 `zlib` 的依赖。这意味着构建工具不再需要将它们标记为 external。[#11773](https://github.com/CesiumGS/cesium/pull/11773)
  - This slightly changed the contents of the `RequestErrorEvent` error that is thrown in node environments when a request fails. The `response` property is now a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object instead of an [`http.IncomingMessage`](https://nodejs.org/docs/latest-v20.x/api/http.html#class-httpincomingmessage)
    这略微改变了在 Node 环境下请求失败时抛出的 `RequestErrorEvent` 错误的内容。`response` 属性现在是一个 [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) 对象，而非 [`http.IncomingMessage`](https://nodejs.org/docs/latest-v20.x/api/http.html#class-httpincomingmessage)。
- The `Cesium3DTileset.dynamicScreenSpaceError` optimization is now enabled by default, as this improves performance for street-level horizon views. Furthermore, the default settings of this feature were tuned for improved performance. `Cesium3DTileset.dynamicScreenSpaceErrorDensity` was changed from 0.00278 to 0.0002. `Cesium3DTileset.dynamicScreenSpaceErrorFactor` was changed from 4 to 24. [#11718](https://github.com/CesiumGS/cesium/pull/11718)
  `Cesium3DTileset.dynamicScreenSpaceError`（动态屏幕空间误差）优化现在默认启用，因为这能显著提升街道级别地平线视角的渲染性能。此外，该特性的默认参数设置也进行了微调以提升性能。`Cesium3DTileset.dynamicScreenSpaceErrorDensity` 从 0.00278 更改为 0.0002。`Cesium3DTileset.dynamicScreenSpaceErrorFactor` 从 4 更改为 24。[#11718](https://github.com/CesiumGS/cesium/pull/11718)
- `PolygonGeometry.computeRectangle` has been removed. Use `PolygonGeometry.computeRectangleFromPositions` instead.
  `PolygonGeometry.computeRectangle` 已被移除。请改用 `PolygonGeometry.computeRectangleFromPositions`。

#### Additions :tada:

- Added `HeightReference.CLAMP_TO_TERRAIN`, `HeightReference.RELATIVE_TO_TERRAIN`, `HeightReference.CLAMP_TO_3D_TILE`, and `HeightReference.RELATIVE_TO_3D_TILE` to position relative to terrain or 3D tilesets exclusively.[#11604](https://github.com/CesiumGS/cesium/pull/11604)
  新增 `HeightReference.CLAMP_TO_TERRAIN`、`HeightReference.RELATIVE_TO_TERRAIN`、`HeightReference.CLAMP_TO_3D_TILE` 和 `HeightReference.RELATIVE_TO_3D_TILE`，用于专门相对于地形或 3D 瓦片集进行定位贴合。[#11604](https://github.com/CesiumGS/cesium/pull/11604)
- Added `Cesium3DTileset.getHeight` to sample height values of the loaded tiles. If using WebGL 1, the `enablePick` option must be set to true to use this function. [#11581](https://github.com/CesiumGS/cesium/pull/11581)
  新增 `Cesium3DTileset.getHeight` 以对已加载瓦片的高程值进行采样。若使用 WebGL 1，必须将 `enablePick` 选项设置为 true 才能使用此函数。[#11581](https://github.com/CesiumGS/cesium/pull/11581)
- Added `Cesium3DTileset.disableCollision` to allow the camera from to go inside or below a 3D tileset, for instance, to be used with 3D Tiles interiors. [#11581](https://github.com/CesiumGS/cesium/pull/11581)
  新增 `Cesium3DTileset.disableCollision`，允许相机进入 3D 瓦片集内部或穿到其下方，例如用于 3D Tiles 室内场景。[#11581](https://github.com/CesiumGS/cesium/pull/11581)
- Fog rendering now applies to glTF models and 3D Tiles. This can be configured using `scene.fog` and `scene.atmosphere`. [#11744](https://github.com/CesiumGS/cesium/pull/11744)
  雾效渲染现在支持应用于 glTF 模型和 3D Tiles。可以通过 `scene.fog` 和 `scene.atmosphere` 进行配置。[#11744](https://github.com/CesiumGS/cesium/pull/11744)
- Added `scene.atmosphere` to store common atmosphere lighting parameters. [#11744](https://github.com/CesiumGS/cesium/pull/11744) and [#11681](https://github.com/CesiumGS/cesium/issues/11681)
  新增 `scene.atmosphere`，用于存储通用的大气光照参数。[#11744](https://github.com/CesiumGS/cesium/pull/11744) 与 [#11681](https://github.com/CesiumGS/cesium/issues/11681)
- Added `createWorldBathymetryAsync` helper function to make it easier to load Bathymetry terrain. [#11790](https://github.com/CesiumGS/cesium/issues/11790)
  新增 `createWorldBathymetryAsync` 辅助函数，使加载水深地形（Bathymetry terrain）更加便捷。[#11790](https://github.com/CesiumGS/cesium/issues/11790)

#### Fixes :wrench:

- Fixed an issue where `DataSource` objects incorrectly shared a single `PolylineCollection` in the `PolylineGeometryUpdater`. Updated `PolylineGeometryUpdater` to create a distinct `PolylineCollection` instance per `DataSource`. This resolves the crashes reported under [#7758](https://github.com/CesiumGS/cesium/issues/7758) and [#9154](https://github.com/CesiumGS/cesium/issues/9154).
  修复了 `DataSource` 对象在 `PolylineGeometryUpdater` 中错误地共享同一个 `PolylineCollection` 的问题。更新了 `PolylineGeometryUpdater` 为每个 `DataSource` 创建独立的 `PolylineCollection` 实例。这解决了在 [#7758](https://github.com/CesiumGS/cesium/issues/7758) 和 [#9154](https://github.com/CesiumGS/cesium/issues/9154) 中报告的崩溃问题。
- Fixed a geometry displacement on iOS devices that was caused by NaN value in `czm_translateRelativeToEye` function. [#7100](https://github.com/CesiumGS/cesium/issues/7100)
  修复了 iOS 设备上由于 `czm_translateRelativeToEye` 函数中的 NaN 值导致的几何体偏移问题。[#7100](https://github.com/CesiumGS/cesium/issues/7100)
- Fixed improper scaling of ellipsoid inner radii in 3D mode. [#11656](https://github.com/CesiumGS/cesium/issues/11656) and [#10245](https://github.com/CesiumGS/cesium/issues/10245)
  修复了 3D 模式下椭球体内部半径缩放不正确的问题。[#11656](https://github.com/CesiumGS/cesium/issues/11656) 与 [#10245](https://github.com/CesiumGS/cesium/issues/10245)
- Updated `approximateTerrainHeights.json` to account for CWB heights to help with ground primitives when using Cesium World Bathymetry [#11805](https://github.com/CesiumGS/cesium/pull/11805)
  更新了 `approximateTerrainHeights.json` 以纳入 CWB 高度，有助于在使用 Cesium World Bathymetry（全球水深数据）时正确处理贴地图元（ground primitives）。[#11805](https://github.com/CesiumGS/cesium/pull/11805)
- Fix globe materials when lighting is false. Slope/Aspect material no longer rely on turning on lighting or shadows. [#11563](https://github.com/CesiumGS/cesium/issues/11563)
  修复了当关闭光照（lighting 为 false）时的地球材质问题。坡度/坡向（Slope/Aspect）材质不再依赖于开启光照或阴影。[#11563](https://github.com/CesiumGS/cesium/issues/11563)
- Fixed a bug where `GregorianDate` constructor would not validate the input parameters for valid date. [#10057](https://github.com/CesiumGS/cesium/issues/10057)
  修复了 `GregorianDate` 构造函数未对输入参数进行有效日期验证的 Bug。[#10057](https://github.com/CesiumGS/cesium/issues/10057)
- Fixed a bug where the `Cesium3DTileset` constructor was ignoring the options `dynamicScreenSpaceError`, `dynamicScreenSpaceErrorDensity`, `dynamicScreenSpaceErrorFactor` and `dynamicScreenSpaceErrorHeightFalloff`. [#11677](https://github.com/CesiumGS/cesium/issues/11677)
  修复了 `Cesium3DTileset` 构造函数忽略 `dynamicScreenSpaceError`、`dynamicScreenSpaceErrorDensity`、`dynamicScreenSpaceErrorFactor` 和 `dynamicScreenSpaceErrorHeightFalloff` 选项的 Bug。[#11677](https://github.com/CesiumGS/cesium/issues/11677)
- Fixed a bug where transforms that had been defined with the `KHR_texture_transform` extension had not been applied to Property Textures in `EXT_structural_metadata`. [#11708](https://github.com/CesiumGS/cesium/issues/11708)
  修复了使用 `KHR_texture_transform` 扩展定义的变换未能应用到 `EXT_structural_metadata` 中属性纹理（Property Textures）的 Bug。[#11708](https://github.com/CesiumGS/cesium/issues/11708)
- Fixed a bug where transforms that had been defined with the `KHR_texture_transform` extension had not been applied to Feature ID Textures in `EXT_mesh_features`. [#11731](https://github.com/CesiumGS/cesium/issues/11731)
  修复了使用 `KHR_texture_transform` 扩展定义的变换未能应用到 `EXT_mesh_features` 中要素 ID 纹理（Feature ID Textures）的 Bug。[#11731](https://github.com/CesiumGS/cesium/issues/11731)
- Fixed `Entity` documentation for `orientation` property. [#11762](https://github.com/CesiumGS/cesium/pull/11762)
  修复了 `Entity` 中 `orientation` 属性的文档说明。[#11762](https://github.com/CesiumGS/cesium/pull/11762)
- The `EntityCollection#add` method was documented to throw a `DeveloperError` for duplicate IDs, but did throw a `RuntimeError` in this case. This is now changed to throw a `DeveloperError`. [#11776](https://github.com/CesiumGS/cesium/pull/11776)
  文档中说明 `EntityCollection#add` 方法在遇到重复 ID 时会抛出 `DeveloperError`，但实际上此前抛出了 `RuntimeError`。现已修改为抛出 `DeveloperError`。[#11776](https://github.com/CesiumGS/cesium/pull/11776)
- Parts of the documentation have been updated to resolve potential issues with the generated TypedScript definitions. [#11776](https://github.com/CesiumGS/cesium/pull/11776)
  更新了部分文档以解决生成的 TypeScript 类型定义中的潜在问题。[#11776](https://github.com/CesiumGS/cesium/pull/11776)
- Fixed type definition for `Camera.constrainedAxis`. [#11475](https://github.com/CesiumGS/cesium/issues/11475)
  修复了 `Camera.constrainedAxis` 的类型定义。[#11475](https://github.com/CesiumGS/cesium/issues/11475)

### @cesium/widgets

#### Fixes :wrench:

- Fixed a bug where the 3D Tiles Inspector's `dynamicScreenSpaceErrorDensity` slider did not update the tileset [#6143](https://github.com/CesiumGS/cesium/issues/6143)
  修复了 3D Tiles Inspector（3D 瓦片检查器）的 `dynamicScreenSpaceErrorDensity` 滑块无法更新瓦片集的 Bug。[#6143](https://github.com/CesiumGS/cesium/issues/6143)

## 1.113 - 2024-01-02

### @cesium/engine

#### Additions :tada:

- Vertical exaggeration can now be applied to a `Cesium3DTileset`. Exaggeration of `Terrain` and `Cesium3DTileset` can be controlled simultaneously via the new `Scene` properties `Scene.verticalExaggeration` and `Scene.verticalExaggerationRelativeHeight`. [#11655](https://github.com/CesiumGS/cesium/pull/11655)
  现在可以将高程夸大（vertical exaggeration）应用于 `Cesium3DTileset`。通过新增的 `Scene` 属性 `Scene.verticalExaggeration` 和 `Scene.verticalExaggerationRelativeHeight`，可以同时控制 `Terrain` 和 `Cesium3DTileset` 的夸大效果。[#11655](https://github.com/CesiumGS/cesium/pull/11655)

#### Fixes :wrench:

- Changes the default `RequestScheduler.maximumRequestsPerServer` from 6 to 18. This should improve performance on HTTP/2 servers and above. [#11627](https://github.com/CesiumGS/cesium/issues/11627)
  将 `RequestScheduler.maximumRequestsPerServer` 的默认值从 6 改为 18。这应该会提升在 HTTP/2 及以上协议服务器上的性能。[#11627](https://github.com/CesiumGS/cesium/issues/11627)
- Corrected JSDoc and Typescript definitions that marked optional arguments as required in `ImageryProvider` constructor. [#11625](https://github.com/CesiumGS/cesium/issues/11625)
  修正了 `ImageryProvider` 构造函数中将可选参数标记为必填的 JSDoc 和 TypeScript 类型定义。[#11625](https://github.com/CesiumGS/cesium/issues/11625)
- The `Quaternion.computeAxis` function created an axis that was `(0,0,0)` for the unit quaternion, and an axis that was `(NaN,NaN,NaN)` for the quaternion `(0,0,0,-1)` (which describes a rotation about 360 degrees). Now, it returns the x-axis `(1,0,0)` in both of these cases. [#11665](https://github.com/CesiumGS/cesium/issues/11665)
  `Quaternion.computeAxis` 函数在处理单位四元数时会生成 `(0,0,0)` 的旋转轴，处理四元数 `(0,0,0,-1)`（表示绕某轴旋转 360 度）时会生成 `(NaN,NaN,NaN)` 的旋转轴。现在，这两种情况下都统一返回 X 轴 `(1,0,0)`。[#11665](https://github.com/CesiumGS/cesium/issues/11665)

#### Deprecated :hourglass_flowing_sand:

- `Globe.terrainExaggeration` and `Globe.terrainExaggerationRelativeHeight` have been deprecated in CesiumJS 1.113. They will be removed in 1.116. Use `Scene.verticalExaggeration` and `Scene.verticalExaggerationRelativeHeight` instead. [#11655](https://github.com/CesiumGS/cesium/pull/11655)
  `Globe.terrainExaggeration` 和 `Globe.terrainExaggerationRelativeHeight` 已在 CesiumJS 1.113 中被废弃，并将于 1.116 中移除。请改用 `Scene.verticalExaggeration` 和 `Scene.verticalExaggerationRelativeHeight`。[#11655](https://github.com/CesiumGS/cesium/pull/11655)

## 1.112 - 2023-12-01

### @cesium/engine

#### Fixes :wrench:

- Fixed terrain lockups in `requestTileGeometry` by ensuring promise handling aligns with CesiumJS's expectations. [#11630](https://github.com/CesiumGS/cesium/pull/11630)
  通过确保 Promise 处理方式符合 CesiumJS 的预期，修复了 `requestTileGeometry` 中的地形卡死问题。[#11630](https://github.com/CesiumGS/cesium/pull/11630)
- Corrected JSDoc and Typescript definitions that marked optional arguments as required in `Cesium3dTileset.fromIonAssetId` [#11623](https://github.com/CesiumGS/cesium/issues/11623), and `IonImageryProvider.fromAssetId` [#11624](https://github.com/CesiumGS/cesium/issues/11624)
  修正了 `Cesium3dTileset.fromIonAssetId` [#11623](https://github.com/CesiumGS/cesium/issues/11623) 和 `IonImageryProvider.fromAssetId` [#11624](https://github.com/CesiumGS/cesium/issues/11624) 中将可选参数标记为必填的 JSDoc 及 TypeScript 类型定义。

## 1.111 - 2023-11-01

### @cesium/engine

#### Additions :tada:

- `BingMapsImageryProvider.fromUrl` now takes an optional `mapLayer` parameter which is a string that maps directly to the [mapLayer template parameters](https://learn.microsoft.com/en-us/bingmaps/rest-services/imagery/get-imagery-metadata#template-parameters) specified in the Bing Maps documentation.
  `BingMapsImageryProvider.fromUrl` 现在接受一个可选的 `mapLayer` 参数，该参数为字符串，直接映射到 Bing Maps 文档中指定的 [mapLayer 模板参数](https://learn.microsoft.com/en-us/bingmaps/rest-services/imagery/get-imagery-metadata#template-parameters)。

#### Fixes :wrench:

- By default, `createGooglePhotorealistic3DTileset` no longer shows credits on screen but links to them instead, as this is compliant with the minimum required attribution. To restore this behavior, pass the option `showCreditsOnScreen: true`. [#11589](https://github.com/CesiumGS/cesium/pull/11589)
  默认情况下，`createGooglePhotorealistic3DTileset` 不再在屏幕上直接显示署名信息（credits），而是以超链接形式展示，因为这符合最低版权署名要求。若要恢复原有行为，可传入选项 `showCreditsOnScreen: true`。[#11589](https://github.com/CesiumGS/cesium/pull/11589)
- Fixed an issue with polygon hole rendering. [#11583](https://github.com/CesiumGS/cesium/issues/11583)
  修复了多边形孔洞渲染的问题。[#11583](https://github.com/CesiumGS/cesium/issues/11583)
- Fixed error with rhumb lines that have a 0 degree heading. [#11573](https://github.com/CesiumGS/cesium/pull/11573)
  修复了航向角为 0 度的等角航线（rhumb lines）报错的问题。[#11573](https://github.com/CesiumGS/cesium/pull/11573)
- Fixed `czm_normal`, `czm_normal3D`, `czm_inverseNormal`, and `czm_inverseNormal3D` for cases where the model matrix has non-uniform scale. [#11553](https://github.com/CesiumGS/cesium/pull/11553)
  修复了模型矩阵存在非均匀缩放时 `czm_normal`、`czm_normal3D`、`czm_inverseNormal` 和 `czm_inverseNormal3D` 的计算问题。[#11553](https://github.com/CesiumGS/cesium/pull/11553)
- Fixed issue with clustered labels when `dataSource.show` was toggled. [#11560](https://github.com/CesiumGS/cesium/pull/11560)
  修复了切换 `dataSource.show` 时聚合标签（clustered labels）出现的问题。[#11560](https://github.com/CesiumGS/cesium/pull/11560)
- Fixed inconsistent clustering when `dataSource.show` was toggled. [#11560](https://github.com/CesiumGS/cesium/pull/11560)
  修复了切换 `dataSource.show` 时聚合（clustering）显示不一致的问题。[#11560](https://github.com/CesiumGS/cesium/pull/11560)

## 1.110.1 - 2023-10-25

### @cesium/engine

#### Breaking Changes :mega:

- CesiumJS no longer ships with a demo Google Maps API key. `GoogleMaps.defaultApiKey` is no longer defined by default.
  CesiumJS 不再自带演示用的 Google Maps API 密钥。`GoogleMaps.defaultApiKey` 默认不再定义。
- `createGooglePhotorealistic3DTileset` by default now provides tiles via Cesium ion if the `GoogleMaps.defaultApiKey` is not set.
  若未设置 `GoogleMaps.defaultApiKey`，`createGooglePhotorealistic3DTileset` 默认现在通过 Cesium ion 提供瓦片。
- If you wish to continue to use your own Google Maps API key, you can go back to the previous behavior:
  如果您希望继续使用自己的 Google Maps API 密钥，可以恢复到以前的行为：

  ```javascript
  Cesium.GoogleMaps.defaultApiKey = "your-api-key";

  const tileset = await Cesium.createGooglePhotorealistic3DTileset();
  viewer.scene.primitives.add(tileset));
  ```

## 1.110 - 2023-10-02

### @cesium/engine

#### Breaking Changes :mega:

- `Cesium3DTileset.maximumMemoryUsage` has been removed. Use `Cesium3DTileset.cacheBytes` and `Cesium3DTileset.maximumCacheOverflowBytes` instead.
  `Cesium3DTileset.maximumMemoryUsage` 已被移除。请改用 `Cesium3DTileset.cacheBytes` 和 `Cesium3DTileset.maximumCacheOverflowBytes`。

#### Additions :tada:

- Worker files are now embedded in `Build/Cesium/Cesium.js` and `Build/CesiumUnminified/Cesium.js`. [#11519](https://github.com/CesiumGS/cesium/pull/11519)
  Worker 文件现在直接嵌入在 `Build/Cesium/Cesium.js` 和 `Build/CesiumUnminified/Cesium.js` 中。[#11519](https://github.com/CesiumGS/cesium/pull/11519)
- Added `PolygonGeometry.computeRectangleFromPositions` for computing a `Rectangle` that encloses a polygon, including cases over the international date line and the poles.
  新增 `PolygonGeometry.computeRectangleFromPositions`，用于计算包围多边形的矩形（`Rectangle`），支持跨越国际日期变更线和极地的情况。
- Added `Stereographic` for computing 2D operations in stereographic, or polar, coordinates.
  新增 `Stereographic`，用于在立体投影（极坐标）下计算 2D 几何操作。
- Adds events to `PrimitiveCollection` for primitive added/removed. [#11531](https://github.com/CesiumGS/cesium/pull/11531)
  为 `PrimitiveCollection` 添加图元添加/移除的事件（primitive added/removed）。[#11531](https://github.com/CesiumGS/cesium/pull/11531)
- Adds an optional `rejectOnTileFail` parameter to `sampleTerrain` and `sampleTerrainMostDetailed` to allow handling of tile request failures. [#11530](https://github.com/CesiumGS/cesium/pull/11530)
  为 `sampleTerrain` 和 `sampleTerrainMostDetailed` 添加了可选的 `rejectOnTileFail` 参数，以便处理瓦片请求失败的情况。[#11530](https://github.com/CesiumGS/cesium/pull/11530)

#### Fixes :wrench:

- Fixed rendering of polygons spanning extents of 90 degrees or more. [#4871](https://github.com/CesiumGS/cesium/issues/4871)
  修复了跨度达到或超过 90 度的多边形渲染问题。[#4871](https://github.com/CesiumGS/cesium/issues/4871)
- Fixed ground primitive polygon visual artifacts at pole. [#8033](https://github.com/CesiumGS/cesium/issues/8033)
  修复了极地区域贴地图元多边形的视觉伪影问题。[#8033](https://github.com/CesiumGS/cesium/issues/8033)
- Fixed bug in `Cesium3DTilePass` affecting the `PRELOAD` pass. [#11525](https://github.com/CesiumGS/cesium/pull/11525)
  修复了 `Cesium3DTilePass` 中影响 `PRELOAD` 通道的 Bug。[#11525](https://github.com/CesiumGS/cesium/pull/11525)
- Fixed bug where sky atmosphere could not be shown when `globe.show` is initialized to false. [#11266](https://github.com/CesiumGS/cesium/issues/11266)
  修复了当 `globe.show` 初始化为 false 时天空大气层（sky atmosphere）无法显示的 Bug。[#11266](https://github.com/CesiumGS/cesium/issues/11266)
- Fixed issue loading workers in cross-origin `Build/Cesium/Cesium.js` and `Build/CesiumUnminified/Cesium.js` requests. [#11505](https://github.com/CesiumGS/cesium/issues/11505)
  修复了跨域请求 `Build/Cesium/Cesium.js` 和 `Build/CesiumUnminified/Cesium.js` 时加载 Worker 的问题。[#11505](https://github.com/CesiumGS/cesium/issues/11505)
- Fixed `showOnScreen` behavior for `Model` and `Cesium3DTileset` credits. [#11538](https://github.com/CesiumGS/cesium/pull/11538)
  修复了 `Model` 和 `Cesium3DTileset` 署名信息的 `showOnScreen` 行为。[#11538](https://github.com/CesiumGS/cesium/pull/11538)
- Remove reading of `import.meta` meta-property because webpack does not support it. [#11511](https://github.com/CesiumGS/cesium/pull/11511)
  移除了对 `import.meta` 元属性的读取，因为 webpack 不支持该语法。[#11511](https://github.com/CesiumGS/cesium/pull/11511)
- Fixed label background rendering in request render mode. [#11529](https://github.com/CesiumGS/cesium/issues/11529)
  修复了在请求渲染模式（request render mode）下文本标签背景渲染的问题。[#11529](https://github.com/CesiumGS/cesium/issues/11529)

#### Deprecated :hourglass_flowing_sand:

- `PolygonGeometry.computeRectangle` has been deprecated. It will be removed in 1.112. Use `PolygonGeometry.computeRectangleFromPositions` instead.
  `PolygonGeometry.computeRectangle` 已被废弃，将于 1.112 中移除。请改用 `PolygonGeometry.computeRectangleFromPositions`。

## 1.109 - 2023-09-01

### @cesium/engine

#### Breaking Changes :mega:

- Firefox 114 is now the minimum Firefox version required to run CesiumJS. [#11400](https://github.com/CesiumGS/cesium/pull/11400)
  运行 CesiumJS 所需的 Firefox 最低版本现为 Firefox 114。[#11400](https://github.com/CesiumGS/cesium/pull/11400)
- `TaskProcessor` now loads worker files as ESM instead of AMD. [#11400](https://github.com/CesiumGS/cesium/pull/11400)
  `TaskProcessor` 现在以 ESM 形式加载 Worker 文件，而非 AMD。[#11400](https://github.com/CesiumGS/cesium/pull/11400)

#### Additions :tada:

- Added the `retinaTiles` option to the `OpenStreetMapImageryProvider` constructor options to allow requesting tiles at the 2x resolution for retina displays. [#11485](https://github.com/CesiumGS/cesium/pull/11485)
  在 `OpenStreetMapImageryProvider` 构造函数选项中添加了 `retinaTiles` 选项，允许为视网膜显示屏请求 2 倍分辨率的瓦片。[#11485](https://github.com/CesiumGS/cesium/pull/11485)
- The TypeScript definition of `defined` now uses type predicates to allow TypeScript to use the result during compilation.
  `defined` 的 TypeScript 定义现在使用类型谓词（type predicates），允许 TypeScript 在编译期间推断类型结果。

#### Fixes :wrench:

- Restore previous behavior for cut out terrain loading. [#11482](https://github.com/CesiumGS/cesium/issues/11482)
  恢复了挖空/开挖地形（cut-out terrain）加载的原有行为。[#11482](https://github.com/CesiumGS/cesium/issues/11482)
- The return type of `SingleTileImageryProvider.fromUrl` has been fixed to be `Promise.<SingleTileImageryProvider>` (was `void`). [#11432](https://github.com/CesiumGS/cesium/pull/11432)
  修复了 `SingleTileImageryProvider.fromUrl` 的返回类型，现为 `Promise.<SingleTileImageryProvider>`（此前为 `void`）。[#11432](https://github.com/CesiumGS/cesium/pull/11432)
- Fixed request render mode when models are loading without `incrementallyLoadTextures`. [#11486](https://github.com/CesiumGS/cesium/pull/11486)
  修复了当模型在未开启 `incrementallyLoadTextures` 加载时的请求渲染模式（request render mode）问题。[#11486](https://github.com/CesiumGS/cesium/pull/11486)

### @cesium/widgets

#### Additions :tada:

- Added two additional default imagery providers from Stadia maps to the BaseLayerPicker widget: Alidade Smooth and Alidade Smooth Dark. [#11485](https://github.com/CesiumGS/cesium/pull/11485)
  在 BaseLayerPicker 控件中新增了来自 Stadia maps 的两个默认影像提供者：Alidade Smooth 和 Alidade Smooth Dark。[#11485](https://github.com/CesiumGS/cesium/pull/11485)

#### Fixes :wrench:

- Use updated URLs and attribution for Stamen Map styles in the default BaseLayerPicker widget. [#11451](https://github.com/CesiumGS/cesium/issues/11451)
  在默认 BaseLayerPicker 控件中更新了 Stamen 地图样式的 URL 与版权署名信息。[#11451](https://github.com/CesiumGS/cesium/issues/11451)
- Fixed types for `ProviderViewModel.CreationFunction`. [#11452](https://github.com/CesiumGS/cesium/issues/11452)
  修复了 `ProviderViewModel.CreationFunction` 的类型定义。[#11452](https://github.com/CesiumGS/cesium/issues/11452)
- Fixed I3dmLoader manually compute positions when RTC_CENTER is ZERO [#11466](https://github.com/CesiumGS/cesium/pull/11466)
  修复了当 RTC_CENTER 为零时 `I3dmLoader` 手动计算位置的问题。[#11466](https://github.com/CesiumGS/cesium/pull/11466)

## 1.108 - 2023-08-01

### Major Announcements :loudspeaker:

- Starting with version 1.109, CesiumJS will require Firefox version 114 or higher for rendering. This is to [facilitate web worker loading and remove outdated dependencies](https://github.com/CesiumGS/cesium/pull/11400). Other browsers and node will be unaffected.
  从 1.109 版本开始，CesiumJS 进行渲染将需要 Firefox 114 或更高版本。这是为了[便于 Web Worker 加载并移除过时的依赖项](https://github.com/CesiumGS/cesium/pull/11400)。其他浏览器和 Node.js 不受影响。

### @cesium/engine

#### Fixes :wrench:

- Fixed issue where terrain with multiple layers was loading higher LOD tiles inconsistently. [#11312](https://github.com/CesiumGS/cesium/issues/11312)
  修复了具有多个图层的地形在加载更高 LOD 瓦片时显示不一致的问题。[#11312](https://github.com/CesiumGS/cesium/issues/11312)
- Fixed `OpenStreetMapImageryProvider` usage in comments, change default url and add `tile.openstreetmap.org` to `RequestScheduler.requestsByServer`. [#11407](https://github.com/CesiumGS/cesium/pull/11407)
  修复了注释中 `OpenStreetMapImageryProvider` 的用法，修改了默认 URL 并将 `tile.openstreetmap.org` 添加到 `RequestScheduler.requestsByServer` 中。[#11407](https://github.com/CesiumGS/cesium/pull/11407)
- Fixed calculation of GroundPolyline bounding spheres in regions with negative terrain heights. [#11184](https://github.com/CesiumGS/cesium/pull/11184)
  修复了在负高程地形区域中贴地折线（GroundPolyline）包围球的计算问题。[#11184](https://github.com/CesiumGS/cesium/pull/11184)
- Fixed `CzmlDataSource` in cases of custom `Ellipsoid.WGS84` definitions. [#11190](https://github.com/CesiumGS/cesium/pull/11190)
  修复了在自定义 `Ellipsoid.WGS84` 定义的情况下 `CzmlDataSource` 的问题。[#11190](https://github.com/CesiumGS/cesium/pull/11190)
- Fixed mipmaps for textures using the `KHR_texture_transform` extension. [#11411](https://github.com/CesiumGS/cesium/pull/11411)
  修复了使用 `KHR_texture_transform` 扩展的纹理的 Mipmap 生成问题。[#11411](https://github.com/CesiumGS/cesium/pull/11411)

### @cesium/widgets

#### Fixes :wrench:

- Fixed conflicting geocoder suggestions for latitude and longitude pairs by removing `CartographicGeocoderService` from the default geocoder services in `GeocoderViewModel`. [#11433](https://github.com/CesiumGS/cesium/issues/11433).
  通过从 `GeocoderViewModel` 的默认地理编码服务中移除 `CartographicGeocoderService`，修复了经纬度对的地理编码建议冲突问题。[#11433](https://github.com/CesiumGS/cesium/issues/11433)。

## 1.107.2 - 2023-07-13

This is an npm-only release to fix a dependency issue published in 1.107.1

这是一个仅限 npm 的补丁发布，用于修复 1.107.1 中发布的依赖问题。

## 1.107.1 - 2023-07-13

### @cesium/engine

#### Fixes :wrench:

- Fixed a bug where `Model` would not respond to different alpha values in a `Cesium3DTileStyle`. [#11399](https://github.com/CesiumGS/cesium/pull/11399)
  修复了 `Model` 对 `Cesium3DTileStyle` 中不同 alpha 透明度值不生效的 Bug。[#11399](https://github.com/CesiumGS/cesium/pull/11399)
- Fixed dimensions of `tangentEC` in custom shaders. [#11394](https://github.com/CesiumGS/cesium/pull/11394)
  修复了自定义着色器中 `tangentEC` 的维度问题。[#11394](https://github.com/CesiumGS/cesium/pull/11394)

### @cesium/widgets

#### Fixes :wrench:

- Fixed promise return value when using `viewer.flyTo` to navigate to an ImageryLayer. [#11392](https://github.com/CesiumGS/cesium/pull/11392)
  修复了使用 `viewer.flyTo` 飞向 ImageryLayer 时的 Promise 返回值问题。[#11392](https://github.com/CesiumGS/cesium/pull/11392)
- Fixed `depthTestAgainstTerrain` value being overridden when using the base layer picker widget. [#11393](https://github.com/CesiumGS/cesium/issues/11393)
  修复了使用基础图层选择器（base layer picker）控件时 `depthTestAgainstTerrain` 值被覆盖的问题。[#11393](https://github.com/CesiumGS/cesium/issues/11393)

## 1.107 - 2023-07-03

### Major Announcements :loudspeaker:

- The `readyPromise` pattern has been removed across the API. This has been done to facilitate better asynchronous flow and error handling. For example:
  在整个 API 中已移除了 `readyPromise` 模式。此改动旨在提供更优的异步流程和错误处理机制。例如：

```js
try {
  const tileset = await Cesium.Cesium3DTileset.fromUrl(url);
  viewer.scene.primitives.add(tileset);
} catch (error) {
  console.log(`Failed to load tileset: ${error}`);
}
```

```js
try {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    terrainProvider: await Cesium.createWorldTerrainAsync();
  });
} catch (error) {
  console.log(`Failed to created terrain: ${error}`);
}
```

### @cesium/engine

#### Breaking Changes :mega:

- `CesiumWidget` constructor option `options.imageryProvider` has been removed. Use `options.baseLayer` instead.
  `CesiumWidget` 构造函数选项 `options.imageryProvider` 已被移除。请改用 `options.baseLayer`。
- `ImageryProvider.ready` and `ImageryProvider.readyPromise` have been removed.
  `ImageryProvider.ready` 和 `ImageryProvider.readyPromise` 已被移除。
- `ImageryProvider.defaultAlpha`, `ImageryProvider.defaultNightAlpha`, `ImageryProvider.defaultDayAlpha`, `ImageryProvider.defaultBrightness`, `ImageryProvider.defaultContrast`, `ImageryProvider.defaultHue`, `ImageryProvider.defaultSaturation`, `ImageryProvider.defaultGamma`, `ImageryProvider.defaultMinificationFilter`, `ImageryProvider.defaultMagnificationFilter` have been removed. Use `ImageryLayer.alpha`, `ImageryLayer.nightAlpha`, `ImageryLayer.dayAlpha`, `ImageryLayer.brightness`, `ImageryLayer.contrast`, `ImageryLayer.hue`, `ImageryLayer.saturation`, `ImageryLayer.gamma`, `ImageryLayer.minificationFilter`, `ImageryLayer.magnificationFilter`instead.
  `ImageryProvider.defaultAlpha`、`ImageryProvider.defaultNightAlpha`、`ImageryProvider.defaultDayAlpha`、`ImageryProvider.defaultBrightness`、`ImageryProvider.defaultContrast`、`ImageryProvider.defaultHue`、`ImageryProvider.defaultSaturation`、`ImageryProvider.defaultGamma`、`ImageryProvider.defaultMinificationFilter`、`ImageryProvider.defaultMagnificationFilter` 已被移除。请改用 `ImageryLayer.alpha`、`ImageryLayer.nightAlpha`、`ImageryLayer.dayAlpha`、`ImageryLayer.brightness`、`ImageryLayer.contrast`、`ImageryLayer.hue`、`ImageryLayer.saturation`、`ImageryLayer.gamma`、`ImageryLayer.minificationFilter`、`ImageryLayer.magnificationFilter`。
- `ImageryLayer.getViewableRectangle` was removed. Use `ImageryLayer.getImageryRectangle` instead.
  `ImageryLayer.getViewableRectangle` 已被移除。请改用 `ImageryLayer.getImageryRectangle`。
- `ArcGisMapServerImageryProvider` constructor parameter `url`,`ArcGisMapServerImageryProvider.ready`, and `ArcGisMapServerImageryProvider.readyPromise` have been removed. Use `ArcGisMapServerImageryProvider.fromUrl` instead.
  `ArcGisMapServerImageryProvider` 构造函数参数 `url`、`ArcGisMapServerImageryProvider.ready` 以及 `ArcGisMapServerImageryProvider.readyPromise` 已被移除。请改用 `ArcGisMapServerImageryProvider.fromUrl`。
- `BingMapsImageryProvider` constructor parameter `url`,`BingMapsImageryProvider.ready`, and `BingMapsImageryProvider.readyPromise` have been removed. Use `BingMapsImageryProvider.fromUrl` instead.
  `BingMapsImageryProvider` 构造函数参数 `url`、`BingMapsImageryProvider.ready` 以及 `BingMapsImageryProvider.readyPromise` 已被移除。请改用 `BingMapsImageryProvider.fromUrl`。
- `GoogleEarthEnterpriseImageryProvider` constructor parameters `options.url` and `options.metadata`, `GoogleEarthEnterpriseImageryProvider.ready`, and `GoogleEarthEnterpriseImageryProvider.readyPromise` have been removed. Use `GoogleEarthEnterpriseImageryProvider.fromMetadata` instead.
  `GoogleEarthEnterpriseImageryProvider` 构造函数参数 `options.url` 和 `options.metadata`、`GoogleEarthEnterpriseImageryProvider.ready` 以及 `GoogleEarthEnterpriseImageryProvider.readyPromise` 已被移除。请改用 `GoogleEarthEnterpriseImageryProvider.fromMetadata`。
- `GoogleEarthEnterpriseMapsProvider` constructor parameters `options.url` and `options.channel`, `GoogleEarthEnterpriseMapsProvider.ready`, and `GoogleEarthEnterpriseMapsProvider.readyPromise` have been removed. Use `GoogleEarthEnterpriseMapsProvider.fromUrl` instead.
  `GoogleEarthEnterpriseMapsProvider` 构造函数参数 `options.url` 和 `options.channel`、`GoogleEarthEnterpriseMapsProvider.ready` 以及 `GoogleEarthEnterpriseMapsProvider.readyPromise` 已被移除。请改用 `GoogleEarthEnterpriseMapsProvider.fromUrl`。
- `GridImageryProvider.ready` and `GridImageryProvider.readyPromise` have been removed.
  `GridImageryProvider.ready` 和 `GridImageryProvider.readyPromise` 已被移除。
- `IonImageryProvider` constructor parameter `assetId`,`BIonImageryProvider.ready`, and `IonImageryProvider.readyPromise` have been removed. Use `IonImageryProvider.fromAssetId` instead.
  `IonImageryProvider` 构造函数参数 `assetId`、`BIonImageryProvider.ready` 以及 `IonImageryProvider.readyPromise` 已被移除。请改用 `IonImageryProvider.fromAssetId`。
- `MapboxImageryProvider.ready` and `MapboxImageryProvider.readyPromise` have been removed.
  `MapboxImageryProvider.ready` 和 `MapboxImageryProvider.readyPromise` 已被移除。
- `MapboxStyleImageryProvider.ready` and `MapboxStyleImageryProvider.readyPromise` have been removed.
  `MapboxStyleImageryProvider.ready` 和 `MapboxStyleImageryProvider.readyPromise` 已被移除。
- `OpenStreetMapImageryProvider.ready` and `OpenStreetMapImageryProvider.readyPromise` have been removed.
  `OpenStreetMapImageryProvider.ready` 和 `OpenStreetMapImageryProvider.readyPromise` 已被移除。
- `SingleTileImageryProvider` constructor parameters `options.tileHeight` and `options.tileWidth` became required in CesiumJS 1.104. Omitting these properties will result in an error in 1.107. Provide `options.tileHeight` and `options.tileWidth`, or use `SingleTileImageryProvider.fromUrl` instead.
  `SingleTileImageryProvider` 构造函数参数 `options.tileHeight` 和 `options.tileWidth` 在 CesiumJS 1.104 中变为必填项。在 1.107 中若忽略这些属性将导致报错。请提供 `options.tileHeight` 和 `options.tileWidth`，或者改用 `SingleTileImageryProvider.fromUrl`。
- `SingleTileImageryProvider.ready` and `SingleTileImageryProvider.readyPromise` have been removed. Use `SingleTileImageryProvider.fromUrl` instead.
  `SingleTileImageryProvider.ready` 和 `SingleTileImageryProvider.readyPromise` 已被移除。请改用 `SingleTileImageryProvider.fromUrl`。
- `TileCoordinatesImageryProvider.ready` and `TileCoordinatesImageryProvider.readyPromise` have been removed.
  `TileCoordinatesImageryProvider.ready` 和 `TileCoordinatesImageryProvider.readyPromise` 已被移除。
- `TileMapServiceImageryProvider` constructor parameter `options.url`, `TileMapServiceImageryProvider.ready`, and `TileMapServiceImageryProvider.readyPromise` have been removed. Use `TileMapServiceImageryProvider.fromUrl` instead.
  `TileMapServiceImageryProvider` 构造函数参数 `options.url`、`TileMapServiceImageryProvider.ready` 以及 `TileMapServiceImageryProvider.readyPromise` 已被移除。请改用 `TileMapServiceImageryProvider.fromUrl`。
- `UrlTemplateImageryProvider.reinitialize`, `UrlTemplateImageryProvider.ready`, and `UrlTemplateImageryProvider.readyPromise` have been removed.
  `UrlTemplateImageryProvider.reinitialize`、`UrlTemplateImageryProvider.ready` 以及 `UrlTemplateImageryProvider.readyPromise` 已被移除。
- `WebMapServiceImageryProvider.ready`, and `WebMapServiceImageryProvider.readyPromise` have been removed.
  `WebMapServiceImageryProvider.ready` 和 `WebMapServiceImageryProvider.readyPromise` 已被移除。
- `WebMapTileServiceImageryProvider.ready`, and `WebMapTileServiceImageryProvider.readyPromise` have been removed.
  `WebMapTileServiceImageryProvider.ready` 和 `WebMapTileServiceImageryProvider.readyPromise` 已被移除。
- `TerrainProvider.ready` and `TerrainProvider.readyPromise` have been removed.
  `TerrainProvider.ready` 和 `TerrainProvider.readyPromise` 已被移除。
- `createWorldImagery` was removed. Use `createWorldImageryAsync` instead.
  `createWorldImagery` 已被移除。请改用 `createWorldImageryAsync`。
- `ArcGISTiledElevationTerrainProvider` constructor parameter `options.url`, `ArcGISTiledElevationTerrainProvider.ready`, and `ArcGISTiledElevationTerrainProvider.readyPromise` have been removed. Use `ArcGISTiledElevationTerrainProvider.fromUrl` instead.
  `ArcGISTiledElevationTerrainProvider` 构造函数参数 `options.url`、`ArcGISTiledElevationTerrainProvider.ready` 以及 `ArcGISTiledElevationTerrainProvider.readyPromise` 已被移除。请改用 `ArcGISTiledElevationTerrainProvider.fromUrl`。
- `CesiumTerrainProvider` constructor parameter `options.url`, `CesiumTerrainProvider.ready`, and `CesiumTerrainProvider.readyPromise` have been removed. Use `CesiumTerrainProvider.fromIonAssetId` or `CesiumTerrainProvider.fromUrl` instead.
  `CesiumTerrainProvider` 构造函数参数 `options.url`、`CesiumTerrainProvider.ready` 以及 `CesiumTerrainProvider.readyPromise` 已被移除。请改用 `CesiumTerrainProvider.fromIonAssetId` 或 `CesiumTerrainProvider.fromUrl`。
- `CustomHeightmapTerrainProvider.ready`, and `CustomHeightmapTerrainProvider.readyPromise` were deprecated in CesiumJS 1.104.
  `CustomHeightmapTerrainProvider.ready` 和 `CustomHeightmapTerrainProvider.readyPromise` 已在 CesiumJS 1.104 中废弃。
- `EllipsoidTerrainProvider.ready`, and `EllipsoidTerrainProvider.readyPromise` were deprecated in CesiumJS 1.104.
  `EllipsoidTerrainProvider.ready` 和 `EllipsoidTerrainProvider.readyPromise` 已在 CesiumJS 1.104 中废弃。
- `GoogleEarthEnterpriseMetadata` constructor parameter `options.url` and `GoogleEarthEnterpriseMetadata.readyPromise` have been removed. Use `GoogleEarthEnterpriseMetadata.fromUrl` instead.
  `GoogleEarthEnterpriseMetadata` 构造函数参数 `options.url` 以及 `GoogleEarthEnterpriseMetadata.readyPromise` 已被移除。请改用 `GoogleEarthEnterpriseMetadata.fromUrl`。
- `GoogleEarthEnterpriseTerrainProvider` constructor parameters `options.url` and `options.metadata`, `GoogleEarthEnterpriseTerrainProvider.ready`, and `GoogleEarthEnterpriseTerrainProvider.readyPromise` have been removed. Use `GoogleEarthEnterpriseTerrainProvider.fromMetadata` instead.
  `GoogleEarthEnterpriseTerrainProvider` 构造函数参数 `options.url` 和 `options.metadata`、`GoogleEarthEnterpriseTerrainProvider.ready` 以及 `GoogleEarthEnterpriseTerrainProvider.readyPromise` 已被移除。请改用 `GoogleEarthEnterpriseTerrainProvider.fromMetadata`。
- `VRTheWorldTerrainProvider` constructor parameter `options.url`, `VRTheWorldTerrainProvider.ready`, and `VRTheWorldTerrainProvider.readyPromise` have been removed. Use `VRTheWorldTerrainProvider.fromUrl` instead.
  `VRTheWorldTerrainProvider` 构造函数参数 `options.url`、`VRTheWorldTerrainProvider.ready` 以及 `VRTheWorldTerrainProvider.readyPromise` 已被移除。请改用 `VRTheWorldTerrainProvider.fromUrl`。
- `createWorldTerrain` was removed. Use `createWorldTerrainAsync` instead.
  `createWorldTerrain` 已被移除。请改用 `createWorldTerrainAsync`。
- `Cesium3DTileset` constructor parameter `options.url`, `Cesium3DTileset.ready`, and `Cesium3DTileset.readyPromise` have been removed. Use `Cesium3DTileset.fromUrl` instead.
  `Cesium3DTileset` 构造函数参数 `options.url`、`Cesium3DTileset.ready` 以及 `Cesium3DTileset.readyPromise` 已被移除。请改用 `Cesium3DTileset.fromUrl`。
- `createOsmBuildings` was removed. Use `createOsmBuildingsAsync` instead.
  `createOsmBuildings` 已被移除。请改用 `createOsmBuildingsAsync`。
- `Model.fromGltf`, `Model.readyPromise`, and `Model.texturesLoadedPromise` have been removed. Use `Model.fromGltfAsync`, `Model.readyEvent`, `Model.errorEvent`, and `Model.texturesReadyEvent` instead. For example:
  `Model.fromGltf`、`Model.readyPromise` 和 `Model.texturesLoadedPromise` 已被移除。请改用 `Model.fromGltfAsync`、`Model.readyEvent`、`Model.errorEvent` 和 `Model.texturesReadyEvent`。例如：
  ```js
  try {
    const model = await Cesium.Model.fromGltfAsync({
      url: "../../SampleData/models/CesiumMan/Cesium_Man.glb",
    });
    viewer.scene.primitives.add(model);
    model.readyEvent.addEventListener(() => {
      // model is ready for rendering
    });
  } catch (error) {
    console.log(`Failed to load model. ${error}`);
  }
  ```
- `I3SDataProvider` construction parameter `options.url`, `I3SDataProvider.ready`, and `I3SDataProvider.readyPromise` have been removed. Use `I3SDataProvider.fromUrl` instead.
  `I3SDataProvider` 构造参数 `options.url`、`I3SDataProvider.ready` 以及 `I3SDataProvider.readyPromise` 已被移除。请改用 `I3SDataProvider.fromUrl`。
- `TimeDynamicPointCloud.readyPromise` was removed. Use `TimeDynamicPointCloud.frameFailed` to track any errors.
  `TimeDynamicPointCloud.readyPromise` 已被移除。请改用 `TimeDynamicPointCloud.frameFailed` 追踪任何错误。
- `VoxelProvider.ready` and `VoxelProvider.readyPromise` have been removed.
  `VoxelProvider.ready` 和 `VoxelProvider.readyPromise` 已被移除。
- `VoxelPrimitive.readyPromise` have been removed.
  `VoxelPrimitive.readyPromise` 已被移除。
- `Cesium3DTilesVoxelProvider` construction parameter `options.url`, `Cesium3DTilesVoxelProvider.ready`, and `Cesium3DTilesVoxelProvider.readyPromise` have been removed. Use `Cesium3DTilesVoxelProvider.fromUrl` instead.
  `Cesium3DTilesVoxelProvider` 构造参数 `options.url`、`Cesium3DTilesVoxelProvider.ready` 以及 `Cesium3DTilesVoxelProvider.readyPromise` 已被移除。请改用 `Cesium3DTilesVoxelProvider.fromUrl`。
- `Primitive.readyPromise`, `ClassificationPrimitive.readyPromise`, `GroundPrimitive.readyPromise`, and `GroundPolylinePrimitive.readyPromise` have been removed. Wait for `Primitive.ready`, `ClassificationPrimitive.ready`, `GroundPrimitive.ready`, or `GroundPolylinePrimitive.ready` to return true instead.
  `Primitive.readyPromise`、`ClassificationPrimitive.readyPromise`、`GroundPrimitive.readyPromise` 以及 `GroundPolylinePrimitive.readyPromise` 已被移除。请改等待 `Primitive.ready`、`ClassificationPrimitive.ready`、`GroundPrimitive.ready` 或 `GroundPolylinePrimitive.ready` 返回 true。
- `CreditDisplay.addCredit`, `CreditDisplay.addDefaultCredit`, and `CreditDisplay.removeDefaultCredit` have been removed. Use `CreditDisplay.addCreditToNextFrame`, `CreditDisplay.addStaticCredit`, and `CreditDisplay.removeStaticCredit` respectively instead.
  `CreditDisplay.addCredit`、`CreditDisplay.addDefaultCredit` 和 `CreditDisplay.removeDefaultCredit` 已被移除。请分别改用 `CreditDisplay.addCreditToNextFrame`、`CreditDisplay.addStaticCredit` 和 `CreditDisplay.removeStaticCredit`。

#### Additions :tada:

- Added `Cesium3DTileset.cacheBytes` and `Cesium3DTileset.maximumCacheOverflowBytes` to better control memory usage. To replicate previous behavior, convert `maximumMemoryUsage` from MB to bytes, assign the value to `cacheBytes`, and set `maximumCacheOverflowBytes = Number.MAX_VALUE`
  新增 `Cesium3DTileset.cacheBytes` 和 `Cesium3DTileset.maximumCacheOverflowBytes` 以更好地控制内存占用。若要还原之前的行为，可将 `maximumMemoryUsage` 从 MB 转换为字节（bytes），将该值赋予 `cacheBytes`，并设置 `maximumCacheOverflowBytes = Number.MAX_VALUE`。

#### Fixes :wrench:

- Fixed crash in `CzmlDataSource` when a 3D Tileset entity is hidden. [#11357](https://github.com/CesiumGS/cesium/issues/11357)
  修复了当 3D Tileset 实体被隐藏时 `CzmlDataSource` 崩溃的问题。[#11357](https://github.com/CesiumGS/cesium/issues/11357)
- Fixed `PostProcessStage` crash affecting point clouds rendered with attenuation. [#11339](https://github.com/CesiumGS/cesium/issues/11339)
  修复了影响带衰减渲染的点云（point clouds）时 `PostProcessStage` 崩溃的问题。[#11339](https://github.com/CesiumGS/cesium/issues/11339)
- Fixed a race condition when loading cut-out terrain. [#11382](https://github.com/CesiumGS/cesium/pull/11382)
  修复了加载挖空/开挖地形（cut-out terrain）时的竞态条件问题。[#11382](https://github.com/CesiumGS/cesium/pull/11382)
- Fixed debug label rendering in `Cesium3dTilesInspector`. [#11355](https://github.com/CesiumGS/cesium/issues/11355)
  修复了 `Cesium3dTilesInspector` 中的调试标签渲染问题。[#11355](https://github.com/CesiumGS/cesium/issues/11355)
- Fixed credits for imagery layer shows up even when layer is hidden. [#11340](https://github.com/CesiumGS/cesium/issues/11340)
  修复了即使影像图层处于隐藏状态，其署名信息（credits）仍会显示的问题。[#11340](https://github.com/CesiumGS/cesium/issues/11340)
- Fixed Insufficient buffer size thrown by rendering 3dtiles. [#11358](https://github.com/CesiumGS/cesium/pull/11358)
  修复了渲染 3D Tiles 时抛出缓冲区大小不足（Insufficient buffer size）的问题。[#11358](https://github.com/CesiumGS/cesium/pull/11358)

#### Deprecated :hourglass_flowing_sand:

- `Cesium3DTileset.maximumMemoryUsage` has been deprecated in CesiumJS 1.107. It will be removed in 1.110. Use `Cesium3DTileset.cacheBytes` and `Cesium3DTileset.maximumCacheOverflowBytes` instead. [#11310](https://github.com/CesiumGS/cesium/pull/11310)
  `Cesium3DTileset.maximumMemoryUsage` 已在 CesiumJS 1.107 中被废弃，并将于 1.110 中移除。请改用 `Cesium3DTileset.cacheBytes` 和 `Cesium3DTileset.maximumCacheOverflowBytes`。[#11310](https://github.com/CesiumGS/cesium/pull/11310)

### @cesium/widgets

#### Breaking Changes :mega:

- `Viewer` constructor option `options.imageryProvider` has been deprecated in CesiumJS 1.104. It will be removed in 1.107. Use `options.baseLayer` instead.
  `Viewer` 构造函数选项 `options.imageryProvider` 已在 CesiumJS 1.104 中废弃，并于 1.107 中移除。请改用 `options.baseLayer`。

## 1.106.1 - 2023-06-02

This is an npm-only release to fix a dependency issue published in 1.106

这是一个仅限 npm 的补丁发布，用于修复 1.106 中发布的依赖问题。

## 1.106 - 2023-06-01

### @cesium/engine

#### Fixes :wrench:

- Fixed label background rendering. [#11293](https://github.com/CesiumGS/cesium/pull/11293)
  修复了文本标签背景渲染的问题。[#11293](https://github.com/CesiumGS/cesium/pull/11293)
- Fixed color creation from CSS color string with modern "space-separated" syntax. [#11271](https://github.com/CesiumGS/cesium/pull/11271)
  修复了使用现代“空格分隔”（space-separated）语法的 CSS 颜色字符串创建颜色时的问题。[#11271](https://github.com/CesiumGS/cesium/pull/11271)
- Fixed tracked entity camera controls. [#11286](https://github.com/CesiumGS/cesium/issues/11286)
  修复了相机跟踪实体（tracked entity）时的控制问题。[#11286](https://github.com/CesiumGS/cesium/issues/11286)
- Fixed a race condition when loading cut-out terrain. [#11296](https://github.com/CesiumGS/cesium/pull/11296)
  修复了加载挖空/开挖地形（cut-out terrain）时的竞态条件问题。[#11296](https://github.com/CesiumGS/cesium/pull/11296)
- Fixed async behavior for custom terrain and imagery providers. [#11274](https://github.com/CesiumGS/cesium/issues/11274)
  修复了自定义地形和影像提供者的异步行为问题。[#11274](https://github.com/CesiumGS/cesium/issues/11274)

## 1.105.2 - 2023-05-15

- This is an npm-only release to fix a dependency issue published in 1.105.1.
  这是一个仅限 npm 的补丁发布，用于修复 1.105.1 中发布的依赖问题。

## 1.105.1 - 2023-05-10

### @cesium/engine

#### Additions :tada:

- Added `createGooglePhotorealistic3DTileset` to create a 3D tileset streaming Google Photorealistic 3D Tiles.
  新增 `createGooglePhotorealistic3DTileset`，用于创建流式传输 Google Photorealistic 3D Tiles 的 3D 瓦片集。
- Added `GoogleMaps` for managing credentials when loading data from the Google Map Tiles API.
  新增 `GoogleMaps` 类，用于在从 Google Map Tiles API 加载数据时管理凭据信息。

#### Fixes :wrench:

- Improved camera controls when globe is off. [#7171](https://github.com/CesiumGS/cesium/issues/7171)
  改进了关闭地球（globe 为 off）时的相机控制体验。[#7171](https://github.com/CesiumGS/cesium/issues/7171)

## 1.105 - 2023-05-01

### @cesium/engine

#### Additions :tada:

- Added `ArcGisMapServerImagery.fromBasemapType`, and `ArcGisBaseMapType`, and `ArcGisMapService` for ease of use with the latest ArcGIS Imagery API.[#11098](https://github.com/CesiumGS/cesium/pull/11098)
  新增 `ArcGisMapServerImagery.fromBasemapType`、`ArcGisBaseMapType` 和 `ArcGisMapService`，以便更方便地与最新的 ArcGIS Imagery API 配合使用。[#11098](https://github.com/CesiumGS/cesium/pull/11098)
- Added `CesiumWidget.creditDisplay` to access the onscreen and lightbox credits. [#11241](https://github.com/CesiumGS/cesium/pull/11241)
  新增 `CesiumWidget.creditDisplay`，用于访问屏幕上和灯箱中的署名信息（credits）。[#11241](https://github.com/CesiumGS/cesium/pull/11241)
- Added `CreditDisplay.addStaticCredit` and `CreditDisplay.removeStaticCredit` such that `Credit.showOnScreen` value is taken into account. [#6215](https://github.com/CesiumGS/cesium/issues/6215)
  新增 `CreditDisplay.addStaticCredit` 和 `CreditDisplay.removeStaticCredit`，使得 `Credit.showOnScreen` 属性值能够被正确识别。[#6215](https://github.com/CesiumGS/cesium/issues/6215)
- Added `options.gltfCallback` to `Model.loadGltfAsync` to allow apps to access the loaded glTF JSON. [#11240](https://github.com/CesiumGS/cesium/pull/11240)
  在 `Model.loadGltfAsync` 中新增 `options.gltfCallback` 选项，允许应用程序访问已加载的 glTF JSON 数据。[#11240](https://github.com/CesiumGS/cesium/pull/11240)
- Added `GeocoderService.credit` and and `attributions` property to `GeocoderService.Result` to allow for geocoder services to attribute results. [#11256](https://github.com/CesiumGS/cesium/pull/11256)
  新增 `GeocoderService.credit` 以及在 `GeocoderService.Result` 中新增 `attributions` 属性，以支持地理编码服务为结果添加版权署名。[#11256](https://github.com/CesiumGS/cesium/pull/11256)

#### Fixes :wrench:

- Fixed Repeated URI parsing slows 3D Tiles performance [#11197](https://github.com/CesiumGS/cesium/issues/11197). Together with [#11211](https://github.com/CesiumGS/cesium/pull/11211), this can reduce tile parsing time by as much as 25% on large tilesets
  修复了重复解析 URI 导致 3D Tiles 性能下降的问题 [#11197](https://github.com/CesiumGS/cesium/issues/11197)。结合 [#11211](https://github.com/CesiumGS/cesium/pull/11211)，在大型瓦片集上可减少高达 25% 的瓦片解析时间。
- Fixed atmosphere rendering performance issue. [10510](https://github.com/CesiumGS/cesium/issues/10510)
  修复了大气层渲染性能问题。[10510](https://github.com/CesiumGS/cesium/issues/10510)
- Fixed crashing when zooming to an entity without globe present. [#10957](https://github.com/CesiumGS/cesium/pull/11226)
  修复了在未显示地球时缩放至实体（zooming to an entity）导致程序崩溃的问题。[#10957](https://github.com/CesiumGS/cesium/pull/11226)
- Fixed model rendering when emissiveTexture is defined and emissiveFactor is not. [#11215](https://github.com/CesiumGS/cesium/pull/11215)
  修复了当定义了 `emissiveTexture`（自发光纹理）而未定义 `emissiveFactor` 时的模型渲染问题。[#11215](https://github.com/CesiumGS/cesium/pull/11215)
- Fixed issue with calling `switchToOrthographicFunction` and `camera.flyTo` in immediate succession. [#11210](https://github.com/CesiumGS/cesium/pull/11210)
  修复了紧接着相继调用 `switchToOrthographicFunction` 和 `camera.flyTo` 时出现的问题。[#11210](https://github.com/CesiumGS/cesium/pull/11210)
- Fixed an issue when zooming in an orthographic frustum. [#11206](https://github.com/CesiumGS/cesium/pull/11206)
  修复了在正交视锥体（orthographic frustum）下进行缩放时的问题。[#11206](https://github.com/CesiumGS/cesium/pull/11206)
- Fixed a crash when Cesium3DTileStyle's scaleByDistance, translucencyByDistance or distanceDisplayCondition set to StyleExpression
  which returns `undefined`. [#11228](https://github.com/CesiumGS/cesium/pull/11228)
  修复了当 `Cesium3DTileStyle` 的 `scaleByDistance`、`translucencyByDistance` 或 `distanceDisplayCondition` 设置为返回 `undefined` 的 `StyleExpression` 时发生崩溃的问题。[#11228](https://github.com/CesiumGS/cesium/pull/11228)
- Fixed handling of `out_FragColor` layout declarations when translating shaders to WebGL1. [#11230](https://github.com/CesiumGS/cesium/pull/11230)
  修复了在将着色器转换为 WebGL1 时对 `out_FragColor` 布局声明的处理问题。[#11230](https://github.com/CesiumGS/cesium/pull/11230)
- Fixed a problem with Ambient Occlusion that affected some MacOS hardware. [#10106](https://github.com/CesiumGS/cesium/issues/10106)
  修复了在部分 macOS 硬件设备上影响环境光遮蔽（Ambient Occlusion）的问题。[#10106](https://github.com/CesiumGS/cesium/issues/10106)
- Fixed UniformType.MAT3 value for custom shaders. [#11235](https://github.com/CesiumGS/cesium/pull/11235).
  修复了自定义着色器中 `UniformType.MAT3` 的值。[#11235](https://github.com/CesiumGS/cesium/pull/11235)。

#### Deprecated :hourglass_flowing_sand:

- `CreditDisplay.addCredit`, `CreditDisplay.addDefaultCredit`, and `CreditDisplay.removeDefaultCredit` have been deprecated in CesiumJS 1.105. They will be removed in 1.107. Use `CreditDisplay.addCreditToNextFrame`, `CreditDisplay.addStaticCredit`, and `CreditDisplay.removeStaticCredit` respectively instead. [#11241](https://github.com/CesiumGS/cesium/pull/11241)
  `CreditDisplay.addCredit`、`CreditDisplay.addDefaultCredit` 和 `CreditDisplay.removeDefaultCredit` 已在 CesiumJS 1.105 中被废弃，并将于 1.107 中移除。请分别改用 `CreditDisplay.addCreditToNextFrame`、`CreditDisplay.addStaticCredit` 和 `CreditDisplay.removeStaticCredit`。[#11241](https://github.com/CesiumGS/cesium/pull/11241)

### @cesium/widgets

#### Additions :tada:

- Added `Viewer.creditDisplay` to access the onscreen and lightbox credits. [#11241](https://github.com/CesiumGS/cesium/pull/11241)
  新增 `Viewer.creditDisplay`，用于访问屏幕上和灯箱中的署名信息（credits）。[#11241](https://github.com/CesiumGS/cesium/pull/11241)
- The `Geocoder` widget will now display attributions onscreen or in the lightbox for geocoder results if present, otherwise a default credit from a geocoder service if one is provided. [#11256](https://github.com/CesiumGS/cesium/pull/11256)
  `Geocoder`（地理编码）控件现在将在屏幕上或灯箱中显示地理编码结果的版权署名（若存在），否则在地理编码服务提供了默认署名时显示该默认署名。[#11256](https://github.com/CesiumGS/cesium/pull/11256)

#### Fixes :wrench:

- Fixed missing `ContextOptions` in generated TypeScript definitions. [10963](https://github.com/CesiumGS/cesium/issues/10963)
  修复了生成的 TypeScript 类型定义中缺失 `ContextOptions` 的问题。[10963](https://github.com/CesiumGS/cesium/issues/10963)

## 1.104 - 2023-04-03

### Major Announcements :loudspeaker:

- Starting with CesiumJS 1.104 The `readyPromise` pattern has been deprecated across the API. It will be removed in CesiumJS 1.107. This has been done to facilitate better asynchronous flow and error handling. For example:
  从 CesiumJS 1.104 开始，整个 API 中已废弃 `readyPromise` 模式。该模式将于 CesiumJS 1.107 中移除。此改动旨在提供更优的异步流程和错误处理机制。例如：

```js
try {
  const tileset = await Cesium.Cesium3DTileset.fromUrl(url);
  viewer.scene.primitives.add(tileset);
} catch (error) {
  console.log(`Failed to load tileset: ${error}`);
}
```

### @cesium/engine

#### Additions :tada:

- Added `ArcGisMapServerImageryProvider.fromUrl`, `ArcGISTiledElevationTerrainProvider.fromUrl`, `BingMapsImageryProvider.fromUrl`, `CesiumTerrainProvider.fromUrl`, `CesiumTerrainProvider.fromIonAssetId`, `GoogleEarthEnterpriseMetadata.fromUrl`, `GoogleEarthEnterpriseImageryProvider.fromMetadata`, `GoogleEarthEnterpriseMapsProvider.fromUrl`, `GoogleEarthEnterpriseTerrainProvider.fromMetadata`, `ImageryLayer.fromProviderAsync`, `IonImageryProvider.fromAssetId`, `SingleTileImageryProvider.fromUrl`, `Terrain`, `TileMapServiceImageryProvider.fromUrl`, `VRTheWorldTerrainProvider.fromUrl`, `createWorldTerrainAsync`, `Cesium3DTileset.fromUrl`, `Cesium3DTileset.fromIonAssetId`, `createOsmBuildingsAsync`, `Model.fromGltfAsync`, `Model.readyEvent`, `Model.errorEvent`,`Model.texturesReadyEvent`, `I3SDataProvider.fromUrl`, and `Cesium3DTilesVoxelProvider.fromUrl` for better async flow and error handling. [#11059](https://github.com/CesiumGS/cesium/pull/11059)
  新增 `ArcGisMapServerImageryProvider.fromUrl`、`ArcGISTiledElevationTerrainProvider.fromUrl`、`BingMapsImageryProvider.fromUrl`、`CesiumTerrainProvider.fromUrl`、`CesiumTerrainProvider.fromIonAssetId`、`GoogleEarthEnterpriseMetadata.fromUrl`、`GoogleEarthEnterpriseImageryProvider.fromMetadata`、`GoogleEarthEnterpriseMapsProvider.fromUrl`、`GoogleEarthEnterpriseTerrainProvider.fromMetadata`、`ImageryLayer.fromProviderAsync`、`IonImageryProvider.fromAssetId`、`SingleTileImageryProvider.fromUrl`、`Terrain`、`TileMapServiceImageryProvider.fromUrl`、`VRTheWorldTerrainProvider.fromUrl`、`createWorldTerrainAsync`、`Cesium3DTileset.fromUrl`、`Cesium3DTileset.fromIonAssetId`、`createOsmBuildingsAsync`、`Model.fromGltfAsync`、`Model.readyEvent`、`Model.errorEvent`、`Model.texturesReadyEvent`、`I3SDataProvider.fromUrl` 和 `Cesium3DTilesVoxelProvider.fromUrl`，以提供更优的异步流程和错误处理机制。[#11059](https://github.com/CesiumGS/cesium/pull/11059)
- Send `X-Cesium-*` headers to requests to cesium ion. [#11200](https://github.com/CesiumGS/cesium/pull/11200)
  向 Cesium ion 的请求中发送 `X-Cesium-*` 请求头。[#11200](https://github.com/CesiumGS/cesium/pull/11200)

#### Fixes :wrench:

- Fixed issue where passing `children` in the Entity constructor options will override children. [#11101](https://github.com/CesiumGS/cesium/issues/11101)
  修复了在 Entity 构造函数选项中传入 `children` 会覆盖原有子级的问题。[#11101](https://github.com/CesiumGS/cesium/issues/11101)
- Fixed error type to be `RequestErrorEvent` in `Resource.retryCallback`. [#11177](https://github.com/CesiumGS/cesium/pull/11177)
  修复了 `Resource.retryCallback` 中的错误类型，现为 `RequestErrorEvent`。[#11177](https://github.com/CesiumGS/cesium/pull/11177)
- Fixed issue when render `OrthographicFrustum` geometry by `DebugCameraPrimitive`. [#11159](https://github.com/CesiumGS/cesium/issues/11159)
  修复了通过 `DebugCameraPrimitive` 渲染 `OrthographicFrustum`（正交视锥体）几何体时的问题。[#11159](https://github.com/CesiumGS/cesium/issues/11159)
- Fixed ion URL in `RequestScheduler` throttling overrides. [#11193](https://github.com/CesiumGS/cesium/pull/11193)
  修复了 `RequestScheduler` 限流覆盖配置中的 ion URL 问题。[#11193](https://github.com/CesiumGS/cesium/pull/11193)
- Fixed `SingleTileImageryProvider` fetching image when `show` is `false` by allowing lazy-loading for `SingleTileImageryProvider` if `tileWidth` and `tileHeight` are provided to the constructor. [#9529](https://github.com/CesiumGS/cesium/issues/9529)
  修复了当 `show` 为 `false` 时 `SingleTileImageryProvider` 仍会获取图像的问题，如果在构造函数中提供了 `tileWidth` 和 `tileHeight`，则允许 `SingleTileImageryProvider` 进行延迟加载。[#9529](https://github.com/CesiumGS/cesium/issues/9529)
- Fixed various race conditions from async operations. [#10909](https://github.com/CesiumGS/cesium/issues/10909)
  修复了异步操作引发的若干竞态条件问题。[#10909](https://github.com/CesiumGS/cesium/issues/10909)

#### Deprecated :hourglass_flowing_sand:

- `CesiumWidget` constructor option `options.imageryProvider` has been deprecated in CesiumJS 1.104. It will be removed in 1.107. Use `options.baseLayer` instead.
  `CesiumWidget` 构造函数选项 `options.imageryProvider` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `options.baseLayer`。
- `ImageryProvider.ready` and `ImageryProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107.
  `ImageryProvider.ready` 和 `ImageryProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。
- `ImageryProvider.defaultAlpha`, `ImageryProvider.defaultNightAlpha`, `ImageryProvider.defaultDayAlpha`, `ImageryProvider.defaultBrightness`, `ImageryProvider.defaultContrast`, `ImageryProvider.defaultHue`, `ImageryProvider.defaultSaturation`, `ImageryProvider.defaultGamma`, `ImageryProvider.defaultMinificationFilter`, `ImageryProvider.defaultMagnificationFilter` were deprecated in CesiumJS 1.104. They will be removed in 1.107. Use `ImageryLayer.alpha`, `ImageryLayer.nightAlpha`, `ImageryLayer.dayAlpha`, `ImageryLayer.brightness`, `ImageryLayer.contrast`, `ImageryLayer.hue`, `ImageryLayer.saturation`, `ImageryLayer.gamma`, `ImageryLayer.minificationFilter`, `ImageryLayer.magnificationFilter`instead.
  `ImageryProvider.defaultAlpha`、`ImageryProvider.defaultNightAlpha`、`ImageryProvider.defaultDayAlpha`、`ImageryProvider.defaultBrightness`、`ImageryProvider.defaultContrast`、`ImageryProvider.defaultHue`、`ImageryProvider.defaultSaturation`、`ImageryProvider.defaultGamma`、`ImageryProvider.defaultMinificationFilter`、`ImageryProvider.defaultMagnificationFilter` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `ImageryLayer.alpha`、`ImageryLayer.nightAlpha`、`ImageryLayer.dayAlpha`、`ImageryLayer.brightness`、`ImageryLayer.contrast`、`ImageryLayer.hue`、`ImageryLayer.saturation`、`ImageryLayer.gamma`、`ImageryLayer.minificationFilter`、`ImageryLayer.magnificationFilter`。
- `ImageryLayer.getViewableRectangle` was deprecated in CesiumJS 1.104. It will be removed in 1.107. Use `ImageryLayer.getImageryRectangle` instead.
  `ImageryLayer.getViewableRectangle` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `ImageryLayer.getImageryRectangle`。
- `ArcGisMapServerImageryProvider` constructor parameter `url`,`ArcGisMapServerImageryProvider.ready`, and `ArcGisMapServerImageryProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107. Use `ArcGisMapServerImageryProvider.fromUrl` instead.
  `ArcGisMapServerImageryProvider` 构造函数参数 `url`、`ArcGisMapServerImageryProvider.ready` 以及 `ArcGisMapServerImageryProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `ArcGisMapServerImageryProvider.fromUrl`。
- `BingMapsImageryProvider` constructor parameter `url`,`BingMapsImageryProvider.ready`, and `BingMapsImageryProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107. Use `BingMapsImageryProvider.fromUrl` instead.
  `BingMapsImageryProvider` 构造函数参数 `url`、`BingMapsImageryProvider.ready` 以及 `BingMapsImageryProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `BingMapsImageryProvider.fromUrl`。
- `GoogleEarthEnterpriseImageryProvider` constructor parameters `options.url` and `options.metadata`, `GoogleEarthEnterpriseImageryProvider.ready`, and `GoogleEarthEnterpriseImageryProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107. Use `GoogleEarthEnterpriseImageryProvider.fromMetadata` instead.
  `GoogleEarthEnterpriseImageryProvider` 构造函数参数 `options.url` 和 `options.metadata`、`GoogleEarthEnterpriseImageryProvider.ready` 以及 `GoogleEarthEnterpriseImageryProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `GoogleEarthEnterpriseImageryProvider.fromMetadata`。
- `GoogleEarthEnterpriseMapsProvider` constructor parameters `options.url` and `options.channel`, `GoogleEarthEnterpriseMapsProvider.ready`, and `GoogleEarthEnterpriseMapsProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107. Use `GoogleEarthEnterpriseMapsProvider.fromUrl` instead.
  `GoogleEarthEnterpriseMapsProvider` 构造函数参数 `options.url` 和 `options.channel`、`GoogleEarthEnterpriseMapsProvider.ready` 以及 `GoogleEarthEnterpriseMapsProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `GoogleEarthEnterpriseMapsProvider.fromUrl`。
- `GridImageryProvider.ready` and `GridImageryProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107.
  `GridImageryProvider.ready` 和 `GridImageryProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。
- `IonImageryProvider` constructor parameter `assetId`,`BIonImageryProvider.ready`, and `IonImageryProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107. Use `IonImageryProvider.fromAssetId` instead.
  `IonImageryProvider` 构造函数参数 `assetId`、`BIonImageryProvider.ready` 以及 `IonImageryProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `IonImageryProvider.fromAssetId`。
- `MapboxImageryProvider.ready` and `MapboxImageryProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107.
  `MapboxImageryProvider.ready` 和 `MapboxImageryProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。
- `MapboxStyleImageryProvider.ready` and `MapboxStyleImageryProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107.
  `MapboxStyleImageryProvider.ready` 和 `MapboxStyleImageryProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。
- `OpenStreetMapImageryProvider.ready` and `OpenStreetMapImageryProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107.
  `OpenStreetMapImageryProvider.ready` 和 `OpenStreetMapImageryProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。
- `SingleTileImageryProvider` constructor parameters `options.tileHeight` and `options.tileWidth` became required in CesiumJS 1.104. Omitting these properties will result in an error in 1.107. Provide `options.tileHeight` and `options.tileWidth`, or use `SingleTileImageryProvider.fromUrl` instead.
  `SingleTileImageryProvider` 构造函数参数 `options.tileHeight` 和 `options.tileWidth` 在 CesiumJS 1.104 中变为必填项。在 1.107 中若忽略这些属性将导致报错。请提供 `options.tileHeight` 和 `options.tileWidth`，或者改用 `SingleTileImageryProvider.fromUrl`。
- `SingleTileImageryProvider.ready` and `SingleTileImageryProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107. Use `SingleTileImageryProvider.fromUrl` instead.
  `SingleTileImageryProvider.ready` 和 `SingleTileImageryProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `SingleTileImageryProvider.fromUrl`。
- `TileCoordinatesImageryProvider.ready` and `TileCoordinatesImageryProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107.
  `TileCoordinatesImageryProvider.ready` 和 `TileCoordinatesImageryProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。
- `TileMapServiceImageryProvider` constructor parameter `options.url`, `TileMapServiceImageryProvider.ready`, and `TileMapServiceImageryProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107. Use `TileMapServiceImageryProvider.fromUrl` instead.
  `TileMapServiceImageryProvider` 构造函数参数 `options.url`、`TileMapServiceImageryProvider.ready` 以及 `TileMapServiceImageryProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `TileMapServiceImageryProvider.fromUrl`。
- `UrlTemplateImageryProvider.reinitialize`, `UrlTemplateImageryProvider.ready`, and `UrlTemplateImageryProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107.
  `UrlTemplateImageryProvider.reinitialize`、`UrlTemplateImageryProvider.ready` 以及 `UrlTemplateImageryProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。
- `WebMapServiceImageryProvider.ready`, and `WebMapServiceImageryProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107.
  `WebMapServiceImageryProvider.ready` 和 `WebMapServiceImageryProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。
- `WebMapTileServiceImageryProvider.ready`, and `WebMapTileServiceImageryProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107.
  `WebMapTileServiceImageryProvider.ready` 和 `WebMapTileServiceImageryProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。
- `TerrainProvider.ready` and `TerrainProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107.
  `TerrainProvider.ready` 和 `TerrainProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。
- `createWorldImagery` was deprecated in CesiumJS 1.104. It will be removed in 1.107. Use `createWorldImageryAsync` instead.
  `createWorldImagery` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `createWorldImageryAsync`。
- `ArcGISTiledElevationTerrainProvider` constructor parameter `options.url`, `ArcGISTiledElevationTerrainProvider.ready`, and `ArcGISTiledElevationTerrainProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107. Use `ArcGISTiledElevationTerrainProvider.fromUrl` instead.
  `ArcGISTiledElevationTerrainProvider` 构造函数参数 `options.url`、`ArcGISTiledElevationTerrainProvider.ready` 以及 `ArcGISTiledElevationTerrainProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `ArcGISTiledElevationTerrainProvider.fromUrl`。
- `CesiumTerrainProvider` constructor parameter `options.url`, `CesiumTerrainProvider.ready`, and `CesiumTerrainProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107. Use `CesiumTerrainProvider.fromIonAssetId` or `CesiumTerrainProvider.fromUrl` instead.
  `CesiumTerrainProvider` 构造函数参数 `options.url`、`CesiumTerrainProvider.ready` 以及 `CesiumTerrainProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `CesiumTerrainProvider.fromIonAssetId` 或 `CesiumTerrainProvider.fromUrl`。
- `CustomHeightmapTerrainProvider.ready`, and `CustomHeightmapTerrainProvider.readyPromise` were deprecated in CesiumJS 1.104.
  `CustomHeightmapTerrainProvider.ready` 和 `CustomHeightmapTerrainProvider.readyPromise` 已在 CesiumJS 1.104 中废弃。
- `EllipsoidTerrainProvider.ready`, and `EllipsoidTerrainProvider.readyPromise` were deprecated in CesiumJS 1.104.
  `EllipsoidTerrainProvider.ready` 和 `EllipsoidTerrainProvider.readyPromise` 已在 CesiumJS 1.104 中废弃。
- `GoogleEarthEnterpriseMetadata` constructor parameter `options.url` and `GoogleEarthEnterpriseMetadata.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107. Use `GoogleEarthEnterpriseMetadata.fromUrl` instead.
  `GoogleEarthEnterpriseMetadata` 构造函数参数 `options.url` 以及 `GoogleEarthEnterpriseMetadata.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `GoogleEarthEnterpriseMetadata.fromUrl`。
- `GoogleEarthEnterpriseTerrainProvider` constructor parameters `options.url` and `options.metadata`, `GoogleEarthEnterpriseTerrainProvider.ready`, and `GoogleEarthEnterpriseTerrainProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107. Use `GoogleEarthEnterpriseTerrainProvider.fromMetadata` instead.
  `GoogleEarthEnterpriseTerrainProvider` 构造函数参数 `options.url` 和 `options.metadata`、`GoogleEarthEnterpriseTerrainProvider.ready` 以及 `GoogleEarthEnterpriseTerrainProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `GoogleEarthEnterpriseTerrainProvider.fromMetadata`。
- `VRTheWorldTerrainProvider` constructor parameter `options.url`, `VRTheWorldTerrainProvider.ready`, and `VRTheWorldTerrainProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107. Use `VRTheWorldTerrainProvider.fromUrl` instead.
  `VRTheWorldTerrainProvider` 构造函数参数 `options.url`、`VRTheWorldTerrainProvider.ready` 以及 `VRTheWorldTerrainProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `VRTheWorldTerrainProvider.fromUrl`。
- `createWorldTerrain` was deprecated in CesiumJS 1.104. It will be removed in 1.107. Use `createWorldTerrainAsync` instead.
  `createWorldTerrain` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `createWorldTerrainAsync`。
- `Cesium3DTileset` constructor parameter `options.url`, `Cesium3DTileset.ready`, and `Cesium3DTileset.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107. Use `Cesium3DTileset.fromUrl` instead.
  `Cesium3DTileset` 构造函数参数 `options.url`、`Cesium3DTileset.ready` 以及 `Cesium3DTileset.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `Cesium3DTileset.fromUrl`。
- `createOsmBuildings` was deprecated in CesiumJS 1.104. It will be removed in 1.107. Use `createOsmBuildingsAsync` instead.
  `createOsmBuildings` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `createOsmBuildingsAsync`。
- `Model.fromGltf`, `Model.readyPromise`, and `Model.texturesLoadedPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107. Use `Model.fromGltfAsync`, `Model.readyEvent`, `Model.errorEvent`, and `Model.texturesReadyEvent` instead. For example:
  `Model.fromGltf`、`Model.readyPromise` 和 `Model.texturesLoadedPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `Model.fromGltfAsync`、`Model.readyEvent`、`Model.errorEvent` 和 `Model.texturesReadyEvent`。例如：
  ```js
  try {
    const model = await Cesium.Model.fromGltfAsync({
      url: "../../SampleData/models/CesiumMan/Cesium_Man.glb",
    });
    viewer.scene.primitives.add(model);
    model.readyEvent.addEventListener(() => {
      // model is ready for rendering
    });
  } catch (error) {
    console.log(`Failed to load model. ${error}`);
  }
  ```
- `I3SDataProvider` construction parameter `options.url`, `I3SDataProvider.ready`, and `I3SDataProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107. Use `I3SDataProvider.fromUrl` instead.
  `I3SDataProvider` 构造参数 `options.url`、`I3SDataProvider.ready` 以及 `I3SDataProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `I3SDataProvider.fromUrl`。
- `TimeDynamicPointCloud.readyPromise` was deprecated in CesiumJS 1.104. It will be removed in 1.107. Use `TimeDynamicPointCloud.frameFailed` to track any errors.
  `TimeDynamicPointCloud.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `TimeDynamicPointCloud.frameFailed` 追踪任何错误。
- `VoxelProvider.ready` and `VoxelProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107.
  `VoxelProvider.ready` 和 `VoxelProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。
- `Cesium3DTilesVoxelProvider` construction parameter `options.url`, `Cesium3DTilesVoxelProvider.ready`, and `Cesium3DTilesVoxelProvider.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107. Use `Cesium3DTilesVoxelProvider.fromUrl` instead.
  `Cesium3DTilesVoxelProvider` 构造参数 `options.url`、`Cesium3DTilesVoxelProvider.ready` 以及 `Cesium3DTilesVoxelProvider.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `Cesium3DTilesVoxelProvider.fromUrl`。
- `Primitive.readyPromise`, `ClassificationPrimitive.readyPromise`, `GroundPrimitive.readyPromise`, and `GroundPolylinePrimitive.readyPromise` were deprecated in CesiumJS 1.104. They will be removed in 1.107. Wait for `Primitive.ready`, `ClassificationPrimitive.ready`, `GroundPrimitive.ready`, or `GroundPolylinePrimitive.ready` to return true instead.
  `Primitive.readyPromise`、`ClassificationPrimitive.readyPromise`、`GroundPrimitive.readyPromise` 以及 `GroundPolylinePrimitive.readyPromise` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改等待 `Primitive.ready`、`ClassificationPrimitive.ready`、`GroundPrimitive.ready` 或 `GroundPolylinePrimitive.ready` 返回 true。

### @cesium/widgets

#### Fixes :wrench:

- Fixed Cesium.Viewer instantiated inside my lit component: CreditDisplay is missing its styles [#10907](https://github.com/CesiumGS/cesium/issues/10907)
  修复了在 Lit 组件内部实例化 `Cesium.Viewer` 时 CreditDisplay 缺失样式的问题 [#10907](https://github.com/CesiumGS/cesium/issues/10907)
- Fixed allowing `false` for `imageryProvider` in `Viewer.ConstructorOptions`. [#11179](https://github.com/CesiumGS/cesium/pull/11179)
  修复了在 `Viewer.ConstructorOptions` 中允许将 `imageryProvider` 设置为 `false` 的问题。[#11179](https://github.com/CesiumGS/cesium/pull/11179)

#### Deprecated :hourglass_flowing_sand:

- `Viewer` constructor option `options.imageryProvider` has been deprecated in CesiumJS 1.104. It will be removed in 1.107. Use `options.baseLayer` instead.
  `Viewer` 构造函数选项 `options.imageryProvider` 已在 CesiumJS 1.104 中废弃，并将于 1.107 中移除。请改用 `options.baseLayer`。

## 1.103 - 2023-03-01

### @cesium/engine

#### Additions :tada:

- Added smooth zoom with mouse wheel. [#11062](https://github.com/CesiumGS/cesium/pull/11062)
  新增鼠标滚轮平滑缩放功能。[#11062](https://github.com/CesiumGS/cesium/pull/11062)
- Enabled lighting on voxels with BOX shape. [#11076](https://github.com/CesiumGS/cesium/pull/11076)
  启用了对 BOX（长方体）形状体素（voxels）的光照支持。[#11076](https://github.com/CesiumGS/cesium/pull/11076)

#### Fixes :wrench:

- Fixed browser warning for `willReadFrequently` option. [#11025](https://github.com/CesiumGS/cesium/issues/11025)
  修复了 `willReadFrequently` 选项触发的浏览器警告。[#11025](https://github.com/CesiumGS/cesium/issues/11025)
- Replaced constructor types with primitive types in JSDoc and generated TypeScript definitions. [#11080](https://github.com/CesiumGS/cesium/pull/11080)
  在 JSDoc 和生成的 TypeScript 类型定义中，将构造函数包装类型替换为原始类型（primitive types）。[#11080](https://github.com/CesiumGS/cesium/pull/11080)
- Adjusted render order of voxels and opaque entities. [#11120](https://github.com/CesiumGS/cesium/pull/11120)
  调整了体素与不透明实体的渲染顺序。[#11120](https://github.com/CesiumGS/cesium/pull/11120)
- Fixed artifacts on edges of voxels with BOX shape. [#11050](https://github.com/CesiumGS/cesium/pull/11050)
  修复了 BOX 形状体素边缘出现的视觉伪影。[#11050](https://github.com/CesiumGS/cesium/pull/11050)
- Fixed initial textures visibility for particle systems. [#11099](https://github.com/CesiumGS/cesium/pull/11099)
  修复了粒子系统的初始纹理可见性问题。[#11099](https://github.com/CesiumGS/cesium/pull/11099)
- Fixed Primitive.getGeometryInstanceAttributes cache acquisition speed. [#11066](https://github.com/CesiumGS/cesium/issues/11066)
  修复并优化了 `Primitive.getGeometryInstanceAttributes` 的缓存获取速度。[#11066](https://github.com/CesiumGS/cesium/issues/11066)
- Fixed requestWebgl1 hint error in context. [#11082](https://github.com/CesiumGS/cesium/issues/11082)
  修复了 Context 中 `requestWebgl1` 提示报错的问题。[#11082](https://github.com/CesiumGS/cesium/issues/11082)

### @cesium/widgets

#### Fixes :wrench:

- Replaced constructor types with primitive types in JSDoc and generated TypeScript definitions. [#11080](https://github.com/CesiumGS/cesium/pull/11080)
  在 JSDoc 和生成的 TypeScript 类型定义中，将构造函数包装类型替换为原始类型（primitive types）。[#11080](https://github.com/CesiumGS/cesium/pull/11080)

## 1.102 - 2023-02-01

### Major Announcements :loudspeaker:

- CesiumJS now defaults to using a WebGL2 context for rendering. WebGL2 is widely supported on all platforms and this results in better feature support across devices, especially mobile.
  CesiumJS 现在默认使用 WebGL2 上下文进行渲染。WebGL2 在所有平台上均获得了广泛支持，这将为各种设备（尤其是移动设备）带来更好的特性支持。
  - WebGL1 is supported. If WebGL2 is not available, CesiumJS will automatically fall back to WebGL1.
    支持 WebGL1。若 WebGL2 不可用，CesiumJS 将自动回退至 WebGL1。
  - In order to work in a WebGL2 context, any custom materials, custom primitives or custom shaders will need to be upgraded to use GLSL 300.
    为了在 WebGL2 上下文中正常工作，所有自定义材质、自定义图元或自定义着色器都需要升级使用 GLSL 300。
  - Otherwise to request a WebGL 1 context, set `requestWebgl1` to `true` when providing `ContextOptions` as shown below:
    否则若需请求 WebGL 1 上下文，可在传入 `ContextOptions` 时将 `requestWebgl1` 设置为 `true`，如下所示：
    ```js
    const viewer = new Viewer("cesiumContainer", {
      contextOptions: {
        requestWebgl1: true,
      },
    });
    ```

### @cesium/engine

#### Additions :tada:

- Added `FeatureDetection.supportsWebgl2` to detect if a WebGL2 rendering context in the current browser.
  新增 `FeatureDetection.supportsWebgl2`，用于检测当前浏览器是否支持 WebGL2 渲染上下文。

#### Fixes :wrench:

- Fixed label background rendering. [#11040](https://github.com/CesiumGS/cesium/issues/11040)
  修复了文本标签背景渲染的问题。[#11040](https://github.com/CesiumGS/cesium/issues/11040)
- Fixed a bug decoding glTF Draco attributes with quantization bits above 16. [#7471](https://github.com/CesiumGS/cesium/issues/7471)
  修复了量化位数超过 16 位时解码 glTF Draco 属性的 Bug。[#7471](https://github.com/CesiumGS/cesium/issues/7471)
- Fixed an edge case in `viewer.flyTo` when flying to a imagery layer with certain terrain providers. [#10937](https://github.com/CesiumGS/cesium/issues/10937)
  修复了在使用特定地形提供者时，通过 `viewer.flyTo` 飞向影像图层的边界情况 Bug。[#10937](https://github.com/CesiumGS/cesium/issues/10937)
- Fixed a crash in terrain sampling if any points have an undefined position due to being outside the rectangle. [#10931](https://github.com/CesiumGS/cesium/pull/10931)
  修复了在地形采样中因点位于矩形区域外而导致坐标为 undefined 时程序崩溃的问题。[#10931](https://github.com/CesiumGS/cesium/pull/10931)
- Fixed a bug where scale was not being applied to the top-level tileset geometric error. [#11047](https://github.com/CesiumGS/cesium/pull/11047)
  修复了缩放未应用到顶层瓦片集几何误差（geometric error）的 Bug。[#11047](https://github.com/CesiumGS/cesium/pull/11047)
- Updating Bing Maps top page hyperlink to Bing Maps ToU hyperlink [#11049](https://github.com/CesiumGS/cesium/pull/11049)
  将 Bing Maps 首页超链接更新为 Bing Maps 使用条款（ToU）超链接。[#11049](https://github.com/CesiumGS/cesium/pull/11049)

## 1.101 - 2023-01-02

### Major Announcements :loudspeaker:

- Starting with version 1.102, CesiumJS will default to using a WebGL2 context for rendering. WebGL2 is widely supported on all platforms and this change will result in better feature support across devices, especially mobile.
  从 1.102 版本开始，CesiumJS 将默认使用 WebGL2 上下文进行渲染。WebGL2 在所有平台上均获得了广泛支持，该改动将为各种设备（尤其是移动设备）带来更好的特性支持。
  - WebGL1 will still be supported. If WebGL2 is not available, CesiumJS will automatically fall back to WebGL1.
    WebGL1 仍将继续支持。若 WebGL2 不可用，CesiumJS 将自动回退至 WebGL1。
  - In order to work in a WebGL2 context, any custom materials, custom primitive or custom shaders will need to be upgraded to use GLSL 300.
    为了在 WebGL2 上下文中正常工作，所有自定义材质、自定义图元或自定义着色器都需要升级使用 GLSL 300。
  - Otherwise to request a WebGL 1 context, set `requestWebgl1` to `true` when providing `ContextOptions` as shown below:
    否则若需请求 WebGL 1 上下文，可在传入 `ContextOptions` 时将 `requestWebgl1` 设置为 `true`，如下所示：
    ```js
    const viewer = new Viewer("cesiumContainer", {
      contextOptions: {
        requestWebgl1: true,
      },
    });
    ```

### @cesium/engine

#### Additions :tada:

- Added `vertexShadowDarkness` parameter to `Globe` to control the amount of darkness of the vertex shadow when terrain lighting is enabled. [#10914](https://github.com/CesiumGS/cesium/pull/10914)
  在 `Globe` 中新增 `vertexShadowDarkness` 参数，用于在开启地形光照时控制顶点阴影的暗度。[#10914](https://github.com/CesiumGS/cesium/pull/10914)
- Added experimental support for 3D Tiles voxels with the [`3DTILES_content_voxels`](https://github.com/CesiumGS/3d-tiles/tree/voxels/extensions/3DTILES_content_voxels) extension. The current implementation is intended for development use, as the voxel format has not yet been finalized and is subject to breaking changes without deprecation.
  通过 [`3DTILES_content_voxels`](https://github.com/CesiumGS/3d-tiles/tree/voxels/extensions/3DTILES_content_voxels) 扩展添加了对 3D Tiles 体素（voxels）的实验性支持。当前实现仅用于开发阶段，由于体素格式尚未最终定稿，后续可能会发生破坏性变更且不经弃用周期。

#### Fixes :wrench:

- Fixed a bug where the scale of a `PointPrimitive` was incorrect when `scaleByDistance` was set to a `NearFarScalar`. [#10912](https://github.com/CesiumGS/cesium/pull/10912)
  修复了当 `scaleByDistance` 设置为 `NearFarScalar` 时 `PointPrimitive` 缩放不正确的 Bug。[#10912](https://github.com/CesiumGS/cesium/pull/10912)
- Fixed glTF models with a mix of Draco and non-Draco attributes. [#10936](https://github.com/CesiumGS/cesium/pull/10936)
  修复了包含 Draco 和非 Draco 混合属性的 glTF 模型渲染问题。[#10936](https://github.com/CesiumGS/cesium/pull/10936)
- Fixed a bug where billboards with `alignedAxis` properties were not properly aligned in 2D and Columbus View. [#10965](https://github.com/CesiumGS/cesium/issues/10965)
  修复了具有 `alignedAxis` 属性的广告牌（billboard）在二维（2D）与哥伦布视图（Columbus View）下未能正确对齐的 Bug。[#10965](https://github.com/CesiumGS/cesium/issues/10965)
- Fixed a bug where \*.ktx2 image loading from a URI failed. [#10869](https://github.com/CesiumGS/cesium/pull/10869)
  修复了从 URI 加载 *.ktx2 图像失败的 Bug。[#10869](https://github.com/CesiumGS/cesium/pull/10869)
- Fixed a bug where a `Model` would sometimes disappear when loaded in Columbus View. [#10945](https://github.com/CesiumGS/cesium/pull/10945)
  修复了在哥伦布视图（Columbus View）下加载时 `Model` 有时会消失的 Bug。[#10945](https://github.com/CesiumGS/cesium/pull/10945)
- Fixed a bug where the entity collection of a `GpxDataSource` did not have the `owner` property set. [#10921](https://github.com/CesiumGS/cesium/issues/10921)
  修复了 `GpxDataSource` 的实体集合未设置 `owner` 属性的 Bug。[#10921](https://github.com/CesiumGS/cesium/issues/10921)
- Fixed the JSDoc and TypeScript definitions of arguments in `Matrix2.multiplyByScalar`, `Matrix3.multiplyByScalar`, and several functions in the `S2Cell` class. [#10899](https://github.com/CesiumGS/cesium/pull/10899)
  修复了 `Matrix2.multiplyByScalar`、`Matrix3.multiplyByScalar` 以及 `S2Cell` 类中多个函数的参数 JSDoc 和 TypeScript 类型定义。[#10899](https://github.com/CesiumGS/cesium/pull/10899)
- Fixed a bug where `result` parameters were omitted from the TypeScript definitions. [#10864](https://github.com/CesiumGS/cesium/issues/10864)
  修复了 TypeScript 类型定义中遗漏 `result` 参数的 Bug。[#10864](https://github.com/CesiumGS/cesium/issues/10864)

#### Deprecated :hourglass_flowing_sand:

- `ContextOptions.requestWebgl2` was deprecated in CesiumJS 1.101 and will be removed in 1.102. Instead, CesiumJS will default to using a WebGL2 context for rendering. Use `ContextOptions.requestWebgl1` to request a WebGL1 or WebGL2 context.
  `ContextOptions.requestWebgl2` 已在 CesiumJS 1.101 中被废弃，并将于 1.102 中移除。之后 CesiumJS 将默认使用 WebGL2 上下文进行渲染。请使用 `ContextOptions.requestWebgl1` 来请求 WebGL1 或 WebGL2 上下文。

### @cesium/widgets

#### Additions :tada:

- Added `viewerVoxelInspectorMixin` and `VoxelInspector` to support experimental 3D Tiles voxels.
  新增 `viewerVoxelInspectorMixin` 和 `VoxelInspector`，以支持实验性的 3D Tiles 体素功能。

## 1.100 - 2022-12-01

### Major Announcements :loudspeaker:

- CesiumJS is now published alongside two smaller packages `@cesium/engine` and `@cesium/widgets` [#10824](https://github.com/CesiumGS/cesium/pull/10824):
  CesiumJS 现在与两个更小的子包 `@cesium/engine` 和 `@cesium/widgets` 一起发布 [#10824](https://github.com/CesiumGS/cesium/pull/10824)：
  - The source code has been partitioned into two folders: `packages/engine` and `packages/widgets`.
    源代码已划分为两个目录：`packages/engine` 和 `packages/widgets`。
  - These workspaces packages will follow semantic versioning.
    这些工作区（workspaces）包将遵循语义化版本控制（semver）。
  - These workspaces packages will be published as ES modules with TypeScript definitions.
    这些工作区包将以附带 TypeScript 类型定义的 ES 模块（ES modules）形式发布。
  - In the combined CesiumJS release, the `Source` folder only contains the following:
    在整合发布的完整 CesiumJS 包中，`Source` 文件夹仅包含以下内容：
    - `Cesium.js`
    - `Cesium.d.ts`
    - `Assets`
    - `ThirdParty`
    - `Widgets`(CSS files only)
  - The ability to import modules and TypeScript definitions from individual files has been removed. Any imports should originate from the `cesium` module (`import { Cartesian3 } from "cesium";`) or the combined `Cesium.js` file (`import { Cartesian3 } from "Source/Cesium.js";`);
    已移除从各个单独文件中导入模块和 TypeScript 类型定义的功能。所有导入都应来源于 `cesium` 模块（`import { Cartesian3 } from "cesium";`）或整合的 `Cesium.js` 文件（`import { Cartesian3 } from "Source/Cesium.js";`）。

### Breaking Changes :mega:

- The viewer parameter in `KmlTour.prototype.play` was removed. Instead of a `Viewer`, pass a `CesiumWidget` instead. [#10845](https://github.com/CesiumGS/cesium/pull/10845)
  移除了 `KmlTour.prototype.play` 中的 viewer 参数。请传入 `CesiumWidget` 替代 `Viewer`。[#10845](https://github.com/CesiumGS/cesium/pull/10845)

## 1.99 - 2022-11-01

### Major Announcements :loudspeaker:

- Starting with version 1.100, CesiumJS will be published alongside two smaller packages `@cesium/engine` and `@cesium/widgets` [#10824](https://github.com/CesiumGS/cesium/pull/10824):
  从 1.100 版本开始，CesiumJS 将与两个更小的子包 `@cesium/engine` 和 `@cesium/widgets` 一同发布 [#10824](https://github.com/CesiumGS/cesium/pull/10824)：
  - The source code will been partitioned into two folders: `packages/engine` and `packages/widgets`.
    源代码将划分为两个目录：`packages/engine` 和 `packages/widgets`。
  - These workspaces packages will follow semantic versioning.
    这些工作区（workspaces）包将遵循语义化版本控制（semver）。
  - These workspaces packages will be published as ES modules with TypeScript definitions.
    这些工作区包将以附带 TypeScript 类型定义的 ES 模块形式发布。
  - The combined CesiumJS release will continue to be published, however, the `Source` folder will only contain the following:
    整合发布的完整 CesiumJS 包将继续发布，但 `Source` 文件夹将仅包含以下内容：
    - `Cesium.js`
    - `Cesium.d.ts`
    - `Assets`
    - `ThirdParty`
    - `Widgets`(CSS files only)
  - The ability to import modules and TypeScript definitions from individual files will been removed. Any imports should originate from the `cesium` module (`import { Cartesian3 } from "cesium";`) or the combined `Cesium.js` file (`import { Cartesian3 } from "Source/Cesium.js";`);
    从各个单独文件中导入模块和 TypeScript 类型定义的功能将被移除。所有导入都应来源于 `cesium` 模块（`import { Cartesian3 } from "cesium";`）或整合的 `Cesium.js` 文件（`import { Cartesian3 } from "Source/Cesium.js";`）。

### Breaking Changes :mega:

- The polyfills `requestAnimationFrame` and `cancelAnimationFrame` have been removed. Use the native browser methods instead. [#10579](https://github.com/CesiumGS/cesium/pull/10579)
  移除了 `requestAnimationFrame` 和 `cancelAnimationFrame` 的 Polyfill。请改用原生浏览器方法。[#10579](https://github.com/CesiumGS/cesium/pull/10579)

### Additions :tada:

- Added support for I3S 3D Object and IntegratedMesh Layers. [#9634](https://github.com/CesiumGS/cesium/pull/9634)
  新增对 I3S 3D Object（三维对象）和 IntegratedMesh（集成网格）图层的支持。[#9634](https://github.com/CesiumGS/cesium/pull/9634)

### Deprecated :hourglass_flowing_sand:

- The viewer parameter in `KmlTour.prototype.play` was deprecated in Cesium 1.99. It will be removed in 1.100. Instead of a `Viewer`, pass a `CesiumWidget` instead. [#10845](https://github.com/CesiumGS/cesium/pull/10845)
  `KmlTour.prototype.play` 中的 viewer 参数已在 Cesium 1.99 中被废弃，并将于 1.100 中移除。请传入 `CesiumWidget` 替代 `Viewer`。[#10845](https://github.com/CesiumGS/cesium/pull/10845)

### Fixes :wrench:

- Fixed a bug where the scale of a `Model` was being incorrectly applied to its bounding sphere. [#10855](https://github.com/CesiumGS/cesium/pull/10855)
  修复了 `Model` 的缩放被错误地应用到其包围球的 Bug。[#10855](https://github.com/CesiumGS/cesium/pull/10855)
- Fixed a bug where rendering a `Model` with image-based lighting while specular environment maps were unsupported caused a crash. [#10859](https://github.com/CesiumGS/cesium/pull/10859)
  修复了在不支持高光环境贴图的情况下，使用基于图像的光照（IBL）渲染 `Model` 会导致崩溃的 Bug。[#10859](https://github.com/CesiumGS/cesium/pull/10859)
- Fixed a bug where request render mode was broken when a ground primitive is added. [#10756](https://github.com/CesiumGS/cesium/issues/10756)
  修复了添加贴地图元（ground primitive）时请求渲染模式失效的 Bug。[#10756](https://github.com/CesiumGS/cesium/issues/10756)

## 1.98.1 - 2022-10-03

- This is an npm only release to fix the improperly published 1.98.
  这是一个仅限 npm 的补丁发布，用于修复 1.98 发布不当的问题。

## 1.98 - 2022-10-03

### Breaking Changes :mega:

- As of the previous release (1.97), `new Model()` is an internal constructor and must not be used directly. Use `Model.fromGltf()` instead. [#10778](https://github.com/CesiumGS/cesium/pull/10778)
  从上一版本（1.97）起，`new Model()` 成为内部构造函数，禁止直接使用。请改用 `Model.fromGltf()`。[#10778](https://github.com/CesiumGS/cesium/pull/10778)
- The `.getPropertyNames` methods of `Cesium3DTileFeature`, `Cesium3DTilePointFeature`, and `ModelFeature` have been removed. Use the `.getPropertyIds` methods instead.
  `Cesium3DTileFeature`、`Cesium3DTilePointFeature` 和 `ModelFeature` 的 `.getPropertyNames` 方法已被移除。请改用 `.getPropertyIds` 方法。

### Additions :tada:

- Added support for the `WEB3D_quantized_attributes` extension found in some glTF 1.0 models. [#10758](https://github.com/CesiumGS/cesium/pull/10758)
  新增对部分 glTF 1.0 模型中存在的 `WEB3D_quantized_attributes` 扩展的支持。[#10758](https://github.com/CesiumGS/cesium/pull/10758)

### Fixes :wrench:

- Fixed a bug where instanced models without normals would not render. [#10765](https://github.com/CesiumGS/cesium/pull/10765)
  修复了不带法线的实例化模型无法渲染的 Bug。[#10765](https://github.com/CesiumGS/cesium/pull/10765)
- Fixed a regression where `i3dm` with scale and without rotation would render incorrectly. [#10808](https://github.com/CesiumGS/cesium/pull/10808)
  修复了带有缩放且不带旋转的 `i3dm` 渲染不正确的回归缺陷。[#10808](https://github.com/CesiumGS/cesium/pull/10808)
- Fixed a regression where instanced feature IDs were not processed correctly [#10771](https://github.com/CesiumGS/cesium/pull/10771)
  修复了实例化要素 ID 未被正确处理的回归缺陷。[#10771](https://github.com/CesiumGS/cesium/pull/10771)
- Fixed a regression where `Cesium3DTileFeature.setProperty()` was not creating properties for unknown property IDs. [#10775](https://github.com/CesiumGS/cesium/pull/10775)
  修复了 `Cesium3DTileFeature.setProperty()` 未能为未知属性 ID 创建属性的回归缺陷。[#10775](https://github.com/CesiumGS/cesium/pull/10775)
- Fixed a regression where `pnts` tiles with `3DTILES_draco_point_compression` and <= 8 quantization bits were being rendered incorrectly. [#10794](https://github.com/CesiumGS/cesium/pull/10794)
  修复了带有 `3DTILES_draco_point_compression` 且量化位数 <= 8 位的 `pnts` 瓦片渲染不正确的回归缺陷。[#10794](https://github.com/CesiumGS/cesium/pull/10794)
- Fixed a regression where glTF models with unused nodes would crash [#10813](https://github.com/CesiumGS/cesium/pull/10813)
  修复了包含未引用节点的 glTF 模型会导致程序崩溃的回归缺陷。[#10813](https://github.com/CesiumGS/cesium/pull/10813)
- Fixed a regression where tilesets would not load in multiple `Viewer`s. [#10828](https://github.com/CesiumGS/cesium/pull/10828)
  修复了瓦片集无法在多个 `Viewer` 中加载的回归缺陷。[#10828](https://github.com/CesiumGS/cesium/pull/10828)
- Fixed a bug where camera would not follow the `Viewer.trackedEntity` if it had a model with a `HeightReference` other than `NONE`. [#10805](https://github.com/CesiumGS/cesium/pull/10805)
  修复了当 `Viewer.trackedEntity` 的模型 `HeightReference` 不为 `NONE` 时相机无法跟随实体的 Bug。[#10805](https://github.com/CesiumGS/cesium/pull/10805)
- Fixed a bug where calling `removeAll` on a `ClippingPlaneCollection` attached to a `Model` would cause a crash. [#10827](https://github.com/CesiumGS/cesium/pull/10827)
  修复了对附加到 `Model` 的 `ClippingPlaneCollection` 调用 `removeAll` 会导致崩溃的 Bug。[#10827](https://github.com/CesiumGS/cesium/pull/10827)
- Fixed a bug where replacing a `Model`'s `ClippingPlaneCollection` with one of the same length would cause a crash. [#10831](https://github.com/CesiumGS/cesium/pull/10831)
  修复了用相同长度的裁剪面集合替换 `Model` 的 `ClippingPlaneCollection` 时导致崩溃的 Bug。[#10831](https://github.com/CesiumGS/cesium/pull/10831)
- Fixed a bug where KMLs with a NetworkLink with viewRefreshMode=='onRegion' would cause Cesium to make numerous resource requests and possibly trigger an out of memory error. [#10790](https://github.com/CesiumGS/cesium/pull/10790)
  修复了包含 `viewRefreshMode=='onRegion'` 的 NetworkLink 的 KML 会导致 Cesium 发送大量资源请求并可能触发内存溢出错误的 Bug。[#10790](https://github.com/CesiumGS/cesium/pull/10790)
- Fixed a bug where calling `Vector3DTileContent.getFeature` before a render update could result in no feature being returned. [#10819](https://github.com/CesiumGS/cesium/pull/10819)
  修复了在渲染更新之前调用 `Vector3DTileContent.getFeature` 可能导致未返回要素的 Bug。[#10819](https://github.com/CesiumGS/cesium/pull/10819)

## 1.97 - 2022-09-01

### Major Announcements :loudspeaker:

- CesiumJS has switched to a new architecture for loading glTF models and tilesets to enable:
  CesiumJS 已切换到用于加载 glTF 模型和瓦片集的新架构，以支持：
  - User-defined GLSL shaders via [`CustomShader`](Documentation/CustomShaderGuide/README.md)
    通过 [`CustomShader`](Documentation/CustomShaderGuide/README.md) 支持用户自定义 GLSL 着色器
  - Support for [3D Tiles Next](https://cesium.com/blog/2021/11/10/introducing-3d-tiles-next/) metadata extensions: [`EXT_structural_metadata`](https://github.com/CesiumGS/glTF/tree/proposal-EXT_structural_metadata/extensions/2.0/Vendor/EXT_structural_metadata), [`EXT_mesh_features`](https://github.com/CesiumGS/glTF/tree/proposal-EXT_mesh_features/extensions/2.0/Vendor/EXT_mesh_features) and [`EXT_instance_features`](https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_instance_features)
    支持 [3D Tiles Next](https://cesium.com/blog/2021/11/10/introducing-3d-tiles-next/) 元数据扩展：[`EXT_structural_metadata`](https://github.com/CesiumGS/glTF/tree/proposal-EXT_structural_metadata/extensions/2.0/Vendor/EXT_structural_metadata)、[`EXT_mesh_features`](https://github.com/CesiumGS/glTF/tree/proposal-EXT_mesh_features/extensions/2.0/Vendor/EXT_mesh_features) 以及 [`EXT_instance_features`](https://github.com/CesiumGS/glTF/tree/3d-tiles-next/extensions/2.0/Vendor/EXT_instance_features)
  - Support for [`EXT_mesh_gpu_instancing`](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing)
    支持 [`EXT_mesh_gpu_instancing`](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing)（GPU 实例化）
  - Support for [`EXT_meshopt_compression`](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_meshopt_compression)
    支持 [`EXT_meshopt_compression`](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_meshopt_compression) 压缩
  - Texture caching across different tiles
    跨不同瓦片的纹理缓存
  - Numerous bug fixes
    大量 Bug 修复
- Usage notes for the new glTF architecture:
  新 glTF 架构的使用说明：
  - Those using `ModelExperimental.fromGltf()` should now use `Model.fromGltf()`.
    使用 `ModelExperimental.fromGltf()` 的用户现在应改用 `Model.fromGltf()`。
  - The `enableModelExperimental` flag was removed, as tilesets and entities always use the new architecture.
    移除了 `enableModelExperimental` 标识，因为瓦片集和实体现在始终使用新架构。
  - The new implementation of `Model` uses the same public API as before, so no other changes are necessary.
    `Model` 的新实现采用与以往相同的公开 API，因此无需进行其他改动。

### Breaking Changes :mega:

- glTF 1.0 assets are no longer fully supported. glTF 1.0 techniques are converted to PBR materials where possible, but more complex techniques will no longer function correctly. If custom GLSL shaders are needed, use `CustomShader` instead. [#10648](https://github.com/CesiumGS/cesium/pull/10648)
  不再完全支持 glTF 1.0 资产。glTF 1.0 中的 techniques 会尽可能转换为 PBR 材质，但更复杂的 techniques 将无法正常工作。若需要自定义 GLSL 着色器，请改用 `CustomShader`。[#10648](https://github.com/CesiumGS/cesium/pull/10648)
- The glTF 2.0 extension `KHR_techniques_webgl` and `KHR_materials_common` are also no longer fully supported. Materials are converted to PBR materials where possible.
  glTF 2.0 扩展 `KHR_techniques_webgl` 和 `KHR_materials_common` 也不再完全支持。材质将尽可能转换为 PBR 材质。
- Support for rendering instanced models on the CPU has been removed.
  移除了在 CPU 上渲染实例化模型（instanced models）的支持。
- `Model.gltf`, `Model.basePath`, `Model.pendingTextureLoads` (properties), and `Model.dequantizeInShader` (constructor option) have been removed.
  `Model.gltf`、`Model.basePath`、`Model.pendingTextureLoads`（属性）以及 `Model.dequantizeInShader`（构造函数选项）已被移除。
- `ModelMesh` and `ModelMaterial` have been removed.
  `ModelMesh` 和 `ModelMaterial` 已被移除。
- `new Model()` is an internal constructor and must not be used directly. Use `Model.fromGltf()` instead. [#10778](https://github.com/CesiumGS/cesium/pull/10778)
  `new Model()` 属于内部构造函数，禁止直接使用。请改用 `Model.fromGltf()`。[#10778](https://github.com/CesiumGS/cesium/pull/10778)

### Additions :tada:

- `Model` can now classify other assets with a given `classificationType`. [#10623](https://github.com/CesiumGS/cesium/pull/10623)
  `Model` 现在支持以指定的 `classificationType` 对其他资产进行分类贴合。[#10623](https://github.com/CesiumGS/cesium/pull/10623)
- `Model` now supports back face culling for point clouds. [#10703](https://github.com/CesiumGS/cesium/pull/10703)
  `Model` 现在支持点云的背面剔除（back face culling）。[#10703](https://github.com/CesiumGS/cesium/pull/10703)
- Export asset files such as CSS in `package.json`, allowing bundlers to import without additional configuration. [#9212](https://github.com/CesiumGS/cesium/pull/9212)
  在 `package.json` 中导出了 CSS 等静态资源文件，允许打包工具无需额外配置即可直接导入。[#9212](https://github.com/CesiumGS/cesium/pull/9212)
- The `sideEffects` field in `package.json` is now specified, allowing more conservative bundlers like Webpack to enable tree shaking by default. [#10714](https://github.com/CesiumGS/cesium/pull/10714)
  在 `package.json` 中明确声明了 `sideEffects` 字段，允许 Webpack 等更保守的打包工具默认开启 Tree Shaking。[#10714](https://github.com/CesiumGS/cesium/pull/10714)
- Model entities now support `CustomShader`. [#10747](https://github.com/CesiumGS/cesium/pull/10747)
  Model 实体现在支持 `CustomShader`。[#10747](https://github.com/CesiumGS/cesium/pull/10747)

### Fixes :wrench:

- Fixed bug with `Viewer.flyTo` where camera could go underground when target is an `Entity` with `ModelGraphics` with `HeightReference.CLAMP_TO_GROUND` or `HeightReference.RELATIVE_TO_GROUND`. [#10631](https://github.com/CesiumGS/cesium/pull/10631)
  修复了当目标是带有 `HeightReference.CLAMP_TO_GROUND` 或 `HeightReference.RELATIVE_TO_GROUND` 的 `ModelGraphics` 实体时，`Viewer.flyTo` 可能导致相机钻入地下的 Bug。[#10631](https://github.com/CesiumGS/cesium/pull/10631)
- Fixed issues running CesiumJS under Node.js when using ES modules. [#10684](https://github.com/CesiumGS/cesium/issues/10684)
  修复了在 Node.js 环境下使用 ES 模块运行 CesiumJS 时出现的问题。[#10684](https://github.com/CesiumGS/cesium/issues/10684)
- Fixed the incorrect lighting of instanced models. [#10690](https://github.com/CesiumGS/cesium/pull/10690)
  修复了实例化模型光照计算错误的问题。[#10690](https://github.com/CesiumGS/cesium/pull/10690)
- Fixed developer error with `Camera.flyTo` with an `orientation` and a `Rectangle` value for `destination`. [#10704](https://github.com/CesiumGS/cesium/issues/10704)
  修复了 `Camera.flyTo` 同时传入 `orientation` 和 `Rectangle` 类型的 `destination` 时抛出 DeveloperError 的问题。[#10704](https://github.com/CesiumGS/cesium/issues/10704)
- Fixed rendering bug with points in .vctr format, where points wouldn't show until picked or styled. [#10707](https://github.com/CesiumGS/cesium/pull/10707)
  修复了 .vctr 格式点要素在拾取或应用样式前不会显示的渲染 Bug。[#10707](https://github.com/CesiumGS/cesium/pull/10707)
- Fixed bounding volume calculations for glTF models with `KHR_mesh_quantization` and normalized positions. [#10741](https://github.com/CesiumGS/cesium/pull/10741)
  修复了带有 `KHR_mesh_quantization` 和归一化坐标的 glTF 模型的包围体计算问题。[#10741](https://github.com/CesiumGS/cesium/pull/10741)

## 1.96 - 2022-08-01

### Major Announcements :loudspeaker:

- Built `Cesium.js` is no longer AMD format. This may or may not be a breaking change depending on how you use Cesium in your app. See our [blog post](https://cesium.com/blog/2022/07/19/build-tooling-updates-coming-to-cesiumjs/) for the full details. [#10399](https://github.com/CesiumGS/cesium/pull/10399)
  构建后的 `Cesium.js` 不再采用 AMD 格式。根据您在应用中使用 Cesium 的方式，这可能会构成破坏性变更。详情请见我们的[博客文章](https://cesium.com/blog/2022/07/19/build-tooling-updates-coming-to-cesiumjs/)。[#10399](https://github.com/CesiumGS/cesium/pull/10399)
  - Built `Cesium.js` has gone from `12.5MB` to `8.4MB` unminified and from `4.3MB` to `3.6MB` minified. `Cesium.js.map` has gone from `22MB` to `17.2MB`.
    未压缩的构建版 `Cesium.js` 体积从 `12.5MB` 降至 `8.4MB`，压缩版从 `4.3MB` 降至 `3.6MB`。`Cesium.js.map` 从 `22MB` 降至 `17.2MB`。
  - If you were ingesting individual ESM-style modules from the combined file `Build/Cesium/Cesium.js` or `Build/CesiumUnminified/Cesium.js`, instead use `Build/Cesium/index.js` or `Build/CesiumUnminified/index.js` respectively.
    如果您之前从合并文件 `Build/Cesium/Cesium.js` 或 `Build/CesiumUnminified/Cesium.js` 中引入单个 ESM 模块，请分别改用 `Build/Cesium/index.js` 或 `Build/CesiumUnminified/index.js`。
  - Using ESM from `Source` will require a bundler to resolve third party node dependencies.
    直接从 `Source` 中使用 ESM 将需要打包工具来解析第三方 Node 依赖。
  - `CESIUM_BASE_URL` should be set to either `Build/Cesium` or `Build/CesiumUnminified`.
    `CESIUM_BASE_URL` 应设置为 `Build/Cesium` 或 `Build/CesiumUnminified`。

### Breaking Changes :mega:

- `Model.boundingSphere` now returns the bounding sphere in ECEF coordinates instead of the local coordinate system. [#10589](https://github.com/CesiumGS/cesium/pull/10589)
  `Model.boundingSphere` 现在返回 ECEF（地心地固）坐标系下的包围球，而非局部坐标系。[#10589](https://github.com/CesiumGS/cesium/pull/10589)
- `Cesium3DTileStyle.readyPromise` and `Cesium3DTileStyle.ready` have been removed. If loading a style from a url, use `Cesium3DTileStyle.fromUrl` instead. [#10348](https://github.com/CesiumGS/cesium/pull/10348)
  `Cesium3DTileStyle.readyPromise` 和 `Cesium3DTileStyle.ready` 已被移除。若要从 URL 加载样式，请改用 `Cesium3DTileStyle.fromUrl`。[#10348](https://github.com/CesiumGS/cesium/pull/10348)

### Additions :tada:

- Models and tilesets that use the `CESIUM_primitive_outline` extension can now toggle outlines at runtime with the `showOutline` property. Furthermore, the color of the outlines can now be controlled by the `outlineColor` property. [#10506](https://github.com/CesiumGS/cesium/pull/10506)
  使用 `CESIUM_primitive_outline` 扩展的模型和瓦片集现在可以在运行时通过 `showOutline` 属性切换轮廓线显示；此外，轮廓线颜色现在可以通过 `outlineColor` 属性控制。[#10506](https://github.com/CesiumGS/cesium/pull/10506)
- Added optional `blurActiveElementOnCanvasFocus` option to set the behavior of blurring the active element when interacting with the canvas. [#10518](https://github.com/CesiumGS/cesium/pull/10518)
  添加了可选的 `blurActiveElementOnCanvasFocus` 选项，用于设置与 Canvas 交互时是否让当前获得焦点的活跃元素失焦。[#10518](https://github.com/CesiumGS/cesium/pull/10518)
- Added `ModelExperimental.getNode` to allow users to modify the transforms of model nodes at runtime. [#10540](https://github.com/CesiumGS/cesium/pull/10540)
  新增 `ModelExperimental.getNode`，允许用户在运行时修改模型节点的变换矩阵。[#10540](https://github.com/CesiumGS/cesium/pull/10540)
- Added support for point cloud styling for tilesets loaded with `ModelExperimental`. [#10569](https://github.com/CesiumGS/cesium/pull/10569)
  新增对使用 `ModelExperimental` 加载的瓦片集的点云样式化支持。[#10569](https://github.com/CesiumGS/cesium/pull/10569)
- Upgraded earcut from version 2.2.2 to version 2.2.4 which includes 10-15% better performance in triangulation. [#10593](https://github.com/CesiumGS/cesium/pull/10593)
  将 earcut 从 2.2.2 升级至 2.2.4 版本，三角剖分（triangulation）性能提升了 10-15%。[#10593](https://github.com/CesiumGS/cesium/pull/10593)

### Fixes :wrench:

- Fixed crash when loading glTF models with the `EXT_mesh_features` and `EXT_structural_metadata` extensions without `channels` property. [#10511](https://github.com/CesiumGS/cesium/pull/10511)
  修复了加载带有 `EXT_mesh_features` 和 `EXT_structural_metadata` 扩展但缺少 `channels` 属性的 glTF 模型时程序崩溃的问题。[#10511](https://github.com/CesiumGS/cesium/pull/10511)
- Fixed a crash in the 3D Tiles Feature Styling sandcastle that occurred when using `ModelExperimental`. [#10514](https://github.com/CesiumGS/cesium/pull/10514)
  修复了在 3D Tiles Feature Styling Sandcastle 示例中使用 `ModelExperimental` 时发生的崩溃。[#10514](https://github.com/CesiumGS/cesium/pull/10514)
- Fixed improper handling of double-sided materials in `ModelExperimental`. [#10507](https://github.com/CesiumGS/cesium/pull/10507)
  修复了 `ModelExperimental` 中双面材质处理不当的问题。[#10507](https://github.com/CesiumGS/cesium/pull/10507)
- Fixed a bug where the alpha component of `model.color` would not update in the 3D Models Coloring sandcastle when using `ModelExperimental`. [#10519](https://github.com/CesiumGS/cesium/pull/10519)
  修复了在 3D Models Coloring Sandcastle 示例中使用 `ModelExperimental` 时 `model.color` 的 alpha 分量无法更新的 Bug。[#10519](https://github.com/CesiumGS/cesium/pull/10519)
- Fixed a bug where .cmpt files were not cached correctly in `ModelExperimental`. [#10524](https://github.com/CesiumGS/cesium/pull/10524)
  修复了 `ModelExperimental` 中 .cmpt 文件未被正确缓存的 Bug。[#10524](https://github.com/CesiumGS/cesium/pull/10524)
- Fixed a crash in the 3D Tiles Formats sandcastle when loading draco-compressed point clouds with `ModelExperimental`. [#10521](https://github.com/CesiumGS/cesium/pull/10521)
  修复了在 3D Tiles Formats Sandcastle 示例中使用 `ModelExperimental` 加载 Draco 压缩点云时的崩溃。[#10521](https://github.com/CesiumGS/cesium/pull/10521)
- Fixed a bug where per-feature post-processing was not working with `ModelExperimental`. [#10528](https://github.com/CesiumGS/cesium/pull/10528)
  修复了逐要素后处理（per-feature post-processing）在 `ModelExperimental` 下不生效的 Bug。[#10528](https://github.com/CesiumGS/cesium/pull/10528)
- Fixed error in `loadAndExecuteScript` and favorite icon lost in sandcastle when CesiumJS was running in cross-origin isolated environment.[#10515](https://github.com/CesiumGS/cesium/pull/10515)
  修复了 CesiumJS 在跨域隔离（cross-origin isolated）环境下运行时 `loadAndExecuteScript` 报错以及 Sandcastle 丢失收藏图标的问题。[#10515](https://github.com/CesiumGS/cesium/pull/10515)
- Fixed a bug where `Viewer.zoomTo` would continuously throw errors if a `Cesium3DTileset` failed to load.[#10523](https://github.com/CesiumGS/cesium/pull/10523)
  修复了若 `Cesium3DTileset` 加载失败，`Viewer.zoomTo` 会持续抛出错误的 Bug。[#10523](https://github.com/CesiumGS/cesium/pull/10523)
- Fixed a bug where styles would not apply to tilesets if they were applied while the tileset was hidden. [#10582](https://github.com/CesiumGS/cesium/pull/10582)
  修复了在瓦片集处于隐藏状态时应用样式会导致样式无法生效的 Bug。[#10582](https://github.com/CesiumGS/cesium/pull/10582)
- Fixed a bug where `.i3dm` models with quantized positions were not being correctly loaded by `ModelExperimental`. [#10598](https://github.com/CesiumGS/cesium/pull/10598)
  修复了带量化坐标的 `.i3dm` 模型无法被 `ModelExperimental` 正确加载的 Bug。[#10598](https://github.com/CesiumGS/cesium/pull/10598)
- Fixed a bug where dynamic geometry was not marked as `ready`. [#10517](https://github.com/CesiumGS/cesium/issues/10517)
  修复了动态几何体未被标记为 `ready` 的 Bug。[#10517](https://github.com/CesiumGS/cesium/issues/10517)

### Deprecated :hourglass_flowing_sand:

- Support for rendering instanced models on the CPU has been deprecated and will be removed in CesiumJS 1.97. [#10589](https://github.com/CesiumGS/cesium/pull/10589)
  在 CPU 上渲染实例化模型（instanced models）的支持已被废弃，将于 CesiumJS 1.97 中移除。[#10589](https://github.com/CesiumGS/cesium/pull/10589)
- The polyfills `requestAnimationFrame` and `cancelAnimationFrame` have been deprecated and will be removed in 1.99. Use the native browser methods instead. [#10579](https://github.com/CesiumGS/cesium/pull/10579)
  `requestAnimationFrame` 和 `cancelAnimationFrame` 的 Polyfill 已被废弃，并将于 1.99 中移除。请改用原生浏览器方法。[#10579](https://github.com/CesiumGS/cesium/pull/10579)

## 1.95 - 2022-07-01

### Breaking Changes :mega:

- Tilesets rendered with `ModelExperimental` must set `projectTo2D` to true in order to be accurately projected and rendered in 2D / CV mode. [#10440](https://github.com/CesiumGS/cesium/pull/10440)
  使用 `ModelExperimental` 渲染的瓦片集必须将 `projectTo2D` 设置为 true，以便在 2D / CV 模式下准确投影和渲染。[#10440](https://github.com/CesiumGS/cesium/pull/10440)

### Additions :tada:

- Memory statistics for `ModelExperimental` now appear in the `Cesium3DTilesInspector`. This includes binary metadata memory, which is not counted by `Model`. [#10397](https://github.com/CesiumGS/cesium/pull/10397)
  `ModelExperimental` 的内存统计信息现在显示在 `Cesium3DTilesInspector` 中。这包含了未被旧版 `Model` 计入的二进制元数据内存。[#10397](https://github.com/CesiumGS/cesium/pull/10397)
- Memory statistics for `ResourceCache` (used by `ModelExperimental`) now appear in the `Cesium3DTilesInspector`. [#10413](https://github.com/CesiumGS/cesium/pull/10413)
  `ResourceCache`（供 `ModelExperimental` 使用）的内存统计信息现在显示在 `Cesium3DTilesInspector` 中。[#10413](https://github.com/CesiumGS/cesium/pull/10413)
- Added support for rendering individual models in 2D / CV using `ModelExperimental`. [#10419](https://github.com/CesiumGS/cesium/pull/10419)
  新增在使用 `ModelExperimental` 时在 2D / CV 下渲染单个模型的支持。[#10419](https://github.com/CesiumGS/cesium/pull/10419)
- Added support for rendering instanced tilesets in 2D / CV using `ModelExperimental`. [#10433](https://github.com/CesiumGS/cesium/pull/10433)
  新增在使用 `ModelExperimental` 时在 2D / CV 下渲染实例化瓦片集（instanced tilesets）的支持。[#10433](https://github.com/CesiumGS/cesium/pull/10433)
- Added `modelUpAxis` and `modelForwardAxis` constructor options to `Cesium3DTileset` [#10439](https://github.com/CesiumGS/cesium/pull/10439)
  在 `Cesium3DTileset` 中新增 `modelUpAxis` 和 `modelForwardAxis` 构造函数选项。[#10439](https://github.com/CesiumGS/cesium/pull/10439)
- Added `heightReference` to `ModelExperimental`. [#10448](https://github.com/CesiumGS/cesium/pull/10448)
  在 `ModelExperimental` 中新增 `heightReference`（高度基准）属性。[#10448](https://github.com/CesiumGS/cesium/pull/10448)
- Added `silhouetteSize` and `silhouetteColor` to `ModelExperimental`. [#10457](https://github.com/CesiumGS/cesium/pull/10457)
  在 `ModelExperimental` 中新增 `silhouetteSize`（轮廓大小）和 `silhouetteColor`（轮廓颜色）属性。[#10457](https://github.com/CesiumGS/cesium/pull/10457)
- Added support for mipmapped textures in `ModelExperimental`. [#10231](https://github.com/CesiumGS/cesium/issues/10231)
  在 `ModelExperimental` 中新增对 Mipmap 纹理的支持。[#10231](https://github.com/CesiumGS/cesium/issues/10231)
- Added `distanceDisplayCondition` to `ModelExperimental`. [#10481](https://github.com/CesiumGS/cesium/pull/10481)
  在 `ModelExperimental` 中新增 `distanceDisplayCondition`（按视距显示条件）属性。[#10481](https://github.com/CesiumGS/cesium/pull/10481)
- Added support for `AGI_articulations` to `ModelExperimental`. [#10479](https://github.com/CesiumGS/cesium/pull/10479)
  在 `ModelExperimental` 中新增对 `AGI_articulations` 关节结构扩展的支持。[#10479](https://github.com/CesiumGS/cesium/pull/10479)
- Added `credit` to `ModelExperimental`. [#10489](https://github.com/CesiumGS/cesium/pull/10489)
  在 `ModelExperimental` 中新增 `credit` 署名属性。[#10489](https://github.com/CesiumGS/cesium/pull/10489)
- Added `asynchronous` to `ModelExperimental.fromGltf`. [#10490](https://github.com/CesiumGS/cesium/pull/10490)
  在 `ModelExperimental.fromGltf` 中新增 `asynchronous`（异步）选项。[#10490](https://github.com/CesiumGS/cesium/pull/10490)
- Added `id` to `ModelExperimental`. [#10491](https://github.com/CesiumGS/cesium/pull/10491)
  在 `ModelExperimental` 中新增 `id` 属性。[#10491](https://github.com/CesiumGS/cesium/pull/10491)
- `ExperimentalFeatures.enableModelExperimental` now enables `ModelExperimental` for entities and CZML in addition to 3D Tiles. [#10492](https://github.com/CesiumGS/cesium/pull/10492)
  `ExperimentalFeatures.enableModelExperimental` 现在除了 3D Tiles 之外，还对实体（entities）和 CZML 启用 `ModelExperimental`。[#10492](https://github.com/CesiumGS/cesium/pull/10492)

### Fixes :wrench:

- Fixed `FeatureDetection` for Microsoft Edge. [#10429](https://github.com/CesiumGS/cesium/pull/10429)
  修复了针对 Microsoft Edge 浏览器的 `FeatureDetection` 特性检测。[#10429](https://github.com/CesiumGS/cesium/pull/10429)
- Fixed broken links in documentation of `CesiumTerrainProvider`. [#7478](https://github.com/CesiumGS/cesium/issues/7478)
  修复了 `CesiumTerrainProvider` 文档中的失效链接。[#7478](https://github.com/CesiumGS/cesium/issues/7478)
- Warn if `Cesium3DTile` content.uri property is empty, and load empty tile. [#7263](https://github.com/CesiumGS/cesium/issues/7263)
  若 `Cesium3DTile` 的 content.uri 属性为空则输出警告，并加载空瓦片。[#7263](https://github.com/CesiumGS/cesium/issues/7263)
- Updated text highlighting for code examples in documentation. [#10051](https://github.com/CesiumGS/cesium/issues/10051)
  更新了文档中代码示例的语法高亮。[#10051](https://github.com/CesiumGS/cesium/issues/10051)
- Updated ModelExperimental shader defaults to match glTF spec. [#9992](https://github.com/CesiumGS/cesium/issues/9992)
  更新了 ModelExperimental 着色器默认值以符合 glTF 规范。[#9992](https://github.com/CesiumGS/cesium/issues/9992)
- Fixed shadow rendering artifacts that appeared in `ModelExperimental`. [#10501](https://github.com/CesiumGS/cesium/pull/10501/)
  修复了 `ModelExperimental` 中出现的阴影渲染伪影。[#10501](https://github.com/CesiumGS/cesium/pull/10501/)

### Deprecated :hourglass_flowing_sand:

- The `.getPropertyNames` methods of `Cesium3DTileFeature`, `Cesium3DTilePointFeature`, and `ModelFeature` have been deprecated and will be removed in 1.98. Use the `.getPropertyIds` methods instead.
  `Cesium3DTileFeature`、`Cesium3DTilePointFeature` 和 `ModelFeature` 的 `.getPropertyNames` 方法已被废弃，将于 1.98 中移除。请改用 `.getPropertyIds` 方法。

## 1.94.3 - 2022-06-10

- Fixed a crash with vector tilesets with lines when clamping to terrain or 3D tiles. [#10447](https://github.com/CesiumGS/cesium/pull/10447)
  修复了带线段的矢量瓦片集在贴合地形或 3D Tiles 时发生崩溃的问题。[#10447](https://github.com/CesiumGS/cesium/pull/10447)

## 1.94.2 - 2022-06-03

- This is an npm only release to fix the improperly published 1.94.1.
  这是一个仅限 npm 的补丁发布，用于修复 1.94.1 发布不当的问题。

## 1.94.1 - 2022-06-03

### Additions :tada:

- Added support for rendering individual models in 2D / CV using `ModelExperimental`. [#10419](https://github.com/CesiumGS/cesium/pull/10419)
  新增在使用 `ModelExperimental` 时在 2D / CV 下渲染单个模型的支持。[#10419](https://github.com/CesiumGS/cesium/pull/10419)

### Fixes :wrench:

- Fixed `Cesium3DTileColorBlendMode.REPLACE` for certain tilesets. [#10424](https://github.com/CesiumGS/cesium/pull/10424)
  修复了特定瓦片集下 `Cesium3DTileColorBlendMode.REPLACE` 的问题。[#10424](https://github.com/CesiumGS/cesium/pull/10424)
- Fixed a crash when applying a style to a vector tileset with point features. [#10427](https://github.com/CesiumGS/cesium/pull/10427)
  修复了对包含点要素的矢量瓦片集应用样式时发生的崩溃。[#10427](https://github.com/CesiumGS/cesium/pull/10427)

## 1.94 - 2022-06-01

### Breaking Changes :mega:

- Removed individual image-based lighting parameters from `Model` and `Cesium3DTileset`. [#10388](https://github.com/CesiumGS/cesium/pull/10388)
  从 `Model` 和 `Cesium3DTileset` 中移除了单独的基于图像光照（IBL）参数。[#10388](https://github.com/CesiumGS/cesium/pull/10388)
- Models and tilesets rendered with `ModelExperimental` must set `enableDebugWireframe` to true in order for `debugWireframe` to work in WebGL1. [#10344](https://github.com/CesiumGS/cesium/pull/10344)
  使用 `ModelExperimental` 渲染的模型和瓦片集必须将 `enableDebugWireframe` 设置为 true，以便在 WebGL1 下使用 `debugWireframe` 线框调试功能。[#10344](https://github.com/CesiumGS/cesium/pull/10344)
- Removed `ImagerySplitPosition` and `Scene.imagerySplitPosition`. Use `SplitDirection` and `Scene.splitPosition` instead.[#10418](https://github.com/CesiumGS/cesium/pull/10418)
  移除了 `ImagerySplitPosition` 和 `Scene.imagerySplitPosition`。请改用 `SplitDirection` 和 `Scene.splitPosition`。[#10418](https://github.com/CesiumGS/cesium/pull/10418)
- Tilesets and models should now specify image-based lighting parameters in `ImageBasedLighting` instead of as individual options. [#10226](https://github.com/CesiumGS/cesium/pull/10226)
  瓦片集和模型现在应在 `ImageBasedLighting` 中指定基于图像的光照参数，而不是作为独立选项指定。[#10226](https://github.com/CesiumGS/cesium/pull/10226)

### Additions :tada:

- Added `Cesium3DTileStyle.fromUrl` for loading a style from a url. [#10348](https://github.com/CesiumGS/cesium/pull/10348)
  新增 `Cesium3DTileStyle.fromUrl`，用于从 URL 加载样式。[#10348](https://github.com/CesiumGS/cesium/pull/10348)
- Added `IndexDatatype.fromTypedArray`. [#10350](https://github.com/CesiumGS/cesium/pull/10350)
  新增 `IndexDatatype.fromTypedArray`。[#10350](https://github.com/CesiumGS/cesium/pull/10350)
- Added `ModelAnimationCollection.animateWhilePaused` and `ModelAnimation.animationTime` to allow explicit control over a model's animations. [#9339](https://github.com/CesiumGS/cesium/pull/9339)
  新增 `ModelAnimationCollection.animateWhilePaused` 和 `ModelAnimation.animationTime`，以允许显式控制模型动画。[#9339](https://github.com/CesiumGS/cesium/pull/9339)
- Replaced `options.gltf` with `options.url` in `ModelExperimental.fromGltf`. [#10371](https://github.com/CesiumGS/cesium/pull/10371)
  在 `ModelExperimental.fromGltf` 中将 `options.gltf` 替换为 `options.url`。[#10371](https://github.com/CesiumGS/cesium/pull/10371)
- Added support for 2D / CV mode for non-instanced tilesets rendered with `ModelExperimental`. [#10384](https://github.com/CesiumGS/cesium/pull/10384)
  新增在使用 `ModelExperimental` 时在 2D / CV 模式下渲染非实例化瓦片集的支持。[#10384](https://github.com/CesiumGS/cesium/pull/10384)
- Added `PolygonGraphics.textureCoordinates`, `PolygonGeometry.textureCoordinates`, `CoplanarPolygonGeometry.textureCoordinates`, which override the default `stRotation`-based texture coordinate calculation behavior with the provided texture coordinates, specified in the form of a `PolygonHierarchy` of `Cartesian2` points. [#10109](https://github.com/CesiumGS/cesium/pull/10109)
  新增 `PolygonGraphics.textureCoordinates`、`PolygonGeometry.textureCoordinates` 和 `CoplanarPolygonGeometry.textureCoordinates`，使用以 `Cartesian2` 点集组成的 `PolygonHierarchy` 形式指定的纹理坐标，覆盖默认基于 `stRotation` 的纹理坐标计算行为。[#10109](https://github.com/CesiumGS/cesium/pull/10109)

### Fixes :wrench:

- Fixed the rendering issues related to order-independent translucency on iOS devices. [#10417](https://github.com/CesiumGS/cesium/pull/10417)
  修复了 iOS 设备上与顺序无关半透明（order-independent translucency）相关的渲染问题。[#10417](https://github.com/CesiumGS/cesium/pull/10417)
- Fixed the inaccurate computation of bounding spheres for models not centered at (0,0,0) in their local space. [#10395](https://github.com/CesiumGS/cesium/pull/10395)
  修复了在局部空间中未以 (0,0,0) 为中心的模型包围球计算不准确的问题。[#10395](https://github.com/CesiumGS/cesium/pull/10395)
- Fixed the inaccurate computation of bounding spheres for `ModelExperimental`. [#10339](https://github.com/CesiumGS/cesium/pull/10339/)
  修复了 `ModelExperimental` 包围球计算不准确的问题。[#10339](https://github.com/CesiumGS/cesium/pull/10339/)
- Fixed error when destroying a 3D tileset before it has finished loading. [#10363](Fixes https://github.com/CesiumGS/cesium/issues/10363)
  修复了在 3D 瓦片集完成加载之前将其销毁时报错的问题。[#10363](Fixes https://github.com/CesiumGS/cesium/issues/10363)
- Fixed race condition which can occur when updating `Cesium3DTileStyle` before its `readyPromise` has resolved. [#10345](https://github.com/CesiumGS/cesium/issues/10345)
  修复了在其 `readyPromise` 解析完成之前更新 `Cesium3DTileStyle` 时可能发生的竞态条件问题。[#10345](https://github.com/CesiumGS/cesium/issues/10345)
- Fixed label background rendering. [#10342](https://github.com/CesiumGS/cesium/issues/10342)
  修复了文本标签背景渲染的问题。[#10342](https://github.com/CesiumGS/cesium/issues/10342)
- Enabled support for loading web assembly modules in Edge. [#6541](https://github.com/CesiumGS/cesium/pull/6541)
  在 Edge 浏览器中启用了对加载 WebAssembly 模块的支持。[#6541](https://github.com/CesiumGS/cesium/pull/6541)
- Fixed crash for zero-area `region` bounding volumes in a 3D Tileset. [#10351](https://github.com/CesiumGS/cesium/pull/10351)
  修复了 3D 瓦片集中面积为零的 `region` 包围体导致崩溃的问题。[#10351](https://github.com/CesiumGS/cesium/pull/10351)
- Fixed `Cesium3DTileset.debugShowUrl` so that it works for implicit tiles too. [#10372](https://github.com/CesiumGS/cesium/issues/10372)
  修复了 `Cesium3DTileset.debugShowUrl`，使其同样适用于隐式瓦片（implicit tiles）。[#10372](https://github.com/CesiumGS/cesium/issues/10372)
- Fixed crash when loading a tileset without a metadata schema but has external tilesets with tile or content metadata. [#10387](https://github.com/CesiumGS/cesium/pull/10387)
  修复了加载没有元数据模式（metadata schema）但具有包含瓦片或内容元数据的外部瓦片集时发生的崩溃。[#10387](https://github.com/CesiumGS/cesium/pull/10387)
- Fixed winding order for negatively scaled models in `ModelExperimental`. [#10405](https://github.com/CesiumGS/cesium/pull/10405)
  修复了 `ModelExperimental` 中带有负缩放因子的模型的绕序（winding order）问题。[#10405](https://github.com/CesiumGS/cesium/pull/10405)
- Fixed error when calling `sampleTerrain` over a large area that required lots of tile requests. [#10425](https://github.com/CesiumGS/cesium/pull/10425)
  修复了在大范围内调用需要大量瓦片请求的 `sampleTerrain` 时报错的问题。[#10425](https://github.com/CesiumGS/cesium/pull/10425)

### Deprecated :hourglass_flowing_sand:

- `Cesium3DTileStyle` constructor parameters of `string` or `Resource` type have been deprecated and will be removed in CesiumJS 1.96. If loading a style from a url, use `Cesium3DTileStyle.fromUrl` instead. [#10348](https://github.com/CesiumGS/cesium/pull/10348)
  `string` 或 `Resource` 类型的 `Cesium3DTileStyle` 构造函数参数已被废弃，将于 CesiumJS 1.96 中移除。若从 URL 加载样式，请改用 `Cesium3DTileStyle.fromUrl`。[#10348](https://github.com/CesiumGS/cesium/pull/10348)
- `Cesium3DTileStyle.readyPromise` and `Cesium3DTileStyle.ready` have been deprecated and will be removed in CesiumJS 1.96. If loading a style from a url, use `Cesium3DTileStyle.fromUrl` instead. [#10348](https://github.com/CesiumGS/cesium/pull/10348)
  `Cesium3DTileStyle.readyPromise` 和 `Cesium3DTileStyle.ready` 已被废弃，并将于 CesiumJS 1.96 中移除。若从 URL 加载样式，请改用 `Cesium3DTileStyle.fromUrl`。[#10348](https://github.com/CesiumGS/cesium/pull/10348)
- `Model.gltf`, `Model.basePath`, `Model.pendingTextureLoads` (properties), and `Model.dequantizeInShader` (constructor option) have been deprecated and will be removed in CesiumJS 1.97. [#10415](https://github.com/CesiumGS/cesium/pull/10415)
  `Model.gltf`、`Model.basePath`、`Model.pendingTextureLoads`（属性）以及 `Model.dequantizeInShader`（构造函数选项）已被废弃，并将于 CesiumJS 1.97 中移除。[#10415](https://github.com/CesiumGS/cesium/pull/10415)
- Support for glTF 1.0 assets has been deprecated and will be removed in CesiumJS 1.97. Please convert any glTF 1.0 assets to glTF 2.0. [#10414](https://github.com/CesiumGS/cesium/pull/10414)
  对 glTF 1.0 资产的支持已被废弃，并将于 CesiumJS 1.97 中移除。请将所有 glTF 1.0 资产转换为 glTF 2.0。[#10414](https://github.com/CesiumGS/cesium/pull/10414)
- Support for the glTF extension `KHR_techniques_webgl` has been deprecated and will be removed in CesiumJS 1.97. If custom GLSL shaders are needed, use `CustomShader` instead. [#10414](https://github.com/CesiumGS/cesium/pull/10414)
  对 glTF 扩展 `KHR_techniques_webgl` 的支持已被废弃，并将于 CesiumJS 1.97 中移除。若需要自定义 GLSL 着色器，请改用 `CustomShader`。[#10414](https://github.com/CesiumGS/cesium/pull/10414)
- `Model.boundingSphere` currently returns results in the model's local coordinate system, but in CesiumJS 1.96 it will be changed to return results in ECEF coordinates. [#10415](https://github.com/CesiumGS/cesium/pull/10415)
  `Model.boundingSphere` 当前返回模型局部坐标系下的结果，但在 CesiumJS 1.96 中将修改为返回 ECEF（地心地固）坐标系下的结果。[#10415](https://github.com/CesiumGS/cesium/pull/10415)

## 1.93 - 2022-05-02

### Breaking Changes :mega:

- Temporarily disable `Scene.orderIndependentTranslucency` by default on iPad and iOS due to a WebGL regression, see [#9827](https://github.com/CesiumGS/cesium/issues/9827). The old default will be restored once the issue has been resolved.
  由于 WebGL 回归问题，在 iPad 和 iOS 上默认临时禁用 `Scene.orderIndependentTranslucency`，参见 [#9827](https://github.com/CesiumGS/cesium/issues/9827)。问题解决后将恢复原有默认值。

### Additions :tada:

- Improved rendering of ground and sky atmosphere. [#10063](https://github.com/CesiumGS/cesium/pull/10063)
  改进了地面大气层和天空大气层的渲染效果。[#10063](https://github.com/CesiumGS/cesium/pull/10063)
- Added support for morph targets in `ModelExperimental`. [#10271](https://github.com/CesiumGS/cesium/pull/10271)
  在 `ModelExperimental` 中新增对变形目标（morph targets）的支持。[#10271](https://github.com/CesiumGS/cesium/pull/10271)
- Added support for skins in `ModelExperimental`. [#10282](https://github.com/CesiumGS/cesium/pull/10282)
  在 `ModelExperimental` 中新增对骨骼蒙皮（skins）的支持。[#10282](https://github.com/CesiumGS/cesium/pull/10282)
- Added support for animations in `ModelExperimental`. [#10314](https://github.com/CesiumGS/cesium/pull/10314)
  在 `ModelExperimental` 中新增对动画（animations）的支持。[#10314](https://github.com/CesiumGS/cesium/pull/10314)
- Added `debugWireframe` to `ModelExperimental`. [#10332](https://github.com/CesiumGS/cesium/pull/10332)
  在 `ModelExperimental` 中新增 `debugWireframe`（线框调试）功能。[#10332](https://github.com/CesiumGS/cesium/pull/10332)
- Added `GeoJsonSource.process` to support adding features without removing existing entities, similar to `CzmlDataSource.process`. [#9275](https://github.com/CesiumGS/cesium/issues/9275)
  新增 `GeoJsonSource.process`，类似于 `CzmlDataSource.process`，支持在不移除已有实体的情况下增量添加要素。[#9275](https://github.com/CesiumGS/cesium/issues/9275)
- `KmlDataSource` now exposes the `camera` and `canvas` properties, which are used to provide information about the state of the `Viewer` when making network requests for a [`Link`](https://developers.google.com/kml/documentation/kmlreference#link). Passing these values in the constructor is now optional.
  `KmlDataSource` 现在公开了 `camera` 和 `canvas` 属性，用于在为 [`Link`](https://developers.google.com/kml/documentation/kmlreference#link) 发起网络请求时提供关于 `Viewer` 状态的信息。在构造函数中传入这些值现在变为可选操作。
- Prevent text selection in the Timeline widget. [#10325](https://github.com/CesiumGS/cesium/pull/10325)
  防止在 Timeline（时间线）控件中误选文本。[#10325](https://github.com/CesiumGS/cesium/pull/10325)

### Fixes :wrench:

- Fixed `GoogleEarthEnterpriseImageryProvider.requestImagery`, `GridImageryProvider.requestImagery`, and `TileCoordinateImageryProvider.requestImagery` return types to match interface. [#10265](https://github.com/CesiumGS/cesium/issues/10265)
  修复了 `GoogleEarthEnterpriseImageryProvider.requestImagery`、`GridImageryProvider.requestImagery` 和 `TileCoordinateImageryProvider.requestImagery` 的返回类型以匹配接口定义。[#10265](https://github.com/CesiumGS/cesium/issues/10265)
- Various property and return TypeScript definitions were corrected, and the `Event` class was made generic in order to support strongly typed event callbacks. [#10292](https://github.com/CesiumGS/cesium/pull/10292)
  更正了若干属性和返回值的 TypeScript 类型定义，并将 `Event` 类设为泛型以支持强类型事件回调。[#10292](https://github.com/CesiumGS/cesium/pull/10292)
- Fixed debug label rendering in `Cesium3dTilesInspector`. [#10246](https://github.com/CesiumGS/cesium/issues/10246)
  修复了 `Cesium3dTilesInspector` 中的调试标签渲染问题。[#10246](https://github.com/CesiumGS/cesium/issues/10246)
- Fixed a crash that occurred in `ModelExperimental` when loading a Draco-compressed model with tangents. [#10294](https://github.com/CesiumGS/cesium/pull/10294)
  修复了在 `ModelExperimental` 中加载带有切线向量（tangents）的 Draco 压缩模型时崩溃的问题。[#10294](https://github.com/CesiumGS/cesium/pull/10294)
- Fixed an incorrect model matrix computation for `i3dm` tilesets that are loaded using `ModelExperimental`. [#10302](https://github.com/CesiumGS/cesium/pull/10302)
  修复了使用 `ModelExperimental` 加载的 `i3dm` 瓦片集模型矩阵计算错误的问题。[#10302](https://github.com/CesiumGS/cesium/pull/10302)
- Fixed race condition during billboard clamping when the height reference changes. [#10191](https://github.com/CesiumGS/cesium/issues/10191)
  修复了当高度基准（height reference）改变时广告牌贴合过程中的竞态条件问题。[#10191](https://github.com/CesiumGS/cesium/issues/10191)
- Fixed ability to run `test` and other support tasks from within the release zip file. [#10311](https://github.com/CesiumGS/cesium/pull/10311)
  修复了在发布版本 zip 包内运行 `test` 及其他支持任务的功能。[#10311](https://github.com/CesiumGS/cesium/pull/10311)
- Fixed `Expression` multi-variable substitution. [#12455](https://github.com/CesiumGS/cesium/issues/12455)
  修复了 `Expression` 多变量替换的问题。[#12455](https://github.com/CesiumGS/cesium/issues/12455)

## 1.92 - 2022-04-01

### Breaking Changes :mega:

- Removed `Cesium.when`. Any `Promise` in the Cesium API has changed to the native `Promise` API. Code bases using cesium will likely need updates after this change. See the [upgrade guide](https://community.cesium.com/t/cesiumjs-is-switching-from-when-js-to-native-promises-which-will-be-a-breaking-change-in-1-92/17213) for instructions on how to update your code base to be compliant with native promises.
  移除了 `Cesium.when`。Cesium API 中的所有 `Promise` 均已转换为原生 `Promise` API。使用 Cesium 的代码库在此改动后可能需要更新。有关如何使代码库符合原生 Promise 规范的说明，请参阅[升级指南](https://community.cesium.com/t/cesiumjs-is-switching-from-when-js-to-native-promises-which-will-be-a-breaking-change-in-1-92/17213)。
- `ArcGisMapServerImageryProvider.readyPromise` will not reject if there is a failure unless the request cannot be retried.
  `ArcGisMapServerImageryProvider.readyPromise` 遇到失败时不会 reject，除非该请求无法重试。
- `SingleTileImageryProvider.readyPromise` will not reject if there is a failure unless the request cannot be retried.
  `SingleTileImageryProvider.readyPromise` 遇到失败时不会 reject，除非该请求无法重试。
- Removed links to SpecRunner.html and related Jasmine files for running unit tests in browsers.
  移除了在浏览器中运行单元测试的 SpecRunner.html 及相关 Jasmine 文件的链接。

### Additions :tada:

- Added experimental support for the [3D Tiles 1.1 draft](https://github.com/CesiumGS/3d-tiles/pull/666). [#10189](https://github.com/CesiumGS/cesium/pull/10189)
  新增对 [3D Tiles 1.1 草案](https://github.com/CesiumGS/3d-tiles/pull/666) 的实验性支持。[#10189](https://github.com/CesiumGS/cesium/pull/10189)
- Added support for `EXT_structural_metadata` property attributes in `CustomShader` [#10228](https://github.com/CesiumGS/cesium/pull/10228)
  在 `CustomShader` 中新增对 `EXT_structural_metadata` 属性 Attribute（property attributes）的支持。[#10228](https://github.com/CesiumGS/cesium/pull/10228)
- Added partial support for `EXT_structural_metadata` property textures in `CustomShader` [#10247](https://github.com/CesiumGS/cesium/pull/10247)
  在 `CustomShader` 中新增对 `EXT_structural_metadata` 属性纹理（property textures）的部分支持。[#10247](https://github.com/CesiumGS/cesium/pull/10247)
- Added `minimumPixelSize`, `scale`, and `maximumScale` to `ModelExperimental`. [#10092](https://github.com/CesiumGS/cesium/pull/10092)
  在 `ModelExperimental` 中新增 `minimumPixelSize`、`scale` 和 `maximumScale` 属性。[#10092](https://github.com/CesiumGS/cesium/pull/10092)
- `Cesium3DTileset` now has a `splitDirection` property, allowing the tileset to only be drawn on the left or right side of the screen. This is useful for visual comparison of tilesets. [#10193](https://github.com/CesiumGS/cesium/pull/10193)
  `Cesium3DTileset` 现具有 `splitDirection` 属性，允许仅在屏幕左侧或右侧绘制瓦片集。这对于瓦片集的视觉对比非常有用。[#10193](https://github.com/CesiumGS/cesium/pull/10193)
- Added `lightColor` to `ModelExperimental` [#10207](https://github.com/CesiumGS/cesium/pull/10207)
  在 `ModelExperimental` 中新增 `lightColor` 光照颜色属性。[#10207](https://github.com/CesiumGS/cesium/pull/10207)
- Added image-based lighting to `ModelExperimental`. [#10234](https://github.com/CesiumGS/cesium/pull/10234)
  在 `ModelExperimental` 中新增基于图像的光照（IBL）支持。[#10234](https://github.com/CesiumGS/cesium/pull/10234)
- Added clipping planes to `ModelExperimental`. [#10250](https://github.com/CesiumGS/cesium/pull/10250)
  在 `ModelExperimental` 中新增裁剪面（clipping planes）支持。[#10250](https://github.com/CesiumGS/cesium/pull/10250)
- Added `Cartesian2.clamp`, `Cartesian3.clamp`, and `Cartesian4.clamp`. [#10197](https://github.com/CesiumGS/cesium/pull/10197)
  新增 `Cartesian2.clamp`、`Cartesian3.clamp` 和 `Cartesian4.clamp` 函数。[#10197](https://github.com/CesiumGS/cesium/pull/10197)
- Added a 'renderable' property to 'Fog' to disable its visual rendering while preserving tiles culling at a distance. [#10186](https://github.com/CesiumGS/cesium/pull/10186)
  在 `Fog` 中新增 `renderable` 属性，用于禁用雾效的视觉渲染，同时保留远距离瓦片剔除效果。[#10186](https://github.com/CesiumGS/cesium/pull/10186)
- Refactored metadata API so `tileset.metadata` and `content.group.metadata` are more symmetric with `content.metadata` and `tile.metadata`. [#10224](https://github.com/CesiumGS/cesium/pull/10224)
  重构了元数据 API，使 `tileset.metadata` 和 `content.group.metadata` 与 `content.metadata` 和 `tile.metadata` 之间更加对称统一。[#10224](https://github.com/CesiumGS/cesium/pull/10224)

### Fixes :wrench:

- Fixed `Scene` documentation for `msaaSamples` property. [#10205](https://github.com/CesiumGS/cesium/pull/10205)
  修复了 `Scene` 中 `msaaSamples` 属性的文档说明。[#10205](https://github.com/CesiumGS/cesium/pull/10205)
- Fixed a bug where `pnts` tiles would crash when `Cesium.ExperimentalFeatures.enableModelExperimental` was true. [#10183](https://github.com/CesiumGS/cesium/pull/10183)
  修复了当 `Cesium.ExperimentalFeatures.enableModelExperimental` 为 true 时 `pnts` 瓦片会导致程序崩溃的 Bug。[#10183](https://github.com/CesiumGS/cesium/pull/10183)
- Fixed an issue with Firefox and dimensionless SVG images. [#9191](https://github.com/CesiumGS/cesium/pull/9191)
  修复了 Firefox 浏览器下无尺寸 SVG 图像的问题。[#9191](https://github.com/CesiumGS/cesium/pull/9191)
- Fixed `ShadowMap` documentation for `options.pointLightRadius` type. [#10195](https://github.com/CesiumGS/cesium/pull/10195)
  修复了 `ShadowMap` 中 `options.pointLightRadius` 类型的文档说明。[#10195](https://github.com/CesiumGS/cesium/pull/10195)
- Fixed evaluation of `minimumLevel` on metadataFailure for TileMapServiceImageryProvider. [#10198](https://github.com/CesiumGS/cesium/pull/10198)
  修复了 TileMapServiceImageryProvider 元数据获取失败（metadataFailure）时对 `minimumLevel` 的求值计算。[#10198](https://github.com/CesiumGS/cesium/pull/10198)
- Fixed a bug where models without normals would render as solid black. Now, such models will use unlit shading. [#10237](https://github.com/CesiumGS/cesium/pull/10237)
  修复了缺少法线的模型会渲染为纯黑色的 Bug。现在此类模型将使用无光照（unlit）着色。[#10237](https://github.com/CesiumGS/cesium/pull/10237)

### Deprecated :hourglass_flowing_sand:

- `ImagerySplitDirection` and `Scene.imagerySplitPosition` have been deprecated and will be removed in CesiumJS 1.94. Use `SplitDirection` and `Scene.splitPosition` instead.
  `ImagerySplitDirection` 和 `Scene.imagerySplitPosition` 已被废弃，并将于 CesiumJS 1.94 中移除。请改用 `SplitDirection` 和 `Scene.splitPosition`。
- Tilesets and models should now specify image-based lighting parameters in `ImageBasedLighting` instead of as individual options. The individual parameters are deprecated and will be removed in CesiumJS 1.94. [#10226](https://github.com/CesiumGS/cesium/pull/10226)
  瓦片集和模型现在应在 `ImageBasedLighting` 中指定基于图像的光照参数，而不是作为独立选项指定。各独立参数已被废弃，将于 CesiumJS 1.94 中移除。[#10226](https://github.com/CesiumGS/cesium/pull/10226)

## 1.91 - 2022-03-01

### Breaking Changes :mega:

- In Cesium 1.92, `when.js` will be removed and replaced with native promises. `Cesium.when` is deprecated and will be removed in 1.92. Any `Promise` returned from a function as of 1.92 will switch the native `Promise` API. Code bases using cesium will likely need updates after this change. See the [upgrade guide](https://community.cesium.com/t/cesiumjs-is-switching-from-when-js-to-native-promises-which-will-be-a-breaking-change-in-1-92/17213) for instructions on how to update your code base to be compliant with native promises.
  在 Cesium 1.92 中，`when.js` 将被移除并替换为原生 Promise。`Cesium.when` 已被废弃并将于 1.92 中移除。从 1.92 起，函数返回的所有 `Promise` 将切换为原生 `Promise` API。使用 Cesium 的代码库在此改动后可能需要更新。请参阅[升级指南](https://community.cesium.com/t/cesiumjs-is-switching-from-when-js-to-native-promises-which-will-be-a-breaking-change-in-1-92/17213)以了解如何更新代码。
- Fixed an inconsistently handled exception in `camera.getPickRay` that arises when the scene is not rendered. `camera.getPickRay` can now return undefined. [#10139](https://github.com/CesiumGS/cesium/pull/10139)
  修复了当场景未渲染时 `camera.getPickRay` 异常处理不一致的问题。`camera.getPickRay` 现在允许返回 undefined。[#10139](https://github.com/CesiumGS/cesium/pull/10139)

### Additions :tada:

- Added MSAA support for WebGL2. Enabled in the `Viewer` constructor with the `msaaSamples` option and can be controlled through `Scene.msaaSamples`.
  为 WebGL2 添加了 MSAA（多重采样抗锯齿）支持。可在 `Viewer` 构造函数中使用 `msaaSamples` 选项开启，并通过 `Scene.msaaSamples` 进行控制。
- glTF contents now use `ModelExperimental` by default. [#10055](https://github.com/CesiumGS/cesium/pull/10055)
  glTF 内容现在默认使用 `ModelExperimental` 加载。[#10055](https://github.com/CesiumGS/cesium/pull/10055)
- Added the ability to toggle back-face culling in `ModelExperimental`. [#10070](https://github.com/CesiumGS/cesium/pull/10070)
  在 `ModelExperimental` 中新增切换背面剔除（back-face culling）的功能。[#10070](https://github.com/CesiumGS/cesium/pull/10070)
- Added `depthPlaneEllipsoidOffset` to `Viewer` and `Scene` constructors to address rendering artifacts below the WGS84 ellipsoid. [#9200](https://github.com/CesiumGS/cesium/pull/9200)
  在 `Viewer` 和 `Scene` 构造函数中新增 `depthPlaneEllipsoidOffset` 选项，以解决 WGS84 椭球体下方的渲染伪影问题。[#9200](https://github.com/CesiumGS/cesium/pull/9200)
- Added support for `debugColorTiles` in `ModelExperimental`. [#10071](https://github.com/CesiumGS/cesium/pull/10071)
  在 `ModelExperimental` 中新增对 `debugColorTiles`（瓦片调试着色）的支持。[#10071](https://github.com/CesiumGS/cesium/pull/10071)
- Added support for shadows in `ModelExperimental`. [#10077](https://github.com/CesiumGS/cesium/pull/10077)
  在 `ModelExperimental` 中新增对阴影（shadows）的支持。[#10077](https://github.com/CesiumGS/cesium/pull/10077)
- Added `packArray` and `unpackArray` for matrix types. [#10118](https://github.com/CesiumGS/cesium/pull/10118)
  为矩阵类型新增了 `packArray` 和 `unpackArray` 方法。[#10118](https://github.com/CesiumGS/cesium/pull/10118)
- Added more affine transformation helper functions to `Matrix2`, `Matrix3`, and `Matrix4`. [#10124](https://github.com/CesiumGS/cesium/pull/10124)
  为 `Matrix2`、`Matrix3` 和 `Matrix4` 添加了更多仿射变换辅助函数。[#10124](https://github.com/CesiumGS/cesium/pull/10124)
  - Added `setScale`, `setUniformScale`, `setRotation`, `getRotation`, and `multiplyByUniformScale` to `Matrix2`.
    在 `Matrix2` 中新增 `setScale`、`setUniformScale`、`setRotation`、`getRotation` 和 `multiplyByUniformScale`。
  - Added `setScale`, `setUniformScale`, `setRotation`, and `multiplyByUniformScale` to `Matrix3`.
    在 `Matrix3` 中新增 `setScale`、`setUniformScale`、`setRotation` 和 `multiplyByUniformScale`。
  - Added `setUniformScale`, `setRotation`, `getRotation`, and `fromRotation` to `Matrix4`.
    在 `Matrix4` 中新增 `setUniformScale`、`setRotation`、`getRotation` 和 `fromRotation`。
- Added `AxisAlignedBoundingBox.fromCorners`. [#10130](https://github.com/CesiumGS/cesium/pull/10130)
  新增 `AxisAlignedBoundingBox.fromCorners`。[#10130](https://github.com/CesiumGS/cesium/pull/10130)
- Added `BoundingSphere.fromTransformation`. [#10130](https://github.com/CesiumGS/cesium/pull/10130)
  新增 `BoundingSphere.fromTransformation`。[#10130](https://github.com/CesiumGS/cesium/pull/10130)
- Added `OrientedBoundingBox.fromTransformation`, `OrientedBoundingBox.computeCorners`, and `OrientedBoundingBox.computeTransformation`. [#10130](https://github.com/CesiumGS/cesium/pull/10130)
  新增 `OrientedBoundingBox.fromTransformation`、`OrientedBoundingBox.computeCorners` 和 `OrientedBoundingBox.computeTransformation`。[#10130](https://github.com/CesiumGS/cesium/pull/10130)
- Added `Rectangle.subsection`. [#10130](https://github.com/CesiumGS/cesium/pull/10130)
  新增 `Rectangle.subsection`。[#10130](https://github.com/CesiumGS/cesium/pull/10130)
- Added option to show tileset credits on screen. [#10144](https://github.com/CesiumGS/cesium/pull/10144)
  新增在屏幕上显示瓦片集版权署名信息的选项。[#10144](https://github.com/CesiumGS/cesium/pull/10144)
- glTF copyrights now appear under the credits display. [#10138](https://github.com/CesiumGS/cesium/pull/10138)
  glTF 版权信息现在显示在署名信息显示区中。[#10138](https://github.com/CesiumGS/cesium/pull/10138)
- Credits are now sorted based on their number of occurrences. [#10141](https://github.com/CesiumGS/cesium/pull/10141)
  署名信息现在根据出现次数进行排序。[#10141](https://github.com/CesiumGS/cesium/pull/10141)

### Fixes :wrench:

- Fixed a bug where updating `ModelExperimental`'s model matrix would not update its bounding sphere. [#10078](https://github.com/CesiumGS/cesium/pull/10078)
  修复了更新 `ModelExperimental` 的模型矩阵未能更新其包围球的 Bug。[#10078](https://github.com/CesiumGS/cesium/pull/10078)
- Fixed feature ID texture artifacts on Safari. [#10111](https://github.com/CesiumGS/cesium/pull/10111)
  修复了 Safari 浏览器上的要素 ID 纹理渲染伪影。[#10111](https://github.com/CesiumGS/cesium/pull/10111)
- Fixed a bug where a translucent shader applied to a `ModelExperimental` with opaque features was not being rendered. [#10110](https://github.com/CesiumGS/cesium/pull/10110)
  修复了应用于包含不透明要素的 `ModelExperimental` 的半透明着色器未被渲染的 Bug。[#10110](https://github.com/CesiumGS/cesium/pull/10110)

## 1.90 - 2022-02-01

### Additions :tada:

- Feature IDs for styling and picking in `ModelExperimental` can now be selected via `(tileset|model).featureIdIndex` and `(tileset|model).instanceFeatureIdIndex`. [#10018](https://github.com/CesiumGS/cesium/pull/10018)
  `ModelExperimental` 中用于样式设置和拾取的要素 ID 现在可通过 `(tileset|model).featureIdIndex` 和 `(tileset|model).instanceFeatureIdIndex` 进行选择。[#10018](https://github.com/CesiumGS/cesium/pull/10018)
- Added support for all types of feature IDs in `CustomShader`. [#10018](https://github.com/CesiumGS/cesium/pull/10018)
  在 `CustomShader` 中添加了对所有类型要素 ID 的支持。[#10018](https://github.com/CesiumGS/cesium/pull/10018)
- Moved documentation for `CustomShader` into `Documentation/CustomShaderGuide/` to make it more discoverable. [#10054](https://github.com/CesiumGS/cesium/pull/10054)
  将 `CustomShader` 的文档移至 `Documentation/CustomShaderGuide/`，使其更易查阅。[#10054](https://github.com/CesiumGS/cesium/pull/10054)
- Added getters `Cesium3DTileFeature.featureId` and `ModelFeature.featureId` so the feature ID or batch ID can be accessed from a picked feature. [#10022](https://github.com/CesiumGS/cesium/pull/10022)
  新增 getter 属性 `Cesium3DTileFeature.featureId` 和 `ModelFeature.featureId`，以便从拾取的要素中访问要素 ID 或批次 ID（batch ID）。[#10022](https://github.com/CesiumGS/cesium/pull/10022)
- Added `I3dmLoader` to transcode .i3dm to `ModelExperimental`. [#9968](https://github.com/CesiumGS/cesium/pull/9968)
  新增 `I3dmLoader`，用于将 .i3dm 转码为 `ModelExperimental`。[#9968](https://github.com/CesiumGS/cesium/pull/9968)
- Added `PntsLoader` to transcode .pnts to `ModelExperimental`. [#9978](https://github.com/CesiumGS/cesium/pull/9978)
  新增 `PntsLoader`，用于将 .pnts 转码为 `ModelExperimental`。[#9978](https://github.com/CesiumGS/cesium/pull/9978)
- Added point cloud attenuation support to `ModelExperimental`. [#9998](https://github.com/CesiumGS/cesium/pull/9998)
  在 `ModelExperimental` 中新增对点云衰减（attenuation）的支持。[#9998](https://github.com/CesiumGS/cesium/pull/9998)

### Fixes :wrench:

- Fixed an error when loading GeoJSON with null `stroke` or `fill` properties but valid opacity values. [#9717](https://github.com/CesiumGS/cesium/pull/9717)
  修复了加载带有 null 的 `stroke` 或 `fill` 属性但包含有效不透明度数值的 GeoJSON 时报错的问题。[#9717](https://github.com/CesiumGS/cesium/pull/9717)
- Fixed `scene.pickTranslucentDepth` for translucent point clouds with eye dome lighting. [#9991](https://github.com/CesiumGS/cesium/pull/9991)
  修复了在使用视顶照明（eye dome lighting）时半透明点云的 `scene.pickTranslucentDepth` 问题。[#9991](https://github.com/CesiumGS/cesium/pull/9991)
- Added a setter for `tileset.pointCloudShading` that throws if set to `undefined` to clarify that this is disallowed. [#9998](https://github.com/CesiumGS/cesium/pull/9998)
  为 `tileset.pointCloudShading` 添加了 setter，若设置为 `undefined` 则抛出异常以明确禁止该操作。[#9998](https://github.com/CesiumGS/cesium/pull/9998)
- Fixes handling .b3dm `_BATCHID` accessors in `ModelExperimental` [#10008](https://github.com/CesiumGS/cesium/pull/10008) and [10031](https://github.com/CesiumGS/cesium/pull/10031)
  修复了 `ModelExperimental` 中处理 .b3dm `_BATCHID` 访问器的问题 [#10008](https://github.com/CesiumGS/cesium/pull/10008) 与 [10031](https://github.com/CesiumGS/cesium/pull/10031)
- Fixed path entity being drawn when data is unavailable [#1704](https://github.com/CesiumGS/cesium/pull/1704)
  修复了在数据不可用时 Path 实体仍被绘制的问题 [#1704](https://github.com/CesiumGS/cesium/pull/1704)
- Fixed setting `tileset.imageBasedLightingFactor` has no effect on i3dm tile content. [#10020](https://github.com/CesiumGS/cesium/pull/10020)
  修复了设置 `tileset.imageBasedLightingFactor` 对 i3dm 瓦片内容无效的问题。[#10020](https://github.com/CesiumGS/cesium/pull/10020)
- Zooming out is no longer sluggish when close to `screenSpaceCameraController.minimumDistance`. [#9932](https://github.com/CesiumGS/cesium/pull/9932)
  当接近 `screenSpaceCameraController.minimumDistance` 时缩小操作不再迟钝卡顿。[#9932](https://github.com/CesiumGS/cesium/pull/9932)
- Fixed Particle System Weather sandcastle demo to work with new ES6 rules. [#10045](https://github.com/CesiumGS/cesium/pull/10045)
  修复了 Particle System Weather Sandcastle 示例以适配新的 ES6 规则。[#10045](https://github.com/CesiumGS/cesium/pull/10045)

## 1.89 - 2022-01-03

### Breaking Changes :mega:

- Removed `Scene.debugShowGlobeDepth`. [#9965](https://github.com/CesiumGS/cesium/pull/9965)
  移除了 `Scene.debugShowGlobeDepth`。[#9965](https://github.com/CesiumGS/cesium/pull/9965)
- Removed `CesiumInspectorViewModel.globeDepth` and `CesiumInspectorViewModel.pickDepth`. [#9965](https://github.com/CesiumGS/cesium/pull/9965)
  移除了 `CesiumInspectorViewModel.globeDepth` 和 `CesiumInspectorViewModel.pickDepth`。[#9965](https://github.com/CesiumGS/cesium/pull/9965)
- `barycentricCoordinates` returns `undefined` when the input triangle is degenerate. [#9175](https://github.com/CesiumGS/cesium/pull/9175)
  当输入三角形退化（degenerate）时，`barycentricCoordinates` 返回 `undefined`。[#9175](https://github.com/CesiumGS/cesium/pull/9175)

### Additions :tada:

- Added a `pointSize` field to custom vertex shaders for more control over shading point clouds. [#9960](https://github.com/CesiumGS/cesium/pull/9960)
  在自定义顶点着色器中新增 `pointSize` 字段，以更精细地控制点云着色。[#9960](https://github.com/CesiumGS/cesium/pull/9960)
- Added `lambertDiffuseMultiplier` property to Globe object to enhance terrain lighting. [#9878](https://github.com/CesiumGS/cesium/pull/9878)
  在 Globe 对象中新增 `lambertDiffuseMultiplier` 属性以增强地形光照效果。[#9878](https://github.com/CesiumGS/cesium/pull/9878)
- Added `getFeatureInfoUrl` option to `WebMapServiceImageryProvider` which reads the getFeatureInfo request URL for WMS service if it differs with the getCapabilities URL. [#9563](https://github.com/CesiumGS/cesium/pull/9563)
  在 `WebMapServiceImageryProvider` 中新增 `getFeatureInfoUrl` 选项，当 WMS 服务的 getFeatureInfo 请求 URL 与 getCapabilities URL 不同时读取该选项。[#9563](https://github.com/CesiumGS/cesium/pull/9563)
- Added `tileset.enableModelExperimental` so tilesets with `Model` and `ModelExperimental` can be mixed in the same scene. [#9982](https://github.com/CesiumGS/cesium/pull/9982)
  新增 `tileset.enableModelExperimental` 属性，使基于 `Model` 和 `ModelExperimental` 的瓦片集能够在同一场景中混合共存。[#9982](https://github.com/CesiumGS/cesium/pull/9982)

### Fixes :wrench:

- Fixed handling of vec3 vertex colors in `ModelExperimental`. [#9955](https://github.com/CesiumGS/cesium/pull/9955)
  修复了 `ModelExperimental` 中处理 vec3 顶点颜色的问题。[#9955](https://github.com/CesiumGS/cesium/pull/9955)
- Fixed handling of Draco quantized vec3 vertex colors in `ModelExperimental`. [#9957](https://github.com/CesiumGS/cesium/pull/9957)
  修复了 `ModelExperimental` 中处理 Draco 量化 vec3 顶点颜色的问题。[#9957](https://github.com/CesiumGS/cesium/pull/9957)
- Fixed handling of vec3 vertex colors in `CustomShaderPipelineStage`. [#9964](https://github.com/CesiumGS/cesium/pull/9964)
  修复了 `CustomShaderPipelineStage` 中处理 vec3 顶点颜色的问题。[#9964](https://github.com/CesiumGS/cesium/pull/9964)
- Fixes how `Camera.changed` handles changes in `heading`. [#9970](https://github.com/CesiumGS/cesium/pull/9970)
  修复了 `Camera.changed` 处理 `heading`（航向角）变化的方式。[#9970](https://github.com/CesiumGS/cesium/pull/9970)
- Fixed handling of subtree root transforms in `Implicit3DTileContent`. [#9971](https://github.com/CesiumGS/cesium/pull/9971)
  修复了 `Implicit3DTileContent` 中对子树根节点变换（subtree root transforms）的处理。[#9971](https://github.com/CesiumGS/cesium/pull/9971)
- Fixed issue in `ModelExperimental` where indices were not the correct data type after draco decode. [#9974](https://github.com/CesiumGS/cesium/pull/9974)
  修复了 `ModelExperimental` 中 Draco 解码后索引数据类型不正确的问题。[#9974](https://github.com/CesiumGS/cesium/pull/9974)
- Fixed WMS 1.3.0 `GetMap` `bbox` parameter so that it follows the axis ordering as defined in the EPSG database. [#9797](https://github.com/CesiumGS/cesium/pull/9797)
  修复了 WMS 1.3.0 `GetMap` 的 `bbox` 参数，使其遵循 EPSG 数据库中定义的坐标轴顺序。[#9797](https://github.com/CesiumGS/cesium/pull/9797)
- Fixed `KmlDataSource` so that it can handle relative URLs for additional elements - video, audio, iframe etc. [#9328](https://github.com/CesiumGS/cesium/pull/9328)
  修复了 `KmlDataSource`，使其能够处理视频、音频、iframe 等附加元素的相对 URL。[#9328](https://github.com/CesiumGS/cesium/pull/9328)

## 1.88 - 2021-12-01

### Fixes :wrench:

- Fixed a bug with .ktx2 textures having an incorrect minification filter. [#9876](https://github.com/CesiumGS/cesium/pull/9876/)
  修复了 .ktx2 纹理的缩小过滤（minification filter）设置错误的 Bug。[#9876](https://github.com/CesiumGS/cesium/pull/9876/)
- Fixed incorrect diffuse texture alpha in glTFs with the `KHR_materials_pbrSpecularGlossiness` extension. [#9943](https://github.com/CesiumGS/cesium/pull/9943)
  修复了带有 `KHR_materials_pbrSpecularGlossiness` 扩展的 glTF 模型中漫反射纹理 alpha 透明度错误的问题。[#9943](https://github.com/CesiumGS/cesium/pull/9943)

## 1.87.1 - 2021-11-09

### Additions :tada:

- Added experimental implementations of [3D Tiles Next](https://github.com/CesiumGS/3d-tiles/tree/main/next). The following extensions are supported:
  添加了 [3D Tiles Next](https://github.com/CesiumGS/3d-tiles/tree/main/next) 的实验性实现。支持以下扩展：
  - [3DTILES_content_gltf](https://github.com/CesiumGS/3d-tiles/tree/main/extensions/3DTILES_content_gltf) for using glTF models directly as tile contents
    [3DTILES_content_gltf](https://github.com/CesiumGS/3d-tiles/tree/main/extensions/3DTILES_content_gltf)，用于直接使用 glTF 模型作为瓦片内容
  - [3DTILES_metadata](https://github.com/CesiumGS/3d-tiles/tree/main/extensions/3DTILES_metadata) for adding structured metadata to tilesets, tiles, or groups of tile content
    [3DTILES_metadata](https://github.com/CesiumGS/3d-tiles/tree/main/extensions/3DTILES_metadata)，用于向瓦片集、瓦片或瓦片内容组添加结构化元数据
  - [EXT_mesh_features](https://github.com/KhronosGroup/glTF/pull/2082) for adding feature identification and feature metadata to glTF models
    [EXT_mesh_features](https://github.com/KhronosGroup/glTF/pull/2082)，用于向 glTF 模型添加要素标识和要素元数据
  - [3DTILES_implicit_tiling](https://github.com/CesiumGS/3d-tiles/tree/main/extensions/3DTILES_implicit_tiling) for a compact representation of quadtrees and octrees
    [3DTILES_implicit_tiling](https://github.com/CesiumGS/3d-tiles/tree/main/extensions/3DTILES_implicit_tiling)，用于四叉树和八叉树的紧凑表示
  - [3DTILES_bounding_volume_S2](https://github.com/CesiumGS/3d-tiles/tree/main/extensions/3DTILES_bounding_volume_S2) for [S2](https://s2geometry.io/) bounding volumes
    [3DTILES_bounding_volume_S2](https://github.com/CesiumGS/3d-tiles/tree/main/extensions/3DTILES_bounding_volume_S2)，用于 [S2](https://s2geometry.io/) 包围体
  - [3DTILES_multiple_contents](https://github.com/CesiumGS/3d-tiles/tree/main/extensions/3DTILES_multiple_contents) for storing multiple contents within a single tile
    [3DTILES_multiple_contents](https://github.com/CesiumGS/3d-tiles/tree/main/extensions/3DTILES_multiple_contents)，用于在单个瓦片内存储多个内容
- Added `ModelExperimental`, a new experimental architecture for loading glTF models. It is disabled by default; set `ExperimentalFeatures.enableModelExperimental = true` to enable it.
  新增了 `ModelExperimental`，这是一种用于加载 glTF 模型的全新实验性架构。默认禁用；设置 `ExperimentalFeatures.enableModelExperimental = true` 即可启用。
- Added `CustomShader` class for styling `Cesium3DTileset` or `ModelExperimental` with custom GLSL shaders
  新增了 `CustomShader` 类，用于通过自定义 GLSL 着色器对 `Cesium3DTileset` 或 `ModelExperimental` 设置样式。
- Added Sandcastle examples for 3D Tiles Next: [Photogrammetry Classification](http://sandcastle.cesium.com/index.html?src=3D%20Tiles%20Next%20Photogrammetry%20Classification.html&label=3D%20Tiles%20Next), [CDB Yemen](http://sandcastle.cesium.com/index.html?src=3D%20Tiles%20Next%20CDB%20Yemen.html&label=3D%20Tiles%20Next), and [S2 Globe](http://sandcastle.cesium.com/index.html?src=3D%20Tiles%20Next%20S2%20Globe.html&label=3D%20Tiles%20Next)
  新增了 3D Tiles Next 的 Sandcastle 示例：[摄影测量分类（Photogrammetry Classification）](http://sandcastle.cesium.com/index.html?src=3D%20Tiles%20Next%20Photogrammetry%20Classification.html&label=3D%20Tiles%20Next)、[CDB 也门（CDB Yemen）](http://sandcastle.cesium.com/index.html?src=3D%20Tiles%20Next%20CDB%20Yemen.html&label=3D%20Tiles%20Next) 以及 [S2 地球（S2 Globe）](http://sandcastle.cesium.com/index.html?src=3D%20Tiles%20Next%20S2%20Globe.html&label=3D%20Tiles%20Next)。

## 1.87 - 2021-11-01

### Additions :tada:

- Added `ScreenOverlay` support to `KmlDataSource`. [#9864](https://github.com/CesiumGS/cesium/pull/9864)
  在 `KmlDataSource` 中增加了对 `ScreenOverlay` 的支持。[#9864](https://github.com/CesiumGS/cesium/pull/9864)
- Added back some support for Draco attribute quantization as a workaround until a full fix in the next Draco version. [#9904](https://github.com/CesiumGS/cesium/pull/9904)
  重新添加了对 Draco 属性量化的部分支持作为临时融通方案，直到下个 Draco 版本中完全修复。[#9904](https://github.com/CesiumGS/cesium/pull/9904)
- Added `CumulusCloud.color` for customizing cloud colors. [#9877](https://github.com/CesiumGS/cesium/pull/9877)
  新增了 `CumulusCloud.color`，用于自定义云层颜色。[#9877](https://github.com/CesiumGS/cesium/pull/9877)

### Fixes :wrench:

- Point cloud styles that reference a missing property now treat the missing property as `undefined` rather than throwing an error. [#9882](https://github.com/CesiumGS/cesium/pull/9882)
  引用不存在属性的点云样式现在将缺失的属性视为 `undefined` 而非抛出错误。[#9882](https://github.com/CesiumGS/cesium/pull/9882)
- Fixed Draco attribute quantization in point clouds. [#9908](https://github.com/CesiumGS/cesium/pull/9908)
  修复了点云中的 Draco 属性量化问题。[#9908](https://github.com/CesiumGS/cesium/pull/9908)
- Fixed crashes caused by the cloud noise texture exceeding WebGL's maximum supported texture size. [#9885](https://github.com/CesiumGS/cesium/pull/9885)
  修复了云噪声纹理超出 WebGL 支持的最大纹理尺寸所导致的崩溃。[#9885](https://github.com/CesiumGS/cesium/pull/9885)
- Updated third-party zip.js library to 2.3.12 to fix compatibility with Webpack 4. [#9897](https://github.com/cesiumgs/cesium/pull/9897)
  将第三方库 zip.js 更新至 2.3.12，以修复与 Webpack 4 的兼容性问题。[#9897](https://github.com/cesiumgs/cesium/pull/9897)

## 1.86.1 - 2021-10-15

### Fixes :wrench:

- Fixed zip.js configurations causing CesiumJS to not work with Node 16. [#9861](https://github.com/CesiumGS/cesium/pull/9861)
  修复了 zip.js 配置导致 CesiumJS 无法在 Node 16 中正常工作的问题。[#9861](https://github.com/CesiumGS/cesium/pull/9861)
- Fixed a bug in `Rectangle.union` with rectangles that span the entire globe. [#9866](https://github.com/CesiumGS/cesium/pull/9866)
  修复了 `Rectangle.union` 在处理跨越整个地球的矩形时存在的 Bug。[#9866](https://github.com/CesiumGS/cesium/pull/9866)

## 1.86 - 2021-10-01

### Breaking Changes :mega:

- Updated to Draco 1.4.1 and temporarily disabled attribute quantization. [#9847](https://github.com/CesiumGS/cesium/issues/9847)
  更新至 Draco 1.4.1 并临时禁用了属性量化。[#9847](https://github.com/CesiumGS/cesium/issues/9847)

### Fixes :wrench:

- Fixed incorrect behavior in `CameraFlightPath` when using Columbus View. [#9192](https://github.com/CesiumGS/cesium/pull/9192)
  修复了在哥伦布视图（Columbus View）下 `CameraFlightPath` 行为不正确的问题。[#9192](https://github.com/CesiumGS/cesium/pull/9192)

## 1.85 - 2021-09-01

### Breaking Changes :mega:

- Removed `Scene.terrainExaggeration` and `options.terrainExaggeration` for `CesiumWidget`, `Viewer`, and `Scene`, which were deprecated in CesiumJS 1.83. Use `Globe.terrainExaggeration` instead.
  移除了在 CesiumJS 1.83 中已弃用的 `Scene.terrainExaggeration` 以及 `CesiumWidget`、`Viewer` 和 `Scene` 的 `options.terrainExaggeration`。请改用 `Globe.terrainExaggeration`。

### Additions :tada:

- Added `CloudCollection` and `CumulusCloud` for adding procedurally generated clouds to a scene. [#9737](https://github.com/CesiumGS/cesium/pull/9737)
  新增了 `CloudCollection` 和 `CumulusCloud`，用于向场景中添加程序化生成的云。[#9737](https://github.com/CesiumGS/cesium/pull/9737)
- `BingMapsGeocoderService` now takes an optional [Culture Code](https://docs.microsoft.com/en-us/bingmaps/rest-services/common-parameters-and-types/supported-culture-codes) for localizing results. [#9729](https://github.com/CesiumGS/cesium/pull/9729)
  `BingMapsGeocoderService` 现在接受一个可选的[文化区域代码（Culture Code）](https://docs.microsoft.com/en-us/bingmaps/rest-services/common-parameters-and-types/supported-culture-codes)用于结果本地化。[#9729](https://github.com/CesiumGS/cesium/pull/9729)

### Fixes :wrench:

- Fixed several crashes related to point cloud eye dome lighting. [#9719](https://github.com/CesiumGS/cesium/pull/9719)
  修复了与点云眼穹顶照明（eye dome lighting / EDL）相关的若干崩溃问题。[#9719](https://github.com/CesiumGS/cesium/pull/9719)

## 1.84 - 2021-08-02

### Breaking Changes :mega:

- Dropped support for Internet Explorer, which was deprecated in CesiumJS 1.83.
  放弃了对 Internet Explorer 的支持，该支持在 CesiumJS 1.83 中已被弃用。

### Additions :tada:

- Added a `polylinePositions` getter to `Cesium3DTileFeature` that gets the decoded positions of a polyline vector feature. [#9684](https://github.com/CesiumGS/cesium/pull/9684)
  在 `Cesium3DTileFeature` 中新增了 `polylinePositions` getter，用于获取折线矢量要素解码后的坐标位置。[#9684](https://github.com/CesiumGS/cesium/pull/9684)
- Added `ImageryLayerCollection.pickImageryLayers`, which determines the imagery layers that are intersected by a pick ray. [#9651](https://github.com/CesiumGS/cesium/pull/9651)
  新增了 `ImageryLayerCollection.pickImageryLayers`，用于确定与拾取射线相交的影像图层。[#9651](https://github.com/CesiumGS/cesium/pull/9651)

### Fixes :wrench:

- Fixed an issue where styling vector points based on their batch table properties would crash. [#9692](https://github.com/CesiumGS/cesium/pull/9692)
  修复了根据批处理表（batch table）属性对矢量点设置样式时会导致崩溃的问题。[#9692](https://github.com/CesiumGS/cesium/pull/9692)
- Fixed an issue in `TileBoundingRegion.distanceToCamera` that caused incorrect results when the camera was on the opposite site of the globe. [#9678](https://github.com/CesiumGS/cesium/pull/9678)
  修复了当相机位于地球另一侧时 `TileBoundingRegion.distanceToCamera` 计算结果不正确的问题。[#9678](https://github.com/CesiumGS/cesium/pull/9678)
- Fixed an error with removing a CZML datasource when the clock interval has a duration of zero. [#9637](https://github.com/CesiumGS/cesium/pull/9637)
  修复了当时钟区间时长为 0 时移除 CZML 数据源报错的问题。[#9637](https://github.com/CesiumGS/cesium/pull/9637)
- Fixed the ability to set a material's image to `undefined` and `Material.DefaultImageId`. [#9644](https://github.com/CesiumGS/cesium/pull/9644)
  修复了将材质的图像设置为 `undefined` 和 `Material.DefaultImageId` 的功能。[#9644](https://github.com/CesiumGS/cesium/pull/9644)
- Fixed render crash when creating a `polylineVolume` with very close points. [#9669](https://github.com/CesiumGS/cesium/pull/9669)
  修复了使用距离非常接近的点创建 `polylineVolume` 时的渲染崩溃问题。[#9669](https://github.com/CesiumGS/cesium/pull/9669)
- Fixed a bug in `PolylineGeometry` that incorrectly shifted colors when duplicate positions were removed. [#9676](https://github.com/CesiumGS/cesium/pull/9676)
  修复了 `PolylineGeometry` 中移除重复坐标时导致颜色错误偏移的 Bug。[#9676](https://github.com/CesiumGS/cesium/pull/9676)
- Fixed the calculation of `OrientedBoundingBox.distancedSquaredTo` such that they handle `halfAxes` with magnitudes near zero. [#9670](https://github.com/CesiumGS/cesium/pull/9670)
  修复了 `OrientedBoundingBox.distancedSquaredTo` 的计算，使其能够正确处理长度接近零的 `halfAxes`。[#9670](https://github.com/CesiumGS/cesium/pull/9670)
- Fixed a crash that would hang the browser if a `Label` was created with a soft hyphen in its text. [#9682](https://github.com/CesiumGS/cesium/pull/9682)
  修复了如果创建文本中包含软连字符（soft hyphen）的 `Label` 会导致浏览器卡死的崩溃问题。[#9682](https://github.com/CesiumGS/cesium/pull/9682)
- Fixed the incorrect calculation of `distanceSquaredTo` in `BoundingSphere`. [#9686](https://github.com/CesiumGS/cesium/pull/9686)
  修复了 `BoundingSphere` 中 `distanceSquaredTo` 计算不正确的问题。[#9686](https://github.com/CesiumGS/cesium/pull/9686)

## 1.83 - 2021-07-01

### Breaking Changes :mega:

- Dropped support for KTX1 and Crunch textures; use the [`ktx2ktx2`](https://github.com/KhronosGroup/KTX-Software) converter tool to update existing KTX1 files.
  放弃了对 KTX1 和 Crunch 纹理的支持；请使用 [`ktx2ktx2`](https://github.com/KhronosGroup/KTX-Software) 转换工具更新现有的 KTX1 文件。

### Additions :tada:

- Added support for KTX2 and Basis Universal compressed textures. [#9513](https://github.com/CesiumGS/cesium/issues/9513)
  增加了对 KTX2 和 Basis Universal 压缩纹理的支持。[#9513](https://github.com/CesiumGS/cesium/issues/9513)
  - Added support for glTF models with the [`KHR_texture_basisu`](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_texture_basisu/README.md) extension.
    增加了对带有 [`KHR_texture_basisu`](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_texture_basisu/README.md) 扩展的 glTF 模型的支持。
  - Added support for 8-bit, 16-bit float, and 32-bit float KTX2 specular environment maps.
    增加了对 8 位、16 位浮点和 32 位浮点 KTX2 镜面反射环境贴图的支持。
  - Added support for KTX2 images in `Material`.
    在 `Material` 中增加了对 KTX2 图像的支持。
  - Added new `PixelFormat` and `WebGLConstants` enums from WebGL extensions `WEBGL_compressed_texture_etc`, `WEBGL_compressed_texture_astc`, and `EXT_texture_compression_bptc`.
    新增了来自 WebGL 扩展 `WEBGL_compressed_texture_etc`、`WEBGL_compressed_texture_astc` 和 `EXT_texture_compression_bptc` 的 `PixelFormat` 和 `WebGLConstants` 枚举值。
- Added dynamic terrain exaggeration with `Globe.terrainExaggeration` and `Globe.terrainExaggerationRelativeHeight`. [#9603](https://github.com/CesiumGS/cesium/pull/9603)
  通过 `Globe.terrainExaggeration` 和 `Globe.terrainExaggerationRelativeHeight` 新增了动态地形夸大功能。[#9603](https://github.com/CesiumGS/cesium/pull/9603)
- Added `CustomHeightmapTerrainProvider`, a simple `TerrainProvider` that gets height values from a callback function. [#9604](https://github.com/CesiumGS/cesium/pull/9604)
  新增了 `CustomHeightmapTerrainProvider`，这是一个通过回调函数获取高程值的简单 `TerrainProvider`。[#9604](https://github.com/CesiumGS/cesium/pull/9604)
- Added the ability to hide outlines on OSM Buildings and other tilesets and glTF models using the `CESIUM_primitive_outline` extension. [#8959](https://github.com/CesiumGS/cesium/issues/8959)
  增加了隐藏 OSM Buildings 以及使用 `CESIUM_primitive_outline` 扩展的其他瓦片集和 glTF 模型轮廓线的功能。[#8959](https://github.com/CesiumGS/cesium/issues/8959)
- Added checks for supported 3D Tiles extensions. [#9552](https://github.com/CesiumGS/cesium/issues/9552)
  增加了对支持的 3D Tiles 扩展的检查。[#9552](https://github.com/CesiumGS/cesium/issues/9552)
- Added option to ignore extraneous colorspace information in glTF textures and `ImageBitmap`. [#9624](https://github.com/CesiumGS/cesium/pull/9624)
  增加了忽略 glTF 纹理和 `ImageBitmap` 中无关色彩空间信息的选项。[#9624](https://github.com/CesiumGS/cesium/pull/9624)
- Added `options.fadingEnabled` parameter to `ShadowMap` to control whether shadows fade out when the light source is close to the horizon. [#9565](https://github.com/CesiumGS/cesium/pull/9565)
  在 `ShadowMap` 中新增了 `options.fadingEnabled` 参数，用于控制当光源接近地平线时阴影是否淡出。[#9565](https://github.com/CesiumGS/cesium/pull/9565)
- Added documentation clarifying that the `outlineWidth` property will be ignored on all major browsers on Windows platforms. [#9600](https://github.com/CesiumGS/cesium/pull/9600)
  增加了文档说明，澄清在 Windows 平台上的所有主流浏览器中 `outlineWidth` 属性都将被忽略。[#9600](https://github.com/CesiumGS/cesium/pull/9600)
- Added documentation for `KmlTour`, `KmlTourFlyTo`, and `KmlTourWait`. Added documentation and a `kmlTours` getter to `KmlDataSource`. Removed references to `KmlTourSoundCues`. [#8073](https://github.com/CesiumGS/cesium/issues/8073)
  增加了 `KmlTour`、`KmlTourFlyTo` 和 `KmlTourWait` 的文档。在 `KmlDataSource` 中增加了文档和 `kmlTours` getter。移除了对 `KmlTourSoundCues` 的引用。[#8073](https://github.com/CesiumGS/cesium/issues/8073)

### Fixes :wrench:

- Fixed a regression where older tilesets without a top-level `geometricError` would fail to load. [#9618](https://github.com/CesiumGS/cesium/pull/9618)
  修复了没有顶层 `geometricError` 的旧瓦片集加载失败的回归问题。[#9618](https://github.com/CesiumGS/cesium/pull/9618)
- Fixed an issue in `WebMapTileServiceImageryProvider` where using URL subdomains caused query parameters to be dropped from requests. [#9606](https://github.com/CesiumGS/cesium/pull/9606)
  修复了 `WebMapTileServiceImageryProvider` 中使用 URL 子域名导致请求中丢失查询参数的问题。[#9606](https://github.com/CesiumGS/cesium/pull/9606)
- Fixed an issue in `ScreenSpaceCameraController.tilt3DOnTerrain` that caused unexpected camera behavior when tilting terrain diagonally along the screen. [#9562](https://github.com/CesiumGS/cesium/pull/9562)
  修复了沿屏幕对角线倾斜地形时 `ScreenSpaceCameraController.tilt3DOnTerrain` 导致异常相机行为的问题。[#9562](https://github.com/CesiumGS/cesium/pull/9562)
- Fixed error handling in `GlobeSurfaceTile` to print terrain tile request errors to console. [#9570](https://github.com/CesiumGS/cesium/pull/9570)
  修复了 `GlobeSurfaceTile` 中的错误处理，以便将地形瓦片请求错误输出到控制台。[#9570](https://github.com/CesiumGS/cesium/pull/9570)
- Fixed broken image URL in the KML Sandcastle. [#9579](https://github.com/CesiumGS/cesium/pull/9579)
  修复了 KML Sandcastle 中损坏的图像 URL。[#9579](https://github.com/CesiumGS/cesium/pull/9579)
- Fixed an error where the `positionToEyeEC` and `tangentToEyeMatrix` properties for custom materials were not set in `GlobeFS`. [#9597](https://github.com/CesiumGS/cesium/pull/9597)
  修复了 `GlobeFS` 中未为自定义材质设置 `positionToEyeEC` 和 `tangentToEyeMatrix` 属性的错误。[#9597](https://github.com/CesiumGS/cesium/pull/9597)
- Fixed misleading documentation in `Matrix4.inverse` and `Matrix4.inverseTransformation` that used "affine transformation" instead of "rotation and translation" specifically. [#9608](https://github.com/CesiumGS/cesium/pull/9608)
  修复了 `Matrix4.inverse` 和 `Matrix4.inverseTransformation` 中误导性的文档说明，具体是将“仿射变换（affine transformation）”修正为更具体的“旋转和平移（rotation and translation）”。[#9608](https://github.com/CesiumGS/cesium/pull/9608)
- Fixed a regression where external images in glTF models were not being loaded with `preferImageBitmap`, which caused them to decode on the main thread and cause frame rate stuttering. [#9627](https://github.com/CesiumGS/cesium/pull/9627)
  修复了一个回归问题：glTF 模型中的外部图像未附带 `preferImageBitmap` 加载，导致它们在主线程上解码并引起帧率卡顿。[#9627](https://github.com/CesiumGS/cesium/pull/9627)
- Fixed misleading "else" case condition for `color` and `show` in `Cesium3DTileStyle`. A default `color` value is used if no `color` conditions are given. The default value for `show`, `true`, is used if no `show` conditions are given. [#9633](https://github.com/CesiumGS/cesium/pull/9633)
  修复了 `Cesium3DTileStyle` 中 `color` 和 `show` 容易误解的 "else" 条件。如果未给出 `color` 条件，则使用默认的 `color` 值；如果未给出 `show` 条件，则使用默认值 `true`。[#9633](https://github.com/CesiumGS/cesium/pull/9633)
- Fixed a crash that occurred after disabling and re-enabling a post-processing stage. This also prevents the screen from randomly flashing when enabling stages for the first time. [#9649](https://github.com/CesiumGS/cesium/pull/9649)
  修复了在禁用并重新启用后处理阶段（post-processing stage）后发生的崩溃。这还防止了在首次启用阶段时屏幕随机闪烁。[#9649](https://github.com/CesiumGS/cesium/pull/9649)

### Deprecated :hourglass_flowing_sand:

- `Scene.terrainExaggeration` and `options.terrainExaggeration` for `CesiumWidget`, `Viewer`, and `Scene` have been deprecated and will be removed in CesiumJS 1.85. They will be replaced with `Globe.terrainExaggeration`.
  `CesiumWidget`、`Viewer` 和 `Scene` 的 `Scene.terrainExaggeration` 以及 `options.terrainExaggeration` 已被弃用，并将在 CesiumJS 1.85 中移除。它们将被替换为 `Globe.terrainExaggeration`。
- Support for Internet Explorer has been deprecated and will end in CesiumJS 1.84.
  对 Internet Explorer 的支持已被弃用，并将于 CesiumJS 1.84 终止。

## 1.82.1 - 2021-06-01

- This is an npm only release to fix the improperly published 1.82.0.
  这是一个仅针对 npm 的版本，用于修复错误发布的 1.82.0。

## 1.82 - 2021-06-01

### Additions :tada:

- Added `FeatureDetection.supportsBigInt64Array`, `FeatureDetection.supportsBigUint64Array` and `FeatureDetection.supportsBigInt`.
  新增了 `FeatureDetection.supportsBigInt64Array`、`FeatureDetection.supportsBigUint64Array` 和 `FeatureDetection.supportsBigInt`。

### Fixes :wrench:

- Fixed `processTerrain` in `decodeGoogleEarthEnterprisePacket` to handle a newer terrain packet format that includes water surface meshes after terrain meshes. [#9519](https://github.com/CesiumGS/cesium/pull/9519)
  修复了 `decodeGoogleEarthEnterprisePacket` 中的 `processTerrain`，以支持在地形网格后包含水面网格的较新地形数据包格式。[#9519](https://github.com/CesiumGS/cesium/pull/9519)

## 1.81 - 2021-05-01

### Fixes :wrench:

- Fixed an issue where `Camera.flyTo` would not work properly with a non-WGS84 Ellipsoid. [#9498](https://github.com/CesiumGS/cesium/pull/9498)
  修复了 `Camera.flyTo` 无法与非 WGS84 椭球体一起正常工作的问题。[#9498](https://github.com/CesiumGS/cesium/pull/9498)
- Fixed an issue where setting the `ViewportQuad` rectangle after creating the viewport had no effect.[#9511](https://github.com/CesiumGS/cesium/pull/9511)
  修复了在创建视口后设置 `ViewportQuad` 矩形无效的问题。[#9511](https://github.com/CesiumGS/cesium/pull/9511)
- Fixed an issue where TypeScript was not picking up type defintions for `ArcGISTiledElevationTerrainProvider`. [#9522](https://github.com/CesiumGS/cesium/pull/9522)
  修复了 TypeScript 未能正确识别 `ArcGISTiledElevationTerrainProvider` 类型定义的问题。[#9522](https://github.com/CesiumGS/cesium/pull/9522)

### Deprecated :hourglass_flowing_sand:

- `loadCRN` and `loadKTX` have been deprecated and will be removed in CesiumJS 1.83. They will be replaced with support for KTX2. [#9478](https://github.com/CesiumGS/cesium/pull/9478)
  `loadCRN` 和 `loadKTX` 已被弃用，并将在 CesiumJS 1.83 中移除。它们将被 KTX2 支持所取代。[#9478](https://github.com/CesiumGS/cesium/pull/9478)

## 1.80 - 2021-04-01

### Additions :tada:

- Added support for drawing ground primitives on translucent 3D Tiles. [#9399](https://github.com/CesiumGS/cesium/pull/9399)
  增加了在半透明 3D Tiles 上绘制贴地基元（ground primitives）的支持。[#9399](https://github.com/CesiumGS/cesium/pull/9399)

## 1.79.1 - 2021-03-01

### Fixes :wrench:

- Fixed a regression in 1.79 that broke terrain exaggeration. [#9397](https://github.com/CesiumGS/cesium/pull/9397)
  修复了 1.79 中破坏地形夸大功能的回归问题。[#9397](https://github.com/CesiumGS/cesium/pull/9397)
- Fixed an issue where interpolating certain small rhumblines with surface distance 0.0 would not return the expected result. [#9430](https://github.com/CesiumGS/cesium/pull/9430)
  修复了在对表面距离为 0.0 的某些极短等角航线（rhumb lines）进行插值时未返回预期结果的问题。[#9430](https://github.com/CesiumGS/cesium/pull/9430)

## 1.79 - 2021-03-01

### Breaking Changes :mega:

- Removed `Cesium3DTileset.url`, which was deprecated in CesiumJS 1.78. Use `Cesium3DTileset.resource.url` to retrieve the url value.
  移除了在 CesiumJS 1.78 中已弃用的 `Cesium3DTileset.url`。请使用 `Cesium3DTileset.resource.url` 来获取 URL 值。

<!-- cspell: ignore QUADRACTIC -->

- Removed `EasingFunction.QUADRACTIC_IN`, which was deprecated in CesiumJS 1.77. Use `EasingFunction.QUADRATIC_IN`.
  移除了在 CesiumJS 1.77 中已弃用的 `EasingFunction.QUADRACTIC_IN`。请改用 `EasingFunction.QUADRATIC_IN`。
- Removed `EasingFunction.QUADRACTIC_OUT`, which was deprecated in CesiumJS 1.77. Use `EasingFunction.QUADRATIC_OUT`.
  移除了在 CesiumJS 1.77 中已弃用的 `EasingFunction.QUADRACTIC_OUT`。请改用 `EasingFunction.QUADRATIC_OUT`。
- Removed `EasingFunction.QUADRACTIC_IN_OUT`, which was deprecated in CesiumJS 1.77. Use `EasingFunction.QUADRATIC_IN_OUT`.
  移除了在 CesiumJS 1.77 中已弃用的 `EasingFunction.QUADRACTIC_IN_OUT`。请改用 `EasingFunction.QUADRATIC_IN_OUT`。
- Changed `TaskProcessor.maximumActiveTasks` constructor option to be infinity by default. [#9313](https://github.com/CesiumGS/cesium/pull/9313)
  将 `TaskProcessor.maximumActiveTasks` 构造函数选项的默认值更改为无穷大（Infinity）。[#9313](https://github.com/CesiumGS/cesium/pull/9313)

### Fixes :wrench:

- Fixed an issue that prevented use of the full CesiumJS zip release package in a Node.js application.
  修复了阻止在 Node.js 应用程序中使用完整 CesiumJS zip 发布包的问题。
- Fixed an issue where certain inputs to EllipsoidGeodesic would result in a surfaceDistance of NaN. [#9316](https://github.com/CesiumGS/cesium/pull/9316)
  修复了给 `EllipsoidGeodesic` 传入某些输入时导致 `surfaceDistance` 为 NaN 的问题。[#9316](https://github.com/CesiumGS/cesium/pull/9316)
- Fixed `sampleTerrain` and `sampleTerrainMostDetailed` not working for `ArcGISTiledElevationTerrainProvider`. [#9286](https://github.com/CesiumGS/cesium/pull/9286)
  修复了 `sampleTerrain` 和 `sampleTerrainMostDetailed` 对 `ArcGISTiledElevationTerrainProvider` 不起作用的问题。[#9286](https://github.com/CesiumGS/cesium/pull/9286)
- Consistent with the spec, CZML `polylineVolume` now expects its shape positions to specified using the `cartesian2` property. Use of the `cartesian` is also supported for backward-compatibility. [#9384](https://github.com/CesiumGS/cesium/pull/9384)
  为了与规范保持一致，CZML `polylineVolume` 现在期望使用 `cartesian2` 属性来指定其形状坐标。为了向后兼容，也仍支持使用 `cartesian`。[#9384](https://github.com/CesiumGS/cesium/pull/9384)
- Removed an unnecessary matrix copy each time a `Cesium3DTileset` is updated. [#9366](https://github.com/CesiumGS/cesium/pull/9366)
  移除了每次更新 `Cesium3DTileset` 时不必要的矩阵复制。[#9366](https://github.com/CesiumGS/cesium/pull/9366)

## 1.78 - 2021-02-01

### Additions :tada:

- Added `BillboardCollection.show`, `EntityCluster.show`, `LabelCollection.show`, `PointPrimitiveCollection.show`, and `PolylineCollection.show` for a convenient way to control show of the entire collection [#9307](https://github.com/CesiumGS/cesium/pull/9307)
  新增了 `BillboardCollection.show`、`EntityCluster.show`、`LabelCollection.show`、`PointPrimitiveCollection.show` 和 `PolylineCollection.show`，以便方便地控制整个集合的显示状态。[#9307](https://github.com/CesiumGS/cesium/pull/9307)
- `TaskProcessor` now accepts an absolute URL in addition to a worker name as it's first parameter. This makes it possible to use custom web workers with Cesium's task processing system without copying them to Cesium's Workers directory. [#9338](https://github.com/CesiumGS/cesium/pull/9338)
  `TaskProcessor` 的第一个参数现在除了接受 worker 名称外，还接受绝对 URL。这使得无需将自定义 web worker 复制到 Cesium 的 Workers 目录即可与 Cesium 的任务处理系统一起使用。[#9338](https://github.com/CesiumGS/cesium/pull/9338)
- Added `Cartesian2.cross` which computes the magnitude of the cross product of two vectors whose Z values are implicitly 0. [#9305](https://github.com/CesiumGS/cesium/pull/9305)
  新增了 `Cartesian2.cross`，用于计算两个 Z 值隐式为 0 的向量叉积的模长。[#9305](https://github.com/CesiumGS/cesium/pull/9305)
- Added `Math.previousPowerOfTwo`. [#9310](https://github.com/CesiumGS/cesium/pull/9310)
  新增了 `Math.previousPowerOfTwo`。[#9310](https://github.com/CesiumGS/cesium/pull/9310)

### Fixes :wrench:

- Fixed an issue with `Math.mod` introducing a small amount of floating point error even when the input did not need to be altered. [#9354](https://github.com/CesiumGS/cesium/pull/9354)
  修复了即使输入无需修改时 `Math.mod` 也会引入微小浮点误差的问题。[#9354](https://github.com/CesiumGS/cesium/pull/9354)

### Deprecated :hourglass_flowing_sand:

- `Cesium3DTileset.url` has been deprecated and will be removed in Cesium 1.79. Instead, use `Cesium3DTileset.resource.url` to retrieve the url value.
  `Cesium3DTileset.url` 已被弃用，并将在 Cesium 1.79 中移除。请改用 `Cesium3DTileset.resource.url` 获取 URL 值。

## 1.77 - 2021-01-04

### Additions :tada:

- Added `ElevationBand` material, which maps colors and gradients to exact elevations. [#9132](https://github.com/CesiumGS/cesium/pull/9132)
  新增了 `ElevationBand` 材质，该材质将颜色和渐变映射到精确的高程上。[#9132](https://github.com/CesiumGS/cesium/pull/9132)

### Fixes :wrench:

- Fixed an issue where changing a model or tileset's `color`, `backFaceCulling`, or `silhouetteSize` would trigger an error. [#9271](https://github.com/CesiumGS/cesium/pull/9271)
  修复了更改模型或瓦片集的 `color`、`backFaceCulling` 或 `silhouetteSize` 会触发错误的问题。[#9271](https://github.com/CesiumGS/cesium/pull/9271)

### Deprecated :hourglass_flowing_sand:

- `EasingFunction.QUADRACTIC_IN` was deprecated and will be removed in Cesium 1.79. It has been replaced with `EasingFunction.QUADRATIC_IN`. [#9220](https://github.com/CesiumGS/cesium/issues/9220)
  `EasingFunction.QUADRACTIC_IN` 已被弃用，并将在 Cesium 1.79 中移除。它已被替换为 `EasingFunction.QUADRATIC_IN`。[#9220](https://github.com/CesiumGS/cesium/issues/9220)
- `EasingFunction.QUADRACTIC_OUT` was deprecated and will be removed in Cesium 1.79. It has been replaced with `EasingFunction.QUADRATIC_OUT`. [#9220](https://github.com/CesiumGS/cesium/issues/9220)
  `EasingFunction.QUADRACTIC_OUT` 已被弃用，并将在 Cesium 1.79 中移除。它已被替换为 `EasingFunction.QUADRATIC_OUT`。[#9220](https://github.com/CesiumGS/cesium/issues/9220)
- `EasingFunction.QUADRACTIC_IN_OUT` was deprecated and will be removed in Cesium 1.79. It has been replaced with `EasingFunction.QUADRATIC_IN_OUT`. [#9220](https://github.com/CesiumGS/cesium/issues/9220)
  `EasingFunction.QUADRACTIC_IN_OUT` 已被弃用，并将在 Cesium 1.79 中移除。它已被替换为 `EasingFunction.QUADRATIC_IN_OUT`。[#9220](https://github.com/CesiumGS/cesium/issues/9220)

## 1.76 - 2020-12-01

### Fixes :wrench:

- Fixed an issue where tileset styles would be reapplied every frame when a tileset has a style and `tileset.preloadWhenHidden` is true and `tileset.show` is false. Also fixed a related issue where styles would be reapplied if the style being set is the same as the active style. [#9223](https://github.com/CesiumGS/cesium/pull/9223)
  修复了当瓦片集包含样式、`tileset.preloadWhenHidden` 为 true 且 `tileset.show` 为 false 时，瓦片集样式会在每帧被重复应用的问题。同时修复了设置的样式与当前活动样式相同时样式会被重新应用的相关问题。[#9223](https://github.com/CesiumGS/cesium/pull/9223)
- Fixed JSDoc and TypeScript type definitions for `EllipsoidTangentPlane.fromPoints` which didn't list a return type. [#9227](https://github.com/CesiumGS/cesium/pull/9227)
  修复了 `EllipsoidTangentPlane.fromPoints` 的 JSDoc 和 TypeScript 类型定义中未列出返回类型的问题。[#9227](https://github.com/CesiumGS/cesium/pull/9227)
- Updated DOMPurify from 1.0.8 to 2.2.2. [#9240](https://github.com/CesiumGS/cesium/issues/9240)
  将 DOMPurify 从 1.0.8 更新至 2.2.2。[#9240](https://github.com/CesiumGS/cesium/issues/9240)

## 1.75 - 2020-11-02

### Fixes :wrench:

- Fixed an issue in the PBR material where models with the `KHR_materials_unlit` extension had the normal attribute disabled. [#9173](https://github.com/CesiumGS/cesium/pull/9173).
  修复了基于物理的渲染（PBR）材质中带有 `KHR_materials_unlit` 扩展的模型被禁用了法线属性（normal attribute）的问题。[#9173](https://github.com/CesiumGS/cesium/pull/9173)。
- Fixed JSDoc and TypeScript type definitions for `writeTextToCanvas` which listed incorrect return type. [#9196](https://github.com/CesiumGS/cesium/pull/9196)
  修复了 `writeTextToCanvas` 的 JSDoc 和 TypeScript 类型定义中列出错误返回类型的问题。[#9196](https://github.com/CesiumGS/cesium/pull/9196)
- Fixed JSDoc and TypeScript type definitions for `Viewer.globe` constructor option to allow disabling the globe on startup. [#9063](https://github.com/CesiumGS/cesium/pull/9063)
  修复了 `Viewer.globe` 构造函数选项的 JSDoc 和 TypeScript 类型定义，以允许在启动时禁用地球（globe）。[#9063](https://github.com/CesiumGS/cesium/pull/9063)

## 1.74 - 2020-10-01

### Additions :tada:

- Added `Matrix3.inverseTranspose` and `Matrix4.inverseTranspose`. [#9135](https://github.com/CesiumGS/cesium/pull/9135)
  新增了 `Matrix3.inverseTranspose` 和 `Matrix4.inverseTranspose`。[#9135](https://github.com/CesiumGS/cesium/pull/9135)

### Fixes :wrench:

- Fixed an issue where the camera zooming is stuck when looking up. [#9126](https://github.com/CesiumGS/cesium/pull/9126)
  修复了向上看时相机缩放卡住的问题。[#9126](https://github.com/CesiumGS/cesium/pull/9126)
- Fixed an issue where Plane doesn't rotate correctly around the main local axis. [#8268](https://github.com/CesiumGS/cesium/issues/8268)
  修复了 Plane 绕主要局部轴旋转不正确的问题。[#8268](https://github.com/CesiumGS/cesium/issues/8268)
- Fixed clipping planes with non-uniform scale. [#9135](https://github.com/CesiumGS/cesium/pull/9135)
  修复了非均匀缩放下的裁剪平面（clipping planes）问题。[#9135](https://github.com/CesiumGS/cesium/pull/9135)
- Fixed an issue where ground primitives would get clipped at certain camera angles. [#9114](https://github.com/CesiumGS/cesium/issues/9114)
  修复了贴地基元在某些相机角度下会被裁剪的问题。[#9114](https://github.com/CesiumGS/cesium/issues/9114)
- Fixed a bug that could cause half of the globe to disappear when setting the `terrainProvider. [#9161](https://github.com/CesiumGS/cesium/pull/9161)
  修复了设置 `terrainProvider` 时可能导致半个地球消失的 Bug。[#9161](https://github.com/CesiumGS/cesium/pull/9161)
- Fixed a crash when loading Cesium OSM buildings with shadows enabled. [#9172](https://github.com/CesiumGS/cesium/pull/9172)
  修复了启用阴影时加载 Cesium OSM 建筑物发生的崩溃。[#9172](https://github.com/CesiumGS/cesium/pull/9172)

## 1.73 - 2020-09-01

### Breaking Changes :mega:

- Removed `MapboxApi`, which was deprecated in CesiumJS 1.72. Pass your access token directly to the `MapboxImageryProvider` or `MapboxStyleImageryProvider` constructors.
  移除了在 CesiumJS 1.72 中已弃用的 `MapboxApi`。请将您的 access token 直接传递给 `MapboxImageryProvider` 或 `MapboxStyleImageryProvider` 构造函数。
- Removed `BingMapsApi`, which was deprecated in CesiumJS 1.72. Pass your access key directly to the `BingMapsImageryProvider` or `BingMapsGeocoderService` constructors.
  移除了在 CesiumJS 1.72 中已弃用的 `BingMapsApi`。请将您的 access key 直接传递给 `BingMapsImageryProvider` 或 `BingMapsGeocoderService` 构造函数。

### Additions :tada:

- Added support for the CSS `line-height` specifier in the `font` property of a `Label`. [#8954](https://github.com/CesiumGS/cesium/pull/8954)
  在 `Label` 的 `font` 属性中增加了对 CSS `line-height` 指定符的支持。[#8954](https://github.com/CesiumGS/cesium/pull/8954)
- `Viewer` now has default pick handling for `Cesium3DTileFeature` data and will display its properties in the default Viewer `InfoBox` as well as set `Viewer.selectedEntity` to a transient Entity instance representing the data. [#9121](https://github.com/CesiumGS/cesium/pull/9121).
  `Viewer` 现在对 `Cesium3DTileFeature` 数据具备默认的拾取处理，并将在默认的 Viewer `InfoBox` 中显示其属性，同时将 `Viewer.selectedEntity` 设置为表示该数据的临时 Entity 实例。[#9121](https://github.com/CesiumGS/cesium/pull/9121)。

### Fixes :wrench:

- Fixed several artifacts on mobile devices caused by using insufficient precision. [#9064](https://github.com/CesiumGS/cesium/pull/9064)
  修复了在移动设备上由于精度不足导致的若干显示瑕疵。[#9064](https://github.com/CesiumGS/cesium/pull/9064)
- Fixed handling of `data:` scheme for the Cesium ion logo URL. [#9085](https://github.com/CesiumGS/cesium/pull/9085)
  修复了 Cesium ion 徽标 URL 对 `data:` 协议的处理。[#9085](https://github.com/CesiumGS/cesium/pull/9085)
- Fixed an issue where the boundary rectangles in `TileAvailability` are not sorted correctly, causing terrain to sometimes fail to achieve its maximum detail. [#9098](https://github.com/CesiumGS/cesium/pull/9098)
  修复了 `TileAvailability` 中的边界矩形未正确排序，导致地形有时无法达到最大精细度的问题。[#9098](https://github.com/CesiumGS/cesium/pull/9098)
- Fixed an issue where a request for an availability tile of the reference layer is delayed because the throttle option is on. [#9099](https://github.com/CesiumGS/cesium/pull/9099)
  修复了由于开启了限流选项（throttle option）导致参考图层的可用性瓦片请求延迟的问题。[#9099](https://github.com/CesiumGS/cesium/pull/9099)
- Fixed an issue where Node.js tooling could not resolve package.json. [#9105](https://github.com/CesiumGS/cesium/pull/9105)
  修复了 Node.js 工具无法解析 package.json 的问题。[#9105](https://github.com/CesiumGS/cesium/pull/9105)
- Fixed classification artifacts on some mobile devices. [#9108](https://github.com/CesiumGS/cesium/pull/9108)
  修复了某些移动设备上的分类瑕疵问题。[#9108](https://github.com/CesiumGS/cesium/pull/9108)
- Fixed an issue where Resource silently fails to load if being used multiple times. [#9093](https://github.com/CesiumGS/cesium/issues/9093)
  修复了 Resource 被多次使用时静默加载失败的问题。[#9093](https://github.com/CesiumGS/cesium/issues/9093)

## 1.72 - 2020-08-03

### Breaking Changes :mega:

- CesiumJS no longer ships with a default Mapbox access token and Mapbox imagery layers have been removed from the `BaseLayerPicker` defaults. If you are using `MapboxImageryProvider` or `MapboxStyleImageryProvider`, use `options.accessToken` when initializing the imagery provider.
  CesiumJS 不再自带默认的 Mapbox access token，且 Mapbox 影像图层已从 `BaseLayerPicker` 默认项中移除。如果您正在使用 `MapboxImageryProvider` 或 `MapboxStyleImageryProvider`，请在初始化影像提供者时使用 `options.accessToken`。

### Additions :tada:

- Added support for glTF multi-texturing via `TEXCOORD_1`. [#9075](https://github.com/CesiumGS/cesium/pull/9075)
  增加了通过 `TEXCOORD_1` 支持 glTF 多重纹理（multi-texturing）的功能。[#9075](https://github.com/CesiumGS/cesium/pull/9075)

### Deprecated :hourglass_flowing_sand:

- `MapboxApi.defaultAccessToken` was deprecated and will be removed in CesiumJS 1.73. Pass your access token directly to the MapboxImageryProvider or MapboxStyleImageryProvider constructors.
  `MapboxApi.defaultAccessToken` 已被弃用，并将在 CesiumJS 1.73 中移除。请将您的 access token 直接传递给 MapboxImageryProvider 或 MapboxStyleImageryProvider 构造函数。
- `BingMapsApi` was deprecated and will be removed in CesiumJS 1.73. Pass your access key directly to the BingMapsImageryProvider or BingMapsGeocoderService constructors.
  `BingMapsApi` 已被弃用，并将在 CesiumJS 1.73 中移除。请将您的 access key 直接传递给 BingMapsImageryProvider 或 BingMapsGeocoderService 构造函数。

### Fixes :wrench:

- Fixed `Color.fromCssColorString` when color string contains spaces. [#9015](https://github.com/CesiumGS/cesium/issues/9015)
  修复了颜色字符串包含空格时 `Color.fromCssColorString` 的解析问题。[#9015](https://github.com/CesiumGS/cesium/issues/9015)
- Fixed 3D Tileset replacement refinement when leaf is empty. [#8996](https://github.com/CesiumGS/cesium/pull/8996)
  修复了叶子节点为空时 3D Tileset 的替换细分（replacement refinement）问题。[#8996](https://github.com/CesiumGS/cesium/pull/8996)
- Fixed a bug in the assessment of terrain tile visibility [#9033](https://github.com/CesiumGS/cesium/issues/9033)
  修复了地形瓦片可见性评估中的 Bug。[#9033](https://github.com/CesiumGS/cesium/issues/9033)
- Fixed vertical polylines with `arcType: ArcType.RHUMB`, including lines drawn via GeoJSON. [#9028](https://github.com/CesiumGS/cesium/pull/9028)
  修复了带有 `arcType: ArcType.RHUMB` 的垂直折线（包括通过 GeoJSON 绘制的线条）。[#9028](https://github.com/CesiumGS/cesium/pull/9028)
- Fixed wall rendering when underground [#9041](https://github.com/CesiumGS/cesium/pull/9041)
  修复了在地下时的墙体（wall）渲染问题。[#9041](https://github.com/CesiumGS/cesium/pull/9041)
- Fixed issue where a side of the wall was missing if the first position and the last position were equal [#9044](https://github.com/CesiumGS/cesium/pull/9044)
  修复了当第一个坐标与最后一个坐标相等时墙体的一侧缺失的问题。[#9044](https://github.com/CesiumGS/cesium/pull/9044)
- Fixed `translucencyByDistance` for label outline color [#9003](https://github.com/CesiumGS/cesium/pull/9003)
  修复了标签轮廓颜色的 `translucencyByDistance`（随距离半透明度）设置问题。[#9003](https://github.com/CesiumGS/cesium/pull/9003)
- Fixed return value for `SampledPositionProperty.removeSample` [#9017](https://github.com/CesiumGS/cesium/pull/9017)
  修复了 `SampledPositionProperty.removeSample` 的返回值。[#9017](https://github.com/CesiumGS/cesium/pull/9017)
- Fixed issue where wall doesn't have correct texture coordinates when there are duplicate positions input [#9042](https://github.com/CesiumGS/cesium/issues/9042)
  修复了输入重复坐标时墙体未能获得正确纹理坐标的问题。[#9042](https://github.com/CesiumGS/cesium/issues/9042)
- Fixed an issue where clipping planes would not clip at the correct distances on some Android devices, most commonly reproducible on devices with `Mali` GPUs that do not support float textures via WebGL [#9023](https://github.com/CesiumGS/cesium/issues/9023)
  修复了在某些 Android 设备上裁剪平面无法在正确距离裁剪的问题，这最常见于不支持 WebGL 浮点纹理的配备 `Mali` GPU 的设备。[#9023](https://github.com/CesiumGS/cesium/issues/9023)

## 1.71 - 2020-07-01

### Breaking Changes :mega:

- Updated `WallGeometry` to respect the order of positions passed in, instead of making the positions respect a counter clockwise winding order. This will only affect the look of walls with an image material. If this changed the way your wall is drawing, reverse the order of the positions. [#8955](https://github.com/CesiumGS/cesium/pull/8955/)
  更新了 `WallGeometry` 以遵循传入坐标的顺序，而不是强制坐标遵循逆时针环绕顺序。这只会影响带有图像材质的墙体的外观。如果这改变了您的墙体绘制方式，请反转坐标顺序。[#8955](https://github.com/CesiumGS/cesium/pull/8955/)

### Additions :tada:

- Added `backFaceCulling` property to `Cesium3DTileset` and `Model` to support viewing the underside or interior of a tileset or model. [#8981](https://github.com/CesiumGS/cesium/pull/8981)
  在 `Cesium3DTileset` 和 `Model` 中新增了 `backFaceCulling`（背面剔除）属性，以支持查看瓦片集或模型的底部或内部。[#8981](https://github.com/CesiumGS/cesium/pull/8981)
- Added `Ellipsoid.surfaceArea` for computing the approximate surface area of a rectangle on the surface of an ellipsoid. [#8986](https://github.com/CesiumGS/cesium/pull/8986)
  新增了 `Ellipsoid.surfaceArea`，用于计算椭球体表面上某个矩形的近似表面积。[#8986](https://github.com/CesiumGS/cesium/pull/8986)
- Added support for PolylineVolume in CZML. [#8841](https://github.com/CesiumGS/cesium/pull/8841)
  在 CZML 中增加了对 PolylineVolume 的支持。[#8841](https://github.com/CesiumGS/cesium/pull/8841)
- Added `Color.toCssHexString` for getting the CSS hex string equivalent for a color. [#8987](https://github.com/CesiumGS/cesium/pull/8987)
  新增了 `Color.toCssHexString`，用于获取颜色的对应 CSS 十六进制字符串。[#8987](https://github.com/CesiumGS/cesium/pull/8987)

### Fixes :wrench:

- Fixed issue where tileset was not playing glTF animations. [#8962](https://github.com/CesiumGS/cesium/issues/8962)
  修复了瓦片集无法播放 glTF 动画的问题。[#8962](https://github.com/CesiumGS/cesium/issues/8962)
- Fixed a divide-by-zero bug in `Ellipsoid.geodeticSurfaceNormal` when given the origin as input. `undefined` is returned instead. [#8986](https://github.com/CesiumGS/cesium/pull/8986)
  修复了 `Ellipsoid.geodeticSurfaceNormal` 在以原点作为输入时的除以零 Bug。现在将返回 `undefined`。[#8986](https://github.com/CesiumGS/cesium/pull/8986)
- Fixed error with `WallGeometry` when there were adjacent positions with very close values. [#8952](https://github.com/CesiumGS/cesium/pull/8952)
  修复了当存在数值非常接近的相邻坐标时 `WallGeometry` 报错的问题。[#8952](https://github.com/CesiumGS/cesium/pull/8952)
- Fixed artifact for skinned model when log depth is enabled. [#6447](https://github.com/CesiumGS/cesium/issues/6447)
  修复了启用对数深度缓冲区时蒙皮模型出现的显示瑕疵。[#6447](https://github.com/CesiumGS/cesium/issues/6447)
- Fixed a bug where certain rhumb arc polylines would lead to a crash. [#8787](https://github.com/CesiumGS/cesium/pull/8787)
  修复了某些等角弧线折线会导致崩溃的 Bug。[#8787](https://github.com/CesiumGS/cesium/pull/8787)
- Fixed handling of Label's backgroundColor and backgroundPadding option [#8949](https://github.com/CesiumGS/cesium/pull/8949)
  修复了 Label 的 backgroundColor 和 backgroundPadding 选项的处理。[#8949](https://github.com/CesiumGS/cesium/pull/8949)
- Fixed several bugs when rendering CesiumJS in a WebGL 2 context. [#797](https://github.com/CesiumGS/cesium/issues/797)
  修复了在 WebGL 2 上下文中渲染 CesiumJS 时的若干 Bug。[#797](https://github.com/CesiumGS/cesium/issues/797)
- Fixed a bug where switching from perspective to orthographic caused triangles to overlap each other incorrectly. [#8346](https://github.com/CesiumGS/cesium/issues/8346)
  修复了从透视投影切换到正交投影时导致三角形相互错误重叠的 Bug。[#8346](https://github.com/CesiumGS/cesium/issues/8346)
- Fixed a bug where switching to orthographic camera on the first frame caused the zoom level to be incorrect. [#8853](https://github.com/CesiumGS/cesium/pull/8853)
  修复了在第一帧切换到正交相机导致缩放级别不正确的 Bug。[#8853](https://github.com/CesiumGS/cesium/pull/8853)
- Fixed `scene.pickFromRay` intersection inaccuracies. [#8439](https://github.com/CesiumGS/cesium/issues/8439)
  修复了 `scene.pickFromRay` 相交计算不精确的问题。[#8439](https://github.com/CesiumGS/cesium/issues/8439)
- Fixed a bug where a null or undefined name property passed to the `Entity` constructor would throw an exception.[#8832](https://github.com/CesiumGS/cesium/pull/8832)
  修复了将 null 或 undefined 的 name 属性传递给 `Entity` 构造函数会抛出异常的 Bug。[#8832](https://github.com/CesiumGS/cesium/pull/8832)
- Fixed JSDoc and TypeScript type definitions for `ScreenSpaceEventHandler.getInputAction` which listed incorrect return type. [#9002](https://github.com/CesiumGS/cesium/pull/9002)
  修复了 `ScreenSpaceEventHandler.getInputAction` 的 JSDoc 和 TypeScript 类型定义中列出错误返回类型的问题。[#9002](https://github.com/CesiumGS/cesium/pull/9002)
- Improved the style of the error panel. [#8739](https://github.com/CesiumGS/cesium/issues/8739)
  改进了错误面板的样式。[#8739](https://github.com/CesiumGS/cesium/issues/8739)
- Fixed animation widget SVG icons not appearing in iOS 13.5.1. [#8993](https://github.com/CesiumGS/cesium/pull/8993)
  修复了动画挂件（animation widget）SVG 图标在 iOS 13.5.1 中不显示的问题。[#8993](https://github.com/CesiumGS/cesium/pull/8993)

## 1.70.1 - 2020-06-10

### Additions :tada:

- Add a `toString` method to the `Resource` class in case an instance gets logged as a string. [#8722](https://github.com/CesiumGS/cesium/issues/8722)
  为 `Resource` 类添加了 `toString` 方法，以防实例作为字符串被打印记录。[#8722](https://github.com/CesiumGS/cesium/issues/8722)
- Exposed `Transforms.rotationMatrixFromPositionVelocity` method from Cesium's private API. [#8927](https://github.com/CesiumGS/cesium/issues/8927)
  公开了来自 Cesium 私有 API 的 `Transforms.rotationMatrixFromPositionVelocity` 方法。[#8927](https://github.com/CesiumGS/cesium/issues/8927)

### Fixes :wrench:

- Fixed JSDoc and TypeScript type definitions for all `ImageryProvider` types, which were missing `defaultNightAlpha` and `defaultDayAlpha` properties. [#8908](https://github.com/CesiumGS/cesium/pull/8908)
  修复了所有 `ImageryProvider` 类型的 JSDoc 和 TypeScript 类型定义，此前缺少 `defaultNightAlpha` 和 `defaultDayAlpha` 属性。[#8908](https://github.com/CesiumGS/cesium/pull/8908)
- Fixed JSDoc and TypeScript for `MaterialProperty`, which were missing the ability to take primitive types in their constructor. [#8904](https://github.com/CesiumGS/cesium/pull/8904)
  修复了 `MaterialProperty` 的 JSDoc 和 TypeScript 定义，此前缺少在其构造函数中接受基本类型的能力。[#8904](https://github.com/CesiumGS/cesium/pull/8904)
- Fixed JSDoc and TypeScript type definitions to allow the creation of `GeometryInstance` instances using `XXXGeometry` classes. [#8941](https://github.com/CesiumGS/cesium/pull/8941).
  修复了 JSDoc 和 TypeScript 类型定义，以允许使用 `XXXGeometry` 类创建 `GeometryInstance` 实例。[#8941](https://github.com/CesiumGS/cesium/pull/8941)。
- Fixed JSDoc and TypeScript for `buildModuleUrl`, which was accidentally excluded from the official CesiumJS API. [#8923](https://github.com/CesiumGS/cesium/pull/8923)
  修复了 `buildModuleUrl` 的 JSDoc 和 TypeScript 定义，此前它被意外排除在官方 CesiumJS API 之外。[#8923](https://github.com/CesiumGS/cesium/pull/8923)
- Fixed JSDoc and TypeScript type definitions for `EllipsoidGeodesic` which incorrectly listed `result` as required. [#8904](https://github.com/CesiumGS/cesium/pull/8904)
  修复了 `EllipsoidGeodesic` 的 JSDoc 和 TypeScript 类型定义中错误地将 `result` 列为必填项的问题。[#8904](https://github.com/CesiumGS/cesium/pull/8904)
- Fixed JSDoc and TypeScript type definitions for `EllipsoidTangentPlane.fromPoints`, which takes an array of `Cartesian3`, not a single instance. [#8928](https://github.com/CesiumGS/cesium/pull/8928)
  修复了 `EllipsoidTangentPlane.fromPoints` 的 JSDoc 和 TypeScript 类型定义，该方法接受一个 `Cartesian3` 数组而非单个实例。[#8928](https://github.com/CesiumGS/cesium/pull/8928)
- Fixed JSDoc and TypeScript type definitions for `EntityCollection.getById` and `CompositeEntityCollection.getById`, which can both return undefined. [#8928](https://github.com/CesiumGS/cesium/pull/8928)
  修复了 `EntityCollection.getById` 和 `CompositeEntityCollection.getById` 的 JSDoc 和 TypeScript 类型定义，两者均可返回 undefined。[#8928](https://github.com/CesiumGS/cesium/pull/8928)
- Fixed JSDoc and TypeScript type definitions for `Viewer` options parameters.
  修复了 `Viewer` 选项参数的 JSDoc 和 TypeScript 类型定义。
- Fixed a memory leak where some 3D Tiles requests were being unintentionally retained after the requests were cancelled. [#8843](https://github.com/CesiumGS/cesium/pull/8843)
  修复了取消请求后某些 3D Tiles 请求被意外保留的内存泄漏问题。[#8843](https://github.com/CesiumGS/cesium/pull/8843)
- Fixed a bug with handling of PixelFormat's flipY. [#8893](https://github.com/CesiumGS/cesium/pull/8893)
  修复了处理 PixelFormat 的 flipY 时的 Bug。[#8893](https://github.com/CesiumGS/cesium/pull/8893)

## 1.70.0 - 2020-06-01

### Major Announcements :loudspeaker:

- All Cesium ion users now have access to Cesium OSM Buildings - a 3D buildings layer covering the entire world built with OpenStreetMap building data, available as 3D Tiles. Read more about it [on our blog](https://cesium.com/blog/2020/06/01/cesium-osm-buildings/).
  所有 Cesium ion 用户现在都可以访问 Cesium OSM Buildings——这是一个使用 OpenStreetMap 建筑数据构建的覆盖全球的 3D 建筑物图层，以 3D Tiles 形式提供。更多内容请阅读[我们的博客](https://cesium.com/blog/2020/06/01/cesium-osm-buildings/)。
  - [Explore it on Sandcastle](https://sandcastle.cesium.com/index.html?src=Cesium%20OSM%20Buildings.html).
    [在 Sandcastle 上探索](https://sandcastle.cesium.com/index.html?src=Cesium%20OSM%20Buildings.html)。
  - Add it to your CesiumJS app: `viewer.scene.primitives.add(Cesium.createOsmBuildings())`.
    添加到您的 CesiumJS 应用中：`viewer.scene.primitives.add(Cesium.createOsmBuildings())`。
  - Contains per-feature data like building name, address, and much more. [Read more about the available properties](https://cesium.com/content/cesium-osm-buildings/).
    包含每个要素的数据，如建筑名称、地址等。[了解更多可用属性](https://cesium.com/content/cesium-osm-buildings/)。
- CesiumJS now ships with official TypeScript type definitions! [#8878](https://github.com/CesiumGS/cesium/pull/8878)
  CesiumJS 现在自带官方 TypeScript 类型定义！[#8878](https://github.com/CesiumGS/cesium/pull/8878)
  - If you import CesiumJS as a module, the new definitions will automatically be used by TypeScript and related tooling.
    如果您将 CesiumJS 作为模块导入，新定义将被 TypeScript 和相关工具自动使用。
  - If you import individual CesiumJS source files directly, you'll need to add `"types": ["cesium"]` in your tsconfig.json in order for the definitions to be used.
    如果您直接导入单个 CesiumJS 源文件，则需要在 tsconfig.json 中添加 `"types": ["cesium"]` 才能使用这些定义。
  - If you’re using your own custom definitions and you’re not yet ready to switch, you can delete `Source/Cesium.d.ts` after install.
    如果您使用的是自己的自定义定义并且尚未准备好切换，则可以在安装后删除 `Source/Cesium.d.ts`。
  - See our [blog post](https://cesium.com/blog/2020/06/01/cesiumjs-tsd/) for more information and a technical overview of how it all works.
    有关更多信息及其工作原理的技术概述，请参阅我们的[博客文章](https://cesium.com/blog/2020/06/01/cesiumjs-tsd/)。
- CesiumJS now supports underground rendering with globe translucency! [#8726](https://github.com/CesiumGS/cesium/pull/8726)
  CesiumJS 现在支持通过地球半透明度实现地下渲染！[#8726](https://github.com/CesiumGS/cesium/pull/8726)
  - Added options for controlling globe translucency through the new [`GlobeTranslucency`](https://cesium.com/learn/cesiumjs/ref-doc/GlobeTranslucency.html) object including front face alpha, back face alpha, and a translucency rectangle.
    添加了通过新的 [`GlobeTranslucency`](https://cesium.com/learn/cesiumjs/ref-doc/GlobeTranslucency.html) 对象控制地球半透明度的选项，包括正面 alpha、背面 alpha 和半透明矩形区域。
  - Added `Globe.undergroundColor` and `Globe.undergroundColorAlphaByDistance` for controlling how the back side of the globe is rendered when the camera is underground or the globe is translucent. [#8867](https://github.com/CesiumGS/cesium/pull/8867)
    新增了 `Globe.undergroundColor` 和 `Globe.undergroundColorAlphaByDistance`，用于控制当相机处于地下或地球为半透明时地球背面的渲染方式。[#8867](https://github.com/CesiumGS/cesium/pull/8867)
  - Improved camera controls when the camera is underground. [#8811](https://github.com/CesiumGS/cesium/pull/8811)
    改进了相机在地下时的相机控制。[#8811](https://github.com/CesiumGS/cesium/pull/8811)
  - Sandcastle examples: [Globe Translucency](https://sandcastle.cesium.com/?src=Globe%20Translucency.html), [Globe Interior](https://sandcastle.cesium.com/?src=Globe%20Interior.html), and [Underground Color](https://sandcastle.cesium.com/?src=Underground%20Color.html&label=All)
    Sandcastle 示例：[地球半透明（Globe Translucency）](https://sandcastle.cesium.com/?src=Globe%20Translucency.html)、[地球内部（Globe Interior）](https://sandcastle.cesium.com/?src=Globe%20Interior.html) 和 [地下颜色（Underground Color）](https://sandcastle.cesium.com/?src=Underground%20Color.html&label=All)。

### Additions :tada:

- Our API reference documentation has received dozens of fixes and improvements, largely due to the TypeScript effort.
  我们的 API 参考文档得到了数十项修复和改进，这主要得益于 TypeScript 化的工作。
- Added `Cesium3DTileset.extensions` to get the extensions property from the tileset JSON. [#8829](https://github.com/CesiumGS/cesium/pull/8829)
  新增了 `Cesium3DTileset.extensions`，用于从瓦片集 JSON 中获取 extensions 属性。[#8829](https://github.com/CesiumGS/cesium/pull/8829)
- Added `Camera.completeFlight`, which causes the current camera flight to immediately jump to the final destination and call its complete callback. [#8788](https://github.com/CesiumGS/cesium/pull/8788)
  新增了 `Camera.completeFlight`，它使当前相机飞行立即跳转到最终目的地并调用其完成回调。[#8788](https://github.com/CesiumGS/cesium/pull/8788)
- Added `nightAlpha` and `dayAlpha` properties to `ImageryLayer` to control alpha separately for the night and day sides of the globe. [#8868](https://github.com/CesiumGS/cesium/pull/8868)
  在 `ImageryLayer` 中新增了 `nightAlpha` 和 `dayAlpha` 属性，用于分别控制地球夜间和白昼一侧的透明度。[#8868](https://github.com/CesiumGS/cesium/pull/8868)
- Added `SkyAtmosphere.perFragmentAtmosphere` to switch between per-vertex and per-fragment atmosphere shading. [#8866](https://github.com/CesiumGS/cesium/pull/8866)
  新增了 `SkyAtmosphere.perFragmentAtmosphere`，用于在逐顶点和逐片段大气着色之间切换。[#8866](https://github.com/CesiumGS/cesium/pull/8866)
- Added a new sandcastle example to show how to add fog using a `PostProcessStage` [#8798](https://github.com/CesiumGS/cesium/pull/8798)
  新增了一个 Sandcastle 示例，展示如何使用 `PostProcessStage` 添加雾效。[#8798](https://github.com/CesiumGS/cesium/pull/8798)
- Added `frustumSplits` option to `DebugCameraPrimitive`. [8849](https://github.com/CesiumGS/cesium/pull/8849)
  为 `DebugCameraPrimitive` 新增了 `frustumSplits` 选项。[8849](https://github.com/CesiumGS/cesium/pull/8849)
- Supported `#rgba` and `#rrggbbaa` formats in `Color.fromCssColorString`. [8873](https://github.com/CesiumGS/cesium/pull/8873)
  在 `Color.fromCssColorString` 中支持了 `#rgba` 和 `#rrggbbaa` 格式。[8873](https://github.com/CesiumGS/cesium/pull/8873)

### Fixes :wrench:

- Fixed a bug that could cause rendering of a glTF model to become corrupt when switching from a Uint16 to a Uint32 index buffer to accommodate new vertices added for edge outlining. [#8820](https://github.com/CesiumGS/cesium/pull/8820)
  修复了从 Uint16 索引缓冲区切换到 Uint32 索引缓冲区以容纳为边缘轮廓添加的新顶点时可能导致 glTF 模型渲染损坏的 Bug。[#8820](https://github.com/CesiumGS/cesium/pull/8820)
- Fixed a bug where a removed billboard could prevent changing of the `TerrainProvider`. [#8766](https://github.com/CesiumGS/cesium/pull/8766)
  修复了已移除的广告牌（billboard）会阻止更改 `TerrainProvider` 的 Bug。[#8766](https://github.com/CesiumGS/cesium/pull/8766)
- Fixed an issue with 3D Tiles point cloud styling where `${feature.propertyName}` and `${feature["propertyName"]}` syntax would cause a crash. Also fixed an issue where property names with non-alphanumeric characters would crash. [#8785](https://github.com/CesiumGS/cesium/pull/8785)
  修复了 3D Tiles 点云样式中 `${feature.propertyName}` 和 `${feature["propertyName"]}` 语法会导致崩溃的问题。同时修复了包含非字母数字字符的属性名称会导致崩溃的问题。[#8785](https://github.com/CesiumGS/cesium/pull/8785)
- Fixed a bug where `DebugCameraPrimitive` was ignoring the near and far planes of the `Camera`. [#8848](https://github.com/CesiumGS/cesium/issues/8848)
  修复了 `DebugCameraPrimitive` 忽略 `Camera` 近截面和远截面的 Bug。[#8848](https://github.com/CesiumGS/cesium/issues/8848)
- Fixed sky atmosphere artifacts below the horizon. [#8866](https://github.com/CesiumGS/cesium/pull/8866)
  修复了地平线以下的天空大气显示瑕疵。[#8866](https://github.com/CesiumGS/cesium/pull/8866)
- Fixed ground primitives in orthographic mode. [#5110](https://github.com/CesiumGS/cesium/issues/5110)
  修复了正交模式下的贴地基元（ground primitives）。[#5110](https://github.com/CesiumGS/cesium/issues/5110)
- Fixed the depth plane in orthographic mode. This improves the quality of polylines and other primitives that are rendered near the horizon. [8858](https://github.com/CesiumGS/cesium/pull/8858)
  修复了正交模式下的深度平面。这提高了在地平线附近渲染的折线和其他基元的质量。[8858](https://github.com/CesiumGS/cesium/pull/8858)

## 1.69.0 - 2020-05-01

### Breaking Changes :mega:

- The property `Scene.sunColor` has been removed. Use `scene.light.color` and `scene.light.intensity` instead. [#8774](https://github.com/CesiumGS/cesium/pull/8774)
  属性 `Scene.sunColor` 已被移除。请改用 `scene.light.color` 和 `scene.light.intensity`。[#8774](https://github.com/CesiumGS/cesium/pull/8774)
- Removed `isArray`. Use the native `Array.isArray` function instead. [#8779](https://github.com/CesiumGS/cesium/pull/8779)
  移除了 `isArray`。请改用原生 `Array.isArray` 函数。[#8779](https://github.com/CesiumGS/cesium/pull/8779)

### Additions :tada:

- Added `RequestScheduler` to the public API; this allows users to have more control over the requests made by CesiumJS. [#8384](https://github.com/CesiumGS/cesium/issues/8384)
  将 `RequestScheduler` 添加到公共 API 中；这使用户能够更好地控制 CesiumJS 发出的请求。[#8384](https://github.com/CesiumGS/cesium/issues/8384)
- Added support for high-quality edges on solid geometry in glTF models. [#8776](https://github.com/CesiumGS/cesium/pull/8776)
  增加了对 glTF 模型中实体几何体的高质量边缘的支持。[#8776](https://github.com/CesiumGS/cesium/pull/8776)
- Added `Scene.cameraUnderground` for checking whether the camera is underneath the globe. [#8765](https://github.com/CesiumGS/cesium/pull/8765)
  新增了 `Scene.cameraUnderground`，用于检查相机是否处于地球地下。[#8765](https://github.com/CesiumGS/cesium/pull/8765)

### Fixes :wrench:

- Fixed several problems with polylines when the logarithmic depth buffer is enabled, which is the default on most systems. [#8706](https://github.com/CesiumGS/cesium/pull/8706)
  修复了在启用对数深度缓冲区（大多数系统上的默认设置）时折线的若干问题。[#8706](https://github.com/CesiumGS/cesium/pull/8706)
- Fixed a bug with very long view ranges requiring multiple frustums even with the logarithmic depth buffer enabled. Previously, such scenes could resolve depth incorrectly. [#8727](https://github.com/CesiumGS/cesium/pull/8727)
  修复了即使启用了对数深度缓冲区，极长视距需要多个视锥体时的 Bug。此前此类场景可能会错误地解析深度。[#8727](https://github.com/CesiumGS/cesium/pull/8727)
- Fixed an issue with glTF skinning support where an optional property `skeleton` was considered required by Cesium. [#8175](https://github.com/CesiumGS/cesium/issues/8175)
  修复了 glTF 蒙皮支持中的一个问题：可选属性 `skeleton` 被 Cesium 视为必填项。[#8175](https://github.com/CesiumGS/cesium/issues/8175)
- Fixed an issue with clamping of non-looped glTF animations. Subscribers to animation `update` events should expect one additional event firing as an animation stops. [#7387](https://github.com/CesiumGS/cesium/issues/7387)
  修复了非循环 glTF 动画截止（clamping）的问题。订阅动画 `update` 事件的用户应注意动画停止时会多触发一次事件。[#7387](https://github.com/CesiumGS/cesium/issues/7387)
- Geometry instance floats now work for high precision floats on newer iOS devices. [#8805](https://github.com/CesiumGS/cesium/pull/8805)
  几何体实例浮点数现在适用于较新 iOS 设备上的高精度浮点数。[#8805](https://github.com/CesiumGS/cesium/pull/8805)
- Fixed a bug where the elevation contour material's alpha was not being applied. [#8749](https://github.com/CesiumGS/cesium/pull/8749)
  修复了高程等高线材质的 alpha 透明度未被应用的 Bug。[#8749](https://github.com/CesiumGS/cesium/pull/8749)
- Fix potential memory leak when destroying `CesiumWidget` instances. [#8591](https://github.com/CesiumGS/cesium/pull/8591)
  修复了销毁 `CesiumWidget` 实例时的潜在内存泄漏。[#8591](https://github.com/CesiumGS/cesium/pull/8591)
- Fixed displaying the Cesium ion icon when running in an Android, iOS or UWP WebView. [#8758](https://github.com/CesiumGS/cesium/pull/8758)
  修复了在 Android、iOS 或 UWP WebView 中运行时 Cesium ion 图标的显示问题。[#8758](https://github.com/CesiumGS/cesium/pull/8758)

## 1.68.0 - 2020-04-01

### Additions :tada:

- Added basic underground rendering support. When the camera is underground the globe will be rendered as a solid surface and underground entities will not be culled. [#8572](https://github.com/AnalyticalGraphicsInc/cesium/pull/8572)
  增加了基础的地下渲染支持。当相机在地下时，地球将被渲染为实体表面，地下实体不会被剔除。[#8572](https://github.com/AnalyticalGraphicsInc/cesium/pull/8572)
- The `CesiumUnminified` build now includes sourcemaps. [#8572](https://github.com/CesiumGS/cesium/pull/8659)
  `CesiumUnminified` 构建版本现在包含 sourcemap。[#8572](https://github.com/CesiumGS/cesium/pull/8659)
- Added glTF `STEP` animation interpolation. [#8786](https://github.com/CesiumGS/cesium/pull/8786)
  增加了 glTF `STEP` 步进动画插值支持。[#8786](https://github.com/CesiumGS/cesium/pull/8786)
- Added the ability to edit CesiumJS shaders on-the-fly using the [SpectorJS](https://spector.babylonjs.com/) Shader Editor. [#8608](https://github.com/CesiumGS/cesium/pull/8608)
  增加了使用 [SpectorJS](https://spector.babylonjs.com/) 着色器编辑器实时编辑 CesiumJS 着色器的功能。[#8608](https://github.com/CesiumGS/cesium/pull/8608)

### Fixes :wrench:

- Cesium can now be used in Node.JS 12 and later, with or without `--experimental-modules`. It can still be used in earlier versions as well. [#8572](https://github.com/CesiumGS/cesium/pull/8659)
  Cesium 现在可在 Node.JS 12 及更高版本中使用（无论是否带有 `--experimental-modules`）。它也仍然可以在更早的版本中使用。[#8572](https://github.com/CesiumGS/cesium/pull/8659)
- Interacting with the Cesium canvas will now blur the previously focused element. This prevents unintended modification of input elements when interacting with the globe. [#8662](https://github.com/CesiumGS/cesium/pull/8662)
  与 Cesium 画布交互现在会使先前聚焦的元素失焦。这防止了与地球交互时对输入元素的非预期修改。[#8662](https://github.com/CesiumGS/cesium/pull/8662)
- `TileMapServiceImageryProvider` will now force `minimumLevel` to 0 if the `tilemapresource.xml` metadata request fails and the `rectangle` is too large for the given detail level [#8448](https://github.com/AnalyticalGraphicsInc/cesium/pull/8448)
  如果 `tilemapresource.xml` 元数据请求失败且 `rectangle` 对于给定的细节级别过大，`TileMapServiceImageryProvider` 现在将强制 `minimumLevel` 为 0。[#8448](https://github.com/AnalyticalGraphicsInc/cesium/pull/8448)
- Fixed ground atmosphere rendering when using a smaller ellipsoid. [#8683](https://github.com/CesiumGS/cesium/issues/8683)
  修复了使用较小椭球体时的地面大气渲染问题。[#8683](https://github.com/CesiumGS/cesium/issues/8683)
- Fixed globe incorrectly occluding objects when using a smaller ellipsoid. [#7124](https://github.com/CesiumGS/cesium/issues/7124)
  修复了使用较小椭球体时地球错误遮挡对象的问题。[#7124](https://github.com/CesiumGS/cesium/issues/7124)
- Fixed a regression introduced in 1.67 which caused overlapping colored ground geometry to have visual artifacts. [#8694](https://github.com/CesiumGS/cesium/pull/8694)
  修复了 1.67 中引入的导致重叠彩色贴地几何体出现显示瑕疵的回归问题。[#8694](https://github.com/CesiumGS/cesium/pull/8694)
- Fixed a clipping problem when viewing a polyline up close with the logarithmic depth buffer enabled, which is the default on most systems. [#8703](https://github.com/CesiumGS/cesium/pull/8703)
  修复了在启用对数深度缓冲区（大多数系统上的默认设置）时近距离查看折线时的裁剪问题。[#8703](https://github.com/CesiumGS/cesium/pull/8703)

## 1.67.0 - 2020-03-02

### Breaking Changes :mega:

- `Cesium3DTileset.skipLevelOfDetail` is now `false` by default. [#8631](https://github.com/CesiumGS/cesium/pull/8631)
  `Cesium3DTileset.skipLevelOfDetail` 现在默认为 `false`。[#8631](https://github.com/CesiumGS/cesium/pull/8631)
- glTF models are now rendered using the `LEQUALS` depth test function instead of `LESS`. This means that when geometry overlaps, the _later_ geometry will be visible above the earlier, where previously the opposite was true. We believe this is a more sensible default, and makes it easier to render e.g. outlined buildings with glTF. [#8646](https://github.com/CesiumGS/cesium/pull/8646)
  glTF 模型现在使用 `LEQUALS` 深度测试函数而非 `LESS` 进行渲染。这意味着当几何体发生重叠时，_后绘制的_几何体将显示在先绘制的几何体上方，而此前正好相反。我们认为这是一个更合理的默认设置，并且使渲染诸如带有轮廓线的 glTF 建筑物等更加容易。[#8646](https://github.com/CesiumGS/cesium/pull/8646)

### Additions :tada:

- Massively improved performance of clamped Entity ground geometry with dynamic colors. [#8630](https://github.com/CesiumGS/cesium/pull/8630)
  大幅提升了带有动态颜色的贴地 Entity 几何体的性能。[#8630](https://github.com/CesiumGS/cesium/pull/8630)
- Added `Entity.tileset` for loading a 3D Tiles tileset via the Entity API using the new `Cesium3DTilesetGraphics` class. [#8580](https://github.com/CesiumGS/cesium/pull/8580)
  新增了 `Entity.tileset`，用于通过 Entity API 使用新的 `Cesium3DTilesetGraphics` 类加载 3D Tiles 瓦片集。[#8580](https://github.com/CesiumGS/cesium/pull/8580)
- Added `tileset.uri`, `tileset.show`, and `tileset.maximumScreenSpaceError` properties to CZML processing for loading 3D Tiles. [#8580](https://github.com/CesiumGS/cesium/pull/8580)
  在 CZML 处理中新增了 `tileset.uri`、`tileset.show` 和 `tileset.maximumScreenSpaceError` 属性，用于加载 3D Tiles。[#8580](https://github.com/CesiumGS/cesium/pull/8580)
- Added `Color.lerp` for linearly interpolating between two RGB colors. [#8607](https://github.com/CesiumGS/cesium/pull/8607)
  新增了 `Color.lerp`，用于在两种 RGB 颜色之间进行线性插值。[#8607](https://github.com/CesiumGS/cesium/pull/8607)
- `CesiumTerrainProvider` now supports terrain tiles using a `WebMercatorTilingScheme` by specifying `"projection": "EPSG:3857"` in `layer.json`. It also now supports numbering tiles from the North instead of the South by specifying `"scheme": "slippyMap"` in `layer.json`. [#8563](https://github.com/CesiumGS/cesium/pull/8563)
  `CesiumTerrainProvider` 现在支持通过在 `layer.json` 中指定 `"projection": "EPSG:3857"` 来使用 `WebMercatorTilingScheme` 的地形瓦片。它现在还支持通过在 `layer.json` 中指定 `"scheme": "slippyMap"` 来从北向南对瓦片进行编号，而不是从南向北。[#8563](https://github.com/CesiumGS/cesium/pull/8563)
- Added basic support for `isNaN`, `isFinite`, `null`, and `undefined` in the 3D Tiles styling GLSL backend for point clouds. [#8621](https://github.com/CesiumGS/cesium/pull/8621)
  在点云的 3D Tiles 样式 GLSL 后端中增加了对 `isNaN`、`isFinite`、`null` 和 `undefined` 的基础支持。[#8621](https://github.com/CesiumGS/cesium/pull/8621)
- Added `sizeInMeters` to `ParticleSystem`. [#7746](https://github.com/CesiumGS/cesium/pull/7746)
  在 `ParticleSystem` 中新增了 `sizeInMeters`。[#7746](https://github.com/CesiumGS/cesium/pull/7746)

### Fixes :wrench:

- Fixed a bug that caused large, nearby geometry to be clipped when using a logarithmic depth buffer, which is the default on most systems. [#8600](https://github.com/CesiumGS/cesium/pull/8600)
  修复了在启用对数深度缓冲区（大多数系统上的默认设置）时导致附近的大型几何体被裁剪的 Bug。[#8600](https://github.com/CesiumGS/cesium/pull/8600)
- Fixed a bug where tiles would not load if the camera was tracking a moving tileset. [#8598](https://github.com/CesiumGS/cesium/pull/8598)
  修复了当相机正在跟踪移动的瓦片集时瓦片无法加载的 Bug。[#8598](https://github.com/CesiumGS/cesium/pull/8598)
- Fixed a bug where applying a new 3D Tiles style during a flight would not update all existing tiles. [#8622](https://github.com/CesiumGS/cesium/pull/8622)
  修复了在相机飞行期间应用新的 3D Tiles 样式不会更新所有现有瓦片的 Bug。[#8622](https://github.com/CesiumGS/cesium/pull/8622)
- Fixed a bug where Cartesian vectors could not be packed to typed arrays [#8568](https://github.com/CesiumGS/cesium/pull/8568)
  修复了笛卡尔向量无法打包到类型化数组（typed arrays）的 Bug。[#8568](https://github.com/CesiumGS/cesium/pull/8568)
- Updated knockout from 3.5.0 to 3.5.1. [#8424](https://github.com/CesiumGS/cesium/pull/8424)
  将 knockout 从 3.5.0 更新至 3.5.1。[#8424](https://github.com/CesiumGS/cesium/pull/8424)
- Cesium's local development server now works in Node 12 & 13 [#8648](https://github.com/CesiumGS/cesium/pull/8648)
  Cesium 的本地开发服务器现在可以在 Node 12 和 13 中正常工作。[#8648](https://github.com/CesiumGS/cesium/pull/8648)

### Deprecated :hourglass_flowing_sand:

- The `isArray` function has been deprecated and will be removed in Cesium 1.69. Use the native `Array.isArray` function instead. [#8526](https://github.com/CesiumGS/cesium/pull/8526)
  `isArray` 函数已被弃用，并将在 Cesium 1.69 中移除。请改用原生 `Array.isArray` 函数。[#8526](https://github.com/CesiumGS/cesium/pull/8526)

## 1.66.0 - 2020-02-03

### Deprecated :hourglass_flowing_sand:

- The property `Scene.sunColor` has been deprecated and will be removed in Cesium 1.69. Use `scene.light.color` and `scene.light.intensity` instead. [#8493](https://github.com/CesiumGS/cesium/pull/8493)
  属性 `Scene.sunColor` 已被弃用，并将在 Cesium 1.69 中移除。请改用 `scene.light.color` 和 `scene.light.intensity`。[#8493](https://github.com/CesiumGS/cesium/pull/8493)

### Additions :tada:

- `useBrowserRecommendedResolution` flag in `Viewer` and `CesiumWidget` now defaults to `true`. This ensures Cesium rendering is fast and smooth by default across all devices. Set it to `false` to always render at native device resolution instead at the cost of performance on under-powered devices. [#8548](https://github.com/CesiumGS/cesium/pull/8548)
  `Viewer` 和 `CesiumWidget` 中的 `useBrowserRecommendedResolution` 标志现在默认为 `true`。这确保了 Cesium 在所有设备上默认都能实现快速流畅的渲染。将其设置为 `false` 可始终以设备原生分辨率进行渲染，但这会以牺牲低性能设备上的运行速度为代价。[#8548](https://github.com/CesiumGS/cesium/pull/8548)
- Cesium now creates a WebGL context with a `powerPreference` value of `high-performance`. Some browsers use this setting to enable a second, more powerful, GPU. You can set it back to `default`, or opt-in to `low-power` mode, by passing the context option when creating a `Viewer` or `CesiumWidget` instance:
  Cesium 现在创建 WebGL 上下文时 `powerPreference` 的值为 `high-performance`。某些浏览器使用此设置来启用第二块性能更强劲的独立显卡（GPU）。您可以通过在创建 `Viewer` 或 `CesiumWidget` 实例时传递 context 选项将其改回 `default` 或选择进入 `low-power` 模式：

```js
var viewer = new Viewer("cesiumContainer", {
  contextOptions: {
    webgl: {
      powerPreference: "default",
    },
  },
});
```

- Added more customization to Cesium's lighting system. [#8493](https://github.com/CesiumGS/cesium/pull/8493)
  为 Cesium 的光照系统增加了更多自定义功能。[#8493](https://github.com/CesiumGS/cesium/pull/8493)
  - Added `Light`, `DirectionalLight`, and `SunLight` classes for creating custom light sources.
    新增了 `Light`、`DirectionalLight` 和 `SunLight` 类，用于创建自定义光源。
  - Added `Scene.light` for setting the scene's light source, which defaults to a `SunLight`.
    新增了 `Scene.light` 用于设置场景的光源，默认为 `SunLight`。
  - Added `Globe.dynamicAtmosphereLighting` for enabling lighting effects on atmosphere and fog, such as day/night transitions. It is true by default but may be set to false if the atmosphere should stay unchanged regardless of the scene's light direction.
    新增了 `Globe.dynamicAtmosphereLighting`，用于在大气和雾上启用光照效果（例如昼夜交替）。该值默认为 true，但如果希望无论场景光照方向如何大气都保持不变，则可以将其设置为 false。
  - Added `Globe.dynamicAtmosphereLightingFromSun` for using the sun direction instead of the scene's light direction when `Globe.dynamicAtmosphereLighting` is enabled. See the moonlight example in the [Lighting Sandcastle example](https://cesiumjs.org/Cesium/Apps/Sandcastle/?src=Lighting.html).
    新增了 `Globe.dynamicAtmosphereLightingFromSun`，以便在启用 `Globe.dynamicAtmosphereLighting` 时使用太阳方向代替场景光照方向。参见[光照 Sandcastle 示例（Lighting Sandcastle example）](https://cesiumjs.org/Cesium/Apps/Sandcastle/?src=Lighting.html)中的月光示例。
  - Primitives and the globe are now shaded with the scene light's color.
    图元基元和地球现在将使用场景光源的颜色进行着色。
- Updated SampleData models to glTF 2.0. [#7802](https://github.com/CesiumGS/cesium/issues/7802)
  将 SampleData 示例模型更新至 glTF 2.0。[#7802](https://github.com/CesiumGS/cesium/issues/7802)
- Added `Globe.showSkirts` to support the ability to hide terrain skirts when viewing terrain from below the surface. [#8489](https://github.com/CesiumGS/cesium/pull/8489)
  新增了 `Globe.showSkirts`，以支持在从地下查看地形时隐藏地形裙边（terrain skirts）的功能。[#8489](https://github.com/CesiumGS/cesium/pull/8489)
- Added `minificationFilter` and `magnificationFilter` options to `Material` to control texture filtering. [#8473](https://github.com/CesiumGS/cesium/pull/8473)
  在 `Material` 中新增了 `minificationFilter` 和 `magnificationFilter` 选项，用于控制纹理过滤。[#8473](https://github.com/CesiumGS/cesium/pull/8473)
- Updated [earcut](https://github.com/mapbox/earcut) to 2.2.1. [#8528](https://github.com/CesiumGS/cesium/pull/8528)
  将 [earcut](https://github.com/mapbox/earcut) 更新至 2.2.1。[#8528](https://github.com/CesiumGS/cesium/pull/8528)
- Added a font cache to improve label performance. [#8537](https://github.com/CesiumGS/cesium/pull/8537)
  增加了字体缓存以提升标签渲染性能。[#8537](https://github.com/CesiumGS/cesium/pull/8537)

### Fixes :wrench:

- Fixed a bug where the camera could go underground during mouse navigation. [#8504](https://github.com/CesiumGS/cesium/pull/8504)
  修复了鼠标导航过程中相机可能进入地下的 Bug。[#8504](https://github.com/CesiumGS/cesium/pull/8504)
- Fixed a bug where rapidly updating a `PolylineCollection` could result in an `instanceIndex` is out of range error. [#8546](https://github.com/CesiumGS/cesium/pull/8546)
  修复了快速更新 `PolylineCollection` 可能导致 `instanceIndex` 超出范围错误的 Bug。[#8546](https://github.com/CesiumGS/cesium/pull/8546)
- Fixed issue where `RequestScheduler` double-counted image requests made via `createImageBitmap`. [#8162](https://github.com/CesiumGS/cesium/issues/8162)
  修复了 `RequestScheduler` 重复计算通过 `createImageBitmap` 发起的图像请求的问题。[#8162](https://github.com/CesiumGS/cesium/issues/8162)
- Reduced Cesium bundle size by avoiding unnecessarily importing `Cesium3DTileset` in `Picking.js`. [#8532](https://github.com/CesiumGS/cesium/pull/8532)
  通过避免在 `Picking.js` 中不必要地导入 `Cesium3DTileset` 减小了 Cesium 打包体积。[#8532](https://github.com/CesiumGS/cesium/pull/8532)
- Fixed a bug where files with backslashes were not loaded in KMZ files. [#8533](https://github.com/CesiumGS/cesium/pull/8533)
  修复了 KMZ 文件中包含反斜杠的文件无法加载的 Bug。[#8533](https://github.com/CesiumGS/cesium/pull/8533)
- Fixed WebGL warning message about `EXT_float_blend` being implicitly enabled. [#8534](https://github.com/CesiumGS/cesium/pull/8534)
  修复了关于 `EXT_float_blend` 被隐式启用的 WebGL 警告信息。[#8534](https://github.com/CesiumGS/cesium/pull/8534)
- Fixed a bug where toggling point cloud classification visibility would result in a grey screen on Linux / Nvidia. [#8538](https://github.com/CesiumGS/cesium/pull/8538)
  修复了在 Linux / Nvidia 环境下切换点云分类可见性会导致灰屏的 Bug。[#8538](https://github.com/CesiumGS/cesium/pull/8538)
- Fixed a bug where a point in a `PointPrimitiveCollection` was rendered in the middle of the screen instead of being clipped. [#8542](https://github.com/CesiumGS/cesium/pull/8542)
  修复了 `PointPrimitiveCollection` 中的点在应当被裁剪时却渲染在屏幕中央的 Bug。[#8542](https://github.com/CesiumGS/cesium/pull/8542)
- Fixed a crash when deleting and re-creating polylines from CZML. `ReferenceProperty` now returns undefined when the target entity or property does not exist, instead of throwing. [#8544](https://github.com/CesiumGS/cesium/pull/8544)
  修复了从 CZML 中删除并重新创建折线时的崩溃。目标实体或属性不存在时，`ReferenceProperty` 现在返回 undefined 而不是抛出异常。[#8544](https://github.com/CesiumGS/cesium/pull/8544)
- Fixed terrain tile picking in the Cesium Inspector. [#8567](https://github.com/CesiumGS/cesium/pull/8567)
  修复了 Cesium Inspector 中的地形瓦片拾取问题。[#8567](https://github.com/CesiumGS/cesium/pull/8567)
- Fixed a crash that could occur when an entity was deleted while the corresponding `Primitive` was being created asynchronously. [#8569](https://github.com/CesiumGS/cesium/pull/8569)
  修复了在异步创建对应的 `Primitive` 期间删除实体可能发生的崩溃。[#8569](https://github.com/CesiumGS/cesium/pull/8569)
- Fixed a crash when calling `camera.lookAt` with the origin (0, 0, 0) as the target. This could happen when looking at a tileset with the origin as its center. [#8571](https://github.com/CesiumGS/cesium/pull/8571)
  修复了以原点 (0, 0, 0) 为目标调用 `camera.lookAt` 时的崩溃。这可能发生在查看以原点为中心的瓦片集时。[#8571](https://github.com/CesiumGS/cesium/pull/8571)
- Fixed a bug where `camera.viewBoundingSphere` was modifying the `offset` parameter. [#8438](https://github.com/CesiumGS/cesium/pull/8438)
  修复了 `camera.viewBoundingSphere` 修改了 `offset` 参数的 Bug。[#8438](https://github.com/CesiumGS/cesium/pull/8438)
- Fixed a crash when creating a plane with both position and normal on the Z-axis. [#8576](https://github.com/CesiumGS/cesium/pull/8576)
  修复了创建位置和法线均在 Z 轴上的平面时发生的崩溃。[#8576](https://github.com/CesiumGS/cesium/pull/8576)
- Fixed `BoundingSphere.projectTo2D` when the bounding sphere’s center is at the origin. [#8482](https://github.com/CesiumGS/cesium/pull/8482)
  修复了当包围球球心位于原点时 `BoundingSphere.projectTo2D` 的计算问题。[#8482](https://github.com/CesiumGS/cesium/pull/8482)

## 1.65.0 - 2020-01-06

### Breaking Changes :mega:

- `OrthographicFrustum.getPixelDimensions`, `OrthographicOffCenterFrustum.getPixelDimensions`, `PerspectiveFrustum.getPixelDimensions`, and `PerspectiveOffCenterFrustum.getPixelDimensions` now require a `pixelRatio` argument before the `result` argument. The previous function definition has been deprecated since 1.63. [#8320](https://github.com/CesiumGS/cesium/pull/8320)
  `OrthographicFrustum.getPixelDimensions`、`OrthographicOffCenterFrustum.getPixelDimensions`、`PerspectiveFrustum.getPixelDimensions` 和 `PerspectiveOffCenterFrustum.getPixelDimensions` 现在要求在 `result` 参数之前提供 `pixelRatio` 参数。旧函数定义自 1.63 起已被弃用。[#8320](https://github.com/CesiumGS/cesium/pull/8320)
- The function `Matrix4.getRotation` has been renamed to `Matrix4.getMatrix3`. `Matrix4.getRotation` has been deprecated since 1.62. [#8183](https://github.com/CesiumGS/cesium/pull/8183)
  函数 `Matrix4.getRotation` 已重命名为 `Matrix4.getMatrix3`。`Matrix4.getRotation` 自 1.62 起已被弃用。[#8183](https://github.com/CesiumGS/cesium/pull/8183)
- `createTileMapServiceImageryProvider` and `createOpenStreetMapImageryProvider` have been removed. Instead, pass the same options to `new TileMapServiceImageryProvider` and `new OpenStreetMapImageryProvider` respectively. The old functions have been deprecated since 1.62. [#8174](https://github.com/CesiumGS/cesium/pull/8174)
  `createTileMapServiceImageryProvider` 和 `createOpenStreetMapImageryProvider` 已被移除。请改为分别将相同的选项传递给 `new TileMapServiceImageryProvider` 和 `new OpenStreetMapImageryProvider`。旧函数自 1.62 起已被弃用。[#8174](https://github.com/CesiumGS/cesium/pull/8174)

### Additions :tada:

- Added `Globe.backFaceCulling` to support viewing terrain from below the surface. [#8470](https://github.com/CesiumGS/cesium/pull/8470)
  新增了 `Globe.backFaceCulling`（背面剔除），以支持从地表下方查看地形。[#8470](https://github.com/CesiumGS/cesium/pull/8470)

### Fixes :wrench:

- Fixed Geocoder auto-complete suggestions when hosted inside Web Components. [#8425](https://github.com/CesiumGS/cesium/pull/8425)
  修复了在 Web Components 内部托管时地理编码器（Geocoder）自动补全建议的问题。[#8425](https://github.com/CesiumGS/cesium/pull/8425)
- Fixed terrain tile culling problems when under ellipsoid. [#8397](https://github.com/CesiumGS/cesium/pull/8397)
  修复了在椭球体下方时的地形瓦片剔除问题。[#8397](https://github.com/CesiumGS/cesium/pull/8397)
- Fixed primitive culling when below the ellipsoid but above terrain. [#8398](https://github.com/CesiumGS/cesium/pull/8398)
  修复了处于椭球体下方但在地形上方时的图元基元剔除问题。[#8398](https://github.com/CesiumGS/cesium/pull/8398)
- Improved the translucency calculation for the Water material type. [#8455](https://github.com/CesiumGS/cesium/pull/8455)
  改进了水面材质类型（Water material type）的半透明度计算。[#8455](https://github.com/CesiumGS/cesium/pull/8455)
- Fixed bounding volume calculation for `GroundPrimitive`. [#4883](https://github.com/CesiumGS/cesium/issues/4483)
  修复了 `GroundPrimitive` 的包围体计算。[#4883](https://github.com/CesiumGS/cesium/issues/4483)
- Fixed `OrientedBoundingBox.fromRectangle` for rectangles with width greater than 180 degrees. [#8475](https://github.com/CesiumGS/cesium/pull/8475)
  修复了宽度大于 180 度的矩形的 `OrientedBoundingBox.fromRectangle` 计算。[#8475](https://github.com/CesiumGS/cesium/pull/8475)
- Fixed globe picking so that it returns the closest intersecting triangle instead of the first intersecting triangle. [#8390](https://github.com/CesiumGS/cesium/pull/8390)
  修复了地球拾取，使其返回最近的相交三角形而非第一个相交三角形。[#8390](https://github.com/CesiumGS/cesium/pull/8390)
- Fixed horizon culling issues with large root tiles. [#8487](https://github.com/CesiumGS/cesium/pull/8487)
  修复了大型根瓦片的地平线视界剔除（horizon culling）问题。[#8487](https://github.com/CesiumGS/cesium/pull/8487)
- Fixed a lighting bug affecting Macs with Intel integrated graphics where glTF 2.0 PBR models with double sided materials would have flipped normals. [#8494](https://github.com/CesiumGS/cesium/pull/8494)
  修复了影响搭载 Intel 集成显卡的 Mac 的光照 Bug：带有双面材质的 glTF 2.0 PBR 模型法线会发生反转。[#8494](https://github.com/CesiumGS/cesium/pull/8494)

## 1.64.0 - 2019-12-02

### Fixes :wrench:

- Fixed an issue in image based lighting where an invalid environment map would silently fail. [#8303](https://github.com/CesiumGS/cesium/pull/8303)
  修复了基于图像的光照（IBL）中无效环境贴图会静默失败的问题。[#8303](https://github.com/CesiumGS/cesium/pull/8303)
- Various small internal improvements
  若干内部小型改进

## 1.63.1 - 2019-11-06

### Fixes :wrench:

- Fixed regression in 1.63 where ground atmosphere and labels rendered incorrectly on displays with `window.devicePixelRatio` greater than 1.0. [#8351](https://github.com/CesiumGS/cesium/pull/8351)
  修复了 1.63 中的回归问题：在 `window.devicePixelRatio` 大于 1.0 的显示屏上地面大气和标签渲染不正确。[#8351](https://github.com/CesiumGS/cesium/pull/8351)
- Fixed regression in 1.63 where some primitives would show through the globe when log depth is disabled. [#8368](https://github.com/CesiumGS/cesium/pull/8368)
  修复了 1.63 中的回归问题：在禁用对数深度缓冲区时某些图元基元会穿透地球显示。[#8368](https://github.com/CesiumGS/cesium/pull/8368)

## 1.63 - 2019-11-01

### Major Announcements :loudspeaker:

- Cesium has migrated to ES6 modules. This may or may not be a breaking change for your application depending on how you use Cesium. See our [blog post](https://cesium.com/blog/2019/10/31/cesiumjs-es6/) for the full details.
  Cesium 已迁移至 ES6 模块。根据您使用 Cesium 的方式，这可能会也可能不会对您的应用程序造成破坏性变更。完整详情请参见我们的[博客文章](https://cesium.com/blog/2019/10/31/cesiumjs-es6/)。
- We’ve consolidated all of our website content from cesiumjs.org and cesium.com into one home on cesium.com. Here’s where you can now find:
  我们已将 cesiumjs.org 和 cesium.com 上的所有网站内容合并到 cesium.com 这一个主页中。您现在可以在以下位置找到它们：
  - [Sandcastle](https://sandcastle.cesium.com) - `https://sandcastle.cesium.com`
    [Sandcastle](https://sandcastle.cesium.com) - `https://sandcastle.cesium.com`
  - [API Docs](https://cesium.com/learn/cesiumjs/ref-doc/) - `https://cesium.com/learn/cesiumjs/ref-doc/`
    [API 文档](https://cesium.com/learn/cesiumjs/ref-doc/) - `https://cesium.com/learn/cesiumjs/ref-doc/`
  - [Downloads](https://cesium.com/downloads/) - `https://cesium.com/downloads/`
    [下载页面](https://cesium.com/downloads/) - `https://cesium.com/downloads/`
  - Hosted releases can be found at `https://cesium.com/downloads/cesiumjs/releases/<CesiumJS Version Number>/Build/Cesium/Cesium.js`
    托管的发布版本可在 `https://cesium.com/downloads/cesiumjs/releases/<CesiumJS Version Number>/Build/Cesium/Cesium.js` 获取
  - See our [blog post](https://cesium.com/blog/2019/10/15/cesiumjs-migration/) for more information.
    有关更多信息，请参阅我们的[博客文章](https://cesium.com/blog/2019/10/15/cesiumjs-migration/)。

### Additions :tada:

- Decreased Web Workers bundle size by a factor of 10, from 8384KB (2624KB gzipped) to 863KB (225KB gzipped). This makes Cesium load faster, especially on low-end devices and slower network connections.
  将 Web Workers 打包体积减小为原来的 1/10，从 8384KB（gzip 压缩后 2624KB）缩减到 863KB（gzip 压缩后 225KB）。这使得 Cesium 加载速度更快，特别是在低端设备和较慢的网络连接下。
- Added full UTF-8 support to labels, greatly improving support for non-latin alphabets and emoji. [#7280](https://github.com/CesiumGS/cesium/pull/7280)
  为标签增加了完整的 UTF-8 支持，大大改善了对非拉丁字符集和表情符号（emoji）的支持。[#7280](https://github.com/CesiumGS/cesium/pull/7280)
- Added `"type": "module"` to package.json to take advantage of native ES6 module support in newer versions of Node.js. This also enables module-based front-end development for tooling that relies on Node.js module resolution.
  在 package.json 中添加了 `"type": "module"`，以利用较新版本 Node.js 中的原生 ES6 模块支持。这也为依赖 Node.js 模块解析的工具实现了基于模块的前端开发。
- The combined `Build/Cesium/Cesium.js` and `Build/CesiumUnminified/Cesium.js` have been upgraded from IIFE to UMD modules that support IIFE, AMD, and commonjs.
  合并后的 `Build/Cesium/Cesium.js` 和 `Build/CesiumUnminified/Cesium.js` 已从 IIFE 升级为支持 IIFE、AMD 和 CommonJS 的 UMD 模块。
- Added `pixelRatio` parameter to `OrthographicFrustum.getPixelDimensions`, `OrthographicOffCenterFrustum.getPixelDimensions`, `PerspectiveFrustum.getPixelDimensions`, and `PerspectiveOffCenterFrustum.getPixelDimensions`. Pass in `scene.pixelRatio` for dimensions in CSS pixel units or `1.0` for dimensions in native device pixel units. [#8237](https://github.com/CesiumGS/cesium/pull/8237)
  在 `OrthographicFrustum.getPixelDimensions`、`OrthographicOffCenterFrustum.getPixelDimensions`、`PerspectiveFrustum.getPixelDimensions` 和 `PerspectiveOffCenterFrustum.getPixelDimensions` 中增加了 `pixelRatio` 参数。传入 `scene.pixelRatio` 获取以 CSS 像素为单位的尺寸，或传入 `1.0` 获取以设备原生像素为单位的尺寸。[#8237](https://github.com/CesiumGS/cesium/pull/8237)

### Fixes :wrench:

- Fixed css pixel usage for polylines, point clouds, models, primitives, and post-processing. [#8113](https://github.com/CesiumGS/cesium/issues/8113)
  修复了折线、点云、模型、图元基元和后处理中 CSS 像素的使用问题。[#8113](https://github.com/CesiumGS/cesium/issues/8113)
- Fixed a bug where `scene.sampleHeightMostDetailed` and `scene.clampToHeightMostDetailed` would not resolve in request render mode. [#8281](https://github.com/CesiumGS/cesium/issues/8281)
  修复了在显式请求渲染模式（request render mode）下 `scene.sampleHeightMostDetailed` 和 `scene.clampToHeightMostDetailed` 无法 resolve 的 Bug。[#8281](https://github.com/CesiumGS/cesium/issues/8281)
- Fixed seam artifacts when log depth is disabled, `scene.globe.depthTestAgainstTerrain` is false, and primitives are under the globe. [#8205](https://github.com/CesiumGS/cesium/pull/8205)
  修复了在对数深度被禁用、`scene.globe.depthTestAgainstTerrain` 为 false 且图元位于地球下方时的接缝瑕疵。[#8205](https://github.com/CesiumGS/cesium/pull/8205)
- Fix dynamic ellipsoids using `innerRadii`, `minimumClock`, `maximumClock`, `minimumCone` or `maximumCone`. [#8277](https://github.com/CesiumGS/cesium/pull/8277)
  修复了使用 `innerRadii`、`minimumClock`、`maximumClock`、`minimumCone` 或 `maximumCone` 的动态椭球体。[#8277](https://github.com/CesiumGS/cesium/pull/8277)
- Fixed rendering billboard collections containing more than 65536 billboards. [#8325](https://github.com/CesiumGS/cesium/pull/8325)
  修复了渲染包含超过 65536 个广告牌的广告牌集合的问题。[#8325](https://github.com/CesiumGS/cesium/pull/8325)

### Deprecated :hourglass_flowing_sand:

- `OrthographicFrustum.getPixelDimensions`, `OrthographicOffCenterFrustum.getPixelDimensions`, `PerspectiveFrustum.getPixelDimensions`, and `PerspectiveOffCenterFrustum.getPixelDimensions` now take a `pixelRatio` argument before the `result` argument. The previous function definition will no longer work in 1.65. [#8237](https://github.com/CesiumGS/cesium/pull/8237)
  `OrthographicFrustum.getPixelDimensions`、`OrthographicOffCenterFrustum.getPixelDimensions`、`PerspectiveFrustum.getPixelDimensions` 和 `PerspectiveOffCenterFrustum.getPixelDimensions` 现在在 `result` 参数之前接受 `pixelRatio` 参数。旧函数定义在 1.65 中将不再可用。[#8237](https://github.com/CesiumGS/cesium/pull/8237)

## 1.62 - 2019-10-01

### Deprecated :hourglass_flowing_sand:

- `createTileMapServiceImageryProvider` and `createOpenStreetMapImageryProvider` have been deprecated and will be removed in Cesium 1.65. Instead, pass the same options to `new TileMapServiceImageryProvider` and `new OpenStreetMapImageryProvider` respectively.
  `createTileMapServiceImageryProvider` 和 `createOpenStreetMapImageryProvider` 已被弃用，并将在 Cesium 1.65 中移除。请改为分别将相同的选项传递给 `new TileMapServiceImageryProvider` 和 `new OpenStreetMapImageryProvider`。
- The function `Matrix4.getRotation` has been deprecated and renamed to `Matrix4.getMatrix3`. `Matrix4.getRotation` will be removed in version 1.65.
  函数 `Matrix4.getRotation` 已被弃用并重命名为 `Matrix4.getMatrix3`。`Matrix4.getRotation` 将在 1.65 版本中移除。

### Additions :tada:

- Added ability to create partial ellipsoids using both the Entity API and CZML. New ellipsoid geometry properties: `innerRadii`, `minimumClock`, `maximumClock`, `minimumCone`, and `maximumCone`. This affects both `EllipsoidGeometry` and `EllipsoidOutlineGeometry`. See the updated [Sandcastle example](https://cesiumjs.org/Cesium/Apps/Sandcastle/?src=Partial%20Ellipsoids.html&label=Geometries). [#5995](https://github.com/CesiumGS/cesium/pull/5995)
  增加了使用 Entity API 和 CZML 创建局部椭球体的能力。新的椭球体几何属性包括：`innerRadii`、`minimumClock`、`maximumClock`、`minimumCone` 和 `maximumCone`。这同时影响 `EllipsoidGeometry` 和 `EllipsoidOutlineGeometry`。参见更新后的 [Sandcastle 示例](https://cesiumjs.org/Cesium/Apps/Sandcastle/?src=Partial%20Ellipsoids.html&label=Geometries)。[#5995](https://github.com/CesiumGS/cesium/pull/5995)
- Added `useBrowserRecommendedResolution` flag to `Viewer` and `CesiumWidget`. When true, Cesium renders at CSS pixel resolution instead of native device resolution. This replaces the workaround in the 1.61 change list. [8215](https://github.com/CesiumGS/cesium/issues/8215)
  在 `Viewer` 和 `CesiumWidget` 中添加了 `useBrowserRecommendedResolution` 标志。当为 true 时，Cesium 以 CSS 像素分辨率而非原生设备分辨率进行渲染。这替代了 1.61 更新列表中的变通方案。[8215](https://github.com/CesiumGS/cesium/issues/8215)
- Added `TileMapResourceImageryProvider` and `OpenStreetMapImageryProvider` classes to improve API consistency: [#4812](https://github.com/CesiumGS/cesium/issues/4812)
  新增了 `TileMapResourceImageryProvider` 和 `OpenStreetMapImageryProvider` 类以提高 API 一致性：[#4812](https://github.com/CesiumGS/cesium/issues/4812)
- Added `credit` parameter to `CzmlDataSource`, `GeoJsonDataSource`, `KmlDataSource` and `Model`. [#8173](https://github.com/CesiumGS/cesium/pull/8173)
  在 `CzmlDataSource`、`GeoJsonDataSource`、`KmlDataSource` 和 `Model` 中增加了 `credit` 参数。[#8173](https://github.com/CesiumGS/cesium/pull/8173)
- Added `Matrix3.getRotation` to get the rotational component of a matrix with scaling removed. [#8182](https://github.com/CesiumGS/cesium/pull/8182)
  新增了 `Matrix3.getRotation`，用于获取去除了缩放成分后的矩阵旋转分量。[#8182](https://github.com/CesiumGS/cesium/pull/8182)

### Fixes :wrench:

- Fixed labels not showing for individual entities in data sources when clustering is enabled. [#6087](https://github.com/CesiumGS/cesium/issues/6087)
  修复了在启用聚类时数据源中各个实体的标签不显示的问题。[#6087](https://github.com/CesiumGS/cesium/issues/6087)
- Fixed an issue where polygons, corridors, rectangles, and ellipses on terrain would not render on some mobile devices. [#6739](https://github.com/CesiumGS/cesium/issues/6739)
  修复了地形上的多边形、走廊、矩形和椭圆在某些移动设备上无法渲染的问题。[#6739](https://github.com/CesiumGS/cesium/issues/6739)
- Fixed a bug where GlobeSurfaceTile would not render the tile until all layers completed loading causing globe to appear to hang. [#7974](https://github.com/CesiumGS/cesium/issues/7974)
  修复了 `GlobeSurfaceTile` 在所有图层完成加载之前不会渲染瓦片，从而导致地球看起来假死的 Bug。[#7974](https://github.com/CesiumGS/cesium/issues/7974)
- Spread out KMl loading across multiple frames to prevent freezing. [#8195](https://github.com/CesiumGS/cesium/pull/8195)
  将 KML 加载分散到多个帧以防止界面卡死。[#8195](https://github.com/CesiumGS/cesium/pull/8195)
- Fixed a bug where extruded polygons would sometimes be missing segments. [#8035](https://github.com/CesiumGS/cesium/pull/8035)
  修复了拉伸多边形有时会缺失线段的 Bug。[#8035](https://github.com/CesiumGS/cesium/pull/8035)
- Made pixel sizes consistent for polylines and point clouds when rendering at different pixel ratios. [#8113](https://github.com/CesiumGS/cesium/issues/8113)
  使折线和点云在不同像素比率下渲染时的像素大小保持一致。[#8113](https://github.com/CesiumGS/cesium/issues/8113)
- `Camera.flyTo` flies to the correct location in 2D when the destination crosses the international date line [#7909](https://github.com/CesiumGS/cesium/pull/7909)
  修复了在 2D 模式下目的地跨越国际日界线时 `Camera.flyTo` 飞向正确位置的问题。[#7909](https://github.com/CesiumGS/cesium/pull/7909)
- Fixed 3D tiles style coloring when multiple tilesets are in the scene [#8051](https://github.com/CesiumGS/cesium/pull/8051)
  修复了场景中存在多个瓦片集时的 3D Tiles 样式着色问题。[#8051](https://github.com/CesiumGS/cesium/pull/8051)
- 3D Tiles geometric error now correctly scales with transform. [#8182](https://github.com/CesiumGS/cesium/pull/8182)
  3D Tiles 几何误差现在可以根据变换正确缩放。[#8182](https://github.com/CesiumGS/cesium/pull/8182)
- Fixed per-feature post processing from sometimes selecting the wrong feature. [#7929](https://github.com/CesiumGS/cesium/pull/7929)
  修复了按要素后处理有时会选择错误要素的问题。[#7929](https://github.com/CesiumGS/cesium/pull/7929)
- Fixed a bug where dynamic polylines did not use the given arcType. [#8191](https://github.com/CesiumGS/cesium/issues/8191)
  修复了动态折线未使用给定的 arcType 的 Bug。[#8191](https://github.com/CesiumGS/cesium/issues/8191)
- Fixed atmosphere brightness when High Dynamic Range is disabled. [#8149](https://github.com/CesiumGS/cesium/issues/8149)
  修复了禁用高动态范围（HDR）时的大气亮度问题。[#8149](https://github.com/CesiumGS/cesium/issues/8149)
- Fixed brightness levels for procedural Image Based Lighting. [#7803](https://github.com/CesiumGS/cesium/issues/7803)
  修复了程序化基于图像光照（IBL）的亮度级别。[#7803](https://github.com/CesiumGS/cesium/issues/7803)
- Fixed alpha equation for `BlendingState.ALPHA_BLEND` and `BlendingState.ADDITIVE_BLEND`. [#8202](https://github.com/CesiumGS/cesium/pull/8202)
  修复了 `BlendingState.ALPHA_BLEND` 和 `BlendingState.ADDITIVE_BLEND` 的 alpha 方程。[#8202](https://github.com/CesiumGS/cesium/pull/8202)
- Improved display of tile coordinates for `TileCoordinatesImageryProvider` [#8131](https://github.com/CesiumGS/cesium/pull/8131)
  改进了 `TileCoordinatesImageryProvider` 的瓦片坐标显示。[#8131](https://github.com/CesiumGS/cesium/pull/8131)
- Reduced size of approximateTerrainHeights.json [#7959](https://github.com/CesiumGS/cesium/pull/7959)
  减小了 approximateTerrainHeights.json 的文件大小。[#7959](https://github.com/CesiumGS/cesium/pull/7959)
- Fixed undefined `quadDetails` error from zooming into the map really close. [#8011](https://github.com/CesiumGS/cesium/pull/8011)
  修复了缩放到非常靠近地图时出现 undefined `quadDetails` 错误的问题。[#8011](https://github.com/CesiumGS/cesium/pull/8011)
- Fixed a crash for 3D Tiles that have zero volume. [#7945](https://github.com/CesiumGS/cesium/pull/7945)
  修复了体积为零的 3D Tiles 导致的崩溃。[#7945](https://github.com/CesiumGS/cesium/pull/7945)
- Fixed relative-to-center check, `depthFailAppearance` resource freeing for `Primitive` [#8044](https://github.com/CesiumGS/cesium/pull/8044)
  修复了 `Primitive` 的相对于中心（RTC）检查以及 `depthFailAppearance` 资源释放问题。[#8044](https://github.com/CesiumGS/cesium/pull/8044)

## 1.61 - 2019-09-03

### Additions :tada:

- Added optional `index` parameter to `PrimitiveCollection.add`. [#8041](https://github.com/CesiumGS/cesium/pull/8041)
  在 `PrimitiveCollection.add` 中新增了可选的 `index` 参数。[#8041](https://github.com/CesiumGS/cesium/pull/8041)
- Cesium now renders at native device resolution by default instead of CSS pixel resolution, to go back to the old behavior, set `viewer.resolutionScale = 1.0 / window.devicePixelRatio`. [#8082](https://github.com/CesiumGS/cesium/issues/8082)
  Cesium 现在默认以原生设备分辨率而非 CSS 像素分辨率进行渲染。若要恢复为旧行为，请设置 `viewer.resolutionScale = 1.0 / window.devicePixelRatio`。[#8082](https://github.com/CesiumGS/cesium/issues/8082)
- Added `getByName` method to `DataSourceCollection` allowing to retrieve `DataSource`s by their name property from the collection
  在 `DataSourceCollection` 中新增了 `getByName` 方法，允许通过其 name 属性从集合中检索 `DataSource`。

### Fixes :wrench:

- Disable FXAA by default. To re-enable, set `scene.postProcessStages.fxaa.enabled = true` [#7875](https://github.com/CesiumGS/cesium/issues/7875)
  默认禁用 FXAA。若要重新启用，请设置 `scene.postProcessStages.fxaa.enabled = true`。[#7875](https://github.com/CesiumGS/cesium/issues/7875)
- Fixed a crash when a glTF model used `KHR_texture_transform` without a sampler defined. [#7916](https://github.com/CesiumGS/cesium/issues/7916)
  修复了 glTF 模型在未定义采样器的情况下使用 `KHR_texture_transform` 时发生的崩溃。[#7916](https://github.com/CesiumGS/cesium/issues/7916)
- Fixed post-processing selection filtering to work for bloom. [#7984](https://github.com/CesiumGS/cesium/issues/7984)
  修复了后处理选择过滤以使其适用于泛光（bloom）。[#7984](https://github.com/CesiumGS/cesium/issues/7984)
- Disabled HDR by default to improve visual quality in most standard use cases. Set `viewer.scene.highDynamicRange = true` to re-enable. [#7966](https://github.com/CesiumGS/cesium/issues/7966)
  默认禁用 HDR 以提升大多数标准用例下的视觉质量。设置 `viewer.scene.highDynamicRange = true` 可重新启用。[#7966](https://github.com/CesiumGS/cesium/issues/7966)
- Fixed a bug that causes hidden point primitives to still appear on some operating systems. [#8043](https://github.com/CesiumGS/cesium/issues/8043)
  修复了导致隐藏的点图元在某些操作系统上仍然显示的 Bug。[#8043](https://github.com/CesiumGS/cesium/issues/8043)
- Fix negative altitude altitude handling in `GoogleEarthEnterpriseTerrainProvider`. [#8109](https://github.com/CesiumGS/cesium/pull/8109)
  修复了 `GoogleEarthEnterpriseTerrainProvider` 中负高程的处理。[#8109](https://github.com/CesiumGS/cesium/pull/8109)
- Fixed issue where KTX or CRN files would not be properly identified. [#7979](https://github.com/CesiumGS/cesium/issues/7979)
  修复了无法正确识别 KTX 或 CRN 文件的问题。[#7979](https://github.com/CesiumGS/cesium/issues/7979)
- Fixed multiple globe materials making the globe darker. [#7726](https://github.com/CesiumGS/cesium/issues/7726)
  修复了多个地球材质导致地球变暗的问题。[#7726](https://github.com/CesiumGS/cesium/issues/7726)

## 1.60 - 2019-08-01

### Additions :tada:

- Reworked label rendering to use signed distance fields (SDF) for crisper text. [#7730](https://github.com/CesiumGS/cesium/pull/7730)
  重构了标签渲染，使用有向距离场（SDF）实现更清晰的文本显示。[#7730](https://github.com/CesiumGS/cesium/pull/7730)
- Added a [new Sandcastle example](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/?src=Labels%20SDF.html) to showcase the new SDF labels.
  新增了一个 [Sandcastle 示例](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/?src=Labels%20SDF.html) 来展示新的 SDF 标签。
- Added support for polygon holes to CZML. [#7991](https://github.com/CesiumGS/cesium/pull/7991)
  在 CZML 中增加了对多边形内孔（polygon holes）的支持。[#7991](https://github.com/CesiumGS/cesium/pull/7991)
- Added `totalScale` property to `Label` which is the total scale of the label taking into account the label's scale and the relative size of the desired font compared to the generated glyph size.
  在 `Label` 中新增了 `totalScale` 属性，该属性综合考虑了标签自身的缩放比例以及目标字体大小与生成字形大小的相对比例，表示标签的总缩放比例。

### Fixes :wrench:

- Fixed crash when using ArcGIS terrain with clipping planes. [#7998](https://github.com/CesiumGS/cesium/pull/7998)
  修复了带有裁剪平面时使用 ArcGIS 地形发生的崩溃。[#7998](https://github.com/CesiumGS/cesium/pull/7998)
- `PolygonGraphics.hierarchy` now converts constant array values to a `PolygonHierarchy` when set, so code that accesses the value of the property can rely on it always being a `PolygonHierarchy`.
  设置时，`PolygonGraphics.hierarchy` 现在会将常量数组值转换为 `PolygonHierarchy`，因此访问该属性值的代码可以放心地假定其始终为 `PolygonHierarchy`。
- Fixed a bug with lengthwise texture coordinates in the first segment of ground polylines, as observed in some WebGL implementations such as Chrome on Linux. [#8017](https://github.com/CesiumGS/cesium/issues/8017)
  修复了贴地折线第一段中沿长度方向纹理坐标的 Bug（在 Linux 上的 Chrome 等某些 WebGL 实现中观察到）。[#8017](https://github.com/CesiumGS/cesium/issues/8017)

## 1.59 - 2019-07-01

### Additions :tada:

- Adds `ArcGISTiledElevationTerrainProvider` to support LERC encoded terrain from ArcGIS ImageServer. [#7940](https://github.com/CesiumGS/cesium/pull/7940)
  新增了 `ArcGISTiledElevationTerrainProvider`，以支持来自 ArcGIS ImageServer 的 LERC 编码地形。[#7940](https://github.com/CesiumGS/cesium/pull/7940)
- Added CZML support for `heightReference` to `box`, `cylinder`, and `ellipsoid`, and added CZML support for `classificationType` to `corridor`, `ellipse`, `polygon`, `polyline`, and `rectangle`. [#7899](https://github.com/CesiumGS/cesium/pull/7899)
  在 CZML 中为 `box`、`cylinder` 和 `ellipsoid` 增加了对 `heightReference` 的支持，并为 `corridor`、`ellipse`、`polygon`、`polyline` 和 `rectangle` 增加了对 `classificationType` 的支持。[#7899](https://github.com/CesiumGS/cesium/pull/7899)
- Adds `exportKML` function to export `Entity` instances with Point, Billboard, Model, Label, Polyline and Polygon graphics. [#7921](https://github.com/CesiumGS/cesium/pull/7921)
  新增了 `exportKML` 函数，用于导出包含 Point、Billboard、Model、Label、Polyline 和 Polygon 图形的 `Entity` 实例。[#7921](https://github.com/CesiumGS/cesium/pull/7921)
- Added support for new Mapbox Style API. [#7698](https://github.com/CesiumGS/cesium/pull/7698)
  增加了对全新 Mapbox Style API 的支持。[#7698](https://github.com/CesiumGS/cesium/pull/7698)
- Added support for the [AGI_articulations](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/AGI_articulations) vendor extension of glTF 2.0 to the Entity API and CZML. [#7907](https://github.com/CesiumGS/cesium/pull/7907)
  在 Entity API 和 CZML 中增加了对 glTF 2.0 的 [AGI_articulations](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/AGI_articulations) 厂商扩展的支持。[#7907](https://github.com/CesiumGS/cesium/pull/7907)

### Fixes :wrench:

- Fixed a bug that caused missing segments for ground polylines with coplanar points over large distances and problems with polylines containing duplicate points. [#7885](https://github.com/CesiumGS/cesium//pull/7885)
  修复了跨越较大距离的共面点贴地折线缺失线段的 Bug，以及包含重复点的折线的问题。[#7885](https://github.com/CesiumGS/cesium//pull/7885)
- Fixed a bug where billboards were not pickable when zoomed out completely in 2D View. [#7908](https://github.com/CesiumGS/cesium/pull/7908)
  修复了在 2D 视图中完全缩小时广告牌无法拾取的 Bug。[#7908](https://github.com/CesiumGS/cesium/pull/7908)
- Fixed a bug where image requests that returned HTTP code 204 would prevent any future request from succeeding on browsers that supported ImageBitmap. [#7914](https://github.com/CesiumGS/cesium/pull/7914/)
  修复了返回 HTTP 204 代码的图像请求会阻止支持 ImageBitmap 的浏览器上任何后续请求成功的 Bug。[#7914](https://github.com/CesiumGS/cesium/pull/7914/)
- Fixed polyline colors when `scene.highDynamicRange` is enabled. [#7924](https://github.com/CesiumGS/cesium/pull/7924)
  修复了启用 `scene.highDynamicRange` 时的折线颜色问题。[#7924](https://github.com/CesiumGS/cesium/pull/7924)
- Fixed a bug in the inspector where the min/max height values of a picked tile were undefined. [#7904](https://github.com/CesiumGS/cesium/pull/7904)
  修复了检查器（inspector）中拾取瓦片的最大/最小高程值为 undefined 的 Bug。[#7904](https://github.com/CesiumGS/cesium/pull/7904)
- Fixed `Math.factorial` to return the correct values. (https://github.com/CesiumGS/cesium/pull/7969)
  修复了 `Math.factorial`，使其返回正确的值。(https://github.com/CesiumGS/cesium/pull/7969)
- Fixed a bug that caused 3D models to appear darker on Android devices. [#7944](https://github.com/CesiumGS/cesium/pull/7944)
  修复了导致 3D 模型在 Android 设备上显得更暗的 Bug。[#7944](https://github.com/CesiumGS/cesium/pull/7944)

## 1.58.1 - 2018-06-03

_This is an npm-only release to fix a publishing issue_.
_这是一个仅限 npm 的版本，用于修复发布问题。_

## 1.58 - 2019-06-03

### Additions :tada:

- Added support for new `BingMapsStyle` values `ROAD_ON_DEMAND` and `AERIAL_WITH_LABELS_ON_DEMAND`. The older versions of these, `ROAD` and `AERIAL_WITH_LABELS`, have been deprecated by Bing. [#7808](https://github.com/CesiumGS/cesium/pull/7808)
  增加了对新 `BingMapsStyle` 值 `ROAD_ON_DEMAND` 和 `AERIAL_WITH_LABELS_ON_DEMAND` 的支持。其旧版本 `ROAD` 和 `AERIAL_WITH_LABELS` 已被 Bing 弃用。[#7808](https://github.com/CesiumGS/cesium/pull/7808)
- Added syntax to delete data from existing properties via CZML. [#7818](https://github.com/CesiumGS/cesium/pull/7818)
  增加了通过 CZML 从现有属性中删除数据的语法。[#7818](https://github.com/CesiumGS/cesium/pull/7818)
- Added `checkerboard` material to CZML. [#7845](https://github.com/CesiumGS/cesium/pull/7845)
  在 CZML 中增加了棋盘格（`checkerboard`）材质。[#7845](https://github.com/CesiumGS/cesium/pull/7845)
- `BingMapsImageryProvider` now uses `DiscardEmptyTileImagePolicy` by default to detect missing tiles as zero-length responses instead of inspecting pixel values. [#7810](https://github.com/CesiumGS/cesium/pull/7810)
  `BingMapsImageryProvider` 现在默认使用 `DiscardEmptyTileImagePolicy`，将缺失瓦片检测为零长度响应，而不是检查像素值。[#7810](https://github.com/CesiumGS/cesium/pull/7810)
- Added support for the [AGI_articulations](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/AGI_articulations) vendor extension of glTF 2.0 to the Model primitive graphics API. [#7835](https://github.com/CesiumGS/cesium/pull/7835)
  在 Model 图元图形 API 中增加了对 glTF 2.0 的 [AGI_articulations](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/AGI_articulations) 厂商扩展的支持。[#7835](https://github.com/CesiumGS/cesium/pull/7835)
- Reduce the number of Bing transactions and ion Bing sessions used when destroying and recreating the same imagery layer to 1. [#7848](https://github.com/CesiumGS/cesium/pull/7848)
  销毁并重新创建相同的影像图层时，将使用的 Bing 事务和 ion Bing 会话数量减少为 1。[#7848](https://github.com/CesiumGS/cesium/pull/7848)

### Fixes :wrench:

- Fixed an edge case where Cesium would provide ion access token credentials to non-ion servers if the actual asset entrypoint was being hosted by ion. [#7839](https://github.com/CesiumGS/cesium/pull/7839)
  修复了一个极端边界情况：如果实际资产入口点由 ion 托管，Cesium 会向非 ion 服务器提供 ion 访问令牌（access token）凭据。[#7839](https://github.com/CesiumGS/cesium/pull/7839)
- Fixed a bug that caused Cesium to request non-existent tiles for terrain tilesets lacking tile availability, i.e. a `layer.json` file.
  修复了导致 Cesium 对缺少瓦片可用性（即缺少 `layer.json` 文件）的地形瓦片集请求不存在瓦片的 Bug。
- Fixed memory leak when removing entities that had a `HeightReference` of `CLAMP_TO_GROUND` or `RELATIVE_TO_GROUND`. This includes when removing a `DataSource`.
  修复了移除 `HeightReference` 为 `CLAMP_TO_GROUND` 或 `RELATIVE_TO_GROUND` 的实体时的内存泄漏问题。这也包括移除 `DataSource` 时的情况。
- Fixed 3D Tiles credits not being shown in the data attribution box. [#7877](https://github.com/CesiumGS/cesium/pull/7877)
  修复了 3D Tiles 鸣谢信息（credits）未在数据归属框中显示的 Bug。[#7877](https://github.com/CesiumGS/cesium/pull/7877)

## 1.57 - 2019-05-01

### Additions :tada:

- Improved 3D Tiles streaming performance, resulting in ~67% camera tour load time reduction, ~44% camera tour load count reduction. And for general camera movement, ~20% load time reduction with ~27% tile load count reduction. Tile load priority changed to focus on loading tiles in the center of the screen first. Added the following tileset optimizations, which unless stated otherwise are enabled by default. [#7774](https://github.com/CesiumGS/cesium/pull/7774)
  改进了 3D Tiles 流式传输性能，使相机导览加载时间缩短约 67%，相机导览加载数量减少约 44%。对于常规相机移动，加载时间缩短约 20%，瓦片加载数量减少约 27%。瓦片加载优先级调整为优先加载屏幕中心的瓦片。增加了以下瓦片集优化（除非另有说明，默认启用）。[#7774](https://github.com/CesiumGS/cesium/pull/7774)
  - Added `Cesium3DTileset.cullRequestsWhileMoving` option to ignore requests for tiles that will likely be out-of-view due to the camera's movement when they come back from the server.
    增加了 `Cesium3DTileset.cullRequestsWhileMoving` 选项，用于忽略因相机移动在从服务器返回时很可能已经处于视野外的瓦片请求。
  - Added `Cesium3DTileset.cullRequestsWhileMovingMultiplier` option to act as a multiplier when used in culling requests while moving. Larger is more aggressive culling, smaller less aggressive culling.
    增加了 `Cesium3DTileset.cullRequestsWhileMovingMultiplier` 选项，作为移动中剔除请求时的乘数。数值越大剔除越激进，越小剔除越保守。
  - Added `Cesium3DTileset.preloadFlightDestinations` option to preload tiles at the camera's flight destination while the camera is in flight.
    增加了 `Cesium3DTileset.preloadFlightDestinations` 选项，以便在相机飞行过程中预加载相机飞行目的地的瓦片。
  - Added `Cesium3DTileset.preferLeaves` option to prefer loading of leaves. Good for additive refinement point clouds. Set to `false` by default.
    增加了 `Cesium3DTileset.preferLeaves` 选项以优先加载叶子节点。适用于增量精化（additive refinement）的点云。默认设置为 `false`。
  - Added `Cesium3DTileset.progressiveResolutionHeightFraction` option to load tiles at a smaller resolution first. This can help get a quick layer of tiles down while full resolution tiles continue to load.
    增加了 `Cesium3DTileset.progressiveResolutionHeightFraction` 选项以首先以较低分辨率加载瓦片。这有助于在全分辨率瓦片继续加载的同时先快速呈现一层瓦片。
  - Added `Cesium3DTileset.foveatedScreenSpaceError` option to prioritize loading tiles in the center of the screen.
    增加了 `Cesium3DTileset.foveatedScreenSpaceError` 选项，以优先加载屏幕中心的瓦片。
  - Added `Cesium3DTileset.foveatedConeSize` option to control the cone size that determines which tiles are deferred for loading. Tiles outside the cone are potentially deferred.
    增加了 `Cesium3DTileset.foveatedConeSize` 选项，用于控制决定哪些瓦片推迟加载的圆锥体大小。圆锥体外部的瓦片可能会被推迟加载。
  - Added `Cesium3DTileset.foveatedMinimumScreenSpaceErrorRelaxation` option to control the starting screen space error relaxation for tiles outside the foveated cone.
    增加了 `Cesium3DTileset.foveatedMinimumScreenSpaceErrorRelaxation` 选项，用于控制中心凹锥体外部瓦片的起始屏幕空间误差放宽量。
  - Added `Cesium3DTileset.foveatedInterpolationCallback` option to control how screen space error threshold is interpolated for tiles outside the foveated cone.
    增加了 `Cesium3DTileset.foveatedInterpolationCallback` 选项，用于控制中心凹锥体外部瓦片的屏幕空间误差阈值如何插值。
  - Added `Cesium3DTileset.foveatedTimeDelay` option to control how long in seconds to wait after the camera stops moving before deferred tiles start loading in.
    增加了 `Cesium3DTileset.foveatedTimeDelay` 选项，用于控制在相机停止移动后等待多少秒才开始加载推迟的瓦片。
- Added new parameter to `PolylineGlowMaterial` called `taperPower`, that works similar to the existing `glowPower` parameter, to taper the back of the line away. [#7626](https://github.com/CesiumGS/cesium/pull/7626)
  在 `PolylineGlowMaterial` 中增加了名为 `taperPower` 的新参数，其作用类似于现有的 `glowPower` 参数，用于使线条末端逐渐变细。[#7626](https://github.com/CesiumGS/cesium/pull/7626)
- Added `Cesium3DTileset.preloadWhenHidden` tileset option to preload tiles when `tileset.show` is false. Loads tiles as if the tileset is visible but does not render them. [#7774](https://github.com/CesiumGS/cesium/pull/7774)
  增加了 `Cesium3DTileset.preloadWhenHidden` 瓦片集选项，用于在 `tileset.show` 为 false 时预加载瓦片。像瓦片集可见一样加载瓦片但不进行渲染。[#7774](https://github.com/CesiumGS/cesium/pull/7774)
- Added support for the `KHR_texture_transform` glTF extension. [#7549](https://github.com/CesiumGS/cesium/pull/7549)
  增加了对 `KHR_texture_transform` glTF 扩展的支持。[#7549](https://github.com/CesiumGS/cesium/pull/7549)
- Added functions to remove samples from `SampledProperty` and `SampledPositionProperty`. [#7723](https://github.com/CesiumGS/cesium/pull/7723)
  增加了从 `SampledProperty` 和 `SampledPositionProperty` 中移除样本的函数。[#7723](https://github.com/CesiumGS/cesium/pull/7723)
- Added support for color-to-alpha with a threshold on imagery layers. [#7727](https://github.com/CesiumGS/cesium/pull/7727)
  增加了在影像图层上使用阈值将指定颜色转换为 Alpha 透明度（color-to-alpha）的支持。[#7727](https://github.com/CesiumGS/cesium/pull/7727)
- Add CZML processing for `heightReference` and `extrudedHeightReference` for geometry types that support it.
  为支持的几何体类型增加了对 `heightReference` 和 `extrudedHeightReference` 的 CZML 处理。
- `CesiumMath.toSNorm` documentation changed to reflect the function's implementation. [#7774](https://github.com/CesiumGS/cesium/pull/7774)
  修改了 `CesiumMath.toSNorm` 文档以反映该函数的实际实现。[#7774](https://github.com/CesiumGS/cesium/pull/7774)
- Added `CesiumMath.normalize` to convert a scalar value in an arbitrary range to a scalar in the range `[0.0, 1.0]`. [#7774](https://github.com/CesiumGS/cesium/pull/7774)
  增加了 `CesiumMath.normalize`，用于将任意范围内的标量值转换为 `[0.0, 1.0]` 范围内的标量。[#7774](https://github.com/CesiumGS/cesium/pull/7774)

### Fixes :wrench:

- Fixed an error when loading the same glTF model in two separate viewers. [#7688](https://github.com/CesiumGS/cesium/issues/7688)
  修复了在两个独立的 viewer 中加载相同 glTF 模型时的错误。[#7688](https://github.com/CesiumGS/cesium/issues/7688)
- Fixed an error where `clampToHeightMostDetailed` or `sampleHeightMostDetailed` would crash if entities were created when the promise resolved. [#7690](https://github.com/CesiumGS/cesium/pull/7690)
  修复了当 promise 解析时如果创建了实体，`clampToHeightMostDetailed` 或 `sampleHeightMostDetailed` 会崩溃的错误。[#7690](https://github.com/CesiumGS/cesium/pull/7690)
- Fixed an issue with compositing merged entity availability. [#7717](https://github.com/CesiumGS/cesium/issues/7717)
  修复了合并实体可用性合成时的问题。[#7717](https://github.com/CesiumGS/cesium/issues/7717)
- Fixed an error where many imagery layers within a single tile would cause parts of the tile to render as black on some platforms. [#7649](https://github.com/CesiumGS/cesium/issues/7649)
  修复了单个瓦片内存在许多影像图层会导致某些平台上瓦片部分区域渲染为黑色的错误。[#7649](https://github.com/CesiumGS/cesium/issues/7649)
- Fixed a bug that could cause terrain with a single, global root tile (e.g. that uses `WebMercatorTilingScheme`) to be culled unexpectedly in some views. [#7702](https://github.com/CesiumGS/cesium/issues/7702)
  修复了可能导致具有单个全局根瓦片（例如使用 `WebMercatorTilingScheme`）的地形在某些视图中被意外剔除的 Bug。[#7702](https://github.com/CesiumGS/cesium/issues/7702)
- Fixed a problem where instanced 3D models were incorrectly lit when using physically based materials. [#7775](https://github.com/CesiumGS/cesium/issues/7775)
  修复了使用基于物理的材质时实例化 3D 模型光照不正确的 Bug。[#7775](https://github.com/CesiumGS/cesium/issues/7775)
- Fixed a bug where glTF models with certain blend modes were rendered incorrectly in browsers that support ImageBitmap. [#7795](https://github.com/CesiumGS/cesium/issues/7795)
  修复了在支持 ImageBitmap 的浏览器中，具有某些混合模式的 glTF 模型渲染不正确的 Bug。[#7795](https://github.com/CesiumGS/cesium/issues/7795)

## 1.56.1 - 2019-04-02

### Additions :tada:

- `Resource.fetchImage` now takes a `preferImageBitmap` option to use `createImageBitmap` when supported to move image decode off the main thread. This option defaults to `false`.
  `Resource.fetchImage` 现在接受 `preferImageBitmap` 选项，以在受支持时使用 `createImageBitmap` 将图像解码移至主线程之外。该选项默认为 `false`。

### Breaking Changes :mega:

- The following breaking changes are relative to 1.56. The `Resource.fetchImage` behavior is now identical to 1.55 and earlier.
  以下破坏性变更是相对于 1.56 而言的。`Resource.fetchImage` 的行为现在与 1.55 及更早版本完全一致。
  - Changed `Resource.fetchImage` back to return an `Image` by default, instead of an `ImageBitmap` when supported. Note that an `ImageBitmap` cannot be flipped during texture upload. Instead, set `flipY : true` during fetch to flip it.
    将 `Resource.fetchImage` 改回默认返回 `Image`，而不是在受支持时返回 `ImageBitmap`。请注意，`ImageBitmap` 在纹理上传期间无法翻转。相反，应在获取期间设置 `flipY : true` 来翻转它。
  - Changed the default `flipY` option in `Resource.fetchImage` to false. This only has an effect when ImageBitmap is used.
    将 `Resource.fetchImage` 中的默认 `flipY` 选项更改为 false。这仅在使用了 ImageBitmap 时生效。

## 1.56 - 2019-04-01

### Breaking Changes :mega:

- `Resource.fetchImage` now returns an `ImageBitmap` instead of `Image` when supported. This allows for decoding images while fetching using `createImageBitmap` to greatly speed up texture upload and decrease frame drops when loading models with large textures. [#7579](https://github.com/CesiumGS/cesium/pull/7579)
  `Resource.fetchImage` 现在在受支持时返回 `ImageBitmap` 而不是 `Image`。这允许在使用 `createImageBitmap` 获取图像的同时进行解码，从而大大加快纹理上传速度并减少加载带有大纹理的模型时的掉帧现象。[#7579](https://github.com/CesiumGS/cesium/pull/7579)
- `Cesium3DTileStyle.style` now has an empty `Object` as its default value, instead of `undefined`. [#7567](https://github.com/CesiumGS/cesium/issues/7567)
  `Cesium3DTileStyle.style` 现在使用空对象 `{}`（`Object`）作为其默认值，而不是 `undefined`。[#7567](https://github.com/CesiumGS/cesium/issues/7567)
- `Scene.clampToHeight` now takes an optional `width` argument before the `result` argument. [#7693](https://github.com/CesiumGS/cesium/pull/7693)
  `Scene.clampToHeight` 现在在 `result` 参数之前接受一个可选的 `width` 参数。[#7693](https://github.com/CesiumGS/cesium/pull/7693)
- In the `Resource` class, `addQueryParameters` and `addTemplateValues` have been removed. Please use `setQueryParameters` and `setTemplateValues` instead. [#7695](https://github.com/CesiumGS/cesium/issues/7695)
  在 `Resource` 类中，移除了 `addQueryParameters` 和 `addTemplateValues`。请改用 `setQueryParameters` 和 `setTemplateValues`。[#7695](https://github.com/CesiumGS/cesium/issues/7695)

### Deprecated :hourglass_flowing_sand:

- `Resource.fetchImage` now takes an options object. Use `resource.fetchImage({ preferBlob: true })` instead of `resource.fetchImage(true)`. The previous function definition will no longer work in 1.57. [#7579](https://github.com/CesiumGS/cesium/pull/7579)
  `Resource.fetchImage` 现在接受选项对象。使用 `resource.fetchImage({ preferBlob: true })` 代替 `resource.fetchImage(true)`。原先的函数定义在 1.57 中将不再可用。[#7579](https://github.com/CesiumGS/cesium/pull/7579)

### Additions :tada:

- Added support for touch and hold gesture. The touch and hold delay can be customized by updating `ScreenSpaceEventHandler.touchHoldDelayMilliseconds`. [#7286](https://github.com/CesiumGS/cesium/pull/7286)
  增加了对长按（touch and hold）手势的支持。可通过更新 `ScreenSpaceEventHandler.touchHoldDelayMilliseconds` 来定制长按延迟时间。[#7286](https://github.com/CesiumGS/cesium/pull/7286)
- `Resource.fetchImage` now has a `flipY` option to vertically flip an image during fetch & decode. It is only valid when `ImageBitmapOptions` is supported by the browser. [#7579](https://github.com/CesiumGS/cesium/pull/7579)
  `Resource.fetchImage` 现在具有 `flipY` 选项，可在获取与解码期间垂直翻转图像。该选项仅在浏览器支持 `ImageBitmapOptions` 时有效。[#7579](https://github.com/CesiumGS/cesium/pull/7579)
- Added `backFaceCulling` and `normalShading` options to `PointCloudShading`. Both options are only applicable for point clouds containing normals. [#7399](https://github.com/CesiumGS/cesium/pull/7399)
  在 `PointCloudShading` 中增加了 `backFaceCulling`（背面剔除）和 `normalShading`（法线着色）选项。这两个选项仅适用于包含法线的点云。[#7399](https://github.com/CesiumGS/cesium/pull/7399)
- `Cesium3DTileStyle.style` reacts to updates and represents the current state of the style. [#7567](https://github.com/CesiumGS/cesium/issues/7567)
  `Cesium3DTileStyle.style` 会对更新做出响应并表示样式的当前状态。[#7567](https://github.com/CesiumGS/cesium/issues/7567)

### Fixes :wrench:

- Fixed the value for `BlendFunction.ONE_MINUS_CONSTANT_COLOR`. [#7624](https://github.com/CesiumGS/cesium/pull/7624)
  修复了 `BlendFunction.ONE_MINUS_CONSTANT_COLOR` 的值。[#7624](https://github.com/CesiumGS/cesium/pull/7624)
- Fixed `HeadingPitchRoll.pitch` being `NaN` when using `.fromQuaternion` due to a rounding error for pitches close to +/- 90°. [#7654](https://github.com/CesiumGS/cesium/pull/7654)
  修复了在使用 `.fromQuaternion` 时，由于俯仰角接近 +/- 90° 时的舍入误差导致 `HeadingPitchRoll.pitch` 为 `NaN` 的 Bug。[#7654](https://github.com/CesiumGS/cesium/pull/7654)
- Fixed a type of crash caused by the camera being rotated through terrain. [#6783](https://github.com/CesiumGS/cesium/issues/6783)
  修复了一种由于相机穿透地形旋转而导致的崩溃问题。[#6783](https://github.com/CesiumGS/cesium/issues/6783)
- Fixed an error in `Resource` when used with template replacements using numeric keys. [#7668](https://github.com/CesiumGS/cesium/pull/7668)
  修复了在 `Resource` 中使用数字键进行模板替换时的错误。[#7668](https://github.com/CesiumGS/cesium/pull/7668)
- Fixed an error in `Cesium3DTilePointFeature` where `anchorLineColor` used the same color instance instead of cloning the color [#7686](https://github.com/CesiumGS/cesium/pull/7686)
  修复了 `Cesium3DTilePointFeature` 中 `anchorLineColor` 使用相同颜色实例而不是克隆颜色的错误。[#7686](https://github.com/CesiumGS/cesium/pull/7686)

## 1.55 - 2019-03-01

### Breaking Changes :mega:

- `czm_materialInput.slope` is now an angle in radians between 0 and pi/2 (flat to vertical), rather than a projected length 1 to 0 (flat to vertical).
  `czm_materialInput.slope` 现在是 0 到 pi/2 之间以弧度为单位的夹角（从水平到垂直），而不是 1 到 0 的投影长度（从水平到垂直）。

### Additions :tada:

- Updated terrain and imagery rendering, resulting in terrain/imagery loading ~33% faster and using ~33% less data [#7061](https://github.com/CesiumGS/cesium/pull/7061)
  更新了地形和影像渲染，使地形/影像加载速度提升约 33%，且数据使用量减少约 33%。[#7061](https://github.com/CesiumGS/cesium/pull/7061)
- `czm_materialInput.aspect` was added as an angle in radians between 0 and 2pi (east, north, west to south).
  新增了 `czm_materialInput.aspect`，表示 0 到 2pi 之间以弧度为单位的坡向角（东、北、西到南）。
- Added CZML `arcType` support for `polyline` and `polygon`, which supersedes `followSurface`. `followSurface` is still supported for compatibility with existing documents. [#7582](https://github.com/CesiumGS/cesium/pull/7582)
  为 `polyline` 和 `polygon` 增加了 CZML `arcType` 支持，取代了 `followSurface`。为了与现有文档兼容，仍然支持 `followSurface`。[#7582](https://github.com/CesiumGS/cesium/pull/7582)

### Fixes :wrench:

- Fixed an issue where models would cause a crash on load if some primitives were Draco encoded and others were not. [#7383](https://github.com/CesiumGS/cesium/issues/7383)
  修复了当某些图元使用 Draco 编码而其他图元未使用时，模型在加载时导致崩溃的问题。[#7383](https://github.com/CesiumGS/cesium/issues/7383)
- Fixed an issue where RTL labels not reversing correctly non alphabetic characters [#7501](https://github.com/CesiumGS/cesium/pull/7501)
  修复了 RTL（从右至左）文本标签未能正确翻转非字母字符的问题。[#7501](https://github.com/CesiumGS/cesium/pull/7501)
- Fixed Node.js support for the `Resource` class and any functionality using it internally.
  修复了 Node.js 对 `Resource` 类及其内部使用该类的任何功能的支持。
- Fixed an issue where some ground polygons crossing the Prime Meridian would have incorrect bounding rectangles. [#7533](https://github.com/CesiumGS/cesium/pull/7533)
  修复了跨越本初子午线的部分贴地多边形边界矩形不正确的问题。[#7533](https://github.com/CesiumGS/cesium/pull/7533)
- Fixed an issue where polygons on terrain using rhumb lines where being rendered incorrectly. [#7538](https://github.com/CesiumGS/cesium/pulls/7538)
  修复了地形上使用恒向线（rhumb lines）的多边形渲染不正确的问题。[#7538](https://github.com/CesiumGS/cesium/pulls/7538)
- Fixed an issue with `EllipsoidRhumbLines.findIntersectionWithLongitude` when longitude was IDL. [#7551](https://github.com/CesiumGS/cesium/issues/7551)
  修复了当经度为国际日期变更线（IDL）时 `EllipsoidRhumbLines.findIntersectionWithLongitude` 的问题。[#7551](https://github.com/CesiumGS/cesium/issues/7551)
- Fixed model silhouette colors when rendering with high dynamic range. [#7563](https://github.com/CesiumGS/cesium/pull/7563)
  修复了使用高动态范围渲染时的模型轮廓颜色问题。[#7563](https://github.com/CesiumGS/cesium/pull/7563)
- Fixed an issue with ground polylines on globes that use ellipsoids other than WGS84. [#7552](https://github.com/CesiumGS/cesium/issues/7552)
  修复了在使用非 WGS84 椭球体的地球上贴地折线的问题。[#7552](https://github.com/CesiumGS/cesium/issues/7552)
- Fixed an issue where Draco compressed models with RGB per-vertex color would not load in Cesium. [#7576](https://github.com/CesiumGS/cesium/issues/7576)
  修复了带有 RGB 逐顶点颜色的 Draco 压缩模型无法在 Cesium 中加载的问题。[#7576](https://github.com/CesiumGS/cesium/issues/7576)
- Fixed an issue where the outline geometry for extruded Polygons didn't calculate the correct indices. [#7599](https://github.com/CesiumGS/cesium/issues/7599)
  修复了拉伸多边形（extruded Polygons）的外轮廓几何体未能计算正确索引的问题。[#7599](https://github.com/CesiumGS/cesium/issues/7599)

## 1.54 - 2019-02-01

### Highlights :sparkler:

- Added support for polylines and textured entities on 3D Tiles. [#7437](https://github.com/CesiumGS/cesium/pull/7437) and [#7434](https://github.com/CesiumGS/cesium/pull/7434)
  增加了对 3D Tiles 上的折线和带纹理实体的支持。[#7437](https://github.com/CesiumGS/cesium/pull/7437) 与 [#7434](https://github.com/CesiumGS/cesium/pull/7434)
- Added support for loading models and 3D tilesets with WebP images using the [`EXT_texture_webp`](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Vendor/EXT_texture_webp/README.md) glTF extension. [#7486](https://github.com/CesiumGS/cesium/pull/7486)
  增加了使用 [`EXT_texture_webp`](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Vendor/EXT_texture_webp/README.md) glTF 扩展加载带有 WebP 图像的模型和 3D 瓦片集的支持。[#7486](https://github.com/CesiumGS/cesium/pull/7486)
- Added support for rhumb lines to polygon and polyline geometries. [#7492](https://github.com/CesiumGS/cesium/pull/7492)
  为多边形（polygon）和折线（polyline）几何体增加了对恒向线（rhumb lines）的支持。[#7492](https://github.com/CesiumGS/cesium/pull/7492)

### Breaking Changes :mega:

- Billboards with `HeightReference.CLAMP_TO_GROUND` are now clamped to both terrain and 3D Tiles. [#7434](https://github.com/CesiumGS/cesium/pull/7434)
  具有 `HeightReference.CLAMP_TO_GROUND` 的广告牌现在同时贴合地形和 3D Tiles。[#7434](https://github.com/CesiumGS/cesium/pull/7434)
- The default `classificationType` for `GroundPrimitive`, `CorridorGraphics`, `EllipseGraphics`, `PolygonGraphics` and `RectangleGraphics` is now `ClassificationType.BOTH`. [#7434](https://github.com/CesiumGS/cesium/pull/7434)
  `GroundPrimitive`、`CorridorGraphics`、`EllipseGraphics`、`PolygonGraphics` 和 `RectangleGraphics` 的默认 `classificationType` 现在为 `ClassificationType.BOTH`。[#7434](https://github.com/CesiumGS/cesium/pull/7434)
- The properties `ModelAnimation.speedup` and `ModelAnimationCollection.speedup` have been removed. Use `ModelAnimation.multiplier` and `ModelAnimationCollection.multiplier` respectively instead. [#7494](https://github.com/CesiumGS/cesium/issues/7394)
  移除了属性 `ModelAnimation.speedup` 和 `ModelAnimationCollection.speedup`。请分别改用 `ModelAnimation.multiplier` 和 `ModelAnimationCollection.multiplier`。[#7494](https://github.com/CesiumGS/cesium/issues/7394)

### Deprecated :hourglass_flowing_sand:

- `Scene.clampToHeight` now takes an optional `width` argument before the `result` argument. The previous function definition will no longer work in 1.56. [#7287](https://github.com/CesiumGS/cesium/pull/7287)
  `Scene.clampToHeight` 现在在 `result` 参数之前接受一个可选的 `width` 参数。旧的函数定义在 1.56 中将不再可用。[#7287](https://github.com/CesiumGS/cesium/pull/7287)
- `PolylineGeometry.followSurface` has been superceded by `PolylineGeometry.arcType`. The previous definition will no longer work in 1.57. Replace `followSurface: false` with `arcType: Cesium.ArcType.NONE` and `followSurface: true` with `arcType: Cesium.ArcType.GEODESIC`. [#7492](https://github.com/CesiumGS/cesium/pull/7492)
  `PolylineGeometry.followSurface` 已被 `PolylineGeometry.arcType` 取代。旧的定义在 1.57 中将不再可用。请将 `followSurface: false` 替换为 `arcType: Cesium.ArcType.NONE`，将 `followSurface: true` 替换为 `arcType: Cesium.ArcType.GEODESIC`。[#7492](https://github.com/CesiumGS/cesium/pull/7492)
- `SimplePolylineGeometry.followSurface` has been superceded by `SimplePolylineGeometry.arcType`. The previous definition will no longer work in 1.57. Replace `followSurface: false` with `arcType: Cesium.ArcType.NONE` and `followSurface: true` with `arcType: Cesium.ArcType.GEODESIC`. [#7492](https://github.com/CesiumGS/cesium/pull/7492)
  `SimplePolylineGeometry.followSurface` 已被 `SimplePolylineGeometry.arcType` 取代。旧的定义在 1.57 中将不再可用。请将 `followSurface: false` 替换为 `arcType: Cesium.ArcType.NONE`，将 `followSurface: true` 替换为 `arcType: Cesium.ArcType.GEODESIC`。[#7492](https://github.com/CesiumGS/cesium/pull/7492)

### Additions :tada:

- Added support for textured ground entities (entities with unspecified `height`) and `GroundPrimitives` on 3D Tiles. [#7434](https://github.com/CesiumGS/cesium/pull/7434)
  增加了对 3D Tiles 上的带纹理贴地实体（未指定 `height` 的实体）和 `GroundPrimitives` 的支持。[#7434](https://github.com/CesiumGS/cesium/pull/7434)
- Added support for polylines on 3D Tiles. [#7437](https://github.com/CesiumGS/cesium/pull/7437)
  增加了对 3D Tiles 上的折线的支持。[#7437](https://github.com/CesiumGS/cesium/pull/7437)
- Added `classificationType` property to `PolylineGraphics` and `GroundPolylinePrimitive` which specifies whether a polyline clamped to ground should be clamped to terrain, 3D Tiles, or both. [#7437](https://github.com/CesiumGS/cesium/pull/7437)
  向 `PolylineGraphics` 和 `GroundPolylinePrimitive` 添加了 `classificationType` 属性，用于指定贴地折线应贴合到地形、3D Tiles 还是两者兼有。[#7437](https://github.com/CesiumGS/cesium/pull/7437)
- Added the ability to specify the width of the intersection volume for `Scene.sampleHeight`, `Scene.clampToHeight`, `Scene.sampleHeightMostDetailed`, and `Scene.clampToHeightMostDetailed`. [#7287](https://github.com/CesiumGS/cesium/pull/7287)
  增加了为 `Scene.sampleHeight`、`Scene.clampToHeight`、`Scene.sampleHeightMostDetailed` 和 `Scene.clampToHeightMostDetailed` 指定相交体宽度的功能。[#7287](https://github.com/CesiumGS/cesium/pull/7287)
- Added a [new Sandcastle example](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/?src=Time%20Dynamic%20Wheels.html) on using `nodeTransformations` to rotate a model's wheels based on its velocity. [#7361](https://github.com/CesiumGS/cesium/pull/7361)
  新增了一个 [Sandcastle 示例](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/?src=Time%20Dynamic%20Wheels.html)，演示如何使用 `nodeTransformations` 根据速度旋转模型的车轮。[#7361](https://github.com/CesiumGS/cesium/pull/7361)
- Added a [new Sandcastle example](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/?src=Polylines%20on%203D%20Tiles.html) for drawing polylines on 3D Tiles [#7522](https://github.com/CesiumGS/cesium/pull/7522)
  新增了一个用于在 3D Tiles 上绘制折线的 [Sandcastle 示例](https://cesiumjs.org/Cesium/Build/Apps/Sandcastle/?src=Polylines%20on%203D%20Tiles.html)。[#7522](https://github.com/CesiumGS/cesium/pull/7522)
- Added `EllipsoidRhumbLine` class as a rhumb line counterpart to `EllipsoidGeodesic`. [#7484](https://github.com/CesiumGS/cesium/pull/7484)
  新增了 `EllipsoidRhumbLine` 类，作为与 `EllipsoidGeodesic` 对应的恒向线实现。[#7484](https://github.com/CesiumGS/cesium/pull/7484)
- Added rhumb line support to `PolygonGeometry`, `PolygonOutlineGeometry`, `PolylineGeometry`, `GroundPolylineGeometry`, and `SimplePolylineGeometry`. [#7492](https://github.com/CesiumGS/cesium/pull/7492)
  为 `PolygonGeometry`、`PolygonOutlineGeometry`、`PolylineGeometry`、`GroundPolylineGeometry` 和 `SimplePolylineGeometry` 增加了恒向线支持。[#7492](https://github.com/CesiumGS/cesium/pull/7492)
- When using Cesium in Node.js, we now use the combined and minified version for improved performance unless `NODE_ENV` is specifically set to `development`.
  在 Node.js 中使用 Cesium 时，除非明确将 `NODE_ENV` 设置为 `development`，否则现在使用合并和压缩版本以提高性能。
- Improved the performance of `QuantizedMeshTerrainData.interpolateHeight`. [#7508](https://github.com/CesiumGS/cesium/pull/7508)
  提高了 `QuantizedMeshTerrainData.interpolateHeight` 的性能。[#7508](https://github.com/CesiumGS/cesium/pull/7508)
- Added support for glTF models with WebP textures using the `EXT_texture_webp` extension. [#7486](https://github.com/CesiumGS/cesium/pull/7486)
  增加了使用 `EXT_texture_webp` 扩展对带有 WebP 纹理的 glTF 模型的支持。[#7486](https://github.com/CesiumGS/cesium/pull/7486)

### Fixes :wrench:

- Fixed 3D Tiles performance regression. [#7482](https://github.com/CesiumGS/cesium/pull/7482)
  修复了 3D Tiles 性能退化问题。[#7482](https://github.com/CesiumGS/cesium/pull/7482)
- Fixed an issue where classification primitives with the `CESIUM_3D_TILE` classification type would render on terrain. [#7422](https://github.com/CesiumGS/cesium/pull/7422)
  修复了分类类型为 `CESIUM_3D_TILE` 的分类图元会在地形上渲染的问题。[#7422](https://github.com/CesiumGS/cesium/pull/7422)
- Fixed an issue where 3D Tiles would show through the globe. [#7422](https://github.com/CesiumGS/cesium/pull/7422)
  修复了 3D Tiles 会穿透地球显示的问题。[#7422](https://github.com/CesiumGS/cesium/pull/7422)
- Fixed crash when entity geometry show value is an interval that only covered part of the entity availability range [#7458](https://github.com/CesiumGS/cesium/pull/7458)
  修复了当实体几何体 show 属性值是仅覆盖实体可用性范围一部分的时间区间时发生崩溃的问题。[#7458](https://github.com/CesiumGS/cesium/pull/7458)
- Fix rectangle positions at the north and south poles. [#7451](https://github.com/CesiumGS/cesium/pull/7451)
  修复了南北两极处的矩形位置问题。[#7451](https://github.com/CesiumGS/cesium/pull/7451)
- Fixed image size issue when using multiple particle systems. [#7412](https://github.com/CesiumGS/cesium/pull/7412)
  修复了使用多个粒子系统时的图像大小问题。[#7412](https://github.com/CesiumGS/cesium/pull/7412)
- Fixed Sandcastle's "Open in New Window" button not displaying imagery due to blob URI limitations. [#7250](https://github.com/CesiumGS/cesium/pull/7250)
  修复了由于 blob URI 限制导致 Sandcastle 的“Open in New Window”按钮不显示影像的问题。[#7250](https://github.com/CesiumGS/cesium/pull/7250)
- Fixed an issue where setting `scene.globe.cartographicLimitRectangle` to `undefined` would cause a crash. [#7477](https://github.com/CesiumGS/cesium/issues/7477)
  修复了将 `scene.globe.cartographicLimitRectangle` 设置为 `undefined` 会导致崩溃的问题。[#7477](https://github.com/CesiumGS/cesium/issues/7477)
- Fixed `PrimitiveCollection.removeAll` to no longer `contain` removed primitives. [#7491](https://github.com/CesiumGS/cesium/pull/7491)
  修复了 `PrimitiveCollection.removeAll`，使其不再 `contain`（包含）已移除的图元。[#7491](https://github.com/CesiumGS/cesium/pull/7491)
- Fixed `GeoJsonDataSource` to use polygons and polylines that use rhumb lines. [#7492](https://github.com/CesiumGS/cesium/pull/7492)
  修复了 `GeoJsonDataSource` 以使用基于恒向线的多边形和折线。[#7492](https://github.com/CesiumGS/cesium/pull/7492)
- Fixed an issue where some ground polygons would be cut off along circles of latitude. [#7507](https://github.com/CesiumGS/cesium/issues/7507)
  修复了某些贴地多边形沿纬线被截断的问题。[#7507](https://github.com/CesiumGS/cesium/issues/7507)
- Fixed an issue that would cause IE 11 to crash when enabling image-based lighting. [#7485](https://github.com/CesiumGS/cesium/issues/7485)
  修复了在启用基于图像的光照（IBL）时导致 IE 11 崩溃的问题。[#7485](https://github.com/CesiumGS/cesium/issues/7485)

## 1.53 - 2019-01-02

### Additions :tada:

- Added image-based lighting for PBR models and 3D Tiles. [#7172](https://github.com/CesiumGS/cesium/pull/7172)
  增加了针对 PBR 模型和 3D Tiles 的基于图像的光照（IBL）。[#7172](https://github.com/CesiumGS/cesium/pull/7172)
  - `Scene.specularEnvironmentMaps` is a url to a KTX file that contains the specular environment map and convoluted mipmaps for image-based lighting of all PBR models in the scene.
    `Scene.specularEnvironmentMaps` 是一个指向 KTX 文件的 URL，该文件包含镜面环境贴图和卷积 mipmap，用于场景中所有 PBR 模型的基于图像的光照。
  - `Scene.sphericalHarmonicCoefficients` is an array of 9 `Cartesian3` spherical harmonics coefficients for the diffuse irradiance of all PBR models in the scene.
    `Scene.sphericalHarmonicCoefficients` 是一个由 9 个 `Cartesian3` 球面调和系数组成的数组，用于场景中所有 PBR 模型的漫反射辐照度。
  - The `specularEnvironmentMaps` and `sphericalHarmonicCoefficients` properties of `Model` and `Cesium3DTileset` can be used to override the values from the scene for specific models and tilesets.
    `Model` 和 `Cesium3DTileset` 的 `specularEnvironmentMaps` 与 `sphericalHarmonicCoefficients` 属性可用于为特定模型和瓦片集覆盖场景中的值。
  - The `luminanceAtZenith` property of `Model` and `Cesium3DTileset` adjusts the luminance of the procedural image-based lighting.
    `Model` 和 `Cesium3DTileset` 的 `luminanceAtZenith` 属性用于调整程序化基于图像光照的天顶亮度。
- Double click away from an entity to un-track it [#7285](https://github.com/CesiumGS/cesium/pull/7285)
  在实体外部双击可取消对它的追踪。[#7285](https://github.com/CesiumGS/cesium/pull/7285)

### Fixes :wrench:

- Fixed 3D Tiles visibility checking when running multiple passes within the same frame. [#7289](https://github.com/CesiumGS/cesium/pull/7289)
  修复了在同一帧内运行多个通道（pass）时的 3D Tiles 可见性检查问题。[#7289](https://github.com/CesiumGS/cesium/pull/7289)
- Fixed contrast on imagery layers. [#7382](https://github.com/CesiumGS/cesium/issues/7382)
  修复了影像图层的对比度问题。[#7382](https://github.com/CesiumGS/cesium/issues/7382)
- Fixed rendering transparent background color when `highDynamicRange` is enabled. [#7427](https://github.com/CesiumGS/cesium/issues/7427)
  修复了启用 `highDynamicRange` 时透明背景色的渲染问题。[#7427](https://github.com/CesiumGS/cesium/issues/7427)
- Fixed translucent geometry when `highDynamicRange` is toggled. [#7451](https://github.com/CesiumGS/cesium/pull/7451)
  修复了切换 `highDynamicRange` 时半透明几何体的显示问题。[#7451](https://github.com/CesiumGS/cesium/pull/7451)

## 1.52 - 2018-12-03

### Breaking Changes :mega:

- `TerrainProviders` that implement `availability` must now also implement the `loadTileDataAvailability` method.
  实现 `availability` 的 `TerrainProviders` 现在还必须实现 `loadTileDataAvailability` 方法。

### Deprecated :hourglass_flowing_sand:

- The property `ModelAnimation.speedup` has been deprecated and renamed to `ModelAnimation.multiplier`. `speedup` will be removed in version 1.54. [#7393](https://github.com/CesiumGS/cesium/pull/7393)
  属性 `ModelAnimation.speedup` 已被弃用并重命名为 `ModelAnimation.multiplier`。`speedup` 将在 1.54 版本中移除。[#7393](https://github.com/CesiumGS/cesium/pull/7393)

### Additions :tada:

- Added functions to get the most detailed height of 3D Tiles on-screen or off-screen. [#7115](https://github.com/CesiumGS/cesium/pull/7115)
  增加了获取屏幕上或屏幕外 3D Tiles 最详细高程的函数。[#7115](https://github.com/CesiumGS/cesium/pull/7115)
  - Added `Scene.sampleHeightMostDetailed`, an asynchronous version of `Scene.sampleHeight` that uses the maximum level of detail for 3D Tiles.
    新增了 `Scene.sampleHeightMostDetailed`，它是 `Scene.sampleHeight` 的异步版本，对 3D Tiles 使用最高细节级别（LOD）。
  - Added `Scene.clampToHeightMostDetailed`, an asynchronous version of `Scene.clampToHeight` that uses the maximum level of detail for 3D Tiles.
    新增了 `Scene.clampToHeightMostDetailed`，它是 `Scene.clampToHeight` 的异步版本，对 3D Tiles 使用最高细节级别（LOD）。
- Added support for high dynamic range rendering. It is enabled by default when supported, but can be disabled with `Scene.highDynamicRange`. [#7017](https://github.com/CesiumGS/cesium/pull/7017)
  增加了对高动态范围（HDR）渲染的支持。在受支持时默认启用，但可以通过 `Scene.highDynamicRange` 禁用。[#7017](https://github.com/CesiumGS/cesium/pull/7017)
- Added `Scene.invertClassificationSupported` for checking if invert classification is supported.
  增加了 `Scene.invertClassificationSupported`，用于检查是否支持反向分类（invert classification）。
- Added `computeLineSegmentLineSegmentIntersection` to `Intersections2D`. [#7228](https://github.com/CesiumGS/Cesium/pull/7228)
  在 `Intersections2D` 中添加了 `computeLineSegmentLineSegmentIntersection`。[#7228](https://github.com/CesiumGS/Cesium/pull/7228)
- Added ability to load availability progressively from a quantized mesh extension instead of upfront. This will speed up load time and reduce memory usage. [#7196](https://github.com/CesiumGS/cesium/pull/7196)
  增加了从 quantized-mesh 扩展中渐进式加载可用性而非一次性全部加载的功能。这将加快加载时间并减少内存占用。[#7196](https://github.com/CesiumGS/cesium/pull/7196)
- Added the ability to apply styles to 3D Tilesets that don't contain features. [#7255](https://github.com/CesiumGS/Cesium/pull/7255)
  增加了将样式应用于不包含 feature 的 3D 瓦片集的功能。[#7255](https://github.com/CesiumGS/Cesium/pull/7255)

### Fixes :wrench:

- Fixed issue causing polyline to look wavy depending on the position of the camera [#7209](https://github.com/CesiumGS/cesium/pull/7209)
  修复了导致折线根据相机位置显得呈波浪状的问题。[#7209](https://github.com/CesiumGS/cesium/pull/7209)
- Fixed translucency issues for dynamic geometry entities. [#7364](https://github.com/CesiumGS/cesium/issues/7364)
  修复了动态几何体实体的半透明问题。[#7364](https://github.com/CesiumGS/cesium/issues/7364)

## 1.51 - 2018-11-01

### Additions :tada:

- Added WMS-T (time) support in WebMapServiceImageryProvider [#2581](https://github.com/CesiumGS/cesium/issues/2581)
  在 WebMapServiceImageryProvider 中增加了 WMS-T（时间）支持。[#2581](https://github.com/CesiumGS/cesium/issues/2581)
- Added `cutoutRectangle` to `ImageryLayer`, driving cutting out rectangular areas in imagery layers to reveal underlying imagery. [#7056](https://github.com/CesiumGS/cesium/pull/7056)
  在 `ImageryLayer` 中添加了 `cutoutRectangle`，允许在影像图层中镂空矩形区域以显示底层影像。[#7056](https://github.com/CesiumGS/cesium/pull/7056)
- Added `atmosphereHueShift`, `atmosphereSaturationShift`, and `atmosphereBrightnessShift` properties to `Globe` which shift the color of the ground atmosphere to match the hue, saturation, and brightness shifts of the sky atmosphere. [#4195](https://github.com/CesiumGS/cesium/issues/4195)
  为 `Globe` 添加了 `atmosphereHueShift`、`atmosphereSaturationShift` 和 `atmosphereBrightnessShift` 属性，用于调整地面大气颜色以匹配天空大气的色调、饱和度和亮度偏移。[#4195](https://github.com/CesiumGS/cesium/issues/4195)
- Shrink minified and gzipped Cesium.js by 27 KB (~3.7%) by delay loading seldom-used third-party dependencies. [#7140](https://github.com/CesiumGS/cesium/pull/7140)
  通过延迟加载很少使用的第三方依赖项，使压缩并 gzip 后的 Cesium.js 体积缩减了 27 KB（~3.7%）。[#7140](https://github.com/CesiumGS/cesium/pull/7140)
- Added `lightColor` property to `Cesium3DTileset`, `Model`, and `ModelGraphics` to change the intensity of the light used when shading model. [#7025](https://github.com/CesiumGS/cesium/pull/7025)
  为 `Cesium3DTileset`、`Model` 和 `ModelGraphics` 添加了 `lightColor` 属性，用于更改着色模型时光照的强度。[#7025](https://github.com/CesiumGS/cesium/pull/7025)
- Added `imageBasedLightingFactor` property to `Cesium3DTileset`, `Model`, and `ModelGraphics` to scale the diffuse and specular image-based lighting contributions to the final color. [#7025](https://github.com/CesiumGS/cesium/pull/7025)
  为 `Cesium3DTileset`、`Model` 和 `ModelGraphics` 添加了 `imageBasedLightingFactor` 属性，用于缩放漫反射和镜面基于图像光照对最终颜色的贡献比例。[#7025](https://github.com/CesiumGS/cesium/pull/7025)
- Added per-feature selection to the 3D Tiles BIM Sandcastle example. [#7181](https://github.com/CesiumGS/cesium/pull/7181)
  在 3D Tiles BIM Sandcastle 示例中增加了按 feature 选中的功能。[#7181](https://github.com/CesiumGS/cesium/pull/7181)
- Added `Transforms.fixedFrameToHeadingPitchRoll`, a helper function for extracting a `HeadingPitchRoll` from a fixed frame transform. [#7164](https://github.com/CesiumGS/cesium/pull/7164)
  添加了 `Transforms.fixedFrameToHeadingPitchRoll` 辅助函数，用于从固定帧变换中提取 `HeadingPitchRoll`。[#7164](https://github.com/CesiumGS/cesium/pull/7164)
- Added `Ray.clone`. [#7174](https://github.com/CesiumGS/cesium/pull/7174)
  添加了 `Ray.clone`。[#7174](https://github.com/CesiumGS/cesium/pull/7174)

### Fixes :wrench:

- Fixed issue removing geometry entities with different materials. [#7163](https://github.com/CesiumGS/cesium/pull/7163)
  修复了移除具有不同材质的几何体实体时的问题。[#7163](https://github.com/CesiumGS/cesium/pull/7163)
- Fixed texture coordinate calculation for polygon entities with `perPositionHeight`. [#7188](https://github.com/CesiumGS/cesium/pull/7188)
  修复了具有 `perPositionHeight` 的多边形实体的纹理坐标计算问题。[#7188](https://github.com/CesiumGS/cesium/pull/7188)
- Fixed crash when updating polyline attributes twice in one frame. [#7155](https://github.com/CesiumGS/cesium/pull/7155)
  修复了一帧内两次更新折线属性时发生的崩溃。[#7155](https://github.com/CesiumGS/cesium/pull/7155)
- Fixed entity visibility issue related to setting an entity show property and altering or adding entity geometry. [#7156](https://github.com/CesiumGS/cesium/pull/7156)
  修复了与设置实体 show 属性并修改或添加实体几何体相关的实体可见性问题。[#7156](https://github.com/CesiumGS/cesium/pull/7156)
- Fixed an issue where dynamic Entities on terrain would cause a crash in platforms that do not support depth textures such as Internet Explorer. [#7103](https://github.com/CesiumGS/cesium/issues/7103)
  修复了地形上的动态 Entity 在不支持深度纹理的平台（如 Internet Explorer）上会导致崩溃的问题。[#7103](https://github.com/CesiumGS/cesium/issues/7103)
- Fixed an issue that would cause a crash when removing a post process stage. [#7210](https://github.com/CesiumGS/cesium/issues/7210)
  修复了移除后处理阶段（post process stage）时会导致崩溃的问题。[#7210](https://github.com/CesiumGS/cesium/issues/7210)
- Fixed an issue where `pickPosition` would return incorrect results when called after `sampleHeight` or `clampToHeight`. [#7113](https://github.com/CesiumGS/cesium/pull/7113)
  修复了在调用 `sampleHeight` 或 `clampToHeight` 之后调用 `pickPosition` 会返回错误结果的问题。[#7113](https://github.com/CesiumGS/cesium/pull/7113)
- Fixed an issue where `sampleHeight` and `clampToHeight` would crash if picking a primitive that doesn't write depth. [#7120](https://github.com/CesiumGS/cesium/issues/7120)
  修复了如果拾取不写入深度的图元时，`sampleHeight` 和 `clampToHeight` 会崩溃的问题。[#7120](https://github.com/CesiumGS/cesium/issues/7120)
- Fixed a crash when using `BingMapsGeocoderService`. [#7143](https://github.com/CesiumGS/cesium/issues/7143)
  修复了使用 `BingMapsGeocoderService` 时的崩溃问题。[#7143](https://github.com/CesiumGS/cesium/issues/7143)
- Fixed accuracy of rotation matrix generated by `VelocityOrientationProperty`. [#6641](https://github.com/CesiumGS/cesium/pull/6641)
  修复了由 `VelocityOrientationProperty` 生成的旋转矩阵的精度。[#6641](https://github.com/CesiumGS/cesium/pull/6641)
- Fixed clipping plane crash when adding a plane to an empty collection. [#7168](https://github.com/CesiumGS/cesium/pull/7168)
  修复了向空集合添加裁剪平面时的崩溃问题。[#7168](https://github.com/CesiumGS/cesium/pull/7168)
- Fixed clipping planes on tilesets not taking into account the tileset model matrix. [#7182](https://github.com/CesiumGS/cesium/pull/7182)
  修复了瓦片集上的裁剪平面未考虑瓦片集模型矩阵的问题。[#7182](https://github.com/CesiumGS/cesium/pull/7182)
- Fixed incorrect rendering of models using the `KHR_materials_common` lights extension. [#7206](https://github.com/CesiumGS/cesium/pull/7206)
  修复了使用 `KHR_materials_common` 光照扩展的模型渲染不正确的问题。[#7206](https://github.com/CesiumGS/cesium/pull/7206)

## 1.50 - 2018-10-01

### Breaking Changes :mega:

- Clipping planes on tilesets now use the root tile's transform, or the root tile's bounding sphere if a transform is not defined. [#7034](https://github.com/CesiumGS/cesium/pull/7034)
  瓦片集上的裁剪平面现在使用根瓦片的变换；如果未定义变换，则使用根瓦片的包围球。[#7034](https://github.com/CesiumGS/cesium/pull/7034)
  - This is to make clipping planes' coordinates always relative to the object they're attached to. So if you were positioning the clipping planes as in the example below, this is no longer necessary:
    这是为了使裁剪平面的坐标始终相对于它们所附加的对象。因此，如果您像下面的示例那样定位裁剪平面，现在已不再需要：

  ```javascript
  clippingPlanes.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
    tileset.boundingSphere.center,
  );
  ```

  - This also fixes several issues with clipping planes not using the correct transform for tilesets with children.
    这还修复了具有子节点的瓦片集上裁剪平面未使用正确变换的若干问题。

### Additions :tada:

- Initial support for clamping to 3D Tiles. [#6934](https://github.com/CesiumGS/cesium/pull/6934)
  初步支持贴合至 3D Tiles。[#6934](https://github.com/CesiumGS/cesium/pull/6934)
  - Added `Scene.sampleHeight` to get the height of geometry in the scene. May be used to clamp objects to the globe, 3D Tiles, or primitives in the scene.
    新增了 `Scene.sampleHeight`，用于获取场景中几何体的高程。可用于将对象贴合到地球、3D Tiles 或场景中的图元。
  - Added `Scene.clampToHeight` to clamp a cartesian position to the scene geometry.
    新增了 `Scene.clampToHeight`，用于将笛卡尔空间位置贴合到场景几何体。
  - Requires depth texture support (`WEBGL_depth_texture` or `WEBKIT_WEBGL_depth_texture`). Added `Scene.sampleHeightSupported` and `Scene.clampToHeightSupported` functions for checking if height sampling is supported.
    需要深度纹理支持（`WEBGL_depth_texture` 或 `WEBKIT_WEBGL_depth_texture`）。添加了 `Scene.sampleHeightSupported` 和 `Scene.clampToHeightSupported` 函数以检查是否支持高程采样。
- Added `Cesium3DTileset.initialTilesLoaded` to indicate that all tiles in the initial view are loaded. [#6934](https://github.com/CesiumGS/cesium/pull/6934)
  添加了 `Cesium3DTileset.initialTilesLoaded`，用于指示初始视图中的所有瓦片是否已加载完毕。[#6934](https://github.com/CesiumGS/cesium/pull/6934)
- Added support for glTF extension [KHR_materials_pbrSpecularGlossiness](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_pbrSpecularGlossiness) [#7006](https://github.com/CesiumGS/cesium/pull/7006).
  增加了对 glTF 扩展 [KHR_materials_pbrSpecularGlossiness](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_pbrSpecularGlossiness) 的支持。[#7006](https://github.com/CesiumGS/cesium/pull/7006)。
- Added support for glTF extension [KHR_materials_unlit](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_unlit) [#6977](https://github.com/CesiumGS/cesium/pull/6977).
  增加了对 glTF 扩展 [KHR_materials_unlit](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_unlit) 的支持。[#6977](https://github.com/CesiumGS/cesium/pull/6977)。
- Added support for glTF extensions [KHR_techniques_webgl](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_techniques_webgl) and [KHR_blend](https://github.com/KhronosGroup/glTF/pull/1302). [#6805](https://github.com/CesiumGS/cesium/pull/6805)
  增加了对 glTF 扩展 [KHR_techniques_webgl](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_techniques_webgl) 和 [KHR_blend](https://github.com/KhronosGroup/glTF/pull/1302) 的支持。[#6805](https://github.com/CesiumGS/cesium/pull/6805)
- Update [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline/) to 2.0. [#6805](https://github.com/CesiumGS/cesium/pull/6805)
  将 [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline/) 更新至 2.0。[#6805](https://github.com/CesiumGS/cesium/pull/6805)
- Added `cartographicLimitRectangle` to `Globe`. Use this to limit terrain and imagery to a specific `Rectangle` area. [#6987](https://github.com/CesiumGS/cesium/pull/6987)
  为 `Globe` 添加了 `cartographicLimitRectangle`。可用于将地形和影像限制在特定的 `Rectangle` 区域内。[#6987](https://github.com/CesiumGS/cesium/pull/6987)
- Added `OpenCageGeocoderService`, which provides geocoding via [OpenCage](https://opencagedata.com/). [#7015](https://github.com/CesiumGS/cesium/pull/7015)
  新增了 `OpenCageGeocoderService`，通过 [OpenCage](https://opencagedata.com/) 提供地理编码服务。[#7015](https://github.com/CesiumGS/cesium/pull/7015)
- Added ground atmosphere lighting in 3D. This can be toggled with `Globe.showGroundAtmosphere`. [6877](https://github.com/CesiumGS/cesium/pull/6877)
  在 3D 中增加了地面大气光照效果。可通过 `Globe.showGroundAtmosphere` 进行切换。[6877](https://github.com/CesiumGS/cesium/pull/6877)
  - Added `Globe.nightFadeOutDistance` and `Globe.nightFadeInDistance` to configure when ground atmosphere night lighting fades in and out. [6877](https://github.com/CesiumGS/cesium/pull/6877)
    添加了 `Globe.nightFadeOutDistance` 和 `Globe.nightFadeInDistance`，用于配置地面大气夜间光照淡入和淡出的距离。[6877](https://github.com/CesiumGS/cesium/pull/6877)
- Added `onStop` event to `Clock` that fires each time stopTime is reached. [#7066](https://github.com/CesiumGS/cesium/pull/7066)
  在 `Clock` 中添加了 `onStop` 事件，每次到达 stopTime 时触发。[#7066](https://github.com/CesiumGS/cesium/pull/7066)

### Fixes :wrench:

- Fixed picking for overlapping translucent primitives. [#7039](https://github.com/CesiumGS/cesium/pull/7039)
  修复了重叠半透明图元的拾取问题。[#7039](https://github.com/CesiumGS/cesium/pull/7039)
- Fixed an issue in the 3D Tiles traversal where tilesets would render with mixed level of detail if an external tileset was visible but its root tile was not. [#7099](https://github.com/CesiumGS/cesium/pull/7099)
  修复了 3D Tiles 遍历中的一个问题：当外部瓦片集可见但其根瓦片不可见时，瓦片集会以混乱的细节层次进行渲染。[#7099](https://github.com/CesiumGS/cesium/pull/7099)
- Fixed an issue in the 3D Tiles traversal where external tilesets would not always traverse to their root tile. [#7035](https://github.com/CesiumGS/cesium/pull/7035)
  修复了 3D Tiles 遍历中外部瓦片集并不总是遍历到其根瓦片的问题。[#7035](https://github.com/CesiumGS/cesium/pull/7035)
- Fixed an issue in the 3D Tiles traversal where empty tiles would be selected instead of their nearest loaded ancestors. [#7011](https://github.com/CesiumGS/cesium/pull/7011)
  修复了 3D Tiles 遍历中会选择空瓦片而不是其最近已加载祖先瓦片的问题。[#7011](https://github.com/CesiumGS/cesium/pull/7011)
- Fixed an issue where scaling near zero with an model animation could cause rendering to stop. [#6954](https://github.com/CesiumGS/cesium/pull/6954)
  修复了模型动画中缩放接近零时可能导致渲染停止的问题。[#6954](https://github.com/CesiumGS/cesium/pull/6954)
- Fixed bug where credits weren't displaying correctly if more than one viewer was initialized [#6965](expect(https://github.com/CesiumGS/cesium/issues/6965)
  修复了初始化多个 viewer 时鸣谢信息显示不正确的 Bug。[#6965](expect(https://github.com/CesiumGS/cesium/issues/6965)
- Fixed entity show issues. [#7048](https://github.com/CesiumGS/cesium/issues/7048)
  修复了实体显隐（show）问题。[#7048](https://github.com/CesiumGS/cesium/issues/7048)
- Fixed a bug where polylines on terrain covering very large portions of the globe would cull incorrectly in 3d-only scenes. [#7043](https://github.com/CesiumGS/cesium/issues/7043)
  修复了覆盖地球超大区域的地形折线在仅 3D 场景中剔除不正确的 Bug。[#7043](https://github.com/CesiumGS/cesium/issues/7043)
- Fixed bug causing crash on entity geometry material change. [#7047](https://github.com/CesiumGS/cesium/pull/7047)
  修复了实体几何体材质变更时导致崩溃的 Bug。[#7047](https://github.com/CesiumGS/cesium/pull/7047)
- Fixed MIME type behavior for `Resource` requests in recent versions of Edge [#7085](https://github.com/CesiumGS/cesium/issues/7085).
  修复了较新版本 Edge 中 `Resource` 请求的 MIME 类型行为。[#7085](https://github.com/CesiumGS/cesium/issues/7085)。

## 1.49 - 2018-09-04

### Breaking Changes :mega:

- Removed `ClippingPlaneCollection.clone`. [#6872](https://github.com/CesiumGS/cesium/pull/6872)
  移除了 `ClippingPlaneCollection.clone`。[#6872](https://github.com/CesiumGS/cesium/pull/6872)
- Changed `Globe.pick` to return a position in ECEF coordinates regardless of the current scene mode. This will only effect you if you were working around a bug to make `Globe.pick` work in 2D and Columbus View. Use `Globe.pickWorldCoordinates` to get the position in world coordinates that correlate to the current scene mode. [#6859](https://github.com/CesiumGS/cesium/pull/6859)
  修改了 `Globe.pick`，使其无论当前场景模式如何均返回 ECEF 坐标下的位置。这仅在您之前为使 `Globe.pick` 在 2D 和哥伦布视图（Columbus View）中工作而采取了变通绕行方案时才会影响您。使用 `Globe.pickWorldCoordinates` 可获取与当前场景模式相对应的世界坐标位置。[#6859](https://github.com/CesiumGS/cesium/pull/6859)
- Removed the unused `frameState` parameter in `evaluate` and `evaluateColor` functions in `Expression`, `StyleExpression`, `ConditionsExpression` and all other places that call the functions. [#6890](https://github.com/CesiumGS/cesium/pull/6890)
  在 `Expression`、`StyleExpression`、`ConditionsExpression` 以及调用这些函数的所有其他地方中，移除了 `evaluate` 和 `evaluateColor` 函数中未使用的 `frameState` 参数。[#6890](https://github.com/CesiumGS/cesium/pull/6890)

<!-- cspell:ignore Flar -->

- Removed `PostProcessStageLibrary.createLensFlarStage`. Use `PostProcessStageLibrary.createLensFlareStage` instead. [#6972](https://github.com/CesiumGS/cesium/pull/6972)
  移除了 `PostProcessStageLibrary.createLensFlarStage`。请改用 `PostProcessStageLibrary.createLensFlareStage`。[#6972](https://github.com/CesiumGS/cesium/pull/6972)
- Removed `Scene.fxaa`. Use `Scene.postProcessStages.fxaa.enabled` instead. [#6980](https://github.com/CesiumGS/cesium/pull/6980)
  移除了 `Scene.fxaa`。请改用 `Scene.postProcessStages.fxaa.enabled`。[#6980](https://github.com/CesiumGS/cesium/pull/6980)

### Additions :tada:

- Added `heightReference` to `BoxGraphics`, `CylinderGraphics` and `EllipsoidGraphics`, which can be used to clamp these entity types to terrain. [#6932](https://github.com/CesiumGS/cesium/pull/6932)
  为 `BoxGraphics`、`CylinderGraphics` 和 `EllipsoidGraphics` 添加了 `heightReference`，可用于将这些实体类型贴合到地形上。[#6932](https://github.com/CesiumGS/cesium/pull/6932)
- Added `GeocoderViewModel.destinationFound` for specifying a function that is called upon a successful geocode. The default behavior is to fly to the destination found by the geocoder. [#6915](https://github.com/CesiumGS/cesium/pull/6915)
  添加了 `GeocoderViewModel.destinationFound`，用于指定地理编码成功时调用的函数。默认行为是飞行到地理编码器找到的目的地。[#6915](https://github.com/CesiumGS/cesium/pull/6915)
- Added `ClippingPlaneCollection.planeAdded` and `ClippingPlaneCollection.planeRemoved` events. `planeAdded` is raised when a new plane is added to the collection and `planeRemoved` is raised when a plane is removed. [#6875](https://github.com/CesiumGS/cesium/pull/6875)
  添加了 `ClippingPlaneCollection.planeAdded` 和 `ClippingPlaneCollection.planeRemoved` 事件。向集合中添加新平面时会引发 `planeAdded`，移除平面时会引发 `planeRemoved`。[#6875](https://github.com/CesiumGS/cesium/pull/6875)
- Added `Matrix4.setScale` for setting the scale on an affine transformation matrix [#6888](https://github.com/CesiumGS/cesium/pull/6888)
  添加了 `Matrix4.setScale`，用于设置仿射变换矩阵的缩放比例。[#6888](https://github.com/CesiumGS/cesium/pull/6888)
- Added optional `width` and `height` to `Scene.drillPick` for specifying a search area. [#6922](https://github.com/CesiumGS/cesium/pull/6922)
  为 `Scene.drillPick` 添加了可选的 `width` 和 `height`，用于指定搜索区域。[#6922](https://github.com/CesiumGS/cesium/pull/6922)
- Added `Cesium3DTileset.root` for getting the root tile of a tileset. [#6944](https://github.com/CesiumGS/cesium/pull/6944)
  添加了 `Cesium3DTileset.root`，用于获取瓦片集的根瓦片。[#6944](https://github.com/CesiumGS/cesium/pull/6944)
- Added `Cesium3DTileset.extras` and `Cesium3DTile.extras` for getting application specific metadata from 3D Tiles. [#6974](https://github.com/CesiumGS/cesium/pull/6974)
  添加了 `Cesium3DTileset.extras` 和 `Cesium3DTile.extras`，用于从 3D Tiles 中获取应用程序特定的元数据。[#6974](https://github.com/CesiumGS/cesium/pull/6974)

### Fixes :wrench:

- Several performance improvements and fixes to the 3D Tiles traversal code. [#6390](https://github.com/CesiumGS/cesium/pull/6390)
  对 3D Tiles 遍历代码进行了多项性能改进和修复。[#6390](https://github.com/CesiumGS/cesium/pull/6390)
  - Improved load performance when `skipLevelOfDetail` is false.
    改进了 `skipLevelOfDetail` 为 false 时的加载性能。
  - Fixed a bug that caused some skipped tiles to load when `skipLevelOfDetail` is true.
    修复了 `skipLevelOfDetail` 为 true 时导致某些跳过的瓦片仍被加载的 Bug。
  - Fixed pick statistics in the 3D Tiles Inspector.
    修复了 3D Tiles Inspector 中的拾取统计信息。
  - Fixed drawing of debug labels for external tilesets.
    修复了外部瓦片集的调试标签绘制问题。
  - Fixed drawing of debug outlines for empty tiles.
    修复了空瓦片的调试轮廓绘制问题。
- The Geocoder widget now takes terrain altitude into account when calculating its final destination. [#6876](https://github.com/CesiumGS/cesium/pull/6876)
  地理编码器部件在计算最终目的地时现在将地形高程考虑在内。[#6876](https://github.com/CesiumGS/cesium/pull/6876)
- The Viewer widget now takes terrain altitude into account when zooming or flying to imagery layers. [#6895](https://github.com/CesiumGS/cesium/pull/6895)
  Viewer 部件在缩放或飞行到影像图层时现在将地形高程考虑在内。[#6895](https://github.com/CesiumGS/cesium/pull/6895)
- Fixed Firefox camera control issues with mouse and touch events. [#6372](https://github.com/CesiumGS/cesium/issues/6372)
  修复了 Firefox 中鼠标和触摸事件的相机控制问题。[#6372](https://github.com/CesiumGS/cesium/issues/6372)
- Fixed `getPickRay` in 2D. [#2480](https://github.com/CesiumGS/cesium/issues/2480)
  修复了 2D 模式下的 `getPickRay` 问题。[#2480](https://github.com/CesiumGS/cesium/issues/2480)
- Fixed `Globe.pick` for 2D and Columbus View. [#6859](https://github.com/CesiumGS/cesium/pull/6859)
  修复了 2D 和哥伦布视图下的 `Globe.pick` 问题。[#6859](https://github.com/CesiumGS/cesium/pull/6859)
- Fixed imagery layer feature picking in 2D and Columbus view. [#6859](https://github.com/CesiumGS/cesium/pull/6859)
  修复了 2D 和哥伦布视图下的影像图层要素拾取问题。[#6859](https://github.com/CesiumGS/cesium/pull/6859)
- Fixed intermittent ground clamping issues for all entity types that use a height reference. [#6930](https://github.com/CesiumGS/cesium/pull/6930)
  修复了使用 height reference 的所有实体类型间歇性贴地异常的问题。[#6930](https://github.com/CesiumGS/cesium/pull/6930)
- Fixed bug that caused a new `ClippingPlaneCollection` to be created every frame when used with a model entity. [#6872](https://github.com/CesiumGS/cesium/pull/6872)
  修复了与模型实体一起使用时导致每帧都创建新的 `ClippingPlaneCollection` 的 Bug。[#6872](https://github.com/CesiumGS/cesium/pull/6872)
- Improved `Plane` entities so they are better aligned with the globe surface. [#6887](https://github.com/CesiumGS/cesium/pull/6887)
  改进了 `Plane` 实体，使它们更好地与地球表面对齐。[#6887](https://github.com/CesiumGS/cesium/pull/6887)
- Fixed crash when rendering translucent objects when all shadow maps in the scene set `fromLightSource` to false. [#6883](https://github.com/CesiumGS/cesium/pull/6883)
  修复了当场景中所有阴影贴图均将 `fromLightSource` 设置为 false 时渲染半透明对象发生的崩溃。[#6883](https://github.com/CesiumGS/cesium/pull/6883)
- Fixed night shading in 2D and Columbus view. [#4122](https://github.com/CesiumGS/cesium/issues/4122)
  修复了 2D 和哥伦布视图下的夜间着色问题。[#4122](https://github.com/CesiumGS/cesium/issues/4122)
- Fixed model loading failure when a glTF 2.0 primitive does not have a material. [6906](https://github.com/CesiumGS/cesium/pull/6906)
  修复了 glTF 2.0 图元没有材质时的模型加载失败问题。[6906](https://github.com/CesiumGS/cesium/pull/6906)
- Fixed a crash when setting show to `false` on a polyline clamped to the ground. [#6912](https://github.com/CesiumGS/cesium/issues/6912)
  修复了在贴地折线上将 show 设置为 `false` 时发生的崩溃。[#6912](https://github.com/CesiumGS/cesium/issues/6912)
- Fixed a bug where `Cesium3DTileset` wasn't using the correct `tilesetVersion`. [#6933](https://github.com/CesiumGS/cesium/pull/6933)
  修复了 `Cesium3DTileset` 未使用正确 `tilesetVersion` 的 Bug。[#6933](https://github.com/CesiumGS/cesium/pull/6933)
- Fixed crash that happened when calling `scene.pick` after setting a new terrain provider. [#6918](https://github.com/CesiumGS/cesium/pull/6918)
  修复了设置新地形提供器后调用 `scene.pick` 发生的崩溃。[#6918](https://github.com/CesiumGS/cesium/pull/6918)
- Fixed an issue that caused the browser to hang when using `drillPick` on a polyline clamped to the ground. [6907](https://github.com/CesiumGS/cesium/issues/6907)
  修复了在贴地折线上使用 `drillPick` 导致浏览器挂起的问题。[6907](https://github.com/CesiumGS/cesium/issues/6907)
- Fixed an issue where color wasn't updated properly for polylines clamped to ground. [#6927](https://github.com/CesiumGS/cesium/pull/6927)
  修复了贴地折线颜色未正确更新的问题。[#6927](https://github.com/CesiumGS/cesium/pull/6927)
- Fixed an excessive memory use bug that occurred when a data URI was used to specify a glTF model. [#6928](https://github.com/CesiumGS/cesium/issues/6928)
  修复了使用 data URI 指定 glTF 模型时发生的内存占用过大 Bug。[#6928](https://github.com/CesiumGS/cesium/issues/6928)
- Fixed an issue where switching from 2D to 3D could cause a crash. [#6929](https://github.com/CesiumGS/cesium/issues/6929)
  修复了从 2D 切换到 3D 可能导致崩溃的问题。[#6929](https://github.com/CesiumGS/cesium/issues/6929)
- Fixed an issue where point primitives behind the camera would appear in view. [#6904](https://github.com/CesiumGS/cesium/issues/6904)
  修复了相机后方的点图元会显示在视野中的问题。[#6904](https://github.com/CesiumGS/cesium/issues/6904)
- The `createGroundPolylineGeometry` web worker no longer depends on `GroundPolylinePrimitive`, making the worker smaller and potentially avoiding a hanging build in some webpack configurations. [#6946](https://github.com/CesiumGS/cesium/pull/6946)
  `createGroundPolylineGeometry` Web Worker 不再依赖 `GroundPolylinePrimitive`，使得该 worker 体积更小，并可能避免在某些 webpack 配置中构建挂起。[#6946](https://github.com/CesiumGS/cesium/pull/6946)
- Fixed an issue that cause terrain entities (entities with unspecified `height`) and `GroundPrimitives` to fail when crossing the international date line. [#6951](https://github.com/CesiumGS/cesium/issues/6951)
  修复了地形实体（未指定 `height` 的实体）和 `GroundPrimitives` 跨越国际日期变更线时失效的问题。[#6951](https://github.com/CesiumGS/cesium/issues/6951)
- Fixed normal calculation for `CylinderGeometry` when the top radius is not equal to the bottom radius [#6863](https://github.com/CesiumGS/cesium/pull/6863)
  修复了当顶部半径不等于底部半径时 `CylinderGeometry` 的法线计算问题。[#6863](https://github.com/CesiumGS/cesium/pull/6863)

## 1.48 - 2018-08-01

### Additions :tada:

- Added support for loading Draco compressed Point Cloud tiles for 2-3x better compression. [#6559](https://github.com/CesiumGS/cesium/pull/6559)
  增加了对加载 Draco 压缩的点云瓦片的支持，压缩率提升 2-3 倍。[#6559](https://github.com/CesiumGS/cesium/pull/6559)
- Added `TimeDynamicPointCloud` for playback of time-dynamic point cloud data, where each frame is a 3D Tiles Point Cloud tile. [#6721](https://github.com/CesiumGS/cesium/pull/6721)
  新增了 `TimeDynamicPointCloud`，用于回放时变点云数据，其中每一帧都是一个 3D Tiles 点云瓦片。[#6721](https://github.com/CesiumGS/cesium/pull/6721)
- Added `CoplanarPolygonGeometry` and `CoplanarPolygonGeometryOutline` for drawing polygons composed of coplanar positions that are not necessarily on the ellipsoid surface. [#6769](https://github.com/CesiumGS/cesium/pull/6769)
  新增了 `CoplanarPolygonGeometry` 和 `CoplanarPolygonGeometryOutline`，用于绘制由不一定在椭球体表面上的共面点组成的多边形。[#6769](https://github.com/CesiumGS/cesium/pull/6769)
- Improved support for polygon entities using `perPositionHeight`, including supporting vertical polygons. This also improves KML compatibility. [#6791](https://github.com/CesiumGS/cesium/pull/6791)
  改进了对使用 `perPositionHeight` 的多边形实体的支持，包括支持垂直多边形。这也提升了 KML 兼容性。[#6791](https://github.com/CesiumGS/cesium/pull/6791)
- Added `Cartesian3.midpoint` to compute the midpoint between two `Cartesian3` positions [#6836](https://github.com/CesiumGS/cesium/pull/6836)
  添加了 `Cartesian3.midpoint`，用于计算两个 `Cartesian3` 坐标之间的中点。[#6836](https://github.com/CesiumGS/cesium/pull/6836)
- Added `equalsEpsilon` methods to `OrthographicFrustum`, `PerspectiveFrustum`, `OrthographicOffCenterFrustum` and `PerspectiveOffCenterFrustum`.
  为 `OrthographicFrustum`、`PerspectiveFrustum`、`OrthographicOffCenterFrustum` 和 `PerspectiveOffCenterFrustum` 添加了 `equalsEpsilon` 方法。

### Deprecated :hourglass_flowing_sand:

- Support for 3D Tiles `content.url` is deprecated to reflect updates to the [3D Tiles spec](https://github.com/CesiumGS/3d-tiles/pull/301). Use `content.uri instead`. Support for `content.url` will remain for backwards compatibility. [#6744](https://github.com/CesiumGS/cesium/pull/6744)
  根据 [3D Tiles 规范](https://github.com/CesiumGS/3d-tiles/pull/301) 的更新，弃用对 3D Tiles `content.url` 的支持。请改用 `content.uri`。为了保持向后兼容性，仍将保留对 `content.url` 的支持。[#6744](https://github.com/CesiumGS/cesium/pull/6744)
- Support for the 3D Tiles pre-version 1.0 Batch Table Hierarchy is deprecated to reflect updates to the [3D Tiles spec](https://github.com/CesiumGS/3d-tiles/pull/301). Use the [`3DTILES_batch_table_hierarchy`](https://github.com/CesiumGS/3d-tiles/tree/main/extensions/3DTILES_batch_table_hierarchy) extension instead. Support for the deprecated batch table hierarchy will remain for backwards compatibility. [#6780](https://github.com/CesiumGS/cesium/pull/6780)
  根据 [3D Tiles 规范](https://github.com/CesiumGS/3d-tiles/pull/301) 的更新，弃用对 3D Tiles 1.0 预览版批处理表层次结构（Batch Table Hierarchy）的支持。请改用 [`3DTILES_batch_table_hierarchy`](https://github.com/CesiumGS/3d-tiles/tree/main/extensions/3DTILES_batch_table_hierarchy) 扩展。为了保持向后兼容性，仍将保留对已弃用批处理表层次结构的支持。[#6780](https://github.com/CesiumGS/cesium/pull/6780)
- `PostProcessStageLibrary.createLensFlarStage` is deprecated due to misspelling and will be removed in Cesium 1.49. Use `PostProcessStageLibrary.createLensFlareStage` instead.
  `PostProcessStageLibrary.createLensFlarStage` 因拼写错误而被弃用，并将在 Cesium 1.49 中移除。请改用 `PostProcessStageLibrary.createLensFlareStage`。

### Fixes :wrench:

- Fixed a bug where 3D Tilesets using the `region` bounding volume don't get transformed when the tileset's `modelMatrix` changes. [#6755](https://github.com/CesiumGS/cesium/pull/6755)
  修复了使用 `region` 包围盒的 3D 瓦片集在瓦片集的 `modelMatrix` 更改时未发生变换的 Bug。[#6755](https://github.com/CesiumGS/cesium/pull/6755)
- Fixed a bug that caused eye dome lighting for point clouds to fail in Safari on macOS and Edge on Windows by removing the dependency on floating point color textures. [#6792](https://github.com/CesiumGS/cesium/issues/6792)
  通过移除对浮点颜色纹理的依赖，修复了导致 macOS 上的 Safari 和 Windows 上的 Edge 中点云眼穹顶照明（eye dome lighting）失效的 Bug。[#6792](https://github.com/CesiumGS/cesium/issues/6792)
- Fixed a bug that caused polylines on terrain to render incorrectly in 2D and Columbus View with a `WebMercatorProjection`. [#6809](https://github.com/CesiumGS/cesium/issues/6809)
  修复了在带有 `WebMercatorProjection` 的 2D 和哥伦布视图中，地形折线渲染不正确的 Bug。[#6809](https://github.com/CesiumGS/cesium/issues/6809)
- Fixed bug causing billboards and labels to appear the wrong size when switching scene modes [#6745](https://github.com/CesiumGS/cesium/issues/6745)
  修复了切换场景模式时导致广告牌和标签显示尺寸错误的 Bug。[#6745](https://github.com/CesiumGS/cesium/issues/6745)
- Fixed `PolygonGeometry` when using `VertexFormat.POSITION_ONLY`, `perPositionHeight` and `extrudedHeight` [#6790](expect(https://github.com/CesiumGS/cesium/pull/6790)
  修复了同时使用 `VertexFormat.POSITION_ONLY`、`perPositionHeight` 和 `extrudedHeight` 时的 `PolygonGeometry` 问题。[#6790](expect(https://github.com/CesiumGS/cesium/pull/6790)
- Fixed an issue where tiles were missing in VR mode. [#6612](https://github.com/CesiumGS/cesium/issues/6612)
  修复了 VR 模式下瓦片缺失的问题。[#6612](https://github.com/CesiumGS/cesium/issues/6612)
- Fixed issues related to updating entity show and geometry color [#6835](https://github.com/CesiumGS/cesium/pull/6835)
  修复了与更新实体 show 属性和几何体颜色相关的问题。[#6835](https://github.com/CesiumGS/cesium/pull/6835)
- Fixed `PolygonGeometry` and `EllipseGeometry` tangent and bitangent attributes when a texture rotation is used [#6788](https://github.com/CesiumGS/cesium/pull/6788)
  修复了使用纹理旋转时 `PolygonGeometry` 和 `EllipseGeometry` 的切线与副切线属性问题。[#6788](https://github.com/CesiumGS/cesium/pull/6788)
- Fixed bug where entities with a height reference weren't being updated correctly when the terrain provider was changed. [#6820](https://github.com/CesiumGS/cesium/pull/6820)
  修复了更换地形提供器时具有 height reference 的实体未能正确更新的 Bug。[#6820](https://github.com/CesiumGS/cesium/pull/6820)
- Fixed an issue where glTF 2.0 models sometimes wouldn't be centered in the view after putting the camera on them. [#6784](https://github.com/CesiumGS/cesium/issues/6784)
  修复了将相机对准 glTF 2.0 模型后，模型有时在视图中不居中的问题。[#6784](https://github.com/CesiumGS/cesium/issues/6784)
- Fixed the geocoder when `Viewer` is passed the option `geocoder: true` [#6833](https://github.com/CesiumGS/cesium/pull/6833)
  修复了为 `Viewer` 传递选项 `geocoder: true` 时的地理编码器问题。[#6833](https://github.com/CesiumGS/cesium/pull/6833)
- Improved performance for billboards and labels clamped to terrain [#6781](https://github.com/CesiumGS/cesium/pull/6781) [#6844](https://github.com/CesiumGS/cesium/pull/6844)
  提升了贴合到地形上的广告牌和标签的性能。[#6781](https://github.com/CesiumGS/cesium/pull/6781) [#6844](https://github.com/CesiumGS/cesium/pull/6844)
- Fixed a bug that caused billboard positions to be set incorrectly when using a `CallbackProperty`. [#6815](https://github.com/CesiumGS/cesium/pull/6815)
  修复了使用 `CallbackProperty` 时导致广告牌位置设置不正确的 Bug。[#6815](https://github.com/CesiumGS/cesium/pull/6815)
- Improved support for generating a TypeScript typings file using `tsd-jsdoc` [#6767](https://github.com/CesiumGS/cesium/pull/6767)
  改进了对使用 `tsd-jsdoc` 生成 TypeScript 类型定义文件的支持。[#6767](https://github.com/CesiumGS/cesium/pull/6767)
- Updated viewBoundingSphere to use correct zoomOptions [#6848](https://github.com/CesiumGS/cesium/issues/6848)
  更新了 `viewBoundingSphere` 以使用正确的 zoomOptions。[#6848](https://github.com/CesiumGS/cesium/issues/6848)
- Fixed a bug that caused the scene to continuously render after resizing the viewer when `requestRenderMode` was enabled. [#6812](https://github.com/CesiumGS/cesium/issues/6812)
  修复了在启用 `requestRenderMode` 时，调整 viewer 大小后导致场景持续渲染的 Bug。[#6812](https://github.com/CesiumGS/cesium/issues/6812)

## 1.47 - 2018-07-02

### Highlights :sparkler:

- Added support for polylines on terrain [#6689](https://github.com/CesiumGS/cesium/pull/6689) [#6615](https://github.com/CesiumGS/cesium/pull/6615)
  增加了对地形折线的支持。[#6689](https://github.com/CesiumGS/cesium/pull/6689) [#6615](https://github.com/CesiumGS/cesium/pull/6615)
- Added `heightReference` and `extrudedHeightReference` properties to `CorridorGraphics`, `EllipseGraphics`, `PolygonGraphics` and `RectangleGraphics`. [#6717](https://github.com/CesiumGS/cesium/pull/6717)
  为 `CorridorGraphics`、`EllipseGraphics`、`PolygonGraphics` 和 `RectangleGraphics` 添加了 `heightReference` 和 `extrudedHeightReference` 属性。[#6717](https://github.com/CesiumGS/cesium/pull/6717)
- `PostProcessStage` has a `selected` property which is an array of primitives used for selectively applying a post-process stage. [#6476](https://github.com/CesiumGS/cesium/pull/6476)
  `PostProcessStage` 拥有 `selected` 属性，它是一个图元数组，用于选择性地应用后处理阶段。[#6476](https://github.com/CesiumGS/cesium/pull/6476)

### Breaking Changes :mega:

- glTF 2.0 models corrected to face +Z forwards per specification. Internally Cesium uses +X as forward, so a new +Z to +X rotation was added for 2.0 models only. To fix models that are oriented incorrectly after this change:
  根据规范将 glTF 2.0 模型修正为以 +Z 为朝前方向。在 Cesium 内部使用 +X 作为朝前方向，因此仅针对 2.0 模型添加了新的 +Z 到 +X 旋转。若要修复此更改后朝向不正确的模型：
  - If the model faces +X forwards update the glTF to face +Z forwards. This can be done by loading the glTF in a model editor and applying a 90 degree clockwise rotation about the up-axis. Alternatively, add a new root node to the glTF node hierarchy whose `matrix` is `[0,0,1,0,0,1,0,0,-1,0,0,0,0,0,0,1]`.
    如果模型以 +X 为朝前方向，请更新 glTF 使其以 +Z 为朝前方向。这可以通过在模型编辑器中加载 glTF 并绕向上轴顺时针旋转 90 度来完成。或者，在 glTF 节点层次结构中添加一个 `matrix` 为 `[0,0,1,0,0,1,0,0,-1,0,0,0,0,0,0,1]` 的新根节点。
  - Apply a -90 degree rotation to the model's heading. This can be done by setting the model's `orientation` using the Entity API or from within CZML. See [#6738](https://github.com/CesiumGS/cesium/pull/6738) for more details.
    对模型的航向角（heading）应用 -90 度旋转。这可以通过使用 Entity API 或在 CZML 中设置模型的 `orientation` 来完成。有关更多详细信息，请参阅 [#6738](https://github.com/CesiumGS/cesium/pull/6738)。
- Dropped support for directory URLs when loading tilesets to match the updated [3D Tiles spec](https://github.com/CesiumGS/3d-tiles/issues/272). [#6502](https://github.com/CesiumGS/cesium/issues/6502)
  为了匹配更新后的 [3D Tiles 规范](https://github.com/CesiumGS/3d-tiles/issues/272)，停止支持在加载瓦片集时使用目录 URL。[#6502](https://github.com/CesiumGS/cesium/issues/6502)
- KML and GeoJSON now use `PolylineGraphics` instead of `CorridorGraphics` for polylines on terrain. [#6706](https://github.com/CesiumGS/cesium/pull/6706)
  KML 和 GeoJSON 现在对地形折线使用 `PolylineGraphics` 而非 `CorridorGraphics`。[#6706](https://github.com/CesiumGS/cesium/pull/6706)

### Additions :tada:

- Added support for polylines on terrain [#6689](https://github.com/CesiumGS/cesium/pull/6689) [#6615](https://github.com/CesiumGS/cesium/pull/6615)
  增加了对地形折线的支持。[#6689](https://github.com/CesiumGS/cesium/pull/6689) [#6615](https://github.com/CesiumGS/cesium/pull/6615)
  - Use the `clampToGround` option for `PolylineGraphics` (polyline entities).
    对 `PolylineGraphics`（折线实体）使用 `clampToGround` 选项。
  - Requires depth texture support (`WEBGL_depth_texture` or `WEBKIT_WEBGL_depth_texture`), otherwise `clampToGround` will be ignored. Use `Entity.supportsPolylinesOnTerrain` to check for support.
    需要深度纹理支持（`WEBGL_depth_texture` 或 `WEBKIT_WEBGL_depth_texture`），否则 `clampToGround` 将被忽略。使用 `Entity.supportsPolylinesOnTerrain` 检查是否受支持。
  - Added `GroundPolylinePrimitive` and `GroundPolylineGeometry`.
    添加了 `GroundPolylinePrimitive` 和 `GroundPolylineGeometry`。
- `PostProcessStage` has a `selected` property which is an array of primitives used for selectively applying a post-process stage. [#6476](https://github.com/CesiumGS/cesium/pull/6476)
  `PostProcessStage` 拥有 `selected` 属性，它是一个图元数组，用于选择性地应用后处理阶段。[#6476](https://github.com/CesiumGS/cesium/pull/6476)
  - The `PostProcessStageLibrary.createBlackAndWhiteStage` and `PostProcessStageLibrary.createSilhouetteStage` have per-feature support.
    `PostProcessStageLibrary.createBlackAndWhiteStage` 和 `PostProcessStageLibrary.createSilhouetteStage` 支持按 feature 应用。
- Added CZML support for `zIndex` with `corridor`, `ellipse`, `polygon`, `polyline` and `rectangle`. [#6708](https://github.com/CesiumGS/cesium/pull/6708)
  为 `corridor`、`ellipse`、`polygon`、`polyline` 和 `rectangle` 增加了对 `zIndex` 的 CZML 支持。[#6708](https://github.com/CesiumGS/cesium/pull/6708)
- Added CZML `clampToGround` option for `polyline`. [#6706](https://github.com/CesiumGS/cesium/pull/6706)
  为 `polyline` 增加了 CZML `clampToGround` 选项。[#6706](https://github.com/CesiumGS/cesium/pull/6706)
- Added support for `RTC_CENTER` property in batched 3D model tilesets to conform to the updated [3D Tiles spec](https://github.com/CesiumGS/3d-tiles/issues/263). [#6488](https://github.com/CesiumGS/cesium/issues/6488)
  在批量 3D 模型（b3dm）瓦片集中增加了对 `RTC_CENTER` 属性的支持，以符合更新后的 [3D Tiles 规范](https://github.com/CesiumGS/3d-tiles/issues/263)。[#6488](https://github.com/CesiumGS/cesium/issues/6488)
- Added `heightReference` and `extrudedHeightReference` properties to `CorridorGraphics`, `EllipseGraphics`, `PolygonGraphics` and `RectangleGraphics`. [#6717](https://github.com/CesiumGS/cesium/pull/6717)
  为 `CorridorGraphics`、`EllipseGraphics`、`PolygonGraphics` 和 `RectangleGraphics` 添加了 `heightReference` 和 `extrudedHeightReference` 属性。[#6717](https://github.com/CesiumGS/cesium/pull/6717)
  - This can be used in conjunction with the `height` and/or `extrudedHeight` properties to clamp the geometry to terrain or set the height relative to terrain.
    可与 `height` 和/或 `extrudedHeight` 属性结合使用，以将几何体贴合到地形或设置相对于地形的高程。
  - Note, this will not make the geometry conform to terrain. Extruded geometry that is clamped to the ground will have a flat top will sinks into the terrain at the base.
    请注意，这不会使几何体随地形起伏而贴合。贴地的拉伸几何体将具有平坦的顶部，其底部会下沉嵌入地形中。

### Fixes :wrench:

- Fixed a bug that caused Cesium to be unable to load local resources in Electron. [#6726](https://github.com/CesiumGS/cesium/pull/6726)
  修复了导致 Cesium 无法在 Electron 中加载本地资源的 Bug。[#6726](https://github.com/CesiumGS/cesium/pull/6726)
- Fixed a bug causing crashes with custom vertex attributes on `Geometry` crossing the IDL. Attributes will be barycentrically interpolated. [#6644](https://github.com/CesiumGS/cesium/pull/6644)
  修复了跨越国际日期变更线（IDL）的 `Geometry` 上自定义顶点属性导致的崩溃 Bug。属性将采用重心坐标插值。[#6644](https://github.com/CesiumGS/cesium/pull/6644)
- Fixed a bug causing Point Cloud tiles with unsigned int batch-ids to not load. [#6666](https://github.com/CesiumGS/cesium/pull/6666)
  修复了带有无符号整型 batch-id 的点云瓦片无法加载的 Bug。[#6666](https://github.com/CesiumGS/cesium/pull/6666)
- Fixed a bug with Draco encoded i3dm tiles, and loading two Draco models with the same url. [#6668](https://github.com/CesiumGS/cesium/issues/6668)
  修复了 Draco 编码的 i3dm 瓦片以及使用相同 URL 加载两个 Draco 模型时的 Bug。[#6668](https://github.com/CesiumGS/cesium/issues/6668)
- Fixed a bug caused by creating a polygon with positions at the same longitude/latitude position but different heights [#6731](https://github.com/CesiumGS/cesium/pull/6731)
  修复了创建具有相同经纬度位置但不同高程的点组成的多边形时引发的 Bug。[#6731](https://github.com/CesiumGS/cesium/pull/6731)
- Fixed terrain clipping when the camera was close to flat terrain and was using logarithmic depth. [#6701](https://github.com/CesiumGS/cesium/pull/6701)
  修复了当相机靠近平坦地形且使用对数深度时的地形裁剪问题。[#6701](https://github.com/CesiumGS/cesium/pull/6701)
- Fixed KML bug that constantly requested the same image if it failed to load. [#6710](https://github.com/CesiumGS/cesium/pull/6710)
  修复了图像加载失败时 KML 不断请求相同图像的 Bug。[#6710](https://github.com/CesiumGS/cesium/pull/6710)
- Improved billboard and label rendering so they no longer sink into terrain when clamped to ground. [#6621](https://github.com/CesiumGS/cesium/pull/6621)
  改进了广告牌和标签的渲染，使其在贴地时不再下沉陷入地形中。[#6621](https://github.com/CesiumGS/cesium/pull/6621)
- Fixed an issue where KMLs containing a `colorMode` of `random` could return the exact same color on successive calls to `Color.fromRandom()`.
  修复了包含 `random` 的 `colorMode` 的 KML 在连续调用 `Color.fromRandom()` 时可能返回完全相同颜色的问题。
- `Iso8601.MAXIMUM_VALUE` now formats to a string which can be parsed by `fromIso8601`.
  `Iso8601.MAXIMUM_VALUE` 现在格式化为可被 `fromIso8601` 解析的字符串。
- Fixed material support when using an image that is already loaded [#6729](https://github.com/CesiumGS/cesium/pull/6729)
  修复了使用已加载图像时的材质支持问题。[#6729](https://github.com/CesiumGS/cesium/pull/6729)

## 1.46.1 - 2018-06-01

- This is an npm only release to fix the improperly published 1.46.0. There were no code changes.
  这是一个仅限 npm 的版本，用于修复错误发布的 1.46.0。没有代码更改。

## 1.46 - 2018-06-01

### Highlights :sparkler:

- Added support for materials on terrain entities (entities with unspecified `height`) and `GroundPrimitives`. [#6393](https://github.com/CesiumGS/cesium/pull/6393)
  增加了对地形实体（未指定 `height` 的实体）和 `GroundPrimitives` 材质的支持。[#6393](https://github.com/CesiumGS/cesium/pull/6393)
- Added a post-processing framework. [#5615](https://github.com/CesiumGS/cesium/pull/5615)
  新增了后处理框架。[#5615](https://github.com/CesiumGS/cesium/pull/5615)
- Added `zIndex` for ground geometry, including corridor, ellipse, polygon and rectangle entities. [#6362](https://github.com/CesiumGS/cesium/pull/6362)
  为贴地几何体添加了 `zIndex`，包括走廊（corridor）、椭圆（ellipse）、多边形（polygon）和矩形（rectangle）实体。[#6362](https://github.com/CesiumGS/cesium/pull/6362)

### Breaking Changes :mega:

- `ParticleSystem` no longer uses `forces`. [#6510](https://github.com/CesiumGS/cesium/pull/6510)
  `ParticleSystem` 不再使用 `forces`。[#6510](https://github.com/CesiumGS/cesium/pull/6510)
- `Particle` no longer uses `size`, `rate`, `lifeTime`, `life`, `minimumLife`, `maximumLife`, `minimumWidth`, `minimumHeight`, `maximumWidth`, and `maximumHeight`. [#6510](https://github.com/CesiumGS/cesium/pull/6510)
  `Particle` 不再使用 `size`、`rate`、`lifeTime`、`life`、`minimumLife`、`maximumLife`、`minimumWidth`、`minimumHeight`、`maximumWidth` 和 `maximumHeight`。[#6510](https://github.com/CesiumGS/cesium/pull/6510)
- Removed `Scene.copyGlobeDepth`. Globe depth will now be copied by default when supported. [#6393](https://github.com/CesiumGS/cesium/pull/6393)
  移除了 `Scene.copyGlobeDepth`。在受支持时，现在默认会复制地球深度。[#6393](https://github.com/CesiumGS/cesium/pull/6393)
- The default `classificationType` for `GroundPrimitive`, `CorridorGraphics`, `EllipseGraphics`, `PolygonGraphics` and `RectangleGraphics` is now `ClassificationType.TERRAIN`. If you wish the geometry to color both terrain and 3D tiles, pass in the option `classificationType: Cesium.ClassificationType.BOTH`.
  `GroundPrimitive`、`CorridorGraphics`、`EllipseGraphics`、`PolygonGraphics` 和 `RectangleGraphics` 的默认 `classificationType` 现在为 `ClassificationType.TERRAIN`。如果您希望几何体同时对地形和 3D Tiles 上色，请传入选项 `classificationType: Cesium.ClassificationType.BOTH`。
- Removed support for the `options` argument for `Credit` [#6373](https://github.com/CesiumGS/cesium/issues/6373). Pass in an html string instead.
  移除了对 `Credit` 的 `options` 参数的支持[#6373](https://github.com/CesiumGS/cesium/issues/6373)。请改为传入 HTML 字符串。
- glTF 2.0 models corrected to face +Z forwards per specification. Internally Cesium uses +X as forward, so a new +Z to +X rotation was added for 2.0 models only. [#6632](https://github.com/CesiumGS/cesium/pull/6632)
  根据规范将 glTF 2.0 模型修正为以 +Z 为朝前方向。在 Cesium 内部使用 +X 作为朝前方向，因此仅针对 2.0 模型添加了新的 +Z 到 +X 旋转。[#6632](https://github.com/CesiumGS/cesium/pull/6632)

### Deprecated :hourglass_flowing_sand:

- The `Scene.fxaa` property has been deprecated and will be removed in Cesium 1.47. Use `Scene.postProcessStages.fxaa.enabled`.
  `Scene.fxaa` 属性已被弃用，并将在 Cesium 1.47 中移除。请使用 `Scene.postProcessStages.fxaa.enabled`。

### Additions :tada:

- Added support for materials on terrain entities (entities with unspecified `height`) and `GroundPrimitives`. [#6393](https://github.com/CesiumGS/cesium/pull/6393)
  增加了对地形实体（未指定 `height` 的实体）和 `GroundPrimitives` 材质的支持。[#6393](https://github.com/CesiumGS/cesium/pull/6393)
  - Only available for `ClassificationType.TERRAIN` at this time. Adding a material to a terrain `Entity` will cause it to behave as if it is `ClassificationType.TERRAIN`.
    目前仅适用于 `ClassificationType.TERRAIN`。为地形 `Entity` 添加材质将使其行为如同 `ClassificationType.TERRAIN`。
  - Requires depth texture support (`WEBGL_depth_texture` or `WEBKIT_WEBGL_depth_texture`), so materials on terrain entities and `GroundPrimitives` are not supported in Internet Explorer.
    需要深度纹理支持（`WEBGL_depth_texture` 或 `WEBKIT_WEBGL_depth_texture`），因此在 Internet Explorer 中不支持地形实体和 `GroundPrimitives` 上的材质。
  - Best suited for notational patterns and not intended for precisely mapping textures to terrain - for that use case, use `SingleTileImageryProvider`.
    最适合用于符号化图案，不适用于将纹理精确贴合映射到地形——对于该用例，请使用 `SingleTileImageryProvider`。
- Added `GroundPrimitive.supportsMaterials` and `Entity.supportsMaterialsforEntitiesOnTerrain`, both of which can be used to check if materials on terrain entities and `GroundPrimitives` is supported. [#6393](https://github.com/CesiumGS/cesium/pull/6393)
  添加了 `GroundPrimitive.supportsMaterials` 和 `Entity.supportsMaterialsforEntitiesOnTerrain`，均可用于检查是否支持地形实体和 `GroundPrimitives` 上的材质。[#6393](https://github.com/CesiumGS/cesium/pull/6393)
- Added a post-processing framework. [#5615](https://github.com/CesiumGS/cesium/pull/5615)
  新增了后处理框架。[#5615](https://github.com/CesiumGS/cesium/pull/5615)
  - Added `Scene.postProcessStages` which is a collection of post-process stages to be run in order.
    新增了 `Scene.postProcessStages`，它是按顺序运行的后处理阶段的集合。
    - Has a built-in `ambientOcclusion` property which will apply screen space ambient occlusion to the scene and run before all stages.
      具有内置的 `ambientOcclusion` 属性，它将对场景应用屏幕空间环境光遮蔽（SSAO），并在所有阶段之前运行。
    - Has a built-in `bloom` property which applies a bloom filter to the scene before all other stages but after the ambient occlusion stage.
      具有内置的 `bloom` 属性，在所有其他阶段之前但在环境光遮蔽阶段之后对场景应用泛光滤镜。
    - Has a built-in `fxaa` property which applies Fast Approximate Anti-aliasing (FXAA) to the scene after all other stages.
      具有内置的 `fxaa` 属性，在所有其他阶段之后对场景应用快速近似抗锯齿（FXAA）。
  - Added `PostProcessStageLibrary` which contains several built-in stages that can be added to the collection.
    新增了 `PostProcessStageLibrary`，其中包含可添加到集合中的若干内置阶段。
  - Added `PostProcessStageComposite` for multi-stage post-processes like depth of field.
    新增了用于多阶段后处理（例如景深效果）的 `PostProcessStageComposite`。
  - Added a new Sandcastle label `Post Processing` to showcase the different built-in post-process stages.
    添加了新的 Sandcastle 标签 `Post Processing`，以展示不同的内置后处理阶段。
- Added `zIndex` for ground geometry, including corridor, ellipse, polygon and rectangle entities. [#6362](https://github.com/CesiumGS/cesium/pull/6362)
  为贴地几何体添加了 `zIndex`，包括走廊、椭圆、多边形和矩形实体。[#6362](https://github.com/CesiumGS/cesium/pull/6362)
- Added `Rectangle.equalsEpsilon` for comparing the equality of two rectangles [#6533](https://github.com/CesiumGS/cesium/pull/6533)
  添加了 `Rectangle.equalsEpsilon`，用于比较两个矩形是否近似相等。[#6533](https://github.com/CesiumGS/cesium/pull/6533)

### Fixes :wrench:

- Fixed a bug causing custom TilingScheme classes to not be able to use a GeographicProjection. [#6524](https://github.com/CesiumGS/cesium/pull/6524)
  修复了导致自定义 TilingScheme 类无法使用 GeographicProjection 的 Bug。[#6524](https://github.com/CesiumGS/cesium/pull/6524)
- Fixed incorrect 3D Tiles statistics when a tile fails during processing. [#6558](https://github.com/CesiumGS/cesium/pull/6558)
  修复了瓦片在处理过程中失败时 3D Tiles 统计信息不正确的问题。[#6558](https://github.com/CesiumGS/cesium/pull/6558)
- Fixed race condition causing intermittent crash when changing geometry show value [#3061](https://github.com/CesiumGS/cesium/issues/3061)
  修复了更改几何体 show 属性值时导致间歇性崩溃的竞态条件。[#3061](https://github.com/CesiumGS/cesium/issues/3061)
- `ProviderViewModel`s with no category are displayed in an untitled group in `BaseLayerPicker` instead of being labeled as `'Other'` [#6574](https://github.com/CesiumGS/cesium/pull/6574)
  没有类别的 `ProviderViewModel` 在 `BaseLayerPicker` 中显示在无标题组中，而不是标记为 `'Other'`。[#6574](https://github.com/CesiumGS/cesium/pull/6574)
- Fixed a bug causing intermittent crashes with clipping planes due to uninitialized textures. [#6576](https://github.com/CesiumGS/cesium/pull/6576)
  修复了由于未初始化纹理导致裁剪平面发生间歇性崩溃的 Bug。[#6576](https://github.com/CesiumGS/cesium/pull/6576)
- Added a workaround for clipping planes causing a picking shader compilation failure for gltf models and 3D Tilesets in Internet Explorer [#6575](https://github.com/CesiumGS/cesium/issues/6575)
  针对 Internet Explorer 中裁剪平面导致 glTF 模型和 3D 瓦片集拾取着色器编译失败的问题添加了变通解决办法。[#6575](https://github.com/CesiumGS/cesium/issues/6575)
- Allowed Bing Maps servers with a subpath (instead of being at the root) to work correctly. [#6597](https://github.com/CesiumGS/cesium/pull/6597)
  允许具有子路径（而非位于根目录）的 Bing Maps 服务器正常工作。[#6597](https://github.com/CesiumGS/cesium/pull/6597)
- Added support for loading of Draco compressed glTF assets in IE11 [#6404](https://github.com/CesiumGS/cesium/issues/6404)
  在 IE11 中增加了对加载 Draco 压缩 glTF 资产的支持。[#6404](https://github.com/CesiumGS/cesium/issues/6404)
- Fixed polygon outline when using `perPositionHeight` and `extrudedHeight`. [#6595](https://github.com/CesiumGS/cesium/issues/6595)
  修复了使用 `perPositionHeight` 和 `extrudedHeight` 时的多边形轮廓线问题。[#6595](https://github.com/CesiumGS/cesium/issues/6595)
- Fixed broken links in documentation of `createTileMapServiceImageryProvider`. [#5818](https://github.com/CesiumGS/cesium/issues/5818)
  修复了 `createTileMapServiceImageryProvider` 文档中的失效链接。[#5818](https://github.com/CesiumGS/cesium/issues/5818)
- Transitioning from 2 touches to 1 touch no longer triggers a new pan gesture. [#6479](https://github.com/CesiumGS/cesium/pull/6479)
  从双指触控过渡到单指触控时不再触发新的平移手势。[#6479](https://github.com/CesiumGS/cesium/pull/6479)

## 1.45 - 2018-05-01

### Major Announcements :loudspeaker:

- We've launched Cesium ion! Read all about it in our [blog post](https://cesium.com/blog/2018/05/01/get-your-cesium-ion-community-account/).
  我们推出了 Cesium ion！请在我们的[博文](https://cesium.com/blog/2018/05/01/get-your-cesium-ion-community-account/)中阅读全部详细内容。
- Cesium now uses ion services by default for base imagery, terrain, and geocoding. A demo key is provided, but to use them in your own apps you must [sign up](https://cesium.com/ion/signup) for a free ion Community account.
  Cesium 现在默认使用 ion 服务来提供基础影像、地形和地理编码。随附了一个演示密钥，但要在您自己的应用程序中使用它们，您必须[注册](https://cesium.com/ion/signup)一个免费的 ion Community 账户。

### Breaking Changes :mega:

- `ClippingPlaneCollection` now uses `ClippingPlane` objects instead of `Plane` objects. [#6498](https://github.com/CesiumGS/cesium/pull/6498)
  `ClippingPlaneCollection` 现在使用 `ClippingPlane` 对象而不是 `Plane` 对象。[#6498](https://github.com/CesiumGS/cesium/pull/6498)
- Cesium no longer ships with a demo Bing Maps API key.
  Cesium 不再随附演示用 Bing Maps API 密钥。
- `BingMapsImageryProvider` is no longer the default base imagery layer. (Bing imagery itself is still the default, however it is provided through Cesium ion)
  `BingMapsImageryProvider` 不再是默认的基础影像图层。（Bing 影像本身仍然是默认底图，但是通过 Cesium ion 提供）
- `BingMapsGeocoderService` is no longer the default geocoding service.
  `BingMapsGeocoderService` 不再是默认的地理编码服务。
- If you wish to continue to use your own Bing API key for imagery and geocoding, you can go back to the old default behavior by constructing the Viewer as follows:
  如果您希望继续使用自己的 Bing API 密钥进行影像和地理编码，可以通过如下方式构造 Viewer 来恢复旧的默认行为：
  ```javascript
  Cesium.BingMapsApi.defaultKey = "yourBingKey";
  var viewer = new Cesium.Viewer("cesiumContainer", {
    imageryProvider: new Cesium.BingMapsImageryProvider({
      url: "https://dev.virtualearth.net",
    }),
    geocoder: [
      new Cesium.CartographicGeocoderService(),
      new Cesium.BingMapsGeocoderService(),
    ],
  });
  ```

### Deprecated :hourglass_flowing_sand:

- `Particle.size`, `ParticleSystem.rate`, `ParticleSystem.lifeTime`, `ParticleSystem.life`, `ParticleSystem.minimumLife`, and `ParticleSystem.maximumLife` have been renamed to `Particle.imageSize`, `ParticleSystem.emissionRate`, `ParticleSystem.lifetime`, `ParticleSystem.particleLife`, `ParticleSystem.minimumParticleLife`, and `ParticleSystem.maximumParticleLife`. Use of the `size`, `rate`, `lifeTime`, `life`, `minimumLife`, and `maximumLife` parameters is deprecated and will be removed in Cesium 1.46.
  `Particle.size`、`ParticleSystem.rate`、`ParticleSystem.lifeTime`、`ParticleSystem.life`、`ParticleSystem.minimumLife` 和 `ParticleSystem.maximumLife` 已分别重命名为 `Particle.imageSize`、`ParticleSystem.emissionRate`、`ParticleSystem.lifetime`、`ParticleSystem.particleLife`、`ParticleSystem.minimumParticleLife` 和 `ParticleSystem.maximumParticleLife`。使用 `size`、`rate`、`lifeTime`、`life`、`minimumLife` 和 `maximumLife` 参数已被弃用，并将在 Cesium 1.46 中移除。
- `ParticleSystem.forces` array has been switched out for singular function `ParticleSystems.updateCallback`. Use of the `forces` parameter is deprecated and will be removed in Cesium 1.46.
  `ParticleSystem.forces` 数组已替换为单个函数 `ParticleSystems.updateCallback`。使用 `forces` 参数已被弃用，并将在 Cesium 1.46 中移除。
- Any width and height variables in `ParticleSystem` will no longer be individual components. `ParticleSystem.minimumWidth` and `ParticleSystem.minimumHeight` will now be `ParticleSystem.minimumImageSize`, `ParticleSystem.maximumWidth` and `ParticleSystem.maximumHeight` will now be `ParticleSystem.maximumImageSize`, and `ParticleSystem.width` and `ParticleSystem.height` will now be `ParticleSystem.imageSize`. Use of the `minimumWidth`, `minimumHeight`, `maximumWidth`, `maximumHeight`, `width`, and `height` parameters is deprecated and will be removed in Cesium 1.46.
  `ParticleSystem` 中的任何宽度和高度变量将不再是独立分量。`ParticleSystem.minimumWidth` 和 `ParticleSystem.minimumHeight` 现在将为 `ParticleSystem.minimumImageSize`，`ParticleSystem.maximumWidth` 和 `ParticleSystem.maximumHeight` 现在将为 `ParticleSystem.maximumImageSize`，`ParticleSystem.width` 和 `ParticleSystem.height` 现在将为 `ParticleSystem.imageSize`。使用 `minimumWidth`、`minimumHeight`、`maximumWidth`、`maximumHeight`、`width` 和 `height` 参数已被弃用，并将在 Cesium 1.46 中移除。

### Additions :tada:

- Added option `logarithmicDepthBuffer` to `Scene`. With this option there is typically a single frustum using logarithmic depth rendered. This increases performance by issuing less draw calls to the GPU and helps to avoid artifacts on the connection of two frustums. [#5851](https://github.com/CesiumGS/cesium/pull/5851)
  向 `Scene` 添加了 `logarithmicDepthBuffer` 选项。使用此选项时，通常使用对数深度渲染单个视锥体。这通过向 GPU 发出较少的绘制调用来提高性能，并有助于避免两个视锥体衔接处的伪影瑕疵。[#5851](https://github.com/CesiumGS/cesium/pull/5851)
- When a log depth buffer is supported, the frustum near and far planes default to `0.1` and `1e10` respectively.
  在支持对数深度缓冲区时，视锥体近平面和远平面分别默认为 `0.1` 和 `1e10`。
- Added `IonGeocoderService` and made it the default geocoding service for the `Geocoder` widget.
  添加了 `IonGeocoderService`，并将其作为 `Geocoder` 部件的默认地理编码服务。
- Added `createWorldImagery` which provides Bing Maps imagery via a Cesium ion account.
  添加了 `createWorldImagery`，通过 Cesium ion 账户提供 Bing Maps 影像。
- Added `PeliasGeocoderService`, which provides geocoding via a [Pelias](https://pelias.io) server.
  添加了 `PeliasGeocoderService`，通过 [Pelias](https://pelias.io) 服务器提供地理编码服务。
- Added the ability for `BaseLayerPicker` to group layers by category. `ProviderViewModel.category` was also added to support this feature.
  为 `BaseLayerPicker` 添加了按类别对图层进行分组的功能。还添加了 `ProviderViewModel.category` 以支持此功能。
- Added `Math.log2` to compute the base 2 logarithm of a number.
  添加了 `Math.log2`，用于计算数字以 2 为底的对数。
- Added `GeocodeType` enum and use it as an optional parameter to all `GeocoderService` instances to differentiate between autocomplete and search requests.
  添加了 `GeocodeType` 枚举，并将其用作所有 `GeocoderService` 实例的可选参数，以区分自动补全和搜索请求。
- Added `initWebAssemblyModule` function to `TaskProcessor` to load a Web Assembly module in a web worker. [#6420](https://github.com/CesiumGS/cesium/pull/6420)
  向 `TaskProcessor` 添加了 `initWebAssemblyModule` 函数，用于在 Web Worker 中加载 WebAssembly 模块。[#6420](https://github.com/CesiumGS/cesium/pull/6420)
- Added `supportsWebAssembly` function to `FeatureDetection` to check if a browser supports loading Web Assembly modules. [#6420](https://github.com/CesiumGS/cesium/pull/6420)
  向 `FeatureDetection` 添加了 `supportsWebAssembly` 函数，用于检查浏览器是否支持加载 WebAssembly 模块。[#6420](https://github.com/CesiumGS/cesium/pull/6420)
- Improved `MapboxImageryProvider` performance by 300% via `tiles.mapbox.com` subdomain switching. [#6426](https://github.com/CesiumGS/cesium/issues/6426)
  通过 `tiles.mapbox.com` 子域名轮换，将 `MapboxImageryProvider` 性能提升了 300%。[#6426](https://github.com/CesiumGS/cesium/issues/6426)
- Added ability to invoke `sampleTerrain` from node.js to enable offline terrain sampling
  增加了从 node.js 调用 `sampleTerrain` 的功能，以支持离线地形采样。
- Added more ParticleSystem Sandcastle examples for rocket and comet tails and weather. [#6375](https://github.com/CesiumGS/cesium/pull/6375)
  为火箭和彗尾以及天气效果添加了更多 ParticleSystem Sandcastle 示例。[#6375](https://github.com/CesiumGS/cesium/pull/6375)
- Added color and scale attributes to the `ParticleSystem` class constructor. When defined the variables override startColor and endColor and startScale and endScale. [#6429](https://github.com/CesiumGS/cesium/pull/6429)
  向 `ParticleSystem` 类构造函数添加了 color 和 scale 属性。定义后，这些变量将覆盖 startColor/endColor 以及 startScale/endScale。[#6429](https://github.com/CesiumGS/cesium/pull/6429)

### Fixes :wrench:

- Fixed bugs in `TimeIntervalCollection.removeInterval`. [#6418](https://github.com/CesiumGS/cesium/pull/6418).
  修复了 `TimeIntervalCollection.removeInterval` 中的 Bug。[#6418](https://github.com/CesiumGS/cesium/pull/6418)。
- Fixed glTF support to handle meshes with and without tangent vectors, and with/without morph targets, sharing one material. [#6421](https://github.com/CesiumGS/cesium/pull/6421)
  修复了 glTF 支持，以处理共享同一种材质的带有与不带切线向量的网格、以及带有/不带变形目标的网格。[#6421](https://github.com/CesiumGS/cesium/pull/6421)
- Fixed glTF support to handle skinned meshes when no skin is supplied. [#6061](https://github.com/CesiumGS/cesium/issues/6061)
  修复了 glTF 支持，以处理未提供蒙皮时的蒙皮网格。[#6061](https://github.com/CesiumGS/cesium/issues/6061)
- Updated glTF 2.0 PBR shader to have brighter lighting. [#6430](https://github.com/CesiumGS/cesium/pull/6430)
  更新了 glTF 2.0 PBR 着色器以实现更明亮的光照。[#6430](https://github.com/CesiumGS/cesium/pull/6430)
- Allow loadWithXhr to work with string URLs in a web worker.
  允许 loadWithXhr 在 Web Worker 中使用字符串 URL。
- Updated to Draco 1.3.0 and implemented faster loading of Draco compressed glTF assets in browsers that support Web Assembly. [#6420](https://github.com/CesiumGS/cesium/pull/6420)
  更新至 Draco 1.3.0，并在支持 WebAssembly 的浏览器中实现了更快地加载 Draco 压缩 glTF 资产。[#6420](https://github.com/CesiumGS/cesium/pull/6420)
- `GroundPrimitive`s and `ClassificationPrimitive`s will become ready when `show` is `false`. [#6428](https://github.com/CesiumGS/cesium/pull/6428)
  当 `show` 为 `false` 时，`GroundPrimitive` 和 `ClassificationPrimitive` 也会进入准备就绪（ready）状态。[#6428](https://github.com/CesiumGS/cesium/pull/6428)
- Fix Firefox WebGL console warnings. [#5912](https://github.com/CesiumGS/cesium/issues/5912)
  修复了 Firefox WebGL 控制台警告。[#5912](https://github.com/CesiumGS/cesium/issues/5912)
- Fix parsing Cesium.js in older browsers that do not support all TypedArray types. [#6396](https://github.com/CesiumGS/cesium/pull/6396)
  修复了在不支持所有 TypedArray 类型的老旧浏览器中解析 Cesium.js 的问题。[#6396](https://github.com/CesiumGS/cesium/pull/6396)
- Fixed a bug causing crashes when setting colors on un-pickable models. [\$6442](https://github.com/CesiumGS/cesium/issues/6442)
  修复了在不可拾取的模型上设置颜色时发生崩溃的 Bug。[\$6442](https://github.com/CesiumGS/cesium/issues/6442)
- Fix flicker when adding, removing, or modifying entities. [#3945](https://github.com/CesiumGS/cesium/issues/3945)
  修复了添加、移除或修改实体时的闪烁问题。[#3945](https://github.com/CesiumGS/cesium/issues/3945)
- Fixed crash bug in PolylineCollection when a polyline was updated and removed at the same time. [#6455](https://github.com/CesiumGS/cesium/pull/6455)
  修复了在 PolylineCollection 中当折线被同时更新和移除时的崩溃 Bug。[#6455](https://github.com/CesiumGS/cesium/pull/6455)
- Fixed crash when animating a glTF model with a single keyframe. [#6422](https://github.com/CesiumGS/cesium/pull/6422)
  修复了动画化仅包含单个关键帧的 glTF 模型时的崩溃问题。[#6422](https://github.com/CesiumGS/cesium/pull/6422)
- Fixed Imagery Layers Texture Filters Sandcastle example. [#6472](https://github.com/CesiumGS/cesium/pull/6472).
  修复了影像图层纹理滤镜 Sandcastle 示例。[#6472](https://github.com/CesiumGS/cesium/pull/6472)。
- Fixed a bug causing Cesium 3D Tilesets to not clip properly when tiles were unloaded and reloaded. [#6484](https://github.com/CesiumGS/cesium/issues/6484)
  修复了在卸载并重新加载瓦片时导致 Cesium 3D 瓦片集无法正确裁剪的 Bug。[#6484](https://github.com/CesiumGS/cesium/issues/6484)
- Fixed `TimeInterval` so now it throws if `fromIso8601` is given an ISO 8601 string with improper formatting. [#6164](https://github.com/CesiumGS/cesium/issues/6164)
  修复了 `TimeInterval`，如果向 `fromIso8601` 传入格式不正确的 ISO 8601 字符串，现在会抛出异常。[#6164](https://github.com/CesiumGS/cesium/issues/6164)
- Improved rendering of glTF models that don't contain normals with a temporary unlit shader workaround. [#6501](https://github.com/CesiumGS/cesium/pull/6501)
  通过临时的 unlit 无光照着色器变通方案，改进了不包含法线的 glTF 模型的渲染效果。[#6501](https://github.com/CesiumGS/cesium/pull/6501)
- Fixed rendering of glTF models with emissive-only materials. [#6501](https://github.com/CesiumGS/cesium/pull/6501)
  修复了具有纯自发光（emissive-only）材质的 glTF 模型的渲染问题。[#6501](https://github.com/CesiumGS/cesium/pull/6501)
- Fixed a bug in shader modification for glTF 1.0 quantized attributes and Draco quantized attributes. [#6523](https://github.com/CesiumGS/cesium/pull/6523)
  修复了 glTF 1.0 量化属性和 Draco 量化属性的着色器修改中的 Bug。[#6523](https://github.com/CesiumGS/cesium/pull/6523)

## 1.44 - 2018-04-02

### Highlights :sparkler:

- Added a new Sandcastle label, `New in X.X` which will include all new Sandcastle demos added for the current release. [#6384](https://github.com/CesiumGS/cesium/issues/6384)
  添加了新的 Sandcastle 标签 `New in X.X`，其中将包含针对当前版本添加的所有新 Sandcastle 示例。[#6384](https://github.com/CesiumGS/cesium/issues/6384)
- Added support for glTF models with [Draco geometry compression](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_draco_mesh_compression/README.md). [#5120](https://github.com/CesiumGS/cesium/issues/5120)
  增加了对带有 [Draco 几何压缩](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_draco_mesh_compression/README.md) 的 glTF 模型的支持。[#5120](https://github.com/CesiumGS/cesium/issues/5120)
- Added support for ordering in `DataSourceCollection`. [#6316](https://github.com/CesiumGS/cesium/pull/6316)
  在 `DataSourceCollection` 中增加了对排序的支持。[#6316](https://github.com/CesiumGS/cesium/pull/6316)

### Breaking Changes :mega:

- `GeometryVisualizer` now requires `primitive` and `groundPrimitive` parameters. [#6316](https://github.com/CesiumGS/cesium/pull/6316)
  `GeometryVisualizer` 现在需要 `primitive` 和 `groundPrimitive` 参数。[#6316](https://github.com/CesiumGS/cesium/pull/6316)
- For all classes/functions that take a `Resource` instance, all additional parameters that are part of the `Resource` class have been removed. This generally includes `proxy`, `headers` and `query` parameters. [#6368](https://github.com/CesiumGS/cesium/pull/6368)
  对于所有接受 `Resource` 实例的类/函数，移除了属于 `Resource` 类的所有附加参数。这通常包括 `proxy`、`headers` 和 `query` 参数。[#6368](https://github.com/CesiumGS/cesium/pull/6368)
- All low level load functions including `loadArrayBuffer`, `loadBlob`, `loadImage`, `loadJson`, `loadJsonp`, `loadText`, `loadXML` and `loadWithXhr` have been removed. Please use the equivalent `fetch` functions on the `Resource` class. [#6368](https://github.com/CesiumGS/cesium/pull/6368)
  移除了包括 `loadArrayBuffer`、`loadBlob`、`loadImage`、`loadJson`、`loadJsonp`、`loadText`、`loadXML` 和 `loadWithXhr` 在内的所有底层加载函数。请改用 `Resource` 类上等效的 `fetch` 函数。[#6368](https://github.com/CesiumGS/cesium/pull/6368)

### Deprecated :hourglass_flowing_sand:

- `ClippingPlaneCollection` is now supported in Internet Explorer, so `ClippingPlaneCollection.isSupported` has been deprecated and will be removed in Cesium 1.45.
  `ClippingPlaneCollection` 现在已在 Internet Explorer 中受支持，因此 `ClippingPlaneCollection.isSupported` 已被弃用，并将在 Cesium 1.45 中移除。
- `ClippingPlaneCollection` should now be used with `ClippingPlane` objects instead of `Plane`. Use of `Plane` objects has been deprecated and will be removed in Cesium 1.45.
  `ClippingPlaneCollection` 现在应与 `ClippingPlane` 对象一起使用，而不是 `Plane`。使用 `Plane` 对象已被弃用，并将在 Cesium 1.45 中移除。
- `Credit` now takes an `html` and `showOnScreen` parameters instead of an `options` object. Use of the `options` parameter is deprecated and will be removed in Cesium 1.46.
  `Credit` 现在接受 `html` 和 `showOnScreen` 参数，而不是 `options` 对象。使用 `options` 参数已被弃用，并将在 Cesium 1.46 中移除。
- `Credit.text`, `Credit.imageUrl` and `Credit.link` properties have all been deprecated and will be removed in Cesium 1.46. Use `Credit.html` to retrieve the credit content.
  `Credit.text`、`Credit.imageUrl` 和 `Credit.link` 属性均已被弃用，并将在 Cesium 1.46 中移除。使用 `Credit.html` 检索鸣谢内容。
- `Credit.hasImage` and `Credit.hasLink` functions have been deprecated and will be removed in Cesium 1.46.
  `Credit.hasImage` 和 `Credit.hasLink` 函数已被弃用，并将在 Cesium 1.46 中移除。

### Additions :tada:

- Added a new Sandcastle label, `New in X.X` which will include all new Sandcastle demos added for the current release. [#6384](https://github.com/CesiumGS/cesium/issues/6384)
  添加了新的 Sandcastle 标签 `New in X.X`，其中将包含针对当前版本添加的所有新 Sandcastle 示例。[#6384](https://github.com/CesiumGS/cesium/issues/6384)
- Added support for glTF models with [Draco geometry compression](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_draco_mesh_compression/README.md). [#5120](https://github.com/CesiumGS/cesium/issues/5120)
  增加了对带有 [Draco 几何压缩](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_draco_mesh_compression/README.md) 的 glTF 模型的支持。[#5120](https://github.com/CesiumGS/cesium/issues/5120)
  - Added `dequantizeInShader` option parameter to `Model` and `Model.fromGltf` to specify if Draco compressed glTF assets should be dequantized on the GPU.
    向 `Model` 和 `Model.fromGltf` 添加了 `dequantizeInShader` 选项参数，以指定是否应在 GPU 上对 Draco 压缩的 glTF 资产进行反量化。
- Added support for ordering in `DataSourceCollection`. [#6316](https://github.com/CesiumGS/cesium/pull/6316)
  在 `DataSourceCollection` 中增加了对排序的支持。[#6316](https://github.com/CesiumGS/cesium/pull/6316)
  - All ground geometry from one `DataSource` will render in front of all ground geometry from another `DataSource` in the same collection with a lower index.
    来自某个 `DataSource` 的所有贴地几何体将渲染在同一集合中索引较低的另一个 `DataSource` 的所有贴地几何体的前面。
  - Use `DataSourceCollection.raise`, `DataSourceCollection.lower`, `DataSourceCollection.raiseToTop` and `DataSourceCollection.lowerToBottom` functions to change the ordering of a `DataSource` in the collection.
    使用 `DataSourceCollection.raise`、`DataSourceCollection.lower`、`DataSourceCollection.raiseToTop` 和 `DataSourceCollection.lowerToBottom` 函数更改集合中 `DataSource` 的顺序。
- `ClippingPlaneCollection` updates [#6201](https://github.com/CesiumGS/cesium/pull/6201):
  `ClippingPlaneCollection` 更新[#6201](https://github.com/CesiumGS/cesium/pull/6201)：
  - Removed the 6-clipping-plane limit.
    移除了 6 个裁剪平面的限制。
  - Added support for Internet Explorer.
    增加了对 Internet Explorer 的支持。
  - Added a `ClippingPlane` object to be used with `ClippingPlaneCollection`.
    添加了与 `ClippingPlaneCollection` 配合使用的 `ClippingPlane` 对象。
  - Added 3D Tiles use-case to the Terrain Clipping Planes Sandcastle.
    在地形裁剪平面 Sandcastle 示例中添加了 3D Tiles 用例。
- `Credit` has been modified to take an HTML string as the credit content. [#6331](https://github.com/CesiumGS/cesium/pull/6331)
  修改了 `Credit`，接受 HTML 字符串作为鸣谢内容。[#6331](https://github.com/CesiumGS/cesium/pull/6331)
- Sharing Sandcastle examples now works by storing the full example directly in the URL instead of creating GitHub gists, because anonymous gist creation was removed by GitHub. Loading existing gists will still work. [#6342](https://github.com/CesiumGS/cesium/pull/6342)
  共享 Sandcastle 示例现在通过将完整示例直接存储在 URL 中而不是创建 GitHub Gist 来实现，因为 GitHub 移除了匿名创建 Gist 的功能。加载现有的 Gist 仍然有效。[#6342](https://github.com/CesiumGS/cesium/pull/6342)
- Updated `WebMapServiceImageryProvider` so it can take an srs or crs string to pass to the resource query parameters based on the WMS version. [#6223](https://github.com/CesiumGS/cesium/issues/6223)
  更新了 `WebMapServiceImageryProvider`，以便根据 WMS 版本接受 srs 或 crs 字符串传递给资源查询参数。[#6223](https://github.com/CesiumGS/cesium/issues/6223)
- Added additional query parameter options to the CesiumViewer demo application [#6328](https://github.com/CesiumGS/cesium/pull/6328):
  为 CesiumViewer 演示应用程序添加了额外的查询参数选项[#6328](https://github.com/CesiumGS/cesium/pull/6328)：
  - `sourceType` specifies the type of data source if the URL doesn't have a known file extension.
    如果 URL 没有已知的文件扩展名，`sourceType` 用于指定数据源的类型。
  - `flyTo=false` optionally disables the automatic `flyTo` after loading the data source.
    `flyTo=false` 可选地在加载数据源后禁用自动 `flyTo`。
- Added a multi-part CZML example to Sandcastle. [#6320](https://github.com/CesiumGS/cesium/pull/6320)
  在 Sandcastle 中添加了多部分 CZML 示例。[#6320](https://github.com/CesiumGS/cesium/pull/6320)
- Improved processing order of 3D tiles. [#6364](https://github.com/CesiumGS/cesium/pull/6364)
  改进了 3D 瓦片的处理顺序。[#6364](https://github.com/CesiumGS/cesium/pull/6364)

### Fixes :wrench:

- Fixed Cesium ion browser caching. [#6353](https://github.com/CesiumGS/cesium/pull/6353).
  修复了 Cesium ion 浏览器缓存问题。[#6353](https://github.com/CesiumGS/cesium/pull/6353)。
- Fixed formula for Weighted Blended Order-Independent Transparency. [#6340](https://github.com/CesiumGS/cesium/pull/6340)
  修复了加权混合顺序无关透明度（Weighted Blended OIT）的公式。[#6340](https://github.com/CesiumGS/cesium/pull/6340)
- Fixed support of glTF-supplied tangent vectors. [#6302](https://github.com/CesiumGS/cesium/pull/6302)
  修复了对 glTF 提供的切线向量的支持。[#6302](https://github.com/CesiumGS/cesium/pull/6302)
- Fixed model loading failure when containing unused materials. [6315](https://github.com/CesiumGS/cesium/pull/6315)
  修复了包含未使用材质时的模型加载失败问题。[6315](https://github.com/CesiumGS/cesium/pull/6315)
- Fixed default value of `alphaCutoff` in glTF models. [#6346](https://github.com/CesiumGS/cesium/pull/6346)
  修复了 glTF 模型中 `alphaCutoff` 的默认值。[#6346](https://github.com/CesiumGS/cesium/pull/6346)
- Fixed double-sided flag for glTF materials with `BLEND` enabled. [#6371](https://github.com/CesiumGS/cesium/pull/6371)
  修复了启用 `BLEND` 的 glTF 材质的双面（double-sided）标志。[#6371](https://github.com/CesiumGS/cesium/pull/6371)
- Fixed animation for glTF models with missing animation targets. [#6351](https://github.com/CesiumGS/cesium/pull/6351)
  修复了缺少动画目标的 glTF 模型的动画问题。[#6351](https://github.com/CesiumGS/cesium/pull/6351)
- Fixed improper zoom during model load failure. [#6305](https://github.com/CesiumGS/cesium/pull/6305)
  修复了模型加载失败期间的不当缩放问题。[#6305](https://github.com/CesiumGS/cesium/pull/6305)
- Fixed rendering vector tiles when using `invertClassification`. [#6349](https://github.com/CesiumGS/cesium/pull/6349)
  修复了使用 `invertClassification` 时矢量瓦片的渲染问题。[#6349](https://github.com/CesiumGS/cesium/pull/6349)
- Fixed occlusion when `globe.show` is `false`. [#6374](https://github.com/CesiumGS/cesium/pull/6374)
  修复了当 `globe.show` 为 `false` 时的遮挡问题。[#6374](https://github.com/CesiumGS/cesium/pull/6374)
- Fixed crash for entities with static geometry and time-dynamic attributes. [#6377](https://github.com/CesiumGS/cesium/pull/6377)
  修复了具有静态几何体和时变属性的实体发生的崩溃。[#6377](https://github.com/CesiumGS/cesium/pull/6377)
- Fixed geometry tile rendering in IE. [#6406](https://github.com/CesiumGS/cesium/pull/6406)
  修复了 IE 中的几何体瓦片渲染问题。[#6406](https://github.com/CesiumGS/cesium/pull/6406)

## 1.43 - 2018-03-01

### Major Announcements :loudspeaker:

- Say hello to [Cesium ion](https://cesium.com/blog/2018/03/01/hello-cesium-ion/)
  欢迎了解 [Cesium ion](https://cesium.com/blog/2018/03/01/hello-cesium-ion/)
- Cesium, the JavaScript library, is now officially renamed to CesiumJS (no code changes required)
  Cesium（JavaScript 库）现已正式更名为 CesiumJS（无需更改代码）
- The STK World Terrain tileset is deprecated and will be available until September 1, 2018. Check out the new high-resolution [Cesium World Terrain](https://cesium.com/blog/2018/03/01/introducing-cesium-world-terrain/)
  STK World Terrain 瓦片集已被弃用，并将提供至 2018 年 9 月 1 日。欢迎体验全新的高分辨率 [Cesium World Terrain](https://cesium.com/blog/2018/03/01/introducing-cesium-world-terrain/)

### Breaking Changes :mega:

- Removed `GeometryUpdater.perInstanceColorAppearanceType` and `GeometryUpdater.materialAppearanceType`. [#6239](https://github.com/CesiumGS/cesium/pull/6239)
  移除了 `GeometryUpdater.perInstanceColorAppearanceType` 和 `GeometryUpdater.materialAppearanceType`。[#6239](https://github.com/CesiumGS/cesium/pull/6239)
- `GeometryVisualizer` no longer uses a `type` parameter. [#6239](https://github.com/CesiumGS/cesium/pull/6239)
  `GeometryVisualizer` 不再使用 `type` 参数。[#6239](https://github.com/CesiumGS/cesium/pull/6239)
- `GeometryVisualizer` no longer displays polylines. Use `PolylineVisualizer` instead. [#6239](https://github.com/CesiumGS/cesium/pull/6239)
  `GeometryVisualizer` 不再显示折线。请改用 `PolylineVisualizer`。[#6239](https://github.com/CesiumGS/cesium/pull/6239)
- The experimental `CesiumIon` object has been completely refactored and renamed to `Ion`.
  实验性的 `CesiumIon` 对象已完全重构并重命名为 `Ion`。

### Deprecated :hourglass_flowing_sand:

- The STK World Terrain, ArcticDEM, and PAMAP Terrain tilesets hosted on `assets.agi.com` are deprecated and will be available until September 1, 2018. To continue using them, access them via [Cesium ion](https://cesium.com/blog/2018/03/01/hello-cesium-ion/)
  托管在 `assets.agi.com` 上的 STK World Terrain、ArcticDEM 和 PAMAP Terrain 瓦片集已被弃用，并将提供至 2018 年 9 月 1 日。要继续使用它们，请通过 [Cesium ion](https://cesium.com/blog/2018/03/01/hello-cesium-ion/) 访问。
- In the `Resource` class, `addQueryParameters` and `addTemplateValues` have been deprecated and will be removed in Cesium 1.45. Please use `setQueryParameters` and `setTemplateValues` instead.
  在 `Resource` 类中，`addQueryParameters` 和 `addTemplateValues` 已被弃用，并将在 Cesium 1.45 中移除。请改用 `setQueryParameters` 和 `setTemplateValues`。

### Additions :tada:

- Added new `Ion`, `IonResource`, and `IonImageryProvider` objects for loading data hosted on [Cesium ion](https://cesium.com/blog/2018/03/01/hello-cesium-ion/).
  添加了新的 `Ion`、`IonResource` 和 `IonImageryProvider` 对象，用于加载托管在 [Cesium ion](https://cesium.com/blog/2018/03/01/hello-cesium-ion/) 上的数据。
- Added `createWorldTerrain` helper function for easily constructing the new Cesium World Terrain.
  添加了 `createWorldTerrain` 辅助函数，便于构建全新的 Cesium World Terrain。
- Added support for a promise to a resource for `CesiumTerrainProvider`, `createTileMapServiceImageryProvider` and `Cesium3DTileset` [#6204](https://github.com/CesiumGS/cesium/pull/6204)
  为 `CesiumTerrainProvider`、`createTileMapServiceImageryProvider` 和 `Cesium3DTileset` 增加了对资源 Promise 的支持。[#6204](https://github.com/CesiumGS/cesium/pull/6204)
- Added `Cesium.Math.cbrt`. [#6222](https://github.com/CesiumGS/cesium/pull/6222)
  添加了 `Cesium.Math.cbrt`（立方根计算）。[#6222](https://github.com/CesiumGS/cesium/pull/6222)
- Added `PolylineVisualizer` for displaying polyline entities [#6239](https://github.com/CesiumGS/cesium/pull/6239)
  添加了用于显示折线实体的 `PolylineVisualizer`。[#6239](https://github.com/CesiumGS/cesium/pull/6239)
- `Resource` class [#6205](https://github.com/CesiumGS/cesium/issues/6205)
  `Resource` 类[#6205](https://github.com/CesiumGS/cesium/issues/6205)
  - Added `put`, `patch`, `delete`, `options` and `head` methods, so it can be used for all XHR requests.
    添加了 `put`、`patch`、`delete`、`options` 和 `head` 方法，以便可用于所有 XHR 请求。
  - Added `preserveQueryParameters` parameter to `getDerivedResource`, to allow us to append query parameters instead of always replacing them.
    向 `getDerivedResource` 添加了 `preserveQueryParameters` 参数，允许追加查询参数而不是始终替换它们。
  - Added `setQueryParameters` and `appendQueryParameters` to allow for better handling of query strings.
    添加了 `setQueryParameters` 和 `appendQueryParameters`，以便更好地处理查询字符串。
- Enable terrain in the `CesiumViewer` demo application [#6198](https://github.com/CesiumGS/cesium/pull/6198)
  在 `CesiumViewer` 演示应用程序中启用地形。[#6198](https://github.com/CesiumGS/cesium/pull/6198)
- Added `Globe.tilesLoaded` getter property to determine if all terrain and imagery is loaded. [#6194](https://github.com/CesiumGS/cesium/pull/6194)
  添加了 `Globe.tilesLoaded` getter 属性，用于判断所有地形和影像是否已加载完成。[#6194](https://github.com/CesiumGS/cesium/pull/6194)
- Added `classificationType` property to entities which specifies whether an entity on the ground, like a polygon or rectangle, should be clamped to terrain, 3D Tiles, or both. [#6195](https://github.com/CesiumGS/cesium/issues/6195)
  向实体添加了 `classificationType` 属性，用于指定地面实体（如多边形或矩形）应贴合到地形、3D Tiles 还是两者兼有。[#6195](https://github.com/CesiumGS/cesium/issues/6195)

### Fixes :wrench:

- Fixed bug where KmlDataSource did not use Ellipsoid to convert coordinates. Use `options.ellipsoid` to pass the ellipsoid to KmlDataSource constructors / loaders. [#6176](https://github.com/CesiumGS/cesium/pull/6176)
  修复了 KmlDataSource 未使用 Ellipsoid 转换坐标的 Bug。使用 `options.ellipsoid` 将椭球体传递给 KmlDataSource 构造函数/加载器。[#6176](https://github.com/CesiumGS/cesium/pull/6176)
- Fixed bug where 3D Tiles Point Clouds would fail in Internet Explorer. [#6220](https://github.com/CesiumGS/cesium/pull/6220)
  修复了 3D Tiles 点云在 Internet Explorer 中失效的 Bug。[#6220](https://github.com/CesiumGS/cesium/pull/6220)
- Fixed issue where `CESIUM_BASE_URL` wouldn't work without a trailing `/`. [#6225](https://github.com/CesiumGS/cesium/issues/6225)
  修复了 `CESIUM_BASE_URL` 缺少末尾 `/` 时无法正常工作的 Bug。[#6225](https://github.com/CesiumGS/cesium/issues/6225)
- Fixed coloring for polyline entities with a dynamic color for the depth fail material [#6245](https://github.com/CesiumGS/cesium/pull/6245)
  修复了深度测试失败材质（depth fail material）具有动态颜色时折线实体的着色问题。[#6245](https://github.com/CesiumGS/cesium/pull/6245)
- Fixed bug with zooming to dynamic geometry. [#6269](https://github.com/CesiumGS/cesium/issues/6269)
  修复了缩放到动态几何体时的 Bug。[#6269](https://github.com/CesiumGS/cesium/issues/6269)
- Fixed bug where `AxisAlignedBoundingBox` did not copy over center value when cloning an undefined result. [#6183](https://github.com/CesiumGS/cesium/pull/6183)
  修复了克隆未定义结果时 `AxisAlignedBoundingBox` 未复制中心值的 Bug。[#6183](https://github.com/CesiumGS/cesium/pull/6183)
- Fixed a bug where imagery stops loading when changing terrain in request render mode. [#6193](https://github.com/CesiumGS/cesium/issues/6193)
  修复了在显式请求渲染模式下更改地形时影像停止加载的 Bug。[#6193](https://github.com/CesiumGS/cesium/issues/6193)
- Fixed `Resource.fetch` when called with no arguments [#6206](https://github.com/CesiumGS/cesium/issues/6206)
  修复了不带参数调用 `Resource.fetch` 时的 Bug。[#6206](https://github.com/CesiumGS/cesium/issues/6206)
- Fixed `Resource.clone` to clone the `Request` object, so resource can be used in parallel. [#6208](https://github.com/CesiumGS/cesium/issues/6208)
  修复了 `Resource.clone`，以克隆 `Request` 对象，使资源可并行使用。[#6208](https://github.com/CesiumGS/cesium/issues/6208)
- Fixed `Material` so it can now take a `Resource` object as an image. [#6199](https://github.com/CesiumGS/cesium/issues/6199)
  修复了 `Material`，使其现在可以接受 `Resource` 对象作为图像。[#6199](https://github.com/CesiumGS/cesium/issues/6199)
- Fixed an issue causing the Bing Maps key to be sent unnecessarily with every tile request. [#6250](https://github.com/CesiumGS/cesium/pull/6250)
  修复了导致 Bing Maps 密钥在每个瓦片请求中被不必要地发送的问题。[#6250](https://github.com/CesiumGS/cesium/pull/6250)
- Fixed documentation issue for the `Cesium.Math` class. [#6233](https://github.com/CesiumGS/cesium/issues/6233)
  修复了 `Cesium.Math` 类的文档问题。[#6233](https://github.com/CesiumGS/cesium/issues/6233)
- Fixed rendering 3D Tiles as classification volumes. [#6295](https://github.com/CesiumGS/cesium/pull/6295)
  修复了将 3D Tiles 渲染为分类体（classification volumes）时的问题。[#6295](https://github.com/CesiumGS/cesium/pull/6295)

## 1.42.1 - 2018-02-01

\_This is an npm-only release to fix an issue with using Cesium in Node.js.\_\_
_这是一个仅限 npm 的版本，用于修复在 Node.js 中使用 Cesium 的问题。_

- Fixed a bug where Cesium would fail to load under Node.js. [#6177](https://github.com/CesiumGS/cesium/pull/6177)
  修复了 Cesium 在 Node.js 环境下加载失败的 Bug。[#6177](https://github.com/CesiumGS/cesium/pull/6177)

## 1.42 - 2018-02-01

### Highlights :sparkler:

- Added experimental support for [3D Tiles Vector and Geometry data](https://github.com/CesiumGS/3d-tiles/tree/vctr/TileFormats/VectorData). ([#4665](https://github.com/CesiumGS/cesium/pull/4665))
  添加了对 [3D Tiles 矢量和几何体数据](https://github.com/CesiumGS/3d-tiles/tree/vctr/TileFormats/VectorData) 的实验性支持。([#4665](https://github.com/CesiumGS/cesium/pull/4665))
- Added optional mode to reduce CPU usage. See [Improving Performance with Explicit Rendering](https://cesium.com/blog/2018/01/24/cesium-scene-rendering-performance/). ([#6115](https://github.com/CesiumGS/cesium/pull/6115))
  添加了降低 CPU 占用的可选模式。参见 [通过显式渲染提高性能](https://cesium.com/blog/2018/01/24/cesium-scene-rendering-performance/)。([#6115](https://github.com/CesiumGS/cesium/pull/6115))
- Added experimental `CesiumIon` utility class for working with the Cesium ion beta API. [#6136](https://github.com/CesiumGS/cesium/pull/6136)
  添加了用于使用 Cesium ion 测试版 API 的实验性 `CesiumIon` 工具类。[#6136](https://github.com/CesiumGS/cesium/pull/6136)
- Major refactor of URL handling. All classes that take a url parameter, can now take a Resource or a String. This includes all imagery providers, all terrain providers, `Cesium3DTileset`, `KMLDataSource`, `CZMLDataSource`, `GeoJsonDataSource`, `Model`, and `Billboard`.
  重大重构 URL 处理机制。所有接受 url 参数的类现在都可以接受 Resource 或 String。这包括所有影像提供器、所有地形提供器、`Cesium3DTileset`、`KMLDataSource`、`CZMLDataSource`、`GeoJsonDataSource`、`Model` 和 `Billboard`。

### Breaking Changes :mega:

- The clock does not animate by default. Set the `shouldAnimate` option to `true` when creating the Viewer to enable animation.
  时钟默认不再自动运行动画。创建 Viewer 时将 `shouldAnimate` 选项设置为 `true` 以启用动画。

### Deprecated :hourglass_flowing_sand:

- For all classes/functions that can now take a `Resource` instance, all additional parameters that are part of the `Resource` class have been deprecated and will be removed in Cesium 1.44. This generally includes `proxy`, `headers` and `query` parameters.
  对于现在可以接受 `Resource` 实例的所有类/函数，属于 `Resource` 类的所有附加参数已被弃用，并将在 Cesium 1.44 中移除。这通常包括 `proxy`、`headers` 和 `query` 参数。
- All low level load functions including `loadArrayBuffer`, `loadBlob`, `loadImage`, `loadJson`, `loadJsonp`, `loadText`, `loadXML` and `loadWithXhr` have been deprecated and will be removed in Cesium 1.44. Please use the equivalent `fetch` functions on the `Resource` class.
  移除了包括 `loadArrayBuffer`、`loadBlob`、`loadImage`、`loadJson`、`loadJsonp`、`loadText`、`loadXML` 和 `loadWithXhr` 在内的所有底层加载函数已被弃用，并将在 Cesium 1.44 中移除。请改用 `Resource` 类上等效的 `fetch` 函数。

### Additions :tada:

- Added experimental support for [3D Tiles Vector and Geometry data](https://github.com/CesiumGS/3d-tiles/tree/vctr/TileFormats/VectorData) ([#4665](https://github.com/CesiumGS/cesium/pull/4665)). The new and modified Cesium APIs are:
  添加了对 [3D Tiles 矢量和几何体数据](https://github.com/CesiumGS/3d-tiles/tree/vctr/TileFormats/VectorData) 的实验性支持（[#4665](https://github.com/CesiumGS/cesium/pull/4665)）。新增和修改的 Cesium API 包括：
  - `Cesium3DTileStyle` has expanded to include styling point features. See the [styling specification](https://github.com/CesiumGS/3d-tiles/tree/vector-tiles/Styling#vector-data) for details.
    `Cesium3DTileStyle` 已扩展为包括设置点要素样式。详细信息请参阅[样式规范](https://github.com/CesiumGS/3d-tiles/tree/vector-tiles/Styling#vector-data)。
  - `Cesium3DTileFeature` can modify `color` and `show` properties for polygon, polyline, and geometry features.
    `Cesium3DTileFeature` 可以修改多边形、折线和几何体要素的 `color` 和 `show` 属性。
  - `Cesium3DTilePointFeature` can modify the styling options for a point feature.
    `Cesium3DTilePointFeature` 可以修改点要素的样式选项。
- Added optional mode to reduce CPU usage. [#6115](https://github.com/CesiumGS/cesium/pull/6115)
  添加了降低 CPU 占用的可选模式。[#6115](https://github.com/CesiumGS/cesium/pull/6115)
  - `Scene.requestRenderMode` enables a mode which will only request new render frames on changes to the scene, or when the simulation time change exceeds `scene.maximumRenderTimeChange`.
    `Scene.requestRenderMode` 启用一种仅在场景发生更改或模拟时间更改超过 `scene.maximumRenderTimeChange` 时才请求新渲染帧的模式。
  - `Scene.requestRender` will explicitly request a new render frame when in request render mode.
    在请求渲染模式下，`Scene.requestRender` 将显式请求新的渲染帧。
  - Added `Scene.preUpdate` and `Scene.postUpdate` events that are raised before and after the scene updates respectively. The scene is always updated before executing a potential render. Continue to listen to `Scene.preRender` and `Scene.postRender` events for when the scene renders a frame.
    添加了 `Scene.preUpdate` 和 `Scene.postUpdate` 事件，分别在场景更新之前和之后触发。场景始终在执行潜在渲染之前进行更新。继续监听 `Scene.preRender` 和 `Scene.postRender` 事件以获知场景何时渲染一帧。
  - Added `CreditDisplay.update`, which updates the credit display before a new frame is rendered.
    添加了 `CreditDisplay.update`，在渲染新帧之前更新鸣谢信息显示。
  - Added `Globe.imageryLayersUpdatedEvent`, which is raised when an imagery layer is added, shown, hidden, moved, or removed on the globe.
    添加了 `Globe.imageryLayersUpdatedEvent` 事件，在地球上添加、显示、隐藏、移动或移除影像图层时触发。
- Added `Cesium3DTileset.classificationType` to specify if a tileset classifies terrain, another 3D Tiles tileset, or both. This only applies to vector, geometry and batched 3D model tilesets. The limitations on the glTF contained in the b3dm tile are:
  添加了 `Cesium3DTileset.classificationType`，用于指定瓦片集是对地形进行分类、对另一个 3D 瓦片集进行分类还是两者兼有。这仅适用于矢量、几何体和批量 3D 模型（b3dm）瓦片集。b3dm 瓦片中包含的 glTF 限制如下：
  - `POSITION` and `_BATCHID` semantics are required.
    必需包含 `POSITION` 和 `_BATCHID` 语义。
  - All indices with the same batch id must occupy contiguous sections of the index buffer.
    具有相同 batch id 的所有索引必须占据索引缓冲区的连续部分。
  - All shaders and techniques are ignored. The generated shader simply multiplies the position by the model-view-projection matrix.
    所有着色器和 technique 均被忽略。生成的着色器仅将位置与模型-视图-投影矩阵相乘。
  - The only supported extensions are `CESIUM_RTC` and `WEB3D_quantized_attributes`.
    唯一支持的扩展是 `CESIUM_RTC` 和 `WEB3D_quantized_attributes`。
  - Only one node is supported.
    仅支持单个节点。
  - Only one mesh per node is supported.
    每个节点仅支持一个网格（mesh）。
  - Only one primitive per mesh is supported.
    每个网格仅支持一个图元（primitive）。
- Added geometric-error-based point cloud attenuation and eye dome lighting for point clouds using replacement refinement. [#6069](https://github.com/CesiumGS/cesium/pull/6069)
  为使用替换精化（replacement refinement）的点云增加了基于几何误差的点云衰减和眼穹顶照明（eye dome lighting）。[#6069](https://github.com/CesiumGS/cesium/pull/6069)
- Updated `Viewer.zoomTo` and `Viewer.flyTo` to take a `Cesium3DTileset` as a target. [#6104](https://github.com/CesiumGS/cesium/pull/6104)
  更新了 `Viewer.zoomTo` 和 `Viewer.flyTo`，使其能够接受 `Cesium3DTileset` 作为目标。[#6104](https://github.com/CesiumGS/cesium/pull/6104)
- Added `shouldAnimate` option to the `Viewer` constructor to indicate if the clock should begin animating on startup. [#6154](https://github.com/CesiumGS/cesium/pull/6154)
  向 `Viewer` 构造函数添加了 `shouldAnimate` 选项，以指示时钟是否应在启动时开始运行动画。[#6154](https://github.com/CesiumGS/cesium/pull/6154)
- Added `Cesium3DTileset.ellipsoid` determining the size and shape of the globe. This can be set at construction and defaults to a WGS84 ellipsoid.
  添加了 `Cesium3DTileset.ellipsoid`，用于确定地球的大小和形状。可以在构造时设置，默认为 WGS84 椭球体。
- Added `Plane.projectPointOntoPlane` for projecting a `Cartesian3` position onto a `Plane`. [#6092](https://github.com/CesiumGS/cesium/pull/6092)
  添加了 `Plane.projectPointOntoPlane`，用于将 `Cartesian3` 坐标投影到 `Plane` 平面上。[#6092](https://github.com/CesiumGS/cesium/pull/6092)
- Added `Cartesian3.projectVector` for projecting one vector to another. [#6093](https://github.com/CesiumGS/cesium/pull/6093)
  添加了 `Cartesian3.projectVector`，用于将一个向量投影到另一个向量。[#6093](https://github.com/CesiumGS/cesium/pull/6093)
- Added `Cesium3DTileset.tileFailed` event that will be raised when a tile fails to load. The object passed to the event listener will have a url and message property. If there are no event listeners, error messages will be logged to the console. [#6088](https://github.com/CesiumGS/cesium/pull/6088)
  添加了 `Cesium3DTileset.tileFailed` 事件，当瓦片加载失败时触发。传递给事件监听器的对象将具有 url 和 message 属性。若未添加事件监听器，错误消息将记录到控制台。[#6088](https://github.com/CesiumGS/cesium/pull/6088)
- Added `AttributeCompression.zigZagDeltaDecode` which will decode delta and ZigZag encoded buffers in place.
  添加了 `AttributeCompression.zigZagDeltaDecode`，用于原地解码 delta 和 ZigZag 编码的缓冲区。
- Added `pack` and `unpack` functions to `OrientedBoundingBox` for packing to and unpacking from a flat buffer.
  向 `OrientedBoundingBox` 添加了 `pack` 和 `unpack` 函数，用于与扁平缓冲区进行打包和解包。
- Added support for vertex shader uniforms when `tileset.colorBlendMode` is `MIX` or `REPLACE`. [#5874](https://github.com/CesiumGS/cesium/pull/5874)
  当 `tileset.colorBlendMode` 为 `MIX` 或 `REPLACE` 时，增加了对顶点着色器 uniform 的支持。[#5874](https://github.com/CesiumGS/cesium/pull/5874)
- Added `ClippingPlaneCollection.isSupported` function for checking if rendering with clipping planes is supported.[#6084](https://github.com/CesiumGS/cesium/pull/6084)
  添加了 `ClippingPlaneCollection.isSupported` 函数，用于检查是否支持使用裁剪平面进行渲染。[#6084](https://github.com/CesiumGS/cesium/pull/6084)
- Added `Cartographic.toCartesian` to convert from `Cartographic` to `Cartesian3`. [#6163](https://github.com/CesiumGS/cesium/pull/6163)
  添加了 `Cartographic.toCartesian`，用于从 `Cartographic` 转换为 `Cartesian3`。[#6163](https://github.com/CesiumGS/cesium/pull/6163)
- Added `BoundingSphere.volume` for computing the volume of a `BoundingSphere`. [#6069](https://github.com/CesiumGS/cesium/pull/6069)
  添加了 `BoundingSphere.volume`，用于计算 `BoundingSphere` 的体积。[#6069](https://github.com/CesiumGS/cesium/pull/6069)
- Added new file for the Cesium [Code of Conduct](https://github.com/CesiumGS/cesium/blob/main/CODE_OF_CONDUCT.md). [#6129](https://github.com/CesiumGS/cesium/pull/6129)
  为 Cesium [行为准则](https://github.com/CesiumGS/cesium/blob/main/CODE_OF_CONDUCT.md) 添加了新文件。[#6129](https://github.com/CesiumGS/cesium/pull/6129)

### Fixes :wrench:

- Fixed a bug that could cause tiles to be missing from the globe surface, especially when starting with the camera zoomed close to the surface. [#4969](https://github.com/CesiumGS/cesium/pull/4969)
  修复了可能导致地球表面瓦片缺失的 Bug，尤其是当相机起始位置缩放到靠近地表时。[#4969](https://github.com/CesiumGS/cesium/pull/4969)
- Fixed applying a translucent style to a point cloud tileset. [#6113](https://github.com/CesiumGS/cesium/pull/6113)
  修复了将半透明样式应用于点云瓦片集的问题。[#6113](https://github.com/CesiumGS/cesium/pull/6113)
- Fixed Sandcastle error in IE 11. [#6169](https://github.com/CesiumGS/cesium/pull/6169)
  修复了 IE 11 中的 Sandcastle 错误。[#6169](https://github.com/CesiumGS/cesium/pull/6169)
- Fixed a glTF animation bug that caused certain animations to jitter. [#5740](https://github.com/CesiumGS/cesium/pull/5740)
  修复了导致某些 glTF 动画出现抖动的 Bug。[#5740](https://github.com/CesiumGS/cesium/pull/5740)
- Fixed a bug when creating billboard and model entities without a globe. [#6109](https://github.com/CesiumGS/cesium/pull/6109)
  修复了在没有地球的情况下创建广告牌和模型实体时的 Bug。[#6109](https://github.com/CesiumGS/cesium/pull/6109)
- Improved CZML Custom Properties Sandcastle example. [#6086](https://github.com/CesiumGS/cesium/pull/6086)
  改进了 CZML 自定义属性 Sandcastle 示例。[#6086](https://github.com/CesiumGS/cesium/pull/6086)
- Improved Particle System Sandcastle example for better visual. [#6132](https://github.com/CesiumGS/cesium/pull/6132)
  改进了粒子系统 Sandcastle 示例以获得更好的视觉效果。[#6132](https://github.com/CesiumGS/cesium/pull/6132)
- Fixed behavior of `Camera.move*` and `Camera.look*` functions in 2D mode. [#5884](https://github.com/CesiumGS/cesium/issues/5884)
  修复了 2D 模式下 `Camera.move*` 和 `Camera.look*` 函数的行为。[#5884](https://github.com/CesiumGS/cesium/issues/5884)
- Fixed `Camera.moveStart` and `Camera.moveEnd` events not being raised when camera is close to the ground. [#4753](https://github.com/CesiumGS/cesium/issues/4753)
  修复了当相机靠近地面时未引发 `Camera.moveStart` 和 `Camera.moveEnd` 事件的问题。[#4753](https://github.com/CesiumGS/cesium/issues/4753)
- Fixed `OrientedBoundingBox` documentation. [#6147](https://github.com/CesiumGS/cesium/pull/6147)
  修复了 `OrientedBoundingBox` 文档。[#6147](https://github.com/CesiumGS/cesium/pull/6147)
- Updated documentation links to reflect new locations on `https://cesiumjs.org` and `https://cesium.com`.
  更新了文档链接以反映 `https://cesiumjs.org` 和 `https://cesium.com` 上的新位置。

## 1.41 - 2018-01-02

- Breaking changes
  破坏性变更
  - Removed the `text`, `imageUrl`, and `link` parameters from `Credit`, which were deprecated in Cesium 1.40. Use `options.text`, `options.imageUrl`, and `options.link` instead.
    从 `Credit` 中移除了在 Cesium 1.40 中弃用的 `text`、`imageUrl` 和 `link` 参数。请改用 `options.text`、`options.imageUrl` 和 `options.link`。
- Added support for clipping planes. [#5913](https://github.com/CesiumGS/cesium/pull/5913), [#5996](https://github.com/CesiumGS/cesium/pull/5996)
  添加了对裁剪平面（clipping planes）的支持。[#5913](https://github.com/CesiumGS/cesium/pull/5913), [#5996](https://github.com/CesiumGS/cesium/pull/5996)
  - Added `clippingPlanes` property to `ModelGraphics`, `Model`, `Cesium3DTileset`, and `Globe`, which specifies a `ClippingPlaneCollection` to selectively disable rendering.
    向 `ModelGraphics`、`Model`、`Cesium3DTileset` 和 `Globe` 添加了 `clippingPlanes` 属性，用于指定一个 `ClippingPlaneCollection` 以选择性地禁用渲染。
  - Added `PlaneGeometry`, `PlaneOutlineGeometry`, `PlaneGeometryUpdater`, `PlaneOutlineGeometryUpdater`, `PlaneGraphics`, and `Entity.plane` to visualize planes.
    添加了 `PlaneGeometry`、`PlaneOutlineGeometry`、`PlaneGeometryUpdater`、`PlaneOutlineGeometryUpdater`、`PlaneGraphics` 和 `Entity.plane` 以可视化平面。
  - Added `Plane.transformPlane` to apply a transformation to a plane.
    添加了 `Plane.transformPlane` 以对平面应用变换。
- Fixed point cloud exception in IE. [#6051](https://github.com/CesiumGS/cesium/pull/6051)
  修复了 IE 浏览器中点云抛出异常的问题。[#6051](https://github.com/CesiumGS/cesium/pull/6051)
- Fixed globe materials when `Globe.enableLighting` was `false`. [#6042](https://github.com/CesiumGS/cesium/issues/6042)
  修复了当 `Globe.enableLighting` 为 `false` 时的地球材质问题。[#6042](https://github.com/CesiumGS/cesium/issues/6042)
- Fixed shader compilation failure on pick when globe materials were enabled. [#6039](https://github.com/CesiumGS/cesium/issues/6039)
  修复了启用地球材质时拾取操作发生着色器编译失败的问题。[#6039](https://github.com/CesiumGS/cesium/issues/6039)
- Fixed exception when `invertClassification` was enabled, the invert color had an alpha less than `1.0`, and the window was resized. [#6046](https://github.com/CesiumGS/cesium/issues/6046)
  修复了启用 `invertClassification`、反转颜色 alpha 小于 `1.0` 且调整窗口大小时发生异常的问题。[#6046](https://github.com/CesiumGS/cesium/issues/6046)

## 1.40 - 2017-12-01

- Deprecated
  弃用
  - The `text`, `imageUrl` and `link` parameters from `Credit` have been deprecated and will be removed in Cesium 1.41. Use `options.text`, `options.imageUrl` and `options.link` instead.
    `Credit` 中的 `text`、`imageUrl` 和 `link` 参数已被弃用，并将在 Cesium 1.41 中移除。请改用 `options.text`、`options.imageUrl` 和 `options.link`。
- Added `Globe.material` to apply materials to the globe/terrain for shading such as height- or slope-based color ramps. See the new [Sandcastle example](https://cesiumjs.org/Cesium/Apps/Sandcastle/?src=Globe%20Materials.html&label=Showcases). [#5919](https://github.com/CesiumGS/cesium/pull/5919/files)
  添加了 `Globe.material` 用于将材质应用于地球/地形以进行着色，例如基于高度或坡度的颜色渐变带。请参阅新的 [Sandcastle 示例](https://cesiumjs.org/Cesium/Apps/Sandcastle/?src=Globe%20Materials.html&label=Showcases)。[#5919](https://github.com/CesiumGS/cesium/pull/5919/files)
- Added CZML support for `polyline.depthFailMaterial`, `label.scaleByDistance`, `distanceDisplayCondition`, and `disableDepthTestDistance`. [#5986](https://github.com/CesiumGS/cesium/pull/5986)
  添加了 CZML 对 `polyline.depthFailMaterial`、`label.scaleByDistance`、`distanceDisplayCondition` 和 `disableDepthTestDistance` 的支持。[#5986](https://github.com/CesiumGS/cesium/pull/5986)
- Fixed a bug where drill picking a polygon clamped to ground would cause the browser to hang. [#5971](https://github.com/CesiumGS/cesium/issues/5971)
  修复了穿透拾取（drill pick）贴地多边形会导致浏览器卡死的问题。[#5971](https://github.com/CesiumGS/cesium/issues/5971)
- Fixed bug in KML LookAt bug where degrees and radians were mixing in a subtraction. [#5992](https://github.com/CesiumGS/cesium/issues/5992)
  修复了 KML LookAt 中度数和弧度在减法运算中混用的错误。[#5992](https://github.com/CesiumGS/cesium/issues/5992)
- Fixed handling of KMZ files with missing `xsi` namespace declarations. [#6003](https://github.com/CesiumGS/cesium/pull/6003)
  修复了缺少 `xsi` 命名空间声明的 KMZ 文件的处理问题。[#6003](https://github.com/CesiumGS/cesium/pull/6003)
- Added function that removes duplicate namespace declarations while loading a KML or a KMZ. [#5972](https://github.com/CesiumGS/cesium/pull/5972)
  添加了在加载 KML 或 KMZ 时移除重复命名空间声明的功能。[#5972](https://github.com/CesiumGS/cesium/pull/5972)
- Fixed a language detection issue. [#6016](https://github.com/CesiumGS/cesium/pull/6016)
  修复了语言检测问题。[#6016](https://github.com/CesiumGS/cesium/pull/6016)
- Fixed a bug where glTF models with animations of different lengths would cause an error. [#5694](https://github.com/CesiumGS/cesium/issues/5694)
  修复了带有不同长度动画的 glTF 模型会导致错误的问题。[#5694](https://github.com/CesiumGS/cesium/issues/5694)
- Added a `clampAnimations` parameter to `Model` and `Entity.model`. Setting this to `false` allows different length animations to loop asynchronously over the duration of the longest animation.
  向 `Model` 和 `Entity.model` 添加了 `clampAnimations` 参数。将其设置为 `false` 允许不同长度的动画在最长动画的持续时间内异步循环播放。
- Fixed `Invalid asm.js: Invalid member of stdlib` console error by recompiling crunch.js with latest emscripten toolchain. [#5847](https://github.com/CesiumGS/cesium/issues/5847)
  通过使用最新的 emscripten 工具链重新编译 crunch.js，修复了控制台报错 `Invalid asm.js: Invalid member of stdlib` 的问题。[#5847](https://github.com/CesiumGS/cesium/issues/5847)
- Added `file:` scheme compatibility to `joinUrls`. [#5989](https://github.com/CesiumGS/cesium/pull/5989)
  向 `joinUrls` 添加了对 `file:` 协议的支持。[#5989](https://github.com/CesiumGS/cesium/pull/5989)
- Added a Reverse Geocoder [Sandcastle example](https://cesiumjs.org/Cesium/Apps/Sandcastle/?src=Reverse%20Geocoder.html&label=Showcases). [#5976](https://github.com/CesiumGS/cesium/pull/5976)
  添加了反向地理编码器 [Sandcastle 示例](https://cesiumjs.org/Cesium/Apps/Sandcastle/?src=Reverse%20Geocoder.html&label=Showcases)。[#5976](https://github.com/CesiumGS/cesium/pull/5976)
- Added ability to support touch event in Imagery Layers Split Sandcastle example. [#5948](https://github.com/CesiumGS/cesium/pull/5948)
  在影像图层卷帘（Imagery Layers Split）Sandcastle 示例中添加了触摸事件支持。[#5948](https://github.com/CesiumGS/cesium/pull/5948)
- Added a new `@experimental` tag to the documentation. A small subset of the Cesium API tagged as such are subject to breaking changes without deprecation. See the [Coding Guide](https://github.com/CesiumGS/cesium/tree/main/Documentation/Contributors/CodingGuide#deprecation-and-breaking-changes) for further explanation. [#6010](https://github.com/CesiumGS/cesium/pull/6010)
  在文档中添加了新的 `@experimental` 标签。以此标记的 Cesium API 的一小部分可能会发生破坏性变更而无需经历弃用流程。有关更多说明，请参阅[编码指南](https://github.com/CesiumGS/cesium/tree/main/Documentation/Contributors/CodingGuide#deprecation-and-breaking-changes)。[#6010](https://github.com/CesiumGS/cesium/pull/6010)
- Moved terrain and imagery credits to a lightbox that pops up when you click a link in the onscreen credits [#3013](https://github.com/CesiumGS/cesium/issues/3013)
  将地形和影像版权信息（credits）移动到点击屏幕版权链接时弹出的灯箱中。[#3013](https://github.com/CesiumGS/cesium/issues/3013)

## 1.39 - 2017-11-01

- Cesium now officially supports webpack. See our [Integrating Cesium and webpack blog post](https://cesium.com/blog/2017/10/18/cesium-and-webpack/) for more details.
  Cesium 现已正式支持 webpack。有关更多详细信息，请参阅我们的[集成 Cesium 和 webpack 博文](https://cesium.com/blog/2017/10/18/cesium-and-webpack/)。
- Added support for right-to-left language detection in labels, currently Hebrew and Arabic are supported. To enable it, set `Cesium.Label.enableRightToLeftDetection = true` at the start of your application. [#5771](https://github.com/CesiumGS/cesium/pull/5771)
  添加了对标签中从右到左（RTL）书写语言检测的支持，目前支持希伯来语和阿拉伯语。要启用此功能，请在应用程序启动时设置 `Cesium.Label.enableRightToLeftDetection = true`。[#5771](https://github.com/CesiumGS/cesium/pull/5771)
- Fixed handling of KML files with missing `xsi` namespace declarations. [#5860](https://github.com/CesiumGS/cesium/pull/5860)
  修复了缺少 `xsi` 命名空间声明的 KML 文件的处理问题。[#5860](https://github.com/CesiumGS/cesium/pull/5860)
- Fixed a bug that caused KML ground overlays to appear distorted when rotation was applied. [#5914](https://github.com/CesiumGS/cesium/issues/5914)
  修复了应用旋转时导致 KML 地面包叠层显示失真的问题。[#5914](https://github.com/CesiumGS/cesium/issues/5914)
- Fixed a bug where KML placemarks with no specified icon would be displayed with default icon. [#5819](https://github.com/CesiumGS/cesium/issues/5819)
  修复了未指定图标的 KML 地标会使用默认图标显示的问题。[#5819](https://github.com/CesiumGS/cesium/issues/5819)
- Changed KML loading to ignore NetworkLink failures and continue to load the rest of the document. [#5871](https://github.com/CesiumGS/cesium/pull/5871)
  修改了 KML 加载逻辑以忽略 NetworkLink 失败并继续加载文档的其余部分。[#5871](https://github.com/CesiumGS/cesium/pull/5871)
- Added the ability to load Cesium's assets from the local file system if security permissions allow it. [#5830](https://github.com/CesiumGS/cesium/issues/5830)
  添加了在安全权限允许的情况下从本地文件系统加载 Cesium 资源的功能。[#5830](https://github.com/CesiumGS/cesium/issues/5830)
- Added two new properties to `ImageryLayer` that allow for adjusting the texture sampler used for up and down-sampling of imagery tiles, namely `minificationFilter` and `magnificationFilter` with possible values `LINEAR` (the default) and `NEAREST` defined in `TextureMinificationFilter` and `TextureMagnificationFilter`. [#5846](https://github.com/CesiumGS/cesium/issues/5846)
  向 `ImageryLayer` 添加了两个新属性，允许调整用于影像瓦片向上和向下采样的纹理采样器，即 `minificationFilter` 和 `magnificationFilter`，可选值为 `TextureMinificationFilter` 和 `TextureMagnificationFilter` 中定义的 `LINEAR`（默认值）和 `NEAREST`。[#5846](https://github.com/CesiumGS/cesium/issues/5846)
- Fixed flickering artifacts with 3D Tiles tilesets with thin walls. [#5940](https://github.com/CesiumGS/cesium/pull/5940)
  修复了带有薄墙的 3D Tiles 瓦片集的闪烁伪影问题。[#5940](https://github.com/CesiumGS/cesium/pull/5940)
- Fixed bright fog when terrain lighting is enabled and added `Fog.minimumBrightness` to affect how bright the fog will be when in complete darkness. [#5934](https://github.com/CesiumGS/cesium/pull/5934)
  修复了启用地形光照时的过亮雾效，并添加了 `Fog.minimumBrightness` 以影响在完全黑暗时雾的亮度。[#5934](https://github.com/CesiumGS/cesium/pull/5934)
- Fixed using arrow keys in geocoder widget to select search suggestions. [#5943](https://github.com/CesiumGS/cesium/issues/5943)
  修复了在地理编码器组件中使用方向键选择搜索建议的问题。[#5943](https://github.com/CesiumGS/cesium/issues/5943)
- Added support for the layer.json `parentUrl` property in `CesiumTerrainProvider` to allow for compositing of tilesets. [#5864](https://github.com/CesiumGS/cesium/pull/5864)
  在 `CesiumTerrainProvider` 中添加了对 layer.json 中 `parentUrl` 属性的支持，以允许瓦片集的组合。[#5864](https://github.com/CesiumGS/cesium/pull/5864)
- Added `invertClassification` and `invertClassificationColor` to `Scene`. When `invertClassification` is `true`, any 3D Tiles geometry that is not classified by a `ClassificationPrimitive` or `GroundPrimitive` will have its color multiplied by `invertClassificationColor`. [#5836](https://github.com/CesiumGS/cesium/pull/5836)
  向 `Scene` 添加了 `invertClassification` 和 `invertClassificationColor`。当 `invertClassification` 为 `true` 时，未被 `ClassificationPrimitive` 或 `GroundPrimitive` 分类的任何 3D Tiles 几何体的颜色都将乘以 `invertClassificationColor`。[#5836](https://github.com/CesiumGS/cesium/pull/5836)
- Added `customTags` property to the UrlTemplateImageryProvider to allow custom keywords in the template URL. [#5696](https://github.com/CesiumGS/cesium/pull/5696)
  向 UrlTemplateImageryProvider 添加了 `customTags` 属性，以允许模板 URL 中包含自定义关键字。[#5696](https://github.com/CesiumGS/cesium/pull/5696)
- Added `eyeSeparation` and `focalLength` properties to `Scene` to configure VR settings. [#5917](https://github.com/CesiumGS/cesium/pull/5917)
  向 `Scene` 添加了 `eyeSeparation` 和 `focalLength` 属性以配置 VR 设置。[#5917](https://github.com/CesiumGS/cesium/pull/5917)
- Improved CZML Reference Properties example [#5754](https://github.com/CesiumGS/cesium/pull/5754)
  改进了 CZML 引用属性示例。[#5754](https://github.com/CesiumGS/cesium/pull/5754)

## 1.38 - 2017-10-02

- Breaking changes
  破坏性变更
  - `Scene/CullingVolume` has been removed. Use `Core/CullingVolume`.
    `Scene/CullingVolume` 已被移除。请改用 `Core/CullingVolume`。
  - `Scene/OrthographicFrustum` has been removed. Use `Core/OrthographicFrustum`.
    `Scene/OrthographicFrustum` 已被移除。请改用 `Core/OrthographicFrustum`。
  - `Scene/OrthographicOffCenterFrustum` has been removed. Use `Core/OrthographicOffCenterFrustum`.
    `Scene/OrthographicOffCenterFrustum` 已被移除。请改用 `Core/OrthographicOffCenterFrustum`。
  - `Scene/PerspectiveFrustum` has been removed. Use `Core/PerspectiveFrustum`.
    `Scene/PerspectiveFrustum` 已被移除。请改用 `Core/PerspectiveFrustum`。
  - `Scene/PerspectiveOffCenterFrustum` has been removed. Use `Core/PerspectiveOffCenterFrustum`.
    `Scene/PerspectiveOffCenterFrustum` 已被移除。请改用 `Core/PerspectiveOffCenterFrustum`。
- Added support in CZML for expressing `orientation` as the velocity vector of an entity, using `velocityReference` syntax. [#5807](https://github.com/CesiumGS/cesium/pull/5807)
  在 CZML 中添加了使用 `velocityReference` 语法将实体的速度向量表示为 `orientation` 的支持。[#5807](https://github.com/CesiumGS/cesium/pull/5807)
- Fixed CZML processing of `velocityReference` within an interval. [#5738](https://github.com/CesiumGS/cesium/issues/5738)
  修复了在时间区间（interval）内处理 `velocityReference` 的 CZML 问题。[#5738](https://github.com/CesiumGS/cesium/issues/5738)
- Added ability to add an animation to `ModelAnimationCollection` by its index. [#5815](https://github.com/CesiumGS/cesium/pull/5815)
  添加了按索引向 `ModelAnimationCollection` 添加动画的功能。[#5815](https://github.com/CesiumGS/cesium/pull/5815)
- Fixed a bug in `ModelAnimationCollection` that caused adding an animation by its name to throw an error. [#5815](https://github.com/CesiumGS/cesium/pull/5815)
  修复了 `ModelAnimationCollection` 中通过名称添加动画会抛出错误的 bug。[#5815](https://github.com/CesiumGS/cesium/pull/5815)
- Fixed issue in Internet Explorer and Edge with loading unicode strings in typed arrays that impacted 3D Tiles Batch Table values.
  修复了 Internet Explorer 和 Edge 中在类型化数组加载 Unicode 字符串影响 3D Tiles 批次表（Batch Table）值的问题。
- Zoom now maintains camera heading, pitch, and roll. [#4639](https://github.com/CesiumGS/cesium/pull/5603)
  缩放操作现在会保持相机的偏航角（heading）、俯仰角（pitch）和翻滚角（roll）。[#4639](https://github.com/CesiumGS/cesium/pull/5603)
- Fixed a bug in `PolylineCollection` preventing the display of more than 16K points in a single collection. [#5538](https://github.com/CesiumGS/cesium/pull/5782)
  修复了 `PolylineCollection` 中阻止在单个集合中显示超过 16K 个点的 bug。[#5538](https://github.com/CesiumGS/cesium/pull/5782)
- Fixed a 3D Tiles point cloud bug causing a stray point to appear at the center of the screen on certain hardware. [#5599](https://github.com/CesiumGS/cesium/issues/5599)
  修复了 3D Tiles 点云在某些硬件上导致屏幕中心出现杂散点的 bug。[#5599](https://github.com/CesiumGS/cesium/issues/5599)
- Fixed removing multiple event listeners within event callbacks. [#5827](https://github.com/CesiumGS/cesium/issues/5827)
  修复了在事件回调内移除多个事件监听器的问题。[#5827](https://github.com/CesiumGS/cesium/issues/5827)
- Running `buildApps` now creates a built version of Sandcastle which uses the built version of Cesium for better performance.
  运行 `buildApps` 现在会创建构建版 Sandcastle，该版本使用构建版 Cesium 以获得更好的性能。
- Fixed a tileset traversal bug when the `skipLevelOfDetail` optimization is off. [#5869](https://github.com/CesiumGS/cesium/issues/5869)
  修复了当 `skipLevelOfDetail` 优化关闭时的瓦片集遍历 bug。[#5869](https://github.com/CesiumGS/cesium/issues/5869)

## 1.37 - 2017-09-01

- Breaking changes
  破坏性变更
  - Passing `options.clock` when creating a new `Viewer` instance is removed, pass `options.clockViewModel` instead.
    移除了创建新 `Viewer` 实例时传递 `options.clock` 的支持，请改用 `options.clockViewModel`。
  - Removed `GoogleEarthImageryProvider`, use `GoogleEarthEnterpriseMapsProvider` instead.
    移除了 `GoogleEarthImageryProvider`，请改用 `GoogleEarthEnterpriseMapsProvider`。
  - Removed the `throttleRequest` parameter from `TerrainProvider.requestTileGeometry` and inherited terrain providers. It is replaced with an optional `Request` object. Set the request's `throttle` property to `true` to throttle requests.
    从 `TerrainProvider.requestTileGeometry` 及继承的地形提供器中移除了 `throttleRequest` 参数。它被替换为可选的 `Request` 对象。将请求的 `throttle` 属性设置为 `true` 可节流请求。
  - Removed the ability to provide a Promise for the `options.url` parameter of `loadWithXhr` and for the `url` parameter of `loadArrayBuffer`, `loadBlob`, `loadImageViaBlob`, `loadText`, `loadJson`, `loadXML`, `loadImage`, `loadCRN`, `loadKTX`, and `loadCubeMap`. Instead `url` must be a string.
    移除了为 `loadWithXhr` 的 `options.url` 参数以及 `loadArrayBuffer`、`loadBlob`、`loadImageViaBlob`、`loadText`、`loadJson`、`loadXML`、`loadImage`、`loadCRN`、`loadKTX` 和 `loadCubeMap` 的 `url` 参数提供 Promise 的能力。现在 `url` 必须是字符串。
- Added `classificationType` to `ClassificationPrimitive` and `GroundPrimitive` to choose whether terrain, 3D Tiles, or both are classified. [#5770](https://github.com/CesiumGS/cesium/pull/5770)
  向 `ClassificationPrimitive` 和 `GroundPrimitive` 添加了 `classificationType`，用于选择是对地形、3D Tiles 还是两者都进行分类。[#5770](https://github.com/CesiumGS/cesium/pull/5770)
- Fixed depth picking on 3D Tiles. [#5676](https://github.com/CesiumGS/cesium/issues/5676)
  修复了 3D Tiles 上的深度拾取问题。[#5676](https://github.com/CesiumGS/cesium/issues/5676)
- Fixed glTF model translucency bug. [#5731](https://github.com/CesiumGS/cesium/issues/5731)
  修复了 glTF 模型半透明问题。[#5731](https://github.com/CesiumGS/cesium/issues/5731)
- Fixed `replaceState` bug that was causing the `CesiumViewer` demo application to crash in Safari and iOS. [#5691](https://github.com/CesiumGS/cesium/issues/5691)
  修复了导致 `CesiumViewer` 演示应用程序在 Safari 和 iOS 中崩溃的 `replaceState` bug。[#5691](https://github.com/CesiumGS/cesium/issues/5691)
- Fixed a 3D Tiles traversal bug for tilesets using additive refinement. [#5766](https://github.com/CesiumGS/cesium/issues/5766)
  修复了使用累加细分（additive refinement）的瓦片集的 3D Tiles 遍历 bug。[#5766](https://github.com/CesiumGS/cesium/issues/5766)
- Fixed a 3D Tiles traversal bug where out-of-view children were being loaded unnecessarily. [#5477](https://github.com/CesiumGS/cesium/issues/5477)
  修复了不必要地加载视野外子瓦片的 3D Tiles 遍历 bug。[#5477](https://github.com/CesiumGS/cesium/issues/5477)
- Fixed `Entity` id type to be `String` in `EntityCollection` and `CompositeEntityCollection` [#5791](https://github.com/CesiumGS/cesium/pull/5791)
  修复了 `EntityCollection` 和 `CompositeEntityCollection` 中 `Entity` 的 id 类型为 `String` 的问题。[#5791](https://github.com/CesiumGS/cesium/pull/5791)
- Fixed issue where `Model` and `BillboardCollection` would throw an error if the globe is undefined. [#5638](https://github.com/CesiumGS/cesium/issues/5638)
  修复了如果地球为 undefined 时 `Model` 和 `BillboardCollection` 会抛出错误的问题。[#5638](https://github.com/CesiumGS/cesium/issues/5638)
- Fixed issue where the `Model` glTF cache loses reference to the model's buffer data. [#5720](https://github.com/CesiumGS/cesium/issues/5720)
  修复了 `Model` glTF 缓存丢失对模型缓冲区数据的引用的问题。[#5720](https://github.com/CesiumGS/cesium/issues/5720)
- Fixed some issues with `disableDepthTestDistance`. [#5501](https://github.com/CesiumGS/cesium/issues/5501) [#5331](https://github.com/CesiumGS/cesium/issues/5331) [#5621](https://github.com/CesiumGS/cesium/issues/5621)
  修复了有关 `disableDepthTestDistance` 的一些问题。[#5501](https://github.com/CesiumGS/cesium/issues/5501) [#5331](https://github.com/CesiumGS/cesium/issues/5331) [#5621](https://github.com/CesiumGS/cesium/issues/5621)
- Added several new Bing Maps styles: `CANVAS_DARK`, `CANVAS_LIGHT`, and `CANVAS_GRAY`. [#5737](https://github.com/CesiumGS/cesium/pull/5737)
  添加了若干新的 Bing Maps 样式：`CANVAS_DARK`、`CANVAS_LIGHT` 和 `CANVAS_GRAY`。[#5737](https://github.com/CesiumGS/cesium/pull/5737)
- Added small improvements to the atmosphere. [#5741](https://github.com/CesiumGS/cesium/pull/5741)
  对大气层进行了微小改进。[#5741](https://github.com/CesiumGS/cesium/pull/5741)
- Fixed a bug that caused imagery splitting to work incorrectly when CSS pixels were not equivalent to WebGL drawing buffer pixels, such as on high DPI displays in Microsoft Edge and Internet Explorer. [#5743](https://github.com/CesiumGS/cesium/pull/5743)
  修复了当 CSS 像素与 WebGL 绘图缓冲区像素不相等时（例如在 Microsoft Edge 和 Internet Explorer 中的高 DPI 显示器上）导致影像卷帘工作不正常的 bug。[#5743](https://github.com/CesiumGS/cesium/pull/5743)
- Added `Cesium3DTileset.loadJson` to support overriding the default tileset loading behavior. [#5685](https://github.com/CesiumGS/cesium/pull/5685)
  添加了 `Cesium3DTileset.loadJson` 以支持覆盖默认的瓦片集加载行为。[#5685](https://github.com/CesiumGS/cesium/pull/5685)
- Fixed loading of binary glTFs containing CRN or KTX textures. [#5753](https://github.com/CesiumGS/cesium/pull/5753)
  修复了包含 CRN 或 KTX 纹理的二进制 glTF 文件的加载问题。[#5753](https://github.com/CesiumGS/cesium/pull/5753)
- Fixed specular computation for certain models using the `KHR_materials_common` extension. [#5773](https://github.com/CesiumGS/cesium/pull/5773)
  修复了使用 `KHR_materials_common` 扩展的某些模型的高光计算问题。[#5773](https://github.com/CesiumGS/cesium/pull/5773)
- Fixed a picking bug in the `3D Tiles Interactivity` Sandcastle demo. [#5703](https://github.com/CesiumGS/cesium/issues/5703)
  修复了 `3D Tiles Interactivity` Sandcastle 演示中的拾取 bug。[#5703](https://github.com/CesiumGS/cesium/issues/5703)
- Updated knockout from 3.4.0 to 3.4.2 [#5703](https://github.com/CesiumGS/cesium/pull/5829)
  将 knockout 从 3.4.0 更新到 3.4.2。[#5703](https://github.com/CesiumGS/cesium/pull/5829)

## 1.36 - 2017-08-01

- Breaking changes
  破坏性变更
  - The function `Quaternion.fromHeadingPitchRoll(heading, pitch, roll, result)` was removed. Use `Quaternion.fromHeadingPitchRoll(hpr, result)` instead where `hpr` is a `HeadingPitchRoll`.
    移除了函数 `Quaternion.fromHeadingPitchRoll(heading, pitch, roll, result)`。请改用 `Quaternion.fromHeadingPitchRoll(hpr, result)`，其中 `hpr` 为 `HeadingPitchRoll`。
  - The function `Transforms.headingPitchRollToFixedFrame(origin, headingPitchRoll, ellipsoid, result)` was removed. Use `Transforms.headingPitchRollToFixedFrame(origin, headingPitchRoll, ellipsoid, fixedFrameTransform, result)` instead where `fixedFrameTransform` is a a 4x4 transformation matrix (see `Transforms.localFrameToFixedFrameGenerator`).
    移除了函数 `Transforms.headingPitchRollToFixedFrame(origin, headingPitchRoll, ellipsoid, result)`。请改用 `Transforms.headingPitchRollToFixedFrame(origin, headingPitchRoll, ellipsoid, fixedFrameTransform, result)`，其中 `fixedFrameTransform` 为 4x4 变换矩阵（参见 `Transforms.localFrameToFixedFrameGenerator`）。
  - The function `Transforms.headingPitchRollQuaternion(origin, headingPitchRoll, ellipsoid, result)` was removed. Use `Transforms.headingPitchRollQuaternion(origin, headingPitchRoll, ellipsoid, fixedFrameTransform, result)` instead where `fixedFrameTransform` is a a 4x4 transformation matrix (see `Transforms.localFrameToFixedFrameGenerator`).
    移除了函数 `Transforms.headingPitchRollQuaternion(origin, headingPitchRoll, ellipsoid, result)`。请改用 `Transforms.headingPitchRollQuaternion(origin, headingPitchRoll, ellipsoid, fixedFrameTransform, result)`，其中 `fixedFrameTransform` 为 4x4 变换矩阵（参见 `Transforms.localFrameToFixedFrameGenerator`）。
  - The `color`, `show`, and `pointSize` properties of `Cesium3DTileStyle` are no longer initialized with default values.
    `Cesium3DTileStyle` 的 `color`、`show` 和 `pointSize` 属性不再使用默认值初始化。
- Deprecated
  弃用
  - `Scene/CullingVolume` is deprecated and will be removed in 1.38. Use `Core/CullingVolume`.
    `Scene/CullingVolume` 已弃用并将在 1.38 中移除。请改用 `Core/CullingVolume`。
  - `Scene/OrthographicFrustum` is deprecated and will be removed in 1.38. Use `Core/OrthographicFrustum`.
    `Scene/OrthographicFrustum` 已弃用并将在 1.38 中移除。请改用 `Core/OrthographicFrustum`。
  - `Scene/OrthographicOffCenterFrustum` is deprecated and will be removed in 1.38. Use `Core/OrthographicOffCenterFrustum`.
    `Scene/OrthographicOffCenterFrustum` 已弃用并将在 1.38 中移除。请改用 `Core/OrthographicOffCenterFrustum`。
  - `Scene/PerspectiveFrustum` is deprecated and will be removed in 1.38. Use `Core/PerspectiveFrustum`.
    `Scene/PerspectiveFrustum` 已弃用并将在 1.38 中移除。请改用 `Core/PerspectiveFrustum`。
  - `Scene/PerspectiveOffCenterFrustum` is deprecated and will be removed in 1.38. Use `Core/PerspectiveOffCenterFrustum`.
    `Scene/PerspectiveOffCenterFrustum` 已弃用并将在 1.38 中移除。请改用 `Core/PerspectiveOffCenterFrustum`。
- Added glTF 2.0 support, including physically-based material rendering, morph targets, and appropriate updating of glTF 1.0 models to 2.0. [#5641](https://github.com/CesiumGS/cesium/pull/5641)
  添加了对 glTF 2.0 的支持，包括基于物理的材质渲染（PBR）、变形目标（morph targets），以及将 glTF 1.0 模型相应更新到 2.0。[#5641](https://github.com/CesiumGS/cesium/pull/5641)
- Added `ClassificationPrimitive` which defines a volume and draws the intersection of the volume and terrain or 3D Tiles. [#5625](https://github.com/CesiumGS/cesium/pull/5625)
  添加了 `ClassificationPrimitive`，用于定义一个体积并绘制该体积与地形或 3D Tiles 的相交部分。[#5625](https://github.com/CesiumGS/cesium/pull/5625)
- Added `tileLoad` event to `Cesium3DTileset`. [#5628](https://github.com/CesiumGS/cesium/pull/5628)
  向 `Cesium3DTileset` 添加了 `tileLoad` 事件。[#5628](https://github.com/CesiumGS/cesium/pull/5628)
- Fixed issue where scene would blink when labels were added. [#5537](https://github.com/CesiumGS/cesium/issues/5537)
  修复了添加标签时场景闪烁的问题。[#5537](https://github.com/CesiumGS/cesium/issues/5537)
- Fixed label positioning when height reference changes [#5609](https://github.com/CesiumGS/cesium/issues/5609)
  修复了高度基准改变时标签定位的问题。[#5609](https://github.com/CesiumGS/cesium/issues/5609)
- Fixed label positioning when using `HeightReference.CLAMP_TO_GROUND` and no position [#5648](https://github.com/CesiumGS/cesium/pull/5648)
  修复了使用 `HeightReference.CLAMP_TO_GROUND` 且无位置时标签定位的问题。[#5648](https://github.com/CesiumGS/cesium/pull/5648)
- Fix for dynamic polylines with polyline dash material [#5681](https://github.com/CesiumGS/cesium/pull/5681)
  修复了带有虚线材质的动态折线问题。[#5681](https://github.com/CesiumGS/cesium/pull/5681)
- Added ability to provide a `width` and `height` to `scene.pick`. [#5602](https://github.com/CesiumGS/cesium/pull/5602)
  添加了向 `scene.pick` 提供 `width` 和 `height` 的功能。[#5602](https://github.com/CesiumGS/cesium/pull/5602)
- Fixed `Viewer.flyTo` not respecting zoom limits, and resetting minimumZoomDistance if the camera zoomed past the minimumZoomDistance. [5573](https://github.com/CesiumGS/cesium/issues/5573)
  修复了 `Viewer.flyTo` 不遵循缩放限制的问题，以及相机缩放超过 minimumZoomDistance 时重置 minimumZoomDistance 的问题。[5573](https://github.com/CesiumGS/cesium/issues/5573)
- Added ability to show tile urls in the 3D Tiles Inspector. [#5592](https://github.com/CesiumGS/cesium/pull/5592)
  添加了在 3D Tiles Inspector 中显示瓦片 URL 的功能。[#5592](https://github.com/CesiumGS/cesium/pull/5592)
- Fixed a bug when reading CRN compressed textures with multiple mip levels. [#5618](https://github.com/CesiumGS/cesium/pull/5618)
  修复了读取带有多个 mip 级别的 CRN 压缩纹理时的 bug。[#5618](https://github.com/CesiumGS/cesium/pull/5618)
- Fixed issue where composite 3D Tiles that contained instanced 3D Tiles with an external model reference would fail to download the model.
  修复了包含具有外部模型引用的实例化 3D Tiles 的复合 3D Tiles 下载模型失败的问题。
- Added behavior to `Cesium3DTilesInspector` that selects the first tileset hovered over if no tilest is specified. [#5139](https://github.com/CesiumGS/cesium/issues/5139)
  向 `Cesium3DTilesInspector` 添加了在未指定瓦片集时选中鼠标悬停的第一个瓦片集的行为。[#5139](https://github.com/CesiumGS/cesium/issues/5139)
- Added `Entity.computeModelMatrix` which returns the model matrix representing the entity's transformation. [#5584](https://github.com/CesiumGS/cesium/pull/5584)
  添加了 `Entity.computeModelMatrix`，用于返回表示实体变换的模型矩阵。[#5584](https://github.com/CesiumGS/cesium/pull/5584)
- Added ability to set a style's `color`, `show`, or `pointSize` with a string or object literal. `show` may also take a boolean and `pointSize` may take a number. [#5412](https://github.com/CesiumGS/cesium/pull/5412)
  添加了使用字符串或对象字面量设置样式的 `color`、`show` 或 `pointSize` 的功能。`show` 也可以接受布尔值，`pointSize` 也可以接受数字。[#5412](https://github.com/CesiumGS/cesium/pull/5412)
- Added setter for `KmlDataSource.name` to specify a name for the datasource [#5660](https://github.com/CesiumGS/cesium/pull/5660).
  为 `KmlDataSource.name` 添加了 setter 以指定数据源的名称。[#5660](https://github.com/CesiumGS/cesium/pull/5660)。
- Added setter for `GeoJsonDataSource.name` to specify a name for the datasource [#5653](https://github.com/CesiumGS/cesium/issues/5653)
  为 `GeoJsonDataSource.name` 添加了 setter 以指定数据源的名称。[#5653](https://github.com/CesiumGS/cesium/issues/5653)
- Fixed crash when using the `Cesium3DTilesInspectorViewModel` and removing a tileset [#5607](https://github.com/CesiumGS/cesium/issues/5607)
  修复了使用 `Cesium3DTilesInspectorViewModel` 并在移除瓦片集时发生崩溃的问题。[#5607](https://github.com/CesiumGS/cesium/issues/5607)
- Fixed polygon outline in Polygon Sandcastle demo [#5642](https://github.com/CesiumGS/cesium/issues/5642)
  修复了多边形 Sandcastle 演示中的多边形轮廓问题。[#5642](https://github.com/CesiumGS/cesium/issues/5642)
- Updated `Billboard`, `Label` and `PointPrimitive` constructors to clone `NearFarScale` parameters [#5654](https://github.com/CesiumGS/cesium/pull/5654)
  更新了 `Billboard`、`Label` 和 `PointPrimitive` 构造函数以克隆 `NearFarScale` 参数。[#5654](https://github.com/CesiumGS/cesium/pull/5654)
- Added `FrustumGeometry` and `FrustumOutlineGeometry`. [#5649](https://github.com/CesiumGS/cesium/pull/5649)
  添加了 `FrustumGeometry` 和 `FrustumOutlineGeometry`。[#5649](https://github.com/CesiumGS/cesium/pull/5649)
- Added an `options` parameter to the constructors of `PerspectiveFrustum`, `PerspectiveOffCenterFrustum`, `OrthographicFrustum`, and `OrthographicOffCenterFrustum` to set properties. [#5649](https://github.com/CesiumGS/cesium/pull/5649)
  向 `PerspectiveFrustum`、`PerspectiveOffCenterFrustum`、`OrthographicFrustum` 和 `OrthographicOffCenterFrustum` 的构造函数添加了 `options` 参数以设置属性。[#5649](https://github.com/CesiumGS/cesium/pull/5649)

## 1.35.2 - 2017-07-11

- This is an npm-only release to fix an issue with using Cesium in Node.js.
  这是仅针对 npm 的版本，用于修复在 Node.js 中使用 Cesium 的问题。
- Fixed a bug where Cesium would fail to load under Node.js and some webpack configurations. [#5593](https://github.com/CesiumGS/cesium/issues/5593)
  修复了 Cesium 在 Node.js 和某些 webpack 配置下无法加载的 bug。[#5593](https://github.com/CesiumGS/cesium/issues/5593)
- Fixed a bug where a Model's compressed textures were not being displayed. [#5596](https://github.com/CesiumGS/cesium/pull/5596)
  修复了模型的压缩纹理未显示的问题。[#5596](https://github.com/CesiumGS/cesium/pull/5596)
- Fixed documentation for `OrthographicFrustum`. [#5586](https://github.com/CesiumGS/cesium/issues/5586)
  修复了 `OrthographicFrustum` 的文档。[#5586](https://github.com/CesiumGS/cesium/issues/5586)

## 1.35.1 - 2017-07-05

- This is an npm-only release to fix a deployment issue with 1.35. No code changes.
  这是仅针对 npm 的版本，用于修复 1.35 的部署问题。无代码更改。

## 1.35 - 2017-07-05

- Breaking changes
  破坏性变更
  - `JulianDate.fromIso8601` will default to midnight UTC if no time is provided to match the Javascript [`Date` specification](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). You must specify a local time of midnight to achieve the old behavior.
    如果未提供时间，`JulianDate.fromIso8601` 将默认使用 UTC 午夜零点，以符合 Javascript [`Date` 规范](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)。如果要保留旧行为，必须指定本地时间的午夜零点。
- Deprecated
  弃用
  - `GoogleEarthImageryProvider` has been deprecated and will be removed in Cesium 1.37, use `GoogleEarthEnterpriseMapsProvider` instead.
    `GoogleEarthImageryProvider` 已弃用并将在 Cesium 1.37 中移除，请改用 `GoogleEarthEnterpriseMapsProvider`。
  - The `throttleRequest` parameter for `TerrainProvider.requestTileGeometry`, `CesiumTerrainProvider.requestTileGeometry`, `VRTheWorldTerrainProvider.requestTileGeometry`, and `EllipsoidTerrainProvider.requestTileGeometry` is deprecated and will be replaced with an optional `Request` object. The `throttleRequests` parameter will be removed in 1.37. Instead set the request's `throttle` property to `true` to throttle requests.
    `TerrainProvider.requestTileGeometry`、`CesiumTerrainProvider.requestTileGeometry`、`VRTheWorldTerrainProvider.requestTileGeometry` 和 `EllipsoidTerrainProvider.requestTileGeometry` 的 `throttleRequest` 参数已弃用，并将替换为可选的 `Request` 对象。`throttleRequests` 参数将在 1.37 中移除。请改为将请求的 `throttle` 属性设置为 `true` 以节流请求。
  - The ability to provide a Promise for the `options.url` parameter of `loadWithXhr` and for the `url` parameter of `loadArrayBuffer`, `loadBlob`, `loadImageViaBlob`, `loadText`, `loadJson`, `loadXML`, `loadImage`, `loadCRN`, `loadKTX`, and `loadCubeMap` is deprecated. This will be removed in 1.37, instead `url` must be a string.
    为 `loadWithXhr` 的 `options.url` 参数以及 `loadArrayBuffer`、`loadBlob`、`loadImageViaBlob`、`loadText`、`loadJson`、`loadXML`、`loadImage`、`loadCRN`、`loadKTX` 和 `loadCubeMap` 的 `url` 参数提供 Promise 的能力已弃用。这将在 1.37 中移除，`url` 必须是字符串。
- Added support for [3D Tiles](https://github.com/CesiumGS/3d-tiles/blob/main/README.md) for streaming massive heterogeneous 3D geospatial datasets ([#5308](https://github.com/CesiumGS/cesium/pull/5308)). See the new [Sandcastle examples](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=3D%20Tiles%20Photogrammetry&label=3D%20Tiles). The new Cesium APIs are:
  添加了对用于流式传输海量异构 3D 地理空间数据集的 [3D Tiles](https://github.com/CesiumGS/3d-tiles/blob/main/README.md) 的支持（[#5308](https://github.com/CesiumGS/cesium/pull/5308)）。请参阅新的 [Sandcastle 示例](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=3D%20Tiles%20Photogrammetry&label=3D%20Tiles)。新增的 Cesium API 包括：
  - `Cesium3DTileset`
    `Cesium3DTileset`
  - `Cesium3DTileStyle`, `StyleExpression`, `Expression`, and `ConditionsExpression`
    `Cesium3DTileStyle`、`StyleExpression`、`Expression` 和 `ConditionsExpression`
  - `Cesium3DTile`
    `Cesium3DTile`
  - `Cesium3DTileContent`
    `Cesium3DTileContent`
  - `Cesium3DTileFeature`
    `Cesium3DTileFeature`
  - `Cesium3DTilesInspector`, `Cesium3DTilesInspectorViewModel`, and `viewerCesium3DTilesInspectorMixin`
    `Cesium3DTilesInspector`、`Cesium3DTilesInspectorViewModel` 和 `viewerCesium3DTilesInspectorMixin`
  - `Cesium3DTileColorBlendMode`
    `Cesium3DTileColorBlendMode`
- Added a particle system for effects like smoke, fire, sparks, etc. See `ParticleSystem`, `Particle`, `ParticleBurst`, `BoxEmitter`, `CircleEmitter`, `ConeEmitter`, `ParticleEmitter`, and `SphereEmitter`, and the new Sandcastle examples: [Particle System](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Particle%20System.html&label=Showcases) and [Particle System Fireworks](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Particle%20System%20Fireworks.html&label=Showcases). [#5212](https://github.com/CesiumGS/cesium/pull/5212)
  添加了用于烟雾、火焰、火花等特效的粒子系统。参见 `ParticleSystem`、`Particle`、`ParticleBurst`、`BoxEmitter`、`CircleEmitter`、`ConeEmitter`、`ParticleEmitter` 和 `SphereEmitter`，以及新的 Sandcastle 示例：[粒子系统（Particle System）](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Particle%20System.html&label=Showcases) 和 [粒子系统烟花（Particle System Fireworks）](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Particle%20System%20Fireworks.html&label=Showcases)。[#5212](https://github.com/CesiumGS/cesium/pull/5212)
- Added `options.clock`, `options.times` and `options.dimensions` to `WebMapTileServiceImageryProvider` in order to handle time dynamic and static values for dimensions.
  向 `WebMapTileServiceImageryProvider` 添加了 `options.clock`、`options.times` 和 `options.dimensions`，以处理维度的时变与静态值。
- Added an `options.request` parameter to `loadWithXhr` and a `request` parameter to `loadArrayBuffer`, `loadBlob`, `loadImageViaBlob`, `loadText`, `loadJson`, `loadJsonp`, `loadXML`, `loadImageFromTypedArray`, `loadImage`, `loadCRN`, and `loadKTX`.
  向 `loadWithXhr` 添加了 `options.request` 参数，并向 `loadArrayBuffer`、`loadBlob`、`loadImageViaBlob`、`loadText`、`loadJson`、`loadJsonp`、`loadXML`、`loadImageFromTypedArray`、`loadImage`、`loadCRN` 和 `loadKTX` 添加了 `request` 参数。
- `CzmlDataSource` and `KmlDataSource` load functions now take an optional `query` object, which will append query parameters to all network requests. [#5419](https://github.com/CesiumGS/cesium/pull/5419), [#5434](https://github.com/CesiumGS/cesium/pull/5434)
  `CzmlDataSource` 和 `KmlDataSource` 的加载函数现在接受一个可选的 `query` 对象，该对象会将查询参数附加到所有网络请求中。[#5419](https://github.com/CesiumGS/cesium/pull/5419), [#5434](https://github.com/CesiumGS/cesium/pull/5434)
- Added Sandcastle demo for setting time with the Clock API [#5457](https://github.com/CesiumGS/cesium/pull/5457);
  添加了使用 Clock API 设置时间的 Sandcastle 示例。[#5457](https://github.com/CesiumGS/cesium/pull/5457)；
- Added Sandcastle demo for ArcticDEM data. [#5224](https://github.com/CesiumGS/cesium/issues/5224)
  添加了 ArcticDEM 数据的 Sandcastle 示例。[#5224](https://github.com/CesiumGS/cesium/issues/5224)
- Added `fromIso8601`, `fromIso8601DateArray`, and `fromIso8601DurationArray` to `TimeIntervalCollection` for handling various ways groups of intervals can be specified in ISO8601 format.
  向 `TimeIntervalCollection` 添加了 `fromIso8601`、`fromIso8601DateArray` 和 `fromIso8601DurationArray`，用于处理以 ISO8601 格式指定时间区间组的各种方式。
- Added `fromJulianDateArray` to `TimeIntervalCollection` for generating intervals from a list of dates.
  向 `TimeIntervalCollection` 添加了 `fromJulianDateArray`，用于从日期列表中生成时间区间。
- Fixed geocoder bug so geocoder can accurately handle NSEW inputs [#5407](https://github.com/CesiumGS/cesium/pull/5407)
  修复了地理编码器的 bug，使其能够准确处理北南东西（NSEW）方向输入。[#5407](https://github.com/CesiumGS/cesium/pull/5407)
- Fixed a bug where picking would break when the Sun came into view [#5478](https://github.com/CesiumGS/cesium/issues/5478)
  修复了太阳进入视野时拾取操作会失效的 bug。[#5478](https://github.com/CesiumGS/cesium/issues/5478)
- Fixed a bug where picking clusters would return undefined instead of a list of the clustered entities. [#5286](https://github.com/CesiumGS/cesium/issues/5286)
  修复了拾取聚合簇时返回 undefined 而不是聚合实体列表的 bug。[#5286](https://github.com/CesiumGS/cesium/issues/5286)
- Fixed bug where if polylines were set to follow the surface of an undefined globe, Cesium would throw an exception. [#5413](https://github.com/CesiumGS/cesium/pull/5413)
  修复了如果折线被设置为贴在 undefined 的地球表面时 Cesium 会抛出异常的 bug。[#5413](https://github.com/CesiumGS/cesium/pull/5413)
- Reduced the amount of Sun bloom post-process effect near the horizon. [#5381](https://github.com/CesiumGS/cesium/issues/5381)
  减少了地平线附近太阳泛光（Sun bloom）后处理效果的强度。[#5381](https://github.com/CesiumGS/cesium/issues/5381)
- Fixed a bug where camera zooming worked incorrectly when the display height was greater than the display width [#5421](https://github.com/CesiumGS/cesium/pull/5421)
  修复了当显示高度大于显示宽度时相机缩放工作不正确的 bug。[#5421](https://github.com/CesiumGS/cesium/pull/5421)
- Updated glTF/glb MIME types. [#5420](https://github.com/CesiumGS/cesium/issues/5420)
  更新了 glTF/glb 的 MIME 类型。[#5420](https://github.com/CesiumGS/cesium/issues/5420)
- Added `Cesium.Math.randomBetween`.
  添加了 `Cesium.Math.randomBetween`。
- Modified `defaultValue` to check for both `undefined` and `null`. [#5551](https://github.com/CesiumGS/cesium/pull/5551)
  修改了 `defaultValue` 以同时检查 `undefined` 和 `null`。[#5551](https://github.com/CesiumGS/cesium/pull/5551)
- The `throttleRequestByServer` function has been removed. Instead pass a `Request` object with `throttleByServer` set to `true` to any of following load functions: `loadWithXhr`, `loadArrayBuffer`, `loadBlob`, `loadImageViaBlob`, `loadText`, `loadJson`, `loadJsonp`, `loadXML`, `loadImageFromTypedArray`, `loadImage`, `loadCRN`, and `loadKTX`.
  `throttleRequestByServer` 函数已被移除。请改为向以下任一加载函数传递一个 `throttleByServer` 设置为 `true` 的 `Request` 对象：`loadWithXhr`、`loadArrayBuffer`、`loadBlob`、`loadImageViaBlob`、`loadText`、`loadJson`、`loadJsonp`、`loadXML`、`loadImageFromTypedArray`、`loadImage`、`loadCRN` 和 `loadKTX`。

## 1.34 - 2017-06-01

- Deprecated
  弃用
  - Passing `options.clock` when creating a new `Viewer` instance has been deprecated and will be removed in Cesium 1.37, pass `options.clockViewModel` instead.
    创建新 `Viewer` 实例时传递 `options.clock` 的方式已被弃用，并将在 Cesium 1.37 中移除，请改用 `options.clockViewModel`。
- Fix issue where polylines in a `PolylineCollection` would ignore the far distance when updating the distance display condition. [#5283](https://github.com/CesiumGS/cesium/pull/5283)
  修复了 `PolylineCollection` 中的折线在更新距离显示条件时忽略远距离的问题。[#5283](https://github.com/CesiumGS/cesium/pull/5283)
- Fixed a crash when calling `Camera.pickEllipsoid` with a canvas of size 0.
  修复了在画布大小为 0 时调用 `Camera.pickEllipsoid` 发生崩溃的问题。
- Fix `BoundingSphere.fromOrientedBoundingBox`. [#5334](https://github.com/CesiumGS/cesium/issues/5334)
  修复了 `BoundingSphere.fromOrientedBoundingBox`。[#5334](https://github.com/CesiumGS/cesium/issues/5334)
- Fixed bug where polylines would not update when `PolylineCollection` model matrix was updated. [#5327](https://github.com/CesiumGS/cesium/pull/5327)
  修复了当 `PolylineCollection` 模型矩阵更新时折线未更新的 bug。[#5327](https://github.com/CesiumGS/cesium/pull/5327)
- Fixed a bug where adding a ground clamped label without a position would show up at a previous label's clamped position. [#5338](https://github.com/CesiumGS/cesium/issues/5338)
  修复了添加没有位置的贴地标签会显示在之前标签贴地位置上的 bug。[#5338](https://github.com/CesiumGS/cesium/issues/5338)
- Fixed translucency bug for certain material types. [#5335](https://github.com/CesiumGS/cesium/pull/5335)
  修复了某些材质类型的半透明 bug。[#5335](https://github.com/CesiumGS/cesium/pull/5335)
- Fix picking polylines that use a depth fail appearance. [#5337](https://github.com/CesiumGS/cesium/pull/5337)
  修复了拾取使用深度失败外观（depth fail appearance）的折线的问题。[#5337](https://github.com/CesiumGS/cesium/pull/5337)
- Fixed a crash when morphing from Columbus view to 3D. [#5311](https://github.com/CesiumGS/cesium/issues/5311)
  修复了从哥伦布视图（Columbus view）变换到 3D 时的崩溃问题。[#5311](https://github.com/CesiumGS/cesium/issues/5311)
- Fixed a bug which prevented KML descriptions with relative paths from loading. [#5352](https://github.com/CesiumGS/cesium/pull/5352)
  修复了阻止包含相对路径的 KML 描述进行加载的 bug。[#5352](https://github.com/CesiumGS/cesium/pull/5352)
- Fixed an issue where camera view could be invalid at the last frame of animation. [#4949](https://github.com/CesiumGS/cesium/issues/4949)
  修复了动画最后一帧相机视角可能无效的问题。[#4949](https://github.com/CesiumGS/cesium/issues/4949)
- Fixed an issue where using the depth fail material for polylines would cause a crash in Edge. [#5359](https://github.com/CesiumGS/cesium/pull/5359)
  修复了对折线使用深度失败材质时导致 Edge 崩溃的问题。[#5359](https://github.com/CesiumGS/cesium/pull/5359)
- Fixed a crash where `EllipsoidGeometry` and `EllipsoidOutlineGeometry` were given floating point values when expecting integers. [#5260](https://github.com/CesiumGS/cesium/issues/5260)
  修复了 `EllipsoidGeometry` 和 `EllipsoidOutlineGeometry` 预期接收整数却被传入浮点值时发生崩溃的问题。[#5260](https://github.com/CesiumGS/cesium/issues/5260)
- Fixed an issue where billboards were not properly aligned. [#2487](https://github.com/CesiumGS/cesium/issues/2487)
  修复了广告牌（billboard）未正确对齐的问题。[#2487](https://github.com/CesiumGS/cesium/issues/2487)
- Fixed an issue where translucent objects could flicker when picking on mouse move. [#5307](https://github.com/CesiumGS/cesium/issues/5307)
  修复了鼠标移动拾取时半透明对象可能闪烁的问题。[#5307](https://github.com/CesiumGS/cesium/issues/5307)
- Fixed a bug where billboards with `sizeInMeters` set to true would move upwards when zooming out. [#5373](https://github.com/CesiumGS/cesium/issues/5373)
  修复了 `sizeInMeters` 设置为 true 的广告牌在缩小时向上移动的 bug。[#5373](https://github.com/CesiumGS/cesium/issues/5373)
- Fixed a bug where `SampledProperty.setInterpolationOptions` does not ignore undefined `options`. [#3575](https://github.com/CesiumGS/cesium/issues/3575)
  修复了 `SampledProperty.setInterpolationOptions` 未忽略 undefined 的 `options` 的 bug。[#3575](https://github.com/CesiumGS/cesium/issues/3575)
- Added `basePath` option to `Cesium.Model.fromGltf`. [#5320](https://github.com/CesiumGS/cesium/issues/5320)
  向 `Cesium.Model.fromGltf` 添加了 `basePath` 选项。[#5320](https://github.com/CesiumGS/cesium/issues/5320)

## 1.33 - 2017-05-01

- Breaking changes
  破坏性变更
  - Removed left, right, bottom and top properties from `OrthographicFrustum`. Use `OrthographicOffCenterFrustum` instead. [#5109](https://github.com/CesiumGS/cesium/issues/5109)
    从 `OrthographicFrustum` 中移除了 left、right、bottom 和 top 属性。请改用 `OrthographicOffCenterFrustum`。[#5109](https://github.com/CesiumGS/cesium/issues/5109)
- Added `GoogleEarthEnterpriseTerrainProvider` and `GoogleEarthEnterpriseImageryProvider` to read data from Google Earth Enterprise servers. [#5189](https://github.com/CesiumGS/cesium/pull/5189).
  添加了 `GoogleEarthEnterpriseTerrainProvider` 和 `GoogleEarthEnterpriseImageryProvider`，用于从 Google Earth Enterprise 服务器读取数据。[#5189](https://github.com/CesiumGS/cesium/pull/5189)。
- Support for dashed polylines [#5159](https://github.com/CesiumGS/cesium/pull/5159).
  支持虚线折线。[#5159](https://github.com/CesiumGS/cesium/pull/5159)。
  - Added `PolylineDash` Material type.
    添加了 `PolylineDash` 材质类型。
  - Added `PolylineDashMaterialProperty` to the Entity API.
    向 Entity API 添加了 `PolylineDashMaterialProperty`。
  - Added CZML `polylineDash` property .
    添加了 CZML 的 `polylineDash` 属性。
- Added `disableDepthTestDistance` to billboards, points and labels. This sets the distance to the camera where the depth test will be disabled. Setting it to zero (the default) will always enable the depth test. Setting it to `Number.POSITIVE_INFINITY` will never enabled the depth test. Also added `scene.minimumDisableDepthTestDistance` to change the default value from zero. [#5166](https://github.com/CesiumGS/cesium/pull/5166)
  向广告牌、点和标签添加了 `disableDepthTestDistance`。该属性设置与相机的距离，在此距离内将禁用深度测试。将其设置为 0（默认值）将始终启用深度测试。将其设置为 `Number.POSITIVE_INFINITY` 将永不启用深度测试。还添加了 `scene.minimumDisableDepthTestDistance` 以修改默认的零值。[#5166](https://github.com/CesiumGS/cesium/pull/5166)
- Added a `depthFailMaterial` property to line entities, which is the material used to render the line when it fails the depth test. [#5160](https://github.com/CesiumGS/cesium/pull/5160)
  向线实体添加了 `depthFailMaterial` 属性，用于在线未通过深度测试时渲染该线的材质。[#5160](https://github.com/CesiumGS/cesium/pull/5160)
- Fixed billboards not initially clustering. [#5208](https://github.com/CesiumGS/cesium/pull/5208)
  修复了广告牌最初未进行聚合的问题。[#5208](https://github.com/CesiumGS/cesium/pull/5208)
- Fixed issue with displaying `MapboxImageryProvider` default token error message. [#5191](https://github.com/CesiumGS/cesium/pull/5191)
  修复了显示 `MapboxImageryProvider` 默认 token 错误消息的问题。[#5191](https://github.com/CesiumGS/cesium/pull/5191)
- Fixed bug in conversion formula in `Matrix3.fromHeadingPitchRoll`. [#5195](https://github.com/CesiumGS/cesium/issues/5195)
  修复了 `Matrix3.fromHeadingPitchRoll` 中转换公式的 bug。[#5195](https://github.com/CesiumGS/cesium/issues/5195)
- Upgrade FXAA to version 3.11. [#5200](https://github.com/CesiumGS/cesium/pull/5200)
  将 FXAA 升级至 3.11 版本。[#5200](https://github.com/CesiumGS/cesium/pull/5200)
- `Scene.pickPosition` now caches results per frame to increase performance. [#5117](https://github.com/CesiumGS/cesium/issues/5117)
  `Scene.pickPosition` 现在会按每帧缓存结果以提高性能。[#5117](https://github.com/CesiumGS/cesium/issues/5117)

## 1.32 - 2017-04-03

- Deprecated
  弃用
  - The `left`, `right`, `bottom`, and `top` properties of `OrthographicFrustum` are deprecated and will be removed in 1.33. Use `OrthographicOffCenterFrustum` instead.
    `OrthographicFrustum` 的 `left`、`right`、`bottom` 和 `top` 属性已被弃用，并将在 1.33 中移除。请改用 `OrthographicOffCenterFrustum`。
- Breaking changes
  破坏性变更
  - Removed `ArcGisImageServerTerrainProvider`.
    移除了 `ArcGisImageServerTerrainProvider`。
  - The top-level `properties` in an `Entity` created by `GeoJsonDataSource` are now instances of `ConstantProperty` instead of raw values.
    由 `GeoJsonDataSource` 创建的 `Entity` 中的顶层 `properties` 现在是 `ConstantProperty` 实例，而不是原始值。
- Added support for an orthographic projection in 3D and Columbus view.
  添加了在 3D 和哥伦布视图中对正交投影（orthographic projection）的支持。
  - Set `projectionPicker` to `true` in the options when creating a `Viewer` to add a widget that will switch projections. [#5021](https://github.com/CesiumGS/cesium/pull/5021)
    创建 `Viewer` 时在选项中将 `projectionPicker` 设置为 `true`，以添加切换投影的小部件。[#5021](https://github.com/CesiumGS/cesium/pull/5021)
  - Call `switchToOrthographicFrustum` or `switchToPerspectiveFrustum` on `Camera` to change projections.
    在 `Camera` 上调用 `switchToOrthographicFrustum` 或 `switchToPerspectiveFrustum` 以切换投影。
- Added support for custom time-varying properties in CZML. [#5105](https://github.com/CesiumGS/cesium/pull/5105).
  在 CZML 中添加了对自定义随时间变化的属性的支持。[#5105](https://github.com/CesiumGS/cesium/pull/5105)。
- Added new flight parameters to `Camera.flyTo` and `Camera.flyToBoundingSphere`: `flyOverLongitude`, `flyOverLongitudeWeight`, and `pitchAdjustHeight`. [#5070](https://github.com/CesiumGS/cesium/pull/5070)
  向 `Camera.flyTo` 和 `Camera.flyToBoundingSphere` 添加了新的飞行参数：`flyOverLongitude`、`flyOverLongitudeWeight` 和 `pitchAdjustHeight`。[#5070](https://github.com/CesiumGS/cesium/pull/5070)
- Added the event `Viewer.trackedEntityChanged`, which is raised when the value of `viewer.trackedEntity` changes. [#5060](https://github.com/CesiumGS/cesium/pull/5060)
  添加了事件 `Viewer.trackedEntityChanged`，当 `viewer.trackedEntity` 的值改变时触发。[#5060](https://github.com/CesiumGS/cesium/pull/5060)
- Added `Camera.DEFAULT_OFFSET` for default view of objects with bounding spheres. [#4936](https://github.com/CesiumGS/cesium/pull/4936)
  添加了 `Camera.DEFAULT_OFFSET`，用于带有包围球对象的默认视角。[#4936](https://github.com/CesiumGS/cesium/pull/4936)
- Fixed an issue with `TileBoundingBox` that caused the terrain to disappear in certain places [4032](https://github.com/CesiumGS/cesium/issues/4032)
  修复了 `TileBoundingBox` 导致地形在某些位置消失的问题。[4032](https://github.com/CesiumGS/cesium/issues/4032)
- Fixed overlapping billboard blending. [#5066](https://github.com/CesiumGS/cesium/pull/5066)
  修复了重叠广告牌的混合问题。[#5066](https://github.com/CesiumGS/cesium/pull/5066)
- Fixed an issue with `PinBuilder` where inset images could have low-alpha fringes against an opaque background. [#5099](https://github.com/CesiumGS/cesium/pull/5099)
  修复了 `PinBuilder` 中内嵌图像在不透明背景下可能出现低 alpha 边缘杂边的问题。[#5099](https://github.com/CesiumGS/cesium/pull/5099)
- Fix billboard, point and label clustering in 2D and Columbus view. [#5136](https://github.com/CesiumGS/cesium/pull/5136)
  修复了 2D 和哥伦布视图中的广告牌、点和标签聚合问题。[#5136](https://github.com/CesiumGS/cesium/pull/5136)
- Fixed `GroundPrimitive` rendering in 2D and Columbus View. [#5078](https://github.com/CesiumGS/cesium/pull/5078)
  修复了 2D 和哥伦布视图中的 `GroundPrimitive` 渲染问题。[#5078](https://github.com/CesiumGS/cesium/pull/5078)
- Fixed an issue with camera tracking of dynamic ellipsoids. [#5133](https://github.com/CesiumGS/cesium/pull/5133)
  修复了动态椭球体的相机跟踪问题。[#5133](https://github.com/CesiumGS/cesium/pull/5133)
- Fixed issues with imagerySplitPosition and the international date line in 2D mode. [#5151](https://github.com/CesiumGS/cesium/pull/5151)
  修复了 2D 模式下 imagerySplitPosition 与国际日界线相关的问题。[#5151](https://github.com/CesiumGS/cesium/pull/5151)
- Fixed a bug in `ModelAnimationCache` causing different animations to reference the same animation. [#5064](https://github.com/CesiumGS/cesium/pull/5064)
  修复了 `ModelAnimationCache` 中导致不同动画引用相同动画的 bug。[#5064](https://github.com/CesiumGS/cesium/pull/5064)
- `ConstantProperty` now provides `valueOf` and `toString` methods that return the constant value.
  `ConstantProperty` 现在提供了返回常量值的 `valueOf` 和 `toString` 方法。
- Improved depth artifacts between opaque and translucent primitives. [#5116](https://github.com/CesiumGS/cesium/pull/5116)
  改善了不透明和半透明图元之间的深度伪影。[#5116](https://github.com/CesiumGS/cesium/pull/5116)
- Fixed crunch compressed textures in IE11. [#5057](https://github.com/CesiumGS/cesium/pull/5057)
  修复了 IE11 中的 crunch 压缩纹理问题。[#5057](https://github.com/CesiumGS/cesium/pull/5057)
- Fixed a bug in `Quaternion.fromHeadingPitchRoll` that made it erroneously throw an exception when passed individual angles in an unminified / debug build.
  修复了在未压缩/调试构建中向 `Quaternion.fromHeadingPitchRoll` 传递单独角度时错误地抛出异常的 bug。
- Fixed a bug that caused an exception in `CesiumInspectorViewModel` when using the NW / NE / SW / SE / Parent buttons to navigate to a terrain tile that is not yet loaded.
  修复了在 `CesiumInspectorViewModel` 中使用 NW / NE / SW / SE / Parent 按钮导航到尚未加载的地形瓦片时抛出异常的 bug。
- `QuadtreePrimitive` now uses `frameState.afterRender` to fire `tileLoadProgressEvent` [#3450](https://github.com/CesiumGS/cesium/issues/3450)
  `QuadtreePrimitive` 现在使用 `frameState.afterRender` 触发 `tileLoadProgressEvent`。[#3450](https://github.com/CesiumGS/cesium/issues/3450)

## 1.31 - 2017-03-01

- Deprecated
  弃用
  - The function `Quaternion.fromHeadingPitchRoll(heading, pitch, roll, result)` will be removed in 1.33. Use `Quaternion.fromHeadingPitchRoll(hpr, result)` instead where `hpr` is a `HeadingPitchRoll`. [#4896](https://github.com/CesiumGS/cesium/pull/4896)
    函数 `Quaternion.fromHeadingPitchRoll(heading, pitch, roll, result)` 将在 1.33 中移除。请改用 `Quaternion.fromHeadingPitchRoll(hpr, result)`，其中 `hpr` 为 `HeadingPitchRoll`。[#4896](https://github.com/CesiumGS/cesium/pull/4896)
  - The function `Transforms.headingPitchRollToFixedFrame(origin, headingPitchRoll, ellipsoid, result)` will be removed in 1.33. Use `Transforms.headingPitchRollToFixedFrame(origin, headingPitchRoll, ellipsoid, fixedFrameTransform, result)` instead where `fixedFrameTransform` is a a 4x4 transformation matrix (see `Transforms.localFrameToFixedFrameGenerator`). [#4896](https://github.com/CesiumGS/cesium/pull/4896)
    函数 `Transforms.headingPitchRollToFixedFrame(origin, headingPitchRoll, ellipsoid, result)` 将在 1.33 中移除。请改用 `Transforms.headingPitchRollToFixedFrame(origin, headingPitchRoll, ellipsoid, fixedFrameTransform, result)`，其中 `fixedFrameTransform` 为 4x4 变换矩阵（参见 `Transforms.localFrameToFixedFrameGenerator`）。[#4896](https://github.com/CesiumGS/cesium/pull/4896)
  - The function `Transforms.headingPitchRollQuaternion(origin, headingPitchRoll, ellipsoid, result)` will be removed in 1.33. Use `Transforms.headingPitchRollQuaternion(origin, headingPitchRoll, ellipsoid, fixedFrameTransform, result)` instead where `fixedFrameTransform` is a a 4x4 transformation matrix (see `Transforms.localFrameToFixedFrameGenerator`). [#4896](https://github.com/CesiumGS/cesium/pull/4896)
    函数 `Transforms.headingPitchRollQuaternion(origin, headingPitchRoll, ellipsoid, result)` 将在 1.33 中移除。请改用 `Transforms.headingPitchRollQuaternion(origin, headingPitchRoll, ellipsoid, fixedFrameTransform, result)`，其中 `fixedFrameTransform` 为 4x4 变换矩阵（参见 `Transforms.localFrameToFixedFrameGenerator`）。[#4896](https://github.com/CesiumGS/cesium/pull/4896)
  - `ArcGisImageServerTerrainProvider` will be removed in 1.32 due to missing TIFF support in web browsers. [#4981](https://github.com/CesiumGS/cesium/pull/4981)
    由于 Web 浏览器缺乏 TIFF 支持，`ArcGisImageServerTerrainProvider` 将在 1.32 中移除。[#4981](https://github.com/CesiumGS/cesium/pull/4981)
- Breaking changes
  破坏性变更
  <!-- cspell:ignore FUSCHIA -->
  - Corrected spelling of `Color.FUCHSIA` from `Color.FUSCHIA`. [#4977](https://github.com/CesiumGS/cesium/pull/4977)
    纠正了 `Color.FUCHSIA` 的拼写（原为 `Color.FUSCHIA`）。[#4977](https://github.com/CesiumGS/cesium/pull/4977)
  - The enums `MIDDLE_DOUBLE_CLICK` and `RIGHT_DOUBLE_CLICK` from `ScreenSpaceEventType` have been removed. [#5052](https://github.com/CesiumGS/cesium/pull/5052)
    从 `ScreenSpaceEventType` 中移除了枚举 `MIDDLE_DOUBLE_CLICK` 和 `RIGHT_DOUBLE_CLICK`。[#5052](https://github.com/CesiumGS/cesium/pull/5052)
  <!-- cspell:ignore Binormal -->
  - Removed the function `GeometryPipeline.computeBinormalAndTangent`. Use `GeometryPipeline.computeTangentAndBitangent` instead. [#5053](https://github.com/CesiumGS/cesium/pull/5053)
    移除了函数 `GeometryPipeline.computeBinormalAndTangent`。请改用 `GeometryPipeline.computeTangentAndBitangent`。[#5053](https://github.com/CesiumGS/cesium/pull/5053)
  - Removed the `url` and `key` properties from `GeocoderViewModel`. [#5056](https://github.com/CesiumGS/cesium/pull/5056)
    从 `GeocoderViewModel` 中移除了 `url` 和 `key` 属性。[#5056](https://github.com/CesiumGS/cesium/pull/5056)
  - `BingMapsGeocoderServices` now requires `options.scene`. [#5056](https://github.com/CesiumGS/cesium/pull/5056)
    `BingMapsGeocoderServices` 现在需要 `options.scene`。[#5056](https://github.com/CesiumGS/cesium/pull/5056)
- Added compressed texture support. [#4758](https://github.com/CesiumGS/cesium/pull/4758)
  添加了压缩纹理支持。[#4758](https://github.com/CesiumGS/cesium/pull/4758)
  - glTF models and imagery layers can now reference [KTX](https://www.khronos.org/opengles/sdk/tools/KTX/) textures and textures compressed with [crunch](https://github.com/BinomialLLC/crunch).
    glTF 模型和影像图层现在可以引用 [KTX](https://www.khronos.org/opengles/sdk/tools/KTX/) 纹理以及使用 [crunch](https://github.com/BinomialLLC/crunch) 压缩的纹理。
  - Added `loadKTX`, to load KTX textures, and `loadCRN` to load crunch compressed textures.
    添加了用于加载 KTX 纹理的 `loadKTX`，以及用于加载 crunch 压缩纹理的 `loadCRN`。
  - Added new `PixelFormat` and `WebGLConstants` enums from WebGL extensions `WEBGL_compressed_s3tc`, `WEBGL_compressed_texture_pvrtc`, and `WEBGL_compressed_texture_etc1`.
    添加了来自 WebGL 扩展 `WEBGL_compressed_s3tc`、`WEBGL_compressed_texture_pvrtc` 和 `WEBGL_compressed_texture_etc1` 的新 `PixelFormat` 和 `WebGLConstants` 枚举。
  - Added `CompressedTextureBuffer`.
    添加了 `CompressedTextureBuffer`。
- Added support for `Scene.pickPosition` in Columbus view and 2D. [#4990](https://github.com/CesiumGS/cesium/pull/4990)
  在哥伦布视图和 2D 中添加了对 `Scene.pickPosition` 的支持。[#4990](https://github.com/CesiumGS/cesium/pull/4990)
- Added support for depth picking translucent primitives when `Scene.pickTranslucentDepth` is `true`. [#4979](https://github.com/CesiumGS/cesium/pull/4979)
  当 `Scene.pickTranslucentDepth` 为 `true` 时，添加了对半透明图元深度拾取的支持。[#4979](https://github.com/CesiumGS/cesium/pull/4979)
- Fixed an issue where the camera would zoom past an object and flip to the other side of the globe. [#4967](https://github.com/CesiumGS/cesium/pull/4967) and [#4982](https://github.com/CesiumGS/cesium/pull/4982)
  修复了相机缩放穿过物体并翻转到地球另一侧的问题。[#4967](https://github.com/CesiumGS/cesium/pull/4967) 与 [#4982](https://github.com/CesiumGS/cesium/pull/4982)
- Enable rendering `GroundPrimitives` on hardware without the `EXT_frag_depth` extension; however, this could cause artifacts for certain viewing angles. [#4930](https://github.com/CesiumGS/cesium/pull/4930)
  在不支持 `EXT_frag_depth` 扩展的硬件上启用 `GroundPrimitives` 渲染；不过这可能会在某些视角下导致伪影。[#4930](https://github.com/CesiumGS/cesium/pull/4930)
- Added `Transforms.localFrameToFixedFrameGenerator` to generate a function that computes a 4x4 transformation matrix from a local reference frame to fixed reference frame. [#4896](https://github.com/CesiumGS/cesium/pull/4896)
  添加了 `Transforms.localFrameToFixedFrameGenerator`，用于生成从局部参考系计算到固定参考系的 4x4 变换矩阵的函数。[#4896](https://github.com/CesiumGS/cesium/pull/4896)
- Added `Label.scaleByDistance` to control minimum/maximum label size based on distance from the camera. [#5019](https://github.com/CesiumGS/cesium/pull/5019)
  添加了 `Label.scaleByDistance`，用于根据与相机的距离控制最小/最大标签尺寸。[#5019](https://github.com/CesiumGS/cesium/pull/5019)
- Added support to `DebugCameraPrimitive` to draw multifrustum planes. The attribute `debugShowFrustumPlanes` of `Scene` and `frustumPlanes` of `CesiumInspector` toggle this. [#4932](https://github.com/CesiumGS/cesium/pull/4932)
  在 `DebugCameraPrimitive` 中添加了绘制多视锥体平面的支持。通过 `Scene` 的属性 `debugShowFrustumPlanes` 和 `CesiumInspector` 的 `frustumPlanes` 可以切换此功能。[#4932](https://github.com/CesiumGS/cesium/pull/4932)
- Added fix to always outline KML line extrusions so that they show up properly in 2D and other straight down views. [#4961](https://github.com/CesiumGS/cesium/pull/4961)
  添加了始终为 KML 线条拉伸绘制轮廓的修复，以便它们在 2D 和其他正下视视角中正确显示。[#4961](https://github.com/CesiumGS/cesium/pull/4961)
- Improved `RectangleGeometry` by skipping unnecessary logic in the code. [#4948](https://github.com/CesiumGS/cesium/pull/4948)
  通过跳过代码中不必要的逻辑改进了 `RectangleGeometry`。[#4948](https://github.com/CesiumGS/cesium/pull/4948)
- Fixed exception for polylines in 2D when rotating the map. [#4619](https://github.com/CesiumGS/cesium/issues/4619)
  修复了在 2D 模式下旋转地图时折线抛出异常的问题。[#4619](https://github.com/CesiumGS/cesium/issues/4619)
- Fixed an issue with constant `VertexArray` attributes not being set correctly. [#4995](https://github.com/CesiumGS/cesium/pull/4995)
  修复了常量 `VertexArray` 属性未正确设置的问题。[#4995](https://github.com/CesiumGS/cesium/pull/4995)
- Added the event `Viewer.selectedEntityChanged`, which is raised when the value of `viewer.selectedEntity` changes. [#5043](https://github.com/CesiumGS/cesium/pull/5043)
  添加了事件 `Viewer.selectedEntityChanged`，当 `viewer.selectedEntity` 的值改变时触发。[#5043](https://github.com/CesiumGS/cesium/pull/5043)

## 1.30 - 2017-02-01

- Deprecated
  弃用
  - The properties `url` and `key` will be removed from `GeocoderViewModel` in 1.31. These properties will be available on geocoder services that support them, like `BingMapsGeocoderService`.
    `GeocoderViewModel` 中的 `url` 和 `key` 属性将在 1.31 中移除。这些属性将在支持它们的地理编码服务（如 `BingMapsGeocoderService`）上提供。
  - The function `GeometryPipeline.computeBinormalAndTangent` will be removed in 1.31. Use `GeometryPipeline.createTangentAndBitangent` instead. [#4856](https://github.com/CesiumGS/cesium/pull/4856)
    函数 `GeometryPipeline.computeBinormalAndTangent` 将在 1.31 中移除。请改用 `GeometryPipeline.createTangentAndBitangent`。[#4856](https://github.com/CesiumGS/cesium/pull/4856)
  - The enums `MIDDLE_DOUBLE_CLICK` and `RIGHT_DOUBLE_CLICK` from `ScreenSpaceEventType` have been deprecated and will be removed in 1.31. [#4910](https://github.com/CesiumGS/cesium/pull/4910)
    `ScreenSpaceEventType` 中的枚举 `MIDDLE_DOUBLE_CLICK` 和 `RIGHT_DOUBLE_CLICK` 已弃用，并将在 1.31 中移除。[#4910](https://github.com/CesiumGS/cesium/pull/4910)
- Breaking changes
  破坏性变更
  - Removed separate `heading`, `pitch`, `roll` parameters from `Transform.headingPitchRollToFixedFrame` and `Transform.headingPitchRollQuaternion`. Pass a `HeadingPitchRoll` object instead. [#4843](https://github.com/CesiumGS/cesium/pull/4843)
    从 `Transform.headingPitchRollToFixedFrame` 和 `Transform.headingPitchRollQuaternion` 中移除了单独的 `heading`、`pitch`、`roll` 参数。请改传一个 `HeadingPitchRoll` 对象。[#4843](https://github.com/CesiumGS/cesium/pull/4843)
  - The property `binormal` has been renamed to `bitangent` for `Geometry` and `VertexFormat`. [#4856](https://github.com/CesiumGS/cesium/pull/4856)
    `Geometry` 和 `VertexFormat` 的 `binormal` 属性已重命名为 `bitangent`。[#4856](https://github.com/CesiumGS/cesium/pull/4856)
  - A handful of `CesiumInspectorViewModel` properties were removed or changed from variables to functions. [#4857](https://github.com/CesiumGS/cesium/pull/4857)
    少数 `CesiumInspectorViewModel` 属性已被移除或从变量更改为函数。[#4857](https://github.com/CesiumGS/cesium/pull/4857)
  - The `ShadowMap` constructor has been made private. [#4010](https://github.com/CesiumGS/cesium/issues/4010)
    `ShadowMap` 构造函数已设为私有。[#4010](https://github.com/CesiumGS/cesium/issues/4010)
- Added `sampleTerrainMostDetailed` to sample the height of an array of positions using the best available terrain data at each point. This requires a `TerrainProvider` with the `availability` property.
  添加了 `sampleTerrainMostDetailed`，用于使用每个点处最佳可用地形数据采样位置数组的高度。这需要具备 `availability` 属性的 `TerrainProvider`。
- Transparent parts of billboards, labels, and points no longer overwrite parts of the scene behind them. [#4886](https://github.com/CesiumGS/cesium/pull/4886)
  广告牌、标签和点的透明部分不再覆盖其后方的场景部分。[#4886](https://github.com/CesiumGS/cesium/pull/4886)
  - Added `blendOption` property to `BillboardCollection`, `LabelCollection`, and `PointPrimitiveCollection`. The default is `BlendOption.OPAQUE_AND_TRANSLUCENT`; however, if all billboards, labels, or points are either completely opaque or completely translucent, `blendOption` can be changed to `BlendOption.OPAQUE` or `BlendOption.TRANSLUCENT`, respectively, to increase performance by up to 2x.
    向 `BillboardCollection`、`LabelCollection` 和 `PointPrimitiveCollection` 添加了 `blendOption` 属性。默认值为 `BlendOption.OPAQUE_AND_TRANSLUCENT`；但是，如果所有广告牌、标签或点都是完全不透明或完全半透明的，则可以将 `blendOption` 分别更改为 `BlendOption.OPAQUE` 或 `BlendOption.TRANSLUCENT`，从而将性能提升高达 2 倍。
- Added support for custom geocoder services and autocomplete, see the [Sandcastle example](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Custom%20Geocoder.html). Added `GeocoderService`, an interface for geocoders, and `BingMapsGeocoderService` and `CartographicGeocoderService` implementations. [#4723](https://github.com/CesiumGS/cesium/pull/4723)
  添加了对自定义地理编码服务和自动补全的支持，请参阅 [Sandcastle 示例](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Custom%20Geocoder.html)。添加了地理编码器接口 `GeocoderService`，以及 `BingMapsGeocoderService` 和 `CartographicGeocoderService` 实现。[#4723](https://github.com/CesiumGS/cesium/pull/4723)
- Added ability to draw an `ImageryLayer` with a splitter to allow layers to only display to the left or right of a splitter. See `ImageryLayer.splitDirection`, `Scene.imagerySplitPosition`, and the [Sandcastle example](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Imagery%20Layers%20Split.html&label=Showcases).
  添加了使用分割器（splitter）绘制 `ImageryLayer` 的功能，以允许图层仅显示在分割器的左侧或右侧。参见 `ImageryLayer.splitDirection`、`Scene.imagerySplitPosition` 和 [Sandcastle 示例](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Imagery%20Layers%20Split.html&label=Showcases)。
- Fixed bug where `GroundPrimitives` where rendering incorrectly or disappearing at different zoom levels. [#4161](https://github.com/CesiumGS/cesium/issues/4161), [#4326](https://github.com/CesiumGS/cesium/issues/4326)
  修复了 `GroundPrimitives` 在不同缩放级别下渲染错误或消失的 bug。[#4161](https://github.com/CesiumGS/cesium/issues/4161), [#4326](https://github.com/CesiumGS/cesium/issues/4326)
- `TerrainProvider` now optionally exposes an `availability` property that can be used to query the terrain level that is available at a location or in a rectangle. Currently only `CesiumTerrainProvider` exposes this property.
  `TerrainProvider` 现在可选地公开一个 `availability` 属性，可用于查询在某一位置或矩形区域内可用的地形级别。目前仅 `CesiumTerrainProvider` 公开此属性。
- Added support for WMS version 1.3 by using CRS vice SRS query string parameter to request projection. SRS is still used for older versions.
  通过使用 CRS 代替 SRS 查询字符串参数请求投影，添加了对 WMS 1.3 版本的支持。较旧版本仍使用 SRS。
- Fixed a bug that caused all models to use the same highlight color. [#4798](https://github.com/CesiumGS/cesium/pull/4798)
  修复了导致所有模型使用相同高亮颜色的 bug。[#4798](https://github.com/CesiumGS/cesium/pull/4798)
- Fixed sky atmosphere from causing incorrect picking and hanging drill picking. [#4783](https://github.com/CesiumGS/cesium/issues/4783) and [#4784](https://github.com/CesiumGS/cesium/issues/4784)
  修复了天空大气导致错误拾取和穿透拾取卡死的问题。[#4783](https://github.com/CesiumGS/cesium/issues/4783) 与 [#4784](https://github.com/CesiumGS/cesium/issues/4784)
- Fixed KML loading when color is an empty string. [#4826](https://github.com/CesiumGS/cesium/pull/4826)
  修复了颜色为空字符串时的 KML 加载问题。[#4826](https://github.com/CesiumGS/cesium/pull/4826)
- Fixed a bug that could cause a "readyImagery is not actually ready" exception when quickly zooming past the maximum available imagery level of an imagery layer near the poles.
  修复了在极地附近快速缩放超过影像图层的最大可用影像级别时可能引发“readyImagery is not actually ready”异常的 bug。
- Fixed a bug that affected dynamic graphics with time-dynamic modelMatrix. [#4907](https://github.com/CesiumGS/cesium/pull/4907)
  修复了影响带有时间动态 modelMatrix 的动态图形的 bug。[#4907](https://github.com/CesiumGS/cesium/pull/4907)
- Fixed `Geocoder` autocomplete drop down visibility in Firefox. [#4916](https://github.com/CesiumGS/cesium/issues/4916)
  修复了 Firefox 中 `Geocoder` 自动补全下拉框的可见性问题。[#4916](https://github.com/CesiumGS/cesium/issues/4916)
- Added `Rectangle.fromRadians`.
  添加了 `Rectangle.fromRadians`。
- Updated the morph so the default view in Columbus View is now angled. [#3878](https://github.com/CesiumGS/cesium/issues/3878)
  更新了模式变换，使哥伦布视图中的默认视角现在具有倾角。[#3878](https://github.com/CesiumGS/cesium/issues/3878)
- Added 2D and Columbus View support for models using the RTC extension or whose vertices are in WGS84 coordinates. [#4922](https://github.com/CesiumGS/cesium/pull/4922)
  为使用 RTC 扩展或顶点在 WGS84 坐标系下的模型添加了 2D 和哥伦布视图支持。[#4922](https://github.com/CesiumGS/cesium/pull/4922)
- The attribute `perInstanceAttribute` of `DebugAppearance` has been made optional and defaults to `false`.
  `DebugAppearance` 的 `perInstanceAttribute` 属性已设为可选，默认为 `false`。
- Fixed a bug that would cause a crash when `debugShowFrustums` is enabled with OIT. [#4864](https://github.com/CesiumGS/cesium/pull/4864)
  修复了在启用顺序无关半透明（OIT）时启用 `debugShowFrustums` 会导致崩溃的 bug。[#4864](https://github.com/CesiumGS/cesium/pull/4864)
- Added the ability to run the unit tests with a [WebGL Stub](https://github.com/CesiumGS/cesium/tree/main/Documentation/Contributors/TestingGuide#run-with-webgl-stub), which makes all WebGL calls a noop and ignores test expectations that rely on reading back from WebGL. Use the web link from the main index.html or run with `npm run test-webgl-stub`.
  添加了使用 [WebGL Stub](https://github.com/CesiumGS/cesium/tree/main/Documentation/Contributors/TestingGuide#run-with-webgl-stub) 运行单元测试的功能，这使得所有 WebGL 调用都变成空操作，并忽略依赖于从 WebGL 回读的测试预期。使用主 index.html 中的网页链接或运行 `npm run test-webgl-stub`。

## 1.29 - 2017-01-02

- Improved 3D Models
  改进 3D 模型
  - Added the ability to blend a `Model` with a color/translucency. Added `color`, `colorBlendMode`, and `colorBlendAmount` properties to `Model`, `ModelGraphics`, and CZML. Also added `ColorBlendMode` enum. [#4547](https://github.com/CesiumGS/cesium/pull/4547)
    添加了将 `Model` 与颜色/半透明度进行混合的功能。向 `Model`、`ModelGraphics` 和 CZML 添加了 `color`、`colorBlendMode` 和 `colorBlendAmount` 属性。还添加了 `ColorBlendMode` 枚举。[#4547](https://github.com/CesiumGS/cesium/pull/4547)
  - Added the ability to render a `Model` with a silhouette. Added `silhouetteColor` and `silhouetteSize` properties to `Model`, `ModelGraphics`, and CZML. [#4314](https://github.com/CesiumGS/cesium/pull/4314)
    添加了渲染带轮廓剪影（silhouette）的 `Model` 的功能。向 `Model`、`ModelGraphics` 和 CZML 添加了 `silhouetteColor` 和 `silhouetteSize` 属性。[#4314](https://github.com/CesiumGS/cesium/pull/4314)
- Improved Labels
  改进标签
  - Added new `Label` properties `showBackground`, `backgroundColor`, and `backgroundPadding` to the primitive, Entity, and CZML layers. [#4715](https://github.com/CesiumGS/cesium/pull/4715)
    向图元、Entity 和 CZML 层添加了新的 `Label` 属性 `showBackground`、`backgroundColor` 和 `backgroundPadding`。[#4715](https://github.com/CesiumGS/cesium/pull/4715)
  - Added support for newlines (`\n`) in Cesium `Label`s and CZML. [#2402](https://github.com/CesiumGS/cesium/issues/2402)
    在 Cesium `Label` 和 CZML 中添加了对换行符（`\n`）的支持。[#2402](https://github.com/CesiumGS/cesium/issues/2402)
  - Added new enum `VerticalOrigin.BASELINE`. Previously, `VerticalOrigin.BOTTOM` would sometimes align to the baseline depending on the contents of a label. [#4715](https://github.com/CesiumGS/cesium/pull/4715)
    添加了新枚举 `VerticalOrigin.BASELINE`。此前，`VerticalOrigin.BOTTOM` 有时会根据标签内容对齐到基线。[#4715](https://github.com/CesiumGS/cesium/pull/4715)
- Fixed translucency in Firefox 50. [#4762](https://github.com/CesiumGS/cesium/pull/4762)
  修复了 Firefox 50 中的半透明问题。[#4762](https://github.com/CesiumGS/cesium/pull/4762)
- Fixed texture rotation for `RectangleGeometry`. [#2737](https://github.com/CesiumGS/cesium/issues/2737)
  修复了 `RectangleGeometry` 的纹理旋转问题。[#2737](https://github.com/CesiumGS/cesium/issues/2737)
- Fixed issue where billboards on terrain had an incorrect offset. [#4598](https://github.com/CesiumGS/cesium/issues/4598)
  修复了地形上的广告牌偏移错误的问题。[#4598](https://github.com/CesiumGS/cesium/issues/4598)
- Fixed issue where `globe.getHeight` incorrectly returned `undefined`. [#3411](https://github.com/CesiumGS/cesium/issues/3411)
  修复了 `globe.getHeight` 错误返回 `undefined` 的问题。[#3411](https://github.com/CesiumGS/cesium/issues/3411)
- Fixed a crash when using Entity path visualization with reference properties. [#4915](https://github.com/CesiumGS/cesium/issues/4915)
  修复了在带有引用属性的情况下使用实体路径可视化时发生崩溃的问题。[#4915](https://github.com/CesiumGS/cesium/issues/4915)
- Fixed a bug that caused `GroundPrimitive` to render incorrectly on systems without the `WEBGL_depth_texture` extension. [#4747](https://github.com/CesiumGS/cesium/pull/4747)
  修复了导致 `GroundPrimitive` 在缺少 `WEBGL_depth_texture` 扩展的系统上渲染不正确的 bug。[#4747](https://github.com/CesiumGS/cesium/pull/4747)
- Fixed default Mapbox token and added a watermark to notify users that they need to sign up for their own token.
  修复了默认 Mapbox token，并添加了水印以提醒用户需要申请自己的 token。
- Fixed glTF models with skinning that used `bindShapeMatrix`. [#4722](https://github.com/CesiumGS/cesium/issues/4722)
  修复了使用 `bindShapeMatrix` 的带有蒙皮的 glTF 模型问题。[#4722](https://github.com/CesiumGS/cesium/issues/4722)
- Fixed a bug that could cause a "readyImagery is not actually ready" exception with some configurations of imagery layers.
  修复了在某些影像图层配置下可能引发“readyImagery is not actually ready”异常的 bug。
- Fixed `Rectangle.union` to correctly account for rectangles that cross the IDL. [#4732](https://github.com/CesiumGS/cesium/pull/4732)
  修复了 `Rectangle.union` 以正确处理跨越国际日界线的矩形。[#4732](https://github.com/CesiumGS/cesium/pull/4732)
- Fixed tooltips for gallery thumbnails in Sandcastle. [#4702](https://github.com/CesiumGS/cesium/pull/4702)
  修复了 Sandcastle 中图库缩略图的提示工具条（tooltips）。[#4702](https://github.com/CesiumGS/cesium/pull/4702)
- DataSourceClock.getValue now preserves the provided `result` properties when its properties are `undefined`. [#4029](https://github.com/CesiumGS/cesium/issues/4029)
  当 DataSourceClock 的属性为 `undefined` 时，`DataSourceClock.getValue` 现在会保留所传入 `result` 的属性。[#4029](https://github.com/CesiumGS/cesium/issues/4029)
- Added `divideComponents` function to `Cartesian2`, `Cartesian3`, and `Cartesian4`. [#4750](https://github.com/CesiumGS/cesium/pull/4750)
  向 `Cartesian2`、`Cartesian3` 和 `Cartesian4` 添加了 `divideComponents` 函数。[#4750](https://github.com/CesiumGS/cesium/pull/4750)
- Added `WebGLConstants` enum. Previously, this was part of the private Renderer API. [#4731](https://github.com/CesiumGS/cesium/pull/4731)
  添加了 `WebGLConstants` 枚举。此前这是私有 Renderer API 的一部分。[#4731](https://github.com/CesiumGS/cesium/pull/4731)

## 1.28 - 2016-12-01

- Improved terrain/imagery load ordering, especially when the terrain is already fully loaded and a new imagery layer is loaded. This results in a 25% reduction in load times in many cases. [#4616](https://github.com/CesiumGS/cesium/pull/4616)
  改进了地形/影像加载顺序，尤其是当地形已完全加载且新影像图层正在加载时。在很多情况下这可缩减 25% 的加载时间。[#4616](https://github.com/CesiumGS/cesium/pull/4616)
- Improved `Billboard`, `Label`, and `PointPrimitive` visual quality. [#4675](https://github.com/CesiumGS/cesium/pull/4675)
  改进了 `Billboard`、`Label` 和 `PointPrimitive` 的视觉质量。[#4675](https://github.com/CesiumGS/cesium/pull/4675)
  - Corrected odd-width and odd-height billboard sizes from being incorrectly rounded up.
    纠正了奇数宽度和奇数高度广告牌尺寸被错误向上取整的问题。
  - Changed depth testing from `LESS` to `LEQUAL`, allowing label glyphs of equal depths to overlap.
    将深度测试从 `LESS` 更改为 `LEQUAL`，允许相同深度的标签字形重叠。
  - Label glyph positions have been adjusted and corrected.
    调整并纠正了标签字形位置。
  - `TextureAtlas.borderWidthInPixels` has always been applied to the upper and right edges of each internal texture, but is now also applied to the bottom and left edges of the entire TextureAtlas, guaranteeing borders on all sides regardless of position within the atlas.
    `TextureAtlas.borderWidthInPixels` 过去仅应用于每个内部纹理的上边缘和右边缘，现在也应用于整个 TextureAtlas 的底边缘和左边缘，确保无论在图集内的位置如何，四周都有边框。
- Fall back to packing floats into an unsigned byte texture when floating point textures are unsupported. [#4563](https://github.com/CesiumGS/cesium/issues/4563)
  在不支持浮点纹理时回退到将浮点数打包进无符号字节纹理中。[#4563](https://github.com/CesiumGS/cesium/issues/4563)
- Added support for saving html and css in GitHub Gists. [#4125](https://github.com/CesiumGS/cesium/issues/4125)
  添加了在 GitHub Gists 中保存 html 和 css 的支持。[#4125](https://github.com/CesiumGS/cesium/issues/4125)
- Fixed `Cartographic.fromCartesian` when the cartesian is not on the ellipsoid surface. [#4611](https://github.com/CesiumGS/cesium/issues/4611)
  修复了笛卡尔坐标不在椭球面表面时的 `Cartographic.fromCartesian`。[#4611](https://github.com/CesiumGS/cesium/issues/4611)

## 1.27 - 2016-11-01

- Deprecated
  弃用
  - Individual heading, pitch, and roll options to `Transforms.headingPitchRollToFixedFrame` and `Transforms.headingPitchRollQuaternion` have been deprecated and will be removed in 1.30. Pass the new `HeadingPitchRoll` object instead. [#4498](https://github.com/CesiumGS/cesium/pull/4498)
    `Transforms.headingPitchRollToFixedFrame` 和 `Transforms.headingPitchRollQuaternion` 的单独 heading、pitch 和 roll 选项已被弃用，并将在 1.30 中移除。请改传新的 `HeadingPitchRoll` 对象。[#4498](https://github.com/CesiumGS/cesium/pull/4498)
- Breaking changes
  破坏性变更
  - The `scene` parameter for creating `BillboardVisualizer`, `LabelVisualizer`, and `PointVisualizer` has been removed. Instead, pass an instance of `EntityCluster`. [#4514](https://github.com/CesiumGS/cesium/pull/4514)
    移除了创建 `BillboardVisualizer`、`LabelVisualizer` 和 `PointVisualizer` 时的 `scene` 参数。请改传一个 `EntityCluster` 实例。[#4514](https://github.com/CesiumGS/cesium/pull/4514)
- Fixed an issue where a billboard entity would not render after toggling the show property. [#4408](https://github.com/CesiumGS/cesium/issues/4408)
  修复了切换 show 属性后广告牌实体不渲染的问题。[#4408](https://github.com/CesiumGS/cesium/issues/4408)
- Fixed a crash when zooming from touch input on viewer initialization. [#4177](https://github.com/CesiumGS/cesium/issues/4177)
  修复了 viewer 初始化时通过触摸输入进行缩放引发崩溃的问题。[#4177](https://github.com/CesiumGS/cesium/issues/4177)
- Fixed a crash when clustering is enabled, an entity has a label graphics defined, but the label isn't visible. [#4414](https://github.com/CesiumGS/cesium/issues/4414)
  修复了启用聚合、实体定义了标签图形但标签不可见时发生的崩溃问题。[#4414](https://github.com/CesiumGS/cesium/issues/4414)
- Added the ability for KML files to load network links to other KML files within the same KMZ archive. [#4477](https://github.com/CesiumGS/cesium/issues/4477)
  添加了 KML 文件加载同一 KMZ 归档内其他 KML 文件的网络链接（network links）的能力。[#4477](https://github.com/CesiumGS/cesium/issues/4477)
- `KmlDataSource` and `GeoJsonDataSource` were not honoring the `clampToGround` option for billboards and labels and was instead always clamping, reducing performance in cases when it was unneeded. [#4459](https://github.com/CesiumGS/cesium/pull/4459)
  `KmlDataSource` 和 `GeoJsonDataSource` 之前未遵循广告牌和标签的 `clampToGround` 选项，而是一律贴地，在不需要贴地的情况下降低了性能。[#4459](https://github.com/CesiumGS/cesium/pull/4459)
- Fixed `KmlDataSource` features to respect `timespan` and `timestamp` properties of its parents (e.g. Folders or NetworkLinks). [#4041](https://github.com/CesiumGS/cesium/issues/4041)
  修复了 `KmlDataSource` 要素以遵循其父级（如文件夹或 NetworkLinks）的 `timespan` 和 `timestamp` 属性。[#4041](https://github.com/CesiumGS/cesium/issues/4041)
- Fixed a `KmlDataSource` bug where features had duplicate IDs and only one was drawn. [#3941](https://github.com/CesiumGS/cesium/issues/3941)
  修复了 `KmlDataSource` 中要素具有重复 ID 且仅绘制其中一个的 bug。[#3941](https://github.com/CesiumGS/cesium/issues/3941)
- `GeoJsonDataSource` now treats null crs values as a no-op instead of failing to load. [#4456](https://github.com/CesiumGS/cesium/pull/4456)
  `GeoJsonDataSource` 现在将 null crs 值视为无操作，而不是加载失败。[#4456](https://github.com/CesiumGS/cesium/pull/4456)
- `GeoJsonDataSource` now gracefully handles missing style icons instead of failing to load. [#4452](https://github.com/CesiumGS/cesium/pull/4452)
  `GeoJsonDataSource` 现在优雅地处理缺失的样式图标，而不是加载失败。[#4452](https://github.com/CesiumGS/cesium/pull/4452)
- Added `HeadingPitchRoll` [#4047](https://github.com/CesiumGS/cesium/pull/4047)
  添加了 `HeadingPitchRoll` [#4047](https://github.com/CesiumGS/cesium/pull/4047)
  - `HeadingPitchRoll.fromQuaternion` function for retrieving heading-pitch-roll angles from a quaternion.
    用于从四元数中获取偏航-俯仰-翻滚角的 `HeadingPitchRoll.fromQuaternion` 函数。
  - `HeadingPitchRoll.fromDegrees` function that returns a new HeadingPitchRoll instance from angles given in degrees.
    用于从以度为单位给出的角度返回新 HeadingPitchRoll 实例的 `HeadingPitchRoll.fromDegrees` 函数。
  - `HeadingPitchRoll.clone` function to duplicate HeadingPitchRoll instance.
    用于复制 HeadingPitchRoll 实例的 `HeadingPitchRoll.clone` 函数。
  - `HeadingPitchRoll.equals` and `HeadingPitchRoll.equalsEpsilon` functions for comparing two instances.
    用于比较两个实例的 `HeadingPitchRoll.equals` 和 `HeadingPitchRoll.equalsEpsilon` 函数。
  - Added `Matrix3.fromHeadingPitchRoll` Computes a 3x3 rotation matrix from the provided headingPitchRoll.
    添加了 `Matrix3.fromHeadingPitchRoll`，用于从提供的 headingPitchRoll 计算 3x3 旋转矩阵。
- Fixed primitive bounding sphere bug that would cause a crash when loading data sources. [#4431](https://github.com/CesiumGS/cesium/issues/4431)
  修复了在加载数据源时会导致崩溃的图元包围球 bug。[#4431](https://github.com/CesiumGS/cesium/issues/4431)
- Fixed `BoundingSphere` computation for `Primitive` instances with a modelMatrix. [#4428](https://github.com/CesiumGS/cesium/issues/4428)
  修复了带有 modelMatrix 的 `Primitive` 实例的 `BoundingSphere` 计算。[#4428](https://github.com/CesiumGS/cesium/issues/4428)
- Fixed a bug with rotated, textured rectangles. [#4430](https://github.com/CesiumGS/cesium/pull/4430)
  修复了带有纹理的旋转矩形的 bug。[#4430](https://github.com/CesiumGS/cesium/pull/4430)
- Added the ability to specify retina options, such as `@2x.png`, via the `MapboxImageryProvider` `format` option. [#4453](https://github.com/CesiumGS/cesium/pull/4453).
  添加了通过 `MapboxImageryProvider` 的 `format` 选项指定 Retina 视网膜屏选项（如 `@2x.png`）的能力。[#4453](https://github.com/CesiumGS/cesium/pull/4453)。
- Fixed a crash that could occur when specifying an imagery provider's `rectangle` option. [https://github.com/CesiumGS/cesium/issues/4377](https://github.com/CesiumGS/cesium/issues/4377)
  修复了指定影像提供器的 `rectangle` 选项时可能发生的崩溃。[https://github.com/CesiumGS/cesium/issues/4377](https://github.com/CesiumGS/cesium/issues/4377)
- Fixed a crash that would occur when using dynamic `distanceDisplayCondition` properties. [#4403](https://github.com/CesiumGS/cesium/pull/4403)
  修复了使用动态 `distanceDisplayCondition` 属性时发生的崩溃。[#4403](https://github.com/CesiumGS/cesium/pull/4403)
- Fixed several bugs that lead to billboards and labels being improperly clamped to terrain. [#4396](https://github.com/CesiumGS/cesium/issues/4396), [#4062](https://github.com/CesiumGS/cesium/issues/4062)
  修复了导致广告牌和标签未正确贴合地形的若干 bug。[#4396](https://github.com/CesiumGS/cesium/issues/4396), [#4062](https://github.com/CesiumGS/cesium/issues/4062)
- Fixed a bug affected models with multiple meshes without indices. [#4237](https://github.com/CesiumGS/cesium/issues/4237)
  修复了影响带有多个无索引网格的模型的 bug。[#4237](https://github.com/CesiumGS/cesium/issues/4237)
- Fixed a glTF transparency bug where `blendFuncSeparate` parameters were loaded in the wrong order. [#4435](https://github.com/CesiumGS/cesium/pull/4435)
  修复了 `blendFuncSeparate` 参数加载顺序错误的 glTF 透明度 bug。[#4435](https://github.com/CesiumGS/cesium/pull/4435)
- Fixed a bug where creating a custom geometry with attributes and indices that have values that are not a typed array would cause a crash. [#4419](https://github.com/CesiumGS/cesium/pull/4419)
  修复了创建具有非类型化数组值的属性和索引的自定义几何体时会导致崩溃的 bug。[#4419](https://github.com/CesiumGS/cesium/pull/4419)
- Fixed a bug when morphing from 2D to 3D. [#4388](https://github.com/CesiumGS/cesium/pull/4388)
  修复了从 2D 变换到 3D 时的 bug。[#4388](https://github.com/CesiumGS/cesium/pull/4388)
- Fixed `RectangleGeometry` rotation when the rectangle is close to the international date line [#3874](https://github.com/CesiumGS/cesium/issues/3874)
  修复了当矩形靠近国际日界线时的 `RectangleGeometry` 旋转问题。[#3874](https://github.com/CesiumGS/cesium/issues/3874)
- Added `clusterBillboards`, `clusterLabels`, and `clusterPoints` properties to `EntityCluster` to selectively cluster screen space entities.
  向 `EntityCluster` 添加了 `clusterBillboards`、`clusterLabels` 和 `clusterPoints` 属性，以选择性地聚合屏幕空间实体。
- Prevent execution of default device/browser behavior when handling "pinch" touch event/gesture. [#4518](https://github.com/CesiumGS/cesium/pull/4518).
  在处理“捏合（pinch）”触摸事件/手势时阻止执行默认设备/浏览器行为。[#4518](https://github.com/CesiumGS/cesium/pull/4518)。
- Fixed a shadow aliasing issue where polygon offset was not being applied. [#4559](https://github.com/CesiumGS/cesium/pull/4559)
  修复了未应用多边形偏移（polygon offset）导致的阴影锯齿问题。[#4559](https://github.com/CesiumGS/cesium/pull/4559)
- Removed an unnecessary re-projection of Web Mercator imagery tiles to the Geographic projection on load. This should improve both visual quality and load performance slightly. [#4339](https://github.com/CesiumGS/cesium/pull/4339)
  移除了加载时将 Web 墨卡托影像瓦片不必要地重新投影到地理投影的操作。这应该会略微提升视觉质量和加载性能。[#4339](https://github.com/CesiumGS/cesium/pull/4339)
- Added `Transforms.northUpEastToFixedFrame` to compute a 4x4 local transformation matrix from a reference frame with a north-west-up axes.
  添加了 `Transforms.northUpEastToFixedFrame`，用于从具有北-西-上轴的参考系计算 4x4 局部变换矩阵。
- Improved `Geocoder` usability by selecting text on click [#4464](https://github.com/CesiumGS/cesium/pull/4464)
  通过在点击时选中文本改进了 `Geocoder` 的易用性。[#4464](https://github.com/CesiumGS/cesium/pull/4464)
- Added `Rectangle.simpleIntersection` which is an optimized version of `Rectangle.intersection` for more constrained input. [#4339](https://github.com/CesiumGS/cesium/pull/4339)
  添加了 `Rectangle.simpleIntersection`，它是针对更受限输入的 `Rectangle.intersection` 优化版本。[#4339](https://github.com/CesiumGS/cesium/pull/4339)
- Fixed warning when using Webpack. [#4467](https://github.com/CesiumGS/cesium/pull/4467)
  修复了使用 Webpack 时的警告。[#4467](https://github.com/CesiumGS/cesium/pull/4467)

## 1.26 - 2016-10-03

- Deprecated
  弃用
  - The `scene` parameter for creating `BillboardVisualizer`, `LabelVisualizer`, and `PointVisualizer` has been deprecated and will be removed in 1.28. Instead, pass an instance of `EntityCluster`.
    创建 `BillboardVisualizer`、`LabelVisualizer` 和 `PointVisualizer` 时的 `scene` 参数已被弃用，并将在 1.28 中移除。请改传一个 `EntityCluster` 实例。
- Breaking changes
  破坏性变更
  - Vertex texture fetch is now required to be supported to render polylines. Maximum vertex texture image units must be greater than zero.
    现在渲染折线必须支持顶点纹理获取（VTF）。最大顶点纹理图像单元数必须大于零。
  - Removed `castShadows` and `receiveShadows` properties from `Model`, `Primitive`, and `Globe`. Instead, use `shadows` with the `ShadowMode` enum, e.g. `model.shadows = ShadowMode.ENABLED`.
    从 `Model`、`Primitive` 和 `Globe` 中移除了 `castShadows` 和 `receiveShadows` 属性。请改用带有 `ShadowMode` 枚举的 `shadows`，例如 `model.shadows = ShadowMode.ENABLED`。
  - `Viewer.terrainShadows` now uses the `ShadowMode` enum instead of a Boolean, e.g. `viewer.terrainShadows = ShadowMode.RECEIVE_ONLY`.
    `Viewer.terrainShadows` 现在使用 `ShadowMode` 枚举代替布尔值，例如 `viewer.terrainShadows = ShadowMode.RECEIVE_ONLY`。
- Added support for clustering `Billboard`, `Label` and `Point` entities. [#4240](https://github.com/CesiumGS/cesium/pull/4240)
  添加了对聚合 `Billboard`、`Label` 和 `Point` 实体的支持。[#4240](https://github.com/CesiumGS/cesium/pull/4240)
- Added `DistanceDisplayCondition`s to all primitives to determine the range interval from the camera for when it will be visible.
  向所有图元添加了 `DistanceDisplayCondition`，用于确定图元可见时与相机的距离区间。
- Removed the default gamma correction for Bing Maps aerial imagery, because it is no longer an improvement to current versions of the tiles. To restore the previous look, set the `defaultGamma` property of your `BingMapsImageryProvider` instance to 1.3.
  移除了 Bing Maps 航空影像的默认伽马校正，因为对当前版本的瓦片不再有改善效果。要恢复以前的外观，请将 `BingMapsImageryProvider` 实例的 `defaultGamma` 属性设置为 1.3。
- Fixed a bug that could lead to incorrect terrain heights when using `HeightmapTerrainData` with an encoding in which actual heights were equal to the minimum representable height.
  修复了在使用编码中实际高度等于最小可表示高度的 `HeightmapTerrainData` 时可能导致地形高度不正确的 bug。
- Fixed a bug in `AttributeCompression.compressTextureCoordinates` and `decompressTextureCoordinates` that could cause a small inaccuracy in the encoded texture coordinates.
  修复了 `AttributeCompression.compressTextureCoordinates` 和 `decompressTextureCoordinates` 中可能导致编码纹理坐标产生微小误差的 bug。
- Fixed a bug where viewing a model with transparent geometry would cause a crash. [#4378](https://github.com/CesiumGS/cesium/issues/4378)
  修复了查看带有透明几何体的模型时导致崩溃的 bug。[#4378](https://github.com/CesiumGS/cesium/issues/4378)
- Added `TrustedServer` collection that controls which servers should have `withCredential` set to `true` on XHR Requests.
  添加了 `TrustedServer` 集合，用于控制哪些服务器在 XHR 请求中应将 `withCredential` 设置为 `true`。
- Fixed billboard rotation when sized in meters. [#3979](https://github.com/CesiumGS/cesium/issues/3979)
  修复了以米为单位缩放广告牌时的旋转问题。[#3979](https://github.com/CesiumGS/cesium/issues/3979)
- Added `backgroundColor` and `borderWidth` properties to `writeTextToCanvas`.
  向 `writeTextToCanvas` 添加了 `backgroundColor` 和 `borderWidth` 属性。
- Fixed timeline touch events. [#4305](https://github.com/CesiumGS/cesium/pull/4305)
  修复了时间轴触摸事件。[#4305](https://github.com/CesiumGS/cesium/pull/4305)
- Fixed a bug that was incorrectly clamping Latitudes in KML `<GroundOverlay>`(s) to the range -PI..PI. Now correctly clamps to -PI/2..PI/2.
  修复了错误地将 KML `<GroundOverlay>` 中的纬度限制在 -PI..PI 范围内的 bug。现在正确限制在 -PI/2..PI/2 范围内。
- Added `CesiumMath.clampToLatitudeRange`. A convenience function to clamp a passed radian angle to valid Latitudes.
  添加了 `CesiumMath.clampToLatitudeRange`。这是一个将传入的弧度角限制在有效纬度范围内的便捷函数。
- Added `DebugCameraPrimitive` to visualize the view frustum of a camera.
  添加了 `DebugCameraPrimitive` 以可视化相机的视锥体。

## 1.25 - 2016-09-01

- Breaking changes
  破坏性变更
  - The number and order of arguments passed to `KmlDataSource` `unsupportedNodeEvent` listeners have changed to allow better handling of unsupported KML Features.
    更改了传递给 `KmlDataSource` 的 `unsupportedNodeEvent` 监听器的参数数量和顺序，以更好地处理不受支持的 KML 要素。
  - Changed billboards and labels that are clamped to terrain to have the `verticalOrigin` set to `CENTER` by default instead of `BOTTOM`.
    将贴地广告牌和标签的 `verticalOrigin` 默认值更改为 `CENTER`（此前为 `BOTTOM`）。
- Deprecated
  弃用
  - Deprecated `castShadows` and `receiveShadows` properties from `Model`, `Primitive`, and `Globe`. They will be removed in 1.26. Use `shadows` instead with the `ShadowMode` enum, e.g. `model.shadows = ShadowMode.ENABLED`.
    弃用了 `Model`、`Primitive` 和 `Globe` 中的 `castShadows` 和 `receiveShadows` 属性。它们将在 1.26 中移除。请改用带有 `ShadowMode` 枚举的 `shadows`，例如 `model.shadows = ShadowMode.ENABLED`。
  - `Viewer.terrainShadows` now uses the `ShadowMode` enum instead of a Boolean, e.g. `viewer.terrainShadows = ShadowMode.RECEIVE_ONLY`. Boolean support will be removed in 1.26.
    `Viewer.terrainShadows` 现在使用 `ShadowMode` 枚举代替布尔值，例如 `viewer.terrainShadows = ShadowMode.RECEIVE_ONLY`。布尔值支持将在 1.26 中移除。
- Updated the online [model converter](http://cesiumjs.org/convertmodel.html) to convert OBJ models to glTF with [obj2gltf](https://github.com/CesiumGS/OBJ2GLTF), as well as optimize existing glTF models with the [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline). Added an option to bake ambient occlusion onto the glTF model. Also added an option to compress geometry using the glTF [WEB3D_quantized_attributes](https://github.com/KhronosGroup/glTF/blob/master/extensions/Vendor/WEB3D_quantized_attributes/README.md) extension.
  更新了在线[模型转换器](http://cesiumjs.org/convertmodel.html)，使用 [obj2gltf](https://github.com/CesiumGS/OBJ2GLTF) 将 OBJ 模型转换为 glTF，并使用 [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline) 优化现有的 glTF 模型。添加了将环境光遮蔽（AO）烘焙到 glTF 模型的选项。还添加了使用 glTF [WEB3D_quantized_attributes](https://github.com/KhronosGroup/glTF/blob/master/extensions/Vendor/WEB3D_quantized_attributes/README.md) 扩展压缩几何体的选项。
- Improve label quality for oblique and italic fonts. [#3782](https://github.com/CesiumGS/cesium/issues/3782)
  提高了倾斜和斜体字体的标签质量。[#3782](https://github.com/CesiumGS/cesium/issues/3782)
- Added `shadows` property to the entity API for `Box`, `Corridor`, `Cylinder`, `Ellipse`, `Ellipsoid`, `Polygon`, `Polyline`, `PolylineVolume`, `Rectangle`, and `Wall`. [#4005](https://github.com/CesiumGS/cesium/pull/4005)
  为 `Box`、`Corridor`、`Cylinder`、`Ellipse`、`Ellipsoid`、`Polygon`、`Polyline`、`PolylineVolume`、`Rectangle` 和 `Wall` 的实体 API 添加了 `shadows` 属性。[#4005](https://github.com/CesiumGS/cesium/pull/4005)
- Added `Camera.cancelFlight` to cancel the existing camera flight if it exists.
  添加了 `Camera.cancelFlight` 以取消已有的相机飞行（如果存在）。
- Fix overlapping camera flights by always cancelling the previous flight when a new one is created.
  通过在创建新飞行时始终取消先前的飞行，修复了重叠的相机飞行问题。
- Camera flights now disable collision with the terrain until all of the terrain in the area has finished loading. This prevents the camera from being moved to be above lower resolution terrain when flying to a position close to higher resolution terrain. [#4075](https://github.com/CesiumGS/cesium/issues/4075)
  相机飞行现在会禁用与地形的碰撞检测，直到该区域的所有地形加载完毕。这可以防止在飞向接近高分辨率地形的位置时相机被移动到低分辨率地形上方。[#4075](https://github.com/CesiumGS/cesium/issues/4075)
- Fixed a crash that would occur if quickly toggling imagery visibility. [#4083](https://github.com/CesiumGS/cesium/issues/4083)
  修复了快速切换影像可见性时发生的崩溃问题。[#4083](https://github.com/CesiumGS/cesium/issues/4083)
- Fixed an issue causing an error if KML has a clamped to ground LineString with color. [#4131](https://github.com/CesiumGS/cesium/issues/4131)
  修复了当 KML 包含带有颜色的贴地 LineString 时引发错误的问题。[#4131](https://github.com/CesiumGS/cesium/issues/4131)
- Added logic to `KmlDataSource` defaulting KML Feature node to hidden unless all ancestors are visible. This better matches the KML specification.
  向 `KmlDataSource` 添加了逻辑，默认将 KML 要素节点设为隐藏，除非其所有祖先节点都可见。这更好地符合了 KML 规范。
- Fixed position of KML point features with an altitude mode of `relativeToGround` and `clampToGround`.
  修复了高度模式为 `relativeToGround` 和 `clampToGround` 的 KML 点要素位置问题。
- Added `GeocoderViewModel.keepExpanded` which when set to true will always keep the Geocoder in its expanded state.
  添加了 `GeocoderViewModel.keepExpanded`，当设置为 true 时将始终保持地理编码器处于展开状态。
- Added support for `INT` and `UNSIGNED_INT` in `ComponentDatatype`.
  在 `ComponentDatatype` 中添加了对 `INT` 和 `UNSIGNED_INT` 的支持。
- Added `ComponentDatatype.fromName` for getting a `ComponentDatatype` from its name.
  添加了 `ComponentDatatype.fromName` 用于根据名称获取 `ComponentDatatype`。
- Fixed a crash caused by draping dynamic geometry over terrain. [#4255](https://github.com/CesiumGS/cesium/pull/4255)
  修复了动态几何体贴地覆盖在地形上引起的崩溃问题。[#4255](https://github.com/CesiumGS/cesium/pull/4255)

## 1.24 - 2016-08-01

- Added support in CZML for expressing `BillboardGraphics.alignedAxis` as the velocity vector of an entity, using `velocityReference` syntax.
  在 CZML 中添加了使用 `velocityReference` 语法将实体的速度向量表示为 `BillboardGraphics.alignedAxis` 的支持。
- Added `urlSchemeZeroPadding` property to `UrlTemplateImageryProvider` to allow the numeric parts of a URL, such as `{x}`, to be padded with zeros to make them a fixed width.
  向 `UrlTemplateImageryProvider` 添加了 `urlSchemeZeroPadding` 属性，允许使用零填充 URL 的数字部分（如 `{x}`），以使其具有固定宽度。
- Added leap second just prior to January 2017. [#4092](https://github.com/CesiumGS/cesium/issues/4092)
  添加了 2017 年 1 月之前的闰秒。[#4092](https://github.com/CesiumGS/cesium/issues/4092)
- Fixed an exception that would occur when switching to 2D view when shadows are enabled. [#4051](https://github.com/CesiumGS/cesium/issues/4051)
  修复了启用阴影时切换到 2D 视图抛出异常的问题。[#4051](https://github.com/CesiumGS/cesium/issues/4051)
- Fixed an issue causing entities to disappear when updating multiple entities simultaneously. [#4096](https://github.com/CesiumGS/cesium/issues/4096)
  修复了同时更新多个实体导致实体消失的问题。[#4096](https://github.com/CesiumGS/cesium/issues/4096)
- Normalizing the velocity vector produced by `VelocityVectorProperty` is now optional.
  对 `VelocityVectorProperty` 生成的速度向量进行归一化现在是可选的。
- Pack functions now return the result array [#4156](https://github.com/CesiumGS/cesium/pull/4156)
  打包（pack）函数现在返回结果数组。[#4156](https://github.com/CesiumGS/cesium/pull/4156)
- Added optional `rangeMax` parameter to `Math.toSNorm` and `Math.fromSNorm`. [#4121](https://github.com/CesiumGS/cesium/pull/4121)
  向 `Math.toSNorm` 和 `Math.fromSNorm` 添加了可选的 `rangeMax` 参数。[#4121](https://github.com/CesiumGS/cesium/pull/4121)
- Removed `MapQuest OpenStreetMap` from the list of demo base layers since direct tile access has been discontinued. See the [MapQuest Developer Blog](http://devblog.mapquest.com/2016/06/15/modernization-of-mapquest-results-in-changes-to-open-tile-access/) for details.
  从演示底图列表中移除了 `MapQuest OpenStreetMap`，因为直接瓦片访问已被终止。有关详细信息，请参阅 [MapQuest 开发者博客](http://devblog.mapquest.com/2016/06/15/modernization-of-mapquest-results-in-changes-to-open-tile-access/)。
- Fixed PolylinePipeline.generateArc to accept an array of heights when there's only one position [#4155](https://github.com/CesiumGS/cesium/pull/4155)
  修复了 `PolylinePipeline.generateArc` 在只有一个位置时接受高度数组的问题。[#4155](https://github.com/CesiumGS/cesium/pull/4155)

## 1.23 - 2016-07-01

- Breaking changes
  破坏性变更
  - `GroundPrimitive.initializeTerrainHeights()` must be called and have the returned promise resolve before a `GroundPrimitive` can be added synchronously.
    在可以同步添加 `GroundPrimitive` 之前，必须调用 `GroundPrimitive.initializeTerrainHeights()` 且等待返回的 promise 解析完成。
- Added terrain clamping to entities, KML, and GeoJSON
  为实体（entity）、KML 和 GeoJSON 添加了地形贴地（terrain clamping）支持
  - Added `heightReference` property to point, billboard and model entities.
    向点、广告牌和模型实体添加了 `heightReference` 属性。
  - Changed corridor, ellipse, polygon and rectangle entities to conform to terrain by using a `GroundPrimitive` if its material is a `ColorMaterialProperty` instance and it doesn't have a `height` or `extrudedHeight`. Entities with any other type of material are not clamped to terrain.
    修改了走廊、椭圆、多边形和矩形实体，如果其材质为 `ColorMaterialProperty` 实例且没有 `height` 或 `extrudedHeight`，则通过使用 `GroundPrimitive` 贴合地形。带有任何其他类型材质的实体不会贴合地形。
  - `KMLDataSource`
    `KMLDataSource`
    - Point and Model features will always respect `altitudeMode`.
      点和模型要素将始终遵循 `altitudeMode`。
    - Added `clampToGround` property. When `true`, clamps `Polygon`, `LineString` and `LinearRing` features to the ground if their `altitudeMode` is `clampToGround`. For this case, lines use a corridor instead of a polyline.
      添加了 `clampToGround` 属性。当为 `true` 时，如果 `Polygon`、`LineString` 和 `LinearRing` 要素的 `altitudeMode` 为 `clampToGround`，则将其贴地。在这种情况下，线使用走廊（corridor）而不是折线（polyline）。
  - `GeoJsonDataSource`
    `GeoJsonDataSource`
    - Points with a height will be drawn at that height; otherwise, they will be clamped to the ground.
      带有高度的点将绘制在该高度处；否则它们将贴地。
    - Added `clampToGround` property. When `true`, clamps `Polygon` and `LineString` features to the ground. For this case, lines use a corridor instead of a polyline.
      添加了 `clampToGround` 属性。当为 `true` 时，将 `Polygon` 和 `LineString` 要素贴地。在这种情况下，线使用走廊而不是折线。
  - Added [Ground Clamping Sandcastle example](https://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Ground%20Clamping.html&label=Showcases).
    添加了[贴地 Sandcastle 示例](https://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Ground%20Clamping.html&label=Showcases)。
- Improved performance and accuracy of polygon triangulation by using the [earcut](https://github.com/mapbox/earcut) library. Loading a GeoJSON with polygons for each country was 2x faster.
  通过使用 [earcut](https://github.com/mapbox/earcut) 库提高了多边形三角剖分的性能和精度。加载包含各国多边形的 GeoJSON 速度提升了 2 倍。
- Fix some large polygon triangulations. [#2788](https://github.com/CesiumGS/cesium/issues/2788)
  修复了某些大型多边形三角剖分的问题。[#2788](https://github.com/CesiumGS/cesium/issues/2788)
- Added support for the glTF extension [WEB3D_quantized_attributes](https://github.com/KhronosGroup/glTF/blob/master/extensions/Vendor/WEB3D_quantized_attributes/README.md). [#3241](https://github.com/CesiumGS/cesium/issues/3241)
  添加了对 glTF 扩展 [WEB3D_quantized_attributes](https://github.com/KhronosGroup/glTF/blob/master/extensions/Vendor/WEB3D_quantized_attributes/README.md) 的支持。[#3241](https://github.com/CesiumGS/cesium/issues/3241)
- Added CZML support for `Box`, `Corridor` and `Cylinder`. Added new CZML properties:
  添加了 CZML 对 `Box`、`Corridor` 和 `Cylinder` 的支持。添加了新的 CZML 属性：
  - `Billboard`: `width`, `height`, `heightReference`, `scaleByDistance`, `translucencyByDistance`, `pixelOffsetScaleByDistance`, `imageSubRegion`
    `Billboard`: `width`, `height`, `heightReference`, `scaleByDistance`, `translucencyByDistance`, `pixelOffsetScaleByDistance`, `imageSubRegion`
  - `Label`: `heightReference`, `translucencyByDistance`, `pixelOffsetScaleByDistance`
    `Label`: `heightReference`, `translucencyByDistance`, `pixelOffsetScaleByDistance`
  - `Model`: `heightReference`, `maximumScale`
    `Model`: `heightReference`, `maximumScale`
  - `Point`: `heightReference`, `scaleByDistance`, `translucencyByDistance`
    `Point`: `heightReference`, `scaleByDistance`, `translucencyByDistance`
  - `Ellipsoid`: `subdivisions`, `stackPartitions`, `slicePartitions`
    `Ellipsoid`: `subdivisions`, `stackPartitions`, `slicePartitions`
- Added `rotatable2D` property to to `Scene`, `CesiumWidget` and `Viewer` to enable map rotation in 2D mode. [#3897](https://github.com/CesiumGS/cesium/issues/3897)
  向 `Scene`、`CesiumWidget` 和 `Viewer` 添加了 `rotatable2D` 属性，以在 2D 模式下启用地图旋转。[#3897](https://github.com/CesiumGS/cesium/issues/3897)
- `Camera.setView` and `Camera.flyTo` now use the `orientation.heading` parameter in 2D if the map is rotatable.
  如果地图可旋转，`Camera.setView` 和 `Camera.flyTo` 现在会在 2D 模式下使用 `orientation.heading` 参数。
- Added `Camera.changed` event that will fire whenever the camera has changed more than `Camera.percentageChanged`. `percentageChanged` is in the range `[0, 1]`.
  添加了 `Camera.changed` 事件，当相机变化幅度超过 `Camera.percentageChanged` 时将触发该事件。`percentageChanged` 的取值范围为 `[0, 1]`。
- Zooming in toward a target point now keeps the target point at the same screen position. [#4016](https://github.com/CesiumGS/cesium/pull/4016)
  朝目标点放大时现在会将目标点保持在相同的屏幕位置。[#4016](https://github.com/CesiumGS/cesium/pull/4016)
- Improved `GroundPrimitive` performance.
  提升了 `GroundPrimitive` 的性能。
- Some incorrect KML (specifically KML that reuses IDs) is now parsed correctly.
  某些不规范的 KML（特别是复用 ID 的 KML）现在可以正确解析。
- Added `unsupportedNodeEvent` to `KmlDataSource` that is fired whenever an unsupported node is encountered.
  向 `KmlDataSource` 添加了 `unsupportedNodeEvent`，每当遇到不受支持的节点时触发。
- `Clock` now keeps its configuration settings self-consistent. Previously, this was done by `AnimationViewModel` and could become inconsistent in certain cases. [#4007](https://github.com/CesiumGS/cesium/pull/4007)
  `Clock` 现在能保持其配置设置的自身一致性。此前这是由 `AnimationViewModel` 完成的，在某些情况下可能会出现不一致。[#4007](https://github.com/CesiumGS/cesium/pull/4007)
- Updated [Google Cardboard Sandcastle example](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Cardboard.html&label=Showcase).
  更新了 [Google Cardboard Sandcastle 示例](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Cardboard.html&label=Showcase)。
- Added [hot air balloon](https://github.com/CesiumGS/cesium/tree/main/Apps/SampleData/models/CesiumBalloon) sample model.
  添加了[热气球](https://github.com/CesiumGS/cesium/tree/main/Apps/SampleData/models/CesiumBalloon)示例模型。
- Fixed handling of sampled Rectangle coordinates in CZML. [#4033](https://github.com/CesiumGS/cesium/pull/4033)
  修复了 CZML 中采样矩形坐标的处理问题。[#4033](https://github.com/CesiumGS/cesium/pull/4033)
- Fix "Cannot read property 'x' of undefined" error when calling SceneTransforms.wgs84ToWindowCoordinates in certain cases. [#4022](https://github.com/CesiumGS/cesium/pull/4022)
  修复了在某些情况下调用 SceneTransforms.wgs84ToWindowCoordinates 时报错“Cannot read property 'x' of undefined”的问题。[#4022](https://github.com/CesiumGS/cesium/pull/4022)
- Re-enabled mouse inputs after a specified number of milliseconds past the most recent touch event.
  在最近一次触摸事件过去指定的毫秒数后重新启用鼠标输入。
- Exposed a parametric ray-triangle intersection test to the API as `IntersectionTests.rayTriangleParametric`.
  将参数化射线-三角形相交测试作为 `IntersectionTests.rayTriangleParametric` 公开给 API。
- Added `packArray` and `unpackArray` functions to `Cartesian2`, `Cartesian3`, and `Cartesian4`.
  向 `Cartesian2`、`Cartesian3` 和 `Cartesian4` 添加了 `packArray` 和 `unpackArray` 函数。

## 1.22.2 - 2016-06-14

- This is an npm only release to fix the improperly published 1.22.1. There were no code changes.
  这是仅针对 npm 的版本，用于修复不正确发布的 1.22.1。无代码更改。

## 1.22.1 - 2016-06-13

- Fixed default Bing Key and added a watermark to notify users that they need to sign up for their own key.
  修复了默认 Bing Key，并添加了水印以提醒用户需要申请自己的 Key。

## 1.22 - 2016-06-01

- Breaking changes
  破坏性变更
  - `KmlDataSource` now requires `options.camera` and `options.canvas`.
    `KmlDataSource` 现在需要 `options.camera` 和 `options.canvas`。
- Added shadows
  添加了阴影
  - See the Sandcastle demo: [Shadows](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Shadows.html&label=Showcases).
    请参阅 Sandcastle 演示：[阴影（Shadows）](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Shadows.html&label=Showcases)。
  - Added `Viewer.shadows` and `Viewer.terrainShadows`. Both are off by default.
    添加了 `Viewer.shadows` 和 `Viewer.terrainShadows`。两者默认均为关闭。
  - Added `Viewer.shadowMap` and `Scene.shadowMap` for accessing the scene's shadow map.
    添加了 `Viewer.shadowMap` 和 `Scene.shadowMap`，用于访问场景的阴影贴图。
  - Added `castShadows` and `receiveShadows` properties to `Model` and `Entity.model`, and options to the `Model` constructor and `Model.fromGltf`.
    向 `Model` 和 `Entity.model` 添加了 `castShadows` 和 `receiveShadows` 属性，并向 `Model` 构造函数和 `Model.fromGltf` 添加了相应选项。
  - Added `castShadows` and `receiveShadows` properties to `Primitive`, and options to the `Primitive` constructor.
    向 `Primitive` 添加了 `castShadows` 和 `receiveShadows` 属性，并向 `Primitive` 构造函数添加了相应选项。
  - Added `castShadows` and `receiveShadows` properties to `Globe`.
    向 `Globe` 添加了 `castShadows` 和 `receiveShadows` 属性。
- Added `heightReference` to models so they can be drawn on terrain.
  为模型添加了 `heightReference`，使其可以在地形上绘制。
- Added support for rendering models in 2D and Columbus view.
  添加了在 2D 和哥伦布视图中渲染模型的支持。
- Added option to enable sun position based atmosphere color when `Globe.enableLighting` is `true`. [3439](https://github.com/CesiumGS/cesium/issues/3439)
  当 `Globe.enableLighting` 为 `true` 时，添加了启用基于太阳位置的大气颜色的选项。[3439](https://github.com/CesiumGS/cesium/issues/3439)
- Improved KML NetworkLink compatibility by supporting the `Url` tag. [#3895](https://github.com/CesiumGS/cesium/pull/3895).
  通过支持 `Url` 标签改进了 KML NetworkLink 的兼容性。[#3895](https://github.com/CesiumGS/cesium/pull/3895)。
- Added `VelocityVectorProperty` so billboard's aligned axis can follow the velocity vector. [#3908](https://github.com/CesiumGS/cesium/issues/3908)
  添加了 `VelocityVectorProperty`，使广告牌的对齐轴能够跟随速度向量。[#3908](https://github.com/CesiumGS/cesium/issues/3908)
- Improve memory management for entity billboard/label/point/path visualization.
  改进了实体广告牌/标签/点/路径可视化的内存管理。
- Added `terrainProviderChanged` event to `Scene` and `Globe`
  向 `Scene` 和 `Globe` 添加了 `terrainProviderChanged` 事件。
- Added support for hue, saturation, and brightness color shifts in the atmosphere in `SkyAtmosphere`. See the new Sandcastle example: [Atmosphere Color](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Atmosphere%20Color.html&label=Showcases). [#3439](https://github.com/CesiumGS/cesium/issues/3439)
  在 `SkyAtmosphere` 中添加了对大气色相、饱和度和亮度颜色偏移的支持。请参阅新的 Sandcastle 示例：[大气颜色（Atmosphere Color）](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Atmosphere%20Color.html&label=Showcases)。[#3439](https://github.com/CesiumGS/cesium/issues/3439)
- Fixed exaggerated terrain tiles disappearing. [#3676](https://github.com/CesiumGS/cesium/issues/3676)
  修复了夸大地形瓦片消失的问题。[#3676](https://github.com/CesiumGS/cesium/issues/3676)
- Fixed a bug that could cause incorrect normals to be computed for exaggerated terrain, especially for low-detail tiles. [#3904](https://github.com/CesiumGS/cesium/pull/3904)
  修复了可能导致夸大地形（尤其是低细节瓦片）法线计算错误的 bug。[#3904](https://github.com/CesiumGS/cesium/pull/3904)
- Fixed a bug that was causing errors to be thrown when picking and terrain was enabled. [#3779](https://github.com/CesiumGS/cesium/issues/3779)
  修复了启用地形时拾取操作会抛出错误的 bug。[#3779](https://github.com/CesiumGS/cesium/issues/3779)
- Fixed a bug that was causing the atmosphere to disappear when only atmosphere is visible. [#3347](https://github.com/CesiumGS/cesium/issues/3347)
  修复了仅大气可见时导致大气消失的 bug。[#3347](https://github.com/CesiumGS/cesium/issues/3347)
- Fixed infinite horizontal 2D scrolling in IE/Edge. [#3893](https://github.com/CesiumGS/cesium/issues/3893)
  修复了 IE/Edge 中的 2D 无限水平滚动问题。[#3893](https://github.com/CesiumGS/cesium/issues/3893)
- Fixed a bug that would cause a crash is the camera was on the IDL in 2D. [#3951](https://github.com/CesiumGS/cesium/issues/3951)
  修复了在 2D 模式下当相机位于国际日界线上时会导致崩溃的 bug。[#3951](https://github.com/CesiumGS/cesium/issues/3951)
- Fixed issue where a repeating model animation doesn't play when the clock is set to a time before the model was created. [#3932](https://github.com/CesiumGS/cesium/issues/3932)
  修复了当时间设置在模型创建时间之前时，循环模型动画不播放的问题。[#3932](https://github.com/CesiumGS/cesium/issues/3932)
- Fixed `Billboard.computeScreenSpacePosition` returning the wrong y coordinate. [#3920](https://github.com/CesiumGS/cesium/issues/3920)
  修复了 `Billboard.computeScreenSpacePosition` 返回错误 y 坐标的问题。[#3920](https://github.com/CesiumGS/cesium/issues/3920)
- Fixed issue where labels were disappearing. [#3730](https://github.com/CesiumGS/cesium/issues/3730)
  修复了标签消失的问题。[#3730](https://github.com/CesiumGS/cesium/issues/3730)
- Fixed issue where billboards on terrain didn't always update when the terrain provider was changed. [#3921](https://github.com/CesiumGS/cesium/issues/3921)
  修复了更改地形提供器时地形上的广告牌未能始终更新的问题。[#3921](https://github.com/CesiumGS/cesium/issues/3921)
- Fixed issue where `Matrix4.fromCamera` was taking eye/target instead of position/direction. [#3927](https://github.com/CesiumGS/cesium/issues/3927)
  修复了 `Matrix4.fromCamera` 接受 eye/target 而不是 position/direction 的问题。[#3927](https://github.com/CesiumGS/cesium/issues/3927)
- Added `Scene.nearToFarDistance2D` that determines the size of each frustum of the multifrustum in 2D.
  添加了 `Scene.nearToFarDistance2D`，用于确定 2D 模式下多视锥体中各个视锥体的大小。
- Added `Matrix4.computeView`.
  添加了 `Matrix4.computeView`。
- Added `CullingVolume.fromBoundingSphere`.
  添加了 `CullingVolume.fromBoundingSphere`。
- Added `debugShowShadowVolume` to `GroundPrimitive`.
  向 `GroundPrimitive` 添加了 `debugShowShadowVolume`。
- Fix issue with disappearing tiles on Linux. [#3889](https://github.com/CesiumGS/cesium/issues/3889)
  修复了 Linux 上瓦片消失的问题。[#3889](https://github.com/CesiumGS/cesium/issues/3889)

## 1.21 - 2016-05-02

- Breaking changes
  破坏性变更
  - Removed `ImageryMaterialProperty.alpha`. Use `ImageryMaterialProperty.color.alpha` instead.
    移除了 `ImageryMaterialProperty.alpha`。请改用 `ImageryMaterialProperty.color.alpha`。
  - Removed `OpenStreetMapImageryProvider`. Use `createOpenStreetMapImageryProvider` instead.
    移除了 `OpenStreetMapImageryProvider`。请改用 `createOpenStreetMapImageryProvider`。
- Added ability to import and export Sandcastle example using GitHub Gists. [#3795](https://github.com/CesiumGS/cesium/pull/3795)
  添加了使用 GitHub Gists 导入和导出 Sandcastle 示例的功能。[#3795](https://github.com/CesiumGS/cesium/pull/3795)
- Added `PolygonGraphics.closeTop`, `PolygonGraphics.closeBottom`, and `PolygonGeometry` options for creating an extruded polygon without a top or bottom. [#3879](https://github.com/CesiumGS/cesium/pull/3879)
  添加了 `PolygonGraphics.closeTop`、`PolygonGraphics.closeBottom` 以及 `PolygonGeometry` 选项，用于创建没有顶面或底面的拉伸多边形。[#3879](https://github.com/CesiumGS/cesium/pull/3879)
- Added support for polyline arrow material to `CzmlDataSource` [#3860](https://github.com/CesiumGS/cesium/pull/3860)
  为 `CzmlDataSource` 添加了对折线箭头材质的支持。[#3860](https://github.com/CesiumGS/cesium/pull/3860)
- Fixed issue causing the sun not to render. [#3801](https://github.com/CesiumGS/cesium/pull/3801)
  修复了导致太阳不渲染的问题。[#3801](https://github.com/CesiumGS/cesium/pull/3801)
- Fixed issue where `Camera.flyTo` would not work with a rectangle in 2D. [#3688](https://github.com/CesiumGS/cesium/issues/3688)
  修复了在 2D 模式下 `Camera.flyTo` 无法与矩形配合使用的问题。[#3688](https://github.com/CesiumGS/cesium/issues/3688)
- Fixed issue causing the fog to go dark and the atmosphere to flicker when the camera clips the globe. [#3178](https://github.com/CesiumGS/cesium/issues/3178)
  修复了当相机裁剪地球时导致雾变暗和大闪烁的问题。[#3178](https://github.com/CesiumGS/cesium/issues/3178)
- Fixed a bug that caused an exception and rendering to stop when using `ArcGisMapServerImageryProvider` to connect to a MapServer specifying the Web Mercator projection and a fullExtent bigger than the valid extent of the projection. [#3854](https://github.com/CesiumGS/cesium/pull/3854)
  修复了使用 `ArcGisMapServerImageryProvider` 连接到指定 Web 墨卡托投影且 fullExtent 大于投影有效范围的 MapServer 时导致抛出异常并停止渲染的 bug。[#3854](https://github.com/CesiumGS/cesium/pull/3854)
- Fixed issue causing an exception when switching scene modes with an active KML network link. [#3865](https://github.com/CesiumGS/cesium/issues/3865)
  修复了在活动 KML 网络链接存在时切换场景模式引发异常的问题。[#3865](https://github.com/CesiumGS/cesium/issues/3865)

## 1.20 - 2016-04-01

- Breaking changes
  破坏性变更
  - Removed `TileMapServiceImageryProvider`. Use `createTileMapServiceImageryProvider` instead.
    移除了 `TileMapServiceImageryProvider`。请改用 `createTileMapServiceImageryProvider`。
  - Removed `GroundPrimitive.geometryInstance`. Use `GroundPrimitive.geometryInstances` instead.
    移除了 `GroundPrimitive.geometryInstance`。请改用 `GroundPrimitive.geometryInstances`。
  - Removed `definedNotNull`. Use `defined` instead.
    移除了 `definedNotNull`。请改用 `defined`。
  - Removed ability to rotate the map in 2D due to the new infinite 2D scrolling feature.
    由于新增的无限 2D 滚动功能，移除了在 2D 模式下旋转地图的功能。
- Deprecated
  弃用
  - Deprecated `ImageryMaterialProperty.alpha`. It will be removed in 1.21. Use `ImageryMaterialProperty.color.alpha` instead.
    弃用了 `ImageryMaterialProperty.alpha`。它将在 1.21 中移除。请改用 `ImageryMaterialProperty.color.alpha`。
- Added infinite horizontal scrolling in 2D.
  添加了 2D 模式下的无限水平滚动。
- Added a code example to Sandcastle for the [new 1-meter Pennsylvania terrain service](http://cesiumjs.org/2016/03/15/New-Cesium-Terrain-Service-Covering-Pennsylvania/).
  在 Sandcastle 中添加了[新的 1 米级宾夕法尼亚地形服务](http://cesiumjs.org/2016/03/15/New-Cesium-Terrain-Service-Covering-Pennsylvania/)的代码示例。
- Fixed loading for KML `NetworkLink` to not append a `?` if there isn't a query string.
  修复了 KML `NetworkLink` 的加载逻辑，在没有查询字符串时不追加 `?`。
- Fixed handling of non-standard KML `styleUrl` references within a `StyleMap`.
  修复了 `StyleMap` 中非标准 KML `styleUrl` 引用的处理问题。
- Fixed issue in KML where StyleMaps from external documents fail to load.
  修复了 KML 中来自外部文档的 StyleMap 加载失败的问题。
- Added translucent and colored image support to KML ground overlays
  为 KML 地面包叠层（ground overlays）添加了半透明和彩色图像支持。
- Fix bug when upsampling exaggerated terrain where the terrain heights were exaggerated at twice the value. [#3607](https://github.com/CesiumGS/cesium/issues/3607)
  修复了对夸大地形进行上采样时地形高度被以两倍数值夸大的 bug。[#3607](https://github.com/CesiumGS/cesium/issues/3607)
- All external urls are now https by default to make Cesium work better with non-server-based applications. [#3650](https://github.com/CesiumGS/cesium/issues/3650)
  所有外部 URL 现在默认使用 https，以使 Cesium 更好地与非基于服务器的应用程序协同工作。[#3650](https://github.com/CesiumGS/cesium/issues/3650)
- `GeoJsonDataSource` now handles CRS `urn:ogc:def:crs:EPSG::4326`
  `GeoJsonDataSource` 现在支持坐标系（CRS）`urn:ogc:def:crs:EPSG::4326`。
- Fixed `TimeIntervalCollection.removeInterval` bug that resulted in too many intervals being removed.
  修复了 `TimeIntervalCollection.removeInterval` 导致过多区间被移除的 bug。
- `GroundPrimitive` throws a `DeveloperError` when passed an unsupported geometry type instead of crashing.
  当向 `GroundPrimitive` 传入不支持的几何体类型时，抛出 `DeveloperError` 而不是直接崩溃。
- Fix issue with billboard collections that have at least one billboard with an aligned axis and at least one billboard without an aligned axis. [#3318](https://github.com/CesiumGS/cesium/issues/3318)
  修复了包含至少一个带对齐轴广告牌和至少一个不带对齐轴广告牌的广告牌集合的问题。[#3318](https://github.com/CesiumGS/cesium/issues/3318)
- Fix a race condition that would cause the terrain to continue loading and unloading or cause a crash when changing terrain providers. [#3690](https://github.com/CesiumGS/cesium/issues/3690)
  修复了在更改地形提供器时导致地形持续加载和卸载或导致崩溃的竞态条件。[#3690](https://github.com/CesiumGS/cesium/issues/3690)
- Fix issue where the `GroundPrimitive` volume was being clipped by the far plane. [#3706](https://github.com/CesiumGS/cesium/issues/3706)
  修复了 `GroundPrimitive` 体积被远平面裁剪的问题。[#3706](https://github.com/CesiumGS/cesium/issues/3706)
- Fixed issue where `Camera.computeViewRectangle` was incorrect when crossing the international date line. [#3717](https://github.com/CesiumGS/cesium/issues/3717)
  修复了跨越国际日界线时 `Camera.computeViewRectangle` 计算不正确的问题。[#3717](https://github.com/CesiumGS/cesium/issues/3717)
- Added `Rectangle` result parameter to `Camera.computeViewRectangle`.
  向 `Camera.computeViewRectangle` 添加了 `Rectangle` 返回结果参数。
- Fixed a reentrancy bug in `EntityCollection.collectionChanged`. [#3739](https://github.com/CesiumGS/cesium/pull/3739)
  修复了 `EntityCollection.collectionChanged` 中的重入 bug。[#3739](https://github.com/CesiumGS/cesium/pull/3739)
- Fixed a crash that would occur if you added and removed an `Entity` with a path without ever actually rendering it. [#3738](https://github.com/CesiumGS/cesium/pull/3738)
  修复了在未实际渲染的情况下添加并移除带有路径的 `Entity` 时引发崩溃的问题。[#3738](https://github.com/CesiumGS/cesium/pull/3738)
- Fixed issue causing parts of geometry and billboards/labels to be clipped. [#3748](https://github.com/CesiumGS/cesium/issues/3748)
  修复了导致几何体和广告牌/标签的部分被裁剪的问题。[#3748](https://github.com/CesiumGS/cesium/issues/3748)
- Fixed bug where transparent image materials were drawn black.
  修复了透明图像材质被绘制为黑色的 bug。
- Fixed `Color.fromCssColorString` from reusing the input `result` alpha value in some cases.
  修复了 `Color.fromCssColorString` 在某些情况下复用传入的 `result` alpha 值的问题。

## 1.19 - 2016-03-01

- Breaking changes
  破坏性变更
  - `PolygonGeometry` now changes the input `Cartesian3` values of `options.positions` so that they are on the ellipsoid surface. This only affects polygons created synchronously with `options.perPositionHeight = false` when the positions have a non-zero height and the same positions are used for multiple entities. In this case, make a copy of the `Cartesian3` values used for the polygon positions.
    `PolygonGeometry` 现在会修改 `options.positions` 输入的 `Cartesian3` 值，使它们位于椭球表面上。这仅影响在位置具有非零高度且同一组位置用于多个实体时，使用 `options.perPositionHeight = false` 同步创建的多边形。在这种情况下，请为多边形位置使用的 `Cartesian3` 值创建副本。
- Deprecated
  弃用
  - Deprecated `KmlDataSource` taking a proxy object. It will throw an exception in 1.21. It now should take a `options` object with required `camera` and `canvas` parameters.
    弃用了 `KmlDataSource` 接受 proxy 对象的方式。它将在 1.21 中抛出异常。现在应传入包含必需的 `camera` 和 `canvas` 参数的 `options` 对象。
  - Deprecated `definedNotNull`. It will be removed in 1.20. Use `defined` instead, which now checks for `null` as well as `undefined`.
    弃用了 `definedNotNull`。它将在 1.20 中移除。请改用 `defined`，它现在会同时检查 `null` 和 `undefined`。
- Improved KML support.
  改进了 KML 支持。
  - Added support for `NetworkLink` refresh modes `onInterval`, `onExpire` and `onStop`. Includes support for `viewboundScale`, `viewFormat`, `httpQuery`.
    添加了对 `NetworkLink` 刷新模式 `onInterval`、`onExpire` 和 `onStop` 的支持。包括对 `viewboundScale`、`viewFormat` 和 `httpQuery` 的支持。
  - Added partial support for `NetworkLinkControl` including `minRefreshPeriod`, `cookie` and `expires`.
    添加了对 `NetworkLinkControl` 的部分支持，包括 `minRefreshPeriod`、`cookie` 和 `expires`。
  - Added support for local `StyleMap`. The `highlight` style is still ignored.
    添加了对本地 `StyleMap` 的支持。`highlight` 样式仍被忽略。
  - Added support for `root://` URLs.
    添加了对 `root://` URL 的支持。
  - Added more warnings for unsupported features.
    针对不受支持的特性添加了更多警告。
  - Improved style processing in IE.
    改进了 IE 中的样式处理。
- `Viewer.zoomTo` and `Viewer.flyTo` now accept an `ImageryLayer` instance as a valid parameter and will zoom to the extent of the imagery.
  `Viewer.zoomTo` 和 `Viewer.flyTo` 现在接受 `ImageryLayer` 实例作为有效参数，并将缩放到影像的范围。
- Added `Camera.flyHome` function for resetting the camera to the home view.
  添加了 `Camera.flyHome` 函数，用于将相机重置为主视角（home view）。
- `Camera.flyTo` now honors max and min zoom settings in `ScreenSpaceCameraController`.
  `Camera.flyTo` 现在会遵循 `ScreenSpaceCameraController` 中的最大和最小缩放设置。
- Added `show` property to `CzmlDataSource`, `GeoJsonDataSource`, `KmlDataSource`, `CustomDataSource`, and `EntityCollection` for easily toggling display of entire data sources.
  向 `CzmlDataSource`、`GeoJsonDataSource`、`KmlDataSource`、`CustomDataSource` 和 `EntityCollection` 添加了 `show` 属性，用于轻松切换整个数据源的显示状态。
- Added `owner` property to `CompositeEntityCollection`.
  向 `CompositeEntityCollection` 添加了 `owner` 属性。
- Added `DataSouceDisplay.ready` for determining whether or not static data associated with the Entity API has been rendered.
  添加了 `DataSouceDisplay.ready`，用于确定与 Entity API 关联的静态数据是否已渲染。
- Fix an issue when changing a billboard's position property multiple times per frame. [#3511](https://github.com/CesiumGS/cesium/pull/3511)
  修复了每帧多次更改广告牌 position 属性时的问题。[#3511](https://github.com/CesiumGS/cesium/pull/3511)
- Fixed texture coordinates for polygon with position heights.
  修复了具有位置高度的多边形的纹理坐标。
- Fixed issue that kept `GroundPrimitive` with an `EllipseGeometry` from having a `rotation`.
  修复了阻止带有 `EllipseGeometry` 的 `GroundPrimitive` 具有 `rotation` 的问题。
- Fixed crash caused when drawing `CorridorGeometry` and `CorridorOutlineGeometry` synchronously.
  修复了同步绘制 `CorridorGeometry` 和 `CorridorOutlineGeometry` 时导致的崩溃。
- Added the ability to create empty geometries. Instead of throwing `DeveloperError`, `undefined` is returned.
  添加了创建空几何体的功能。现在返回 `undefined` 而不是抛出 `DeveloperError`。
- Fixed flying to `latitude, longitude, height` in the Geocoder.
  修复了在地理编码器中飞向 `latitude, longitude, height` 的问题。
- Fixed bug in `IntersectionTests.lineSegmentSphere` where the ray origin was not set.
  修复了 `IntersectionTests.lineSegmentSphere` 中未设置射线起点的 bug。
- Added `length` to `Matrix2`, `Matrix3` and `Matrix4` so these can be used as array-like objects.
  向 `Matrix2`、`Matrix3` 和 `Matrix4` 添加了 `length`，使其可以用作类数组对象。
- Added `Color.add`, `Color.subtract`, `Color.multiply`, `Color.divide`, `Color.mod`, `Color.multiplyByScalar`, and `Color.divideByScalar` functions to perform arithmetic operations on colors.
  添加了 `Color.add`、`Color.subtract`、`Color.multiply`、`Color.divide`、`Color.mod`、`Color.multiplyByScalar` 和 `Color.divideByScalar` 函数，用于对颜色执行算术运算。
- Added optional `result` parameter to `Color.fromRgba`, `Color.fromHsl` and `Color.fromCssColorString`.
  向 `Color.fromRgba`、`Color.fromHsl` 和 `Color.fromCssColorString` 添加了可选的 `result` 参数。
- Fixed bug causing `navigator is not defined` reference error when Cesium is used with Node.js.
  修复了在 Node.js 中使用 Cesium 时导致 `navigator is not defined` 引用错误的 bug。
- Upgraded Knockout from version 3.2.0 to 3.4.0.
  将 Knockout 从版本 3.2.0 升级到 3.4.0。
- Fixed hole that appeared in the top of in dynamic ellipsoids
  修复了动态椭球顶部出现的洞的问题。

## 1.18 - 2016-02-01

- Breaking changes
  破坏性变更
  - Removed support for `CESIUM_binary_glTF`. Use `KHR_binary_glTF` instead, which is the default for the online [COLLADA-to-glTF converter](http://cesiumjs.org/convertmodel.html).
    移除了对 `CESIUM_binary_glTF` 的支持。请改用 `KHR_binary_glTF`，这是在线 [COLLADA-to-glTF 转换器](http://cesiumjs.org/convertmodel.html)的默认设置。
- Deprecated
  弃用
  - Deprecated `GroundPrimitive.geometryInstance`. It will be removed in 1.20. Use `GroundPrimitive.geometryInstances` instead.
    弃用了 `GroundPrimitive.geometryInstance`。它将在 1.20 中移除。请改用 `GroundPrimitive.geometryInstances`。
  - Deprecated `TileMapServiceImageryProvider`. It will be removed in 1.20. Use `createTileMapServiceImageryProvider` instead.
    弃用了 `TileMapServiceImageryProvider`。它将在 1.20 中移除。请改用 `createTileMapServiceImageryProvider`。
- Reduced the amount of CPU memory used by terrain by ~25% in Chrome.
  在 Chrome 中将地形占用的 CPU 内存减少了约 25%。
- Added a Sandcastle example to "star burst" overlapping billboards and labels.
  添加了一个 Sandcastle 示例，用于重叠广告牌和标签的“星爆（star burst）”展开效果。
- Added `VRButton` which is a simple, single-button widget that toggles VR mode. It is off by default. To enable the button, set the `vrButton` option to `Viewer` to `true`. Only Cardboard for mobile is supported. More VR devices will be supported when the WebVR API is more stable.
  添加了 `VRButton`，这是一个切换 VR 模式的简单单按钮小部件。默认处于关闭状态。要启用该按钮，请在 `Viewer` 中将 `vrButton` 选项设置为 `true`。目前仅支持移动端 Cardboard。当 WebVR API 更加稳定时将支持更多 VR 设备。
- Added `Scene.useWebVR` to switch the scene to use stereoscopic rendering.
  添加了 `Scene.useWebVR`，用于切换场景使用立体（双目）渲染。
- Cesium now honors `window.devicePixelRatio` on browsers that support the CSS `imageRendering` attribute. This greatly improves performance on mobile devices and high DPI displays by rendering at the browser-recommended resolution. This also reduces bandwidth usage and increases battery life in these cases. To enable the previous behavior, use the following code:
  Cesium 现在在支持 CSS `imageRendering` 属性的浏览器上遵循 `window.devicePixelRatio`。通过以浏览器推荐的分辨率进行渲染，这极大地提高了移动设备和高 DPI 显示器上的性能。在这些情况下，这还能减少带宽使用并延长电池续航。要保留以前的行为，请使用以下代码：
  ```javascript
  if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
    viewer.resolutionScale = window.devicePixelRatio;
  }
  ```
- `GroundPrimitive` now supports batching geometry for better performance.
  `GroundPrimitive` 现在支持几何体批处理以提高性能。
- Improved compatibility with glTF KHR_binary_glTF and KHR_materials_common extensions
  改进了与 glTF KHR_binary_glTF 和 KHR_materials_common 扩展的兼容性。
- Added `ImageryLayer.getViewableRectangle` to make it easy to get the effective bounds of an imagery layer.
  添加了 `ImageryLayer.getViewableRectangle`，以方便获取影像图层的有效范围。
- Improved compatibility with glTF KHR_binary_glTF and KHR_materials_common extensions
  改进了与 glTF KHR_binary_glTF 和 KHR_materials_common 扩展的兼容性。
- Fixed a picking issue that sometimes prevented objects being selected. [#3386](https://github.com/CesiumGS/cesium/issues/3386)
  修复了有时阻止选中对象的拾取问题。[#3386](https://github.com/CesiumGS/cesium/issues/3386)
- Fixed cracking between tiles in 2D. [#3486](https://github.com/CesiumGS/cesium/pull/3486)
  修复了 2D 模式下瓦片之间的裂缝问题。[#3486](https://github.com/CesiumGS/cesium/pull/3486)
- Fixed creating bounding volumes for `GroundPrimitive`s whose containing rectangle has a width greater than pi.
  修复了为所包含矩形宽度大于 pi 的 `GroundPrimitive` 创建包围体积的问题。
- Fixed incorrect texture coordinates for polygons with large height.
  修复了具有较大高度的多边形纹理坐标错误的问题。
- Fixed camera.flyTo not working when in 2D mode and only orientation changes
  修复了在 2D 模式下仅朝向改变时 camera.flyTo 不起作用的问题。
- Added `UrlTemplateImageryProvider.reinitialize` for changing imagery provider options without creating a new instance.
  添加了 `UrlTemplateImageryProvider.reinitialize`，用于在不创建新实例的情况下更改影像提供器选项。
- `UrlTemplateImageryProvider` now accepts a promise to an `options` object in addition to taking the object directly.
  `UrlTemplateImageryProvider` 现在除了直接接受对象外，还接受返回 `options` 对象的 promise。
- Fixed a bug that prevented WMS feature picking from working with THREDDS XML and msGMLOutput in Internet Explorer 11.
  修复了在 Internet Explorer 11 中阻止 WMS 要素拾取与 THREDDS XML 和 msGMLOutput 协同工作的 bug。
- Added `Scene.useDepthPicking` to enable or disable picking using the depth buffer. [#3390](https://github.com/CesiumGS/cesium/pull/3390)
  添加了 `Scene.useDepthPicking`，用于启用或禁用使用深度缓冲区进行拾取。[#3390](https://github.com/CesiumGS/cesium/pull/3390)
- Added `BoundingSphere.fromEncodedCartesianVertices` to create bounding volumes from parallel arrays of the upper and lower bits of `EncodedCartesian3`s.
  添加了 `BoundingSphere.fromEncodedCartesianVertices`，用于根据 `EncodedCartesian3` 高位和低位的并行数组创建包围体积。
- Added helper functions: `getExtensionFromUri`, `getAbsoluteUri`, and `Math.logBase`.
  添加了辅助函数：`getExtensionFromUri`、`getAbsoluteUri` 和 `Math.logBase`。
- Added `Rectangle.union` and `Rectangle.expand`.
  添加了 `Rectangle.union` 和 `Rectangle.expand`。
- TMS support now works with newer versions of gdal2tiles.py generated layers. `createTileMapServiceImageryProvider`. Tilesets generated with older gdal2tiles.py versions may need to have the `flipXY : true` option set to load correctly.
  TMS 支持现在适用于较新版本 gdal2tiles.py 生成的图层（`createTileMapServiceImageryProvider`）。使用较旧 gdal2tiles.py 版本生成的瓦片集可能需要设置 `flipXY : true` 选项才能正确加载。

## 1.17 - 2016-01-04

- Breaking changes
  破坏性变更
  - Removed `Camera.viewRectangle`. Use `Camera.setView({destination: rectangle})` instead.
    移除了 `Camera.viewRectangle`。请改用 `Camera.setView({destination: rectangle})`。
  - Removed `RectanglePrimitive`. Use `RectangleGeometry` or `Entity.rectangle` instead.
    移除了 `RectanglePrimitive`。请改用 `RectangleGeometry` 或 `Entity.rectangle`。
  - Removed `Polygon`. Use `PolygonGeometry` or `Entity.polygon` instead.
    移除了 `Polygon`。请改用 `PolygonGeometry` 或 `Entity.polygon`。
  - Removed `OrthographicFrustum.getPixelSize`. Use `OrthographicFrustum.getPixelDimensions` instead.
    移除了 `OrthographicFrustum.getPixelSize`。请改用 `OrthographicFrustum.getPixelDimensions`。
  - Removed `PerspectiveFrustum.getPixelSize`. Use `PerspectiveFrustum.getPixelDimensions` instead.
    移除了 `PerspectiveFrustum.getPixelSize`。请改用 `PerspectiveFrustum.getPixelDimensions`。
  - Removed `PerspectiveOffCenterFrustum.getPixelSize`. Use `PerspectiveOffCenterFrustum.getPixelDimensions` instead.
    移除了 `PerspectiveOffCenterFrustum.getPixelSize`。请改用 `PerspectiveOffCenterFrustum.getPixelDimensions`。
  - Removed `Scene\HeadingPitchRange`. Use `Core\HeadingPitchRange` instead.
    移除了 `Scene\HeadingPitchRange`。请改用 `Core\HeadingPitchRange`。
  - Removed `jsonp`. Use `loadJsonp` instead.
    移除了 `jsonp`。请改用 `loadJsonp`。
  - Removed `HeightmapTessellator` from the public API. It is an implementation details.
    从公共 API 中移除了 `HeightmapTessellator`。它属于内部实现细节。
  - Removed `TerrainMesh` from the public API. It is an implementation details.
    从公共 API 中移除了 `TerrainMesh`。它属于内部实现细节。
- Reduced the amount of GPU and CPU memory used by terrain by using [compression](http://cesiumjs.org/2015/12/18/Terrain-Quantization/). The CPU memory was reduced by up to 40%.
  通过使用[压缩（Terrain-Quantization）](http://cesiumjs.org/2015/12/18/Terrain-Quantization/)减少了地形占用的 GPU 和 CPU 内存。CPU 内存最多减少了 40%。
- Added the ability to manipulate `Model` node transformations via CZML and the Entity API. See the new Sandcastle example: [CZML Model - Node Transformations](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=CZML%20Model%20-%20Node%20Transformations.html&label=CZML). [#3316](https://github.com/CesiumGS/cesium/pull/3316)
  添加了通过 CZML 和 Entity API 操纵 `Model` 节点变换的功能。请参阅新的 Sandcastle 示例：[CZML 模型 - 节点变换（CZML Model - Node Transformations）](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=CZML%20Model%20-%20Node%20Transformations.html&label=CZML)。[#3316](https://github.com/CesiumGS/cesium/pull/3316)
- Added `Globe.tileLoadProgressEvent`, which is raised when the length of the tile load queue changes, enabling incremental loading indicators.
  添加了 `Globe.tileLoadProgressEvent`，当瓦片加载队列的长度发生改变时触发，支持增量加载进度指示器。
- Added support for msGMLOutput and Thredds server feature information formats to `GetFeatureInfoFormat` and `WebMapServiceImageryProvider`.
  为 `GetFeatureInfoFormat` 和 `WebMapServiceImageryProvider` 添加了对 msGMLOutput 和 Thredds 服务器要素信息格式的支持。
- Added dynamic `enableFeaturePicking` toggle to all ImageryProviders that support feature picking.
  向所有支持要素拾取的 ImageryProvider 添加了动态 `enableFeaturePicking` 开关。
- Fixed disappearing terrain while fog is active. [#3335](https://github.com/CesiumGS/cesium/issues/3335)
  修复了雾效激活时地形消失的问题。[#3335](https://github.com/CesiumGS/cesium/issues/3335)
- Fixed short segments in `CorridorGeometry` and `PolylineVolumeGeometry`. [#3293](https://github.com/CesiumGS/cesium/issues/3293)
  修复了 `CorridorGeometry` 和 `PolylineVolumeGeometry` 中的短线段问题。[#3293](https://github.com/CesiumGS/cesium/issues/3293)
- Fixed `CorridorGeometry` with nearly colinear points. [#3320](https://github.com/CesiumGS/cesium/issues/3320)
  修复了具有近似共线点时的 `CorridorGeometry` 问题。[#3320](https://github.com/CesiumGS/cesium/issues/3320)
- Added missing points to `EllipseGeometry` and `EllipseOutlineGeometry`. [#3078](https://github.com/CesiumGS/cesium/issues/3078)
  为 `EllipseGeometry` 和 `EllipseOutlineGeometry` 补充了缺失的点。[#3078](https://github.com/CesiumGS/cesium/issues/3078)
- `Rectangle.fromCartographicArray` now uses the smallest rectangle regardess of whether or not it crosses the international date line. [#3227](https://github.com/CesiumGS/cesium/issues/3227)
  `Rectangle.fromCartographicArray` 现在无论是否跨越国际日界线均使用最小矩形。[#3227](https://github.com/CesiumGS/cesium/issues/3227)
- Added `TranslationRotationScale` property, which represents an affine transformation defined by a translation, rotation, and scale.
  添加了 `TranslationRotationScale` 属性，表示由平移、旋转和缩放定义的仿射变换。
- Added `Matrix4.fromTranslationRotationScale`.
  添加了 `Matrix4.fromTranslationRotationScale`。
- Added `NodeTransformationProperty`, which is a `Property` value that is defined by independent `translation`, `rotation`, and `scale` `Property` instances.
  添加了 `NodeTransformationProperty`，这是一个由独立的 `translation`、`rotation` 和 `scale` `Property` 实例定义的 `Property` 值。
- Added `PropertyBag`, which is a `Property` whose value is a key-value mapping of property names to the computed value of other properties.
  添加了 `PropertyBag`，它是一个 `Property`，其值为属性名称到其他属性计算值的键值映射。
- Added `ModelGraphics.runAnimations` which is a boolean `Property` indicating if all model animations should be started after the model is loaded.
  添加了 `ModelGraphics.runAnimations`，这是一个布尔类型的 `Property`，指示模型加载后是否应启动所有模型动画。
- Added `ModelGraphics.nodeTransformations` which is a `PropertyBag` of `TranslationRotationScale` properties to be applied to a loaded model.
  添加了 `ModelGraphics.nodeTransformations`，这是应用于已加载模型的 `TranslationRotationScale` 属性的 `PropertyBag`。
- Added CZML support for new `runAnimations` and `nodeTransformations` properties on the `model` packet.
  在 `model` 数据包中添加了 CZML 对新的 `runAnimations` 和 `nodeTransformations` 属性的支持。

## 1.16 - 2015-12-01

- Deprecated
  弃用
  - Deprecated `HeightmapTessellator`. It will be removed in 1.17.
    弃用了 `HeightmapTessellator`。它将在 1.17 中移除。
  - Deprecated `TerrainMesh`. It will be removed in 1.17.
    弃用了 `TerrainMesh`。它将在 1.17 中移除。
  - Deprecated `OpenStreetMapImageryProvider`. It will be removed in 1.18. Use `createOpenStreetMapImageryProvider` instead.
    弃用了 `OpenStreetMapImageryProvider`。它将在 1.18 中移除。请改用 `createOpenStreetMapImageryProvider`。
- Improved terrain performance by up to 35%. Added support for fog near the horizon, which improves performance by rendering less terrain tiles and reduces terrain tile requests. This is enabled by default. See `Scene.fog` for options. [#3154](https://github.com/CesiumGS/cesium/pull/3154)
  将地形性能提升了高达 35%。添加了对地平线附近雾效的支持，通过渲染更少的地形瓦片并减少地形瓦片请求来提高性能。该功能默认启用。有关选项请参阅 `Scene.fog`。[#3154](https://github.com/CesiumGS/cesium/pull/3154)
- Added terrain exaggeration. Enabled on viewer creation with the exaggeration scalar as the `terrainExaggeration` option.
  添加了地形夸大（terrain exaggeration）功能。可在创建 viewer 时通过 `terrainExaggeration` 选项传入夸大比例标量来启用。
- Added support for incrementally loading textures after a Model is ready. This allows the Model to be visible as soon as possible while its textures are loaded in the background.
  添加了在模型就绪后增量加载纹理的支持。这允许模型尽快可见，同时在后台加载其纹理。
- `ImageMaterialProperty.image` now accepts an `HTMLVideoElement`. You can also assign a video element directly to an Entity `material` property.
  `ImageMaterialProperty.image` 现在支持 `HTMLVideoElement`。你也可以将视频元素直接赋给实体的 `material` 属性。
- `Material` image uniforms now accept and `HTMLVideoElement` anywhere it could previously take a `Canvas` element.
  `Material` 图像 uniforms 现在在以前可以接受 `Canvas` 元素的任何位置都接受 `HTMLVideoElement`。
- Added `VideoSynchronizer` helper object for keeping an `HTMLVideoElement` in sync with a scene's clock.
  添加了 `VideoSynchronizer` 辅助对象，用于保持 `HTMLVideoElement` 与场景时钟同步。
- Fixed an issue with loading skeletons for skinned glTF models. [#3224](https://github.com/CesiumGS/cesium/pull/3224)
  修复了蒙皮 glTF 模型加载骨骼时的问题。[#3224](https://github.com/CesiumGS/cesium/pull/3224)
- Fixed an issue with tile selection when below the surface of the ellipsoid. [#3170](https://github.com/CesiumGS/cesium/issues/3170)
  修复了位于椭球表面下方时瓦片选择的问题。[#3170](https://github.com/CesiumGS/cesium/issues/3170)
- Added `Cartographic.fromCartesian` function.
  添加了 `Cartographic.fromCartesian` 函数。
- Added `createOpenStreetMapImageryProvider` function to replace the `OpenStreetMapImageryProvider` class. This function returns a constructed `UrlTemplateImageryProvider`.
  添加了 `createOpenStreetMapImageryProvider` 函数以替代 `OpenStreetMapImageryProvider` 类。该函数返回一个构造好的 `UrlTemplateImageryProvider`。
- `GeoJsonDataSource.load` now takes an optional `describeProperty` function for generating feature description properties. [#3140](https://github.com/CesiumGS/cesium/pull/3140)
  `GeoJsonDataSource.load` 现在接受可选的 `describeProperty` 函数，用于生成要素描述属性。[#3140](https://github.com/CesiumGS/cesium/pull/3140)
- Added `ImageryProvider.readyPromise` and `TerrainProvider.readyPromise` and implemented it in all terrain and imagery providers. This is a promise which resolves when `ready` becomes true and rejected if there is an error during initialization. [#3175](https://github.com/CesiumGS/cesium/pull/3175)
  添加了 `ImageryProvider.readyPromise` 和 `TerrainProvider.readyPromise`，并在所有地形和影像提供器中实现。这是一个当 `ready` 变为 true 时解析（resolve）、在初始化出错时拒绝（reject）的 promise。[#3175](https://github.com/CesiumGS/cesium/pull/3175)
- Fixed an issue where the sun texture is not generated correctly on some mobile devices. [#3141](https://github.com/CesiumGS/cesium/issues/3141)
  修复了在某些移动设备上太阳纹理生成不正确的问题。[#3141](https://github.com/CesiumGS/cesium/issues/3141)
- Fixed a bug that caused setting `Entity.parent` to `undefined` to throw an exception. [#3169](https://github.com/CesiumGS/cesium/issues/3169)
  修复了将 `Entity.parent` 设置为 `undefined` 时抛出异常的 bug。[#3169](https://github.com/CesiumGS/cesium/issues/3169)
- Fixed a bug which caused `Entity` polyline graphics to be incorrect when a scene's ellipsoid was not WGS84. [#3174](https://github.com/CesiumGS/cesium/pull/3174)
  修复了场景的椭球不是 WGS84 时导致 `Entity` 折线图形不正确的 bug。[#3174](https://github.com/CesiumGS/cesium/pull/3174)
- Entities have a reference to their entity collection and to their owner (usually a data source, but can be a `CompositeEntityCollection`).
  实体现在包含对其实体集合以及对其所有者（通常为数据源，但也可以是 `CompositeEntityCollection`）的引用。
- Added `ImageMaterialProperty.alpha` and a `alpha` uniform to `Image` and `Material` types to control overall image opacity. It defaults to 1.0, fully opaque.
  向 `Image` 和 `Material` 类型添加了 `ImageMaterialProperty.alpha` 和 `alpha` uniform，用于控制整体图像不透明度。默认值为 1.0（完全不透明）。
- Added `Camera.getPixelSize` function to get the size of a pixel in meters based on the current view.
  添加了 `Camera.getPixelSize` 函数，用于根据当前视角获取以米为单位的像素大小。
- Added `Camera.distanceToBoundingSphere` function.
  添加了 `Camera.distanceToBoundingSphere` 函数。
- Added `BoundingSphere.fromOrientedBoundingBox` function.
  添加了 `BoundingSphere.fromOrientedBoundingBox` 函数。
- Added utility function `getBaseUri`, which given a URI with or without query parameters, returns the base path of the URI.
  添加了实用函数 `getBaseUri`，传入带有或不带查询参数的 URI，返回该 URI 的基本路径。
- Added `Queue.peek` to return the item at the front of a Queue.
  添加了 `Queue.peek` 以返回队列头部的元素。
- Fixed `JulianDate.fromIso8601` so that it correctly parses the `YYYY-MM-DDThh:mmTZD` format.
  修复了 `JulianDate.fromIso8601`，以便其正确解析 `YYYY-MM-DDThh:mmTZD` 格式。
- Added `Model.maximumScale` and `ModelGraphics.maximumScale` properties, giving an upper limit for minimumPixelSize.
  添加了 `Model.maximumScale` 和 `ModelGraphics.maximumScale` 属性，为 minimumPixelSize 提供上限。
- Fixed glTF implementation to read the version as a string as per the specification and to correctly handle backwards compatibility for axis-angle rotations in glTF 0.8 models.
  修复了 glTF 实现以按照规范将版本读取为字符串，并正确处理 glTF 0.8 模型中轴角旋转的向后兼容性。
- Fixed a bug in the deprecated `jsonp` that prevented it from returning a promise. Its replacement, `loadJsonp`, was unaffected.
  修复了已弃用的 `jsonp` 中阻止其返回 promise 的 bug。替代函数 `loadJsonp` 未受影响。
- Fixed a bug where loadWithXhr would reject the returned promise with successful HTTP responses (2xx) that weren't 200.
  修复了 loadWithXhr 会对非 200 的成功 HTTP 响应（2xx）拒绝返回的 promise 的 bug。

## 1.15 - 2015-11-02

- Breaking changes
  破坏性变更
  - Deleted old `<subfolder>/package.json` and `*.profile.js` files, not used since Cesium moved away from a Dojo-based build years ago. This will allow future compatibility with newer systems like Browserify and Webpack.
    删除了旧的 `<subfolder>/package.json` 和 `*.profile.js` 文件，这些文件自 Cesium 多年前脱离基于 Dojo 的构建以来已不再使用。这将保证未来与 Browserify 和 Webpack 等较新系统的兼容性。
- Deprecated
  弃用
  - Deprecated `Camera.viewRectangle`. It will be removed in 1.17. Use `Camera.setView({destination: rectangle})` instead.
    弃用了 `Camera.viewRectangle`。它将在 1.17 中移除。请改用 `Camera.setView({destination: rectangle})`。
  - The following options to `Camera.setView` have been deprecated and will be removed in 1.17:
    `Camera.setView` 的以下选项已弃用，并将在 1.17 中移除：
    - `position`. Use `destination` instead.
      `position`。请改用 `destination`。
    - `positionCartographic`. Convert to a `Cartesian3` and use `destination` instead.
      `positionCartographic`。转换为 `Cartesian3` 并改用 `destination`。
    - `heading`, `pitch` and `roll`. Use `orientation.heading/pitch/roll` instead.
      `heading`、`pitch` 和 `roll`。请改用 `orientation.heading/pitch/roll`。
  - Deprecated `CESIUM_binary_glTF` extension support for glTF models. [KHR_binary_glTF](https://github.com/KhronosGroup/glTF/tree/master/extensions/Khronos/KHR_binary_glTF) should be used instead. `CESIUM_binary_glTF` will be removed in 1.18. Reconvert models using the online [model converter](http://cesiumjs.org/convertmodel.html).
    弃用了对 glTF 模型的 `CESIUM_binary_glTF` 扩展支持。应改用 [KHR_binary_glTF](https://github.com/KhronosGroup/glTF/tree/master/extensions/Khronos/KHR_binary_glTF)。`CESIUM_binary_glTF` 将在 1.18 中移除。请使用在线[模型转换器](http://cesiumjs.org/convertmodel.html)重新转换模型。
  - Deprecated `RectanglePrimitive`. It will be removed in 1.17. Use `RectangleGeometry` or `Entity.rectangle` instead.
    弃用了 `RectanglePrimitive`。它将在 1.17 中移除。请改用 `RectangleGeometry` 或 `Entity.rectangle`。
  - Deprecated `EllipsoidPrimitive`. It will be removed in 1.17. Use `EllipsoidGeometry` or `Entity.ellipsoid` instead.
    弃用了 `EllipsoidPrimitive`。它将在 1.17 中移除。请改用 `EllipsoidGeometry` 或 `Entity.ellipsoid`。
  - Made `EllipsoidPrimitive` private, use `EllipsoidGeometry` or `Entity.ellipsoid` instead.
    将 `EllipsoidPrimitive` 设为私有，请改用 `EllipsoidGeometry` 或 `Entity.ellipsoid`。
  - Deprecated `BoxGeometry.minimumCorner` and `BoxGeometry.maximumCorner`. These will be removed in 1.17. Use `BoxGeometry.minimum` and `BoxGeometry.maximum` instead.
    弃用了 `BoxGeometry.minimumCorner` 和 `BoxGeometry.maximumCorner`。它们将在 1.17 中移除。请改用 `BoxGeometry.minimum` 和 `BoxGeometry.maximum`。
  - Deprecated `BoxOutlineGeometry.minimumCorner` and `BoxOutlineGeometry.maximumCorner`. These will be removed in 1.17. Use `BoxOutlineGeometry.minimum` and `BoxOutlineGeometry.maximum` instead.
    弃用了 `BoxOutlineGeometry.minimumCorner` 和 `BoxOutlineGeometry.maximumCorner`。它们将在 1.17 中移除。请改用 `BoxOutlineGeometry.minimum` 和 `BoxOutlineGeometry.maximum`。
  - Deprecated `OrthographicFrustum.getPixelSize`. It will be removed in 1.17. Use `OrthographicFrustum.getPixelDimensions` instead.
    弃用了 `OrthographicFrustum.getPixelSize`。它将在 1.17 中移除。请改用 `OrthographicFrustum.getPixelDimensions`。
  - Deprecated `PerspectiveFrustum.getPixelSize`. It will be removed in 1.17. Use `PerspectiveFrustum.getPixelDimensions` instead.
    弃用了 `PerspectiveFrustum.getPixelSize`。它将在 1.17 中移除。请改用 `PerspectiveFrustum.getPixelDimensions`。
  - Deprecated `PerspectiveOffCenterFrustum.getPixelSize`. It will be removed in 1.17. Use `PerspectiveOffCenterFrustum.getPixelDimensions` instead.
    弃用了 `PerspectiveOffCenterFrustum.getPixelSize`。它将在 1.17 中移除。请改用 `PerspectiveOffCenterFrustum.getPixelDimensions`。
  - Deprecated `Scene\HeadingPitchRange`. It will be removed in 1.17. Use `Core\HeadingPitchRange` instead.
    弃用了 `Scene\HeadingPitchRange`。它将在 1.17 中移除。请改用 `Core\HeadingPitchRange`。
  - Deprecated `jsonp`. It will be removed in 1.17. Use `loadJsonp` instead.
    弃用了 `jsonp`。它将在 1.17 中移除。请改用 `loadJsonp`。
- Added support for the [glTF 1.0](https://github.com/KhronosGroup/glTF/blob/master/specification/README.md) draft specification.
  添加了对 [glTF 1.0](https://github.com/KhronosGroup/glTF/blob/master/specification/README.md) 草案规范的支持。
- Added support for the glTF extensions [KHR_binary_glTF](https://github.com/KhronosGroup/glTF/tree/master/extensions/Khronos/KHR_binary_glTF) and [KHR_materials_common](https://github.com/KhronosGroup/glTF/tree/KHR_materials_common/extensions/Khronos/KHR_materials_common).
  添加了对 glTF 扩展 [KHR_binary_glTF](https://github.com/KhronosGroup/glTF/tree/master/extensions/Khronos/KHR_binary_glTF) 和 [KHR_materials_common](https://github.com/KhronosGroup/glTF/tree/KHR_materials_common/extensions/Khronos/KHR_materials_common) 的支持。
- Decreased GPU memory usage in `BillboardCollection` and `LabelCollection` by using WebGL instancing.
  通过使用 WebGL 实例化技术减少了 `BillboardCollection` 和 `LabelCollection` 中的 GPU 内存使用量。
- Added CZML examples to Sandcastle. See the new CZML tab.
  在 Sandcastle 中添加了 CZML 示例。请参阅新的 CZML 标签页。
- Changed `Camera.setView` to take the same parameter options as `Camera.flyTo`. `options.destination` takes a rectangle, `options.orientation` works with heading/pitch/roll or direction/up, and `options.endTransform` was added. [#3100](https://github.com/CesiumGS/cesium/pull/3100)
  修改了 `Camera.setView`，使其接受与 `Camera.flyTo` 相同的参数选项。`options.destination` 接受矩形，`options.orientation` 支持 heading/pitch/roll 或 direction/up，并添加了 `options.endTransform`。[#3100](https://github.com/CesiumGS/cesium/pull/3100)
- Fixed token issue in `ArcGisMapServerImageryProvider`.
  修复了 `ArcGisMapServerImageryProvider` 中的 token 问题。
- `ImageryLayerFeatureInfo` now has an `imageryLayer` property, indicating the layer that contains the feature.
  `ImageryLayerFeatureInfo` 现在具有 `imageryLayer` 属性，指示包含该要素的图层。
- Made `TileMapServiceImageryProvider` and `CesiumTerrainProvider` work properly when the provided base url contains query parameters and fragments.
  使 `TileMapServiceImageryProvider` 和 `CesiumTerrainProvider` 在提供的基础 URL 包含查询参数和片段时仍能正常工作。
- The WebGL setting of `failIfMajorPerformanceCaveat` now defaults to `false`, which is the WebGL default. This improves compatibility with out-of-date drivers and remote desktop sessions. Cesium will run slower in these cases instead of simply failing to load. [#3108](https://github.com/CesiumGS/cesium/pull/3108)
  WebGL 设置 `failIfMajorPerformanceCaveat` 现在默认为 `false`（即 WebGL 默认值）。这提高了与旧驱动程序和远程桌面会话的兼容性。在这些情况下，Cesium 将以较慢速度运行，而不是直接加载失败。[#3108](https://github.com/CesiumGS/cesium/pull/3108)
- Fixed the issue where the camera inertia takes too long to finish causing the camera move events to fire after it appears to. [#2839](https://github.com/CesiumGS/cesium/issues/2839)
  修复了相机惯性耗时过长导致相机移动事件在视觉停止后很久才触发的问题。[#2839](https://github.com/CesiumGS/cesium/issues/2839)
- Make KML invalid coordinate processing match Google Earth behavior. [#3124](https://github.com/CesiumGS/cesium/pull/3124)
  使 KML 无效坐标处理与 Google Earth 的行为一致。[#3124](https://github.com/CesiumGS/cesium/pull/3124)
- Added `BoxOutlineGeometry.fromAxisAlignedBoundingBox` and `BoxGeometry.fromAxisAlignedBoundingBox` functions.
  添加了 `BoxOutlineGeometry.fromAxisAlignedBoundingBox` 和 `BoxGeometry.fromAxisAlignedBoundingBox` 函数。
- Switched to [gulp](http://gulpjs.com/) for all build tasks. `Java` and `ant` are no longer required to develop Cesium. [#3106](https://github.com/CesiumGS/cesium/pull/3106)
  所有构建任务均切换至 [gulp](http://gulpjs.com/)。开发 Cesium 不再需要 `Java` 和 `ant`。[#3106](https://github.com/CesiumGS/cesium/pull/3106)
- Updated `requirejs` from 2.1.9 to 2.1.20. [#3107](https://github.com/CesiumGS/cesium/pull/3107)
  将 `requirejs` 从 2.1.9 更新到 2.1.20。[#3107](https://github.com/CesiumGS/cesium/pull/3107)
- Updated `almond` from 0.2.6 to 0.3.1. [#3107](https://github.com/CesiumGS/cesium/pull/3107)
  将 `almond` 从 0.2.6 更新到 0.3.1。[#3107](https://github.com/CesiumGS/cesium/pull/3107)

## 1.14 - 2015-10-01

- Fixed issues causing the terrain and sky to disappear when the camera is near the surface. [#2415](https://github.com/CesiumGS/cesium/issues/2415) and [#2271](https://github.com/CesiumGS/cesium/issues/2271)
  修复了当相机靠近表面时导致地形和天空消失的问题。[#2415](https://github.com/CesiumGS/cesium/issues/2415) 与 [#2271](https://github.com/CesiumGS/cesium/issues/2271)
- Changed the `ScreenSpaceCameraController.minimumZoomDistance` default from `20.0` to `1.0`.
  将 `ScreenSpaceCameraController.minimumZoomDistance` 的默认值从 `20.0` 更改为 `1.0`。
- Added `Billboard.sizeInMeters`. `true` sets the billboard size to be measured in meters; otherwise, the size of the billboard is measured in pixels. Also added support for billboard `sizeInMeters` to entities and CZML.
  添加了 `Billboard.sizeInMeters`。设置为 `true` 会将广告牌大小指定为以米为单位；否则广告牌大小以像素为单位。还向实体和 CZML 添加了对广告牌 `sizeInMeters` 的支持。
- Fixed a bug in `AssociativeArray` that would cause unbounded memory growth when adding and removing lots of items.
  修复了 `AssociativeArray` 中在添加和移除大量项时导致内存无限制增长的 bug。
- Provided a workaround for Safari 9 where WebGL constants can't be accessed through `WebGLRenderingContext`. Now constants are hard-coded in `WebGLConstants`. [#2989](https://github.com/CesiumGS/cesium/issues/2989)
  针对 Safari 9 无法通过 `WebGLRenderingContext` 访问 WebGL 常量的问题提供了变通方案。现在常量硬编码在 `WebGLConstants` 中。[#2989](https://github.com/CesiumGS/cesium/issues/2989)
- Added a workaround for Chrome 45, where the first character in a label with a small font size would not appear. [#3011](https://github.com/CesiumGS/cesium/pull/3011)
  针对 Chrome 45 中小字号标签的首字符不显示的现象添加了变通方案。[#3011](https://github.com/CesiumGS/cesium/pull/3011)
- Added `subdomains` option to the `WebMapTileServiceImageryProvider` constructor.
  向 `WebMapTileServiceImageryProvider` 构造函数添加了 `subdomains` 选项。
- Added `subdomains` option to the `WebMapServiceImageryProvider` constructor.
  向 `WebMapServiceImageryProvider` 构造函数添加了 `subdomains` 选项。
- Fix zooming in 2D when tracking an object. The zoom was based on location rather than the tracked object. [#2991](https://github.com/CesiumGS/cesium/issues/2991)
  修复了在 2D 模式下跟踪对象时的缩放问题。此前缩放是基于位置而不是跟踪的对象进行的。[#2991](https://github.com/CesiumGS/cesium/issues/2991)
- Added `options.credit` parameter to `MapboxImageryProvider`.
  向 `MapboxImageryProvider` 添加了 `options.credit` 参数。
- Fixed an issue with drill picking at low frame rates that would cause a crash. [#3010](https://github.com/CesiumGS/cesium/pull/3010)
  修复了在低帧率下穿透拾取引发崩溃的问题。[#3010](https://github.com/CesiumGS/cesium/pull/3010)
- Fixed a bug that prevented `setView` from working across all scene modes.
  修复了阻止 `setView` 在所有场景模式下正常工作的 bug。
- Fixed a bug that caused `camera.positionWC` to occasionally return the incorrect value.
  修复了导致 `camera.positionWC` 偶尔返回错误值的 bug。
- Used all the template urls defined in the CesiumTerrain provider.[#3038](https://github.com/CesiumGS/cesium/pull/3038)
  在 CesiumTerrain 提供器中使用了所有定义的模板 URL。[#3038](https://github.com/CesiumGS/cesium/pull/3038)

## 1.13 - 2015-09-01

<!-- After this point in the file most code blocks use the indent style which this rule prevents -->
<!-- markdownlint-disable MD046 -->

- Breaking changes
  破坏性变更
  - Remove deprecated `AxisAlignedBoundingBox.intersect` and `BoundingSphere.intersect`. Use `BoundingSphere.intersectPlane` instead.
    移除了已弃用的 `AxisAlignedBoundingBox.intersect` 和 `BoundingSphere.intersect`。请改用 `BoundingSphere.intersectPlane`。
  - Remove deprecated `getFeatureInfoAsGeoJson` and `getFeatureInfoAsXml` constructor parameters from `WebMapServiceImageryProvider`.
    从 `WebMapServiceImageryProvider` 中移除了已弃用的 `getFeatureInfoAsGeoJson` 和 `getFeatureInfoAsXml` 构造函数参数。
- Added support for `GroundPrimitive` which works much like `Primitive` but drapes geometry over terrain. Valid geometries that can be draped on terrain are `CircleGeometry`, `CorridorGeometry`, `EllipseGeometry`, `PolygonGeometry`, and `RectangleGeometry`. Because of the cutting edge nature of this feature in WebGL, it requires the [EXT_frag_depth](https://www.khronos.org/registry/webgl/extensions/EXT_frag_depth/) extension, which is currently only supported in Chrome, Firefox, and Edge. Apple support is expected in iOS 9 and MacOS Safari 9. Android support varies by hardware and IE11 will most likely never support it. You can use [webglreport.com](http://webglreport.com) to verify support for your hardware. Finally, this feature is currently only supported in Primitives and not yet available via the Entity API. [#2865](https://github.com/CesiumGS/cesium/pull/2865)
  添加了对 `GroundPrimitive` 的支持，其工作原理与 `Primitive` 类似，但可将几何体贴覆在地表/地形上。可贴地渲染的有效几何体包括 `CircleGeometry`、`CorridorGeometry`、`EllipseGeometry`、`PolygonGeometry` 和 `RectangleGeometry`。由于该特性在 WebGL 中较为前沿，它需要 [EXT_frag_depth](https://www.khronos.org/registry/webgl/extensions/EXT_frag_depth/) 扩展，该扩展目前仅在 Chrome、Firefox 和 Edge 中受支持。预计 Apple 将在 iOS 9 和 MacOS Safari 9 中提供支持。Android 的支持取决于硬件，而 IE11 大概率永远不支持。你可以使用 [webglreport.com](http://webglreport.com) 验证你的硬件支持情况。最后，该功能目前仅在 Primitive 中受支持，尚未通过 Entity API 提供。[#2865](https://github.com/CesiumGS/cesium/pull/2865)
- Added `Scene.groundPrimitives`, which is a primitive collection like `Scene.primitives`, but for `GroundPrimitive` instances. It allows custom z-ordering. [#2960](https://github.com/CesiumGS/cesium/pull/2960) For example:
  添加了 `Scene.groundPrimitives`，这是一个类似于 `Scene.primitives` 的图元集合，但专用于 `GroundPrimitive` 实例。它支持自定义 Z 轴绘制顺序。[#2960](https://github.com/CesiumGS/cesium/pull/2960) 例如：

        // draws the ellipse on top of the rectangle
        var ellipse = scene.groundPrimitives.add(new Cesium.GroundPrimitive({...}));
        var rectangle = scene.groundPrimitives.add(new Cesium.GroundPrimitive({...}));

        // move the rectangle to draw on top of the ellipse
        scene.groundPrimitives.raise(rectangle);

- Added `reverseZ` tag to `UrlTemplateImageryProvider`. [#2961](https://github.com/CesiumGS/cesium/pull/2961)
  向 `UrlTemplateImageryProvider` 添加了 `reverseZ` 标签。[#2961](https://github.com/CesiumGS/cesium/pull/2961)
- Added `BoundingSphere.isOccluded` and `OrientedBoundingBox.isOccluded` to determine if the volumes are occluded by an `Occluder`.
  添加了 `BoundingSphere.isOccluded` 和 `OrientedBoundingBox.isOccluded`，用于判断包围体是否被 `Occluder`（遮挡器）遮挡。
- Added `distanceSquaredTo` and `computePlaneDistances` functions to `OrientedBoundingBox`.
  向 `OrientedBoundingBox` 添加了 `distanceSquaredTo` 和 `computePlaneDistances` 函数。
- Fixed a GLSL precision issue that enables Cesium to support Mali-400MP GPUs and other mobile GPUs where GLSL shaders did not previously compile. [#2984](https://github.com/CesiumGS/cesium/pull/2984)
  修复了 GLSL 精度问题，使 Cesium 能够支持 Mali-400MP GPU 以及其他先前 GLSL 着色器无法编译的移动 GPU。[#2984](https://github.com/CesiumGS/cesium/pull/2984)
- Fixed an issue where extruded `PolygonGeometry` was always extruding to the ellipsoid surface instead of specified height. [#2923](https://github.com/CesiumGS/cesium/pull/2923)
  修复了拉伸的 `PolygonGeometry` 总是拉伸至椭球表面而不是指定高度的问题。[#2923](https://github.com/CesiumGS/cesium/pull/2923)
- Fixed an issue where non-feature nodes prevented KML documents from loading. [#2945](https://github.com/CesiumGS/cesium/pull/2945)
  修复了非要素节点导致 KML 文档无法加载的问题。[#2945](https://github.com/CesiumGS/cesium/pull/2945)
- Fixed an issue where `JulianDate` would not parse certain dates properly. [#405](https://github.com/CesiumGS/cesium/issues/405)
  修复了 `JulianDate` 无法正确解析某些日期的问题。[#405](https://github.com/CesiumGS/cesium/issues/405)
- Removed [es5-shim](https://github.com/kriskowal/es5-shim), which is no longer being used. [#2933](https://github.com/CesiumGS/cesium/pull/2945)
  移除了不再使用的 [es5-shim](https://github.com/kriskowal/es5-shim)。[#2933](https://github.com/CesiumGS/cesium/pull/2945)

## 1.12 - 2015-08-03

- Breaking changes
  破坏性变更
  - Remove deprecated `ObjectOrientedBoundingBox`. Use `OrientedBoundingBox` instead.
    移除了已弃用的 `ObjectOrientedBoundingBox`。请改用 `OrientedBoundingBox`。
- Added `MapboxImageryProvider` to load imagery from [Mapbox](https://www.mapbox.com).
  添加了 `MapboxImageryProvider` 以便从 [Mapbox](https://www.mapbox.com) 加载影像。
- Added `maximumHeight` option to `Viewer.flyTo`. [#2868](https://github.com/CesiumGS/cesium/issues/2868)
  向 `Viewer.flyTo` 添加了 `maximumHeight` 选项。[#2868](https://github.com/CesiumGS/cesium/issues/2868)
- Added picking support to `UrlTemplateImageryProvider`.
  为 `UrlTemplateImageryProvider` 添加了拾取支持。
- Added ArcGIS token-based authentication support to `ArcGisMapServerImageryProvider`.
  为 `ArcGisMapServerImageryProvider` 添加了基于 ArcGIS token 的认证支持。
- Added proxy support to `ArcGisMapServerImageryProvider` for `pickFeatures` requests.
  为 `ArcGisMapServerImageryProvider` 的 `pickFeatures` 请求添加了代理支持。
- The default `CTRL + Left Click Drag` mouse behavior is now duplicated for `CTRL + Right Click Drag` for better compatibility with Firefox on Mac OS [#2872](https://github.com/CesiumGS/cesium/pull/2913).
  默认的 `Ctrl + 左键拖拽` 鼠标行为现也复制映射到 `Ctrl + 右键拖拽`，以提升与 Mac OS 上的 Firefox 的兼容性 [#2872](https://github.com/CesiumGS/cesium/pull/2913)。
- Fixed incorrect texture coordinates for `WallGeometry` [#2872](https://github.com/CesiumGS/cesium/issues/2872)
  修复了 `WallGeometry` 纹理坐标不正确的问题 [#2872](https://github.com/CesiumGS/cesium/issues/2872)。
- Fixed `WallGeometry` bug that caused walls covering a short distance not to render. [#2897](https://github.com/CesiumGS/cesium/issues/2897)
  修复了导致覆盖短距离的墙体不渲染的 `WallGeometry` bug。[#2897](https://github.com/CesiumGS/cesium/issues/2897)
- Fixed `PolygonGeometry` clockwise winding order bug.
  修复了 `PolygonGeometry` 顺时针绕序 bug。
- Fixed extruded `RectangleGeometry` bug for small heights. [#2823](https://github.com/CesiumGS/cesium/issues/2823)
  修复了拉伸 `RectangleGeometry` 在较小高度下的 bug。[#2823](https://github.com/CesiumGS/cesium/issues/2823)
- Fixed `BillboardCollection` bounding sphere for billboards with a non-center vertical origin. [#2894](https://github.com/CesiumGS/cesium/issues/2894)
  修复了具有非中心垂直原点的广告牌的 `BillboardCollection` 包围球问题。[#2894](https://github.com/CesiumGS/cesium/issues/2894)
- Fixed a bug that caused `Camera.positionCartographic` to be incorrect. [#2838](https://github.com/CesiumGS/cesium/issues/2838)
  修复了导致 `Camera.positionCartographic` 不正确的 bug。[#2838](https://github.com/CesiumGS/cesium/issues/2838)
- Fixed calling `Scene.pickPosition` after calling `Scene.drillPick`. [#2813](https://github.com/CesiumGS/cesium/issues/2813)
  修复了在调用 `Scene.drillPick` 之后调用 `Scene.pickPosition` 的问题。[#2813](https://github.com/CesiumGS/cesium/issues/2813)
- The globe depth is now rendered during picking when `Scene.depthTestAgainstTerrain` is `true` so objects behind terrain are not picked.
  当 `Scene.depthTestAgainstTerrain` 为 `true` 时，拾取期间现在会渲染地球深度，因此不会拾取到地形后面的对象。
- Fixed Cesium.js failing to parse in IE 8 and 9. While Cesium doesn't work in IE versions less than 11, this allows for more graceful error handling.
  修复了 Cesium.js 在 IE 8 和 9 中解析失败的问题。虽然 Cesium 在低于 11 的 IE 版本中无法工作，但这允许更优雅的错误处理。

## 1.11 - 2015-07-01

- Breaking changes
  破坏性变更
  - Removed `Scene.fxaaOrderIndependentTranslucency`, which was deprecated in 1.10. Use `Scene.fxaa` which is now `true` by default.
    移除了在 1.10 中已弃用的 `Scene.fxaaOrderIndependentTranslucency`。请改用 `Scene.fxaa`，该项现在默认为 `true`。
  - Removed `Camera.clone`, which was deprecated in 1.10.
    移除了在 1.10 中已弃用的 `Camera.clone`。
- Deprecated
  弃用
  - The STK World Terrain url `cesiumjs.org/stk-terrain/world` has been deprecated, use `assets.agi.com/stk-terrain/world` instead. A redirect will be in place until 1.14.
    STK World Terrain 的 URL `cesiumjs.org/stk-terrain/world` 已被弃用，请改用 `assets.agi.com/stk-terrain/world`。重定向将保留至 1.14。
  - Deprecated `AxisAlignedBoundingBox.intersect` and `BoundingSphere.intersect`. These will be removed in 1.13. Use `AxisAlignedBoundingBox.intersectPlane` and `BoundingSphere.intersectPlane` instead.
    弃用了 `AxisAlignedBoundingBox.intersect` 和 `BoundingSphere.intersect`。它们将在 1.13 中移除。请改用 `AxisAlignedBoundingBox.intersectPlane` 和 `BoundingSphere.intersectPlane`。
  - Deprecated `ObjectOrientedBoundingBox`. It will be removed in 1.12. Use `OrientedBoundingBox` instead.
    弃用了 `ObjectOrientedBoundingBox`。它将在 1.12 中移除。请改用 `OrientedBoundingBox`。
- Improved camera flights. [#2825](https://github.com/CesiumGS/cesium/pull/2825)
  改进了相机飞行。[#2825](https://github.com/CesiumGS/cesium/pull/2825)
- The camera now zooms to the point under the mouse cursor.
  相机现在缩放到鼠标光标下方的点。
- Added a new camera mode for horizon views. When the camera is looking at the horizon and a point on terrain above the camera is picked, the camera moves in the plane containing the camera position, up and right vectors.
  为地平线视角添加了新的相机模式。当相机朝向地平线并且拾取到高于相机的地形上的点时，相机会在包含相机位置、上向量和右向量的平面内移动。
- Improved terrain and imagery performance and reduced tile loading by up to 50%, depending on the camera view, by using the new `OrientedBoundingBox` for view frustum culling. See [Terrain Culling with Oriented Bounding Boxes](http://cesiumjs.org/2015/06/24/Oriented-Bounding-Boxes/).
  通过使用新的 `OrientedBoundingBox` 进行视锥体剔除，改进了地形和影像性能，并根据相机视角将瓦片加载量减少了高达 50%。参见[基于定向包围盒的地形剔除（Terrain Culling with Oriented Bounding Boxes）](http://cesiumjs.org/2015/06/24/Oriented-Bounding-Boxes/)。
- Added `UrlTemplateImageryProvider`. This new imagery provider allows access to a wide variety of imagery sources, including OpenStreetMap, TMS, WMTS, WMS, WMS-C, and various custom schemes, by specifying a URL template to use to request imagery tiles.
  添加了 `UrlTemplateImageryProvider`。这个新的影像提供器通过指定用于请求影像瓦片的 URL 模板，允许访问包括 OpenStreetMap、TMS、WMTS、WMS、WMS-C 以及各种自定义方案在内的广泛影像源。
- Fixed flash/streak rendering artifacts when picking. [#2790](https://github.com/CesiumGS/cesium/issues/2790), [#2811](https://github.com/CesiumGS/cesium/issues/2811)
  修复了拾取时的闪烁/条纹渲染伪影。[#2790](https://github.com/CesiumGS/cesium/issues/2790)，[#2811](https://github.com/CesiumGS/cesium/issues/2811)
- Fixed 2D and Columbus view lighting issue. [#2635](https://github.com/CesiumGS/cesium/issues/2635).
  修复了 2D 和哥伦布视图下的光照问题。[#2635](https://github.com/CesiumGS/cesium/issues/2635)。
- Fixed issues with material caching which resulted in the inability to use an image-based material multiple times. [#2821](https://github.com/CesiumGS/cesium/issues/2821)
  修复了材质缓存导致无法多次使用基于图像的材质的问题。[#2821](https://github.com/CesiumGS/cesium/issues/2821)
- Improved `Camera.viewRectangle` so that the specified rectangle is now better centered on the screen. [#2764](https://github.com/CesiumGS/cesium/issues/2764)
  改进了 `Camera.viewRectangle`，使指定的矩形在屏幕上居中效果更好。[#2764](https://github.com/CesiumGS/cesium/issues/2764)
- Fixed a crash when `viewer.zoomTo` or `viewer.flyTo` were called immediately before or during a scene morph. [#2775](https://github.com/CesiumGS/cesium/issues/2775)
  修复了在场景变形变换（morph）之前或期间立即调用 `viewer.zoomTo` 或 `viewer.flyTo` 时引发的崩溃。[#2775](https://github.com/CesiumGS/cesium/issues/2775)
- Fixed an issue where `Camera` functions would throw an exception if used from within a `Scene.morphComplete` callback. [#2776](https://github.com/CesiumGS/cesium/issues/2776)
  修复了在 `Scene.morphComplete` 回调中调用 `Camera` 函数会抛出异常的问题。[#2776](https://github.com/CesiumGS/cesium/issues/2776)
- Fixed camera flights that ended up at the wrong position in Columbus view. [#802](https://github.com/CesiumGS/cesium/issues/802)
  修复了哥伦布视图下相机飞行最终停在错误位置的问题。[#802](https://github.com/CesiumGS/cesium/issues/802)
- Fixed camera flights through the map in 2D. [#804](https://github.com/CesiumGS/cesium/issues/804)
  修复了 2D 模式下相机飞行穿透地图的问题。[#804](https://github.com/CesiumGS/cesium/issues/804)
- Fixed strange camera flights from opposite sides of the globe. [#1158](https://github.com/CesiumGS/cesium/issues/1158)
  修复了从地球两端发起的异常相机飞行问题。[#1158](https://github.com/CesiumGS/cesium/issues/1158)
- Fixed camera flights that wouldn't fly to the home view after zooming out past it. [#1400](https://github.com/CesiumGS/cesium/issues/1400)
  修复了在缩小超出主视角（home view）后无法飞向主视角的相机飞行问题。[#1400](https://github.com/CesiumGS/cesium/issues/1400)
- Fixed flying to rectangles that cross the IDL in Columbus view and 2D. [#2093](https://github.com/CesiumGS/cesium/issues/2093)
  修复了在哥伦布视图和 2D 模式下飞向跨越国际日界线矩形的问题。[#2093](https://github.com/CesiumGS/cesium/issues/2093)
- Fixed flights with a pitch of -90 degrees. [#2468](https://github.com/CesiumGS/cesium/issues/2468)
  修复了俯仰角（pitch）为 -90 度的飞行问题。[#2468](https://github.com/CesiumGS/cesium/issues/2468)
- `Model` can now load Binary glTF from a `Uint8Array`.
  `Model` 现在可以从 `Uint8Array` 加载 Binary glTF。
- Fixed a bug in `ImageryLayer` that could cause an exception and the render loop to stop when the base layer did not cover the entire globe.
  修复了 `ImageryLayer` 中的一个 bug，该 bug 在基础图层未覆盖整个地球时可能引发异常并导致渲染循环停止。
- The performance statistics displayed when `scene.debugShowFramesPerSecond === true` can now be styled using the `cesium-performanceDisplay` CSS classes in `shared.css` [#2779](https://github.com/CesiumGS/cesium/issues/2779).
  当 `scene.debugShowFramesPerSecond === true` 时显示的性能统计信息现在可以使用 `shared.css` 中的 `cesium-performanceDisplay` CSS 类进行样式自定义 [#2779](https://github.com/CesiumGS/cesium/issues/2779)。
- Added `Plane.fromCartesian4`.
  添加了 `Plane.fromCartesian4`。
- Added `Plane.ORIGIN_XY_PLANE`/`ORIGIN_YZ_PLANE`/`ORIGIN_ZX_PLANE` constants for commonly-used planes.
  为常用平面添加了 `Plane.ORIGIN_XY_PLANE`/`ORIGIN_YZ_PLANE`/`ORIGIN_ZX_PLANE` 常量。
- Added `Matrix2`/`Matrix3`/`Matrix4.ZERO` constants.
  添加了 `Matrix2`/`Matrix3`/`Matrix4.ZERO` 常量。
- Added `Matrix2`/`Matrix3.multiplyByScale` for multiplying against non-uniform scales.
  添加了 `Matrix2`/`Matrix3.multiplyByScale` 用于乘以非均匀缩放。
- Added `projectPointToNearestOnPlane` and `projectPointsToNearestOnPlane` to `EllipsoidTangentPlane` to project 3D points to the nearest 2D point on an `EllipsoidTangentPlane`.
  向 `EllipsoidTangentPlane` 添加了 `projectPointToNearestOnPlane` 和 `projectPointsToNearestOnPlane`，用于将 3D 点投影到 `EllipsoidTangentPlane` 上的最近 2D 点。
- Added `EllipsoidTangentPlane.plane` property to get the `Plane` for the tangent plane.
  添加了 `EllipsoidTangentPlane.plane` 属性以获取切平面的 `Plane`。
- Added `EllipsoidTangentPlane.xAxis`/`yAxis`/`zAxis` properties to get the local coordinate system of the tangent plane.
  添加了 `EllipsoidTangentPlane.xAxis`/`yAxis`/`zAxis` 属性以获取切平面的局部坐标系。
- Add `QuantizedMeshTerrainData` constructor argument `orientedBoundingBox`.
  向 `QuantizedMeshTerrainData` 构造函数添加了 `orientedBoundingBox` 参数。
- Add `TerrainMesh.orientedBoundingBox` which holds the `OrientedBoundingBox` for the mesh for a single terrain tile.
  添加了 `TerrainMesh.orientedBoundingBox`，用于保存单个地形瓦片网格的 `OrientedBoundingBox`。

## 1.10 - 2015-06-01

- Breaking changes
  破坏性变更
  - Existing bookmarks to documentation of static members have changed [#2757](https://github.com/CesiumGS/cesium/issues/2757).
    静态成员文档的现有书签已更改 [#2757](https://github.com/CesiumGS/cesium/issues/2757)。
  - Removed `InfoBoxViewModel.defaultSanitizer`, `InfoBoxViewModel.sanitizer`, and `Cesium.sanitize`, which was deprecated in 1.7.
    移除了在 1.7 中弃用的 `InfoBoxViewModel.defaultSanitizer`、`InfoBoxViewModel.sanitizer` 和 `Cesium.sanitize`。
  - Removed `InfoBoxViewModel.descriptionRawHtml`, which was deprecated in 1.7. Use `InfoBoxViewModel.description` instead.
    移除了在 1.7 中弃用的 `InfoBoxViewModel.descriptionRawHtml`。请改用 `InfoBoxViewModel.description`。
  - Removed `GeoJsonDataSource.fromUrl`, which was deprecated in 1.7. Use `GeoJsonDataSource.load` instead. Unlike fromUrl, load can take either a url or parsed JSON object and returns a promise to a new instance, rather than a new instance.
    移除了在 1.7 中弃用的 `GeoJsonDataSource.fromUrl`。请改用 `GeoJsonDataSource.load`。与 fromUrl 不同，load 可以接受 URL 或解析后的 JSON 对象，并返回新实例的 promise，而不是直接返回新实例。
  - Removed `GeoJsonDataSource.prototype.loadUrl`, which was deprecated in 1.7. Instead, pass a url as the first parameter to `GeoJsonDataSource.prototype.load`.
    移除了在 1.7 中弃用的 `GeoJsonDataSource.prototype.loadUrl`。改为主函数将 URL 作为第一个参数传递给 `GeoJsonDataSource.prototype.load`。
  - Removed `CzmlDataSource.prototype.loadUrl`, which was deprecated in 1.7. Instead, pass a url as the first parameter to `CzmlDataSource.prototype.load`.
    移除了在 1.7 中弃用的 `CzmlDataSource.prototype.loadUrl`。改为主函数将 URL 作为第一个参数传递给 `CzmlDataSource.prototype.load`。
  - Removed `CzmlDataSource.prototype.processUrl`, which was deprecated in 1.7. Instead, pass a url as the first parameter to `CzmlDataSource.prototype.process`.
    移除了在 1.7 中弃用的 `CzmlDataSource.prototype.processUrl`。改为主函数将 URL 作为第一个参数传递给 `CzmlDataSource.prototype.process`。
  - Removed the `sourceUri` parameter to all `CzmlDataSource` load and process functions, which was deprecated in 1.7. Instead pass an `options` object with `sourceUri` property.
    移除了在 1.7 中弃用的所有 `CzmlDataSource` 加载和处理函数的 `sourceUri` 参数。改为传入带有 `sourceUri` 属性的 `options` 对象。
  - Removed `PolygonGraphics.positions` which was deprecated in 1.6. Instead, use `PolygonGraphics.hierarchy`.
    移除了在 1.6 中弃用的 `PolygonGraphics.positions`。请改用 `PolygonGraphics.hierarchy`。
  - Existing bookmarks to documentation of static members changed. [#2757](https://github.com/CesiumGS/cesium/issues/2757)
    静态成员文档的现有书签发生变更。[#2757](https://github.com/CesiumGS/cesium/issues/2757)。
- Deprecated
  弃用
  - `WebMapServiceImageryProvider` constructor parameters `options.getFeatureInfoAsGeoJson` and `options.getFeatureInfoAsXml` were deprecated and will be removed in Cesium 1.13. Use `options.getFeatureInfoFormats` instead.
    `WebMapServiceImageryProvider` 构造函数参数 `options.getFeatureInfoAsGeoJson` 和 `options.getFeatureInfoAsXml` 已弃用，并将在 Cesium 1.13 中移除。请改用 `options.getFeatureInfoFormats`。
  - Deprecated `Camera.clone`. It will be removed in 1.11.
    弃用了 `Camera.clone`。它将在 1.11 中移除。
  - Deprecated `Scene.fxaaOrderIndependentTranslucency`. It will be removed in 1.11. Use `Scene.fxaa` which is now `true` by default.
    弃用了 `Scene.fxaaOrderIndependentTranslucency`。它将在 1.11 中移除。请改用 `Scene.fxaa`，该项现在默认为 `true`。
  - The Cesium sample models are now in the Binary glTF format (`.bgltf`). Cesium will also include the models as plain glTF (`.gltf`) until 1.13. Cesium support for `.gltf` will not be removed.
    Cesium 示例模型现在采用 Binary glTF 格式（`.bgltf`）。在 1.13 之前，Cesium 仍将包含普通 glTF（`.gltf`）格式的模型。Cesium 对 `.gltf` 的支持不会被移除。
- Added `view` query parameter to the CesiumViewer app, which sets the initial camera position using longitude, latitude, height, heading, pitch and roll. For example: `http://cesiumjs.org/Cesium/Build/Apps/CesiumViewer/index.html/index.html?view=-75.0,40.0,300.0,9.0,-13.0,3.0`
  向 CesiumViewer 应用添加了 `view` 查询参数，使用经度、纬度、高度、偏航角、俯仰角和翻滚角设置相机的初始位置。例如：`http://cesiumjs.org/Cesium/Build/Apps/CesiumViewer/index.html/index.html?view=-75.0,40.0,300.0,9.0,-13.0,3.0`
- Added `Billboard.heightReference` and `Label.heightReference` to clamp billboards and labels to terrain.
  添加了 `Billboard.heightReference` 和 `Label.heightReference`，用于将广告牌和标签贴地/贴紧地形。
- Added support for the [CESIUM_binary_glTF](https://github.com/KhronosGroup/glTF/blob/new-extensions/extensions/CESIUM_binary_glTF/README.md) extension for loading binary blobs of glTF to `Model`. See [Faster 3D Models with Binary glTF](http://cesiumjs.org/2015/06/01/Binary-glTF/).
  为 `Model` 添加了对用于加载 glTF 二进制 blob 的 [CESIUM_binary_glTF](https://github.com/KhronosGroup/glTF/blob/new-extensions/extensions/CESIUM_binary_glTF/README.md) 扩展支持。参见[借助 Binary glTF 实现更快的 3D 模型（Faster 3D Models with Binary glTF）](http://cesiumjs.org/2015/06/01/Binary-glTF/)。
- Added support for the [CESIUM_RTC](https://github.com/KhronosGroup/glTF/blob/new-extensions/extensions/CESIUM_RTC/README.md) glTF extension for high-precision rendering to `Model`.
  为 `Model` 添加了对用于高精度渲染的 [CESIUM_RTC](https://github.com/KhronosGroup/glTF/blob/new-extensions/extensions/CESIUM_RTC/README.md) glTF 扩展支持。
- Added `PointPrimitive` and `PointPrimitiveCollection`, which are faster and use less memory than billboards with circles.
  添加了 `PointPrimitive` 和 `PointPrimitiveCollection`，相比圆形广告牌速度更快且占用更少内存。
- Changed `Entity.point` to use the new `PointPrimitive` instead of billboards. This does not change the `Entity.point` API.
  将 `Entity.point` 更改为使用新的 `PointPrimitive` 而不是广告牌。这不会改变 `Entity.point` 的 API。
- Added `Scene.pickPosition` to reconstruct the WGS84 position from window coordinates.
  添加了 `Scene.pickPosition`，用于从窗口坐标重构 WGS84 位置。
- The default mouse controls now support panning and zooming on 3D models and other opaque geometry.
  默认鼠标控件现在支持在 3D 模型和其他不透明几何体上进行平移和缩放。
- Added `Camera.moveStart` and `Camera.moveEnd` events.
  添加了 `Camera.moveStart` 和 `Camera.moveEnd` 事件。
- Added `GeocoderViewModel.complete` event. Triggered after the camera flight is completed.
  添加了 `GeocoderViewModel.complete` 事件。在相机飞行完成后触发。
- `KmlDataSource` can now load a KML file that uses explicit XML namespacing, e.g. `kml:Document`.
  `KmlDataSource` 现在可以加载使用显式 XML 命名空间（例如 `kml:Document`）的 KML 文件。
- Setting `Entity.show` now properly toggles the display of all descendant entities, previously it only affected its direct children.
  设置 `Entity.show` 现在可以正确切换所有后代实体的显示，此前它仅影响其直接子实体。
- Fixed a bug that sometimes caused `Entity` instances with `show` set to false to reappear when new `Entity` geometry is added. [#2686](https://github.com/CesiumGS/cesium/issues/2686)
  修复了在添加新 `Entity` 几何体时，有时导致 `show` 设置为 false 的 `Entity` 实例重新出现的 bug。[#2686](https://github.com/CesiumGS/cesium/issues/2686)
- Added a `Rotation` object which, when passed to `SampledProperty`, always interpolates values towards the shortest angle. Also hooked up CZML to use `Rotation` for all time-dynamic rotations.
  添加了 `Rotation` 对象，当传递给 `SampledProperty` 时，它始终朝着最短角度插值。同时让 CZML 对所有时态动态旋转使用 `Rotation`。
- Fixed a bug where moon rendered in front of foreground geometry. [#1964](https://github.com/CesiumGS/cesium/issue/1964)
  修复了月亮渲染在前景几何体前面的 bug。[#1964](https://github.com/CesiumGS/cesium/issue/1964)
- Fixed a bug where the sun was smeared when the skybox/stars was disabled. [#1829](https://github.com/CesiumGS/cesium/issue/1829)
  修复了禁用天空盒/星空时太阳产生拖尾涂抹的 bug。[#1829](https://github.com/CesiumGS/cesium/issue/1829)
- `TileProviderError` now optionally takes an `error` parameter with more details of the error or exception that occurred. `ImageryLayer` passes that information through when tiles fail to load. This allows tile provider error handling to take a different action when a tile returns a 404 versus a 500, for example.
  `TileProviderError` 现在可选地接受 `error` 参数，其中包含发生错误或异常的更多详细信息。当瓦片加载失败时，`ImageryLayer` 会透传该信息。这允许瓦片提供器错误处理根据瓦片返回 404 还是 500 采取不同的操作。
- `ArcGisMapServerImageryProvider` now has a `maximumLevel` constructor parameter.
  `ArcGisMapServerImageryProvider` 现在具有 `maximumLevel` 构造函数参数。
- `ArcGisMapServerImageryProvider` picking now works correctly when the `layers` parameter is specified. Previously, it would pick from all layers even if only displaying a subset.
  当指定 `layers` 参数时，`ArcGisMapServerImageryProvider` 拾取现在可以正确工作。此前即使只显示一部分，它也会从所有图层中拾取。
- `WebMapServiceImageryProvider.pickFeatures` now works with WMS servers, such as Google Maps Engine, that can only return feature information in HTML format.
  `WebMapServiceImageryProvider.pickFeatures` 现在支持仅能以 HTML 格式返回要素信息的 WMS 服务器（例如 Google Maps Engine）。
- `WebMapServiceImageryProvider` now accepts an array of `GetFeatureInfoFormat` instances that it will use to obtain information about the features at a given position on the globe. This enables an arbitrary `info_format` to be passed to the WMS server, and an arbitrary JavaScript function to be used to interpret the response.
  `WebMapServiceImageryProvider` 现在接受 `GetFeatureInfoFormat` 实例数组，用于获取地球上给定位置的要素信息。这允许将任意 `info_format` 传递给 WMS 服务器，并使用任意 JavaScript 函数来解析响应。
- Fixed a crash caused by `ImageryLayer` attempting to generate mipmaps for textures that are not a power-of-two size.
  修复了 `ImageryLayer` 试图为非 2 的幂次大小纹理生成 mipmap 所引发的崩溃。
- Fixed a bug where `ImageryLayerCollection.pickImageryLayerFeatures` would return incorrect results when picking from a terrain tile that was partially covered by correct-level imagery and partially covered by imagery from an ancestor level.
  修复了在从部分被正确级别影像覆盖且部分被祖先级别影像覆盖的地形瓦片中拾取时，`ImageryLayerCollection.pickImageryLayerFeatures` 返回错误结果的 bug。
- Fixed incorrect counting of `debug.tilesWaitingForChildren` in `QuadtreePrimitive`.
  修复了 `QuadtreePrimitive` 中 `debug.tilesWaitingForChildren` 计数不正确的问题。
- Added `throttleRequestsByServer.maximumRequestsPerServer` property.
  添加了 `throttleRequestsByServer.maximumRequestsPerServer` 属性。
- Changed `createGeometry` to load individual-geometry workers using a CommonJS-style `require` when run in a CommonJS-like environment.
  修改了 `createGeometry`，使其在类似 CommonJS 的环境中运行时使用 CommonJS 风格的 `require` 加载单个几何体 worker。
- Added `buildModuleUrl.setBaseUrl` function to allow the Cesium base URL to be set without the use of the global CESIUM_BASE_URL variable.
  添加了 `buildModuleUrl.setBaseUrl` 函数，允许在不使用全局 CESIUM_BASE_URL 变量的情况下设置 Cesium 基础 URL。
- Changed `ThirdParty/zip` to defer its call to `buildModuleUrl` until it is needed, rather than executing during module loading.
  修改了 `ThirdParty/zip`，将其对 `buildModuleUrl` 的调用推迟到需要时，而不是在模块加载期间执行。
- Added optional drilling limit to `Scene.drillPick`.
  向 `Scene.drillPick` 添加了可选的穿透深度限制。
- Added optional `ellipsoid` parameter to construction options of imagery and terrain providers that were lacking it. Note that terrain bounding spheres are precomputed on the server, so any supplied terrain ellipsoid must match the one used by the server.
  向缺乏该参数的影像和地形提供器的构造选项中添加了可选的 `ellipsoid` 参数。请注意，地形包围球是在服务器端预先计算的，因此任何提供的地形椭球必须与服务器使用的椭球匹配。
- Added debug option to `Scene` to show the depth buffer information for a specified view frustum slice and exposed capability in `CesiumInspector` widget.
  向 `Scene` 添加了调试选项，以显示指定视锥体切片的深度缓冲区信息，并在 `CesiumInspector` 部件中公开了该功能。
- Added new leap second for 30 June 2015 at UTC 23:59:60.
  添加了 2015 年 6 月 30 日 UTC 23:59:60 的新闰秒。
- Upgraded Autolinker from version 0.15.2 to 0.17.1.
  将 Autolinker 从版本 0.15.2 升级到 0.17.1。

## 1.9 - 2015-05-01

- Breaking changes
  破坏性变更
  - Removed `ColorMaterialProperty.fromColor`, previously deprecated in 1.6. Pass a `Color` directly to the `ColorMaterialProperty` constructor instead.
    移除了在 1.6 中弃用的 `ColorMaterialProperty.fromColor`。请直接将 `Color` 传递给 `ColorMaterialProperty` 构造函数。
  - Removed `CompositeEntityCollection.entities` and `EntityCollection.entities`, both previously deprecated in 1.6. Use `CompositeEntityCollection.values` and `EntityCollection.values` instead.
    移除了在 1.6 中弃用的 `CompositeEntityCollection.entities` 和 `EntityCollection.entities`。请改用 `CompositeEntityCollection.values` 和 `EntityCollection.values`。
  - Removed `DataSourceDisplay.getScene` and `DataSourceDisplay.getDataSources`, both previously deprecated in 1.6. Use `DataSourceDisplay.scene` and `DataSourceDisplay.dataSources` instead.
    移除了在 1.6 中弃用的 `DataSourceDisplay.getScene` 和 `DataSourceDisplay.getDataSources`。请改用 `DataSourceDisplay.scene` 和 `DataSourceDisplay.dataSources`。
  - `Entity` no longer takes a string id as its constructor argument. Pass an options object with `id` property instead. This was previously deprecated in 1.6.
    `Entity` 不再接受字符串 id 作为构造函数参数。改为传入带有 `id` 属性的 options 对象。该项此前在 1.6 中已被弃用。
  - Removed `Model.readyToRender`, previously deprecated in 1.6. Use `Model.readyPromise` instead.
    移除了在 1.6 中弃用的 `Model.readyToRender`。请改用 `Model.readyPromise`。
- Entity `material` properties and `Material` uniform values can now take a `canvas` element in addition to an image or url. [#2667](https://github.com/CesiumGS/cesium/pull/2667)
  实体的 `material` 属性和 `Material` uniform 值现在除图像或 URL 之外还可以接受 `canvas` 元素。[#2667](https://github.com/CesiumGS/cesium/pull/2667)
- Fixed a bug which caused `Entity.viewFrom` to be ignored when flying to, zooming to, or tracking an Entity. [#2628](https://github.com/CesiumGS/cesium/issues/2628)
  修复了在飞向、缩放到或跟踪 Entity 时导致 `Entity.viewFrom` 被忽略的 bug。[#2628](https://github.com/CesiumGS/cesium/issues/2628)
- Fixed a bug that caused `Corridor` and `PolylineVolume` geometry to be incorrect for sharp corners [#2626](https://github.com/CesiumGS/cesium/pull/2626)
  修复了尖锐拐角处 `Corridor` 和 `PolylineVolume` 几何体不正确的 bug [#2626](https://github.com/CesiumGS/cesium/pull/2626)。
- Fixed crash when modifying a translucent entity geometry outline. [#2630](https://github.com/CesiumGS/cesium/pull/2630)
  修复了修改半透明实体几何体轮廓线时引发的崩溃。[#2630](https://github.com/CesiumGS/cesium/pull/2630)
- Fixed crash when loading KML GroundOverlays that spanned 360 degrees. [#2639](https://github.com/CesiumGS/cesium/pull/2639)
  修复了加载跨越 360 度的 KML GroundOverlays 时引发的崩溃。[#2639](https://github.com/CesiumGS/cesium/pull/2639)
- Fixed `Geocoder` styling issue in Safari. [#2658](https://github.com/CesiumGS/cesium/pull/2658).
  修复了 Safari 中 `Geocoder` 的样式问题。[#2658](https://github.com/CesiumGS/cesium/pull/2658)。
- Fixed a crash that would occur when the `Viewer` or `CesiumWidget` was resized to 0 while the camera was in motion. [#2662](https://github.com/CesiumGS/cesium/issues/2662)
  修复了在相机运动期间当 `Viewer` 或 `CesiumWidget` 尺寸调整为 0 时发生的崩溃。[#2662](https://github.com/CesiumGS/cesium/issues/2662)
- Fixed a bug that prevented the `InfoBox` title from updating if the name of `viewer.selectedEntity` changed. [#2644](https://github.com/CesiumGS/cesium/pull/2644)
  修复了当 `viewer.selectedEntity` 的名称更改时阻止 `InfoBox` 标题更新的 bug。[#2644](https://github.com/CesiumGS/cesium/pull/2644)
- Added an optional `result` parameter to `computeScreenSpacePosition` on both `Billboard` and `Label`.
  为 `Billboard` 和 `Label` 上的 `computeScreenSpacePosition` 添加了可选的 `result` 参数。
- Added number of cached shaders to the `CesiumInspector` debugging widget.
  向 `CesiumInspector` 调试部件添加了已缓存着色器的数量显示。
- An exception is now thrown if `Primitive.modelMatrix` is not the identity matrix when in in 2D or Columbus View.
  在 2D 或哥伦布视图下，如果 `Primitive.modelMatrix` 不是单位矩阵，现在会抛出异常。

## 1.8 - 2015-04-01

- Breaking changes
  破坏性变更
  - Removed the `eye`, `target`, and `up` parameters to `Camera.lookAt` which were deprecated in Cesium 1.6. Use the `target` and `offset`.
    移除了在 Cesium 1.6 中弃用的 `Camera.lookAt` 的 `eye`、`target` 和 `up` 参数。请改用 `target` 和 `offset`。
  - Removed `Camera.setTransform`, which was deprecated in Cesium 1.6. Use `Camera.lookAtTransform`.
    移除了在 Cesium 1.6 中弃用的 `Camera.setTransform`。请改用 `Camera.lookAtTransform`。
  - Removed `Camera.transform`, which was deprecated in Cesium 1.6. Use `Camera.lookAtTransform`.
    移除了在 Cesium 1.6 中弃用的 `Camera.transform`。请改用 `Camera.lookAtTransform`。
  - Removed the `direction` and `up` options to `Camera.flyTo`, which were deprecated in Cesium 1.6. Use the `orientation` option.
    移除了在 Cesium 1.6 中弃用的 `Camera.flyTo` 的 `direction` 和 `up` 选项。请改用 `orientation` 选项。
  - Removed `Camera.flyToRectangle`, which was deprecated in Cesium 1.6. Use `Camera.flyTo`.
    移除了在 Cesium 1.6 中弃用的 `Camera.flyToRectangle`。请改用 `Camera.flyTo`。
- Deprecated
  弃用
  - Deprecated the `smallterrain` tileset. It will be removed in 1.11. Use the [STK World Terrain](http://cesiumjs.org/data-and-assets/terrain/stk-world-terrain.html) tileset.
    弃用了 `smallterrain` 瓦片集。它将在 1.11 中移除。请改用 [STK World Terrain](http://cesiumjs.org/data-and-assets/terrain/stk-world-terrain.html) 瓦片集。
- Added `Entity.show`, a boolean for hiding or showing an entity and its children.
  添加了 `Entity.show`，用于隐藏或显示实体及其子实体的布尔属性。
- Added `Entity.isShowing`, a read-only property that indicates if an entity is currently being drawn.
  添加了 `Entity.isShowing`，一个指示实体当前是否正在绘制的只读属性。
- Added support for the KML `visibility` element.
  添加了对 KML `visibility` 元素的支持。
- Added `PolylineArrowMaterialProperty` to allow entities materials to use polyline arrows.
  添加了 `PolylineArrowMaterialProperty`，允许实体材质使用折线箭头。
- Added `VelocityOrientationProperty` to easily orient Entity graphics (such as a model) along the direction it is moving.
  添加了 `VelocityOrientationProperty`，以便沿其实体运动方向轻松确定 Entity 图形（例如模型）的方向。
- Added a new Sandcastle demo, [Interpolation](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Interpolation.html&label=Showcases), which illustrates time-dynamic position interpolation options and uses the new `VelocityOrientationProperty` to orient an aircraft in flight.
  添加了新的 Sandcastle 示例：[插值（Interpolation）](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Interpolation.html&label=Showcases)，演示了时态动态位置插值选项，并使用新的 `VelocityOrientationProperty` 为飞行中的飞机定向。
- Improved `viewer.zoomTo` and `viewer.flyTo` so they are now "best effort" and work even if some entities being zoomed to are not currently in the scene.
  改进了 `viewer.zoomTo` 和 `viewer.flyTo`，使其现在为“最大努力（best effort）”，即使被缩放的部分实体当前不在场景中也能正常工作。
- Fixed `PointerEvent` detection so that it works with older implementations of the specification. This also fixes lack of mouse handling when detection failed, such as when using Cesium in the Windows `WebBrowser` control.
  修复了 `PointerEvent` 检测，使其兼容规范的旧实现。这也修复了检测失败时（例如在 Windows `WebBrowser` 控件中使用 Cesium 时）缺少鼠标处理的问题。
- Fixed an issue with transparency. [#2572](https://github.com/CesiumGS/cesium/issues/2572)
  修复了透明度方面的问题。[#2572](https://github.com/CesiumGS/cesium/issues/2572)
- Fixed improper handling of null values when loading `GeoJSON` data.
  修复了加载 `GeoJSON` 数据时对 null 值处理不当的问题。
- Added support for automatic raster feature picking from `ArcGisMapServerImageryProvider`.
  添加了对从 `ArcGisMapServerImageryProvider` 自动进行栅格要素拾取的支持。
- Added the ability to specify the desired tiling scheme, rectangle, and width and height of tiles to the `ArcGisMapServerImageryProvider` constructor.
  向 `ArcGisMapServerImageryProvider` 构造函数添加了指定所需瓦片切片方案（tiling scheme）、矩形范围以及瓦片宽高属性的功能。
- Added the ability to access dynamic ArcGIS MapServer layers by specifying the `layers` parameter to the `ArcGisMapServerImageryProvider` constructor.
  通过向 `ArcGisMapServerImageryProvider` 构造函数指定 `layers` 参数，添加了访问动态 ArcGIS MapServer 图层的功能。
- Fixed a bug that could cause incorrect rendering of an `ArcGisMapServerImageProvider` with a "singleFusedMapCache" in the geographic projection (EPSG:4326).
  修复了在地理投影（EPSG:4326）下带有“singleFusedMapCache”的 `ArcGisMapServerImageProvider` 可能导致渲染不正确的 bug。
- Added new construction options to `CesiumWidget` and `Viewer`, for `skyBox`, `skyAtmosphere`, and `globe`.
  向 `CesiumWidget` 和 `Viewer` 添加了用于 `skyBox`、`skyAtmosphere` 和 `globe` 的新构造选项。
- Fixed a bug that prevented Cesium from working in browser configurations that explicitly disabled localStorage, such as Safari's private browsing mode.
  修复了在显式禁用 localStorage 的浏览器配置中（例如 Safari 的隐身浏览模式）导致 Cesium 无法工作的 bug。
- Cesium is now tested using Jasmine 2.2.0.
  Cesium 现在使用 Jasmine 2.2.0 进行测试。

## 1.7.1 - 2015-03-06

- Fixed a crash in `InfoBox` that would occur when attempting to display plain text.
  修复了在尝试显示纯文本时 `InfoBox` 中发生的崩溃。
- Fixed a crash when loading KML features that have no description and an empty `ExtendedData` node.
  修复了加载没有描述且具有空 `ExtendedData` 节点的 KML 要素时发生的崩溃。
- Fixed a bug `in Color.fromCssColorString` where undefined would be returned for the CSS color `transparent`.
  修复了 `Color.fromCssColorString` 中对 CSS 颜色 `transparent` 返回 undefined 的 bug。
- Added `Color.TRANSPARENT`.
  添加了 `Color.TRANSPARENT`。
- Added support for KML `TimeStamp` nodes.
  添加了对 KML `TimeStamp` 节点的支持。
- Improved KML compatibility to work with non-specification compliant KML files that still happen to load in Google Earth.
  改进了 KML 兼容性，以支持仍能在 Google Earth 中加载的非规范 KML 文件。
- All data sources now print errors to the console in addition to raising the `errorEvent` and rejecting their load promise.
  所有数据源现在除触发 `errorEvent` 和拒绝加载 promise 外，还会向控制台打印错误。

## 1.7 - 2015-03-02

- Breaking changes
  破坏性变更
  - Removed `viewerEntityMixin`, which was deprecated in Cesium 1.5. Its functionality is now directly part of the `Viewer` widget.
    移除了在 Cesium 1.5 中弃用的 `viewerEntityMixin`。其功能现在直接成为 `Viewer` 部件的一部分。
  - Removed `Camera.tilt`, which was deprecated in Cesium 1.6. Use `Camera.pitch`.
    移除了在 Cesium 1.6 中弃用的 `Camera.tilt`。请改用 `Camera.pitch`。
  - Removed `Camera.heading` and `Camera.tilt`. They were deprecated in Cesium 1.6. Use `Camera.setView`.
    移除了在 Cesium 1.6 中弃用的 `Camera.heading` 和 `Camera.tilt`。请改用 `Camera.setView`。
  - Removed `Camera.setPositionCartographic`, which was was deprecated in Cesium 1.6. Use `Camera.setView`.
    移除了在 Cesium 1.6 中弃用的 `Camera.setPositionCartographic`。请改用 `Camera.setView`。
- Deprecated
  弃用
  - Deprecated `InfoBoxViewModel.defaultSanitizer`, `InfoBoxViewModel.sanitizer`, and `Cesium.sanitize`. They will be removed in 1.10.
    弃用了 `InfoBoxViewModel.defaultSanitizer`、`InfoBoxViewModel.sanitizer` 和 `Cesium.sanitize`。它们将在 1.10 中移除。
  - Deprecated `InfoBoxViewModel.descriptionRawHtml`, it will be removed in 1.10. Use `InfoBoxViewModel.description` instead.
    弃用了 `InfoBoxViewModel.descriptionRawHtml`，它将在 1.10 中移除。请改用 `InfoBoxViewModel.description`。
  - Deprecated `GeoJsonDataSource.fromUrl`, it will be removed in 1.10. Use `GeoJsonDataSource.load` instead. Unlike fromUrl, load can take either a url or parsed JSON object and returns a promise to a new instance, rather than a new instance.
    弃用了 `GeoJsonDataSource.fromUrl`，它将在 1.10 中移除。请改用 `GeoJsonDataSource.load`。与 fromUrl 不同，load 可以接受 URL 或解析后的 JSON 对象，并返回新实例的 promise，而不是直接返回新实例。
  - Deprecated `GeoJsonDataSource.prototype.loadUrl`, it will be removed in 1.10. Instead, pass a url as the first parameter to `GeoJsonDataSource.prototype.load`.
    弃用了 `GeoJsonDataSource.prototype.loadUrl`，它将在 1.10 中移除。改为将 URL 作为第一个参数传递给 `GeoJsonDataSource.prototype.load`。
  - Deprecated `CzmlDataSource.prototype.loadUrl`, it will be removed in 1.10. Instead, pass a url as the first parameter to `CzmlDataSource.prototype.load`.
    弃用了 `CzmlDataSource.prototype.loadUrl`，它将在 1.10 中移除。改为将 URL 作为第一个参数传递给 `CzmlDataSource.prototype.load`。
  - Deprecated `CzmlDataSource.prototype.processUrl`, it will be removed in 1.10. Instead, pass a url as the first parameter to `CzmlDataSource.prototype.process`.
    弃用了 `CzmlDataSource.prototype.processUrl`，它将在 1.10 中移除。改为将 URL 作为第一个参数传递给 `CzmlDataSource.prototype.process`。
  - Deprecated the `sourceUri` parameter to all `CzmlDataSource` load and process functions. Support will be removed in 1.10. Instead pass an `options` object with `sourceUri` property.
    弃用了所有 `CzmlDataSource` 加载和处理函数的 `sourceUri` 参数。对它的支持将在 1.10 中移除。改为传递带有 `sourceUri` 属性的 `options` 对象。
- Added initial support for [KML 2.2](https://developers.google.com/kml/) via `KmlDataSource`. Check out the new [Sandcastle Demo](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=KML.html) and the [reference documentation](http://cesiumjs.org/Cesium/Build/Documentation/KmlDataSource.html) for more details.
  通过 `KmlDataSource` 添加了对 [KML 2.2](https://developers.google.com/kml/) 的初步支持。查看新的 [Sandcastle 示例（Sandcastle Demo）](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=KML.html) 和[参考文档](http://cesiumjs.org/Cesium/Build/Documentation/KmlDataSource.html)了解更多详情。
- `InfoBox` sanitization now relies on [iframe sandboxing](http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/). This allows for much more content to be displayed in the InfoBox (and still be secure).
  `InfoBox` 内容清理净化现在依赖于 [iframe 沙箱（iframe sandboxing）](http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/)。这使得在 InfoBox 中可以显示更多内容（同时仍然保持安全）。
- Added `InfoBox.frame` which is the instance of the iframe that is used to host description content. Sanitization can be controlled via the frame's `sandbox` attribute. See the above link for additional information.
  添加了 `InfoBox.frame`，它是用于承载描述内容的 iframe 实例。可以通过该 frame 的 `sandbox` 属性控制内容清理沙箱。有关更多信息请参阅上述链接。
- Worked around a bug in Safari that caused most of Cesium to be broken. Cesium should now work much better on Safari for both desktop and mobile.
  规避了导致 Cesium 大部分功能在 Safari 中损坏的 bug。Cesium 现在在桌面和移动端的 Safari 上表现都好得多。
- Fixed incorrect ellipse texture coordinates. [#2363](https://github.com/CesiumGS/cesium/issues/2363) and [#2465](https://github.com/CesiumGS/cesium/issues/2465)
  修复了不正确的椭圆纹理坐标。[#2363](https://github.com/CesiumGS/cesium/issues/2363) 和 [#2465](https://github.com/CesiumGS/cesium/issues/2465)
- Fixed a bug that would cause incorrect geometry for long Corridors and Polyline Volumes. [#2513](https://github.com/CesiumGS/cesium/issues/2513)
  修复了导致长走廊（Corridor）和折线体（Polyline Volume）几何体不正确的 bug。[#2513](https://github.com/CesiumGS/cesium/issues/2513)
- Fixed a bug in imagery loading that could cause some or all of the globe to be missing when using an imagery layer that does not cover the entire globe.
  修复了影像加载中的一个 bug，当使用未覆盖整个地球的影像图层时，该 bug 可能导致地球的部分或全部缺失。
- Fixed a bug that caused `EllipseOutlineGeometry` and `CircleOutlineGeometry` to be extruded to the ground when they should have instead been drawn at height. [#2499](https://github.com/CesiumGS/cesium/issues/2499).
  修复了导致 `EllipseOutlineGeometry` 和 `CircleOutlineGeometry` 在本应按指定高度绘制时却被拉伸至地面的 bug。[#2499](https://github.com/CesiumGS/cesium/issues/2499)。
- Fixed a bug that prevented per-vertex colors from working with `PolylineGeometry` and `SimplePolylineGeometry` when used asynchronously. [#2516](https://github.com/CesiumGS/cesium/issues/2516)
  修复了异步使用时阻止逐顶点颜色与 `PolylineGeometry` 和 `SimplePolylineGeometry` 配合使用的 bug。[#2516](https://github.com/CesiumGS/cesium/issues/2516)
- Fixed a bug that would caused duplicate graphics if non-time-dynamic `Entity` objects were modified in quick succession. [#2514](https://github.com/CesiumGS/cesium/issues/2514).
  修复了若在短时间内快速连续修改非时态动态 `Entity` 对象会导致图形重复的 bug。[#2514](https://github.com/CesiumGS/cesium/issues/2514)。
- Fixed a bug where `camera.flyToBoundingSphere` would ignore range if the bounding sphere radius was 0. [#2519](https://github.com/CesiumGS/cesium/issues/2519)
  修复了如果包围球半径为 0 则 `camera.flyToBoundingSphere` 会忽略距离范围的 bug。[#2519](https://github.com/CesiumGS/cesium/issues/2519)
- Fixed some styling issues with `InfoBox` and `BaseLayerPicker` caused by using Bootstrap with Cesium. [#2487](https://github.com/CesiumGS/cesium/issues/2479)
  修复了在 Cesium 中使用 Bootstrap 时导致 `InfoBox` 和 `BaseLayerPicker` 出现的一些样式问题。[#2487](https://github.com/CesiumGS/cesium/issues/2479)
- Added support for rendering a water effect on Quantized-Mesh terrain tiles.
  添加了在 Quantized-Mesh 地形瓦片上渲染水面效果的支持。
- Added `pack` and `unpack` functions to `Matrix2` and `Matrix3`.
  为 `Matrix2` 和 `Matrix3` 添加了 `pack` 和 `unpack` 函数。
- Added camera-terrain collision detection/response when the camera reference frame is set.
  添加了设置相机参考系时的相机-地形碰撞检测与响应。
- Added `ScreenSpaceCameraController.enableCollisionDetection` to enable/disable camera collision detection with terrain.
  添加了 `ScreenSpaceCameraController.enableCollisionDetection` 用于启用/禁用相机与地形的碰撞检测。
- Added `CzmlDataSource.load` and `GeoJsonDataSource.load` to make it easy to create and load data in a single line.
  添加了 `CzmlDataSource.load` 和 `GeoJsonDataSource.load`，以便单行代码创建并加载数据。
- Added the ability to pass a `Promise` to a `DataSource` to `DataSourceCollection.add`. The `DataSource` will not actually be added until the promise resolves.
  向 `DataSourceCollection.add` 添加了传入 `Promise<DataSource>` 的功能。在 promise 解析之前，不会实际添加该 `DataSource`。
- Added the ability to pass a `Promise` to a target to `viewer.zoomTo` and `viewer.flyTo`.
  向 `viewer.zoomTo` 和 `viewer.flyTo` 添加了向目标传入 `Promise` 的支持。
- All `CzmlDataSource` and `GeoJsonDataSource` loading functions now return `Promise` instances that resolve to the instances after data is loaded.
  所有 `CzmlDataSource` 和 `GeoJsonDataSource` 加载函数现在均返回 `Promise` 实例，在数据加载完成后解析为其实例。
- Error handling in all `CzmlDataSource` and `GeoJsonDataSource` loading functions is now more consistent. Rather than a mix of exceptions and `Promise` rejections, all errors are raised via `Promise` rejections.
  所有 `CzmlDataSource` 和 `GeoJsonDataSource` 加载函数中的错误处理现在更加一致。不再混合抛出异常和 `Promise` 拒绝，所有错误均通过 `Promise` 拒绝引发。
- In addition to addresses, the `Geocoder` widget now allows input of longitude, latitude, and an optional height in degrees and meters. Example: `-75.596, 40.038, 1000` or `-75.596 40.038`.
  除地址外，`Geocoder` 部件现在还允许输入以度为单位的经度、纬度以及以米为单位的可选高度。例如：`-75.596, 40.038, 1000` 或 `-75.596 40.038`。

## 1.6 - 2015-02-02

- Breaking changes
  破坏性变更
  - `Rectangle.intersectWith` was deprecated in Cesium 1.5. Use `Rectangle.intersection`, which is the same but returns `undefined` when two rectangles do not intersect.
    `Rectangle.intersectWith` 在 Cesium 1.5 中已弃用。请改用 `Rectangle.intersection`，其作用相同，但在两个矩形不相交时返回 `undefined`。
  - `Rectangle.isEmpty` was deprecated in Cesium 1.5.
    `Rectangle.isEmpty` 在 Cesium 1.5 中已弃用。
  - The `sourceUri` parameter to `GeoJsonDatasource.load` was deprecated in Cesium 1.4 and has been removed. Use options.sourceUri instead.
    `GeoJsonDatasource.load` 的 `sourceUri` 参数在 Cesium 1.4 中已弃用并已被移除。请改用 options.sourceUri。
  - `PolygonGraphics.positions` created by `GeoJSONDataSource` now evaluate to a `PolygonHierarchy` object instead of an array of positions.
    由 `GeoJSONDataSource` 创建的 `PolygonGraphics.positions` 现在求值为 `PolygonHierarchy` 对象，而不是位置数组。
- Deprecated
  弃用
  - `Camera.tilt` was deprecated in Cesium 1.6. It will be removed in Cesium 1.7. Use `Camera.pitch`.
    `Camera.tilt` 在 Cesium 1.6 中已弃用。它将在 Cesium 1.7 中移除。请改用 `Camera.pitch`。
  - `Camera.heading` and `Camera.tilt` were deprecated in Cesium 1.6. They will become read-only in Cesium 1.7. Use `Camera.setView`.
    `Camera.heading` 和 `Camera.tilt` 在 Cesium 1.6 中已弃用。它们将在 Cesium 1.7 中变为只读。请改用 `Camera.setView`。
  - `Camera.setPositionCartographic` was deprecated in Cesium 1.6. It will be removed in Cesium 1.7. Use `Camera.setView`.
    `Camera.setPositionCartographic` 在 Cesium 1.6 中已弃用。它将在 Cesium 1.7 中移除。请改用 `Camera.setView`。
  - The `direction` and `up` options to `Camera.flyTo` have been deprecated in Cesium 1.6. They will be removed in Cesium 1.8. Use the `orientation` option.
    `Camera.flyTo` 的 `direction` 和 `up` 选项在 Cesium 1.6 中已弃用。它们将在 Cesium 1.8 中移除。请改用 `orientation` 选项。
  - `Camera.flyToRectangle` has been deprecated in Cesium 1.6. They will be removed in Cesium 1.8. Use `Camera.flyTo`.
    `Camera.flyToRectangle` 在 Cesium 1.6 中已弃用。它们将在 Cesium 1.8 中移除。请改用 `Camera.flyTo`。
  - `Camera.setTransform` was deprecated in Cesium 1.6. It will be removed in Cesium 1.8. Use `Camera.lookAtTransform`.
    `Camera.setTransform` 在 Cesium 1.6 中已弃用。它将在 Cesium 1.8 中移除。请改用 `Camera.lookAtTransform`。
  - `Camera.transform` was deprecated in Cesium 1.6. It will be removed in Cesium 1.8. Use `Camera.lookAtTransform`.
    `Camera.transform` 在 Cesium 1.6 中已弃用。它将在 Cesium 1.8 中移除。请改用 `Camera.lookAtTransform`。
  - The `eye`, `target`, and `up` parameters to `Camera.lookAt` were deprecated in Cesium 1.6. It will be removed in Cesium 1.8. Use the `target` and `offset`.
    `Camera.lookAt` 的 `eye`、`target` 和 `up` 参数在 Cesium 1.6 中已弃用。它将在 Cesium 1.8 中移除。请改用 `target` 和 `offset`。
  - `PolygonGraphics.positions` was deprecated and replaced with `PolygonGraphics.hierarchy`, whose value is a `PolygonHierarchy` instead of an array of positions. `PolygonGraphics.positions` will be removed in Cesium 1.8.
    `PolygonGraphics.positions` 已弃用并被 `PolygonGraphics.hierarchy` 取代，其值为 `PolygonHierarchy` 而不是位置数组。`PolygonGraphics.positions` 将在 Cesium 1.8 中移除。
  - The `Model.readyToRender` event was deprecated and will be removed in Cesium 1.9. Use the new `Model.readyPromise` instead.
    `Model.readyToRender` 事件已弃用，并将在 Cesium 1.9 中移除。请改用新的 `Model.readyPromise`。
  - `ColorMaterialProperty.fromColor(color)` has been deprecated and will be removed in Cesium 1.9. The constructor can now take a Color directly, for example `new ColorMaterialProperty(color)`.
    `ColorMaterialProperty.fromColor(color)` 已弃用，并将在 Cesium 1.9 中移除。构造函数现在可以直接接受 Color，例如 `new ColorMaterialProperty(color)`。
  - `DataSourceDisplay` methods `getScene` and `getDataSources` have been deprecated and replaced with `scene` and `dataSources` properties. They will be removed in Cesium 1.9.
    `DataSourceDisplay` 方法 `getScene` 和 `getDataSources` 已弃用，并被 `scene` 和 `dataSources` 属性替代。它们将在 Cesium 1.9 中移除。
  - The `Entity` constructor taking a single string value for the id has been deprecated. The constructor now takes an options object which allows you to provide any and all `Entity` related properties at construction time. Support for the deprecated behavior will be removed in Cesium 1.9.
    接受单个字符串值作为 id 的 `Entity` 构造函数已弃用。构造函数现在接受 options 对象，允许你在构造时提供任何和所有与 `Entity` 相关的属性。对弃用行为的支持将在 Cesium 1.9 中移除。
  - The `EntityCollection.entities` and `CompositeEntityCollect.entities` properties have both been renamed to `values`. Support for the deprecated behavior will be removed in Cesium 1.9.
    `EntityCollection.entities` 和 `CompositeEntityCollect.entities` 属性均已重命名为 `values`。对弃用行为的支持将在 Cesium 1.9 中移除。
- Fixed an issue which caused order independent translucency to be broken on many video cards. Disabling order independent translucency should no longer be necessary.
  修复了导致许多显卡上独立顺序半透明度（OIT）损坏的问题。不再需要禁用独立顺序半透明度。
- `GeoJsonDataSource` now supports polygons with holes.
  `GeoJsonDataSource` 现在支持带孔多边形（polygons with holes）。
- Many Sandcastle examples have been rewritten to make use of the newly improved Entity API.
  重写了许多 Sandcastle 示例，以利用新改进的 Entity API。
- Instead of throwing an exception when there are not enough unique positions to define a geometry, creating a `Primitive` will succeed, but not render. [#2375](https://github.com/CesiumGS/cesium/issues/2375)
  当没有足够的唯一点来定义几何体时，创建 `Primitive` 现在会成功但不会进行渲染，而不是直接抛出异常。[#2375](https://github.com/CesiumGS/cesium/issues/2375)
- Improved performance of asynchronous geometry creation (as much as 20% faster in some use cases). [#2342](https://github.com/CesiumGS/cesium/issues/2342)
  改进了异步几何体创建的性能（在某些用例中速度提高了高达 20%）。[#2342](https://github.com/CesiumGS/cesium/issues/2342)
- Fixed picking in 2D. [#2447](https://github.com/CesiumGS/cesium/issues/2447)
  修复了 2D 模式下的拾取问题。[#2447](https://github.com/CesiumGS/cesium/issues/2447)
- Added `viewer.entities` which allows you to easily create and manage `Entity` instances without a corresponding `DataSource`. This is just a shortcut to `viewer.dataSourceDisplay.defaultDataSource.entities`
  添加了 `viewer.entities`，允许你在没有对应 `DataSource` 的情况下轻松创建和管理 `Entity` 实例。这只是 `viewer.dataSourceDisplay.defaultDataSource.entities` 的快捷入口。
- Added `viewer.zoomTo` and `viewer.flyTo` which takes an entity, array of entities, `EntityCollection`, or `DataSource` as a parameter and zooms or flies to the corresponding visualization.
  添加了 `viewer.zoomTo` 和 `viewer.flyTo`，它们接受实体、实体数组、`EntityCollection` 或 `DataSource` 作为参数，并缩放或飞向相应的可视化视图。
- Setting `viewer.trackedEntity` to `undefined` will now restore the camera controls to their default states.
  将 `viewer.trackedEntity` 设置为 `undefined` 现在会将相机控件恢复为其默认状态。
- When you track an entity by clicking on the track button in the `InfoBox`, you can now stop tracking by clicking the button a second time.
  当通过点击 `InfoBox` 中的跟踪按钮跟踪实体时，再次点击该按钮即可停止跟踪。
- Added `Quaternion.fromHeadingPitchRoll` to create a rotation from heading, pitch, and roll angles.
  添加了 `Quaternion.fromHeadingPitchRoll` 以便从航向角、俯仰角和翻滚角创建旋转四元数。
- Added `Transforms.headingPitchRollToFixedFrame` to create a local frame from a position and heading/pitch/roll angles.
  添加了 `Transforms.headingPitchRollToFixedFrame` 以便从位置和航向角/俯仰角/翻滚角创建局部坐标系。
- Added `Transforms.headingPitchRollQuaternion` which is the quaternion rotation from `Transforms.headingPitchRollToFixedFrame`.
  添加了 `Transforms.headingPitchRollQuaternion`，即来自 `Transforms.headingPitchRollToFixedFrame` 的四元数旋转。
- Added `Color.fromAlpha` and `Color.withAlpha` to make it easy to create translucent colors from constants, i.e. `var translucentRed = Color.RED.withAlpha(0.95)`.
  添加了 `Color.fromAlpha` 和 `Color.withAlpha`，以便从常量轻松创建半透明颜色，例如 `var translucentRed = Color.RED.withAlpha(0.95)`。
- Added `PolylineVolumeGraphics` and `Entity.polylineVolume`
  添加了 `PolylineVolumeGraphics` 和 `Entity.polylineVolume`。
- Added `Camera.lookAtTransform` which sets the camera position and orientation given a transformation matrix defining a reference frame and either a cartesian offset or heading/pitch/range from the center of that frame.
  添加了 `Camera.lookAtTransform`，给定定义参考系的变换矩阵以及笛卡尔偏移量或相对于该参考系中心的 heading/pitch/range，设置相机位置和朝向。
- Added `Camera.setView` (which use heading, pitch, and roll) and `Camera.roll`.
  添加了 `Camera.setView`（使用 heading、pitch 和 roll）以及 `Camera.roll`。
- Added an orientation option to `Camera.flyTo` that can be either direction and up unit vectors or heading, pitch and roll angles.
  向 `Camera.flyTo` 添加了 orientation 选项，该选项可以是 direction 和 up 单位向量，也可以是 heading、pitch 和 roll 角度。
- Added `BillboardGraphics.imageSubRegion`, to enable custom texture atlas use for `Entity` instances.
  添加了 `BillboardGraphics.imageSubRegion`，以允许为 `Entity` 实例使用自定义纹理图集。
- Added `CheckerboardMaterialProperty` to enable use of the checkerboard material with the entity API.
  添加了 `CheckerboardMaterialProperty`，以支持在 entity API 中使用棋盘格材质。
- Added `PolygonHierarchy` to make defining polygons with holes clearer.
  添加了 `PolygonHierarchy`，使定义带孔多边形更加清晰。
- Added `PolygonGraphics.hierarchy` for supporting polygons with holes via data sources.
  添加了 `PolygonGraphics.hierarchy`，以便通过数据源支持带孔多边形。
- Added `BoundingSphere.fromBoundingSpheres`, which creates a `BoundingSphere` that encloses the specified array of BoundingSpheres.
  添加了 `BoundingSphere.fromBoundingSpheres`，用于创建包围指定 BoundingSphere 数组的 `BoundingSphere`。
- Added `Model.readyPromise` and `Primitive.readyPromise` which are promises that resolve when the primitives are ready.
  添加了 `Model.readyPromise` 和 `Primitive.readyPromise`，这两个 promise 在图元就绪时解析。
- `ConstantProperty` can now hold any value; previously it was limited to values that implemented `equals` and `clones` functions, as well as a few special cases.
  `ConstantProperty` 现在可以保存任意值；此前它仅限于实现了 `equals` 和 `clones` 函数的值，以及少数特例。
- Fixed a bug in `EllipsoidGeodesic` that caused it to modify the `height` of the positions passed to the constructor or to to `setEndPoints`.
  修复了 `EllipsoidGeodesic` 中导致其修改传递给构造函数或 `setEndPoints` 的位置 `height` 的 bug。
- `WebMapTileServiceImageryProvider` now supports RESTful requests (by accepting a tile-URL template).
  `WebMapTileServiceImageryProvider` 现在支持 RESTful 请求（通过接受瓦片 URL 模板）。
- Fixed a bug that caused `Camera.roll` to be around 180 degrees, indicating the camera was upside-down, when in the Southern hemisphere.
  修复了在南半球时导致 `Camera.roll` 约为 180 度（表明相机倒置）的 bug。
- The object returned by `Primitive.getGeometryInstanceAttributes` now contains the instance's bounding sphere and repeated calls will always now return the same object instance.
  `Primitive.getGeometryInstanceAttributes` 返回的对象现在包含实例的包围球，且重复调用现在将始终返回相同的对象实例。
- Fixed a bug that caused dynamic geometry outlines widths to not work on implementations that support them.
  修复了导致动态几何体轮廓宽度在支持它们的实现上不起作用的 bug。
- The `SelectionIndicator` widget now works for all entity visualization and uses the center of visualization instead of entity.position. This produces more accurate results, especially for shapes, volumes, and models.
  `SelectionIndicator` 部件现在适用于所有实体可视化，并使用可视化中心代替 entity.position。这会产生更准确的结果，尤其是对于形状、体积和模型。
- Added `CustomDataSource` which makes it easy to create and manage a group of entities without having to manually implement the DataSource interface in a new class.
  添加了 `CustomDataSource`，使用户无需在新类中手动实现 DataSource 接口即可轻松创建和管理一组实体。
- Added `DataSourceDisplay.defaultDataSource` which is an instance of `CustomDataSource` and allows you to easily add custom entities to the display.
  添加了 `DataSourceDisplay.defaultDataSource`，它是 `CustomDataSource` 的一个实例，允许你轻松地将自定义实体添加到显示器中。
- Added `Camera.viewBoundingSphere` and `Camera.flyToBoundingSphere`, which as the names imply, sets or flies to a view that encloses the provided `BoundingSphere`
  添加了 `Camera.viewBoundingSphere` 和 `Camera.flyToBoundingSphere`，顾名思义，将视角设置或飞向包围所提供的 `BoundingSphere` 的视角。
- For constant `Property` values, there is no longer a need to create an instance of `ConstantProperty` or `ConstantPositionProperty`, you can now assign a value directly to the corresponding property. The same is true for material images and colors.
  对于常量 `Property` 值，不再需要创建 `ConstantProperty` 或 `ConstantPositionProperty` 实例，现在可以直接将值赋给相应属性。材质图像和颜色也是如此。
- All Entity and related classes can now be assigned using anonymous objects as well as be passed template objects. The correct underlying instance is created for you automatically. For a more detailed overview of changes to the Entity API, see [this forum thread](https://community.cesium.com/t/cesium-in-2015-entity-api/1863) for details.
  所有 Entity 及相关类现在都可以使用匿名对象进行赋值，也可以传入模板对象。系统会自动为你创建正确的底层实例。有关 Entity API 变更的更详细概述，请参阅[此论坛讨论帖](https://community.cesium.com/t/cesium-in-2015-entity-api/1863)。

## 1.5 - 2015-01-05

- Breaking changes
  破坏性变更
  - Removed `GeometryPipeline.wrapLongitude`, which was deprecated in 1.4. Use `GeometryPipeline.splitLongitude` instead.
    移除了在 1.4 中弃用的 `GeometryPipeline.wrapLongitude`。请改用 `GeometryPipeline.splitLongitude`。
  - Removed `GeometryPipeline.combine`, which was deprecated in 1.4. Use `GeometryPipeline.combineInstances` instead.
    移除了在 1.4 中弃用的 `GeometryPipeline.combine`。请改用 `GeometryPipeline.combineInstances`。
- Deprecated
  弃用
  - `viewerEntityMixin` was deprecated. It will be removed in Cesium 1.6. Its functionality is now directly part of the `Viewer` widget.
    `viewerEntityMixin` 已弃用。它将在 Cesium 1.6 中移除。其功能现在直接作为 `Viewer` 部件的一部分。
  - `Rectangle.intersectWith` was deprecated. It will be removed in Cesium 1.6. Use `Rectangle.intersection`, which is the same but returns `undefined` when two rectangles do not intersect.
    `Rectangle.intersectWith` 已弃用。它将在 Cesium 1.6 中移除。请改用 `Rectangle.intersection`，作用相同但在两个矩形不相交时返回 `undefined`。
  - `Rectangle.isEmpty` was deprecated. It will be removed in Cesium 1.6.
    `Rectangle.isEmpty` 已弃用。它将在 Cesium 1.6 中移除。
- Improved GeoJSON, TopoJSON, and general polygon loading performance.
  改进了 GeoJSON、TopoJSON 以及常规多边形的加载性能。
- Added caching to `Model` to save memory and improve loading speed when several models with the same url are created.
  为 `Model` 添加了缓存机制，以在创建具有相同 URL 的多个模型时节省内存并提高加载速度。
- Added `ModelNode.show` for per-node show/hide.
  添加了 `ModelNode.show` 用于逐节点显示/隐藏。
- Added the following properties to `Viewer` and `CesiumWidget`: `imageryLayers`, `terrainProvider`, and `camera`. This avoids the need to access `viewer.scene` in some cases.
  向 `Viewer` 和 `CesiumWidget` 添加了以下属性：`imageryLayers`、`terrainProvider` 和 `camera`。这避免了在某些情况下必须访问 `viewer.scene` 的需要。
- Dramatically improved the quality of font outlines.
  显著提升了字体轮廓的质量。
- Added `BoxGraphics` and `Entity.box`.
  添加了 `BoxGraphics` 和 `Entity.box`。
- Added `CorridorGraphics` and `Entity.corridor`.
  添加了 `CorridorGraphics` 和 `Entity.corridor`。
- Added `CylinderGraphics` and `Entity.cylinder`.
  添加了 `CylinderGraphics` 和 `Entity.cylinder`。
- Fixed imagery providers whose rectangle crosses the IDL. Added `Rectangle.computeWidth`, `Rectangle.computeHeight`, `Rectangle.width`, and `Rectangle.height`. [#2195](https://github.com/CesiumGS/cesium/issues/2195)
  修复了矩形范围跨越国际日界线（IDL）时的影像提供器问题。添加了 `Rectangle.computeWidth`、`Rectangle.computeHeight`、`Rectangle.width` 和 `Rectangle.height`。[#2195](https://github.com/CesiumGS/cesium/issues/2195)
- `ConstantProperty` now accepts `HTMLElement` instances as valid values.
  `ConstantProperty` 现在接受 `HTMLElement` 实例作为有效值。
- `BillboardGraphics.image` and `ImageMaterialProperty.image` now accept `Property` instances that represent an `Image` or `Canvas` in addition to a url.
  `BillboardGraphics.image` 和 `ImageMaterialProperty.image` 现在除 URL 外，还接受表示 `Image` 或 `Canvas` 的 `Property` 实例。
- Fixed a bug in `PolylineGeometry` that would cause gaps in the line. [#2136](https://github.com/CesiumGS/cesium/issues/2136)
  修复了 `PolylineGeometry` 中导致线段出现间隙的 bug。[#2136](https://github.com/CesiumGS/cesium/issues/2136)
- Fixed `upsampleQuantizedTerrainMesh` rounding errors that had occasionally led to missing terrain skirt geometry in upsampled tiles.
  修复了 `upsampleQuantizedTerrainMesh` 四舍五入误差偶尔导致上采样瓦片中丢失地形裙边几何体的问题。
- Added `Math.mod` which computes `m % n` but also works when `m` is negative.
  添加了 `Math.mod`，用于计算 `m % n`，且当 `m` 为负数时也有效。

## 1.4 - 2014-12-01

- Breaking changes
  破坏性变更
  - Types implementing `TerrainProvider` are now required to implement the `getTileDataAvailable` function. Backwards compatibility for this was deprecated in Cesium 1.2.
    实现 `TerrainProvider` 的类型现在必须实现 `getTileDataAvailable` 函数。对此的向后兼容支持已在 Cesium 1.2 中弃用。
- Deprecated
  弃用
  - The `sourceUri` parameter to `GeoJsonDatasource.load` was deprecated and will be removed in Cesium 1.6 on February 3, 2015 ([#2257](https://github.com/CesiumGS/cesium/issues/2257)). Use `options.sourceUri` instead.
    `GeoJsonDatasource.load` 的 `sourceUri` 参数已弃用，并将于 2015 年 2 月 3 日在 Cesium 1.6 中移除（[#2257](https://github.com/CesiumGS/cesium/issues/2257)）。请改用 `options.sourceUri`。
  - `GeometryPipeline.wrapLongitude` was deprecated. It will be removed in Cesium 1.5 on January 2, 2015. Use `GeometryPipeline.splitLongitude`. ([#2272](https://github.com/CesiumGS/cesium/issues/2272))
    `GeometryPipeline.wrapLongitude` 已弃用。它将于 2015 年 1 月 2 日在 Cesium 1.5 中移除。请改用 `GeometryPipeline.splitLongitude`（[#2272](https://github.com/CesiumGS/cesium/issues/2272)）。
  - `GeometryPipeline.combine` was deprecated. It will be removed in Cesium 1.5. Use `GeometryPipeline.combineInstances`.
    `GeometryPipeline.combine` 已弃用。它将在 Cesium 1.5 中移除。请改用 `GeometryPipeline.combineInstances`。
- Added support for touch events on Internet Explorer 11 using the [Pointer Events API](http://www.w3.org/TR/pointerevents/).
  通过 [Pointer Events API](http://www.w3.org/TR/pointerevents/) 添加了对 Internet Explorer 11 上触摸事件的支持。
- Added geometry outline width support to the `DataSource` layer. This is exposed via the new `outlineWidth` property on `EllipseGraphics`, `EllipsoidGraphics`, `PolygonGraphics`, `RectangleGraphics`, and `WallGraphics`.
  为 `DataSource` 层添加了几何体轮廓宽度支持。通过 `EllipseGraphics`、`EllipsoidGraphics`、`PolygonGraphics`、`RectangleGraphics` 和 `WallGraphics` 上的新属性 `outlineWidth` 公开。
- Added `outlineWidth` support to CZML geometry packets.
  为 CZML 几何体数据包添加了 `outlineWidth` 支持。
- Added `stroke-width` support to the GeoJSON simple-style implementation.
  为 GeoJSON simple-style 实现添加了 `stroke-width` 支持。
- Added the ability to specify global GeoJSON default styling. See the [documentation](http://cesiumjs.org/Cesium/Build/Documentation/GeoJsonDataSource.html) for details.
  添加了指定全局 GeoJSON 默认样式的能力。有关详细信息请参阅[文档](http://cesiumjs.org/Cesium/Build/Documentation/GeoJsonDataSource.html)。
- Added `CallbackProperty` to support lazy property evaluation as well as make custom properties easier to create.
  添加了 `CallbackProperty` 以支持延迟属性求值，并使自定义属性更容易创建。
- Added an options parameter to `GeoJsonDataSource.load`, `GeoJsonDataSource.loadUrl`, and `GeoJsonDataSource.fromUrl` to allow for basic per-instance styling. [Sandcastle example](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=GeoJSON%20and%20TopoJSON.html&label=Showcases).
  向 `GeoJsonDataSource.load`、`GeoJsonDataSource.loadUrl` 和 `GeoJsonDataSource.fromUrl` 添加了 options 参数，以支持逐实例的基本样式定制。[Sandcastle 示例](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=GeoJSON%20and%20TopoJSON.html&label=Showcases)。
- Improved GeoJSON loading performance.
  改进了 GeoJSON 加载性能。
- Improved point visualization performance for all DataSources.
  提升了所有 DataSource 的点可视化性能。
- Improved the performance and memory usage of `EllipseGeometry`, `EllipseOutlineGeometry`, `CircleGeometry`, and `CircleOutlineGeometry`.
  改进了 `EllipseGeometry`、`EllipseOutlineGeometry`、`CircleGeometry` 和 `CircleOutlineGeometry` 的性能和内存占用。
- Added `tileMatrixLabels` option to `WebMapTileServiceImageryProvider`.
  向 `WebMapTileServiceImageryProvider` 添加了 `tileMatrixLabels` 选项。
- Fixed a bug in `PolylineGeometry` that would cause the geometry to be split across the IDL for 3D only scenes. [#1197](https://github.com/CesiumGS/cesium/issues/1197)
  修复了 `PolylineGeometry` 中导致几何体在纯 3D 场景下跨越国际日界线分割的 bug。[#1197](https://github.com/CesiumGS/cesium/issues/1197)
- Added `modelMatrix` and `cull` options to `Primitive` constructor.
  向 `Primitive` 构造函数添加了 `modelMatrix` 和 `cull` 选项。
- The `translation` parameter to `Matrix4.fromRotationTranslation` now defaults to `Cartesian3.ZERO`.
  `Matrix4.fromRotationTranslation` 的 `translation` 参数现在默认为 `Cartesian3.ZERO`。
- Fixed `ModelNode.matrix` when a node is targeted for animation.
  修复了节点被指定为动画目标时的 `ModelNode.matrix`。
- `Camera.tilt` now clamps to `[-pi / 2, pi / 2]` instead of `[0, pi / 2]`.
  `Camera.tilt` 现在限制在 `[-pi / 2, pi / 2]` 而不是 `[0, pi / 2]`。
- Fixed an issue that could lead to poor performance on lower-end GPUs like the Intel HD 3000.
  修复了在诸如 Intel HD 3000 等低端 GPU 上可能导致性能较差的问题。
- Added `distanceSquared` to `Cartesian2`, `Cartesian3`, and `Cartesian4`.
  向 `Cartesian2`、`Cartesian3` 和 `Cartesian4` 添加了 `distanceSquared`。
- Added `Matrix4.multiplyByMatrix3`.
  添加了 `Matrix4.multiplyByMatrix3`。
- Fixed a bug in `Model` where the WebGL shader optimizer in Linux was causing mesh loading to fail.
  修复了 `Model` 中 Linux 下 WebGL 着色器优化器导致网格加载失败的 bug。

## 1.3 - 2014-11-03

- Worked around a shader compilation regression in Firefox 33 and 34 by falling back to a less precise shader on those browsers. [#2197](https://github.com/CesiumGS/cesium/issues/2197)
  针对 Firefox 33 和 34 中的着色器编译衰退，通过在这些浏览器上回退到精度较低的着色器进行了规避。[#2197](https://github.com/CesiumGS/cesium/issues/2197)
- Added support to the `CesiumTerrainProvider` for terrain tiles with more than 64K vertices, which is common for sub-meter terrain.
  向 `CesiumTerrainProvider` 添加了对拥有超过 64K 顶点的地形瓦片的支持，这在亚米级地形中很常见。
- Added `Primitive.compressVertices`. When true (default), geometry vertices are compressed to save GPU memory.
  添加了 `Primitive.compressVertices`。当为 true（默认值）时，压缩几何体顶点以节省 GPU 内存。
- Added `culture` option to `BingMapsImageryProvider` constructor.
  向 `BingMapsImageryProvider` 构造函数添加了 `culture` 选项。
- Reduced the amount of GPU memory used by billboards and labels.
  减少了广告牌和标签占用的 GPU 内存。
- Fixed a bug that caused non-base imagery layers with a limited `rectangle` to be stretched to the edges of imagery tiles. [#416](https://github.com/CesiumGS/cesium/issues/416)
  修复了导致带有受限 `rectangle` 的非基础影像图层拉伸到影像瓦片边缘的 bug。[#416](https://github.com/CesiumGS/cesium/issues/416)
- Fixed rendering polylines with duplicate positions. [#898](https://github.com/CesiumGS/cesium/issues/898)
  修复了渲染具有重复位置的折线的问题。[#898](https://github.com/CesiumGS/cesium/issues/898)
- Fixed a bug in `Globe.pick` that caused it to return incorrect results when using terrain data with vertex normals. The bug manifested itself as strange behavior when navigating around the surface with the mouse as well as incorrect results when using `Camera.viewRectangle`.
  修复了在使用带顶点法线的地形数据时导致 `Globe.pick` 返回错误结果的 bug。该 bug 表现为使用鼠标在表面导航时的异常行为以及使用 `Camera.viewRectangle` 时的不正确结果。
- Fixed a bug in `sampleTerrain` that could cause it to produce undefined heights when sampling for a position very near the edge of a tile.
  修复了 `sampleTerrain` 在采样非常靠近瓦片边缘的位置时可能产生未定义高度的 bug。
- `ReferenceProperty` instances now retain their last value if the entity being referenced is removed from the target collection. The reference will be automatically reattached if the target is reintroduced.
  如果被引用的实体从目标集合中移除，`ReferenceProperty` 实例现在会保留其最后一个值。如果目标重新引入，引用将自动重新关联。
- Upgraded topojson from 1.6.8 to 1.6.18.
  将 topojson 从 1.6.8 升级到 1.6.18。
- Upgraded Knockout from version 3.1.0 to 3.2.0.
  将 Knockout 从版本 3.1.0 升级到 3.2.0。
- Upgraded CodeMirror, used by SandCastle, from 2.24 to 4.6.
  将 SandCastle 使用的 CodeMirror 从 2.24 升级到 4.6。

## 1.2 - 2014-10-01

- Deprecated
  弃用
  - Types implementing the `TerrainProvider` interface should now include the new `getTileDataAvailable` function. The function will be required starting in Cesium 1.4.
    实现 `TerrainProvider` 接口的类型现在应包含新的 `getTileDataAvailable` 函数。从 Cesium 1.4 开始将必需该函数。
- Fixed model orientations to follow the same Z-up convention used throughout Cesium. There was also an orientation issue fixed in the [online model converter](http://cesiumjs.org/convertmodel.html). If you are having orientation issues after updating, try reconverting your models.
  修复了模型朝向以遵循 Cesium 贯穿使用的 Z 轴向上约定。在线[模型转换器](http://cesiumjs.org/convertmodel.html)中也修复了一个朝向问题。如果更新后遇到朝向问题，请尝试重新转换你的模型。
- Fixed a bug in `Model` where the wrong animations could be used when the model was created from glTF JSON instead of a url to a glTF file. [#2078](https://github.com/CesiumGS/cesium/issues/2078)
  修复了当模型是从 glTF JSON 而不是 glTF 文件的 URL 创建时，`Model` 中可能使用错误动画的 bug。[#2078](https://github.com/CesiumGS/cesium/issues/2078)
- Fixed a bug in `GeoJsonDataSource` which was causing polygons with height values to be drawn onto the surface.
  修复了 `GeoJsonDataSource` 中导致带有高度值的多边形绘制在地表的 bug。
- Fixed a bug that could cause a crash when quickly adding and removing imagery layers.
  修复了快速添加和移除影像图层时可能引发崩溃的 bug。
- Eliminated imagery artifacts at some zoom levels due to Mercator re-projection.
  消除了由于墨卡托重投影而在某些缩放级别下产生的影像伪影。
- Added support for the GeoJSON [simplestyle specification](https://github.com/mapbox/simplestyle-spec). ([Sandcastle example](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=GeoJSON%20simplestyle.html))
  添加了对 GeoJSON [simplestyle 规范](https://github.com/mapbox/simplestyle-spec)的支持。（[Sandcastle 示例](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=GeoJSON%20simplestyle.html)）
- Added `GeoJsonDataSource.fromUrl` to make it easy to add a data source in less code.
  添加了 `GeoJsonDataSource.fromUrl`，以便用更少的代码轻松添加数据源。
- Added `PinBuilder` class for easy creation of map pins. ([Sandcastle example](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=PinBuilder.html))
  添加了 `PinBuilder` 类以轻松创建地图大头针。（[Sandcastle 示例](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=PinBuilder.html)）
- Added `Color.brighten` and `Color.darken` to make it easy to brighten or darker a color instance.
  添加了 `Color.brighten` 和 `Color.darken`，以便轻松提亮或加深颜色实例。
- Added a constructor option to `Scene`, `CesiumWidget`, and `Viewer` to disable order independent translucency.
  向 `Scene`、`CesiumWidget` 和 `Viewer` 添加了构造函数选项以禁用独立顺序半透明度（OIT）。
- Added support for WKID 102113 (equivalent to 102100) to `ArcGisMapServerImageryProvider`.
  为 `ArcGisMapServerImageryProvider` 添加了对 WKID 102113（等同于 102100）的支持。
- Added `TerrainProvider.getTileDataAvailable` to improve tile loading performance when camera starts near globe.
  添加了 `TerrainProvider.getTileDataAvailable`，以在相机初始靠近地球时提高瓦片加载性能。
- Added `Globe.showWaterEffect` to enable/disable the water effect for supported terrain providers.
  添加了 `Globe.showWaterEffect` 用于为受支持的地形提供器启用/禁用流水效果。
- Added `Globe.baseColor` to set the color of the globe when no imagery is available.
  添加了 `Globe.baseColor`，用于在没有可用影像时设置地球的基础颜色。
- Changed default `GeoJSON` Point feature graphics to use `BillboardGraphics` with a blue map pin instead of color `PointGraphics`.
  将默认的 `GeoJSON` 点要素图形改为使用带有蓝色地图大头针的 `BillboardGraphics`，而不是彩色的 `PointGraphics`。
- Cesium now ships with a version of the [maki icon set](https://www.mapbox.com/maki/) for use with `PinBuilder` and GeoJSON simplestyle support.
  Cesium 现在附带了一个版本的 [maki 图标集](https://www.mapbox.com/maki/)，以配合 `PinBuilder` 和 GeoJSON simplestyle 支持使用。
- Cesium now ships with a default web.config file to simplify IIS deployment.
  Cesium 现在附带了一个默认的 web.config 文件以简化 IIS 部署。

## 1.1 - 2014-09-02

- Added a new imagery provider, `WebMapTileServiceImageryProvider`, for accessing tiles on a WMTS 1.0.0 server.
  添加了新的影像提供器 `WebMapTileServiceImageryProvider`，用于访问 WMTS 1.0.0 服务器上的瓦片。
- Added an optional `pickFeatures` function to the `ImageryProvider` interface. With supporting imagery providers, such as `WebMapServiceImageryProvider`, it can be used to determine the rasterized features under a particular location.
  向 `ImageryProvider` 接口添加了可选的 `pickFeatures` 函数。结合支持的影像提供器（如 `WebMapServiceImageryProvider`），它可以用于确定特定位置下的栅格化要素。
- Added `ImageryLayerCollection.pickImageryLayerFeatures`. It determines the rasterized imagery layer features intersected by a given pick ray by querying supporting layers using `ImageryProvider.pickFeatures`.
  添加了 `ImageryLayerCollection.pickImageryLayerFeatures`。它通过使用 `ImageryProvider.pickFeatures` 查询支持的图层，来确定与给定拾取射线相交的栅格化影像图层要素。
- Added `tileWidth`, `tileHeight`, `minimumLevel`, and `tilingScheme` parameters to the `WebMapServiceImageryProvider` constructor.
  向 `WebMapServiceImageryProvider` 构造函数添加了 `tileWidth`、`tileHeight`、`minimumLevel` 和 `tilingScheme` 参数。
- Added `id` property to `Scene` which is a readonly unique identifier associated with each instance.
  向 `Scene` 添加了 `id` 属性，这是与每个实例关联的只读唯一标识符。
- Added `FeatureDetection.supportsWebWorkers`.
  添加了 `FeatureDetection.supportsWebWorkers`。
- Greatly improved the performance of time-varying polylines when using DataSources.
  大幅提高了使用 DataSource 时时变折线的性能。
- `viewerEntityMixin` now automatically queries for imagery layer features on click and shows their properties in the `InfoBox` panel.
  `viewerEntityMixin` 现在点击时会自动查询影像图层要素，并在 `InfoBox` 面板中显示其属性。
- Fixed a bug in terrain and imagery loading that could cause an inconsistent frame rate when moving around the globe, especially on a faster internet connection.
  修复了地形和影像加载中的一个 bug，该 bug 在环绕地球移动时可能导致帧率不一致，特别是在网速较快的情况下。
- Fixed a bug that caused `SceneTransforms.wgs84ToWindowCoordinates` to incorrectly return `undefined` when in 2D.
  修复了导致 `SceneTransforms.wgs84ToWindowCoordinates` 在 2D 模式下错误返回 `undefined` 的 bug。
- Fixed a bug in `ImageryLayer` that caused layer images to be rendered twice for each terrain tile that existed prior to adding the imagery layer.
  修复了 `ImageryLayer` 中的一个 bug，该 bug 导致在添加影像图层之前已存在的每个地形瓦片都会将图层图像渲染两次。
- Fixed a bug in `Camera.pickEllipsoid` that caused it to return the back side of the ellipsoid when near the surface.
  修复了 `Camera.pickEllipsoid` 在靠近表面时返回椭球背面的 bug。
- Fixed a bug which prevented `loadWithXhr` from working with older browsers, such as Internet Explorer 9.
  修复了阻止 `loadWithXhr` 在较旧浏览器（例如 Internet Explorer 9）中工作的 bug。

## 1.0 - 2014-08-01

- Breaking changes ([why so many?](https://community.cesium.com/t/moving-towards-cesium-1-0/1209))
  破坏性变更（[为何有这么多变更？](https://community.cesium.com/t/moving-towards-cesium-1-0/1209)）
  - All `Matrix2`, `Matrix3`, `Matrix4` and `Quaternion` functions that take a `result` parameter now require the parameter, except functions starting with `from`.
    除以 `from` 开头的函数外，所有接受 `result` 参数的 `Matrix2`、`Matrix3`、`Matrix4` 和 `Quaternion` 函数现在都需要该参数。
  - Removed `Billboard.imageIndex` and `BillboardCollection.textureAtlas`. Instead, use `Billboard.image`.
    移除了 `Billboard.imageIndex` 和 `BillboardCollection.textureAtlas`。请改用 `Billboard.image`。
    - Code that looked like:
      此前形如以下的代码：

            var billboards = new Cesium.BillboardCollection();
            var textureAtlas = new Cesium.TextureAtlas({
                scene : scene,
                images : images // array of loaded images
            });
            billboards.textureAtlas = textureAtlas;
            billboards.add({
                imageIndex : 0,
                position : //...
            });

    - should now look like:
      现在应编写为：

            var billboards = new Cesium.BillboardCollection();
            billboards.add({
                image : '../images/Cesium_Logo_overlay.png',
                position : //...
            });

  - Updated the [Model Converter](http://cesiumjs.org/convertmodel.html) and `Model` to support [glTF 0.8](https://github.com/KhronosGroup/glTF/blob/schema-8/specification/README.md). See the [forum post](https://community.cesium.com/t/cesium-and-gltf-version-compatibility/1343) for full details.
    更新了[模型转换器（Model Converter）](http://cesiumjs.org/convertmodel.html)和 `Model` 以支持 [glTF 0.8](https://github.com/KhronosGroup/glTF/blob/schema-8/specification/README.md)。有关完整详细信息，请参阅[论坛讨论帖](https://community.cesium.com/t/cesium-and-gltf-version-compatibility/1343)。
  - `Model` primitives are now rotated to be `Z`-up to match Cesium convention; glTF stores models with `Y` up.
    `Model` 图元现在旋转为以 `Z` 轴向上以匹配 Cesium 的约定；glTF 存储模型为 `Y` 轴向上。
  - `SimplePolylineGeometry` and `PolylineGeometry` now curve to follow the ellipsoid surface by default. To disable this behavior, set the option `followSurface` to `false`.
    `SimplePolylineGeometry` 和 `PolylineGeometry` 现在默认弯曲以贴合椭球体表面。要禁用此行为，请将选项 `followSurface` 设置为 `false`。
  - Renamed `DynamicScene` layer to `DataSources`. The following types were also renamed:
    将 `DynamicScene` 层重命名为 `DataSources`。以下类型也已重命名：
    - `DynamicBillboard` -> `BillboardGraphics`
      `DynamicBillboard` -> `BillboardGraphics`
    - `DynamicBillboardVisualizer` -> `BillboardVisualizer`
      `DynamicBillboardVisualizer` -> `BillboardVisualizer`
    - `CompositeDynamicObjectCollection` -> `CompositeEntityCollection`
      `CompositeDynamicObjectCollection` -> `CompositeEntityCollection`
    - `DynamicClock` -> `DataSourceClock`
      `DynamicClock` -> `DataSourceClock`
    - `DynamicEllipse` -> `EllipseGraphics`
      `DynamicEllipse` -> `EllipseGraphics`
    - `DynamicEllipsoid` -> `EllipsoidGraphics`
      `DynamicEllipsoid` -> `EllipsoidGraphics`
    - `DynamicObject` -> `Entity`
      `DynamicObject` -> `Entity`
    - `DynamicObjectCollection` -> `EntityCollection`
      `DynamicObjectCollection` -> `EntityCollection`
    - `DynamicObjectView` -> `EntityView`
      `DynamicObjectView` -> `EntityView`
    - `DynamicLabel` -> `LabelGraphics`
      `DynamicLabel` -> `LabelGraphics`
    - `DynamicLabelVisualizer` -> `LabelVisualizer`
      `DynamicLabelVisualizer` -> `LabelVisualizer`
    - `DynamicModel` -> `ModelGraphics`
      `DynamicModel` -> `ModelGraphics`
    - `DynamicModelVisualizer` -> `ModelVisualizer`
      `DynamicModelVisualizer` -> `ModelVisualizer`
    - `DynamicPath` -> `PathGraphics`
      `DynamicPath` -> `PathGraphics`
    - `DynamicPathVisualizer` -> `PathVisualizer`
      `DynamicPathVisualizer` -> `PathVisualizer`
    - `DynamicPoint` -> `PointGraphics`
      `DynamicPoint` -> `PointGraphics`
    - `DynamicPointVisualizer` -> `PointVisualizer`
      `DynamicPointVisualizer` -> `PointVisualizer`
    - `DynamicPolygon` -> `PolygonGraphics`
      `DynamicPolygon` -> `PolygonGraphics`
    - `DynamicPolyline` -> `PolylineGraphics`
      `DynamicPolyline` -> `PolylineGraphics`
    - `DynamicRectangle` -> `RectangleGraphics`
      `DynamicRectangle` -> `RectangleGraphics`
    - `DynamicWall` -> `WallGraphics`
      `DynamicWall` -> `WallGraphics`
    - `viewerDynamicObjectMixin` -> `viewerEntityMixin`
      `viewerDynamicObjectMixin` -> `viewerEntityMixin`
  - Removed `DynamicVector` and `DynamicVectorVisualizer`.
    移除了 `DynamicVector` 和 `DynamicVectorVisualizer`。
  - Renamed `DataSource.dynamicObjects` to `DataSource.entities`.
    将 `DataSource.dynamicObjects` 重命名为 `DataSource.entities`。
  - `EntityCollection.getObjects()` and `CompositeEntityCollection.getObjects()` are now properties named `EntityCollection.entities` and `CompositeEntityCollection.entities`.
    `EntityCollection.getObjects()` 和 `CompositeEntityCollection.getObjects()` 现在是名为 `EntityCollection.entities` 和 `CompositeEntityCollection.entities` 的属性。
  - Renamed `Viewer.trackedObject` and `Viewer.selectedObject` to `Viewer.trackedEntity` and `Viewer.selectedEntity` when using the `viewerEntityMixin`.
    在使用 `viewerEntityMixin` 时，将 `Viewer.trackedObject` 和 `Viewer.selectedObject` 重命名为 `Viewer.trackedEntity` 和 `Viewer.selectedEntity`。
  - Renamed functions for consistency:
    为保持一致性重命名了以下函数：
    - `BoundingSphere.getPlaneDistances` -> `BoundingSphere.computePlaneDistances`
      `BoundingSphere.getPlaneDistances` -> `BoundingSphere.computePlaneDistances`
    - `Cartesian[2,3,4].getMaximumComponent` -> `Cartesian[2,3,4].maximumComponent`
      `Cartesian[2,3,4].getMaximumComponent` -> `Cartesian[2,3,4].maximumComponent`
    - `Cartesian[2,3,4].getMinimumComponent` -> `Cartesian[2,3,4].minimumComponent`
      `Cartesian[2,3,4].getMinimumComponent` -> `Cartesian[2,3,4].minimumComponent`
    - `Cartesian[2,3,4].getMaximumByComponent` -> `Cartesian[2,3,4].maximumByComponent`
      `Cartesian[2,3,4].getMaximumByComponent` -> `Cartesian[2,3,4].maximumByComponent`
    - `Cartesian[2,3,4].getMinimumByComponent` -> `Cartesian[2,3,4].minimumByComponent`
      `Cartesian[2,3,4].getMinimumByComponent` -> `Cartesian[2,3,4].minimumByComponent`
    - `CubicRealPolynomial.realRoots` -> `CubicRealPolynomial.computeRealRoots`
      `CubicRealPolynomial.realRoots` -> `CubicRealPolynomial.computeRealRoots`
    - `CubicRealPolynomial.discriminant` -> `CubicRealPolynomial.computeDiscriminant`
      `CubicRealPolynomial.discriminant` -> `CubicRealPolynomial.computeDiscriminant`
    - `JulianDate.getTotalDays` -> `JulianDate.totalDays`
      `JulianDate.getTotalDays` -> `JulianDate.totalDays`
    - `JulianDate.getSecondsDifference` -> `JulianDate.secondsDifference`
      `JulianDate.getSecondsDifference` -> `JulianDate.secondsDifference`
    - `JulianDate.getDaysDifference` -> `JulianDate.daysDifference`
      `JulianDate.getDaysDifference` -> `JulianDate.daysDifference`
    - `JulianDate.getTaiMinusUtc` -> `JulianDate.computeTaiMinusUtc`
      `JulianDate.getTaiMinusUtc` -> `JulianDate.computeTaiMinusUtc`
    - `Matrix3.getEigenDecomposition` -> `Matrix3.computeEigenDecomposition`
      `Matrix3.getEigenDecomposition` -> `Matrix3.computeEigenDecomposition`
    - `Occluder.getVisibility` -> `Occluder.computeVisibility`
      `Occluder.getVisibility` -> `Occluder.computeVisibility`
    - `Occluder.getOccludeePoint` -> `Occluder.computerOccludeePoint`
      `Occluder.getOccludeePoint` -> `Occluder.computerOccludeePoint`
    - `QuadraticRealPolynomial.discriminant` -> `QuadraticRealPolynomial.computeDiscriminant`
      `QuadraticRealPolynomial.discriminant` -> `QuadraticRealPolynomial.computeDiscriminant`
    - `QuadraticRealPolynomial.realRoots` -> `QuadraticRealPolynomial.computeRealRoots`
      `QuadraticRealPolynomial.realRoots` -> `QuadraticRealPolynomial.computeRealRoots`
    - `QuarticRealPolynomial.discriminant` -> `QuarticRealPolynomial.computeDiscriminant`
      `QuarticRealPolynomial.discriminant` -> `QuarticRealPolynomial.computeDiscriminant`
    - `QuarticRealPolynomial.realRoots` -> `QuarticRealPolynomial.computeRealRoots`
      `QuarticRealPolynomial.realRoots` -> `QuarticRealPolynomial.computeRealRoots`
    - `Quaternion.getAxis` -> `Quaternion.computeAxis`
      `Quaternion.getAxis` -> `Quaternion.computeAxis`
    - `Quaternion.getAngle` -> `Quaternion.computeAngle`
      `Quaternion.getAngle` -> `Quaternion.computeAngle`
    - `Quaternion.innerQuadrangle` -> `Quaternion.computeInnerQuadrangle`
      `Quaternion.innerQuadrangle` -> `Quaternion.computeInnerQuadrangle`
    - `Rectangle.getSouthwest` -> `Rectangle.southwest`
      `Rectangle.getSouthwest` -> `Rectangle.southwest`
    - `Rectangle.getNorthwest` -> `Rectangle.northwest`
      `Rectangle.getNorthwest` -> `Rectangle.northwest`
    - `Rectangle.getSoutheast` -> `Rectangle.southeast`
      `Rectangle.getSoutheast` -> `Rectangle.southeast`
    - `Rectangle.getNortheast` -> `Rectangle.northeast`
      `Rectangle.getNortheast` -> `Rectangle.northeast`
    - `Rectangle.getCenter` -> `Rectangle.center`
      `Rectangle.getCenter` -> `Rectangle.center`
    - `CullingVolume.getVisibility` -> `CullingVolume.computeVisibility`
      `CullingVolume.getVisibility` -> `CullingVolume.computeVisibility`
  - Replaced `PerspectiveFrustum.fovy` with `PerspectiveFrustum.fov` which will change the field of view angle in either the `X` or `Y` direction depending on the aspect ratio.
    将 `PerspectiveFrustum.fovy` 替换为 `PerspectiveFrustum.fov`，它将根据纵横比改变 `X` 或 `Y` 方向上的视场角。
  - Removed the following from the Cesium API: `Transforms.earthOrientationParameters`, `EarthOrientationParameters`, `EarthOrientationParametersSample`, `Transforms.iau2006XysData`, `Iau2006XysData`, `Iau2006XysSample`, `IauOrientationAxes`, `TimeConstants`, `Scene.frameState`, `FrameState`, `EncodedCartesian3`, `EllipsoidalOccluder`, `TextureAtlas`, and `FAR`. These are still available but are not part of the official API and may change in future versions.
    从 Cesium API 中移除了以下内容：`Transforms.earthOrientationParameters`、`EarthOrientationParameters`、`EarthOrientationParametersSample`、`Transforms.iau2006XysData`、`Iau2006XysData`、`Iau2006XysSample`、`IauOrientationAxes`、`TimeConstants`、`Scene.frameState`、`FrameState`、`EncodedCartesian3`、`EllipsoidalOccluder`、`TextureAtlas` 和 `FAR`。这些内容仍然可用，但不属于官方公开 API，可能会在未来版本中发生变更。
  - Removed `DynamicObject.vertexPositions`. Use `DynamicWall.positions`, `DynamicPolygon.positions`, and `DynamicPolyline.positions` instead.
    移除了 `DynamicObject.vertexPositions`。请改用 `DynamicWall.positions`、`DynamicPolygon.positions` 和 `DynamicPolyline.positions`。
  - Removed `defaultPoint`, `defaultLine`, and `defaultPolygon` from `GeoJsonDataSource`.
    从 `GeoJsonDataSource` 中移除了 `defaultPoint`、`defaultLine` 和 `defaultPolygon`。
  - Removed `Primitive.allow3DOnly`. Set the `Scene` constructor option `scene3DOnly` instead.
    移除了 `Primitive.allow3DOnly`。请改用 `Scene` 构造函数选项 `scene3DOnly`。
  - `SampledProperty` and `SampledPositionProperty` no longer extrapolate outside of their sample data time range by default.
    `SampledProperty` 和 `SampledPositionProperty` 默认不再超出其采样数据时间范围进行外推。
  - Changed the following functions to properties:
    将以下函数更改为属性：
    - `TerrainProvider.hasWaterMask`
      `TerrainProvider.hasWaterMask`
    - `CesiumTerrainProvider.hasWaterMask`
      `CesiumTerrainProvider.hasWaterMask`
    - `ArcGisImageServerTerrainProvider.hasWaterMask`
      `ArcGisImageServerTerrainProvider.hasWaterMask`
    - `EllipsoidTerrainProvider.hasWaterMask`
      `EllipsoidTerrainProvider.hasWaterMask`
    - `VRTheWorldTerrainProvider.hasWaterMask`
      `VRTheWorldTerrainProvider.hasWaterMask`
  - Removed `ScreenSpaceCameraController.ellipsoid`. The behavior that depended on the ellipsoid is now determined based on the scene state.
    移除了 `ScreenSpaceCameraController.ellipsoid`。依赖于该椭球的行为现在根据场景状态来确定。
  - Sandcastle examples now automatically wrap the example code in RequireJS boilerplate. To upgrade any custom examples, copy the code into an existing example (such as Hello World) and save a new file.
    Sandcastle 示例现在自动将示例代码包装在 RequireJS 样板中。要升级任何自定义示例，请将代码复制到现有示例（例如 Hello World）中并保存为新文件。
  - Removed `CustomSensorVolume`, `RectangularPyramidSensorVolume`, `DynamicCone`, `DynamicConeVisualizerUsingCustomSensor`, `DynamicPyramid` and `DynamicPyramidVisualizer`. This will be moved to a plugin in early August. [#1887](https://github.com/CesiumGS/cesium/issues/1887)
    移除了 `CustomSensorVolume`、`RectangularPyramidSensorVolume`、`DynamicCone`、`DynamicConeVisualizerUsingCustomSensor`、`DynamicPyramid` 和 `DynamicPyramidVisualizer`。这些内容将在 8 月初移至插件中。[#1887](https://github.com/CesiumGS/cesium/issues/1887)
  - If `Primitive.modelMatrix` is changed after creation, it only affects primitives with one instance and only in 3D mode.
    如果在创建后修改 `Primitive.modelMatrix`，它仅影响具有单个实例且仅在 3D 模式下的图元。
  - `ImageryLayer` properties `alpha`, `brightness`, `contrast`, `hue`, `saturation`, and `gamma` may no longer be functions. If you need to change these values each frame, consider moving your logic to an event handler for `Scene.preRender`.
    `ImageryLayer` 属性 `alpha`、`brightness`、`contrast`、`hue`、`saturation` 和 `gamma` 不再可以是函数。如果需要每帧更改这些值，请考虑将逻辑移至 `Scene.preRender` 的事件处理程序中。
  - Removed `closeTop` and `closeBottom` options from `RectangleGeometry`.
    从 `RectangleGeometry` 中移除了 `closeTop` 和 `closeBottom` 选项。
  - CZML changes:
    CZML 变更：
    - CZML is now versioned using the `<major>.<minor>` scheme. For example, any CZML 1.0 implementation will be able to load any `1.<minor>` document (with graceful degradation). Major version number increases will be reserved for breaking changes. We fully expect these major version increases to happen, as CZML is still in development, but we wanted to give developers a stable target to work with.
      CZML 现在使用 `<major>.<minor>` 方案进行版本控制。例如，任何 CZML 1.0 实现都将能够加载任何 `1.<minor>` 文档（具有平稳降级能力）。主版本号增加将保留给重大破坏性变更。由于 CZML 仍在开发中，我们完全预计这些主版本升级会发生，但我们希望为开发者提供一个稳定的开发目标。
    - A `"1.0"` version string is required to be on the document packet, which is required to be the first packet in a CZML file. Previously the `document` packet was optional; it is now mandatory. The simplest document packet is:
      必须在 document 数据包上包含 `"1.0"` 版本字符串，该数据包必须是 CZML 文件中的第一个数据包。此前 `document` 数据包是可选的；现在它是必需的。最简单的 document 数据包为：
      ```json
      {
        "id": "document",
        "version": "1.0"
      }
      ```
    - The `vertexPositions` property has been removed. There is now a `positions` property directly on objects that use it, currently `polyline`, `polygon`, and `wall`.
      移除了 `vertexPositions` 属性。现在在使用它的对象上直接具有 `positions` 属性，目前为 `polyline`、`polygon` 和 `wall`。
    - `cone`, `pyramid`, and `vector` have been removed from the core CZML schema. They are now treated as extensions maintained by Analytical Graphics and have been renamed to `agi_conicSensor`, `agi_customPatternSensor`, and `agi_vector` respectively.
      已从核心 CZML 模式中移除了 `cone`、`pyramid` 和 `vector`。它们现在被视为 Analytical Graphics 维护的扩展，并分别重命名为 `agi_conicSensor`、`agi_customPatternSensor` 和 `agi_vector`。
    - The `orientation` property has been changed to match Cesium convention. To update existing CZML documents, conjugate the quaternion values.
      修改了 `orientation` 属性以符合 Cesium 惯例。要更新现有的 CZML 文档，请对四元数值进行共轭处理。
    - `pixelOffset` now uses the top-left of the screen as the origin; previously it was the bottom-left. To update existing documents, negate the `y` value.
      `pixelOffset` 现在使用屏幕左上角作为原点；此前它是左下角。要更新现有文档，请对 `y` 值取反。
    - Removed `color`, `outlineColor`, and `outlineWidth` properties from `polyline` and `path`. There is a new `material` property that allows you to specify a variety of materials, such as `solidColor`, `polylineOutline` and `polylineGlow`.
      从 `polyline` 和 `path` 中移除了 `color`、`outlineColor` 和 `outlineWidth` 属性。新增了一个 `material` 属性，允许你指定各种材质，例如 `solidColor`、`polylineOutline` 和 `polylineGlow`。
    - See the [CZML Schema](https://github.com/CesiumGS/cesium/wiki/CZML-Content) for more details. We plan on greatly improving this document in the coming weeks.
      有关更多详细信息，请参阅 [CZML Schema](https://github.com/CesiumGS/cesium/wiki/CZML-Content)。我们计划在接下来的几周内大幅改进本文档。

- Added camera collision detection with terrain to the default mouse interaction.
  在默认鼠标交互中添加了相机与地形的碰撞检测。
- Modified the default camera tilt mouse behavior to tilt about the point clicked, taking into account terrain.
  修改了默认的相机俯仰鼠标行为，使其在考虑地形的情况下绕点击点俯仰。
- Modified the default camera mouse behavior to look about the camera's position when the sky is clicked.
  修改了默认的相机鼠标行为，使其在点击天空时绕相机位置环视。
- Cesium can now render an unlimited number of imagery layers, no matter how few texture units are supported by the hardware.
  无论硬件支持的纹理单元数量多么有限，Cesium 现在都可以渲染无限数量的影像图层。
- Added support for rendering terrain lighting with oct-encoded per-vertex normals. Added `CesiumTerrainProvider.requestVertexNormals` to request per vertex normals. Added `hasVertexNormals` property to all terrain providers to indicate whether or not vertex normals are included in the requested terrain tiles.
  添加了对使用八面体编码（oct-encoded）的逐顶点法线渲染地形光照的支持。添加了 `CesiumTerrainProvider.requestVertexNormals` 以请求逐顶点法线。为所有地形提供器添加了 `hasVertexNormals` 属性，以指示请求的地形瓦片中是否包含顶点法线。
- Added `Globe.getHeight` and `Globe.pick` for finding the terrain height at a given Cartographic coordinate and picking the terrain with a ray.
  添加了 `Globe.getHeight` 和 `Globe.pick`，用于查找给定 Cartographic 坐标处的地形高度以及通过射线拾取地形。
- Added `scene3DOnly` options to `Viewer`, `CesiumWidget`, and `Scene` constructors. This setting optimizes memory usage and performance for 3D mode at the cost of losing the ability to use 2D or Columbus View.
  向 `Viewer`、`CesiumWidget` 和 `Scene` 构造函数添加了 `scene3DOnly` 选项。该设置以失去使用 2D 或哥伦布视图为代价，优化了 3D 模式下的内存使用和性能。
- Added `forwardExtrapolationType`, `forwardExtrapolationDuration`, `backwardExtrapolationType`, and `backwardExtrapolationDuration` to `SampledProperty` and `SampledPositionProperty` which allows the user to specify how a property calculates its value when outside the range of its sample data.
  向 `SampledProperty` 和 `SampledPositionProperty` 添加了 `forwardExtrapolationType`、`forwardExtrapolationDuration`、`backwardExtrapolationType` 和 `backwardExtrapolationDuration`，允许用户指定属性在超出其样本数据范围时如何计算其值。
- Prevent primitives from flashing off and on when modifying static DataSources.
  防止在修改静态 DataSource 时图元忽隐忽现地闪烁。
- Added the following methods to `IntersectionTests`: `rayTriangle`, `lineSegmentTriangle`, `raySphere`, and `lineSegmentSphere`.
  向 `IntersectionTests` 添加了以下方法：`rayTriangle`、`lineSegmentTriangle`、`raySphere` 和 `lineSegmentSphere`。
- Matrix types now have `add` and `subtract` functions.
  矩阵类型现在具有 `add` 和 `subtract` 函数。
- `Matrix3` type now has a `fromCrossProduct` function.
  `Matrix3` 类型现在具有 `fromCrossProduct` 函数。
- Added `CesiumMath.signNotZero`, `CesiumMath.toSNorm` and `CesiumMath.fromSNorm` functions.
  添加了 `CesiumMath.signNotZero`、`CesiumMath.toSNorm` 和 `CesiumMath.fromSNorm` 函数。
- DataSource & CZML models now default to North-East-Down orientation if none is provided.
  如果未提供，DataSource 和 CZML 模型现在默认为北-东-下（NED）朝向。
- `TileMapServiceImageryProvider` now works with tilesets created by tools that better conform to the TMS specification. In particular, a profile of `global-geodetic` or `global-mercator` is now supported (in addition to the previous `geodetic` and `mercator`) and in these profiles it is assumed that the X coordinates of the bounding box correspond to the longitude direction.
  `TileMapServiceImageryProvider` 现在支持由更符合 TMS 规范的工具创建的瓦片集。特别是现在支持 `global-geodetic` 或 `global-mercator` 配置文件（除了以前的 `geodetic` 和 `mercator`），并且在这些配置文件中假定包围盒的 X 坐标对应于经度方向。
- `EntityCollection` and `CompositeEntityCollection` now include the array of modified entities as the last parameter to their `onCollectionChanged` event.
  `EntityCollection` 和 `CompositeEntityCollection` 现在将修改后的实体数组作为其 `onCollectionChanged` 事件的最后一个参数包含在内。
- `RectangleGeometry`, `RectangleOutlineGeometry` and `RectanglePrimitive` can cross the international date line.
  `RectangleGeometry`、`RectangleOutlineGeometry` 和 `RectanglePrimitive` 可以跨越国际日界线。

## Beta Releases

## b30 - 2014-07-01

- Breaking changes ([why so many?](https://community.cesium.com/t/moving-towards-cesium-1-0/1209))
  破坏性变更（[为何有这么多变更？](https://community.cesium.com/t/moving-towards-cesium-1-0/1209)）
  - CZML property references now use a `#` symbol to separate identifier from property path. `objectId.position` should now be `objectId#position`.
    CZML 属性引用现在使用 `#` 符号将标识符与属性路径分隔开。`objectId.position` 现在应为 `objectId#position`。
  - All `Cartesian2`, `Cartesian3`, `Cartesian4`, `TimeInterval`, and `JulianDate` functions that take a `result` parameter now require the parameter (except for functions starting with `from`).
    除以 `from` 开头的函数外，所有接受 `result` 参数的 `Cartesian2`、`Cartesian3`、`Cartesian4`、`TimeInterval` 和 `JulianDate` 函数现在都需要该参数。
  - Modified `Transforms.pointToWindowCoordinates` and `SceneTransforms.wgs84ToWindowCoordinates` to return window coordinates with origin at the top left corner.
    修改了 `Transforms.pointToWindowCoordinates` 和 `SceneTransforms.wgs84ToWindowCoordinates`，使其返回原点位于左上角的窗口坐标。
  - `Billboard.pixelOffset` and `Label.pixelOffset` now have their origin at the top left corner.
    `Billboard.pixelOffset` 和 `Label.pixelOffset` 的原点现在位于左上角。
  - Replaced `CameraFlightPath.createAnimation` with `Camera.flyTo` and replaced `CameraFlightPath.createAnimationRectangle` with `Camera.flyToRectangle`. Code that looked like:
    将 `CameraFlightPath.createAnimation` 替换为 `Camera.flyTo`，并将 `CameraFlightPath.createAnimationRectangle` 替换为 `Camera.flyToRectangle`。此前形如以下的代码：

            scene.animations.add(Cesium.CameraFlightPath.createAnimation(scene, {
                destination : Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 15000.0)
            }));

    should now look like:
    现在应编写为：

            scene.camera.flyTo({
                destination : Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 15000.0)
            });

  - In `Camera.flyTo` and `Camera.flyToRectangle`:
    在 `Camera.flyTo` 和 `Camera.flyToRectangle` 中：
    - `options.duration` is now in seconds, not milliseconds.
      `options.duration` 现在以秒为单位，而不是毫秒。
    - Renamed `options.endReferenceFrame` to `options.endTransform`.
      将 `options.endReferenceFrame` 重命名为 `options.endTransform`。
    - Renamed `options.onComplete` to `options.complete`.
      将 `options.onComplete` 重命名为 `options.complete`。
    - Renamed `options.onCancel` to `options.cancel`.
      将 `options.onCancel` 重命名为 `options.cancel`。
  - The following are now in seconds, not milliseconds.
    以下项现在以秒为单位，而不是毫秒：
    - `Scene.morphToColumbusView`, `Scene.morphTo2D`, and `Scene.morphTo3D` parameter `duration`.
      `Scene.morphToColumbusView`、`Scene.morphTo2D` 和 `Scene.morphTo3D` 的参数 `duration`。
    - `HomeButton` constructor parameter `options.duration`, `HomeButtonViewModel` constructor parameter `duration`, and `HomeButtonViewModel.duration`.
      `HomeButton` 构造函数参数 `options.duration`、`HomeButtonViewModel` 构造函数参数 `duration` 以及 `HomeButtonViewModel.duration`。
    - `SceneModePicker` constructor parameter `duration`, `SceneModePickerViewModel` constructor parameter `duration`, and `SceneModePickerViewModel.duration`.
      `SceneModePicker` 构造函数参数 `duration`、`SceneModePickerViewModel` 构造函数参数 `duration` 以及 `SceneModePickerViewModel.duration`。
    - `Geocoder` and `GeocoderViewModel` constructor parameter `options.flightDuration` and `GeocoderViewModel.flightDuration`.
      `Geocoder` 和 `GeocoderViewModel` 构造函数参数 `options.flightDuration` 以及 `GeocoderViewModel.flightDuration`。
    - `ScreenSpaceCameraController.bounceAnimationTime`.
      `ScreenSpaceCameraController.bounceAnimationTime`。
    - `FrameRateMonitor` constructor parameter `options.samplingWindow`, `options.quietPeriod`, and `options.warmupPeriod`.
      `FrameRateMonitor` 构造函数参数 `options.samplingWindow`、`options.quietPeriod` 和 `options.warmupPeriod`。
  - Refactored `JulianDate` to be in line with other Core types.
    重构了 `JulianDate` 以与其他 Core 类型保持一致。
    - Most functions now take result parameters.
      大多数函数现在都接受 result 参数。
    - The default constructor no longer creates a date at the current time, use `JulianDate.now()` instead.
      默认构造函数不再创建当前时间的日期，请改用 `JulianDate.now()`。
    - Removed `JulianDate.getJulianTimeFraction` and `JulianDate.compareTo`
      移除了 `JulianDate.getJulianTimeFraction` 和 `JulianDate.compareTo`。
    - `new JulianDate()` -> `JulianDate.now()`
      `new JulianDate()` -> `JulianDate.now()`
    - `date.getJulianDayNumber()` -> `date.dayNumber`
      `date.getJulianDayNumber()` -> `date.dayNumber`
    - `date.getSecondsOfDay()` -> `secondsOfDay`
      `date.getSecondsOfDay()` -> `secondsOfDay`
    - `date.getTotalDays()` -> `JulianDate.getTotalDays(date)`
      `date.getTotalDays()` -> `JulianDate.getTotalDays(date)`
    - `date.getSecondsDifference(arg1, arg2)` -> `JulianDate.getSecondsDifference(arg2, arg1)` (Note, order of arguments flipped)
      `date.getSecondsDifference(arg1, arg2)` -> `JulianDate.getSecondsDifference(arg2, arg1)`（注意：参数顺序调换）
    - `date.getDaysDifference(arg1, arg2)` -> `JulianDate.getDaysDifference(arg2, arg1)` (Note, order of arguments flipped)
      `date.getDaysDifference(arg1, arg2)` -> `JulianDate.getDaysDifference(arg2, arg1)`（注意：参数顺序调换）
    - `date.getTaiMinusUtc()` -> `JulianDate.getTaiMinusUtc(date)`
      `date.getTaiMinusUtc()` -> `JulianDate.getTaiMinusUtc(date)`
    - `date.addSeconds(seconds)` -> `JulianDate.addSeconds(date, seconds)`
      `date.addSeconds(seconds)` -> `JulianDate.addSeconds(date, seconds)`
    - `date.addMinutes(minutes)` -> `JulianDate.addMinutes(date, minutes)`
      `date.addMinutes(minutes)` -> `JulianDate.addMinutes(date, minutes)`
    - `date.addHours(hours)` -> `JulianDate.addHours(date, hours)`
      `date.addHours(hours)` -> `JulianDate.addHours(date, hours)`
    - `date.addDays(days)` -> `JulianDate.addDays(date, days)`
      `date.addDays(days)` -> `JulianDate.addDays(date, days)`
    - `date.lessThan(right)` -> `JulianDate.lessThan(left, right)`
      `date.lessThan(right)` -> `JulianDate.lessThan(left, right)`
    - `date.lessThanOrEquals(right)` -> `JulianDate.lessThanOrEquals(left, right)`
      `date.lessThanOrEquals(right)` -> `JulianDate.lessThanOrEquals(left, right)`
    - `date.greaterThan(right)` -> `JulianDate.greaterThan(left, right)`
      `date.greaterThan(right)` -> `JulianDate.greaterThan(left, right)`
    - `date.greaterThanOrEquals(right)` -> `JulianDate.greaterThanOrEquals(left, right)`
      `date.greaterThanOrEquals(right)` -> `JulianDate.greaterThanOrEquals(left, right)`
  - Refactored `TimeInterval` to be in line with other Core types.
    重构了 `TimeInterval` 以与其他 Core 类型保持一致。
    - The constructor no longer requires parameters and now takes a single options parameter. Code that looked like:
      构造函数不再需要多个参数，现在接受单个 options 参数。此前形如以下的代码：

            new TimeInterval(startTime, stopTime, true, true, data);

      should now look like:
      现在应编写为：

            new TimeInterval({
                start : startTime,
                stop : stopTime,
                isStartIncluded : true,
                isStopIncluded : true,
                data : data
            });

    - `TimeInterval.fromIso8601` now takes a single options parameter. Code that looked like:
      `TimeInterval.fromIso8601` 现在接受单个 options 参数。此前形如以下的代码：

            TimeInterval.fromIso8601(intervalString, true, true, data);

      should now look like:
      现在应编写为：

            TimeInterval.fromIso8601({
                iso8601 : intervalString,
                isStartIncluded : true,
                isStopIncluded : true,
                data : data
            });

    - `interval.intersect(otherInterval)` -> `TimeInterval.intersect(interval, otherInterval)`
      `interval.intersect(otherInterval)` -> `TimeInterval.intersect(interval, otherInterval)`
    - `interval.contains(date)` -> `TimeInterval.contains(interval, date)`
      `interval.contains(date)` -> `TimeInterval.contains(interval, date)`

  - Removed `TimeIntervalCollection.intersectInterval`.
    移除了 `TimeIntervalCollection.intersectInterval`。
  - `TimeIntervalCollection.findInterval` now takes a single options parameter instead of individual parameters. Code that looked like:
    `TimeIntervalCollection.findInterval` 现在接受单个 options 参数，而不是各个独立参数。此前形如以下的代码：

            intervalCollection.findInterval(startTime, stopTime, false, true);

    should now look like:
    现在应编写为：

            intervalCollection.findInterval({
                start : startTime,
                stop : stopTime,
                isStartIncluded : false,
                isStopIncluded : true
            });

  - `TimeIntervalCollection.empty` was renamed to `TimeIntervalCollection.isEmpty`
    `TimeIntervalCollection.empty` 重命名为 `TimeIntervalCollection.isEmpty`。
  - Removed `Scene.animations` and `AnimationCollection` from the public Cesium API.
    从 Cesium 公共 API 中移除了 `Scene.animations` 和 `AnimationCollection`。
  - Replaced `color`, `outlineColor`, and `outlineWidth` in `DynamicPath` with a `material` property.
    将 `DynamicPath` 中的 `color`、`outlineColor` 和 `outlineWidth` 替换为 `material` 属性。
  - `ModelAnimationCollection.add` and `ModelAnimationCollection.addAll` renamed `options.startOffset` to `options.delay`. Also renamed `ModelAnimation.startOffset` to `ModelAnimation.delay`.
    `ModelAnimationCollection.add` 和 `ModelAnimationCollection.addAll` 将 `options.startOffset` 重命名为 `options.delay`。还将 `ModelAnimation.startOffset` 重命名为 `ModelAnimation.delay`。
  - Replaced `Scene.scene2D.projection` property with read-only `Scene.mapProjection`. Set this with the `mapProjection` option for the `Viewer`, `CesiumWidget`, or `Scene` constructors.
    将 `Scene.scene2D.projection` 属性替换为只读的 `Scene.mapProjection`。可以通过 `Viewer`、`CesiumWidget` 或 `Scene` 构造函数的 `mapProjection` 选项进行设置。
  - Moved Fresnel, Reflection, and Refraction materials to the [Materials Pack Plugin](https://github.com/CesiumGS/cesium-materials-pack).
    将菲涅耳（Fresnel）、反射（Reflection）和折射（Refraction）材质移至[材质包插件（Materials Pack Plugin）](https://github.com/CesiumGS/cesium-materials-pack)。
  - Renamed `Simon1994PlanetaryPositions` functions `ComputeSunPositionInEarthInertialFrame` and `ComputeMoonPositionInEarthInertialFrame` to `computeSunPositionInEarthInertialFrame` and `computeMoonPositionInEarthInertialFrame`, respectively.
    将 `Simon1994PlanetaryPositions` 函数 `ComputeSunPositionInEarthInertialFrame` 和 `ComputeMoonPositionInEarthInertialFrame` 分别重命名为 `computeSunPositionInEarthInertialFrame` 和 `computeMoonPositionInEarthInertialFrame`。
  - `Scene` constructor function now takes an `options` parameter instead of individual parameters.
    `Scene` 构造函数现在接受 `options` 参数，而不是各个独立参数。
  - `CesiumWidget.showErrorPanel` now takes a `message` parameter in between the previous `title` and `error` parameters.
    `CesiumWidget.showErrorPanel` 现在在先前的 `title` 和 `error` 参数之间接受一个 `message` 参数。
  - Removed `Camera.createCorrectPositionAnimation`.
    移除了 `Camera.createCorrectPositionAnimation`。
  - Moved `LeapSecond.leapSeconds` to `JulianDate.leapSeconds`.
    将 `LeapSecond.leapSeconds` 移至 `JulianDate.leapSeconds`。
  - `Event.removeEventListener` no longer throws `DeveloperError` if the `listener` does not exist; it now returns `false`.
    若 `listener` 不存在，`Event.removeEventListener` 不再抛出 `DeveloperError`；它现在返回 `false`。
  - Enumeration values of `SceneMode` have better correspondence with mode names to help with debugging.
    `SceneMode` 的枚举值与模式名称有了更好的对应关系，以帮助调试。
  - The build process now requires [Node.js](http://nodejs.org/) to be installed on the system.
    构建过程现在要求系统上安装有 [Node.js](http://nodejs.org/)。

- Cesium now supports Internet Explorer 11.0.9 on desktops. For the best results, use the new [IE Developer Channel](http://devchannel.modern.ie/) for development.
  Cesium 现在支持桌面版 Internet Explorer 11.0.9。为了获得最佳效果，请使用新的 [IE Developer Channel](http://devchannel.modern.ie/) 进行开发。
- `ReferenceProperty` can now handle sub-properties, for example, `myObject#billboard.scale`.
  `ReferenceProperty` 现在可以处理子属性，例如 `myObject#billboard.scale`。
- `DynamicObject.id` can now include period characters.
  `DynamicObject.id` 现在可以包含句点字符（`.`）。
- Added `PolylineGlowMaterialProperty` which enables data sources to use the PolylineGlow material.
  添加了 `PolylineGlowMaterialProperty`，允许数据源使用 PolylineGlow（折线发光）材质。
- Fixed support for embedded resources in glTF models.
  修复了对 glTF 模型中嵌入资源的支持。
- Added `HermitePolynomialApproximation.interpolate` for performing interpolation when derivative information is available.
  添加了 `HermitePolynomialApproximation.interpolate`，用于在导数信息可用时执行插值。
- `SampledProperty` and `SampledPositionProperty` can now store derivative information for each sample value. This allows for more accurate interpolation when using `HermitePolynomialApproximation`.
  `SampledProperty` 和 `SampledPositionProperty` 现在可以为每个采样值存储导数信息。这允许在使用 `HermitePolynomialApproximation` 时进行更准确的插值。
- Added `FrameRateMonitor` to monitor the frame rate achieved by a `Scene` and to raise a `lowFrameRate` event when it falls below a configurable threshold.
  添加了 `FrameRateMonitor` 以监控 `Scene` 达到的帧率，并在帧率低于可配置阈值时触发 `lowFrameRate` 事件。
- Added `PerformanceWatchdog` widget and `viewerPerformanceWatchdogMixin`.
  添加了 `PerformanceWatchdog` 部件和 `viewerPerformanceWatchdogMixin`。
- `Viewer` and `CesiumWidget` now provide more user-friendly error messages when an initialization or rendering error occurs.
  当发生初始化或渲染错误时，`Viewer` 和 `CesiumWidget` 现在提供更加用户友好的错误消息。
- `Viewer` and `CesiumWidget` now take a new optional parameter, `creditContainer`.
  `Viewer` 和 `CesiumWidget` 现在接受新的可选参数 `creditContainer`。
- `Viewer` can now optionally be constructed with a `DataSourceCollection`. Previously, it always created one itself internally.
  `Viewer` 现在可以选择使用 `DataSourceCollection` 进行构造。此前它总是在内部自行创建一个。
- Fixed a problem that could rarely lead to the camera's `tilt` property being `NaN`.
  修复了一个在极少数情况下可能导致相机的 `tilt` 属性为 `NaN` 的问题。
- `GeoJsonDataSource` no longer uses the `name` or `title` property of the feature as the dynamic object's name if the value of the property is null.
  如果属性值为 null，`GeoJsonDataSource` 不再使用要素的 `name` 或 `title` 属性作为动态对象的名称。
- Added `TimeIntervalCollection.isStartIncluded` and `TimeIntervalCollection.isStopIncluded`.
  添加了 `TimeIntervalCollection.isStartIncluded` 和 `TimeIntervalCollection.isStopIncluded`。
- Added `Cesium.VERSION` to the combined `Cesium.js` file.
  向合并后的 `Cesium.js` 文件添加了 `Cesium.VERSION`。
- Made general improvements to the [reference documentation](http://cesiumjs.org/refdoc.html).
  对[参考文档](http://cesiumjs.org/refdoc.html)进行了常规改进。
- Updated third-party [Tween.js](https://github.com/sole/tween.js/) from r7 to r13.
  将第三方 [Tween.js](https://github.com/sole/tween.js/) 从 r7 更新至 r13。
- Updated third-party JSDoc 3.3.0-alpha5 to 3.3.0-alpha9.
  将第三方 JSDoc 3.3.0-alpha5 更新至 3.3.0-alpha9。
- The development web server has been rewritten in Node.js, and is now included as part of each release.
  开发 Web 服务器已用 Node.js 重写，现作为每个版本的一部分包含在内。

## b29 - 2014-06-02

- Breaking changes ([why so many?](https://community.cesium.com/t/moving-towards-cesium-1-0/1209))
  破坏性变更（[为何有这么多变更？](https://community.cesium.com/t/moving-towards-cesium-1-0/1209)）
  - Replaced `Scene.createTextureAtlas` with `new TextureAtlas`.
    将 `Scene.createTextureAtlas` 替换为 `new TextureAtlas`。
  - Removed `CameraFlightPath.createAnimationCartographic`. Code that looked like:
    移除了 `CameraFlightPath.createAnimationCartographic`。此前形如以下的代码：

           var flight = CameraFlightPath.createAnimationCartographic(scene, {
               destination : cartographic
           });
           scene.animations.add(flight);

    should now look like:
    现在应编写为：

           var flight = CameraFlightPath.createAnimation(scene, {
               destination : ellipsoid.cartographicToCartesian(cartographic)
           });
           scene.animations.add(flight);

  - Removed `CesiumWidget.onRenderLoopError` and `Viewer.renderLoopError`. They have been replaced by `Scene.renderError`.
    移除了 `CesiumWidget.onRenderLoopError` 和 `Viewer.renderLoopError`。它们已被 `Scene.renderError` 替换。
  - Renamed `CompositePrimitive` to `PrimitiveCollection` and added an `options` parameter to the constructor function.
    将 `CompositePrimitive` 重命名为 `PrimitiveCollection`，并向构造函数添加了 `options` 参数。
  - Removed `Shapes.compute2DCircle`, `Shapes.computeCircleBoundary` and `Shapes.computeEllipseBoundary`. Instead, use `CircleOutlineGeometry` and `EllipseOutlineGeometry`. See the [tutorial](http://cesiumjs.org/2013/11/04/Geometry-and-Appearances/).
    移除了 `Shapes.compute2DCircle`、`Shapes.computeCircleBoundary` 和 `Shapes.computeEllipseBoundary`。请改用 `CircleOutlineGeometry` 和 `EllipseOutlineGeometry`。参见[教程](http://cesiumjs.org/2013/11/04/Geometry-and-Appearances/)。
  - Removed `PolylinePipeline`, `PolygonPipeline`, `Tipsify`, `FrustumCommands`, and all `Renderer` types (except noted below) from the public Cesium API. These are still available but are not part of the official API and may change in future versions. `Renderer` types in particular are likely to change.
    从 Cesium 公共 API 中移除了 `PolylinePipeline`、`PolygonPipeline`、`Tipsify`、`FrustumCommands` 以及所有 `Renderer` 类型（下述除外）。这些内容仍然可用，但不属于官方公开 API，并可能在未来版本中发生变更。尤其是 `Renderer` 类型很可能会发生变化。
  - For AMD users only:
    仅适用于 AMD 用户：
    - Moved `PixelFormat` from `Renderer` to `Core`.
      将 `PixelFormat` 从 `Renderer` 移至 `Core`。
    - Moved the following from `Renderer` to `Scene`: `TextureAtlas`, `TextureAtlasBuilder`, `BlendEquation`, `BlendFunction`, `BlendingState`, `CullFace`, `DepthFunction`, `StencilFunction`, and `StencilOperation`.
      将以下内容从 `Renderer` 移至 `Scene`：`TextureAtlas`、`TextureAtlasBuilder`、`BlendEquation`、`BlendFunction`、`BlendingState`、`CullFace`、`DepthFunction`、`StencilFunction` 和 `StencilOperation`。
    - Moved the following from `Scene` to `Core`: `TerrainProvider`, `ArcGisImageServerTerrainProvider`, `CesiumTerrainProvider`, `EllipsoidTerrainProvider`, `VRTheWorldTerrainProvider`, `TerrainData`, `HeightmapTerrainData`, `QuantizedMeshTerrainData`, `TerrainMesh`, `TilingScheme`, `GeographicTilingScheme`, `WebMercatorTilingScheme`, `sampleTerrain`, `TileProviderError`, `Credit`.
      将以下内容从 `Scene` 移至 `Core`：`TerrainProvider`、`ArcGisImageServerTerrainProvider`、`CesiumTerrainProvider`、`EllipsoidTerrainProvider`、`VRTheWorldTerrainProvider`、`TerrainData`、`HeightmapTerrainData`、`QuantizedMeshTerrainData`、`TerrainMesh`、`TilingScheme`、`GeographicTilingScheme`、`WebMercatorTilingScheme`、`sampleTerrain`、`TileProviderError`、`Credit`。
  - Removed `TilingScheme.createRectangleOfLevelZeroTiles`, `GeographicTilingScheme.createLevelZeroTiles` and `WebMercatorTilingScheme.createLevelZeroTiles`.
    移除了 `TilingScheme.createRectangleOfLevelZeroTiles`、`GeographicTilingScheme.createLevelZeroTiles` 和 `WebMercatorTilingScheme.createLevelZeroTiles`。
  - Removed `CameraColumbusViewMode`.
    移除了 `CameraColumbusViewMode`。
  - Removed `Enumeration`.
    移除了 `Enumeration`。

- Added new functions to `Cartesian3`: `fromDegrees`, `fromRadians`, `fromDegreesArray`, `fromRadiansArray`, `fromDegreesArray3D` and `fromRadiansArray3D`. Added `fromRadians` to `Cartographic`.
  向 `Cartesian3` 添加了新函数：`fromDegrees`、`fromRadians`、`fromDegreesArray`、`fromRadiansArray`、`fromDegreesArray3D` 和 `fromRadiansArray3D`。向 `Cartographic` 添加了 `fromRadians`。
- Fixed dark lighting in 3D and Columbus View when viewing a primitive edge on. ([#592](https://github.com/CesiumGS/cesium/issues/592))
  修复了在 3D 和哥伦布视图下从侧边缘观察图元时光照过暗的问题。（[#592](https://github.com/CesiumGS/cesium/issues/592)）
- Improved Internet Explorer 11.0.8 support including workarounds for rendering labels, billboards, and the sun.
  改进了对 Internet Explorer 11.0.8 的支持，包括渲染标签、广告牌和太阳的变通方案。
- Improved terrain and imagery rendering performance when very close to the surface.
  改进了非常接近表面时的地形和影像渲染性能。
- Added `preRender` and `postRender` events to `Scene`.
  向 `Scene` 添加了 `preRender` 和 `postRender` 事件。
- Added `Viewer.targetFrameRate` and `CesiumWidget.targetFrameRate` to allow for throttling of the requestAnimationFrame rate.
  添加了 `Viewer.targetFrameRate` 和 `CesiumWidget.targetFrameRate`，以允许限制 requestAnimationFrame 的帧率。
- Added `Viewer.resolutionScale` and `CesiumWidget.resolutionScale` to allow the scene to be rendered at a resolution other than the canvas size.
  添加了 `Viewer.resolutionScale` 和 `CesiumWidget.resolutionScale`，以允许以不同于画布尺寸的分辨率渲染场景。
- `Camera.transform` now works consistently across scene modes.
  `Camera.transform` 现在在各个场景模式之间表现一致。
- Fixed a bug that prevented `sampleTerrain` from working with STK World Terrain in Firefox.
  修复了阻止 `sampleTerrain` 在 Firefox 中与 STK World Terrain 一起使用的 bug。
- `sampleTerrain` no longer fails when used with a `TerrainProvider` that is not yet ready.
  当与尚未就绪的 `TerrainProvider` 一起使用时，`sampleTerrain` 不再失败。
- Fixed problems that could occur when using `ArcGisMapServerImageryProvider` to access a tiled MapServer of non-global extent.
  修复了使用 `ArcGisMapServerImageryProvider` 访问非全球范围的切片 MapServer 时可能发生的问题。
- Added `interleave` option to `Primitive` constructor.
  向 `Primitive` 构造函数添加了 `interleave` 选项。
- Upgraded JSDoc from 3.0 to 3.3.0-alpha5. The Cesium reference documentation now has a slightly different look and feel.
  将 JSDoc 从 3.0 升级至 3.3.0-alpha5。Cesium 参考文档现在的外观和风格略有不同。
- Upgraded Dojo from 1.9.1 to 1.9.3. NOTE: Dojo is only used in Sandcastle and not required by Cesium.
  将 Dojo 从 1.9.1 升级至 1.9.3。注意：Dojo 仅在 Sandcastle 中使用，Cesium 本身不需要。

## b28 - 2014-05-01

- Breaking changes ([why so many?](https://community.cesium.com/t/breaking-changes/1132)):
  破坏性变更（[为何有这么多变更？](https://community.cesium.com/t/breaking-changes/1132)）：
  - Renamed and moved `Scene.primitives.centralBody` moved to `Scene.globe`.
    重命名并将 `Scene.primitives.centralBody` 移至 `Scene.globe`。
  - Removed `CesiumWidget.centralBody` and `Viewer.centralBody`. Use `CesiumWidget.scene.globe` and `Viewer.scene.globe`.
    移除了 `CesiumWidget.centralBody` 和 `Viewer.centralBody`。请改用 `CesiumWidget.scene.globe` 和 `Viewer.scene.globe`。
  - Renamed `CentralBody` to `Globe`.
    将 `CentralBody` 重命名为 `Globe`。
  - Replaced `Model.computeWorldBoundingSphere` with `Model.boundingSphere`.
    将 `Model.computeWorldBoundingSphere` 替换为 `Model.boundingSphere`。
  - Refactored visualizers, removing `setDynamicObjectCollection`, `getDynamicObjectCollection`, `getScene`, and `removeAllPrimitives` which are all superfluous after the introduction of `DataSourceDisplay`. The affected classes are:
    重构了可视化器（visualizers），移除了在引入 `DataSourceDisplay` 后变得多余的 `setDynamicObjectCollection`、`getDynamicObjectCollection`、`getScene` 和 `removeAllPrimitives`。受影响的类包括：
    - `DynamicBillboardVisualizer`
      `DynamicBillboardVisualizer`
    - `DynamicConeVisualizerUsingCustomSensor`
      `DynamicConeVisualizerUsingCustomSensor`
    - `DynamicLabelVisualizer`
      `DynamicLabelVisualizer`
    - `DynamicModelVisualizer`
      `DynamicModelVisualizer`
    - `DynamicPathVisualizer`
      `DynamicPathVisualizer`
    - `DynamicPointVisualizer`
      `DynamicPointVisualizer`
    - `DynamicPyramidVisualizer`
      `DynamicPyramidVisualizer`
    - `DynamicVectorVisualizer`
      `DynamicVectorVisualizer`
    - `GeometryVisualizer`
      `GeometryVisualizer`
  - Renamed Extent to Rectangle
    将 Extent 重命名为 Rectangle：
    - `Extent` -> `Rectangle`
      `Extent` -> `Rectangle`
    - `ExtentGeometry` -> `RectangleGeomtry`
      `ExtentGeometry` -> `RectangleGeomtry`
    - `ExtentGeometryOutline` -> `RectangleGeometryOutline`
      `ExtentGeometryOutline` -> `RectangleGeometryOutline`
    - `ExtentPrimitive` -> `RectanglePrimitive`
      `ExtentPrimitive` -> `RectanglePrimitive`
    - `BoundingRectangle.fromExtent` -> `BoundingRectangle.fromRectangle`
      `BoundingRectangle.fromExtent` -> `BoundingRectangle.fromRectangle`
    - `BoundingSphere.fromExtent2D` -> `BoundingSphere.fromRectangle2D`
      `BoundingSphere.fromExtent2D` -> `BoundingSphere.fromRectangle2D`
    - `BoundingSphere.fromExtentWithHeights2D` -> `BoundingSphere.fromRectangleWithHeights2D`
      `BoundingSphere.fromExtentWithHeights2D` -> `BoundingSphere.fromRectangleWithHeights2D`
    - `BoundingSphere.fromExtent3D` -> `BoundingSphere.fromRectangle3D`
      `BoundingSphere.fromExtent3D` -> `BoundingSphere.fromRectangle3D`
    - `EllipsoidalOccluder.computeHorizonCullingPointFromExtent` -> `EllipsoidalOccluder.computeHorizonCullingPointFromRectangle`
      `EllipsoidalOccluder.computeHorizonCullingPointFromExtent` -> `EllipsoidalOccluder.computeHorizonCullingPointFromRectangle`
    - `Occluder.computeOccludeePointFromExtent` -> `Occluder.computeOccludeePointFromRectangle`
      `Occluder.computeOccludeePointFromExtent` -> `Occluder.computeOccludeePointFromRectangle`
    - `Camera.getExtentCameraCoordinates` -> `Camera.getRectangleCameraCoordinates`
      `Camera.getExtentCameraCoordinates` -> `Camera.getRectangleCameraCoordinates`
    - `Camera.viewExtent` -> `Camera.viewRectangle`
      `Camera.viewExtent` -> `Camera.viewRectangle`
    - `CameraFlightPath.createAnimationExtent` -> `CameraFlightPath.createAnimationRectangle`
      `CameraFlightPath.createAnimationExtent` -> `CameraFlightPath.createAnimationRectangle`
    - `TilingScheme.extentToNativeRectangle` -> `TilingScheme.rectangleToNativeRectangle`
      `TilingScheme.extentToNativeRectangle` -> `TilingScheme.rectangleToNativeRectangle`
    - `TilingScheme.tileXYToNativeExtent` -> `TilingScheme.tileXYToNativeRectangle`
      `TilingScheme.tileXYToNativeExtent` -> `TilingScheme.tileXYToNativeRectangle`
    - `TilingScheme.tileXYToExtent` -> `TilingScheme.tileXYToRectangle`
      `TilingScheme.tileXYToExtent` -> `TilingScheme.tileXYToRectangle`
  - Converted `DataSource` get methods into properties.
    将 `DataSource` 的 getter 方法转换为属性：
    - `getName` -> `name`
      `getName` -> `name`
    - `getClock` -> `clock`
      `getClock` -> `clock`
    - `getChangedEvent` -> `changedEvent`
      `getChangedEvent` -> `changedEvent`
    - `getDynamicObjectCollection` -> `dynamicObjects`
      `getDynamicObjectCollection` -> `dynamicObjects`
    - `getErrorEvent` -> `errorEvent`
      `getErrorEvent` -> `errorEvent`
  - `BaseLayerPicker` has been extended to support terrain selection ([#1607](https://github.com/CesiumGS/cesium/pull/1607)).
    `BaseLayerPicker` 已扩展以支持地形选择（[#1607](https://github.com/CesiumGS/cesium/pull/1607)）。
    - The `BaseLayerPicker` constructor function now takes the container element and an options object instead of a CentralBody and ImageryLayerCollection.
      `BaseLayerPicker` 构造函数现在接受容器元素和 options 对象，而不是 CentralBody 和 ImageryLayerCollection。
    - The `BaseLayerPickerViewModel` constructor function now takes an options object instead of a `CentralBody` and `ImageryLayerCollection`.
      `BaseLayerPickerViewModel` 构造函数现在接受 options 对象，而不是 `CentralBody` 和 `ImageryLayerCollection`。
    - `ImageryProviderViewModel` -> `ProviderViewModel`
      `ImageryProviderViewModel` -> `ProviderViewModel`
    - `BaseLayerPickerViewModel.selectedName` -> `BaseLayerPickerViewModel.buttonTooltip`
      `BaseLayerPickerViewModel.selectedName` -> `BaseLayerPickerViewModel.buttonTooltip`
    - `BaseLayerPickerViewModel.selectedIconUrl` -> `BaseLayerPickerViewModel.buttonImageUrl`
      `BaseLayerPickerViewModel.selectedIconUrl` -> `BaseLayerPickerViewModel.buttonImageUrl`
    - `BaseLayerPickerViewModel.selectedItem` -> `BaseLayerPickerViewModel.selectedImagery`
      `BaseLayerPickerViewModel.selectedItem` -> `BaseLayerPickerViewModel.selectedImagery`
    - `BaseLayerPickerViewModel.imageryLayers`has been removed and replaced with `BaseLayerPickerViewModel.centralBody`
      `BaseLayerPickerViewModel.imageryLayers` 已被移除并替换为 `BaseLayerPickerViewModel.centralBody`。
  - Renamed `TimeIntervalCollection.clear` to `TimeIntervalCollection.removeAll`
    将 `TimeIntervalCollection.clear` 重命名为 `TimeIntervalCollection.removeAll`。
  - `Context` is now private.
    `Context` 现在为私有。
    - Removed `Scene.context`. Instead, use `Scene.drawingBufferWidth`, `Scene.drawingBufferHeight`, `Scene.maximumAliasedLineWidth`, and `Scene.createTextureAtlas`.
      移除了 `Scene.context`。请改用 `Scene.drawingBufferWidth`、`Scene.drawingBufferHeight`、`Scene.maximumAliasedLineWidth` 和 `Scene.createTextureAtlas`。
    - `Billboard.computeScreenSpacePosition`, `Label.computeScreenSpacePosition`, `SceneTransforms.clipToWindowCoordinates` and `SceneTransforms.clipToDrawingBufferCoordinates` take a `Scene` parameter instead of a `Context`.
      `Billboard.computeScreenSpacePosition`、`Label.computeScreenSpacePosition`、`SceneTransforms.clipToWindowCoordinates` 和 `SceneTransforms.clipToDrawingBufferCoordinates` 接受 `Scene` 参数而不是 `Context`。
    - `Camera` constructor takes `Scene` as parameter instead of `Context`
      `Camera` 构造函数接受 `Scene` 作为参数而不是 `Context`。
  - Types implementing the `ImageryProvider` interface arenow require a `hasAlphaChannel` property.
    实现 `ImageryProvider` 接口的类型现在需要具备 `hasAlphaChannel` 属性。
  - Removed `checkForChromeFrame` since Chrome Frame is no longer supported by Google. See [Google's official announcement](http://blog.chromium.org/2013/06/retiring-chrome-frame.html).
    移除了 `checkForChromeFrame`，因为 Google 已不再支持 Chrome Frame。参见 [Google 官方公告](http://blog.chromium.org/2013/06/retiring-chrome-frame.html)。
  - Types implementing `DataSource` no longer need to implement `getIsTimeVarying`.
    实现 `DataSource` 的类型不再需要实现 `getIsTimeVarying`。
- Added a `NavigationHelpButton` widget that, when clicked, displays information about how to navigate around the globe with the mouse. The new button is enabled by default in the `Viewer` widget.
  添加了 `NavigationHelpButton` 部件，点击该部件会显示有关如何使用鼠标在地球周围导航的信息。新按钮在 `Viewer` 部件中默认启用。
- Added `Model.minimumPixelSize` property so models remain visible when the viewer zooms out.
  添加了 `Model.minimumPixelSize` 属性，以便在视图缩小（zoom out）时模型仍保持可见。
- Added `DynamicRectangle` to support DataSource provided `RectangleGeometry`.
  添加了 `DynamicRectangle` 以支持 DataSource 提供的 `RectangleGeometry`。
- Added `DynamicWall` to support DataSource provided `WallGeometry`.
  添加了 `DynamicWall` 以支持 DataSource 提供的 `WallGeometry`。
- Improved texture upload performance and reduced memory usage when using `BingMapsImageryProvider` and other imagery providers that return false from `hasAlphaChannel`.
  提升了在使用 `BingMapsImageryProvider` 以及从 `hasAlphaChannel` 返回 false 的其他影像提供器时的纹理上传性能并减少了内存占用。
- Added the ability to offset the grid in the `GridMaterial`.
  添加了在 `GridMaterial` 中偏移网格的功能。
- `GeometryVisualizer` now creates geometry asynchronously to prevent locking up the browser.
  `GeometryVisualizer` 现在异步创建几何体以防止锁定浏览器。
- Add `Clock.canAnimate` to prevent time from advancing, even while the clock is animating.
  添加了 `Clock.canAnimate`，即使在时钟处于动画状态时也可以防止时间向前推进。
- `Viewer` now prevents time from advancing if asynchronous geometry is being processed in order to avoid showing an incomplete picture. This can be disabled via the `Viewer.allowDataSourcesToSuspendAnimation` settings.
  `Viewer` 现在如果正在处理异步几何体则会阻止时间推进，以避免显示不完整的画面。可以通过 `Viewer.allowDataSourcesToSuspendAnimation` 设置禁用此功能。
- Added ability to modify glTF material parameters using `Model.getMaterial`, `ModelMaterial`, and `ModelMesh.material`.
  添加了使用 `Model.getMaterial`、`ModelMaterial` 和 `ModelMesh.material` 修改 glTF 材质参数的功能。
- Added `asynchronous` and `ready` properties to `Model`.
  向 `Model` 添加了 `asynchronous` 和 `ready` 属性。
- Added `Cartesian4.fromColor` and `Color.fromCartesian4`.
  添加了 `Cartesian4.fromColor` 和 `Color.fromCartesian4`。
- Added `getScale` and `getMaximumScale` to `Matrix2`, `Matrix3`, and `Matrix4`.
  向 `Matrix2`、`Matrix3` 和 `Matrix4` 添加了 `getScale` 和 `getMaximumScale`。
- Upgraded Knockout from version 3.0.0 to 3.1.0.
  将 Knockout 从版本 3.0.0 升级至 3.1.0。
- Upgraded TopoJSON from version 1.1.4 to 1.6.8.
  将 TopoJSON 从版本 1.1.4 升级至 1.6.8。

## b27 - 2014-04-01

- Breaking changes:
  重大变更：
  - All `CameraController` functions have been moved up to the `Camera`. Removed `CameraController`. For example, code that looked like:
    所有 `CameraController` 函数已上移至 `Camera`。移除了 `CameraController`。例如，如下代码：

           scene.camera.controller.viewExtent(extent);

    should now look like:
    现在应写为：

           scene.camera.viewExtent(extent);

  - Finished replacing getter/setter functions with properties:
    完成使用属性替换 getter/setter 函数：
    - `ImageryLayer`
      - `getImageryProvider` -> `imageryProvider`
      - `getExtent` -> `extent`
    - `Billboard`, `Label`
      - `getShow`, `setShow` -> `show`
      - `getPosition`, `setPosition` -> `position`
      - `getPixelOffset`, `setPixelOffset` -> `pixelOffset`
      - `getTranslucencyByDistance`, `setTranslucencyByDistance` -> `translucencyByDistance`
      - `getPixelOffsetScaleByDistance`, `setPixelOffsetScaleByDistance` -> `pixelOffsetScaleByDistance`
      - `getEyeOffset`, `setEyeOffset` -> `eyeOffset`
      - `getHorizontalOrigin`, `setHorizontalOrigin` -> `horizontalOrigin`
      - `getVerticalOrigin`, `setVerticalOrigin` -> `verticalOrigin`
      - `getScale`, `setScale` -> `scale`
      - `getId` -> `id`
    - `Billboard`
      - `getScaleByDistance`, `setScaleByDistance` -> `scaleByDistance`
      - `getImageIndex`, `setImageIndex` -> `imageIndex`
      - `getColor`, `setColor` -> `color`
      - `getRotation`, `setRotation` -> `rotation`
      - `getAlignedAxis`, `setAlignedAxis` -> `alignedAxis`
      - `getWidth`, `setWidth` -> `width`
      - `getHeight` `setHeight` -> `height`
    - `Label`
      - `getText`, `setText` -> `text`
      - `getFont`, `setFont` -> `font`
      - `getFillColor`, `setFillColor` -> `fillColor`
      - `getOutlineColor`, `setOutlineColor` -> `outlineColor`
      - `getOutlineWidth`, `setOutlineWidth` -> `outlineWidth`
      - `getStyle`, `setStyle` -> `style`
    - `Polygon`
      - `getPositions`, `setPositions` -> `positions`
    - `Polyline`
      - `getShow`, `setShow` -> `show`
      - `getPositions`, `setPositions` -> `positions`
      - `getMaterial`, `setMeterial` -> `material`
      - `getWidth`, `setWidth` -> `width`
      - `getLoop`, `setLoop` -> `loop`
      - `getId` -> `id`
    - `Occluder`
      - `getPosition` -> `position`
      - `getRadius` -> `radius`
      - `setCameraPosition` -> `cameraPosition`
    - `LeapSecond`
      - `getLeapSeconds`, `setLeapSeconds` -> `leapSeconds`
    - `Fullscreen`
      - `getFullscreenElement` -> `element`
      - `getFullscreenChangeEventName` -> `changeEventName`
      - `getFullscreenErrorEventName` -> `errorEventName`
      - `isFullscreenEnabled` -> `enabled`
      - `isFullscreen` -> `fullscreen`
    - `Event`
      - `getNumberOfListeners` -> `numberOfListeners`
    - `EllipsoidGeodesic`
      - `getSurfaceDistance` -> `surfaceDistance`
      - `getStart` -> `start`
      - `getEnd` -> `end`
      - `getStartHeading` -> `startHeading`
      - `getEndHeading` -> `endHeading`
    - `AnimationCollection`
      - `getAll` -> `all`
    - `CentralBodySurface`
      - `getTerrainProvider`, `setTerrainProvider` -> `terrainProvider`
    - `Credit`
      - `getText` -> `text`
      - `getImageUrl` -> `imageUrl`
      - `getLink` -> `link`
    - `TerrainData`, `HightmapTerrainData`, `QuanitzedMeshTerrainData`
      - `getWaterMask` -> `waterMask`
    - `Tile`
      - `getChildren` -> `children`
    - `Buffer`
      - `getSizeInBytes` -> `sizeInBytes`
      - `getUsage` -> `usage`
      - `getVertexArrayDestroyable`, `setVertexArrayDestroyable` -> `vertexArrayDestroyable`
    - `CubeMap`
      - `getPositiveX` -> `positiveX`
      - `getNegativeX` -> `negativeX`
      - `getPositiveY` -> `positiveY`
      - `getNegativeY` -> `negativeY`
      - `getPositiveZ` -> `positiveZ`
      - `getNegativeZ` -> `negativeZ`
    - `CubeMap`, `Texture`
      - `getSampler`, `setSampler` -> `sampler`
      - `getPixelFormat` -> `pixelFormat`
      - `getPixelDatatype` -> `pixelDatatype`
      - `getPreMultiplyAlpha` -> `preMultiplyAlpha`
      - `getFlipY` -> `flipY`
      - `getWidth` -> `width`
      - `getHeight` -> `height`
    - `CubeMapFace`
      - `getPixelFormat` -> `pixelFormat`
      - `getPixelDatatype` -> `pixelDatatype`
    - `Framebuffer`
      - `getNumberOfColorAttachments` -> `numberOfColorAttachments`
      - `getDepthTexture` -> `depthTexture`
      - `getDepthRenderbuffer` -> `depthRenderbuffer`
      - `getStencilRenderbuffer` -> `stencilRenderbuffer`
      - `getDepthStencilTexture` -> `depthStencilTexture`
      - `getDepthStencilRenderbuffer` -> `depthStencilRenderbuffer`
      - `hasDepthAttachment` -> `hasdepthAttachment`
    - `Renderbuffer`
      - `getFormat` -> `format`
      - `getWidth` -> `width`
      - `getHeight` -> `height`
    - `ShaderProgram`
      - `getVertexAttributes` -> `vertexAttributes`
      - `getNumberOfVertexAttributes` -> `numberOfVertexAttributes`
      - `getAllUniforms` -> `allUniforms`
      - `getManualUniforms` -> `manualUniforms`
    - `Texture`
      - `getDimensions` -> `dimensions`
    - `TextureAtlas`
      - `getBorderWidthInPixels` -> `borderWidthInPixels`
      - `getTextureCoordinates` -> `textureCoordinates`
      - `getTexture` -> `texture`
      - `getNumberOfImages` -> `numberOfImages`
      - `getGUID` -> `guid`
    - `VertexArray`
      - `getNumberOfAttributes` -> `numberOfAttributes`
      - `getIndexBuffer` -> `indexBuffer`
  - Finished removing prototype functions. (Use 'static' versions of these functions instead):
    完成原型函数的移除。（请改用这些函数的“静态”版本）：
    - `BoundingRectangle`
      - `union`, `expand`
    - `BoundingSphere`
      - `union`, `expand`, `getPlaneDistances`, `projectTo2D`
    - `Plane`
      - `getPointDistance`
    - `Ray`
      - `getPoint`
    - `Spherical`
      - `normalize`
    - `Extent`
      - `validate`, `getSouthwest`, `getNorthwest`, `getNortheast`, `getSoutheast`, `getCenter`, `intersectWith`, `contains`, `isEmpty`, `subsample`
  - `DataSource` now has additional required properties, `isLoading` and `loadingEvent` as well as a new optional `update` method which will be called each frame.
    `DataSource` 现在具有额外的必需属性 `isLoading` 和 `loadingEvent`，以及一个新的可选 `update` 方法，该方法将在每帧被调用。
  - Renamed `Stripe` material uniforms `lightColor` and `darkColor` to `evenColor` and `oddColor`.
    将 `Stripe` 材质 uniform `lightColor` 和 `darkColor` 重命名为 `evenColor` 和 `oddColor`。
  - Replaced `SceneTransitioner` with new functions and properties on the `Scene`: `morphTo2D`, `morphToColumbusView`, `morphTo3D`, `completeMorphOnUserInput`, `morphStart`, `morphComplete`, and `completeMorph`.
    将 `SceneTransitioner` 替换为 `Scene` 上的新函数与属性：`morphTo2D`、`morphToColumbusView`、`morphTo3D`、`completeMorphOnUserInput`、`morphStart`、`morphComplete` 以及 `completeMorph`。
  - Removed `TexturePool`.
    移除了 `TexturePool`。

- Improved visual quality for translucent objects with [Weighted Blended Order-Independent Transparency](http://cesiumjs.org/2014/03/14/Weighted-Blended-Order-Independent-Transparency/).
  通过[加权混合独立顺序半透明度（Weighted Blended Order-Independent Transparency）](http://cesiumjs.org/2014/03/14/Weighted-Blended-Order-Independent-Transparency/)提升了半透明物体的视觉质量。
- Fixed extruded polygons rendered in the southern hemisphere. [#1490](https://github.com/CesiumGS/cesium/issues/1490)
  修复了在南半球渲染拉伸多边形（extruded polygons）的问题。[#1490](https://github.com/CesiumGS/cesium/issues/1490)
- Fixed Primitive picking that have a closed appearance drawn on the surface. [#1333](https://github.com/CesiumGS/cesium/issues/1333)
  修复了在表面绘制具有封闭外观（closed appearance）的 Primitive 时的拾取问题。[#1333](https://github.com/CesiumGS/cesium/issues/1333)
- Added `StripeMaterialProperty` for supporting the `Stripe` material in DynamicScene.
  添加了 `StripeMaterialProperty` 以支持 DynamicScene 中的 `Stripe` 材质。
- `loadArrayBuffer`, `loadBlob`, `loadJson`, `loadText`, and `loadXML` now support loading data from data URIs.
  `loadArrayBuffer`、`loadBlob`、`loadJson`、`loadText` 和 `loadXML` 现在支持从 data URI 加载数据。
- The `debugShowBoundingVolume` property on primitives now works across all scene modes.
  图元上的 `debugShowBoundingVolume` 属性现在可在所有场景模式下工作。
- Eliminated the use of a texture pool for Earth surface imagery textures. The use of the pool was leading to mipmapping problems in current versions of Google Chrome where some tiles would show imagery from entirely unrelated parts of the globe.
  消除了地球表面影像纹理对纹理池（texture pool）的使用。纹理池的使用在当前版本的 Google Chrome 中会导致 mipmap 问题，即部分瓦片会显示来自地球完全无关区域的影像。

## b26 - 2014-03-03

- Breaking changes:
  重大变更：
  - Replaced getter/setter functions with properties:
    将 getter/setter 函数替换为属性：
    - `Scene`
      - `getCanvas` -> `canvas`
      - `getContext` -> `context`
      - `getPrimitives` -> `primitives`
      - `getCamera` -> `camera`
      - `getScreenSpaceCameraController` -> `screenSpaceCameraController`
      - `getFrameState` -> `frameState`
      - `getAnimations` -> `animations`
    - `CompositePrimitive`
      - `getCentralBody`, `setCentralBody` -> `centralBody`
      - `getLength` -> `length`
    - `Ellipsoid`
      - `getRadii` -> `radii`
      - `getRadiiSquared` -> `radiiSquared`
      - `getRadiiToTheFourth` -> `radiiToTheFourth`
      - `getOneOverRadii` -> `oneOverRadii`
      - `getOneOverRadiiSquared` -> `oneOverRadiiSquared`
      - `getMinimumRadius` -> `minimumRadius`
      - `getMaximumRadius` -> `maximumRadius`
    - `CentralBody`
      - `getEllipsoid` -> `ellipsoid`
      - `getImageryLayers` -> `imageryLayers`
    - `EllipsoidalOccluder`
      - `getEllipsoid` -> `ellipsoid`
      - `getCameraPosition`, `setCameraPosition` -> `cameraPosition`
    - `EllipsoidTangentPlane`
      - `getEllipsoid` -> `ellipsoid`
      - `getOrigin` -> `origin`
    - `GeographicProjection`
      - `getEllipsoid` -> `ellipsoid`
    - `WebMercatorProjection`
      - `getEllipsoid` -> `ellipsoid`
    - `SceneTransitioner`
      - `getScene` -> `scene`
      - `getEllipsoid` -> `ellipsoid`
    - `ScreenSpaceCameraController`
      - `getEllipsoid`, `setEllipsoid` -> `ellipsoid`
    - `SkyAtmosphere`
      - `getEllipsoid` -> `ellipsoid`
    - `TilingScheme`, `GeographicTilingScheme`, `WebMercatorTilingSheme`
      - `getEllipsoid` -> `ellipsoid`
      - `getExtent` -> `extent`
      - `getProjection` -> `projection`
    - `ArcGisMapServerImageryProvider`, `BingMapsImageryProvider`, `GoogleEarthImageryProvider`, `GridImageryProvider`, `OpenStreetMapImageryProvider`, `SingleTileImageryProvider`, `TileCoordinatesImageryProvider`, `TileMapServiceImageryProvider`, `WebMapServiceImageryProvider`
      - `getProxy` -> `proxy`
      - `getTileWidth` -> `tileWidth`
      - `getTileHeight` -> `tileHeight`
      - `getMaximumLevel` -> `maximumLevel`
      - `getMinimumLevel` -> `minimumLevel`
      - `getTilingScheme` -> `tilingScheme`
      - `getExtent` -> `extent`
      - `getTileDiscardPolicy` -> `tileDiscardPolicy`
      - `getErrorEvent` -> `errorEvent`
      - `isReady` -> `ready`
      - `getCredit` -> `credit`
    - `ArcGisMapServerImageryProvider`, `BingMapsImageryProvider`, `GoogleEarthImageryProvider`, `OpenStreetMapImageryProvider`, `SingleTileImageryProvider`, `TileMapServiceImageryProvider`, `WebMapServiceImageryProvider`
      - `getUrl` -> `url`
    - `ArcGisMapServerImageryProvider`
      - `isUsingPrecachedTiles` - > `usingPrecachedTiles`
    - `BingMapsImageryProvider`
      - `getKey` -> `key`
      - `getMapStyle` -> `mapStyle`
    - `GoogleEarthImageryProvider`
      - `getPath` -> `path`
      - `getChannel` -> `channel`
      - `getVersion` -> `version`
      - `getRequestType` -> `requestType`
    - `WebMapServiceImageryProvider`
      - `getLayers` -> `layers`
    - `CesiumTerrainProvider`, `EllipsoidTerrainProvider`, `ArcGisImageServerTerrainProvider`, `VRTheWorldTerrainProvider`
      - `getErrorEvent` -> `errorEvent`
      - `getCredit` -> `credit`
      - `getTilingScheme` -> `tilingScheme`
      - `isReady` -> `ready`
    - `TimeIntervalCollection`
      - `getChangedEvent` -> `changedEvent`
      - `getStart` -> `start`
      - `getStop` -> `stop`
      - `getLength` -> `length`
      - `isEmpty` -> `empty`
    - `DataSourceCollection`, `ImageryLayerCollection`, `LabelCollection`, `PolylineCollection`, `SensorVolumeCollection`
      - `getLength` -> `length`
    - `BillboardCollection`
      - `getLength` -> `length`
      - `getTextureAtlas`, `setTextureAtlas` -> `textureAtlas`
      - `getDestroyTextureAtlas`, `setDestroyTextureAtlas` -> `destroyTextureAtlas`
  - Removed `Scene.getUniformState()`. Use `scene.context.getUniformState()`.
    移除了 `Scene.getUniformState()`。请使用 `scene.context.getUniformState()`。
  - Visualizers no longer create a `dynamicObject` property on the primitives they create. Instead, they set the `id` property that is standard for all primitives.
    可视化器（Visualizer）不再在其创建的图元上创建 `dynamicObject` 属性。取而代之的是设置所有图元通用的标准 `id` 属性。
  - The `propertyChanged` on DynamicScene objects has been renamed to `definitionChanged`. Also, the event is now raised in the case of an existing property being modified as well as having a new property assigned (previously only property assignment would raise the event).
    DynamicScene 对象上的 `propertyChanged` 已重命名为 `definitionChanged`。此外，现在在修改现有属性以及赋予新属性时都会触发该事件（此前仅属性赋值会触发该事件）。
  - The `visualizerTypes` parameter to the `DataSouceDisplay` has been changed to a callback function that creates an array of visualizer instances.
    `DataSourceDisplay` 的 `visualizerTypes` 参数已更改为返回可视化器实例数组的回调函数。
  - `DynamicDirectionsProperty` and `DynamicVertexPositionsProperty` were both removed, they have been superseded by `PropertyArray` and `PropertyPositionArray`, which make it easy for DataSource implementations to create time-dynamic arrays.
    移除了 `DynamicDirectionsProperty` 和 `DynamicVertexPositionsProperty`，它们已被 `PropertyArray` 和 `PropertyPositionArray` 取代，后者使 DataSource 实现能够轻松创建时变动态数组。
  - `VisualizerCollection` has been removed. It is superseded by `DataSourceDisplay`.
    移除了 `VisualizerCollection`。它已被 `DataSourceDisplay` 取代。
  - `DynamicEllipsoidVisualizer`, `DynamicPolygonVisualizer`, and `DynamicPolylineVisualizer` have been removed. They are superseded by `GeometryVisualizer` and corresponding `GeometryUpdater` implementations; `EllipsoidGeometryUpdater`, `PolygonGeometryUpdater`, `PolylineGeometryUpdater`.
    移除了 `DynamicEllipsoidVisualizer`、`DynamicPolygonVisualizer` 和 `DynamicPolylineVisualizer`。它们已被 `GeometryVisualizer` 以及对应的 `GeometryUpdater` 实现取代：`EllipsoidGeometryUpdater`、`PolygonGeometryUpdater`、`PolylineGeometryUpdater`。
  - Modified `CameraFlightPath` functions to take place in the camera's current reference frame. The arguments to the function now need to be given in world coordinates and an optional reference frame can be given when the flight is completed.
    修改了 `CameraFlightPath` 函数以在相机当前参考系中执行。该函数的参数现在需要以世界坐标给出，并且可以在飞行完成时提供可选的参考系。
  - `PixelDatatype` properties are now JavaScript numbers, not `Enumeration` instances.
    `PixelDatatype` 属性现在为 JavaScript 数字，而非 `Enumeration` 实例。
  - `combine` now takes two objects instead of an array, and defaults to copying shallow references. The `allowDuplicates` parameter has been removed. In the event of duplicate properties, the first object's properties will be used.
    `combine` 现在接收两个对象而非数组，并且默认进行浅引用复制。移除了 `allowDuplicates` 参数。如果存在重复属性，将使用第一个对象的属性。
  - Removed `FeatureDetection.supportsCrossOriginImagery`. This check was only useful for very old versions of WebKit.
    移除了 `FeatureDetection.supportsCrossOriginImagery`。该检查仅对极旧版本的 WebKit 有用。
- Added `Model` for drawing 3D models using glTF. See the [tutorial](http://cesiumjs.org/2014/03/03/Cesium-3D-Models-Tutorial/) and [Sandcastle example](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=3D%20Models.html&label=Showcases).
  添加了用于使用 glTF 绘制 3D 模型的 `Model`。参见[教程](http://cesiumjs.org/2014/03/03/Cesium-3D-Models-Tutorial/)和 [Sandcastle 示例](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=3D%20Models.html&label=Showcases)。
- DynamicScene now makes use of [Geometry and Appearances](http://cesiumjs.org/2013/11/04/Geometry-and-Appearances/), which provides a tremendous improvements to DataSource visualization (CZML, GeoJSON, etc..). Extruded geometries are now supported and in many use cases performance is an order of magnitude faster.
  DynamicScene 现在利用了[几何体与外观（Geometry and Appearances）](http://cesiumjs.org/2013/11/04/Geometry-and-Appearances/)，这为 DataSource 可视化（CZML、GeoJSON 等）带来了巨大改进。现在支持拉伸几何体，且在许多用例中性能提升了一个数量级。
- Added new `SelectionIndicator` and `InfoBox` widgets to `Viewer`, activated by `viewerDynamicObjectMixin`.
  在 `Viewer` 中添加了新的 `SelectionIndicator` 和 `InfoBox` 部件，通过 `viewerDynamicObjectMixin` 激活。
- `CesiumTerrainProvider` now supports mesh-based terrain like the tiles created by [STK Terrain Server](https://community.cesium.com/t/stk-terrain-server-beta/1017).
  `CesiumTerrainProvider` 现在支持基于网格的地形，例如由 [STK Terrain Server](https://community.cesium.com/t/stk-terrain-server-beta/1017) 创建的瓦片。
- Fixed rendering artifact on translucent objects when zooming in or out.
  修复了在放大或缩小半透明物体时的渲染伪影。
- Added `CesiumInspector` widget for graphics debugging. In Cesium Viewer, it is enabled by using the query parameter `inspector=true`. Also see the [Sandcastle example](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Cesium%20Inspector.html&label=Showcases).
  添加了用于图形调试的 `CesiumInspector` 部件。在 Cesium Viewer 中，可通过查询参数 `inspector=true` 启用。另见 [Sandcastle 示例](http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Cesium%20Inspector.html&label=Showcases)。
- Improved compatibility with Internet Explorer 11.
  改进了与 Internet Explorer 11 的兼容性。
- `DynamicEllipse`, `DynamicPolygon`, and `DynamicEllipsoid` now have properties matching their geometry counterpart, i.e. `EllipseGeometry`, `EllipseOutlineGeometry`, etc. These properties are also available in CZML.
  `DynamicEllipse`、`DynamicPolygon` 和 `DynamicEllipsoid` 现在具有与其对应几何体相匹配的属性，例如 `EllipseGeometry`、`EllipseOutlineGeometry` 等。这些属性在 CZML 中同样可用。
- Added a `definitionChanged` event to the `Property` interface as well as most `DynamicScene` objects. This makes it easy for a client to observe when new data is loaded into a property or object.
  在 `Property` 接口以及大多数 `DynamicScene` 对象中添加了 `definitionChanged` 事件。这使得客户端能够轻松监听新数据何时加载到属性或对象中。
- Added an `isConstant` property to the `Property` interface. Constant properties do not change in regards to simulation time, i.e. `Property.getValue` will always return the same result for all times.
  在 `Property` 接口中添加了 `isConstant` 属性。常量属性不会随仿真时间发生变化，即 `Property.getValue` 在任何时间都将始终返回相同的结果。
- `ConstantProperty` is now mutable; it's value can be updated via `ConstantProperty.setValue`.
  `ConstantProperty` 现在是可变的；其值可以通过 `ConstantProperty.setValue` 进行更新。
- Improved the quality of imagery near the poles when the imagery source uses a `GeographicTilingScheme`.
  当影像源使用 `GeographicTilingScheme` 时，提高了极点附近的影像质量。
- `OpenStreetMapImageryProvider` now supports imagery with a minimum level.
  `OpenStreetMapImageryProvider` 现在支持具有最小层级（minimum level）的影像。
- `BingMapsImageryProvider` now uses HTTPS by default for metadata and tiles when the document is loaded over HTTPS.
  当文档通过 HTTPS 加载时，`BingMapsImageryProvider` 现在默认对元数据和瓦片使用 HTTPS。
- Added the ability for imagery providers to specify view-dependent attribution to be display in the `CreditDisplay`.
  为影像提供者添加了指定视口相关版权信息（view-dependent attribution）以显示在 `CreditDisplay` 中的功能。
- View-dependent imagery source attribution is now added to the `CreditDisplay` by the `BingMapsImageryProvider`.
  `BingMapsImageryProvider` 现在向 `CreditDisplay` 中添加了视口相关的影像源版权信息。
- Fixed viewing an extent. [#1431](https://github.com/CesiumGS/cesium/issues/1431)
  修复了查看范围（extent）的问题。[#1431](https://github.com/CesiumGS/cesium/issues/1431)
- Fixed camera tilt in ICRF. [#544](https://github.com/CesiumGS/cesium/issues/544)
  修复了在 ICRF 参考系中的相机倾斜问题。[#544](https://github.com/CesiumGS/cesium/issues/544)
- Fixed developer error when zooming in 2D. If the zoom would create an invalid frustum, nothing is done. [#1432](https://github.com/CesiumGS/cesium/issues/1432)
  修复了在 2D 模式下缩放时的开发者错误。如果缩放会创建无效视锥体，则不执行任何操作。[#1432](https://github.com/CesiumGS/cesium/issues/1432)
- Fixed `WallGeometry` bug that failed by removing positions that were less close together by less than 6 decimal places. [#1483](https://github.com/CesiumGS/cesium/pull/1483)
  修复了 `WallGeometry` 移除相距不足 6 位小数的点时导致失败的 bug。[#1483](https://github.com/CesiumGS/cesium/pull/1483)
- Fixed `EllipsoidGeometry` texture coordinates. [#1454](https://github.com/CesiumGS/cesium/issues/1454)
  修复了 `EllipsoidGeometry` 的纹理坐标。[#1454](https://github.com/CesiumGS/cesium/issues/1454)
- Added a loop property to `Polyline`s to join the first and last point. [#960](https://github.com/CesiumGS/cesium/issues/960)
  为 `Polyline` 添加了 `loop` 属性以连接起点和终点。[#960](https://github.com/CesiumGS/cesium/issues/960)
- Use `performance.now()` instead of `Date.now()`, when available, to limit time spent loading terrain and imagery tiles. This results in more consistent frame rates while loading tiles on some systems.
  在可用时使用 `performance.now()` 代替 `Date.now()` 以限制加载地形和影像瓦片所花费的时间。这在某些系统上加载瓦片时带来了更平稳的帧率。
- `RequestErrorEvent` now includes the headers that were returned with the error response.
  `RequestErrorEvent` 现在包含随错误响应返回的响应头。
- Added `AssociativeArray`, which is a helper class for maintaining a hash of objects that also needs to be iterated often.
  添加了 `AssociativeArray`，这是一个用于维护对象哈希且需要经常迭代的辅助类。
- Added `TimeIntervalCollection.getChangedEvent` which returns an event that will be raised whenever intervals are updated.
  添加了 `TimeIntervalCollection.getChangedEvent`，该方法返回每当时间区间更新时都会触发的事件。
- Added a second parameter to `Material.fromType` to override default uniforms. [#1522](https://github.com/CesiumGS/cesium/pull/1522)
  为 `Material.fromType` 添加了第二个参数以覆盖默认 uniform。[#1522](https://github.com/CesiumGS/cesium/pull/1522)
- Added `Intersections2D` class containing operations on 2D triangles.
  添加了包含 2D 三角形操作的 `Intersections2D` 类。
- Added `czm_inverseViewProjection` and `czm_inverseModelViewProjection` automatic GLSL uniform.
  添加了 `czm_inverseViewProjection` 和 `czm_inverseModelViewProjection` 自动 GLSL uniform。

## b25 - 2014-02-03

- Breaking changes:
  重大变更：
  - The `Viewer` constructor argument `options.fullscreenElement` now matches the `FullscreenButton` default of `document.body`, it was previously the `Viewer` container itself.
    `Viewer` 构造函数参数 `options.fullscreenElement` 现在与 `FullscreenButton` 默认值 `document.body` 一致，之前为 `Viewer` 容器本身。
  - Removed `Viewer.objectTracked` event; `Viewer.trackedObject` is now an ES5 Knockout observable that can be subscribed to directly.
    移除了 `Viewer.objectTracked` 事件；`Viewer.trackedObject` 现在是一个可以直接订阅的 ES5 Knockout 可观察对象（observable）。
  - Replaced `PerformanceDisplay` with `Scene.debugShowFramesPerSecond`.
    将 `PerformanceDisplay` 替换为 `Scene.debugShowFramesPerSecond`。
  - `Asphalt`, `Blob`, `Brick`, `Cement`, `Erosion`, `Facet`, `Grass`, `TieDye`, and `Wood` materials were moved to the [Materials Pack Plugin](https://github.com/CesiumGS/cesium-materials-pack).
    `Asphalt`、`Blob`、`Brick`、`Cement`、`Erosion`、`Facet`、`Grass`、`TieDye` 和 `Wood` 材质已移至[材质包插件（Materials Pack Plugin）](https://github.com/CesiumGS/cesium-materials-pack)。
  - Renamed `GeometryPipeline.createAttributeIndices` to `GeometryPipeline.createAttributeLocations`.
    将 `GeometryPipeline.createAttributeIndices` 重命名为 `GeometryPipeline.createAttributeLocations`。
  - Renamed `attributeIndices` property to `attributeLocations` when calling `Context.createVertexArrayFromGeometry`.
    调用 `Context.createVertexArrayFromGeometry` 时将 `attributeIndices` 属性重命名为 `attributeLocations`。
  - `PerformanceDisplay` requires a DOM element as a parameter.
    `PerformanceDisplay` 需要一个 DOM 元素作为参数。
- Fixed globe rendering in the current Canary version of Google Chrome.
  修复了当前 Google Chrome Canary 版本中的地球渲染问题。
- `Viewer` now monitors the clock settings of the first added `DataSource` for changes, and also now has a constructor option `automaticallyTrackFirstDataSourceClock` which will turn off this behavior.
  `Viewer` 现在会监听第一个添加的 `DataSource` 的时钟设置变更，并且现在具有一个构造函数选项 `automaticallyTrackFirstDataSourceClock` 用于关闭此行为。
- The `DynamicObjectCollection` created by `CzmlDataSource` now sends a single `collectionChanged` event after CZML is loaded; previously it was sending an event every time an object was created or removed during the load process.
  由 `CzmlDataSource` 创建的 `DynamicObjectCollection` 现在在 CZML 加载完成后发送单个 `collectionChanged` 事件；此前它会在加载过程中每创建或移除一个对象就发送一次事件。
- Added `ScreenSpaceCameraController.enableInputs` to fix issue with inputs not being restored after overlapping camera flights.
  添加了 `ScreenSpaceCameraController.enableInputs` 以修复重叠相机飞行后输入未恢复的问题。
- Fixed picking in 2D with rotated map. [#1337](https://github.com/CesiumGS/cesium/issues/1337)
  修复了地图旋转时 2D 模式下的拾取问题。[#1337](https://github.com/CesiumGS/cesium/issues/1337)
- `TileMapServiceImageryProvider` can now handle casing differences in tilemapresource.xml.
  `TileMapServiceImageryProvider` 现在可以处理 tilemapresource.xml 中的大小写差异。
- `OpenStreetMapImageryProvider` now supports imagery with a minimum level.
  `OpenStreetMapImageryProvider` 现在支持具有最小层级（minimum level）的影像。
- Added `Quaternion.fastSlerp` and `Quaternion.fastSquad`.
  添加了 `Quaternion.fastSlerp` 和 `Quaternion.fastSquad`。
- Upgraded Tween.js to version r12.
  将 Tween.js 升级至版本 r12。

## b24 - 2014-01-06

- Breaking changes:
  重大变更：
  - Added `allowTextureFilterAnisotropic` (default: `true`) and `failIfMajorPerformanceCaveat` (default: `true`) properties to the `contextOptions` property passed to `Viewer`, `CesiumWidget`, and `Scene` constructors and moved the existing properties to a new `webgl` sub-property. For example, code that looked like:
    在传递给 `Viewer`、`CesiumWidget` 和 `Scene` 构造函数的 `contextOptions` 属性中添加了 `allowTextureFilterAnisotropic`（默认值：`true`）和 `failIfMajorPerformanceCaveat`（默认值：`true`）属性，并将现有属性移至新的 `webgl` 子属性中。例如，如下代码：

           var viewer = new Viewer('cesiumContainer', {
               contextOptions : {
                 alpha : true
               }
           });

    should now look like:
    现在应写为：

           var viewer = new Viewer('cesiumContainer', {
               contextOptions : {
                 webgl : {
                   alpha : true
                 }
               }
           });

  - The read-only `Cartesian3` objects must now be cloned to camera properties instead of assigned. For example, code that looked like:
    只读 `Cartesian3` 对象现在必须克隆到相机属性中，而不能直接赋值。例如，如下代码：

          camera.up = Cartesian3.UNIT_Z;

    should now look like:
    现在应写为：

          Cartesian3.clone(Cartesian3.UNIT_Z, camera.up);

  - The CSS files for individual widgets, e.g. `BaseLayerPicker.css`, no longer import other CSS files. Most applications should import `widgets.css` (and optionally `lighter.css`).
    各个部件的独立 CSS 文件（如 `BaseLayerPicker.css`）不再导入其他 CSS 文件。大多数应用程序应导入 `widgets.css`（以及可选的 `lighter.css`）。
  - `SvgPath` has been replaced by a Knockout binding: `cesiumSvgPath`.
    `SvgPath` 已被 Knockout 绑定 `cesiumSvgPath` 取代。
  - `DynamicObject.availability` is now a `TimeIntervalCollection` instead of a `TimeInterval`.
    `DynamicObject.availability` 现在是 `TimeIntervalCollection` 而非 `TimeInterval`。
  - Removed prototype version of `BoundingSphere.transform`.
    移除了 `BoundingSphere.transform` 的原型版本。
  - `Matrix4.multiplyByPoint` now returns a `Cartesian3` instead of a `Cartesian4`.
    `Matrix4.multiplyByPoint` 现在返回 `Cartesian3` 而非 `Cartesian4`。

- The minified, combined `Cesium.js` file now omits certain `DeveloperError` checks, to increase performance and reduce file size. When developing your application, we recommend using the unminified version locally for early error detection, then deploying the minified version to production.
  压缩合并后的 `Cesium.js` 文件现在省略了某些 `DeveloperError` 检查，以提升性能并减小文件体积。在开发应用程序时，建议在本地使用未压缩版本以便尽早发现错误，随后将压缩版本部署到生产环境。
- Fixed disabling `CentralBody.enableLighting`.
  修复了禁用 `CentralBody.enableLighting` 时的 bug。
- Fixed `Geocoder` flights when following an object.
  修复了跟踪物体时 `Geocoder` 的飞行问题。
- The `Viewer` widget now clears `Geocoder` input when the user clicks the home button.
  当用户点击 Home 按钮时，`Viewer` 部件现在会清空 `Geocoder` 输入框。
- The `Geocoder` input type has been changed to `search`, which improves usability (particularly on mobile devices). There were also some other minor styling improvements.
  `Geocoder` 的输入类型已更改为 `search`，这提升了易用性（尤其在移动设备上）。还进行了一些其他细微的样式改进。
- Added `CentralBody.maximumScreenSpaceError`.
  添加了 `CentralBody.maximumScreenSpaceError`。
- Added `translateEventTypes`, `zoomEventTypes`, `rotateEventTypes`, `tiltEventTypes`, and `lookEventTypes` properties to `ScreenSpaceCameraController` to change the default mouse inputs.
  为 `ScreenSpaceCameraController` 添加了 `translateEventTypes`、`zoomEventTypes`、`rotateEventTypes`、`tiltEventTypes` 和 `lookEventTypes` 属性，以更改默认的鼠标输入映射。
- Added `Billboard.setPixelOffsetScaleByDistance`, `Label.setPixelOffsetScaleByDistance`, `DynamicBillboard.pixelOffsetScaleByDistance`, and `DynamicLabel.pixelOffsetScaleByDistance` to control minimum/maximum pixelOffset scaling based on camera distance.
  添加了 `Billboard.setPixelOffsetScaleByDistance`、`Label.setPixelOffsetScaleByDistance`、`DynamicBillboard.pixelOffsetScaleByDistance` 以及 `DynamicLabel.pixelOffsetScaleByDistance`，以根据与相机的距离控制最小/最大 pixelOffset 缩放。
- Added `BoundingSphere.transformsWithoutScale`.
  添加了 `BoundingSphere.transformsWithoutScale`。
- Added `fromArray` function to `Matrix2`, `Matrix3` and `Matrix4`.
  为 `Matrix2`、`Matrix3` 和 `Matrix4` 添加了 `fromArray` 函数。
- Added `Matrix4.multiplyTransformation`, `Matrix4.multiplyByPointAsVector`.
  添加了 `Matrix4.multiplyTransformation`、`Matrix4.multiplyByPointAsVector`。

## b23 - 2013-12-02

- Breaking changes:
  重大变更：
  - Changed the `CatmullRomSpline` and `HermiteSpline` constructors from taking an array of structures to a structure of arrays. For example, code that looked like:
    将 `CatmullRomSpline` 和 `HermiteSpline` 构造函数从接收结构体数组更改为接收数组结构体（structure of arrays）。例如，如下代码：

           var controlPoints = [
               { point: new Cartesian3(1235398.0, -4810983.0, 4146266.0), time: 0.0},
               { point: new Cartesian3(1372574.0, -5345182.0, 4606657.0), time: 1.5},
               { point: new Cartesian3(-757983.0, -5542796.0, 4514323.0), time: 3.0},
               { point: new Cartesian3(-2821260.0, -5248423.0, 4021290.0), time: 4.5},
               { point: new Cartesian3(-2539788.0, -4724797.0, 3620093.0), time: 6.0}
           ];
           var spline = new HermiteSpline(controlPoints);

    should now look like:
    现在应写为：

           var spline = new HermiteSpline({
               times : [ 0.0, 1.5, 3.0, 4.5, 6.0 ],
               points : [
                   new Cartesian3(1235398.0, -4810983.0, 4146266.0),
                   new Cartesian3(1372574.0, -5345182.0, 4606657.0),
                   new Cartesian3(-757983.0, -5542796.0, 4514323.0),
                   new Cartesian3(-2821260.0, -5248423.0, 4021290.0),
                   new Cartesian3(-2539788.0, -4724797.0, 3620093.0)
               ]
           });

  - `loadWithXhr` now takes an options object, and allows specifying HTTP method and data to send with the request.
    `loadWithXhr` 现在接收一个 options 对象，并允许指定随请求发送的 HTTP 方法和数据。
  - Renamed `SceneTransitioner.onTransitionStart` to `SceneTransitioner.transitionStart`.
    将 `SceneTransitioner.onTransitionStart` 重命名为 `SceneTransitioner.transitionStart`。
  - Renamed `SceneTransitioner.onTransitionComplete` to `SceneTransitioner.transitionComplete`.
    将 `SceneTransitioner.onTransitionComplete` 重命名为 `SceneTransitioner.transitionComplete`。
  - Renamed `CesiumWidget.onRenderLoopError` to `CesiumWidget.renderLoopError`.
    将 `CesiumWidget.onRenderLoopError` 重命名为 `CesiumWidget.renderLoopError`。
  - Renamed `SceneModePickerViewModel.onTransitionStart` to `SceneModePickerViewModel.transitionStart`.
    将 `SceneModePickerViewModel.onTransitionStart` 重命名为 `SceneModePickerViewModel.transitionStart`。
  - Renamed `Viewer.onRenderLoopError` to `Viewer.renderLoopError`.
    将 `Viewer.onRenderLoopError` 重命名为 `Viewer.renderLoopError`。
  - Renamed `Viewer.onDropError` to `Viewer.dropError`.
    将 `Viewer.onDropError` 重命名为 `Viewer.dropError`。
  - Renamed `CesiumViewer.onDropError` to `CesiumViewer.dropError`.
    将 `CesiumViewer.onDropError` 重命名为 `CesiumViewer.dropError`。
  - Renamed `viewerDragDropMixin.onDropError` to `viewerDragDropMixin.dropError`.
    将 `viewerDragDropMixin.onDropError` 重命名为 `viewerDragDropMixin.dropError`。
  - Renamed `viewerDynamicObjectMixin.onObjectTracked` to `viewerDynamicObjectMixin.objectTracked`.
    将 `viewerDynamicObjectMixin.onObjectTracked` 重命名为 `viewerDynamicObjectMixin.objectTracked`。
  - `PixelFormat`, `PrimitiveType`, `IndexDatatype`, `TextureWrap`, `TextureMinificationFilter`, and `TextureMagnificationFilter` properties are now JavaScript numbers, not `Enumeration` instances.
    `PixelFormat`、`PrimitiveType`、`IndexDatatype`、`TextureWrap`、`TextureMinificationFilter` 和 `TextureMagnificationFilter` 属性现在为 JavaScript 数字，而非 `Enumeration` 实例。
  - Replaced `sizeInBytes` properties on `IndexDatatype` with `IndexDatatype.getSizeInBytes`.
    将 `IndexDatatype` 上的 `sizeInBytes` 属性替换为 `IndexDatatype.getSizeInBytes`。

- Added `perPositionHeight` option to `PolygonGeometry` and `PolygonOutlineGeometry`.
  为 `PolygonGeometry` 和 `PolygonOutlineGeometry` 添加了 `perPositionHeight` 选项。
- Added `QuaternionSpline` and `LinearSpline`.
  添加了 `QuaternionSpline` 和 `LinearSpline`。
- Added `Quaternion.log`, `Quaternion.exp`, `Quaternion.innerQuadrangle`, and `Quaternion.squad`.
  添加了 `Quaternion.log`、`Quaternion.exp`、`Quaternion.innerQuadrangle` 和 `Quaternion.squad`。
- Added `Matrix3.inverse` and `Matrix3.determinant`.
  添加了 `Matrix3.inverse` 和 `Matrix3.determinant`。
- Added `ObjectOrientedBoundingBox`.
  添加了 `ObjectOrientedBoundingBox`（定向包围盒）。
- Added `Ellipsoid.transformPositionFromScaledSpace`.
  添加了 `Ellipsoid.transformPositionFromScaledSpace`。
- Added `Math.nextPowerOfTwo`.
  添加了 `Math.nextPowerOfTwo`。
- Renamed our main website from [cesium.agi.com](http://cesium.agi.com/) to [cesiumjs.org](http://cesiumjs.org/).
  将我们的官方主站域名从 [cesium.agi.com](http://cesium.agi.com/) 重命名为 [cesiumjs.org](http://cesiumjs.org/)。

## b22 - 2013-11-01

- Breaking changes:
  重大变更：
  - Reversed the rotation direction of `Matrix3.fromQuaternion` to be consistent with graphics conventions. Mirrored change in `Quaternion.fromRotationMatrix`.
    反转了 `Matrix3.fromQuaternion` 的旋转方向以与图形学惯例保持一致。在 `Quaternion.fromRotationMatrix` 中进行了镜像更改。
  - The following prototype functions were removed:
    移除了以下原型函数：
    - From `Matrix2`, `Matrix3`, and `Matrix4`: `toArray`, `getColumn`, `setColumn`, `getRow`, `setRow`, `multiply`, `multiplyByVector`, `multiplyByScalar`, `negate`, and `transpose`.
      对于 `Matrix2`、`Matrix3` 和 `Matrix4`：`toArray`、`getColumn`、`setColumn`、`getRow`、`setRow`、`multiply`、`multiplyByVector`、`multiplyByScalar`、`negate` 和 `transpose`。
    - From `Matrix4`: `getTranslation`, `getRotation`, `inverse`, `inverseTransformation`, `multiplyByTranslation`, `multiplyByUniformScale`, `multiplyByPoint`. For example, code that previously looked like `matrix.toArray();` should now look like `Matrix3.toArray(matrix);`.
      对于 `Matrix4`：`getTranslation`、`getRotation`、`inverse`、`inverseTransformation`、`multiplyByTranslation`、`multiplyByUniformScale`、`multiplyByPoint`。例如，此前类似 `matrix.toArray();` 的代码现在应写为 `Matrix3.toArray(matrix);`。
  - Replaced `DynamicPolyline` `color`, `outlineColor`, and `outlineWidth` properties with a single `material` property.
    将 `DynamicPolyline` 的 `color`、`outlineColor` 和 `outlineWidth` 属性替换为单个 `material` 属性。
  - Renamed `DynamicBillboard.nearFarScalar` to `DynamicBillboard.scaleByDistance`.
    将 `DynamicBillboard.nearFarScalar` 重命名为 `DynamicBillboard.scaleByDistance`。
  - All data sources must now implement `DataSource.getName`, which returns a user-readable name for the data source.
    所有数据源现在必须实现 `DataSource.getName`，以返回用户可读的数据源名称。
  - CZML `document` objects are no longer added to the `DynamicObjectCollection` created by `CzmlDataSource`. Use the `CzmlDataSource` interface to access the data instead.
    CZML `document` 对象不再添加到由 `CzmlDataSource` 创建的 `DynamicObjectCollection` 中。请改用 `CzmlDataSource` 接口访问该数据。
  - `TimeInterval.equals`, and `TimeInterval.equalsEpsilon` now compare interval data as well.
    `TimeInterval.equals` 和 `TimeInterval.equalsEpsilon` 现在也会比较区间数据。
  - All SVG files were deleted from `Widgets/Images` and replaced by a new `SvgPath` class.
    删除了 `Widgets/Images` 中的所有 SVG 文件，并替换为新的 `SvgPath` 类。
  - The toolbar widgets (Home, SceneMode, BaseLayerPicker) and the fullscreen button now depend on `CesiumWidget.css` for global Cesium button styles.
    工具栏部件（Home、SceneMode、BaseLayerPicker）和全屏按钮现在依赖 `CesiumWidget.css` 获取 Cesium 全局按钮样式。
  - The toolbar widgets expect their `container` to be the toolbar itself now, no need for separate containers for each widget on the bar.
    工具栏部件现在期望它们的 `container` 就是工具栏本身，不再需要为栏上的每个部件设置单独的容器。
  - `Property` implementations are now required to implement a prototype `equals` function.
    `Property` 实现现在必须实现原型 `equals` 函数。
  - `ConstantProperty` and `TimeIntervalCollectionProperty` no longer take a `clone` function and instead require objects to implement prototype `clone` and `equals` functions.
    `ConstantProperty` 和 `TimeIntervalCollectionProperty` 不再接收 `clone` 函数，而是要求对象实现原型的 `clone` 和 `equals` 函数。
  - The `SkyBox` constructor now takes an `options` argument with a `sources` property, instead of directly taking `sources`.
    `SkyBox` 构造函数现在接收带有 `sources` 属性的 `options` 参数，而非直接接收 `sources`。
  - Replaced `SkyBox.getSources` with `SkyBox.sources`.
    将 `SkyBox.getSources` 替换为 `SkyBox.sources`。
  - The `bearing` property of `DynamicEllipse` is now called `rotation`.
    `DynamicEllipse` 的 `bearing` 属性现在更名为 `rotation`。
  - CZML `ellipse.bearing` property is now `ellipse.rotation`.
    CZML `ellipse.bearing` 属性现在为 `ellipse.rotation`。
- Added a `Geocoder` widget that allows users to enter an address or the name of a landmark and zoom to that location. It is enabled by default in applications that use the `Viewer` widget.
  添加了 `Geocoder` 部件，允许用户输入地址或地标名称并缩放至该位置。在基于 `Viewer` 部件的应用程序中默认启用。
- Added `GoogleEarthImageryProvider`.
  添加了 `GoogleEarthImageryProvider`。
- Added `Moon` for drawing the moon, and `IauOrientationAxes` for computing the Moon's orientation.
  添加了用于绘制月球的 `Moon`，以及用于计算月球朝向的 `IauOrientationAxes`。
- Added `Material.translucent` property. Set this property or `Appearance.translucent` for correct rendering order. Translucent geometries are rendered after opaque geometries.
  添加了 `Material.translucent` 属性。设置该属性或 `Appearance.translucent` 以获得正确的渲染顺序。半透明几何体在不透明几何体之后渲染。
- Added `enableLighting`, `lightingFadeOutDistance`, and `lightingFadeInDistance` properties to `CentralBody` to configure lighting.
  为 `CentralBody` 添加了 `enableLighting`、`lightingFadeOutDistance` 和 `lightingFadeInDistance` 属性以配置光照。
- Added `Billboard.setTranslucencyByDistance`, `Label.setTranslucencyByDistance`, `DynamicBillboard.translucencyByDistance`, and `DynamicLabel.translucencyByDistance` to control minimum/maximum translucency based on camera distance.
  添加了 `Billboard.setTranslucencyByDistance`、`Label.setTranslucencyByDistance`、`DynamicBillboard.translucencyByDistance` 以及 `DynamicLabel.translucencyByDistance`，以根据与相机的距离控制最小/最大半透明度。
- Added `PolylineVolumeGeometry` and `PolylineVolumeGeometryOutline`.
  添加了 `PolylineVolumeGeometry` 和 `PolylineVolumeGeometryOutline`。
- Added `Shapes.compute2DCircle`.
  添加了 `Shapes.compute2DCircle`。
- Added `Appearances` tab to Sandcastle with an example for each geometry appearance.
  在 Sandcastle 中添加了 `Appearances` 标签页，并包含每个几何体外观的示例。
- Added `Scene.drillPick` to return list of objects each containing 1 primitive at a screen space position.
  添加了 `Scene.drillPick`，用于返回屏幕空间位置处包含 1 个图元的对象列表。
- Added `PolylineOutlineMaterialProperty` for use with `DynamicPolyline.material`.
  添加了用于配合 `DynamicPolyline.material` 使用的 `PolylineOutlineMaterialProperty`。
- Added the ability to use `Array` and `JulianDate` objects as custom CZML properties.
  添加了将 `Array` 和 `JulianDate` 对象作为自定义 CZML 属性使用的能力。
- Added `DynamicObject.name` and corresponding CZML support. This is a non-unique, user-readable name for the object.
  添加了 `DynamicObject.name` 及对应的 CZML 支持。这是该对象的一个非唯一、用户可读的名称。
- Added `DynamicObject.parent` and corresponding CZML support. This allows for `DataSource` objects to present data hierarchically.
  添加了 `DynamicObject.parent` 及对应的 CZML 支持。这允许 `DataSource` 对象以层级结构呈现数据。
- Added `DynamicPoint.scaleByDistance` to control minimum/maximum point size based on distance from the camera.
  添加了 `DynamicPoint.scaleByDistance` 以根据与相机的距离控制点对象的最小/最大尺寸。
- The toolbar widgets (Home, SceneMode, BaseLayerPicker) and the fullscreen button can now be styled directly with user-supplied CSS.
  工具栏部件（Home、SceneMode、BaseLayerPicker）和全屏按钮现在可以直接使用用户提供的 CSS 进行样式定制。
- Added `skyBox` to the `CesiumWidget` and `Viewer` constructors for changing the default stars.
  在 `CesiumWidget` 和 `Viewer` 构造函数中添加了 `skyBox`，以更改默认星空背景。
- Added `Matrix4.fromTranslationQuaternionRotationScale` and `Matrix4.multiplyByScale`.
  添加了 `Matrix4.fromTranslationQuaternionRotationScale` 和 `Matrix4.multiplyByScale`。
- Added `Matrix3.getEigenDecomposition`.
  添加了 `Matrix3.getEigenDecomposition`。
- Added utility function `getFilenameFromUri`, which given a URI with or without query parameters, returns the last segment of the URL.
  添加了实用函数 `getFilenameFromUri`，在传入带有或不带查询参数的 URI 时，返回该 URL 的最后一个片段。
- Added prototype versions of `equals` and `equalsEpsilon` method back to `Cartesian2`, `Cartesian3`, `Cartesian4`, and `Quaternion`.
  将 `equals` 和 `equalsEpsilon` 方法的原型版本重新加回至 `Cartesian2`、`Cartesian3`、`Cartesian4` 和 `Quaternion`。
- Added prototype equals function to `NearFarScalar`, and `TimeIntervalCollection`.
  为 `NearFarScalar` 和 `TimeIntervalCollection` 添加了原型 equals 函数。
- Added `FrameState.events`.
  添加了 `FrameState.events`。
- Added `Primitive.allowPicking` to save memory when picking is not needed.
  添加了 `Primitive.allowPicking`，以便在不需要拾取时节省内存。
- Added `debugShowBoundingVolume`, for debugging primitive rendering, to `Primitive`, `Polygon`, `ExtentPrimitive`, `EllipsoidPrimitive`, `BillboardCollection`, `LabelCollection`, and `PolylineCollection`.
  为 `Primitive`、`Polygon`、`ExtentPrimitive`、`EllipsoidPrimitive`、`BillboardCollection`、`LabelCollection` 和 `PolylineCollection` 添加了用于调试图元渲染的 `debugShowBoundingVolume`。
- Added `DebugModelMatrixPrimitive` for debugging primitive's `modelMatrix`.
  添加了用于调试图元 `modelMatrix` 的 `DebugModelMatrixPrimitive`。
- Added `options` argument to the `EllipsoidPrimitive` constructor.
  为 `EllipsoidPrimitive` 构造函数添加了 `options` 参数。
- Upgraded Knockout from version 2.3.0 to 3.0.0.
  将 Knockout 从版本 2.3.0 升级至 3.0.0。
- Upgraded RequireJS to version 2.1.9, and Almond to 0.2.6.
  将 RequireJS 升级至版本 2.1.9，将 Almond 升级至 0.2.6。
- Added a user-defined `id` to all primitives for use with picking. For example:
  为所有图元添加了用户定义的 `id` 以用于拾取。例如：

            primitives.add(new Polygon({
                id : {
                    // User-defined object returned by Scene.pick
                },
                // ...
            }));
            // ...
            var p = scene.pick(/* ... */);
            if (defined(p) && defined(p.id)) {
               // Use properties and functions in p.id
            }

## b21 - 2013-10-01

- Breaking changes:
  重大变更：
  - Cesium now prints a reminder to the console if your application uses Bing Maps imagery and you do not supply a Bing Maps key for your application. This is a reminder that you should create a Bing Maps key for your application as soon as possible and prior to deployment. You can generate a Bing Maps key by visiting [https://www.bingmapsportal.com/](https://www.bingmapsportal.com/). Set the `BingMapsApi.defaultKey` property to the value of your application's key before constructing the `CesiumWidget` or any other types that use the Bing Maps API.
    如果您的应用程序使用 Bing Maps 影像且未为应用程序提供 Bing Maps key，Cesium 现在会在控制台输出提醒。这是为了提醒您在部署前应尽快为应用程序创建 Bing Maps key。您可以访问 [https://www.bingmapsportal.com/](https://www.bingmapsportal.com/) 生成 Bing Maps key。在构造 `CesiumWidget` 或任何其他使用 Bing Maps API 的类型之前，请将 `BingMapsApi.defaultKey` 属性设置为您的应用程序 key 值。

           BingMapsApi.defaultKey = 'my-key-generated-with-bingmapsportal.com';

  - `Scene.pick` now returns an object with a `primitive` property, not the primitive itself. For example, code that looked like:
    `Scene.pick` 现在返回带有 `primitive` 属性的对象，而非图元本身。例如，如下代码：

           var primitive = scene.pick(/* ... */);
           if (defined(primitive)) {
              // Use primitive
           }

    should now look like:
    现在应写为：

           var p = scene.pick(/* ... */);
           if (defined(p) && defined(p.primitive)) {
              // Use p.primitive
           }

  - Removed `getViewMatrix`, `getInverseViewMatrix`, `getInverseTransform`, `getPositionWC`, `getDirectionWC`, `getUpWC` and `getRightWC` from `Camera`. Instead, use the `viewMatrix`, `inverseViewMatrix`, `inverseTransform`, `positionWC`, `directionWC`, `upWC`, and `rightWC` properties.
    从 `Camera` 中移除了 `getViewMatrix`、`getInverseViewMatrix`、`getInverseTransform`、`getPositionWC`、`getDirectionWC`、`getUpWC` 和 `getRightWC`。请改用 `viewMatrix`、`inverseViewMatrix`、`inverseTransform`、`positionWC`、`directionWC`、`upWC` 和 `rightWC` 属性。
  - Removed `getProjectionMatrix` and `getInfiniteProjectionMatrix` from `PerspectiveFrustum`, `PerspectiveOffCenterFrustum` and `OrthographicFrustum`. Instead, use the `projectionMatrix` and `infiniteProjectionMatrix` properties.
    从 `PerspectiveFrustum`、`PerspectiveOffCenterFrustum` 和 `OrthographicFrustum` 中移除了 `getProjectionMatrix` 和 `getInfiniteProjectionMatrix`。请改用 `projectionMatrix` 和 `infiniteProjectionMatrix` 属性。
  - The following prototype functions were removed:
    移除了以下原型函数：
    - From `Quaternion`: `conjugate`, `magnitudeSquared`, `magnitude`, `normalize`, `inverse`, `add`, `subtract`, `negate`, `dot`, `multiply`, `multiplyByScalar`, `divideByScalar`, `getAxis`, `getAngle`, `lerp`, `slerp`, `equals`, `equalsEpsilon`
      对于 `Quaternion`：`conjugate`、`magnitudeSquared`、`magnitude`、`normalize`、`inverse`、`add`、`subtract`、`negate`、`dot`、`multiply`、`multiplyByScalar`、`divideByScalar`、`getAxis`、`getAngle`、`lerp`、`slerp`、`equals`、`equalsEpsilon`
    - From `Cartesian2`, `Cartesian3`, and `Cartesian4`: `getMaximumComponent`, `getMinimumComponent`, `magnitudeSquared`, `magnitude`, `normalize`, `dot`, `multiplyComponents`, `add`, `subtract`, `multiplyByScalar`, `divideByScalar`, `negate`, `abs`, `lerp`, `angleBetween`, `mostOrthogonalAxis`, `equals`, and `equalsEpsilon`.
      对于 `Cartesian2`、`Cartesian3` 和 `Cartesian4`：`getMaximumComponent`、`getMinimumComponent`、`magnitudeSquared`、`magnitude`、`normalize`、`dot`、`multiplyComponents`、`add`、`subtract`、`multiplyByScalar`、`divideByScalar`、`negate`、`abs`、`lerp`、`angleBetween`、`mostOrthogonalAxis`、`equals` 和 `equalsEpsilon`。
    - From `Cartesian3`: `cross`
      对于 `Cartesian3`：`cross`

    Code that previously looked like `quaternion.magnitude();` should now look like `Quaternion.magnitude(quaternion);`.
    此前类似 `quaternion.magnitude();` 的代码现在应写为 `Quaternion.magnitude(quaternion);`。

  - `DynamicObjectCollection` and `CompositeDynamicObjectCollection` have been largely re-written, see the documentation for complete details. Highlights include:
    `DynamicObjectCollection` 和 `CompositeDynamicObjectCollection` 进行了大量重写，完整详情请参阅文档。要点包括：
    - `getObject` has been renamed `getById`.
      `getObject` 已重命名为 `getById`。
    - `removeObject` has been renamed `removeById`.
      `removeObject` 已重命名为 `removeById`。
    - `collectionChanged` event added for notification of objects being added or removed.
      添加了用于对象添加或移除通知的 `collectionChanged` 事件。
  - `DynamicScene` graphics object (`DynamicBillboard`, etc...) have had their static `mergeProperties` and `clean` functions removed.
    移除了 `DynamicScene` 图形对象（`DynamicBillboard` 等）的静态 `mergeProperties` 和 `clean` 函数。
  - `UniformState.update` now takes a context as its first parameter.
    `UniformState.update` 现在接收 context 作为其第一个参数。
  - `Camera` constructor now takes a context instead of a canvas.
    `Camera` 构造函数现在接收 context 而非 canvas。
  - `SceneTransforms.clipToWindowCoordinates` now takes a context instead of a canvas.
    `SceneTransforms.clipToWindowCoordinates` 现在接收 context 而非 canvas。
  - Removed `canvasDimensions` from `FrameState`.
    从 `FrameState` 中移除了 `canvasDimensions`。
  - Removed `context` option from `Material` constructor and parameter from `Material.fromType`.
    移除了 `Material` 构造函数中的 `context` 选项以及 `Material.fromType` 中的对应参数。
  - Renamed `TextureWrap.CLAMP` to `TextureWrap.CLAMP_TO_EDGE`.
    将 `TextureWrap.CLAMP` 重命名为 `TextureWrap.CLAMP_TO_EDGE`。

- Added `Geometries` tab to Sandcastle with an example for each geometry type.
  在 Sandcastle 中添加了 `Geometries` 标签页，并包含每种几何体类型的示例。
- Added `CorridorOutlineGeometry`.
  添加了 `CorridorOutlineGeometry`。
- Added `PolylineGeometry`, `PolylineColorAppearance`, and `PolylineMaterialAppearance`.
  添加了 `PolylineGeometry`、`PolylineColorAppearance` 和 `PolylineMaterialAppearance`。
- Added `colors` option to `SimplePolylineGeometry` for per vertex or per segment colors.
  为 `SimplePolylineGeometry` 添加了 `colors` 选项，以支持逐顶点或逐线段着色。
- Added proper support for browser zoom.
  添加了对浏览器缩放（browser zoom）的完整支持。
- Added `propertyChanged` event to `DynamicScene` graphics objects for receiving change notifications.
  在 `DynamicScene` 图形对象中添加了 `propertyChanged` 事件以接收变更通知。
- Added prototype `clone` and `merge` functions to `DynamicScene` graphics objects.
  为 `DynamicScene` 图形对象添加了原型的 `clone` 和 `merge` 函数。
- Added `width`, `height`, and `nearFarScalar` properties to `DynamicBillboard` for controlling the image size.
  为 `DynamicBillboard` 添加了 `width`、`height` 和 `nearFarScalar` 属性以控制图像尺寸。
- Added `heading` and `tilt` properties to `CameraController`.
  为 `CameraController` 添加了 `heading` 和 `tilt` 属性。
- Added `Scene.sunBloom` to enable/disable the bloom filter on the sun. The bloom filter should be disabled for better frame rates on mobile devices.
  添加了 `Scene.sunBloom` 以启用/禁用太阳的泛光滤镜（bloom filter）。在移动设备上应禁用泛光滤镜以获得更流畅的帧率。
- Added `getDrawingBufferWidth` and `getDrawingBufferHeight` to `Context`.
  在 `Context` 中添加了 `getDrawingBufferWidth` 和 `getDrawingBufferHeight`。
- Added new built-in GLSL functions `czm_getLambertDiffuse` and `czm_getSpecular`.
  添加了新的内置 GLSL 函数 `czm_getLambertDiffuse` 和 `czm_getSpecular`。
- Added support for [EXT_frag_depth](http://www.khronos.org/registry/webgl/extensions/EXT_frag_depth/).
  添加了对 [EXT_frag_depth](http://www.khronos.org/registry/webgl/extensions/EXT_frag_depth/) 的支持。
- Improved graphics performance.
  提升了图形渲染性能。
  - An Everest terrain view went from 135-140 to over 150 frames per second.
    珠峰地形视图的帧率从 135-140 fps 提升到超过 150 fps。
  - Rendering over a thousand polylines in the same collection with different materials went from 20 to 40 frames per second.
    在同一集合中渲染一千多条使用不同材质的折线时，帧率从 20 fps 提升到 40 fps。
- Improved runtime generation of GLSL shaders.
  改进了 GLSL 着色器的运行时生成。
- Made sun size accurate.
  使太阳尺寸更加精确。
- Fixed bug in triangulation that fails on complex polygons. Instead, it makes a best effort to render what it can. [#1121](https://github.com/CesiumGS/cesium/issues/1121)
  修复了在复杂多边形上三角剖分失败的 bug。改为尽最大努力渲染能渲染的部分。[#1121](https://github.com/CesiumGS/cesium/issues/1121)
- Fixed geometries not closing completely. [#1093](https://github.com/CesiumGS/cesium/issues/1093)
  修复了几何体未完全闭合的问题。[#1093](https://github.com/CesiumGS/cesium/issues/1093)
- Fixed `EllipsoidTangentPlane.projectPointOntoPlane` for tangent planes on an ellipsoid other than the unit sphere.
  修复了非单位球面的椭球体切平面上的 `EllipsoidTangentPlane.projectPointOntoPlane`。
- `CompositePrimitive.add` now returns the added primitive. This allows us to write more concise code.
  `CompositePrimitive.add` 现在返回添加的图元。这使我们能够编写更简洁的代码。

        var p = new Primitive(/* ... */);
        primitives.add(p);
        return p;

  becomes
  变为：

        return primitives.add(new Primitive(/* ... */));

## b20 - 2013-09-03

_This releases fixes 2D and other issues with Chrome 29.0.1547.57 ([#1002](https://github.com/CesiumGS/cesium/issues/1002) and [#1047](https://github.com/CesiumGS/cesium/issues/1047))._
_此版本修复了 Chrome 29.0.1547.57 中的 2D 以及其他问题（[#1002](https://github.com/CesiumGS/cesium/issues/1002) 和 [#1047](https://github.com/CesiumGS/cesium/issues/1047)）。_

- Breaking changes:
  重大变更：
  - The `CameraFlightPath` functions `createAnimation`, `createAnimationCartographic`, and `createAnimationExtent` now take `scene` as their first parameter instead of `frameState`.
    `CameraFlightPath` 函数 `createAnimation`、`createAnimationCartographic` 和 `createAnimationExtent` 现在接收 `scene` 作为其第一个参数，而非 `frameState`。
  - Completely refactored the `DynamicScene` property system to vastly improve the API. See [#1080](https://github.com/CesiumGS/cesium/pull/1080) for complete details.
    彻底重构了 `DynamicScene` 属性系统以大幅改进 API。完整详情参见 [#1080](https://github.com/CesiumGS/cesium/pull/1080)。
    - Removed `CzmlBoolean`, `CzmlCartesian2`, `CzmlCartesian3`, `CzmlColor`, `CzmlDefaults`, `CzmlDirection`, `CzmlHorizontalOrigin`, `CzmlImage`, `CzmlLabelStyle`, `CzmlNumber`, `CzmlPosition`, `CzmlString`, `CzmlUnitCartesian3`, `CzmlUnitQuaternion`, `CzmlUnitSpherical`, and `CzmlVerticalOrigin` since they are no longer needed.
      移除了不再需要的 `CzmlBoolean`、`CzmlCartesian2`、`CzmlCartesian3`、`CzmlColor`、`CzmlDefaults`、`CzmlDirection`、`CzmlHorizontalOrigin`、`CzmlImage`、`CzmlLabelStyle`、`CzmlNumber`、`CzmlPosition`、`CzmlString`、`CzmlUnitCartesian3`、`CzmlUnitQuaternion`、`CzmlUnitSpherical` 和 `CzmlVerticalOrigin`。
    - Removed `DynamicProperty`, `DynamicMaterialProperty`, `DynamicDirectionsProperty`, and `DynamicVertexPositionsProperty`; replacing them with an all new system of properties.
      移除了 `DynamicProperty`、`DynamicMaterialProperty`、`DynamicDirectionsProperty` 和 `DynamicVertexPositionsProperty`；将其替换为全新的属性系统。
      - `Property` - base interface for all properties.
        `Property` - 所有属性的基础接口。
      - `CompositeProperty` - a property composed of other properties.
        `CompositeProperty` - 由其他属性组合而成的属性。
      - `ConstantProperty` - a property whose value never changes.
        `ConstantProperty` - 值永不改变的属性。
      - `SampledProperty` - a property whose value is interpolated from a set of samples.
        `SampledProperty` - 其值从一组采样点插值而来的属性。
      - `TimeIntervalCollectionProperty` - a property whose value changes based on time interval.
        `TimeIntervalCollectionProperty` - 其值基于时间区间变化的属性。
      - `MaterialProperty` - base interface for all material properties.
        `MaterialProperty` - 所有材质属性的基础接口。
      - `CompositeMaterialProperty` - a `CompositeProperty` for materials.
        `CompositeMaterialProperty` - 用于材质的 `CompositeProperty`。
      - `ColorMaterialProperty` - a property that maps to a color material. (replaces `DynamicColorMaterial`)
        `ColorMaterialProperty` - 映射到颜色材质的属性。（取代 `DynamicColorMaterial`）
      - `GridMaterialProperty` - a property that maps to a grid material. (replaces `DynamicGridMaterial`)
        `GridMaterialProperty` - 映射到网格材质的属性。（取代 `DynamicGridMaterial`）
      - `ImageMaterialProperty` - a property that maps to an image material. (replaces `DynamicImageMaterial`)
        `ImageMaterialProperty` - 映射到图像材质的属性。（取代 `DynamicImageMaterial`）
      - `PositionProperty`- base interface for all position properties.
        `PositionProperty` - 所有位置属性的基础接口。
      - `CompositePositionProperty` - a `CompositeProperty` for positions.
        `CompositePositionProperty` - 用于位置的 `CompositeProperty`。
      - `ConstantPositionProperty` - a `PositionProperty` whose value does not change in respect to the `ReferenceFrame` in which is it defined.
        `ConstantPositionProperty` - 相对于其所定义的 `ReferenceFrame` 值不发生变化的 `PositionProperty`。
      - `SampledPositionProperty` - a `SampledProperty` for positions.
        `SampledPositionProperty` - 用于位置的 `SampledProperty`。
      - `TimeIntervalCollectionPositionProperty` - A `TimeIntervalCollectionProperty` for positions.
        `TimeIntervalCollectionPositionProperty` - 用于位置的 `TimeIntervalCollectionProperty`。
  - Removed `processCzml`, use `CzmlDataSource` instead.
    移除了 `processCzml`，请改用 `CzmlDataSource`。
  - `Source/Widgets/Viewer/lighter.css` was deleted, use `Source/Widgets/lighter.css` instead.
    删除了 `Source/Widgets/Viewer/lighter.css`，请改用 `Source/Widgets/lighter.css`。
  - Replaced `ExtentGeometry` parameters for extruded extent to make them consistent with other geometries.
    替换了 `ExtentGeometry` 的拉伸范围参数，以使其与其他几何体保持一致。
    - `options.extrudedOptions.height` -> `options.extrudedHeight`
    - `options.extrudedOptions.closeTop` -> `options.closeBottom`
    - `options.extrudedOptions.closeBottom` -> `options.closeTop`
  - Geometry constructors no longer compute vertices or indices. Use the type's `createGeometry` method. For example, code that looked like:
    几何体构造函数不再计算顶点或索引。请使用该类型的 `createGeometry` 方法。例如，如下代码：

          var boxGeometry = new BoxGeometry({
            minimumCorner : min,
            maximumCorner : max,
            vertexFormat : VertexFormat.POSITION_ONLY
          });

    should now look like:
    现在应写为：

          var box = new BoxGeometry({
              minimumCorner : min,
              maximumCorner : max,
              vertexFormat : VertexFormat.POSITION_ONLY
          });
          var geometry = BoxGeometry.createGeometry(box);

  - Removed `createTypedArray` and `createArrayBufferView` from each of the `ComponentDatatype` enumerations. Instead, use `ComponentDatatype.createTypedArray` and `ComponentDatatype.createArrayBufferView`.
    从每个 `ComponentDatatype` 枚举中移除了 `createTypedArray` 和 `createArrayBufferView`。请改用 `ComponentDatatype.createTypedArray` 和 `ComponentDatatype.createArrayBufferView`。
  - `DataSourceDisplay` now requires a `DataSourceCollection` to be passed into its constructor.
    `DataSourceDisplay` 现在要求在其构造函数中传入 `DataSourceCollection`。
  - `DeveloperError` and `RuntimeError` no longer contain an `error` property. Call `toString`, or check the `stack` property directly instead.
    `DeveloperError` 和 `RuntimeError` 不再包含 `error` 属性。请调用 `toString`，或者直接检查 `stack` 属性。
  - Replaced `createPickFragmentShaderSource` with `createShaderSource`.
    将 `createPickFragmentShaderSource` 替换为 `createShaderSource`。
  - Renamed `PolygonPipeline.earClip2D` to `PolygonPipeline.triangulate`.
    将 `PolygonPipeline.earClip2D` 重命名为 `PolygonPipeline.triangulate`。

- Added outline geometries. [#1021](https://github.com/CesiumGS/cesium/pull/1021).
  添加了轮廓几何体（outline geometries）。[#1021](https://github.com/CesiumGS/cesium/pull/1021)。
- Added `CorridorGeometry`.
  添加了 `CorridorGeometry`。
- Added `Billboard.scaleByDistance` and `NearFarScalar` to control billboard minimum/maximum scale based on camera distance.
  添加了 `Billboard.scaleByDistance` 和 `NearFarScalar`，以根据与相机的距离控制广告牌的最小/最大缩放比例。
- Added `EllipsoidGeodesic`.
  添加了 `EllipsoidGeodesic`（椭球大地测量线）。
- Added `PolylinePipeline.scaleToSurface`.
  添加了 `PolylinePipeline.scaleToSurface`。
- Added `PolylinePipeline.scaleToGeodeticHeight`.
  添加了 `PolylinePipeline.scaleToGeodeticHeight`。
- Added the ability to specify a `minimumTerrainLevel` and `maximumTerrainLevel` when constructing an `ImageryLayer`. The layer will only be shown for terrain tiles within the specified range.
  添加了在构造 `ImageryLayer` 时指定 `minimumTerrainLevel` 和 `maximumTerrainLevel` 的能力。该图层将仅针对指定范围内的地形瓦片显示。
- Added `Math.setRandomNumberSeed` and `Math.nextRandomNumber` for generating repeatable random numbers.
  添加了用于生成可重复随机数的 `Math.setRandomNumberSeed` 和 `Math.nextRandomNumber`。
- Added `Color.fromRandom` to generate random and partially random colors.
  添加了用于生成随机和部分随机颜色的 `Color.fromRandom`。
- Added an `onCancel` callback to `CameraFlightPath` functions that will be executed if the flight is canceled.
  为 `CameraFlightPath` 函数添加了 `onCancel` 回调，如果飞行被取消则将执行该回调。
- Added `Scene.debugShowFrustums` and `Scene.debugFrustumStatistics` for rendering debugging.
  添加了用于渲染调试的 `Scene.debugShowFrustums` 和 `Scene.debugFrustumStatistics`。
- Added `Packable` and `PackableForInterpolation` interfaces to aid interpolation and in-memory data storage. Also made most core Cesium types implement them.
  添加了 `Packable` 和 `PackableForInterpolation` 接口以辅助插值和内存数据存储。并让大多数 Cesium 核心类型实现了它们。
- Added `InterpolationAlgorithm` interface to codify the base interface already being used by `LagrangePolynomialApproximation`, `LinearApproximation`, and `HermitePolynomialApproximation`.
  添加了 `InterpolationAlgorithm` 接口，以形式化 `LagrangePolynomialApproximation`、`LinearApproximation` 和 `HermitePolynomialApproximation` 已经在使用的基础接口。
- Improved the performance of polygon triangulation using an O(n log n) algorithm.
  使用 O(n log n) 算法改进了多边形三角剖分的性能。
- Improved geometry batching performance by moving work to a web worker.
  通过将工作移至 Web Worker 提升了几何体批处理性能。
- Improved `WallGeometry` to follow the curvature of the earth.
  改进了 `WallGeometry` 以贴合地球曲率。
- Improved visual quality of closed translucent geometries.
  提升了闭合半透明几何体的视觉质量。
- Optimized polyline bounding spheres.
  优化了折线包围球。
- `Viewer` now automatically sets its clock to that of the first added `DataSource`, regardless of how it was added to the `DataSourceCollection`. Previously, this was only done for dropped files by `viewerDragDropMixin`.
  `Viewer` 现在会自动将其时钟设置为第一个添加的 `DataSource` 的时钟，无论它是如何添加到 `DataSourceCollection` 中的。此前仅由 `viewerDragDropMixin` 对拖放的文件执行此操作。
- `CesiumWidget` and `Viewer` now display an HTML error panel if an error occurs while rendering, which can be disabled with a constructor option.
  如果渲染过程中发生错误，`CesiumWidget` 和 `Viewer` 现在会显示 HTML 错误面板，可以通过构造函数选项禁用该面板。
- `CameraFlightPath` now automatically disables and restores mouse input for the flights it generates.
  `CameraFlightPath` 现在会自动为其生成的飞行禁用和恢复鼠标输入。
- Fixed broken surface rendering in Columbus View when using the `EllipsoidTerrainProvider`.
  修复了使用 `EllipsoidTerrainProvider` 时哥伦布视图中的地表渲染损坏问题。
- Fixed triangulation for polygons that cross the international date line.
  修复了跨越国际日界线的多边形的三角剖分问题。
- Fixed `EllipsoidPrimitive` rendering for some oblate ellipsoids. [#1067](https://github.com/CesiumGS/cesium/pull/1067).
  修复了某些扁椭球体的 `EllipsoidPrimitive` 渲染问题。[#1067](https://github.com/CesiumGS/cesium/pull/1067)。
- Fixed Cesium on Nexus 4 with Android 4.3.
  修复了在搭载 Android 4.3 的 Nexus 4 上的 Cesium 运行问题。
- Upgraded Knockout from version 2.2.1 to 2.3.0.
  将 Knockout 从版本 2.2.1 升级至 2.3.0。

## b19 - 2013-08-01

- Breaking changes:
  重大变更：
  - Replaced tessellators and meshes with geometry. In particular:
    使用几何体（geometry）替换了细分器（tessellator）和网格（mesh）。具体包括：
    - Replaced `CubeMapEllipsoidTessellator` with `EllipsoidGeometry`.
      将 `CubeMapEllipsoidTessellator` 替换为 `EllipsoidGeometry`。
    - Replaced `BoxTessellator` with `BoxGeometry`.
      将 `BoxTessellator` 替换为 `BoxGeometry`。
    - Replaced `ExtentTessleator` with `ExtentGeometry`.
      将 `ExtentTessleator` 替换为 `ExtentGeometry`。
    - Removed `PlaneTessellator`. It was incomplete and not used.
      移除了 `PlaneTessellator`。该类不完整且未被使用。
    - Renamed `MeshFilters` to `GeometryPipeline`.
      将 `MeshFilters` 重命名为 `GeometryPipeline`。
    - Renamed `MeshFilters.toWireframeInPlace` to `GeometryPipeline.toWireframe`.
      将 `MeshFilters.toWireframeInPlace` 重命名为 `GeometryPipeline.toWireframe`。
    - Removed `MeshFilters.mapAttributeIndices`. It was not used.
      移除了 `MeshFilters.mapAttributeIndices`。它未被使用。
    - Renamed `Context.createVertexArrayFromMesh` to `Context.createVertexArrayFromGeometry`. Likewise, renamed `mesh` constructor property to `geometry`.
      将 `Context.createVertexArrayFromMesh` 重命名为 `Context.createVertexArrayFromGeometry`。同样，将构造函数属性 `mesh` 重命名为 `geometry`。
  - Renamed `ComponentDatatype.*.toTypedArray` to `ComponentDatatype.*.createTypedArray`.
    将 `ComponentDatatype.*.toTypedArray` 重命名为 `ComponentDatatype.*.createTypedArray`。
  - Removed `Polygon.configureExtent`. Use `ExtentPrimitive` instead.
    移除了 `Polygon.configureExtent`。请改用 `ExtentPrimitive`。
  - Removed `Polygon.bufferUsage`. It is no longer needed.
    移除了 `Polygon.bufferUsage`。不再需要它。
  - Removed `height` and `textureRotationAngle` arguments from `Polygon` `setPositions` and `configureFromPolygonHierarchy` functions. Use `Polygon` `height` and `textureRotationAngle` properties.
    从 `Polygon` 的 `setPositions` 和 `configureFromPolygonHierarchy` 函数中移除了 `height` 和 `textureRotationAngle` 参数。请使用 `Polygon` 的 `height` 和 `textureRotationAngle` 属性。
  - Renamed `PolygonPipeline.cleanUp` to `PolygonPipeline.removeDuplicates`.
    将 `PolygonPipeline.cleanUp` 重命名为 `PolygonPipeline.removeDuplicates`。
  - Removed `PolygonPipeline.wrapLongitude`. Use `GeometryPipeline.wrapLongitude` instead.
    移除了 `PolygonPipeline.wrapLongitude`。请改用 `GeometryPipeline.wrapLongitude`。
  - Added `surfaceHeight` parameter to `BoundingSphere.fromExtent3D`.
    为 `BoundingSphere.fromExtent3D` 添加了 `surfaceHeight` 参数。
  - Added `surfaceHeight` parameter to `Extent.subsample`.
    为 `Extent.subsample` 添加了 `surfaceHeight` 参数。
  - Renamed `pointInsideTriangle2D` to `pointInsideTriangle`.
    将 `pointInsideTriangle2D` 重命名为 `pointInsideTriangle`。
  - Renamed `getLogo` to `getCredit` for `ImageryProvider` and `TerrainProvider`.
    将 `ImageryProvider` 和 `TerrainProvider` 的 `getLogo` 重命名为 `getCredit`。
- Added Geometry and Appearances [#911](https://github.com/CesiumGS/cesium/pull/911).
  添加了几何体与外观（Geometry and Appearances）[#911](https://github.com/CesiumGS/cesium/pull/911)。
- Added property `intersectionWidth` to `DynamicCone`, `DynamicPyramid`, `CustomSensorVolume`, and `RectangularPyramidSensorVolume`.
  为 `DynamicCone`、`DynamicPyramid`、`CustomSensorVolume` 和 `RectangularPyramidSensorVolume` 添加了 `intersectionWidth` 属性。
- Added `ExtentPrimitive`.
  添加了 `ExtentPrimitive`。
- Added `PolylinePipeline.removeDuplicates`.
  添加了 `PolylinePipeline.removeDuplicates`。
- Added `barycentricCoordinates` to compute the barycentric coordinates of a point in a triangle.
  添加了 `barycentricCoordinates` 以计算三角形内某点的重心坐标。
- Added `BoundingSphere.fromEllipsoid`.
  添加了 `BoundingSphere.fromEllipsoid`。
- Added `BoundingSphere.projectTo2D`.
  添加了 `BoundingSphere.projectTo2D`。
- Added `Extent.fromDegrees`.
  添加了 `Extent.fromDegrees`。
- Added `czm_tangentToEyeSpaceMatrix` built-in GLSL function.
  添加了 `czm_tangentToEyeSpaceMatrix` 内置 GLSL 函数。
- Added debugging aids for low-level rendering: `DrawCommand.debugShowBoundingVolume` and `Scene.debugCommandFilter`.
  添加了底层渲染调试辅助功能：`DrawCommand.debugShowBoundingVolume` 和 `Scene.debugCommandFilter`。
- Added extrusion to `ExtentGeometry`.
  为 `ExtentGeometry` 添加了拉伸（extrusion）支持。
- Added `Credit` and `CreditDisplay` for displaying credits on the screen.
  添加了用于在屏幕上显示版权信息的 `Credit` 和 `CreditDisplay`。
- Improved performance and visual quality of `CustomSensorVolume` and `RectangularPyramidSensorVolume`.
  提升了 `CustomSensorVolume` 和 `RectangularPyramidSensorVolume` 的性能与视觉质量。
- Improved the performance of drawing polygons created with `configureFromPolygonHierarchy`.
  提升了绘制通过 `configureFromPolygonHierarchy` 创建的多边形的性能。

## b18 - 2013-07-01

- Breaking changes:
  重大变更：
  - Removed `CesiumViewerWidget` and replaced it with a new `Viewer` widget with mixin architecture. This new widget does not depend on Dojo and is part of the combined Cesium.js file. It is intended to be a flexible base widget for easily building robust applications. ([#838](https://github.com/CesiumGS/cesium/pull/838))
    移除了 `CesiumViewerWidget`，并替换为采用混入（mixin）架构的全新 `Viewer` 部件。该新部件不依赖 Dojo，且已包含在合并后的 Cesium.js 文件中。它旨在作为一个灵活的基础部件，便于轻松构建稳健的应用程序。([#838](https://github.com/CesiumGS/cesium/pull/838))
  - Changed all widgets to use ECMAScript 5 properties. All public observable properties now must be accessed and assigned as if they were normal properties, instead of being called as functions. For example:
    将所有部件更改为使用 ECMAScript 5 属性。所有公共可观察属性现在必须像普通属性一样进行访问和赋值，而不再作为函数调用。例如：
    - `clockViewModel.shouldAnimate()` -> `clockViewModel.shouldAnimate`
    - `clockViewModel.shouldAnimate(true);` -> `clockViewModel.shouldAnimate = true;`
  - `ImageryProviderViewModel.fromConstants` has been removed. Use the `ImageryProviderViewModel` constructor directly.
    移除了 `ImageryProviderViewModel.fromConstants`。请直接使用 `ImageryProviderViewModel` 构造函数。
  - Renamed the `transitioner` property on `CesiumWidget`, `HomeButton`, and `ScreenModePicker` to `sceneTransitioner` to be consistent with property naming convention.
    将 `CesiumWidget`、`HomeButton` 和 `ScreenModePicker` 上的 `transitioner` 属性重命名为 `sceneTransitioner`，以与属性命名惯例保持一致。
  - `ImageryProvider.loadImage` now requires that the calling imagery provider instance be passed as its first parameter.
    `ImageryProvider.loadImage` 现在要求将调用它的影像提供者实例作为其第一个参数传入。
  - Removed the Dojo-based `checkForChromeFrame` function, and replaced it with a new standalone version that returns a promise to signal when the asynchronous check has completed.
    移除了基于 Dojo 的 `checkForChromeFrame` 函数，并替换为新的独立版本，该版本返回一个 promise 以在异步检查完成时发出信号。
  - Removed `Assets/Textures/NE2_LR_LC_SR_W_DR_2048.jpg`. If you were previously using this image with `SingleTileImageryProvider`, consider instead using `TileMapServiceImageryProvider` with a URL of `Assets/Textures/NaturalEarthII`.
    移除了 `Assets/Textures/NE2_LR_LC_SR_W_DR_2048.jpg`。如果您此前配合 `SingleTileImageryProvider` 使用此图像，请考虑改用 URL 为 `Assets/Textures/NaturalEarthII` 的 `TileMapServiceImageryProvider`。
  - The `Client CZML` SandCastle demo has been removed, largely because it is redundant with the Simple CZML demo.
    移除了 `Client CZML` SandCastle 示例，主要是因为它与 Simple CZML 示例重复。
  - The `Two Viewer Widgets` SandCastle demo has been removed. We will add back a multi-scene example when we have a good architecture for it in place.
    移除了 `Two Viewer Widgets` SandCastle 示例。在我们搭建好完善的架构后，会重新添加多场景示例。
  - Changed static `clone` functions in all objects such that if the object being cloned is undefined, the function will return undefined instead of throwing an exception.
    更改了所有对象中的静态 `clone` 函数，使得如果要克隆的对象为 undefined，函数将返回 undefined 而不是抛出异常。
- Fix resizing issues in `CesiumWidget` ([#608](https://github.com/CesiumGS/cesium/issues/608), [#834](https://github.com/CesiumGS/cesium/issues/834)).
  修复了 `CesiumWidget` 中的尺寸调整问题（[#608](https://github.com/CesiumGS/cesium/issues/608)、[#834](https://github.com/CesiumGS/cesium/issues/834)）。
- Added initial support for [GeoJSON](http://www.geojson.org/) and [TopoJSON](https://github.com/mbostock/topojson). ([#890](https://github.com/CesiumGS/cesium/pull/890), [#906](https://github.com/CesiumGS/cesium/pull/906))
  添加了对 [GeoJSON](http://www.geojson.org/) 和 [TopoJSON](https://github.com/mbostock/topojson) 的初步支持。([#890](https://github.com/CesiumGS/cesium/pull/890)，[#906](https://github.com/CesiumGS/cesium/pull/906))
- Added rotation, aligned axis, width, and height properties to `Billboard`s.
  为 `Billboard` 添加了 rotation、aligned axis、width 和 height 属性。
- Improved the performance of "missing tile" checking, especially for Bing imagery.
  提升了“缺失瓦片”检查的性能，尤其是对 Bing 影像。
- Improved the performance of terrain and imagery refinement, especially when using a mixture of slow and fast imagery sources.
  提升了地形和影像精细化加载（refinement）的性能，尤其是在混合使用快慢不同的影像源时。
- `TileMapServiceImageryProvider` now supports imagery with a minimum level. This improves compatibility with tile sets generated by MapTiler or gdal2tiles.py using their default settings.
  `TileMapServiceImageryProvider` 现在支持具有最小层级（minimum level）的影像。这改进了与 MapTiler 或 gdal2tiles.py 默认设置生成的瓦片集的兼容性。
- Added `Context.getAntialias`.
  添加了 `Context.getAntialias`。
- Improved test robustness on Mac.
  提升了 Mac 平台上的测试稳健性。
- Upgraded RequireJS to version 2.1.6, and Almond to 0.2.5.
  将 RequireJS 升级至版本 2.1.6，将 Almond 升级至 0.2.5。
- Fixed artifacts that showed up on the edges of imagery tiles on a number of GPUs.
  修复了在许多 GPU 上影像瓦片边缘出现的伪影问题。
- Fixed an issue in `BaseLayerPicker` where destroy wasn't properly cleaning everything up.
  修复了 `BaseLayerPicker` 中 destroy 未能正确清理所有内容的问题。
- Added the ability to unsubscribe to `Timeline` update event.
  添加了退订 `Timeline` 更新事件的功能。
- Added a `screenSpaceEventHandler` property to `CesiumWidget`. Also added a `sceneMode` option to the constructor to set the initial scene mode.
  为 `CesiumWidget` 添加了 `screenSpaceEventHandler` 属性。并在构造函数中添加了 `sceneMode` 选项以设置初始场景模式。
- Added `useDefaultRenderLoop` property to `CesiumWidget` that allows the default render loop to be disabled so that a custom render loop can be used.
  为 `CesiumWidget` 添加了 `useDefaultRenderLoop` 属性，允许禁用默认渲染循环以便使用自定义渲染循环。
- Added `CesiumWidget.onRenderLoopError` which is an `Event` that is raised if an exception is generated inside of the default render loop.
  添加了 `CesiumWidget.onRenderLoopError`，该事件在默认渲染循环内部抛出异常时触发。
- `ImageryProviderViewModel.creationCommand` can now return an array of ImageryProvider instances, which allows adding multiple layers when a single item is selected in the `BaseLayerPicker` widget.
  `ImageryProviderViewModel.creationCommand` 现在可以返回 ImageryProvider 实例数组，从而允许在 `BaseLayerPicker` 部件中选择单个项目时添加多个图层。

## b17 - 2013-06-03

- Breaking changes:
  重大变更：
  - Replaced `Uniform.getFrameNumber` and `Uniform.getTime` with `Uniform.getFrameState`, which returns the full frame state.
    将 `Uniform.getFrameNumber` 和 `Uniform.getTime` 替换为返回完整帧状态的 `Uniform.getFrameState`。
  - Renamed `Widgets/Fullscreen` folder to `Widgets/FullscreenButton` along with associated objects/files.
    将 `Widgets/Fullscreen` 文件夹以及关联的对象/文件重命名为 `Widgets/FullscreenButton`。
    - `FullscreenWidget` -> `FullscreenButton`
    - `FullscreenViewModel` -> `FullscreenButtonViewModel`
  - Removed `addAttribute`, `removeAttribute`, and `setIndexBuffer` from `VertexArray`. They were not used.
    从 `VertexArray` 中移除了 `addAttribute`、`removeAttribute` 和 `setIndexBuffer`。它们未被使用。
- Added support for approximating local vertical, local horizontal (LVLH) reference frames when using `DynamicObjectView` in 3D. The object automatically selects LVLH or EastNorthUp based on the object's velocity.
  添加了在 3D 中使用 `DynamicObjectView` 时近似局部垂直局部水平（LVLH）参考系的支持。该对象根据其速度自动选择 LVLH 或东北天（EastNorthUp）参考系。
- Added support for CZML defined vectors via new `CzmlDirection`, `DynamicVector`, and `DynamicVectorVisualizer` objects.
  通过新的 `CzmlDirection`、`DynamicVector` 和 `DynamicVectorVisualizer` 对象添加了对 CZML 定义向量的支持。
- Added `SceneTransforms.wgs84ToWindowCoordinates`. [#746](https://github.com/CesiumGS/cesium/issues/746).
  添加了 `SceneTransforms.wgs84ToWindowCoordinates`。[#746](https://github.com/CesiumGS/cesium/issues/746)。
- Added `fromElements` to `Cartesian2`, `Cartesian3`, and `Cartesian4`.
  为 `Cartesian2`、`Cartesian3` 和 `Cartesian4` 添加了 `fromElements`。
- Added `DrawCommand.cull` to avoid redundant visibility checks.
  添加了 `DrawCommand.cull` 以避免多余的可见性检查。
- Added `czm_morphTime` automatic GLSL uniform.
  添加了 `czm_morphTime` 自动 GLSL uniform。
- Added support for [OES_vertex_array_object](http://www.khronos.org/registry/webgl/extensions/OES_vertex_array_object/), which improves rendering performance.
  添加了对 [OES_vertex_array_object](http://www.khronos.org/registry/webgl/extensions/OES_vertex_array_object/) 的支持，提升了渲染性能。
- Added support for floating-point textures.
  添加了对浮点纹理（floating-point textures）的支持。
- Added `IntersectionTests.trianglePlaneIntersection`.
  添加了 `IntersectionTests.trianglePlaneIntersection`。
- Added `computeHorizonCullingPoint`, `computeHorizonCullingPointFromVertices`, and `computeHorizonCullingPointFromExtent` methods to `EllipsoidalOccluder` and used them to build a more accurate horizon occlusion test for terrain rendering.
  为 `EllipsoidalOccluder` 添加了 `computeHorizonCullingPoint`、`computeHorizonCullingPointFromVertices` 和 `computeHorizonCullingPointFromExtent` 方法，并利用它们为地形渲染构建了更精确的地平线遮挡剔除测试（horizon occlusion test）。
- Added sun visualization. See `Sun` and `Scene.sun`.
  添加了太阳可视化。参见 `Sun` 和 `Scene.sun`。
- Added a new `HomeButton` widget for returning to the default view of the current scene mode.
  添加了新的 `HomeButton` 部件，用于返回当前场景模式的默认视图。
- Added `Command.beforeExecute` and `Command.afterExecute` events to enable additional processing when a command is executed.
  添加了 `Command.beforeExecute` 和 `Command.afterExecute` 事件，以在命令执行时进行额外处理。
- Added rotation parameter to `Polygon.configureExtent`.
  为 `Polygon.configureExtent` 添加了 `rotation` 参数。
- Added camera flight to extents. See new methods `CameraController.getExtentCameraCoordinates` and `CameraFlightPath.createAnimationExtent`.
  添加了相机飞行至指定范围（extent）的功能。参见新方法 `CameraController.getExtentCameraCoordinates` 和 `CameraFlightPath.createAnimationExtent`。
- Improved the load ordering of terrain and imagery tiles, so that relevant detail is now more likely to be loaded first.
  改进了地形和影像瓦片的加载顺序，使得相关细节现在更有可能被优先加载。
- Improved appearance of the Polyline arrow material.
  改进了折线箭头材质（Polyline arrow material）的外观。
- Fixed polyline clipping artifact. [#728](https://github.com/CesiumGS/cesium/issues/728).
  修复了折线裁剪伪影问题。[#728](https://github.com/CesiumGS/cesium/issues/728)。
- Fixed polygon crossing International Date Line for 2D and Columbus view. [#99](https://github.com/CesiumGS/cesium/issues/99).
  修复了 2D 和哥伦布视图中多边形跨越国际日界线的问题。[#99](https://github.com/CesiumGS/cesium/issues/99)。
- Fixed issue for camera flights when `frameState.mode === SceneMode.MORPHING`.
  修复了当 `frameState.mode === SceneMode.MORPHING` 时的相机飞行问题。
- Fixed ISO8601 date parsing when UTC offset is specified in the extended format, such as `2008-11-10T14:00:00+02:30`.
  修复了以扩展格式指定 UTC 偏移量时的 ISO8601 日期解析问题，例如 `2008-11-10T14:00:00+02:30`。

## b16 - 2013-05-01

- Breaking changes:
  重大变更：
  - Removed the color, outline color, and outline width properties of polylines. Instead, use materials for polyline color and outline properties. Code that looked like:
    移除了折线的 color、outline color 和 outline width 属性。改用材质来设置折线的颜色和轮廓属性。例如，如下代码：

           var polyline = polylineCollection.add({
               positions : positions,
               color : new Color(1.0, 1.0, 1.0, 1.0),
               outlineColor : new Color(1.0, 0.0, 0.0, 1.0),
               width : 1.0,
               outlineWidth : 3.0
           });

    should now look like:
    现在应写为：

           var outlineMaterial = Material.fromType(context, Material.PolylineOutlineType);
           outlineMaterial.uniforms.color = new Color(1.0, 1.0, 1.0, 1.0);
           outlineMaterial.uniforms.outlineColor = new Color(1.0, 0.0, 0.0, 1.0);
           outlineMaterial.uniforms.outlinewidth = 2.0;

           var polyline = polylineCollection.add({
               positions : positions,
               width : 3.0,
               material : outlineMaterial
           });

  - `CzmlCartographic` has been removed and all cartographic values are converted to Cartesian internally during CZML processing. This improves performance and fixes interpolation of cartographic source data. The Cartographic representation can still be retrieved if needed.
    移除了 `CzmlCartographic`，所有地理制图坐标值（cartographic values）在 CZML 处理期间内部转换为笛卡尔坐标（Cartesian）。这提升了性能并修复了源地理制图数据的插值问题。如果需要，仍可获取 Cartographic 表示。
  - Removed `ComplexConicSensorVolume`, which was not documented and did not work on most platforms. It will be brought back in a future release. This does not affect CZML, which uses a custom sensor to approximate a complex conic.
    移除了未记录在文档中且在大多数平台上无法工作的 `ComplexConicSensorVolume`。它将在未来版本中重新引入。这不影响 CZML，CZML 使用自定义传感器来近似复杂圆锥体。
  - Replaced `computeSunPosition` with `Simon1994PlanetaryPosition`, which has functions to calculate the position of the sun and the moon more accurately.
    将 `computeSunPosition` 替换为 `Simon1994PlanetaryPosition`，该模块提供了能更精确计算太阳和月球位置的函数。
  - Removed `Context.createClearState`. These properties are now part of `ClearCommand`.
    移除了 `Context.createClearState`。这些属性现在是 `ClearCommand` 的一部分。
  - `RenderState` objects returned from `Context.createRenderState` are now immutable.
    从 `Context.createRenderState` 返回的 `RenderState` 对象现在是不可变的（immutable）。
  - Removed `positionMC` from `czm_materialInput`. It is no longer used by any materials.
    从 `czm_materialInput` 中移除了 `positionMC`。它不再被任何材质使用。

- Added wide polylines that work with and without ANGLE.
  添加了无论是否使用 ANGLE 均可工作的粗折线（wide polylines）。
- Polylines now use materials to describe their surface appearance. See the [Fabric](https://github.com/CesiumGS/cesium/wiki/Fabric) wiki page for more details on how to create materials.
  折线现在使用材质来描述其表面外观。有关如何创建材质的更多详细信息，请参阅 [Fabric](https://github.com/CesiumGS/cesium/wiki/Fabric) wiki 页面。
- Added new `PolylineOutline`, `PolylineGlow`, `PolylineArrow`, and `Fade` materials.
  添加了新的 `PolylineOutline`、`PolylineGlow`、`PolylineArrow` 和 `Fade` 材质。
- Added `czm_pixelSizeInMeters` automatic GLSL uniform.
  添加了 `czm_pixelSizeInMeters` 自动 GLSL uniform。
- Added `AnimationViewModel.snapToTicks`, which when set to true, causes the shuttle ring on the Animation widget to snap to the defined tick values, rather than interpolate between them.
  添加了 `AnimationViewModel.snapToTicks`，当设置为 true 时，会使动画部件上的飞梭旋钮（shuttle ring）吸附到定义的刻度值，而不是在它们之间插值。
- Added `Color.toRgba` and `Color.fromRgba` to convert to/from numeric unsigned 32-bit RGBA values.
  添加了 `Color.toRgba` 和 `Color.fromRgba`，用于与数值型无符号 32 位 RGBA 值之间进行相互转换。
- Added `GridImageryProvider` for custom rendering effects and debugging.
  添加了用于自定义渲染效果和调试的 `GridImageryProvider`。
- Added new `Grid` material.
  添加了新的 `Grid` 材质。
- Made `EllipsoidPrimitive` double-sided.
  使 `EllipsoidPrimitive` 支持双面渲染。
- Improved rendering performance by minimizing WebGL state calls.
  通过最小化 WebGL 状态调用提升了渲染性能。
- Fixed an error in Web Worker creation when loading Cesium.js from a different origin.
  修复了从不同源（different origin）加载 Cesium.js 时 Web Worker 创建报错的问题。
- Fixed `EllipsoidPrimitive` picking and picking objects with materials that have transparent parts.
  修复了 `EllipsoidPrimitive` 拾取以及拾取带有透明部分材质的对象的问题。
- Fixed imagery smearing artifacts on mobile devices and other devices without high-precision fragment shaders.
  修复了在移动设备及其他缺少高精度片段着色器的设备上的影像涂抹（smearing）伪影。

## b15 - 2013-04-01

- Breaking changes:
  重大变更：
  - `Billboard.computeScreenSpacePosition` now takes `Context` and `FrameState` arguments instead of a `UniformState` argument.
    `Billboard.computeScreenSpacePosition` 现在接收 `Context` 和 `FrameState` 参数，而非 `UniformState` 参数。
  - Removed `clampToPixel` property from `BillboardCollection` and `LabelCollection`. This option is no longer needed due to overall LabelCollection visualization improvements.
    从 `BillboardCollection` 和 `LabelCollection` 中移除了 `clampToPixel` 属性。由于 LabelCollection 可视化的整体改进，不再需要此选项。
  - Removed `Widgets/Dojo/CesiumWidget` and replaced it with `Widgets/CesiumWidget`, which has no Dojo dependencies.
    移除了 `Widgets/Dojo/CesiumWidget` 并替换为不依赖 Dojo 的 `Widgets/CesiumWidget`。
  - `destroyObject` no longer deletes properties from the object being destroyed.
    `destroyObject` 不再从正在销毁的对象中删除属性。
  - `darker.css` files have been deleted and the `darker` theme is now the default style for widgets. The original theme is now known as `lighter` and is in corresponding `lighter.css` files.
    删除了 `darker.css` 文件，`darker` 主题现在是部件的默认样式。原先的主题现在被称为 `lighter`，位于相应的 `lighter.css` 文件中。
  - CSS class names have been standardized to avoid potential collisions. All widgets now follow the same pattern, `cesium-<widget>-<className>`.
    标准化了 CSS 类名以避免潜在命名冲突。所有部件现在遵循相同的模式：`cesium-<widget>-<className>`。
  - Removed `view2D`, `view3D`, and `viewColumbus` properties from `CesiumViewerWidget`. Use the `sceneTransitioner` property instead.
    从 `CesiumViewerWidget` 中移除了 `view2D`、`view3D` 和 `viewColumbus` 属性。请改用 `sceneTransitioner` 属性。
- Added `BoundingSphere.fromCornerPoints`.
  添加了 `BoundingSphere.fromCornerPoints`。
- Added `fromArray` and `distance` functions to `Cartesian2`, `Cartesian3`, and `Cartesian4`.
  为 `Cartesian2`、`Cartesian3` 和 `Cartesian4` 添加了 `fromArray` 和 `distance` 函数。
- Added `DynamicPath.resolution` property for setting the maximum step size, in seconds, to take when sampling a position for path visualization.
  添加了 `DynamicPath.resolution` 属性，用于设置路径可视化采样位置时的最大步长（以秒为单位）。
- Added `TileCoordinatesImageryProvider` that renders imagery with tile X, Y, Level coordinates on the surface of the globe. This is mostly useful for debugging.
  添加了 `TileCoordinatesImageryProvider`，可在地球表面渲染带有瓦片 X、Y、Level 坐标的影像。这主要用于调试。
- Added `DynamicEllipse` and `DynamicObject.ellipse` property to render CZML ellipses on the globe.
  添加了 `DynamicEllipse` 和 `DynamicObject.ellipse` 属性以在地球上渲染 CZML 椭圆。
- Added `sampleTerrain` function to sample the terrain height of a list of `Cartographic` positions.
  添加了 `sampleTerrain` 函数以对一组 `Cartographic` 位置的地形高度进行采样。
- Added `DynamicObjectCollection.removeObject` and handling of the new CZML `delete` property.
  添加了 `DynamicObjectCollection.removeObject` 以及对新 CZML `delete` 属性的处理。
- Imagery layers with an `alpha` of exactly 0.0 are no longer rendered. Previously these invisible layers were rendered normally, which was a waste of resources. Unlike the `show` property, imagery tiles in a layer with an `alpha` of 0.0 are still downloaded, so the layer will become visible more quickly when its `alpha` is increased.
  `alpha` 恰好为 0.0 的影像图层不再进行渲染。此前这些不可见的图层仍会正常渲染，造成了资源浪费。与 `show` 属性不同，`alpha` 为 0.0 的图层中的影像瓦片仍会被下载，因此当增加其 `alpha` 时，图层可以更快地显示出来。
- Added `onTransitionStart` and `onTransitionComplete` events to `SceneModeTransitioner`.
  为 `SceneModeTransitioner` 添加了 `onTransitionStart` 和 `onTransitionComplete` 事件。
- Added `SceneModePicker`; a new widget for morphing between scene modes.
  添加了 `SceneModePicker`；一个用于在不同场景模式之间变换切换的新部件。
- Added `BaseLayerPicker`; a new widget for switching among pre-configured base layer imagery providers.
  添加了 `BaseLayerPicker`；一个用于在预配置的基础图层影像提供者之间进行切换的新部件。

## b14 - 2013-03-01

- Breaking changes:
  重大变更：
  - Major refactoring of both animation and widgets systems as we move to an MVVM-like architecture for user interfaces.
    随着我们将用户界面迁移到类 MVVM 架构，对动画和部件系统进行了重大重构。
    - New `Animation` widget for controlling playback.
      用于控制回放的全新 `Animation` 部件。
    - AnimationController.js has been deleted.
      删除了 AnimationController.js。
    - `ClockStep.SYSTEM_CLOCK_DEPENDENT` was renamed to `ClockStep.SYSTEM_CLOCK_MULTIPLIER`.
      `ClockStep.SYSTEM_CLOCK_DEPENDENT` 重命名为 `ClockStep.SYSTEM_CLOCK_MULTIPLIER`。
    - `ClockStep.SYSTEM_CLOCK` was added to have the clock always match the system time.
      添加了 `ClockStep.SYSTEM_CLOCK` 使时钟始终与系统时间匹配。
    - `ClockRange.LOOP` was renamed to `ClockRange.LOOP_STOP` and now only loops in the forward direction.
      `ClockRange.LOOP` 重命名为 `ClockRange.LOOP_STOP`，现在仅正向循环。
    - `Clock.reverseTick` was removed, simply negate `Clock.multiplier` and pass it to `Clock.tick`.
      移除了 `Clock.reverseTick`，只需对 `Clock.multiplier` 取反并传递给 `Clock.tick` 即可。
    - `Clock.shouldAnimate` was added to indicate if `Clock.tick` should actually advance time.
      添加了 `Clock.shouldAnimate` 以指示 `Clock.tick` 是否应实际推进时间。
    - The Timeline widget was moved into the Widgets/Timeline subdirectory.
      Timeline 部件移至 Widgets/Timeline 子目录中。
    - `Dojo/TimelineWidget` was removed. You should use the non-toolkit specific Timeline widget directly.
      移除了 `Dojo/TimelineWidget`。您应直接使用不依赖特定工具包的 Timeline 部件。
  - Removed `CesiumViewerWidget.fullScreenElement`, instead use the `CesiumViewerWidget.fullscreen.viewModel.fullScreenElement` observable property.
    移除了 `CesiumViewerWidget.fullScreenElement`，请改用 `CesiumViewerWidget.fullscreen.viewModel.fullScreenElement` 可观察属性。
  - `IntersectionTests.rayPlane` now takes the new `Plane` type instead of separate `planeNormal` and `planeD` arguments.
    `IntersectionTests.rayPlane` 现在接收新的 `Plane` 类型，而非独立的 `planeNormal` 和 `planeD` 参数。
  - Renamed `ImageryProviderError` to `TileProviderError`.
    将 `ImageryProviderError` 重命名为 `TileProviderError`。
- Added support for global terrain visualization via `CesiumTerrainProvider`, `ArcGisImageServerTerrainProvider`, and `VRTheWorldTerrainProvider`. See the [Terrain Tutorial](http://cesiumjs.org/2013/02/15/Cesium-Terrain-Tutorial/) for more information.
  通过 `CesiumTerrainProvider`、`ArcGisImageServerTerrainProvider` 和 `VRTheWorldTerrainProvider` 添加了对全球地形可视化的支持。更多信息请参见[地形教程](http://cesiumjs.org/2013/02/15/Cesium-Terrain-Tutorial/)。
- Added `FullscreenWidget` which is a simple, single-button widget that toggles fullscreen mode of the specified element.
  添加了 `FullscreenWidget`，这是一个简单的单按钮部件，用于切换指定元素的全屏模式。
- Added interactive extent drawing to the `Picking` Sandcastle example.
  在 `Picking` Sandcastle 示例中添加了交互式范围绘制。
- Added `HeightmapTessellator` to create a mesh from a heightmap.
  添加了 `HeightmapTessellator` 以从高度图创建网格。
- Added `JulianDate.equals`.
  添加了 `JulianDate.equals`。
- Added `Plane` for representing the equation of a plane.
  添加了用于表示平面方程的 `Plane`。
- Added a line segment-plane intersection test to `IntersectionTests`.
  在 `IntersectionTests` 中添加了线段-平面相交测试。
- Improved the lighting used in 2D and Columbus View modes. In general, the surface lighting in these modes should look just like it does in 3D.
  改进了 2D 和哥伦布视图模式中使用的光照。总体而言，这些模式下的地表光照看起来应该与 3D 模式完全一致。
- Fixed an issue where a `PolylineCollection` with a model matrix other than the identity would be incorrectly rendered in 2D and Columbus view.
  修复了模型矩阵非单位矩阵的 `PolylineCollection` 在 2D 和哥伦布视图中渲染不正确的问题。
- Fixed an issue in the `ScreenSpaceCameraController` where disabled mouse events can cause the camera to be moved after being re-enabled.
  修复了 `ScreenSpaceCameraController` 中被禁用的鼠标事件在重新启用后可能导致相机发生移动的问题。

## b13 - 2013-02-01

- Breaking changes:
  重大变更：
  - The combined `Cesium.js` file and other required files are now created in `Build/Cesium` and `Build/CesiumUnminified` folders.
    合并后的 `Cesium.js` 文件及其他必需文件现在生成在 `Build/Cesium` 和 `Build/CesiumUnminified` 文件夹中。
  - The Web Worker files needed when using the combined `Cesium.js` file are now in a `Workers` subdirectory.
    使用合并后的 `Cesium.js` 文件时所需的 Web Worker 文件现在位于 `Workers` 子目录中。
  - Removed `erosion` property from `Polygon`, `ComplexConicSensorVolume`, `RectangularPyramidSensorVolume`, and `ComplexConicSensorVolume`. Use the new `Erosion` material. See the Sandbox Animation example.
    从 `Polygon`、`ComplexConicSensorVolume`、`RectangularPyramidSensorVolume` 和 `ComplexConicSensorVolume` 中移除了 `erosion` 属性。请使用新的 `Erosion` 材质。参见 Sandbox Animation 示例。
  - Removed `setRectangle` and `getRectangle` methods from `ViewportQuad`. Use the new `rectangle` property.
    从 `ViewportQuad` 中移除了 `setRectangle` 和 `getRectangle` 方法。请使用新的 `rectangle` 属性。
  - Removed `time` parameter from `Scene.initializeFrame`. Instead, pass the time to `Scene.render`.
    从 `Scene.initializeFrame` 中移除了 `time` 参数。改为将时间传递给 `Scene.render`。
- Added new `RimLighting` and `Erosion` materials. See the [Fabric](https://github.com/CesiumGS/cesium/wiki/Fabric) wiki page.
  添加了新的 `RimLighting` 和 `Erosion` 材质。参见 [Fabric](https://github.com/CesiumGS/cesium/wiki/Fabric) wiki 页面。
- Added `hue` and `saturation` properties to `ImageryLayer`.
  为 `ImageryLayer` 添加了 `hue`（色调）和 `saturation`（饱和度）属性。
- Added `czm_hue` and `czm_saturation` to adjust the hue and saturation of RGB colors.
  添加了 `czm_hue` 和 `czm_saturation` 以调整 RGB 颜色的色调和饱和度。
- Added `JulianDate.getDaysDifference` method.
  添加了 `JulianDate.getDaysDifference` 方法。
- Added `Transforms.computeIcrfToFixedMatrix` and `computeFixedToIcrfMatrix`.
  添加了 `Transforms.computeIcrfToFixedMatrix` 和 `computeFixedToIcrfMatrix`。
- Added `EarthOrientationParameters`, `EarthOrientationParametersSample`, `Iau2006XysData`, and `Iau2006XysDataSample` classes to `Core`.
  在 `Core` 中添加了 `EarthOrientationParameters`、`EarthOrientationParametersSample`、`Iau2006XysData` 和 `Iau2006XysDataSample` 类。
- CZML now supports the ability to specify positions in the International Celestial Reference Frame (ICRF), and inertial reference frame.
  CZML 现在支持在国际天球参考系（ICRF）和惯性参考系中指定位置。
- Fixed globe rendering on the Nexus 4 running Google Chrome Beta.
  修复了运行 Google Chrome Beta 的 Nexus 4 上的地球渲染问题。
- `ViewportQuad` now supports the material system. See the [Fabric](https://github.com/CesiumGS/cesium/wiki/Fabric) wiki page.
  `ViewportQuad` 现在支持材质系统。参见 [Fabric](https://github.com/CesiumGS/cesium/wiki/Fabric) wiki 页面。
- Fixed rendering artifacts in `EllipsoidPrimitive`.
  修复了 `EllipsoidPrimitive` 中的渲染伪影。
- Fixed an issue where streaming CZML would fail when changing material types.
  修复了在更改材质类型时流式传输 CZML 失败的问题。
- Updated Dojo from 1.7.2 to 1.8.4. Reminder: Cesium does not depend on Dojo but uses it for reference applications.
  将 Dojo 从 1.7.2 更新至 1.8.4。提示：Cesium 不依赖 Dojo，仅在参考应用程序中使用它。

## b12a - 2013-01-18

- Breaking changes:
  重大变更：
  - Renamed the `server` property to `url` when constructing a `BingMapsImageryProvider`. Likewise, renamed `BingMapsImageryProvider.getServer` to `BingMapsImageryProvider.getUrl`. Code that looked like
    构造 `BingMapsImageryProvider` 时将 `server` 属性重命名为 `url`。同样，将 `BingMapsImageryProvider.getServer` 重命名为 `BingMapsImageryProvider.getUrl`。例如，如下代码：

           var bing = new BingMapsImageryProvider({
               server : 'dev.virtualearth.net'
           });

    should now look like:
    现在应写为：

           var bing = new BingMapsImageryProvider({
               url : 'http://dev.virtualearth.net'
           });

  - Renamed `toCSSColor` to `toCssColorString`.
    将 `toCSSColor` 重命名为 `toCssColorString`。
  - Moved `minimumZoomDistance` and `maximumZoomDistance` from the `CameraController` to the `ScreenSpaceCameraController`.
    将 `minimumZoomDistance` 和 `maximumZoomDistance` 从 `CameraController` 移动到 `ScreenSpaceCameraController`。

- Added `fromCssColorString` to `Color` to create a `Color` instance from any CSS value.
  为 `Color` 添加了 `fromCssColorString`，以从任意 CSS 值创建 `Color` 实例。
- Added `fromHsl` to `Color` to create a `Color` instance from H, S, L values.
  为 `Color` 添加了 `fromHsl`，以从 H、S、L 值创建 `Color` 实例。
- Added `Scene.backgroundColor`.
  添加了 `Scene.backgroundColor`。
- Added `textureRotationAngle` parameter to `Polygon.setPositions` and `Polygon.configureFromPolygonHierarchy` to rotate textures on polygons.
  为 `Polygon.setPositions` 和 `Polygon.configureFromPolygonHierarchy` 添加了 `textureRotationAngle` 参数，以旋转多边形上的纹理。
- Added `Matrix3.fromRotationX`, `Matrix3.fromRotationY`, `Matrix3.fromRotationZ`, and `Matrix2.fromRotation`.
  添加了 `Matrix3.fromRotationX`、`Matrix3.fromRotationY`、`Matrix3.fromRotationZ` 和 `Matrix2.fromRotation`。
- Added `fromUniformScale` to `Matrix2`, `Matrix3`, and `Matrix4`.
  为 `Matrix2`、`Matrix3` 和 `Matrix4` 添加了 `fromUniformScale`。
- Added `fromScale` to `Matrix2`.
  为 `Matrix2` 添加了 `fromScale`。
- Added `multiplyByUniformScale` to `Matrix4`.
  为 `Matrix4` 添加了 `multiplyByUniformScale`。
- Added `flipY` property when calling `Context.createTexture2D` and `Context.createCubeMap`.
  调用 `Context.createTexture2D` 和 `Context.createCubeMap` 时添加了 `flipY` 属性。
- Added `MeshFilters.encodePosition` and `EncodedCartesian3.encode`.
  添加了 `MeshFilters.encodePosition` 和 `EncodedCartesian3.encode`。
- Fixed jitter artifacts with polygons.
  修复了多边形抖动伪影问题。
- Fixed camera tilt close to the `minimumZoomDistance`.
  修复了接近 `minimumZoomDistance` 时的相机倾斜问题。
- Fixed a bug that could lead to blue tiles when zoomed in close to the North and South poles.
  修复了放大接近南极和北极时可能导致出现蓝色瓦片的 bug。
- Fixed a bug where removing labels would remove the wrong label and ultimately cause a crash.
  修复了移除标签时会移除错误标签并最终导致崩溃的 bug。
- Worked around a bug in Firefox 18 preventing typed arrays from being transferred to or from Web Workers.
  规避了 Firefox 18 中阻止在 Web Worker 之间传输类型化数组的 bug。
- Upgraded RequireJS to version 2.1.2, and Almond to 0.2.3.
  将 RequireJS 升级至版本 2.1.2，将 Almond 升级至 0.2.3。
- Updated the default Bing Maps API key.
  更新了默认的 Bing Maps API key。

## b12 - 2013-01-03

- Breaking changes:
  重大变更：
  - Renamed `EventHandler` to `ScreenSpaceEventHandler`.
    将 `EventHandler` 重命名为 `ScreenSpaceEventHandler`。
  - Renamed `MouseEventType` to `ScreenSpaceEventType`.
    将 `MouseEventType` 重命名为 `ScreenSpaceEventType`。
  - Renamed `MouseEventType.MOVE` to `ScreenSpaceEventType.MOUSE_MOVE`.
    将 `MouseEventType.MOVE` 重命名为 `ScreenSpaceEventType.MOUSE_MOVE`。
  - Renamed `CameraEventHandler` to `CameraEventAggregator`.
    将 `CameraEventHandler` 重命名为 `CameraEventAggregator`。
  - Renamed all `*MouseAction` to `*InputAction` (including get, set, remove, etc).
    将所有 `*MouseAction` 重命名为 `*InputAction`（包括 get、set、remove 等）。
  - Removed `Camera2DController`, `CameraCentralBodyController`, `CameraColumbusViewController`, `CameraFlightController`, `CameraFreeLookController`, `CameraSpindleController`, and `CameraControllerCollection`. Common ways to modify the camera are through the `CameraController` object of the `Camera` and will work in all scene modes. The default camera handler is the `ScreenSpaceCameraController` object on the `Scene`.
    移除了 `Camera2DController`、`CameraCentralBodyController`、`CameraColumbusViewController`、`CameraFlightController`、`CameraFreeLookController`、`CameraSpindleController` 和 `CameraControllerCollection`。修改相机的常规方法是通过 `Camera` 的 `CameraController` 对象，该对象可在所有场景模式下工作。默认的相机处理器是 `Scene` 上的 `ScreenSpaceCameraController` 对象。
  - Changed default Natural Earth imagery to a 2K version of [Natural Earth II with Shaded Relief, Water, and Drainages](http://www.naturalearthdata.com/downloads/10m-raster-data/10m-natural-earth-2/). The previously used version did not include lakes and rivers. This replaced `Source/Assets/Textures/NE2_50M_SR_W_2048.jpg` with `Source/Assets/Textures/NE2_LR_LC_SR_W_DR_2048.jpg`.
    将默认的 Natural Earth 影像更改为 2K 分辨率的 [Natural Earth II with Shaded Relief, Water, and Drainages](http://www.naturalearthdata.com/downloads/10m-raster-data/10m-natural-earth-2/) 版本。此前使用的版本不包含湖泊和河流。此项修改将 `Source/Assets/Textures/NE2_50M_SR_W_2048.jpg` 替换为 `Source/Assets/Textures/NE2_LR_LC_SR_W_DR_2048.jpg`。
- Added pinch-zoom, pinch-twist, and pinch-tilt for touch-enabled browsers (particularly mobile browsers).
  为支持触摸的浏览器（尤其是移动端浏览器）添加了双指缩放（pinch-zoom）、双指旋转（pinch-twist）和双指倾斜（pinch-tilt）。
- Improved rendering support on Nexus 4 and Nexus 7 using Firefox.
  改进了在使用 Firefox 的 Nexus 4 和 Nexus 7 上的渲染支持。
- Improved camera flights.
  改进了相机飞行。
- Added Sandbox example using NASA's new [Black Marble](http://www.nasa.gov/mission_pages/NPP/news/earth-at-night.html) night imagery.
  添加了使用 NASA 全新 [Black Marble](http://www.nasa.gov/mission_pages/NPP/news/earth-at-night.html) 夜间影像的 Sandbox 示例。
- Added constrained z-axis by default to the Cesium widgets.
  在 Cesium 部件中默认添加了约束 z 轴。
- Upgraded Jasmine from version 1.1.0 to 1.3.0.
  将 Jasmine 从版本 1.1.0 升级至 1.3.0。
- Added `JulianDate.toIso8601`, which creates an ISO8601 compliant representation of a JulianDate.
  添加了 `JulianDate.toIso8601`，该方法创建符合 ISO8601 规范的 JulianDate 表示。
- The `Timeline` widget now properly displays leap seconds.
  `Timeline` 部件现在可以正确显示闰秒。

## b11 - 2012-12-03

- Breaking changes:
  重大变更：
  - Widget render loop now started by default. Startup code changed, see Sandcastle examples.
    部件渲染循环现在默认启动。启动代码已更改，参见 Sandcastle 示例。
  - Changed `Timeline.makeLabel` to take a `JulianDate` instead of a JavaScript date parameter.
    将 `Timeline.makeLabel` 更改为接收 `JulianDate` 而非 JavaScript 日期参数。
  - Default Earth imagery has been moved to a new package `Assets`. Images used by `Sandcastle` examples have been moved to the Sandcastle folder, and images used by the Dojo widgets are now self-contained in the `Widgets` package.
    默认地球影像已移动到新的 `Assets` 包中。`Sandcastle` 示例使用的图像已移至 Sandcastle 文件夹，Dojo 部件使用的图像现在独立包含在 `Widgets` 包中。
  - `positionToEyeEC` in `czm_materialInput` is no longer normalized by default.
    `czm_materialInput` 中的 `positionToEyeEC` 默认不再归一化。
  - `FullScreen` and related functions have been renamed to `Fullscreen` to match the W3C standard name.
    将 `FullScreen` 及相关函数重命名为 `Fullscreen`，以符合 W3C 标准名称。
  - `Fullscreen.isFullscreenEnabled` was incorrectly implemented in certain browsers. `isFullscreenEnabled` now correctly determines whether the browser will allow an element to go fullscreen. A new `isFullscreen` function is available to determine if the browser is currently in fullscreen mode.
    `Fullscreen.isFullscreenEnabled` 在某些浏览器中的实现不正确。`isFullscreenEnabled` 现在可以正确判断浏览器是否允许元素进入全屏。提供了新的 `isFullscreen` 函数来确定浏览器当前是否处于全屏模式。
  - `Fullscreen.getFullScreenChangeEventName` and `Fullscreen.getFullScreenChangeEventName` now return the proper event name, suitable for use with the `addEventListener` API, instead prefixing them with "on".
    `Fullscreen.getFullScreenChangeEventName` 和 `Fullscreen.getFullScreenChangeEventName` 现在返回适合与 `addEventListener` API 一起使用的正确事件名称，而不再带有 "on" 前缀。
  - Removed `Scene.setSunPosition` and `Scene.getSunPosition`. The sun position used for lighting is automatically computed based on the scene's time.
    移除了 `Scene.setSunPosition` 和 `Scene.getSunPosition`。用于光照的太阳位置根据场景时间自动计算。
  - Removed a number of rendering options from `CentralBody`, including the ground atmosphere, night texture, specular map, cloud map, cloud shadows, and bump map. These features weren't really production ready and had a disproportionate cost in terms of shader complexity and compilation time. They may return in a more polished form in a future release.
    从 `CentralBody` 中移除了许多渲染选项，包括地面大气、夜间纹理、高光贴图、云层贴图、云层阴影和凹凸贴图。这些特性尚未真正达到生产就绪标准，并且在着色器复杂度和编译时间方面造成了不成比例的开销。它们可能会在未来版本中以更完善的形式回归。
  - Removed `affectedByLighting` property from `Polygon`, `EllipsoidPrimitive`, `RectangularPyramidSensorVolume`, `CustomSensorVolume`, and `ComplexConicSensorVolume`.
    从 `Polygon`、`EllipsoidPrimitive`、`RectangularPyramidSensorVolume`、`CustomSensorVolume` 和 `ComplexConicSensorVolume` 中移除了 `affectedByLighting` 属性。
  - Removed `DistanceIntervalMaterial`. This was not documented.
    移除了 `DistanceIntervalMaterial`。该类未记录在文档中。
  - `Matrix2.getElementIndex`, `Matrix3.getElementIndex`, and `Matrix4.getElementIndex` functions have had their parameters swapped and now take row first and column second. This is consistent with other class constants, such as Matrix2.COLUMN1ROW2.
    交换了 `Matrix2.getElementIndex`、`Matrix3.getElementIndex` 和 `Matrix4.getElementIndex` 函数的参数，现在先传行后传列。这与其他类常量（如 Matrix2.COLUMN1ROW2）保持一致。
  - Replaced `CentralBody.showSkyAtmosphere` with `Scene.skyAtmosphere` and `SkyAtmosphere`. This has no impact for those using the Cesium widget.
    将 `CentralBody.showSkyAtmosphere` 替换为 `Scene.skyAtmosphere` 和 `SkyAtmosphere`。这对使用 Cesium 部件的用户没有影响。
- Improved lighting in Columbus view and on polygons, ellipsoids, and sensors.
  改进了哥伦布视图中以及多边形、椭球体和传感器上的光照。
- Fixed atmosphere rendering artifacts and improved Columbus view transition.
  修复了大气渲染伪影并改进了哥伦布视图的过渡效果。
- Fixed jitter artifacts with billboards and polylines.
  修复了广告牌和折线的抖动伪影。
- Added `TileMapServiceImageryProvider`. See the Imagery Layers `Sandcastle` example.
  添加了 `TileMapServiceImageryProvider`。参见 Imagery Layers `Sandcastle` 示例。
- Added `Water` material. See the Materials `Sandcastle` example.
  添加了 `Water` 材质。参见 Materials `Sandcastle` 示例。
- Added `SkyBox` to draw stars. Added `CesiumWidget.showSkyBox` and `CesiumViewerWidget.showSkyBox`.
  添加了用于绘制星空的 `SkyBox`。添加了 `CesiumWidget.showSkyBox` 和 `CesiumViewerWidget.showSkyBox`。
- Added new `Matrix4` functions: `Matrix4.multiplyByTranslation`, `multiplyByPoint`, and `Matrix4.fromScale`. Added `Matrix3.fromScale`.
  添加了新的 `Matrix4` 函数：`Matrix4.multiplyByTranslation`、`multiplyByPoint` 和 `Matrix4.fromScale`。添加了 `Matrix3.fromScale`。
- Added `EncodedCartesian3`, which is used to eliminate jitter when drawing primitives.
  添加了 `EncodedCartesian3`，用于在绘制图元时消除抖动。
- Added new automatic GLSL uniforms: `czm_frameNumber`, `czm_temeToPseudoFixed`, `czm_entireFrustum`, `czm_inverseModel`, `czm_modelViewRelativeToEye`, `czm_modelViewProjectionRelativeToEye`, `czm_encodedCameraPositionMCHigh`, and `czm_encodedCameraPositionMCLow`.
  添加了新的自动 GLSL uniform：`czm_frameNumber`、`czm_temeToPseudoFixed`、`czm_entireFrustum`、`czm_inverseModel`、`czm_modelViewRelativeToEye`、`czm_modelViewProjectionRelativeToEye`、`czm_encodedCameraPositionMCHigh` 和 `czm_encodedCameraPositionMCLow`。
- Added `czm_translateRelativeToEye` and `czm_luminance` GLSL functions.
  添加了 `czm_translateRelativeToEye` 和 `czm_luminance` GLSL 函数。
- Added `shininess` to `czm_materialInput`.
  在 `czm_materialInput` 中添加了 `shininess`。
- Added `QuadraticRealPolynomial`, `CubicRealPolynomial`, and `QuarticRealPolynomial` for finding the roots of quadratic, cubic, and quartic polynomials.
  添加了用于求解二次、三次和四次多项式根的 `QuadraticRealPolynomial`、`CubicRealPolynomial` 和 `QuarticRealPolynomial`。
- Added `IntersectionTests.grazingAltitudeLocation` for finding a point on a ray nearest to an ellipsoid.
  添加了 `IntersectionTests.grazingAltitudeLocation` 以寻找射线上最接近椭球体的点。
- Added `mostOrthogonalAxis` function to `Cartesian2`, `Cartesian3`, and `Cartesian4`.
  为 `Cartesian2`、`Cartesian3` 和 `Cartesian4` 添加了 `mostOrthogonalAxis` 函数。
- Changed CesiumViewerWidget default behavior so that zooming to an object now requires a single left-click, rather than a double-click.
  更改了 CesiumViewerWidget 的默认行为，现在缩放到对象只需要单击左键，而不是双击。
- Updated third-party [Tween.js](https://github.com/sole/tween.js/).
  更新了第三方库 [Tween.js](https://github.com/sole/tween.js/)。

## b10 - 2012-11-02

- Breaking changes:
  重大变更：
  - Renamed `Texture2DPool` to `TexturePool`.
    将 `Texture2DPool` 重命名为 `TexturePool`。
  - Renamed `BingMapsTileProvider` to `BingMapsImageryProvider`.
    将 `BingMapsTileProvider` 重命名为 `BingMapsImageryProvider`。
  - Renamed `SingleTileProvider` to `SingleTileImageryProvider`.
    将 `SingleTileProvider` 重命名为 `SingleTileImageryProvider`。
  - Renamed `ArcGISTileProvider` to `ArcGisMapServerImageryProvider`.
    将 `ArcGISTileProvider` 重命名为 `ArcGisMapServerImageryProvider`。
  - Renamed `EquidistantCylindricalProjection` to `GeographicProjection`.
    将 `EquidistantCylindricalProjection` 重命名为 `GeographicProjection`。
  - Renamed `MercatorProjection` to `WebMercatorProjection`.
    将 `MercatorProjection` 重命名为 `WebMercatorProjection`。
  - `CentralBody.dayTileProvider` has been removed. Instead, add one or more imagery providers to the collection returned by `CentralBody.getImageryLayers()`.
    移除了 `CentralBody.dayTileProvider`。改为向 `CentralBody.getImageryLayers()` 返回的集合中添加一个或多个影像提供者。
  - The `description.generateTextureCoords` parameter passed to `ExtentTessellator.compute` is now called `description.generateTextureCoordinates`.
    传递给 `ExtentTessellator.compute` 的 `description.generateTextureCoords` 参数现在称为 `description.generateTextureCoordinates`。
  - Renamed `bringForward`, `sendBackward`, `bringToFront`, and `sendToBack` methods on `CompositePrimitive` to `raise`, `lower`, `raiseToTop`, and `lowerToBottom`, respectively.
    将 `CompositePrimitive` 上的 `bringForward`、`sendBackward`、`bringToFront` 和 `sendToBack` 方法分别重命名为 `raise`、`lower`、`raiseToTop` 和 `lowerToBottom`。
  - `Cache` and `CachePolicy` are no longer used and have been removed.
    `Cache` 和 `CachePolicy` 不再使用并已被移除。
  - Fixed problem with Dojo widget startup, and removed "postSetup" callback in the process. See Sandcastle examples and update your startup code.
    修复了 Dojo 部件启动的问题，并在此过程中移除了 "postSetup" 回调。参见 Sandcastle 示例并更新您的启动代码。
- `CentralBody` now allows imagery from multiple sources to be layered and alpha blended on the globe. See the new `Imagery Layers` and `Map Projections` Sandcastle examples.
  `CentralBody` 现在允许在地球上分层堆叠并 Alpha 混合来自多个数据源的影像。参见新的 `Imagery Layers` 和 `Map Projections` Sandcastle 示例。
- Added `WebMapServiceImageryProvider`.
  添加了 `WebMapServiceImageryProvider`。
- Improved middle mouse click behavior to always tilt in the same direction.
  改进了鼠标中键点击行为，使其始终向相同方向倾斜。
- Added `getElementIndex` to `Matrix2`, `Matrix3`, and `Matrix4`.
  为 `Matrix2`、`Matrix3` 和 `Matrix4` 添加了 `getElementIndex`。

## b9 - 2012-10-01

- Breaking changes:
  重大变更：
  - Removed the `render` and `renderForPick` functions of primitives. The primitive `update` function updates a list of commands for the renderer. For more details, see the [Data Driven Renderer](https://github.com/CesiumGS/cesium/wiki/Data-Driven-Renderer-Details).
    移除了图元的 `render` 和 `renderForPick` 函数。图元的 `update` 函数为渲染器更新命令列表。更多详情请参阅[数据驱动渲染器（Data Driven Renderer）](https://github.com/CesiumGS/cesium/wiki/Data-Driven-Renderer-Details)。
  - Removed `Context.getViewport` and `Context.setViewport`. The viewport defaults to the size of the canvas if a primitive does not override the viewport property in the render state.
    移除了 `Context.getViewport` 和 `Context.setViewport`。如果图元未覆盖渲染状态中的 viewport 属性，视口默认使用画布的尺寸。
  - `shallowEquals` has been removed.
    移除了 `shallowEquals`。
  - Passing `undefined` to any of the set functions on `Billboard` now throws an exception.
    向 `Billboard` 的任何 set 函数传入 `undefined` 现在都会抛出异常。
  - Passing `undefined` to any of the set functions on `Polyline` now throws an exception.
    向 `Polyline` 的任何 set 函数传入 `undefined` 现在都会抛出异常。
  - `PolygonPipeline.scaleToGeodeticHeight` now takes ellipsoid as the last parameter, instead of the first. It also now defaults to `Ellipsoid.WGS84` if no parameter is provided.
    `PolygonPipeline.scaleToGeodeticHeight` 现在接收 ellipsoid 作为最后一个参数，而不是第一个。如果未提供参数，现在默认使用 `Ellipsoid.WGS84`。
- The new Sandcastle live editor and demo gallery replace the Sandbox and Skeleton examples.
  全新的 Sandcastle 实时编辑器和演示示例库取代了 Sandbox 和 Skeleton 示例。
- Improved picking performance and accuracy.
  提高了拾取性能和精度。
- Added EllipsoidPrimitive for visualizing ellipsoids and spheres. Currently, this is only supported in 3D, not 2D or Columbus view.
  添加了用于可视化椭球体和球体的 EllipsoidPrimitive。目前仅在 3D 中支持，不支持 2D 或哥伦布视图。
- Added `DynamicEllipsoid` and `DynamicEllipsoidVisualizer` which use the new `EllipsoidPrimitive` to implement ellipsoids in CZML.
  添加了 `DynamicEllipsoid` 和 `DynamicEllipsoidVisualizer`，它们使用新的 `EllipsoidPrimitive` 在 CZML 中实现椭球体。
- `Extent` functions now take optional result parameters. Also added `getCenter`, `intersectWith`, and `contains` functions.
  `Extent` 函数现在接收可选的 result 参数。还添加了 `getCenter`、`intersectWith` 和 `contains` 函数。
- Add new utility class, `DynamicObjectView` for tracking a DynamicObject with the camera across scene modes; also hooked up CesiumViewerWidget to use it.
  添加了新的实用类 `DynamicObjectView`，用于在跨场景模式下使用相机跟踪 DynamicObject；并让 CesiumViewerWidget 使用了该类。
- Added `enableTranslate`, `enableZoom`, and `enableRotate` properties to `Camera2DController` to selectively toggle camera behavior. All values default to `true`.
  为 `Camera2DController` 添加了 `enableTranslate`、`enableZoom` 和 `enableRotate` 属性，以有选择性地切换相机行为。所有值默认为 `true`。
- Added `Camera2DController.setPositionCartographic` to simplify moving the camera programmatically when in 2D mode.
  添加了 `Camera2DController.setPositionCartographic` 以简化在 2D 模式下通过编程方式移动相机的操作。
- Improved near/far plane distances and eliminated z-fighting.
  优化了近/远裁剪平面距离并消除了深度冲突（z-fighting）。
- Added `Matrix4.multiplyByTranslation`, `Matrix4.fromScale`, and `Matrix3.fromScale`.
  添加了 `Matrix4.multiplyByTranslation`、`Matrix4.fromScale` 和 `Matrix3.fromScale`。

## b8 - 2012-09-05

- Breaking changes:
  重大变更：
  - Materials are now created through a centralized Material class using a JSON schema called [Fabric](https://github.com/CesiumGS/cesium/wiki/Fabric). For example, change:
    材质现在通过集中的 Material 类使用名为 [Fabric](https://github.com/CesiumGS/cesium/wiki/Fabric) 的 JSON 规范进行创建。例如，将：

          polygon.material = new BlobMaterial({repeat : 10.0});

    to:
    改为：

          polygon.material = Material.fromType(context, 'Blob');
          polygon.material.repeat = 10.0;

    or:
    或：

          polygon.material = new Material({
              context : context,
              fabric : {
                  type : 'Blob',
                  uniforms : {
                      repeat : 10.0
                  }
              }
          });

  - `Label.computeScreenSpacePosition` now requires the current scene state as a parameter.
    `Label.computeScreenSpacePosition` 现在需要当前场景状态作为参数。
  - Passing `undefined` to any of the set functions on `Label` now throws an exception.
    向 `Label` 的任何 set 函数传入 `undefined` 现在都会抛出异常。
  - Renamed `agi_` prefix on GLSL identifiers to `czm_`.
    将 GLSL 标识符上的 `agi_` 前缀重命名为 `czm_`。
  - Replaced `ViewportQuad` properties `vertexShader` and `fragmentShader` with optional constructor arguments.
    将 `ViewportQuad` 属性 `vertexShader` 和 `fragmentShader` 替换为可选的构造函数参数。
  - Changed the GLSL automatic uniform `czm_viewport` from an `ivec4` to a `vec4` to reduce casting.
    将 GLSL 自动 uniform `czm_viewport` 从 `ivec4` 更改为 `vec4` 以减少类型转换。
  - `Billboard` now defaults to an image index of `-1` indicating no texture, previously billboards defaulted to `0` indicating the first texture in the atlas. For example, change:
    `Billboard` 现在默认的图像索引为 `-1` 表示无纹理，之前广告牌默认为 `0` 表示图集中的第一个纹理。例如，将：

          billboards.add({
              position : { x : 1.0, y : 2.0, z : 3.0 },
          });

    to:
    改为：

          billboards.add({
              position : { x : 1.0, y : 2.0, z : 3.0 },
              imageIndex : 0
          });

  - Renamed `SceneState` to `FrameState`.
    将 `SceneState` 重命名为 `FrameState`。
  - `SunPosition` was changed from a static object to a function `computeSunPosition`; which now returns a `Cartesian3` with the computed position. It was also optimized for performance and memory pressure. For example, change:
    `SunPosition` 从静态对象更改为函数 `computeSunPosition`；该函数现在返回包含计算位置的 `Cartesian3`。它还针对性能和内存压力进行了优化。例如，将：

          var result = SunPosition.compute(date);
          var position = result.position;

        to:
        改为：

          var position = computeSunPosition(date);

- All `Quaternion` operations now have static versions that work with any objects exposing `x`, `y`, `z` and `w` properties.
  所有 `Quaternion` 操作现在都具有静态版本，可用于暴露了 `x`、`y`、`z` 和 `w` 属性的任何对象。
- Added support for nested polygons with holes. See `Polygon.configureFromPolygonHierarchy`.
  添加了对带孔嵌套多边形的支持。参见 `Polygon.configureFromPolygonHierarchy`。
- Added support to the renderer for view frustum and central body occlusion culling. All built-in primitives, such as `BillboardCollection`, `Polygon`, `PolylineCollection`, etc., can be culled. See the advanced examples in the Sandbox for details.
  为渲染器添加了视锥体和地表天体遮挡剔除（occlusion culling）支持。所有内置图元（如 `BillboardCollection`、`Polygon`、`PolylineCollection` 等）均可被剔除。详情参见 Sandbox 中的高级示例。
- Added `writeTextToCanvas` function which handles sizing the resulting canvas to fit the desired text.
  添加了 `writeTextToCanvas` 函数，用于调整生成画布的大小以适应所需文本。
- Added support for CZML path visualization via the `DynamicPath` and `DynamicPathVisualizer` objects. See the [CZML wiki](https://github.com/CesiumGS/cesium/wiki/CZML-Guide) for more details.
  通过 `DynamicPath` 和 `DynamicPathVisualizer` 对象添加了对 CZML 路径可视化的支持。更多详情参见 [CZML wiki](https://github.com/CesiumGS/cesium/wiki/CZML-Guide)。
- Added support for [WEBGL_depth_texture](http://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/). See `Framebuffer.setDepthTexture`.
  添加了对 [WEBGL_depth_texture](http://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/) 的支持。参见 `Framebuffer.setDepthTexture`。
- Added `CesiumMath.isPowerOfTwo`.
  添加了 `CesiumMath.isPowerOfTwo`。
- Added `affectedByLighting` to `ComplexConicSensorVolume`, `CustomSensorVolume`, and `RectangularPyramidSensorVolume` to turn lighting on/off for these objects.
  为 `ComplexConicSensorVolume`、`CustomSensorVolume` 和 `RectangularPyramidSensorVolume` 添加了 `affectedByLighting`，以开启/关闭这些对象的光照。
- CZML `Polygon`, `Cone`, and `Pyramid` objects are no longer affected by lighting.
  CZML `Polygon`、`Cone` 和 `Pyramid` 对象不再受光照影响。
- Added `czm_viewRotation` and `czm_viewInverseRotation` automatic GLSL uniforms.
  添加了 `czm_viewRotation` 和 `czm_viewInverseRotation` 自动 GLSL uniform。
- Added a `clampToPixel` property to `BillboardCollection` and `LabelCollection`. When true, it aligns all billboards and text to a pixel in screen space, providing a crisper image at the cost of jumpier motion.
  为 `BillboardCollection` 和 `LabelCollection` 添加了 `clampToPixel` 属性。为 true 时，会将所有广告牌和文本对齐到屏幕空间中的像素，以跳跃感移动为代价提供更清晰的图像。
- `Ellipsoid` functions now take optional result parameters.
  `Ellipsoid` 函数现在接收可选的 result 参数。

## b7 - 2012-08-01

- Breaking changes:
  重大变更：
  - Removed keyboard input handling from `EventHandler`.
    从 `EventHandler` 中移除了键盘输入处理。
  - `TextureAtlas` takes an object literal in its constructor instead of separate parameters. Code that previously looked like:
    `TextureAtlas` 构造函数接收对象字面量参数而非多个独立参数。此前类似如下的代码：

          context.createTextureAtlas(images, pixelFormat, borderWidthInPixels);

    should now look like:
    现在应写为：

          context.createTextureAtlas({images : images, pixelFormat : pixelFormat, borderWidthInPixels : borderWidthInPixels});

  - `Camera.pickEllipsoid` returns the picked position in world coordinates and the ellipsoid parameter is optional. Prefer the new `Scene.pickEllipsoid` method. For example, change
    `Camera.pickEllipsoid` 返回世界坐标下的拾取位置，且 ellipsoid 参数是可选的。推荐使用新的 `Scene.pickEllipsoid` 方法。例如，将：

          var position = camera.pickEllipsoid(ellipsoid, windowPosition);

    to:
    改为：

          var position = scene.pickEllipsoid(windowPosition, ellipsoid);

  - `Camera.getPickRay` now returns the new `Ray` type instead of an object with position and direction properties.
    `Camera.getPickRay` 现在返回新的 `Ray` 类型，而不是具有 position 和 direction 属性的对象。
  - `Camera.viewExtent` now takes an `Extent` argument instead of west, south, east and north arguments. Prefer `Scene.viewExtent` over `Camera.viewExtent`. `Scene.viewExtent` will work in any `SceneMode`. For example, change
    `Camera.viewExtent` 现在接收 `Extent` 参数，而非 west、south、east 和 north 参数。推荐使用 `Scene.viewExtent` 替代 `Camera.viewExtent`。`Scene.viewExtent` 适用于任何 `SceneMode`。例如，将：

          camera.viewExtent(ellipsoid, west, south, east, north);

    to:
    改为：

          scene.viewExtent(extent, ellipsoid);

  - `CameraSpindleController.mouseConstrainedZAxis` has been removed. Instead, use `CameraSpindleController.constrainedAxis`. Code that previously looked like:
    移除了 `CameraSpindleController.mouseConstrainedZAxis`。请改用 `CameraSpindleController.constrainedAxis`。此前类似如下的代码：

          spindleController.mouseConstrainedZAxis = true;

    should now look like:
    现在应写为：

          spindleController.constrainedAxis = Cartesian3.UNIT_Z;

  - The `Camera2DController` constructor and `CameraControllerCollection.add2D` now require a projection instead of an ellipsoid.
    `Camera2DController` 构造函数和 `CameraControllerCollection.add2D` 现在需要投影参数而非椭球体。
  - `Chain` has been removed. `when` is now included as a more complete CommonJS Promises/A implementation.
    移除了 `Chain`。现在引入了 `when` 作为更完整的 CommonJS Promises/A 实现。
  - `Jobs.downloadImage` was replaced with `loadImage` to provide a promise that will asynchronously load an image.
    将 `Jobs.downloadImage` 替换为 `loadImage`，提供一个异步加载图像的 promise。
  - `jsonp` now returns a promise for the requested data, removing the need for a callback parameter.
    `jsonp` 现在为请求的数据返回一个 promise，不再需要回调参数。
  - JulianDate.getTimeStandard() has been removed, dates are now always stored internally as TAI.
    移除了 JulianDate.getTimeStandard()，内部日期现在始终存储为国际原子时（TAI）。
  - LeapSeconds.setLeapSeconds now takes an array of LeapSecond instances instead of JSON.
    LeapSeconds.setLeapSeconds 现在接收 LeapSecond 实例数组而非 JSON。
  - TimeStandard.convertUtcToTai and TimeStandard.convertTaiToUtc have been removed as they are no longer needed.
    移除了不再需要的 TimeStandard.convertUtcToTai 和 TimeStandard.convertTaiToUtc。
  - `Cartesian3.prototype.getXY()` was replaced with `Cartesian2.fromCartesian3`. Code that previously looked like `cartesian3.getXY();` should now look like `Cartesian2.fromCartesian3(cartesian3);`.
    `Cartesian3.prototype.getXY()` 已被 `Cartesian2.fromCartesian3` 取代。此前类似 `cartesian3.getXY();` 的代码现在应写为 `Cartesian2.fromCartesian3(cartesian3);`。
  - `Cartesian4.prototype.getXY()` was replaced with `Cartesian2.fromCartesian4`. Code that previously looked like `cartesian4.getXY();` should now look like `Cartesian2.fromCartesian4(cartesian4);`.
    `Cartesian4.prototype.getXY()` 已被 `Cartesian2.fromCartesian4` 取代。此前类似 `cartesian4.getXY();` 的代码现在应写为 `Cartesian2.fromCartesian4(cartesian4);`。
  - `Cartesian4.prototype.getXYZ()` was replaced with `Cartesian3.fromCartesian4`. Code that previously looked like `cartesian4.getXYZ();` should now look like `Cartesian3.fromCartesian4(cartesian4);`.
    `Cartesian4.prototype.getXYZ()` 已被 `Cartesian3.fromCartesian4` 取代。此前类似 `cartesian4.getXYZ();` 的代码现在应写为 `Cartesian3.fromCartesian4(cartesian4);`。
  - `Math.angleBetween` was removed because it was a duplicate of `Cartesian3.angleBetween`. Simply replace calls of the former to the later.
    移除了 `Math.angleBetween`，因为它是 `Cartesian3.angleBetween` 的重复项。只需将前者的调用替换为后者即可。
  - `Cartographic3` was renamed to `Cartographic`.
    将 `Cartographic3` 重命名为 `Cartographic`。
  - `Cartographic2` was removed; use `Cartographic` instead.
    移除了 `Cartographic2`；请改用 `Cartographic`。
  - `Ellipsoid.toCartesian` was renamed to `Ellipsoid.cartographicToCartesian`.
    将 `Ellipsoid.toCartesian` 重命名为 `Ellipsoid.cartographicToCartesian`。
  - `Ellipsoid.toCartesians` was renamed to `Ellipsoid.cartographicArrayToCartesianArray`.
    将 `Ellipsoid.toCartesians` 重命名为 `Ellipsoid.cartographicArrayToCartesianArray`。
  - `Ellipsoid.toCartographic2` was renamed to `Ellipsoid.cartesianToCartographic`.
    将 `Ellipsoid.toCartographic2` 重命名为 `Ellipsoid.cartesianToCartographic`。
  - `Ellipsoid.toCartographic2s` was renamed to `Ellipsoid.cartesianArrayToCartographicArray`.
    将 `Ellipsoid.toCartographic2s` 重命名为 `Ellipsoid.cartesianArrayToCartographicArray`。
  - `Ellipsoid.toCartographic3` was renamed to `Ellipsoid.cartesianToCartographic`.
    将 `Ellipsoid.toCartographic3` 重命名为 `Ellipsoid.cartesianToCartographic`。
  - `Ellipsoid.toCartographic3s` was renamed to `Ellipsoid.cartesianArrayToCartographicArray`.
    将 `Ellipsoid.toCartographic3s` 重命名为 `Ellipsoid.cartesianArrayToCartographicArray`。
  - `Ellipsoid.cartographicDegreesToCartesian` was removed. Code that previously looked like `ellipsoid.cartographicDegreesToCartesian(new Cartographic(45, 50, 10))` should now look like `ellipsoid.cartographicToCartesian(Cartographic.fromDegrees(45, 50, 10))`.
    移除了 `Ellipsoid.cartographicDegreesToCartesian`。此前类似 `ellipsoid.cartographicDegreesToCartesian(new Cartographic(45, 50, 10))` 的代码现在应写为 `ellipsoid.cartographicToCartesian(Cartographic.fromDegrees(45, 50, 10))`。
  - `Math.cartographic3ToRadians`, `Math.cartographic2ToRadians`, `Math.cartographic2ToDegrees`, and `Math.cartographic3ToDegrees` were removed. These functions are no longer needed because Cartographic instances are always represented in radians.
    移除了 `Math.cartographic3ToRadians`、`Math.cartographic2ToRadians`、`Math.cartographic2ToDegrees` 和 `Math.cartographic3ToDegrees`。这些函数不再需要，因为 Cartographic 实例始终以弧度表示。
  - All functions starting with `multiplyWith` now start with `multiplyBy` to be consistent with functions starting with `divideBy`.
    所有以 `multiplyWith` 开头的函数现在均以 `multiplyBy` 开头，以与以 `divideBy` 开头的函数保持一致。
  - The `multiplyWithMatrix` function on each `Matrix` type was renamed to `multiply`.
    每个 `Matrix` 类型上的 `multiplyWithMatrix` 函数重命名为 `multiply`。
  - All three Matrix classes have been largely re-written for consistency and performance. The `values` property has been eliminated and Matrices are no longer immutable. Code that previously looked like `matrix = matrix.setColumn0Row0(12);` now looks like `matrix[Matrix2.COLUMN0ROW0] = 12;`. Code that previously looked like `matrix.setColumn3(cartesian3);` now looked like `matrix.setColumn(3, cartesian3, matrix)`.
    为了保持一致性和提高性能，对所有三个 Matrix 类进行了大量重写。移除了 `values` 属性，且 Matrix 不再是不可变对象。此前类似 `matrix = matrix.setColumn0Row0(12);` 的代码现在写作 `matrix[Matrix2.COLUMN0ROW0] = 12;`。此前类似 `matrix.setColumn3(cartesian3);` 的代码现在写作 `matrix.setColumn(3, cartesian3, matrix)`。
  - 'Polyline' is no longer externally creatable. To create a 'Polyline' use the 'PolylineCollection.add' method.
    `Polyline` 不再支持外部创建。若要创建 `Polyline`，请使用 `PolylineCollection.add` 方法。

          Polyline polyline = new Polyline();

    to
    改为：

          PolylineCollection polylineCollection = new PolylineCollection();
          Polyline polyline = polylineCollection.add();

- All `Cartesian2` operations now have static versions that work with any objects exposing `x` and `y` properties.
  所有 `Cartesian2` 操作现在都具有静态版本，可用于暴露了 `x` 和 `y` 属性的任何对象。
- All `Cartesian3` operations now have static versions that work with any objects exposing `x`, `y`, and `z` properties.
  所有 `Cartesian3` 操作现在都具有静态版本，可用于暴露了 `x`、`y` 和 `z` 属性的任何对象。
- All `Cartesian4` operations now have static versions that work with any objects exposing `x`, `y`, `z` and `w` properties.
  所有 `Cartesian4` 操作现在都具有静态版本，可用于暴露了 `x`、`y`、`z` 和 `w` 属性的任何对象。
- All `Cartographic` operations now have static versions that work with any objects exposing `longitude`, `latitude`, and `height` properties.
  所有 `Cartographic` 操作现在都具有静态版本，可用于暴露了 `longitude`、`latitude` 和 `height` 属性的任何对象。
- All `Matrix` classes are now indexable like arrays.
  所有 `Matrix` 类现在都可以像数组一样进行索引。
- All `Matrix` operations now have static versions of all prototype functions and anywhere we take a Matrix instance as input can now also take an Array or TypedArray.
  所有 `Matrix` 操作现在都提供了所有原型函数的静态版本，并且任何接受 Matrix 实例作为输入的地方现在也可以接收 Array 或 TypedArray。
- All `Matrix`, `Cartesian`, and `Cartographic` operations now take an optional result parameter for object re-use to reduce memory pressure.
  所有 `Matrix`、`Cartesian` 和 `Cartographic` 操作现在都接收一个可选的 result 参数以复用对象，从而减轻内存压力。
- Added `Cartographic.fromDegrees` to make creating Cartographic instances from values in degrees easier.
  添加了 `Cartographic.fromDegrees`，以便更容易地从角度值创建 Cartographic 实例。
- Added `addImage` to `TextureAtlas` so images can be added to a texture atlas after it is constructed.
  为 `TextureAtlas` 添加了 `addImage`，以便在纹理图集构造之后向其中添加图像。
- Added `Scene.pickEllipsoid`, which picks either the ellipsoid or the map depending on the current `SceneMode`.
  添加了 `Scene.pickEllipsoid`，根据当前的 `SceneMode` 拾取椭球体或地图。
- Added `Event`, a new utility class which makes it easy for objects to expose event properties.
  添加了新的实用类 `Event`，使对象能够轻松暴露事件属性。
- Added `TextureAtlasBuilder`, a new utility class which makes it easy to build a TextureAtlas asynchronously.
  添加了新的实用类 `TextureAtlasBuilder`，使异步构建 TextureAtlas 更加简单。
- Added `Clock`, a simple clock for keeping track of simulated time.
  添加了 `Clock`，一个用于跟踪仿真时间的简单时钟。
- Added `LagrangePolynomialApproximation`, `HermitePolynomialApproximation`, and `LinearApproximation` interpolation algorithms.
  添加了 `LagrangePolynomialApproximation`、`HermitePolynomialApproximation` 和 `LinearApproximation` 插值算法。
- Added `CoordinateConversions`, a new static class where most coordinate conversion methods will be stored.
  添加了 `CoordinateConversions`，这是一个新的静态类，大多数坐标转换方法将存放于此。
- Added `Spherical` coordinate type
  添加了 `Spherical`（球坐标）类型。
- Added a new DynamicScene layer for time-dynamic, data-driven visualization. This include CZML processing. For more details see https://github.com/CesiumGS/cesium/wiki/Architecture and https://github.com/CesiumGS/cesium/wiki/CZML-in-Cesium.
  添加了新的 DynamicScene 图层，用于时变、数据驱动的可视化。这包括 CZML 处理。更多详情参见 https://github.com/CesiumGS/cesium/wiki/Architecture 以及 https://github.com/CesiumGS/cesium/wiki/CZML-in-Cesium。
- Added a new application, Cesium Viewer, for viewing CZML files and otherwise exploring the globe.
  添加了新的应用程序 Cesium Viewer，用于查看 CZML 文件以及探索地球。
- Added a new Widgets directory, to contain common re-usable Cesium related controls.
  添加了新的 Widgets 目录，用于包含通用的可复用 Cesium 控件。
- Added a new Timeline widget to the Widgets directory.
  在 Widgets 目录中添加了新的 Timeline 部件。
- Added a new Widgets/Dojo directory, to contain dojo-specific widgets.
  添加了新的 Widgets/Dojo 目录，用于包含特定于 Dojo 的部件。
- Added new Timeline and Cesium dojo widgets.
  添加了新的 Timeline 和 Cesium Dojo 部件。
- Added `CameraCentralBodyController` as the new default controller to handle mouse input.
  添加了 `CameraCentralBodyController` 作为处理鼠标输入的新默认控制器。
  - The left mouse button rotates around the central body.
    鼠标左键围绕中心天体旋转。
  - The right mouse button and mouse wheel zoom in and out.
    鼠标右键和滚轮进行放大和缩小。
  - The middle mouse button rotates around the point clicked on the central body.
    鼠标中键围绕在中心天体上点击的点旋转。
- Added `computeTemeToPseudoFixedMatrix` function to `Transforms`.
  为 `Transforms` 添加了 `computeTemeToPseudoFixedMatrix` 函数。
- Added 'PolylineCollection' to manage numerous polylines. 'PolylineCollection' dramatically improves rendering speed when using polylines.
  添加了用于管理大量折线的 `PolylineCollection`。使用折线时，`PolylineCollection` 显著提高了渲染速度。

## b6a - 2012-06-20

- Breaking changes:
  重大变更：
  - Changed `Tipsify.tipsify` and `Tipsify.calculateACMR` to accept an object literal instead of three separate arguments. Supplying a maximum index and cache size is now optional.
    将 `Tipsify.tipsify` 和 `Tipsify.calculateACMR` 更改为接收对象字面量而非三个独立参数。提供最大索引和缓存大小现在是可选的。
  - `CentralBody` no longer requires a camera as the first parameter.
    `CentralBody` 不再需要相机作为第一个参数。
- Added `CentralBody.northPoleColor` and `CentralBody.southPoleColor` to fill in the poles if they are not covered by a texture.
  添加了 `CentralBody.northPoleColor` 和 `CentralBody.southPoleColor`，以便在极地未被纹理覆盖时填充极点颜色。
- Added `Polygon.configureExtent` to create a polygon defined by west, south, east, and north values.
  添加了 `Polygon.configureExtent` 以创建由西、南、东、北数值定义的多边形。
- Added functions to `Camera` to provide position and directions in world coordinates.
  为 `Camera` 添加了提供世界坐标下的位置和方向的函数。
- Added `showThroughEllipsoid` to `CustomSensorVolume` and `RectangularPyramidSensorVolume` to allow sensors to draw through Earth.
  为 `CustomSensorVolume` 和 `RectangularPyramidSensorVolume` 添加了 `showThroughEllipsoid`，以允许传感器穿透地球绘制。
- Added `affectedByLighting` to `CentralBody` and `Polygon` to turn lighting on/off for these objects.
  为 `CentralBody` 和 `Polygon` 添加了 `affectedByLighting`，以开启/关闭这些对象的光照。

## b5 - 2012-05-15

- Breaking changes:
  破坏性变更：
  - Renamed Geoscope to Cesium. To update your code, change all `Geoscope.*` references to `Cesium.*`, and reference Cesium.js instead of Geoscope.js.
    将 Geoscope 重命名为 Cesium。要更新你的代码，请将所有 `Geoscope.*` 引用更改为 `Cesium.*`，并引用 Cesium.js 而不是 Geoscope.js。
  - `CompositePrimitive.addGround` was removed; use `CompositePrimitive.add` instead. For example, change
    移除了 `CompositePrimitive.addGround`；改为使用 `CompositePrimitive.add`。例如，将

          primitives.addGround(polygon);

    to:
    改为：

          primitives.add(polygon);

  - Moved `eastNorthUpToFixedFrame` and `northEastDownToFixedFrame` functions from `Ellipsoid` to a new `Transforms` object. For example, change
    将 `eastNorthUpToFixedFrame` 和 `northEastDownToFixedFrame` 函数从 `Ellipsoid` 移至新的 `Transforms` 对象。例如，将

          var m = ellipsoid.eastNorthUpToFixedFrame(p);

    to:
    改为：

          var m = Cesium.Transforms.eastNorthUpToFixedFrame(p, ellipsoid);

  - Label properties `fillStyle` and `strokeStyle` were renamed to `fillColor` and `outlineColor`; they are also now color objects instead of strings. The label `Color` property has been removed.
    Label 的属性 `fillStyle` 和 `strokeStyle` 重命名为 `fillColor` 和 `outlineColor`；它们现在也是颜色对象而不是字符串。移除了 Label 的 `Color` 属性。

    For example, change
    例如，将

          label.setFillStyle("red");
          label.setStrokeStyle("#FFFFFFFF");

    to:
    改为：

          label.setFillColor({ red : 1.0, blue : 0.0, green : 0.0, alpha : 1.0 });
          label.setOutlineColor({ red : 1.0, blue : 1.0, green : 1.0, alpha : 1.0 });

  - Renamed `Tipsify.Tipsify` to `Tipsify.tipsify`.
    将 `Tipsify.Tipsify` 重命名为 `Tipsify.tipsify`。
  - Renamed `Tipsify.CalculateACMR` to `Tipsify.calculateACMR`.
    将 `Tipsify.CalculateACMR` 重命名为 `Tipsify.calculateACMR`。
  - Renamed `LeapSecond.CompareLeapSecondDate` to `LeapSecond.compareLeapSecondDate`.
    将 `LeapSecond.CompareLeapSecondDate` 重命名为 `LeapSecond.compareLeapSecondDate`。
  - `Geoscope.JSONP.get` is now `Cesium.jsonp`. `Cesium.jsonp` now takes a url, a callback function, and an options object. The previous 2nd and 4th parameters are now specified using the options object.
    `Geoscope.JSONP.get` 现为 `Cesium.jsonp`。`Cesium.jsonp` 现在接受一个 url、一个回调函数和一个 options 对象。先前的第 2 和第 4 个参数现在使用 options 对象指定。
  - `TWEEN` is no longer globally defined, and is instead available as `Cesium.Tween`.
    `TWEEN` 不再全局定义，而是作为 `Cesium.Tween` 提供。
  - Chain.js functions such as `run` are now moved to `Cesium.Chain.run`, etc.
    Chain.js 函数（如 `run`）现已移至 `Cesium.Chain.run` 等。
  - `Geoscope.CollectionAlgorithms.binarySearch` is now `Cesium.binarySearch`.
    `Geoscope.CollectionAlgorithms.binarySearch` 现为 `Cesium.binarySearch`。
  - `Geoscope.ContainmentTests.pointInsideTriangle2D` is now `Cesium.pointInsideTriangle2D`.
    `Geoscope.ContainmentTests.pointInsideTriangle2D` 现为 `Cesium.pointInsideTriangle2D`。
  - Static constructor methods prefixed with "createFrom", now start with "from":
    前缀为“createFrom”的静态构造方法，现在以“from”开头：

          Matrix2.createfromColumnMajorArray

    becomes
    变为

          Matrix2.fromColumnMajorArray

  - The `JulianDate` constructor no longer takes a `Date` object, use the new from methods instead:
    `JulianDate` 构造函数不再接受 `Date` 对象，改用新的 from 方法：

          new JulianDate(new Date());

    becomes
    变为

          JulianDate.fromDate(new Date("January 1, 2011 12:00:00 EST"));
          JulianDate.fromIso8601("2012-04-24T18:08Z");
          JulianDate.fromTotalDays(23452.23);

  - `JulianDate.getDate` is now `JulianDate.toDate()` and returns a new instance each time.
    `JulianDate.getDate` 现为 `JulianDate.toDate()`，且每次返回一个新实例。
  - `CentralBody.logoOffsetX` and `logoOffsetY` have been replaced with `CentralBody.logoOffset`, a `Cartesian2`.
    `CentralBody.logoOffsetX` 和 `logoOffsetY` 已替换为 `CentralBody.logoOffset`（一个 `Cartesian2`）。
  - TileProviders now take a proxy object instead of a string, to allow more control over how proxy URLs are built. Construct a DefaultProxy, passing the previous proxy URL, to get the previous behavior.
    TileProvider 现在接受代理对象而不是字符串，以便更好地控制代理 URL 的构建方式。构造一个 DefaultProxy 并传入之前的代理 URL 即可获得之前的行为。
  - `Ellipsoid.getScaledWgs84()` has been removed since it is not needed.
    移除了 `Ellipsoid.getScaledWgs84()`，因为不再需要。
  - `getXXX()` methods which returned a new instance of what should really be a constant are now exposed as frozen properties instead. This should improve performance and memory pressure.
    原本应为常量但返回新实例的 `getXXX()` 方法现在改作为冻结属性公开。这应能提高性能并减少内存压力。
    - `Cartsian2/3/4.getUnitX()` -> `Cartsian2/3/4.UNIT_X`
    - `Cartsian2/3/4.getUnitY()` -> `Cartsian2/3/4.UNIT_Y`
    - `Cartsian2/3/4.getUnitZ()` -> `Cartsian3/4.UNIT_Z`
    - `Cartsian2/3/4.getUnitW()` -> `Cartsian4.UNIT_W`
    - `Matrix/2/3/4.getIdentity()` -> `Matrix/2/3/4.IDENTITY`
    - `Quaternion.getIdentity()` -> `Quaternion.IDENTITY`
    - `Ellipsoid.getWgs84()` -> `Ellipsoid.WGS84`
    - `Ellipsoid.getUnitSphere()` -> `Ellipsoid.UNIT_SPHERE`
    - `Cartesian2/3/4/Cartographic.getZero()` -> `Cartesian2/3/4/Cartographic.ZERO`

- Added `PerformanceDisplay` which can be added to a scene to display frames per second (FPS).
  添加了 `PerformanceDisplay`，可添加到场景中以显示每秒帧数（FPS）。
- Labels now correctly allow specifying fonts by non-pixel CSS units such as points, ems, etc.
  Label 现在正确允许通过非像素 CSS 单位（如 points、ems 等）指定字体。
- Added `Shapes.computeEllipseBoundary` and updated `Shapes.computeCircleBoundary` to compute boundaries using arc-distance.
  添加了 `Shapes.computeEllipseBoundary` 并更新了 `Shapes.computeCircleBoundary` 以使用弧距离计算边界。
- Added `fileExtension` and `credit` properties to `OpenStreetMapTileProvider` construction.
  在 `OpenStreetMapTileProvider` 构造函数中添加了 `fileExtension` 和 `credit` 属性。
- Night lights no longer disappear when `CentralBody.showGroundAtmosphere` is `true`.
  当 `CentralBody.showGroundAtmosphere` 为 `true` 时，夜间灯光不再消失。

## b4 - 2012-03-01

- Breaking changes:
  破坏性变更：
  - Replaced `Geoscope.SkyFromSpace` object with `CentralBody.showSkyAtmosphere` property.
    将 `Geoscope.SkyFromSpace` 对象替换为 `CentralBody.showSkyAtmosphere` 属性。
  - For mouse click and double click events, replaced `event.x` and `event.y` with `event.position`.
    对于鼠标单击和双击事件，将 `event.x` 和 `event.y` 替换为 `event.position`。
  - For mouse move events, replaced `movement.startX` and `startY` with `movement.startPosition`. Replaced `movement.endX` and `movement.endY` with `movement.endPosition`.
    对于鼠标移动事件，将 `movement.startX` 和 `startY` 替换为 `movement.startPosition`。将 `movement.endX` 和 `movement.endY` 替换为 `movement.endPosition`。
  - `Scene.Pick` now takes a `Cartesian2` with the origin at the upper-left corner of the canvas. For example, code that looked like:
    `Scene.Pick` 现在接受一个以画布左上角为原点的 `Cartesian2`。例如，类似以下的代码：

          scene.pick(movement.endX, scene.getCanvas().clientHeight - movement.endY);

    becomes:
    变为：

          scene.pick(movement.endPosition);

- Added `SceneTransitioner` to switch between 2D and 3D views. See the new Skeleton 2D example.
  添加了 `SceneTransitioner` 以在 2D 和 3D 视图之间切换。参见新的 Skeleton 2D 示例。
- Added `CentralBody.showGroundAtmosphere` to show an atmosphere on the ground.
  添加了 `CentralBody.showGroundAtmosphere` 以在地面上显示大气。
- Added `Camera.pickEllipsoid` to get the point on the globe under the mouse cursor.
  添加了 `Camera.pickEllipsoid` 以获取鼠标光标下地球上的点。
- Added `Polygon.height` to draw polygons at a constant altitude above the ellipsoid.
  添加了 `Polygon.height` 以在椭球面上方恒定高度处绘制多边形。

## b3 - 2012-02-06

- Breaking changes:
  破坏性变更：
  - Replaced `Geoscope.Constants` and `Geoscope.Trig` with `Geoscope.Math`.
    将 `Geoscope.Constants` 和 `Geoscope.Trig` 替换为 `Geoscope.Math`。
  - `Polygon`
    - Replaced `setColor` and `getColor` with a `material.color` property.
      将 `setColor` 和 `getColor` 替换为 `material.color` 属性。
    - Replaced `setEllipsoid` and `getEllipsoid` with an `ellipsoid` property.
      将 `setEllipsoid` 和 `getEllipsoid` 替换为 `ellipsoid` 属性。
    - Replaced `setGranularity` and `getGranularity` with a `granularity` property.
      将 `setGranularity` 和 `getGranularity` 替换为 `granularity` 属性。
  - `Polyline`
    - Replaced `setColor`/`getColor` and `setOutlineColor`/`getOutlineColor` with `color` and `outline` properties.
      将 `setColor`/`getColor` 和 `setOutlineColor`/`getOutlineColor` 替换为 `color` 和 `outline` 属性。
    - Replaced `setWidth`/`getWidth` and `setOutlineWidth`/`getOutlineWidth` with `width` and `outlineWidth` properties.
      将 `setWidth`/`getWidth` 和 `setOutlineWidth`/`getOutlineWidth` 替换为 `width` 和 `outlineWidth` 属性。
  - Removed `Geoscope.BillboardCollection.bufferUsage`. It is now automatically determined.
    移除了 `Geoscope.BillboardCollection.bufferUsage`。现在会自动确定。
  - Removed `Geoscope.Label` set/get functions for `shadowOffset`, `shadowBlur`, `shadowColor`. These are no longer supported.
    移除了 `Geoscope.Label` 用于 `shadowOffset`、`shadowBlur`、`shadowColor` 的 set/get 函数。这些不再受支持。
  - Renamed `Scene.getTransitions` to `Scene.getAnimations`.
    将 `Scene.getTransitions` 重命名为 `Scene.getAnimations`。
  - Renamed `SensorCollection` to `SensorVolumeCollection`.
    将 `SensorCollection` 重命名为 `SensorVolumeCollection`。
  - Replaced `ComplexConicSensorVolume.material` with separate materials for each surface: `outerMaterial`, `innerMaterial`, and `capMaterial`.
    将 `ComplexConicSensorVolume.material` 替换为每个表面的独立材质：`outerMaterial`、`innerMaterial` 和 `capMaterial`。
  - Material renames
    材质重命名
    - `TranslucentSensorVolumeMaterial` to `ColorMaterial`.
    - `DistanceIntervalSensorVolumeMaterial` to `DistanceIntervalMaterial`.
    - `TieDyeSensorVolumeMaterial` to `TieDyeMaterial`.
    - `CheckerboardSensorVolumeMaterial` to `CheckerboardMaterial`.
    - `PolkaDotSensorVolumeMaterial` to `DotMaterial`.
    - `FacetSensorVolumeMaterial` to `FacetMaterial`.
    - `BlobSensorVolumeMaterial` to `BlobMaterial`.
  - Added new materials:
    添加了新材质：
    - `VerticalStripeMaterial`
    - `HorizontalStripeMaterial`
    - `DistanceIntervalMaterial`
  - Added polygon material support via the new `Polygon.material` property.
    通过新的 `Polygon.material` 属性添加了多边形材质支持。
  - Added clock angle support to `ConicSensorVolume` via the new `maximumClockAngle` and `minimumClockAngle` properties.
    通过新的 `maximumClockAngle` 和 `minimumClockAngle` 属性为 `ConicSensorVolume` 添加了钟表角（clock angle）支持。
  - Added a rectangular sensor, `RectangularPyramidSensorVolume`.
    添加了矩形传感器 `RectangularPyramidSensorVolume`。
  - Changed custom sensor to connect direction points using the sensor's radius; previously, points were connected with a line.
    更改了自定义传感器以使用传感器的半径连接方向点；以前，各点是用一条直线连接的。
  - Improved performance and memory usage of `BillboardCollection` and `LabelCollection`.
    提高了 `BillboardCollection` 和 `LabelCollection` 的性能并降低了内存使用。
  - Added more mouse events.
    添加了更多鼠标事件。
  - Added Sandbox examples for new features.
    为新功能添加了 Sandbox 示例。

## b2 - 2011-12-01

- Added complex conic and custom sensor volumes, and various materials to change their appearance. See the new Sensor folder in the Sandbox.
  添加了复合锥体（complex conic）和自定义传感器体（custom sensor volumes），以及用于更改其外观的各种材质。参见 Sandbox 中新的 Sensor 文件夹。
- Added modelMatrix property to primitives to render them in a local reference frame. See the polyline example in the Sandbox.
  为图元（primitives）添加了 modelMatrix 属性以在局部参考系中渲染它们。参见 Sandbox 中的 polyline 示例。
- Added eastNorthUpToFixedFrame() and northEastDownToFixedFrame() to Ellipsoid to create local reference frames.
  在 Ellipsoid 中添加了 eastNorthUpToFixedFrame() 和 northEastDownToFixedFrame() 以创建局部参考系。
- Added CameraFlightController to zoom smoothly from one point to another. See the new camera examples in the Sandbox.
  添加了 CameraFlightController 以平滑地从一个点缩放到另一个点。参见 Sandbox 中新的相机示例。
- Added row and column assessors to Matrix2, Matrix3, and Matrix4.
  为 Matrix2、Matrix3 和 Matrix4 添加了行和列访问器（accessors）。
- Added Scene, which reduces the amount of code required to use Geoscope. See the Skeleton. We recommend using this instead of explicitly calling update() and render() for individual or composite primitives. Existing code will need minor changes:
  添加了 Scene，减少了使用 Geoscope 所需的代码量。参见 Skeleton。我们建议使用它，而不是显式调用单个或复合图元的 update() 和 render()。现有代码需要细微更改：
  - Calls to Context.pick() should be replaced with Scene.pick().
    对 Context.pick() 的调用应替换为 Scene.pick()。
  - Primitive constructors no longer require a context argument.
    图元构造函数不再需要 context 参数。
  - Primitive update() and render() functions now require a context argument. However, when using the new Scene object, these functions do not need to be called directly.
    图元的 update() 和 render() 函数现在需要 context 参数。但是，使用新的 Scene 对象时，不需要直接调用这些函数。
  - TextureAtlas should no longer be created directly; instead, call Scene.getContext().createTextureAtlas().
    不再直接创建 TextureAtlas；改用调用 Scene.getContext().createTextureAtlas()。
  - Other breaking changes:
    其他破坏性变更：
    - Camera get/set functions, e.g., getPosition/setPosition were replaced with properties, e.g., position.
      Camera 的 get/set 函数（例如 getPosition/setPosition）已替换为属性（例如 position）。
    - Replaced CompositePrimitive, Polygon, and Polyline getShow/setShow functions with a show property.
      将 CompositePrimitive、Polygon 和 Polyline 的 getShow/setShow 函数替换为 show 属性。
    - Replaced Polyline, Polygon, BillboardCollection, and LabelCollection getBufferUsage/setBufferUsage functions with a bufferUsage property.
      将 Polyline、Polygon、BillboardCollection 和 LabelCollection 的 getBufferUsage/setBufferUsage 函数替换为 bufferUsage 属性。
    - Changed colors used by billboards, labels, polylines, and polygons. Previously, components were named r, g, b, and a. They are now red, green, blue, and alpha. Previously, each component's range was `[0, 255]`. The range is now `[0, 1]` floating point. For example,
      更改了 billboard、label、polyline 和 polygon 使用的颜色。此前，各分量被命名为 r、g、b 和 a。它们现在是 red、green、blue 和 alpha。此前，每个分量的范围为 `[0, 255]`。现在的范围是 `[0, 1]` 浮点数。例如，

            color : { r : 0, g : 255, b : 0, a : 255 }

      becomes:
      变为：

            color : { red : 0.0, green : 1.0, blue : 0.0, alpha : 1.0 }

## b1 - 2011-09-19

- Added `Shapes.computeCircleBoundary` to compute circles. See the Sandbox.
  添加了 `Shapes.computeCircleBoundary` 以计算圆形。参见 Sandbox。
- Changed the `EventHandler` constructor function to take the Geoscope canvas, which ensures the mouse position is correct regardless of the canvas' position on the page. Code that previously looked like:
  更改了 `EventHandler` 构造函数以接收 Geoscope canvas，从而确保无论 canvas 在页面上的位置如何，鼠标位置都是正确的。此前类似以下的代码：

        var handler = new Geoscope.EventHandler();

  should now look like:
  现在应为：

        var handler = new Geoscope.EventHandler(canvas);

- Context.Pick no longer requires clamping the x and y arguments. Code that previously looked like:
  Context.Pick 不再需要对 x 和 y 参数进行范围限制（clamping）。此前类似以下的代码：

        var pickedObject = context.pick(primitives, us, Math.max(x, 0.0),
            Math.max(context.getCanvas().clientHeight - y, 0.0));

  can now look like:
  现在可以写为：

        var pickedObject = context.pick(primitives, us, x, context.getCanvas().clientHeight - y);

- Changed Polyline.setWidth and Polyline.setOutlineWidth to clamp the width to the WebGL implementation limit instead of throwing an exception. Code that previously looked like:
  更改了 Polyline.setWidth 和 Polyline.setOutlineWidth，将宽度限制在 WebGL 实现限制内而不是抛出异常。此前类似以下的代码：

        var maxWidth = context.getMaximumAliasedLineWidth();
        polyline.setWidth(Math.min(5, maxWidth));
        polyline.setOutlineWidth(Math.min(10, maxWidth));

  can now look like:
  现在可以写为：

        polyline.setWidth(5);
        polyline.setOutlineWidth(10);

- Improved the Sandbox:
  改进了 Sandbox：
  - Code in the editor is now evaluated as you type for quick prototyping.
    编辑器中的代码现在可以在输入时直接求值，以便快速原型开发。
  - Highlighting a Geoscope type in the editor and clicking the doc button in the toolbar now brings up the reference help for that type.
    在编辑器中高亮显示 Geoscope 类型并单击工具栏中的文档按钮，现在会调出该类型的参考帮助。
- BREAKING CHANGE: The `Context` constructor-function now takes an element instead of an ID. Code that previously looked like:
  破坏性变更：`Context` 构造函数现在接受一个元素而不是 ID。此前类似以下的代码：

        var context = new Geoscope.Context("glCanvas");
        var canvas = context.getCanvas();

  should now look like:
  现在应为：

        var canvas = document.getElementById("glCanvas");
        var context = new Geoscope.Context(canvas);

## b0 - 2011-08-31

- Added new Sandbox and Skeleton examples. The sandbox contains example code for common tasks. The skeleton is a bare-bones application for building upon. Most sandbox code examples can be copy and pasted directly into the skeleton.
  添加了新的 Sandbox 和 Skeleton 示例。Sandbox 包含用于常见任务的示例代码。Skeleton 是一个用于在此基础上构建应用的基础框架（骨架）。大多数 Sandbox 代码示例都可以直接复制并粘贴到 Skeleton 中。
- Added `Geoscope.Polygon` for drawing polygons on the globe.
  添加了 `Geoscope.Polygon` 用于在地球上绘制多边形。
- Added `Context.pick` to pick objects in one line of code.
  添加了 `Context.pick`，用一行代码拾取对象。
- Added `bringForward`, `bringToFront`, `sendBackward`, and `sendToBack` functions to `CompositePrimitive` to control the render-order for ground primitives.
  在 `CompositePrimitive` 中添加了 `bringForward`、`bringToFront`、`sendBackward` 和 `sendToBack` 函数，用于控制贴地几何图元（ground primitives）的渲染顺序。
- Added `getShow`/`setShow` functions to `Polyline` and `CompositePrimitive`.
  在 `Polyline` 和 `CompositePrimitive` 中添加了 `getShow`/`setShow` 函数。
- Added new camera control and event types including `CameraFreeLookEventHandler`, `CameraSpindleEventHandler`, and `EventHandler`.
  添加了新的相机控制和事件类型，包括 `CameraFreeLookEventHandler`、`CameraSpindleEventHandler` 和 `EventHandler`。
- Replaced `Ellipsoid.toCartesian3` with `Ellipsoid.toCartesian`.
  将 `Ellipsoid.toCartesian3` 替换为 `Ellipsoid.toCartesian`。
- update and `updateForPick` functions no longer require a `UniformState` argument.
  update 和 `updateForPick` 函数不再需要 `UniformState` 参数。

## Alpha Releases

## a6 - 2011-08-05

- Added support for lines using `Geoscope.Polyline`. See the Sandbox example.
  添加了使用 `Geoscope.Polyline` 的线支持。参见 Sandbox 示例。
- Made `CompositePrimitive`, `LabelCollection`, and `BillboardCollection` have consistent function names, including a new `contains()` function.
  使 `CompositePrimitive`、`LabelCollection` 和 `BillboardCollection` 具有一致的函数名称，包括新增的 `contains()` 函数。
- Improved reference documentation layout.
  改进了参考文档布局。

## a5 - 2011-07-22

- Flushed out `CompositePrimitive`, `TimeStandard`, and `LeapSecond` types.
  完善了 `CompositePrimitive`、`TimeStandard` 和 `LeapSecond` 类型。
- Improved support for browsers using ANGLE (Windows Only).
  改进了对使用 ANGLE 的浏览器的支持（仅限 Windows）。

## a4 - 2011-07-15

- Added `Geoscope.TimeStandard` for handling TAI and UTC time standards.
  添加了用于处理 TAI 和 UTC 时间标准的 `Geoscope.TimeStandard`。
- Added `Geoscope.Quaternion`, which is a foundation for future camera control.
  添加了 `Geoscope.Quaternion`，这是未来相机控制的基础。
- Added initial version of `Geoscope.PrimitiveCollection` to simplify rendering.
  添加了初始版本的 `Geoscope.PrimitiveCollection` 以简化渲染。
- Prevented billboards/labels near the surface from getting cut off by the globe.
  防止靠近表面的 billboard/label 被地球裁剪截断。
- See the Sandbox for example code.
  示例代码参见 Sandbox。
- Added more reference documentation for labels.
  为 label 添加了更多参考文档。

## a3 - 2011-07-08

- Added `Geoscope.LabelCollection` for drawing text.
  添加了用于绘制文本的 `Geoscope.LabelCollection`。
- Added `Geoscope.JulianDate` and `Geoscope.TimeConstants` for proper time handling.
  添加了用于准确时间处理的 `Geoscope.JulianDate` 和 `Geoscope.TimeConstants`。
- See the Sandbox example for how to use the new labels and Julian date.
  关于如何使用新 label 和儒略日（Julian date），请参见 Sandbox 示例。

## a2 - 2011-07-01

- Added `Geoscope.ViewportQuad` and `Geoscope.Rectangle` (foundations for 2D map).
  添加了 `Geoscope.ViewportQuad` 和 `Geoscope.Rectangle`（2D 地图的基础）。
- Improved the visual quality of cloud shadows.
  提升了云影的视觉质量。

## a1 - 2011-06-24

- Added `SunPosition` type to compute the sun position for a julian date.
  添加了 `SunPosition` 类型以计算儒略日的太阳位置。
- Simplified picking. See the mouse move event in the Sandbox example.
  简化了拾取（picking）。参见 Sandbox 示例中的鼠标移动事件。
- `Cartographic2` and `Cartographic3` are now mutable types.
  `Cartographic2` 和 `Cartographic3` 现在是可变类型。
- Added reference documentation for billboards.
  为 billboard 添加了参考文档。

## a0 - 2011-06-17

- Initial Release.
  初始版本。
