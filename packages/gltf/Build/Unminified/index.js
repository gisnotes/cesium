/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.146.0
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */


// packages/gltf/Source/addToArray.js
function addToArray(array, element, checkDuplicates) {
  checkDuplicates = checkDuplicates ?? false;
  if (checkDuplicates) {
    const index = array.indexOf(element);
    if (index > -1) {
      return index;
    }
  }
  array.push(element);
  return array.length - 1;
}
var addToArray_default = addToArray;

// packages/gltf/Source/addBuffer.js
function addBuffer(gltf, buffer) {
  const newBuffer = {
    byteLength: buffer.length,
    extras: {
      _pipeline: {
        source: buffer
      }
    }
  };
  const bufferId = addToArray_default(gltf.buffers, newBuffer);
  const bufferView = {
    buffer: bufferId,
    byteOffset: 0,
    byteLength: buffer.length
  };
  return addToArray_default(gltf.bufferViews, bufferView);
}
var addBuffer_default = addBuffer;

// packages/gltf/Source/addDefaults.js
import { WebGLConstants, defined as defined4 } from "@cesium/core";

// packages/gltf/Source/ForEach.js
import { defined as defined2 } from "@cesium/core";

// packages/gltf/Source/usesExtension.js
import { defined } from "@cesium/core";
function usesExtension(gltf, extension) {
  return defined(gltf.extensionsUsed) && gltf.extensionsUsed.indexOf(extension) >= 0;
}
var usesExtension_default = usesExtension;

// packages/gltf/Source/ForEach.js
var ForEach = {};
ForEach.objectLegacy = function(objects, handler) {
  if (defined2(objects)) {
    for (const objectId in objects) {
      if (Object.prototype.hasOwnProperty.call(objects, objectId)) {
        const object = objects[objectId];
        const value = handler(object, objectId);
        if (defined2(value)) {
          return value;
        }
      }
    }
  }
};
ForEach.object = function(arrayOfObjects, handler) {
  if (defined2(arrayOfObjects)) {
    const length = arrayOfObjects.length;
    for (let i = 0; i < length; i++) {
      const object = arrayOfObjects[i];
      const value = handler(object, i);
      if (defined2(value)) {
        return value;
      }
    }
  }
};
ForEach.topLevel = function(gltf, name, handler) {
  const gltfProperty = gltf[name];
  if (defined2(gltfProperty) && !Array.isArray(gltfProperty)) {
    return ForEach.objectLegacy(gltfProperty, handler);
  }
  return ForEach.object(gltfProperty, handler);
};
ForEach.accessor = function(gltf, handler) {
  return ForEach.topLevel(gltf, "accessors", handler);
};
ForEach.accessorWithSemantic = function(gltf, semantic, handler) {
  const visited = {};
  return ForEach.mesh(gltf, function(mesh) {
    return ForEach.meshPrimitive(mesh, function(primitive) {
      const valueForEach = ForEach.meshPrimitiveAttribute(
        primitive,
        function(accessorId, attributeSemantic) {
          if (attributeSemantic.indexOf(semantic) === 0 && !defined2(visited[accessorId])) {
            visited[accessorId] = true;
            const value = handler(accessorId);
            if (defined2(value)) {
              return value;
            }
          }
        }
      );
      if (defined2(valueForEach)) {
        return valueForEach;
      }
      return ForEach.meshPrimitiveTarget(primitive, function(target) {
        return ForEach.meshPrimitiveTargetAttribute(
          target,
          function(accessorId, attributeSemantic) {
            if (attributeSemantic.indexOf(semantic) === 0 && !defined2(visited[accessorId])) {
              visited[accessorId] = true;
              const value = handler(accessorId);
              if (defined2(value)) {
                return value;
              }
            }
          }
        );
      });
    });
  });
};
ForEach.accessorContainingVertexAttributeData = function(gltf, handler) {
  const visited = {};
  return ForEach.mesh(gltf, function(mesh) {
    return ForEach.meshPrimitive(mesh, function(primitive) {
      const valueForEach = ForEach.meshPrimitiveAttribute(
        primitive,
        function(accessorId) {
          if (!defined2(visited[accessorId])) {
            visited[accessorId] = true;
            const value = handler(accessorId);
            if (defined2(value)) {
              return value;
            }
          }
        }
      );
      if (defined2(valueForEach)) {
        return valueForEach;
      }
      return ForEach.meshPrimitiveTarget(primitive, function(target) {
        return ForEach.meshPrimitiveTargetAttribute(
          target,
          function(accessorId) {
            if (!defined2(visited[accessorId])) {
              visited[accessorId] = true;
              const value = handler(accessorId);
              if (defined2(value)) {
                return value;
              }
            }
          }
        );
      });
    });
  });
};
ForEach.accessorContainingIndexData = function(gltf, handler) {
  const visited = {};
  return ForEach.mesh(gltf, function(mesh) {
    return ForEach.meshPrimitive(mesh, function(primitive) {
      const indices = primitive.indices;
      if (defined2(indices) && !defined2(visited[indices])) {
        visited[indices] = true;
        const value = handler(indices);
        if (defined2(value)) {
          return value;
        }
      }
    });
  });
};
ForEach.animation = function(gltf, handler) {
  return ForEach.topLevel(gltf, "animations", handler);
};
ForEach.animationChannel = function(animation, handler) {
  const channels = animation.channels;
  return ForEach.object(channels, handler);
};
ForEach.animationSampler = function(animation, handler) {
  const samplers = animation.samplers;
  return ForEach.object(samplers, handler);
};
ForEach.buffer = function(gltf, handler) {
  return ForEach.topLevel(gltf, "buffers", handler);
};
ForEach.bufferView = function(gltf, handler) {
  return ForEach.topLevel(gltf, "bufferViews", handler);
};
ForEach.camera = function(gltf, handler) {
  return ForEach.topLevel(gltf, "cameras", handler);
};
ForEach.image = function(gltf, handler) {
  return ForEach.topLevel(gltf, "images", handler);
};
ForEach.material = function(gltf, handler) {
  return ForEach.topLevel(gltf, "materials", handler);
};
ForEach.materialValue = function(material, handler) {
  let values = material.values;
  if (defined2(material.extensions) && defined2(material.extensions.KHR_techniques_webgl)) {
    values = material.extensions.KHR_techniques_webgl.values;
  }
  for (const name in values) {
    if (Object.prototype.hasOwnProperty.call(values, name)) {
      const value = handler(values[name], name);
      if (defined2(value)) {
        return value;
      }
    }
  }
};
ForEach.mesh = function(gltf, handler) {
  return ForEach.topLevel(gltf, "meshes", handler);
};
ForEach.meshPrimitive = function(mesh, handler) {
  const primitives = mesh.primitives;
  if (defined2(primitives)) {
    const primitivesLength = primitives.length;
    for (let i = 0; i < primitivesLength; i++) {
      const primitive = primitives[i];
      const value = handler(primitive, i);
      if (defined2(value)) {
        return value;
      }
    }
  }
};
ForEach.meshPrimitiveAttribute = function(primitive, handler) {
  const attributes = primitive.attributes;
  for (const semantic in attributes) {
    if (Object.prototype.hasOwnProperty.call(attributes, semantic)) {
      const value = handler(attributes[semantic], semantic);
      if (defined2(value)) {
        return value;
      }
    }
  }
};
ForEach.meshPrimitiveTarget = function(primitive, handler) {
  const targets = primitive.targets;
  if (defined2(targets)) {
    const length = targets.length;
    for (let i = 0; i < length; ++i) {
      const value = handler(targets[i], i);
      if (defined2(value)) {
        return value;
      }
    }
  }
};
ForEach.meshPrimitiveTargetAttribute = function(target, handler) {
  for (const semantic in target) {
    if (Object.prototype.hasOwnProperty.call(target, semantic)) {
      const accessorId = target[semantic];
      const value = handler(accessorId, semantic);
      if (defined2(value)) {
        return value;
      }
    }
  }
};
ForEach.node = function(gltf, handler) {
  return ForEach.topLevel(gltf, "nodes", handler);
};
ForEach.nodeInTree = function(gltf, nodeIds, handler) {
  const nodes = gltf.nodes;
  if (defined2(nodes)) {
    const length = nodeIds.length;
    for (let i = 0; i < length; i++) {
      const nodeId = nodeIds[i];
      const node = nodes[nodeId];
      if (defined2(node)) {
        let value = handler(node, nodeId);
        if (defined2(value)) {
          return value;
        }
        const children = node.children;
        if (defined2(children)) {
          value = ForEach.nodeInTree(gltf, children, handler);
          if (defined2(value)) {
            return value;
          }
        }
      }
    }
  }
};
ForEach.nodeInScene = function(gltf, scene, handler) {
  const sceneNodeIds = scene.nodes;
  if (defined2(sceneNodeIds)) {
    return ForEach.nodeInTree(gltf, sceneNodeIds, handler);
  }
};
ForEach.program = function(gltf, handler) {
  if (usesExtension_default(gltf, "KHR_techniques_webgl")) {
    return ForEach.object(
      gltf.extensions.KHR_techniques_webgl.programs,
      handler
    );
  }
  return ForEach.topLevel(gltf, "programs", handler);
};
ForEach.sampler = function(gltf, handler) {
  return ForEach.topLevel(gltf, "samplers", handler);
};
ForEach.scene = function(gltf, handler) {
  return ForEach.topLevel(gltf, "scenes", handler);
};
ForEach.shader = function(gltf, handler) {
  if (usesExtension_default(gltf, "KHR_techniques_webgl")) {
    return ForEach.object(
      gltf.extensions.KHR_techniques_webgl.shaders,
      handler
    );
  }
  return ForEach.topLevel(gltf, "shaders", handler);
};
ForEach.skin = function(gltf, handler) {
  return ForEach.topLevel(gltf, "skins", handler);
};
ForEach.skinJoint = function(skin, handler) {
  const joints = skin.joints;
  if (defined2(joints)) {
    const jointsLength = joints.length;
    for (let i = 0; i < jointsLength; i++) {
      const joint = joints[i];
      const value = handler(joint);
      if (defined2(value)) {
        return value;
      }
    }
  }
};
ForEach.techniqueAttribute = function(technique, handler) {
  const attributes = technique.attributes;
  for (const attributeName in attributes) {
    if (Object.prototype.hasOwnProperty.call(attributes, attributeName)) {
      const value = handler(attributes[attributeName], attributeName);
      if (defined2(value)) {
        return value;
      }
    }
  }
};
ForEach.techniqueUniform = function(technique, handler) {
  const uniforms = technique.uniforms;
  for (const uniformName in uniforms) {
    if (Object.prototype.hasOwnProperty.call(uniforms, uniformName)) {
      const value = handler(uniforms[uniformName], uniformName);
      if (defined2(value)) {
        return value;
      }
    }
  }
};
ForEach.techniqueParameter = function(technique, handler) {
  const parameters = technique.parameters;
  for (const parameterName in parameters) {
    if (Object.prototype.hasOwnProperty.call(parameters, parameterName)) {
      const value = handler(parameters[parameterName], parameterName);
      if (defined2(value)) {
        return value;
      }
    }
  }
};
ForEach.technique = function(gltf, handler) {
  if (usesExtension_default(gltf, "KHR_techniques_webgl")) {
    return ForEach.object(
      gltf.extensions.KHR_techniques_webgl.techniques,
      handler
    );
  }
  return ForEach.topLevel(gltf, "techniques", handler);
};
ForEach.texture = function(gltf, handler) {
  return ForEach.topLevel(gltf, "textures", handler);
};
var ForEach_default = ForEach;

// packages/gltf/Source/getAccessorByteStride.js
import { ComponentDatatype, defined as defined3 } from "@cesium/core";

// packages/gltf/Source/numberOfComponentsForType.js
function numberOfComponentsForType(type) {
  switch (type) {
    case "SCALAR":
      return 1;
    case "VEC2":
      return 2;
    case "VEC3":
      return 3;
    case "VEC4":
    case "MAT2":
      return 4;
    case "MAT3":
      return 9;
    case "MAT4":
      return 16;
  }
}
var numberOfComponentsForType_default = numberOfComponentsForType;

// packages/gltf/Source/getAccessorByteStride.js
function getAccessorByteStride(gltf, accessor) {
  const bufferViewId = accessor.bufferView;
  if (defined3(bufferViewId)) {
    const bufferView = gltf.bufferViews[bufferViewId];
    if (defined3(bufferView.byteStride) && bufferView.byteStride > 0) {
      return bufferView.byteStride;
    }
  }
  return ComponentDatatype.getSizeInBytes(accessor.componentType) * numberOfComponentsForType_default(accessor.type);
}
var getAccessorByteStride_default = getAccessorByteStride;

