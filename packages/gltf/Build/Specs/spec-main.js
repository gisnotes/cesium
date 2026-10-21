// packages/core/Source/defined.js
function defined(value) {
  return value !== void 0 && value !== null;
}
var defined_default = defined;

// packages/core/Source/DeveloperError.js
function DeveloperError(message) {
  this.name = "DeveloperError";
  this.message = message;
  let stack;
  try {
    throw new Error();
  } catch (e) {
    stack = e.stack;
  }
  this.stack = stack;
}
if (defined_default(Object.create)) {
  DeveloperError.prototype = Object.create(Error.prototype);
  DeveloperError.prototype.constructor = DeveloperError;
}
DeveloperError.prototype.toString = function() {
  let str = `${this.name}: ${this.message}`;
  if (defined_default(this.stack)) {
    str += `
${this.stack.toString()}`;
  }
  return str;
};
DeveloperError.throwInstantiationError = function() {
  throw new DeveloperError(
    "This function defines an interface and should not be called directly."
  );
};
var DeveloperError_default = DeveloperError;

// packages/core/index.js
globalThis.CESIUM_VERSION = "1.146.0";

// Specs/equalsMethodEqualityTester.js
function equalsMethodEqualityTester(a, b) {
  let to_run;
  if (a !== null && defined_default(a)) {
    if (typeof a.equals === "function") {
      return a.equals(b);
    } else if (a instanceof Object) {
      to_run = Object.getPrototypeOf(a).constructor.equals;
      if (typeof to_run === "function") {
        return to_run(a, b);
      }
    }
  }
  if (b !== null && defined_default(b)) {
    if (typeof b.equals === "function") {
      return b.equals(a);
    } else if (b instanceof Object) {
      to_run = Object.getPrototypeOf(b).constructor.equals;
      if (typeof to_run === "function") {
        return to_run(b, a);
      }
    }
  }
  return void 0;
}
var equalsMethodEqualityTester_default = equalsMethodEqualityTester;

// Specs/customizeJasmine.js
function customizeJasmine(env2, options = {}) {
  const {
    includeCategory: includeCategory2,
    excludeCategory: excludeCategory2,
    webglValidation = false,
    webglStub = false,
    release: release2 = false,
    debugCanvasWidth,
    debugCanvasHeight
  } = options;
  window.devicePixelRatio = 1;
  window.specsUsingRelease = release2;
  const originalDescribe = window.describe;
  window.describe = function(name, suite, category) {
    if (includeCategory2 && includeCategory2 !== "" && includeCategory2 !== "none" && category !== includeCategory2) {
      window.xdescribe(name, suite);
    } else if (excludeCategory2 && excludeCategory2 !== "" && category === excludeCategory2) {
      window.xdescribe(name, suite);
    } else {
      originalDescribe(name, suite);
    }
  };
  if (webglValidation) {
    window.webglValidation = true;
  }
  if (webglStub) {
    window.webglStub = true;
  }
  window.debugCanvasWidth = debugCanvasWidth;
  window.debugCanvasHeight = debugCanvasHeight;
  env2.beforeEach(function() {
    env2.addCustomEqualityTester(equalsMethodEqualityTester_default);
  });
}
var customizeJasmine_default = customizeJasmine;

// Specs/equals.js
function isTypedArray(o) {
  return ArrayBuffer.isView(o) && !(o instanceof DataView);
}
function typedArrayToArray(array) {
  if (array !== null && typeof array === "object" && isTypedArray(array)) {
    return Array.prototype.slice.call(array, 0);
  }
  return array;
}
function equals(util, a, b) {
  a = typedArrayToArray(a);
  b = typedArrayToArray(b);
  return util.equals(a, b);
}
var equals_default = equals;

