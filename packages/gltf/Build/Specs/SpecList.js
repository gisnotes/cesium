var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/mersenne-twister/src/mersenne-twister.js
var require_mersenne_twister = __commonJS({
  "node_modules/mersenne-twister/src/mersenne-twister.js"(exports, module) {
    var MersenneTwister2 = function(seed) {
      if (seed == void 0) {
        seed = (/* @__PURE__ */ new Date()).getTime();
      }
      this.N = 624;
      this.M = 397;
      this.MATRIX_A = 2567483615;
      this.UPPER_MASK = 2147483648;
      this.LOWER_MASK = 2147483647;
      this.mt = new Array(this.N);
      this.mti = this.N + 1;
      if (seed.constructor == Array) {
        this.init_by_array(seed, seed.length);
      } else {
        this.init_seed(seed);
      }
    };
    MersenneTwister2.prototype.init_seed = function(s) {
      this.mt[0] = s >>> 0;
      for (this.mti = 1; this.mti < this.N; this.mti++) {
        var s = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30;
        this.mt[this.mti] = (((s & 4294901760) >>> 16) * 1812433253 << 16) + (s & 65535) * 1812433253 + this.mti;
        this.mt[this.mti] >>>= 0;
      }
    };
    MersenneTwister2.prototype.init_by_array = function(init_key, key_length) {
      var i, j, k;
      this.init_seed(19650218);
      i = 1;
      j = 0;
      k = this.N > key_length ? this.N : key_length;
      for (; k; k--) {
        var s = this.mt[i - 1] ^ this.mt[i - 1] >>> 30;
        this.mt[i] = (this.mt[i] ^ (((s & 4294901760) >>> 16) * 1664525 << 16) + (s & 65535) * 1664525) + init_key[j] + j;
        this.mt[i] >>>= 0;
        i++;
        j++;
        if (i >= this.N) {
          this.mt[0] = this.mt[this.N - 1];
          i = 1;
        }
        if (j >= key_length) j = 0;
      }
      for (k = this.N - 1; k; k--) {
        var s = this.mt[i - 1] ^ this.mt[i - 1] >>> 30;
        this.mt[i] = (this.mt[i] ^ (((s & 4294901760) >>> 16) * 1566083941 << 16) + (s & 65535) * 1566083941) - i;
        this.mt[i] >>>= 0;
        i++;
        if (i >= this.N) {
          this.mt[0] = this.mt[this.N - 1];
          i = 1;
        }
      }
      this.mt[0] = 2147483648;
    };
    MersenneTwister2.prototype.random_int = function() {
      var y;
      var mag01 = new Array(0, this.MATRIX_A);
      if (this.mti >= this.N) {
        var kk;
        if (this.mti == this.N + 1)
          this.init_seed(5489);
        for (kk = 0; kk < this.N - this.M; kk++) {
          y = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
          this.mt[kk] = this.mt[kk + this.M] ^ y >>> 1 ^ mag01[y & 1];
        }
        for (; kk < this.N - 1; kk++) {
          y = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
          this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ y >>> 1 ^ mag01[y & 1];
        }
        y = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK;
        this.mt[this.N - 1] = this.mt[this.M - 1] ^ y >>> 1 ^ mag01[y & 1];
        this.mti = 0;
      }
      y = this.mt[this.mti++];
      y ^= y >>> 11;
      y ^= y << 7 & 2636928640;
      y ^= y << 15 & 4022730752;
      y ^= y >>> 18;
      return y >>> 0;
    };
    MersenneTwister2.prototype.random_int31 = function() {
      return this.random_int() >>> 1;
    };
    MersenneTwister2.prototype.random_incl = function() {
      return this.random_int() * (1 / 4294967295);
    };
    MersenneTwister2.prototype.random = function() {
      return this.random_int() * (1 / 4294967296);
    };
    MersenneTwister2.prototype.random_excl = function() {
      return (this.random_int() + 0.5) * (1 / 4294967296);
    };
    MersenneTwister2.prototype.random_long = function() {
      var a = this.random_int() >>> 5, b = this.random_int() >>> 6;
      return (a * 67108864 + b) * (1 / 9007199254740992);
    };
    module.exports = MersenneTwister2;
  }
});

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
function addBuffer(gltf3, buffer2) {
  const newBuffer = {
    byteLength: buffer2.length,
    extras: {
      _pipeline: {
        source: buffer2
      }
    }
  };
  const bufferId = addToArray_default(gltf3.buffers, newBuffer);
  const bufferView = {
    buffer: bufferId,
    byteOffset: 0,
    byteLength: buffer2.length
  };
  return addToArray_default(gltf3.bufferViews, bufferView);
}
var addBuffer_default = addBuffer;

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

// packages/core/Source/Check.js
var Check = {};
Check.typeOf = {};
function getUndefinedErrorMessage(name) {
  return `${name} is required, actual value was undefined`;
}
function getFailedTypeErrorMessage(actual, expected, name) {
  return `Expected ${name} to be typeof ${expected}, actual typeof was ${actual}`;
}
Check.defined = function(name, test) {
  if (!defined_default(test)) {
    throw new DeveloperError_default(getUndefinedErrorMessage(name));
  }
};
Check.typeOf.func = function(name, test) {
  if (typeof test !== "function") {
    throw new DeveloperError_default(
      getFailedTypeErrorMessage(typeof test, "function", name)
    );
  }
};
Check.typeOf.string = function(name, test) {
  if (typeof test !== "string") {
    throw new DeveloperError_default(
      getFailedTypeErrorMessage(typeof test, "string", name)
    );
  }
};
Check.typeOf.number = function(name, test) {
  if (typeof test !== "number") {
    throw new DeveloperError_default(
      getFailedTypeErrorMessage(typeof test, "number", name)
    );
  }
};
Check.typeOf.number.lessThan = function(name, test, limit) {
  Check.typeOf.number(name, test);
  if (test >= limit) {
    throw new DeveloperError_default(
      `Expected ${name} to be less than ${limit}, actual value was ${test}`
    );
  }
};
Check.typeOf.number.lessThanOrEquals = function(name, test, limit) {
  Check.typeOf.number(name, test);
  if (test > limit) {
    throw new DeveloperError_default(
      `Expected ${name} to be less than or equal to ${limit}, actual value was ${test}`
    );
  }
};
Check.typeOf.number.greaterThan = function(name, test, limit) {
  Check.typeOf.number(name, test);
  if (test <= limit) {
    throw new DeveloperError_default(
      `Expected ${name} to be greater than ${limit}, actual value was ${test}`
    );
  }
};
Check.typeOf.number.greaterThanOrEquals = function(name, test, limit) {
  Check.typeOf.number(name, test);
  if (test < limit) {
    throw new DeveloperError_default(
      `Expected ${name} to be greater than or equal to ${limit}, actual value was ${test}`
    );
  }
};
Check.typeOf.object = function(name, test) {
  if (typeof test !== "object") {
    throw new DeveloperError_default(
      getFailedTypeErrorMessage(typeof test, "object", name)
    );
  }
};
Check.typeOf.bool = function(name, test) {
  if (typeof test !== "boolean") {
    throw new DeveloperError_default(
      getFailedTypeErrorMessage(typeof test, "boolean", name)
    );
  }
};
Check.typeOf.bigint = function(name, test) {
  if (typeof test !== "bigint") {
    throw new DeveloperError_default(
      getFailedTypeErrorMessage(typeof test, "bigint", name)
    );
  }
};
Check.typeOf.number.equals = function(name1, name2, test1, test2) {
  Check.typeOf.number(name1, test1);
  Check.typeOf.number(name2, test2);
  if (test1 !== test2) {
    throw new DeveloperError_default(
      `${name1} must be equal to ${name2}, the actual values are ${test1} and ${test2}`
    );
  }
};
var Check_default = Check;

// packages/core/Source/Math.js
var import_mersenne_twister = __toESM(require_mersenne_twister(), 1);
var CesiumMath = {};
CesiumMath.EPSILON1 = 0.1;
CesiumMath.EPSILON2 = 0.01;
CesiumMath.EPSILON3 = 1e-3;
CesiumMath.EPSILON4 = 1e-4;
CesiumMath.EPSILON5 = 1e-5;
CesiumMath.EPSILON6 = 1e-6;
CesiumMath.EPSILON7 = 1e-7;
CesiumMath.EPSILON8 = 1e-8;
CesiumMath.EPSILON9 = 1e-9;
CesiumMath.EPSILON10 = 1e-10;
CesiumMath.EPSILON11 = 1e-11;
CesiumMath.EPSILON12 = 1e-12;
CesiumMath.EPSILON13 = 1e-13;
CesiumMath.EPSILON14 = 1e-14;
CesiumMath.EPSILON15 = 1e-15;
CesiumMath.EPSILON16 = 1e-16;
CesiumMath.EPSILON17 = 1e-17;
CesiumMath.EPSILON18 = 1e-18;
CesiumMath.EPSILON19 = 1e-19;
CesiumMath.EPSILON20 = 1e-20;
CesiumMath.EPSILON21 = 1e-21;
CesiumMath.GRAVITATIONALPARAMETER = 3986004418e5;
CesiumMath.SOLAR_RADIUS = 6955e5;
CesiumMath.LUNAR_RADIUS = 1737400;
CesiumMath.SIXTY_FOUR_KILOBYTES = 64 * 1024;
CesiumMath.FOUR_GIGABYTES = 4 * 1024 * 1024 * 1024;
CesiumMath.sign = Math.sign ?? function sign(value) {
  value = +value;
  if (value === 0 || value !== value) {
    return value;
  }
  return value > 0 ? 1 : -1;
};
CesiumMath.signNotZero = function(value) {
  return value < 0 ? -1 : 1;
};
CesiumMath.toSNorm = function(value, rangeMaximum) {
  rangeMaximum = rangeMaximum ?? 255;
  return Math.round(
    (CesiumMath.clamp(value, -1, 1) * 0.5 + 0.5) * rangeMaximum
  );
};
CesiumMath.fromSNorm = function(value, rangeMaximum) {
  rangeMaximum = rangeMaximum ?? 255;
  return CesiumMath.clamp(value, 0, rangeMaximum) / rangeMaximum * 2 - 1;
};
CesiumMath.normalize = function(value, rangeMinimum, rangeMaximum) {
  rangeMaximum = Math.max(rangeMaximum - rangeMinimum, 0);
  return rangeMaximum === 0 ? 0 : CesiumMath.clamp((value - rangeMinimum) / rangeMaximum, 0, 1);
};
CesiumMath.sinh = Math.sinh ?? function sinh(value) {
  return (Math.exp(value) - Math.exp(-value)) / 2;
};
CesiumMath.cosh = Math.cosh ?? function cosh(value) {
  return (Math.exp(value) + Math.exp(-value)) / 2;
};
CesiumMath.lerp = function(p, q, time) {
  return (1 - time) * p + time * q;
};
CesiumMath.smoothDamp = function(p, q, velocity, deltaTime = 0, maximumSpeed = Number.POSITIVE_INFINITY, smoothTime = 1e-4, result = {}) {
  Check_default.typeOf.number("p", p);
  Check_default.typeOf.number("q", q);
  Check_default.typeOf.number("velocity", velocity);
  Check_default.typeOf.number.greaterThanOrEquals("deltaTime", deltaTime, 0);
  Check_default.typeOf.number.greaterThanOrEquals("maximumSpeed", maximumSpeed, 0);
  Check_default.typeOf.number.greaterThanOrEquals("smoothTime", smoothTime, 1e-4);
  Check_default.typeOf.object("result", result);
  smoothTime = Math.max(1e-4, smoothTime);
  const omega = 2 / smoothTime;
  const x = omega * deltaTime;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const maxChange = maximumSpeed * smoothTime;
  let change = p - q;
  change = CesiumMath.clamp(change, -maxChange, maxChange);
  const target = p - change;
  const temp = (velocity + omega * change) * deltaTime;
  velocity = (velocity - omega * temp) * exp;
  result.value = target + (change + temp) * exp;
  result.velocity = velocity;
  return result;
};
CesiumMath.PI = Math.PI;
CesiumMath.ONE_OVER_PI = 1 / Math.PI;
CesiumMath.PI_OVER_TWO = Math.PI / 2;
CesiumMath.PI_OVER_THREE = Math.PI / 3;
CesiumMath.PI_OVER_FOUR = Math.PI / 4;
CesiumMath.PI_OVER_SIX = Math.PI / 6;
CesiumMath.THREE_PI_OVER_TWO = 3 * Math.PI / 2;
CesiumMath.TWO_PI = 2 * Math.PI;
CesiumMath.ONE_OVER_TWO_PI = 1 / (2 * Math.PI);
CesiumMath.RADIANS_PER_DEGREE = Math.PI / 180;
CesiumMath.DEGREES_PER_RADIAN = 180 / Math.PI;
CesiumMath.RADIANS_PER_ARCSECOND = CesiumMath.RADIANS_PER_DEGREE / 3600;
CesiumMath.toRadians = function(degrees) {
  if (!defined_default(degrees)) {
    throw new DeveloperError_default("degrees is required.");
  }
  return degrees * CesiumMath.RADIANS_PER_DEGREE;
};
CesiumMath.toDegrees = function(radians) {
  if (!defined_default(radians)) {
    throw new DeveloperError_default("radians is required.");
  }
  return radians * CesiumMath.DEGREES_PER_RADIAN;
};
CesiumMath.convertLongitudeRange = function(angle) {
  if (!defined_default(angle)) {
    throw new DeveloperError_default("angle is required.");
  }
  const twoPi = CesiumMath.TWO_PI;
  const simplified = angle - Math.floor(angle / twoPi) * twoPi;
  if (simplified < -Math.PI) {
    return simplified + twoPi;
  }
  if (simplified >= Math.PI) {
    return simplified - twoPi;
  }
  return simplified;
};
CesiumMath.clampToLatitudeRange = function(angle) {
  if (!defined_default(angle)) {
    throw new DeveloperError_default("angle is required.");
  }
  return CesiumMath.clamp(
    angle,
    -1 * CesiumMath.PI_OVER_TWO,
    CesiumMath.PI_OVER_TWO
  );
};
CesiumMath.negativePiToPi = function(angle) {
  if (!defined_default(angle)) {
    throw new DeveloperError_default("angle is required.");
  }
  if (angle >= -CesiumMath.PI && angle <= CesiumMath.PI) {
    return angle;
  }
  return CesiumMath.zeroToTwoPi(angle + CesiumMath.PI) - CesiumMath.PI;
};
CesiumMath.zeroToTwoPi = function(angle) {
  if (!defined_default(angle)) {
    throw new DeveloperError_default("angle is required.");
  }
  if (angle >= 0 && angle <= CesiumMath.TWO_PI) {
    return angle;
  }
  const mod = CesiumMath.mod(angle, CesiumMath.TWO_PI);
  if (Math.abs(mod) < CesiumMath.EPSILON14 && Math.abs(angle) > CesiumMath.EPSILON14) {
    return CesiumMath.TWO_PI;
  }
  return mod;
};
CesiumMath.mod = function(m, n) {
  if (!defined_default(m)) {
    throw new DeveloperError_default("m is required.");
  }
  if (!defined_default(n)) {
    throw new DeveloperError_default("n is required.");
  }
  if (n === 0) {
    throw new DeveloperError_default("divisor cannot be 0.");
  }
  if (CesiumMath.sign(m) === CesiumMath.sign(n) && Math.abs(m) < Math.abs(n)) {
    return m;
  }
  return (m % n + n) % n;
};
CesiumMath.equalsEpsilon = function(left, right, relativeEpsilon, absoluteEpsilon) {
  if (!defined_default(left)) {
    throw new DeveloperError_default("left is required.");
  }
  if (!defined_default(right)) {
    throw new DeveloperError_default("right is required.");
  }
  relativeEpsilon = relativeEpsilon ?? 0;
  absoluteEpsilon = absoluteEpsilon ?? relativeEpsilon;
  const absDiff = Math.abs(left - right);
  return absDiff <= absoluteEpsilon || absDiff <= relativeEpsilon * Math.max(Math.abs(left), Math.abs(right));
};
CesiumMath.lessThan = function(left, right, absoluteEpsilon) {
  if (!defined_default(left)) {
    throw new DeveloperError_default("first is required.");
  }
  if (!defined_default(right)) {
    throw new DeveloperError_default("second is required.");
  }
  if (!defined_default(absoluteEpsilon)) {
    throw new DeveloperError_default("absoluteEpsilon is required.");
  }
  return left - right < -absoluteEpsilon;
};
CesiumMath.lessThanOrEquals = function(left, right, absoluteEpsilon) {
  if (!defined_default(left)) {
    throw new DeveloperError_default("first is required.");
  }
  if (!defined_default(right)) {
    throw new DeveloperError_default("second is required.");
  }
  if (!defined_default(absoluteEpsilon)) {
    throw new DeveloperError_default("absoluteEpsilon is required.");
  }
  return left - right < absoluteEpsilon;
};
CesiumMath.greaterThan = function(left, right, absoluteEpsilon) {
  if (!defined_default(left)) {
    throw new DeveloperError_default("first is required.");
  }
  if (!defined_default(right)) {
    throw new DeveloperError_default("second is required.");
  }
  if (!defined_default(absoluteEpsilon)) {
    throw new DeveloperError_default("absoluteEpsilon is required.");
  }
  return left - right > absoluteEpsilon;
};
CesiumMath.greaterThanOrEquals = function(left, right, absoluteEpsilon) {
  if (!defined_default(left)) {
    throw new DeveloperError_default("first is required.");
  }
  if (!defined_default(right)) {
    throw new DeveloperError_default("second is required.");
  }
  if (!defined_default(absoluteEpsilon)) {
    throw new DeveloperError_default("absoluteEpsilon is required.");
  }
  return left - right > -absoluteEpsilon;
};
var factorials = [1];
CesiumMath.factorial = function(n) {
  if (typeof n !== "number" || n < 0) {
    throw new DeveloperError_default(
      "A number greater than or equal to 0 is required."
    );
  }
  const length = factorials.length;
  if (n >= length) {
    let sum = factorials[length - 1];
    for (let i = length; i <= n; i++) {
      const next = sum * i;
      factorials.push(next);
      sum = next;
    }
  }
  return factorials[n];
};
CesiumMath.incrementWrap = function(n, maximumValue, minimumValue) {
  minimumValue = minimumValue ?? 0;
  if (!defined_default(n)) {
    throw new DeveloperError_default("n is required.");
  }
  if (maximumValue <= minimumValue) {
    throw new DeveloperError_default("maximumValue must be greater than minimumValue.");
  }
  ++n;
  if (n > maximumValue) {
    n = minimumValue;
  }
  return n;
};
CesiumMath.isPowerOfTwo = function(n) {
  if (typeof n !== "number" || n < 0 || n > 4294967295) {
    throw new DeveloperError_default("A number between 0 and (2^32)-1 is required.");
  }
  return n !== 0 && (n & n - 1) === 0;
};
CesiumMath.nextPowerOfTwo = function(n) {
  if (typeof n !== "number" || n < 0 || n > 2147483648) {
    throw new DeveloperError_default("A number between 0 and 2^31 is required.");
  }
  --n;
  n |= n >> 1;
  n |= n >> 2;
  n |= n >> 4;
  n |= n >> 8;
  n |= n >> 16;
  ++n;
  return n;
};
CesiumMath.previousPowerOfTwo = function(n) {
  if (typeof n !== "number" || n < 0 || n > 4294967295) {
    throw new DeveloperError_default("A number between 0 and (2^32)-1 is required.");
  }
  n |= n >> 1;
  n |= n >> 2;
  n |= n >> 4;
  n |= n >> 8;
  n |= n >> 16;
  n |= n >> 32;
  n = (n >>> 0) - (n >>> 1);
  return n;
};
CesiumMath.clamp = function(value, min, max) {
  Check_default.typeOf.number("value", value);
  Check_default.typeOf.number("min", min);
  Check_default.typeOf.number("max", max);
  return value < min ? min : value > max ? max : value;
};
var randomNumberGenerator = new import_mersenne_twister.default();
CesiumMath.setRandomNumberSeed = function(seed) {
  if (!defined_default(seed)) {
    throw new DeveloperError_default("seed is required.");
  }
  randomNumberGenerator = new import_mersenne_twister.default(seed);
};
CesiumMath.nextRandomNumber = function() {
  return randomNumberGenerator.random();
};
CesiumMath.randomBetween = function(min, max) {
  return CesiumMath.nextRandomNumber() * (max - min) + min;
};
CesiumMath.acosClamped = function(value) {
  if (!defined_default(value)) {
    throw new DeveloperError_default("value is required.");
  }
  return Math.acos(CesiumMath.clamp(value, -1, 1));
};
CesiumMath.asinClamped = function(value) {
  if (!defined_default(value)) {
    throw new DeveloperError_default("value is required.");
  }
  return Math.asin(CesiumMath.clamp(value, -1, 1));
};
CesiumMath.chordLength = function(angle, radius) {
  if (!defined_default(angle)) {
    throw new DeveloperError_default("angle is required.");
  }
  if (!defined_default(radius)) {
    throw new DeveloperError_default("radius is required.");
  }
  return 2 * radius * Math.sin(angle * 0.5);
};
CesiumMath.logBase = function(number, base) {
  if (!defined_default(number)) {
    throw new DeveloperError_default("number is required.");
  }
  if (!defined_default(base)) {
    throw new DeveloperError_default("base is required.");
  }
  return Math.log(number) / Math.log(base);
};
CesiumMath.cbrt = Math.cbrt ?? function cbrt(number) {
  const result = Math.pow(Math.abs(number), 1 / 3);
  return number < 0 ? -result : result;
};
CesiumMath.log2 = Math.log2 ?? function log2(number) {
  return Math.log(number) * Math.LOG2E;
};
CesiumMath.fog = function(distanceToCamera, density) {
  const scalar = distanceToCamera * density;
  return 1 - Math.exp(-(scalar * scalar));
};
CesiumMath.fastApproximateAtan = function(x) {
  Check_default.typeOf.number("x", x);
  return x * (-0.1784 * Math.abs(x) - 0.0663 * x * x + 1.0301);
};
CesiumMath.fastApproximateAtan2 = function(x, y) {
  Check_default.typeOf.number("x", x);
  Check_default.typeOf.number("y", y);
  let opposite;
  let t = Math.abs(x);
  opposite = Math.abs(y);
  const adjacent = Math.max(t, opposite);
  opposite = Math.min(t, opposite);
  const oppositeOverAdjacent = opposite / adjacent;
  if (isNaN(oppositeOverAdjacent)) {
    throw new DeveloperError_default("either x or y must be nonzero");
  }
  t = CesiumMath.fastApproximateAtan(oppositeOverAdjacent);
  t = Math.abs(y) > Math.abs(x) ? CesiumMath.PI_OVER_TWO - t : t;
  t = x < 0 ? CesiumMath.PI - t : t;
  t = y < 0 ? -t : t;
  return t;
};
var Math_default = CesiumMath;

// packages/core/Source/Cartesian3.js
var Cartesian3 = class _Cartesian3 {
  /**
   * @param {number} [x=0.0] The X component.
   * @param {number} [y=0.0] The Y component.
   * @param {number} [z=0.0] The Z component.
   */
  constructor(x, y, z) {
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.z = z ?? 0;
  }
  /**
   * Converts the provided Spherical into Cartesian3 coordinates.
   *
   * @param {Spherical} spherical The Spherical to be converted to Cartesian3.
   * @param {Cartesian3} [result] The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if one was not provided.
   */
  static fromSpherical(spherical, result) {
    Check_default.typeOf.object("spherical", spherical);
    if (!defined_default(result)) {
      result = new _Cartesian3();
    }
    const clock = spherical.clock;
    const cone = spherical.cone;
    const magnitude = spherical.magnitude ?? 1;
    const radial = magnitude * Math.sin(cone);
    result.x = radial * Math.cos(clock);
    result.y = radial * Math.sin(clock);
    result.z = magnitude * Math.cos(cone);
    return result;
  }
  /**
   * Creates a Cartesian3 instance from x, y and z coordinates.
   *
   * @param {number} x The x coordinate.
   * @param {number} y The y coordinate.
   * @param {number} z The z coordinate.
   * @param {Cartesian3} [result] The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if one was not provided.
   */
  static fromElements(x, y, z, result) {
    if (!defined_default(result)) {
      return new _Cartesian3(x, y, z);
    }
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  }
  /**
   * Duplicates a Cartesian3 instance.
   *
   * @param {Cartesian3} cartesian The Cartesian to duplicate.
   * @param {Cartesian3} [result] The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if one was not provided. (Returns undefined if cartesian is undefined)
   */
  static clone(cartesian, result) {
    if (!defined_default(cartesian)) {
      return void 0;
    }
    if (!defined_default(result)) {
      return new _Cartesian3(cartesian.x, cartesian.y, cartesian.z);
    }
    result.x = cartesian.x;
    result.y = cartesian.y;
    result.z = cartesian.z;
    return result;
  }
  /**
   * Stores the provided instance into the provided array.
   *
   * @param {Cartesian3} value The value to pack.
   * @param {number[]} array The array to pack into.
   * @param {number} [startingIndex=0] The index into the array at which to start packing the elements.
   *
   * @returns {number[]} The array that was packed into
   */
  static pack(value, array, startingIndex) {
    Check_default.typeOf.object("value", value);
    Check_default.defined("array", array);
    startingIndex = startingIndex ?? 0;
    array[startingIndex++] = value.x;
    array[startingIndex++] = value.y;
    array[startingIndex] = value.z;
    return array;
  }
  /**
   * Retrieves an instance from a packed array.
   *
   * @param {number[]} array The packed array.
   * @param {number} [startingIndex=0] The starting index of the element to be unpacked.
   * @param {Cartesian3} [result] The object into which to store the result.
   * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if one was not provided.
   */
  static unpack(array, startingIndex, result) {
    Check_default.defined("array", array);
    startingIndex = startingIndex ?? 0;
    if (!defined_default(result)) {
      result = new _Cartesian3();
    }
    result.x = array[startingIndex++];
    result.y = array[startingIndex++];
    result.z = array[startingIndex];
    return result;
  }
  /**
   * Flattens an array of Cartesian3s into an array of components.
   *
   * @param {Cartesian3[]} array The array of cartesians to pack.
   * @param {number[]} [result] The array onto which to store the result. If this is a typed array, it must have array.length * 3 components, else a {@link DeveloperError} will be thrown. If it is a regular array, it will be resized to have (array.length * 3) elements.
   * @returns {number[]} The packed array.
   */
  static packArray(array, result) {
    Check_default.defined("array", array);
    const length = array.length;
    const resultLength = length * 3;
    if (!defined_default(result)) {
      result = new Array(resultLength);
    } else if (!Array.isArray(result) && result.length !== resultLength) {
      throw new DeveloperError_default(
        "If result is a typed array, it must have exactly array.length * 3 elements"
      );
    } else if (result.length !== resultLength) {
      result.length = resultLength;
    }
    for (let i = 0; i < length; ++i) {
      _Cartesian3.pack(array[i], result, i * 3);
    }
    return result;
  }
  /**
   * Unpacks an array of cartesian components into an array of Cartesian3s.
   *
   * @param {number[]} array The array of components to unpack.
   * @param {Cartesian3[]} [result] The array onto which to store the result.
   * @returns {Cartesian3[]} The unpacked array.
   */
  static unpackArray(array, result) {
    Check_default.defined("array", array);
    Check_default.typeOf.number.greaterThanOrEquals("array.length", array.length, 3);
    if (array.length % 3 !== 0) {
      throw new DeveloperError_default("array length must be a multiple of 3.");
    }
    const length = array.length;
    if (!defined_default(result)) {
      result = new Array(length / 3);
    } else {
      result.length = length / 3;
    }
    for (let i = 0; i < length; i += 3) {
      const index = i / 3;
      result[index] = _Cartesian3.unpack(array, i, result[index]);
    }
    return result;
  }
  /**
   * Computes the value of the maximum component for the supplied Cartesian.
   *
   * @param {Cartesian3} cartesian The cartesian to use.
   * @returns {number} The value of the maximum component.
   */
  static maximumComponent(cartesian) {
    Check_default.typeOf.object("cartesian", cartesian);
    return Math.max(cartesian.x, cartesian.y, cartesian.z);
  }
  /**
   * Computes the value of the minimum component for the supplied Cartesian.
   *
   * @param {Cartesian3} cartesian The cartesian to use.
   * @returns {number} The value of the minimum component.
   */
  static minimumComponent(cartesian) {
    Check_default.typeOf.object("cartesian", cartesian);
    return Math.min(cartesian.x, cartesian.y, cartesian.z);
  }
  /**
   * Compares two Cartesians and computes a Cartesian which contains the minimum components of the supplied Cartesians.
   *
   * @param {Cartesian3} first A cartesian to compare.
   * @param {Cartesian3} second A cartesian to compare.
   * @param {Cartesian3} result The object into which to store the result.
   * @returns {Cartesian3} A cartesian with the minimum components.
   */
  static minimumByComponent(first, second, result) {
    Check_default.typeOf.object("first", first);
    Check_default.typeOf.object("second", second);
    Check_default.typeOf.object("result", result);
    result.x = Math.min(first.x, second.x);
    result.y = Math.min(first.y, second.y);
    result.z = Math.min(first.z, second.z);
    return result;
  }
  /**
   * Compares two Cartesians and computes a Cartesian which contains the maximum components of the supplied Cartesians.
   *
   * @param {Cartesian3} first A cartesian to compare.
   * @param {Cartesian3} second A cartesian to compare.
   * @param {Cartesian3} result The object into which to store the result.
   * @returns {Cartesian3} A cartesian with the maximum components.
   */
  static maximumByComponent(first, second, result) {
    Check_default.typeOf.object("first", first);
    Check_default.typeOf.object("second", second);
    Check_default.typeOf.object("result", result);
    result.x = Math.max(first.x, second.x);
    result.y = Math.max(first.y, second.y);
    result.z = Math.max(first.z, second.z);
    return result;
  }
  /**
   * Constrain a value to lie between two values.
   *
   * @param {Cartesian3} value The value to clamp.
   * @param {Cartesian3} min The minimum bound.
   * @param {Cartesian3} max The maximum bound.
   * @param {Cartesian3} result The object into which to store the result.
   * @returns {Cartesian3} The clamped value such that min <= value <= max.
   */
  static clamp(value, min, max, result) {
    Check_default.typeOf.object("value", value);
    Check_default.typeOf.object("min", min);
    Check_default.typeOf.object("max", max);
    Check_default.typeOf.object("result", result);
    const x = Math_default.clamp(value.x, min.x, max.x);
    const y = Math_default.clamp(value.y, min.y, max.y);
    const z = Math_default.clamp(value.z, min.z, max.z);
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  }
  /**
   * Computes the provided Cartesian's squared magnitude.
   *
   * @param {Cartesian3} cartesian The Cartesian instance whose squared magnitude is to be computed.
   * @returns {number} The squared magnitude.
   */
  static magnitudeSquared(cartesian) {
    Check_default.typeOf.object("cartesian", cartesian);
    return cartesian.x * cartesian.x + cartesian.y * cartesian.y + cartesian.z * cartesian.z;
  }
  /**
   * Computes the Cartesian's magnitude (length).
   *
   * @param {Cartesian3} cartesian The Cartesian instance whose magnitude is to be computed.
   * @returns {number} The magnitude.
   */
  static magnitude(cartesian) {
    return Math.sqrt(_Cartesian3.magnitudeSquared(cartesian));
  }
  /**
   * Computes the distance between two points.
   *
   * @param {Cartesian3} left The first point to compute the distance from.
   * @param {Cartesian3} right The second point to compute the distance to.
   * @returns {number} The distance between two points.
   *
   * @example
   * // Returns 1.0
   * const d = Cesium.Cartesian3.distance(new Cesium.Cartesian3(1.0, 0.0, 0.0), new Cesium.Cartesian3(2.0, 0.0, 0.0));
   */
  static distance(left, right) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    _Cartesian3.subtract(left, right, distanceScratch);
    return _Cartesian3.magnitude(distanceScratch);
  }
  /**
   * Computes the squared distance between two points.  Comparing squared distances
   * using this function is more efficient than comparing distances using {@link Cartesian3#distance}.
   *
   * @param {Cartesian3} left The first point to compute the distance from.
   * @param {Cartesian3} right The second point to compute the distance to.
   * @returns {number} The distance between two points.
   *
   * @example
   * // Returns 4.0, not 2.0
   * const d = Cesium.Cartesian3.distanceSquared(new Cesium.Cartesian3(1.0, 0.0, 0.0), new Cesium.Cartesian3(3.0, 0.0, 0.0));
   */
  static distanceSquared(left, right) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    _Cartesian3.subtract(left, right, distanceScratch);
    return _Cartesian3.magnitudeSquared(distanceScratch);
  }
  /**
   * Computes the normalized form of the supplied Cartesian.
   *
   * @param {Cartesian3} cartesian The Cartesian to be normalized.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter.
   */
  static normalize(cartesian, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    const magnitude = _Cartesian3.magnitude(cartesian);
    result.x = cartesian.x / magnitude;
    result.y = cartesian.y / magnitude;
    result.z = cartesian.z / magnitude;
    if (isNaN(result.x) || isNaN(result.y) || isNaN(result.z)) {
      throw new DeveloperError_default("normalized result is not a number");
    }
    return result;
  }
  /**
   * Computes the dot (scalar) product of two Cartesians.
   *
   * @param {Cartesian3} left The first Cartesian.
   * @param {Cartesian3} right The second Cartesian.
   * @returns {number} The dot product.
   */
  static dot(left, right) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    return left.x * right.x + left.y * right.y + left.z * right.z;
  }
  /**
   * Computes the componentwise product of two Cartesians.
   *
   * @param {Cartesian3} left The first Cartesian.
   * @param {Cartesian3} right The second Cartesian.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter.
   */
  static multiplyComponents(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result.x = left.x * right.x;
    result.y = left.y * right.y;
    result.z = left.z * right.z;
    return result;
  }
  /**
   * Computes the componentwise quotient of two Cartesians.
   *
   * @param {Cartesian3} left The first Cartesian.
   * @param {Cartesian3} right The second Cartesian.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter.
   */
  static divideComponents(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result.x = left.x / right.x;
    result.y = left.y / right.y;
    result.z = left.z / right.z;
    return result;
  }
  /**
   * Computes the componentwise sum of two Cartesians.
   *
   * @param {Cartesian3} left The first Cartesian.
   * @param {Cartesian3} right The second Cartesian.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter.
   */
  static add(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result.x = left.x + right.x;
    result.y = left.y + right.y;
    result.z = left.z + right.z;
    return result;
  }
  /**
   * Computes the componentwise difference of two Cartesians.
   *
   * @param {Cartesian3} left The first Cartesian.
   * @param {Cartesian3} right The second Cartesian.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter.
   */
  static subtract(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result.x = left.x - right.x;
    result.y = left.y - right.y;
    result.z = left.z - right.z;
    return result;
  }
  /**
   * Multiplies the provided Cartesian componentwise by the provided scalar.
   *
   * @param {Cartesian3} cartesian The Cartesian to be scaled.
   * @param {number} scalar The scalar to multiply with.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter.
   */
  static multiplyByScalar(cartesian, scalar, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.number("scalar", scalar);
    Check_default.typeOf.object("result", result);
    result.x = cartesian.x * scalar;
    result.y = cartesian.y * scalar;
    result.z = cartesian.z * scalar;
    return result;
  }
  /**
   * Divides the provided Cartesian componentwise by the provided scalar.
   *
   * @param {Cartesian3} cartesian The Cartesian to be divided.
   * @param {number} scalar The scalar to divide by.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter.
   */
  static divideByScalar(cartesian, scalar, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.number("scalar", scalar);
    Check_default.typeOf.object("result", result);
    result.x = cartesian.x / scalar;
    result.y = cartesian.y / scalar;
    result.z = cartesian.z / scalar;
    return result;
  }
  /**
   * Negates the provided Cartesian.
   *
   * @param {Cartesian3} cartesian The Cartesian to be negated.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter.
   */
  static negate(cartesian, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    result.x = -cartesian.x;
    result.y = -cartesian.y;
    result.z = -cartesian.z;
    return result;
  }
  /**
   * Computes the absolute value of the provided Cartesian.
   *
   * @param {Cartesian3} cartesian The Cartesian whose absolute value is to be computed.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter.
   */
  static abs(cartesian, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    result.x = Math.abs(cartesian.x);
    result.y = Math.abs(cartesian.y);
    result.z = Math.abs(cartesian.z);
    return result;
  }
  /**
   * Computes the linear interpolation or extrapolation at t using the provided cartesians.
   *
   * @param {Cartesian3} start The value corresponding to t at 0.0.
   * @param {Cartesian3} end The value corresponding to t at 1.0.
   * @param {number} t The point along t at which to interpolate.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter.
   */
  static lerp(start, end, t, result) {
    Check_default.typeOf.object("start", start);
    Check_default.typeOf.object("end", end);
    Check_default.typeOf.number("t", t);
    Check_default.typeOf.object("result", result);
    _Cartesian3.multiplyByScalar(end, t, lerpScratch);
    result = _Cartesian3.multiplyByScalar(start, 1 - t, result);
    return _Cartesian3.add(lerpScratch, result, result);
  }
  /**
   * Returns the angle, in radians, between the provided Cartesians.
   *
   * @param {Cartesian3} left The first Cartesian.
   * @param {Cartesian3} right The second Cartesian.
   * @returns {number} The angle between the Cartesians.
   */
  static angleBetween(left, right) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    _Cartesian3.normalize(left, angleBetweenScratch);
    _Cartesian3.normalize(right, angleBetweenScratch2);
    const cosine = _Cartesian3.dot(angleBetweenScratch, angleBetweenScratch2);
    const sine = _Cartesian3.magnitude(
      _Cartesian3.cross(
        angleBetweenScratch,
        angleBetweenScratch2,
        angleBetweenScratch
      )
    );
    return Math.atan2(sine, cosine);
  }
  /**
   * Returns the axis that is most orthogonal to the provided Cartesian.
   *
   * @param {Cartesian3} cartesian The Cartesian on which to find the most orthogonal axis.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The most orthogonal axis.
   */
  static mostOrthogonalAxis(cartesian, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    const f = _Cartesian3.normalize(cartesian, mostOrthogonalAxisScratch);
    _Cartesian3.abs(f, f);
    if (f.x <= f.y) {
      if (f.x <= f.z) {
        result = _Cartesian3.clone(_Cartesian3.UNIT_X, result);
      } else {
        result = _Cartesian3.clone(_Cartesian3.UNIT_Z, result);
      }
    } else if (f.y <= f.z) {
      result = _Cartesian3.clone(_Cartesian3.UNIT_Y, result);
    } else {
      result = _Cartesian3.clone(_Cartesian3.UNIT_Z, result);
    }
    return result;
  }
  /**
   * Projects vector a onto vector b
   * @param {Cartesian3} a The vector that needs projecting
   * @param {Cartesian3} b The vector to project onto
   * @param {Cartesian3} result The result cartesian
   * @returns {Cartesian3} The modified result parameter
   */
  static projectVector(a, b, result) {
    Check_default.defined("a", a);
    Check_default.defined("b", b);
    Check_default.defined("result", result);
    const scalar = _Cartesian3.dot(a, b) / _Cartesian3.dot(b, b);
    return _Cartesian3.multiplyByScalar(b, scalar, result);
  }
  /**
   * Compares the provided Cartesians componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Cartesian3} [left] The first Cartesian.
   * @param {Cartesian3} [right] The second Cartesian.
   * @returns {boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
   */
  static equals(left, right) {
    return left === right || defined_default(left) && defined_default(right) && left.x === right.x && left.y === right.y && left.z === right.z;
  }
  /**
   * Compares the provided Cartesian3 to the values packed into an array, starting at the provided offset.
   *
   * @param {Cartesian3} cartesian The Cartesian3 to compare.
   * @param {number[]} array The packed array.
   * @param {number} offset The offset into the array at which the Cartesian3 starts.
   * @returns {boolean} <code>true</code> if the Cartesian3 matches the packed array values at the offset; otherwise, <code>false</code>.
   * @internal
   */
  static equalsArray(cartesian, array, offset) {
    return cartesian.x === array[offset] && cartesian.y === array[offset + 1] && cartesian.z === array[offset + 2];
  }
  /**
   * Compares the provided Cartesians componentwise and returns
   * <code>true</code> if they pass an absolute or relative tolerance test,
   * <code>false</code> otherwise.
   *
   * @param {Cartesian3} [left] The first Cartesian.
   * @param {Cartesian3} [right] The second Cartesian.
   * @param {number} [relativeEpsilon=0] The relative epsilon tolerance to use for equality testing.
   * @param {number} [absoluteEpsilon=relativeEpsilon] The absolute epsilon tolerance to use for equality testing.
   * @returns {boolean} <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
   */
  static equalsEpsilon(left, right, relativeEpsilon, absoluteEpsilon) {
    return left === right || defined_default(left) && defined_default(right) && Math_default.equalsEpsilon(
      left.x,
      right.x,
      relativeEpsilon,
      absoluteEpsilon
    ) && Math_default.equalsEpsilon(
      left.y,
      right.y,
      relativeEpsilon,
      absoluteEpsilon
    ) && Math_default.equalsEpsilon(
      left.z,
      right.z,
      relativeEpsilon,
      absoluteEpsilon
    );
  }
  /**
   * Computes the cross (outer) product of two Cartesians.
   *
   * @param {Cartesian3} left The first Cartesian.
   * @param {Cartesian3} right The second Cartesian.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The cross product.
   */
  static cross(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    const leftX = left.x;
    const leftY = left.y;
    const leftZ = left.z;
    const rightX = right.x;
    const rightY = right.y;
    const rightZ = right.z;
    const x = leftY * rightZ - leftZ * rightY;
    const y = leftZ * rightX - leftX * rightZ;
    const z = leftX * rightY - leftY * rightX;
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  }
  /**
   * Computes the midpoint between the right and left Cartesian.
   * @param {Cartesian3} left The first Cartesian.
   * @param {Cartesian3} right The second Cartesian.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The midpoint.
   */
  static midpoint(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result.x = (left.x + right.x) * 0.5;
    result.y = (left.y + right.y) * 0.5;
    result.z = (left.z + right.z) * 0.5;
    return result;
  }
  /**
   * Returns a Cartesian3 position from longitude and latitude values given in degrees.
   *
   * @param {number} longitude The longitude, in degrees
   * @param {number} latitude The latitude, in degrees
   * @param {number} [height=0.0] The height, in meters, above the ellipsoid.
   * @param {Ellipsoid} [ellipsoid=Ellipsoid.default] The ellipsoid on which the position lies.
   * @param {Cartesian3} [result] The object onto which to store the result.
   * @returns {Cartesian3} The position
   *
   * @example
   * const position = Cesium.Cartesian3.fromDegrees(-115.0, 37.0);
   */
  static fromDegrees(longitude, latitude, height, ellipsoid, result) {
    Check_default.typeOf.number("longitude", longitude);
    Check_default.typeOf.number("latitude", latitude);
    longitude = Math_default.toRadians(longitude);
    latitude = Math_default.toRadians(latitude);
    return _Cartesian3.fromRadians(
      longitude,
      latitude,
      height,
      ellipsoid,
      result
    );
  }
  /**
   * Returns a Cartesian3 position from longitude and latitude values given in radians.
   *
   * @param {number} longitude The longitude, in radians
   * @param {number} latitude The latitude, in radians
   * @param {number} [height=0.0] The height, in meters, above the ellipsoid.
   * @param {Ellipsoid} [ellipsoid=Ellipsoid.default] The ellipsoid on which the position lies.
   * @param {Cartesian3} [result] The object onto which to store the result.
   * @returns {Cartesian3} The position
   *
   * @example
   * const position = Cesium.Cartesian3.fromRadians(-2.007, 0.645);
   */
  static fromRadians(longitude, latitude, height, ellipsoid, result) {
    Check_default.typeOf.number("longitude", longitude);
    Check_default.typeOf.number("latitude", latitude);
    height = height ?? 0;
    const radiiSquared = !defined_default(ellipsoid) ? _Cartesian3._ellipsoidRadiiSquared : ellipsoid.radiiSquared;
    const cosLatitude = Math.cos(latitude);
    scratchN.x = cosLatitude * Math.cos(longitude);
    scratchN.y = cosLatitude * Math.sin(longitude);
    scratchN.z = Math.sin(latitude);
    scratchN = _Cartesian3.normalize(scratchN, scratchN);
    _Cartesian3.multiplyComponents(radiiSquared, scratchN, scratchK);
    const gamma = Math.sqrt(_Cartesian3.dot(scratchN, scratchK));
    scratchK = _Cartesian3.divideByScalar(scratchK, gamma, scratchK);
    scratchN = _Cartesian3.multiplyByScalar(scratchN, height, scratchN);
    if (!defined_default(result)) {
      result = new _Cartesian3();
    }
    return _Cartesian3.add(scratchK, scratchN, result);
  }
  /**
   * Returns an array of Cartesian3 positions given an array of longitude and latitude values given in degrees.
   *
   * @param {number[]} coordinates A list of longitude and latitude values. Values alternate [longitude, latitude, longitude, latitude...].
   * @param {Ellipsoid} [ellipsoid=Ellipsoid.default] The ellipsoid on which the coordinates lie.
   * @param {Cartesian3[]} [result] An array of Cartesian3 objects to store the result.
   * @returns {Cartesian3[]} The array of positions.
   *
   * @example
   * const positions = Cesium.Cartesian3.fromDegreesArray([-115.0, 37.0, -107.0, 33.0]);
   */
  static fromDegreesArray(coordinates, ellipsoid, result) {
    Check_default.defined("coordinates", coordinates);
    if (coordinates.length < 2 || coordinates.length % 2 !== 0) {
      throw new DeveloperError_default(
        "the number of coordinates must be a multiple of 2 and at least 2"
      );
    }
    const length = coordinates.length;
    if (!defined_default(result)) {
      result = new Array(length / 2);
    } else {
      result.length = length / 2;
    }
    for (let i = 0; i < length; i += 2) {
      const longitude = coordinates[i];
      const latitude = coordinates[i + 1];
      const index = i / 2;
      result[index] = _Cartesian3.fromDegrees(
        longitude,
        latitude,
        0,
        ellipsoid,
        result[index]
      );
    }
    return result;
  }
  /**
   * Returns an array of Cartesian3 positions given an array of longitude and latitude values given in radians.
   *
   * @param {number[]} coordinates A list of longitude and latitude values. Values alternate [longitude, latitude, longitude, latitude...].
   * @param {Ellipsoid} [ellipsoid=Ellipsoid.default] The ellipsoid on which the coordinates lie.
   * @param {Cartesian3[]} [result] An array of Cartesian3 objects to store the result.
   * @returns {Cartesian3[]} The array of positions.
   *
   * @example
   * const positions = Cesium.Cartesian3.fromRadiansArray([-2.007, 0.645, -1.867, .575]);
   */
  static fromRadiansArray(coordinates, ellipsoid, result) {
    Check_default.defined("coordinates", coordinates);
    if (coordinates.length < 2 || coordinates.length % 2 !== 0) {
      throw new DeveloperError_default(
        "the number of coordinates must be a multiple of 2 and at least 2"
      );
    }
    const length = coordinates.length;
    if (!defined_default(result)) {
      result = new Array(length / 2);
    } else {
      result.length = length / 2;
    }
    for (let i = 0; i < length; i += 2) {
      const longitude = coordinates[i];
      const latitude = coordinates[i + 1];
      const index = i / 2;
      result[index] = _Cartesian3.fromRadians(
        longitude,
        latitude,
        0,
        ellipsoid,
        result[index]
      );
    }
    return result;
  }
  /**
   * Returns an array of Cartesian3 positions given an array of longitude, latitude and height values where longitude and latitude are given in degrees.
   *
   * @param {number[]} coordinates A list of longitude, latitude and height values. Values alternate [longitude, latitude, height, longitude, latitude, height...].
   * @param {Ellipsoid} [ellipsoid=Ellipsoid.default] The ellipsoid on which the position lies.
   * @param {Cartesian3[]} [result] An array of Cartesian3 objects to store the result.
   * @returns {Cartesian3[]} The array of positions.
   *
   * @example
   * const positions = Cesium.Cartesian3.fromDegreesArrayHeights([-115.0, 37.0, 100000.0, -107.0, 33.0, 150000.0]);
   */
  static fromDegreesArrayHeights(coordinates, ellipsoid, result) {
    Check_default.defined("coordinates", coordinates);
    if (coordinates.length < 3 || coordinates.length % 3 !== 0) {
      throw new DeveloperError_default(
        "the number of coordinates must be a multiple of 3 and at least 3"
      );
    }
    const length = coordinates.length;
    if (!defined_default(result)) {
      result = new Array(length / 3);
    } else {
      result.length = length / 3;
    }
    for (let i = 0; i < length; i += 3) {
      const longitude = coordinates[i];
      const latitude = coordinates[i + 1];
      const height = coordinates[i + 2];
      const index = i / 3;
      result[index] = _Cartesian3.fromDegrees(
        longitude,
        latitude,
        height,
        ellipsoid,
        result[index]
      );
    }
    return result;
  }
  /**
   * Returns an array of Cartesian3 positions given an array of longitude, latitude and height values where longitude and latitude are given in radians.
   *
   * @param {number[]} coordinates A list of longitude, latitude and height values. Values alternate [longitude, latitude, height, longitude, latitude, height...].
   * @param {Ellipsoid} [ellipsoid=Ellipsoid.default] The ellipsoid on which the position lies.
   * @param {Cartesian3[]} [result] An array of Cartesian3 objects to store the result.
   * @returns {Cartesian3[]} The array of positions.
   *
   * @example
   * const positions = Cesium.Cartesian3.fromRadiansArrayHeights([-2.007, 0.645, 100000.0, -1.867, .575, 150000.0]);
   */
  static fromRadiansArrayHeights(coordinates, ellipsoid, result) {
    Check_default.defined("coordinates", coordinates);
    if (coordinates.length < 3 || coordinates.length % 3 !== 0) {
      throw new DeveloperError_default(
        "the number of coordinates must be a multiple of 3 and at least 3"
      );
    }
    const length = coordinates.length;
    if (!defined_default(result)) {
      result = new Array(length / 3);
    } else {
      result.length = length / 3;
    }
    for (let i = 0; i < length; i += 3) {
      const longitude = coordinates[i];
      const latitude = coordinates[i + 1];
      const height = coordinates[i + 2];
      const index = i / 3;
      result[index] = _Cartesian3.fromRadians(
        longitude,
        latitude,
        height,
        ellipsoid,
        result[index]
      );
    }
    return result;
  }
  /**
   * Duplicates this Cartesian3 instance.
   *
   * @param {Cartesian3} [result] The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if one was not provided.
   */
  clone(result) {
    return _Cartesian3.clone(this, result);
  }
  /**
   * Compares this Cartesian against the provided Cartesian componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Cartesian3} [right] The right hand side Cartesian.
   * @returns {boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
   */
  equals(right) {
    return _Cartesian3.equals(this, right);
  }
  /**
   * Compares this Cartesian against the provided Cartesian componentwise and returns
   * <code>true</code> if they pass an absolute or relative tolerance test,
   * <code>false</code> otherwise.
   *
   * @param {Cartesian3} [right] The right hand side Cartesian.
   * @param {number} [relativeEpsilon=0] The relative epsilon tolerance to use for equality testing.
   * @param {number} [absoluteEpsilon=relativeEpsilon] The absolute epsilon tolerance to use for equality testing.
   * @returns {boolean} <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
   */
  equalsEpsilon(right, relativeEpsilon, absoluteEpsilon) {
    return _Cartesian3.equalsEpsilon(
      this,
      right,
      relativeEpsilon,
      absoluteEpsilon
    );
  }
  /**
   * Creates a string representing this Cartesian in the format '(x, y, z)'.
   *
   * @returns {string} A string representing this Cartesian in the format '(x, y, z)'.
   */
  toString() {
    return `(${this.x}, ${this.y}, ${this.z})`;
  }
};
Cartesian3.fromCartesian4 = Cartesian3.clone;
Cartesian3.packedLength = 3;
Cartesian3.fromArray = Cartesian3.unpack;
var distanceScratch = new Cartesian3();
var lerpScratch = new Cartesian3();
var angleBetweenScratch = new Cartesian3();
var angleBetweenScratch2 = new Cartesian3();
var mostOrthogonalAxisScratch = new Cartesian3();
var scratchN = new Cartesian3();
var scratchK = new Cartesian3();
Cartesian3._ellipsoidRadiiSquared = new Cartesian3(
  6378137 * 6378137,
  6378137 * 6378137,
  6356752314245179e-9 * 6356752314245179e-9
);
Cartesian3.ZERO = Object.freeze(new Cartesian3(0, 0, 0));
Cartesian3.ONE = Object.freeze(new Cartesian3(1, 1, 1));
Cartesian3.UNIT_X = Object.freeze(new Cartesian3(1, 0, 0));
Cartesian3.UNIT_Y = Object.freeze(new Cartesian3(0, 1, 0));
Cartesian3.UNIT_Z = Object.freeze(new Cartesian3(0, 0, 1));
var Cartesian3_default = Cartesian3;

// packages/core/Source/WebGLConstants.js
var WebGLConstants = {
  DEPTH_BUFFER_BIT: 256,
  STENCIL_BUFFER_BIT: 1024,
  COLOR_BUFFER_BIT: 16384,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  ZERO: 0,
  ONE: 1,
  SRC_COLOR: 768,
  ONE_MINUS_SRC_COLOR: 769,
  SRC_ALPHA: 770,
  ONE_MINUS_SRC_ALPHA: 771,
  DST_ALPHA: 772,
  ONE_MINUS_DST_ALPHA: 773,
  DST_COLOR: 774,
  ONE_MINUS_DST_COLOR: 775,
  SRC_ALPHA_SATURATE: 776,
  FUNC_ADD: 32774,
  BLEND_EQUATION: 32777,
  BLEND_EQUATION_RGB: 32777,
  // same as BLEND_EQUATION
  BLEND_EQUATION_ALPHA: 34877,
  FUNC_SUBTRACT: 32778,
  FUNC_REVERSE_SUBTRACT: 32779,
  BLEND_DST_RGB: 32968,
  BLEND_SRC_RGB: 32969,
  BLEND_DST_ALPHA: 32970,
  BLEND_SRC_ALPHA: 32971,
  CONSTANT_COLOR: 32769,
  ONE_MINUS_CONSTANT_COLOR: 32770,
  CONSTANT_ALPHA: 32771,
  ONE_MINUS_CONSTANT_ALPHA: 32772,
  BLEND_COLOR: 32773,
  ARRAY_BUFFER: 34962,
  ELEMENT_ARRAY_BUFFER: 34963,
  ARRAY_BUFFER_BINDING: 34964,
  ELEMENT_ARRAY_BUFFER_BINDING: 34965,
  STREAM_DRAW: 35040,
  STATIC_DRAW: 35044,
  DYNAMIC_DRAW: 35048,
  BUFFER_SIZE: 34660,
  BUFFER_USAGE: 34661,
  CURRENT_VERTEX_ATTRIB: 34342,
  FRONT: 1028,
  BACK: 1029,
  FRONT_AND_BACK: 1032,
  CULL_FACE: 2884,
  BLEND: 3042,
  DITHER: 3024,
  STENCIL_TEST: 2960,
  DEPTH_TEST: 2929,
  SCISSOR_TEST: 3089,
  POLYGON_OFFSET_FILL: 32823,
  SAMPLE_ALPHA_TO_COVERAGE: 32926,
  SAMPLE_COVERAGE: 32928,
  NO_ERROR: 0,
  INVALID_ENUM: 1280,
  INVALID_VALUE: 1281,
  INVALID_OPERATION: 1282,
  OUT_OF_MEMORY: 1285,
  CW: 2304,
  CCW: 2305,
  LINE_WIDTH: 2849,
  ALIASED_POINT_SIZE_RANGE: 33901,
  ALIASED_LINE_WIDTH_RANGE: 33902,
  CULL_FACE_MODE: 2885,
  FRONT_FACE: 2886,
  DEPTH_RANGE: 2928,
  DEPTH_WRITEMASK: 2930,
  DEPTH_CLEAR_VALUE: 2931,
  DEPTH_FUNC: 2932,
  STENCIL_CLEAR_VALUE: 2961,
  STENCIL_FUNC: 2962,
  STENCIL_FAIL: 2964,
  STENCIL_PASS_DEPTH_FAIL: 2965,
  STENCIL_PASS_DEPTH_PASS: 2966,
  STENCIL_REF: 2967,
  STENCIL_VALUE_MASK: 2963,
  STENCIL_WRITEMASK: 2968,
  STENCIL_BACK_FUNC: 34816,
  STENCIL_BACK_FAIL: 34817,
  STENCIL_BACK_PASS_DEPTH_FAIL: 34818,
  STENCIL_BACK_PASS_DEPTH_PASS: 34819,
  STENCIL_BACK_REF: 36003,
  STENCIL_BACK_VALUE_MASK: 36004,
  STENCIL_BACK_WRITEMASK: 36005,
  VIEWPORT: 2978,
  SCISSOR_BOX: 3088,
  COLOR_CLEAR_VALUE: 3106,
  COLOR_WRITEMASK: 3107,
  UNPACK_ALIGNMENT: 3317,
  PACK_ALIGNMENT: 3333,
  MAX_TEXTURE_SIZE: 3379,
  MAX_VIEWPORT_DIMS: 3386,
  SUBPIXEL_BITS: 3408,
  RED_BITS: 3410,
  GREEN_BITS: 3411,
  BLUE_BITS: 3412,
  ALPHA_BITS: 3413,
  DEPTH_BITS: 3414,
  STENCIL_BITS: 3415,
  POLYGON_OFFSET_UNITS: 10752,
  POLYGON_OFFSET_FACTOR: 32824,
  TEXTURE_BINDING_2D: 32873,
  SAMPLE_BUFFERS: 32936,
  SAMPLES: 32937,
  SAMPLE_COVERAGE_VALUE: 32938,
  SAMPLE_COVERAGE_INVERT: 32939,
  COMPRESSED_TEXTURE_FORMATS: 34467,
  DONT_CARE: 4352,
  FASTEST: 4353,
  NICEST: 4354,
  GENERATE_MIPMAP_HINT: 33170,
  BYTE: 5120,
  UNSIGNED_BYTE: 5121,
  SHORT: 5122,
  UNSIGNED_SHORT: 5123,
  INT: 5124,
  UNSIGNED_INT: 5125,
  FLOAT: 5126,
  DEPTH_COMPONENT: 6402,
  ALPHA: 6406,
  RGB: 6407,
  RGBA: 6408,
  LUMINANCE: 6409,
  LUMINANCE_ALPHA: 6410,
  UNSIGNED_SHORT_4_4_4_4: 32819,
  UNSIGNED_SHORT_5_5_5_1: 32820,
  UNSIGNED_SHORT_5_6_5: 33635,
  FRAGMENT_SHADER: 35632,
  VERTEX_SHADER: 35633,
  MAX_VERTEX_ATTRIBS: 34921,
  MAX_VERTEX_UNIFORM_VECTORS: 36347,
  MAX_VARYING_VECTORS: 36348,
  MAX_COMBINED_TEXTURE_IMAGE_UNITS: 35661,
  MAX_VERTEX_TEXTURE_IMAGE_UNITS: 35660,
  MAX_TEXTURE_IMAGE_UNITS: 34930,
  MAX_FRAGMENT_UNIFORM_VECTORS: 36349,
  SHADER_TYPE: 35663,
  DELETE_STATUS: 35712,
  LINK_STATUS: 35714,
  VALIDATE_STATUS: 35715,
  ATTACHED_SHADERS: 35717,
  ACTIVE_UNIFORMS: 35718,
  ACTIVE_ATTRIBUTES: 35721,
  SHADING_LANGUAGE_VERSION: 35724,
  CURRENT_PROGRAM: 35725,
  NEVER: 512,
  LESS: 513,
  EQUAL: 514,
  LEQUAL: 515,
  GREATER: 516,
  NOTEQUAL: 517,
  GEQUAL: 518,
  ALWAYS: 519,
  KEEP: 7680,
  REPLACE: 7681,
  INCR: 7682,
  DECR: 7683,
  INVERT: 5386,
  INCR_WRAP: 34055,
  DECR_WRAP: 34056,
  VENDOR: 7936,
  RENDERER: 7937,
  VERSION: 7938,
  NEAREST: 9728,
  LINEAR: 9729,
  NEAREST_MIPMAP_NEAREST: 9984,
  LINEAR_MIPMAP_NEAREST: 9985,
  NEAREST_MIPMAP_LINEAR: 9986,
  LINEAR_MIPMAP_LINEAR: 9987,
  TEXTURE_MAG_FILTER: 10240,
  TEXTURE_MIN_FILTER: 10241,
  TEXTURE_WRAP_S: 10242,
  TEXTURE_WRAP_T: 10243,
  TEXTURE_2D: 3553,
  TEXTURE: 5890,
  TEXTURE_CUBE_MAP: 34067,
  TEXTURE_BINDING_CUBE_MAP: 34068,
  TEXTURE_CUBE_MAP_POSITIVE_X: 34069,
  TEXTURE_CUBE_MAP_NEGATIVE_X: 34070,
  TEXTURE_CUBE_MAP_POSITIVE_Y: 34071,
  TEXTURE_CUBE_MAP_NEGATIVE_Y: 34072,
  TEXTURE_CUBE_MAP_POSITIVE_Z: 34073,
  TEXTURE_CUBE_MAP_NEGATIVE_Z: 34074,
  MAX_CUBE_MAP_TEXTURE_SIZE: 34076,
  TEXTURE0: 33984,
  TEXTURE1: 33985,
  TEXTURE2: 33986,
  TEXTURE3: 33987,
  TEXTURE4: 33988,
  TEXTURE5: 33989,
  TEXTURE6: 33990,
  TEXTURE7: 33991,
  TEXTURE8: 33992,
  TEXTURE9: 33993,
  TEXTURE10: 33994,
  TEXTURE11: 33995,
  TEXTURE12: 33996,
  TEXTURE13: 33997,
  TEXTURE14: 33998,
  TEXTURE15: 33999,
  TEXTURE16: 34e3,
  TEXTURE17: 34001,
  TEXTURE18: 34002,
  TEXTURE19: 34003,
  TEXTURE20: 34004,
  TEXTURE21: 34005,
  TEXTURE22: 34006,
  TEXTURE23: 34007,
  TEXTURE24: 34008,
  TEXTURE25: 34009,
  TEXTURE26: 34010,
  TEXTURE27: 34011,
  TEXTURE28: 34012,
  TEXTURE29: 34013,
  TEXTURE30: 34014,
  TEXTURE31: 34015,
  ACTIVE_TEXTURE: 34016,
  REPEAT: 10497,
  CLAMP_TO_EDGE: 33071,
  MIRRORED_REPEAT: 33648,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  INT_VEC2: 35667,
  INT_VEC3: 35668,
  INT_VEC4: 35669,
  BOOL: 35670,
  BOOL_VEC2: 35671,
  BOOL_VEC3: 35672,
  BOOL_VEC4: 35673,
  FLOAT_MAT2: 35674,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  SAMPLER_2D: 35678,
  SAMPLER_CUBE: 35680,
  VERTEX_ATTRIB_ARRAY_ENABLED: 34338,
  VERTEX_ATTRIB_ARRAY_SIZE: 34339,
  VERTEX_ATTRIB_ARRAY_STRIDE: 34340,
  VERTEX_ATTRIB_ARRAY_TYPE: 34341,
  VERTEX_ATTRIB_ARRAY_NORMALIZED: 34922,
  VERTEX_ATTRIB_ARRAY_POINTER: 34373,
  VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 34975,
  IMPLEMENTATION_COLOR_READ_TYPE: 35738,
  IMPLEMENTATION_COLOR_READ_FORMAT: 35739,
  COMPILE_STATUS: 35713,
  LOW_FLOAT: 36336,
  MEDIUM_FLOAT: 36337,
  HIGH_FLOAT: 36338,
  LOW_INT: 36339,
  MEDIUM_INT: 36340,
  HIGH_INT: 36341,
  FRAMEBUFFER: 36160,
  RENDERBUFFER: 36161,
  RGBA4: 32854,
  RGB5_A1: 32855,
  RGB565: 36194,
  DEPTH_COMPONENT16: 33189,
  STENCIL_INDEX: 6401,
  STENCIL_INDEX8: 36168,
  DEPTH_STENCIL: 34041,
  RENDERBUFFER_WIDTH: 36162,
  RENDERBUFFER_HEIGHT: 36163,
  RENDERBUFFER_INTERNAL_FORMAT: 36164,
  RENDERBUFFER_RED_SIZE: 36176,
  RENDERBUFFER_GREEN_SIZE: 36177,
  RENDERBUFFER_BLUE_SIZE: 36178,
  RENDERBUFFER_ALPHA_SIZE: 36179,
  RENDERBUFFER_DEPTH_SIZE: 36180,
  RENDERBUFFER_STENCIL_SIZE: 36181,
  FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 36048,
  FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 36049,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 36050,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 36051,
  COLOR_ATTACHMENT0: 36064,
  DEPTH_ATTACHMENT: 36096,
  STENCIL_ATTACHMENT: 36128,
  DEPTH_STENCIL_ATTACHMENT: 33306,
  NONE: 0,
  FRAMEBUFFER_COMPLETE: 36053,
  FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 36054,
  FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 36055,
  FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 36057,
  FRAMEBUFFER_UNSUPPORTED: 36061,
  FRAMEBUFFER_BINDING: 36006,
  RENDERBUFFER_BINDING: 36007,
  MAX_RENDERBUFFER_SIZE: 34024,
  INVALID_FRAMEBUFFER_OPERATION: 1286,
  UNPACK_FLIP_Y_WEBGL: 37440,
  UNPACK_PREMULTIPLY_ALPHA_WEBGL: 37441,
  CONTEXT_LOST_WEBGL: 37442,
  UNPACK_COLORSPACE_CONVERSION_WEBGL: 37443,
  BROWSER_DEFAULT_WEBGL: 37444,
  // WEBGL_compressed_texture_s3tc
  COMPRESSED_RGB_S3TC_DXT1_EXT: 33776,
  COMPRESSED_RGBA_S3TC_DXT1_EXT: 33777,
  COMPRESSED_RGBA_S3TC_DXT3_EXT: 33778,
  COMPRESSED_RGBA_S3TC_DXT5_EXT: 33779,
  // WEBGL_compressed_texture_pvrtc
  COMPRESSED_RGB_PVRTC_4BPPV1_IMG: 35840,
  COMPRESSED_RGB_PVRTC_2BPPV1_IMG: 35841,
  COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: 35842,
  COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: 35843,
  // WEBGL_compressed_texture_astc
  COMPRESSED_RGBA_ASTC_4x4_WEBGL: 37808,
  // WEBGL_compressed_texture_etc1
  COMPRESSED_RGB_ETC1_WEBGL: 36196,
  // EXT_texture_compression_bptc
  COMPRESSED_RGBA_BPTC_UNORM: 36492,
  // EXT_color_buffer_half_float
  HALF_FLOAT_OES: 36193,
  // Desktop OpenGL
  DOUBLE: 5130,
  // WebGL 2
  READ_BUFFER: 3074,
  UNPACK_ROW_LENGTH: 3314,
  UNPACK_SKIP_ROWS: 3315,
  UNPACK_SKIP_PIXELS: 3316,
  PACK_ROW_LENGTH: 3330,
  PACK_SKIP_ROWS: 3331,
  PACK_SKIP_PIXELS: 3332,
  COLOR: 6144,
  DEPTH: 6145,
  STENCIL: 6146,
  RED: 6403,
  RGB8: 32849,
  RGBA8: 32856,
  RGB10_A2: 32857,
  TEXTURE_BINDING_3D: 32874,
  UNPACK_SKIP_IMAGES: 32877,
  UNPACK_IMAGE_HEIGHT: 32878,
  TEXTURE_3D: 32879,
  TEXTURE_WRAP_R: 32882,
  MAX_3D_TEXTURE_SIZE: 32883,
  UNSIGNED_INT_2_10_10_10_REV: 33640,
  MAX_ELEMENTS_VERTICES: 33e3,
  MAX_ELEMENTS_INDICES: 33001,
  TEXTURE_MIN_LOD: 33082,
  TEXTURE_MAX_LOD: 33083,
  TEXTURE_BASE_LEVEL: 33084,
  TEXTURE_MAX_LEVEL: 33085,
  MIN: 32775,
  MAX: 32776,
  DEPTH_COMPONENT24: 33190,
  MAX_TEXTURE_LOD_BIAS: 34045,
  TEXTURE_COMPARE_MODE: 34892,
  TEXTURE_COMPARE_FUNC: 34893,
  CURRENT_QUERY: 34917,
  QUERY_RESULT: 34918,
  QUERY_RESULT_AVAILABLE: 34919,
  STREAM_READ: 35041,
  STREAM_COPY: 35042,
  STATIC_READ: 35045,
  STATIC_COPY: 35046,
  DYNAMIC_READ: 35049,
  DYNAMIC_COPY: 35050,
  MAX_DRAW_BUFFERS: 34852,
  DRAW_BUFFER0: 34853,
  DRAW_BUFFER1: 34854,
  DRAW_BUFFER2: 34855,
  DRAW_BUFFER3: 34856,
  DRAW_BUFFER4: 34857,
  DRAW_BUFFER5: 34858,
  DRAW_BUFFER6: 34859,
  DRAW_BUFFER7: 34860,
  DRAW_BUFFER8: 34861,
  DRAW_BUFFER9: 34862,
  DRAW_BUFFER10: 34863,
  DRAW_BUFFER11: 34864,
  DRAW_BUFFER12: 34865,
  DRAW_BUFFER13: 34866,
  DRAW_BUFFER14: 34867,
  DRAW_BUFFER15: 34868,
  MAX_FRAGMENT_UNIFORM_COMPONENTS: 35657,
  MAX_VERTEX_UNIFORM_COMPONENTS: 35658,
  SAMPLER_3D: 35679,
  SAMPLER_2D_SHADOW: 35682,
  FRAGMENT_SHADER_DERIVATIVE_HINT: 35723,
  PIXEL_PACK_BUFFER: 35051,
  PIXEL_UNPACK_BUFFER: 35052,
  PIXEL_PACK_BUFFER_BINDING: 35053,
  PIXEL_UNPACK_BUFFER_BINDING: 35055,
  FLOAT_MAT2x3: 35685,
  FLOAT_MAT2x4: 35686,
  FLOAT_MAT3x2: 35687,
  FLOAT_MAT3x4: 35688,
  FLOAT_MAT4x2: 35689,
  FLOAT_MAT4x3: 35690,
  SRGB: 35904,
  SRGB8: 35905,
  SRGB8_ALPHA8: 35907,
  COMPARE_REF_TO_TEXTURE: 34894,
  RGBA32F: 34836,
  RGB32F: 34837,
  RGBA16F: 34842,
  RGB16F: 34843,
  VERTEX_ATTRIB_ARRAY_INTEGER: 35069,
  MAX_ARRAY_TEXTURE_LAYERS: 35071,
  MIN_PROGRAM_TEXEL_OFFSET: 35076,
  MAX_PROGRAM_TEXEL_OFFSET: 35077,
  MAX_VARYING_COMPONENTS: 35659,
  TEXTURE_2D_ARRAY: 35866,
  TEXTURE_BINDING_2D_ARRAY: 35869,
  R11F_G11F_B10F: 35898,
  UNSIGNED_INT_10F_11F_11F_REV: 35899,
  RGB9_E5: 35901,
  UNSIGNED_INT_5_9_9_9_REV: 35902,
  TRANSFORM_FEEDBACK_BUFFER_MODE: 35967,
  MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: 35968,
  TRANSFORM_FEEDBACK_VARYINGS: 35971,
  TRANSFORM_FEEDBACK_BUFFER_START: 35972,
  TRANSFORM_FEEDBACK_BUFFER_SIZE: 35973,
  TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: 35976,
  RASTERIZER_DISCARD: 35977,
  MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: 35978,
  MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: 35979,
  INTERLEAVED_ATTRIBS: 35980,
  SEPARATE_ATTRIBS: 35981,
  TRANSFORM_FEEDBACK_BUFFER: 35982,
  TRANSFORM_FEEDBACK_BUFFER_BINDING: 35983,
  RGBA32UI: 36208,
  RGB32UI: 36209,
  RGBA16UI: 36214,
  RGB16UI: 36215,
  RGBA8UI: 36220,
  RGB8UI: 36221,
  RGBA32I: 36226,
  RGB32I: 36227,
  RGBA16I: 36232,
  RGB16I: 36233,
  RGBA8I: 36238,
  RGB8I: 36239,
  RED_INTEGER: 36244,
  RGB_INTEGER: 36248,
  RGBA_INTEGER: 36249,
  SAMPLER_2D_ARRAY: 36289,
  SAMPLER_2D_ARRAY_SHADOW: 36292,
  SAMPLER_CUBE_SHADOW: 36293,
  UNSIGNED_INT_VEC2: 36294,
  UNSIGNED_INT_VEC3: 36295,
  UNSIGNED_INT_VEC4: 36296,
  INT_SAMPLER_2D: 36298,
  INT_SAMPLER_3D: 36299,
  INT_SAMPLER_CUBE: 36300,
  INT_SAMPLER_2D_ARRAY: 36303,
  UNSIGNED_INT_SAMPLER_2D: 36306,
  UNSIGNED_INT_SAMPLER_3D: 36307,
  UNSIGNED_INT_SAMPLER_CUBE: 36308,
  UNSIGNED_INT_SAMPLER_2D_ARRAY: 36311,
  DEPTH_COMPONENT32F: 36012,
  DEPTH32F_STENCIL8: 36013,
  FLOAT_32_UNSIGNED_INT_24_8_REV: 36269,
  FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: 33296,
  FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: 33297,
  FRAMEBUFFER_ATTACHMENT_RED_SIZE: 33298,
  FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: 33299,
  FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: 33300,
  FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: 33301,
  FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: 33302,
  FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: 33303,
  FRAMEBUFFER_DEFAULT: 33304,
  UNSIGNED_INT_24_8: 34042,
  DEPTH24_STENCIL8: 35056,
  UNSIGNED_NORMALIZED: 35863,
  DRAW_FRAMEBUFFER_BINDING: 36006,
  // Same as FRAMEBUFFER_BINDING
  READ_FRAMEBUFFER: 36008,
  DRAW_FRAMEBUFFER: 36009,
  READ_FRAMEBUFFER_BINDING: 36010,
  RENDERBUFFER_SAMPLES: 36011,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: 36052,
  MAX_COLOR_ATTACHMENTS: 36063,
  COLOR_ATTACHMENT1: 36065,
  COLOR_ATTACHMENT2: 36066,
  COLOR_ATTACHMENT3: 36067,
  COLOR_ATTACHMENT4: 36068,
  COLOR_ATTACHMENT5: 36069,
  COLOR_ATTACHMENT6: 36070,
  COLOR_ATTACHMENT7: 36071,
  COLOR_ATTACHMENT8: 36072,
  COLOR_ATTACHMENT9: 36073,
  COLOR_ATTACHMENT10: 36074,
  COLOR_ATTACHMENT11: 36075,
  COLOR_ATTACHMENT12: 36076,
  COLOR_ATTACHMENT13: 36077,
  COLOR_ATTACHMENT14: 36078,
  COLOR_ATTACHMENT15: 36079,
  FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: 36182,
  MAX_SAMPLES: 36183,
  HALF_FLOAT: 5131,
  RG: 33319,
  RG_INTEGER: 33320,
  R8: 33321,
  RG8: 33323,
  R16F: 33325,
  R32F: 33326,
  RG16F: 33327,
  RG32F: 33328,
  R8I: 33329,
  R8UI: 33330,
  R16I: 33331,
  R16UI: 33332,
  R32I: 33333,
  R32UI: 33334,
  RG8I: 33335,
  RG8UI: 33336,
  RG16I: 33337,
  RG16UI: 33338,
  RG32I: 33339,
  RG32UI: 33340,
  VERTEX_ARRAY_BINDING: 34229,
  R8_SNORM: 36756,
  RG8_SNORM: 36757,
  RGB8_SNORM: 36758,
  RGBA8_SNORM: 36759,
  SIGNED_NORMALIZED: 36764,
  COPY_READ_BUFFER: 36662,
  COPY_WRITE_BUFFER: 36663,
  COPY_READ_BUFFER_BINDING: 36662,
  // Same as COPY_READ_BUFFER
  COPY_WRITE_BUFFER_BINDING: 36663,
  // Same as COPY_WRITE_BUFFER
  UNIFORM_BUFFER: 35345,
  UNIFORM_BUFFER_BINDING: 35368,
  UNIFORM_BUFFER_START: 35369,
  UNIFORM_BUFFER_SIZE: 35370,
  MAX_VERTEX_UNIFORM_BLOCKS: 35371,
  MAX_FRAGMENT_UNIFORM_BLOCKS: 35373,
  MAX_COMBINED_UNIFORM_BLOCKS: 35374,
  MAX_UNIFORM_BUFFER_BINDINGS: 35375,
  MAX_UNIFORM_BLOCK_SIZE: 35376,
  MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: 35377,
  MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: 35379,
  UNIFORM_BUFFER_OFFSET_ALIGNMENT: 35380,
  ACTIVE_UNIFORM_BLOCKS: 35382,
  UNIFORM_TYPE: 35383,
  UNIFORM_SIZE: 35384,
  UNIFORM_BLOCK_INDEX: 35386,
  UNIFORM_OFFSET: 35387,
  UNIFORM_ARRAY_STRIDE: 35388,
  UNIFORM_MATRIX_STRIDE: 35389,
  UNIFORM_IS_ROW_MAJOR: 35390,
  UNIFORM_BLOCK_BINDING: 35391,
  UNIFORM_BLOCK_DATA_SIZE: 35392,
  UNIFORM_BLOCK_ACTIVE_UNIFORMS: 35394,
  UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: 35395,
  UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: 35396,
  UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: 35398,
  INVALID_INDEX: 4294967295,
  MAX_VERTEX_OUTPUT_COMPONENTS: 37154,
  MAX_FRAGMENT_INPUT_COMPONENTS: 37157,
  MAX_SERVER_WAIT_TIMEOUT: 37137,
  OBJECT_TYPE: 37138,
  SYNC_CONDITION: 37139,
  SYNC_STATUS: 37140,
  SYNC_FLAGS: 37141,
  SYNC_FENCE: 37142,
  SYNC_GPU_COMMANDS_COMPLETE: 37143,
  UNSIGNALED: 37144,
  SIGNALED: 37145,
  ALREADY_SIGNALED: 37146,
  TIMEOUT_EXPIRED: 37147,
  CONDITION_SATISFIED: 37148,
  WAIT_FAILED: 37149,
  SYNC_FLUSH_COMMANDS_BIT: 1,
  VERTEX_ATTRIB_ARRAY_DIVISOR: 35070,
  ANY_SAMPLES_PASSED: 35887,
  ANY_SAMPLES_PASSED_CONSERVATIVE: 36202,
  SAMPLER_BINDING: 35097,
  RGB10_A2UI: 36975,
  INT_2_10_10_10_REV: 36255,
  TRANSFORM_FEEDBACK: 36386,
  TRANSFORM_FEEDBACK_PAUSED: 36387,
  TRANSFORM_FEEDBACK_ACTIVE: 36388,
  TRANSFORM_FEEDBACK_BINDING: 36389,
  COMPRESSED_R11_EAC: 37488,
  COMPRESSED_SIGNED_R11_EAC: 37489,
  COMPRESSED_RG11_EAC: 37490,
  COMPRESSED_SIGNED_RG11_EAC: 37491,
  COMPRESSED_RGB8_ETC2: 37492,
  COMPRESSED_SRGB8_ETC2: 37493,
  COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: 37494,
  COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: 37495,
  COMPRESSED_RGBA8_ETC2_EAC: 37496,
  COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: 37497,
  TEXTURE_IMMUTABLE_FORMAT: 37167,
  MAX_ELEMENT_INDEX: 36203,
  TEXTURE_IMMUTABLE_LEVELS: 33503,
  // Extensions
  MAX_TEXTURE_MAX_ANISOTROPY_EXT: 34047
};
Object.freeze(WebGLConstants);
var WebGLConstants_default = WebGLConstants;

// packages/core/Source/ComponentDatatype.js
var ComponentDatatype = {
  /**
   * 8-bit signed byte corresponding to <code>gl.BYTE</code> and the type
   * of an element in <code>Int8Array</code>.
   *
   * @type {number}
   * @constant
   */
  BYTE: WebGLConstants_default.BYTE,
  /**
   * 8-bit unsigned byte corresponding to <code>UNSIGNED_BYTE</code> and the type
   * of an element in <code>Uint8Array</code>.
   *
   * @type {number}
   * @constant
   */
  UNSIGNED_BYTE: WebGLConstants_default.UNSIGNED_BYTE,
  /**
   * 16-bit signed short corresponding to <code>SHORT</code> and the type
   * of an element in <code>Int16Array</code>.
   *
   * @type {number}
   * @constant
   */
  SHORT: WebGLConstants_default.SHORT,
  /**
   * 16-bit unsigned short corresponding to <code>UNSIGNED_SHORT</code> and the type
   * of an element in <code>Uint16Array</code>.
   *
   * @type {number}
   * @constant
   */
  UNSIGNED_SHORT: WebGLConstants_default.UNSIGNED_SHORT,
  /**
   * 32-bit signed int corresponding to <code>INT</code> and the type
   * of an element in <code>Int32Array</code>.
   *
   * @memberOf ComponentDatatype
   *
   * @type {number}
   * @constant
   */
  INT: WebGLConstants_default.INT,
  /**
   * 32-bit unsigned int corresponding to <code>UNSIGNED_INT</code> and the type
   * of an element in <code>Uint32Array</code>.
   *
   * @memberOf ComponentDatatype
   *
   * @type {number}
   * @constant
   */
  UNSIGNED_INT: WebGLConstants_default.UNSIGNED_INT,
  /**
   * 32-bit floating-point corresponding to <code>FLOAT</code> and the type
   * of an element in <code>Float32Array</code>.
   *
   * @type {number}
   * @constant
   */
  FLOAT: WebGLConstants_default.FLOAT,
  /**
   * 64-bit floating-point corresponding to <code>gl.DOUBLE</code> (in Desktop OpenGL;
   * this is not supported in WebGL, and is emulated in Cesium via {@link GeometryPipeline.encodeAttribute})
   * and the type of an element in <code>Float64Array</code>.
   *
   * @memberOf ComponentDatatype
   *
   * @type {number}
   * @constant
   * @default 0x140A
   */
  DOUBLE: WebGLConstants_default.DOUBLE
};
ComponentDatatype.getSizeInBytes = function(componentDatatype) {
  if (!defined_default(componentDatatype)) {
    throw new DeveloperError_default("value is required.");
  }
  switch (componentDatatype) {
    case ComponentDatatype.BYTE:
      return Int8Array.BYTES_PER_ELEMENT;
    case ComponentDatatype.UNSIGNED_BYTE:
      return Uint8Array.BYTES_PER_ELEMENT;
    case ComponentDatatype.SHORT:
      return Int16Array.BYTES_PER_ELEMENT;
    case ComponentDatatype.UNSIGNED_SHORT:
      return Uint16Array.BYTES_PER_ELEMENT;
    case ComponentDatatype.INT:
      return Int32Array.BYTES_PER_ELEMENT;
    case ComponentDatatype.UNSIGNED_INT:
      return Uint32Array.BYTES_PER_ELEMENT;
    case ComponentDatatype.FLOAT:
      return Float32Array.BYTES_PER_ELEMENT;
    case ComponentDatatype.DOUBLE:
      return Float64Array.BYTES_PER_ELEMENT;
    //>>includeStart('debug', pragmas.debug);
    default:
      throw new DeveloperError_default("componentDatatype is not a valid value.");
  }
};
ComponentDatatype.fromTypedArray = function(array) {
  if (array instanceof Int8Array) {
    return ComponentDatatype.BYTE;
  }
  if (array instanceof Uint8Array) {
    return ComponentDatatype.UNSIGNED_BYTE;
  }
  if (array instanceof Int16Array) {
    return ComponentDatatype.SHORT;
  }
  if (array instanceof Uint16Array) {
    return ComponentDatatype.UNSIGNED_SHORT;
  }
  if (array instanceof Int32Array) {
    return ComponentDatatype.INT;
  }
  if (array instanceof Uint32Array) {
    return ComponentDatatype.UNSIGNED_INT;
  }
  if (array instanceof Float32Array) {
    return ComponentDatatype.FLOAT;
  }
  if (array instanceof Float64Array) {
    return ComponentDatatype.DOUBLE;
  }
  throw new DeveloperError_default(
    "array must be an Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, or Float64Array."
  );
};
ComponentDatatype.validate = function(componentDatatype) {
  return defined_default(componentDatatype) && (componentDatatype === ComponentDatatype.BYTE || componentDatatype === ComponentDatatype.UNSIGNED_BYTE || componentDatatype === ComponentDatatype.SHORT || componentDatatype === ComponentDatatype.UNSIGNED_SHORT || componentDatatype === ComponentDatatype.INT || componentDatatype === ComponentDatatype.UNSIGNED_INT || componentDatatype === ComponentDatatype.FLOAT || componentDatatype === ComponentDatatype.DOUBLE);
};
ComponentDatatype.createTypedArray = function(componentDatatype, valuesOrLength) {
  if (!defined_default(componentDatatype)) {
    throw new DeveloperError_default("componentDatatype is required.");
  }
  if (!defined_default(valuesOrLength)) {
    throw new DeveloperError_default("valuesOrLength is required.");
  }
  switch (componentDatatype) {
    case ComponentDatatype.BYTE:
      return new Int8Array(valuesOrLength);
    case ComponentDatatype.UNSIGNED_BYTE:
      return new Uint8Array(valuesOrLength);
    case ComponentDatatype.SHORT:
      return new Int16Array(valuesOrLength);
    case ComponentDatatype.UNSIGNED_SHORT:
      return new Uint16Array(valuesOrLength);
    case ComponentDatatype.INT:
      return new Int32Array(valuesOrLength);
    case ComponentDatatype.UNSIGNED_INT:
      return new Uint32Array(valuesOrLength);
    case ComponentDatatype.FLOAT:
      return new Float32Array(valuesOrLength);
    case ComponentDatatype.DOUBLE:
      return new Float64Array(valuesOrLength);
    //>>includeStart('debug', pragmas.debug);
    default:
      throw new DeveloperError_default("componentDatatype is not a valid value.");
  }
};
ComponentDatatype.createArrayBufferView = function(componentDatatype, buffer2, byteOffset, length) {
  if (!defined_default(componentDatatype)) {
    throw new DeveloperError_default("componentDatatype is required.");
  }
  if (!defined_default(buffer2)) {
    throw new DeveloperError_default("buffer is required.");
  }
  byteOffset = byteOffset ?? 0;
  length = length ?? (buffer2.byteLength - byteOffset) / ComponentDatatype.getSizeInBytes(componentDatatype);
  switch (componentDatatype) {
    case ComponentDatatype.BYTE:
      return new Int8Array(buffer2, byteOffset, length);
    case ComponentDatatype.UNSIGNED_BYTE:
      return new Uint8Array(buffer2, byteOffset, length);
    case ComponentDatatype.SHORT:
      return new Int16Array(buffer2, byteOffset, length);
    case ComponentDatatype.UNSIGNED_SHORT:
      return new Uint16Array(buffer2, byteOffset, length);
    case ComponentDatatype.INT:
      return new Int32Array(buffer2, byteOffset, length);
    case ComponentDatatype.UNSIGNED_INT:
      return new Uint32Array(buffer2, byteOffset, length);
    case ComponentDatatype.FLOAT:
      return new Float32Array(buffer2, byteOffset, length);
    case ComponentDatatype.DOUBLE:
      return new Float64Array(buffer2, byteOffset, length);
    //>>includeStart('debug', pragmas.debug);
    default:
      throw new DeveloperError_default("componentDatatype is not a valid value.");
  }
};
ComponentDatatype.fromName = function(name) {
  switch (name) {
    case "BYTE":
      return ComponentDatatype.BYTE;
    case "UNSIGNED_BYTE":
      return ComponentDatatype.UNSIGNED_BYTE;
    case "SHORT":
      return ComponentDatatype.SHORT;
    case "UNSIGNED_SHORT":
      return ComponentDatatype.UNSIGNED_SHORT;
    case "INT":
      return ComponentDatatype.INT;
    case "UNSIGNED_INT":
      return ComponentDatatype.UNSIGNED_INT;
    case "FLOAT":
      return ComponentDatatype.FLOAT;
    case "DOUBLE":
      return ComponentDatatype.DOUBLE;
    //>>includeStart('debug', pragmas.debug);
    default:
      throw new DeveloperError_default("name is not a valid value.");
  }
};
ComponentDatatype.dequantize = function(value, componentDatatype) {
  switch (componentDatatype) {
    case ComponentDatatype.BYTE:
      return Math.max(value / 127, -1);
    case ComponentDatatype.UNSIGNED_BYTE:
      return value / 255;
    case ComponentDatatype.SHORT:
      return Math.max(value / 32767, -1);
    case ComponentDatatype.UNSIGNED_SHORT:
      return value / 65535;
    case ComponentDatatype.INT:
      return Math.max(value / 2147483647, -1);
    case ComponentDatatype.UNSIGNED_INT:
      return value / 4294967295;
    //>>includeStart('debug', pragmas.debug);
    default:
      throw new DeveloperError_default(
        "componentDatatype is not a valid integer type for dequantization."
      );
  }
};
Object.freeze(ComponentDatatype);
var ComponentDatatype_default = ComponentDatatype;

// packages/core/Source/Cartesian4.js
var Cartesian4 = class _Cartesian4 {
  /**
   * @param {number} [x=0.0] The X component.
   * @param {number} [y=0.0] The Y component.
   * @param {number} [z=0.0] The Z component.
   * @param {number} [w=0.0] The W component.
   */
  constructor(x, y, z, w) {
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.z = z ?? 0;
    this.w = w ?? 0;
  }
  /**
   * Creates a Cartesian4 instance from x, y, z and w coordinates.
   *
   * @param {number} x The x coordinate.
   * @param {number} y The y coordinate.
   * @param {number} z The z coordinate.
   * @param {number} w The w coordinate.
   * @param {Cartesian4} [result] The object onto which to store the result.
   * @returns {Cartesian4} The modified result parameter or a new Cartesian4 instance if one was not provided.
   */
  static fromElements(x, y, z, w, result) {
    if (!defined_default(result)) {
      return new _Cartesian4(x, y, z, w);
    }
    result.x = x;
    result.y = y;
    result.z = z;
    result.w = w;
    return result;
  }
  /**
   * Creates a Cartesian4 instance from a {@link Color}. <code>red</code>, <code>green</code>, <code>blue</code>,
   * and <code>alpha</code> map to <code>x</code>, <code>y</code>, <code>z</code>, and <code>w</code>, respectively.
   *
   * @param {Color} color The source color.
   * @param {Cartesian4} [result] The object onto which to store the result.
   * @returns {Cartesian4} The modified result parameter or a new Cartesian4 instance if one was not provided.
   */
  static fromColor(color, result) {
    Check_default.typeOf.object("color", color);
    if (!defined_default(result)) {
      return new _Cartesian4(color.red, color.green, color.blue, color.alpha);
    }
    result.x = color.red;
    result.y = color.green;
    result.z = color.blue;
    result.w = color.alpha;
    return result;
  }
  /**
   * Duplicates a Cartesian4 instance.
   *
   * @param {Cartesian4} cartesian The Cartesian to duplicate.
   * @param {Cartesian4} [result] The object onto which to store the result.
   * @returns {Cartesian4} The modified result parameter or a new Cartesian4 instance if one was not provided. (Returns undefined if cartesian is undefined)
   */
  static clone(cartesian, result) {
    if (!defined_default(cartesian)) {
      return void 0;
    }
    if (!defined_default(result)) {
      return new _Cartesian4(cartesian.x, cartesian.y, cartesian.z, cartesian.w);
    }
    result.x = cartesian.x;
    result.y = cartesian.y;
    result.z = cartesian.z;
    result.w = cartesian.w;
    return result;
  }
  /**
   * Stores the provided instance into the provided array.
   *
   * @param {Cartesian4} value The value to pack.
   * @param {number[]} array The array to pack into.
   * @param {number} [startingIndex=0] The index into the array at which to start packing the elements.
   *
   * @returns {number[]} The array that was packed into
   */
  static pack(value, array, startingIndex) {
    Check_default.typeOf.object("value", value);
    Check_default.defined("array", array);
    startingIndex = startingIndex ?? 0;
    array[startingIndex++] = value.x;
    array[startingIndex++] = value.y;
    array[startingIndex++] = value.z;
    array[startingIndex] = value.w;
    return array;
  }
  /**
   * Retrieves an instance from a packed array.
   *
   * @param {number[]} array The packed array.
   * @param {number} [startingIndex=0] The starting index of the element to be unpacked.
   * @param {Cartesian4} [result] The object into which to store the result.
   * @returns {Cartesian4}  The modified result parameter or a new Cartesian4 instance if one was not provided.
   */
  static unpack(array, startingIndex, result) {
    Check_default.defined("array", array);
    startingIndex = startingIndex ?? 0;
    if (!defined_default(result)) {
      result = new _Cartesian4();
    }
    result.x = array[startingIndex++];
    result.y = array[startingIndex++];
    result.z = array[startingIndex++];
    result.w = array[startingIndex];
    return result;
  }
  /**
   * Flattens an array of Cartesian4s into an array of components.
   *
   * @param {Cartesian4[]} array The array of cartesians to pack.
   * @param {number[]} [result] The array onto which to store the result. If this is a typed array, it must have array.length * 4 components, else a {@link DeveloperError} will be thrown. If it is a regular array, it will be resized to have (array.length * 4) elements.
   * @returns {number[]} The packed array.
   */
  static packArray(array, result) {
    Check_default.defined("array", array);
    const length = array.length;
    const resultLength = length * 4;
    if (!defined_default(result)) {
      result = new Array(resultLength);
    } else if (!Array.isArray(result) && result.length !== resultLength) {
      throw new DeveloperError_default(
        "If result is a typed array, it must have exactly array.length * 4 elements"
      );
    } else if (result.length !== resultLength) {
      result.length = resultLength;
    }
    for (let i = 0; i < length; ++i) {
      _Cartesian4.pack(array[i], result, i * 4);
    }
    return result;
  }
  /**
   * Unpacks an array of cartesian components into an array of Cartesian4s.
   *
   * @param {number[]} array The array of components to unpack.
   * @param {Cartesian4[]} [result] The array onto which to store the result.
   * @returns {Cartesian4[]} The unpacked array.
   */
  static unpackArray(array, result) {
    Check_default.defined("array", array);
    Check_default.typeOf.number.greaterThanOrEquals("array.length", array.length, 4);
    if (array.length % 4 !== 0) {
      throw new DeveloperError_default("array length must be a multiple of 4.");
    }
    const length = array.length;
    if (!defined_default(result)) {
      result = new Array(length / 4);
    } else {
      result.length = length / 4;
    }
    for (let i = 0; i < length; i += 4) {
      const index = i / 4;
      result[index] = _Cartesian4.unpack(array, i, result[index]);
    }
    return result;
  }
  /**
   * Computes the value of the maximum component for the supplied Cartesian.
   *
   * @param {Cartesian4} cartesian The cartesian to use.
   * @returns {number} The value of the maximum component.
   */
  static maximumComponent(cartesian) {
    Check_default.typeOf.object("cartesian", cartesian);
    return Math.max(cartesian.x, cartesian.y, cartesian.z, cartesian.w);
  }
  /**
   * Computes the value of the minimum component for the supplied Cartesian.
   *
   * @param {Cartesian4} cartesian The cartesian to use.
   * @returns {number} The value of the minimum component.
   */
  static minimumComponent(cartesian) {
    Check_default.typeOf.object("cartesian", cartesian);
    return Math.min(cartesian.x, cartesian.y, cartesian.z, cartesian.w);
  }
  /**
   * Compares two Cartesians and computes a Cartesian which contains the minimum components of the supplied Cartesians.
   *
   * @param {Cartesian4} first A cartesian to compare.
   * @param {Cartesian4} second A cartesian to compare.
   * @param {Cartesian4} result The object into which to store the result.
   * @returns {Cartesian4} A cartesian with the minimum components.
   */
  static minimumByComponent(first, second, result) {
    Check_default.typeOf.object("first", first);
    Check_default.typeOf.object("second", second);
    Check_default.typeOf.object("result", result);
    result.x = Math.min(first.x, second.x);
    result.y = Math.min(first.y, second.y);
    result.z = Math.min(first.z, second.z);
    result.w = Math.min(first.w, second.w);
    return result;
  }
  /**
   * Compares two Cartesians and computes a Cartesian which contains the maximum components of the supplied Cartesians.
   *
   * @param {Cartesian4} first A cartesian to compare.
   * @param {Cartesian4} second A cartesian to compare.
   * @param {Cartesian4} result The object into which to store the result.
   * @returns {Cartesian4} A cartesian with the maximum components.
   */
  static maximumByComponent(first, second, result) {
    Check_default.typeOf.object("first", first);
    Check_default.typeOf.object("second", second);
    Check_default.typeOf.object("result", result);
    result.x = Math.max(first.x, second.x);
    result.y = Math.max(first.y, second.y);
    result.z = Math.max(first.z, second.z);
    result.w = Math.max(first.w, second.w);
    return result;
  }
  /**
   * Constrain a value to lie between two values.
   *
   * @param {Cartesian4} value The value to clamp.
   * @param {Cartesian4} min The minimum bound.
   * @param {Cartesian4} max The maximum bound.
   * @param {Cartesian4} result The object into which to store the result.
   * @returns {Cartesian4} The clamped value such that min <= result <= max.
   */
  static clamp(value, min, max, result) {
    Check_default.typeOf.object("value", value);
    Check_default.typeOf.object("min", min);
    Check_default.typeOf.object("max", max);
    Check_default.typeOf.object("result", result);
    const x = Math_default.clamp(value.x, min.x, max.x);
    const y = Math_default.clamp(value.y, min.y, max.y);
    const z = Math_default.clamp(value.z, min.z, max.z);
    const w = Math_default.clamp(value.w, min.w, max.w);
    result.x = x;
    result.y = y;
    result.z = z;
    result.w = w;
    return result;
  }
  /**
   * Computes the provided Cartesian's squared magnitude.
   *
   * @param {Cartesian4} cartesian The Cartesian instance whose squared magnitude is to be computed.
   * @returns {number} The squared magnitude.
   */
  static magnitudeSquared(cartesian) {
    Check_default.typeOf.object("cartesian", cartesian);
    return cartesian.x * cartesian.x + cartesian.y * cartesian.y + cartesian.z * cartesian.z + cartesian.w * cartesian.w;
  }
  /**
   * Computes the Cartesian's magnitude (length).
   *
   * @param {Cartesian4} cartesian The Cartesian instance whose magnitude is to be computed.
   * @returns {number} The magnitude.
   */
  static magnitude(cartesian) {
    return Math.sqrt(_Cartesian4.magnitudeSquared(cartesian));
  }
  /**
   * Computes the 4-space distance between two points.
   *
   * @param {Cartesian4} left The first point to compute the distance from.
   * @param {Cartesian4} right The second point to compute the distance to.
   * @returns {number} The distance between two points.
   *
   * @example
   * // Returns 1.0
   * const d = Cesium.Cartesian4.distance(
   *   new Cesium.Cartesian4(1.0, 0.0, 0.0, 0.0),
   *   new Cesium.Cartesian4(2.0, 0.0, 0.0, 0.0));
   */
  static distance(left, right) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    _Cartesian4.subtract(left, right, distanceScratch2);
    return _Cartesian4.magnitude(distanceScratch2);
  }
  /**
   * Computes the squared distance between two points.  Comparing squared distances
   * using this function is more efficient than comparing distances using {@link Cartesian4#distance}.
   *
   * @param {Cartesian4} left The first point to compute the distance from.
   * @param {Cartesian4} right The second point to compute the distance to.
   * @returns {number} The distance between two points.
   *
   * @example
   * // Returns 4.0, not 2.0
   * const d = Cesium.Cartesian4.distance(
   *   new Cesium.Cartesian4(1.0, 0.0, 0.0, 0.0),
   *   new Cesium.Cartesian4(3.0, 0.0, 0.0, 0.0));
   */
  static distanceSquared(left, right) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    _Cartesian4.subtract(left, right, distanceScratch2);
    return _Cartesian4.magnitudeSquared(distanceScratch2);
  }
  /**
   * Computes the normalized form of the supplied Cartesian.
   *
   * @param {Cartesian4} cartesian The Cartesian to be normalized.
   * @param {Cartesian4} result The object onto which to store the result.
   * @returns {Cartesian4} The modified result parameter.
   */
  static normalize(cartesian, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    const magnitude = _Cartesian4.magnitude(cartesian);
    result.x = cartesian.x / magnitude;
    result.y = cartesian.y / magnitude;
    result.z = cartesian.z / magnitude;
    result.w = cartesian.w / magnitude;
    if (isNaN(result.x) || isNaN(result.y) || isNaN(result.z) || isNaN(result.w)) {
      throw new DeveloperError_default("normalized result is not a number");
    }
    return result;
  }
  /**
   * Computes the dot (scalar) product of two Cartesians.
   *
   * @param {Cartesian4} left The first Cartesian.
   * @param {Cartesian4} right The second Cartesian.
   * @returns {number} The dot product.
   */
  static dot(left, right) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    return left.x * right.x + left.y * right.y + left.z * right.z + left.w * right.w;
  }
  /**
   * Computes the componentwise product of two Cartesians.
   *
   * @param {Cartesian4} left The first Cartesian.
   * @param {Cartesian4} right The second Cartesian.
   * @param {Cartesian4} result The object onto which to store the result.
   * @returns {Cartesian4} The modified result parameter.
   */
  static multiplyComponents(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result.x = left.x * right.x;
    result.y = left.y * right.y;
    result.z = left.z * right.z;
    result.w = left.w * right.w;
    return result;
  }
  /**
   * Computes the componentwise quotient of two Cartesians.
   *
   * @param {Cartesian4} left The first Cartesian.
   * @param {Cartesian4} right The second Cartesian.
   * @param {Cartesian4} result The object onto which to store the result.
   * @returns {Cartesian4} The modified result parameter.
   */
  static divideComponents(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result.x = left.x / right.x;
    result.y = left.y / right.y;
    result.z = left.z / right.z;
    result.w = left.w / right.w;
    return result;
  }
  /**
   * Computes the componentwise sum of two Cartesians.
   *
   * @param {Cartesian4} left The first Cartesian.
   * @param {Cartesian4} right The second Cartesian.
   * @param {Cartesian4} result The object onto which to store the result.
   * @returns {Cartesian4} The modified result parameter.
   */
  static add(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result.x = left.x + right.x;
    result.y = left.y + right.y;
    result.z = left.z + right.z;
    result.w = left.w + right.w;
    return result;
  }
  /**
   * Computes the componentwise difference of two Cartesians.
   *
   * @param {Cartesian4} left The first Cartesian.
   * @param {Cartesian4} right The second Cartesian.
   * @param {Cartesian4} result The object onto which to store the result.
   * @returns {Cartesian4} The modified result parameter.
   */
  static subtract(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result.x = left.x - right.x;
    result.y = left.y - right.y;
    result.z = left.z - right.z;
    result.w = left.w - right.w;
    return result;
  }
  /**
   * Multiplies the provided Cartesian componentwise by the provided scalar.
   *
   * @param {Cartesian4} cartesian The Cartesian to be scaled.
   * @param {number} scalar The scalar to multiply with.
   * @param {Cartesian4} result The object onto which to store the result.
   * @returns {Cartesian4} The modified result parameter.
   */
  static multiplyByScalar(cartesian, scalar, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.number("scalar", scalar);
    Check_default.typeOf.object("result", result);
    result.x = cartesian.x * scalar;
    result.y = cartesian.y * scalar;
    result.z = cartesian.z * scalar;
    result.w = cartesian.w * scalar;
    return result;
  }
  /**
   * Divides the provided Cartesian componentwise by the provided scalar.
   *
   * @param {Cartesian4} cartesian The Cartesian to be divided.
   * @param {number} scalar The scalar to divide by.
   * @param {Cartesian4} result The object onto which to store the result.
   * @returns {Cartesian4} The modified result parameter.
   */
  static divideByScalar(cartesian, scalar, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.number("scalar", scalar);
    Check_default.typeOf.object("result", result);
    result.x = cartesian.x / scalar;
    result.y = cartesian.y / scalar;
    result.z = cartesian.z / scalar;
    result.w = cartesian.w / scalar;
    return result;
  }
  /**
   * Negates the provided Cartesian.
   *
   * @param {Cartesian4} cartesian The Cartesian to be negated.
   * @param {Cartesian4} result The object onto which to store the result.
   * @returns {Cartesian4} The modified result parameter.
   */
  static negate(cartesian, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    result.x = -cartesian.x;
    result.y = -cartesian.y;
    result.z = -cartesian.z;
    result.w = -cartesian.w;
    return result;
  }
  /**
   * Computes the absolute value of the provided Cartesian.
   *
   * @param {Cartesian4} cartesian The Cartesian whose absolute value is to be computed.
   * @param {Cartesian4} result The object onto which to store the result.
   * @returns {Cartesian4} The modified result parameter.
   */
  static abs(cartesian, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    result.x = Math.abs(cartesian.x);
    result.y = Math.abs(cartesian.y);
    result.z = Math.abs(cartesian.z);
    result.w = Math.abs(cartesian.w);
    return result;
  }
  /**
   * Computes the linear interpolation or extrapolation at t using the provided cartesians.
   *
   * @param {Cartesian4} start The value corresponding to t at 0.0.
   * @param {Cartesian4}end The value corresponding to t at 1.0.
   * @param {number} t The point along t at which to interpolate.
   * @param {Cartesian4} result The object onto which to store the result.
   * @returns {Cartesian4} The modified result parameter.
   */
  static lerp(start, end, t, result) {
    Check_default.typeOf.object("start", start);
    Check_default.typeOf.object("end", end);
    Check_default.typeOf.number("t", t);
    Check_default.typeOf.object("result", result);
    _Cartesian4.multiplyByScalar(end, t, lerpScratch2);
    result = _Cartesian4.multiplyByScalar(start, 1 - t, result);
    return _Cartesian4.add(lerpScratch2, result, result);
  }
  /**
   * Returns the axis that is most orthogonal to the provided Cartesian.
   *
   * @param {Cartesian4} cartesian The Cartesian on which to find the most orthogonal axis.
   * @param {Cartesian4} result The object onto which to store the result.
   * @returns {Cartesian4} The most orthogonal axis.
   */
  static mostOrthogonalAxis(cartesian, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    const f = _Cartesian4.normalize(cartesian, mostOrthogonalAxisScratch2);
    _Cartesian4.abs(f, f);
    if (f.x <= f.y) {
      if (f.x <= f.z) {
        if (f.x <= f.w) {
          result = _Cartesian4.clone(_Cartesian4.UNIT_X, result);
        } else {
          result = _Cartesian4.clone(_Cartesian4.UNIT_W, result);
        }
      } else if (f.z <= f.w) {
        result = _Cartesian4.clone(_Cartesian4.UNIT_Z, result);
      } else {
        result = _Cartesian4.clone(_Cartesian4.UNIT_W, result);
      }
    } else if (f.y <= f.z) {
      if (f.y <= f.w) {
        result = _Cartesian4.clone(_Cartesian4.UNIT_Y, result);
      } else {
        result = _Cartesian4.clone(_Cartesian4.UNIT_W, result);
      }
    } else if (f.z <= f.w) {
      result = _Cartesian4.clone(_Cartesian4.UNIT_Z, result);
    } else {
      result = _Cartesian4.clone(_Cartesian4.UNIT_W, result);
    }
    return result;
  }
  /**
   * Compares the provided Cartesians componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Cartesian4} [left] The first Cartesian.
   * @param {Cartesian4} [right] The second Cartesian.
   * @returns {boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
   */
  static equals(left, right) {
    return left === right || defined_default(left) && defined_default(right) && left.x === right.x && left.y === right.y && left.z === right.z && left.w === right.w;
  }
  /**
   * Compares the provided Cartesian4 to the values packed into an array, starting at the provided offset.
   *
   * @param {Cartesian4} cartesian The Cartesian4 to compare.
   * @param {number[]} array The packed array.
   * @param {number} offset The offset into the array at which the Cartesian4 starts.
   * @returns {boolean} <code>true</code> if the Cartesian4 matches the packed array values at the offset; otherwise, <code>false</code>.
   * @internal
   */
  static equalsArray(cartesian, array, offset) {
    return cartesian.x === array[offset] && cartesian.y === array[offset + 1] && cartesian.z === array[offset + 2] && cartesian.w === array[offset + 3];
  }
  /**
   * Compares the provided Cartesians componentwise and returns
   * <code>true</code> if they pass an absolute or relative tolerance test,
   * <code>false</code> otherwise.
   *
   * @param {Cartesian4} [left] The first Cartesian.
   * @param {Cartesian4} [right] The second Cartesian.
   * @param {number} [relativeEpsilon=0] The relative epsilon tolerance to use for equality testing.
   * @param {number} [absoluteEpsilon=relativeEpsilon] The absolute epsilon tolerance to use for equality testing.
   * @returns {boolean} <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
   */
  static equalsEpsilon(left, right, relativeEpsilon, absoluteEpsilon) {
    return left === right || defined_default(left) && defined_default(right) && Math_default.equalsEpsilon(
      left.x,
      right.x,
      relativeEpsilon,
      absoluteEpsilon
    ) && Math_default.equalsEpsilon(
      left.y,
      right.y,
      relativeEpsilon,
      absoluteEpsilon
    ) && Math_default.equalsEpsilon(
      left.z,
      right.z,
      relativeEpsilon,
      absoluteEpsilon
    ) && Math_default.equalsEpsilon(
      left.w,
      right.w,
      relativeEpsilon,
      absoluteEpsilon
    );
  }
  /**
   * Duplicates this Cartesian4 instance.
   *
   * @param {Cartesian4} [result] The object onto which to store the result.
   * @returns {Cartesian4} The modified result parameter or a new Cartesian4 instance if one was not provided.
   */
  clone(result) {
    return _Cartesian4.clone(this, result);
  }
  /**
   * Compares this Cartesian against the provided Cartesian componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Cartesian4} [right] The right hand side Cartesian.
   * @returns {boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
   */
  equals(right) {
    return _Cartesian4.equals(this, right);
  }
  /**
   * Compares this Cartesian against the provided Cartesian componentwise and returns
   * <code>true</code> if they pass an absolute or relative tolerance test,
   * <code>false</code> otherwise.
   *
   * @param {Cartesian4} [right] The right hand side Cartesian.
   * @param {number} [relativeEpsilon=0] The relative epsilon tolerance to use for equality testing.
   * @param {number} [absoluteEpsilon=relativeEpsilon] The absolute epsilon tolerance to use for equality testing.
   * @returns {boolean} <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
   */
  equalsEpsilon(right, relativeEpsilon, absoluteEpsilon) {
    return _Cartesian4.equalsEpsilon(
      this,
      right,
      relativeEpsilon,
      absoluteEpsilon
    );
  }
  /**
   * Creates a string representing this Cartesian in the format '(x, y, z, w)'.
   *
   * @returns {string} A string representing the provided Cartesian in the format '(x, y, z, w)'.
   */
  toString() {
    return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
  }
  /**
   * Packs an arbitrary floating point value to 4 values representable using uint8.
   *
   * @param {number} value A floating point number.
   * @param {Cartesian4} [result] The Cartesian4 that will contain the packed float.
   * @returns {Cartesian4} A Cartesian4 representing the float packed to values in x, y, z, and w.
   */
  static packFloat(value, result) {
    Check_default.typeOf.number("value", value);
    if (!defined_default(result)) {
      result = new _Cartesian4();
    }
    scratchF32Array[0] = value;
    if (littleEndian) {
      result.x = scratchU8Array[0];
      result.y = scratchU8Array[1];
      result.z = scratchU8Array[2];
      result.w = scratchU8Array[3];
    } else {
      result.x = scratchU8Array[3];
      result.y = scratchU8Array[2];
      result.z = scratchU8Array[1];
      result.w = scratchU8Array[0];
    }
    return result;
  }
  /**
   * Unpacks a float packed using Cartesian4.packFloat.
   *
   * @param {Cartesian4} packedFloat A Cartesian4 containing a float packed to 4 values representable using uint8.
   * @returns {number} The unpacked float.
   * @private
   */
  static unpackFloat(packedFloat) {
    Check_default.typeOf.object("packedFloat", packedFloat);
    if (littleEndian) {
      scratchU8Array[0] = packedFloat.x;
      scratchU8Array[1] = packedFloat.y;
      scratchU8Array[2] = packedFloat.z;
      scratchU8Array[3] = packedFloat.w;
    } else {
      scratchU8Array[0] = packedFloat.w;
      scratchU8Array[1] = packedFloat.z;
      scratchU8Array[2] = packedFloat.y;
      scratchU8Array[3] = packedFloat.x;
    }
    return scratchF32Array[0];
  }
};
Cartesian4.packedLength = 4;
Cartesian4.fromArray = Cartesian4.unpack;
var distanceScratch2 = new Cartesian4();
var lerpScratch2 = new Cartesian4();
var mostOrthogonalAxisScratch2 = new Cartesian4();
Cartesian4.ZERO = Object.freeze(new Cartesian4(0, 0, 0, 0));
Cartesian4.ONE = Object.freeze(new Cartesian4(1, 1, 1, 1));
Cartesian4.UNIT_X = Object.freeze(new Cartesian4(1, 0, 0, 0));
Cartesian4.UNIT_Y = Object.freeze(new Cartesian4(0, 1, 0, 0));
Cartesian4.UNIT_Z = Object.freeze(new Cartesian4(0, 0, 1, 0));
Cartesian4.UNIT_W = Object.freeze(new Cartesian4(0, 0, 0, 1));
var scratchF32Array = new Float32Array(1);
var scratchU8Array = new Uint8Array(scratchF32Array.buffer);
var testU32 = new Uint32Array([287454020]);
var testU8 = new Uint8Array(testU32.buffer);
var littleEndian = testU8[0] === 68;
var Cartesian4_default = Cartesian4;

// packages/core/Source/Matrix3.js
var Matrix3 = class _Matrix3 {
  /**
   * @param {number} [column0Row0=0.0] The value for column 0, row 0.
   * @param {number} [column1Row0=0.0] The value for column 1, row 0.
   * @param {number} [column2Row0=0.0] The value for column 2, row 0.
   * @param {number} [column0Row1=0.0] The value for column 0, row 1.
   * @param {number} [column1Row1=0.0] The value for column 1, row 1.
   * @param {number} [column2Row1=0.0] The value for column 2, row 1.
   * @param {number} [column0Row2=0.0] The value for column 0, row 2.
   * @param {number} [column1Row2=0.0] The value for column 1, row 2.
   * @param {number} [column2Row2=0.0] The value for column 2, row 2.
   */
  constructor(column0Row0, column1Row0, column2Row0, column0Row1, column1Row1, column2Row1, column0Row2, column1Row2, column2Row2) {
    this[0] = column0Row0 ?? 0;
    this[1] = column0Row1 ?? 0;
    this[2] = column0Row2 ?? 0;
    this[3] = column1Row0 ?? 0;
    this[4] = column1Row1 ?? 0;
    this[5] = column1Row2 ?? 0;
    this[6] = column2Row0 ?? 0;
    this[7] = column2Row1 ?? 0;
    this[8] = column2Row2 ?? 0;
  }
  /**
   * Stores the provided instance into the provided array.
   *
   * @param {Matrix3} value The value to pack.
   * @param {number[]} array The array to pack into.
   * @param {number} [startingIndex=0] The index into the array at which to start packing the elements.
   *
   * @returns {number[]} The array that was packed into
   */
  static pack(value, array, startingIndex) {
    Check_default.typeOf.object("value", value);
    Check_default.defined("array", array);
    startingIndex = startingIndex ?? 0;
    array[startingIndex++] = value[0];
    array[startingIndex++] = value[1];
    array[startingIndex++] = value[2];
    array[startingIndex++] = value[3];
    array[startingIndex++] = value[4];
    array[startingIndex++] = value[5];
    array[startingIndex++] = value[6];
    array[startingIndex++] = value[7];
    array[startingIndex] = value[8];
    return array;
  }
  /**
   * Retrieves an instance from a packed array.
   *
   * @param {number[]} array The packed array.
   * @param {number} [startingIndex=0] The starting index of the element to be unpacked.
   * @param {Matrix3} [result] The object into which to store the result.
   * @returns {Matrix3} The modified result parameter or a new Matrix3 instance if one was not provided.
   */
  static unpack(array, startingIndex, result) {
    Check_default.defined("array", array);
    startingIndex = startingIndex ?? 0;
    if (!defined_default(result)) {
      result = new _Matrix3();
    }
    result[0] = array[startingIndex++];
    result[1] = array[startingIndex++];
    result[2] = array[startingIndex++];
    result[3] = array[startingIndex++];
    result[4] = array[startingIndex++];
    result[5] = array[startingIndex++];
    result[6] = array[startingIndex++];
    result[7] = array[startingIndex++];
    result[8] = array[startingIndex];
    return result;
  }
  /**
   * Flattens an array of Matrix3s into an array of components. The components
   * are stored in column-major order.
   *
   * @param {Matrix3[]} array The array of matrices to pack.
   * @param {number[]} [result] The array onto which to store the result. If this is a typed array, it must have array.length * 9 components, else a {@link DeveloperError} will be thrown. If it is a regular array, it will be resized to have (array.length * 9) elements.
   * @returns {number[]} The packed array.
   */
  static packArray(array, result) {
    Check_default.defined("array", array);
    const length = array.length;
    const resultLength = length * 9;
    if (!defined_default(result)) {
      result = new Array(resultLength);
    } else if (!Array.isArray(result) && result.length !== resultLength) {
      throw new DeveloperError_default(
        "If result is a typed array, it must have exactly array.length * 9 elements"
      );
    } else if (result.length !== resultLength) {
      result.length = resultLength;
    }
    for (let i = 0; i < length; ++i) {
      _Matrix3.pack(array[i], result, i * 9);
    }
    return result;
  }
  /**
   * Unpacks an array of column-major matrix components into an array of Matrix3s.
   *
   * @param {number[]} array The array of components to unpack.
   * @param {Matrix3[]} [result] The array onto which to store the result.
   * @returns {Matrix3[]} The unpacked array.
   */
  static unpackArray(array, result) {
    Check_default.defined("array", array);
    Check_default.typeOf.number.greaterThanOrEquals("array.length", array.length, 9);
    if (array.length % 9 !== 0) {
      throw new DeveloperError_default("array length must be a multiple of 9.");
    }
    const length = array.length;
    if (!defined_default(result)) {
      result = new Array(length / 9);
    } else {
      result.length = length / 9;
    }
    for (let i = 0; i < length; i += 9) {
      const index = i / 9;
      result[index] = _Matrix3.unpack(array, i, result[index]);
    }
    return result;
  }
  /**
   * Duplicates a Matrix3 instance.
   *
   * @param {Matrix3} matrix The matrix to duplicate.
   * @param {Matrix3} [result] The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter or a new Matrix3 instance if one was not provided. (Returns undefined if matrix is undefined)
   */
  static clone(matrix, result) {
    if (!defined_default(matrix)) {
      return void 0;
    }
    if (!defined_default(result)) {
      return new _Matrix3(
        matrix[0],
        matrix[3],
        matrix[6],
        matrix[1],
        matrix[4],
        matrix[7],
        matrix[2],
        matrix[5],
        matrix[8]
      );
    }
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[3];
    result[4] = matrix[4];
    result[5] = matrix[5];
    result[6] = matrix[6];
    result[7] = matrix[7];
    result[8] = matrix[8];
    return result;
  }
  /**
   * Creates a Matrix3 instance from a column-major order array.
   *
   * @param {number[]} values The column-major order array.
   * @param {Matrix3} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix3} The modified result parameter, or a new Matrix3 instance if one was not provided.
   */
  static fromColumnMajorArray(values, result) {
    Check_default.defined("values", values);
    return _Matrix3.clone(values, result);
  }
  /**
   * Creates a Matrix3 instance from a row-major order array.
   * The resulting matrix will be in column-major order.
   *
   * @param {number[]} values The row-major order array.
   * @param {Matrix3} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix3} The modified result parameter, or a new Matrix3 instance if one was not provided.
   */
  static fromRowMajorArray(values, result) {
    Check_default.defined("values", values);
    if (!defined_default(result)) {
      return new _Matrix3(
        values[0],
        values[1],
        values[2],
        values[3],
        values[4],
        values[5],
        values[6],
        values[7],
        values[8]
      );
    }
    result[0] = values[0];
    result[1] = values[3];
    result[2] = values[6];
    result[3] = values[1];
    result[4] = values[4];
    result[5] = values[7];
    result[6] = values[2];
    result[7] = values[5];
    result[8] = values[8];
    return result;
  }
  /**
   * Computes a 3x3 rotation matrix from the provided quaternion.
   *
   * @param {Quaternion} quaternion the quaternion to use.
   * @param {Matrix3} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix3} The 3x3 rotation matrix from this quaternion.
   */
  static fromQuaternion(quaternion, result) {
    Check_default.typeOf.object("quaternion", quaternion);
    const x2 = quaternion.x * quaternion.x;
    const xy = quaternion.x * quaternion.y;
    const xz = quaternion.x * quaternion.z;
    const xw = quaternion.x * quaternion.w;
    const y2 = quaternion.y * quaternion.y;
    const yz = quaternion.y * quaternion.z;
    const yw = quaternion.y * quaternion.w;
    const z2 = quaternion.z * quaternion.z;
    const zw = quaternion.z * quaternion.w;
    const w2 = quaternion.w * quaternion.w;
    const m00 = x2 - y2 - z2 + w2;
    const m01 = 2 * (xy - zw);
    const m02 = 2 * (xz + yw);
    const m10 = 2 * (xy + zw);
    const m11 = -x2 + y2 - z2 + w2;
    const m12 = 2 * (yz - xw);
    const m20 = 2 * (xz - yw);
    const m21 = 2 * (yz + xw);
    const m22 = -x2 - y2 + z2 + w2;
    if (!defined_default(result)) {
      return new _Matrix3(m00, m01, m02, m10, m11, m12, m20, m21, m22);
    }
    result[0] = m00;
    result[1] = m10;
    result[2] = m20;
    result[3] = m01;
    result[4] = m11;
    result[5] = m21;
    result[6] = m02;
    result[7] = m12;
    result[8] = m22;
    return result;
  }
  /**
   * Computes a 3x3 rotation matrix from the provided headingPitchRoll. (see http://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles )
   *
   * @param {HeadingPitchRoll} headingPitchRoll the headingPitchRoll to use.
   * @param {Matrix3} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix3} The 3x3 rotation matrix from this headingPitchRoll.
   */
  static fromHeadingPitchRoll(headingPitchRoll, result) {
    Check_default.typeOf.object("headingPitchRoll", headingPitchRoll);
    const cosTheta = Math.cos(-headingPitchRoll.pitch);
    const cosPsi = Math.cos(-headingPitchRoll.heading);
    const cosPhi = Math.cos(headingPitchRoll.roll);
    const sinTheta = Math.sin(-headingPitchRoll.pitch);
    const sinPsi = Math.sin(-headingPitchRoll.heading);
    const sinPhi = Math.sin(headingPitchRoll.roll);
    const m00 = cosTheta * cosPsi;
    const m01 = -cosPhi * sinPsi + sinPhi * sinTheta * cosPsi;
    const m02 = sinPhi * sinPsi + cosPhi * sinTheta * cosPsi;
    const m10 = cosTheta * sinPsi;
    const m11 = cosPhi * cosPsi + sinPhi * sinTheta * sinPsi;
    const m12 = -sinPhi * cosPsi + cosPhi * sinTheta * sinPsi;
    const m20 = -sinTheta;
    const m21 = sinPhi * cosTheta;
    const m22 = cosPhi * cosTheta;
    if (!defined_default(result)) {
      return new _Matrix3(m00, m01, m02, m10, m11, m12, m20, m21, m22);
    }
    result[0] = m00;
    result[1] = m10;
    result[2] = m20;
    result[3] = m01;
    result[4] = m11;
    result[5] = m21;
    result[6] = m02;
    result[7] = m12;
    result[8] = m22;
    return result;
  }
  /**
   * Computes a Matrix3 instance representing a non-uniform scale.
   *
   * @param {Cartesian3} scale The x, y, and z scale factors.
   * @param {Matrix3} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix3} The modified result parameter, or a new Matrix3 instance if one was not provided.
   *
   * @example
   * // Creates
   * //   [7.0, 0.0, 0.0]
   * //   [0.0, 8.0, 0.0]
   * //   [0.0, 0.0, 9.0]
   * const m = Cesium.Matrix3.fromScale(new Cesium.Cartesian3(7.0, 8.0, 9.0));
   */
  static fromScale(scale, result) {
    Check_default.typeOf.object("scale", scale);
    if (!defined_default(result)) {
      return new _Matrix3(
        scale.x,
        0,
        0,
        0,
        scale.y,
        0,
        0,
        0,
        scale.z
      );
    }
    result[0] = scale.x;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = scale.y;
    result[5] = 0;
    result[6] = 0;
    result[7] = 0;
    result[8] = scale.z;
    return result;
  }
  /**
   * Computes a Matrix3 instance representing a uniform scale.
   *
   * @param {number} scale The uniform scale factor.
   * @param {Matrix3} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix3} The modified result parameter, or a new Matrix3 instance if one was not provided.
   *
   * @example
   * // Creates
   * //   [2.0, 0.0, 0.0]
   * //   [0.0, 2.0, 0.0]
   * //   [0.0, 0.0, 2.0]
   * const m = Cesium.Matrix3.fromUniformScale(2.0);
   */
  static fromUniformScale(scale, result) {
    Check_default.typeOf.number("scale", scale);
    if (!defined_default(result)) {
      return new _Matrix3(scale, 0, 0, 0, scale, 0, 0, 0, scale);
    }
    result[0] = scale;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = scale;
    result[5] = 0;
    result[6] = 0;
    result[7] = 0;
    result[8] = scale;
    return result;
  }
  /**
   * Computes a Matrix3 instance representing the cross product equivalent matrix of a Cartesian3 vector.
   *
   * @param {Cartesian3} vector the vector on the left hand side of the cross product operation.
   * @param {Matrix3} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix3} The modified result parameter, or a new Matrix3 instance if one was not provided.
   *
   * @example
   * // Creates
   * //   [0.0, -9.0,  8.0]
   * //   [9.0,  0.0, -7.0]
   * //   [-8.0, 7.0,  0.0]
   * const m = Cesium.Matrix3.fromCrossProduct(new Cesium.Cartesian3(7.0, 8.0, 9.0));
   */
  static fromCrossProduct(vector, result) {
    Check_default.typeOf.object("vector", vector);
    if (!defined_default(result)) {
      return new _Matrix3(
        0,
        -vector.z,
        vector.y,
        vector.z,
        0,
        -vector.x,
        -vector.y,
        vector.x,
        0
      );
    }
    result[0] = 0;
    result[1] = vector.z;
    result[2] = -vector.y;
    result[3] = -vector.z;
    result[4] = 0;
    result[5] = vector.x;
    result[6] = vector.y;
    result[7] = -vector.x;
    result[8] = 0;
    return result;
  }
  /**
   * Creates a rotation matrix around the x-axis.
   *
   * @param {number} angle The angle, in radians, of the rotation.  Positive angles are counterclockwise.
   * @param {Matrix3} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix3} The modified result parameter, or a new Matrix3 instance if one was not provided.
   *
   * @example
   * // Rotate a point 45 degrees counterclockwise around the x-axis.
   * const p = new Cesium.Cartesian3(5, 6, 7);
   * const m = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(45.0));
   * const rotated = Cesium.Matrix3.multiplyByVector(m, p, new Cesium.Cartesian3());
   */
  static fromRotationX(angle, result) {
    Check_default.typeOf.number("angle", angle);
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    if (!defined_default(result)) {
      return new _Matrix3(
        1,
        0,
        0,
        0,
        cosAngle,
        -sinAngle,
        0,
        sinAngle,
        cosAngle
      );
    }
    result[0] = 1;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = cosAngle;
    result[5] = sinAngle;
    result[6] = 0;
    result[7] = -sinAngle;
    result[8] = cosAngle;
    return result;
  }
  /**
   * Creates a rotation matrix around the y-axis.
   *
   * @param {number} angle The angle, in radians, of the rotation.  Positive angles are counterclockwise.
   * @param {Matrix3} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix3} The modified result parameter, or a new Matrix3 instance if one was not provided.
   *
   * @example
   * // Rotate a point 45 degrees counterclockwise around the y-axis.
   * const p = new Cesium.Cartesian3(5, 6, 7);
   * const m = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(45.0));
   * const rotated = Cesium.Matrix3.multiplyByVector(m, p, new Cesium.Cartesian3());
   */
  static fromRotationY(angle, result) {
    Check_default.typeOf.number("angle", angle);
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    if (!defined_default(result)) {
      return new _Matrix3(
        cosAngle,
        0,
        sinAngle,
        0,
        1,
        0,
        -sinAngle,
        0,
        cosAngle
      );
    }
    result[0] = cosAngle;
    result[1] = 0;
    result[2] = -sinAngle;
    result[3] = 0;
    result[4] = 1;
    result[5] = 0;
    result[6] = sinAngle;
    result[7] = 0;
    result[8] = cosAngle;
    return result;
  }
  /**
   * Creates a rotation matrix around the z-axis.
   *
   * @param {number} angle The angle, in radians, of the rotation.  Positive angles are counterclockwise.
   * @param {Matrix3} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix3} The modified result parameter, or a new Matrix3 instance if one was not provided.
   *
   * @example
   * // Rotate a point 45 degrees counterclockwise around the z-axis.
   * const p = new Cesium.Cartesian3(5, 6, 7);
   * const m = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(45.0));
   * const rotated = Cesium.Matrix3.multiplyByVector(m, p, new Cesium.Cartesian3());
   */
  static fromRotationZ(angle, result) {
    Check_default.typeOf.number("angle", angle);
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    if (!defined_default(result)) {
      return new _Matrix3(
        cosAngle,
        -sinAngle,
        0,
        sinAngle,
        cosAngle,
        0,
        0,
        0,
        1
      );
    }
    result[0] = cosAngle;
    result[1] = sinAngle;
    result[2] = 0;
    result[3] = -sinAngle;
    result[4] = cosAngle;
    result[5] = 0;
    result[6] = 0;
    result[7] = 0;
    result[8] = 1;
    return result;
  }
  /**
   * Creates an Array from the provided Matrix3 instance.
   * The array will be in column-major order.
   *
   * @param {Matrix3} matrix The matrix to use..
   * @param {number[]} [result] The Array onto which to store the result.
   * @returns {number[]} The modified Array parameter or a new Array instance if one was not provided.
   */
  static toArray(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    if (!defined_default(result)) {
      return [
        matrix[0],
        matrix[1],
        matrix[2],
        matrix[3],
        matrix[4],
        matrix[5],
        matrix[6],
        matrix[7],
        matrix[8]
      ];
    }
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[3];
    result[4] = matrix[4];
    result[5] = matrix[5];
    result[6] = matrix[6];
    result[7] = matrix[7];
    result[8] = matrix[8];
    return result;
  }
  /**
   * Computes the array index of the element at the provided row and column.
   *
   * @param {number} column The zero-based index of the column.
   * @param {number} row The zero-based index of the row.
   * @returns {number} The index of the element at the provided row and column.
   *
   * @exception {DeveloperError} row must be 0, 1, or 2.
   * @exception {DeveloperError} column must be 0, 1, or 2.
   *
   * @example
   * const myMatrix = new Cesium.Matrix3();
   * const column1Row0Index = Cesium.Matrix3.getElementIndex(1, 0);
   * const column1Row0 = myMatrix[column1Row0Index]
   * myMatrix[column1Row0Index] = 10.0;
   */
  static getElementIndex(column, row) {
    Check_default.typeOf.number.greaterThanOrEquals("row", row, 0);
    Check_default.typeOf.number.lessThanOrEquals("row", row, 2);
    Check_default.typeOf.number.greaterThanOrEquals("column", column, 0);
    Check_default.typeOf.number.lessThanOrEquals("column", column, 2);
    return column * 3 + row;
  }
  /**
   * Retrieves a copy of the matrix column at the provided index as a Cartesian3 instance.
   *
   * @param {Matrix3} matrix The matrix to use.
   * @param {number} index The zero-based index of the column to retrieve.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter.
   *
   * @exception {DeveloperError} index must be 0, 1, or 2.
   */
  static getColumn(matrix, index, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number.greaterThanOrEquals("index", index, 0);
    Check_default.typeOf.number.lessThanOrEquals("index", index, 2);
    Check_default.typeOf.object("result", result);
    const startIndex = index * 3;
    const x = matrix[startIndex];
    const y = matrix[startIndex + 1];
    const z = matrix[startIndex + 2];
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  }
  /**
   * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian3 instance.
   *
   * @param {Matrix3} matrix The matrix to use.
   * @param {number} index The zero-based index of the column to set.
   * @param {Cartesian3} cartesian The Cartesian whose values will be assigned to the specified column.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   *
   * @exception {DeveloperError} index must be 0, 1, or 2.
   */
  static setColumn(matrix, index, cartesian, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number.greaterThanOrEquals("index", index, 0);
    Check_default.typeOf.number.lessThanOrEquals("index", index, 2);
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    result = _Matrix3.clone(matrix, result);
    const startIndex = index * 3;
    result[startIndex] = cartesian.x;
    result[startIndex + 1] = cartesian.y;
    result[startIndex + 2] = cartesian.z;
    return result;
  }
  /**
   * Retrieves a copy of the matrix row at the provided index as a Cartesian3 instance.
   *
   * @param {Matrix3} matrix The matrix to use.
   * @param {number} index The zero-based index of the row to retrieve.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter.
   *
   * @exception {DeveloperError} index must be 0, 1, or 2.
   */
  static getRow(matrix, index, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number.greaterThanOrEquals("index", index, 0);
    Check_default.typeOf.number.lessThanOrEquals("index", index, 2);
    Check_default.typeOf.object("result", result);
    const x = matrix[index];
    const y = matrix[index + 3];
    const z = matrix[index + 6];
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  }
  /**
   * Computes a new matrix that replaces the specified row in the provided matrix with the provided Cartesian3 instance.
   *
   * @param {Matrix3} matrix The matrix to use.
   * @param {number} index The zero-based index of the row to set.
   * @param {Cartesian3} cartesian The Cartesian whose values will be assigned to the specified row.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   *
   * @exception {DeveloperError} index must be 0, 1, or 2.
   */
  static setRow(matrix, index, cartesian, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number.greaterThanOrEquals("index", index, 0);
    Check_default.typeOf.number.lessThanOrEquals("index", index, 2);
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    result = _Matrix3.clone(matrix, result);
    result[index] = cartesian.x;
    result[index + 3] = cartesian.y;
    result[index + 6] = cartesian.z;
    return result;
  }
  /**
   * Computes a new matrix that replaces the scale with the provided scale.
   * This assumes the matrix is an affine transformation.
   *
   * @param {Matrix3} matrix The matrix to use.
   * @param {Cartesian3} scale The scale that replaces the scale of the provided matrix.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   *
   * @see Matrix3.setUniformScale
   * @see Matrix3.fromScale
   * @see Matrix3.fromUniformScale
   * @see Matrix3.multiplyByScale
   * @see Matrix3.multiplyByUniformScale
   * @see Matrix3.getScale
   */
  static setScale(matrix, scale, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("scale", scale);
    Check_default.typeOf.object("result", result);
    const existingScale = _Matrix3.getScale(matrix, scaleScratch1);
    const scaleRatioX = scale.x / existingScale.x;
    const scaleRatioY = scale.y / existingScale.y;
    const scaleRatioZ = scale.z / existingScale.z;
    result[0] = matrix[0] * scaleRatioX;
    result[1] = matrix[1] * scaleRatioX;
    result[2] = matrix[2] * scaleRatioX;
    result[3] = matrix[3] * scaleRatioY;
    result[4] = matrix[4] * scaleRatioY;
    result[5] = matrix[5] * scaleRatioY;
    result[6] = matrix[6] * scaleRatioZ;
    result[7] = matrix[7] * scaleRatioZ;
    result[8] = matrix[8] * scaleRatioZ;
    return result;
  }
  /**
   * Computes a new matrix that replaces the scale with the provided uniform scale.
   * This assumes the matrix is an affine transformation.
   *
   * @param {Matrix3} matrix The matrix to use.
   * @param {number} scale The uniform scale that replaces the scale of the provided matrix.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   *
   * @see Matrix3.setScale
   * @see Matrix3.fromScale
   * @see Matrix3.fromUniformScale
   * @see Matrix3.multiplyByScale
   * @see Matrix3.multiplyByUniformScale
   * @see Matrix3.getScale
   */
  static setUniformScale(matrix, scale, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number("scale", scale);
    Check_default.typeOf.object("result", result);
    const existingScale = _Matrix3.getScale(matrix, scaleScratch2);
    const scaleRatioX = scale / existingScale.x;
    const scaleRatioY = scale / existingScale.y;
    const scaleRatioZ = scale / existingScale.z;
    result[0] = matrix[0] * scaleRatioX;
    result[1] = matrix[1] * scaleRatioX;
    result[2] = matrix[2] * scaleRatioX;
    result[3] = matrix[3] * scaleRatioY;
    result[4] = matrix[4] * scaleRatioY;
    result[5] = matrix[5] * scaleRatioY;
    result[6] = matrix[6] * scaleRatioZ;
    result[7] = matrix[7] * scaleRatioZ;
    result[8] = matrix[8] * scaleRatioZ;
    return result;
  }
  /**
   * Extracts the non-uniform scale assuming the matrix is an affine transformation.
   *
   * @param {Matrix3} matrix The matrix.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter.
   *
   * @see Matrix3.multiplyByScale
   * @see Matrix3.multiplyByUniformScale
   * @see Matrix3.fromScale
   * @see Matrix3.fromUniformScale
   * @see Matrix3.setScale
   * @see Matrix3.setUniformScale
   */
  static getScale(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    result.x = Cartesian3_default.magnitude(
      Cartesian3_default.fromElements(matrix[0], matrix[1], matrix[2], scratchColumn)
    );
    result.y = Cartesian3_default.magnitude(
      Cartesian3_default.fromElements(matrix[3], matrix[4], matrix[5], scratchColumn)
    );
    result.z = Cartesian3_default.magnitude(
      Cartesian3_default.fromElements(matrix[6], matrix[7], matrix[8], scratchColumn)
    );
    return result;
  }
  /**
   * Computes the maximum scale assuming the matrix is an affine transformation.
   * The maximum scale is the maximum length of the column vectors.
   *
   * @param {Matrix3} matrix The matrix.
   * @returns {number} The maximum scale.
   */
  static getMaximumScale(matrix) {
    _Matrix3.getScale(matrix, scaleScratch3);
    return Cartesian3_default.maximumComponent(scaleScratch3);
  }
  /**
   * Sets the rotation assuming the matrix is an affine transformation.
   *
   * @param {Matrix3} matrix The matrix.
   * @param {Matrix3} rotation The rotation matrix.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   *
   * @see Matrix3.getRotation
   */
  static setRotation(matrix, rotation, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    const scale = _Matrix3.getScale(matrix, scaleScratch4);
    result[0] = rotation[0] * scale.x;
    result[1] = rotation[1] * scale.x;
    result[2] = rotation[2] * scale.x;
    result[3] = rotation[3] * scale.y;
    result[4] = rotation[4] * scale.y;
    result[5] = rotation[5] * scale.y;
    result[6] = rotation[6] * scale.z;
    result[7] = rotation[7] * scale.z;
    result[8] = rotation[8] * scale.z;
    return result;
  }
  /**
   * Extracts the rotation matrix assuming the matrix is an affine transformation.
   *
   * @param {Matrix3} matrix The matrix.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   *
   * @see Matrix3.setRotation
   */
  static getRotation(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    const scale = _Matrix3.getScale(matrix, scaleScratch5);
    result[0] = matrix[0] / scale.x;
    result[1] = matrix[1] / scale.x;
    result[2] = matrix[2] / scale.x;
    result[3] = matrix[3] / scale.y;
    result[4] = matrix[4] / scale.y;
    result[5] = matrix[5] / scale.y;
    result[6] = matrix[6] / scale.z;
    result[7] = matrix[7] / scale.z;
    result[8] = matrix[8] / scale.z;
    return result;
  }
  /**
   * Computes the product of two matrices.
   *
   * @param {Matrix3} left The first matrix.
   * @param {Matrix3} right The second matrix.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   */
  static multiply(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    const column0Row0 = left[0] * right[0] + left[3] * right[1] + left[6] * right[2];
    const column0Row1 = left[1] * right[0] + left[4] * right[1] + left[7] * right[2];
    const column0Row2 = left[2] * right[0] + left[5] * right[1] + left[8] * right[2];
    const column1Row0 = left[0] * right[3] + left[3] * right[4] + left[6] * right[5];
    const column1Row1 = left[1] * right[3] + left[4] * right[4] + left[7] * right[5];
    const column1Row2 = left[2] * right[3] + left[5] * right[4] + left[8] * right[5];
    const column2Row0 = left[0] * right[6] + left[3] * right[7] + left[6] * right[8];
    const column2Row1 = left[1] * right[6] + left[4] * right[7] + left[7] * right[8];
    const column2Row2 = left[2] * right[6] + left[5] * right[7] + left[8] * right[8];
    result[0] = column0Row0;
    result[1] = column0Row1;
    result[2] = column0Row2;
    result[3] = column1Row0;
    result[4] = column1Row1;
    result[5] = column1Row2;
    result[6] = column2Row0;
    result[7] = column2Row1;
    result[8] = column2Row2;
    return result;
  }
  /**
   * Computes the sum of two matrices.
   *
   * @param {Matrix3} left The first matrix.
   * @param {Matrix3} right The second matrix.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   */
  static add(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result[0] = left[0] + right[0];
    result[1] = left[1] + right[1];
    result[2] = left[2] + right[2];
    result[3] = left[3] + right[3];
    result[4] = left[4] + right[4];
    result[5] = left[5] + right[5];
    result[6] = left[6] + right[6];
    result[7] = left[7] + right[7];
    result[8] = left[8] + right[8];
    return result;
  }
  /**
   * Computes the difference of two matrices.
   *
   * @param {Matrix3} left The first matrix.
   * @param {Matrix3} right The second matrix.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   */
  static subtract(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result[0] = left[0] - right[0];
    result[1] = left[1] - right[1];
    result[2] = left[2] - right[2];
    result[3] = left[3] - right[3];
    result[4] = left[4] - right[4];
    result[5] = left[5] - right[5];
    result[6] = left[6] - right[6];
    result[7] = left[7] - right[7];
    result[8] = left[8] - right[8];
    return result;
  }
  /**
   * Computes the product of a matrix and a column vector.
   *
   * @param {Matrix3} matrix The matrix.
   * @param {Cartesian3} cartesian The column.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter.
   */
  static multiplyByVector(matrix, cartesian, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    const vX = cartesian.x;
    const vY = cartesian.y;
    const vZ = cartesian.z;
    const x = matrix[0] * vX + matrix[3] * vY + matrix[6] * vZ;
    const y = matrix[1] * vX + matrix[4] * vY + matrix[7] * vZ;
    const z = matrix[2] * vX + matrix[5] * vY + matrix[8] * vZ;
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  }
  /**
   * Computes the product of a matrix and a scalar.
   *
   * @param {Matrix3} matrix The matrix.
   * @param {number} scalar The number to multiply by.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   */
  static multiplyByScalar(matrix, scalar, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number("scalar", scalar);
    Check_default.typeOf.object("result", result);
    result[0] = matrix[0] * scalar;
    result[1] = matrix[1] * scalar;
    result[2] = matrix[2] * scalar;
    result[3] = matrix[3] * scalar;
    result[4] = matrix[4] * scalar;
    result[5] = matrix[5] * scalar;
    result[6] = matrix[6] * scalar;
    result[7] = matrix[7] * scalar;
    result[8] = matrix[8] * scalar;
    return result;
  }
  /**
   * Computes the product of a matrix times a (non-uniform) scale, as if the scale were a scale matrix.
   *
   * @param {Matrix3} matrix The matrix on the left-hand side.
   * @param {Cartesian3} scale The non-uniform scale on the right-hand side.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   *
   *
   * @example
   * // Instead of Cesium.Matrix3.multiply(m, Cesium.Matrix3.fromScale(scale), m);
   * Cesium.Matrix3.multiplyByScale(m, scale, m);
   *
   * @see Matrix3.multiplyByUniformScale
   * @see Matrix3.fromScale
   * @see Matrix3.fromUniformScale
   * @see Matrix3.setScale
   * @see Matrix3.setUniformScale
   * @see Matrix3.getScale
   */
  static multiplyByScale(matrix, scale, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("scale", scale);
    Check_default.typeOf.object("result", result);
    result[0] = matrix[0] * scale.x;
    result[1] = matrix[1] * scale.x;
    result[2] = matrix[2] * scale.x;
    result[3] = matrix[3] * scale.y;
    result[4] = matrix[4] * scale.y;
    result[5] = matrix[5] * scale.y;
    result[6] = matrix[6] * scale.z;
    result[7] = matrix[7] * scale.z;
    result[8] = matrix[8] * scale.z;
    return result;
  }
  /**
   * Computes the product of a matrix times a uniform scale, as if the scale were a scale matrix.
   *
   * @param {Matrix3} matrix The matrix on the left-hand side.
   * @param {number} scale The uniform scale on the right-hand side.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   *
   * @example
   * // Instead of Cesium.Matrix3.multiply(m, Cesium.Matrix3.fromUniformScale(scale), m);
   * Cesium.Matrix3.multiplyByUniformScale(m, scale, m);
   *
   * @see Matrix3.multiplyByScale
   * @see Matrix3.fromScale
   * @see Matrix3.fromUniformScale
   * @see Matrix3.setScale
   * @see Matrix3.setUniformScale
   * @see Matrix3.getScale
   */
  static multiplyByUniformScale(matrix, scale, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number("scale", scale);
    Check_default.typeOf.object("result", result);
    result[0] = matrix[0] * scale;
    result[1] = matrix[1] * scale;
    result[2] = matrix[2] * scale;
    result[3] = matrix[3] * scale;
    result[4] = matrix[4] * scale;
    result[5] = matrix[5] * scale;
    result[6] = matrix[6] * scale;
    result[7] = matrix[7] * scale;
    result[8] = matrix[8] * scale;
    return result;
  }
  /**
   * Creates a negated copy of the provided matrix.
   *
   * @param {Matrix3} matrix The matrix to negate.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   */
  static negate(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    result[0] = -matrix[0];
    result[1] = -matrix[1];
    result[2] = -matrix[2];
    result[3] = -matrix[3];
    result[4] = -matrix[4];
    result[5] = -matrix[5];
    result[6] = -matrix[6];
    result[7] = -matrix[7];
    result[8] = -matrix[8];
    return result;
  }
  /**
   * Computes the transpose of the provided matrix.
   *
   * @param {Matrix3} matrix The matrix to transpose.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   */
  static transpose(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    const column0Row0 = matrix[0];
    const column0Row1 = matrix[3];
    const column0Row2 = matrix[6];
    const column1Row0 = matrix[1];
    const column1Row1 = matrix[4];
    const column1Row2 = matrix[7];
    const column2Row0 = matrix[2];
    const column2Row1 = matrix[5];
    const column2Row2 = matrix[8];
    result[0] = column0Row0;
    result[1] = column0Row1;
    result[2] = column0Row2;
    result[3] = column1Row0;
    result[4] = column1Row1;
    result[5] = column1Row2;
    result[6] = column2Row0;
    result[7] = column2Row1;
    result[8] = column2Row2;
    return result;
  }
  /**
   * Computes the eigenvectors and eigenvalues of a symmetric matrix.
   * <p>
   * Returns a diagonal matrix and unitary matrix such that:
   * <code>matrix = unitary matrix * diagonal matrix * transpose(unitary matrix)</code>
   * </p>
   * <p>
   * The values along the diagonal of the diagonal matrix are the eigenvalues. The columns
   * of the unitary matrix are the corresponding eigenvectors.
   * </p>
   *
   * @param {Matrix3} matrix The matrix to decompose into diagonal and unitary matrix. Expected to be symmetric.
   * @param {EigenDecompositionResult} [result] An object with unitary and diagonal properties which are matrices onto which to store the result.
   * @returns {EigenDecompositionResult} An object with unitary and diagonal properties which are the unitary and diagonal matrices, respectively.
   *
   * @example
   * const a = //... symetric matrix
   * const result = {
   *     unitary : new Cesium.Matrix3(),
   *     diagonal : new Cesium.Matrix3()
   * };
   * Cesium.Matrix3.computeEigenDecomposition(a, result);
   *
   * const unitaryTranspose = Cesium.Matrix3.transpose(result.unitary, new Cesium.Matrix3());
   * const b = Cesium.Matrix3.multiply(result.unitary, result.diagonal, new Cesium.Matrix3());
   * Cesium.Matrix3.multiply(b, unitaryTranspose, b); // b is now equal to a
   *
   * const lambda = Cesium.Matrix3.getColumn(result.diagonal, 0, new Cesium.Cartesian3()).x;  // first eigenvalue
   * const v = Cesium.Matrix3.getColumn(result.unitary, 0, new Cesium.Cartesian3());          // first eigenvector
   * const c = Cesium.Cartesian3.multiplyByScalar(v, lambda, new Cesium.Cartesian3());        // equal to Cesium.Matrix3.multiplyByVector(a, v)
   */
  static computeEigenDecomposition(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    const tolerance = Math_default.EPSILON20;
    const maxSweeps = 10;
    let count = 0;
    let sweep = 0;
    if (!defined_default(result)) {
      result = {};
    }
    const unitaryMatrix = result.unitary = _Matrix3.clone(
      _Matrix3.IDENTITY,
      result.unitary
    );
    const diagMatrix = result.diagonal = _Matrix3.clone(
      matrix,
      result.diagonal
    );
    const epsilon = tolerance * computeFrobeniusNorm(diagMatrix);
    while (sweep < maxSweeps && offDiagonalFrobeniusNorm(diagMatrix) > epsilon) {
      shurDecomposition(diagMatrix, jMatrix);
      _Matrix3.transpose(jMatrix, jMatrixTranspose);
      _Matrix3.multiply(diagMatrix, jMatrix, diagMatrix);
      _Matrix3.multiply(jMatrixTranspose, diagMatrix, diagMatrix);
      _Matrix3.multiply(unitaryMatrix, jMatrix, unitaryMatrix);
      if (++count > 2) {
        ++sweep;
        count = 0;
      }
    }
    return result;
  }
  /**
   * Computes a matrix, which contains the absolute (unsigned) values of the provided matrix's elements.
   *
   * @param {Matrix3} matrix The matrix with signed elements.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   */
  static abs(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    result[0] = Math.abs(matrix[0]);
    result[1] = Math.abs(matrix[1]);
    result[2] = Math.abs(matrix[2]);
    result[3] = Math.abs(matrix[3]);
    result[4] = Math.abs(matrix[4]);
    result[5] = Math.abs(matrix[5]);
    result[6] = Math.abs(matrix[6]);
    result[7] = Math.abs(matrix[7]);
    result[8] = Math.abs(matrix[8]);
    return result;
  }
  /**
   * Computes the determinant of the provided matrix.
   *
   * @param {Matrix3} matrix The matrix to use.
   * @returns {number} The value of the determinant of the matrix.
   */
  static determinant(matrix) {
    Check_default.typeOf.object("matrix", matrix);
    const m11 = matrix[0];
    const m21 = matrix[3];
    const m31 = matrix[6];
    const m12 = matrix[1];
    const m22 = matrix[4];
    const m32 = matrix[7];
    const m13 = matrix[2];
    const m23 = matrix[5];
    const m33 = matrix[8];
    return m11 * (m22 * m33 - m23 * m32) + m12 * (m23 * m31 - m21 * m33) + m13 * (m21 * m32 - m22 * m31);
  }
  /**
   * Computes the inverse of the provided matrix.
   *
   * @param {Matrix3} matrix The matrix to invert.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   *
   * @exception {DeveloperError} matrix is not invertible.
   */
  static inverse(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    const m11 = matrix[0];
    const m21 = matrix[1];
    const m31 = matrix[2];
    const m12 = matrix[3];
    const m22 = matrix[4];
    const m32 = matrix[5];
    const m13 = matrix[6];
    const m23 = matrix[7];
    const m33 = matrix[8];
    const determinant = _Matrix3.determinant(matrix);
    if (Math.abs(determinant) <= Math_default.EPSILON15) {
      throw new DeveloperError_default("matrix is not invertible");
    }
    result[0] = m22 * m33 - m23 * m32;
    result[1] = m23 * m31 - m21 * m33;
    result[2] = m21 * m32 - m22 * m31;
    result[3] = m13 * m32 - m12 * m33;
    result[4] = m11 * m33 - m13 * m31;
    result[5] = m12 * m31 - m11 * m32;
    result[6] = m12 * m23 - m13 * m22;
    result[7] = m13 * m21 - m11 * m23;
    result[8] = m11 * m22 - m12 * m21;
    const scale = 1 / determinant;
    return _Matrix3.multiplyByScalar(result, scale, result);
  }
  /**
   * Computes the inverse transpose of a matrix.
   *
   * @param {Matrix3} matrix The matrix to transpose and invert.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   */
  static inverseTranspose(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    return _Matrix3.inverse(
      _Matrix3.transpose(matrix, scratchTransposeMatrix),
      result
    );
  }
  /**
   * Compares the provided matrices componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Matrix3} [left] The first matrix.
   * @param {Matrix3} [right] The second matrix.
   * @returns {boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
   */
  static equals(left, right) {
    return left === right || defined_default(left) && defined_default(right) && left[0] === right[0] && left[1] === right[1] && left[2] === right[2] && left[3] === right[3] && left[4] === right[4] && left[5] === right[5] && left[6] === right[6] && left[7] === right[7] && left[8] === right[8];
  }
  /**
   * Compares the provided matrices componentwise and returns
   * <code>true</code> if they are within the provided epsilon,
   * <code>false</code> otherwise.
   *
   * @param {Matrix3} [left] The first matrix.
   * @param {Matrix3} [right] The second matrix.
   * @param {number} [epsilon=0] The epsilon to use for equality testing.
   * @returns {boolean} <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
   */
  static equalsEpsilon(left, right, epsilon) {
    epsilon = epsilon ?? 0;
    return left === right || defined_default(left) && defined_default(right) && Math.abs(left[0] - right[0]) <= epsilon && Math.abs(left[1] - right[1]) <= epsilon && Math.abs(left[2] - right[2]) <= epsilon && Math.abs(left[3] - right[3]) <= epsilon && Math.abs(left[4] - right[4]) <= epsilon && Math.abs(left[5] - right[5]) <= epsilon && Math.abs(left[6] - right[6]) <= epsilon && Math.abs(left[7] - right[7]) <= epsilon && Math.abs(left[8] - right[8]) <= epsilon;
  }
  /**
   * Gets the number of items in the collection.
   *
   * @type {number}
   */
  get length() {
    return _Matrix3.packedLength;
  }
  /**
   * Duplicates the provided Matrix3 instance.
   *
   * @param {Matrix3} [result] The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter or a new Matrix3 instance if one was not provided.
   */
  clone(result) {
    return _Matrix3.clone(this, result);
  }
  /**
   * Compares this matrix to the provided matrix componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Matrix3} [right] The right hand side matrix.
   * @returns {boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
   */
  equals(right) {
    return _Matrix3.equals(this, right);
  }
  /**
   * Compares provided matrix and array, starting from a given array offset.
   *
   * @param {Matrix3} matrix The matrix to compare.
   * @param {number[]} array The packed array.
   * @param {number} offset The offset into the array at which the matrix starts.
   * @returns {boolean} <code>true</code> if the matrix matches the packed array values at the offset; otherwise, <code>false</code>.
   * @internal
   */
  static equalsArray(matrix, array, offset) {
    return matrix[0] === array[offset] && matrix[1] === array[offset + 1] && matrix[2] === array[offset + 2] && matrix[3] === array[offset + 3] && matrix[4] === array[offset + 4] && matrix[5] === array[offset + 5] && matrix[6] === array[offset + 6] && matrix[7] === array[offset + 7] && matrix[8] === array[offset + 8];
  }
  /**
   * Compares this matrix to the provided matrix componentwise and returns
   * <code>true</code> if they are within the provided epsilon,
   * <code>false</code> otherwise.
   *
   * @param {Matrix3} [right] The right hand side matrix.
   * @param {number} [epsilon=0] The epsilon to use for equality testing.
   * @returns {boolean} <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
   */
  equalsEpsilon(right, epsilon) {
    return _Matrix3.equalsEpsilon(this, right, epsilon);
  }
  /**
   * Creates a string representing this Matrix with each row being
   * on a separate line and in the format '(column0, column1, column2)'.
   *
   * @returns {string} A string representing the provided Matrix with each row being on a separate line and in the format '(column0, column1, column2)'.
   */
  toString() {
    return `(${this[0]}, ${this[3]}, ${this[6]})
(${this[1]}, ${this[4]}, ${this[7]})
(${this[2]}, ${this[5]}, ${this[8]})`;
  }
};
Matrix3.packedLength = 9;
Matrix3.fromArray = Matrix3.unpack;
Matrix3.IDENTITY = Object.freeze(
  new Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1)
);
Matrix3.ZERO = Object.freeze(
  new Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0)
);
Matrix3.COLUMN0ROW0 = 0;
Matrix3.COLUMN0ROW1 = 1;
Matrix3.COLUMN0ROW2 = 2;
Matrix3.COLUMN1ROW0 = 3;
Matrix3.COLUMN1ROW1 = 4;
Matrix3.COLUMN1ROW2 = 5;
Matrix3.COLUMN2ROW0 = 6;
Matrix3.COLUMN2ROW1 = 7;
Matrix3.COLUMN2ROW2 = 8;
var scaleScratch1 = new Cartesian3_default();
var scaleScratch2 = new Cartesian3_default();
var scratchColumn = new Cartesian3_default();
var scaleScratch3 = new Cartesian3_default();
var scaleScratch4 = new Cartesian3_default();
var scaleScratch5 = new Cartesian3_default();
var jMatrix = new Matrix3();
var jMatrixTranspose = new Matrix3();
var scratchTransposeMatrix = new Matrix3();
function computeFrobeniusNorm(matrix) {
  let norm = 0;
  for (let i = 0; i < 9; ++i) {
    const temp = matrix[i];
    norm += temp * temp;
  }
  return Math.sqrt(norm);
}
var rowVal = [1, 0, 0];
var colVal = [2, 2, 1];
function offDiagonalFrobeniusNorm(matrix) {
  let norm = 0;
  for (let i = 0; i < 3; ++i) {
    const temp = matrix[Matrix3.getElementIndex(colVal[i], rowVal[i])];
    norm += 2 * temp * temp;
  }
  return Math.sqrt(norm);
}
function shurDecomposition(matrix, result) {
  const tolerance = Math_default.EPSILON15;
  let maxDiagonal = 0;
  let rotAxis = 1;
  for (let i = 0; i < 3; ++i) {
    const temp = Math.abs(
      // @ts-expect-error TODO(tsd-jsdoc): Requires index signature support.
      matrix[Matrix3.getElementIndex(colVal[i], rowVal[i])]
    );
    if (temp > maxDiagonal) {
      rotAxis = i;
      maxDiagonal = temp;
    }
  }
  let c = 1;
  let s = 0;
  const p = rowVal[rotAxis];
  const q = colVal[rotAxis];
  if (Math.abs(matrix[Matrix3.getElementIndex(q, p)]) > tolerance) {
    const qq = matrix[Matrix3.getElementIndex(q, q)];
    const pp = matrix[Matrix3.getElementIndex(p, p)];
    const qp = matrix[Matrix3.getElementIndex(q, p)];
    const tau = (qq - pp) / 2 / qp;
    let t;
    if (tau < 0) {
      t = -1 / (-tau + Math.sqrt(1 + tau * tau));
    } else {
      t = 1 / (tau + Math.sqrt(1 + tau * tau));
    }
    c = 1 / Math.sqrt(1 + t * t);
    s = t * c;
  }
  result = Matrix3.clone(Matrix3.IDENTITY, result);
  result[Matrix3.getElementIndex(p, p)] = result[Matrix3.getElementIndex(q, q)] = c;
  result[Matrix3.getElementIndex(q, p)] = s;
  result[Matrix3.getElementIndex(p, q)] = -s;
  return result;
}
var Matrix3_default = Matrix3;

// packages/core/Source/Frozen.js
var Frozen = {};
Frozen.EMPTY_OBJECT = Object.freeze({});
Frozen.EMPTY_ARRAY = Object.freeze([]);
var Frozen_default = Frozen;

// packages/core/Source/RuntimeError.js
function RuntimeError(message) {
  this.name = "RuntimeError";
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
  RuntimeError.prototype = Object.create(Error.prototype);
  RuntimeError.prototype.constructor = RuntimeError;
}
RuntimeError.prototype.toString = function() {
  let str = `${this.name}: ${this.message}`;
  if (defined_default(this.stack)) {
    str += `
${this.stack.toString()}`;
  }
  return str;
};
var RuntimeError_default = RuntimeError;

// packages/core/Source/oneTimeWarning.js
var warnings = {};
function oneTimeWarning(identifier, message) {
  if (!defined_default(identifier)) {
    throw new DeveloperError_default("identifier is required.");
  }
  if (!defined_default(warnings[identifier])) {
    warnings[identifier] = true;
    console.warn(message ?? identifier);
  }
}
oneTimeWarning.geometryOutlines = "Entity geometry outlines are unsupported on terrain. Outlines will be disabled. To enable outlines, disable geometry terrain clamping by explicitly setting height to 0.";
oneTimeWarning.geometryZIndex = "Entity geometry with zIndex are unsupported when height or extrudedHeight are defined.  zIndex will be ignored";
oneTimeWarning.geometryHeightReference = "Entity corridor, ellipse, polygon or rectangle with heightReference must also have a defined height.  heightReference will be ignored";
oneTimeWarning.geometryExtrudedHeightReference = "Entity corridor, ellipse, polygon or rectangle with extrudedHeightReference must also have a defined extrudedHeight.  extrudedHeightReference will be ignored";
var oneTimeWarning_default = oneTimeWarning;

// packages/core/Source/deprecationWarning.js
function deprecationWarning(identifier, message) {
  if (!defined_default(identifier) || !defined_default(message)) {
    throw new DeveloperError_default("identifier and message are required.");
  }
  oneTimeWarning_default(identifier, message);
}
var deprecationWarning_default = deprecationWarning;

// packages/core/Source/Matrix4.js
var Matrix4 = class _Matrix4 {
  /**
   * @param {number} [column0Row0=0.0] The value for column 0, row 0.
   * @param {number} [column1Row0=0.0] The value for column 1, row 0.
   * @param {number} [column2Row0=0.0] The value for column 2, row 0.
   * @param {number} [column3Row0=0.0] The value for column 3, row 0.
   * @param {number} [column0Row1=0.0] The value for column 0, row 1.
   * @param {number} [column1Row1=0.0] The value for column 1, row 1.
   * @param {number} [column2Row1=0.0] The value for column 2, row 1.
   * @param {number} [column3Row1=0.0] The value for column 3, row 1.
   * @param {number} [column0Row2=0.0] The value for column 0, row 2.
   * @param {number} [column1Row2=0.0] The value for column 1, row 2.
   * @param {number} [column2Row2=0.0] The value for column 2, row 2.
   * @param {number} [column3Row2=0.0] The value for column 3, row 2.
   * @param {number} [column0Row3=0.0] The value for column 0, row 3.
   * @param {number} [column1Row3=0.0] The value for column 1, row 3.
   * @param {number} [column2Row3=0.0] The value for column 2, row 3.
   * @param {number} [column3Row3=0.0] The value for column 3, row 3.
   */
  constructor(column0Row0, column1Row0, column2Row0, column3Row0, column0Row1, column1Row1, column2Row1, column3Row1, column0Row2, column1Row2, column2Row2, column3Row2, column0Row3, column1Row3, column2Row3, column3Row3) {
    this[0] = column0Row0 ?? 0;
    this[1] = column0Row1 ?? 0;
    this[2] = column0Row2 ?? 0;
    this[3] = column0Row3 ?? 0;
    this[4] = column1Row0 ?? 0;
    this[5] = column1Row1 ?? 0;
    this[6] = column1Row2 ?? 0;
    this[7] = column1Row3 ?? 0;
    this[8] = column2Row0 ?? 0;
    this[9] = column2Row1 ?? 0;
    this[10] = column2Row2 ?? 0;
    this[11] = column2Row3 ?? 0;
    this[12] = column3Row0 ?? 0;
    this[13] = column3Row1 ?? 0;
    this[14] = column3Row2 ?? 0;
    this[15] = column3Row3 ?? 0;
  }
  /**
   * Stores the provided instance into the provided array.
   *
   * @param {Matrix4} value The value to pack.
   * @param {number[]} array The array to pack into.
   * @param {number} [startingIndex=0] The index into the array at which to start packing the elements.
   *
   * @returns {number[]} The array that was packed into
   */
  static pack(value, array, startingIndex) {
    Check_default.typeOf.object("value", value);
    Check_default.defined("array", array);
    startingIndex = startingIndex ?? 0;
    array[startingIndex++] = value[0];
    array[startingIndex++] = value[1];
    array[startingIndex++] = value[2];
    array[startingIndex++] = value[3];
    array[startingIndex++] = value[4];
    array[startingIndex++] = value[5];
    array[startingIndex++] = value[6];
    array[startingIndex++] = value[7];
    array[startingIndex++] = value[8];
    array[startingIndex++] = value[9];
    array[startingIndex++] = value[10];
    array[startingIndex++] = value[11];
    array[startingIndex++] = value[12];
    array[startingIndex++] = value[13];
    array[startingIndex++] = value[14];
    array[startingIndex] = value[15];
    return array;
  }
  /**
   * Retrieves an instance from a packed array.
   *
   * @param {number[]} array The packed array.
   * @param {number} [startingIndex=0] The starting index of the element to be unpacked.
   * @param {Matrix4} [result] The object into which to store the result.
   * @returns {Matrix4} The modified result parameter or a new Matrix4 instance if one was not provided.
   */
  static unpack(array, startingIndex, result) {
    Check_default.defined("array", array);
    startingIndex = startingIndex ?? 0;
    if (!defined_default(result)) {
      result = new _Matrix4();
    }
    result[0] = array[startingIndex++];
    result[1] = array[startingIndex++];
    result[2] = array[startingIndex++];
    result[3] = array[startingIndex++];
    result[4] = array[startingIndex++];
    result[5] = array[startingIndex++];
    result[6] = array[startingIndex++];
    result[7] = array[startingIndex++];
    result[8] = array[startingIndex++];
    result[9] = array[startingIndex++];
    result[10] = array[startingIndex++];
    result[11] = array[startingIndex++];
    result[12] = array[startingIndex++];
    result[13] = array[startingIndex++];
    result[14] = array[startingIndex++];
    result[15] = array[startingIndex];
    return result;
  }
  /**
   * Flattens an array of Matrix4s into an array of components. The components
   * are stored in column-major order.
   *
   * @param {Matrix4[]} array The array of matrices to pack.
   * @param {number[]} [result] The array onto which to store the result. If this is a typed array, it must have array.length * 16 components, else a {@link DeveloperError} will be thrown. If it is a regular array, it will be resized to have (array.length * 16) elements.
   * @returns {number[]} The packed array.
   */
  static packArray(array, result) {
    Check_default.defined("array", array);
    const length = array.length;
    const resultLength = length * 16;
    if (!defined_default(result)) {
      result = new Array(resultLength);
    } else if (!Array.isArray(result) && result.length !== resultLength) {
      throw new DeveloperError_default(
        "If result is a typed array, it must have exactly array.length * 16 elements"
      );
    } else if (result.length !== resultLength) {
      result.length = resultLength;
    }
    for (let i = 0; i < length; ++i) {
      _Matrix4.pack(array[i], result, i * 16);
    }
    return result;
  }
  /**
   * Unpacks an array of column-major matrix components into an array of Matrix4s.
   *
   * @param {number[]} array The array of components to unpack.
   * @param {Matrix4[]} [result] The array onto which to store the result.
   * @returns {Matrix4[]} The unpacked array.
   */
  static unpackArray(array, result) {
    Check_default.defined("array", array);
    Check_default.typeOf.number.greaterThanOrEquals("array.length", array.length, 16);
    if (array.length % 16 !== 0) {
      throw new DeveloperError_default("array length must be a multiple of 16.");
    }
    const length = array.length;
    if (!defined_default(result)) {
      result = new Array(length / 16);
    } else {
      result.length = length / 16;
    }
    for (let i = 0; i < length; i += 16) {
      const index = i / 16;
      result[index] = _Matrix4.unpack(array, i, result[index]);
    }
    return result;
  }
  /**
   * Duplicates a Matrix4 instance.
   *
   * @param {Matrix4} matrix The matrix to duplicate.
   * @param {Matrix4} [result] The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter or a new Matrix4 instance if one was not provided. (Returns undefined if matrix is undefined)
   */
  static clone(matrix, result) {
    if (!defined_default(matrix)) {
      return void 0;
    }
    if (!defined_default(result)) {
      return new _Matrix4(
        matrix[0],
        matrix[4],
        matrix[8],
        matrix[12],
        matrix[1],
        matrix[5],
        matrix[9],
        matrix[13],
        matrix[2],
        matrix[6],
        matrix[10],
        matrix[14],
        matrix[3],
        matrix[7],
        matrix[11],
        matrix[15]
      );
    }
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[3];
    result[4] = matrix[4];
    result[5] = matrix[5];
    result[6] = matrix[6];
    result[7] = matrix[7];
    result[8] = matrix[8];
    result[9] = matrix[9];
    result[10] = matrix[10];
    result[11] = matrix[11];
    result[12] = matrix[12];
    result[13] = matrix[13];
    result[14] = matrix[14];
    result[15] = matrix[15];
    return result;
  }
  /**
   * Computes a Matrix4 instance from a column-major order array.
   *
   * @param {number[]} values The column-major order array.
   * @param {Matrix4} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
   */
  static fromColumnMajorArray(values, result) {
    Check_default.defined("values", values);
    return _Matrix4.clone(values, result);
  }
  /**
   * Computes a Matrix4 instance from a row-major order array.
   * The resulting matrix will be in column-major order.
   *
   * @param {number[]} values The row-major order array.
   * @param {Matrix4} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
   */
  static fromRowMajorArray(values, result) {
    Check_default.defined("values", values);
    if (!defined_default(result)) {
      return new _Matrix4(
        values[0],
        values[1],
        values[2],
        values[3],
        values[4],
        values[5],
        values[6],
        values[7],
        values[8],
        values[9],
        values[10],
        values[11],
        values[12],
        values[13],
        values[14],
        values[15]
      );
    }
    result[0] = values[0];
    result[1] = values[4];
    result[2] = values[8];
    result[3] = values[12];
    result[4] = values[1];
    result[5] = values[5];
    result[6] = values[9];
    result[7] = values[13];
    result[8] = values[2];
    result[9] = values[6];
    result[10] = values[10];
    result[11] = values[14];
    result[12] = values[3];
    result[13] = values[7];
    result[14] = values[11];
    result[15] = values[15];
    return result;
  }
  /**
   * Computes a Matrix4 instance from a Matrix3 representing the rotation
   * and a Cartesian3 representing the translation.
   *
   * @param {Matrix3} rotation The upper left portion of the matrix representing the rotation.
   * @param {Cartesian3} [translation=Cartesian3.ZERO] The upper right portion of the matrix representing the translation.
   * @param {Matrix4} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
   */
  static fromRotationTranslation(rotation, translation, result) {
    Check_default.typeOf.object("rotation", rotation);
    translation = translation ?? Cartesian3_default.ZERO;
    if (!defined_default(result)) {
      return new _Matrix4(
        rotation[0],
        rotation[3],
        rotation[6],
        translation.x,
        rotation[1],
        rotation[4],
        rotation[7],
        translation.y,
        rotation[2],
        rotation[5],
        rotation[8],
        translation.z,
        0,
        0,
        0,
        1
      );
    }
    result[0] = rotation[0];
    result[1] = rotation[1];
    result[2] = rotation[2];
    result[3] = 0;
    result[4] = rotation[3];
    result[5] = rotation[4];
    result[6] = rotation[5];
    result[7] = 0;
    result[8] = rotation[6];
    result[9] = rotation[7];
    result[10] = rotation[8];
    result[11] = 0;
    result[12] = translation.x;
    result[13] = translation.y;
    result[14] = translation.z;
    result[15] = 1;
    return result;
  }
  /**
   * Computes a Matrix4 instance from a translation, rotation, and scale (TRS)
   * representation with the rotation represented as a quaternion.
   *
   * @param {Cartesian3} translation The translation transformation.
   * @param {Quaternion} rotation The rotation transformation.
   * @param {Cartesian3} scale The non-uniform scale transformation.
   * @param {Matrix4} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
   *
   * @example
   * const result = Cesium.Matrix4.fromTranslationQuaternionRotationScale(
   *   new Cesium.Cartesian3(1.0, 2.0, 3.0), // translation
   *   Cesium.Quaternion.IDENTITY,           // rotation
   *   new Cesium.Cartesian3(7.0, 8.0, 9.0), // scale
   *   result);
   */
  static fromTranslationQuaternionRotationScale(translation, rotation, scale, result) {
    Check_default.typeOf.object("translation", translation);
    Check_default.typeOf.object("rotation", rotation);
    Check_default.typeOf.object("scale", scale);
    if (!defined_default(result)) {
      result = new _Matrix4();
    }
    const scaleX = scale.x;
    const scaleY = scale.y;
    const scaleZ = scale.z;
    const x2 = rotation.x * rotation.x;
    const xy = rotation.x * rotation.y;
    const xz = rotation.x * rotation.z;
    const xw = rotation.x * rotation.w;
    const y2 = rotation.y * rotation.y;
    const yz = rotation.y * rotation.z;
    const yw = rotation.y * rotation.w;
    const z2 = rotation.z * rotation.z;
    const zw = rotation.z * rotation.w;
    const w2 = rotation.w * rotation.w;
    const m00 = x2 - y2 - z2 + w2;
    const m01 = 2 * (xy - zw);
    const m02 = 2 * (xz + yw);
    const m10 = 2 * (xy + zw);
    const m11 = -x2 + y2 - z2 + w2;
    const m12 = 2 * (yz - xw);
    const m20 = 2 * (xz - yw);
    const m21 = 2 * (yz + xw);
    const m22 = -x2 - y2 + z2 + w2;
    result[0] = m00 * scaleX;
    result[1] = m10 * scaleX;
    result[2] = m20 * scaleX;
    result[3] = 0;
    result[4] = m01 * scaleY;
    result[5] = m11 * scaleY;
    result[6] = m21 * scaleY;
    result[7] = 0;
    result[8] = m02 * scaleZ;
    result[9] = m12 * scaleZ;
    result[10] = m22 * scaleZ;
    result[11] = 0;
    result[12] = translation.x;
    result[13] = translation.y;
    result[14] = translation.z;
    result[15] = 1;
    return result;
  }
  /**
   * Creates a Matrix4 instance from a {@link TranslationRotationScale} instance.
   *
   * @param {TranslationRotationScale} translationRotationScale The instance.
   * @param {Matrix4} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
   */
  static fromTranslationRotationScale(translationRotationScale, result) {
    Check_default.typeOf.object("translationRotationScale", translationRotationScale);
    return _Matrix4.fromTranslationQuaternionRotationScale(
      translationRotationScale.translation,
      translationRotationScale.rotation,
      translationRotationScale.scale,
      result
    );
  }
  /**
   * Creates a Matrix4 instance from a Cartesian3 representing the translation.
   *
   * @param {Cartesian3} translation The upper right portion of the matrix representing the translation.
   * @param {Matrix4} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
   *
   * @see Matrix4.multiplyByTranslation
   */
  static fromTranslation(translation, result) {
    Check_default.typeOf.object("translation", translation);
    return _Matrix4.fromRotationTranslation(
      Matrix3_default.IDENTITY,
      translation,
      result
    );
  }
  /**
   * Computes a Matrix4 instance representing a non-uniform scale.
   *
   * @param {Cartesian3} scale The x, y, and z scale factors.
   * @param {Matrix4} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
   *
   * @example
   * // Creates
   * //   [7.0, 0.0, 0.0, 0.0]
   * //   [0.0, 8.0, 0.0, 0.0]
   * //   [0.0, 0.0, 9.0, 0.0]
   * //   [0.0, 0.0, 0.0, 1.0]
   * const m = Cesium.Matrix4.fromScale(new Cesium.Cartesian3(7.0, 8.0, 9.0));
   */
  static fromScale(scale, result) {
    Check_default.typeOf.object("scale", scale);
    if (!defined_default(result)) {
      return new _Matrix4(
        scale.x,
        0,
        0,
        0,
        0,
        scale.y,
        0,
        0,
        0,
        0,
        scale.z,
        0,
        0,
        0,
        0,
        1
      );
    }
    result[0] = scale.x;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = 0;
    result[5] = scale.y;
    result[6] = 0;
    result[7] = 0;
    result[8] = 0;
    result[9] = 0;
    result[10] = scale.z;
    result[11] = 0;
    result[12] = 0;
    result[13] = 0;
    result[14] = 0;
    result[15] = 1;
    return result;
  }
  /**
   * Computes a Matrix4 instance representing a uniform scale.
   *
   * @param {number} scale The uniform scale factor.
   * @param {Matrix4} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
   *
   * @example
   * // Creates
   * //   [2.0, 0.0, 0.0, 0.0]
   * //   [0.0, 2.0, 0.0, 0.0]
   * //   [0.0, 0.0, 2.0, 0.0]
   * //   [0.0, 0.0, 0.0, 1.0]
   * const m = Cesium.Matrix4.fromUniformScale(2.0);
   */
  static fromUniformScale(scale, result) {
    Check_default.typeOf.number("scale", scale);
    if (!defined_default(result)) {
      return new _Matrix4(
        scale,
        0,
        0,
        0,
        0,
        scale,
        0,
        0,
        0,
        0,
        scale,
        0,
        0,
        0,
        0,
        1
      );
    }
    result[0] = scale;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = 0;
    result[5] = scale;
    result[6] = 0;
    result[7] = 0;
    result[8] = 0;
    result[9] = 0;
    result[10] = scale;
    result[11] = 0;
    result[12] = 0;
    result[13] = 0;
    result[14] = 0;
    result[15] = 1;
    return result;
  }
  /**
   * Creates a rotation matrix.
   *
   * @param {Matrix3} rotation The rotation matrix.
   * @param {Matrix4} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
   */
  static fromRotation(rotation, result) {
    Check_default.typeOf.object("rotation", rotation);
    if (!defined_default(result)) {
      result = new _Matrix4();
    }
    result[0] = rotation[0];
    result[1] = rotation[1];
    result[2] = rotation[2];
    result[3] = 0;
    result[4] = rotation[3];
    result[5] = rotation[4];
    result[6] = rotation[5];
    result[7] = 0;
    result[8] = rotation[6];
    result[9] = rotation[7];
    result[10] = rotation[8];
    result[11] = 0;
    result[12] = 0;
    result[13] = 0;
    result[14] = 0;
    result[15] = 1;
    return result;
  }
  /**
   * Computes a Matrix4 instance from a Camera.
   *
   * @deprecated This method has been deprecated and will be removed in Cesium 1.151. Use {@link Camera#viewMatrix} instead.
   *
   * @param {CameraLike} camera The camera to use.
   * @param {Matrix4} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
   */
  static fromCamera(camera, result) {
    deprecationWarning_default(
      "Matrix4.fromCamera",
      "This method has been deprecated and will be removed in Cesium 1.151. Use Camera.prototype.viewMatrix instead."
    );
    Check_default.typeOf.object("camera", camera);
    const position = camera.position;
    const direction = camera.direction;
    const up = camera.up;
    Check_default.typeOf.object("camera.position", position);
    Check_default.typeOf.object("camera.direction", direction);
    Check_default.typeOf.object("camera.up", up);
    Cartesian3_default.normalize(direction, fromCameraF);
    Cartesian3_default.normalize(
      Cartesian3_default.cross(fromCameraF, up, fromCameraR),
      fromCameraR
    );
    Cartesian3_default.normalize(
      Cartesian3_default.cross(fromCameraR, fromCameraF, fromCameraU),
      fromCameraU
    );
    const sX = fromCameraR.x;
    const sY = fromCameraR.y;
    const sZ = fromCameraR.z;
    const fX = fromCameraF.x;
    const fY = fromCameraF.y;
    const fZ = fromCameraF.z;
    const uX = fromCameraU.x;
    const uY = fromCameraU.y;
    const uZ = fromCameraU.z;
    const positionX = position.x;
    const positionY = position.y;
    const positionZ = position.z;
    const t0 = sX * -positionX + sY * -positionY + sZ * -positionZ;
    const t1 = uX * -positionX + uY * -positionY + uZ * -positionZ;
    const t2 = fX * positionX + fY * positionY + fZ * positionZ;
    if (!defined_default(result)) {
      return new _Matrix4(
        sX,
        sY,
        sZ,
        t0,
        uX,
        uY,
        uZ,
        t1,
        -fX,
        -fY,
        -fZ,
        t2,
        0,
        0,
        0,
        1
      );
    }
    result[0] = sX;
    result[1] = uX;
    result[2] = -fX;
    result[3] = 0;
    result[4] = sY;
    result[5] = uY;
    result[6] = -fY;
    result[7] = 0;
    result[8] = sZ;
    result[9] = uZ;
    result[10] = -fZ;
    result[11] = 0;
    result[12] = t0;
    result[13] = t1;
    result[14] = t2;
    result[15] = 1;
    return result;
  }
  /**
   * Computes a Matrix4 instance representing a perspective transformation matrix.
   *
   * @param {number} fovY The field of view along the Y axis in radians.
   * @param {number} aspectRatio The aspect ratio.
   * @param {number} near The distance to the near plane in meters.
   * @param {number} far The distance to the far plane in meters.
   * @param {Matrix4} result The object in which the result will be stored.
   * @returns {Matrix4} The modified result parameter.
   *
   * @exception {DeveloperError} fovY must be in (0, PI].
   * @exception {DeveloperError} aspectRatio must be greater than zero.
   * @exception {DeveloperError} near must be greater than zero.
   * @exception {DeveloperError} far must be greater than zero.
   */
  static computePerspectiveFieldOfView(fovY, aspectRatio, near, far, result) {
    Check_default.typeOf.number.greaterThan("fovY", fovY, 0);
    Check_default.typeOf.number.lessThan("fovY", fovY, Math.PI);
    Check_default.typeOf.number.greaterThan("near", near, 0);
    Check_default.typeOf.number.greaterThan("far", far, 0);
    Check_default.typeOf.object("result", result);
    const bottom = Math.tan(fovY * 0.5);
    const column1Row1 = 1 / bottom;
    const column0Row0 = column1Row1 / aspectRatio;
    const column2Row2 = (far + near) / (near - far);
    const column3Row2 = 2 * far * near / (near - far);
    result[0] = column0Row0;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = 0;
    result[5] = column1Row1;
    result[6] = 0;
    result[7] = 0;
    result[8] = 0;
    result[9] = 0;
    result[10] = column2Row2;
    result[11] = -1;
    result[12] = 0;
    result[13] = 0;
    result[14] = column3Row2;
    result[15] = 0;
    return result;
  }
  /**
   * Computes a Matrix4 instance representing an orthographic transformation matrix.
   *
   * @param {number} left The number of meters to the left of the camera that will be in view.
   * @param {number} right The number of meters to the right of the camera that will be in view.
   * @param {number} bottom The number of meters below of the camera that will be in view.
   * @param {number} top The number of meters above of the camera that will be in view.
   * @param {number} near The distance to the near plane in meters.
   * @param {number} far The distance to the far plane in meters.
   * @param {Matrix4} result The object in which the result will be stored.
   * @returns {Matrix4} The modified result parameter.
   */
  static computeOrthographicOffCenter(left, right, bottom, top, near, far, result) {
    Check_default.typeOf.number("left", left);
    Check_default.typeOf.number("right", right);
    Check_default.typeOf.number("bottom", bottom);
    Check_default.typeOf.number("top", top);
    Check_default.typeOf.number("near", near);
    Check_default.typeOf.number("far", far);
    Check_default.typeOf.object("result", result);
    let a = 1 / (right - left);
    let b = 1 / (top - bottom);
    let c = 1 / (far - near);
    const tx = -(right + left) * a;
    const ty = -(top + bottom) * b;
    const tz = -(far + near) * c;
    a *= 2;
    b *= 2;
    c *= -2;
    result[0] = a;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = 0;
    result[5] = b;
    result[6] = 0;
    result[7] = 0;
    result[8] = 0;
    result[9] = 0;
    result[10] = c;
    result[11] = 0;
    result[12] = tx;
    result[13] = ty;
    result[14] = tz;
    result[15] = 1;
    return result;
  }
  /**
   * Computes a Matrix4 instance representing an off center perspective transformation.
   *
   * @param {number} left The number of meters to the left of the camera that will be in view.
   * @param {number} right The number of meters to the right of the camera that will be in view.
   * @param {number} bottom The number of meters below the camera that will be in view.
   * @param {number} top The number of meters above the camera that will be in view.
   * @param {number} near The distance to the near plane in meters.
   * @param {number} far The distance to the far plane in meters.
   * @param {Matrix4} result The object in which the result will be stored.
   * @returns {Matrix4} The modified result parameter.
   */
  static computePerspectiveOffCenter(left, right, bottom, top, near, far, result) {
    Check_default.typeOf.number("left", left);
    Check_default.typeOf.number("right", right);
    Check_default.typeOf.number("bottom", bottom);
    Check_default.typeOf.number("top", top);
    Check_default.typeOf.number("near", near);
    Check_default.typeOf.number("far", far);
    Check_default.typeOf.object("result", result);
    const column0Row0 = 2 * near / (right - left);
    const column1Row1 = 2 * near / (top - bottom);
    const column2Row0 = (right + left) / (right - left);
    const column2Row1 = (top + bottom) / (top - bottom);
    const column2Row2 = -(far + near) / (far - near);
    const column2Row3 = -1;
    const column3Row2 = -2 * far * near / (far - near);
    result[0] = column0Row0;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = 0;
    result[5] = column1Row1;
    result[6] = 0;
    result[7] = 0;
    result[8] = column2Row0;
    result[9] = column2Row1;
    result[10] = column2Row2;
    result[11] = column2Row3;
    result[12] = 0;
    result[13] = 0;
    result[14] = column3Row2;
    result[15] = 0;
    return result;
  }
  /**
   * Computes a Matrix4 instance representing an infinite off center perspective transformation.
   *
   * @param {number} left The number of meters to the left of the camera that will be in view.
   * @param {number} right The number of meters to the right of the camera that will be in view.
   * @param {number} bottom The number of meters below of the camera that will be in view.
   * @param {number} top The number of meters above of the camera that will be in view.
   * @param {number} near The distance to the near plane in meters.
   * @param {Matrix4} result The object in which the result will be stored.
   * @returns {Matrix4} The modified result parameter.
   */
  static computeInfinitePerspectiveOffCenter(left, right, bottom, top, near, result) {
    Check_default.typeOf.number("left", left);
    Check_default.typeOf.number("right", right);
    Check_default.typeOf.number("bottom", bottom);
    Check_default.typeOf.number("top", top);
    Check_default.typeOf.number("near", near);
    Check_default.typeOf.object("result", result);
    const column0Row0 = 2 * near / (right - left);
    const column1Row1 = 2 * near / (top - bottom);
    const column2Row0 = (right + left) / (right - left);
    const column2Row1 = (top + bottom) / (top - bottom);
    const column2Row2 = -1;
    const column2Row3 = -1;
    const column3Row2 = -2 * near;
    result[0] = column0Row0;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = 0;
    result[5] = column1Row1;
    result[6] = 0;
    result[7] = 0;
    result[8] = column2Row0;
    result[9] = column2Row1;
    result[10] = column2Row2;
    result[11] = column2Row3;
    result[12] = 0;
    result[13] = 0;
    result[14] = column3Row2;
    result[15] = 0;
    return result;
  }
  /**
   * Computes a Matrix4 instance that transforms from normalized device coordinates to window coordinates.
   *
   * @param {Viewport} [viewport = { x : 0.0, y : 0.0, width : 0.0, height : 0.0 }] The viewport's corners as shown in Example 1.
   * @param {number} [nearDepthRange=0.0] The near plane distance in window coordinates.
   * @param {number} [farDepthRange=1.0] The far plane distance in window coordinates.
   * @param {Matrix4} [result] The object in which the result will be stored.
   * @returns {Matrix4} The modified result parameter.
   *
   * @example
   * // Create viewport transformation using an explicit viewport and depth range.
   * const m = Cesium.Matrix4.computeViewportTransformation({
   *     x : 0.0,
   *     y : 0.0,
   *     width : 1024.0,
   *     height : 768.0
   * }, 0.0, 1.0, new Cesium.Matrix4());
   */
  static computeViewportTransformation(viewport, nearDepthRange, farDepthRange, result) {
    if (!defined_default(result)) {
      result = new _Matrix4();
    }
    viewport = viewport ?? Frozen_default.EMPTY_OBJECT;
    const x = viewport.x ?? 0;
    const y = viewport.y ?? 0;
    const width = viewport.width ?? 0;
    const height = viewport.height ?? 0;
    nearDepthRange = nearDepthRange ?? 0;
    farDepthRange = farDepthRange ?? 1;
    const halfWidth = width * 0.5;
    const halfHeight = height * 0.5;
    const halfDepth = (farDepthRange - nearDepthRange) * 0.5;
    const column0Row0 = halfWidth;
    const column1Row1 = halfHeight;
    const column2Row2 = halfDepth;
    const column3Row0 = x + halfWidth;
    const column3Row1 = y + halfHeight;
    const column3Row2 = nearDepthRange + halfDepth;
    const column3Row3 = 1;
    result[0] = column0Row0;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = 0;
    result[5] = column1Row1;
    result[6] = 0;
    result[7] = 0;
    result[8] = 0;
    result[9] = 0;
    result[10] = column2Row2;
    result[11] = 0;
    result[12] = column3Row0;
    result[13] = column3Row1;
    result[14] = column3Row2;
    result[15] = column3Row3;
    return result;
  }
  /**
   * Computes a Matrix4 instance that transforms from world space to view space.
   *
   * @param {Cartesian3} position The position of the camera.
   * @param {Cartesian3} direction The forward direction.
   * @param {Cartesian3} up The up direction.
   * @param {Cartesian3} right The right direction.
   * @param {Matrix4} result The object in which the result will be stored.
   * @returns {Matrix4} The modified result parameter.
   */
  static computeView(position, direction, up, right, result) {
    Check_default.typeOf.object("position", position);
    Check_default.typeOf.object("direction", direction);
    Check_default.typeOf.object("up", up);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result[0] = right.x;
    result[1] = up.x;
    result[2] = -direction.x;
    result[3] = 0;
    result[4] = right.y;
    result[5] = up.y;
    result[6] = -direction.y;
    result[7] = 0;
    result[8] = right.z;
    result[9] = up.z;
    result[10] = -direction.z;
    result[11] = 0;
    result[12] = -Cartesian3_default.dot(right, position);
    result[13] = -Cartesian3_default.dot(up, position);
    result[14] = Cartesian3_default.dot(direction, position);
    result[15] = 1;
    return result;
  }
  /**
   * Computes an Array from the provided Matrix4 instance.
   * The array will be in column-major order.
   *
   * @param {Matrix4} matrix The matrix to use..
   * @param {number[]} [result] The Array onto which to store the result.
   * @returns {number[]} The modified Array parameter or a new Array instance if one was not provided.
   *
   * @example
   * //create an array from an instance of Matrix4
   * // m = [10.0, 14.0, 18.0, 22.0]
   * //     [11.0, 15.0, 19.0, 23.0]
   * //     [12.0, 16.0, 20.0, 24.0]
   * //     [13.0, 17.0, 21.0, 25.0]
   * const a = Cesium.Matrix4.toArray(m);
   *
   * // m remains the same
   * //creates a = [10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0, 25.0]
   */
  static toArray(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    if (!defined_default(result)) {
      return [
        matrix[0],
        matrix[1],
        matrix[2],
        matrix[3],
        matrix[4],
        matrix[5],
        matrix[6],
        matrix[7],
        matrix[8],
        matrix[9],
        matrix[10],
        matrix[11],
        matrix[12],
        matrix[13],
        matrix[14],
        matrix[15]
      ];
    }
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[3];
    result[4] = matrix[4];
    result[5] = matrix[5];
    result[6] = matrix[6];
    result[7] = matrix[7];
    result[8] = matrix[8];
    result[9] = matrix[9];
    result[10] = matrix[10];
    result[11] = matrix[11];
    result[12] = matrix[12];
    result[13] = matrix[13];
    result[14] = matrix[14];
    result[15] = matrix[15];
    return result;
  }
  /**
   * Computes the array index of the element at the provided row and column.
   *
   * @param {number} row The zero-based index of the row.
   * @param {number} column The zero-based index of the column.
   * @returns {number} The index of the element at the provided row and column.
   *
   * @exception {DeveloperError} row must be 0, 1, 2, or 3.
   * @exception {DeveloperError} column must be 0, 1, 2, or 3.
   *
   * @example
   * const myMatrix = new Cesium.Matrix4();
   * const column1Row0Index = Cesium.Matrix4.getElementIndex(1, 0);
   * const column1Row0 = myMatrix[column1Row0Index];
   * myMatrix[column1Row0Index] = 10.0;
   */
  static getElementIndex(column, row) {
    Check_default.typeOf.number.greaterThanOrEquals("row", row, 0);
    Check_default.typeOf.number.lessThanOrEquals("row", row, 3);
    Check_default.typeOf.number.greaterThanOrEquals("column", column, 0);
    Check_default.typeOf.number.lessThanOrEquals("column", column, 3);
    return column * 4 + row;
  }
  /**
   * Retrieves a copy of the matrix column at the provided index as a Cartesian4 instance.
   *
   * @param {Matrix4} matrix The matrix to use.
   * @param {number} index The zero-based index of the column to retrieve.
   * @param {Cartesian4} result The object onto which to store the result.
   * @returns {Cartesian4} The modified result parameter.
   *
   * @exception {DeveloperError} index must be 0, 1, 2, or 3.
   *
   * @example
   * //returns a Cartesian4 instance with values from the specified column
   * // m = [10.0, 11.0, 12.0, 13.0]
   * //     [14.0, 15.0, 16.0, 17.0]
   * //     [18.0, 19.0, 20.0, 21.0]
   * //     [22.0, 23.0, 24.0, 25.0]
   *
   * //Example 1: Creates an instance of Cartesian
   * const a = Cesium.Matrix4.getColumn(m, 2, new Cesium.Cartesian4());
   *
   * @example
   * //Example 2: Sets values for Cartesian instance
   * const a = new Cesium.Cartesian4();
   * Cesium.Matrix4.getColumn(m, 2, a);
   *
   * // a.x = 12.0; a.y = 16.0; a.z = 20.0; a.w = 24.0;
   */
  static getColumn(matrix, index, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number.greaterThanOrEquals("index", index, 0);
    Check_default.typeOf.number.lessThanOrEquals("index", index, 3);
    Check_default.typeOf.object("result", result);
    const startIndex = index * 4;
    const x = matrix[startIndex];
    const y = matrix[startIndex + 1];
    const z = matrix[startIndex + 2];
    const w = matrix[startIndex + 3];
    result.x = x;
    result.y = y;
    result.z = z;
    result.w = w;
    return result;
  }
  /**
   * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
   *
   * @param {Matrix4} matrix The matrix to use.
   * @param {number} index The zero-based index of the column to set.
   * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   *
   * @exception {DeveloperError} index must be 0, 1, 2, or 3.
   *
   * @example
   * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
   * // m = [10.0, 11.0, 12.0, 13.0]
   * //     [14.0, 15.0, 16.0, 17.0]
   * //     [18.0, 19.0, 20.0, 21.0]
   * //     [22.0, 23.0, 24.0, 25.0]
   *
   * const a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
   *
   * // m remains the same
   * // a = [10.0, 11.0, 99.0, 13.0]
   * //     [14.0, 15.0, 98.0, 17.0]
   * //     [18.0, 19.0, 97.0, 21.0]
   * //     [22.0, 23.0, 96.0, 25.0]
   */
  static setColumn(matrix, index, cartesian, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number.greaterThanOrEquals("index", index, 0);
    Check_default.typeOf.number.lessThanOrEquals("index", index, 3);
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    result = _Matrix4.clone(matrix, result);
    const startIndex = index * 4;
    result[startIndex] = cartesian.x;
    result[startIndex + 1] = cartesian.y;
    result[startIndex + 2] = cartesian.z;
    result[startIndex + 3] = cartesian.w;
    return result;
  }
  /**
   * Retrieves a copy of the matrix row at the provided index as a Cartesian4 instance.
   *
   * @param {Matrix4} matrix The matrix to use.
   * @param {number} index The zero-based index of the row to retrieve.
   * @param {Cartesian4} result The object onto which to store the result.
   * @returns {Cartesian4} The modified result parameter.
   *
   * @exception {DeveloperError} index must be 0, 1, 2, or 3.
   *
   * @example
   * //returns a Cartesian4 instance with values from the specified column
   * // m = [10.0, 11.0, 12.0, 13.0]
   * //     [14.0, 15.0, 16.0, 17.0]
   * //     [18.0, 19.0, 20.0, 21.0]
   * //     [22.0, 23.0, 24.0, 25.0]
   *
   * //Example 1: Returns an instance of Cartesian
   * const a = Cesium.Matrix4.getRow(m, 2, new Cesium.Cartesian4());
   *
   * @example
   * //Example 2: Sets values for a Cartesian instance
   * const a = new Cesium.Cartesian4();
   * Cesium.Matrix4.getRow(m, 2, a);
   *
   * // a.x = 18.0; a.y = 19.0; a.z = 20.0; a.w = 21.0;
   */
  static getRow(matrix, index, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number.greaterThanOrEquals("index", index, 0);
    Check_default.typeOf.number.lessThanOrEquals("index", index, 3);
    Check_default.typeOf.object("result", result);
    const x = matrix[index];
    const y = matrix[index + 4];
    const z = matrix[index + 8];
    const w = matrix[index + 12];
    result.x = x;
    result.y = y;
    result.z = z;
    result.w = w;
    return result;
  }
  /**
   * Computes a new matrix that replaces the specified row in the provided matrix with the provided Cartesian4 instance.
   *
   * @param {Matrix4} matrix The matrix to use.
   * @param {number} index The zero-based index of the row to set.
   * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified row.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   *
   * @exception {DeveloperError} index must be 0, 1, 2, or 3.
   *
   * @example
   * //create a new Matrix4 instance with new row values from the Cartesian4 instance
   * // m = [10.0, 11.0, 12.0, 13.0]
   * //     [14.0, 15.0, 16.0, 17.0]
   * //     [18.0, 19.0, 20.0, 21.0]
   * //     [22.0, 23.0, 24.0, 25.0]
   *
   * const a = Cesium.Matrix4.setRow(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
   *
   * // m remains the same
   * // a = [10.0, 11.0, 12.0, 13.0]
   * //     [14.0, 15.0, 16.0, 17.0]
   * //     [99.0, 98.0, 97.0, 96.0]
   * //     [22.0, 23.0, 24.0, 25.0]
   */
  static setRow(matrix, index, cartesian, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number.greaterThanOrEquals("index", index, 0);
    Check_default.typeOf.number.lessThanOrEquals("index", index, 3);
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    result = _Matrix4.clone(matrix, result);
    result[index] = cartesian.x;
    result[index + 4] = cartesian.y;
    result[index + 8] = cartesian.z;
    result[index + 12] = cartesian.w;
    return result;
  }
  /**
   * Computes a new matrix that replaces the translation in the rightmost column of the provided
   * matrix with the provided translation. This assumes the matrix is an affine transformation.
   *
   * @param {Matrix4} matrix The matrix to use.
   * @param {Cartesian3} translation The translation that replaces the translation of the provided matrix.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   */
  static setTranslation(matrix, translation, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("translation", translation);
    Check_default.typeOf.object("result", result);
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[3];
    result[4] = matrix[4];
    result[5] = matrix[5];
    result[6] = matrix[6];
    result[7] = matrix[7];
    result[8] = matrix[8];
    result[9] = matrix[9];
    result[10] = matrix[10];
    result[11] = matrix[11];
    result[12] = translation.x;
    result[13] = translation.y;
    result[14] = translation.z;
    result[15] = matrix[15];
    return result;
  }
  /**
   * Computes a new matrix that replaces the scale with the provided scale.
   * This assumes the matrix is an affine transformation.
   *
   * @param {Matrix4} matrix The matrix to use.
   * @param {Cartesian3} scale The scale that replaces the scale of the provided matrix.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   *
   * @see Matrix4.setUniformScale
   * @see Matrix4.fromScale
   * @see Matrix4.fromUniformScale
   * @see Matrix4.multiplyByScale
   * @see Matrix4.multiplyByUniformScale
   * @see Matrix4.getScale
   */
  static setScale(matrix, scale, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("scale", scale);
    Check_default.typeOf.object("result", result);
    const existingScale = _Matrix4.getScale(matrix, scaleScratch12);
    const scaleRatioX = scale.x / existingScale.x;
    const scaleRatioY = scale.y / existingScale.y;
    const scaleRatioZ = scale.z / existingScale.z;
    result[0] = matrix[0] * scaleRatioX;
    result[1] = matrix[1] * scaleRatioX;
    result[2] = matrix[2] * scaleRatioX;
    result[3] = matrix[3];
    result[4] = matrix[4] * scaleRatioY;
    result[5] = matrix[5] * scaleRatioY;
    result[6] = matrix[6] * scaleRatioY;
    result[7] = matrix[7];
    result[8] = matrix[8] * scaleRatioZ;
    result[9] = matrix[9] * scaleRatioZ;
    result[10] = matrix[10] * scaleRatioZ;
    result[11] = matrix[11];
    result[12] = matrix[12];
    result[13] = matrix[13];
    result[14] = matrix[14];
    result[15] = matrix[15];
    return result;
  }
  /**
   * Computes a new matrix that replaces the scale with the provided uniform scale.
   * This assumes the matrix is an affine transformation.
   *
   * @param {Matrix4} matrix The matrix to use.
   * @param {number} scale The uniform scale that replaces the scale of the provided matrix.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   *
   * @see Matrix4.setScale
   * @see Matrix4.fromScale
   * @see Matrix4.fromUniformScale
   * @see Matrix4.multiplyByScale
   * @see Matrix4.multiplyByUniformScale
   * @see Matrix4.getScale
   */
  static setUniformScale(matrix, scale, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number("scale", scale);
    Check_default.typeOf.object("result", result);
    const existingScale = _Matrix4.getScale(matrix, scaleScratch22);
    const scaleRatioX = scale / existingScale.x;
    const scaleRatioY = scale / existingScale.y;
    const scaleRatioZ = scale / existingScale.z;
    result[0] = matrix[0] * scaleRatioX;
    result[1] = matrix[1] * scaleRatioX;
    result[2] = matrix[2] * scaleRatioX;
    result[3] = matrix[3];
    result[4] = matrix[4] * scaleRatioY;
    result[5] = matrix[5] * scaleRatioY;
    result[6] = matrix[6] * scaleRatioY;
    result[7] = matrix[7];
    result[8] = matrix[8] * scaleRatioZ;
    result[9] = matrix[9] * scaleRatioZ;
    result[10] = matrix[10] * scaleRatioZ;
    result[11] = matrix[11];
    result[12] = matrix[12];
    result[13] = matrix[13];
    result[14] = matrix[14];
    result[15] = matrix[15];
    return result;
  }
  /**
   * Extracts the non-uniform scale assuming the matrix is an affine transformation.
   *
   * @param {Matrix4} matrix The matrix.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter
   *
   * @see Matrix4.multiplyByScale
   * @see Matrix4.multiplyByUniformScale
   * @see Matrix4.fromScale
   * @see Matrix4.fromUniformScale
   * @see Matrix4.setScale
   * @see Matrix4.setUniformScale
   */
  static getScale(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    result.x = Cartesian3_default.magnitude(
      Cartesian3_default.fromElements(matrix[0], matrix[1], matrix[2], scratchColumn2)
    );
    result.y = Cartesian3_default.magnitude(
      Cartesian3_default.fromElements(matrix[4], matrix[5], matrix[6], scratchColumn2)
    );
    result.z = Cartesian3_default.magnitude(
      Cartesian3_default.fromElements(matrix[8], matrix[9], matrix[10], scratchColumn2)
    );
    return result;
  }
  /**
   * Computes the maximum scale assuming the matrix is an affine transformation.
   * The maximum scale is the maximum length of the column vectors in the upper-left
   * 3x3 matrix.
   *
   * @param {Matrix4} matrix The matrix.
   * @returns {number} The maximum scale.
   */
  static getMaximumScale(matrix) {
    _Matrix4.getScale(matrix, scaleScratch32);
    return Cartesian3_default.maximumComponent(scaleScratch32);
  }
  /**
   * Sets the rotation assuming the matrix is an affine transformation.
   *
   * @param {Matrix4} matrix The matrix.
   * @param {Matrix3} rotation The rotation matrix.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   *
   * @see Matrix4.fromRotation
   * @see Matrix4.getRotation
   */
  static setRotation(matrix, rotation, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    const scale = _Matrix4.getScale(matrix, scaleScratch42);
    result[0] = rotation[0] * scale.x;
    result[1] = rotation[1] * scale.x;
    result[2] = rotation[2] * scale.x;
    result[3] = matrix[3];
    result[4] = rotation[3] * scale.y;
    result[5] = rotation[4] * scale.y;
    result[6] = rotation[5] * scale.y;
    result[7] = matrix[7];
    result[8] = rotation[6] * scale.z;
    result[9] = rotation[7] * scale.z;
    result[10] = rotation[8] * scale.z;
    result[11] = matrix[11];
    result[12] = matrix[12];
    result[13] = matrix[13];
    result[14] = matrix[14];
    result[15] = matrix[15];
    return result;
  }
  /**
   * Extracts the rotation matrix assuming the matrix is an affine transformation.
   *
   * @param {Matrix4} matrix The matrix.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   *
   * @see Matrix4.setRotation
   * @see Matrix4.fromRotation
   */
  static getRotation(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    const scale = _Matrix4.getScale(matrix, scaleScratch52);
    result[0] = matrix[0] / scale.x;
    result[1] = matrix[1] / scale.x;
    result[2] = matrix[2] / scale.x;
    result[3] = matrix[4] / scale.y;
    result[4] = matrix[5] / scale.y;
    result[5] = matrix[6] / scale.y;
    result[6] = matrix[8] / scale.z;
    result[7] = matrix[9] / scale.z;
    result[8] = matrix[10] / scale.z;
    return result;
  }
  /**
   * Computes the product of two matrices.
   *
   * @param {Matrix4} left The first matrix.
   * @param {Matrix4} right The second matrix.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   */
  static multiply(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    const left0 = left[0];
    const left1 = left[1];
    const left2 = left[2];
    const left3 = left[3];
    const left4 = left[4];
    const left5 = left[5];
    const left6 = left[6];
    const left7 = left[7];
    const left8 = left[8];
    const left9 = left[9];
    const left10 = left[10];
    const left11 = left[11];
    const left12 = left[12];
    const left13 = left[13];
    const left14 = left[14];
    const left15 = left[15];
    const right0 = right[0];
    const right1 = right[1];
    const right2 = right[2];
    const right3 = right[3];
    const right4 = right[4];
    const right5 = right[5];
    const right6 = right[6];
    const right7 = right[7];
    const right8 = right[8];
    const right9 = right[9];
    const right10 = right[10];
    const right11 = right[11];
    const right12 = right[12];
    const right13 = right[13];
    const right14 = right[14];
    const right15 = right[15];
    const column0Row0 = left0 * right0 + left4 * right1 + left8 * right2 + left12 * right3;
    const column0Row1 = left1 * right0 + left5 * right1 + left9 * right2 + left13 * right3;
    const column0Row2 = left2 * right0 + left6 * right1 + left10 * right2 + left14 * right3;
    const column0Row3 = left3 * right0 + left7 * right1 + left11 * right2 + left15 * right3;
    const column1Row0 = left0 * right4 + left4 * right5 + left8 * right6 + left12 * right7;
    const column1Row1 = left1 * right4 + left5 * right5 + left9 * right6 + left13 * right7;
    const column1Row2 = left2 * right4 + left6 * right5 + left10 * right6 + left14 * right7;
    const column1Row3 = left3 * right4 + left7 * right5 + left11 * right6 + left15 * right7;
    const column2Row0 = left0 * right8 + left4 * right9 + left8 * right10 + left12 * right11;
    const column2Row1 = left1 * right8 + left5 * right9 + left9 * right10 + left13 * right11;
    const column2Row2 = left2 * right8 + left6 * right9 + left10 * right10 + left14 * right11;
    const column2Row3 = left3 * right8 + left7 * right9 + left11 * right10 + left15 * right11;
    const column3Row0 = left0 * right12 + left4 * right13 + left8 * right14 + left12 * right15;
    const column3Row1 = left1 * right12 + left5 * right13 + left9 * right14 + left13 * right15;
    const column3Row2 = left2 * right12 + left6 * right13 + left10 * right14 + left14 * right15;
    const column3Row3 = left3 * right12 + left7 * right13 + left11 * right14 + left15 * right15;
    result[0] = column0Row0;
    result[1] = column0Row1;
    result[2] = column0Row2;
    result[3] = column0Row3;
    result[4] = column1Row0;
    result[5] = column1Row1;
    result[6] = column1Row2;
    result[7] = column1Row3;
    result[8] = column2Row0;
    result[9] = column2Row1;
    result[10] = column2Row2;
    result[11] = column2Row3;
    result[12] = column3Row0;
    result[13] = column3Row1;
    result[14] = column3Row2;
    result[15] = column3Row3;
    return result;
  }
  /**
   * Computes the sum of two matrices.
   *
   * @param {Matrix4} left The first matrix.
   * @param {Matrix4} right The second matrix.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   */
  static add(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result[0] = left[0] + right[0];
    result[1] = left[1] + right[1];
    result[2] = left[2] + right[2];
    result[3] = left[3] + right[3];
    result[4] = left[4] + right[4];
    result[5] = left[5] + right[5];
    result[6] = left[6] + right[6];
    result[7] = left[7] + right[7];
    result[8] = left[8] + right[8];
    result[9] = left[9] + right[9];
    result[10] = left[10] + right[10];
    result[11] = left[11] + right[11];
    result[12] = left[12] + right[12];
    result[13] = left[13] + right[13];
    result[14] = left[14] + right[14];
    result[15] = left[15] + right[15];
    return result;
  }
  /**
   * Computes the difference of two matrices.
   *
   * @param {Matrix4} left The first matrix.
   * @param {Matrix4} right The second matrix.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   */
  static subtract(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result[0] = left[0] - right[0];
    result[1] = left[1] - right[1];
    result[2] = left[2] - right[2];
    result[3] = left[3] - right[3];
    result[4] = left[4] - right[4];
    result[5] = left[5] - right[5];
    result[6] = left[6] - right[6];
    result[7] = left[7] - right[7];
    result[8] = left[8] - right[8];
    result[9] = left[9] - right[9];
    result[10] = left[10] - right[10];
    result[11] = left[11] - right[11];
    result[12] = left[12] - right[12];
    result[13] = left[13] - right[13];
    result[14] = left[14] - right[14];
    result[15] = left[15] - right[15];
    return result;
  }
  /**
   * Computes the product of two matrices assuming the matrices are affine transformation matrices,
   * where the upper left 3x3 elements are any matrix, and
   * the upper three elements in the fourth column are the translation.
   * The bottom row is assumed to be [0, 0, 0, 1].
   * The matrix is not verified to be in the proper form.
   * This method is faster than computing the product for general 4x4
   * matrices using {@link Matrix4.multiply}.
   *
   * @param {Matrix4} left The first matrix.
   * @param {Matrix4} right The second matrix.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   *
   * @example
   * const m1 = new Cesium.Matrix4(1.0, 6.0, 7.0, 0.0, 2.0, 5.0, 8.0, 0.0, 3.0, 4.0, 9.0, 0.0, 0.0, 0.0, 0.0, 1.0);
   * const m2 = Cesium.Transforms.eastNorthUpToFixedFrame(new Cesium.Cartesian3(1.0, 1.0, 1.0));
   * const m3 = Cesium.Matrix4.multiplyTransformation(m1, m2, new Cesium.Matrix4());
   */
  static multiplyTransformation(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    const left0 = left[0];
    const left1 = left[1];
    const left2 = left[2];
    const left4 = left[4];
    const left5 = left[5];
    const left6 = left[6];
    const left8 = left[8];
    const left9 = left[9];
    const left10 = left[10];
    const left12 = left[12];
    const left13 = left[13];
    const left14 = left[14];
    const right0 = right[0];
    const right1 = right[1];
    const right2 = right[2];
    const right4 = right[4];
    const right5 = right[5];
    const right6 = right[6];
    const right8 = right[8];
    const right9 = right[9];
    const right10 = right[10];
    const right12 = right[12];
    const right13 = right[13];
    const right14 = right[14];
    const column0Row0 = left0 * right0 + left4 * right1 + left8 * right2;
    const column0Row1 = left1 * right0 + left5 * right1 + left9 * right2;
    const column0Row2 = left2 * right0 + left6 * right1 + left10 * right2;
    const column1Row0 = left0 * right4 + left4 * right5 + left8 * right6;
    const column1Row1 = left1 * right4 + left5 * right5 + left9 * right6;
    const column1Row2 = left2 * right4 + left6 * right5 + left10 * right6;
    const column2Row0 = left0 * right8 + left4 * right9 + left8 * right10;
    const column2Row1 = left1 * right8 + left5 * right9 + left9 * right10;
    const column2Row2 = left2 * right8 + left6 * right9 + left10 * right10;
    const column3Row0 = left0 * right12 + left4 * right13 + left8 * right14 + left12;
    const column3Row1 = left1 * right12 + left5 * right13 + left9 * right14 + left13;
    const column3Row2 = left2 * right12 + left6 * right13 + left10 * right14 + left14;
    result[0] = column0Row0;
    result[1] = column0Row1;
    result[2] = column0Row2;
    result[3] = 0;
    result[4] = column1Row0;
    result[5] = column1Row1;
    result[6] = column1Row2;
    result[7] = 0;
    result[8] = column2Row0;
    result[9] = column2Row1;
    result[10] = column2Row2;
    result[11] = 0;
    result[12] = column3Row0;
    result[13] = column3Row1;
    result[14] = column3Row2;
    result[15] = 1;
    return result;
  }
  /**
   * Multiplies a transformation matrix (with a bottom row of <code>[0.0, 0.0, 0.0, 1.0]</code>)
   * by a 3x3 rotation matrix.  This is an optimization
   * for <code>Matrix4.multiply(m, Matrix4.fromRotationTranslation(rotation), m);</code> with less allocations and arithmetic operations.
   *
   * @param {Matrix4} matrix The matrix on the left-hand side.
   * @param {Matrix3} rotation The 3x3 rotation matrix on the right-hand side.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   *
   * @example
   * // Instead of Cesium.Matrix4.multiply(m, Cesium.Matrix4.fromRotationTranslation(rotation), m);
   * Cesium.Matrix4.multiplyByMatrix3(m, rotation, m);
   */
  static multiplyByMatrix3(matrix, rotation, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("rotation", rotation);
    Check_default.typeOf.object("result", result);
    const left0 = matrix[0];
    const left1 = matrix[1];
    const left2 = matrix[2];
    const left4 = matrix[4];
    const left5 = matrix[5];
    const left6 = matrix[6];
    const left8 = matrix[8];
    const left9 = matrix[9];
    const left10 = matrix[10];
    const right0 = rotation[0];
    const right1 = rotation[1];
    const right2 = rotation[2];
    const right4 = rotation[3];
    const right5 = rotation[4];
    const right6 = rotation[5];
    const right8 = rotation[6];
    const right9 = rotation[7];
    const right10 = rotation[8];
    const column0Row0 = left0 * right0 + left4 * right1 + left8 * right2;
    const column0Row1 = left1 * right0 + left5 * right1 + left9 * right2;
    const column0Row2 = left2 * right0 + left6 * right1 + left10 * right2;
    const column1Row0 = left0 * right4 + left4 * right5 + left8 * right6;
    const column1Row1 = left1 * right4 + left5 * right5 + left9 * right6;
    const column1Row2 = left2 * right4 + left6 * right5 + left10 * right6;
    const column2Row0 = left0 * right8 + left4 * right9 + left8 * right10;
    const column2Row1 = left1 * right8 + left5 * right9 + left9 * right10;
    const column2Row2 = left2 * right8 + left6 * right9 + left10 * right10;
    result[0] = column0Row0;
    result[1] = column0Row1;
    result[2] = column0Row2;
    result[3] = 0;
    result[4] = column1Row0;
    result[5] = column1Row1;
    result[6] = column1Row2;
    result[7] = 0;
    result[8] = column2Row0;
    result[9] = column2Row1;
    result[10] = column2Row2;
    result[11] = 0;
    result[12] = matrix[12];
    result[13] = matrix[13];
    result[14] = matrix[14];
    result[15] = matrix[15];
    return result;
  }
  /**
   * Multiplies a transformation matrix (with a bottom row of <code>[0.0, 0.0, 0.0, 1.0]</code>)
   * by an implicit translation matrix defined by a {@link Cartesian3}.  This is an optimization
   * for <code>Matrix4.multiply(m, Matrix4.fromTranslation(position), m);</code> with less allocations and arithmetic operations.
   *
   * @param {Matrix4} matrix The matrix on the left-hand side.
   * @param {Cartesian3} translation The translation on the right-hand side.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   *
   * @example
   * // Instead of Cesium.Matrix4.multiply(m, Cesium.Matrix4.fromTranslation(position), m);
   * Cesium.Matrix4.multiplyByTranslation(m, position, m);
   */
  static multiplyByTranslation(matrix, translation, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("translation", translation);
    Check_default.typeOf.object("result", result);
    const x = translation.x;
    const y = translation.y;
    const z = translation.z;
    const tx = x * matrix[0] + y * matrix[4] + z * matrix[8] + matrix[12];
    const ty = x * matrix[1] + y * matrix[5] + z * matrix[9] + matrix[13];
    const tz = x * matrix[2] + y * matrix[6] + z * matrix[10] + matrix[14];
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[3];
    result[4] = matrix[4];
    result[5] = matrix[5];
    result[6] = matrix[6];
    result[7] = matrix[7];
    result[8] = matrix[8];
    result[9] = matrix[9];
    result[10] = matrix[10];
    result[11] = matrix[11];
    result[12] = tx;
    result[13] = ty;
    result[14] = tz;
    result[15] = matrix[15];
    return result;
  }
  /**
   * Multiplies an affine transformation matrix (with a bottom row of <code>[0.0, 0.0, 0.0, 1.0]</code>)
   * by an implicit non-uniform scale matrix. This is an optimization
   * for <code>Matrix4.multiply(m, Matrix4.fromUniformScale(scale), m);</code>, where
   * <code>m</code> must be an affine matrix.
   * This function performs fewer allocations and arithmetic operations.
   *
   * @param {Matrix4} matrix The affine matrix on the left-hand side.
   * @param {Cartesian3} scale The non-uniform scale on the right-hand side.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   *
   *
   * @example
   * // Instead of Cesium.Matrix4.multiply(m, Cesium.Matrix4.fromScale(scale), m);
   * Cesium.Matrix4.multiplyByScale(m, scale, m);
   *
   * @see Matrix4.multiplyByUniformScale
   * @see Matrix4.fromScale
   * @see Matrix4.fromUniformScale
   * @see Matrix4.setScale
   * @see Matrix4.setUniformScale
   * @see Matrix4.getScale
   */
  static multiplyByScale(matrix, scale, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("scale", scale);
    Check_default.typeOf.object("result", result);
    const scaleX = scale.x;
    const scaleY = scale.y;
    const scaleZ = scale.z;
    if (scaleX === 1 && scaleY === 1 && scaleZ === 1) {
      return _Matrix4.clone(matrix, result);
    }
    result[0] = scaleX * matrix[0];
    result[1] = scaleX * matrix[1];
    result[2] = scaleX * matrix[2];
    result[3] = matrix[3];
    result[4] = scaleY * matrix[4];
    result[5] = scaleY * matrix[5];
    result[6] = scaleY * matrix[6];
    result[7] = matrix[7];
    result[8] = scaleZ * matrix[8];
    result[9] = scaleZ * matrix[9];
    result[10] = scaleZ * matrix[10];
    result[11] = matrix[11];
    result[12] = matrix[12];
    result[13] = matrix[13];
    result[14] = matrix[14];
    result[15] = matrix[15];
    return result;
  }
  /**
   * Computes the product of a matrix times a uniform scale, as if the scale were a scale matrix.
   *
   * @param {Matrix4} matrix The matrix on the left-hand side.
   * @param {number} scale The uniform scale on the right-hand side.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   *
   * @example
   * // Instead of Cesium.Matrix4.multiply(m, Cesium.Matrix4.fromUniformScale(scale), m);
   * Cesium.Matrix4.multiplyByUniformScale(m, scale, m);
   *
   * @see Matrix4.multiplyByScale
   * @see Matrix4.fromScale
   * @see Matrix4.fromUniformScale
   * @see Matrix4.setScale
   * @see Matrix4.setUniformScale
   * @see Matrix4.getScale
   */
  static multiplyByUniformScale(matrix, scale, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number("scale", scale);
    Check_default.typeOf.object("result", result);
    result[0] = matrix[0] * scale;
    result[1] = matrix[1] * scale;
    result[2] = matrix[2] * scale;
    result[3] = matrix[3];
    result[4] = matrix[4] * scale;
    result[5] = matrix[5] * scale;
    result[6] = matrix[6] * scale;
    result[7] = matrix[7];
    result[8] = matrix[8] * scale;
    result[9] = matrix[9] * scale;
    result[10] = matrix[10] * scale;
    result[11] = matrix[11];
    result[12] = matrix[12];
    result[13] = matrix[13];
    result[14] = matrix[14];
    result[15] = matrix[15];
    return result;
  }
  /**
   * Computes the product of a matrix and a column vector.
   *
   * @param {Matrix4} matrix The matrix.
   * @param {Cartesian4} cartesian The vector.
   * @param {Cartesian4} result The object onto which to store the result.
   * @returns {Cartesian4} The modified result parameter.
   */
  static multiplyByVector(matrix, cartesian, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    const vX = cartesian.x;
    const vY = cartesian.y;
    const vZ = cartesian.z;
    const vW = cartesian.w;
    const x = matrix[0] * vX + matrix[4] * vY + matrix[8] * vZ + matrix[12] * vW;
    const y = matrix[1] * vX + matrix[5] * vY + matrix[9] * vZ + matrix[13] * vW;
    const z = matrix[2] * vX + matrix[6] * vY + matrix[10] * vZ + matrix[14] * vW;
    const w = matrix[3] * vX + matrix[7] * vY + matrix[11] * vZ + matrix[15] * vW;
    result.x = x;
    result.y = y;
    result.z = z;
    result.w = w;
    return result;
  }
  /**
   * Computes the product of a matrix and a {@link Cartesian3}.  This is equivalent to calling {@link Matrix4.multiplyByVector}
   * with a {@link Cartesian4} with a <code>w</code> component of zero.
   *
   * @param {Matrix4} matrix The matrix.
   * @param {Cartesian3} cartesian The point.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter.
   *
   * @example
   * const p = new Cesium.Cartesian3(1.0, 2.0, 3.0);
   * const result = Cesium.Matrix4.multiplyByPointAsVector(matrix, p, new Cesium.Cartesian3());
   * // A shortcut for
   * //   Cartesian3 p = ...
   * //   Cesium.Matrix4.multiplyByVector(matrix, new Cesium.Cartesian4(p.x, p.y, p.z, 0.0), result);
   */
  static multiplyByPointAsVector(matrix, cartesian, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    const vX = cartesian.x;
    const vY = cartesian.y;
    const vZ = cartesian.z;
    const x = matrix[0] * vX + matrix[4] * vY + matrix[8] * vZ;
    const y = matrix[1] * vX + matrix[5] * vY + matrix[9] * vZ;
    const z = matrix[2] * vX + matrix[6] * vY + matrix[10] * vZ;
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  }
  /**
   * Computes the product of a matrix and a {@link Cartesian3}. This is equivalent to calling {@link Matrix4.multiplyByVector}
   * with a {@link Cartesian4} with a <code>w</code> component of 1, but returns a {@link Cartesian3} instead of a {@link Cartesian4}.
   *
   * @param {Matrix4} matrix The matrix.
   * @param {Cartesian3} cartesian The point.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter.
   *
   * @example
   * const p = new Cesium.Cartesian3(1.0, 2.0, 3.0);
   * const result = Cesium.Matrix4.multiplyByPoint(matrix, p, new Cesium.Cartesian3());
   */
  static multiplyByPoint(matrix, cartesian, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    const vX = cartesian.x;
    const vY = cartesian.y;
    const vZ = cartesian.z;
    const x = matrix[0] * vX + matrix[4] * vY + matrix[8] * vZ + matrix[12];
    const y = matrix[1] * vX + matrix[5] * vY + matrix[9] * vZ + matrix[13];
    const z = matrix[2] * vX + matrix[6] * vY + matrix[10] * vZ + matrix[14];
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  }
  /**
   * Computes the product of a matrix and a scalar.
   *
   * @param {Matrix4} matrix The matrix.
   * @param {number} scalar The number to multiply by.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   *
   * @example
   * //create a Matrix4 instance which is a scaled version of the supplied Matrix4
   * // m = [10.0, 11.0, 12.0, 13.0]
   * //     [14.0, 15.0, 16.0, 17.0]
   * //     [18.0, 19.0, 20.0, 21.0]
   * //     [22.0, 23.0, 24.0, 25.0]
   *
   * const a = Cesium.Matrix4.multiplyByScalar(m, -2, new Cesium.Matrix4());
   *
   * // m remains the same
   * // a = [-20.0, -22.0, -24.0, -26.0]
   * //     [-28.0, -30.0, -32.0, -34.0]
   * //     [-36.0, -38.0, -40.0, -42.0]
   * //     [-44.0, -46.0, -48.0, -50.0]
   */
  static multiplyByScalar(matrix, scalar, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number("scalar", scalar);
    Check_default.typeOf.object("result", result);
    result[0] = matrix[0] * scalar;
    result[1] = matrix[1] * scalar;
    result[2] = matrix[2] * scalar;
    result[3] = matrix[3] * scalar;
    result[4] = matrix[4] * scalar;
    result[5] = matrix[5] * scalar;
    result[6] = matrix[6] * scalar;
    result[7] = matrix[7] * scalar;
    result[8] = matrix[8] * scalar;
    result[9] = matrix[9] * scalar;
    result[10] = matrix[10] * scalar;
    result[11] = matrix[11] * scalar;
    result[12] = matrix[12] * scalar;
    result[13] = matrix[13] * scalar;
    result[14] = matrix[14] * scalar;
    result[15] = matrix[15] * scalar;
    return result;
  }
  /**
   * Computes a negated copy of the provided matrix.
   *
   * @param {Matrix4} matrix The matrix to negate.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   *
   * @example
   * //create a new Matrix4 instance which is a negation of a Matrix4
   * // m = [10.0, 11.0, 12.0, 13.0]
   * //     [14.0, 15.0, 16.0, 17.0]
   * //     [18.0, 19.0, 20.0, 21.0]
   * //     [22.0, 23.0, 24.0, 25.0]
   *
   * const a = Cesium.Matrix4.negate(m, new Cesium.Matrix4());
   *
   * // m remains the same
   * // a = [-10.0, -11.0, -12.0, -13.0]
   * //     [-14.0, -15.0, -16.0, -17.0]
   * //     [-18.0, -19.0, -20.0, -21.0]
   * //     [-22.0, -23.0, -24.0, -25.0]
   */
  static negate(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    result[0] = -matrix[0];
    result[1] = -matrix[1];
    result[2] = -matrix[2];
    result[3] = -matrix[3];
    result[4] = -matrix[4];
    result[5] = -matrix[5];
    result[6] = -matrix[6];
    result[7] = -matrix[7];
    result[8] = -matrix[8];
    result[9] = -matrix[9];
    result[10] = -matrix[10];
    result[11] = -matrix[11];
    result[12] = -matrix[12];
    result[13] = -matrix[13];
    result[14] = -matrix[14];
    result[15] = -matrix[15];
    return result;
  }
  /**
   * Computes the transpose of the provided matrix.
   *
   * @param {Matrix4} matrix The matrix to transpose.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   *
   * @example
   * //returns transpose of a Matrix4
   * // m = [10.0, 11.0, 12.0, 13.0]
   * //     [14.0, 15.0, 16.0, 17.0]
   * //     [18.0, 19.0, 20.0, 21.0]
   * //     [22.0, 23.0, 24.0, 25.0]
   *
   * const a = Cesium.Matrix4.transpose(m, new Cesium.Matrix4());
   *
   * // m remains the same
   * // a = [10.0, 14.0, 18.0, 22.0]
   * //     [11.0, 15.0, 19.0, 23.0]
   * //     [12.0, 16.0, 20.0, 24.0]
   * //     [13.0, 17.0, 21.0, 25.0]
   */
  static transpose(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    const matrix1 = matrix[1];
    const matrix2 = matrix[2];
    const matrix3 = matrix[3];
    const matrix6 = matrix[6];
    const matrix7 = matrix[7];
    const matrix11 = matrix[11];
    result[0] = matrix[0];
    result[1] = matrix[4];
    result[2] = matrix[8];
    result[3] = matrix[12];
    result[4] = matrix1;
    result[5] = matrix[5];
    result[6] = matrix[9];
    result[7] = matrix[13];
    result[8] = matrix2;
    result[9] = matrix6;
    result[10] = matrix[10];
    result[11] = matrix[14];
    result[12] = matrix3;
    result[13] = matrix7;
    result[14] = matrix11;
    result[15] = matrix[15];
    return result;
  }
  /**
   * Computes a matrix, which contains the absolute (unsigned) values of the provided matrix's elements.
   *
   * @param {Matrix4} matrix The matrix with signed elements.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   */
  static abs(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    result[0] = Math.abs(matrix[0]);
    result[1] = Math.abs(matrix[1]);
    result[2] = Math.abs(matrix[2]);
    result[3] = Math.abs(matrix[3]);
    result[4] = Math.abs(matrix[4]);
    result[5] = Math.abs(matrix[5]);
    result[6] = Math.abs(matrix[6]);
    result[7] = Math.abs(matrix[7]);
    result[8] = Math.abs(matrix[8]);
    result[9] = Math.abs(matrix[9]);
    result[10] = Math.abs(matrix[10]);
    result[11] = Math.abs(matrix[11]);
    result[12] = Math.abs(matrix[12]);
    result[13] = Math.abs(matrix[13]);
    result[14] = Math.abs(matrix[14]);
    result[15] = Math.abs(matrix[15]);
    return result;
  }
  /**
   * Compares the provided matrices componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Matrix4} [left] The first matrix.
   * @param {Matrix4} [right] The second matrix.
   * @returns {boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
   *
   * @example
   * //compares two Matrix4 instances
   *
   * // a = [10.0, 14.0, 18.0, 22.0]
   * //     [11.0, 15.0, 19.0, 23.0]
   * //     [12.0, 16.0, 20.0, 24.0]
   * //     [13.0, 17.0, 21.0, 25.0]
   *
   * // b = [10.0, 14.0, 18.0, 22.0]
   * //     [11.0, 15.0, 19.0, 23.0]
   * //     [12.0, 16.0, 20.0, 24.0]
   * //     [13.0, 17.0, 21.0, 25.0]
   *
   * if(Cesium.Matrix4.equals(a,b)) {
   *      console.log("Both matrices are equal");
   * } else {
   *      console.log("They are not equal");
   * }
   *
   * //Prints "Both matrices are equal" on the console
   */
  static equals(left, right) {
    return left === right || defined_default(left) && defined_default(right) && // Translation
    left[12] === right[12] && left[13] === right[13] && left[14] === right[14] && // Rotation/scale
    left[0] === right[0] && left[1] === right[1] && left[2] === right[2] && left[4] === right[4] && left[5] === right[5] && left[6] === right[6] && left[8] === right[8] && left[9] === right[9] && left[10] === right[10] && // Bottom row
    left[3] === right[3] && left[7] === right[7] && left[11] === right[11] && left[15] === right[15];
  }
  /**
   * Compares the provided matrices componentwise and returns
   * <code>true</code> if they are within the provided epsilon,
   * <code>false</code> otherwise.
   *
   * @param {Matrix4} [left] The first matrix.
   * @param {Matrix4} [right] The second matrix.
   * @param {number} [epsilon=0] The epsilon to use for equality testing.
   * @returns {boolean} <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
   *
   * @example
   * //compares two Matrix4 instances
   *
   * // a = [10.5, 14.5, 18.5, 22.5]
   * //     [11.5, 15.5, 19.5, 23.5]
   * //     [12.5, 16.5, 20.5, 24.5]
   * //     [13.5, 17.5, 21.5, 25.5]
   *
   * // b = [10.0, 14.0, 18.0, 22.0]
   * //     [11.0, 15.0, 19.0, 23.0]
   * //     [12.0, 16.0, 20.0, 24.0]
   * //     [13.0, 17.0, 21.0, 25.0]
   *
   * if(Cesium.Matrix4.equalsEpsilon(a,b,0.1)){
   *      console.log("Difference between both the matrices is less than 0.1");
   * } else {
   *      console.log("Difference between both the matrices is not less than 0.1");
   * }
   *
   * //Prints "Difference between both the matrices is not less than 0.1" on the console
   */
  static equalsEpsilon(left, right, epsilon) {
    epsilon = epsilon ?? 0;
    return left === right || defined_default(left) && defined_default(right) && Math.abs(left[0] - right[0]) <= epsilon && Math.abs(left[1] - right[1]) <= epsilon && Math.abs(left[2] - right[2]) <= epsilon && Math.abs(left[3] - right[3]) <= epsilon && Math.abs(left[4] - right[4]) <= epsilon && Math.abs(left[5] - right[5]) <= epsilon && Math.abs(left[6] - right[6]) <= epsilon && Math.abs(left[7] - right[7]) <= epsilon && Math.abs(left[8] - right[8]) <= epsilon && Math.abs(left[9] - right[9]) <= epsilon && Math.abs(left[10] - right[10]) <= epsilon && Math.abs(left[11] - right[11]) <= epsilon && Math.abs(left[12] - right[12]) <= epsilon && Math.abs(left[13] - right[13]) <= epsilon && Math.abs(left[14] - right[14]) <= epsilon && Math.abs(left[15] - right[15]) <= epsilon;
  }
  /**
   * Gets the translation portion of the provided matrix, assuming the matrix is an affine transformation matrix.
   *
   * @param {Matrix4} matrix The matrix to use.
   * @param {Cartesian3} result The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter.
   */
  static getTranslation(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    result.x = matrix[12];
    result.y = matrix[13];
    result.z = matrix[14];
    return result;
  }
  /**
   * Gets the upper left 3x3 matrix of the provided matrix.
   *
   * @param {Matrix4} matrix The matrix to use.
   * @param {Matrix3} result The object onto which to store the result.
   * @returns {Matrix3} The modified result parameter.
   *
   * @example
   * // returns a Matrix3 instance from a Matrix4 instance
   *
   * // m = [10.0, 14.0, 18.0, 22.0]
   * //     [11.0, 15.0, 19.0, 23.0]
   * //     [12.0, 16.0, 20.0, 24.0]
   * //     [13.0, 17.0, 21.0, 25.0]
   *
   * const b = new Cesium.Matrix3();
   * Cesium.Matrix4.getMatrix3(m,b);
   *
   * // b = [10.0, 14.0, 18.0]
   * //     [11.0, 15.0, 19.0]
   * //     [12.0, 16.0, 20.0]
   */
  static getMatrix3(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[4];
    result[4] = matrix[5];
    result[5] = matrix[6];
    result[6] = matrix[8];
    result[7] = matrix[9];
    result[8] = matrix[10];
    return result;
  }
  /**
   * Computes the inverse of the provided matrix using Cramers Rule.
   * If the determinant is zero, the matrix can not be inverted, and an exception is thrown.
   * If the matrix is a proper rigid transformation, it is more efficient
   * to invert it with {@link Matrix4.inverseTransformation}.
   *
   * @param {Matrix4} matrix The matrix to invert.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   *
   * @exception {RuntimeError} matrix is not invertible because its determinate is zero.
   */
  static inverse(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    const src0 = matrix[0];
    const src1 = matrix[4];
    const src2 = matrix[8];
    const src3 = matrix[12];
    const src4 = matrix[1];
    const src5 = matrix[5];
    const src6 = matrix[9];
    const src7 = matrix[13];
    const src8 = matrix[2];
    const src9 = matrix[6];
    const src10 = matrix[10];
    const src11 = matrix[14];
    const src12 = matrix[3];
    const src13 = matrix[7];
    const src14 = matrix[11];
    const src15 = matrix[15];
    let tmp0 = src10 * src15;
    let tmp1 = src11 * src14;
    let tmp2 = src9 * src15;
    let tmp3 = src11 * src13;
    let tmp4 = src9 * src14;
    let tmp5 = src10 * src13;
    let tmp6 = src8 * src15;
    let tmp7 = src11 * src12;
    let tmp8 = src8 * src14;
    let tmp9 = src10 * src12;
    let tmp10 = src8 * src13;
    let tmp11 = src9 * src12;
    const dst0 = tmp0 * src5 + tmp3 * src6 + tmp4 * src7 - (tmp1 * src5 + tmp2 * src6 + tmp5 * src7);
    const dst1 = tmp1 * src4 + tmp6 * src6 + tmp9 * src7 - (tmp0 * src4 + tmp7 * src6 + tmp8 * src7);
    const dst2 = tmp2 * src4 + tmp7 * src5 + tmp10 * src7 - (tmp3 * src4 + tmp6 * src5 + tmp11 * src7);
    const dst3 = tmp5 * src4 + tmp8 * src5 + tmp11 * src6 - (tmp4 * src4 + tmp9 * src5 + tmp10 * src6);
    const dst4 = tmp1 * src1 + tmp2 * src2 + tmp5 * src3 - (tmp0 * src1 + tmp3 * src2 + tmp4 * src3);
    const dst5 = tmp0 * src0 + tmp7 * src2 + tmp8 * src3 - (tmp1 * src0 + tmp6 * src2 + tmp9 * src3);
    const dst6 = tmp3 * src0 + tmp6 * src1 + tmp11 * src3 - (tmp2 * src0 + tmp7 * src1 + tmp10 * src3);
    const dst7 = tmp4 * src0 + tmp9 * src1 + tmp10 * src2 - (tmp5 * src0 + tmp8 * src1 + tmp11 * src2);
    tmp0 = src2 * src7;
    tmp1 = src3 * src6;
    tmp2 = src1 * src7;
    tmp3 = src3 * src5;
    tmp4 = src1 * src6;
    tmp5 = src2 * src5;
    tmp6 = src0 * src7;
    tmp7 = src3 * src4;
    tmp8 = src0 * src6;
    tmp9 = src2 * src4;
    tmp10 = src0 * src5;
    tmp11 = src1 * src4;
    const dst8 = tmp0 * src13 + tmp3 * src14 + tmp4 * src15 - (tmp1 * src13 + tmp2 * src14 + tmp5 * src15);
    const dst9 = tmp1 * src12 + tmp6 * src14 + tmp9 * src15 - (tmp0 * src12 + tmp7 * src14 + tmp8 * src15);
    const dst10 = tmp2 * src12 + tmp7 * src13 + tmp10 * src15 - (tmp3 * src12 + tmp6 * src13 + tmp11 * src15);
    const dst11 = tmp5 * src12 + tmp8 * src13 + tmp11 * src14 - (tmp4 * src12 + tmp9 * src13 + tmp10 * src14);
    const dst12 = tmp2 * src10 + tmp5 * src11 + tmp1 * src9 - (tmp4 * src11 + tmp0 * src9 + tmp3 * src10);
    const dst13 = tmp8 * src11 + tmp0 * src8 + tmp7 * src10 - (tmp6 * src10 + tmp9 * src11 + tmp1 * src8);
    const dst14 = tmp6 * src9 + tmp11 * src11 + tmp3 * src8 - (tmp10 * src11 + tmp2 * src8 + tmp7 * src9);
    const dst15 = tmp10 * src10 + tmp4 * src8 + tmp9 * src9 - (tmp8 * src9 + tmp11 * src10 + tmp5 * src8);
    let det = src0 * dst0 + src1 * dst1 + src2 * dst2 + src3 * dst3;
    if (Math.abs(det) < Math_default.EPSILON21) {
      if (Matrix3_default.equalsEpsilon(
        _Matrix4.getMatrix3(matrix, scratchInverseRotation),
        scratchMatrix3Zero,
        Math_default.EPSILON7
      ) && Cartesian4_default.equals(
        _Matrix4.getRow(matrix, 3, scratchBottomRow),
        scratchExpectedBottomRow
      )) {
        result[0] = 0;
        result[1] = 0;
        result[2] = 0;
        result[3] = 0;
        result[4] = 0;
        result[5] = 0;
        result[6] = 0;
        result[7] = 0;
        result[8] = 0;
        result[9] = 0;
        result[10] = 0;
        result[11] = 0;
        result[12] = -matrix[12];
        result[13] = -matrix[13];
        result[14] = -matrix[14];
        result[15] = 1;
        return result;
      }
      throw new RuntimeError_default(
        "matrix is not invertible because its determinate is zero."
      );
    }
    det = 1 / det;
    result[0] = dst0 * det;
    result[1] = dst1 * det;
    result[2] = dst2 * det;
    result[3] = dst3 * det;
    result[4] = dst4 * det;
    result[5] = dst5 * det;
    result[6] = dst6 * det;
    result[7] = dst7 * det;
    result[8] = dst8 * det;
    result[9] = dst9 * det;
    result[10] = dst10 * det;
    result[11] = dst11 * det;
    result[12] = dst12 * det;
    result[13] = dst13 * det;
    result[14] = dst14 * det;
    result[15] = dst15 * det;
    return result;
  }
  /**
   * Computes the inverse of the provided matrix assuming it is a proper rigid matrix,
   * where the upper left 3x3 elements are a rotation matrix,
   * and the upper three elements in the fourth column are the translation.
   * The bottom row is assumed to be [0, 0, 0, 1].
   * The matrix is not verified to be in the proper form.
   * This method is faster than computing the inverse for a general 4x4
   * matrix using {@link Matrix4.inverse}.
   *
   * @param {Matrix4} matrix The matrix to invert.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   */
  static inverseTransformation(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    const matrix0 = matrix[0];
    const matrix1 = matrix[1];
    const matrix2 = matrix[2];
    const matrix4 = matrix[4];
    const matrix5 = matrix[5];
    const matrix6 = matrix[6];
    const matrix8 = matrix[8];
    const matrix9 = matrix[9];
    const matrix10 = matrix[10];
    const vX = matrix[12];
    const vY = matrix[13];
    const vZ = matrix[14];
    const x = -matrix0 * vX - matrix1 * vY - matrix2 * vZ;
    const y = -matrix4 * vX - matrix5 * vY - matrix6 * vZ;
    const z = -matrix8 * vX - matrix9 * vY - matrix10 * vZ;
    result[0] = matrix0;
    result[1] = matrix4;
    result[2] = matrix8;
    result[3] = 0;
    result[4] = matrix1;
    result[5] = matrix5;
    result[6] = matrix9;
    result[7] = 0;
    result[8] = matrix2;
    result[9] = matrix6;
    result[10] = matrix10;
    result[11] = 0;
    result[12] = x;
    result[13] = y;
    result[14] = z;
    result[15] = 1;
    return result;
  }
  /**
   * Computes the inverse transpose of a matrix.
   *
   * @param {Matrix4} matrix The matrix to transpose and invert.
   * @param {Matrix4} result The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter.
   */
  static inverseTranspose(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    return _Matrix4.inverse(
      _Matrix4.transpose(matrix, scratchTransposeMatrix2),
      result
    );
  }
  /**
   * Gets the number of items in the collection.
   *
   * @type {number}
   */
  get length() {
    return _Matrix4.packedLength;
  }
  /**
   * Duplicates the provided Matrix4 instance.
   *
   * @param {Matrix4} [result] The object onto which to store the result.
   * @returns {Matrix4} The modified result parameter or a new Matrix4 instance if one was not provided.
   */
  clone(result) {
    return _Matrix4.clone(this, result);
  }
  /**
   * Compares this matrix to the provided matrix componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Matrix4} [right] The right hand side matrix.
   * @returns {boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
   */
  equals(right) {
    return _Matrix4.equals(this, right);
  }
  /**
   * Compares provided matrix and array, starting from a given array offset.
   *
   * @param {Matrix4} matrix The matrix to compare.
   * @param {number[]} array The packed array.
   * @param {number} offset The offset into the array at which the matrix starts.
   * @returns {boolean} <code>true</code> if the matrix matches the packed array values at the offset; otherwise, <code>false</code>.
   * @internal
   */
  static equalsArray(matrix, array, offset) {
    return matrix[0] === array[offset] && matrix[1] === array[offset + 1] && matrix[2] === array[offset + 2] && matrix[3] === array[offset + 3] && matrix[4] === array[offset + 4] && matrix[5] === array[offset + 5] && matrix[6] === array[offset + 6] && matrix[7] === array[offset + 7] && matrix[8] === array[offset + 8] && matrix[9] === array[offset + 9] && matrix[10] === array[offset + 10] && matrix[11] === array[offset + 11] && matrix[12] === array[offset + 12] && matrix[13] === array[offset + 13] && matrix[14] === array[offset + 14] && matrix[15] === array[offset + 15];
  }
  /**
   * Compares this matrix to the provided matrix componentwise and returns
   * <code>true</code> if they are within the provided epsilon,
   * <code>false</code> otherwise.
   *
   * @param {Matrix4} [right] The right hand side matrix.
   * @param {number} [epsilon=0] The epsilon to use for equality testing.
   * @returns {boolean} <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
   */
  equalsEpsilon(right, epsilon) {
    return _Matrix4.equalsEpsilon(this, right, epsilon);
  }
  /**
   * Computes a string representing this Matrix with each row being
   * on a separate line and in the format '(column0, column1, column2, column3)'.
   *
   * @returns {string} A string representing the provided Matrix with each row being on a separate line and in the format '(column0, column1, column2, column3)'.
   */
  toString() {
    return `(${this[0]}, ${this[4]}, ${this[8]}, ${this[12]})
(${this[1]}, ${this[5]}, ${this[9]}, ${this[13]})
(${this[2]}, ${this[6]}, ${this[10]}, ${this[14]})
(${this[3]}, ${this[7]}, ${this[11]}, ${this[15]})`;
  }
};
Matrix4.packedLength = 16;
Matrix4.fromArray = Matrix4.unpack;
Matrix4.IDENTITY = Object.freeze(
  new Matrix4(
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
  )
);
Matrix4.ZERO = Object.freeze(
  new Matrix4(
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  )
);
Matrix4.COLUMN0ROW0 = 0;
Matrix4.COLUMN0ROW1 = 1;
Matrix4.COLUMN0ROW2 = 2;
Matrix4.COLUMN0ROW3 = 3;
Matrix4.COLUMN1ROW0 = 4;
Matrix4.COLUMN1ROW1 = 5;
Matrix4.COLUMN1ROW2 = 6;
Matrix4.COLUMN1ROW3 = 7;
Matrix4.COLUMN2ROW0 = 8;
Matrix4.COLUMN2ROW1 = 9;
Matrix4.COLUMN2ROW2 = 10;
Matrix4.COLUMN2ROW3 = 11;
Matrix4.COLUMN3ROW0 = 12;
Matrix4.COLUMN3ROW1 = 13;
Matrix4.COLUMN3ROW2 = 14;
Matrix4.COLUMN3ROW3 = 15;
var fromCameraF = new Cartesian3_default();
var fromCameraR = new Cartesian3_default();
var fromCameraU = new Cartesian3_default();
var scaleScratch12 = new Cartesian3_default();
var scaleScratch22 = new Cartesian3_default();
var scratchColumn2 = new Cartesian3_default();
var scaleScratch32 = new Cartesian3_default();
var scaleScratch42 = new Cartesian3_default();
var scaleScratch52 = new Cartesian3_default();
var scratchInverseRotation = new Matrix3_default();
var scratchMatrix3Zero = new Matrix3_default();
var scratchBottomRow = new Cartesian4_default();
var scratchExpectedBottomRow = new Cartesian4_default(0, 0, 0, 1);
var scratchTransposeMatrix2 = new Matrix4();
var Matrix4_default = Matrix4;

// packages/core/Source/Quaternion.js
function Quaternion(x, y, z, w) {
  this.x = x ?? 0;
  this.y = y ?? 0;
  this.z = z ?? 0;
  this.w = w ?? 0;
}
var fromAxisAngleScratch = new Cartesian3_default();
Quaternion.fromAxisAngle = function(axis, angle, result) {
  Check_default.typeOf.object("axis", axis);
  Check_default.typeOf.number("angle", angle);
  const halfAngle = angle / 2;
  const s = Math.sin(halfAngle);
  fromAxisAngleScratch = Cartesian3_default.normalize(axis, fromAxisAngleScratch);
  const x = fromAxisAngleScratch.x * s;
  const y = fromAxisAngleScratch.y * s;
  const z = fromAxisAngleScratch.z * s;
  const w = Math.cos(halfAngle);
  if (!defined_default(result)) {
    return new Quaternion(x, y, z, w);
  }
  result.x = x;
  result.y = y;
  result.z = z;
  result.w = w;
  return result;
};
var fromRotationMatrixNext = [1, 2, 0];
var fromRotationMatrixQuat = new Array(3);
Quaternion.fromRotationMatrix = function(matrix, result) {
  Check_default.typeOf.object("matrix", matrix);
  let root;
  let x;
  let y;
  let z;
  let w;
  const m00 = matrix[Matrix3_default.COLUMN0ROW0];
  const m11 = matrix[Matrix3_default.COLUMN1ROW1];
  const m22 = matrix[Matrix3_default.COLUMN2ROW2];
  const trace = m00 + m11 + m22;
  if (trace > 0) {
    root = Math.sqrt(trace + 1);
    w = 0.5 * root;
    root = 0.5 / root;
    x = (matrix[Matrix3_default.COLUMN1ROW2] - matrix[Matrix3_default.COLUMN2ROW1]) * root;
    y = (matrix[Matrix3_default.COLUMN2ROW0] - matrix[Matrix3_default.COLUMN0ROW2]) * root;
    z = (matrix[Matrix3_default.COLUMN0ROW1] - matrix[Matrix3_default.COLUMN1ROW0]) * root;
  } else {
    const next = fromRotationMatrixNext;
    let i = 0;
    if (m11 > m00) {
      i = 1;
    }
    if (m22 > m00 && m22 > m11) {
      i = 2;
    }
    const j = next[i];
    const k = next[j];
    root = Math.sqrt(
      matrix[Matrix3_default.getElementIndex(i, i)] - matrix[Matrix3_default.getElementIndex(j, j)] - matrix[Matrix3_default.getElementIndex(k, k)] + 1
    );
    const quat = fromRotationMatrixQuat;
    quat[i] = 0.5 * root;
    root = 0.5 / root;
    w = (matrix[Matrix3_default.getElementIndex(k, j)] - matrix[Matrix3_default.getElementIndex(j, k)]) * root;
    quat[j] = (matrix[Matrix3_default.getElementIndex(j, i)] + matrix[Matrix3_default.getElementIndex(i, j)]) * root;
    quat[k] = (matrix[Matrix3_default.getElementIndex(k, i)] + matrix[Matrix3_default.getElementIndex(i, k)]) * root;
    x = -quat[0];
    y = -quat[1];
    z = -quat[2];
  }
  if (!defined_default(result)) {
    return new Quaternion(x, y, z, w);
  }
  result.x = x;
  result.y = y;
  result.z = z;
  result.w = w;
  return result;
};
var scratchHPRQuaternion = new Quaternion();
var scratchHeadingQuaternion = new Quaternion();
var scratchPitchQuaternion = new Quaternion();
var scratchRollQuaternion = new Quaternion();
Quaternion.fromHeadingPitchRoll = function(headingPitchRoll, result) {
  Check_default.typeOf.object("headingPitchRoll", headingPitchRoll);
  scratchRollQuaternion = Quaternion.fromAxisAngle(
    Cartesian3_default.UNIT_X,
    headingPitchRoll.roll,
    scratchHPRQuaternion
  );
  scratchPitchQuaternion = Quaternion.fromAxisAngle(
    Cartesian3_default.UNIT_Y,
    -headingPitchRoll.pitch,
    result
  );
  result = Quaternion.multiply(
    scratchPitchQuaternion,
    scratchRollQuaternion,
    scratchPitchQuaternion
  );
  scratchHeadingQuaternion = Quaternion.fromAxisAngle(
    Cartesian3_default.UNIT_Z,
    -headingPitchRoll.heading,
    scratchHPRQuaternion
  );
  return Quaternion.multiply(scratchHeadingQuaternion, result, result);
};
var sampledQuaternionAxis = new Cartesian3_default();
var sampledQuaternionRotation = new Cartesian3_default();
var sampledQuaternionTempQuaternion = new Quaternion();
var sampledQuaternionQuaternion0 = new Quaternion();
var sampledQuaternionQuaternion0Conjugate = new Quaternion();
Quaternion.packedLength = 4;
Quaternion.pack = function(value, array, startingIndex) {
  Check_default.typeOf.object("value", value);
  Check_default.defined("array", array);
  startingIndex = startingIndex ?? 0;
  array[startingIndex++] = value.x;
  array[startingIndex++] = value.y;
  array[startingIndex++] = value.z;
  array[startingIndex] = value.w;
  return array;
};
Quaternion.unpack = function(array, startingIndex, result) {
  Check_default.defined("array", array);
  startingIndex = startingIndex ?? 0;
  if (!defined_default(result)) {
    result = new Quaternion();
  }
  result.x = array[startingIndex];
  result.y = array[startingIndex + 1];
  result.z = array[startingIndex + 2];
  result.w = array[startingIndex + 3];
  return result;
};
Quaternion.packedInterpolationLength = 3;
Quaternion.convertPackedArrayForInterpolation = function(packedArray, startingIndex, lastIndex, result) {
  Quaternion.unpack(
    packedArray,
    lastIndex * 4,
    sampledQuaternionQuaternion0Conjugate
  );
  Quaternion.conjugate(
    sampledQuaternionQuaternion0Conjugate,
    sampledQuaternionQuaternion0Conjugate
  );
  for (let i = 0, len = lastIndex - startingIndex + 1; i < len; i++) {
    const offset = i * 3;
    Quaternion.unpack(
      packedArray,
      (startingIndex + i) * 4,
      sampledQuaternionTempQuaternion
    );
    Quaternion.multiply(
      sampledQuaternionTempQuaternion,
      sampledQuaternionQuaternion0Conjugate,
      sampledQuaternionTempQuaternion
    );
    if (sampledQuaternionTempQuaternion.w < 0) {
      Quaternion.negate(
        sampledQuaternionTempQuaternion,
        sampledQuaternionTempQuaternion
      );
    }
    Quaternion.computeAxis(
      sampledQuaternionTempQuaternion,
      sampledQuaternionAxis
    );
    const angle = Quaternion.computeAngle(sampledQuaternionTempQuaternion);
    if (!defined_default(result)) {
      result = [];
    }
    result[offset] = sampledQuaternionAxis.x * angle;
    result[offset + 1] = sampledQuaternionAxis.y * angle;
    result[offset + 2] = sampledQuaternionAxis.z * angle;
  }
};
Quaternion.unpackInterpolationResult = function(array, sourceArray, firstIndex, lastIndex, result) {
  if (!defined_default(result)) {
    result = new Quaternion();
  }
  Cartesian3_default.fromArray(array, 0, sampledQuaternionRotation);
  const magnitude = Cartesian3_default.magnitude(sampledQuaternionRotation);
  Quaternion.unpack(sourceArray, lastIndex * 4, sampledQuaternionQuaternion0);
  if (magnitude === 0) {
    Quaternion.clone(Quaternion.IDENTITY, sampledQuaternionTempQuaternion);
  } else {
    Quaternion.fromAxisAngle(
      sampledQuaternionRotation,
      magnitude,
      sampledQuaternionTempQuaternion
    );
  }
  return Quaternion.multiply(
    sampledQuaternionTempQuaternion,
    sampledQuaternionQuaternion0,
    result
  );
};
Quaternion.clone = function(quaternion, result) {
  if (!defined_default(quaternion)) {
    return void 0;
  }
  if (!defined_default(result)) {
    return new Quaternion(
      quaternion.x,
      quaternion.y,
      quaternion.z,
      quaternion.w
    );
  }
  result.x = quaternion.x;
  result.y = quaternion.y;
  result.z = quaternion.z;
  result.w = quaternion.w;
  return result;
};
Quaternion.conjugate = function(quaternion, result) {
  Check_default.typeOf.object("quaternion", quaternion);
  Check_default.typeOf.object("result", result);
  result.x = -quaternion.x;
  result.y = -quaternion.y;
  result.z = -quaternion.z;
  result.w = quaternion.w;
  return result;
};
Quaternion.magnitudeSquared = function(quaternion) {
  Check_default.typeOf.object("quaternion", quaternion);
  return quaternion.x * quaternion.x + quaternion.y * quaternion.y + quaternion.z * quaternion.z + quaternion.w * quaternion.w;
};
Quaternion.magnitude = function(quaternion) {
  return Math.sqrt(Quaternion.magnitudeSquared(quaternion));
};
Quaternion.normalize = function(quaternion, result) {
  Check_default.typeOf.object("result", result);
  const inverseMagnitude = 1 / Quaternion.magnitude(quaternion);
  const x = quaternion.x * inverseMagnitude;
  const y = quaternion.y * inverseMagnitude;
  const z = quaternion.z * inverseMagnitude;
  const w = quaternion.w * inverseMagnitude;
  result.x = x;
  result.y = y;
  result.z = z;
  result.w = w;
  return result;
};
Quaternion.inverse = function(quaternion, result) {
  Check_default.typeOf.object("result", result);
  const magnitudeSquared = Quaternion.magnitudeSquared(quaternion);
  result = Quaternion.conjugate(quaternion, result);
  return Quaternion.multiplyByScalar(result, 1 / magnitudeSquared, result);
};
Quaternion.add = function(left, right, result) {
  Check_default.typeOf.object("left", left);
  Check_default.typeOf.object("right", right);
  Check_default.typeOf.object("result", result);
  result.x = left.x + right.x;
  result.y = left.y + right.y;
  result.z = left.z + right.z;
  result.w = left.w + right.w;
  return result;
};
Quaternion.subtract = function(left, right, result) {
  Check_default.typeOf.object("left", left);
  Check_default.typeOf.object("right", right);
  Check_default.typeOf.object("result", result);
  result.x = left.x - right.x;
  result.y = left.y - right.y;
  result.z = left.z - right.z;
  result.w = left.w - right.w;
  return result;
};
Quaternion.negate = function(quaternion, result) {
  Check_default.typeOf.object("quaternion", quaternion);
  Check_default.typeOf.object("result", result);
  result.x = -quaternion.x;
  result.y = -quaternion.y;
  result.z = -quaternion.z;
  result.w = -quaternion.w;
  return result;
};
Quaternion.dot = function(left, right) {
  Check_default.typeOf.object("left", left);
  Check_default.typeOf.object("right", right);
  return left.x * right.x + left.y * right.y + left.z * right.z + left.w * right.w;
};
Quaternion.multiply = function(left, right, result) {
  Check_default.typeOf.object("left", left);
  Check_default.typeOf.object("right", right);
  Check_default.typeOf.object("result", result);
  const leftX = left.x;
  const leftY = left.y;
  const leftZ = left.z;
  const leftW = left.w;
  const rightX = right.x;
  const rightY = right.y;
  const rightZ = right.z;
  const rightW = right.w;
  const x = leftW * rightX + leftX * rightW + leftY * rightZ - leftZ * rightY;
  const y = leftW * rightY - leftX * rightZ + leftY * rightW + leftZ * rightX;
  const z = leftW * rightZ + leftX * rightY - leftY * rightX + leftZ * rightW;
  const w = leftW * rightW - leftX * rightX - leftY * rightY - leftZ * rightZ;
  result.x = x;
  result.y = y;
  result.z = z;
  result.w = w;
  return result;
};
Quaternion.multiplyByScalar = function(quaternion, scalar, result) {
  Check_default.typeOf.object("quaternion", quaternion);
  Check_default.typeOf.number("scalar", scalar);
  Check_default.typeOf.object("result", result);
  result.x = quaternion.x * scalar;
  result.y = quaternion.y * scalar;
  result.z = quaternion.z * scalar;
  result.w = quaternion.w * scalar;
  return result;
};
Quaternion.divideByScalar = function(quaternion, scalar, result) {
  Check_default.typeOf.object("quaternion", quaternion);
  Check_default.typeOf.number("scalar", scalar);
  Check_default.typeOf.object("result", result);
  result.x = quaternion.x / scalar;
  result.y = quaternion.y / scalar;
  result.z = quaternion.z / scalar;
  result.w = quaternion.w / scalar;
  return result;
};
Quaternion.computeAxis = function(quaternion, result) {
  Check_default.typeOf.object("quaternion", quaternion);
  Check_default.typeOf.object("result", result);
  const w = quaternion.w;
  if (Math.abs(w - 1) < Math_default.EPSILON6 || Math.abs(w + 1) < Math_default.EPSILON6) {
    result.x = 1;
    result.y = result.z = 0;
    return result;
  }
  const scalar = 1 / Math.sqrt(1 - w * w);
  result.x = quaternion.x * scalar;
  result.y = quaternion.y * scalar;
  result.z = quaternion.z * scalar;
  return result;
};
Quaternion.computeAngle = function(quaternion) {
  Check_default.typeOf.object("quaternion", quaternion);
  if (Math.abs(quaternion.w - 1) < Math_default.EPSILON6) {
    return 0;
  }
  return 2 * Math.acos(quaternion.w);
};
var lerpScratch3 = new Quaternion();
Quaternion.lerp = function(start, end, t, result) {
  Check_default.typeOf.object("start", start);
  Check_default.typeOf.object("end", end);
  Check_default.typeOf.number("t", t);
  Check_default.typeOf.object("result", result);
  lerpScratch3 = Quaternion.multiplyByScalar(end, t, lerpScratch3);
  result = Quaternion.multiplyByScalar(start, 1 - t, result);
  return Quaternion.add(lerpScratch3, result, result);
};
var slerpEndNegated = new Quaternion();
var slerpScaledP = new Quaternion();
var slerpScaledR = new Quaternion();
Quaternion.slerp = function(start, end, t, result) {
  Check_default.typeOf.object("start", start);
  Check_default.typeOf.object("end", end);
  Check_default.typeOf.number("t", t);
  Check_default.typeOf.object("result", result);
  let dot = Quaternion.dot(start, end);
  let r = end;
  if (dot < 0) {
    dot = -dot;
    r = slerpEndNegated = Quaternion.negate(end, slerpEndNegated);
  }
  if (1 - dot < Math_default.EPSILON6) {
    return Quaternion.lerp(start, r, t, result);
  }
  const theta = Math.acos(dot);
  slerpScaledP = Quaternion.multiplyByScalar(
    start,
    Math.sin((1 - t) * theta),
    slerpScaledP
  );
  slerpScaledR = Quaternion.multiplyByScalar(
    r,
    Math.sin(t * theta),
    slerpScaledR
  );
  result = Quaternion.add(slerpScaledP, slerpScaledR, result);
  return Quaternion.multiplyByScalar(result, 1 / Math.sin(theta), result);
};
Quaternion.log = function(quaternion, result) {
  Check_default.typeOf.object("quaternion", quaternion);
  Check_default.typeOf.object("result", result);
  const theta = Math_default.acosClamped(quaternion.w);
  let thetaOverSinTheta = 0;
  if (theta !== 0) {
    thetaOverSinTheta = theta / Math.sin(theta);
  }
  return Cartesian3_default.multiplyByScalar(quaternion, thetaOverSinTheta, result);
};
Quaternion.exp = function(cartesian, result) {
  Check_default.typeOf.object("cartesian", cartesian);
  Check_default.typeOf.object("result", result);
  const theta = Cartesian3_default.magnitude(cartesian);
  let sinThetaOverTheta = 0;
  if (theta !== 0) {
    sinThetaOverTheta = Math.sin(theta) / theta;
  }
  result.x = cartesian.x * sinThetaOverTheta;
  result.y = cartesian.y * sinThetaOverTheta;
  result.z = cartesian.z * sinThetaOverTheta;
  result.w = Math.cos(theta);
  return result;
};
var squadScratchCartesian0 = new Cartesian3_default();
var squadScratchCartesian1 = new Cartesian3_default();
var squadScratchQuaternion0 = new Quaternion();
var squadScratchQuaternion1 = new Quaternion();
Quaternion.computeInnerQuadrangle = function(q0, q1, q2, result) {
  Check_default.typeOf.object("q0", q0);
  Check_default.typeOf.object("q1", q1);
  Check_default.typeOf.object("q2", q2);
  Check_default.typeOf.object("result", result);
  const qInv = Quaternion.conjugate(q1, squadScratchQuaternion0);
  Quaternion.multiply(qInv, q2, squadScratchQuaternion1);
  const cart0 = Quaternion.log(squadScratchQuaternion1, squadScratchCartesian0);
  Quaternion.multiply(qInv, q0, squadScratchQuaternion1);
  const cart1 = Quaternion.log(squadScratchQuaternion1, squadScratchCartesian1);
  Cartesian3_default.add(cart0, cart1, cart0);
  Cartesian3_default.multiplyByScalar(cart0, 0.25, cart0);
  Cartesian3_default.negate(cart0, cart0);
  Quaternion.exp(cart0, squadScratchQuaternion0);
  return Quaternion.multiply(q1, squadScratchQuaternion0, result);
};
Quaternion.squad = function(q0, q1, s0, s1, t, result) {
  Check_default.typeOf.object("q0", q0);
  Check_default.typeOf.object("q1", q1);
  Check_default.typeOf.object("s0", s0);
  Check_default.typeOf.object("s1", s1);
  Check_default.typeOf.number("t", t);
  Check_default.typeOf.object("result", result);
  const slerp0 = Quaternion.slerp(q0, q1, t, squadScratchQuaternion0);
  const slerp1 = Quaternion.slerp(s0, s1, t, squadScratchQuaternion1);
  return Quaternion.slerp(slerp0, slerp1, 2 * t * (1 - t), result);
};
var fastSlerpScratchQuaternion = new Quaternion();
var opmu = 1.9011074535173003;
var u = new Float32Array(8);
var v = new Float32Array(8);
var bT = new Float32Array(8);
var bD = new Float32Array(8);
for (let i = 0; i < 7; ++i) {
  const s = i + 1;
  const t = 2 * s + 1;
  u[i] = 1 / (s * t);
  v[i] = s / t;
}
u[7] = opmu / (8 * 17);
v[7] = opmu * 8 / 17;
Quaternion.fastSlerp = function(start, end, t, result) {
  Check_default.typeOf.object("start", start);
  Check_default.typeOf.object("end", end);
  Check_default.typeOf.number("t", t);
  Check_default.typeOf.object("result", result);
  let x = Quaternion.dot(start, end);
  let sign2;
  if (x >= 0) {
    sign2 = 1;
  } else {
    sign2 = -1;
    x = -x;
  }
  const xm1 = x - 1;
  const d = 1 - t;
  const sqrT = t * t;
  const sqrD = d * d;
  for (let i = 7; i >= 0; --i) {
    bT[i] = (u[i] * sqrT - v[i]) * xm1;
    bD[i] = (u[i] * sqrD - v[i]) * xm1;
  }
  const cT = sign2 * t * (1 + bT[0] * (1 + bT[1] * (1 + bT[2] * (1 + bT[3] * (1 + bT[4] * (1 + bT[5] * (1 + bT[6] * (1 + bT[7]))))))));
  const cD = d * (1 + bD[0] * (1 + bD[1] * (1 + bD[2] * (1 + bD[3] * (1 + bD[4] * (1 + bD[5] * (1 + bD[6] * (1 + bD[7]))))))));
  const temp = Quaternion.multiplyByScalar(
    start,
    cD,
    fastSlerpScratchQuaternion
  );
  Quaternion.multiplyByScalar(end, cT, result);
  return Quaternion.add(temp, result, result);
};
Quaternion.fastSquad = function(q0, q1, s0, s1, t, result) {
  Check_default.typeOf.object("q0", q0);
  Check_default.typeOf.object("q1", q1);
  Check_default.typeOf.object("s0", s0);
  Check_default.typeOf.object("s1", s1);
  Check_default.typeOf.number("t", t);
  Check_default.typeOf.object("result", result);
  const slerp0 = Quaternion.fastSlerp(q0, q1, t, squadScratchQuaternion0);
  const slerp1 = Quaternion.fastSlerp(s0, s1, t, squadScratchQuaternion1);
  return Quaternion.fastSlerp(slerp0, slerp1, 2 * t * (1 - t), result);
};
Quaternion.equals = function(left, right) {
  return left === right || defined_default(left) && defined_default(right) && left.x === right.x && left.y === right.y && left.z === right.z && left.w === right.w;
};
Quaternion.equalsEpsilon = function(left, right, epsilon) {
  epsilon = epsilon ?? 0;
  return left === right || defined_default(left) && defined_default(right) && Math.abs(left.x - right.x) <= epsilon && Math.abs(left.y - right.y) <= epsilon && Math.abs(left.z - right.z) <= epsilon && Math.abs(left.w - right.w) <= epsilon;
};
Quaternion.ZERO = Object.freeze(new Quaternion(0, 0, 0, 0));
Quaternion.IDENTITY = Object.freeze(new Quaternion(0, 0, 0, 1));
Quaternion.prototype.clone = function(result) {
  return Quaternion.clone(this, result);
};
Quaternion.prototype.equals = function(right) {
  return Quaternion.equals(this, right);
};
Quaternion.prototype.equalsEpsilon = function(right, epsilon) {
  return Quaternion.equalsEpsilon(this, right, epsilon);
};
Quaternion.prototype.toString = function() {
  return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
};
var Quaternion_default = Quaternion;

// packages/core/Source/clone.js
function clone(object, deep) {
  if (object === null || typeof object !== "object") {
    return object;
  }
  deep = deep ?? false;
  const Constructor = object.constructor;
  const result = new Constructor();
  for (const propertyName in object) {
    if (object.hasOwnProperty(propertyName)) {
      let value = object[propertyName];
      if (deep) {
        value = clone(value, deep);
      }
      result[propertyName] = value;
    }
  }
  return result;
}
var clone_default = clone;

// packages/core/Source/getStringFromTypedArray.js
function getStringFromTypedArray(uint8Array, byteOffset, byteLength) {
  if (!defined_default(uint8Array)) {
    throw new DeveloperError_default("uint8Array is required.");
  }
  if (byteOffset < 0) {
    throw new DeveloperError_default("byteOffset cannot be negative.");
  }
  if (byteLength < 0) {
    throw new DeveloperError_default("byteLength cannot be negative.");
  }
  if (byteOffset + byteLength > uint8Array.byteLength) {
    throw new DeveloperError_default("sub-region exceeds array bounds.");
  }
  byteOffset = byteOffset ?? 0;
  byteLength = byteLength ?? uint8Array.byteLength - byteOffset;
  uint8Array = uint8Array.subarray(byteOffset, byteOffset + byteLength);
  return getStringFromTypedArray.decode(uint8Array);
}
getStringFromTypedArray.decodeWithTextDecoder = function(view) {
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(view);
};
getStringFromTypedArray.decodeWithFromCharCode = function(view) {
  let result = "";
  const codePoints = utf8Handler(view);
  const length = codePoints.length;
  for (let i = 0; i < length; ++i) {
    let cp = codePoints[i];
    if (cp <= 65535) {
      result += String.fromCharCode(cp);
    } else {
      cp -= 65536;
      result += String.fromCharCode((cp >> 10) + 55296, (cp & 1023) + 56320);
    }
  }
  return result;
};
function inRange(a, min, max) {
  return min <= a && a <= max;
}
function utf8Handler(utfBytes) {
  let codePoint = 0;
  let bytesSeen = 0;
  let bytesNeeded = 0;
  let lowerBoundary = 128;
  let upperBoundary = 191;
  const codePoints = [];
  const length = utfBytes.length;
  for (let i = 0; i < length; ++i) {
    const currentByte = utfBytes[i];
    if (bytesNeeded === 0) {
      if (inRange(currentByte, 0, 127)) {
        codePoints.push(currentByte);
        continue;
      }
      if (inRange(currentByte, 194, 223)) {
        bytesNeeded = 1;
        codePoint = currentByte & 31;
        continue;
      }
      if (inRange(currentByte, 224, 239)) {
        if (currentByte === 224) {
          lowerBoundary = 160;
        }
        if (currentByte === 237) {
          upperBoundary = 159;
        }
        bytesNeeded = 2;
        codePoint = currentByte & 15;
        continue;
      }
      if (inRange(currentByte, 240, 244)) {
        if (currentByte === 240) {
          lowerBoundary = 144;
        }
        if (currentByte === 244) {
          upperBoundary = 143;
        }
        bytesNeeded = 3;
        codePoint = currentByte & 7;
        continue;
      }
      throw new RuntimeError_default("String decoding failed.");
    }
    if (!inRange(currentByte, lowerBoundary, upperBoundary)) {
      codePoint = bytesNeeded = bytesSeen = 0;
      lowerBoundary = 128;
      upperBoundary = 191;
      --i;
      continue;
    }
    lowerBoundary = 128;
    upperBoundary = 191;
    codePoint = codePoint << 6 | currentByte & 63;
    ++bytesSeen;
    if (bytesSeen === bytesNeeded) {
      codePoints.push(codePoint);
      codePoint = bytesNeeded = bytesSeen = 0;
    }
  }
  return codePoints;
}
if (typeof TextDecoder !== "undefined") {
  getStringFromTypedArray.decode = getStringFromTypedArray.decodeWithTextDecoder;
} else {
  getStringFromTypedArray.decode = getStringFromTypedArray.decodeWithFromCharCode;
}
var getStringFromTypedArray_default = getStringFromTypedArray;

// packages/core/Source/getMagic.js
function getMagic(uint8Array, byteOffset) {
  byteOffset = byteOffset ?? 0;
  return getStringFromTypedArray_default(
    uint8Array,
    byteOffset,
    Math.min(4, uint8Array.length)
  );
}
var getMagic_default = getMagic;

// packages/core/index.js
globalThis.CESIUM_VERSION = "1.146.0";

// packages/gltf/Source/usesExtension.js
function usesExtension(gltf3, extension) {
  return defined_default(gltf3.extensionsUsed) && gltf3.extensionsUsed.indexOf(extension) >= 0;
}
var usesExtension_default = usesExtension;

// packages/gltf/Source/ForEach.js
var ForEach = {};
ForEach.objectLegacy = function(objects, handler) {
  if (defined_default(objects)) {
    for (const objectId in objects) {
      if (Object.prototype.hasOwnProperty.call(objects, objectId)) {
        const object = objects[objectId];
        const value = handler(object, objectId);
        if (defined_default(value)) {
          return value;
        }
      }
    }
  }
};
ForEach.object = function(arrayOfObjects, handler) {
  if (defined_default(arrayOfObjects)) {
    const length = arrayOfObjects.length;
    for (let i = 0; i < length; i++) {
      const object = arrayOfObjects[i];
      const value = handler(object, i);
      if (defined_default(value)) {
        return value;
      }
    }
  }
};
ForEach.topLevel = function(gltf3, name, handler) {
  const gltfProperty = gltf3[name];
  if (defined_default(gltfProperty) && !Array.isArray(gltfProperty)) {
    return ForEach.objectLegacy(gltfProperty, handler);
  }
  return ForEach.object(gltfProperty, handler);
};
ForEach.accessor = function(gltf3, handler) {
  return ForEach.topLevel(gltf3, "accessors", handler);
};
ForEach.accessorWithSemantic = function(gltf3, semantic, handler) {
  const visited = {};
  return ForEach.mesh(gltf3, function(mesh) {
    return ForEach.meshPrimitive(mesh, function(primitive) {
      const valueForEach = ForEach.meshPrimitiveAttribute(
        primitive,
        function(accessorId, attributeSemantic) {
          if (attributeSemantic.indexOf(semantic) === 0 && !defined_default(visited[accessorId])) {
            visited[accessorId] = true;
            const value = handler(accessorId);
            if (defined_default(value)) {
              return value;
            }
          }
        }
      );
      if (defined_default(valueForEach)) {
        return valueForEach;
      }
      return ForEach.meshPrimitiveTarget(primitive, function(target) {
        return ForEach.meshPrimitiveTargetAttribute(
          target,
          function(accessorId, attributeSemantic) {
            if (attributeSemantic.indexOf(semantic) === 0 && !defined_default(visited[accessorId])) {
              visited[accessorId] = true;
              const value = handler(accessorId);
              if (defined_default(value)) {
                return value;
              }
            }
          }
        );
      });
    });
  });
};
ForEach.accessorContainingVertexAttributeData = function(gltf3, handler) {
  const visited = {};
  return ForEach.mesh(gltf3, function(mesh) {
    return ForEach.meshPrimitive(mesh, function(primitive) {
      const valueForEach = ForEach.meshPrimitiveAttribute(
        primitive,
        function(accessorId) {
          if (!defined_default(visited[accessorId])) {
            visited[accessorId] = true;
            const value = handler(accessorId);
            if (defined_default(value)) {
              return value;
            }
          }
        }
      );
      if (defined_default(valueForEach)) {
        return valueForEach;
      }
      return ForEach.meshPrimitiveTarget(primitive, function(target) {
        return ForEach.meshPrimitiveTargetAttribute(
          target,
          function(accessorId) {
            if (!defined_default(visited[accessorId])) {
              visited[accessorId] = true;
              const value = handler(accessorId);
              if (defined_default(value)) {
                return value;
              }
            }
          }
        );
      });
    });
  });
};
ForEach.accessorContainingIndexData = function(gltf3, handler) {
  const visited = {};
  return ForEach.mesh(gltf3, function(mesh) {
    return ForEach.meshPrimitive(mesh, function(primitive) {
      const indices = primitive.indices;
      if (defined_default(indices) && !defined_default(visited[indices])) {
        visited[indices] = true;
        const value = handler(indices);
        if (defined_default(value)) {
          return value;
        }
      }
    });
  });
};
ForEach.animation = function(gltf3, handler) {
  return ForEach.topLevel(gltf3, "animations", handler);
};
ForEach.animationChannel = function(animation, handler) {
  const channels = animation.channels;
  return ForEach.object(channels, handler);
};
ForEach.animationSampler = function(animation, handler) {
  const samplers = animation.samplers;
  return ForEach.object(samplers, handler);
};
ForEach.buffer = function(gltf3, handler) {
  return ForEach.topLevel(gltf3, "buffers", handler);
};
ForEach.bufferView = function(gltf3, handler) {
  return ForEach.topLevel(gltf3, "bufferViews", handler);
};
ForEach.camera = function(gltf3, handler) {
  return ForEach.topLevel(gltf3, "cameras", handler);
};
ForEach.image = function(gltf3, handler) {
  return ForEach.topLevel(gltf3, "images", handler);
};
ForEach.material = function(gltf3, handler) {
  return ForEach.topLevel(gltf3, "materials", handler);
};
ForEach.materialValue = function(material, handler) {
  let values = material.values;
  if (defined_default(material.extensions) && defined_default(material.extensions.KHR_techniques_webgl)) {
    values = material.extensions.KHR_techniques_webgl.values;
  }
  for (const name in values) {
    if (Object.prototype.hasOwnProperty.call(values, name)) {
      const value = handler(values[name], name);
      if (defined_default(value)) {
        return value;
      }
    }
  }
};
ForEach.mesh = function(gltf3, handler) {
  return ForEach.topLevel(gltf3, "meshes", handler);
};
ForEach.meshPrimitive = function(mesh, handler) {
  const primitives = mesh.primitives;
  if (defined_default(primitives)) {
    const primitivesLength = primitives.length;
    for (let i = 0; i < primitivesLength; i++) {
      const primitive = primitives[i];
      const value = handler(primitive, i);
      if (defined_default(value)) {
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
      if (defined_default(value)) {
        return value;
      }
    }
  }
};
ForEach.meshPrimitiveTarget = function(primitive, handler) {
  const targets = primitive.targets;
  if (defined_default(targets)) {
    const length = targets.length;
    for (let i = 0; i < length; ++i) {
      const value = handler(targets[i], i);
      if (defined_default(value)) {
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
      if (defined_default(value)) {
        return value;
      }
    }
  }
};
ForEach.node = function(gltf3, handler) {
  return ForEach.topLevel(gltf3, "nodes", handler);
};
ForEach.nodeInTree = function(gltf3, nodeIds, handler) {
  const nodes = gltf3.nodes;
  if (defined_default(nodes)) {
    const length = nodeIds.length;
    for (let i = 0; i < length; i++) {
      const nodeId = nodeIds[i];
      const node = nodes[nodeId];
      if (defined_default(node)) {
        let value = handler(node, nodeId);
        if (defined_default(value)) {
          return value;
        }
        const children = node.children;
        if (defined_default(children)) {
          value = ForEach.nodeInTree(gltf3, children, handler);
          if (defined_default(value)) {
            return value;
          }
        }
      }
    }
  }
};
ForEach.nodeInScene = function(gltf3, scene, handler) {
  const sceneNodeIds = scene.nodes;
  if (defined_default(sceneNodeIds)) {
    return ForEach.nodeInTree(gltf3, sceneNodeIds, handler);
  }
};
ForEach.program = function(gltf3, handler) {
  if (usesExtension_default(gltf3, "KHR_techniques_webgl")) {
    return ForEach.object(
      gltf3.extensions.KHR_techniques_webgl.programs,
      handler
    );
  }
  return ForEach.topLevel(gltf3, "programs", handler);
};
ForEach.sampler = function(gltf3, handler) {
  return ForEach.topLevel(gltf3, "samplers", handler);
};
ForEach.scene = function(gltf3, handler) {
  return ForEach.topLevel(gltf3, "scenes", handler);
};
ForEach.shader = function(gltf3, handler) {
  if (usesExtension_default(gltf3, "KHR_techniques_webgl")) {
    return ForEach.object(
      gltf3.extensions.KHR_techniques_webgl.shaders,
      handler
    );
  }
  return ForEach.topLevel(gltf3, "shaders", handler);
};
ForEach.skin = function(gltf3, handler) {
  return ForEach.topLevel(gltf3, "skins", handler);
};
ForEach.skinJoint = function(skin, handler) {
  const joints = skin.joints;
  if (defined_default(joints)) {
    const jointsLength = joints.length;
    for (let i = 0; i < jointsLength; i++) {
      const joint = joints[i];
      const value = handler(joint);
      if (defined_default(value)) {
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
      if (defined_default(value)) {
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
      if (defined_default(value)) {
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
      if (defined_default(value)) {
        return value;
      }
    }
  }
};
ForEach.technique = function(gltf3, handler) {
  if (usesExtension_default(gltf3, "KHR_techniques_webgl")) {
    return ForEach.object(
      gltf3.extensions.KHR_techniques_webgl.techniques,
      handler
    );
  }
  return ForEach.topLevel(gltf3, "techniques", handler);
};
ForEach.texture = function(gltf3, handler) {
  return ForEach.topLevel(gltf3, "textures", handler);
};
var ForEach_default = ForEach;

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
function getAccessorByteStride(gltf3, accessor) {
  const bufferViewId = accessor.bufferView;
  if (defined_default(bufferViewId)) {
    const bufferView = gltf3.bufferViews[bufferViewId];
    if (defined_default(bufferView.byteStride) && bufferView.byteStride > 0) {
      return bufferView.byteStride;
    }
  }
  return ComponentDatatype_default.getSizeInBytes(accessor.componentType) * numberOfComponentsForType_default(accessor.type);
}
var getAccessorByteStride_default = getAccessorByteStride;

// packages/gltf/Source/addDefaults.js
function addDefaults(gltf3) {
  ForEach_default.accessor(gltf3, function(accessor) {
    if (defined_default(accessor.bufferView)) {
      accessor.byteOffset = accessor.byteOffset ?? 0;
    }
  });
  ForEach_default.bufferView(gltf3, function(bufferView) {
    if (defined_default(bufferView.buffer)) {
      bufferView.byteOffset = bufferView.byteOffset ?? 0;
    }
  });
  ForEach_default.mesh(gltf3, function(mesh) {
    ForEach_default.meshPrimitive(mesh, function(primitive) {
      primitive.mode = primitive.mode ?? WebGLConstants_default.TRIANGLES;
      if (!defined_default(primitive.material)) {
        if (!defined_default(gltf3.materials)) {
          gltf3.materials = [];
        }
        const defaultMaterial = {
          name: "default"
        };
        primitive.material = addToArray_default(gltf3.materials, defaultMaterial);
      }
    });
  });
  ForEach_default.accessorContainingVertexAttributeData(gltf3, function(accessorId) {
    const accessor = gltf3.accessors[accessorId];
    const bufferViewId = accessor.bufferView;
    accessor.normalized = accessor.normalized ?? false;
    if (defined_default(bufferViewId)) {
      const bufferView = gltf3.bufferViews[bufferViewId];
      bufferView.byteStride = getAccessorByteStride_default(gltf3, accessor);
      bufferView.target = WebGLConstants_default.ARRAY_BUFFER;
    }
  });
  ForEach_default.accessorContainingIndexData(gltf3, function(accessorId) {
    const accessor = gltf3.accessors[accessorId];
    const bufferViewId = accessor.bufferView;
    if (defined_default(bufferViewId)) {
      const bufferView = gltf3.bufferViews[bufferViewId];
      bufferView.target = WebGLConstants_default.ELEMENT_ARRAY_BUFFER;
    }
  });
  ForEach_default.material(gltf3, function(material) {
    const extensions = material.extensions ?? {};
    const materialsCommon = extensions.KHR_materials_common;
    if (defined_default(materialsCommon)) {
      const technique = materialsCommon.technique;
      const values = defined_default(materialsCommon.values) ? materialsCommon.values : {};
      materialsCommon.values = values;
      values.ambient = defined_default(values.ambient) ? values.ambient : [0, 0, 0, 1];
      values.emission = defined_default(values.emission) ? values.emission : [0, 0, 0, 1];
      values.transparency = values.transparency ?? 1;
      if (technique !== "CONSTANT") {
        values.diffuse = defined_default(values.diffuse) ? values.diffuse : [0, 0, 0, 1];
        if (technique !== "LAMBERT") {
          values.specular = defined_default(values.specular) ? values.specular : [0, 0, 0, 1];
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
    if (defined_default(techniquesExtension)) {
      ForEach_default.materialValue(material, function(materialValue) {
        if (defined_default(materialValue.index)) {
          addTextureDefaults(materialValue);
        }
      });
    }
    addTextureDefaults(material.emissiveTexture);
    addTextureDefaults(material.normalTexture);
    addTextureDefaults(material.occlusionTexture);
    const pbrMetallicRoughness = material.pbrMetallicRoughness;
    if (defined_default(pbrMetallicRoughness)) {
      pbrMetallicRoughness.baseColorFactor = pbrMetallicRoughness.baseColorFactor ?? [1, 1, 1, 1];
      pbrMetallicRoughness.metallicFactor = pbrMetallicRoughness.metallicFactor ?? 1;
      pbrMetallicRoughness.roughnessFactor = pbrMetallicRoughness.roughnessFactor ?? 1;
      addTextureDefaults(pbrMetallicRoughness.baseColorTexture);
      addTextureDefaults(pbrMetallicRoughness.metallicRoughnessTexture);
    }
    const pbrSpecularGlossiness = extensions.KHR_materials_pbrSpecularGlossiness;
    if (defined_default(pbrSpecularGlossiness)) {
      pbrSpecularGlossiness.diffuseFactor = pbrSpecularGlossiness.diffuseFactor ?? [1, 1, 1, 1];
      pbrSpecularGlossiness.specularFactor = pbrSpecularGlossiness.specularFactor ?? [1, 1, 1];
      pbrSpecularGlossiness.glossinessFactor = pbrSpecularGlossiness.glossinessFactor ?? 1;
      addTextureDefaults(pbrSpecularGlossiness.specularGlossinessTexture);
    }
  });
  ForEach_default.animation(gltf3, function(animation) {
    ForEach_default.animationSampler(animation, function(sampler) {
      sampler.interpolation = sampler.interpolation ?? "LINEAR";
    });
  });
  const animatedNodes = getAnimatedNodes(gltf3);
  ForEach_default.node(gltf3, function(node, id) {
    const animated = defined_default(animatedNodes[id]);
    if (animated || defined_default(node.translation) || defined_default(node.rotation) || defined_default(node.scale)) {
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
  ForEach_default.sampler(gltf3, function(sampler) {
    sampler.wrapS = sampler.wrapS ?? WebGLConstants_default.REPEAT;
    sampler.wrapT = sampler.wrapT ?? WebGLConstants_default.REPEAT;
  });
  if (defined_default(gltf3.scenes) && !defined_default(gltf3.scene)) {
    gltf3.scene = 0;
  }
  return gltf3;
}
function getAnimatedNodes(gltf3) {
  const nodes = {};
  ForEach_default.animation(gltf3, function(animation) {
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
  if (defined_default(texture)) {
    texture.texCoord = texture.texCoord ?? 0;
  }
}
var addDefaults_default = addDefaults;

// packages/gltf/Source/addExtensionsUsed.js
function addExtensionsUsed(gltf3, extension) {
  let extensionsUsed = gltf3.extensionsUsed;
  if (!defined_default(extensionsUsed)) {
    extensionsUsed = [];
    gltf3.extensionsUsed = extensionsUsed;
  }
  addToArray_default(extensionsUsed, extension, true);
}
var addExtensionsUsed_default = addExtensionsUsed;

// packages/gltf/Source/addExtensionsRequired.js
function addExtensionsRequired(gltf3, extension) {
  let extensionsRequired = gltf3.extensionsRequired;
  if (!defined_default(extensionsRequired)) {
    extensionsRequired = [];
    gltf3.extensionsRequired = extensionsRequired;
  }
  addToArray_default(extensionsRequired, extension, true);
  addExtensionsUsed_default(gltf3, extension);
}
var addExtensionsRequired_default = addExtensionsRequired;

// packages/gltf/Source/addPipelineExtras.js
function addPipelineExtras(gltf3) {
  ForEach_default.shader(gltf3, function(shader) {
    addExtras(shader);
  });
  ForEach_default.buffer(gltf3, function(buffer2) {
    addExtras(buffer2);
  });
  ForEach_default.image(gltf3, function(image) {
    addExtras(image);
  });
  addExtras(gltf3);
  return gltf3;
}
function addExtras(object) {
  object.extras = defined_default(object.extras) ? object.extras : {};
  object.extras._pipeline = defined_default(object.extras._pipeline) ? object.extras._pipeline : {};
}
var addPipelineExtras_default = addPipelineExtras;

// packages/gltf/Source/constructBoundingVolumeJson.js
function constructBoundingVolumeJson(boundingVolumeJson, shapes) {
  const {
    shape,
    translation = [0, 0, 0],
    rotation,
    scale
  } = boundingVolumeJson;
  const { box, sphere } = shapes[shape];
  if (defined_default(box)) {
    return constructBox(box, translation, rotation, scale);
  }
  if (defined_default(sphere)) {
    return constructSphere(sphere, translation, scale);
  }
  throw new DeveloperError_default(
    "Only box and sphere shapes are supported for the bounding volume."
  );
}
function constructBox(box, translation, rotation, scale) {
  const halfAxes = Matrix3_default.fromScale(
    new Cartesian3_default(box.size[0] * 0.5, box.size[1] * 0.5, box.size[2] * 0.5)
  );
  if (defined_default(scale)) {
    Matrix3_default.multiplyByScale(
      halfAxes,
      new Cartesian3_default(scale[0], scale[1], scale[2]),
      halfAxes
    );
  }
  if (defined_default(rotation)) {
    Matrix3_default.multiply(
      Matrix3_default.fromQuaternion(Quaternion_default.unpack(rotation)),
      halfAxes,
      halfAxes
    );
  }
  return { box: Matrix3_default.pack(halfAxes, translation.slice(), 3) };
}
function constructSphere(sphere, translation, scale) {
  let radius = sphere.radius ?? 0.5;
  if (defined_default(scale)) {
    radius *= Math.max(
      Math.abs(scale[0]),
      Math.abs(scale[1]),
      Math.abs(scale[2])
    );
  }
  return { sphere: [translation[0], translation[1], translation[2], radius] };
}
var constructBoundingVolumeJson_default = constructBoundingVolumeJson;

// packages/gltf/Source/getComponentReader.js
function getComponentReader(componentType) {
  const byteLength = ComponentDatatype_default.getSizeInBytes(componentType);
  switch (componentType) {
    case ComponentDatatype_default.BYTE:
      return function(dataView, byteOffset, numberOfComponents, result) {
        for (let i = 0; i < numberOfComponents; ++i) {
          result[i] = dataView.getInt8(byteOffset + i * byteLength);
        }
      };
    case ComponentDatatype_default.UNSIGNED_BYTE:
      return function(dataView, byteOffset, numberOfComponents, result) {
        for (let i = 0; i < numberOfComponents; ++i) {
          result[i] = dataView.getUint8(byteOffset + i * byteLength);
        }
      };
    case ComponentDatatype_default.SHORT:
      return function(dataView, byteOffset, numberOfComponents, result) {
        for (let i = 0; i < numberOfComponents; ++i) {
          result[i] = dataView.getInt16(byteOffset + i * byteLength, true);
        }
      };
    case ComponentDatatype_default.UNSIGNED_SHORT:
      return function(dataView, byteOffset, numberOfComponents, result) {
        for (let i = 0; i < numberOfComponents; ++i) {
          result[i] = dataView.getUint16(byteOffset + i * byteLength, true);
        }
      };
    case ComponentDatatype_default.INT:
      return function(dataView, byteOffset, numberOfComponents, result) {
        for (let i = 0; i < numberOfComponents; ++i) {
          result[i] = dataView.getInt32(byteOffset + i * byteLength, true);
        }
      };
    case ComponentDatatype_default.UNSIGNED_INT:
      return function(dataView, byteOffset, numberOfComponents, result) {
        for (let i = 0; i < numberOfComponents; ++i) {
          result[i] = dataView.getUint32(byteOffset + i * byteLength, true);
        }
      };
    case ComponentDatatype_default.FLOAT:
      return function(dataView, byteOffset, numberOfComponents, result) {
        for (let i = 0; i < numberOfComponents; ++i) {
          result[i] = dataView.getFloat32(byteOffset + i * byteLength, true);
        }
      };
    case ComponentDatatype_default.DOUBLE:
      return function(dataView, byteOffset, numberOfComponents, result) {
        for (let i = 0; i < numberOfComponents; ++i) {
          result[i] = dataView.getFloat64(byteOffset + i * byteLength, true);
        }
      };
    default:
      throw new RuntimeError_default(`Unsupported component type: ${componentType}`);
  }
}
var getComponentReader_default = getComponentReader;

// packages/gltf/Source/findAccessorMinMax.js
function findAccessorMinMax(gltf3, accessor) {
  const bufferViews = gltf3.bufferViews;
  const buffers = gltf3.buffers;
  const bufferViewId = accessor.bufferView;
  const numberOfComponents = numberOfComponentsForType_default(accessor.type);
  if (!defined_default(accessor.bufferView)) {
    return {
      min: new Array(numberOfComponents).fill(0),
      max: new Array(numberOfComponents).fill(0)
    };
  }
  const min = new Array(numberOfComponents).fill(Number.POSITIVE_INFINITY);
  const max = new Array(numberOfComponents).fill(Number.NEGATIVE_INFINITY);
  const bufferView = bufferViews[bufferViewId];
  const bufferId = bufferView.buffer;
  const buffer2 = buffers[bufferId];
  const source = buffer2.extras._pipeline.source;
  const count = accessor.count;
  const byteStride = getAccessorByteStride_default(gltf3, accessor);
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
function forEachTextureInMaterial(material, handler) {
  Check_default.typeOf.object("material", material);
  Check_default.defined("handler", handler);
  const pbrMetallicRoughness = material.pbrMetallicRoughness;
  if (defined_default(pbrMetallicRoughness)) {
    if (defined_default(pbrMetallicRoughness.baseColorTexture)) {
      const textureInfo = pbrMetallicRoughness.baseColorTexture;
      const value2 = handler(textureInfo.index, textureInfo);
      if (defined_default(value2)) {
        return value2;
      }
    }
    if (defined_default(pbrMetallicRoughness.metallicRoughnessTexture)) {
      const textureInfo = pbrMetallicRoughness.metallicRoughnessTexture;
      const value2 = handler(textureInfo.index, textureInfo);
      if (defined_default(value2)) {
        return value2;
      }
    }
  }
  const { extensions } = material;
  if (defined_default(extensions)) {
    const pbrSpecularGlossiness = extensions.KHR_materials_pbrSpecularGlossiness;
    if (defined_default(pbrSpecularGlossiness)) {
      if (defined_default(pbrSpecularGlossiness.diffuseTexture)) {
        const textureInfo = pbrSpecularGlossiness.diffuseTexture;
        const value2 = handler(textureInfo.index, textureInfo);
        if (defined_default(value2)) {
          return value2;
        }
      }
      if (defined_default(pbrSpecularGlossiness.specularGlossinessTexture)) {
        const textureInfo = pbrSpecularGlossiness.specularGlossinessTexture;
        const value2 = handler(textureInfo.index, textureInfo);
        if (defined_default(value2)) {
          return value2;
        }
      }
    }
    const specular = extensions.KHR_materials_specular;
    if (defined_default(specular)) {
      const { specularTexture, specularColorTexture } = specular;
      if (defined_default(specularTexture)) {
        const value2 = handler(specularTexture.index, specularTexture);
        if (defined_default(value2)) {
          return value2;
        }
      }
      if (defined_default(specularColorTexture)) {
        const value2 = handler(specularColorTexture.index, specularColorTexture);
        if (defined_default(value2)) {
          return value2;
        }
      }
    }
    const transmission = extensions.KHR_materials_transmission;
    if (defined_default(transmission) && defined_default(transmission.transmissionTexture)) {
      const textureInfo = transmission.transmissionTexture;
      const value2 = handler(textureInfo.index, textureInfo);
      if (defined_default(value2)) {
        return value2;
      }
    }
    const materialsCommon = extensions.KHR_materials_common;
    if (defined_default(materialsCommon) && defined_default(materialsCommon.values)) {
      const { diffuse, ambient, emission, specular: specular2 } = materialsCommon.values;
      if (defined_default(diffuse) && defined_default(diffuse.index)) {
        const value2 = handler(diffuse.index, diffuse);
        if (defined_default(value2)) {
          return value2;
        }
      }
      if (defined_default(ambient) && defined_default(ambient.index)) {
        const value2 = handler(ambient.index, ambient);
        if (defined_default(value2)) {
          return value2;
        }
      }
      if (defined_default(emission) && defined_default(emission.index)) {
        const value2 = handler(emission.index, emission);
        if (defined_default(value2)) {
          return value2;
        }
      }
      if (defined_default(specular2) && defined_default(specular2.index)) {
        const value2 = handler(specular2.index, specular2);
        if (defined_default(value2)) {
          return value2;
        }
      }
    }
  }
  const value = ForEach_default.materialValue(material, function(materialValue) {
    if (defined_default(materialValue.index)) {
      const value2 = handler(materialValue.index, materialValue);
      if (defined_default(value2)) {
        return value2;
      }
    }
  });
  if (defined_default(value)) {
    return value;
  }
  if (defined_default(material.emissiveTexture)) {
    const textureInfo = material.emissiveTexture;
    const value2 = handler(textureInfo.index, textureInfo);
    if (defined_default(value2)) {
      return value2;
    }
  }
  if (defined_default(material.normalTexture)) {
    const textureInfo = material.normalTexture;
    const value2 = handler(textureInfo.index, textureInfo);
    if (defined_default(value2)) {
      return value2;
    }
  }
  if (defined_default(material.occlusionTexture)) {
    const textureInfo = material.occlusionTexture;
    const value2 = handler(textureInfo.index, textureInfo);
    if (defined_default(value2)) {
      return value2;
    }
  }
}
var forEachTextureInMaterial_default = forEachTextureInMaterial;

// packages/gltf/Source/getNodeTransform.js
function getNodeTransform(nodeJson) {
  const { matrix, translation, rotation, scale } = nodeJson;
  if (defined_default(matrix)) {
    return matrix;
  }
  if (!defined_default(translation) && !defined_default(rotation) && !defined_default(scale)) {
    return void 0;
  }
  const transform = Matrix4_default.fromTranslationQuaternionRotationScale(
    defined_default(translation) ? Cartesian3_default.unpack(translation) : Cartesian3_default.ZERO,
    defined_default(rotation) ? Quaternion_default.unpack(rotation) : Quaternion_default.IDENTITY,
    defined_default(scale) ? Cartesian3_default.unpack(scale) : new Cartesian3_default(1, 1, 1)
  );
  return Matrix4_default.pack(transform, new Array(16));
}
var getNodeTransform_default = getNodeTransform;

// packages/gltf/Source/moveTechniqueRenderStates.js
var defaultBlendEquation = [WebGLConstants_default.FUNC_ADD, WebGLConstants_default.FUNC_ADD];
var defaultBlendFactors = [
  WebGLConstants_default.ONE,
  WebGLConstants_default.ZERO,
  WebGLConstants_default.ONE,
  WebGLConstants_default.ZERO
];
function isStateEnabled(renderStates, state) {
  const enabled = renderStates.enable;
  if (!defined_default(enabled)) {
    return false;
  }
  return enabled.indexOf(state) > -1;
}
var supportedBlendFactors = [
  WebGLConstants_default.ZERO,
  WebGLConstants_default.ONE,
  WebGLConstants_default.SRC_COLOR,
  WebGLConstants_default.ONE_MINUS_SRC_COLOR,
  WebGLConstants_default.SRC_ALPHA,
  WebGLConstants_default.ONE_MINUS_SRC_ALPHA,
  WebGLConstants_default.DST_ALPHA,
  WebGLConstants_default.ONE_MINUS_DST_ALPHA,
  WebGLConstants_default.DST_COLOR,
  WebGLConstants_default.ONE_MINUS_DST_COLOR
];
function getSupportedBlendFactors(value, defaultValue) {
  if (!defined_default(value)) {
    return defaultValue;
  }
  for (let i = 0; i < 4; i++) {
    if (supportedBlendFactors.indexOf(value[i]) === -1) {
      return defaultValue;
    }
  }
  return value;
}
function moveTechniqueRenderStates(gltf3) {
  const blendingForTechnique = {};
  const materialPropertiesForTechnique = {};
  const techniquesLegacy = gltf3.techniques;
  if (!defined_default(techniquesLegacy)) {
    return gltf3;
  }
  ForEach_default.technique(gltf3, function(techniqueLegacy, techniqueIndex) {
    const renderStates = techniqueLegacy.states;
    if (defined_default(renderStates)) {
      const materialProperties = materialPropertiesForTechnique[techniqueIndex] = {};
      if (isStateEnabled(renderStates, WebGLConstants_default.BLEND)) {
        materialProperties.alphaMode = "BLEND";
        const blendFunctions = renderStates.functions;
        if (defined_default(blendFunctions) && (defined_default(blendFunctions.blendEquationSeparate) || defined_default(blendFunctions.blendFuncSeparate))) {
          blendingForTechnique[techniqueIndex] = {
            blendEquation: blendFunctions.blendEquationSeparate ?? defaultBlendEquation,
            blendFactors: getSupportedBlendFactors(
              blendFunctions.blendFuncSeparate,
              defaultBlendFactors
            )
          };
        }
      }
      if (!isStateEnabled(renderStates, WebGLConstants_default.CULL_FACE)) {
        materialProperties.doubleSided = true;
      }
      delete techniqueLegacy.states;
    }
  });
  if (Object.keys(blendingForTechnique).length > 0) {
    if (!defined_default(gltf3.extensions)) {
      gltf3.extensions = {};
    }
    addExtensionsUsed_default(gltf3, "KHR_blend");
  }
  ForEach_default.material(gltf3, function(material) {
    if (defined_default(material.technique)) {
      const materialProperties = materialPropertiesForTechnique[material.technique];
      ForEach_default.objectLegacy(materialProperties, function(value, property) {
        material[property] = value;
      });
      const blending = blendingForTechnique[material.technique];
      if (defined_default(blending)) {
        if (!defined_default(material.extensions)) {
          material.extensions = {};
        }
        material.extensions.KHR_blend = blending;
      }
    }
  });
  return gltf3;
}
var moveTechniqueRenderStates_default = moveTechniqueRenderStates;

// packages/gltf/Source/moveTechniquesToExtension.js
function moveTechniquesToExtension(gltf3) {
  const techniquesLegacy = gltf3.techniques;
  const mappedUniforms = {};
  const updatedTechniqueIndices = {};
  const seenPrograms = {};
  if (defined_default(techniquesLegacy)) {
    const extension = {
      programs: [],
      shaders: [],
      techniques: []
    };
    const glExtensions = gltf3.glExtensionsUsed;
    delete gltf3.glExtensionsUsed;
    ForEach_default.technique(gltf3, function(techniqueLegacy, techniqueId) {
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
          if (!defined_default(mappedUniforms[techniqueId])) {
            mappedUniforms[techniqueId] = {};
          }
          mappedUniforms[techniqueId][parameterName] = uniformName;
        }
      );
      if (!defined_default(seenPrograms[techniqueLegacy.program])) {
        const programLegacy = gltf3.programs[techniqueLegacy.program];
        const program = {
          name: programLegacy.name,
          fragmentShader: void 0,
          vertexShader: void 0,
          glExtensions
        };
        const fs = gltf3.shaders[programLegacy.fragmentShader];
        program.fragmentShader = addToArray_default(extension.shaders, fs, true);
        const vs = gltf3.shaders[programLegacy.vertexShader];
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
      if (!defined_default(gltf3.extensions)) {
        gltf3.extensions = {};
      }
      gltf3.extensions.KHR_techniques_webgl = extension;
      addExtensionsUsed_default(gltf3, "KHR_techniques_webgl");
      addExtensionsRequired_default(gltf3, "KHR_techniques_webgl");
    }
  }
  ForEach_default.material(gltf3, function(material) {
    if (defined_default(material.technique)) {
      const materialExtension = {
        technique: updatedTechniqueIndices[material.technique]
      };
      ForEach_default.objectLegacy(material.values, function(value, parameterName) {
        if (!defined_default(materialExtension.values)) {
          materialExtension.values = {};
        }
        const uniformName = mappedUniforms[material.technique][parameterName];
        if (defined_default(uniformName)) {
          materialExtension.values[uniformName] = value;
        }
      });
      if (!defined_default(material.extensions)) {
        material.extensions = {};
      }
      material.extensions.KHR_techniques_webgl = materialExtension;
    }
    delete material.technique;
    delete material.values;
  });
  delete gltf3.techniques;
  delete gltf3.programs;
  delete gltf3.shaders;
  return gltf3;
}
var moveTechniquesToExtension_default = moveTechniquesToExtension;

// packages/gltf/Source/removeExtensionsRequired.js
function removeExtensionsRequired(gltf3, extension) {
  const extensionsRequired = gltf3.extensionsRequired;
  if (defined_default(extensionsRequired)) {
    const index = extensionsRequired.indexOf(extension);
    if (index >= 0) {
      extensionsRequired.splice(index, 1);
    }
    if (extensionsRequired.length === 0) {
      delete gltf3.extensionsRequired;
    }
  }
}
var removeExtensionsRequired_default = removeExtensionsRequired;

// packages/gltf/Source/removeExtensionsUsed.js
function removeExtensionsUsed(gltf3, extension) {
  const extensionsUsed = gltf3.extensionsUsed;
  if (defined_default(extensionsUsed)) {
    const index = extensionsUsed.indexOf(extension);
    if (index >= 0) {
      extensionsUsed.splice(index, 1);
    }
    removeExtensionsRequired_default(gltf3, extension);
    if (extensionsUsed.length === 0) {
      delete gltf3.extensionsUsed;
    }
  }
}
var removeExtensionsUsed_default = removeExtensionsUsed;

// packages/gltf/Source/parseGlb.js
var sizeOfUint32 = 4;
function parseGlb(glb) {
  const magic = getMagic_default(glb);
  if (magic !== "glTF") {
    throw new RuntimeError_default("File is not valid binary glTF");
  }
  const header = readHeader(glb, 0, 5);
  const version = header[1];
  if (version !== 1 && version !== 2) {
    throw new RuntimeError_default("Binary glTF version is not 1 or 2");
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
    throw new RuntimeError_default("Binary glTF scene format is not JSON");
  }
  const jsonStart = 20;
  const binaryStart = jsonStart + contentLength;
  const contentString = getStringFromTypedArray_default(glb, jsonStart, contentLength);
  const gltf3 = JSON.parse(contentString);
  addPipelineExtras_default(gltf3);
  const binaryBuffer = glb.subarray(binaryStart, length);
  const buffers = gltf3.buffers;
  if (defined_default(buffers) && Object.keys(buffers).length > 0) {
    const binaryGltfBuffer = buffers.binary_glTF ?? buffers.KHR_binary_glTF;
    if (defined_default(binaryGltfBuffer)) {
      binaryGltfBuffer.extras._pipeline.source = binaryBuffer;
      delete binaryGltfBuffer.uri;
    }
  }
  removeExtensionsUsed_default(gltf3, "KHR_binary_glTF");
  return gltf3;
}
function parseGlbVersion2(glb, header) {
  const length = header[2];
  let byteOffset = 12;
  let gltf3;
  let binaryBuffer;
  while (byteOffset < length) {
    const chunkHeader = readHeader(glb, byteOffset, 2);
    const chunkLength = chunkHeader[0];
    const chunkType = chunkHeader[1];
    byteOffset += 8;
    const chunkBuffer = glb.subarray(byteOffset, byteOffset + chunkLength);
    byteOffset += chunkLength;
    if (chunkType === 1313821514) {
      const jsonString = getStringFromTypedArray_default(chunkBuffer);
      gltf3 = JSON.parse(jsonString);
      addPipelineExtras_default(gltf3);
    } else if (chunkType === 5130562) {
      binaryBuffer = chunkBuffer;
    }
  }
  if (defined_default(gltf3) && defined_default(binaryBuffer)) {
    const buffers = gltf3.buffers;
    if (defined_default(buffers) && buffers.length > 0) {
      const buffer2 = buffers[0];
      buffer2.extras._pipeline.source = binaryBuffer;
    }
  }
  return gltf3;
}
var parseGlb_default = parseGlb;

// packages/gltf/Source/readAccessorPacked.js
function readAccessorPacked(gltf3, accessor) {
  const byteStride = getAccessorByteStride_default(gltf3, accessor);
  const numberOfComponents = numberOfComponentsForType_default(accessor.type);
  const count = accessor.count;
  const values = new Array(numberOfComponents * count);
  if (!defined_default(accessor.bufferView)) {
    return values.fill(0);
  }
  const bufferView = gltf3.bufferViews[accessor.bufferView];
  const source = gltf3.buffers[bufferView.buffer].extras._pipeline.source;
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
function removeExtension(gltf3, extension) {
  removeExtensionsUsed_default(gltf3, extension);
  if (extension === "CESIUM_RTC") {
    removeCesiumRTC(gltf3);
  }
  return removeExtensionAndTraverse(gltf3, extension);
}
function removeCesiumRTC(gltf3) {
  ForEach_default.technique(gltf3, function(technique) {
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
    if (defined_default(extensions)) {
      extensionData = extensions[extension];
      if (defined_default(extensionData)) {
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
function removePipelineExtras(gltf3) {
  ForEach_default.shader(gltf3, function(shader) {
    removeExtras(shader);
  });
  ForEach_default.buffer(gltf3, function(buffer2) {
    removeExtras(buffer2);
  });
  ForEach_default.image(gltf3, function(image) {
    removeExtras(image);
  });
  removeExtras(gltf3);
  return gltf3;
}
function removeExtras(object) {
  if (!defined_default(object.extras)) {
    return;
  }
  if (defined_default(object.extras._pipeline)) {
    delete object.extras._pipeline;
  }
  if (Object.keys(object.extras).length === 0) {
    delete object.extras;
  }
}
var removePipelineExtras_default = removePipelineExtras;

// packages/gltf/Source/removeUnusedElements.js
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
function removeUnusedElements(gltf3, elementTypes) {
  elementTypes = elementTypes ?? allElementTypes;
  allElementTypes.forEach(function(type) {
    if (elementTypes.indexOf(type) > -1) {
      removeUnusedElementsByType(gltf3, type);
    }
  });
  return gltf3;
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
function removeUnusedElementsByType(gltf3, type) {
  const name = TypeToGltfElementName[type];
  const arrayOfObjects = gltf3[name];
  if (defined_default(arrayOfObjects)) {
    let removed = 0;
    const usedIds = getListOfElementsIdsInUse[type](gltf3);
    const length = arrayOfObjects.length;
    for (let i = 0; i < length; ++i) {
      if (!usedIds[i]) {
        Remove[type](gltf3, i - removed);
        removed++;
      }
    }
  }
}
function Remove() {
}
Remove.accessor = function(gltf3, accessorId) {
  const accessors = gltf3.accessors;
  accessors.splice(accessorId, 1);
  ForEach_default.mesh(gltf3, function(mesh) {
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
      if (defined_default(indices) && indices > accessorId) {
        primitive.indices--;
      }
      const ext = primitive.extensions;
      if (defined_default(ext) && defined_default(ext.CESIUM_primitive_outline) && ext.CESIUM_primitive_outline.indices > accessorId) {
        --ext.CESIUM_primitive_outline.indices;
      }
    });
  });
  ForEach_default.skin(gltf3, function(skin) {
    if (defined_default(skin.inverseBindMatrices) && skin.inverseBindMatrices > accessorId) {
      skin.inverseBindMatrices--;
    }
  });
  ForEach_default.animation(gltf3, function(animation) {
    ForEach_default.animationSampler(animation, function(sampler) {
      if (defined_default(sampler.input) && sampler.input > accessorId) {
        sampler.input--;
      }
      if (defined_default(sampler.output) && sampler.output > accessorId) {
        sampler.output--;
      }
    });
  });
};
Remove.buffer = function(gltf3, bufferId) {
  const buffers = gltf3.buffers;
  buffers.splice(bufferId, 1);
  ForEach_default.bufferView(gltf3, function(bufferView) {
    if (defined_default(bufferView.buffer) && bufferView.buffer > bufferId) {
      bufferView.buffer--;
    }
    const extensions = bufferView.extensions;
    if (defined_default(extensions)) {
      const ext = extensions.EXT_meshopt_compression;
      if (defined_default(ext) && ext.buffer > bufferId) {
        ext.buffer--;
      }
      const khr = extensions.KHR_meshopt_compression;
      if (defined_default(khr) && khr.buffer > bufferId) {
        khr.buffer--;
      }
    }
  });
};
Remove.bufferView = function(gltf3, bufferViewId) {
  const bufferViews = gltf3.bufferViews;
  bufferViews.splice(bufferViewId, 1);
  ForEach_default.accessor(gltf3, function(accessor) {
    if (defined_default(accessor.bufferView) && accessor.bufferView > bufferViewId) {
      accessor.bufferView--;
    }
  });
  ForEach_default.shader(gltf3, function(shader) {
    if (defined_default(shader.bufferView) && shader.bufferView > bufferViewId) {
      shader.bufferView--;
    }
  });
  ForEach_default.image(gltf3, function(image) {
    if (defined_default(image.bufferView) && image.bufferView > bufferViewId) {
      image.bufferView--;
    }
  });
  if (usesExtension_default(gltf3, "KHR_draco_mesh_compression")) {
    ForEach_default.mesh(gltf3, function(mesh) {
      ForEach_default.meshPrimitive(mesh, function(primitive) {
        if (defined_default(primitive.extensions) && defined_default(primitive.extensions.KHR_draco_mesh_compression)) {
          if (primitive.extensions.KHR_draco_mesh_compression.bufferView > bufferViewId) {
            primitive.extensions.KHR_draco_mesh_compression.bufferView--;
          }
        }
      });
    });
  }
  if (usesExtension_default(gltf3, "EXT_feature_metadata")) {
    const extension = gltf3.extensions.EXT_feature_metadata;
    const featureTables = extension.featureTables;
    for (const featureTableId in featureTables) {
      if (featureTables.hasOwnProperty(featureTableId)) {
        const featureTable = featureTables[featureTableId];
        const properties = featureTable.properties;
        if (defined_default(properties)) {
          for (const propertyId in properties) {
            if (properties.hasOwnProperty(propertyId)) {
              const property = properties[propertyId];
              if (defined_default(property.bufferView) && property.bufferView > bufferViewId) {
                property.bufferView--;
              }
              if (defined_default(property.arrayOffsetBufferView) && property.arrayOffsetBufferView > bufferViewId) {
                property.arrayOffsetBufferView--;
              }
              if (defined_default(property.stringOffsetBufferView) && property.stringOffsetBufferView > bufferViewId) {
                property.stringOffsetBufferView--;
              }
            }
          }
        }
      }
    }
  }
  if (usesExtension_default(gltf3, "EXT_structural_metadata")) {
    const extension = gltf3.extensions.EXT_structural_metadata;
    const propertyTables = extension.propertyTables;
    if (defined_default(propertyTables)) {
      const propertyTablesLength = propertyTables.length;
      for (let i = 0; i < propertyTablesLength; ++i) {
        const propertyTable = propertyTables[i];
        const properties = propertyTable.properties;
        for (const propertyId in properties) {
          if (properties.hasOwnProperty(propertyId)) {
            const property = properties[propertyId];
            if (defined_default(property.values) && property.values > bufferViewId) {
              property.values--;
            }
            if (defined_default(property.arrayOffsets) && property.arrayOffsets > bufferViewId) {
              property.arrayOffsets--;
            }
            if (defined_default(property.stringOffsets) && property.stringOffsets > bufferViewId) {
              property.stringOffsets--;
            }
          }
        }
      }
    }
  }
};
Remove.image = function(gltf3, imageId) {
  const images = gltf3.images;
  images.splice(imageId, 1);
  ForEach_default.texture(gltf3, function(texture) {
    if (defined_default(texture.source)) {
      if (texture.source > imageId) {
        --texture.source;
      }
    }
    const ext = texture.extensions;
    if (defined_default(ext) && defined_default(ext.EXT_texture_webp) && ext.EXT_texture_webp.source > imageId) {
      --texture.extensions.EXT_texture_webp.source;
    } else if (defined_default(ext) && defined_default(ext.KHR_texture_basisu) && ext.KHR_texture_basisu.source > imageId) {
      --texture.extensions.KHR_texture_basisu.source;
    }
  });
};
Remove.mesh = function(gltf3, meshId) {
  const meshes = gltf3.meshes;
  meshes.splice(meshId, 1);
  ForEach_default.node(gltf3, function(node) {
    if (defined_default(node.mesh)) {
      if (node.mesh > meshId) {
        node.mesh--;
      } else if (node.mesh === meshId) {
        delete node.mesh;
      }
    }
  });
};
Remove.node = function(gltf3, nodeId) {
  const nodes = gltf3.nodes;
  nodes.splice(nodeId, 1);
  ForEach_default.skin(gltf3, function(skin) {
    if (defined_default(skin.skeleton) && skin.skeleton > nodeId) {
      skin.skeleton--;
    }
    skin.joints = skin.joints.map(function(x) {
      return x > nodeId ? x - 1 : x;
    });
  });
  ForEach_default.animation(gltf3, function(animation) {
    ForEach_default.animationChannel(animation, function(channel) {
      if (defined_default(channel.target) && defined_default(channel.target.node) && channel.target.node > nodeId) {
        channel.target.node--;
      }
    });
  });
  ForEach_default.technique(gltf3, function(technique) {
    ForEach_default.techniqueUniform(technique, function(uniform) {
      if (defined_default(uniform.node) && uniform.node > nodeId) {
        uniform.node--;
      }
    });
  });
  ForEach_default.node(gltf3, function(node) {
    if (!defined_default(node.children)) {
      return;
    }
    node.children = node.children.filter(function(x) {
      return x !== nodeId;
    }).map(function(x) {
      return x > nodeId ? x - 1 : x;
    });
  });
  ForEach_default.scene(gltf3, function(scene) {
    scene.nodes = scene.nodes.filter(function(x) {
      return x !== nodeId;
    }).map(function(x) {
      return x > nodeId ? x - 1 : x;
    });
  });
};
Remove.material = function(gltf3, materialId) {
  const materials = gltf3.materials;
  materials.splice(materialId, 1);
  ForEach_default.mesh(gltf3, function(mesh) {
    ForEach_default.meshPrimitive(mesh, function(primitive) {
      if (defined_default(primitive.material) && primitive.material > materialId) {
        primitive.material--;
      }
    });
  });
};
Remove.sampler = function(gltf3, samplerId) {
  const samplers = gltf3.samplers;
  samplers.splice(samplerId, 1);
  ForEach_default.texture(gltf3, function(texture) {
    if (defined_default(texture.sampler)) {
      if (texture.sampler > samplerId) {
        --texture.sampler;
      }
    }
  });
};
Remove.texture = function(gltf3, textureId) {
  const textures = gltf3.textures;
  textures.splice(textureId, 1);
  ForEach_default.material(gltf3, function(material) {
    forEachTextureInMaterial_default(material, function(textureIndex, textureInfo) {
      if (textureInfo.index > textureId) {
        --textureInfo.index;
      }
    });
  });
  if (usesExtension_default(gltf3, "EXT_feature_metadata")) {
    ForEach_default.mesh(gltf3, function(mesh) {
      ForEach_default.meshPrimitive(mesh, function(primitive) {
        const extensions = primitive.extensions;
        if (defined_default(extensions) && defined_default(extensions.EXT_feature_metadata)) {
          const extension2 = extensions.EXT_feature_metadata;
          const featureIdTextures = extension2.featureIdTextures;
          if (defined_default(featureIdTextures)) {
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
    const extension = gltf3.extensions.EXT_feature_metadata;
    const featureTextures = extension.featureTextures;
    for (const featureTextureId in featureTextures) {
      if (featureTextures.hasOwnProperty(featureTextureId)) {
        const featureTexture = featureTextures[featureTextureId];
        const properties = featureTexture.properties;
        if (defined_default(properties)) {
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
  if (usesExtension_default(gltf3, "EXT_mesh_features")) {
    ForEach_default.mesh(gltf3, function(mesh) {
      ForEach_default.meshPrimitive(mesh, function(primitive) {
        const extensions = primitive.extensions;
        if (defined_default(extensions) && defined_default(extensions.EXT_mesh_features)) {
          const extension = extensions.EXT_mesh_features;
          const featureIds = extension.featureIds;
          if (defined_default(featureIds)) {
            const featureIdsLength = featureIds.length;
            for (let i = 0; i < featureIdsLength; ++i) {
              const featureId = featureIds[i];
              if (defined_default(featureId.texture)) {
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
  if (usesExtension_default(gltf3, "EXT_structural_metadata")) {
    const extension = gltf3.extensions.EXT_structural_metadata;
    const propertyTextures = extension.propertyTextures;
    if (defined_default(propertyTextures)) {
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
getListOfElementsIdsInUse.accessor = function(gltf3) {
  const usedAccessorIds = {};
  ForEach_default.mesh(gltf3, function(mesh) {
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
      if (defined_default(indices)) {
        usedAccessorIds[indices] = true;
      }
    });
  });
  ForEach_default.skin(gltf3, function(skin) {
    if (defined_default(skin.inverseBindMatrices)) {
      usedAccessorIds[skin.inverseBindMatrices] = true;
    }
  });
  ForEach_default.animation(gltf3, function(animation) {
    ForEach_default.animationSampler(animation, function(sampler) {
      if (defined_default(sampler.input)) {
        usedAccessorIds[sampler.input] = true;
      }
      if (defined_default(sampler.output)) {
        usedAccessorIds[sampler.output] = true;
      }
    });
  });
  if (usesExtension_default(gltf3, "EXT_mesh_gpu_instancing")) {
    ForEach_default.node(gltf3, function(node) {
      if (defined_default(node.extensions) && defined_default(node.extensions.EXT_mesh_gpu_instancing)) {
        Object.keys(node.extensions.EXT_mesh_gpu_instancing.attributes).forEach(
          function(key) {
            const attributeAccessorId = node.extensions.EXT_mesh_gpu_instancing.attributes[key];
            usedAccessorIds[attributeAccessorId] = true;
          }
        );
      }
    });
  }
  if (usesExtension_default(gltf3, "CESIUM_primitive_outline")) {
    ForEach_default.mesh(gltf3, function(mesh) {
      ForEach_default.meshPrimitive(mesh, function(primitive) {
        const extensions = primitive.extensions;
        if (defined_default(extensions) && defined_default(extensions.CESIUM_primitive_outline)) {
          const extension = extensions.CESIUM_primitive_outline;
          const indicesAccessorId = extension.indices;
          if (defined_default(indicesAccessorId)) {
            usedAccessorIds[indicesAccessorId] = true;
          }
        }
      });
    });
  }
  return usedAccessorIds;
};
getListOfElementsIdsInUse.buffer = function(gltf3) {
  const usedBufferIds = {};
  ForEach_default.bufferView(gltf3, function(bufferView) {
    if (defined_default(bufferView.buffer)) {
      usedBufferIds[bufferView.buffer] = true;
    }
    const extensions = bufferView.extensions;
    if (defined_default(extensions)) {
      const ext = extensions.EXT_meshopt_compression;
      if (defined_default(ext)) {
        usedBufferIds[ext.buffer] = true;
      }
      const khr = extensions.KHR_meshopt_compression;
      if (defined_default(khr)) {
        usedBufferIds[khr.buffer] = true;
      }
    }
  });
  return usedBufferIds;
};
getListOfElementsIdsInUse.bufferView = function(gltf3) {
  const usedBufferViewIds = {};
  ForEach_default.accessor(gltf3, function(accessor) {
    if (defined_default(accessor.bufferView)) {
      usedBufferViewIds[accessor.bufferView] = true;
    }
  });
  ForEach_default.shader(gltf3, function(shader) {
    if (defined_default(shader.bufferView)) {
      usedBufferViewIds[shader.bufferView] = true;
    }
  });
  ForEach_default.image(gltf3, function(image) {
    if (defined_default(image.bufferView)) {
      usedBufferViewIds[image.bufferView] = true;
    }
  });
  if (usesExtension_default(gltf3, "KHR_draco_mesh_compression")) {
    ForEach_default.mesh(gltf3, function(mesh) {
      ForEach_default.meshPrimitive(mesh, function(primitive) {
        if (defined_default(primitive.extensions) && defined_default(primitive.extensions.KHR_draco_mesh_compression)) {
          usedBufferViewIds[primitive.extensions.KHR_draco_mesh_compression.bufferView] = true;
        }
      });
    });
  }
  if (usesExtension_default(gltf3, "EXT_feature_metadata")) {
    const extension = gltf3.extensions.EXT_feature_metadata;
    const featureTables = extension.featureTables;
    for (const featureTableId in featureTables) {
      if (featureTables.hasOwnProperty(featureTableId)) {
        const featureTable = featureTables[featureTableId];
        const properties = featureTable.properties;
        if (defined_default(properties)) {
          for (const propertyId in properties) {
            if (properties.hasOwnProperty(propertyId)) {
              const property = properties[propertyId];
              if (defined_default(property.bufferView)) {
                usedBufferViewIds[property.bufferView] = true;
              }
              if (defined_default(property.arrayOffsetBufferView)) {
                usedBufferViewIds[property.arrayOffsetBufferView] = true;
              }
              if (defined_default(property.stringOffsetBufferView)) {
                usedBufferViewIds[property.stringOffsetBufferView] = true;
              }
            }
          }
        }
      }
    }
  }
  if (usesExtension_default(gltf3, "EXT_structural_metadata")) {
    const extension = gltf3.extensions.EXT_structural_metadata;
    const propertyTables = extension.propertyTables;
    if (defined_default(propertyTables)) {
      const propertyTablesLength = propertyTables.length;
      for (let i = 0; i < propertyTablesLength; ++i) {
        const propertyTable = propertyTables[i];
        const properties = propertyTable.properties;
        for (const propertyId in properties) {
          if (properties.hasOwnProperty(propertyId)) {
            const property = properties[propertyId];
            if (defined_default(property.values)) {
              usedBufferViewIds[property.values] = true;
            }
            if (defined_default(property.arrayOffsets)) {
              usedBufferViewIds[property.arrayOffsets] = true;
            }
            if (defined_default(property.stringOffsets)) {
              usedBufferViewIds[property.stringOffsets] = true;
            }
          }
        }
      }
    }
  }
  return usedBufferViewIds;
};
getListOfElementsIdsInUse.image = function(gltf3) {
  const usedImageIds = {};
  ForEach_default.texture(gltf3, function(texture) {
    if (defined_default(texture.source)) {
      usedImageIds[texture.source] = true;
    }
    if (defined_default(texture.extensions) && defined_default(texture.extensions.EXT_texture_webp)) {
      usedImageIds[texture.extensions.EXT_texture_webp.source] = true;
    } else if (defined_default(texture.extensions) && defined_default(texture.extensions.KHR_texture_basisu)) {
      usedImageIds[texture.extensions.KHR_texture_basisu.source] = true;
    }
  });
  return usedImageIds;
};
getListOfElementsIdsInUse.mesh = function(gltf3) {
  const usedMeshIds = {};
  ForEach_default.node(gltf3, function(node) {
    if (defined_default(node.mesh && defined_default(gltf3.meshes))) {
      const mesh = gltf3.meshes[node.mesh];
      if (defined_default(mesh) && defined_default(mesh.primitives) && mesh.primitives.length > 0) {
        usedMeshIds[node.mesh] = true;
      }
    }
  });
  return usedMeshIds;
};
function nodeIsEmpty(gltf3, nodeId, usedNodeIds) {
  const node = gltf3.nodes[nodeId];
  if (defined_default(node.mesh) || defined_default(node.camera) || defined_default(node.skin) || defined_default(node.weights) || defined_default(node.extras) || defined_default(node.extensions) && Object.keys(node.extensions).length !== 0 || defined_default(usedNodeIds[nodeId])) {
    return false;
  }
  return !defined_default(node.children) || node.children.filter(function(n) {
    return !nodeIsEmpty(gltf3, n, usedNodeIds);
  }).length === 0;
}
getListOfElementsIdsInUse.node = function(gltf3) {
  const usedNodeIds = {};
  ForEach_default.skin(gltf3, function(skin) {
    if (defined_default(skin.skeleton)) {
      usedNodeIds[skin.skeleton] = true;
    }
    ForEach_default.skinJoint(skin, function(joint) {
      usedNodeIds[joint] = true;
    });
  });
  ForEach_default.animation(gltf3, function(animation) {
    ForEach_default.animationChannel(animation, function(channel) {
      if (defined_default(channel.target) && defined_default(channel.target.node)) {
        usedNodeIds[channel.target.node] = true;
      }
    });
  });
  ForEach_default.technique(gltf3, function(technique) {
    ForEach_default.techniqueUniform(technique, function(uniform) {
      if (defined_default(uniform.node)) {
        usedNodeIds[uniform.node] = true;
      }
    });
  });
  ForEach_default.node(gltf3, function(node, nodeId) {
    if (!nodeIsEmpty(gltf3, nodeId, usedNodeIds)) {
      usedNodeIds[nodeId] = true;
    }
  });
  return usedNodeIds;
};
getListOfElementsIdsInUse.material = function(gltf3) {
  const usedMaterialIds = {};
  ForEach_default.mesh(gltf3, function(mesh) {
    ForEach_default.meshPrimitive(mesh, function(primitive) {
      if (defined_default(primitive.material)) {
        usedMaterialIds[primitive.material] = true;
      }
    });
  });
  return usedMaterialIds;
};
getListOfElementsIdsInUse.texture = function(gltf3) {
  const usedTextureIds = {};
  ForEach_default.material(gltf3, function(material) {
    forEachTextureInMaterial_default(material, function(textureId) {
      usedTextureIds[textureId] = true;
    });
  });
  if (usesExtension_default(gltf3, "EXT_feature_metadata")) {
    ForEach_default.mesh(gltf3, function(mesh) {
      ForEach_default.meshPrimitive(mesh, function(primitive) {
        const extensions = primitive.extensions;
        if (defined_default(extensions) && defined_default(extensions.EXT_feature_metadata)) {
          const extension2 = extensions.EXT_feature_metadata;
          const featureIdTextures = extension2.featureIdTextures;
          if (defined_default(featureIdTextures)) {
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
    const extension = gltf3.extensions.EXT_feature_metadata;
    const featureTextures = extension.featureTextures;
    for (const featureTextureId in featureTextures) {
      if (featureTextures.hasOwnProperty(featureTextureId)) {
        const featureTexture = featureTextures[featureTextureId];
        const properties = featureTexture.properties;
        if (defined_default(properties)) {
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
  if (usesExtension_default(gltf3, "EXT_mesh_features")) {
    ForEach_default.mesh(gltf3, function(mesh) {
      ForEach_default.meshPrimitive(mesh, function(primitive) {
        const extensions = primitive.extensions;
        if (defined_default(extensions) && defined_default(extensions.EXT_mesh_features)) {
          const extension = extensions.EXT_mesh_features;
          const featureIds = extension.featureIds;
          if (defined_default(featureIds)) {
            const featureIdsLength = featureIds.length;
            for (let i = 0; i < featureIdsLength; ++i) {
              const featureId = featureIds[i];
              if (defined_default(featureId.texture)) {
                usedTextureIds[featureId.texture.index] = true;
              }
            }
          }
        }
      });
    });
  }
  if (usesExtension_default(gltf3, "EXT_structural_metadata")) {
    const extension = gltf3.extensions.EXT_structural_metadata;
    const propertyTextures = extension.propertyTextures;
    if (defined_default(propertyTextures)) {
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
getListOfElementsIdsInUse.sampler = function(gltf3) {
  const usedSamplerIds = {};
  ForEach_default.texture(gltf3, function(texture) {
    if (defined_default(texture.sampler)) {
      usedSamplerIds[texture.sampler] = true;
    }
  });
  return usedSamplerIds;
};
var removeUnusedElements_default = removeUnusedElements;

// packages/gltf/Source/updateAccessorComponentTypes.js
function updateAccessorComponentTypes(gltf3) {
  let componentType;
  ForEach_default.accessorWithSemantic(gltf3, "JOINTS_0", function(accessorId) {
    const accessor = gltf3.accessors[accessorId];
    componentType = accessor.componentType;
    if (componentType === WebGLConstants_default.BYTE) {
      convertType(gltf3, accessor, ComponentDatatype_default.UNSIGNED_BYTE);
    } else if (componentType !== WebGLConstants_default.UNSIGNED_BYTE && componentType !== WebGLConstants_default.UNSIGNED_SHORT) {
      convertType(gltf3, accessor, ComponentDatatype_default.UNSIGNED_SHORT);
    }
  });
  ForEach_default.accessorWithSemantic(gltf3, "WEIGHTS_0", function(accessorId) {
    const accessor = gltf3.accessors[accessorId];
    componentType = accessor.componentType;
    if (componentType === WebGLConstants_default.BYTE) {
      convertType(gltf3, accessor, ComponentDatatype_default.UNSIGNED_BYTE);
    } else if (componentType === WebGLConstants_default.SHORT) {
      convertType(gltf3, accessor, ComponentDatatype_default.UNSIGNED_SHORT);
    }
  });
  return gltf3;
}
function convertType(gltf3, accessor, updatedComponentType) {
  const typedArray = ComponentDatatype_default.createTypedArray(
    updatedComponentType,
    readAccessorPacked_default(gltf3, accessor)
  );
  const newBuffer = new Uint8Array(typedArray.buffer);
  accessor.bufferView = addBuffer_default(gltf3, newBuffer);
  accessor.componentType = updatedComponentType;
  accessor.byteOffset = 0;
}
var updateAccessorComponentTypes_default = updateAccessorComponentTypes;

// packages/gltf/Source/updateVersion.js
var updateFunctions = {
  0.8: glTF08to10,
  "1.0": glTF10to20,
  "2.0": void 0
};
function updateVersion(gltf3, options) {
  options = options ?? {};
  const targetVersion = options.targetVersion;
  let version = gltf3.version;
  gltf3.asset = gltf3.asset ?? {
    version: "1.0"
  };
  gltf3.asset.version = gltf3.asset.version ?? "1.0";
  version = (version ?? gltf3.asset.version).toString();
  if (!Object.prototype.hasOwnProperty.call(updateFunctions, version)) {
    if (defined_default(version)) {
      version = version.substring(0, 3);
    }
    if (!Object.prototype.hasOwnProperty.call(updateFunctions, version)) {
      version = "1.0";
    }
  }
  let updateFunction = updateFunctions[version];
  while (defined_default(updateFunction)) {
    if (version === targetVersion) {
      break;
    }
    updateFunction(gltf3, options);
    version = gltf3.asset.version;
    updateFunction = updateFunctions[version];
  }
  if (!options.keepLegacyExtensions) {
    convertTechniquesToPbr(gltf3, options);
    convertMaterialsCommonToPbr(gltf3);
  }
  return gltf3;
}
function updateInstanceTechniques(gltf3) {
  const materials = gltf3.materials;
  for (const materialId in materials) {
    if (Object.prototype.hasOwnProperty.call(materials, materialId)) {
      const material = materials[materialId];
      const instanceTechnique = material.instanceTechnique;
      if (defined_default(instanceTechnique)) {
        material.technique = instanceTechnique.technique;
        material.values = instanceTechnique.values;
        delete material.instanceTechnique;
      }
    }
  }
}
function setPrimitiveModes(gltf3) {
  const meshes = gltf3.meshes;
  for (const meshId in meshes) {
    if (Object.prototype.hasOwnProperty.call(meshes, meshId)) {
      const mesh = meshes[meshId];
      const primitives = mesh.primitives;
      if (defined_default(primitives)) {
        const primitivesLength = primitives.length;
        for (let i = 0; i < primitivesLength; ++i) {
          const primitive = primitives[i];
          const defaultMode = primitive.primitive ?? WebGLConstants_default.TRIANGLES;
          primitive.mode = primitive.mode ?? defaultMode;
          delete primitive.primitive;
        }
      }
    }
  }
}
function updateNodes(gltf3) {
  const nodes = gltf3.nodes;
  const axis = new Cartesian3_default();
  const quat = new Quaternion_default();
  for (const nodeId in nodes) {
    if (Object.prototype.hasOwnProperty.call(nodes, nodeId)) {
      const node = nodes[nodeId];
      if (defined_default(node.rotation)) {
        const rotation = node.rotation;
        Cartesian3_default.fromArray(rotation, 0, axis);
        Quaternion_default.fromAxisAngle(axis, rotation[3], quat);
        node.rotation = [quat.x, quat.y, quat.z, quat.w];
      }
      const instanceSkin = node.instanceSkin;
      if (defined_default(instanceSkin)) {
        node.skeletons = instanceSkin.skeletons;
        node.skin = instanceSkin.skin;
        node.meshes = instanceSkin.meshes;
        delete node.instanceSkin;
      }
    }
  }
}
function updateAnimations(gltf3) {
  const animations = gltf3.animations;
  const accessors = gltf3.accessors;
  const bufferViews = gltf3.bufferViews;
  const buffers = gltf3.buffers;
  const updatedAccessors = {};
  const axis = new Cartesian3_default();
  const quat = new Quaternion_default();
  for (const animationId in animations) {
    if (Object.prototype.hasOwnProperty.call(animations, animationId)) {
      const animation = animations[animationId];
      const channels = animation.channels;
      const parameters = animation.parameters;
      const samplers = animation.samplers;
      if (defined_default(channels)) {
        const channelsLength = channels.length;
        for (let i = 0; i < channelsLength; ++i) {
          const channel = channels[i];
          if (channel.target.path === "rotation") {
            const accessorId = parameters[samplers[channel.sampler].output];
            if (defined_default(updatedAccessors[accessorId])) {
              continue;
            }
            updatedAccessors[accessorId] = true;
            const accessor = accessors[accessorId];
            const bufferView = bufferViews[accessor.bufferView];
            const buffer2 = buffers[bufferView.buffer];
            const source = buffer2.extras._pipeline.source;
            const byteOffset = source.byteOffset + bufferView.byteOffset + accessor.byteOffset;
            const componentType = accessor.componentType;
            const count = accessor.count;
            const componentsLength = numberOfComponentsForType_default(accessor.type);
            const length = accessor.count * componentsLength;
            const typedArray = ComponentDatatype_default.createArrayBufferView(
              componentType,
              source.buffer,
              byteOffset,
              length
            );
            for (let j = 0; j < count; j++) {
              const offset = j * componentsLength;
              Cartesian3_default.unpack(typedArray, offset, axis);
              const angle = typedArray[offset + 3];
              Quaternion_default.fromAxisAngle(axis, angle, quat);
              Quaternion_default.pack(quat, typedArray, offset);
            }
          }
        }
      }
    }
  }
}
function removeTechniquePasses(gltf3) {
  const techniques = gltf3.techniques;
  for (const techniqueId in techniques) {
    if (Object.prototype.hasOwnProperty.call(techniques, techniqueId)) {
      const technique = techniques[techniqueId];
      const passes = technique.passes;
      if (defined_default(passes)) {
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
function glTF08to10(gltf3) {
  if (!defined_default(gltf3.asset)) {
    gltf3.asset = {};
  }
  const asset = gltf3.asset;
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
  if (defined_default(gltf3.version)) {
    delete gltf3.version;
  }
  updateInstanceTechniques(gltf3);
  setPrimitiveModes(gltf3);
  updateNodes(gltf3);
  updateAnimations(gltf3);
  removeTechniquePasses(gltf3);
  if (defined_default(gltf3.allExtensions)) {
    gltf3.extensionsUsed = gltf3.allExtensions;
    delete gltf3.allExtensions;
  }
  if (defined_default(gltf3.lights)) {
    const extensions = gltf3.extensions ?? {};
    gltf3.extensions = extensions;
    const materialsCommon = extensions.KHR_materials_common ?? {};
    extensions.KHR_materials_common = materialsCommon;
    materialsCommon.lights = gltf3.lights;
    delete gltf3.lights;
    addExtensionsUsed_default(gltf3, "KHR_materials_common");
  }
}
function removeAnimationSamplersIndirection(gltf3) {
  const animations = gltf3.animations;
  for (const animationId in animations) {
    if (Object.prototype.hasOwnProperty.call(animations, animationId)) {
      const animation = animations[animationId];
      const parameters = animation.parameters;
      if (defined_default(parameters)) {
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
      if (!defined_default(value.name)) {
        value.name = id;
      }
    }
  }
  return array;
}
function objectsToArrays(gltf3) {
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
  const nodes = gltf3.nodes;
  for (const id in nodes) {
    if (Object.prototype.hasOwnProperty.call(nodes, id)) {
      jointName = nodes[id].jointName;
      if (defined_default(jointName)) {
        jointNameToId[jointName] = id;
      }
    }
  }
  for (const topLevelId in gltf3) {
    if (Object.prototype.hasOwnProperty.call(gltf3, topLevelId) && defined_default(globalMapping[topLevelId])) {
      const objectMapping = {};
      const object = gltf3[topLevelId];
      gltf3[topLevelId] = objectToArray(object, objectMapping);
      globalMapping[topLevelId] = objectMapping;
    }
  }
  for (jointName in jointNameToId) {
    if (Object.prototype.hasOwnProperty.call(jointNameToId, jointName)) {
      jointNameToId[jointName] = globalMapping.nodes[jointNameToId[jointName]];
    }
  }
  if (defined_default(gltf3.scene)) {
    gltf3.scene = globalMapping.scenes[gltf3.scene];
  }
  ForEach_default.bufferView(gltf3, function(bufferView) {
    if (defined_default(bufferView.buffer)) {
      bufferView.buffer = globalMapping.buffers[bufferView.buffer];
    }
  });
  ForEach_default.accessor(gltf3, function(accessor) {
    if (defined_default(accessor.bufferView)) {
      accessor.bufferView = globalMapping.bufferViews[accessor.bufferView];
    }
  });
  ForEach_default.shader(gltf3, function(shader) {
    const extensions = shader.extensions;
    if (defined_default(extensions)) {
      const binaryGltf = extensions.KHR_binary_glTF;
      if (defined_default(binaryGltf)) {
        shader.bufferView = globalMapping.bufferViews[binaryGltf.bufferView];
        delete extensions.KHR_binary_glTF;
      }
      if (Object.keys(extensions).length === 0) {
        delete shader.extensions;
      }
    }
  });
  ForEach_default.program(gltf3, function(program) {
    if (defined_default(program.vertexShader)) {
      program.vertexShader = globalMapping.shaders[program.vertexShader];
    }
    if (defined_default(program.fragmentShader)) {
      program.fragmentShader = globalMapping.shaders[program.fragmentShader];
    }
  });
  ForEach_default.technique(gltf3, function(technique) {
    if (defined_default(technique.program)) {
      technique.program = globalMapping.programs[technique.program];
    }
    ForEach_default.techniqueParameter(technique, function(parameter) {
      if (defined_default(parameter.node)) {
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
  ForEach_default.mesh(gltf3, function(mesh) {
    ForEach_default.meshPrimitive(mesh, function(primitive) {
      if (defined_default(primitive.indices)) {
        primitive.indices = globalMapping.accessors[primitive.indices];
      }
      ForEach_default.meshPrimitiveAttribute(
        primitive,
        function(accessorId, semantic) {
          primitive.attributes[semantic] = globalMapping.accessors[accessorId];
        }
      );
      if (defined_default(primitive.material)) {
        primitive.material = globalMapping.materials[primitive.material];
      }
    });
  });
  ForEach_default.node(gltf3, function(node) {
    let children = node.children;
    if (defined_default(children)) {
      const childrenLength = children.length;
      for (i = 0; i < childrenLength; ++i) {
        children[i] = globalMapping.nodes[children[i]];
      }
    }
    if (defined_default(node.meshes)) {
      const meshes = node.meshes;
      const meshesLength = meshes.length;
      if (meshesLength > 0) {
        node.mesh = globalMapping.meshes[meshes[0]];
        for (i = 1; i < meshesLength; ++i) {
          const meshNode = {
            mesh: globalMapping.meshes[meshes[i]]
          };
          const meshNodeId = addToArray_default(gltf3.nodes, meshNode);
          if (!defined_default(children)) {
            children = [];
            node.children = children;
          }
          children.push(meshNodeId);
        }
      }
      delete node.meshes;
    }
    if (defined_default(node.camera)) {
      node.camera = globalMapping.cameras[node.camera];
    }
    if (defined_default(node.skin)) {
      node.skin = globalMapping.skins[node.skin];
    }
    if (defined_default(node.skeletons)) {
      const skeletons = node.skeletons;
      const skeletonsLength = skeletons.length;
      if (skeletonsLength > 0 && defined_default(node.skin)) {
        const skin = gltf3.skins[node.skin];
        skin.skeleton = globalMapping.nodes[skeletons[0]];
      }
      delete node.skeletons;
    }
    if (defined_default(node.jointName)) {
      delete node.jointName;
    }
  });
  ForEach_default.skin(gltf3, function(skin) {
    if (defined_default(skin.inverseBindMatrices)) {
      skin.inverseBindMatrices = globalMapping.accessors[skin.inverseBindMatrices];
    }
    const jointNames = skin.jointNames;
    if (defined_default(jointNames)) {
      const joints = [];
      const jointNamesLength = jointNames.length;
      for (i = 0; i < jointNamesLength; ++i) {
        joints[i] = jointNameToId[jointNames[i]];
      }
      skin.joints = joints;
      delete skin.jointNames;
    }
  });
  ForEach_default.scene(gltf3, function(scene) {
    const sceneNodes = scene.nodes;
    if (defined_default(sceneNodes)) {
      const sceneNodesLength = sceneNodes.length;
      for (i = 0; i < sceneNodesLength; ++i) {
        sceneNodes[i] = globalMapping.nodes[sceneNodes[i]];
      }
    }
  });
  ForEach_default.animation(gltf3, function(animation) {
    const samplerMapping = {};
    animation.samplers = objectToArray(animation.samplers, samplerMapping);
    ForEach_default.animationSampler(animation, function(sampler) {
      sampler.input = globalMapping.accessors[sampler.input];
      sampler.output = globalMapping.accessors[sampler.output];
    });
    ForEach_default.animationChannel(animation, function(channel) {
      channel.sampler = samplerMapping[channel.sampler];
      const target = channel.target;
      if (defined_default(target)) {
        target.node = globalMapping.nodes[target.id];
        delete target.id;
      }
    });
  });
  ForEach_default.material(gltf3, function(material) {
    if (defined_default(material.technique)) {
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
    if (defined_default(extensions)) {
      const materialsCommon = extensions.KHR_materials_common;
      if (defined_default(materialsCommon) && defined_default(materialsCommon.values)) {
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
  ForEach_default.image(gltf3, function(image) {
    const extensions = image.extensions;
    if (defined_default(extensions)) {
      const binaryGltf = extensions.KHR_binary_glTF;
      if (defined_default(binaryGltf)) {
        image.bufferView = globalMapping.bufferViews[binaryGltf.bufferView];
        image.mimeType = binaryGltf.mimeType;
        delete extensions.KHR_binary_glTF;
      }
      if (Object.keys(extensions).length === 0) {
        delete image.extensions;
      }
    }
  });
  ForEach_default.texture(gltf3, function(texture) {
    if (defined_default(texture.sampler)) {
      texture.sampler = globalMapping.samplers[texture.sampler];
    }
    if (defined_default(texture.source)) {
      texture.source = globalMapping.images[texture.source];
    }
  });
}
function removeAnimationSamplerNames(gltf3) {
  ForEach_default.animation(gltf3, function(animation) {
    ForEach_default.animationSampler(animation, function(sampler) {
      delete sampler.name;
    });
  });
}
function removeEmptyArrays(gltf3) {
  for (const topLevelId in gltf3) {
    if (Object.prototype.hasOwnProperty.call(gltf3, topLevelId)) {
      const array = gltf3[topLevelId];
      if (Array.isArray(array) && array.length === 0) {
        delete gltf3[topLevelId];
      }
    }
  }
  ForEach_default.node(gltf3, function(node) {
    if (defined_default(node.children) && node.children.length === 0) {
      delete node.children;
    }
  });
}
function stripAsset(gltf3) {
  const asset = gltf3.asset;
  delete asset.profile;
  delete asset.premultipliedAlpha;
}
var knownExtensions = {
  CESIUM_RTC: true,
  KHR_materials_common: true,
  WEB3D_quantized_attributes: true
};
function requireKnownExtensions(gltf3) {
  const extensionsUsed = gltf3.extensionsUsed;
  gltf3.extensionsRequired = gltf3.extensionsRequired ?? [];
  if (defined_default(extensionsUsed)) {
    const extensionsUsedLength = extensionsUsed.length;
    for (let i = 0; i < extensionsUsedLength; ++i) {
      const extension = extensionsUsed[i];
      if (defined_default(knownExtensions[extension])) {
        gltf3.extensionsRequired.push(extension);
      }
    }
  }
}
function removeBufferType(gltf3) {
  ForEach_default.buffer(gltf3, function(buffer2) {
    delete buffer2.type;
  });
}
function removeTextureProperties(gltf3) {
  ForEach_default.texture(gltf3, function(texture) {
    delete texture.format;
    delete texture.internalFormat;
    delete texture.target;
    delete texture.type;
  });
}
function requireAttributeSetIndex(gltf3) {
  ForEach_default.mesh(gltf3, function(mesh) {
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
  ForEach_default.technique(gltf3, function(technique) {
    ForEach_default.techniqueParameter(technique, function(parameter) {
      const semantic = parameter.semantic;
      if (defined_default(semantic)) {
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
function underscoreApplicationSpecificSemantics(gltf3) {
  const mappedSemantics = {};
  ForEach_default.mesh(gltf3, function(mesh) {
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
            if (defined_default(indexedSemantic)) {
              newSemantic = indexedSemantic + suffix;
              mappedSemantics[semantic] = newSemantic;
            } else if (!defined_default(knownSemantics[strippedSemantic])) {
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
          if (defined_default(accessorId)) {
            delete primitive.attributes[semantic];
            primitive.attributes[mappedSemantic] = accessorId;
          }
        }
      }
    });
  });
  ForEach_default.technique(gltf3, function(technique) {
    ForEach_default.techniqueParameter(technique, function(parameter) {
      const mappedSemantic = mappedSemantics[parameter.semantic];
      if (defined_default(mappedSemantic)) {
        parameter.semantic = mappedSemantic;
      }
    });
  });
}
function clampCameraParameters(gltf3) {
  ForEach_default.camera(gltf3, function(camera) {
    const perspective = camera.perspective;
    if (defined_default(perspective)) {
      const aspectRatio = perspective.aspectRatio;
      if (defined_default(aspectRatio) && aspectRatio === 0) {
        delete perspective.aspectRatio;
      }
      const yfov = perspective.yfov;
      if (defined_default(yfov) && yfov === 0) {
        perspective.yfov = 1;
      }
    }
  });
}
function computeAccessorByteStride(gltf3, accessor) {
  return defined_default(accessor.byteStride) && accessor.byteStride !== 0 ? accessor.byteStride : getAccessorByteStride_default(gltf3, accessor);
}
function requireByteLength(gltf3) {
  ForEach_default.buffer(gltf3, function(buffer2) {
    if (!defined_default(buffer2.byteLength)) {
      buffer2.byteLength = buffer2.extras._pipeline.source.length;
    }
  });
  ForEach_default.accessor(gltf3, function(accessor) {
    const bufferViewId = accessor.bufferView;
    if (defined_default(bufferViewId)) {
      const bufferView = gltf3.bufferViews[bufferViewId];
      const accessorByteStride = computeAccessorByteStride(gltf3, accessor);
      const accessorByteEnd = accessor.byteOffset + accessor.count * accessorByteStride;
      bufferView.byteLength = Math.max(
        bufferView.byteLength ?? 0,
        accessorByteEnd
      );
    }
  });
}
function moveByteStrideToBufferView(gltf3) {
  let i;
  let j;
  let bufferView;
  const bufferViews = gltf3.bufferViews;
  const bufferViewHasVertexAttributes = {};
  ForEach_default.accessorContainingVertexAttributeData(gltf3, function(accessorId) {
    const accessor = gltf3.accessors[accessorId];
    if (defined_default(accessor.bufferView)) {
      bufferViewHasVertexAttributes[accessor.bufferView] = true;
    }
  });
  const bufferViewMap = {};
  ForEach_default.accessor(gltf3, function(accessor) {
    if (defined_default(accessor.bufferView)) {
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
        const accessorByteStride = computeAccessorByteStride(gltf3, accessor);
        const accessorByteOffset = accessor.byteOffset;
        const accessorByteLength = accessor.count * accessorByteStride;
        delete accessor.byteStride;
        const hasNextAccessor = i < accessorsLength - 1;
        const nextAccessorByteStride = hasNextAccessor ? computeAccessorByteStride(gltf3, accessors[i + 1]) : void 0;
        if (accessorByteStride !== nextAccessorByteStride) {
          const newBufferView = clone_default(bufferView, true);
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
  removeUnusedElements_default(gltf3, ["accessor", "bufferView", "buffer"]);
}
function requirePositionAccessorMinMax(gltf3) {
  ForEach_default.accessorWithSemantic(gltf3, "POSITION", function(accessorId) {
    const accessor = gltf3.accessors[accessorId];
    if (!defined_default(accessor.min) || !defined_default(accessor.max)) {
      const minMax = findAccessorMinMax_default(gltf3, accessor);
      accessor.min = minMax.min;
      accessor.max = minMax.max;
    }
  });
}
function isNodeEmpty(node) {
  return (!defined_default(node.children) || node.children.length === 0) && (!defined_default(node.meshes) || node.meshes.length === 0) && !defined_default(node.camera) && !defined_default(node.skin) && !defined_default(node.skeletons) && !defined_default(node.jointName) && (!defined_default(node.translation) || Cartesian3_default.fromArray(node.translation).equals(Cartesian3_default.ZERO)) && (!defined_default(node.scale) || Cartesian3_default.fromArray(node.scale).equals(new Cartesian3_default(1, 1, 1))) && (!defined_default(node.rotation) || Cartesian4_default.fromArray(node.rotation).equals(
    new Cartesian4_default(0, 0, 0, 1)
  )) && (!defined_default(node.matrix) || Matrix4_default.fromColumnMajorArray(node.matrix).equals(Matrix4_default.IDENTITY)) && !defined_default(node.extensions) && !defined_default(node.extras);
}
function deleteNode(gltf3, nodeId) {
  ForEach_default.scene(gltf3, function(scene) {
    const sceneNodes = scene.nodes;
    if (defined_default(sceneNodes)) {
      const sceneNodesLength = sceneNodes.length;
      for (let i = sceneNodesLength; i >= 0; --i) {
        if (sceneNodes[i] === nodeId) {
          sceneNodes.splice(i, 1);
          return;
        }
      }
    }
  });
  ForEach_default.node(gltf3, function(parentNode, parentNodeId) {
    if (defined_default(parentNode.children)) {
      const index = parentNode.children.indexOf(nodeId);
      if (index > -1) {
        parentNode.children.splice(index, 1);
        if (isNodeEmpty(parentNode)) {
          deleteNode(gltf3, parentNodeId);
        }
      }
    }
  });
  delete gltf3.nodes[nodeId];
}
function removeEmptyNodes(gltf3) {
  ForEach_default.node(gltf3, function(node, nodeId) {
    if (isNodeEmpty(node)) {
      deleteNode(gltf3, nodeId);
    }
  });
  return gltf3;
}
function requireAnimationAccessorMinMax(gltf3) {
  ForEach_default.animation(gltf3, function(animation) {
    ForEach_default.animationSampler(animation, function(sampler) {
      const accessor = gltf3.accessors[sampler.input];
      if (!defined_default(accessor.min) || !defined_default(accessor.max)) {
        const minMax = findAccessorMinMax_default(gltf3, accessor);
        accessor.min = minMax.min;
        accessor.max = minMax.max;
      }
    });
  });
}
function validatePresentAccessorMinMax(gltf3) {
  ForEach_default.accessor(gltf3, function(accessor) {
    if (defined_default(accessor.min) || defined_default(accessor.max)) {
      const minMax = findAccessorMinMax_default(gltf3, accessor);
      if (defined_default(accessor.min)) {
        accessor.min = minMax.min;
      }
      if (defined_default(accessor.max)) {
        accessor.max = minMax.max;
      }
    }
  });
}
function glTF10to20(gltf3) {
  gltf3.asset = gltf3.asset ?? {};
  gltf3.asset.version = "2.0";
  updateInstanceTechniques(gltf3);
  removeAnimationSamplersIndirection(gltf3);
  removeEmptyNodes(gltf3);
  objectsToArrays(gltf3);
  removeAnimationSamplerNames(gltf3);
  stripAsset(gltf3);
  requireKnownExtensions(gltf3);
  requireByteLength(gltf3);
  moveByteStrideToBufferView(gltf3);
  requirePositionAccessorMinMax(gltf3);
  requireAnimationAccessorMinMax(gltf3);
  validatePresentAccessorMinMax(gltf3);
  removeBufferType(gltf3);
  removeTextureProperties(gltf3);
  requireAttributeSetIndex(gltf3);
  underscoreApplicationSpecificSemantics(gltf3);
  updateAccessorComponentTypes_default(gltf3);
  clampCameraParameters(gltf3);
  moveTechniqueRenderStates_default(gltf3);
  moveTechniquesToExtension_default(gltf3);
  removeEmptyArrays(gltf3);
}
var defaultBaseColorTextureNames = [
  "u_tex",
  "u_diffuse",
  "u_emission",
  "u_diffuse_tex"
];
var defaultBaseColorFactorNames = ["u_diffuse", "u_diffuse_mat"];
function initializePbrMaterial(material) {
  material.pbrMetallicRoughness = defined_default(material.pbrMetallicRoughness) ? material.pbrMetallicRoughness : {};
  material.pbrMetallicRoughness.roughnessFactor = 1;
  material.pbrMetallicRoughness.metallicFactor = 0;
}
function isTexture(value) {
  return defined_default(value.index);
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
function convertTechniquesToPbr(gltf3, options) {
  options = options ?? {};
  const baseColorTextureNames = options.baseColorTextureNames ?? defaultBaseColorTextureNames;
  const baseColorFactorNames = options.baseColorFactorNames ?? defaultBaseColorFactorNames;
  ForEach_default.material(gltf3, function(material) {
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
  removeExtension_default(gltf3, "KHR_techniques_webgl");
  removeExtension_default(gltf3, "KHR_blend");
}
function assignAsBaseColor(material, baseColor) {
  if (defined_default(baseColor)) {
    if (isVec4(baseColor)) {
      material.pbrMetallicRoughness.baseColorFactor = srgbToLinear(baseColor);
    } else if (isTexture(baseColor)) {
      material.pbrMetallicRoughness.baseColorTexture = baseColor;
    }
  }
}
function assignAsEmissive(material, emissive) {
  if (defined_default(emissive)) {
    if (isVec4(emissive)) {
      material.emissiveFactor = emissive.slice(0, 3);
    } else if (isTexture(emissive)) {
      material.emissiveTexture = emissive;
    }
  }
}
function convertMaterialsCommonToPbr(gltf3) {
  ForEach_default.material(gltf3, function(material) {
    const materialsCommon = (material.extensions ?? {}).KHR_materials_common;
    if (!defined_default(materialsCommon)) {
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
      addExtensionsUsed_default(gltf3, "KHR_materials_unlit");
      material.extensions = defined_default(material.extensions) ? material.extensions : {};
      material.extensions["KHR_materials_unlit"] = {};
      assignAsBaseColor(material, emission);
      assignAsBaseColor(material, ambient);
    } else {
      assignAsBaseColor(material, diffuse);
      assignAsEmissive(material, ambient);
      assignAsEmissive(material, emission);
    }
    if (defined_default(doubleSided)) {
      material.doubleSided = doubleSided;
    }
    if (defined_default(transparency)) {
      if (defined_default(material.pbrMetallicRoughness.baseColorFactor)) {
        material.pbrMetallicRoughness.baseColorFactor[3] *= transparency;
      } else {
        material.pbrMetallicRoughness.baseColorFactor = [1, 1, 1, transparency];
      }
    }
    if (defined_default(transparent)) {
      material.alphaMode = transparent ? "BLEND" : "OPAQUE";
    }
  });
  removeExtension_default(gltf3, "KHR_materials_common");
}
var updateVersion_default = updateVersion;

// packages/gltf/index.js
globalThis.CESIUM_VERSION = "1.146.0";

// packages/gltf/Specs/addBufferSpec.js
describe("addBuffer", function() {
  it("adds buffer to gltf and returns its bufferView id", function() {
    const gltf3 = {
      buffers: [],
      bufferViews: []
    };
    const buffer0 = new Uint8Array(100);
    const buffer1 = new Uint8Array(200);
    expect(addBuffer_default(gltf3, buffer0)).toBe(0);
    expect(addBuffer_default(gltf3, buffer1)).toBe(1);
    expect(gltf3.buffers.length).toBe(2);
    expect(gltf3.bufferViews.length).toBe(2);
    expect(gltf3.buffers[0].extras._pipeline.source).toEqual(buffer0);
    expect(gltf3.buffers[1].extras._pipeline.source).toEqual(buffer1);
    expect(gltf3.bufferViews[0].buffer).toBe(0);
    expect(gltf3.bufferViews[1].buffer).toBe(1);
  });
});

// packages/gltf/Specs/addDefaultsSpec.js
describe("addDefaults", function() {
  it("adds mesh, accessor, and bufferView defaults", function() {
    const gltf3 = {
      meshes: [
        {
          primitives: [
            {
              attributes: {
                POSITION: 0
              },
              indices: 2,
              targets: [
                {
                  POSITION: 1
                }
              ]
            }
          ]
        }
      ],
      accessors: [
        {
          bufferView: 0,
          componentType: WebGLConstants_default.FLOAT,
          count: 24,
          type: "VEC3",
          min: [-1, -1, -1],
          max: [1, 1, 1]
        },
        {
          bufferView: 1,
          componentType: WebGLConstants_default.FLOAT,
          count: 24,
          type: "VEC3",
          min: [-1, -1, -1],
          max: [1, 1, 1]
        },
        {
          bufferView: 2,
          componentType: WebGLConstants_default.UNSIGNED_SHORT,
          count: 36,
          type: "SCALAR",
          min: [0],
          max: [24]
        }
      ],
      bufferViews: [
        {
          buffer: 0,
          byteLength: 288
        },
        {
          buffer: 0,
          byteLength: 288,
          byteOffset: 288
        },
        {
          buffer: 0,
          byteLength: 72,
          byteOffset: 576
        },
        {
          buffer: 0,
          byteLength: 10,
          byteOffset: 648
        }
      ]
    };
    const gltfWithDefaults = addDefaults_default(gltf3);
    const primitive = gltfWithDefaults.meshes[0].primitives[0];
    const material = gltfWithDefaults.materials[0];
    const positionAccessor = gltfWithDefaults.accessors[0];
    const positionTargetAccessor = gltfWithDefaults.accessors[1];
    const indicesAccessor = gltfWithDefaults.accessors[2];
    const positionBufferView = gltfWithDefaults.bufferViews[0];
    const positionTargetBufferView = gltfWithDefaults.bufferViews[1];
    const indicesBufferView = gltfWithDefaults.bufferViews[2];
    const otherBufferView = gltfWithDefaults.bufferViews[3];
    expect(primitive.mode).toBe(WebGLConstants_default.TRIANGLES);
    expect(primitive.material).toBe(0);
    expect(material.emissiveFactor).toEqual([0, 0, 0]);
    expect(material.alphaMode).toBe("OPAQUE");
    expect(material.doubleSided).toBe(false);
    expect(material.name).toBe("default");
    expect(positionAccessor.byteOffset).toBe(0);
    expect(positionAccessor.normalized).toBe(false);
    expect(positionBufferView.byteOffset).toBe(0);
    expect(positionBufferView.byteStride).toBe(12);
    expect(positionBufferView.target).toBe(WebGLConstants_default.ARRAY_BUFFER);
    expect(positionTargetAccessor.byteOffset).toBe(0);
    expect(positionTargetAccessor.normalized).toBe(false);
    expect(positionTargetBufferView.byteStride).toBe(12);
    expect(indicesAccessor.byteOffset).toBe(0);
    expect(indicesAccessor.normalized).toBeUndefined();
    expect(indicesBufferView.byteStride).toBeUndefined();
    expect(indicesBufferView.target).toBe(WebGLConstants_default.ELEMENT_ARRAY_BUFFER);
    expect(otherBufferView.target).toBeUndefined();
  });
  it("adds material defaults", function() {
    const gltf3 = {
      materials: [
        {
          emissiveTexture: {
            index: 0
          },
          normalTexture: {
            index: 1
          },
          occlusionTexture: {
            index: 2
          }
        },
        {
          alphaMode: "MASK"
        },
        {
          extensions: {
            KHR_techniques_webgl: {
              values: {
                u_custom: {
                  index: 3
                }
              }
            }
          }
        }
      ]
    };
    const gltfWithDefaults = addDefaults_default(gltf3);
    const materialOpaque = gltfWithDefaults.materials[0];
    const materialAlphaMask = gltfWithDefaults.materials[1];
    const materialTechnique = gltfWithDefaults.materials[2].extensions.KHR_techniques_webgl;
    expect(materialOpaque.emissiveFactor).toEqual([0, 0, 0]);
    expect(materialOpaque.alphaMode).toBe("OPAQUE");
    expect(materialOpaque.doubleSided).toBe(false);
    expect(materialOpaque.emissiveTexture.texCoord).toBe(0);
    expect(materialOpaque.normalTexture.texCoord).toBe(0);
    expect(materialOpaque.occlusionTexture.texCoord).toBe(0);
    expect(materialAlphaMask.alphaCutoff).toBe(0.5);
    expect(materialTechnique.values.u_custom.texCoord).toBe(0);
  });
  it("adds metallic roughness defaults", function() {
    const gltf3 = {
      materials: [
        {
          pbrMetallicRoughness: {
            baseColorTexture: {
              index: 0
            },
            metallicRoughnessTexture: {
              index: 1
            }
          }
        }
      ]
    };
    const gltfWithDefaults = addDefaults_default(gltf3);
    const pbrMetallicRoughness = gltfWithDefaults.materials[0].pbrMetallicRoughness;
    expect(pbrMetallicRoughness.baseColorFactor).toEqual([1, 1, 1, 1]);
    expect(pbrMetallicRoughness.metallicFactor).toBe(1);
    expect(pbrMetallicRoughness.roughnessFactor).toBe(1);
    expect(pbrMetallicRoughness.baseColorTexture.texCoord).toBe(0);
    expect(pbrMetallicRoughness.metallicRoughnessTexture.texCoord).toBe(0);
  });
  it("adds spec gloss defaults", function() {
    const gltf3 = {
      materials: [
        {
          extensions: {
            KHR_materials_pbrSpecularGlossiness: {
              specularGlossinessTexture: {
                index: 0
              }
            }
          }
        }
      ]
    };
    const gltfWithDefaults = addDefaults_default(gltf3);
    const pbrSpecularGlossiness = gltfWithDefaults.materials[0].extensions.KHR_materials_pbrSpecularGlossiness;
    expect(pbrSpecularGlossiness.diffuseFactor).toEqual([1, 1, 1, 1]);
    expect(pbrSpecularGlossiness.specularFactor).toEqual([1, 1, 1]);
    expect(pbrSpecularGlossiness.glossinessFactor).toBe(1);
    expect(pbrSpecularGlossiness.specularGlossinessTexture.texCoord).toBe(0);
  });
  it("adds materials common defaults", function() {
    const gltf3 = {
      materials: [
        {
          extensions: {
            KHR_materials_common: {
              technique: "BLINN"
            }
          }
        },
        {
          extensions: {
            KHR_materials_common: {
              technique: "CONSTANT"
            }
          }
        },
        {
          extensions: {
            KHR_materials_common: {
              technique: "LAMBERT"
            }
          }
        }
      ]
    };
    const gltfWithDefaults = addDefaults_default(gltf3);
    const materialsCommonBlinn = gltfWithDefaults.materials[0].extensions.KHR_materials_common;
    const materialsCommonConstant = gltfWithDefaults.materials[1].extensions.KHR_materials_common;
    const materialsCommonLambert = gltfWithDefaults.materials[2].extensions.KHR_materials_common;
    expect(materialsCommonBlinn.values.ambient).toEqual([0, 0, 0, 1]);
    expect(materialsCommonBlinn.values.diffuse).toEqual([0, 0, 0, 1]);
    expect(materialsCommonBlinn.values.emission).toEqual([0, 0, 0, 1]);
    expect(materialsCommonBlinn.values.specular).toEqual([0, 0, 0, 1]);
    expect(materialsCommonBlinn.values.shininess).toBe(0);
    expect(materialsCommonBlinn.values.transparency).toBe(1);
    expect(materialsCommonBlinn.transparent).toBe(false);
    expect(materialsCommonBlinn.doubleSided).toBe(false);
    expect(materialsCommonConstant.values.diffuse).toBeUndefined();
    expect(materialsCommonConstant.values.specular).toBeUndefined();
    expect(materialsCommonConstant.values.shininess).toBeUndefined();
    expect(materialsCommonLambert.values.specular).toBeUndefined();
    expect(materialsCommonLambert.values.shininess).toBeUndefined();
  });
  it("adds sampler defaults", function() {
    const gltf3 = {
      samplers: [
        {
          // Intentionally empty
        }
      ]
    };
    const gltfWithDefaults = addDefaults_default(gltf3);
    const sampler = gltfWithDefaults.samplers[0];
    expect(sampler.wrapS).toBe(WebGLConstants_default.REPEAT);
    expect(sampler.wrapT).toBe(WebGLConstants_default.REPEAT);
  });
  it("adds node defaults", function() {
    const gltf3 = {
      animations: [
        {
          channels: [
            {
              sampler: 0,
              target: {
                node: 0,
                path: "rotation"
              }
            }
          ],
          samplers: [
            {
              input: 0,
              output: 1
            }
          ]
        }
      ],
      nodes: [
        {
          mesh: 0
        },
        {
          mesh: 1
        },
        {
          mesh: 2,
          translation: [1, 0, 0]
        }
      ]
    };
    const gltfWithDefaults = addDefaults_default(gltf3);
    const animatedNode = gltfWithDefaults.nodes[0];
    const staticNode1 = gltfWithDefaults.nodes[1];
    const staticNode2 = gltfWithDefaults.nodes[2];
    expect(gltfWithDefaults.animations[0].samplers[0].interpolation).toBe(
      "LINEAR"
    );
    expect(animatedNode.matrix).toBeUndefined();
    expect(animatedNode.translation).toEqual([0, 0, 0]);
    expect(animatedNode.rotation).toEqual([0, 0, 0, 1]);
    expect(animatedNode.scale).toEqual([1, 1, 1]);
    expect(staticNode1.matrix).toEqual([
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
    ]);
    expect(staticNode1.translation).toBeUndefined();
    expect(staticNode1.rotation).toBeUndefined();
    expect(staticNode1.scale).toBeUndefined();
    expect(staticNode2.matrix).toBeUndefined();
    expect(staticNode2.translation).toEqual([1, 0, 0]);
    expect(staticNode2.rotation).toEqual([0, 0, 0, 1]);
    expect(staticNode2.scale).toEqual([1, 1, 1]);
  });
  it("adds scene defaults", function() {
    const gltf3 = {
      scenes: [
        {
          nodes: [0]
        }
      ]
    };
    const gltfWithDefaults = addDefaults_default(gltf3);
    expect(gltfWithDefaults.scene).toBe(0);
  });
});

// packages/gltf/Specs/addExtensionsRequiredSpec.js
describe("addExtensionsRequired", function() {
  it("adds an extension to extensionsRequired", function() {
    const gltf3 = {};
    addExtensionsRequired_default(gltf3, "KHR_materials_pbrSpecularGlossiness");
    addExtensionsRequired_default(gltf3, "KHR_draco_mesh_compression");
    addExtensionsRequired_default(gltf3, "KHR_draco_mesh_compression");
    expect(gltf3.extensionsRequired).toEqual([
      "KHR_materials_pbrSpecularGlossiness",
      "KHR_draco_mesh_compression"
    ]);
    expect(gltf3.extensionsUsed).toEqual([
      "KHR_materials_pbrSpecularGlossiness",
      "KHR_draco_mesh_compression"
    ]);
  });
});

// packages/gltf/Specs/addExtensionsUsedSpec.js
describe("addExtensionsUsed", function() {
  it("adds an extension to extensionsUsed", function() {
    const gltf3 = {};
    addExtensionsUsed_default(gltf3, "KHR_materials_pbrSpecularGlossiness");
    addExtensionsUsed_default(gltf3, "KHR_draco_mesh_compression");
    addExtensionsUsed_default(gltf3, "KHR_draco_mesh_compression");
    expect(gltf3.extensionsUsed).toEqual([
      "KHR_materials_pbrSpecularGlossiness",
      "KHR_draco_mesh_compression"
    ]);
    expect(gltf3.extensionsRequired).toBeUndefined();
  });
});

// packages/gltf/Specs/addPipelineExtrasSpec.js
describe("addPipelineExtras", function() {
  it("adds pipeline extras to glTF 1.0 assets", function() {
    const gltf3 = {
      buffers: {
        sampleBuffer0: {
          byteLength: 100
        }
      },
      shaders: {
        sample0VS: {
          type: WebGLConstants_default.VERTEX_SHADER,
          uri: "data:,"
        }
      }
    };
    const gltfWithExtras = addPipelineExtras_default(gltf3);
    expect(
      gltfWithExtras.buffers["sampleBuffer0"].extras._pipeline
    ).toBeDefined();
    expect(gltfWithExtras.shaders["sample0VS"].extras._pipeline).toBeDefined();
  });
  it("adds pipeline extras to glTF 2.0 assets", function() {
    const gltf3 = {
      buffers: [
        {
          byteLength: 100
        }
      ],
      extensions: {
        KHR_techniques_webgl: {
          shaders: [
            {
              type: WebGLConstants_default.VERTEX_SHADER,
              uri: "data:,"
            }
          ]
        }
      },
      extensionsRequired: ["KHR_techniques_webgl"],
      extensionsUsed: ["KHR_techniques_webgl"]
    };
    const gltfWithExtras = addPipelineExtras_default(gltf3);
    expect(gltfWithExtras.buffers[0].extras._pipeline).toBeDefined();
    expect(
      gltfWithExtras.extensions.KHR_techniques_webgl.shaders[0].extras._pipeline
    ).toBeDefined();
  });
});

// packages/gltf/Specs/addToArraySpec.js
describe("addToArray", function() {
  it("adds item to array and returns its index", function() {
    const gltf3 = {
      buffers: []
    };
    const buffer0 = {
      byteLength: 100
    };
    const buffer1 = {
      byteLength: 200
    };
    expect(addToArray_default(gltf3.buffers, buffer0)).toBe(0);
    expect(addToArray_default(gltf3.buffers, buffer1)).toBe(1);
    expect(gltf3.buffers).toEqual([buffer0, buffer1]);
  });
  it("returns index of duplicate element when checkDuplicates is true", function() {
    const gltf3 = {
      buffers: []
    };
    const buffer0 = {
      byteLength: 100
    };
    const buffer1 = {
      byteLength: 200
    };
    expect(addToArray_default(gltf3.buffers, buffer0, true)).toBe(0);
    expect(addToArray_default(gltf3.buffers, buffer1, true)).toBe(1);
    expect(addToArray_default(gltf3.buffers, buffer0, true)).toBe(0);
    expect(gltf3.buffers.length).toBe(2);
    expect(addToArray_default(gltf3.buffers, buffer0)).toBe(2);
    expect(gltf3.buffers.length).toBe(3);
  });
});

// packages/gltf/Specs/constructBoundingVolumeJsonSpec.js
describe("constructBoundingVolumeJson", function() {
  const shapes = [
    { type: "box", box: { size: [2, 4, 6] } },
    { type: "sphere", sphere: { radius: 1 } },
    { type: "sphere", sphere: {} },
    { type: "capsule", capsule: {} }
  ];
  it("converts the box size to half axes centered at the origin", function() {
    const result = constructBoundingVolumeJson_default({ shape: 0 }, shapes);
    expect(result).toEqual({
      box: [0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3]
    });
  });
  it("applies the translation to the box center", function() {
    const result = constructBoundingVolumeJson_default(
      { shape: 0, translation: [10, 20, 30] },
      shapes
    );
    expect(result.box).toEqual([10, 20, 30, 1, 0, 0, 0, 2, 0, 0, 0, 3]);
  });
  it("applies the scale to the half axes", function() {
    const result = constructBoundingVolumeJson_default(
      { shape: 0, scale: [2, 3, 4] },
      shapes
    );
    expect(result.box).toEqual([0, 0, 0, 2, 0, 0, 0, 6, 0, 0, 0, 12]);
  });
  it("applies the rotation to the half axes", function() {
    const halfSqrt2 = Math.SQRT1_2;
    const result = constructBoundingVolumeJson_default(
      { shape: 0, rotation: [0, 0, halfSqrt2, halfSqrt2] },
      shapes
    );
    const expected = [0, 0, 0, 0, 1, 0, -2, 0, 0, 0, 0, 3];
    expect(result.box.length).toBe(expected.length);
    for (let i = 0; i < expected.length; i++) {
      expect(result.box[i]).toBeCloseTo(expected[i], 10);
    }
  });
  it("does not modify the translation of the input", function() {
    const translation = [1, 2, 3];
    constructBoundingVolumeJson_default({ shape: 0, translation }, shapes);
    expect(translation).toEqual([1, 2, 3]);
  });
  it("converts the sphere radius centered at the origin", function() {
    const result = constructBoundingVolumeJson_default({ shape: 1 }, shapes);
    expect(result).toEqual({ sphere: [0, 0, 0, 1] });
  });
  it("applies the translation to the sphere center", function() {
    const result = constructBoundingVolumeJson_default(
      { shape: 1, translation: [10, 20, 30] },
      shapes
    );
    expect(result.sphere).toEqual([10, 20, 30, 1]);
  });
  it("uses a default sphere radius of 0.5", function() {
    const result = constructBoundingVolumeJson_default({ shape: 2 }, shapes);
    expect(result.sphere).toEqual([0, 0, 0, 0.5]);
  });
  it("applies a uniform scale to the sphere radius", function() {
    const result = constructBoundingVolumeJson_default(
      { shape: 1, scale: [3, 3, 3] },
      shapes
    );
    expect(result.sphere).toEqual([0, 0, 0, 3]);
  });
  it("uses the largest scale component for the sphere radius", function() {
    const result = constructBoundingVolumeJson_default(
      { shape: 1, scale: [2, -5, 3] },
      shapes
    );
    expect(result.sphere).toEqual([0, 0, 0, 5]);
  });
  it("ignores the rotation for spheres", function() {
    const halfSqrt2 = Math.SQRT1_2;
    const result = constructBoundingVolumeJson_default(
      { shape: 1, rotation: [0, 0, halfSqrt2, halfSqrt2] },
      shapes
    );
    expect(result.sphere).toEqual([0, 0, 0, 1]);
  });
  it("throws for shapes other than box and sphere", function() {
    expect(function() {
      constructBoundingVolumeJson_default({ shape: 3 }, shapes);
    }).toThrowError(DeveloperError_default);
  });
});

// packages/gltf/Specs/findAccessorMinMaxSpec.js
var contiguousData = [
  -1,
  -2,
  -3,
  3,
  2,
  1,
  0,
  0,
  0,
  0.5,
  -0.5,
  0.5
];
var nan = Number.NaN;
var nonContiguousData = [
  -1,
  1,
  -1,
  nan,
  nan,
  nan,
  0,
  0,
  0,
  nan,
  nan,
  nan,
  3,
  2,
  1,
  nan,
  nan,
  nan,
  -1,
  -2,
  -3,
  nan,
  nan,
  nan
];
function createGltf(elements, byteStride) {
  const source = new Uint8Array(new Float32Array(elements).buffer);
  const byteLength = source.byteLength;
  return {
    asset: {
      version: "2.0"
    },
    accessors: [
      {
        bufferView: 0,
        byteOffset: 0,
        componentType: 5126,
        count: 4,
        type: "VEC3"
      }
    ],
    bufferViews: [
      {
        buffer: 0,
        byteOffset: 0,
        byteLength,
        byteStride
      }
    ],
    buffers: [
      {
        byteLength,
        extras: {
          _pipeline: {
            source
          }
        }
      }
    ]
  };
}
describe("findAccessorMinMax", function() {
  it("finds the min and max of an accessor", function() {
    const gltf3 = createGltf(contiguousData, 12);
    const expectedMin = [-1, -2, -3];
    const expectedMax = [3, 2, 1];
    const minMax = findAccessorMinMax_default(gltf3, gltf3.accessors[0]);
    expect(minMax.min).toEqual(expectedMin);
    expect(minMax.max).toEqual(expectedMax);
  });
  it("finds the min and max in a non-contiguous accessor", function() {
    const gltf3 = createGltf(nonContiguousData, 24);
    const expectedMin = [-1, -2, -3];
    const expectedMax = [3, 2, 1];
    const minMax = findAccessorMinMax_default(gltf3, gltf3.accessors[0]);
    expect(minMax.min).toEqual(expectedMin);
    expect(minMax.max).toEqual(expectedMax);
  });
});

// packages/gltf/Specs/ForEachSpec.js
describe("ForEach", function() {
  const gltfAccessors = {
    accessors: [
      {
        componentType: WebGLConstants_default.UNSIGNED_SHORT,
        count: 3,
        type: "SCALAR",
        bufferView: 0
      },
      {
        componentType: WebGLConstants_default.UNSIGNED_SHORT,
        count: 3,
        type: "SCALAR",
        bufferView: 1
      },
      {
        componentType: WebGLConstants_default.FLOAT,
        count: 3,
        type: "VEC3",
        bufferView: 2
      },
      {
        componentType: WebGLConstants_default.FLOAT,
        count: 3,
        type: "VEC3",
        bufferView: 3
      },
      {
        componentType: WebGLConstants_default.FLOAT,
        count: 3,
        type: "VEC3",
        bufferView: 4
      },
      {
        componentType: WebGLConstants_default.FLOAT,
        count: 3,
        type: "VEC3",
        bufferView: 5
      },
      {
        componentType: WebGLConstants_default.FLOAT,
        count: 3,
        type: "VEC3",
        bufferView: 6
      },
      {
        componentType: WebGLConstants_default.FLOAT,
        count: 3,
        type: "VEC3",
        bufferView: 7
      },
      {
        componentType: WebGLConstants_default.FLOAT,
        count: 3,
        type: "VEC3",
        bufferView: 8
      },
      {
        componentType: WebGLConstants_default.FLOAT,
        count: 3,
        type: "VEC3",
        bufferView: 9
      },
      {
        componentType: WebGLConstants_default.FLOAT,
        count: 3,
        type: "VEC3",
        bufferView: 10
      },
      {
        componentType: WebGLConstants_default.FLOAT,
        count: 3,
        type: "VEC3",
        bufferView: 11
      }
    ],
    meshes: [
      {
        primitives: [
          {
            attributes: {
              POSITION: 2,
              NORMAL: 3
            },
            indices: 0,
            targets: [
              {
                POSITION: 4,
                NORMAL: 5
              },
              {
                POSITION: 6,
                NORMAL: 7
              }
            ]
          }
        ]
      },
      {
        primitives: [
          {
            attributes: {
              POSITION: 8,
              NORMAL: 9
            },
            indices: 1,
            targets: [
              {
                POSITION: 10,
                NORMAL: 11
              }
            ]
          }
        ]
      }
    ]
  };
  it("loops over accessors", function() {
    ForEach_default.accessor(gltfAccessors, (accessor, index) => {
      expect(accessor.bufferView).toBe(index);
    });
    const returnValue = ForEach_default.accessor(gltfAccessors, (accessor, index) => {
      if (index === 1) {
        return accessor;
      }
    });
    expect(returnValue).toBe(gltfAccessors.accessors[1]);
  });
  it("loops over accessor with semantic", function() {
    let positionAccessorLength = 0;
    const returnValue = ForEach_default.accessorWithSemantic(
      gltfAccessors,
      "POSITION",
      (accessorId) => {
        expect(gltfAccessors.accessors[accessorId].bufferView).toBe(accessorId);
        positionAccessorLength++;
        if (positionAccessorLength === 5) {
          return accessorId;
        }
      }
    );
    expect(positionAccessorLength).toBe(5);
    expect(returnValue).toBe(10);
  });
  it("loops over accessors containing vertex data", function() {
    let vertexAccessorsLength = 0;
    const returnValue = ForEach_default.accessorContainingVertexAttributeData(
      gltfAccessors,
      (accessorId) => {
        expect(gltfAccessors.accessors[accessorId].bufferView).toBe(accessorId);
        vertexAccessorsLength++;
        if (vertexAccessorsLength === 10) {
          return accessorId;
        }
      }
    );
    expect(vertexAccessorsLength).toBe(10);
    expect(returnValue).toBe(11);
  });
  it("loops over accessors containing index data", function() {
    let indicesAccessorsLength = 0;
    const returnValue = ForEach_default.accessorContainingIndexData(
      gltfAccessors,
      (accessorId) => {
        expect(gltfAccessors.accessors[accessorId].bufferView).toBe(accessorId);
        indicesAccessorsLength++;
        if (indicesAccessorsLength === 2) {
          return accessorId;
        }
      }
    );
    expect(indicesAccessorsLength).toBe(2);
    expect(returnValue).toBe(1);
  });
  const gltfAnimations = {
    animations: [
      {
        channels: [
          {
            sampler: 0,
            target: {
              node: 0,
              path: "translation"
            }
          },
          {
            sampler: 1,
            target: {
              node: 0,
              path: "translation"
            }
          }
        ],
        samplers: [
          {
            input: 0,
            output: 2
          },
          {
            input: 1,
            output: 3
          }
        ]
      },
      {
        channels: [
          {
            sampler: 0,
            target: {
              node: 1,
              path: "translation"
            }
          }
        ],
        samplers: [
          {
            input: 4,
            output: 5
          }
        ]
      }
    ]
  };
  it("loops over animations", function() {
    const returnValue = ForEach_default.animation(
      gltfAnimations,
      (animation, index) => {
        expect(animation.channels[0].target.node).toBe(index);
        if (index === 1) {
          return animation;
        }
      }
    );
    expect(returnValue).toBe(gltfAnimations.animations[1]);
  });
  it("loops over animation channel", function() {
    const returnValue = ForEach_default.animationChannel(
      gltfAnimations.animations[0],
      (channel, index) => {
        expect(channel.sampler).toBe(index);
        if (index === 1) {
          return channel;
        }
      }
    );
    expect(returnValue).toBe(gltfAnimations.animations[0].channels[1]);
  });
  it("loops over animation samplers", function() {
    const returnValue = ForEach_default.animationSampler(
      gltfAnimations.animations[0],
      (sampler, index) => {
        expect(sampler.input).toBe(index);
        if (index === 1) {
          return sampler;
        }
      }
    );
    expect(returnValue).toBe(gltfAnimations.animations[0].samplers[1]);
  });
  it("loops over buffers", function() {
    const gltf3 = {
      buffers: [
        {
          uri: "0.bin",
          byteLength: 10
        },
        {
          uri: "1.bin",
          byteLength: 10
        }
      ]
    };
    const returnValue = ForEach_default.buffer(gltf3, (buffer2, index) => {
      expect(buffer2.uri).toBe(`${index}.bin`);
      if (index === 1) {
        return buffer2;
      }
    });
    expect(returnValue).toBe(gltf3.buffers[1]);
  });
  it("loops over buffers (gltf 1.0)", function() {
    const gltf3 = {
      buffers: {
        buffer0: {
          uri: "buffer0.bin"
        },
        buffer1: {
          uri: "buffer1.bin"
        }
      }
    };
    const returnValue = ForEach_default.buffer(gltf3, (buffer2, name) => {
      expect(buffer2.uri).toBe(`${name}.bin`);
      if (name === "1.bin") {
        return buffer2;
      }
    });
    expect(returnValue).toBe(gltf3.buffers[1]);
  });
  it("loops over buffer views", function() {
    const gltf3 = {
      bufferViews: [
        {
          buffer: 0,
          byteLength: 10
        },
        {
          buffer: 1,
          byteLength: 10
        }
      ]
    };
    const returnValue = ForEach_default.bufferView(gltf3, (bufferView, index) => {
      expect(bufferView.buffer).toBe(index);
      if (index === 1) {
        return bufferView;
      }
    });
    expect(returnValue).toBe(gltf3.bufferViews[1]);
  });
  it("loops over cameras", function() {
    const gltf3 = {
      cameras: [
        {
          perspective: {
            yfov: 0,
            znear: 0
          }
        },
        {
          perspective: {
            yfov: 1,
            znear: 1
          }
        }
      ]
    };
    const returnValue = ForEach_default.camera(gltf3, (camera, index) => {
      expect(camera.perspective.yfov).toBe(index);
      expect(camera.perspective.znear).toBe(index);
      if (index === 1) {
        return camera;
      }
    });
    expect(returnValue).toBe(gltf3.cameras[1]);
  });
  it("loops over images", function() {
    const gltf3 = {
      images: [
        {
          bufferView: 0
        },
        {
          bufferView: 1
        }
      ]
    };
    const returnValue = ForEach_default.image(gltf3, (image, index) => {
      expect(image.bufferView).toBe(index);
      if (index === 1) {
        return image;
      }
    });
    expect(returnValue).toBe(gltf3.images[1]);
  });
  it("loops over images (gltf 1.0)", function() {
    const gltf3 = {
      images: {
        image0: {
          uri: "image0.png"
        },
        image1: {
          uri: "image1.png"
        }
      }
    };
    const returnValue = ForEach_default.image(gltf3, (image, name) => {
      expect(image.uri).toBe(`${name}.png`);
      if (name === "image1") {
        return image;
      }
    });
    expect(returnValue).toBe(gltf3.images["image1"]);
  });
  it("loops over materials", function() {
    const gltf3 = {
      materials: [
        {
          emissiveTexture: 0
        },
        {
          emissiveTexture: 1
        }
      ]
    };
    const returnValue = ForEach_default.material(gltf3, (material, index) => {
      expect(material.emissiveTexture).toBe(index);
      if (index === 1) {
        return material;
      }
    });
    expect(returnValue).toBe(gltf3.materials[1]);
  });
  it("loops over material values", function() {
    const material = {
      name: "Texture",
      extensions: {
        KHR_techniques_webgl: {
          technique: 0,
          values: {
            u_diffuse: {
              index: 0
            },
            u_shininess: 256,
            u_specular: [0.2, 0.2, 0.2, 1]
          }
        }
      }
    };
    let count = 0;
    const returnValue = ForEach_default.materialValue(
      material,
      (value, uniformName) => {
        expect(value).toBeDefined();
        expect(uniformName.indexOf("u_")).toBe(0);
        count++;
        if (uniformName === "u_specular") {
          return value;
        }
      }
    );
    expect(count).toBe(3);
    expect(returnValue).toBe(
      material.extensions.KHR_techniques_webgl.values["u_specular"]
    );
  });
  it("loops over legacy material values", function() {
    const material = {
      name: "Texture",
      values: {
        diffuse: {
          index: 0
        },
        shininess: 256,
        specular: [0.2, 0.2, 0.2, 1]
      }
    };
    let count = 0;
    const returnValue = ForEach_default.materialValue(material, (value, materialId) => {
      expect(value).toBeDefined();
      count++;
      if (materialId === "specular") {
        return value;
      }
    });
    expect(count).toBe(3);
    expect(returnValue).toBe(material.values["specular"]);
  });
  it("loops over meshes", function() {
    const gltf3 = {
      meshes: [
        {
          primitives: [
            {
              attributes: {
                POSITION: 0,
                NORMAL: 2
              }
            }
          ]
        },
        {
          primitives: [
            {
              attributes: {
                POSITION: 1,
                NORMAL: 3
              }
            }
          ]
        }
      ]
    };
    const returnValue = ForEach_default.mesh(gltf3, (mesh, index) => {
      expect(mesh.primitives[0].attributes.POSITION).toBe(index);
      if (index === 1) {
        return mesh;
      }
    });
    expect(returnValue).toBe(gltf3.meshes[1]);
  });
  const gltfPrimitives = {
    meshes: [
      {
        primitives: [
          {
            attributes: {
              POSITION: 0,
              NORMAL: 2
            }
          },
          {
            attributes: {
              POSITION: 1,
              NORMAL: 3
            }
          }
        ]
      }
    ]
  };
  it("loops over primitives", function() {
    const mesh = gltfPrimitives.meshes[0];
    const returnValue = ForEach_default.meshPrimitive(mesh, (primitive, index) => {
      expect(primitive.attributes.POSITION).toBe(index);
      if (index === 1) {
        return primitive;
      }
    });
    expect(returnValue).toBe(gltfPrimitives.meshes[0].primitives[1]);
  });
  it("loops over attributes", function() {
    const primitive = gltfPrimitives.meshes[0].primitives[0];
    const returnValue = ForEach_default.meshPrimitiveAttribute(
      primitive,
      (accessorId, semantic) => {
        expect(primitive.attributes[semantic]).toBe(accessorId);
        if (semantic === "NORMAL") {
          return accessorId;
        }
      }
    );
    expect(returnValue).toBe(
      gltfPrimitives.meshes[0].primitives[0].attributes["NORMAL"]
    );
  });
  const gltfTargets = {
    meshes: [
      {
        primitives: [
          {
            attributes: {
              POSITION: 4,
              NORMAL: 5
            },
            targets: [
              {
                POSITION: 0,
                NORMAL: 2
              },
              {
                POSITION: 1,
                NORMAL: 3
              }
            ]
          }
        ]
      }
    ]
  };
  it("loops over targets", function() {
    const primitive = gltfTargets.meshes[0].primitives[0];
    const returnValue = ForEach_default.meshPrimitiveTarget(
      primitive,
      (target, index) => {
        expect(target.POSITION).toBe(index);
        if (index === 1) {
          return target;
        }
      }
    );
    expect(returnValue).toBe(gltfTargets.meshes[0].primitives[0].targets[1]);
  });
  it("loops over target attributes", function() {
    const target = gltfTargets.meshes[0].primitives[0].targets[0];
    const returnValue = ForEach_default.meshPrimitiveTargetAttribute(
      target,
      (accessorId, semantic) => {
        expect(target[semantic]).toBe(accessorId);
        if (semantic === "NORMAL") {
          return accessorId;
        }
      }
    );
    expect(returnValue).toBe(
      gltfTargets.meshes[0].primitives[0].targets[0]["NORMAL"]
    );
  });
  const gltfNodes = {
    nodes: [
      {
        matrix: [
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
        ],
        children: [4, 5]
      },
      {
        matrix: [
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
          1,
          0,
          0,
          1
        ]
      },
      {
        matrix: [
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
          2,
          0,
          0,
          1
        ]
      },
      {
        matrix: [
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
          3,
          0,
          0,
          1
        ]
      },
      {
        matrix: [
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
          4,
          0,
          0,
          1
        ]
      },
      {
        matrix: [
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
          5,
          0,
          0,
          1
        ]
      }
    ],
    scenes: [
      {
        nodes: [0, 1, 2]
      },
      {
        nodes: [3]
      }
    ]
  };
  it("loops over nodes", function() {
    let nodesLength = 0;
    const returnValue = ForEach_default.node(gltfNodes, (node, index) => {
      expect(node.matrix[12]).toBe(index);
      nodesLength++;
      if (nodesLength === 6) {
        return node;
      }
    });
    expect(nodesLength).toBe(6);
    expect(returnValue).toBe(gltfNodes.nodes[5]);
  });
  it("loops over nodes in tree", function() {
    let nodesInTree = 0;
    const returnValue = ForEach_default.nodeInTree(
      gltfNodes,
      gltfNodes.scenes[0].nodes,
      (node, index) => {
        expect(node.matrix[12]).toBe(index);
        nodesInTree++;
        if (nodesInTree === 5) {
          return node;
        }
      }
    );
    expect(nodesInTree).toBe(5);
    expect(returnValue).toBe(gltfNodes.nodes[2]);
  });
  it("loops over nodes in scene", function() {
    let nodesInScene0 = 0;
    let nodesInScene1 = 0;
    ForEach_default.nodeInScene(gltfNodes, gltfNodes.scenes[0], (node, index) => {
      expect(node.matrix[12]).toBe(index);
      nodesInScene0++;
    });
    const returnValue = ForEach_default.nodeInScene(
      gltfNodes,
      gltfNodes.scenes[1],
      (node, index) => {
        expect(node.matrix[12]).toBe(index);
        nodesInScene1++;
        if (nodesInScene1 === 1) {
          return node;
        }
      }
    );
    expect(nodesInScene0).toBe(5);
    expect(nodesInScene1).toBe(1);
    expect(returnValue).toBe(gltfNodes.nodes[3]);
  });
  it("loops over samplers", function() {
    const filters = [WebGLConstants_default.NEAREST, WebGLConstants_default.LINEAR];
    const gltf3 = {
      samplers: [
        {
          magFilter: filters[0],
          minFilter: filters[0]
        },
        {
          magFilter: filters[1],
          minFilter: filters[1]
        }
      ]
    };
    let count = 0;
    const returnValue = ForEach_default.sampler(gltf3, (sampler, index) => {
      expect(sampler.magFilter).toBe(filters[index]);
      expect(sampler.minFilter).toBe(filters[index]);
      expect(index).toBe(count++);
      if (index === 1) {
        return sampler;
      }
    });
    expect(returnValue).toBe(gltf3.samplers[1]);
  });
  it("loops over scenes", function() {
    const gltf3 = {
      scenes: [
        {
          nodes: [0]
        },
        {
          nodes: [1]
        }
      ]
    };
    const returnValue = ForEach_default.scene(gltf3, (scene, index) => {
      expect(scene.nodes[0]).toBe(index);
      if (index === 1) {
        return scene;
      }
    });
    expect(returnValue).toBe(gltf3.scenes[1]);
  });
  it("loops over shaders (gltf 1.0)", function() {
    const gltf3 = {
      shaders: {
        vert: {
          type: WebGLConstants_default.VERTEX_SHADER,
          uri: "vert.glsl"
        },
        frag: {
          type: WebGLConstants_default.FRAGMENT_SHADER,
          uri: "frag.glsl"
        }
      }
    };
    const returnValue = ForEach_default.shader(gltf3, (shader, name) => {
      expect(shader.uri).toBe(`${name}.glsl`);
      if (name === "frag") {
        return shader;
      }
    });
    expect(returnValue).toBe(gltf3.shaders["frag"]);
  });
  it("loops over KHR_techniques_webgl shaders (gltf 2.0)", function() {
    let gltf3 = {
      extensions: {
        KHR_techniques_webgl: {
          shaders: [
            {
              type: WebGLConstants_default.FRAGMENT_SHADER,
              name: "BoxTextured0FS",
              uri: "BoxTextured0FS.glsl"
            },
            {
              type: WebGLConstants_default.VERTEX_SHADER,
              name: "BoxTextured0VS",
              uri: "BoxTextured0VS.glsl"
            }
          ]
        }
      },
      extensionsUsed: ["KHR_techniques_webgl"]
    };
    let count = 0;
    const returnValue = ForEach_default.shader(gltf3, (shader) => {
      expect(shader.uri).toBe(`${shader.name}.glsl`);
      count++;
      if (count === 2) {
        return shader;
      }
    });
    expect(count).toBe(2);
    expect(returnValue).toBe(gltf3.extensions.KHR_techniques_webgl.shaders[1]);
    gltf3 = {};
    count = 0;
    ForEach_default.shader(gltf3, () => {
      count++;
    });
    expect(count).toBe(0);
  });
  it("loops over KHR_techniques_webgl programs (gltf 2.0)", function() {
    let gltf3 = {
      extensions: {
        KHR_techniques_webgl: {
          programs: [
            {
              name: "program_0",
              fragmentShader: 0,
              vertexShader: 1
            },
            {
              name: "program_1",
              fragmentShader: 2,
              vertexShader: 3
            }
          ]
        }
      },
      extensionsUsed: ["KHR_techniques_webgl"]
    };
    let count = 0;
    const returnValue = ForEach_default.program(gltf3, (program) => {
      expect(program.fragmentShader).toBeDefined();
      expect(program.vertexShader).toBeDefined();
      count++;
      if (count === 2) {
        return program;
      }
    });
    expect(count).toBe(2);
    expect(returnValue).toBe(gltf3.extensions.KHR_techniques_webgl.programs[1]);
    gltf3 = {};
    count = 0;
    ForEach_default.program(gltf3, () => {
      count++;
    });
    expect(count).toBe(0);
  });
  it("loops over legacy programs (gltf 1.0)", function() {
    const gltf3 = {
      programs: {
        program_0: {
          fragmentShader: 0,
          vertexShader: 1
        },
        program_1: {
          fragmentShader: 2,
          vertexShader: 3
        }
      }
    };
    let count = 0;
    const returnValue = ForEach_default.program(gltf3, (program) => {
      expect(program.fragmentShader).toBeDefined();
      expect(program.vertexShader).toBeDefined();
      count++;
      if (count === 2) {
        return program;
      }
    });
    expect(count).toBe(2);
    expect(returnValue).toBe(gltf3.programs["program_1"]);
  });
  it("loops over KHR_techniques_webgl techniques (gltf 2.0)", function() {
    let gltf3 = {
      extensions: {
        KHR_techniques_webgl: {
          techniques: [
            {
              name: "technique0",
              program: 0,
              attributes: {},
              uniforms: {}
            },
            {
              name: "technique1",
              program: 1,
              attributes: {},
              uniforms: {}
            }
          ]
        }
      },
      extensionsUsed: ["KHR_techniques_webgl"]
    };
    let count = 0;
    const returnValue = ForEach_default.technique(gltf3, (technique, index) => {
      expect(technique.name).toBe(`technique${index}`);
      count++;
      if (count === 2) {
        return technique;
      }
    });
    expect(count).toBe(2);
    expect(returnValue).toBe(
      gltf3.extensions.KHR_techniques_webgl.techniques[1]
    );
    gltf3 = {};
    count = 0;
    ForEach_default.technique(gltf3, () => {
      count++;
    });
    expect(count).toBe(0);
  });
  it("loops over legacy techniques (gltf 1.0)", function() {
    const gltf3 = {
      techniques: {
        technique0: {
          program: 0,
          attributes: {},
          uniforms: {}
        },
        technique1: {
          program: 1,
          attributes: {},
          uniforms: {}
        }
      }
    };
    let count = 0;
    const returnValue = ForEach_default.technique(gltf3, (technique) => {
      expect(technique.program).toBeDefined();
      count++;
      if (count === 2) {
        return technique;
      }
    });
    expect(count).toBe(2);
    expect(returnValue).toBe(gltf3.techniques["technique1"]);
  });
  it("loops over technique attributes", function() {
    const technique = {
      name: "technique0",
      program: 0,
      attributes: {
        a_normal: {
          semantic: "NORMAL"
        },
        a_position: {
          semantic: "POSITION"
        },
        a_texcoord0: {
          semantic: "TEXCOORD_0"
        }
      },
      uniforms: {}
    };
    let count = 0;
    const returnValue = ForEach_default.techniqueAttribute(
      technique,
      (attribute, attributeName) => {
        expect(attribute.semantic).toBeDefined();
        expect(attributeName.indexOf("a_")).toBe(0);
        count++;
        if (count === 3) {
          return attribute;
        }
      }
    );
    expect(count).toBe(3);
    expect(returnValue).toBe(technique.attributes["a_texcoord0"]);
  });
  it("loops over legacy technique attributes", function() {
    const technique = {
      name: "technique0",
      program: 0,
      parameters: {},
      attributes: {
        a_normal: "normal",
        a_position: "position",
        a_texcoord0: "texcoord0"
      },
      uniforms: {}
    };
    let count = 0;
    const returnValue = ForEach_default.techniqueAttribute(
      technique,
      (parameterName, attributeName) => {
        expect(parameterName).toBe(attributeName.substring(2));
        count++;
        if (count === 3) {
          return parameterName;
        }
      }
    );
    expect(count).toBe(3);
    expect(returnValue).toBe(technique.attributes["a_texcoord0"]);
  });
  it("loops over technique uniforms", function() {
    const technique = {
      name: "technique0",
      program: 0,
      attributes: {},
      uniforms: {
        u_diffuse: {
          type: WebGLConstants_default.SAMPLER_2D
        },
        u_modelViewMatrix: {
          type: WebGLConstants_default.FLOAT_MAT4,
          semantic: "MODELVIEW"
        },
        u_normalMatrix: {
          type: WebGLConstants_default.FLOAT_MAT3,
          semantic: "MODELVIEWINVERSETRANSPOSE"
        }
      }
    };
    let count = 0;
    const returnValue = ForEach_default.techniqueUniform(
      technique,
      (uniform, uniformName) => {
        expect(uniform.type).toBeDefined();
        expect(uniformName.indexOf("u_")).toBe(0);
        count++;
        if (count === 3) {
          return uniform;
        }
      }
    );
    expect(count).toBe(3);
    expect(returnValue).toBe(technique.uniforms["u_normalMatrix"]);
  });
  it("loops over legacy technique uniforms", function() {
    const technique = {
      name: "technique0",
      program: 0,
      parameters: {},
      attributes: {},
      uniforms: {
        u_diffuse: "diffuse",
        u_modelViewMatrix: "modelViewMatrix",
        u_normalMatrix: "normalMatrix"
      }
    };
    let count = 0;
    const returnValue = ForEach_default.techniqueUniform(
      technique,
      (parameterName, uniformName) => {
        expect(parameterName).toBe(uniformName.substring(2));
        count++;
        if (count === 3) {
          return parameterName;
        }
      }
    );
    expect(count).toBe(3);
    expect(returnValue).toBe(technique.uniforms["u_normalMatrix"]);
  });
  it("loops over legacy technique parameters", function() {
    const technique = {
      name: "technique0",
      program: 0,
      attributes: {},
      uniforms: {},
      parameters: {
        diffuse: {
          type: WebGLConstants_default.SAMPLER_2D
        },
        modelViewMatrix: {
          semantic: "MODELVIEW",
          type: WebGLConstants_default.FLOAT_MAT4
        },
        normal: {
          semantic: "NORMAL",
          type: WebGLConstants_default.FLOAT_VEC3
        }
      }
    };
    let count = 0;
    const returnValue = ForEach_default.techniqueParameter(
      technique,
      (parameter, parameterName) => {
        expect(parameter.type).toBeDefined();
        expect(parameterName).toBeDefined();
        count++;
        if (count === 3) {
          return parameter;
        }
      }
    );
    expect(count).toBe(3);
    expect(returnValue).toBe(technique.parameters["normal"]);
  });
  it("loops over each skin", function() {
    const gltf3 = {
      skins: [
        {
          joints: [0]
        },
        {
          joints: [1]
        }
      ]
    };
    const returnValue = ForEach_default.skin(gltf3, (skin, index) => {
      expect(skin.joints[0]).toBe(index);
      if (index === 1) {
        return skin;
      }
    });
    expect(returnValue).toBe(gltf3.skins[1]);
  });
  it("loops over each texture", function() {
    const gltf3 = {
      textures: [
        {
          source: 0
        },
        {
          source: 1
        }
      ]
    };
    const returnValue = ForEach_default.texture(gltf3, (texture, index) => {
      expect(texture.source).toBe(index);
      if (index === 1) {
        return texture;
      }
    });
    expect(returnValue).toBe(gltf3.textures[1]);
  });
});

// packages/gltf/Specs/forEachTextureInMaterialSpec.js
describe("forEachTextureInMaterial", function() {
  it("throws without material", function() {
    expect(function() {
      forEachTextureInMaterial_default(void 0, function() {
      });
    }).toThrowDeveloperError();
  });
  it("throws without handler", function() {
    expect(function() {
      forEachTextureInMaterial_default({}, void 0);
    }).toThrowDeveloperError();
  });
  it("does nothing for a material with no textures", function() {
    const material = {};
    const indices = [];
    forEachTextureInMaterial_default(material, function(index) {
      indices.push(index);
    });
    expect(indices).toEqual([]);
  });
  it("iterates over pbrMetallicRoughness textures", function() {
    const baseColorTexture = { index: 0 };
    const metallicRoughnessTexture = { index: 1 };
    const material = {
      pbrMetallicRoughness: {
        baseColorTexture,
        metallicRoughnessTexture
      }
    };
    const visited = [];
    forEachTextureInMaterial_default(material, function(index, textureInfo) {
      visited.push({ index, textureInfo });
    });
    expect(visited).toEqual([
      { index: 0, textureInfo: baseColorTexture },
      { index: 1, textureInfo: metallicRoughnessTexture }
    ]);
  });
  it("iterates over KHR_materials_pbrSpecularGlossiness textures", function() {
    const material = {
      extensions: {
        KHR_materials_pbrSpecularGlossiness: {
          diffuseTexture: { index: 0 },
          specularGlossinessTexture: { index: 1 }
        }
      }
    };
    const indices = [];
    forEachTextureInMaterial_default(material, function(index) {
      indices.push(index);
    });
    expect(indices).toEqual([0, 1]);
  });
  it("iterates over KHR_materials_specular textures", function() {
    const material = {
      extensions: {
        KHR_materials_specular: {
          specularTexture: { index: 0 },
          specularColorTexture: { index: 1 }
        }
      }
    };
    const indices = [];
    forEachTextureInMaterial_default(material, function(index) {
      indices.push(index);
    });
    expect(indices).toEqual([0, 1]);
  });
  it("iterates over KHR_materials_transmission texture", function() {
    const material = {
      extensions: {
        KHR_materials_transmission: {
          transmissionTexture: { index: 0 }
        }
      }
    };
    const indices = [];
    forEachTextureInMaterial_default(material, function(index) {
      indices.push(index);
    });
    expect(indices).toEqual([0]);
  });
  it("iterates over KHR_materials_common texture values", function() {
    const material = {
      extensions: {
        KHR_materials_common: {
          values: {
            diffuse: { index: 0 },
            ambient: { index: 1 },
            emission: { index: 2 },
            specular: { index: 3 }
          }
        }
      }
    };
    const indices = [];
    forEachTextureInMaterial_default(material, function(index) {
      indices.push(index);
    });
    expect(indices).toEqual([0, 1, 2, 3]);
  });
  it("ignores non-texture KHR_materials_common values", function() {
    const material = {
      extensions: {
        KHR_materials_common: {
          values: {
            diffuse: [1, 0, 0, 1]
          }
        }
      }
    };
    const indices = [];
    forEachTextureInMaterial_default(material, function(index) {
      indices.push(index);
    });
    expect(indices).toEqual([]);
  });
  it("iterates over KHR_techniques_webgl material values that are textures", function() {
    const material = {
      extensions: {
        KHR_techniques_webgl: {
          values: {
            u_diffuse: { index: 2 },
            u_shininess: 256
          }
        }
      }
    };
    const indices = [];
    forEachTextureInMaterial_default(material, function(index) {
      indices.push(index);
    });
    expect(indices).toEqual([2]);
  });
  it("iterates over top-level textures", function() {
    const material = {
      emissiveTexture: { index: 0 },
      normalTexture: { index: 1 },
      occlusionTexture: { index: 2 }
    };
    const indices = [];
    forEachTextureInMaterial_default(material, function(index) {
      indices.push(index);
    });
    expect(indices).toEqual([0, 1, 2]);
  });
  it("stops iterating and returns a value when the handler returns one", function() {
    const metallicRoughnessTexture = { index: 1 };
    const material = {
      pbrMetallicRoughness: {
        baseColorTexture: { index: 0 },
        metallicRoughnessTexture
      },
      emissiveTexture: { index: 2 }
    };
    const visited = [];
    const returnValue = forEachTextureInMaterial_default(
      material,
      function(index, textureInfo) {
        visited.push(index);
        if (index === 1) {
          return textureInfo;
        }
      }
    );
    expect(visited).toEqual([0, 1]);
    expect(returnValue).toBe(metallicRoughnessTexture);
  });
});

// packages/gltf/Specs/getAccessorByteStrideSpec.js
describe("getAccessorByteStride", function() {
  it("gets accessor byte stride", function() {
    const gltf3 = {
      accessors: [
        {
          componentType: WebGLConstants_default.FLOAT,
          count: 24,
          type: "VEC3",
          min: [-1, -1, -1],
          max: [1, 1, 1]
        },
        {
          bufferView: 0,
          componentType: WebGLConstants_default.FLOAT,
          count: 24,
          type: "VEC3",
          min: [-1, -1, -1],
          max: [1, 1, 1]
        },
        {
          bufferView: 1,
          componentType: WebGLConstants_default.FLOAT,
          count: 24,
          type: "VEC3",
          min: [-1, -1, -1],
          max: [1, 1, 1]
        },
        {
          componentType: WebGLConstants_default.FLOAT,
          count: 24,
          type: "VEC2",
          min: [0, 0],
          max: [1, 1]
        },
        {
          componentType: WebGLConstants_default.INT,
          count: 36,
          type: "SCALAR",
          min: [0],
          max: [24]
        }
      ],
      bufferViews: [
        {
          buffer: 0,
          byteLength: 288,
          byteOffset: 0
        },
        {
          buffer: 0,
          byteLength: 288,
          byteOffset: 288,
          byteStride: 32
        }
      ]
    };
    expect(getAccessorByteStride_default(gltf3, gltf3.accessors[0])).toBe(12);
    expect(getAccessorByteStride_default(gltf3, gltf3.accessors[1])).toBe(12);
    expect(getAccessorByteStride_default(gltf3, gltf3.accessors[2])).toBe(32);
    expect(getAccessorByteStride_default(gltf3, gltf3.accessors[3])).toBe(8);
    expect(getAccessorByteStride_default(gltf3, gltf3.accessors[4])).toBe(4);
  });
});

// packages/gltf/Specs/getComponentReaderSpec.js
function testComponentReader(componentType) {
  const typedArray = ComponentDatatype_default.createTypedArray(
    componentType,
    [0, 1, 2]
  );
  const dataView = new DataView(typedArray.buffer);
  const componentReader = getComponentReader_default(componentType);
  const byteOffset = ComponentDatatype_default.getSizeInBytes(componentType);
  const numberOfComponents = 2;
  const result = new Array(numberOfComponents);
  componentReader(dataView, byteOffset, numberOfComponents, result);
  expect(result).toEqual([1, 2]);
}
describe("getComponentReader", function() {
  it("reads values", function() {
    testComponentReader(ComponentDatatype_default.BYTE);
    testComponentReader(ComponentDatatype_default.UNSIGNED_BYTE);
    testComponentReader(ComponentDatatype_default.SHORT);
    testComponentReader(ComponentDatatype_default.UNSIGNED_SHORT);
    testComponentReader(ComponentDatatype_default.INT);
    testComponentReader(ComponentDatatype_default.UNSIGNED_INT);
    testComponentReader(ComponentDatatype_default.FLOAT);
    testComponentReader(ComponentDatatype_default.DOUBLE);
  });
  it("throws for an unsupported component type", function() {
    expect(function() {
      getComponentReader_default(0);
    }).toThrow();
  });
});

// packages/gltf/Specs/getNodeTransformSpec.js
describe("getNodeTransform", function() {
  it("returns undefined when the node has no transform", function() {
    expect(getNodeTransform_default({})).toBeUndefined();
  });
  it("returns the matrix when the node has one", function() {
    const matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 6, 7, 1];
    expect(getNodeTransform_default({ matrix })).toBe(matrix);
  });
  it("composes translation, rotation, and scale", function() {
    const transform = getNodeTransform_default({
      translation: [1, 2, 3],
      rotation: [0, 0, 0, 1],
      scale: [2, 3, 4]
    });
    expect(transform).toEqual([2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 1, 2, 3, 1]);
  });
  it("uses identity values for missing translation, rotation, and scale", function() {
    expect(getNodeTransform_default({ translation: [1, 2, 3] })).toEqual([
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
      1,
      2,
      3,
      1
    ]);
    expect(getNodeTransform_default({ scale: [2, 3, 4] })).toEqual([
      2,
      0,
      0,
      0,
      0,
      3,
      0,
      0,
      0,
      0,
      4,
      0,
      0,
      0,
      0,
      1
    ]);
  });
});

// packages/gltf/Specs/moveTechniqueRenderStatesSpec.js
var gltf = {
  programs: {
    program_0: {
      attributes: ["a_normal", "a_position", "a_texcoord0"],
      fragmentShader: "BoxTextured0FS",
      vertexShader: "BoxTextured0VS"
    }
  },
  shaders: {
    BoxTextured0FS: {
      type: WebGLConstants_default.FRAGMENT_SHADER,
      uri: "BoxTextured0FS.glsl"
    },
    BoxTextured0VS: {
      type: WebGLConstants_default.VERTEX_SHADER,
      uri: "BoxTextured0VS.glsl"
    }
  },
  techniques: {
    technique0: {
      states: {
        enable: [
          WebGLConstants_default.DEPTH_TEST,
          WebGLConstants_default.BLEND,
          WebGLConstants_default.CULL_FACE
        ]
      }
    }
  },
  materials: [
    {
      technique: "technique0"
    }
  ]
};
describe("moveTechniqueRenderStates", function() {
  it("sets material.doubleSided property if CULL_FACE is not enabled", function() {
    const baseGltf = JSON.parse(JSON.stringify(gltf));
    let gltfWithUpdatedMaterials = moveTechniqueRenderStates_default(baseGltf);
    let material = gltfWithUpdatedMaterials.materials[0];
    expect(material.doubleSided).toBeUndefined();
    const gltfDoubleSided = JSON.parse(JSON.stringify(gltf));
    gltfDoubleSided.techniques.technique0.states = {
      enable: [WebGLConstants_default.DEPTH_TEST, WebGLConstants_default.BLEND]
    };
    gltfWithUpdatedMaterials = moveTechniqueRenderStates_default(gltfDoubleSided);
    material = gltfWithUpdatedMaterials.materials[0];
    expect(material.doubleSided).toBe(true);
  });
  it("sets alphaMode and moves technique render state blending functions to material KHR_blend extension", function() {
    const gltfWithBlendFunctions = JSON.parse(JSON.stringify(gltf));
    gltfWithBlendFunctions.techniques.technique0.states = {
      enable: [
        WebGLConstants_default.DEPTH_TEST,
        WebGLConstants_default.BLEND,
        WebGLConstants_default.CULL_FACE
      ],
      functions: {
        blendEquationSeparate: [
          WebGLConstants_default.FUNC_ADD,
          WebGLConstants_default.FUNC_ADD
        ],
        blendFuncSeparate: [
          WebGLConstants_default.ONE,
          WebGLConstants_default.ONE_MINUS_SRC_ALPHA,
          WebGLConstants_default.ONE,
          WebGLConstants_default.ONE_MINUS_SRC_ALPHA
        ]
      }
    };
    const gltfWithBlendExtension = moveTechniqueRenderStates_default(
      gltfWithBlendFunctions
    );
    expect(
      gltfWithBlendExtension.extensionsUsed.indexOf("KHR_blend")
    ).toBeGreaterThan(-1);
    expect(gltfWithBlendExtension.extensionsRequired).toBeUndefined();
    const material = gltfWithBlendExtension.materials[0];
    expect(material.alphaMode).toBe("BLEND");
    expect(material.extensions).toBeDefined();
    const materialBlending = material.extensions.KHR_blend;
    expect(materialBlending).toBeDefined();
    expect(materialBlending.blendEquation).toEqual([
      WebGLConstants_default.FUNC_ADD,
      WebGLConstants_default.FUNC_ADD
    ]);
    expect(materialBlending.blendFactors).toEqual([
      WebGLConstants_default.ONE,
      WebGLConstants_default.ONE_MINUS_SRC_ALPHA,
      WebGLConstants_default.ONE,
      WebGLConstants_default.ONE_MINUS_SRC_ALPHA
    ]);
  });
  it("provides defaults for extension properties if not provided", function() {
    const gltfWithBlendFunctions = JSON.parse(JSON.stringify(gltf));
    gltfWithBlendFunctions.techniques.technique0.states = {
      enable: [
        WebGLConstants_default.DEPTH_TEST,
        WebGLConstants_default.BLEND,
        WebGLConstants_default.CULL_FACE
      ],
      functions: {
        blendFuncSeparate: [
          WebGLConstants_default.ONE,
          WebGLConstants_default.ONE_MINUS_SRC_ALPHA,
          WebGLConstants_default.ONE,
          WebGLConstants_default.ONE_MINUS_SRC_ALPHA
        ]
      }
    };
    let gltfWithBlendExtension = moveTechniqueRenderStates_default(
      gltfWithBlendFunctions
    );
    let materialBlending = gltfWithBlendExtension.materials[0].extensions.KHR_blend;
    expect(materialBlending).toBeDefined();
    expect(materialBlending.blendEquation).toEqual([
      WebGLConstants_default.FUNC_ADD,
      WebGLConstants_default.FUNC_ADD
    ]);
    expect(materialBlending.blendFactors).toEqual([
      WebGLConstants_default.ONE,
      WebGLConstants_default.ONE_MINUS_SRC_ALPHA,
      WebGLConstants_default.ONE,
      WebGLConstants_default.ONE_MINUS_SRC_ALPHA
    ]);
    gltfWithBlendFunctions.techniques.technique0.states = {
      enable: [
        WebGLConstants_default.DEPTH_TEST,
        WebGLConstants_default.BLEND,
        WebGLConstants_default.CULL_FACE
      ],
      functions: {
        blendEquationSeparate: [
          WebGLConstants_default.FUNC_ADD,
          WebGLConstants_default.FUNC_ADD
        ]
      }
    };
    gltfWithBlendExtension = moveTechniqueRenderStates_default(gltfWithBlendFunctions);
    materialBlending = gltfWithBlendExtension.materials[0].extensions.KHR_blend;
    expect(materialBlending).toBeDefined();
    expect(materialBlending.blendEquation).toEqual([
      WebGLConstants_default.FUNC_ADD,
      WebGLConstants_default.FUNC_ADD
    ]);
    expect(materialBlending.blendFactors).toEqual([
      WebGLConstants_default.ONE,
      WebGLConstants_default.ZERO,
      WebGLConstants_default.ONE,
      WebGLConstants_default.ZERO
    ]);
  });
  it("falls back to default blending factors if unsupported factor is found", function() {
    const gltfWithBlendFunctions = JSON.parse(JSON.stringify(gltf));
    gltfWithBlendFunctions.techniques.technique0.states = {
      enable: [
        WebGLConstants_default.DEPTH_TEST,
        WebGLConstants_default.BLEND,
        WebGLConstants_default.CULL_FACE
      ],
      functions: {
        blendFuncSeparate: [
          WebGLConstants_default.SRC_ALPHA_SATURATE,
          WebGLConstants_default.ONE_MINUS_SRC_ALPHA,
          WebGLConstants_default.SRC_ALPHA_SATURATE,
          WebGLConstants_default.ONE_MINUS_SRC_ALPHA
        ]
      }
    };
    const gltfWithBlendExtension = moveTechniqueRenderStates_default(
      gltfWithBlendFunctions
    );
    const materialBlending = gltfWithBlendExtension.materials[0].extensions.KHR_blend;
    expect(materialBlending).toBeDefined();
    expect(materialBlending.blendFactors).toEqual([
      WebGLConstants_default.ONE,
      WebGLConstants_default.ZERO,
      WebGLConstants_default.ONE,
      WebGLConstants_default.ZERO
    ]);
  });
  it("does not set alphaMode or add KHR_blend if no blending is found in render states", function() {
    const gltfWithoutBlending = JSON.parse(JSON.stringify(gltf));
    gltfWithoutBlending.techniques.technique0.states.enable = [
      WebGLConstants_default.DEPTH_TEST,
      WebGLConstants_default.CULL_FACE
    ];
    const updatedGltf = moveTechniqueRenderStates_default(gltfWithoutBlending);
    expect(updatedGltf.extensionsUsed).toBeUndefined();
    expect(updatedGltf.extensionsRequired).toBeUndefined();
    const material = updatedGltf.materials[0];
    expect(material.alphaMode).toBeUndefined();
    expect(material.extensions).toBeUndefined();
  });
});

// packages/gltf/Specs/moveTechniquesToExtensionSpec.js
describe("moveTechniquesToExtension", function() {
  it("moves techniques, shaders, and programs to extension", function() {
    const gltf3 = {
      programs: {
        program_0: {
          attributes: ["a_normal", "a_position", "a_texcoord0"],
          fragmentShader: "BoxTextured0FS",
          vertexShader: "BoxTextured0VS"
        },
        program_1: {
          attributes: ["a_normal", "a_position", "a_texcoord0"],
          fragmentShader: "BoxTextured1FS",
          vertexShader: "BoxTextured0VS"
        }
      },
      shaders: {
        BoxTextured0FS: {
          type: WebGLConstants_default.FRAGMENT_SHADER,
          uri: "BoxTextured0FS.glsl"
        },
        BoxTextured0VS: {
          type: WebGLConstants_default.VERTEX_SHADER,
          uri: "BoxTextured0VS.glsl"
        },
        BoxTextured1FS: {
          type: WebGLConstants_default.FRAGMENT_SHADER,
          uri: "BoxTextured1FS.glsl"
        }
      },
      techniques: {
        technique0: {
          attributes: {
            a_normal: "normal",
            a_position: "position",
            a_texcoord0: "texcoord0"
          },
          parameters: {
            diffuse: {
              type: WebGLConstants_default.SAMPLER_2D
            },
            modelViewMatrix: {
              semantic: "MODELVIEW",
              type: WebGLConstants_default.FLOAT_MAT4
            },
            normal: {
              semantic: "NORMAL",
              type: WebGLConstants_default.FLOAT_VEC3
            },
            normalMatrix: {
              semantic: "MODELVIEWINVERSETRANSPOSE",
              type: WebGLConstants_default.FLOAT_MAT3
            },
            position: {
              semantic: "POSITION",
              type: WebGLConstants_default.FLOAT_VEC3
            },
            projectionMatrix: {
              semantic: "PROJECTION",
              type: WebGLConstants_default.FLOAT_MAT4
            },
            shininess: {
              type: WebGLConstants_default.FLOAT
            },
            specular: {
              type: WebGLConstants_default.FLOAT_VEC4
            },
            texcoord0: {
              semantic: "TEXCOORD_0",
              type: WebGLConstants_default.FLOAT_VEC2
            }
          },
          program: "program_0",
          states: {
            enable: [WebGLConstants_default.DEPTH_TEST, WebGLConstants_default.CULL_FACE]
          },
          uniforms: {
            u_diffuse: "diffuse",
            u_modelViewMatrix: "modelViewMatrix",
            u_normalMatrix: "normalMatrix",
            u_projectionMatrix: "projectionMatrix",
            u_shininess: "shininess",
            u_specular: "specular"
          }
        },
        technique1: {
          program: "program_1"
        },
        technique2: {
          parameters: {
            diffuse: {
              type: WebGLConstants_default.FLOAT_VEC4
            }
          },
          program: "program_0",
          uniforms: {
            u_diffuse: "diffuse"
          }
        }
      },
      materials: [
        {
          name: "Texture",
          technique: "technique0",
          values: {
            diffuse: "texture_Image0001",
            shininess: 256,
            specular: [0.2, 0.2, 0.2, 1]
          }
        },
        {
          name: "Color",
          technique: "technique2",
          values: {
            diffuse: [0.2, 0.2, 0.2, 1]
          }
        }
      ]
    };
    const gltfWithTechniquesWebgl = moveTechniquesToExtension_default(gltf3);
    expect(gltfWithTechniquesWebgl.extensions).toBeDefined();
    const techniques = gltfWithTechniquesWebgl.extensions.KHR_techniques_webgl;
    expect(techniques).toBeDefined();
    expect(techniques.techniques.length).toBe(3);
    const technique = techniques.techniques[0];
    const attributes = technique.attributes;
    expect(attributes).toBeDefined();
    expect(attributes.a_position.semantic).toBe("POSITION");
    const uniforms = technique.uniforms;
    expect(uniforms).toBeDefined();
    expect(uniforms.u_modelViewMatrix.semantic).toBe("MODELVIEW");
    expect(uniforms.u_modelViewMatrix.type).toBe(WebGLConstants_default.FLOAT_MAT4);
    expect(technique.program).toBe(0);
    expect(technique.parameters).toBeUndefined();
    expect(technique.states).toBeUndefined();
    expect(techniques.programs.length).toBe(2);
    const program = techniques.programs[technique.program];
    expect(program).toBeDefined();
    expect(techniques.shaders.length).toBe(3);
    expect(techniques.shaders[program.fragmentShader].type).toBe(
      WebGLConstants_default.FRAGMENT_SHADER
    );
    expect(techniques.shaders[program.vertexShader].type).toBe(
      WebGLConstants_default.VERTEX_SHADER
    );
    expect(gltfWithTechniquesWebgl.techniques).toBeUndefined();
    expect(gltfWithTechniquesWebgl.programs).toBeUndefined();
    expect(gltfWithTechniquesWebgl.shaders).toBeUndefined();
    const material = gltf3.materials[0];
    expect(material.extensions).toBeDefined();
    const materialTechniques = material.extensions.KHR_techniques_webgl;
    expect(materialTechniques).toBeDefined();
    expect(materialTechniques.technique).toBe(0);
    expect(materialTechniques.values.u_shininess).toBe(256);
    expect(materialTechniques.values.u_diffuse).toBe("texture_Image0001");
    expect(material.technique).toBeUndefined();
    expect(material.values).toBeUndefined();
    const technique2 = techniques.techniques[1];
    const program2 = techniques.programs[technique2.program];
    expect(program2.vertexShader).toBe(program.vertexShader);
    expect(program2.fragmentShader).not.toBe(program.fragmentShader);
    const technique3 = techniques.techniques[2];
    expect(technique3.program).toBe(0);
    expect(technique3.uniforms.u_diffuse.type).toBe(WebGLConstants_default.FLOAT_VEC4);
    expect(
      gltf3.materials[1].extensions.KHR_techniques_webgl.values.u_diffuse
    ).toEqual([0.2, 0.2, 0.2, 1]);
  });
});

// packages/gltf/Specs/numberOfComponentsForTypeSpec.js
describe("numberOfComponentsForType", function() {
  it("numberOfComponentsForType", function() {
    expect(numberOfComponentsForType_default("SCALAR")).toBe(1);
    expect(numberOfComponentsForType_default("VEC2")).toBe(2);
    expect(numberOfComponentsForType_default("VEC3")).toBe(3);
    expect(numberOfComponentsForType_default("VEC4")).toBe(4);
    expect(numberOfComponentsForType_default("MAT2")).toBe(4);
    expect(numberOfComponentsForType_default("MAT3")).toBe(9);
    expect(numberOfComponentsForType_default("MAT4")).toBe(16);
  });
});

// packages/gltf/Specs/parseGlbSpec.js
function writeString(glb, string, byteOffset) {
  glb.set(new TextEncoder().encode(string), byteOffset);
}
function writeUint32(glb, value, byteOffset) {
  new DataView(glb.buffer).setUint32(byteOffset, value, true);
}
describe("parseGlb", function() {
  it("throws an error with invalid magic", function() {
    const glb = new Uint8Array(20);
    writeString(glb, "NOPE", 0);
    let thrownError;
    try {
      parseGlb_default(glb);
    } catch (e) {
      thrownError = e;
    }
    expect(thrownError).toEqual(
      new RuntimeError_default("File is not valid binary glTF")
    );
  });
  it("throws an error if version is not 1 or 2", function() {
    const glb = new Uint8Array(20);
    writeString(glb, "glTF", 0);
    writeUint32(glb, 3, 4);
    let thrownError;
    try {
      parseGlb_default(glb);
    } catch (e) {
      thrownError = e;
    }
    expect(thrownError).toEqual(
      new RuntimeError_default("Binary glTF version is not 1 or 2")
    );
  });
  describe("1.0", function() {
    it("throws an error if content format is not JSON", function() {
      const glb = new Uint8Array(20);
      writeString(glb, "glTF", 0);
      writeUint32(glb, 1, 4);
      writeUint32(glb, 20, 8);
      writeUint32(glb, 0, 12);
      writeUint32(glb, 1, 16);
      let thrownError;
      try {
        parseGlb_default(glb);
      } catch (e) {
        thrownError = e;
      }
      expect(thrownError).toEqual(
        new RuntimeError_default("Binary glTF scene format is not JSON")
      );
    });
    it("loads binary glTF", function() {
      const binaryData = new Uint8Array([0, 1, 2, 3, 4, 5]);
      const gltf3 = {
        bufferViews: {
          imageBufferView: {
            byteLength: 0
          },
          shaderBufferView: {
            byteLength: 0
          }
        },
        buffers: {
          binary_glTF: {
            byteLength: binaryData.length,
            uri: "data:,"
          }
        },
        images: {
          image: {
            extensions: {
              KHR_binary_glTF: {
                bufferView: "imageBufferView",
                mimeType: "image/jpg"
              }
            }
          }
        },
        shaders: {
          shader: {
            extensions: {
              KHR_binary_glTF: {
                bufferView: "shaderBufferView"
              }
            }
          }
        },
        extensionsUsed: ["KHR_binary_glTF"]
      };
      let gltfString = JSON.stringify(gltf3);
      while (gltfString.length % 4 !== 0) {
        gltfString += " ";
      }
      const glb = new Uint8Array(20 + gltfString.length + binaryData.length);
      writeString(glb, "glTF", 0);
      writeUint32(glb, 1, 4);
      writeUint32(glb, 20 + gltfString.length + binaryData.length, 8);
      writeUint32(glb, gltfString.length, 12);
      writeUint32(glb, 0, 16);
      writeString(glb, gltfString, 20);
      glb.set(binaryData, 20 + gltfString.length);
      const parsedGltf = parseGlb_default(glb);
      expect(parsedGltf.extensionsUsed).toBeUndefined();
      const buffer2 = parsedGltf.buffers.binary_glTF;
      for (let i = 0; i < binaryData.length; i++) {
        expect(buffer2.extras._pipeline.source[i]).toEqual(binaryData[i]);
        expect(buffer2.uri).toBeUndefined();
      }
      const image = parsedGltf.images.image;
      expect(image.extensions.KHR_binary_glTF).toBeDefined();
      expect(image.extensions.KHR_binary_glTF.bufferView).toBe(
        "imageBufferView"
      );
      expect(image.extensions.KHR_binary_glTF.mimeType).toBe("image/jpg");
      const shader = parsedGltf.shaders.shader;
      expect(shader.extensions.KHR_binary_glTF).toBeDefined();
      expect(shader.extensions.KHR_binary_glTF.bufferView).toBe(
        "shaderBufferView"
      );
    });
  });
  describe("2.0", function() {
    it("loads binary glTF", function() {
      let i;
      const binaryData = new Uint8Array([0, 1, 2, 3, 4, 5]);
      const gltf3 = {
        asset: {
          version: "2.0"
        },
        buffers: [
          {
            byteLength: binaryData.length
          }
        ],
        images: [
          {
            bufferView: 0,
            mimeType: "image/jpg"
          }
        ]
      };
      let gltfString = JSON.stringify(gltf3);
      while (gltfString.length % 4 !== 0) {
        gltfString += " ";
      }
      const glb = new Uint8Array(28 + gltfString.length + binaryData.length);
      writeString(glb, "glTF", 0);
      writeUint32(glb, 2, 4);
      writeUint32(glb, 12 + 8 + gltfString.length + 8 + binaryData.length, 8);
      writeUint32(glb, gltfString.length, 12);
      writeUint32(glb, 1313821514, 16);
      writeString(glb, gltfString, 20);
      writeUint32(glb, binaryData.length, 20 + gltfString.length);
      writeUint32(glb, 5130562, 24 + gltfString.length);
      glb.set(binaryData, 28 + gltfString.length);
      const parsedGltf = parseGlb_default(glb);
      const buffer2 = parsedGltf.buffers[0];
      for (i = 0; i < binaryData.length; i++) {
        expect(buffer2.extras._pipeline.source[i]).toEqual(binaryData[i]);
      }
      removePipelineExtras_default(parsedGltf);
      expect(parsedGltf).toEqual(gltf3);
    });
  });
});

// packages/gltf/Specs/readAccessorPackedSpec.js
var contiguousData2 = [
  -1,
  1,
  -1,
  0,
  0,
  0,
  3,
  2,
  1,
  -1,
  -2,
  -3
];
var nan2 = Number.NaN;
var nonContiguousData2 = [
  -1,
  1,
  -1,
  nan2,
  nan2,
  nan2,
  0,
  0,
  0,
  nan2,
  nan2,
  nan2,
  3,
  2,
  1,
  nan2,
  nan2,
  nan2,
  -1,
  -2,
  -3,
  nan2,
  nan2,
  nan2
];
function createGltf2(elements, byteStride) {
  const source = new Uint8Array(new Float32Array(elements).buffer);
  const byteLength = source.byteLength;
  return {
    accessors: [
      {
        bufferView: 0,
        byteOffset: 0,
        componentType: 5126,
        count: 4,
        type: "VEC3"
      }
    ],
    bufferViews: [
      {
        buffer: 0,
        byteOffset: 0,
        byteLength,
        byteStride
      }
    ],
    buffers: [
      {
        byteLength,
        extras: {
          _pipeline: {
            source
          }
        }
      }
    ]
  };
}
describe("readAccessorPacked", function() {
  it("reads contiguous accessor", function() {
    const gltf3 = createGltf2(contiguousData2, 12);
    expect(readAccessorPacked_default(gltf3, gltf3.accessors[0])).toEqual(contiguousData2);
  });
  it("reads non-contiguous accessor", function() {
    const gltf3 = createGltf2(nonContiguousData2, 24);
    expect(readAccessorPacked_default(gltf3, gltf3.accessors[0])).toEqual(contiguousData2);
  });
  it("reads accessor that does not have a buffer view", function() {
    const gltf3 = {
      accessors: [
        {
          componentType: 5126,
          count: 4,
          type: "VEC3"
        }
      ]
    };
    const expected = new Array(12).fill(0);
    expect(readAccessorPacked_default(gltf3, gltf3.accessors[0])).toEqual(expected);
  });
});

// packages/gltf/Specs/removeExtensionSpec.js
describe("removeExtension", function() {
  it("removes extension", function() {
    const gltf3 = {
      extensionsRequired: ["extension1", "extension2", "extension3"],
      extensionsUsed: ["extension1", "extension2", "extension3"],
      extensions: {
        extension1: {
          value: 9
        },
        extension2: [0, 1, 2]
      },
      materials: [
        {
          baseColorFactor: [1, 0, 0, 1],
          extensions: {
            extension1: {
              value: 10
            }
          }
        },
        {
          baseColorFactor: [0, 0, 1, 1],
          extensions: {
            extension1: {
              value: 11
            }
          }
        }
      ],
      cameras: [
        {
          extensions: {
            extension1: {
              value: 9
            },
            extension2: [3, 4, 5]
          }
        }
      ]
    };
    const extension1 = removeExtension_default(gltf3, "extension1");
    expect(gltf3.extensionsRequired).toEqual(["extension2", "extension3"]);
    expect(gltf3.extensionsUsed).toEqual(["extension2", "extension3"]);
    expect(gltf3.extensions).toEqual({
      extension2: [0, 1, 2]
    });
    expect(gltf3.materials[0].extensions).toBeUndefined();
    expect(gltf3.materials[1].extensions).toBeUndefined();
    expect(gltf3.cameras[0].extensions).toEqual({
      extension2: [3, 4, 5]
    });
    expect(extension1).toEqual({
      value: 9
    });
    const extension2 = removeExtension_default(gltf3, "extension2");
    expect(gltf3.extensionsRequired).toEqual(["extension3"]);
    expect(gltf3.extensionsUsed).toEqual(["extension3"]);
    expect(gltf3.extensions).toBeUndefined();
    expect(gltf3.materials[0].extensions).toBeUndefined();
    expect(gltf3.materials[1].extensions).toBeUndefined();
    expect(gltf3.cameras[0].extensions).toBeUndefined();
    expect(extension2).toEqual([0, 1, 2]);
    const extension3 = removeExtension_default(gltf3, "extension3");
    expect(gltf3.extensionsRequired).toBeUndefined();
    expect(gltf3.extensionsUsed).toBeUndefined();
    expect(gltf3.extensions).toBeUndefined();
    expect(gltf3.materials[0].extensions).toBeUndefined();
    expect(gltf3.materials[1].extensions).toBeUndefined();
    expect(gltf3.cameras[0].extensions).toBeUndefined();
    expect(extension3).toBeUndefined();
    const emptyGltf = {};
    removeExtension_default(gltf3, "extension1");
    expect(emptyGltf).toEqual({});
  });
  it("removes CESIUM_RTC extension", function() {
    const gltf3 = {
      extensionsRequired: ["CESIUM_RTC", "KHR_techniques_webgl"],
      extensionsUsed: ["CESIUM_RTC", "KHR_techniques_webgl"],
      extensions: {
        CESIUM_RTC: {
          center: [1, 2, 3]
        },
        KHR_techniques_webgl: {
          techniques: [
            {
              uniforms: {
                u_modelViewMatrix: {
                  type: WebGLConstants_default.FLOAT_MAT4,
                  semantic: "CESIUM_RTC_MODELVIEW"
                }
              }
            }
          ]
        }
      }
    };
    const extension = removeExtension_default(gltf3, "CESIUM_RTC");
    expect(extension).toEqual({
      center: [1, 2, 3]
    });
    expect(gltf3.extensionsRequired).toEqual(["KHR_techniques_webgl"]);
    expect(gltf3.extensionsUsed).toEqual(["KHR_techniques_webgl"]);
    expect(
      gltf3.extensions.KHR_techniques_webgl.techniques[0].uniforms.u_modelViewMatrix.semantic
    ).toBe("MODELVIEW");
  });
});

// packages/gltf/Specs/removeExtensionsRequiredSpec.js
describe("removeExtensionsRequired", function() {
  it("removes extension from extensionsRequired", function() {
    const gltf3 = {
      extensionsRequired: ["extension1", "extension2"],
      extensionsUsed: ["extension1", "extension2"]
    };
    removeExtensionsRequired_default(gltf3, "extension1");
    expect(gltf3.extensionsRequired).toEqual(["extension2"]);
    removeExtensionsRequired_default(gltf3, "extension2");
    expect(gltf3.extensionsRequired).toBeUndefined();
    expect(gltf3.extensionsUsed).toEqual(["extension1", "extension2"]);
    const emptyGltf = {};
    removeExtensionsRequired_default(gltf3, "extension1");
    expect(emptyGltf).toEqual({});
  });
});

// packages/gltf/Specs/removeExtensionsUsedSpec.js
describe("removeExtensionsUsed", function() {
  it("removes extension from extensionsUsed", function() {
    const gltf3 = {
      extensionsRequired: ["extension1", "extension2"],
      extensionsUsed: ["extension1", "extension2"]
    };
    removeExtensionsUsed_default(gltf3, "extension1");
    expect(gltf3.extensionsRequired).toEqual(["extension2"]);
    expect(gltf3.extensionsUsed).toEqual(["extension2"]);
    removeExtensionsUsed_default(gltf3, "extension2");
    expect(gltf3.extensionsRequired).toBeUndefined();
    expect(gltf3.extensionsUsed).toBeUndefined();
    const emptyGltf = {};
    removeExtensionsUsed_default(gltf3, "extension1");
    expect(emptyGltf).toEqual({});
  });
});

// packages/gltf/Specs/removePipelineExtrasSpec.js
describe("removePipelineExtras", function() {
  it("removes pipeline extras", function() {
    const gltf3 = {
      buffers: [
        {
          byteLength: 100
        }
      ],
      extensions: {
        KHR_techniques_webgl: {
          shaders: [
            {
              type: WebGLConstants_default.VERTEX_SHADER,
              uri: "data:,"
            }
          ]
        }
      }
    };
    const gltfWithExtrasRemoved = removePipelineExtras_default(addPipelineExtras_default(gltf3));
    expect(gltfWithExtrasRemoved.buffers[0].extras).toBeUndefined();
    expect(
      gltfWithExtrasRemoved.extensions.KHR_techniques_webgl.shaders[0].extras
    ).toBeUndefined();
  });
});

// packages/gltf/Specs/removeUnusedElementsSpec.js
var gltf2 = {
  nodes: [
    {
      name: "skin",
      skin: 0,
      mesh: 0,
      translation: [0, 0, 0]
    },
    {
      name: "used",
      mesh: 0,
      children: [2, 5]
    },
    {
      name: "unused"
    },
    {
      name: "nodeWithEmptyMesh",
      mesh: 1
    },
    {
      name: "unusedParent",
      children: [2]
    },
    {
      name: "camera",
      camera: 0
    },
    {
      name: "light",
      extensions: {
        KHR_lights_punctual: {
          light: 0
        }
      }
    }
  ],
  buffers: [
    {
      name: "mesh",
      byteLength: 246,
      uri: "data0.bin"
    },
    {
      name: "other",
      byteLength: 80,
      uri: "data1.bin"
    },
    {
      name: "image01",
      byteLength: 1e3,
      uri: "data2.bin"
    },
    {
      image: "image2",
      byteLength: 500,
      uri: "data3.bin"
    }
  ],
  bufferViews: [
    {
      name: "positions",
      buffer: 0,
      byteOffset: 0,
      byteLength: 36
    },
    {
      name: "normals",
      buffer: 0,
      byteOffset: 36,
      byteLength: 36
    },
    {
      name: "texcoords",
      buffer: 0,
      byteOffset: 72,
      byteLength: 24
    },
    {
      name: "positions-target0",
      buffer: 0,
      byteOffset: 96,
      byteLength: 36
    },
    {
      name: "normals-target0",
      buffer: 0,
      byteOffset: 132,
      byteLength: 36
    },
    {
      name: "positions-target1",
      buffer: 0,
      byteOffset: 168,
      byteLength: 36
    },
    {
      name: "normals-target1",
      buffer: 0,
      byteOffset: 204,
      byteLength: 36
    },
    {
      name: "indices",
      buffer: 0,
      byteOffset: 240,
      byteLength: 6
    },
    {
      name: "other",
      buffer: 1,
      byteOffset: 0,
      byteLength: 80
    },
    {
      name: "image0",
      buffer: 2,
      byteOffset: 0,
      byteLength: 500
    },
    {
      name: "image1",
      buffer: 2,
      byteOffset: 500,
      byteLength: 500
    },
    {
      name: "image2",
      buffer: 3,
      byteOffset: 1e3,
      byteLength: 500
    }
  ],
  accessors: [
    {
      name: "positions",
      bufferView: 0,
      byteOffset: 0,
      componentType: WebGLConstants_default.FLOAT,
      count: 3,
      type: "VEC3",
      min: [-1, -1, -1],
      max: [1, 1, 1]
    },
    {
      name: "normals",
      bufferView: 1,
      byteOffset: 36,
      componentType: WebGLConstants_default.FLOAT,
      count: 3,
      type: "VEC3"
    },
    {
      name: "texcoords",
      bufferView: 2,
      byteOffset: 72,
      componentType: WebGLConstants_default.FLOAT,
      count: 3,
      type: "VEC2"
    },
    {
      name: "positions-target0",
      bufferView: 3,
      byteOffset: 96,
      componentType: WebGLConstants_default.FLOAT,
      count: 3,
      type: "VEC3",
      min: [-1, -1, -1],
      max: [1, 1, 1]
    },
    {
      name: "normals-target0",
      bufferView: 4,
      byteOffset: 132,
      componentType: WebGLConstants_default.FLOAT,
      count: 3,
      type: "VEC3"
    },
    {
      name: "positions-target1",
      bufferView: 5,
      byteOffset: 168,
      componentType: WebGLConstants_default.FLOAT,
      count: 3,
      type: "VEC3",
      min: [-1, -1, -1],
      max: [1, 1, 1]
    },
    {
      name: "normals-target1",
      bufferView: 6,
      byteOffset: 204,
      componentType: WebGLConstants_default.FLOAT,
      count: 3,
      type: "VEC3"
    },
    {
      name: "indices",
      bufferView: 7,
      byteOffset: 240,
      componentType: WebGLConstants_default.UNSIGNED_SHORT,
      count: 3,
      type: "SCALAR"
    },
    {
      name: "bone-matrix",
      bufferView: 8,
      byteOffset: 0,
      componentType: WebGLConstants_default.FLOAT,
      count: 1,
      type: "MAT4"
    },
    {
      name: "times",
      bufferView: 8,
      byteOffset: 64,
      componentType: WebGLConstants_default.FLOAT,
      count: 1,
      type: "SCALAR"
    },
    {
      name: "translations",
      bufferView: 8,
      byteOffset: 68,
      componentType: WebGLConstants_default.FLOAT,
      count: 1,
      type: "VEC3"
    }
  ],
  meshes: [
    {
      name: "mesh0",
      primitives: [
        {
          attributes: {
            POSITION: 0,
            NORMAL: 1,
            TEXCOORD_0: 2
          },
          targets: [
            {
              POSITION: 3,
              NORMAL: 4
            },
            {
              POSITION: 5,
              NORMAL: 6
            }
          ],
          indices: 7,
          mode: WebGLConstants_default.TRIANGLES,
          material: 1
        }
      ]
    },
    {
      name: "mesh1",
      primitives: []
    }
  ],
  cameras: [
    {
      name: "cam",
      type: "perspective"
    }
  ],
  skins: [
    {
      inverseBindMatrices: 8,
      joints: [0]
    }
  ],
  animations: [
    {
      channels: [
        {
          sampler: 0,
          target: {
            node: 0,
            path: "translation"
          }
        }
      ],
      samplers: [
        {
          input: 9,
          output: 10
        }
      ]
    }
  ],
  textures: [
    {
      name: "texture",
      sampler: 0,
      source: 1
    },
    {
      name: "unusedTexture"
    }
  ],
  images: [
    {
      bufferView: 9,
      mimeType: "image/png"
    },
    {
      bufferView: 10,
      mimeType: "image/png"
    },
    {
      bufferView: 11,
      mimeType: "image/png"
    },
    {
      name: "image",
      bufferView: 12,
      mimeType: "image/png"
    }
  ],
  extensions: {
    KHR_lights_punctual: {
      lights: [
        {
          name: "sun",
          type: "directional"
        }
      ]
    }
  },
  samplers: [
    {
      name: "sampler",
      magFilter: 9729,
      minFilter: 9987,
      wrapS: 33648,
      wrapt: 33648
    },
    {
      magFilter: 9729,
      minFilter: 9987,
      wrapS: 33648,
      wrapt: 33648
    }
  ],
  materials: [
    {
      name: "unused"
    },
    {
      name: "used",
      pbrMetallicRoughness: {
        baseColorTexture: {
          index: 0
        }
      }
    }
  ],
  scenes: [
    {
      nodes: [2, 3]
    }
  ]
};
describe("removeUnusedElements", function() {
  delete gltf2.animations;
  delete gltf2.skins;
  gltf2.meshes[0].primitives[0].targets.splice(0, 1);
  gltf2.images.splice(1, 2);
  removeUnusedElements_default(gltf2);
  const remainingAccessorNames = [
    "positions",
    "normals",
    "texcoords",
    "positions-target1",
    "normals-target1",
    "indices"
  ];
  const remainingAcessorBufferViewIds = [0, 1, 2, 3, 4, 5];
  const remainingBufferViewNames = [
    "positions",
    "normals",
    "texcoords",
    "positions-target1",
    "normals-target1",
    "indices",
    "image0"
  ];
  const remainingBufferViewBufferIds = [0, 0, 0, 0, 0, 0, 1];
  const remaining = {
    nodes: ["skin", "used", "camera", "light"],
    cameras: ["cam"],
    meshes: ["mesh0"],
    buffers: ["mesh", "image01"],
    lights: ["sun"],
    materials: ["used"],
    textures: ["texture"],
    images: ["image"],
    samplers: ["sampler"]
  };
  it("correctly removes/keeps accessors", function() {
    expect(gltf2.accessors.length).toBe(remainingAccessorNames.length);
    ForEach_default.accessor(gltf2, (accessor, index) => {
      expect(accessor.name).toBe(remainingAccessorNames[index]);
      expect(accessor.bufferView).toBe(remainingAcessorBufferViewIds[index]);
    });
  });
  it("correctly removes/keeps bufferViews", function() {
    expect(gltf2.bufferViews.length).toBe(remainingBufferViewNames.length);
    ForEach_default.bufferView(gltf2, (bufferView, index) => {
      expect(bufferView.name).toBe(remainingBufferViewNames[index]);
      expect(bufferView.buffer).toBe(remainingBufferViewBufferIds[index]);
    });
  });
  [
    "materials",
    "nodes",
    "cameras",
    "meshes",
    "buffers",
    "textures",
    "images",
    "samplers"
  ].forEach((k) => {
    it(`correctly removes/keeps ${k}`, function() {
      expect(Object.keys(gltf2)).toContain(k);
      expect(gltf2[k].length).toBe(remaining[k].length);
      ForEach_default.topLevel(gltf2, k, (element) => {
        expect(remaining[k]).toContain(element.name);
      });
      remaining[k].forEach((name) => {
        expect(gltf2[k].map((x) => x.name)).toContain(name);
      });
    });
  });
  it("correctly removes/keeps lights", function() {
    expect(Object.keys(gltf2)).toContain("extensions");
    expect(Object.keys(gltf2.extensions)).toContain("KHR_lights_punctual");
    expect(Object.keys(gltf2.extensions.KHR_lights_punctual)).toContain(
      "lights"
    );
    expect(gltf2.extensions.KHR_lights_punctual.lights.length).toBe(
      remaining.lights.length
    );
    gltf2.extensions.KHR_lights_punctual.lights.forEach((element, index) => {
      expect(remaining["lights"]).toContain(element.name);
    });
  });
  it("keeps ancestor nodes of used nodes", function() {
    const gltf3 = {
      nodes: [
        {
          name: "skeleton-root",
          skin: 0,
          mesh: 0,
          translation: [0, 0, 0]
        },
        {
          name: "joint-parent",
          translation: [0, 0, 0],
          children: [2]
        },
        {
          name: "joint",
          translation: [0, 0, 0]
        },
        {
          name: "unused"
        }
      ],
      buffers: [
        {
          name: "mesh",
          byteLength: 246,
          uri: "data0.bin"
        },
        {
          name: "other",
          byteLength: 80,
          uri: "data1.bin"
        }
      ],
      bufferViews: [
        {
          name: "positions",
          buffer: 0,
          byteOffset: 0,
          byteLength: 36
        },
        {
          name: "indices",
          buffer: 0,
          byteOffset: 240,
          byteLength: 6
        }
      ],
      accessors: [
        {
          name: "positions",
          bufferView: 0,
          byteOffset: 0,
          componentType: WebGLConstants_default.FLOAT,
          count: 3,
          type: "VEC3",
          min: [-1, -1, -1],
          max: [1, 1, 1]
        },
        {
          name: "indices",
          bufferView: 7,
          byteOffset: 240,
          componentType: WebGLConstants_default.UNSIGNED_SHORT,
          count: 3,
          type: "SCALAR"
        }
      ],
      meshes: [
        {
          name: "mesh0",
          primitives: [
            {
              attributes: {
                POSITION: 0
              },
              indices: 1,
              mode: WebGLConstants_default.TRIANGLES
            }
          ]
        }
      ],
      skins: [
        {
          skeleton: 0,
          joints: [0, 2]
        }
      ],
      scenes: [
        {
          nodes: [0]
        }
      ]
    };
    removeUnusedElements_default(gltf3);
    expect(gltf3.nodes.length).toEqual(3);
  });
  it("does not decrement a meshopt buffer index below the removed buffer", function() {
    const gltf3 = {
      buffers: [
        { name: "compressed", byteLength: 100 },
        { name: "fallback", byteLength: 100 },
        { name: "unused", byteLength: 100 }
      ],
      bufferViews: [
        {
          name: "meshopt",
          buffer: 1,
          byteOffset: 0,
          byteLength: 100,
          extensions: {
            KHR_meshopt_compression: {
              buffer: 0,
              byteOffset: 0,
              byteLength: 50,
              byteStride: 4,
              mode: "ATTRIBUTES",
              count: 25
            }
          }
        }
      ],
      extensionsUsed: ["KHR_meshopt_compression"]
    };
    removeUnusedElements_default(gltf3, ["buffer"]);
    expect(gltf3.buffers.length).toBe(2);
    expect(gltf3.bufferViews[0].extensions.KHR_meshopt_compression.buffer).toBe(
      0
    );
    expect(gltf3.bufferViews[0].buffer).toBe(1);
  });
});
describe("removes unused materials, textures, images, samplers", function() {
  it("removes unused materials", function() {
    const gltf3 = {
      materials: [
        {
          name: "0"
        },
        {
          name: "1"
        },
        {
          name: "2"
        },
        {
          name: "3"
        },
        {
          name: "4"
        },
        {
          name: "5"
        }
      ],
      meshes: [
        {
          primitives: [
            {
              material: 0
            }
          ]
        },
        {
          primitives: [
            {
              material: 2
            },
            {
              material: 3
            }
          ]
        }
      ]
    };
    removeUnusedElements_default(gltf3, ["material", "texture", "sampler", "image"]);
    expect(gltf3.materials.length).toEqual(3);
    expect(gltf3.materials[0].name).toEqual("0");
    expect(gltf3.materials[1].name).toEqual("2");
    expect(gltf3.materials[2].name).toEqual("3");
    expect(gltf3.meshes[0].primitives[0].material).toEqual(0);
    expect(gltf3.meshes[1].primitives[0].material).toEqual(1);
    expect(gltf3.meshes[1].primitives[1].material).toEqual(2);
  });
  it("removes unused textures", function() {
    const gltf3 = {
      textures: [
        {
          name: "0"
        },
        {
          name: "1"
        },
        {
          name: "2"
        },
        {
          name: "3"
        },
        {
          name: "4"
        }
      ],
      materials: [
        {
          occlusionTexture: {
            index: 0
          },
          normalTexture: {
            index: 2
          }
        },
        {
          extensions: {
            KHR_techniques_webgl: {
              values: {
                diffuse: {
                  index: 3
                }
              }
            }
          }
        }
      ],
      meshes: [
        {
          primitives: [
            {
              material: 0
            },
            {
              material: 1
            }
          ]
        }
      ]
    };
    removeUnusedElements_default(gltf3, ["material", "texture", "sampler", "image"]);
    expect(gltf3.textures.length).toEqual(3);
    expect(gltf3.textures[0].name).toEqual("0");
    expect(gltf3.textures[1].name).toEqual("2");
    expect(gltf3.textures[2].name).toEqual("3");
    expect(gltf3.materials[0].occlusionTexture.index).toEqual(0);
    expect(gltf3.materials[0].normalTexture.index).toEqual(1);
    expect(
      gltf3.materials[1].extensions.KHR_techniques_webgl.values.diffuse.index
    ).toEqual(2);
  });
  it("removes unused images", function() {
    const gltf3 = {
      images: [
        {
          name: "0"
        },
        {
          name: "1"
        },
        {
          name: "2"
        },
        {
          name: "3"
        },
        {
          name: "4"
        },
        {
          name: "5"
        },
        {
          name: "6"
        }
      ],
      textures: [
        {
          source: 1
        },
        {
          extensions: {
            EXT_texture_webp: {
              source: 5
            }
          }
        },
        {
          extensions: {
            KHR_texture_basisu: {
              source: 6
            }
          }
        }
      ],
      materials: [
        {
          occlusionTexture: {
            index: 0
          },
          normalTexture: {
            index: 1
          },
          emissiveTexture: {
            index: 2
          }
        }
      ],
      meshes: [
        {
          primitives: [
            {
              material: 0
            }
          ]
        }
      ]
    };
    removeUnusedElements_default(gltf3, ["material", "texture", "sampler", "image"]);
    expect(gltf3.images.length).toEqual(3);
    expect(gltf3.images[0].name).toEqual("1");
    expect(gltf3.images[1].name).toEqual("5");
    expect(gltf3.images[2].name).toEqual("6");
    expect(gltf3.textures[0].source).toEqual(0);
    expect(gltf3.textures[1].extensions.EXT_texture_webp.source).toEqual(1);
    expect(gltf3.textures[2].extensions.KHR_texture_basisu.source).toEqual(2);
  });
  it("removes unused samplers", function() {
    const gltf3 = {
      samplers: [
        {
          name: "0"
        },
        {
          name: "1"
        },
        {
          name: "2"
        },
        {
          name: "3"
        },
        {
          name: "4"
        }
      ],
      textures: [
        {
          sampler: 2
        },
        {
          sampler: 3
        },
        {
          // no sampler defined
        }
      ],
      materials: [
        {
          occlusionTexture: {
            index: 0
          },
          normalTexture: {
            index: 1
          },
          emissiveTexture: {
            index: 2
          }
        }
      ],
      meshes: [
        {
          primitives: [
            {
              material: 0
            }
          ]
        }
      ]
    };
    removeUnusedElements_default(gltf3, ["material", "texture", "sampler", "image"]);
    expect(gltf3.samplers.length).toEqual(2);
    expect(gltf3.samplers[0].name).toEqual("2");
    expect(gltf3.samplers[1].name).toEqual("3");
    expect(gltf3.textures[0].sampler).toEqual(0);
    expect(gltf3.textures[1].sampler).toEqual(1);
    expect(gltf3.textures[2].sampler).toBeUndefined();
  });
  it("removed elements propagate", function() {
    const gltf3 = {
      samplers: [
        {
          name: "sampler0"
        },
        {
          name: "sampler1"
        }
      ],
      images: [
        {
          name: "image0"
        },
        {
          name: "image1"
        }
      ],
      textures: [
        {
          name: "texture0",
          source: 0,
          sampler: 0
        },
        {
          name: "texture1",
          source: 1,
          sampler: 1
        }
      ],
      materials: [
        {
          name: "material0",
          normalTexture: {
            index: 0
          }
        },
        {
          name: "material1",
          normalTexture: {
            index: 1
          }
        }
      ],
      meshes: [
        {
          primitives: [
            {
              material: 1
            }
          ]
        }
      ]
    };
    removeUnusedElements_default(gltf3, ["material", "texture", "sampler", "image"]);
    expect(gltf3.materials.length).toEqual(1);
    expect(gltf3.textures.length).toEqual(1);
    expect(gltf3.images.length).toEqual(1);
    expect(gltf3.samplers.length).toEqual(1);
    expect(gltf3.materials[0].name).toEqual("material1");
    expect(gltf3.textures[0].name).toEqual("texture1");
    expect(gltf3.images[0].name).toEqual("image1");
    expect(gltf3.samplers[0].name).toEqual("sampler1");
    expect(gltf3.materials[0].normalTexture.index).toEqual(0);
    expect(gltf3.textures[0].source).toEqual(0);
    expect(gltf3.textures[0].sampler).toEqual(0);
  });
  it("does not remove EXT_mesh_gpu_instancing accessors", function() {
    const gltf3 = {
      accessors: [
        {
          name: "0"
        },
        {
          name: "T"
        },
        {
          name: "R"
        },
        {
          name: "S"
        },
        {
          name: "1"
        }
      ],
      nodes: [
        {
          extensions: {
            EXT_mesh_gpu_instancing: {
              attributes: {
                TRANSLATION: 1,
                ROTATION: 2,
                SCALE: 3
              }
            }
          }
        }
      ],
      extensionsUsed: ["EXT_mesh_gpu_instancing"]
    };
    removeUnusedElements_default(gltf3, ["accessor"]);
    expect(gltf3.accessors.length).toEqual(3);
    expect(gltf3.accessors[0].name).toEqual("T");
    expect(gltf3.accessors[1].name).toEqual("R");
    expect(gltf3.accessors[2].name).toEqual("S");
  });
  it("does not remove CESIUM_primitive_outline accessors", function() {
    const gltf3 = {
      accessors: [
        {
          name: "unused"
        },
        {
          name: "position"
        },
        {
          name: "outlineIndices"
        },
        {
          name: "normal"
        },
        {
          name: "indices"
        },
        {
          name: "unused"
        }
      ],
      meshes: [
        {
          primitives: [
            {
              attributes: {
                POSITION: 1,
                NORMAL: 3
              },
              indices: 4,
              extensions: {
                CESIUM_primitive_outline: {
                  indices: 2
                }
              }
            }
          ]
        }
      ],
      nodes: [
        {
          mesh: 0
        }
      ],
      extensionsUsed: ["CESIUM_primitive_outline"]
    };
    removeUnusedElements_default(gltf3, ["accessor"]);
    expect(gltf3.accessors.length).toEqual(4);
    expect(gltf3.accessors[0].name).toEqual("position");
    expect(gltf3.accessors[1].name).toEqual("outlineIndices");
    expect(gltf3.accessors[2].name).toEqual("normal");
    expect(gltf3.accessors[3].name).toEqual("indices");
    expect(
      gltf3.meshes[0].primitives[0].extensions.CESIUM_primitive_outline.indices
    ).toEqual(1);
  });
  it("does not remove EXT_feature_metadata buffer views and textures", function() {
    const gltf3 = {
      asset: {
        version: "2.0"
      },
      extensionsUsed: ["EXT_feature_metadata"],
      extensions: {
        EXT_feature_metadata: {
          schema: {
            classes: {
              vegetation: {
                properties: {
                  vegetationDensity: {
                    type: "UINT8",
                    normalized: true
                  }
                }
              },
              landCover: {
                properties: {
                  name: {
                    type: "STRING"
                  },
                  color: {
                    type: "ARRAY",
                    componentType: "UINT8"
                  }
                }
              }
            }
          },
          featureTables: {
            landCoverTable: {
              class: "landCover",
              count: 256,
              properties: {
                name: {
                  bufferView: 4,
                  stringOffsetBufferView: 5
                },
                color: {
                  bufferView: 6,
                  arrayOffsetBufferView: 7
                }
              }
            }
          },
          featureTextures: {
            vegetationTexture: {
              class: "vegetation",
              properties: {
                vegetationDensity: {
                  texture: {
                    index: 1,
                    texCoord: 0
                  },
                  channels: "r"
                }
              }
            }
          }
        }
      },
      scene: 0,
      scenes: [
        {
          nodes: [0]
        }
      ],
      nodes: [
        {
          mesh: 0
        }
      ],
      materials: [
        {
          doubleSided: true,
          name: "Photogrammetry",
          pbrMetallicRoughness: {
            baseColorTexture: {
              index: 0,
              texCoord: 1
            },
            metallicFactor: 0,
            roughnessFactor: 0.5
          }
        }
      ],
      meshes: [
        {
          primitives: [
            {
              attributes: {
                POSITION: 0,
                TEXCOORD_0: 1,
                TEXCOORD_1: 2
              },
              indices: 3,
              material: 0,
              extensions: {
                EXT_feature_metadata: {
                  featureIdTextures: [
                    {
                      featureTable: "landCoverTable",
                      featureIds: {
                        texture: {
                          texCoord: 0,
                          index: 2
                        },
                        channels: "r"
                      }
                    }
                  ],
                  featureTextures: ["vegetationTexture"]
                }
              }
            }
          ]
        }
      ],
      textures: [
        {
          name: "Photogrammetry Texture",
          source: 0
        },
        {
          name: "Vegetation Texture",
          source: 1
        },
        {
          name: "Land Cover Texture",
          source: 2
        }
      ],
      images: [
        {
          name: "Photogrammetry",
          uri: "photogrammetry.jpg"
        },
        {
          name: "Vegetation",
          uri: "vegetation.jpg"
        },
        {
          name: "Land Cover",
          uri: "land-cover.png"
        }
      ],
      accessors: [
        {
          name: "Positions",
          bufferView: 0,
          componentType: 5126,
          count: 1830,
          max: [50.01457214355469, 19.920944213867188, 50.0020866394043],
          min: [-50.00897979736328, -16.473196029663086, -50.006893157958984],
          type: "VEC3"
        },
        {
          name: "Ortho UVs",
          bufferView: 1,
          componentType: 5126,
          count: 1830,
          type: "VEC2"
        },
        {
          name: "Photogrammetry UVs",
          bufferView: 2,
          componentType: 5126,
          count: 1830,
          type: "VEC2"
        },
        {
          name: "Indices",
          bufferView: 3,
          componentType: 5123,
          count: 5964,
          type: "SCALAR"
        }
      ],
      bufferViews: [
        {
          name: "Positions",
          buffer: 0,
          byteLength: 21960,
          byteOffset: 0
        },
        {
          name: "Ortho UVs",
          buffer: 0,
          byteLength: 14640,
          byteOffset: 21960
        },
        {
          name: "Photogrammetry UVs",
          buffer: 0,
          byteLength: 14640,
          byteOffset: 36600
        },
        {
          name: "Indices",
          buffer: 0,
          byteLength: 11928,
          byteOffset: 51240
        },
        {
          name: "Land Cover Name",
          buffer: 1,
          byteLength: 1546,
          byteOffset: 768
        },
        {
          name: "Land Cover String Offsets",
          buffer: 1,
          byteLength: 1028,
          byteOffset: 2320
        },
        {
          name: "Land Cover Color",
          buffer: 1,
          byteLength: 768,
          byteOffset: 0
        },
        {
          name: "Land Cover Color Offsets",
          buffer: 1,
          byteLength: 1028,
          byteOffset: 3352
        }
      ],
      buffers: [
        {
          name: "Geometry Buffer",
          byteLength: 63168,
          uri: "microcosm.bin"
        },
        {
          name: "Metadata Buffer",
          byteLength: 4384,
          uri: "microcosm-metadata.bin"
        }
      ]
    };
    delete gltf3.meshes[0].primitives[0].attributes.POSITION;
    delete gltf3.materials[0].pbrMetallicRoughness.baseColorTexture;
    removeUnusedElements_default(gltf3, ["accessor", "bufferView", "texture", "image"]);
    expect(gltf3.bufferViews.length).toBe(7);
    expect(gltf3.textures.length).toBe(2);
    expect(gltf3.images.length).toBe(2);
  });
  it("does not remove EXT_mesh_features and EXT_structural_metadata buffer views and textures", function() {
    const gltf3 = {
      asset: {
        version: "2.0"
      },
      extensionsUsed: ["EXT_mesh_features", "EXT_structural_metadata"],
      extensions: {
        EXT_structural_metadata: {
          schema: {
            classes: {
              vegetation: {
                properties: {
                  vegetationDensity: {
                    type: "SCALAR",
                    componentType: "UINT8",
                    normalized: true
                  }
                }
              },
              landCover: {
                properties: {
                  name: {
                    type: "STRING"
                  },
                  color: {
                    type: "SCALAR",
                    componentType: "UINT8",
                    array: true
                  }
                }
              }
            }
          },
          propertyTables: [
            {
              class: "landCover",
              count: 256,
              properties: {
                name: {
                  values: 4,
                  stringOffsets: 5
                },
                color: {
                  values: 6,
                  arrayOffsets: 7
                }
              }
            }
          ],
          propertyTextures: [
            {
              class: "vegetation",
              properties: {
                vegetationDensity: {
                  index: 1,
                  texCoord: 0,
                  channels: [0]
                }
              }
            }
          ]
        }
      },
      scene: 0,
      scenes: [
        {
          nodes: [0]
        }
      ],
      nodes: [
        {
          mesh: 0
        }
      ],
      materials: [
        {
          doubleSided: true,
          name: "Photogrammetry",
          pbrMetallicRoughness: {
            baseColorTexture: {
              index: 0,
              texCoord: 1
            },
            metallicFactor: 0,
            roughnessFactor: 0.5
          }
        }
      ],
      meshes: [
        {
          primitives: [
            {
              attributes: {
                POSITION: 0,
                TEXCOORD_0: 1,
                TEXCOORD_1: 2
              },
              indices: 3,
              material: 0,
              extensions: {
                EXT_mesh_features: {
                  featureIds: [
                    {
                      featureCount: 10,
                      texture: {
                        index: 2,
                        texCoord: 0,
                        channels: [0]
                      },
                      propertyTable: 0
                    }
                  ]
                },
                EXT_structural_metadata: {
                  propertyTextures: [0]
                }
              }
            }
          ]
        }
      ],
      textures: [
        {
          name: "Photogrammetry Texture",
          source: 0
        },
        {
          name: "Vegetation Texture",
          source: 1
        },
        {
          name: "Land Cover Texture",
          source: 2
        }
      ],
      images: [
        {
          name: "Photogrammetry",
          uri: "photogrammetry.jpg"
        },
        {
          name: "Vegetation",
          uri: "vegetation.jpg"
        },
        {
          name: "Land Cover",
          uri: "land-cover.png"
        }
      ],
      accessors: [
        {
          name: "Positions",
          bufferView: 0,
          componentType: 5126,
          count: 1830,
          max: [50.01457214355469, 19.920944213867188, 50.0020866394043],
          min: [-50.00897979736328, -16.473196029663086, -50.006893157958984],
          type: "VEC3"
        },
        {
          name: "Ortho UVs",
          bufferView: 1,
          componentType: 5126,
          count: 1830,
          type: "VEC2"
        },
        {
          name: "Photogrammetry UVs",
          bufferView: 2,
          componentType: 5126,
          count: 1830,
          type: "VEC2"
        },
        {
          name: "Indices",
          bufferView: 3,
          componentType: 5123,
          count: 5964,
          type: "SCALAR"
        }
      ],
      bufferViews: [
        {
          name: "Positions",
          buffer: 0,
          byteLength: 21960,
          byteOffset: 0
        },
        {
          name: "Ortho UVs",
          buffer: 0,
          byteLength: 14640,
          byteOffset: 21960
        },
        {
          name: "Photogrammetry UVs",
          buffer: 0,
          byteLength: 14640,
          byteOffset: 36600
        },
        {
          name: "Indices",
          buffer: 0,
          byteLength: 11928,
          byteOffset: 51240
        },
        {
          name: "Land Cover Name",
          buffer: 1,
          byteLength: 1546,
          byteOffset: 768
        },
        {
          name: "Land Cover String Offsets",
          buffer: 1,
          byteLength: 1028,
          byteOffset: 2320
        },
        {
          name: "Land Cover Color",
          buffer: 1,
          byteLength: 768,
          byteOffset: 0
        },
        {
          name: "Land Cover Color Offsets",
          buffer: 1,
          byteLength: 1028,
          byteOffset: 3352
        }
      ],
      buffers: [
        {
          name: "Geometry Buffer",
          byteLength: 63168,
          uri: "microcosm.bin"
        },
        {
          name: "Metadata Buffer",
          byteLength: 4384,
          uri: "microcosm-metadata.bin"
        }
      ]
    };
    delete gltf3.meshes[0].primitives[0].attributes.POSITION;
    delete gltf3.materials[0].pbrMetallicRoughness.baseColorTexture;
    removeUnusedElements_default(gltf3, ["accessor", "bufferView", "texture", "image"]);
    expect(gltf3.bufferViews.length).toBe(7);
    expect(gltf3.textures.length).toBe(2);
    expect(gltf3.images.length).toBe(2);
  });
  it("keeps KHR_materials_transmission.transmissionTexture", function() {
    const gltf3 = {
      materials: [
        {
          extensions: {
            KHR_materials_transmission: {
              transmissionTexture: { index: 1 }
            }
          }
        }
      ],
      textures: [
        { source: 0, sampler: 0 },
        { source: 1, sampler: 0 }
      ],
      images: [{ name: "img0" }, { name: "img1" }],
      samplers: [{}],
      meshes: [
        {
          primitives: [
            {
              material: 0
            }
          ]
        }
      ]
    };
    const origTransmissionImageName = gltf3.images[gltf3.textures[1].source].name;
    removeUnusedElements_default(gltf3, ["texture", "sampler", "image"]);
    expect(gltf3.textures.length).toBe(1);
    const newIdx = gltf3.materials[0].extensions.KHR_materials_transmission.transmissionTexture.index;
    expect(gltf3.images[gltf3.textures[newIdx].source].name).toBe(
      origTransmissionImageName
    );
  });
  it("keeps pbr baseColor and KHR_materials_transmission textures", function() {
    const gltf3 = {
      materials: [
        {
          pbrMetallicRoughness: {
            baseColorTexture: { index: 3 }
          },
          extensions: {
            KHR_materials_transmission: {
              transmissionTexture: { index: 2 }
            }
          }
        }
      ],
      textures: [
        { source: 0, sampler: 0 },
        { source: 1, sampler: 0 },
        { source: 2, sampler: 0 },
        { source: 3, sampler: 0 }
      ],
      images: [
        { name: "img0" },
        { name: "img1" },
        { name: "img2" },
        { name: "img3" }
      ],
      samplers: [{}],
      meshes: [
        {
          primitives: [
            {
              material: 0
            }
          ]
        }
      ]
    };
    const origTransmissionImageName = gltf3.images[gltf3.textures[2].source].name;
    const origBaseColorImageName = gltf3.images[gltf3.textures[3].source].name;
    removeUnusedElements_default(gltf3, ["texture", "sampler", "image"]);
    expect(gltf3.textures.length).toBe(2);
    const mat = gltf3.materials[0];
    const newTransmissionIdx = mat.extensions.KHR_materials_transmission.transmissionTexture.index;
    const newBaseColorIdx = mat.pbrMetallicRoughness.baseColorTexture.index;
    expect(gltf3.images[gltf3.textures[newTransmissionIdx].source].name).toBe(
      origTransmissionImageName
    );
    expect(gltf3.images[gltf3.textures[newBaseColorIdx].source].name).toBe(
      origBaseColorImageName
    );
    expect(newTransmissionIdx).not.toBe(newBaseColorIdx);
  });
});

// packages/gltf/Specs/updateAccessorComponentTypeSpec.js
function concatUint8Arrays(arrays) {
  const totalLength = arrays.reduce((sum, array) => sum + array.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const array of arrays) {
    result.set(array, offset);
    offset += array.length;
  }
  return result;
}
var buffer;
describe("updateAccessorComponentTypes", function() {
  beforeAll(function() {
    const byteBuffer = new Uint8Array(new Int8Array(96).buffer);
    const floatBuffer = new Uint8Array(new Float32Array(96).buffer);
    const unsignedShortBuffer = new Uint8Array(new Uint16Array(96).buffer);
    const source = concatUint8Arrays([
      byteBuffer,
      floatBuffer,
      unsignedShortBuffer
    ]);
    buffer = {
      byteLength: source.byteLength,
      extras: {
        _pipeline: {
          source
        }
      }
    };
  });
  it("converts joints accessor types", function() {
    const gltf3 = {
      meshes: [
        {
          primitives: [
            {
              attributes: {
                JOINTS_0: 0
              }
            },
            {
              attributes: {
                JOINTS_0: 1
              }
            },
            {
              attributes: {
                JOINTS_0: 2
              }
            }
          ]
        }
      ],
      accessors: [
        {
          bufferView: 0,
          componentType: WebGLConstants_default.BYTE,
          count: 24,
          type: "VEC4"
        },
        {
          bufferView: 1,
          componentType: WebGLConstants_default.FLOAT,
          byteOffset: 12,
          count: 24,
          type: "VEC4"
        },
        {
          bufferView: 2,
          componentType: WebGLConstants_default.UNSIGNED_SHORT,
          count: 24,
          type: "VEC4"
        }
      ],
      bufferViews: [
        {
          buffer: 0,
          byteOffset: 0,
          byteLength: 96
        },
        {
          buffer: 0,
          byteOffset: 96,
          byteLength: 384
        },
        {
          buffer: 0,
          byteOffset: 480,
          byteLength: 192
        }
      ],
      buffers: [buffer]
    };
    updateAccessorComponentTypes_default(gltf3);
    expect(gltf3.accessors.length).toBe(3);
    expect(gltf3.bufferViews.length).toBe(5);
    expect(gltf3.buffers.length).toBe(3);
    expect(gltf3.accessors[0].componentType).toBe(WebGLConstants_default.UNSIGNED_BYTE);
    expect(gltf3.accessors[0].bufferView).toBe(3);
    expect(gltf3.bufferViews[3].buffer).toBe(1);
    expect(gltf3.bufferViews[3].byteLength).toBe(96);
    expect(gltf3.accessors[1].componentType).toBe(WebGLConstants_default.UNSIGNED_SHORT);
    expect(gltf3.accessors[1].bufferView).toBe(4);
    expect(gltf3.accessors[1].byteOffset).toBe(0);
    expect(gltf3.bufferViews[4].buffer).toBe(2);
    expect(gltf3.bufferViews[4].byteLength).toBe(192);
    expect(gltf3.accessors[2].componentType).toBe(WebGLConstants_default.UNSIGNED_SHORT);
    expect(gltf3.accessors[2].bufferView).toBe(2);
  });
  it("converts weights accessor types", function() {
    const gltf3 = {
      meshes: [
        {
          primitives: [
            {
              attributes: {
                WEIGHTS_0: 0
              }
            },
            {
              attributes: {
                WEIGHTS_0: 1
              }
            },
            {
              attributes: {
                WEIGHTS_0: 2
              }
            }
          ]
        }
      ],
      accessors: [
        {
          bufferView: 0,
          componentType: WebGLConstants_default.FLOAT,
          count: 24,
          type: "VEC4"
        },
        {
          bufferView: 1,
          componentType: WebGLConstants_default.BYTE,
          byteOffset: 12,
          count: 24,
          type: "VEC4"
        },
        {
          bufferView: 2,
          componentType: WebGLConstants_default.SHORT,
          count: 24,
          type: "VEC4"
        }
      ],
      bufferViews: [
        {
          buffer: 0,
          byteLength: 12
        },
        {
          buffer: 0,
          byteOffset: 12,
          byteLength: 12
        },
        {
          buffer: 0,
          byteLength: 12
        }
      ],
      buffers: [buffer]
    };
    updateAccessorComponentTypes_default(gltf3);
    expect(gltf3.accessors.length).toBe(3);
    expect(gltf3.bufferViews.length).toBe(5);
    expect(gltf3.buffers.length).toBe(3);
    expect(gltf3.accessors[0].componentType).toBe(WebGLConstants_default.FLOAT);
    expect(gltf3.accessors[0].bufferView).toBe(0);
    expect(gltf3.accessors[1].componentType).toBe(WebGLConstants_default.UNSIGNED_BYTE);
    expect(gltf3.accessors[1].bufferView).toBe(3);
    expect(gltf3.accessors[1].byteOffset).toBe(0);
    expect(gltf3.bufferViews[3].buffer).toBe(1);
    expect(gltf3.bufferViews[3].byteLength).toBe(96);
    expect(gltf3.accessors[2].componentType).toBe(WebGLConstants_default.UNSIGNED_SHORT);
    expect(gltf3.accessors[2].bufferView).toBe(4);
    expect(gltf3.bufferViews[4].buffer).toBe(2);
    expect(gltf3.bufferViews[4].byteLength).toBe(192);
  });
});

// packages/gltf/Specs/updateVersionSpec.js
var gltf1Techniques = "./Data/Models/glTF-1.0/box/box.gltf";
var gltf1TechniquesTextured = "./Data/Models/glTF-1.0/box-textured-embedded/box-textured-embedded.gltf";
var gltf1MaterialsCommon = "./Data/Models/glTF-1.0/box-materials-common/box-materials-common.gltf";
var gltf1MaterialsCommonTextured = "./Data/Models/glTF-1.0/box-textured-materials-common/box-textured-materials-common.gltf";
var gltf2TechniquesTextured = "./Data/Models/glTF-2.0/box-techniques-embedded/box-techniques-embedded.gltf";
function concatUint8Arrays2(arrays) {
  const totalLength = arrays.reduce((sum, array) => sum + array.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const array of arrays) {
    result.set(array, offset);
    offset += array.length;
  }
  return result;
}
function decodeBase64(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
async function resolveBuffer(buffer2, gltfUrl) {
  const uri = buffer2.uri;
  let source;
  if (uri.startsWith("data:")) {
    source = decodeBase64(uri.substring(uri.indexOf(",") + 1));
  } else {
    const baseUrl = gltfUrl.substring(0, gltfUrl.lastIndexOf("/") + 1);
    const response = await fetch(baseUrl + uri);
    if (!response.ok) {
      throw new Error(`Failed to load ${baseUrl + uri}: ${response.status}`);
    }
    source = new Uint8Array(await response.arrayBuffer());
  }
  buffer2.extras._pipeline.source = source;
}
async function loadGltf(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status}`);
  }
  const gltf3 = await response.json();
  addPipelineExtras_default(gltf3);
  const promises = [];
  ForEach_default.buffer(gltf3, function(buffer2) {
    promises.push(resolveBuffer(buffer2, url));
  });
  await Promise.all(promises);
  return gltf3;
}
describe("updateVersion", function() {
  it("defaults to 1.0 if gltf has no version", function() {
    const gltf3 = {};
    updateVersion_default(gltf3, {
      targetVersion: "1.0"
    });
    expect(gltf3.asset.version).toEqual("1.0");
  });
  it("updates empty glTF with version from 0.8 to 2.0", function() {
    const gltf3 = {
      version: "0.8"
    };
    updateVersion_default(gltf3);
    expect(gltf3.version).toBeUndefined();
    expect(gltf3.asset.version).toEqual("2.0");
  });
  it("updates empty glTF with version 1.0 to 2.0", function() {
    const gltf3 = {
      asset: {
        version: "1.0"
      }
    };
    updateVersion_default(gltf3);
    expect(gltf3.asset.version).toEqual("2.0");
  });
  it("updates a glTF with non-standard version to 2.0", function() {
    const gltf3 = {
      asset: {
        version: "1.0.1"
      }
    };
    updateVersion_default(gltf3);
    expect(gltf3.asset.version).toEqual("2.0");
  });
  it("updates glTF from 0.8 to 1.0", function() {
    const times = [0, 1];
    const axisA = new Cartesian3_default(0, 0, 1);
    const axisB = new Cartesian3_default(0, 1, 0);
    const angleA = 0;
    const angleB = 0.5;
    const quatA = Quaternion_default.fromAxisAngle(axisA, angleA);
    const quatB = Quaternion_default.fromAxisAngle(axisB, angleB);
    const originalBuffer = new Uint8Array(
      new Float32Array([
        times[0],
        times[1],
        axisA.x,
        axisA.y,
        axisA.z,
        angleA,
        axisB.x,
        axisB.y,
        axisB.z,
        angleB
      ]).buffer
    );
    const expectedBuffer = new Uint8Array(
      new Float32Array([
        times[0],
        times[1],
        quatA.x,
        quatA.y,
        quatA.z,
        quatA.w,
        quatB.x,
        quatB.y,
        quatB.z,
        quatB.w
      ]).buffer
    );
    const gltf3 = {
      version: "0.8",
      asset: {
        profile: "WebGL 1.0"
      },
      allExtensions: ["extension"],
      lights: {
        someLight: true
      },
      buffers: {
        buffer: {
          extras: {
            _pipeline: {
              source: originalBuffer
            }
          }
        }
      },
      bufferViews: {
        bufferViewTime: {
          buffer: "buffer",
          byteLength: 8,
          byteOffset: 0
        },
        bufferViewRotation: {
          buffer: "buffer",
          byteLength: 32,
          byteOffset: 8
        }
      },
      accessors: {
        accessorTime: {
          bufferView: "bufferViewTime",
          byteOffset: 0,
          byteStride: 0,
          componentType: WebGLConstants_default.FLOAT,
          count: 2,
          type: "SCALAR"
        },
        accessorRotation: {
          bufferView: "bufferViewRotation",
          byteOffset: 0,
          byteStride: 0,
          componentType: WebGLConstants_default.FLOAT,
          count: 2,
          type: "VEC4"
        }
      },
      animations: {
        animationNode: {
          channels: [
            {
              sampler: "sampler",
              target: {
                id: "node",
                path: "rotation"
              }
            }
          ],
          count: 2,
          parameters: {
            time: "accessorTime",
            rotation: "accessorRotation"
          },
          samplers: {
            sampler: {
              input: "time",
              interpolation: "LINEAR",
              output: "rotation"
            }
          }
        },
        animationNodeOther: {
          channels: [
            {
              sampler: "sampler",
              target: {
                id: "nodeOther",
                path: "rotation"
              }
            }
          ],
          count: 2,
          parameters: {
            time: "accessorTime",
            rotation: "accessorRotation"
          },
          samplers: {
            sampler: {
              input: "time",
              interpolation: "LINEAR",
              output: "rotation"
            }
          }
        }
      },
      materials: {
        material: {
          instanceTechnique: {
            technique: "technique",
            values: {
              ambient: [0, 0, 0, 1]
            }
          }
        }
      },
      meshes: {
        mesh: {
          primitives: [
            {
              primitive: WebGLConstants_default.TRIANGLES
            }
          ]
        }
      },
      nodes: {
        node: {
          rotation: [0, 0, 1, 0],
          instanceSkin: {
            skeletons: ["skeleton"],
            skin: "skin",
            meshes: ["mesh"]
          }
        },
        nodeOther: {
          rotation: [0, 0, 1, 0]
        }
      },
      techniques: {
        technique: {
          pass: "pass",
          passes: {
            pass: {
              instanceProgram: {
                attributes: {
                  attribute: "TEST_ATTRIBUTE"
                },
                program: "program",
                uniforms: {
                  uniform: "TEST_UNIFORM"
                }
              },
              states: ["TEST_STATE"]
            }
          }
        }
      }
    };
    updateVersion_default(gltf3, {
      targetVersion: "1.0",
      keepLegacyExtensions: true
    });
    expect(gltf3.asset.version).toEqual("1.0");
    expect(gltf3.asset.profile).toEqual({
      api: "WebGL",
      version: "1.0"
    });
    expect(gltf3.version).toBeUndefined();
    expect(gltf3.extensionsUsed).toEqual(["extension", "KHR_materials_common"]);
    expect(gltf3.allExtensions).toBeUndefined();
    expect(gltf3.extensions.KHR_materials_common.lights).toEqual({
      someLight: true
    });
    const { material } = gltf3.materials;
    expect(material.technique).toEqual("technique");
    expect(material.values).toEqual({
      ambient: [0, 0, 0, 1]
    });
    const primitive = gltf3.meshes.mesh.primitives[0];
    expect(primitive.primitive).toBeUndefined();
    expect(primitive.mode).toEqual(WebGLConstants_default.TRIANGLES);
    const { node } = gltf3.nodes;
    expect(node.skeletons).toEqual(["skeleton"]);
    expect(node.skin).toEqual("skin");
    expect(node.meshes).toEqual(["mesh"]);
    expect(node.rotation).toEqual([0, 0, 0, 1]);
    const { technique } = gltf3.techniques;
    expect(technique.pass).toBeUndefined();
    expect(technique.passes).toBeUndefined();
    expect(technique.attributes).toEqual({
      attribute: "TEST_ATTRIBUTE"
    });
    expect(technique.program).toEqual("program");
    expect(technique.uniforms).toEqual({
      uniform: "TEST_UNIFORM"
    });
    expect(technique.states).toEqual(["TEST_STATE"]);
    const { source } = gltf3.buffers.buffer.extras._pipeline;
    expect(source).toEqual(expectedBuffer);
  });
  function getNodeByName(gltf3, name) {
    return ForEach_default.node(gltf3, (node) => {
      if (node.name === name) {
        return node;
      }
    });
  }
  function getBufferViewByName(gltf3, name) {
    return ForEach_default.bufferView(gltf3, (bufferView) => {
      if (bufferView.name === name) {
        return bufferView;
      }
    });
  }
  it("updates glTF from 1.0 to 2.0", function() {
    const applicationSpecificBuffer = new Uint8Array(
      new Int16Array([-2, 1, 0, 1, 2, 3]).buffer
    );
    const positionBuffer = new Uint8Array(new Float32Array(9).fill(1).buffer);
    const normalBuffer = new Uint8Array(new Float32Array(9).fill(2).buffer);
    const texcoordBuffer = new Uint8Array(new Float32Array(6).fill(3).buffer);
    const source = concatUint8Arrays2([
      applicationSpecificBuffer,
      positionBuffer,
      normalBuffer,
      texcoordBuffer
    ]);
    const gltf3 = {
      asset: {
        profile: {
          api: "WebGL",
          version: "1.0.3"
        },
        version: "1.0"
      },
      animations: {
        animation: {
          samplers: {
            sampler: {
              input: "INPUT",
              output: "OUTPUT"
            }
          },
          parameters: {
            INPUT: "accessor_input",
            OUTPUT: "accessor_output"
          }
        }
      },
      extensionsUsed: [
        "KHR_materials_common",
        "WEB3D_quantized_attributes",
        "UNKOWN_EXTENSION"
      ],
      extensions: {
        KHR_materials_common: {
          lights: {
            directionalLight: {
              directional: {
                color: [1, 0, 0]
              },
              type: "directional"
            }
          }
        }
      },
      meshes: {
        mesh: {
          primitives: [
            {
              attributes: {
                POSITION: "accessor_position",
                NORMAL: "accessor_normal",
                TEXCOORD: "accessor_texcoord",
                COLOR: "accessor_color",
                JOINT: "accessor_joint",
                WEIGHT: "accessor_weight",
                APPLICATIONSPECIFIC: "accessor",
                _TEMPERATURE: "accessor_temperature"
              },
              indices: "accessor_indices"
            }
          ]
        }
      },
      materials: {
        material: {
          technique: "technique",
          values: {
            lightAttenuation: 2
          }
        }
      },
      techniques: {
        technique: {
          states: {
            enable: [
              WebGLConstants_default.SCISSOR_TEST,
              WebGLConstants_default.BLEND,
              WebGLConstants_default.CULL_FACE
            ],
            functions: {
              blendColor: [-1, 0, 0, 2],
              blendEquationSeparate: [
                WebGLConstants_default.FUNC_SUBTRACT,
                WebGLConstants_default.FUNC_SUBTRACT
              ],
              depthRange: [1, -1],
              scissor: [0, 0, 0, 0]
            }
          },
          attributes: {
            a_application: "application",
            a_joints: "joints",
            a_weights: "weights"
          },
          uniforms: {
            u_lightAttenuation: "lightAttenuation",
            u_texcoord: "texcoord",
            u_color: "color",
            u_application: "application",
            u_jointMatrix: "jointMatrix"
          },
          parameters: {
            lightAttenuation: {
              value: 1
            },
            texcoord: {
              semantic: "TEXCOORD"
            },
            color: {
              semantic: "COLOR"
            },
            joints: {
              semantic: "JOINT"
            },
            weights: {
              semantic: "WEIGHT"
            },
            application: {
              semantic: "APPLICATIONSPECIFIC",
              count: 1,
              value: 2
            },
            jointMatrix: {
              semantic: "JOINTMATRIX",
              count: 2
            }
          },
          program: "program_0"
        }
      },
      accessors: {
        accessor: {
          byteOffset: 0,
          bufferView: "bufferView",
          componentType: WebGLConstants_default.SHORT,
          count: 6,
          type: "SCALAR"
        },
        accessor_indices: {
          componentType: WebGLConstants_default.UNSIGNED_INT,
          count: 3,
          type: "SCALAR"
        },
        accessor_input: {
          componentType: WebGLConstants_default.FLOAT,
          count: 1,
          type: "SCALAR"
        },
        accessor_output: {
          componentType: WebGLConstants_default.FLOAT,
          count: 1,
          type: "VEC3"
        },
        accessor_position: {
          bufferView: "bufferViewAttributes",
          byteOffset: 0,
          componentType: WebGLConstants_default.FLOAT,
          count: 3,
          type: "VEC3"
        },
        accessor_normal: {
          bufferView: "bufferViewAttributes",
          byteOffset: 42,
          componentType: WebGLConstants_default.BYTE,
          count: 3,
          type: "VEC2"
        },
        accessor_texcoord: {
          bufferView: "bufferViewAttributes",
          byteOffset: 50,
          componentType: WebGLConstants_default.BYTE,
          count: 3,
          type: "VEC2"
        },
        accessor_color: {
          componentType: WebGLConstants_default.FLOAT,
          count: 3,
          type: "VEC3"
        },
        accessor_joint: {
          componentType: WebGLConstants_default.FLOAT,
          count: 1,
          type: "SCALAR"
        },
        accessor_weight: {
          componentType: WebGLConstants_default.FLOAT,
          count: 1,
          type: "SCALAR"
        },
        accessor_temperature: {
          componentType: WebGLConstants_default.FLOAT,
          count: 2,
          type: "SCALAR"
        }
      },
      bufferViews: {
        bufferView: {
          buffer: "buffer",
          byteOffset: 0
        },
        bufferViewAttributes: {
          buffer: "buffer",
          byteOffset: 12
        }
      },
      buffers: {
        buffer: {
          type: "arraybuffer",
          extras: {
            _pipeline: {
              source
            }
          }
        }
      },
      cameras: {
        camera: {
          perspective: {
            aspectRatio: 0,
            yfov: 0
          }
        }
      },
      nodes: {
        rootTransform: {
          children: ["skeletonNode", "meshNode"],
          matrix: [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1]
        },
        skeletonNode: {},
        meshNode: {
          skin: "someSkin",
          skeletons: ["skeletonNode"]
        },
        nodeWithoutChildren: {
          children: [],
          camera: 0
        },
        nonEmptyNodeParent: {
          children: ["emptyNode"],
          scale: [1, 2, 3]
        },
        emptyNodeParent: {
          children: ["emptyNode"]
        },
        emptyNode: {
          children: [],
          matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
        },
        lightNode: {
          extensions: {
            KHR_materials_common: {
              light: "directionalLight"
            }
          }
        }
      },
      programs: {
        program_0: {
          attributes: ["a_application", "a_joints", "a_weights"],
          fragmentShader: "fs",
          vertexShader: "vs"
        }
      },
      samplers: [],
      scene: "defaultScene",
      scenes: {
        defaultScene: {
          nodes: ["rootTransform", "emptyNodeParent", "lightNode"]
        }
      },
      shaders: {
        fs: {
          type: 35632,
          uri: "data:,"
        },
        vs: {
          type: 35633,
          uri: "data:,"
        }
      },
      skins: {
        someSkin: {}
      },
      textures: [
        {
          source: 0,
          format: WebGLConstants_default.RGBA,
          internalFormat: WebGLConstants_default.RGBA,
          target: WebGLConstants_default.TEXTURE_2D,
          type: WebGLConstants_default.UNSIGNED_BYTE
        }
      ],
      glExtensionsUsed: ["OES_element_index_uint"]
    };
    updateVersion_default(gltf3, {
      keepLegacyExtensions: true
    });
    expect(gltf3.asset.version).toEqual("2.0");
    expect(gltf3.asset.profile).toBeUndefined();
    const extensionsUsed = gltf3.extensionsUsed;
    expect(extensionsUsed).toEqual([
      "KHR_materials_common",
      "WEB3D_quantized_attributes",
      "UNKOWN_EXTENSION",
      "KHR_blend",
      "KHR_techniques_webgl"
    ]);
    const extensionsRequired = gltf3.extensionsRequired;
    expect(extensionsRequired).toEqual([
      "KHR_materials_common",
      "WEB3D_quantized_attributes",
      "KHR_techniques_webgl"
    ]);
    const animation = gltf3.animations[0];
    const sampler = animation.samplers[0];
    expect(sampler.name).toBeUndefined();
    expect(sampler.input).toEqual(2);
    expect(sampler.output).toEqual(3);
    expect(animation.parameters).toBeUndefined();
    expect(gltf3.samplers).toBeUndefined();
    expect(getNodeByName(gltf3, "nodeWithoutChildren").children).toBeUndefined();
    expect(getNodeByName(gltf3, "nonEmptyNodeParent")).toBeDefined();
    expect(getNodeByName(gltf3, "emptyNodeParent")).toBeUndefined();
    expect(getNodeByName(gltf3, "emptyNode")).toBeUndefined();
    expect(getNodeByName(gltf3, "lightNode")).toBeDefined();
    expect(gltf3.scenes[0].nodes.length).toBe(2);
    const material = gltf3.materials[0];
    expect(
      material.extensions.KHR_techniques_webgl.values.u_lightAttenuation
    ).toEqual(2);
    expect(material.doubleSided).toBeUndefined();
    expect(material.alphaMode).toBe("BLEND");
    const materialBlending = material.extensions.KHR_blend;
    expect(materialBlending).toBeDefined();
    expect(materialBlending.blendEquation).toEqual([
      WebGLConstants_default.FUNC_SUBTRACT,
      WebGLConstants_default.FUNC_SUBTRACT
    ]);
    expect(materialBlending.blendFactors).toEqual([
      WebGLConstants_default.ONE,
      WebGLConstants_default.ZERO,
      WebGLConstants_default.ONE,
      WebGLConstants_default.ZERO
    ]);
    const technique = gltf3.extensions.KHR_techniques_webgl.techniques[0];
    expect(technique.uniforms.u_lightAttenuation.value).toEqual(1);
    expect(technique.attributes.a_application.value).toBeUndefined();
    const primitive = gltf3.meshes[0].primitives[0];
    expect(technique.uniforms.u_texcoord.semantic).toEqual("TEXCOORD_0");
    expect(technique.uniforms.u_color.semantic).toEqual("COLOR_0");
    expect(primitive.attributes.TEXCOORD).toBeUndefined();
    expect(primitive.attributes.TEXCOORD_0).toEqual(6);
    expect(primitive.attributes.COLOR).toBeUndefined();
    expect(primitive.attributes.COLOR_0).toEqual(7);
    expect(technique.attributes.a_joints.semantic).toEqual("JOINTS_0");
    expect(technique.attributes.a_weights.semantic).toEqual("WEIGHTS_0");
    expect(primitive.attributes.JOINT).toBeUndefined();
    expect(primitive.attributes.JOINTS_0).toEqual(8);
    expect(primitive.attributes.WEIGHT).toBeUndefined();
    expect(primitive.attributes.WEIGHTS_0).toEqual(9);
    expect(technique.attributes.a_application.semantic).toEqual(
      "_APPLICATIONSPECIFIC"
    );
    expect(primitive.attributes.APPLICATIONSPECIFIC).toBeUndefined();
    expect(primitive.attributes._APPLICATIONSPECIFIC).toEqual(0);
    expect(primitive.attributes._TEMPERATURE).toEqual(10);
    expect(gltf3.accessors[8].componentType).toBe(WebGLConstants_default.UNSIGNED_SHORT);
    const camera = gltf3.cameras[0];
    expect(camera.perspective.aspectRatio).toBeUndefined();
    expect(camera.perspective.yfov).toEqual(1);
    const buffer2 = gltf3.buffers[0];
    expect(buffer2.type).toBeUndefined();
    expect(buffer2.byteLength).toEqual(source.byteLength);
    const bufferView = getBufferViewByName(gltf3, "bufferView");
    expect(bufferView.byteLength).toEqual(12);
    ForEach_default.accessorWithSemantic(gltf3, "POSITION", (accessorId) => {
      const accessor = gltf3.accessors[accessorId];
      expect(accessor.min.length).toEqual(
        numberOfComponentsForType_default(accessor.type)
      );
      expect(accessor.max.length).toEqual(
        numberOfComponentsForType_default(accessor.type)
      );
    });
    ForEach_default.animation(gltf3, (animation2) => {
      ForEach_default.animationSampler(animation2, (sampler2) => {
        const accessor = gltf3.accessors[sampler2.input];
        expect(accessor.min.length).toEqual(
          numberOfComponentsForType_default(accessor.type)
        );
        expect(accessor.max.length).toEqual(
          numberOfComponentsForType_default(accessor.type)
        );
      });
    });
    const positionAccessor = gltf3.accessors[primitive.attributes.POSITION];
    const normalAccessor = gltf3.accessors[primitive.attributes.NORMAL];
    const texcoordAccessor = gltf3.accessors[primitive.attributes.TEXCOORD_0];
    const positionBufferView = gltf3.bufferViews[positionAccessor.bufferView];
    const texcoordBufferView = gltf3.bufferViews[texcoordAccessor.bufferView];
    expect(positionAccessor.bufferView).toBe(1);
    expect(normalAccessor.bufferView).toBe(2);
    expect(texcoordAccessor.bufferView).toBe(2);
    expect(positionBufferView.byteLength).toBe(36);
    expect(positionBufferView.byteOffset).toBe(12);
    expect(positionBufferView.byteStride).toBe(12);
    expect(texcoordBufferView.byteLength).toBe(50 - 42 + 6);
    expect(texcoordBufferView.byteOffset).toBe(42 + 12);
    expect(texcoordBufferView.byteStride).toBe(2);
    expect(positionAccessor.byteStride).toBeUndefined();
    expect(normalAccessor.byteStride).toBeUndefined();
    expect(texcoordAccessor.byteStride).toBeUndefined();
    expect(gltf3.glExtensionsUsed).toBeUndefined();
    expect(
      gltf3.extensions.KHR_techniques_webgl.programs[0].glExtensions
    ).toEqual(["OES_element_index_uint"]);
  });
  it("updates glTF 1.0 techniques to PBR materials", async function() {
    const gltf3 = await loadGltf(gltf1Techniques);
    updateVersion_default(gltf3);
    const material = gltf3.materials[0];
    expect(material.pbrMetallicRoughness.roughnessFactor).toBe(1);
    expect(material.pbrMetallicRoughness.metallicFactor).toBe(0);
    expect(
      Math_default.equalsEpsilon(
        material.pbrMetallicRoughness.baseColorFactor[0],
        0.6038273388553378,
        // Original 0.8 before srgb -> linear conversion
        Math_default.EPSILON9
      )
    ).toBe(true);
    expect(material.pbrMetallicRoughness.baseColorFactor[1]).toBe(0);
    expect(material.pbrMetallicRoughness.baseColorFactor[2]).toBe(0);
    expect(material.pbrMetallicRoughness.baseColorFactor[3]).toBe(1);
    expect(gltf3.extensionsRequired).toBeUndefined();
    expect(gltf3.extensionsUsed).toBeUndefined();
    expect(material.extensions).toBeUndefined();
  });
  it("updates glTF 1.0 techniques with textures to PBR materials", async function() {
    const gltf3 = await loadGltf(gltf1TechniquesTextured);
    updateVersion_default(gltf3);
    const material = gltf3.materials[0];
    expect(material.pbrMetallicRoughness.roughnessFactor).toBe(1);
    expect(material.pbrMetallicRoughness.metallicFactor).toBe(0);
    expect(material.pbrMetallicRoughness.baseColorTexture.index).toBe(0);
  });
  it("updates glTF 1.0 with KHR_materials_common to PBR materials", async function() {
    const gltf3 = await loadGltf(gltf1MaterialsCommon);
    updateVersion_default(gltf3);
    const material = gltf3.materials[0];
    expect(material.pbrMetallicRoughness.roughnessFactor).toBe(1);
    expect(material.pbrMetallicRoughness.metallicFactor).toBe(0);
    expect(
      Math_default.equalsEpsilon(
        material.pbrMetallicRoughness.baseColorFactor[0],
        0.6038273388553378,
        // Original 0.8 before srgb -> linear conversion
        Math_default.EPSILON9
      )
    ).toBe(true);
    expect(material.pbrMetallicRoughness.baseColorFactor[1]).toBe(0);
    expect(material.pbrMetallicRoughness.baseColorFactor[2]).toBe(0);
    expect(material.pbrMetallicRoughness.baseColorFactor[3]).toBe(1);
    expect(material.doubleSided).toBe(false);
    expect(material.alphaMode).toBe("OPAQUE");
    expect(gltf3.extensionsRequired).toBeUndefined();
    expect(gltf3.extensionsUsed).toBeUndefined();
    expect(material.extensions).toBeUndefined();
  });
  it("updates glTF 1.0 with KHR_materials_common with textures to PBR materials", async function() {
    const gltf3 = await loadGltf(gltf1MaterialsCommonTextured);
    updateVersion_default(gltf3);
    const material = gltf3.materials[0];
    expect(material.pbrMetallicRoughness.roughnessFactor).toBe(1);
    expect(material.pbrMetallicRoughness.metallicFactor).toBe(0);
    expect(material.pbrMetallicRoughness.baseColorTexture.index).toBe(0);
    expect(material.doubleSided).toBe(false);
    expect(material.alphaMode).toBe("OPAQUE");
  });
  it("updates glTF 1.0 with KHR_materials_common with CONSTANT technique to PBR materials", async function() {
    const gltf3 = await loadGltf(gltf1MaterialsCommon);
    const materialsCommon = gltf3.materials["Effect-Red"].extensions.KHR_materials_common;
    materialsCommon.technique = "CONSTANT";
    updateVersion_default(gltf3);
    const material = gltf3.materials[0];
    expect(material.extensions.KHR_materials_unlit).toBeDefined();
    expect(gltf3.extensionsUsed.indexOf("KHR_materials_unlit") !== -1);
  });
  it("updates glTF 1.0 with KHR_materials_common with CONSTANT technique to PBR materials using emissive as the base color texture when diffuse is not present", async function() {
    const gltf3 = await loadGltf(gltf1MaterialsCommonTextured);
    const materialsCommon = gltf3.materials["Effect-Texture"].extensions.KHR_materials_common;
    materialsCommon.values.emission = materialsCommon.values.diffuse;
    delete materialsCommon.values.diffuse;
    materialsCommon.technique = "CONSTANT";
    updateVersion_default(gltf3);
    const material = gltf3.materials[0];
    expect(material.pbrMetallicRoughness.baseColorTexture).toBeDefined();
    expect(material.extensions.KHR_materials_unlit).toBeDefined();
    expect(gltf3.extensionsUsed.indexOf("KHR_materials_unlit") !== -1);
  });
  it("updates glTF 1.0 with KHR_materials_common with other values to PBR materials", async function() {
    const gltf3 = await loadGltf(gltf1MaterialsCommon);
    const materialsCommon = gltf3.materials["Effect-Red"].extensions.KHR_materials_common;
    materialsCommon.doubleSided = true;
    materialsCommon.transparent = true;
    materialsCommon.values.ambient = [0.2, 0.2, 0.2, 1];
    materialsCommon.values.emission = [0.2, 0.2, 0.2, 1];
    materialsCommon.values.transparency = 0.5;
    updateVersion_default(gltf3);
    const material = gltf3.materials[0];
    expect(material.emissiveFactor).toEqual([0.2, 0.2, 0.2]);
    expect(material.doubleSided).toBe(true);
    expect(material.alphaMode).toBe("BLEND");
    expect(material.pbrMetallicRoughness.baseColorFactor[3]).toBe(0.5);
  });
  it("updates glTF 2.0 with KHR_techniques_webgl to PBR materials", async function() {
    const gltf3 = await loadGltf(gltf2TechniquesTextured);
    updateVersion_default(gltf3);
    const material = gltf3.materials[0];
    expect(material.pbrMetallicRoughness.roughnessFactor).toBe(1);
    expect(material.pbrMetallicRoughness.metallicFactor).toBe(0);
    expect(material.pbrMetallicRoughness.baseColorTexture.index).toBe(0);
    expect(gltf3.extensionsRequired).toBeUndefined();
    expect(gltf3.extensionsUsed).toBeUndefined();
    expect(material.extensions).toBeUndefined();
  });
  it("creates a PBR material from KHR_techniques_webgl with a custom diffuse texture name", async function() {
    const gltf3 = await loadGltf(gltf2TechniquesTextured);
    const options = {
      baseColorTextureNames: ["u_diffuse"]
    };
    updateVersion_default(gltf3, options);
    expect(gltf3.materials.length).toBe(1);
    const material = gltf3.materials[0];
    expect(material.pbrMetallicRoughness.roughnessFactor).toBe(1);
    expect(material.pbrMetallicRoughness.metallicFactor).toBe(0);
    expect(material.pbrMetallicRoughness.baseColorTexture.index).toBe(0);
    expect(gltf3.extensionsRequired).toBeUndefined();
    expect(gltf3.extensionsUsed).toBeUndefined();
  });
  it("does not create a PBR material from KHR_techniques_webgl when the diffuse texture name is unknown", async function() {
    const gltf3 = await loadGltf(gltf2TechniquesTextured);
    const options = {
      baseColorTextureNames: ["NOT_u_diffuse"]
    };
    updateVersion_default(gltf3, options);
    expect(gltf3.materials.length).toBe(1);
    const material = gltf3.materials[0];
    expect(material.pbrMetallicRoughness).toBeUndefined();
    expect(material.extensions).toBeUndefined();
    expect(gltf3.extensionsRequired).toBeUndefined();
    expect(gltf3.extensionsUsed).toBeUndefined();
  });
});

// packages/gltf/Specs/usesExtensionSpec.js
describe("usesExtension", function() {
  it("uses extension", function() {
    const gltf3 = {
      extensionsUsed: ["extension1", "extension2"]
    };
    expect(usesExtension_default(gltf3, "extension1")).toBe(true);
    expect(usesExtension_default(gltf3, "extension2")).toBe(true);
    expect(usesExtension_default(gltf3, "extension3")).toBe(false);
    const emptyGltf = {};
    expect(usesExtension_default(emptyGltf, "extension1")).toBe(false);
  });
});
//# sourceMappingURL=SpecList.js.map