// packages/gltf/Source/addDefaults.js
function addDefaults(gltf) {
  ForEach_default.accessor(gltf, function(accessor) {
    if (defined4(accessor.bufferView)) {
      accessor.byteOffset = accessor.byteOffset ?? 0;
    }
  });
  ForEach_default.bufferView(gltf, function(bufferView) {
    if (defined4(bufferView.buffer)) {
      bufferView.byteOffset = bufferView.byteOffset ?? 0;
    }
  });
  ForEach_default.mesh(gltf, function(mesh) {
    ForEach_default.meshPrimitive(mesh, function(primitive) {
      primitive.mode = primitive.mode ?? WebGLConstants.TRIANGLES;
      if (!defined4(primitive.material)) {
        if (!defined4(gltf.materials)) {
          gltf.materials = [];
        }
        const defaultMaterial = {
          name: "default"
        };
        primitive.material = addToArray_default(gltf.materials, defaultMaterial);
      }
    });
  });
  ForEach_default.accessorContainingVertexAttributeData(gltf, function(accessorId) {
    const accessor = gltf.accessors[accessorId];
    const bufferViewId = accessor.bufferView;
    accessor.normalized = accessor.normalized ?? false;
    if (defined4(bufferViewId)) {
      const bufferView = gltf.bufferViews[bufferViewId];
      bufferView.byteStride = getAccessorByteStride_default(gltf, accessor);
      bufferView.target = WebGLConstants.ARRAY_BUFFER;
    }
  });
  ForEach_default.accessorContainingIndexData(gltf, function(accessorId) {
    const accessor = gltf.accessors[accessorId];
    const bufferViewId = accessor.bufferView;
    if (defined4(bufferViewId)) {
      const bufferView = gltf.bufferViews[bufferViewId];
      bufferView.target = WebGLConstants.ELEMENT_ARRAY_BUFFER;
    }
  });
  ForEach_default.material(gltf, function(material) {
    const extensions = material.extensions ?? {};
    const materialsCommon = extensions.KHR_materials_common;
    if (defined4(materialsCommon)) {
      const technique = materialsCommon.technique;
      const values = defined4(materialsCommon.values) ? materialsCommon.values : {};
      materialsCommon.values = values;
      values.ambient = defined4(values.ambient) ? values.ambient : [0, 0, 0, 1];
      values.emission = defined4(values.emission) ? values.emission : [0, 0, 0, 1];
      values.transparency = values.transparency ?? 1;
      if (technique !== "CONSTANT") {
        values.diffuse = defined4(values.diffuse) ? values.diffuse : [0, 0, 0, 1];
        if (technique !== "LAMBERT") {
          values.specular = defined4(values.specular) ? values.specular : [0, 0, 0, 1];
          values.shininess = values.shininess ?? 0;
        }
      }
      materialsCommon.transparent = materialsCommon.transparent ?? false;
      materialsCommon.doubleSided = materialsCommon.doubleSided ?? false;
      return;
    }
    material.emissiveFactor = material.emissiveFactor ?? [0, 0, 0];
    material.alphaMode = material.alphaMode ?? "OPAQUE";
    material.doubleSided = material.doubleSided ?? false;
    if (material.alphaMode === "MASK") {
      material.alphaCutoff = material.alphaCutoff ?? 0.5;
    }
    const techniquesExtension = extensions.KHR_techniques_webgl;
    if (defined4(techniquesExtension)) {
      ForEach_default.materialValue(material, function(materialValue) {
        if (defined4(materialValue.index)) {
          addTextureDefaults(materialValue);
        }
      });
    }
    addTextureDefaults(material.emissiveTexture);
    addTextureDefaults(material.normalTexture);
    addTextureDefaults(material.occlusionTexture);
    const pbrMetallicRoughness = material.pbrMetallicRoughness;
    if (defined4(pbrMetallicRoughness)) {
      pbrMetallicRoughness.baseColorFactor = pbrMetallicRoughness.baseColorFactor ?? [1, 1, 1, 1];
      pbrMetallicRoughness.metallicFactor = pbrMetallicRoughness.metallicFactor ?? 1;
      pbrMetallicRoughness.roughnessFactor = pbrMetallicRoughness.roughnessFactor ?? 1;
      addTextureDefaults(pbrMetallicRoughness.baseColorTexture);
      addTextureDefaults(pbrMetallicRoughness.metallicRoughnessTexture);
    }
    const pbrSpecularGlossiness = extensions.KHR_materials_pbrSpecularGlossiness;
    if (defined4(pbrSpecularGlossiness)) {
      pbrSpecularGlossiness.diffuseFactor = pbrSpecularGlossiness.diffuseFactor ?? [1, 1, 1, 1];
      pbrSpecularGlossiness.specularFactor = pbrSpecularGlossiness.specularFactor ?? [1, 1, 1];
      pbrSpecularGlossiness.glossinessFactor = pbrSpecularGlossiness.glossinessFactor ?? 1;
      addTextureDefaults(pbrSpecularGlossiness.specularGlossinessTexture);
    }
  });
  ForEach_default.animation(gltf, function(animation) {
    ForEach_default.animationSampler(animation, function(sampler) {
      sampler.interpolation = sampler.interpolation ?? "LINEAR";
    });
  });
  const animatedNodes = getAnimatedNodes(gltf);
  ForEach_default.node(gltf, function(node, id) {
    const animated = defined4(animatedNodes[id]);
    if (animated || defined4(node.translation) || defined4(node.rotation) || defined4(node.scale)) {
      node.translation = node.translation ?? [0, 0, 0];
      node.rotation = node.rotation ?? [0, 0, 0, 1];
      node.scale = node.scale ?? [1, 1, 1];
    } else {
      node.matrix = node.matrix ?? [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ];
    }
  });
  ForEach_default.sampler(gltf, function(sampler) {
    sampler.wrapS = sampler.wrapS ?? WebGLConstants.REPEAT;
    sampler.wrapT = sampler.wrapT ?? WebGLConstants.REPEAT;
  });
  if (defined4(gltf.scenes) && !defined4(gltf.scene)) {
    gltf.scene = 0;
  }
  return gltf;
}
function getAnimatedNodes(gltf) {
  const nodes = {};
  ForEach_default.animation(gltf, function(animation) {
    ForEach_default.animationChannel(animation, function(channel) {
      const target = channel.target;
      const nodeId = target.node;
      const path = target.path;
      if (path === "translation" || path === "rotation" || path === "scale") {
        nodes[nodeId] = true;
      }
    });
  });
  return nodes;
}
function addTextureDefaults(texture) {
  if (defined4(texture)) {
    texture.texCoord = texture.texCoord ?? 0;
  }
}
var addDefaults_default = addDefaults;

// packages/gltf/Source/addExtensionsRequired.js
import { defined as defined6 } from "@cesium/core";

// packages/gltf/Source/addExtensionsUsed.js
import { defined as defined5 } from "@cesium/core";
function addExtensionsUsed(gltf, extension) {
  let extensionsUsed = gltf.extensionsUsed;
  if (!defined5(extensionsUsed)) {
    extensionsUsed = [];
    gltf.extensionsUsed = extensionsUsed;
  }
  addToArray_default(extensionsUsed, extension, true);
}
var addExtensionsUsed_default = addExtensionsUsed;

// packages/gltf/Source/addExtensionsRequired.js
function addExtensionsRequired(gltf, extension) {
  let extensionsRequired = gltf.extensionsRequired;
  if (!defined6(extensionsRequired)) {
    extensionsRequired = [];
    gltf.extensionsRequired = extensionsRequired;
  }
  addToArray_default(extensionsRequired, extension, true);
  addExtensionsUsed_default(gltf, extension);
}
var addExtensionsRequired_default = addExtensionsRequired;

// packages/gltf/Source/addPipelineExtras.js
import { defined as defined7 } from "@cesium/core";
function addPipelineExtras(gltf) {
  ForEach_default.shader(gltf, function(shader) {
    addExtras(shader);
  });
  ForEach_default.buffer(gltf, function(buffer) {
    addExtras(buffer);
  });
  ForEach_default.image(gltf, function(image) {
    addExtras(image);
  });
  addExtras(gltf);
  return gltf;
}
function addExtras(object) {
  object.extras = defined7(object.extras) ? object.extras : {};
  object.extras._pipeline = defined7(object.extras._pipeline) ? object.extras._pipeline : {};
}
var addPipelineExtras_default = addPipelineExtras;

// packages/gltf/Source/constructBoundingVolumeJson.js
import {
  Cartesian3,
  DeveloperError,
  Matrix3,
  Quaternion,
  defined as defined8
} from "@cesium/core";
function constructBoundingVolumeJson(boundingVolumeJson, shapes) {
  const {
    shape,
    translation = [0, 0, 0],
    rotation,
    scale
  } = boundingVolumeJson;
  const { box, sphere } = shapes[shape];
  if (defined8(box)) {
    return constructBox(box, translation, rotation, scale);
  }
  if (defined8(sphere)) {
    return constructSphere(sphere, translation, scale);
  }
  throw new DeveloperError(
    "Only box and sphere shapes are supported for the bounding volume."
  );
}
function constructBox(box, translation, rotation, scale) {
  const halfAxes = Matrix3.fromScale(
    new Cartesian3(box.size[0] * 0.5, box.size[1] * 0.5, box.size[2] * 0.5)
  );
  if (defined8(scale)) {
    Matrix3.multiplyByScale(
      halfAxes,
      new Cartesian3(scale[0], scale[1], scale[2]),
      halfAxes
    );
  }
  if (defined8(rotation)) {
    Matrix3.multiply(
      Matrix3.fromQuaternion(Quaternion.unpack(rotation)),
      halfAxes,
      halfAxes
    );
  }
  return { box: Matrix3.pack(halfAxes, translation.slice(), 3) };
}
function constructSphere(sphere, translation, scale) {
  let radius = sphere.radius ?? 0.5;
  if (defined8(scale)) {
    radius *= Math.max(
      Math.abs(scale[0]),
      Math.abs(scale[1]),
      Math.abs(scale[2])
    );
  }
  return { sphere: [translation[0], translation[1], translation[2], radius] };
}
var constructBoundingVolumeJson_default = constructBoundingVolumeJson;

// packages/gltf/Source/findAccessorMinMax.js
import { defined as defined9 } from "@cesium/core";

// packages/gltf/Source/getComponentReader.js
import { ComponentDatatype as ComponentDatatype2, RuntimeError } from "@cesium/core";
function getComponentReader(componentType) {
  const byteLength = ComponentDatatype2.getSizeInBytes(componentType);
  switch (componentType) {
    case ComponentDatatype2.BYTE:
      return function(dataView, byteOffset, numberOfComponents, result) {
        for (let i = 0; i < numberOfComponents; ++i) {
          result[i] = dataView.getInt8(byteOffset + i * byteLength);
        }
      };
    case ComponentDatatype2.UNSIGNED_BYTE:
      return function(dataView, byteOffset, numberOfComponents, result) {
        for (let i = 0; i < numberOfComponents; ++i) {
          result[i] = dataView.getUint8(byteOffset + i * byteLength);
        }
      };
    case ComponentDatatype2.SHORT:
      return function(dataView, byteOffset, numberOfComponents, result) {
        for (let i = 0; i < numberOfComponents; ++i) {
          result[i] = dataView.getInt16(byteOffset + i * byteLength, true);
        }
      };
    case ComponentDatatype2.UNSIGNED_SHORT:
      return function(dataView, byteOffset, numberOfComponents, result) {
        for (let i = 0; i < numberOfComponents; ++i) {
          result[i] = dataView.getUint16(byteOffset + i * byteLength, true);
        }
      };
    case ComponentDatatype2.INT:
      return function(dataView, byteOffset, numberOfComponents, result) {
        for (let i = 0; i < numberOfComponents; ++i) {
          result[i] = dataView.getInt32(byteOffset + i * byteLength, true);
        }
      };
    case ComponentDatatype2.UNSIGNED_INT:
      return function(dataView, byteOffset, numberOfComponents, result) {
        for (let i = 0; i < numberOfComponents; ++i) {
          result[i] = dataView.getUint32(byteOffset + i * byteLength, true);
        }
      };
    case ComponentDatatype2.FLOAT:
      return function(dataView, byteOffset, numberOfComponents, result) {
        for (let i = 0; i < numberOfComponents; ++i) {
          result[i] = dataView.getFloat32(byteOffset + i * byteLength, true);
        }
      };
    case ComponentDatatype2.DOUBLE:
      return function(dataView, byteOffset, numberOfComponents, result) {
        for (let i = 0; i < numberOfComponents; ++i) {
          result[i] = dataView.getFloat64(byteOffset + i * byteLength, true);
        }
      };
    default:
      throw new RuntimeError(`Unsupported component type: ${componentType}`);
  }
}
var getComponentReader_default = getComponentReader;

// packages/gltf/Source/findAccessorMinMax.js
function findAccessorMinMax(gltf, accessor) {
  const bufferViews = gltf.bufferViews;
  const buffers = gltf.buffers;
  const bufferViewId = accessor.bufferView;
  const numberOfComponents = numberOfComponentsForType_default(accessor.type);
  if (!defined9(accessor.bufferView)) {
    return {
      min: new Array(numberOfComponents).fill(0),
      max: new Array(numberOfComponents).fill(0)
    };
  }
  const min = new Array(numberOfComponents).fill(Number.POSITIVE_INFINITY);
  const max = new Array(numberOfComponents).fill(Number.NEGATIVE_INFINITY);
  const bufferView = bufferViews[bufferViewId];
  const bufferId = bufferView.buffer;
  const buffer = buffers[bufferId];
  const source = buffer.extras._pipeline.source;
  const count = accessor.count;
  const byteStride = getAccessorByteStride_default(gltf, accessor);
  let byteOffset = accessor.byteOffset + bufferView.byteOffset + source.byteOffset;
  const componentType = accessor.componentType;
  const dataView = new DataView(source.buffer);
  const components = new Array(numberOfComponents);
  const componentReader = getComponentReader_default(componentType);
  for (let i = 0; i < count; i++) {
    componentReader(dataView, byteOffset, numberOfComponents, components);
    for (let j = 0; j < numberOfComponents; j++) {
      const value = components[j];
      min[j] = Math.min(min[j], value);
      max[j] = Math.max(max[j], value);
    }
    byteOffset += byteStride;
  }
  return {
    min,
    max
  };
}
var findAccessorMinMax_default = findAccessorMinMax;