// Specs/createBaseMatchers.js
function createMissingFunctionMessageFunction(item, actualPrototype, expectedInterfacePrototype) {
  return function() {
    return `Expected function '${item}' to exist on ${actualPrototype.constructor.name} because it should implement interface ${expectedInterfacePrototype.constructor.name}.`;
  };
}
function makeThrowFunction(debug, Type, name) {
  if (debug) {
    return function(util) {
      return {
        compare: function(actual, message) {
          let result = false;
          let exception;
          if (typeof actual !== "function") {
            throw new Error("Actual is not a function");
          }
          try {
            actual();
          } catch (e) {
            exception = e;
          }
          if (exception) {
            result = exception instanceof Type || exception.name === name;
          }
          if (defined_default(message)) {
            if (typeof message === "string") {
              result = result && exception.message === message;
            } else {
              result = result && message.test(exception.message);
            }
          }
          let testMessage;
          if (result) {
            testMessage = `Expected function not to throw ${name} , but it threw ${exception.message || exception}`;
          } else {
            testMessage = defined_default(message) ? `Expected to throw with ${name}: ${message}, but it was thrown with ${exception}` : `Expected function to throw with ${name}.`;
          }
          return {
            pass: result,
            message: testMessage
          };
        }
      };
    };
  }
  return function() {
    return {
      compare: function(actual, expected) {
        return { pass: true };
      },
      negativeCompare: function(actual, expected) {
        return { pass: true };
      }
    };
  };
}
function isTypedArray2(o) {
  return ArrayBuffer.isView(o) && !(o instanceof DataView);
}
function typedArrayToArray2(array) {
  if (isTypedArray2(array)) {
    return Array.prototype.slice.call(array, 0);
  }
  return array;
}
function createBaseMatchers(debug) {
  return {
    toBeBetween: function(util) {
      return {
        compare: function(actual, lower, upper) {
          if (lower > upper) {
            const tmp = upper;
            upper = lower;
            lower = tmp;
          }
          return { pass: actual >= lower && actual <= upper };
        }
      };
    },
    toStartWith: function(util) {
      return {
        compare: function(actual, expected) {
          return { pass: actual.slice(0, expected.length) === expected };
        }
      };
    },
    toEndWith: function(util) {
      return {
        compare: function(actual, expected) {
          return { pass: actual.slice(-expected.length) === expected };
        }
      };
    },
    toEqual: function(util) {
      return {
        compare: function(actual, expected) {
          return {
            pass: equals_default(util, actual, expected)
          };
        }
      };
    },
    toEqualEpsilon: function(util) {
      return {
        compare: function(actual, expected, epsilon) {
          function equalityTester(a, b) {
            a = typedArrayToArray2(a);
            b = typedArrayToArray2(b);
            if (Array.isArray(a) && Array.isArray(b)) {
              if (a.length !== b.length) {
                return false;
              }
              for (let i = 0; i < a.length; ++i) {
                if (!equalityTester(a[i], b[i])) {
                  return false;
                }
              }
              return true;
            }
            let to_run;
            if (defined_default(a)) {
              if (typeof a.equalsEpsilon === "function") {
                return a.equalsEpsilon(b, epsilon);
              } else if (a instanceof Object) {
                to_run = Object.getPrototypeOf(a).constructor.equalsEpsilon;
                if (typeof to_run === "function") {
                  return to_run(a, b, epsilon);
                }
              }
            }
            if (defined_default(b)) {
              if (typeof b.equalsEpsilon === "function") {
                return b.equalsEpsilon(a, epsilon);
              } else if (b instanceof Object) {
                to_run = Object.getPrototypeOf(b).constructor.equalsEpsilon;
                if (typeof to_run === "function") {
                  return to_run(b, a, epsilon);
                }
              }
            }
            if (typeof a === "number" || typeof b === "number") {
              return Math.abs(a - b) <= epsilon;
            }
            if (defined_default(a) && defined_default(b)) {
              const keys = Object.keys(a);
              for (let i = 0; i < keys.length; i++) {
                if (!b.hasOwnProperty(keys[i])) {
                  return false;
                }
                const aVal = a[keys[i]];
                const bVal = b[keys[i]];
                if (!equalityTester(aVal, bVal)) {
                  return false;
                }
              }
              return true;
            }
            return equals_default(util, a, b);
          }
          const result = equalityTester(actual, expected);
          return { pass: result };
        }
      };
    },
    toConformToInterface: function(util) {
      return {
        compare: function(actual, expectedInterface) {
          const actualPrototype = actual.prototype;
          const expectedInterfacePrototype = expectedInterface.prototype;
          for (const item in expectedInterfacePrototype) {
            if (expectedInterfacePrototype.hasOwnProperty(item) && typeof expectedInterfacePrototype[item] === "function" && !actualPrototype.hasOwnProperty(item)) {
              return {
                pass: false,
                message: createMissingFunctionMessageFunction(
                  item,
                  actualPrototype,
                  expectedInterfacePrototype
                )
              };
            }
          }
          return { pass: true };
        }
      };
    },
    toBeImageOrImageBitmap: function(util) {
      return {
        compare: function(actual) {
          if (typeof createImageBitmap !== "function") {
            return {
              pass: actual instanceof Image
            };
          }
          return {
            pass: actual instanceof ImageBitmap || actual instanceof Image
          };
        }
      };
    },
    toThrowDeveloperError: makeThrowFunction(
      debug,
      DeveloperError_default,
      "DeveloperError"
    )
  };
}

// packages/gltf/Specs/spec-main.js
var queryString = new URLSearchParams(window.location.search);
var release = window.location.search.indexOf("release") !== -1;
var includeCategory = queryString.get("category");
var excludeCategory = queryString.get("not");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 3e4;
var specFilter = new jasmine.HtmlSpecFilter({
  filterString: function() {
    return queryString.get("spec");
  }
});
var env = jasmine.getEnv();
env.configure({
  stopSpecOnExpectationFailure: false,
  stopOnSpecFailure: false,
  random: false,
  hideDisabled: true,
  specFilter: function(spec) {
    if (!specFilter.matches(spec.getFullName()) || includeCategory === "none" && !queryString.has("spec")) {
      return false;
    }
    return true;
  }
});
env.beforeEach(function() {
  const debug = !release;
  env.addMatchers(createBaseMatchers(debug));
});
customizeJasmine_default(env, {
  includeCategory,
  excludeCategory,
  release
});
//# sourceMappingURL=spec-main.js.map