// packages/gltf/Source/forEachTextureInMaterial.js
import { Check, defined as defined10 } from "@cesium/core";
function forEachTextureInMaterial(material, handler) {
  Check.typeOf.object("material", material);
  Check.defined("handler", handler);
  const pbrMetallicRoughness = material.pbrMetallicRoughness;
  if (defined10(pbrMetallicRoughness)) {
    if (defined10(pbrMetallicRoughness.baseColorTexture)) {
      const textureInfo = pbrMetallicRoughness.baseColorTexture;
      const value2 = handler(textureInfo.index, textureInfo);
      if (defined10(value2)) {
        return value2;
      }
    }
    if (defined10(pbrMetallicRoughness.metallicRoughnessTexture)) {
      const textureInfo = pbrMetallicRoughness.metallicRoughnessTexture;
      const value2 = handler(textureInfo.index, textureInfo);
      if (defined10(value2)) {
        return value2;
      }
    }
  }
  const { extensions } = material;
  if (defined10(extensions)) {
    const pbrSpecularGlossiness = extensions.KHR_materials_pbrSpecularGlossiness;
    if (defined10(pbrSpecularGlossiness)) {
      if (defined10(pbrSpecularGlossiness.diffuseTexture)) {
        const textureInfo = pbrSpecularGlossiness.diffuseTexture;
        const value2 = handler(textureInfo.index, textureInfo);
        if (defined10(value2)) {
          return value2;
        }
      }
      if (defined10(pbrSpecularGlossiness.specularGlossinessTexture)) {
        const textureInfo = pbrSpecularGlossiness.specularGlossinessTexture;
        const value2 = handler(textureInfo.index, textureInfo);
        if (defined10(value2)) {
          return value2;
        }
      }
    }
    const specular = extensions.KHR_materials_specular;
    if (defined10(specular)) {
      const { specularTexture, specularColorTexture } = specular;
      if (defined10(specularTexture)) {
        const value2 = handler(specularTexture.index, specularTexture);
        if (defined10(value2)) {
          return value2;
        }
      }
      if (defined10(specularColorTexture)) {
        const value2 = handler(specularColorTexture.index, specularColorTexture);
        if (defined10(value2)) {
          return value2;
        }
      }
    }
    const transmission = extensions.KHR_materials_transmission;
    if (defined10(transmission) && defined10(transmission.transmissionTexture)) {
      const textureInfo = transmission.transmissionTexture;
      const value2 = handler(textureInfo.index, textureInfo);
      if (defined10(value2)) {
        return value2;
      }
    }
    const materialsCommon = extensions.KHR_materials_common;
    if (defined10(materialsCommon) && defined10(materialsCommon.values)) {
      const { diffuse, ambient, emission, specular: specular2 } = materialsCommon.values;
      if (defined10(diffuse) && defined10(diffuse.index)) {
        const value2 = handler(diffuse.index, diffuse);
        if (defined10(value2)) {
          return value2;
        }
      }
      if (defined10(ambient) && defined10(ambient.index)) {
        const value2 = handler(ambient.index, ambient);
        if (defined10(value2)) {
          return value2;
        }
      }
      if (defined10(emission) && defined10(emission.index)) {
        const value2 = handler(emission.index, emission);
        if (defined10(value2)) {
          return value2;
        }
      }
      if (defined10(specular2) && defined10(specular2.index)) {
        const value2 = handler(specular2.index, specular2);
        if (defined10(value2)) {
          return value2;
        }
      }
    }
  }
  const value = ForEach_default.materialValue(material, function(materialValue) {
    if (defined10(materialValue.index)) {
      const value2 = handler(materialValue.index, materialValue);
      if (defined10(value2)) {
        return value2;
      }
    }
  });
  if (defined10(value)) {
    return value;
  }
  if (defined10(material.emissiveTexture)) {
    const textureInfo = material.emissiveTexture;
    const value2 = handler(textureInfo.index, textureInfo);
    if (defined10(value2)) {
      return value2;
    }
  }
  if (defined10(material.normalTexture)) {
    const textureInfo = material.normalTexture;
    const value2 = handler(textureInfo.index, textureInfo);
    if (defined10(value2)) {
      return value2;
    }
  }
  if (defined10(material.occlusionTexture)) {
    const textureInfo = material.occlusionTexture;
    const value2 = handler(textureInfo.index, textureInfo);
    if (defined10(value2)) {
      return value2;
    }
  }
}
var forEachTextureInMaterial_default = forEachTextureInMaterial;

// packages/gltf/Source/getNodeTransform.js
import { Cartesian3 as Cartesian32, Matrix4, Quaternion as Quaternion2, defined as defined11 } from "@cesium/core";
function getNodeTransform(nodeJson) {
  const { matrix, translation, rotation, scale } = nodeJson;
  if (defined11(matrix)) {
    return matrix;
  }
  if (!defined11(translation) && !defined11(rotation) && !defined11(scale)) {
    return void 0;
  }
  const transform = Matrix4.fromTranslationQuaternionRotationScale(
    defined11(translation) ? Cartesian32.unpack(translation) : Cartesian32.ZERO,
    defined11(rotation) ? Quaternion2.unpack(rotation) : Quaternion2.IDENTITY,
    defined11(scale) ? Cartesian32.unpack(scale) : new Cartesian32(1, 1, 1)
  );
  return Matrix4.pack(transform, new Array(16));
}
var getNodeTransform_default = getNodeTransform;

// packages/gltf/Source/moveTechniqueRenderStates.js
import { WebGLConstants as WebGLConstants2, defined as defined12 } from "@cesium/core";
var defaultBlendEquation = [WebGLConstants2.FUNC_ADD, WebGLConstants2.FUNC_ADD];
var defaultBlendFactors = [
  WebGLConstants2.ONE,
  WebGLConstants2.ZERO,
  WebGLConstants2.ONE,
  WebGLConstants2.ZERO
];
function isStateEnabled(renderStates, state) {
  const enabled = renderStates.enable;
  if (!defined12(enabled)) {
    return false;
  }
  return enabled.indexOf(state) > -1;
}
var supportedBlendFactors = [
  WebGLConstants2.ZERO,
  WebGLConstants2.ONE,
  WebGLConstants2.SRC_COLOR,
  WebGLConstants2.ONE_MINUS_SRC_COLOR,
  WebGLConstants2.SRC_ALPHA,
  WebGLConstants2.ONE_MINUS_SRC_ALPHA,
  WebGLConstants2.DST_ALPHA,
  WebGLConstants2.ONE_MINUS_DST_ALPHA,
  WebGLConstants2.DST_COLOR,
  WebGLConstants2.ONE_MINUS_DST_COLOR
];
function getSupportedBlendFactors(value, defaultValue) {
  if (!defined12(value)) {
    return defaultValue;
  }
  for (let i = 0; i < 4; i++) {
    if (supportedBlendFactors.indexOf(value[i]) === -1) {
      return defaultValue;
    }
  }
  return value;
}
function moveTechniqueRenderStates(gltf) {
  const blendingForTechnique = {};
  const materialPropertiesForTechnique = {};
  const techniquesLegacy = gltf.techniques;
  if (!defined12(techniquesLegacy)) {
    return gltf;
  }
  ForEach_default.technique(gltf, function(techniqueLegacy, techniqueIndex) {
    const renderStates = techniqueLegacy.states;
    if (defined12(renderStates)) {
      const materialProperties = materialPropertiesForTechnique[techniqueIndex] = {};
      if (isStateEnabled(renderStates, WebGLConstants2.BLEND)) {
        materialProperties.alphaMode = "BLEND";
        const blendFunctions = renderStates.functions;
        if (defined12(blendFunctions) && (defined12(blendFunctions.blendEquationSeparate) || defined12(blendFunctions.blendFuncSeparate))) {
          blendingForTechnique[techniqueIndex] = {
            blendEquation: blendFunctions.blendEquationSeparate ?? defaultBlendEquation,
            blendFactors: getSupportedBlendFactors(
              blendFunctions.blendFuncSeparate,
              defaultBlendFactors
            )
          };
        }
      }
      if (!isStateEnabled(renderStates, WebGLConstants2.CULL_FACE)) {
        materialProperties.doubleSided = true;
      }
      delete techniqueLegacy.states;
    }
  });
  if (Object.keys(blendingForTechnique).length > 0) {
    if (!defined12(gltf.extensions)) {
      gltf.extensions = {};
    }
    addExtensionsUsed_default(gltf, "KHR_blend");
  }
  ForEach_default.material(gltf, function(material) {
    if (defined12(material.technique)) {
      const materialProperties = materialPropertiesForTechnique[material.technique];
      ForEach_default.objectLegacy(materialProperties, function(value, property) {
        material[property] = value;
      });
      const blending = blendingForTechnique[material.technique];
      if (defined12(blending)) {
        if (!defined12(material.extensions)) {
          material.extensions = {};
        }
        material.extensions.KHR_blend = blending;
      }
    }
  });
  return gltf;
}
var moveTechniqueRenderStates_default = moveTechniqueRenderStates;

// packages/gltf/Source/moveTechniquesToExtension.js
import { defined as defined13 } from "@cesium/core";
function moveTechniquesToExtension(gltf) {
  const techniquesLegacy = gltf.techniques;
  const mappedUniforms = {};
  const updatedTechniqueIndices = {};
  const seenPrograms = {};
  if (defined13(techniquesLegacy)) {
    const extension = {
      programs: [],
      shaders: [],
      techniques: []
    };
    const glExtensions = gltf.glExtensionsUsed;
    delete gltf.glExtensionsUsed;
    ForEach_default.technique(gltf, function(techniqueLegacy, techniqueId) {
      const technique = {
        name: techniqueLegacy.name,
        program: void 0,
        attributes: {},
        uniforms: {}
      };
      let parameterLegacy;
      ForEach_default.techniqueAttribute(
        techniqueLegacy,
        function(parameterName, attributeName) {
          parameterLegacy = techniqueLegacy.parameters[parameterName];
          technique.attributes[attributeName] = {
            semantic: parameterLegacy.semantic
          };
        }
      );
      ForEach_default.techniqueUniform(
        techniqueLegacy,
        function(parameterName, uniformName) {
          parameterLegacy = techniqueLegacy.parameters[parameterName];
          technique.uniforms[uniformName] = {
            count: parameterLegacy.count,
            node: parameterLegacy.node,
            type: parameterLegacy.type,
            semantic: parameterLegacy.semantic,
            value: parameterLegacy.value
          };
          if (!defined13(mappedUniforms[techniqueId])) {
            mappedUniforms[techniqueId] = {};
          }
          mappedUniforms[techniqueId][parameterName] = uniformName;
        }
      );
      if (!defined13(seenPrograms[techniqueLegacy.program])) {
        const programLegacy = gltf.programs[techniqueLegacy.program];
        const program = {
          name: programLegacy.name,
          fragmentShader: void 0,
          vertexShader: void 0,
          glExtensions
        };
        const fs = gltf.shaders[programLegacy.fragmentShader];
        program.fragmentShader = addToArray_default(extension.shaders, fs, true);
        const vs = gltf.shaders[programLegacy.vertexShader];
        program.vertexShader = addToArray_default(extension.shaders, vs, true);
        technique.program = addToArray_default(extension.programs, program);
        seenPrograms[techniqueLegacy.program] = technique.program;
      } else {
        technique.program = seenPrograms[techniqueLegacy.program];
      }
      updatedTechniqueIndices[techniqueId] = addToArray_default(
        extension.techniques,
        technique
      );
    });
    if (extension.techniques.length > 0) {
      if (!defined13(gltf.extensions)) {
        gltf.extensions = {};
      }
      gltf.extensions.KHR_techniques_webgl = extension;
      addExtensionsUsed_default(gltf, "KHR_techniques_webgl");
      addExtensionsRequired_default(gltf, "KHR_techniques_webgl");
    }
  }
  ForEach_default.material(gltf, function(material) {
    if (defined13(material.technique)) {
      const materialExtension = {
        technique: updatedTechniqueIndices[material.technique]
      };
      ForEach_default.objectLegacy(material.values, function(value, parameterName) {
        if (!defined13(materialExtension.values)) {
          materialExtension.values = {};
        }
        const uniformName = mappedUniforms[material.technique][parameterName];
        if (defined13(uniformName)) {
          materialExtension.values[uniformName] = value;
        }
      });
      if (!defined13(material.extensions)) {
        material.extensions = {};
      }
      material.extensions.KHR_techniques_webgl = materialExtension;
    }
    delete material.technique;
    delete material.values;
  });
  delete gltf.techniques;
  delete gltf.programs;
  delete gltf.shaders;
  return gltf;
}
var moveTechniquesToExtension_default = moveTechniquesToExtension;

// packages/gltf/Source/parseGlb.js
import {
  RuntimeError as RuntimeError2,
  defined as defined16,
  getMagic,
  getStringFromTypedArray
} from "@cesium/core";

// packages/gltf/Source/removeExtensionsUsed.js
import { defined as defined15 } from "@cesium/core";

// packages/gltf/Source/removeExtensionsRequired.js
import { defined as defined14 } from "@cesium/core";
function removeExtensionsRequired(gltf, extension) {
  const extensionsRequired = gltf.extensionsRequired;
  if (defined14(extensionsRequired)) {
    const index = extensionsRequired.indexOf(extension);
    if (index >= 0) {
      extensionsRequired.splice(index, 1);
    }
    if (extensionsRequired.length === 0) {
      delete gltf.extensionsRequired;
    }
  }
}
var removeExtensionsRequired_default = removeExtensionsRequired;

// packages/gltf/Source/removeExtensionsUsed.js
function removeExtensionsUsed(gltf, extension) {
  const extensionsUsed = gltf.extensionsUsed;
  if (defined15(extensionsUsed)) {
    const index = extensionsUsed.indexOf(extension);
    if (index >= 0) {
      extensionsUsed.splice(index, 1);
    }
    removeExtensionsRequired_default(gltf, extension);
    if (extensionsUsed.length === 0) {
      delete gltf.extensionsUsed;
    }
  }
}
var removeExtensionsUsed_default = removeExtensionsUsed;

// packages/gltf/Source/parseGlb.js
var sizeOfUint32 = 4;
function parseGlb(glb) {
  const magic = getMagic(glb);
  if (magic !== "glTF") {
    throw new RuntimeError2("File is not valid binary glTF");
  }
  const header = readHeader(glb, 0, 5);
  const version = header[1];
  if (version !== 1 && version !== 2) {
    throw new RuntimeError2("Binary glTF version is not 1 or 2");
  }
  if (version === 1) {
    return parseGlbVersion1(glb, header);
  }
  return parseGlbVersion2(glb, header);
}
function readHeader(glb, byteOffset, count) {
  const dataView = new DataView(glb.buffer);
  const header = new Array(count);
  for (let i = 0; i < count; ++i) {
    header[i] = dataView.getUint32(
      glb.byteOffset + byteOffset + i * sizeOfUint32,
      true
    );
  }
  return header;
}
function parseGlbVersion1(glb, header) {
  const length = header[2];
  const contentLength = header[3];
  const contentFormat = header[4];
  if (contentFormat !== 0) {
    throw new RuntimeError2("Binary glTF scene format is not JSON");
  }
  const jsonStart = 20;
  const binaryStart = jsonStart + contentLength;
  const contentString = getStringFromTypedArray(glb, jsonStart, contentLength);
  const gltf = JSON.parse(contentString);
  addPipelineExtras_default(gltf);
  const binaryBuffer = glb.subarray(binaryStart, length);
  const buffers = gltf.buffers;
  if (defined16(buffers) && Object.keys(buffers).length > 0) {
    const binaryGltfBuffer = buffers.binary_glTF ?? buffers.KHR_binary_glTF;
    if (defined16(binaryGltfBuffer)) {
      binaryGltfBuffer.extras._pipeline.source = binaryBuffer;
      delete binaryGltfBuffer.uri;
    }
  }
  removeExtensionsUsed_default(gltf, "KHR_binary_glTF");
  return gltf;
}
function parseGlbVersion2(glb, header) {
  const length = header[2];
  let byteOffset = 12;
  let gltf;
  let binaryBuffer;
  while (byteOffset < length) {
    const chunkHeader = readHeader(glb, byteOffset, 2);
    const chunkLength = chunkHeader[0];
    const chunkType = chunkHeader[1];
    byteOffset += 8;
    const chunkBuffer = glb.subarray(byteOffset, byteOffset + chunkLength);
    byteOffset += chunkLength;
    if (chunkType === 1313821514) {
      const jsonString = getStringFromTypedArray(chunkBuffer);
      gltf = JSON.parse(jsonString);
      addPipelineExtras_default(gltf);
    } else if (chunkType === 5130562) {
      binaryBuffer = chunkBuffer;
    }
  }
  if (defined16(gltf) && defined16(binaryBuffer)) {
    const buffers = gltf.buffers;
    if (defined16(buffers) && buffers.length > 0) {
      const buffer = buffers[0];
      buffer.extras._pipeline.source = binaryBuffer;
    }
  }
  return gltf;
}
var parseGlb_default = parseGlb;

// packages/gltf/Source/readAccessorPacked.js
import { defined as defined17 } from "@cesium/core";
function readAccessorPacked(gltf, accessor) {
  const byteStride = getAccessorByteStride_default(gltf, accessor);
  const numberOfComponents = numberOfComponentsForType_default(accessor.type);
  const count = accessor.count;
  const values = new Array(numberOfComponents * count);
  if (!defined17(accessor.bufferView)) {
    return values.fill(0);
  }
  const bufferView = gltf.bufferViews[accessor.bufferView];
  const source = gltf.buffers[bufferView.buffer].extras._pipeline.source;
  let byteOffset = accessor.byteOffset + bufferView.byteOffset + source.byteOffset;
  const dataView = new DataView(source.buffer);
  const components = new Array(numberOfComponents);
  const componentReader = getComponentReader_default(accessor.componentType);
  for (let i = 0; i < count; ++i) {
    componentReader(dataView, byteOffset, numberOfComponents, components);
    for (let j = 0; j < numberOfComponents; ++j) {
      values[i * numberOfComponents + j] = components[j];
    }
    byteOffset += byteStride;
  }
  return values;
}
var readAccessorPacked_default = readAccessorPacked;

// packages/gltf/Source/removeExtension.js
import { defined as defined18 } from "@cesium/core";
function removeExtension(gltf, extension) {
  removeExtensionsUsed_default(gltf, extension);
  if (extension === "CESIUM_RTC") {
    removeCesiumRTC(gltf);
  }
  return removeExtensionAndTraverse(gltf, extension);
}
function removeCesiumRTC(gltf) {
  ForEach_default.technique(gltf, function(technique) {
    ForEach_default.techniqueUniform(technique, function(uniform) {
      if (uniform.semantic === "CESIUM_RTC_MODELVIEW") {
        uniform.semantic = "MODELVIEW";
      }
    });
  });
}
function removeExtensionAndTraverse(object, extension) {
  if (Array.isArray(object)) {
    const length = object.length;
    for (let i = 0; i < length; ++i) {
      removeExtensionAndTraverse(object[i], extension);
    }
  } else if (object !== null && typeof object === "object" && object.constructor === Object) {
    const extensions = object.extensions;
    let extensionData;
    if (defined18(extensions)) {
      extensionData = extensions[extension];
      if (defined18(extensionData)) {
        delete extensions[extension];
        if (Object.keys(extensions).length === 0) {
          delete object.extensions;
        }
      }
    }
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        removeExtensionAndTraverse(object[key], extension);
      }
    }
    return extensionData;
  }
}
var removeExtension_default = removeExtension;

// packages/gltf/Source/removePipelineExtras.js
import { defined as defined19 } from "@cesium/core";
function removePipelineExtras(gltf) {
  ForEach_default.shader(gltf, function(shader) {
    removeExtras(shader);
  });
  ForEach_default.buffer(gltf, function(buffer) {
    removeExtras(buffer);
  });
  ForEach_default.image(gltf, function(image) {
    removeExtras(image);
  });
  removeExtras(gltf);
  return gltf;
}
function removeExtras(object) {
  if (!defined19(object.extras)) {
    return;
  }
  if (defined19(object.extras._pipeline)) {
    delete object.extras._pipeline;
  }
  if (Object.keys(object.extras).length === 0) {
    delete object.extras;
  }
}
var removePipelineExtras_default = removePipelineExtras;

// packages/gltf/Source/removeUnusedElements.js
import { defined as defined20 } from "@cesium/core";
var allElementTypes = [
  "mesh",
  "node",
  "material",
  "accessor",
  "bufferView",
  "buffer",
  "texture",
  "sampler",
  "image"
];
function removeUnusedElements(gltf, elementTypes) {
  elementTypes = elementTypes ?? allElementTypes;
  allElementTypes.forEach(function(type) {
    if (elementTypes.indexOf(type) > -1) {
      removeUnusedElementsByType(gltf, type);
    }
  });
  return gltf;
}
var TypeToGltfElementName = {
  accessor: "accessors",
  buffer: "buffers",
  bufferView: "bufferViews",
  image: "images",
  node: "nodes",
  material: "materials",
  mesh: "meshes",
  sampler: "samplers",
  texture: "textures"
};
function removeUnusedElementsByType(gltf, type) {
  const name = TypeToGltfElementName[type];
  const arrayOfObjects = gltf[name];
  if (defined20(arrayOfObjects)) {
    let removed = 0;
    const usedIds = getListOfElementsIdsInUse[type](gltf);
    const length = arrayOfObjects.length;
    for (let i = 0; i < length; ++i) {
      if (!usedIds[i]) {
        Remove[type](gltf, i - removed);
        removed++;
      }
    }
  }
}
function Remove() {
}
Remove.accessor = function(gltf, accessorId) {
  const accessors = gltf.accessors;
  accessors.splice(accessorId, 1);
  ForEach_default.mesh(gltf, function(mesh) {
    ForEach_default.meshPrimitive(mesh, function(primitive) {
      ForEach_default.meshPrimitiveAttribute(
        primitive,
        function(attributeAccessorId, semantic) {
          if (attributeAccessorId > accessorId) {
            primitive.attributes[semantic]--;
          }
        }
      );
      ForEach_default.meshPrimitiveTarget(primitive, function(target) {
        ForEach_default.meshPrimitiveTargetAttribute(
          target,
          function(attributeAccessorId, semantic) {
            if (attributeAccessorId > accessorId) {
              target[semantic]--;
            }
          }
        );
      });
      const indices = primitive.indices;
      if (defined20(indices) && indices > accessorId) {
        primitive.indices--;
      }
      const ext = primitive.extensions;
      if (defined20(ext) && defined20(ext.CESIUM_primitive_outline) && ext.CESIUM_primitive_outline.indices > accessorId) {
        --ext.CESIUM_primitive_outline.indices;
      }
    });
  });
  ForEach_default.skin(gltf, function(skin) {
    if (defined20(skin.inverseBindMatrices) && skin.inverseBindMatrices > accessorId) {
      skin.inverseBindMatrices--;
    }
  });
  ForEach_default.animation(gltf, function(animation) {
    ForEach_default.animationSampler(animation, function(sampler) {
      if (defined20(sampler.input) && sampler.input > accessorId) {
        sampler.input--;
      }
      if (defined20(sampler.output) && sampler.output > accessorId) {
        sampler.output--;
      }
    });
  });
};
Remove.buffer = function(gltf, bufferId) {
  const buffers = gltf.buffers;
  buffers.splice(bufferId, 1);
  ForEach_default.bufferView(gltf, function(bufferView) {
    if (defined20(bufferView.buffer) && bufferView.buffer > bufferId) {
      bufferView.buffer--;
    }
    const extensions = bufferView.extensions;
    if (defined20(extensions)) {
      const ext = extensions.EXT_meshopt_compression;
      if (defined20(ext) && ext.buffer > bufferId) {
        ext.buffer--;
      }
      const khr = extensions.KHR_meshopt_compression;
      if (defined20(khr) && khr.buffer > bufferId) {
        khr.buffer--;
      }
    }
  });
};
Remove.bufferView = function(gltf, bufferViewId) {
  const bufferViews = gltf.bufferViews;
  bufferViews.splice(bufferViewId, 1);
  ForEach_default.accessor(gltf, function(accessor) {
    if (defined20(accessor.bufferView) && accessor.bufferView > bufferViewId) {
      accessor.bufferView--;
    }
  });
  ForEach_default.shader(gltf, function(shader) {
    if (defined20(shader.bufferView) && shader.bufferView > bufferViewId) {
      shader.bufferView--;
    }
  });
  ForEach_default.image(gltf, function(image) {
    if (defined20(image.bufferView) && image.bufferView > bufferViewId) {
      image.bufferView--;
    }
  });
  if (usesExtension_default(gltf, "KHR_draco_mesh_compression")) {
    ForEach_default.mesh(gltf, function(mesh) {
      ForEach_default.meshPrimitive(mesh, function(primitive) {
        if (defined20(primitive.extensions) && defined20(primitive.extensions.KHR_draco_mesh_compression)) {
          if (primitive.extensions.KHR_draco_mesh_compression.bufferView > bufferViewId) {
            primitive.extensions.KHR_draco_mesh_compression.bufferView--;
          }
        }
      });
    });
  }
  if (usesExtension_default(gltf, "EXT_feature_metadata")) {
    const extension = gltf.extensions.EXT_feature_metadata;
    const featureTables = extension.featureTables;
    for (const featureTableId in featureTables) {
      if (featureTables.hasOwnProperty(featureTableId)) {
        const featureTable = featureTables[featureTableId];
        const properties = featureTable.properties;
        if (defined20(properties)) {
          for (const propertyId in properties) {
            if (properties.hasOwnProperty(propertyId)) {
              const property = properties[propertyId];
              if (defined20(property.bufferView) && property.bufferView > bufferViewId) {
                property.bufferView--;
              }
              if (defined20(property.arrayOffsetBufferView) && property.arrayOffsetBufferView > bufferViewId) {
                property.arrayOffsetBufferView--;
              }
              if (defined20(property.stringOffsetBufferView) && property.stringOffsetBufferView > bufferViewId) {
                property.stringOffsetBufferView--;
              }
            }
          }
        }
      }
    }
  }
  if (usesExtension_default(gltf, "EXT_structural_metadata")) {
    const extension = gltf.extensions.EXT_structural_metadata;
    const propertyTables = extension.propertyTables;
    if (defined20(propertyTables)) {
      const propertyTablesLength = propertyTables.length;
      for (let i = 0; i < propertyTablesLength; ++i) {
        const propertyTable = propertyTables[i];
        const properties = propertyTable.properties;
        for (const propertyId in properties) {
          if (properties.hasOwnProperty(propertyId)) {
            const property = properties[propertyId];
            if (defined20(property.values) && property.values > bufferViewId) {
              property.values--;
            }
            if (defined20(property.arrayOffsets) && property.arrayOffsets > bufferViewId) {
              property.arrayOffsets--;
            }
            if (defined20(property.stringOffsets) && property.stringOffsets > bufferViewId) {
              property.stringOffsets--;
            }
          }
        }
      }
    }
  }
};
Remove.image = function(gltf, imageId) {
  const images = gltf.images;
  images.splice(imageId, 1);
  ForEach_default.texture(gltf, function(texture) {
    if (defined20(texture.source)) {
      if (texture.source > imageId) {
        --texture.source;
      }
    }
    const ext = texture.extensions;
    if (defined20(ext) && defined20(ext.EXT_texture_webp) && ext.EXT_texture_webp.source > imageId) {
      --texture.extensions.EXT_texture_webp.source;
    } else if (defined20(ext) && defined20(ext.KHR_texture_basisu) && ext.KHR_texture_basisu.source > imageId) {
      --texture.extensions.KHR_texture_basisu.source;
    }
  });
};
Remove.mesh = function(gltf, meshId) {
  const meshes = gltf.meshes;
  meshes.splice(meshId, 1);
  ForEach_default.node(gltf, function(node) {
    if (defined20(node.mesh)) {
      if (node.mesh > meshId) {
        node.mesh--;
      } else if (node.mesh === meshId) {
        delete node.mesh;
      }
    }
  });
};
Remove.node = function(gltf, nodeId) {
  const nodes = gltf.nodes;
  nodes.splice(nodeId, 1);
  ForEach_default.skin(gltf, function(skin) {
    if (defined20(skin.skeleton) && skin.skeleton > nodeId) {
      skin.skeleton--;
    }
    skin.joints = skin.joints.map(function(x) {
      return x > nodeId ? x - 1 : x;
    });
  });
  ForEach_default.animation(gltf, function(animation) {
    ForEach_default.animationChannel(animation, function(channel) {
      if (defined20(channel.target) && defined20(channel.target.node) && channel.target.node > nodeId) {
        channel.target.node--;
      }
    });
  });
  ForEach_default.technique(gltf, function(technique) {
    ForEach_default.techniqueUniform(technique, function(uniform) {
      if (defined20(uniform.node) && uniform.node > nodeId) {
        uniform.node--;
      }
    });
  });
  ForEach_default.node(gltf, function(node) {
    if (!defined20(node.children)) {
      return;
    }
    node.children = node.children.filter(function(x) {
      return x !== nodeId;
    }).map(function(x) {
      return x > nodeId ? x - 1 : x;
    });
  });
  ForEach_default.scene(gltf, function(scene) {
    scene.nodes = scene.nodes.filter(function(x) {
      return x !== nodeId;
    }).map(function(x) {
      return x > nodeId ? x - 1 : x;
    });
  });
};
Remove.material = function(gltf, materialId) {
  const materials = gltf.materials;
  materials.splice(materialId, 1);
  ForEach_default.mesh(gltf, function(mesh) {
    ForEach_default.meshPrimitive(mesh, function(primitive) {
      if (defined20(primitive.material) && primitive.material > materialId) {
        primitive.material--;
      }
    });
  });
};
Remove.sampler = function(gltf, samplerId) {
  const samplers = gltf.samplers;
  samplers.splice(samplerId, 1);
  ForEach_default.texture(gltf, function(texture) {
    if (defined20(texture.sampler)) {
      if (texture.sampler > samplerId) {
        --texture.sampler;
      }
    }
  });
};
Remove.texture = function(gltf, textureId) {
  const textures = gltf.textures;
  textures.splice(textureId, 1);
  ForEach_default.material(gltf, function(material) {
    forEachTextureInMaterial_default(material, function(textureIndex, textureInfo) {
      if (textureInfo.index > textureId) {
        --textureInfo.index;
      }
    });
  });
  if (usesExtension_default(gltf, "EXT_feature_metadata")) {
    ForEach_default.mesh(gltf, function(mesh) {
      ForEach_default.meshPrimitive(mesh, function(primitive) {
        const extensions = primitive.extensions;
        if (defined20(extensions) && defined20(extensions.EXT_feature_metadata)) {
          const extension2 = extensions.EXT_feature_metadata;
          const featureIdTextures = extension2.featureIdTextures;
          if (defined20(featureIdTextures)) {
            const featureIdTexturesLength = featureIdTextures.length;
            for (let i = 0; i < featureIdTexturesLength; ++i) {
              const featureIdTexture = featureIdTextures[i];
              const textureInfo = featureIdTexture.featureIds.texture;
              if (textureInfo.index > textureId) {
                --textureInfo.index;
              }
            }
          }
        }
      });
    });
    const extension = gltf.extensions.EXT_feature_metadata;
    const featureTextures = extension.featureTextures;
    for (const featureTextureId in featureTextures) {
      if (featureTextures.hasOwnProperty(featureTextureId)) {
        const featureTexture = featureTextures[featureTextureId];
        const properties = featureTexture.properties;
        if (defined20(properties)) {
          for (const propertyId in properties) {
            if (properties.hasOwnProperty(propertyId)) {
              const property = properties[propertyId];
              const textureInfo = property.texture;
              if (textureInfo.index > textureId) {
                --textureInfo.index;
              }
            }
          }
        }
      }
    }
  }
  if (usesExtension_default(gltf, "EXT_mesh_features")) {
    ForEach_default.mesh(gltf, function(mesh) {
      ForEach_default.meshPrimitive(mesh, function(primitive) {
        const extensions = primitive.extensions;
        if (defined20(extensions) && defined20(extensions.EXT_mesh_features)) {
          const extension = extensions.EXT_mesh_features;
          const featureIds = extension.featureIds;
          if (defined20(featureIds)) {
            const featureIdsLength = featureIds.length;
            for (let i = 0; i < featureIdsLength; ++i) {
              const featureId = featureIds[i];
              if (defined20(featureId.texture)) {
                if (featureId.texture.index > textureId) {
                  --featureId.texture.index;
                }
              }
            }
          }
        }
      });
    });
  }
  if (usesExtension_default(gltf, "EXT_structural_metadata")) {
    const extension = gltf.extensions.EXT_structural_metadata;
    const propertyTextures = extension.propertyTextures;
    if (defined20(propertyTextures)) {
      const propertyTexturesLength = propertyTextures.length;
      for (let i = 0; i < propertyTexturesLength; ++i) {
        const propertyTexture = propertyTextures[i];
        const properties = propertyTexture.properties;
        for (const propertyId in properties) {
          if (properties.hasOwnProperty(propertyId)) {
            const property = properties[propertyId];
            if (property.index > textureId) {
              --property.index;
            }
          }
        }
      }
    }
  }
};
function getListOfElementsIdsInUse() {
}
getListOfElementsIdsInUse.accessor = function(gltf) {
  const usedAccessorIds = {};
  ForEach_default.mesh(gltf, function(mesh) {
    ForEach_default.meshPrimitive(mesh, function(primitive) {
      ForEach_default.meshPrimitiveAttribute(primitive, function(accessorId) {
        usedAccessorIds[accessorId] = true;
      });
      ForEach_default.meshPrimitiveTarget(primitive, function(target) {
        ForEach_default.meshPrimitiveTargetAttribute(target, function(accessorId) {
          usedAccessorIds[accessorId] = true;
        });
      });
      const indices = primitive.indices;
      if (defined20(indices)) {
        usedAccessorIds[indices] = true;
      }
    });
  });
  ForEach_default.skin(gltf, function(skin) {
    if (defined20(skin.inverseBindMatrices)) {
      usedAccessorIds[skin.inverseBindMatrices] = true;
    }
  });
  ForEach_default.animation(gltf, function(animation) {
    ForEach_default.animationSampler(animation, function(sampler) {
      if (defined20(sampler.input)) {
        usedAccessorIds[sampler.input] = true;
      }
      if (defined20(sampler.output)) {
        usedAccessorIds[sampler.output] = true;
      }
    });
  });
  if (usesExtension_default(gltf, "EXT_mesh_gpu_instancing")) {
    ForEach_default.node(gltf, function(node) {
      if (defined20(node.extensions) && defined20(node.extensions.EXT_mesh_gpu_instancing)) {
        Object.keys(node.extensions.EXT_mesh_gpu_instancing.attributes).forEach(
          function(key) {
            const attributeAccessorId = node.extensions.EXT_mesh_gpu_instancing.attributes[key];
            usedAccessorIds[attributeAccessorId] = true;
          }
        );
      }
    });
  }
  if (usesExtension_default(gltf, "CESIUM_primitive_outline")) {
    ForEach_default.mesh(gltf, function(mesh) {
      ForEach_default.meshPrimitive(mesh, function(primitive) {
        const extensions = primitive.extensions;
        if (defined20(extensions) && defined20(extensions.CESIUM_primitive_outline)) {
          const extension = extensions.CESIUM_primitive_outline;
          const indicesAccessorId = extension.indices;
          if (defined20(indicesAccessorId)) {
            usedAccessorIds[indicesAccessorId] = true;
          }
        }
      });
    });
  }
  return usedAccessorIds;
};
getListOfElementsIdsInUse.buffer = function(gltf) {
  const usedBufferIds = {};
  ForEach_default.bufferView(gltf, function(bufferView) {
    if (defined20(bufferView.buffer)) {
      usedBufferIds[bufferView.buffer] = true;
    }
    const extensions = bufferView.extensions;
    if (defined20(extensions)) {
      const ext = extensions.EXT_meshopt_compression;
      if (defined20(ext)) {
        usedBufferIds[ext.buffer] = true;
      }
      const khr = extensions.KHR_meshopt_compression;
      if (defined20(khr)) {
        usedBufferIds[khr.buffer] = true;
      }
    }
  });
  return usedBufferIds;
};
getListOfElementsIdsInUse.bufferView = function(gltf) {
  const usedBufferViewIds = {};
  ForEach_default.accessor(gltf, function(accessor) {
    if (defined20(accessor.bufferView)) {
      usedBufferViewIds[accessor.bufferView] = true;
    }
  });
  ForEach_default.shader(gltf, function(shader) {
    if (defined20(shader.bufferView)) {
      usedBufferViewIds[shader.bufferView] = true;
    }
  });
  ForEach_default.image(gltf, function(image) {
    if (defined20(image.bufferView)) {
      usedBufferViewIds[image.bufferView] = true;
    }
  });
  if (usesExtension_default(gltf, "KHR_draco_mesh_compression")) {
    ForEach_default.mesh(gltf, function(mesh) {
      ForEach_default.meshPrimitive(mesh, function(primitive) {
        if (defined20(primitive.extensions) && defined20(primitive.extensions.KHR_draco_mesh_compression)) {
          usedBufferViewIds[primitive.extensions.KHR_draco_mesh_compression.bufferView] = true;
        }
      });
    });
  }
  if (usesExtension_default(gltf, "EXT_feature_metadata")) {
    const extension = gltf.extensions.EXT_feature_metadata;
    const featureTables = extension.featureTables;
    for (const featureTableId in featureTables) {
      if (featureTables.hasOwnProperty(featureTableId)) {
        const featureTable = featureTables[featureTableId];
        const properties = featureTable.properties;
        if (defined20(properties)) {
          for (const propertyId in properties) {
            if (properties.hasOwnProperty(propertyId)) {
              const property = properties[propertyId];
              if (defined20(property.bufferView)) {
                usedBufferViewIds[property.bufferView] = true;
              }
              if (defined20(property.arrayOffsetBufferView)) {
                usedBufferViewIds[property.arrayOffsetBufferView] = true;
              }
              if (defined20(property.stringOffsetBufferView)) {
                usedBufferViewIds[property.stringOffsetBufferView] = true;
              }
            }
          }
        }
      }
    }
  }
  if (usesExtension_default(gltf, "EXT_structural_metadata")) {
    const extension = gltf.extensions.EXT_structural_metadata;
    const propertyTables = extension.propertyTables;
    if (defined20(propertyTables)) {
      const propertyTablesLength = propertyTables.length;
      for (let i = 0; i < propertyTablesLength; ++i) {
        const propertyTable = propertyTables[i];
        const properties = propertyTable.properties;
        for (const propertyId in properties) {
          if (properties.hasOwnProperty(propertyId)) {
            const property = properties[propertyId];
            if (defined20(property.values)) {
              usedBufferViewIds[property.values] = true;
            }
            if (defined20(property.arrayOffsets)) {
              usedBufferViewIds[property.arrayOffsets] = true;
            }
            if (defined20(property.stringOffsets)) {
              usedBufferViewIds[property.stringOffsets] = true;
            }
          }
        }
      }
    }
  }
  return usedBufferViewIds;
};
getListOfElementsIdsInUse.image = function(gltf) {
  const usedImageIds = {};
  ForEach_default.texture(gltf, function(texture) {
    if (defined20(texture.source)) {
      usedImageIds[texture.source] = true;
    }
    if (defined20(texture.extensions) && defined20(texture.extensions.EXT_texture_webp)) {
      usedImageIds[texture.extensions.EXT_texture_webp.source] = true;
    } else if (defined20(texture.extensions) && defined20(texture.extensions.KHR_texture_basisu)) {
      usedImageIds[texture.extensions.KHR_texture_basisu.source] = true;
    }
  });
  return usedImageIds;
};
getListOfElementsIdsInUse.mesh = function(gltf) {
  const usedMeshIds = {};
  ForEach_default.node(gltf, function(node) {
    if (defined20(node.mesh && defined20(gltf.meshes))) {
      const mesh = gltf.meshes[node.mesh];
      if (defined20(mesh) && defined20(mesh.primitives) && mesh.primitives.length > 0) {
        usedMeshIds[node.mesh] = true;
      }
    }
  });
  return usedMeshIds;
};
function nodeIsEmpty(gltf, nodeId, usedNodeIds) {
  const node = gltf.nodes[nodeId];
  if (defined20(node.mesh) || defined20(node.camera) || defined20(node.skin) || defined20(node.weights) || defined20(node.extras) || defined20(node.extensions) && Object.keys(node.extensions).length !== 0 || defined20(usedNodeIds[nodeId])) {
    return false;
  }
  return !defined20(node.children) || node.children.filter(function(n) {
    return !nodeIsEmpty(gltf, n, usedNodeIds);
  }).length === 0;
}
getListOfElementsIdsInUse.node = function(gltf) {
  const usedNodeIds = {};
  ForEach_default.skin(gltf, function(skin) {
    if (defined20(skin.skeleton)) {
      usedNodeIds[skin.skeleton] = true;
    }
    ForEach_default.skinJoint(skin, function(joint) {
      usedNodeIds[joint] = true;
    });
  });
  ForEach_default.animation(gltf, function(animation) {
    ForEach_default.animationChannel(animation, function(channel) {
      if (defined20(channel.target) && defined20(channel.target.node)) {
        usedNodeIds[channel.target.node] = true;
      }
    });
  });
  ForEach_default.technique(gltf, function(technique) {
    ForEach_default.techniqueUniform(technique, function(uniform) {
      if (defined20(uniform.node)) {
        usedNodeIds[uniform.node] = true;
      }
    });
  });
  ForEach_default.node(gltf, function(node, nodeId) {
    if (!nodeIsEmpty(gltf, nodeId, usedNodeIds)) {
      usedNodeIds[nodeId] = true;
    }
  });
  return usedNodeIds;
};
getListOfElementsIdsInUse.material = function(gltf) {
  const usedMaterialIds = {};
  ForEach_default.mesh(gltf, function(mesh) {
    ForEach_default.meshPrimitive(mesh, function(primitive) {
      if (defined20(primitive.material)) {
        usedMaterialIds[primitive.material] = true;
      }
    });
  });
  return usedMaterialIds;
};
getListOfElementsIdsInUse.texture = function(gltf) {
  const usedTextureIds = {};
  ForEach_default.material(gltf, function(material) {
    forEachTextureInMaterial_default(material, function(textureId) {
      usedTextureIds[textureId] = true;
    });
  });
  if (usesExtension_default(gltf, "EXT_feature_metadata")) {
    ForEach_default.mesh(gltf, function(mesh) {
      ForEach_default.meshPrimitive(mesh, function(primitive) {
        const extensions = primitive.extensions;
        if (defined20(extensions) && defined20(extensions.EXT_feature_metadata)) {
          const extension2 = extensions.EXT_feature_metadata;
          const featureIdTextures = extension2.featureIdTextures;
          if (defined20(featureIdTextures)) {
            const featureIdTexturesLength = featureIdTextures.length;
            for (let i = 0; i < featureIdTexturesLength; ++i) {
              const featureIdTexture = featureIdTextures[i];
              const textureInfo = featureIdTexture.featureIds.texture;
              usedTextureIds[textureInfo.index] = true;
            }
          }
        }
      });
    });
    const extension = gltf.extensions.EXT_feature_metadata;
    const featureTextures = extension.featureTextures;
    for (const featureTextureId in featureTextures) {
      if (featureTextures.hasOwnProperty(featureTextureId)) {
        const featureTexture = featureTextures[featureTextureId];
        const properties = featureTexture.properties;
        if (defined20(properties)) {
          for (const propertyId in properties) {
            if (properties.hasOwnProperty(propertyId)) {
              const property = properties[propertyId];
              const textureInfo = property.texture;
              usedTextureIds[textureInfo.index] = true;
            }
          }
        }
      }
    }
  }
  if (usesExtension_default(gltf, "EXT_mesh_features")) {
    ForEach_default.mesh(gltf, function(mesh) {
      ForEach_default.meshPrimitive(mesh, function(primitive) {
        const extensions = primitive.extensions;
        if (defined20(extensions) && defined20(extensions.EXT_mesh_features)) {
          const extension = extensions.EXT_mesh_features;
          const featureIds = extension.featureIds;
          if (defined20(featureIds)) {
            const featureIdsLength = featureIds.length;
            for (let i = 0; i < featureIdsLength; ++i) {
              const featureId = featureIds[i];
              if (defined20(featureId.texture)) {
                usedTextureIds[featureId.texture.index] = true;
              }
            }
          }
        }
      });
    });
  }
  if (usesExtension_default(gltf, "EXT_structural_metadata")) {
    const extension = gltf.extensions.EXT_structural_metadata;
    const propertyTextures = extension.propertyTextures;
    if (defined20(propertyTextures)) {
      const propertyTexturesLength = propertyTextures.length;
      for (let i = 0; i < propertyTexturesLength; ++i) {
        const propertyTexture = propertyTextures[i];
        const properties = propertyTexture.properties;
        for (const propertyId in properties) {
          if (properties.hasOwnProperty(propertyId)) {
            const property = properties[propertyId];
            usedTextureIds[property.index] = true;
          }
        }
      }
    }
  }
  return usedTextureIds;
};
getListOfElementsIdsInUse.sampler = function(gltf) {
  const usedSamplerIds = {};
  ForEach_default.texture(gltf, function(texture) {
    if (defined20(texture.sampler)) {
      usedSamplerIds[texture.sampler] = true;
    }
  });
  return usedSamplerIds;
};
var removeUnusedElements_default = removeUnusedElements;

// packages/gltf/Source/updateAccessorComponentTypes.js
import { ComponentDatatype as ComponentDatatype3, WebGLConstants as WebGLConstants3 } from "@cesium/core";
function updateAccessorComponentTypes(gltf) {
  let componentType;
  ForEach_default.accessorWithSemantic(gltf, "JOINTS_0", function(accessorId) {
    const accessor = gltf.accessors[accessorId];
    componentType = accessor.componentType;
    if (componentType === WebGLConstants3.BYTE) {
      convertType(gltf, accessor, ComponentDatatype3.UNSIGNED_BYTE);
    } else if (componentType !== WebGLConstants3.UNSIGNED_BYTE && componentType !== WebGLConstants3.UNSIGNED_SHORT) {
      convertType(gltf, accessor, ComponentDatatype3.UNSIGNED_SHORT);
    }
  });
  ForEach_default.accessorWithSemantic(gltf, "WEIGHTS_0", function(accessorId) {
    const accessor = gltf.accessors[accessorId];
    componentType = accessor.componentType;
    if (componentType === WebGLConstants3.BYTE) {
      convertType(gltf, accessor, ComponentDatatype3.UNSIGNED_BYTE);
    } else if (componentType === WebGLConstants3.SHORT) {
      convertType(gltf, accessor, ComponentDatatype3.UNSIGNED_SHORT);
    }
  });
  return gltf;
}
function convertType(gltf, accessor, updatedComponentType) {
  const typedArray = ComponentDatatype3.createTypedArray(
    updatedComponentType,
    readAccessorPacked_default(gltf, accessor)
  );
  const newBuffer = new Uint8Array(typedArray.buffer);
  accessor.bufferView = addBuffer_default(gltf, newBuffer);
  accessor.componentType = updatedComponentType;
  accessor.byteOffset = 0;
}
var updateAccessorComponentTypes_default = updateAccessorComponentTypes;

// packages/gltf/Source/updateVersion.js
import {
  Cartesian3 as Cartesian33,
  Cartesian4,
  ComponentDatatype as ComponentDatatype4,
  Matrix4 as Matrix42,
  Quaternion as Quaternion3,
  WebGLConstants as WebGLConstants4,
  clone,
  defined as defined21
} from "@cesium/core";
var updateFunctions = {
  0.8: glTF08to10,
  "1.0": glTF10to20,
  "2.0": void 0
};
function updateVersion(gltf, options) {
  options = options ?? {};
  const targetVersion = options.targetVersion;
  let version = gltf.version;
  gltf.asset = gltf.asset ?? {
    version: "1.0"
  };
  gltf.asset.version = gltf.asset.version ?? "1.0";
  version = (version ?? gltf.asset.version).toString();
  if (!Object.prototype.hasOwnProperty.call(updateFunctions, version)) {
    if (defined21(version)) {
      version = version.substring(0, 3);
    }
    if (!Object.prototype.hasOwnProperty.call(updateFunctions, version)) {
      version = "1.0";
    }
  }
  let updateFunction = updateFunctions[version];
  while (defined21(updateFunction)) {
    if (version === targetVersion) {
      break;
    }
    updateFunction(gltf, options);
    version = gltf.asset.version;
    updateFunction = updateFunctions[version];
  }
  if (!options.keepLegacyExtensions) {
    convertTechniquesToPbr(gltf, options);
    convertMaterialsCommonToPbr(gltf);
  }
  return gltf;
}
function updateInstanceTechniques(gltf) {
  const materials = gltf.materials;
  for (const materialId in materials) {
    if (Object.prototype.hasOwnProperty.call(materials, materialId)) {
      const material = materials[materialId];
      const instanceTechnique = material.instanceTechnique;
      if (defined21(instanceTechnique)) {
        material.technique = instanceTechnique.technique;
        material.values = instanceTechnique.values;
        delete material.instanceTechnique;
      }
    }
  }
}
function setPrimitiveModes(gltf) {
  const meshes = gltf.meshes;
  for (const meshId in meshes) {
    if (Object.prototype.hasOwnProperty.call(meshes, meshId)) {
      const mesh = meshes[meshId];
      const primitives = mesh.primitives;
      if (defined21(primitives)) {
        const primitivesLength = primitives.length;
        for (let i = 0; i < primitivesLength; ++i) {
          const primitive = primitives[i];
          const defaultMode = primitive.primitive ?? WebGLConstants4.TRIANGLES;
          primitive.mode = primitive.mode ?? defaultMode;
          delete primitive.primitive;
        }
      }
    }
  }
}
function updateNodes(gltf) {
  const nodes = gltf.nodes;
  const axis = new Cartesian33();
  const quat = new Quaternion3();
  for (const nodeId in nodes) {
    if (Object.prototype.hasOwnProperty.call(nodes, nodeId)) {
      const node = nodes[nodeId];
      if (defined21(node.rotation)) {
        const rotation = node.rotation;
        Cartesian33.fromArray(rotation, 0, axis);
        Quaternion3.fromAxisAngle(axis, rotation[3], quat);
        node.rotation = [quat.x, quat.y, quat.z, quat.w];
      }
      const instanceSkin = node.instanceSkin;
      if (defined21(instanceSkin)) {
        node.skeletons = instanceSkin.skeletons;
        node.skin = instanceSkin.skin;
        node.meshes = instanceSkin.meshes;
        delete node.instanceSkin;
      }
    }
  }
}
function updateAnimations(gltf) {
  const animations = gltf.animations;
  const accessors = gltf.accessors;
  const bufferViews = gltf.bufferViews;
  const buffers = gltf.buffers;
  const updatedAccessors = {};
  const axis = new Cartesian33();
  const quat = new Quaternion3();
  for (const animationId in animations) {
    if (Object.prototype.hasOwnProperty.call(animations, animationId)) {
      const animation = animations[animationId];
      const channels = animation.channels;
      const parameters = animation.parameters;
      const samplers = animation.samplers;
      if (defined21(channels)) {
        const channelsLength = channels.length;
        for (let i = 0; i < channelsLength; ++i) {
          const channel = channels[i];
          if (channel.target.path === "rotation") {
            const accessorId = parameters[samplers[channel.sampler].output];
            if (defined21(updatedAccessors[accessorId])) {
              continue;
            }
            updatedAccessors[accessorId] = true;
            const accessor = accessors[accessorId];
            const bufferView = bufferViews[accessor.bufferView];
            const buffer = buffers[bufferView.buffer];
            const source = buffer.extras._pipeline.source;
            const byteOffset = source.byteOffset + bufferView.byteOffset + accessor.byteOffset;
            const componentType = accessor.componentType;
            const count = accessor.count;
            const componentsLength = numberOfComponentsForType_default(accessor.type);
            const length = accessor.count * componentsLength;
            const typedArray = ComponentDatatype4.createArrayBufferView(
              componentType,
              source.buffer,
              byteOffset,
              length
            );
            for (let j = 0; j < count; j++) {
              const offset = j * componentsLength;
              Cartesian33.unpack(typedArray, offset, axis);
              const angle = typedArray[offset + 3];
              Quaternion3.fromAxisAngle(axis, angle, quat);
              Quaternion3.pack(quat, typedArray, offset);
            }
          }
        }
      }
    }
  }
}
function removeTechniquePasses(gltf) {
  const techniques = gltf.techniques;
  for (const techniqueId in techniques) {
    if (Object.prototype.hasOwnProperty.call(techniques, techniqueId)) {
      const technique = techniques[techniqueId];
      const passes = technique.passes;
      if (defined21(passes)) {
        const passName = technique.pass ?? "defaultPass";
        if (Object.prototype.hasOwnProperty.call(passes, passName)) {
          const pass = passes[passName];
          const instanceProgram = pass.instanceProgram;
          technique.attributes = technique.attributes ?? instanceProgram.attributes;
          technique.program = technique.program ?? instanceProgram.program;
          technique.uniforms = technique.uniforms ?? instanceProgram.uniforms;
          technique.states = technique.states ?? pass.states;
        }
        delete technique.passes;
        delete technique.pass;
      }
    }
  }
}
function glTF08to10(gltf) {
  if (!defined21(gltf.asset)) {
    gltf.asset = {};
  }
  const asset = gltf.asset;
  asset.version = "1.0";
  if (typeof asset.profile === "string") {
    const split = asset.profile.split(" ");
    asset.profile = {
      api: split[0],
      version: split[1]
    };
  } else {
    asset.profile = {};
  }
  if (defined21(gltf.version)) {
    delete gltf.version;
  }
  updateInstanceTechniques(gltf);
  setPrimitiveModes(gltf);
  updateNodes(gltf);
  updateAnimations(gltf);
  removeTechniquePasses(gltf);
  if (defined21(gltf.allExtensions)) {
    gltf.extensionsUsed = gltf.allExtensions;
    delete gltf.allExtensions;
  }
  if (defined21(gltf.lights)) {
    const extensions = gltf.extensions ?? {};
    gltf.extensions = extensions;
    const materialsCommon = extensions.KHR_materials_common ?? {};
    extensions.KHR_materials_common = materialsCommon;
    materialsCommon.lights = gltf.lights;
    delete gltf.lights;
    addExtensionsUsed_default(gltf, "KHR_materials_common");
  }
}
function removeAnimationSamplersIndirection(gltf) {
  const animations = gltf.animations;
  for (const animationId in animations) {
    if (Object.prototype.hasOwnProperty.call(animations, animationId)) {
      const animation = animations[animationId];
      const parameters = animation.parameters;
      if (defined21(parameters)) {
        const samplers = animation.samplers;
        for (const samplerId in samplers) {
          if (Object.prototype.hasOwnProperty.call(samplers, samplerId)) {
            const sampler = samplers[samplerId];
            sampler.input = parameters[sampler.input];
            sampler.output = parameters[sampler.output];
          }
        }
        delete animation.parameters;
      }
    }
  }
}
function objectToArray(object, mapping) {
  const array = [];
  for (const id in object) {
    if (Object.prototype.hasOwnProperty.call(object, id)) {
      const value = object[id];
      mapping[id] = array.length;
      array.push(value);
      if (!defined21(value.name)) {
        value.name = id;
      }
    }
  }
  return array;
}
function objectsToArrays(gltf) {
  let i;
  const globalMapping = {
    accessors: {},
    animations: {},
    buffers: {},
    bufferViews: {},
    cameras: {},
    images: {},
    materials: {},
    meshes: {},
    nodes: {},
    programs: {},
    samplers: {},
    scenes: {},
    shaders: {},
    skins: {},
    textures: {},
    techniques: {}
  };
  let jointName;
  const jointNameToId = {};
  const nodes = gltf.nodes;
  for (const id in nodes) {
    if (Object.prototype.hasOwnProperty.call(nodes, id)) {
      jointName = nodes[id].jointName;
      if (defined21(jointName)) {
        jointNameToId[jointName] = id;
      }
    }
  }
  for (const topLevelId in gltf) {
    if (Object.prototype.hasOwnProperty.call(gltf, topLevelId) && defined21(globalMapping[topLevelId])) {
      const objectMapping = {};
      const object = gltf[topLevelId];
      gltf[topLevelId] = objectToArray(object, objectMapping);
      globalMapping[topLevelId] = objectMapping;
    }
  }
  for (jointName in jointNameToId) {
    if (Object.prototype.hasOwnProperty.call(jointNameToId, jointName)) {
      jointNameToId[jointName] = globalMapping.nodes[jointNameToId[jointName]];
    }
  }
  if (defined21(gltf.scene)) {
    gltf.scene = globalMapping.scenes[gltf.scene];
  }
  ForEach_default.bufferView(gltf, function(bufferView) {
    if (defined21(bufferView.buffer)) {
      bufferView.buffer = globalMapping.buffers[bufferView.buffer];
    }
  });
  ForEach_default.accessor(gltf, function(accessor) {
    if (defined21(accessor.bufferView)) {
      accessor.bufferView = globalMapping.bufferViews[accessor.bufferView];
    }
  });
  ForEach_default.shader(gltf, function(shader) {
    const extensions = shader.extensions;
    if (defined21(extensions)) {
      const binaryGltf = extensions.KHR_binary_glTF;
      if (defined21(binaryGltf)) {
        shader.bufferView = globalMapping.bufferViews[binaryGltf.bufferView];
        delete extensions.KHR_binary_glTF;
      }
      if (Object.keys(extensions).length === 0) {
        delete shader.extensions;
      }
    }
  });
  ForEach_default.program(gltf, function(program) {
    if (defined21(program.vertexShader)) {
      program.vertexShader = globalMapping.shaders[program.vertexShader];
    }
    if (defined21(program.fragmentShader)) {
      program.fragmentShader = globalMapping.shaders[program.fragmentShader];
    }
  });
  ForEach_default.technique(gltf, function(technique) {
    if (defined21(technique.program)) {
      technique.program = globalMapping.programs[technique.program];
    }
    ForEach_default.techniqueParameter(technique, function(parameter) {
      if (defined21(parameter.node)) {
        parameter.node = globalMapping.nodes[parameter.node];
      }
      const value = parameter.value;
      if (typeof value === "string") {
        parameter.value = {
          index: globalMapping.textures[value]
        };
      }
    });
  });
  ForEach_default.mesh(gltf, function(mesh) {
    ForEach_default.meshPrimitive(mesh, function(primitive) {
      if (defined21(primitive.indices)) {
        primitive.indices = globalMapping.accessors[primitive.indices];
      }
      ForEach_default.meshPrimitiveAttribute(
        primitive,
        function(accessorId, semantic) {
          primitive.attributes[semantic] = globalMapping.accessors[accessorId];
        }
      );
      if (defined21(primitive.material)) {
        primitive.material = globalMapping.materials[primitive.material];
      }
    });
  });
  ForEach_default.node(gltf, function(node) {
    let children = node.children;
    if (defined21(children)) {
      const childrenLength = children.length;
      for (i = 0; i < childrenLength; ++i) {
        children[i] = globalMapping.nodes[children[i]];
      }
    }
    if (defined21(node.meshes)) {
      const meshes = node.meshes;
      const meshesLength = meshes.length;
      if (meshesLength > 0) {
        node.mesh = globalMapping.meshes[meshes[0]];
        for (i = 1; i < meshesLength; ++i) {
          const meshNode = {
            mesh: globalMapping.meshes[meshes[i]]
          };
          const meshNodeId = addToArray_default(gltf.nodes, meshNode);
          if (!defined21(children)) {
            children = [];
            node.children = children;
          }
          children.push(meshNodeId);
        }
      }
      delete node.meshes;
    }
    if (defined21(node.camera)) {
      node.camera = globalMapping.cameras[node.camera];
    }
    if (defined21(node.skin)) {
      node.skin = globalMapping.skins[node.skin];
    }
    if (defined21(node.skeletons)) {
      const skeletons = node.skeletons;
      const skeletonsLength = skeletons.length;
      if (skeletonsLength > 0 && defined21(node.skin)) {
        const skin = gltf.skins[node.skin];
        skin.skeleton = globalMapping.nodes[skeletons[0]];
      }
      delete node.skeletons;
    }
    if (defined21(node.jointName)) {
      delete node.jointName;
    }
  });
  ForEach_default.skin(gltf, function(skin) {
    if (defined21(skin.inverseBindMatrices)) {
      skin.inverseBindMatrices = globalMapping.accessors[skin.inverseBindMatrices];
    }
    const jointNames = skin.jointNames;
    if (defined21(jointNames)) {
      const joints = [];
      const jointNamesLength = jointNames.length;
      for (i = 0; i < jointNamesLength; ++i) {
        joints[i] = jointNameToId[jointNames[i]];
      }
      skin.joints = joints;
      delete skin.jointNames;
    }
  });
  ForEach_default.scene(gltf, function(scene) {
    const sceneNodes = scene.nodes;
    if (defined21(sceneNodes)) {
      const sceneNodesLength = sceneNodes.length;
      for (i = 0; i < sceneNodesLength; ++i) {
        sceneNodes[i] = globalMapping.nodes[sceneNodes[i]];
      }
    }
  });
  ForEach_default.animation(gltf, function(animation) {
    const samplerMapping = {};
    animation.samplers = objectToArray(animation.samplers, samplerMapping);
    ForEach_default.animationSampler(animation, function(sampler) {
      sampler.input = globalMapping.accessors[sampler.input];
      sampler.output = globalMapping.accessors[sampler.output];
    });
    ForEach_default.animationChannel(animation, function(channel) {
      channel.sampler = samplerMapping[channel.sampler];
      const target = channel.target;
      if (defined21(target)) {
        target.node = globalMapping.nodes[target.id];
        delete target.id;
      }
    });
  });
  ForEach_default.material(gltf, function(material) {
    if (defined21(material.technique)) {
      material.technique = globalMapping.techniques[material.technique];
    }
    ForEach_default.materialValue(material, function(value, name) {
      if (typeof value === "string") {
        material.values[name] = {
          index: globalMapping.textures[value]
        };
      }
    });
    const extensions = material.extensions;
    if (defined21(extensions)) {
      const materialsCommon = extensions.KHR_materials_common;
      if (defined21(materialsCommon) && defined21(materialsCommon.values)) {
        ForEach_default.materialValue(materialsCommon, function(value, name) {
          if (typeof value === "string") {
            materialsCommon.values[name] = {
              index: globalMapping.textures[value]
            };
          }
        });
      }
    }
  });
  ForEach_default.image(gltf, function(image) {
    const extensions = image.extensions;
    if (defined21(extensions)) {
      const binaryGltf = extensions.KHR_binary_glTF;
      if (defined21(binaryGltf)) {
        image.bufferView = globalMapping.bufferViews[binaryGltf.bufferView];
        image.mimeType = binaryGltf.mimeType;
        delete extensions.KHR_binary_glTF;
      }
      if (Object.keys(extensions).length === 0) {
        delete image.extensions;
      }
    }
  });
  ForEach_default.texture(gltf, function(texture) {
    if (defined21(texture.sampler)) {
      texture.sampler = globalMapping.samplers[texture.sampler];
    }
    if (defined21(texture.source)) {
      texture.source = globalMapping.images[texture.source];
    }
  });
}
function removeAnimationSamplerNames(gltf) {
  ForEach_default.animation(gltf, function(animation) {
    ForEach_default.animationSampler(animation, function(sampler) {
      delete sampler.name;
    });
  });
}
function removeEmptyArrays(gltf) {
  for (const topLevelId in gltf) {
    if (Object.prototype.hasOwnProperty.call(gltf, topLevelId)) {
      const array = gltf[topLevelId];
      if (Array.isArray(array) && array.length === 0) {
        delete gltf[topLevelId];
      }
    }
  }
  ForEach_default.node(gltf, function(node) {
    if (defined21(node.children) && node.children.length === 0) {
      delete node.children;
    }
  });
}
function stripAsset(gltf) {
  const asset = gltf.asset;
  delete asset.profile;
  delete asset.premultipliedAlpha;
}
var knownExtensions = {
  CESIUM_RTC: true,
  KHR_materials_common: true,
  WEB3D_quantized_attributes: true
};
function requireKnownExtensions(gltf) {
  const extensionsUsed = gltf.extensionsUsed;
  gltf.extensionsRequired = gltf.extensionsRequired ?? [];
  if (defined21(extensionsUsed)) {
    const extensionsUsedLength = extensionsUsed.length;
    for (let i = 0; i < extensionsUsedLength; ++i) {
      const extension = extensionsUsed[i];
      if (defined21(knownExtensions[extension])) {
        gltf.extensionsRequired.push(extension);
      }
    }
  }
}
function removeBufferType(gltf) {
  ForEach_default.buffer(gltf, function(buffer) {
    delete buffer.type;
  });
}
function removeTextureProperties(gltf) {
  ForEach_default.texture(gltf, function(texture) {
    delete texture.format;
    delete texture.internalFormat;
    delete texture.target;
    delete texture.type;
  });
}
function requireAttributeSetIndex(gltf) {
  ForEach_default.mesh(gltf, function(mesh) {
    ForEach_default.meshPrimitive(mesh, function(primitive) {
      ForEach_default.meshPrimitiveAttribute(
        primitive,
        function(accessorId, semantic) {
          if (semantic === "TEXCOORD") {
            primitive.attributes.TEXCOORD_0 = accessorId;
          } else if (semantic === "COLOR") {
            primitive.attributes.COLOR_0 = accessorId;
          }
        }
      );
      delete primitive.attributes.TEXCOORD;
      delete primitive.attributes.COLOR;
    });
  });
  ForEach_default.technique(gltf, function(technique) {
    ForEach_default.techniqueParameter(technique, function(parameter) {
      const semantic = parameter.semantic;
      if (defined21(semantic)) {
        if (semantic === "TEXCOORD") {
          parameter.semantic = "TEXCOORD_0";
        } else if (semantic === "COLOR") {
          parameter.semantic = "COLOR_0";
        }
      }
    });
  });
}
var knownSemantics = {
  POSITION: true,
  NORMAL: true,
  TANGENT: true
};
var indexedSemantics = {
  COLOR: "COLOR",
  JOINT: "JOINTS",
  JOINTS: "JOINTS",
  TEXCOORD: "TEXCOORD",
  WEIGHT: "WEIGHTS",
  WEIGHTS: "WEIGHTS"
};
function underscoreApplicationSpecificSemantics(gltf) {
  const mappedSemantics = {};
  ForEach_default.mesh(gltf, function(mesh) {
    ForEach_default.meshPrimitive(mesh, function(primitive) {
      ForEach_default.meshPrimitiveAttribute(
        primitive,
        function(accessorId, semantic) {
          if (semantic.charAt(0) !== "_") {
            const setIndex = semantic.search(/_[0-9]+/g);
            let strippedSemantic = semantic;
            let suffix = "_0";
            if (setIndex >= 0) {
              strippedSemantic = semantic.substring(0, setIndex);
              suffix = semantic.substring(setIndex);
            }
            let newSemantic;
            const indexedSemantic = indexedSemantics[strippedSemantic];
            if (defined21(indexedSemantic)) {
              newSemantic = indexedSemantic + suffix;
              mappedSemantics[semantic] = newSemantic;
            } else if (!defined21(knownSemantics[strippedSemantic])) {
              newSemantic = `_${semantic}`;
              mappedSemantics[semantic] = newSemantic;
            }
          }
        }
      );
      for (const semantic in mappedSemantics) {
        if (Object.prototype.hasOwnProperty.call(mappedSemantics, semantic)) {
          const mappedSemantic = mappedSemantics[semantic];
          const accessorId = primitive.attributes[semantic];
          if (defined21(accessorId)) {
            delete primitive.attributes[semantic];
            primitive.attributes[mappedSemantic] = accessorId;
          }
        }
      }
    });
  });
  ForEach_default.technique(gltf, function(technique) {
    ForEach_default.techniqueParameter(technique, function(parameter) {
      const mappedSemantic = mappedSemantics[parameter.semantic];
      if (defined21(mappedSemantic)) {
        parameter.semantic = mappedSemantic;
      }
    });
  });
}
function clampCameraParameters(gltf) {
  ForEach_default.camera(gltf, function(camera) {
    const perspective = camera.perspective;
    if (defined21(perspective)) {
      const aspectRatio = perspective.aspectRatio;
      if (defined21(aspectRatio) && aspectRatio === 0) {
        delete perspective.aspectRatio;
      }
      const yfov = perspective.yfov;
      if (defined21(yfov) && yfov === 0) {
        perspective.yfov = 1;
      }
    }
  });
}
function computeAccessorByteStride(gltf, accessor) {
  return defined21(accessor.byteStride) && accessor.byteStride !== 0 ? accessor.byteStride : getAccessorByteStride_default(gltf, accessor);
}
function requireByteLength(gltf) {
  ForEach_default.buffer(gltf, function(buffer) {
    if (!defined21(buffer.byteLength)) {
      buffer.byteLength = buffer.extras._pipeline.source.length;
    }
  });
  ForEach_default.accessor(gltf, function(accessor) {
    const bufferViewId = accessor.bufferView;
    if (defined21(bufferViewId)) {
      const bufferView = gltf.bufferViews[bufferViewId];
      const accessorByteStride = computeAccessorByteStride(gltf, accessor);
      const accessorByteEnd = accessor.byteOffset + accessor.count * accessorByteStride;
      bufferView.byteLength = Math.max(
        bufferView.byteLength ?? 0,
        accessorByteEnd
      );
    }
  });
}
function moveByteStrideToBufferView(gltf) {
  let i;
  let j;
  let bufferView;
  const bufferViews = gltf.bufferViews;
  const bufferViewHasVertexAttributes = {};
  ForEach_default.accessorContainingVertexAttributeData(gltf, function(accessorId) {
    const accessor = gltf.accessors[accessorId];
    if (defined21(accessor.bufferView)) {
      bufferViewHasVertexAttributes[accessor.bufferView] = true;
    }
  });
  const bufferViewMap = {};
  ForEach_default.accessor(gltf, function(accessor) {
    if (defined21(accessor.bufferView)) {
      bufferViewMap[accessor.bufferView] = bufferViewMap[accessor.bufferView] ?? [];
      bufferViewMap[accessor.bufferView].push(accessor);
    }
  });
  for (const bufferViewId in bufferViewMap) {
    if (Object.prototype.hasOwnProperty.call(bufferViewMap, bufferViewId)) {
      bufferView = bufferViews[bufferViewId];
      const accessors = bufferViewMap[bufferViewId];
      accessors.sort(function(a, b) {
        return a.byteOffset - b.byteOffset;
      });
      let currentByteOffset = 0;
      let currentIndex = 0;
      const accessorsLength = accessors.length;
      for (i = 0; i < accessorsLength; ++i) {
        let accessor = accessors[i];
        const accessorByteStride = computeAccessorByteStride(gltf, accessor);
        const accessorByteOffset = accessor.byteOffset;
        const accessorByteLength = accessor.count * accessorByteStride;
        delete accessor.byteStride;
        const hasNextAccessor = i < accessorsLength - 1;
        const nextAccessorByteStride = hasNextAccessor ? computeAccessorByteStride(gltf, accessors[i + 1]) : void 0;
        if (accessorByteStride !== nextAccessorByteStride) {
          const newBufferView = clone(bufferView, true);
          if (bufferViewHasVertexAttributes[bufferViewId]) {
            newBufferView.byteStride = accessorByteStride;
          }
          newBufferView.byteOffset += currentByteOffset;
          newBufferView.byteLength = accessorByteOffset + accessorByteLength - currentByteOffset;
          const newBufferViewId = addToArray_default(bufferViews, newBufferView);
          for (j = currentIndex; j <= i; ++j) {
            accessor = accessors[j];
            accessor.bufferView = newBufferViewId;
            accessor.byteOffset = accessor.byteOffset - currentByteOffset;
          }
          currentByteOffset = hasNextAccessor ? accessors[i + 1].byteOffset : void 0;
          currentIndex = i + 1;
        }
      }
    }
  }
  removeUnusedElements_default(gltf, ["accessor", "bufferView", "buffer"]);
}
function requirePositionAccessorMinMax(gltf) {
  ForEach_default.accessorWithSemantic(gltf, "POSITION", function(accessorId) {
    const accessor = gltf.accessors[accessorId];
    if (!defined21(accessor.min) || !defined21(accessor.max)) {
      const minMax = findAccessorMinMax_default(gltf, accessor);
      accessor.min = minMax.min;
      accessor.max = minMax.max;
    }
  });
}
function isNodeEmpty(node) {
  return (!defined21(node.children) || node.children.length === 0) && (!defined21(node.meshes) || node.meshes.length === 0) && !defined21(node.camera) && !defined21(node.skin) && !defined21(node.skeletons) && !defined21(node.jointName) && (!defined21(node.translation) || Cartesian33.fromArray(node.translation).equals(Cartesian33.ZERO)) && (!defined21(node.scale) || Cartesian33.fromArray(node.scale).equals(new Cartesian33(1, 1, 1))) && (!defined21(node.rotation) || Cartesian4.fromArray(node.rotation).equals(
    new Cartesian4(0, 0, 0, 1)
  )) && (!defined21(node.matrix) || Matrix42.fromColumnMajorArray(node.matrix).equals(Matrix42.IDENTITY)) && !defined21(node.extensions) && !defined21(node.extras);
}
function deleteNode(gltf, nodeId) {
  ForEach_default.scene(gltf, function(scene) {
    const sceneNodes = scene.nodes;
    if (defined21(sceneNodes)) {
      const sceneNodesLength = sceneNodes.length;
      for (let i = sceneNodesLength; i >= 0; --i) {
        if (sceneNodes[i] === nodeId) {
          sceneNodes.splice(i, 1);
          return;
        }
      }
    }
  });
  ForEach_default.node(gltf, function(parentNode, parentNodeId) {
    if (defined21(parentNode.children)) {
      const index = parentNode.children.indexOf(nodeId);
      if (index > -1) {
        parentNode.children.splice(index, 1);
        if (isNodeEmpty(parentNode)) {
          deleteNode(gltf, parentNodeId);
        }
      }
    }
  });
  delete gltf.nodes[nodeId];
}
function removeEmptyNodes(gltf) {
  ForEach_default.node(gltf, function(node, nodeId) {
    if (isNodeEmpty(node)) {
      deleteNode(gltf, nodeId);
    }
  });
  return gltf;
}
function requireAnimationAccessorMinMax(gltf) {
  ForEach_default.animation(gltf, function(animation) {
    ForEach_default.animationSampler(animation, function(sampler) {
      const accessor = gltf.accessors[sampler.input];
      if (!defined21(accessor.min) || !defined21(accessor.max)) {
        const minMax = findAccessorMinMax_default(gltf, accessor);
        accessor.min = minMax.min;
        accessor.max = minMax.max;
      }
    });
  });
}
function validatePresentAccessorMinMax(gltf) {
  ForEach_default.accessor(gltf, function(accessor) {
    if (defined21(accessor.min) || defined21(accessor.max)) {
      const minMax = findAccessorMinMax_default(gltf, accessor);
      if (defined21(accessor.min)) {
        accessor.min = minMax.min;
      }
      if (defined21(accessor.max)) {
        accessor.max = minMax.max;
      }
    }
  });
}
function glTF10to20(gltf) {
  gltf.asset = gltf.asset ?? {};
  gltf.asset.version = "2.0";
  updateInstanceTechniques(gltf);
  removeAnimationSamplersIndirection(gltf);
  removeEmptyNodes(gltf);
  objectsToArrays(gltf);
  removeAnimationSamplerNames(gltf);
  stripAsset(gltf);
  requireKnownExtensions(gltf);
  requireByteLength(gltf);
  moveByteStrideToBufferView(gltf);
  requirePositionAccessorMinMax(gltf);
  requireAnimationAccessorMinMax(gltf);
  validatePresentAccessorMinMax(gltf);
  removeBufferType(gltf);
  removeTextureProperties(gltf);
  requireAttributeSetIndex(gltf);
  underscoreApplicationSpecificSemantics(gltf);
  updateAccessorComponentTypes_default(gltf);
  clampCameraParameters(gltf);
  moveTechniqueRenderStates_default(gltf);
  moveTechniquesToExtension_default(gltf);
  removeEmptyArrays(gltf);
}
var defaultBaseColorTextureNames = [
  "u_tex",
  "u_diffuse",
  "u_emission",
  "u_diffuse_tex"
];
var defaultBaseColorFactorNames = ["u_diffuse", "u_diffuse_mat"];
function initializePbrMaterial(material) {
  material.pbrMetallicRoughness = defined21(material.pbrMetallicRoughness) ? material.pbrMetallicRoughness : {};
  material.pbrMetallicRoughness.roughnessFactor = 1;
  material.pbrMetallicRoughness.metallicFactor = 0;
}
function isTexture(value) {
  return defined21(value.index);
}
function isVec4(value) {
  return Array.isArray(value) && value.length === 4;
}
function srgbToLinear(srgb) {
  const linear = new Array(4);
  linear[3] = srgb[3];
  for (let i = 0; i < 3; i++) {
    const c = srgb[i];
    if (c <= 0.04045) {
      linear[i] = srgb[i] * 0.07739938080495357;
    } else {
      linear[i] = Math.pow(
        // eslint-disable-next-line no-loss-of-precision
        (c + 0.055) * 0.9478672985781991,
        2.4
      );
    }
  }
  return linear;
}
function convertTechniquesToPbr(gltf, options) {
  options = options ?? {};
  const baseColorTextureNames = options.baseColorTextureNames ?? defaultBaseColorTextureNames;
  const baseColorFactorNames = options.baseColorFactorNames ?? defaultBaseColorFactorNames;
  ForEach_default.material(gltf, function(material) {
    ForEach_default.materialValue(material, function(value, name) {
      if (baseColorTextureNames.indexOf(name) !== -1 && isTexture(value)) {
        initializePbrMaterial(material);
        material.pbrMetallicRoughness.baseColorTexture = value;
      } else if (baseColorFactorNames.indexOf(name) !== -1 && isVec4(value)) {
        initializePbrMaterial(material);
        material.pbrMetallicRoughness.baseColorFactor = srgbToLinear(value);
      }
    });
  });
  removeExtension_default(gltf, "KHR_techniques_webgl");
  removeExtension_default(gltf, "KHR_blend");
}
function assignAsBaseColor(material, baseColor) {
  if (defined21(baseColor)) {
    if (isVec4(baseColor)) {
      material.pbrMetallicRoughness.baseColorFactor = srgbToLinear(baseColor);
    } else if (isTexture(baseColor)) {
      material.pbrMetallicRoughness.baseColorTexture = baseColor;
    }
  }
}
function assignAsEmissive(material, emissive) {
  if (defined21(emissive)) {
    if (isVec4(emissive)) {
      material.emissiveFactor = emissive.slice(0, 3);
    } else if (isTexture(emissive)) {
      material.emissiveTexture = emissive;
    }
  }
}
function convertMaterialsCommonToPbr(gltf) {
  ForEach_default.material(gltf, function(material) {
    const materialsCommon = (material.extensions ?? {}).KHR_materials_common;
    if (!defined21(materialsCommon)) {
      return;
    }
    const values = materialsCommon.values ?? {};
    const ambient = values.ambient;
    const diffuse = values.diffuse;
    const emission = values.emission;
    const transparency = values.transparency;
    const doubleSided = materialsCommon.doubleSided;
    const transparent = materialsCommon.transparent;
    initializePbrMaterial(material);
    const technique = materialsCommon.technique;
    if (technique === "CONSTANT") {
      addExtensionsUsed_default(gltf, "KHR_materials_unlit");
      material.extensions = defined21(material.extensions) ? material.extensions : {};
      material.extensions["KHR_materials_unlit"] = {};
      assignAsBaseColor(material, emission);
      assignAsBaseColor(material, ambient);
    } else {
      assignAsBaseColor(material, diffuse);
      assignAsEmissive(material, ambient);
      assignAsEmissive(material, emission);
    }
    if (defined21(doubleSided)) {
      material.doubleSided = doubleSided;
    }
    if (defined21(transparency)) {
      if (defined21(material.pbrMetallicRoughness.baseColorFactor)) {
        material.pbrMetallicRoughness.baseColorFactor[3] *= transparency;
      } else {
        material.pbrMetallicRoughness.baseColorFactor = [1, 1, 1, transparency];
      }
    }
    if (defined21(transparent)) {
      material.alphaMode = transparent ? "BLEND" : "OPAQUE";
    }
  });
  removeExtension_default(gltf, "KHR_materials_common");
}
var updateVersion_default = updateVersion;

// packages/gltf/index.js
globalThis.CESIUM_VERSION = "1.146.0";
export {
  ForEach_default as ForEach,
  addBuffer_default as addBuffer,
  addDefaults_default as addDefaults,
  addExtensionsRequired_default as addExtensionsRequired,
  addExtensionsUsed_default as addExtensionsUsed,
  addPipelineExtras_default as addPipelineExtras,
  addToArray_default as addToArray,
  constructBoundingVolumeJson_default as constructBoundingVolumeJson,
  findAccessorMinMax_default as findAccessorMinMax,
  forEachTextureInMaterial_default as forEachTextureInMaterial,
  getAccessorByteStride_default as getAccessorByteStride,
  getComponentReader_default as getComponentReader,
  getNodeTransform_default as getNodeTransform,
  moveTechniqueRenderStates_default as moveTechniqueRenderStates,
  moveTechniquesToExtension_default as moveTechniquesToExtension,
  numberOfComponentsForType_default as numberOfComponentsForType,
  parseGlb_default as parseGlb,
  readAccessorPacked_default as readAccessorPacked,
  removeExtension_default as removeExtension,
  removeExtensionsRequired_default as removeExtensionsRequired,
  removeExtensionsUsed_default as removeExtensionsUsed,
  removePipelineExtras_default as removePipelineExtras,
  removeUnusedElements_default as removeUnusedElements,
  updateAccessorComponentTypes_default as updateAccessorComponentTypes,
  updateVersion_default as updateVersion,
  usesExtension_default as usesExtension
};
//# sourceMappingURL=index.js.map
