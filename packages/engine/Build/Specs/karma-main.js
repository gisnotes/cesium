var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

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

// packages/core/Source/assert.js
function assert(condition, msg) {
  if (!condition) {
    throw new DeveloperError_default(msg);
  }
}
var assert_default = assert;

// packages/core/Source/Cartesian2.js
var Cartesian2 = class _Cartesian2 {
  /**
   * @param {number} [x=0.0] The X component.
   * @param {number} [y=0.0] The Y component.
   */
  constructor(x, y) {
    this.x = x ?? 0;
    this.y = y ?? 0;
  }
  /**
   * Creates a Cartesian2 instance from x and y coordinates.
   *
   * @param {number} x The x coordinate.
   * @param {number} y The y coordinate.
   * @param {Cartesian2} [result] The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
   */
  static fromElements(x, y, result) {
    if (!defined_default(result)) {
      return new _Cartesian2(x, y);
    }
    result.x = x;
    result.y = y;
    return result;
  }
  /**
   * Duplicates a Cartesian2 instance.
   *
   * @param {Cartesian2} cartesian The Cartesian to duplicate.
   * @param {Cartesian2} [result] The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided. (Returns undefined if cartesian is undefined)
   */
  static clone(cartesian, result) {
    if (!defined_default(cartesian)) {
      return void 0;
    }
    if (!defined_default(result)) {
      return new _Cartesian2(cartesian.x, cartesian.y);
    }
    result.x = cartesian.x;
    result.y = cartesian.y;
    return result;
  }
  /**
   * Stores the provided instance into the provided array.
   *
   * @param {Cartesian2} value The value to pack.
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
    array[startingIndex] = value.y;
    return array;
  }
  /**
   * Retrieves an instance from a packed array.
   *
   * @param {number[]} array The packed array.
   * @param {number} [startingIndex=0] The starting index of the element to be unpacked.
   * @param {Cartesian2} [result] The object into which to store the result.
   * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
   */
  static unpack(array, startingIndex, result) {
    Check_default.defined("array", array);
    startingIndex = startingIndex ?? 0;
    if (!defined_default(result)) {
      result = new _Cartesian2();
    }
    result.x = array[startingIndex++];
    result.y = array[startingIndex];
    return result;
  }
  /**
   * Flattens an array of Cartesian2s into an array of components.
   *
   * @param {Cartesian2[]} array The array of cartesians to pack.
   * @param {number[]} [result] The array onto which to store the result. If this is a typed array, it must have array.length * 2 components, else a {@link DeveloperError} will be thrown. If it is a regular array, it will be resized to have (array.length * 2) elements.
   * @returns {number[]} The packed array.
   */
  static packArray(array, result) {
    Check_default.defined("array", array);
    const length = array.length;
    const resultLength = length * 2;
    if (!defined_default(result)) {
      result = new Array(resultLength);
    } else if (!Array.isArray(result) && result.length !== resultLength) {
      throw new DeveloperError_default(
        "If result is a typed array, it must have exactly array.length * 2 elements"
      );
    } else if (result.length !== resultLength) {
      result.length = resultLength;
    }
    for (let i = 0; i < length; ++i) {
      _Cartesian2.pack(array[i], result, i * 2);
    }
    return result;
  }
  /**
   * Unpacks an array of cartesian components into an array of Cartesian2s.
   *
   * @param {number[]} array The array of components to unpack.
   * @param {Cartesian2[]} [result] The array onto which to store the result.
   * @returns {Cartesian2[]} The unpacked array.
   */
  static unpackArray(array, result) {
    Check_default.defined("array", array);
    Check_default.typeOf.number.greaterThanOrEquals("array.length", array.length, 2);
    if (array.length % 2 !== 0) {
      throw new DeveloperError_default("array length must be a multiple of 2.");
    }
    const length = array.length;
    if (!defined_default(result)) {
      result = new Array(length / 2);
    } else {
      result.length = length / 2;
    }
    for (let i = 0; i < length; i += 2) {
      const index = i / 2;
      result[index] = _Cartesian2.unpack(array, i, result[index]);
    }
    return result;
  }
  /**
   * Computes the value of the maximum component for the supplied Cartesian.
   *
   * @param {Cartesian2} cartesian The cartesian to use.
   * @returns {number} The value of the maximum component.
   */
  static maximumComponent(cartesian) {
    Check_default.typeOf.object("cartesian", cartesian);
    return Math.max(cartesian.x, cartesian.y);
  }
  /**
   * Computes the value of the minimum component for the supplied Cartesian.
   *
   * @param {Cartesian2} cartesian The cartesian to use.
   * @returns {number} The value of the minimum component.
   */
  static minimumComponent(cartesian) {
    Check_default.typeOf.object("cartesian", cartesian);
    return Math.min(cartesian.x, cartesian.y);
  }
  /**
   * Compares two Cartesians and computes a Cartesian which contains the minimum components of the supplied Cartesians.
   *
   * @param {Cartesian2} first A cartesian to compare.
   * @param {Cartesian2} second A cartesian to compare.
   * @param {Cartesian2} result The object into which to store the result.
   * @returns {Cartesian2} A cartesian with the minimum components.
   */
  static minimumByComponent(first, second, result) {
    Check_default.typeOf.object("first", first);
    Check_default.typeOf.object("second", second);
    Check_default.typeOf.object("result", result);
    result.x = Math.min(first.x, second.x);
    result.y = Math.min(first.y, second.y);
    return result;
  }
  /**
   * Compares two Cartesians and computes a Cartesian which contains the maximum components of the supplied Cartesians.
   *
   * @param {Cartesian2} first A cartesian to compare.
   * @param {Cartesian2} second A cartesian to compare.
   * @param {Cartesian2} result The object into which to store the result.
   * @returns {Cartesian2} A cartesian with the maximum components.
   */
  static maximumByComponent(first, second, result) {
    Check_default.typeOf.object("first", first);
    Check_default.typeOf.object("second", second);
    Check_default.typeOf.object("result", result);
    result.x = Math.max(first.x, second.x);
    result.y = Math.max(first.y, second.y);
    return result;
  }
  /**
   * Constrain a value to lie between two values.
   *
   * @param {Cartesian2} value The value to clamp.
   * @param {Cartesian2} min The minimum bound.
   * @param {Cartesian2} max The maximum bound.
   * @param {Cartesian2} result The object into which to store the result.
   * @returns {Cartesian2} The clamped value such that min <= result <= max.
   */
  static clamp(value, min, max, result) {
    Check_default.typeOf.object("value", value);
    Check_default.typeOf.object("min", min);
    Check_default.typeOf.object("max", max);
    Check_default.typeOf.object("result", result);
    const x = Math_default.clamp(value.x, min.x, max.x);
    const y = Math_default.clamp(value.y, min.y, max.y);
    result.x = x;
    result.y = y;
    return result;
  }
  /**
   * Computes the provided Cartesian's squared magnitude.
   *
   * @param {Cartesian2} cartesian The Cartesian instance whose squared magnitude is to be computed.
   * @returns {number} The squared magnitude.
   */
  static magnitudeSquared(cartesian) {
    Check_default.typeOf.object("cartesian", cartesian);
    return cartesian.x * cartesian.x + cartesian.y * cartesian.y;
  }
  /**
   * Computes the Cartesian's magnitude (length).
   *
   * @param {Cartesian2} cartesian The Cartesian instance whose magnitude is to be computed.
   * @returns {number} The magnitude.
   */
  static magnitude(cartesian) {
    return Math.sqrt(_Cartesian2.magnitudeSquared(cartesian));
  }
  /**
   * Computes the distance between two points.
   *
   * @param {Cartesian2} left The first point to compute the distance from.
   * @param {Cartesian2} right The second point to compute the distance to.
   * @returns {number} The distance between two points.
   *
   * @example
   * // Returns 1.0
   * const d = Cesium.Cartesian2.distance(new Cesium.Cartesian2(1.0, 0.0), new Cesium.Cartesian2(2.0, 0.0));
   */
  static distance(left, right) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    _Cartesian2.subtract(left, right, distanceScratch);
    return _Cartesian2.magnitude(distanceScratch);
  }
  /**
   * Computes the squared distance between two points.  Comparing squared distances
   * using this function is more efficient than comparing distances using {@link Cartesian2#distance}.
   *
   * @param {Cartesian2} left The first point to compute the distance from.
   * @param {Cartesian2} right The second point to compute the distance to.
   * @returns {number} The distance between two points.
   *
   * @example
   * // Returns 4.0, not 2.0
   * const d = Cesium.Cartesian2.distance(new Cesium.Cartesian2(1.0, 0.0), new Cesium.Cartesian2(3.0, 0.0));
   */
  static distanceSquared(left, right) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    _Cartesian2.subtract(left, right, distanceScratch);
    return _Cartesian2.magnitudeSquared(distanceScratch);
  }
  /**
   * Computes the normalized form of the supplied Cartesian.
   *
   * @param {Cartesian2} cartesian The Cartesian to be normalized.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static normalize(cartesian, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    const magnitude = _Cartesian2.magnitude(cartesian);
    result.x = cartesian.x / magnitude;
    result.y = cartesian.y / magnitude;
    if (isNaN(result.x) || isNaN(result.y)) {
      throw new DeveloperError_default("normalized result is not a number");
    }
    return result;
  }
  /**
   * Computes the dot (scalar) product of two Cartesians.
   *
   * @param {Cartesian2} left The first Cartesian.
   * @param {Cartesian2} right The second Cartesian.
   * @returns {number} The dot product.
   */
  static dot(left, right) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    return left.x * right.x + left.y * right.y;
  }
  /**
   * Computes the magnitude of the cross product that would result from implicitly setting the Z coordinate of the input vectors to 0
   *
   * @param {Cartesian2} left The first Cartesian.
   * @param {Cartesian2} right The second Cartesian.
   * @returns {number} The cross product.
   */
  static cross(left, right) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    return left.x * right.y - left.y * right.x;
  }
  /**
   * Computes the componentwise product of two Cartesians.
   *
   * @param {Cartesian2} left The first Cartesian.
   * @param {Cartesian2} right The second Cartesian.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static multiplyComponents(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result.x = left.x * right.x;
    result.y = left.y * right.y;
    return result;
  }
  /**
   * Computes the componentwise quotient of two Cartesians.
   *
   * @param {Cartesian2} left The first Cartesian.
   * @param {Cartesian2} right The second Cartesian.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static divideComponents(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result.x = left.x / right.x;
    result.y = left.y / right.y;
    return result;
  }
  /**
   * Computes the componentwise sum of two Cartesians.
   *
   * @param {Cartesian2} left The first Cartesian.
   * @param {Cartesian2} right The second Cartesian.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static add(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result.x = left.x + right.x;
    result.y = left.y + right.y;
    return result;
  }
  /**
   * Computes the componentwise difference of two Cartesians.
   *
   * @param {Cartesian2} left The first Cartesian.
   * @param {Cartesian2} right The second Cartesian.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static subtract(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result.x = left.x - right.x;
    result.y = left.y - right.y;
    return result;
  }
  /**
   * Multiplies the provided Cartesian componentwise by the provided scalar.
   *
   * @param {Cartesian2} cartesian The Cartesian to be scaled.
   * @param {number} scalar The scalar to multiply with.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static multiplyByScalar(cartesian, scalar, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.number("scalar", scalar);
    Check_default.typeOf.object("result", result);
    result.x = cartesian.x * scalar;
    result.y = cartesian.y * scalar;
    return result;
  }
  /**
   * Divides the provided Cartesian componentwise by the provided scalar.
   *
   * @param {Cartesian2} cartesian The Cartesian to be divided.
   * @param {number} scalar The scalar to divide by.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static divideByScalar(cartesian, scalar, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.number("scalar", scalar);
    Check_default.typeOf.object("result", result);
    result.x = cartesian.x / scalar;
    result.y = cartesian.y / scalar;
    return result;
  }
  /**
   * Negates the provided Cartesian.
   *
   * @param {Cartesian2} cartesian The Cartesian to be negated.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static negate(cartesian, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    result.x = -cartesian.x;
    result.y = -cartesian.y;
    return result;
  }
  /**
   * Computes the absolute value of the provided Cartesian.
   *
   * @param {Cartesian2} cartesian The Cartesian whose absolute value is to be computed.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static abs(cartesian, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    result.x = Math.abs(cartesian.x);
    result.y = Math.abs(cartesian.y);
    return result;
  }
  /**
   * Computes the linear interpolation or extrapolation at t using the provided cartesians.
   *
   * @param {Cartesian2} start The value corresponding to t at 0.0.
   * @param {Cartesian2} end The value corresponding to t at 1.0.
   * @param {number} t The point along t at which to interpolate.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static lerp(start, end, t, result) {
    Check_default.typeOf.object("start", start);
    Check_default.typeOf.object("end", end);
    Check_default.typeOf.number("t", t);
    Check_default.typeOf.object("result", result);
    _Cartesian2.multiplyByScalar(end, t, lerpScratch);
    result = _Cartesian2.multiplyByScalar(start, 1 - t, result);
    return _Cartesian2.add(lerpScratch, result, result);
  }
  /**
   * Returns the angle, in radians, between the provided Cartesians.
   *
   * @param {Cartesian2} left The first Cartesian.
   * @param {Cartesian2} right The second Cartesian.
   * @returns {number} The angle between the Cartesians.
   */
  static angleBetween(left, right) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    _Cartesian2.normalize(left, angleBetweenScratch);
    _Cartesian2.normalize(right, angleBetweenScratch2);
    return Math_default.acosClamped(
      _Cartesian2.dot(angleBetweenScratch, angleBetweenScratch2)
    );
  }
  /**
   * Returns the axis that is most orthogonal to the provided Cartesian.
   *
   * @param {Cartesian2} cartesian The Cartesian on which to find the most orthogonal axis.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The most orthogonal axis.
   */
  static mostOrthogonalAxis(cartesian, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    const f = _Cartesian2.normalize(cartesian, mostOrthogonalAxisScratch);
    _Cartesian2.abs(f, f);
    if (f.x <= f.y) {
      result = _Cartesian2.clone(_Cartesian2.UNIT_X, result);
    } else {
      result = _Cartesian2.clone(_Cartesian2.UNIT_Y, result);
    }
    return result;
  }
  /**
   * Compares the provided Cartesians componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Cartesian2} [left] The first Cartesian.
   * @param {Cartesian2} [right] The second Cartesian.
   * @returns {boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
   */
  static equals(left, right) {
    return left === right || defined_default(left) && defined_default(right) && left.x === right.x && left.y === right.y;
  }
  /**
   * Compares the provided Cartesian2 to the values packed into an array, starting at the provided offset.
   *
   * @param {Cartesian2} cartesian The Cartesian2 to compare.
   * @param {number[]} array The packed array.
   * @param {number} offset The offset into the array at which the Cartesian2 starts.
   * @returns {boolean} <code>true</code> if the Cartesian2 matches the packed array values at the offset; otherwise, <code>false</code>.
   * @internal
   */
  static equalsArray(cartesian, array, offset) {
    return cartesian.x === array[offset] && cartesian.y === array[offset + 1];
  }
  /**
   * Compares the provided Cartesians componentwise and returns
   * <code>true</code> if they pass an absolute or relative tolerance test,
   * <code>false</code> otherwise.
   *
   * @param {Cartesian2} [left] The first Cartesian.
   * @param {Cartesian2} [right] The second Cartesian.
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
    );
  }
  /**
   * Duplicates this Cartesian2 instance.
   *
   * @param {Cartesian2} [result] The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
   */
  clone(result) {
    return _Cartesian2.clone(this, result);
  }
  /**
   * Compares this Cartesian against the provided Cartesian componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Cartesian2} [right] The right hand side Cartesian.
   * @returns {boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
   */
  equals(right) {
    return _Cartesian2.equals(this, right);
  }
  /**
   * Compares this Cartesian against the provided Cartesian componentwise and returns
   * <code>true</code> if they pass an absolute or relative tolerance test,
   * <code>false</code> otherwise.
   *
   * @param {Cartesian2} [right] The right hand side Cartesian.
   * @param {number} [relativeEpsilon=0] The relative epsilon tolerance to use for equality testing.
   * @param {number} [absoluteEpsilon=relativeEpsilon] The absolute epsilon tolerance to use for equality testing.
   * @returns {boolean} <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
   */
  equalsEpsilon(right, relativeEpsilon, absoluteEpsilon) {
    return _Cartesian2.equalsEpsilon(
      this,
      right,
      relativeEpsilon,
      absoluteEpsilon
    );
  }
  /**
   * Creates a string representing this Cartesian in the format '(x, y)'.
   *
   * @returns {string} A string representing the provided Cartesian in the format '(x, y)'.
   */
  toString() {
    return `(${this.x}, ${this.y})`;
  }
};
Cartesian2.fromCartesian3 = Cartesian2.clone;
Cartesian2.fromCartesian4 = Cartesian2.clone;
Cartesian2.packedLength = 2;
Cartesian2.fromArray = Cartesian2.unpack;
var distanceScratch = new Cartesian2();
var lerpScratch = new Cartesian2();
var angleBetweenScratch = new Cartesian2();
var angleBetweenScratch2 = new Cartesian2();
var mostOrthogonalAxisScratch = new Cartesian2();
Cartesian2.ZERO = Object.freeze(new Cartesian2(0, 0));
Cartesian2.ONE = Object.freeze(new Cartesian2(1, 1));
Cartesian2.UNIT_X = Object.freeze(new Cartesian2(1, 0));
Cartesian2.UNIT_Y = Object.freeze(new Cartesian2(0, 1));
var Cartesian2_default = Cartesian2;

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
    _Cartesian3.subtract(left, right, distanceScratch2);
    return _Cartesian3.magnitude(distanceScratch2);
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
    _Cartesian3.subtract(left, right, distanceScratch2);
    return _Cartesian3.magnitudeSquared(distanceScratch2);
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
    _Cartesian3.multiplyByScalar(end, t, lerpScratch2);
    result = _Cartesian3.multiplyByScalar(start, 1 - t, result);
    return _Cartesian3.add(lerpScratch2, result, result);
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
    _Cartesian3.normalize(left, angleBetweenScratch3);
    _Cartesian3.normalize(right, angleBetweenScratch22);
    const cosine = _Cartesian3.dot(angleBetweenScratch3, angleBetweenScratch22);
    const sine = _Cartesian3.magnitude(
      _Cartesian3.cross(
        angleBetweenScratch3,
        angleBetweenScratch22,
        angleBetweenScratch3
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
    const f = _Cartesian3.normalize(cartesian, mostOrthogonalAxisScratch2);
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
var distanceScratch2 = new Cartesian3();
var lerpScratch2 = new Cartesian3();
var angleBetweenScratch3 = new Cartesian3();
var angleBetweenScratch22 = new Cartesian3();
var mostOrthogonalAxisScratch2 = new Cartesian3();
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
ComponentDatatype.createArrayBufferView = function(componentDatatype, buffer, byteOffset, length) {
  if (!defined_default(componentDatatype)) {
    throw new DeveloperError_default("componentDatatype is required.");
  }
  if (!defined_default(buffer)) {
    throw new DeveloperError_default("buffer is required.");
  }
  byteOffset = byteOffset ?? 0;
  length = length ?? (buffer.byteLength - byteOffset) / ComponentDatatype.getSizeInBytes(componentDatatype);
  switch (componentDatatype) {
    case ComponentDatatype.BYTE:
      return new Int8Array(buffer, byteOffset, length);
    case ComponentDatatype.UNSIGNED_BYTE:
      return new Uint8Array(buffer, byteOffset, length);
    case ComponentDatatype.SHORT:
      return new Int16Array(buffer, byteOffset, length);
    case ComponentDatatype.UNSIGNED_SHORT:
      return new Uint16Array(buffer, byteOffset, length);
    case ComponentDatatype.INT:
      return new Int32Array(buffer, byteOffset, length);
    case ComponentDatatype.UNSIGNED_INT:
      return new Uint32Array(buffer, byteOffset, length);
    case ComponentDatatype.FLOAT:
      return new Float32Array(buffer, byteOffset, length);
    case ComponentDatatype.DOUBLE:
      return new Float64Array(buffer, byteOffset, length);
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
    _Cartesian4.subtract(left, right, distanceScratch3);
    return _Cartesian4.magnitude(distanceScratch3);
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
    _Cartesian4.subtract(left, right, distanceScratch3);
    return _Cartesian4.magnitudeSquared(distanceScratch3);
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
    _Cartesian4.multiplyByScalar(end, t, lerpScratch3);
    result = _Cartesian4.multiplyByScalar(start, 1 - t, result);
    return _Cartesian4.add(lerpScratch3, result, result);
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
    const f = _Cartesian4.normalize(cartesian, mostOrthogonalAxisScratch3);
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
var distanceScratch3 = new Cartesian4();
var lerpScratch3 = new Cartesian4();
var mostOrthogonalAxisScratch3 = new Cartesian4();
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

// packages/core/Source/Matrix2.js
var Matrix2 = class _Matrix2 {
  /**
   * @param {number} [column0Row0=0.0] The value for column 0, row 0.
   * @param {number} [column1Row0=0.0] The value for column 1, row 0.
   * @param {number} [column0Row1=0.0] The value for column 0, row 1.
   * @param {number} [column1Row1=0.0] The value for column 1, row 1.
   */
  constructor(column0Row0, column1Row0, column0Row1, column1Row1) {
    this[0] = column0Row0 ?? 0;
    this[1] = column0Row1 ?? 0;
    this[2] = column1Row0 ?? 0;
    this[3] = column1Row1 ?? 0;
  }
  /**
   * Stores the provided instance into the provided array.
   *
   * @param {Matrix2} value The value to pack.
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
    array[startingIndex] = value[3];
    return array;
  }
  /**
   * Retrieves an instance from a packed array.
   *
   * @param {number[]} array The packed array.
   * @param {number} [startingIndex=0] The starting index of the element to be unpacked.
   * @param {Matrix2} [result] The object into which to store the result.
   * @returns {Matrix2} The modified result parameter or a new Matrix2 instance if one was not provided.
   */
  static unpack(array, startingIndex, result) {
    Check_default.defined("array", array);
    startingIndex = startingIndex ?? 0;
    if (!defined_default(result)) {
      result = new _Matrix2();
    }
    result[0] = array[startingIndex++];
    result[1] = array[startingIndex++];
    result[2] = array[startingIndex++];
    result[3] = array[startingIndex];
    return result;
  }
  /**
   * Flattens an array of Matrix2s into an array of components. The components
   * are stored in column-major order.
   *
   * @param {Matrix2[]} array The array of matrices to pack.
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
      _Matrix2.pack(array[i], result, i * 4);
    }
    return result;
  }
  /**
   * Unpacks an array of column-major matrix components into an array of Matrix2s.
   *
   * @param {number[]} array The array of components to unpack.
   * @param {Matrix2[]} [result] The array onto which to store the result.
   * @returns {Matrix2[]} The unpacked array.
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
      result[index] = _Matrix2.unpack(array, i, result[index]);
    }
    return result;
  }
  /**
   * Duplicates a Matrix2 instance.
   *
   * @param {Matrix2} matrix The matrix to duplicate.
   * @param {Matrix2} [result] The object onto which to store the result.
   * @returns {Matrix2} The modified result parameter or a new Matrix2 instance if one was not provided. (Returns undefined if matrix is undefined)
   */
  static clone(matrix, result) {
    if (!defined_default(matrix)) {
      return void 0;
    }
    if (!defined_default(result)) {
      return new _Matrix2(matrix[0], matrix[2], matrix[1], matrix[3]);
    }
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[3];
    return result;
  }
  /**
   * Creates a Matrix2 instance from a column-major order array.
   *
   * @param {number[]} values The column-major order array.
   * @param {Matrix2} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix2} The modified result parameter, or a new Matrix2 instance if one was not provided.
   */
  static fromColumnMajorArray(values, result) {
    Check_default.defined("values", values);
    return _Matrix2.clone(values, result);
  }
  /**
   * Creates a Matrix2 instance from a row-major order array.
   * The resulting matrix will be in column-major order.
   *
   * @param {number[]} values The row-major order array.
   * @param {Matrix2} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix2} The modified result parameter, or a new Matrix2 instance if one was not provided.
   */
  static fromRowMajorArray(values, result) {
    Check_default.defined("values", values);
    if (!defined_default(result)) {
      return new _Matrix2(values[0], values[1], values[2], values[3]);
    }
    result[0] = values[0];
    result[1] = values[2];
    result[2] = values[1];
    result[3] = values[3];
    return result;
  }
  /**
   * Computes a Matrix2 instance representing a non-uniform scale.
   *
   * @param {Cartesian2} scale The x and y scale factors.
   * @param {Matrix2} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix2} The modified result parameter, or a new Matrix2 instance if one was not provided.
   *
   * @example
   * // Creates
   * //   [7.0, 0.0]
   * //   [0.0, 8.0]
   * const m = Cesium.Matrix2.fromScale(new Cesium.Cartesian2(7.0, 8.0));
   */
  static fromScale(scale, result) {
    Check_default.typeOf.object("scale", scale);
    if (!defined_default(result)) {
      return new _Matrix2(scale.x, 0, 0, scale.y);
    }
    result[0] = scale.x;
    result[1] = 0;
    result[2] = 0;
    result[3] = scale.y;
    return result;
  }
  /**
   * Computes a Matrix2 instance representing a uniform scale.
   *
   * @param {number} scale The uniform scale factor.
   * @param {Matrix2} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix2} The modified result parameter, or a new Matrix2 instance if one was not provided.
   *
   * @example
   * // Creates
   * //   [2.0, 0.0]
   * //   [0.0, 2.0]
   * const m = Cesium.Matrix2.fromUniformScale(2.0);
   */
  static fromUniformScale(scale, result) {
    Check_default.typeOf.number("scale", scale);
    if (!defined_default(result)) {
      return new _Matrix2(scale, 0, 0, scale);
    }
    result[0] = scale;
    result[1] = 0;
    result[2] = 0;
    result[3] = scale;
    return result;
  }
  /**
   * Creates a rotation matrix.
   *
   * @param {number} angle The angle, in radians, of the rotation.  Positive angles are counterclockwise.
   * @param {Matrix2} [result] The object in which the result will be stored, if undefined a new instance will be created.
   * @returns {Matrix2} The modified result parameter, or a new Matrix2 instance if one was not provided.
   *
   * @example
   * // Rotate a point 45 degrees counterclockwise.
   * const p = new Cesium.Cartesian2(5, 6);
   * const m = Cesium.Matrix2.fromRotation(Cesium.Math.toRadians(45.0));
   * const rotated = Cesium.Matrix2.multiplyByVector(m, p, new Cesium.Cartesian2());
   */
  static fromRotation(angle, result) {
    Check_default.typeOf.number("angle", angle);
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    if (!defined_default(result)) {
      return new _Matrix2(cosAngle, -sinAngle, sinAngle, cosAngle);
    }
    result[0] = cosAngle;
    result[1] = sinAngle;
    result[2] = -sinAngle;
    result[3] = cosAngle;
    return result;
  }
  /**
   * Creates an Array from the provided Matrix2 instance.
   * The array will be in column-major order.
   *
   * @param {Matrix2} matrix The matrix to use..
   * @param {number[]} [result] The Array onto which to store the result.
   * @returns {number[]} The modified Array parameter or a new Array instance if one was not provided.
   */
  static toArray(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    if (!defined_default(result)) {
      return [matrix[0], matrix[1], matrix[2], matrix[3]];
    }
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[3];
    return result;
  }
  /**
   * Computes the array index of the element at the provided row and column.
   *
   * @param {number} row The zero-based index of the row.
   * @param {number} column The zero-based index of the column.
   * @returns {number} The index of the element at the provided row and column.
   *
   * @exception {DeveloperError} row must be 0 or 1.
   * @exception {DeveloperError} column must be 0 or 1.
   *
   * @example
   * const myMatrix = new Cesium.Matrix2();
   * const column1Row0Index = Cesium.Matrix2.getElementIndex(1, 0);
   * const column1Row0 = myMatrix[column1Row0Index]
   * myMatrix[column1Row0Index] = 10.0;
   */
  static getElementIndex(column, row) {
    Check_default.typeOf.number.greaterThanOrEquals("row", row, 0);
    Check_default.typeOf.number.lessThanOrEquals("row", row, 1);
    Check_default.typeOf.number.greaterThanOrEquals("column", column, 0);
    Check_default.typeOf.number.lessThanOrEquals("column", column, 1);
    return column * 2 + row;
  }
  /**
   * Retrieves a copy of the matrix column at the provided index as a Cartesian2 instance.
   *
   * @param {Matrix2} matrix The matrix to use.
   * @param {number} index The zero-based index of the column to retrieve.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   *
   * @exception {DeveloperError} index must be 0 or 1.
   */
  static getColumn(matrix, index, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number.greaterThanOrEquals("index", index, 0);
    Check_default.typeOf.number.lessThanOrEquals("index", index, 1);
    Check_default.typeOf.object("result", result);
    const startIndex = index * 2;
    const x = matrix[startIndex];
    const y = matrix[startIndex + 1];
    result.x = x;
    result.y = y;
    return result;
  }
  /**
   * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian2 instance.
   *
   * @param {Matrix2} matrix The matrix to use.
   * @param {number} index The zero-based index of the column to set.
   * @param {Cartesian2} cartesian The Cartesian whose values will be assigned to the specified column.
   * @param {Matrix2} result The object onto which to store the result.
   * @returns {Matrix2} The modified result parameter.
   *
   * @exception {DeveloperError} index must be 0 or 1.
   */
  static setColumn(matrix, index, cartesian, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number.greaterThanOrEquals("index", index, 0);
    Check_default.typeOf.number.lessThanOrEquals("index", index, 1);
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    result = _Matrix2.clone(matrix, result);
    const startIndex = index * 2;
    result[startIndex] = cartesian.x;
    result[startIndex + 1] = cartesian.y;
    return result;
  }
  /**
   * Retrieves a copy of the matrix row at the provided index as a Cartesian2 instance.
   *
   * @param {Matrix2} matrix The matrix to use.
   * @param {number} index The zero-based index of the row to retrieve.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   *
   * @exception {DeveloperError} index must be 0 or 1.
   */
  static getRow(matrix, index, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number.greaterThanOrEquals("index", index, 0);
    Check_default.typeOf.number.lessThanOrEquals("index", index, 1);
    Check_default.typeOf.object("result", result);
    const x = matrix[index];
    const y = matrix[index + 2];
    result.x = x;
    result.y = y;
    return result;
  }
  /**
   * Computes a new matrix that replaces the specified row in the provided matrix with the provided Cartesian2 instance.
   *
   * @param {Matrix2} matrix The matrix to use.
   * @param {number} index The zero-based index of the row to set.
   * @param {Cartesian2} cartesian The Cartesian whose values will be assigned to the specified row.
   * @param {Matrix2} result The object onto which to store the result.
   * @returns {Matrix2} The modified result parameter.
   *
   * @exception {DeveloperError} index must be 0 or 1.
   */
  static setRow(matrix, index, cartesian, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number.greaterThanOrEquals("index", index, 0);
    Check_default.typeOf.number.lessThanOrEquals("index", index, 1);
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    result = _Matrix2.clone(matrix, result);
    result[index] = cartesian.x;
    result[index + 2] = cartesian.y;
    return result;
  }
  /**
   * Computes a new matrix that replaces the scale with the provided scale.
   * This assumes the matrix is an affine transformation.
   *
   * @param {Matrix2} matrix The matrix to use.
   * @param {Cartesian2} scale The scale that replaces the scale of the provided matrix.
   * @param {Matrix2} result The object onto which to store the result.
   * @returns {Matrix2} The modified result parameter.
   *
   * @see Matrix2.setUniformScale
   * @see Matrix2.fromScale
   * @see Matrix2.fromUniformScale
   * @see Matrix2.multiplyByScale
   * @see Matrix2.multiplyByUniformScale
   * @see Matrix2.getScale
   */
  static setScale(matrix, scale, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("scale", scale);
    Check_default.typeOf.object("result", result);
    const existingScale = _Matrix2.getScale(matrix, scaleScratch1);
    const scaleRatioX = scale.x / existingScale.x;
    const scaleRatioY = scale.y / existingScale.y;
    result[0] = matrix[0] * scaleRatioX;
    result[1] = matrix[1] * scaleRatioX;
    result[2] = matrix[2] * scaleRatioY;
    result[3] = matrix[3] * scaleRatioY;
    return result;
  }
  /**
   * Computes a new matrix that replaces the scale with the provided uniform scale.
   * This assumes the matrix is an affine transformation.
   *
   * @param {Matrix2} matrix The matrix to use.
   * @param {number} scale The uniform scale that replaces the scale of the provided matrix.
   * @param {Matrix2} result The object onto which to store the result.
   * @returns {Matrix2} The modified result parameter.
   *
   * @see Matrix2.setScale
   * @see Matrix2.fromScale
   * @see Matrix2.fromUniformScale
   * @see Matrix2.multiplyByScale
   * @see Matrix2.multiplyByUniformScale
   * @see Matrix2.getScale
   */
  static setUniformScale(matrix, scale, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number("scale", scale);
    Check_default.typeOf.object("result", result);
    const existingScale = _Matrix2.getScale(matrix, scaleScratch2);
    const scaleRatioX = scale / existingScale.x;
    const scaleRatioY = scale / existingScale.y;
    result[0] = matrix[0] * scaleRatioX;
    result[1] = matrix[1] * scaleRatioX;
    result[2] = matrix[2] * scaleRatioY;
    result[3] = matrix[3] * scaleRatioY;
    return result;
  }
  /**
   * Extracts the non-uniform scale assuming the matrix is an affine transformation.
   *
   * @param {Matrix2} matrix The matrix.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   *
   * @see Matrix2.multiplyByScale
   * @see Matrix2.multiplyByUniformScale
   * @see Matrix2.fromScale
   * @see Matrix2.fromUniformScale
   * @see Matrix2.setScale
   * @see Matrix2.setUniformScale
   */
  static getScale(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    result.x = Cartesian2_default.magnitude(
      Cartesian2_default.fromElements(matrix[0], matrix[1], scratchColumn)
    );
    result.y = Cartesian2_default.magnitude(
      Cartesian2_default.fromElements(matrix[2], matrix[3], scratchColumn)
    );
    return result;
  }
  /**
   * Computes the maximum scale assuming the matrix is an affine transformation.
   * The maximum scale is the maximum length of the column vectors.
   *
   * @param {Matrix2} matrix The matrix.
   * @returns {number} The maximum scale.
   */
  static getMaximumScale(matrix) {
    _Matrix2.getScale(matrix, scaleScratch3);
    return Cartesian2_default.maximumComponent(scaleScratch3);
  }
  /**
   * Sets the rotation assuming the matrix is an affine transformation.
   *
   * @param {Matrix2} matrix The matrix.
   * @param {Matrix2} rotation The rotation matrix.
   * @param {Matrix2} result The object onto which to store the result.
   * @returns {Matrix2} The modified result parameter.
   *
   * @see Matrix2.fromRotation
   * @see Matrix2.getRotation
   */
  static setRotation(matrix, rotation, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    const scale = _Matrix2.getScale(matrix, scaleScratch4);
    result[0] = rotation[0] * scale.x;
    result[1] = rotation[1] * scale.x;
    result[2] = rotation[2] * scale.y;
    result[3] = rotation[3] * scale.y;
    return result;
  }
  /**
   * Extracts the rotation matrix assuming the matrix is an affine transformation.
   *
   * @param {Matrix2} matrix The matrix.
   * @param {Matrix2} result The object onto which to store the result.
   * @returns {Matrix2} The modified result parameter.
   *
   * @see Matrix2.setRotation
   * @see Matrix2.fromRotation
   */
  static getRotation(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    const scale = _Matrix2.getScale(matrix, scaleScratch5);
    result[0] = matrix[0] / scale.x;
    result[1] = matrix[1] / scale.x;
    result[2] = matrix[2] / scale.y;
    result[3] = matrix[3] / scale.y;
    return result;
  }
  /**
   * Computes the product of two matrices.
   *
   * @param {Matrix2} left The first matrix.
   * @param {Matrix2} right The second matrix.
   * @param {Matrix2} result The object onto which to store the result.
   * @returns {Matrix2} The modified result parameter.
   */
  static multiply(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    const column0Row0 = left[0] * right[0] + left[2] * right[1];
    const column1Row0 = left[0] * right[2] + left[2] * right[3];
    const column0Row1 = left[1] * right[0] + left[3] * right[1];
    const column1Row1 = left[1] * right[2] + left[3] * right[3];
    result[0] = column0Row0;
    result[1] = column0Row1;
    result[2] = column1Row0;
    result[3] = column1Row1;
    return result;
  }
  /**
   * Computes the sum of two matrices.
   *
   * @param {Matrix2} left The first matrix.
   * @param {Matrix2} right The second matrix.
   * @param {Matrix2} result The object onto which to store the result.
   * @returns {Matrix2} The modified result parameter.
   */
  static add(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result[0] = left[0] + right[0];
    result[1] = left[1] + right[1];
    result[2] = left[2] + right[2];
    result[3] = left[3] + right[3];
    return result;
  }
  /**
   * Computes the difference of two matrices.
   *
   * @param {Matrix2} left The first matrix.
   * @param {Matrix2} right The second matrix.
   * @param {Matrix2} result The object onto which to store the result.
   * @returns {Matrix2} The modified result parameter.
   */
  static subtract(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result[0] = left[0] - right[0];
    result[1] = left[1] - right[1];
    result[2] = left[2] - right[2];
    result[3] = left[3] - right[3];
    return result;
  }
  /**
   * Computes the product of a matrix and a column vector.
   *
   * @param {Matrix2} matrix The matrix.
   * @param {Cartesian2} cartesian The column.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static multiplyByVector(matrix, cartesian, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("cartesian", cartesian);
    Check_default.typeOf.object("result", result);
    const x = matrix[0] * cartesian.x + matrix[2] * cartesian.y;
    const y = matrix[1] * cartesian.x + matrix[3] * cartesian.y;
    result.x = x;
    result.y = y;
    return result;
  }
  /**
   * Computes the product of a matrix and a scalar.
   *
   * @param {Matrix2} matrix The matrix.
   * @param {number} scalar The number to multiply by.
   * @param {Matrix2} result The object onto which to store the result.
   * @returns {Matrix2} The modified result parameter.
   */
  static multiplyByScalar(matrix, scalar, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number("scalar", scalar);
    Check_default.typeOf.object("result", result);
    result[0] = matrix[0] * scalar;
    result[1] = matrix[1] * scalar;
    result[2] = matrix[2] * scalar;
    result[3] = matrix[3] * scalar;
    return result;
  }
  /**
   * Computes the product of a matrix times a (non-uniform) scale, as if the scale were a scale matrix.
   *
   * @param {Matrix2} matrix The matrix on the left-hand side.
   * @param {Cartesian2} scale The non-uniform scale on the right-hand side.
   * @param {Matrix2} result The object onto which to store the result.
   * @returns {Matrix2} The modified result parameter.
   *
   *
   * @example
   * // Instead of Cesium.Matrix2.multiply(m, Cesium.Matrix2.fromScale(scale), m);
   * Cesium.Matrix2.multiplyByScale(m, scale, m);
   *
   * @see Matrix2.multiplyByUniformScale
   * @see Matrix2.fromScale
   * @see Matrix2.fromUniformScale
   * @see Matrix2.setScale
   * @see Matrix2.setUniformScale
   * @see Matrix2.getScale
   */
  static multiplyByScale(matrix, scale, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("scale", scale);
    Check_default.typeOf.object("result", result);
    result[0] = matrix[0] * scale.x;
    result[1] = matrix[1] * scale.x;
    result[2] = matrix[2] * scale.y;
    result[3] = matrix[3] * scale.y;
    return result;
  }
  /**
   * Computes the product of a matrix times a uniform scale, as if the scale were a scale matrix.
   *
   * @param {Matrix2} matrix The matrix on the left-hand side.
   * @param {number} scale The uniform scale on the right-hand side.
   * @param {Matrix2} result The object onto which to store the result.
   * @returns {Matrix2} The modified result parameter.
   *
   * @example
   * // Instead of Cesium.Matrix2.multiply(m, Cesium.Matrix2.fromUniformScale(scale), m);
   * Cesium.Matrix2.multiplyByUniformScale(m, scale, m);
   *
   * @see Matrix2.multiplyByScale
   * @see Matrix2.fromScale
   * @see Matrix2.fromUniformScale
   * @see Matrix2.setScale
   * @see Matrix2.setUniformScale
   * @see Matrix2.getScale
   */
  static multiplyByUniformScale(matrix, scale, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.number("scale", scale);
    Check_default.typeOf.object("result", result);
    result[0] = matrix[0] * scale;
    result[1] = matrix[1] * scale;
    result[2] = matrix[2] * scale;
    result[3] = matrix[3] * scale;
    return result;
  }
  /**
   * Creates a negated copy of the provided matrix.
   *
   * @param {Matrix2} matrix The matrix to negate.
   * @param {Matrix2} result The object onto which to store the result.
   * @returns {Matrix2} The modified result parameter.
   */
  static negate(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    result[0] = -matrix[0];
    result[1] = -matrix[1];
    result[2] = -matrix[2];
    result[3] = -matrix[3];
    return result;
  }
  /**
   * Computes the transpose of the provided matrix.
   *
   * @param {Matrix2} matrix The matrix to transpose.
   * @param {Matrix2} result The object onto which to store the result.
   * @returns {Matrix2} The modified result parameter.
   */
  static transpose(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    const column0Row0 = matrix[0];
    const column0Row1 = matrix[2];
    const column1Row0 = matrix[1];
    const column1Row1 = matrix[3];
    result[0] = column0Row0;
    result[1] = column0Row1;
    result[2] = column1Row0;
    result[3] = column1Row1;
    return result;
  }
  /**
   * Computes a matrix, which contains the absolute (unsigned) values of the provided matrix's elements.
   *
   * @param {Matrix2} matrix The matrix with signed elements.
   * @param {Matrix2} result The object onto which to store the result.
   * @returns {Matrix2} The modified result parameter.
   */
  static abs(matrix, result) {
    Check_default.typeOf.object("matrix", matrix);
    Check_default.typeOf.object("result", result);
    result[0] = Math.abs(matrix[0]);
    result[1] = Math.abs(matrix[1]);
    result[2] = Math.abs(matrix[2]);
    result[3] = Math.abs(matrix[3]);
    return result;
  }
  /**
   * Compares the provided matrices componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Matrix2} [left] The first matrix.
   * @param {Matrix2} [right] The second matrix.
   * @returns {boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
   */
  static equals(left, right) {
    return left === right || defined_default(left) && defined_default(right) && left[0] === right[0] && left[1] === right[1] && left[2] === right[2] && left[3] === right[3];
  }
  /**
   * Compares provided matrix and array, starting from a given array offset.
   *
   * @param {Matrix2} matrix The matrix to compare.
   * @param {number[]} array The packed array.
   * @param {number} offset The offset into the array at which the matrix starts.
   * @returns {boolean} <code>true</code> if the matrix matches the packed array values at the offset; otherwise, <code>false</code>.
   * @internal
   */
  static equalsArray(matrix, array, offset) {
    return matrix[0] === array[offset] && matrix[1] === array[offset + 1] && matrix[2] === array[offset + 2] && matrix[3] === array[offset + 3];
  }
  /**
   * Compares the provided matrices componentwise and returns
   * <code>true</code> if they are within the provided epsilon,
   * <code>false</code> otherwise.
   *
   * @param {Matrix2} [left] The first matrix.
   * @param {Matrix2} [right] The second matrix.
   * @param {number} [epsilon=0] The epsilon to use for equality testing.
   * @returns {boolean} <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
   */
  static equalsEpsilon(left, right, epsilon) {
    epsilon = epsilon ?? 0;
    return left === right || defined_default(left) && defined_default(right) && Math.abs(left[0] - right[0]) <= epsilon && Math.abs(left[1] - right[1]) <= epsilon && Math.abs(left[2] - right[2]) <= epsilon && Math.abs(left[3] - right[3]) <= epsilon;
  }
  /**
   * Gets the number of items in the collection.
   *
   * @type {number}
   */
  get length() {
    return _Matrix2.packedLength;
  }
  /**
   * Duplicates the provided Matrix2 instance.
   *
   * @param {Matrix2} [result] The object onto which to store the result.
   * @returns {Matrix2} The modified result parameter or a new Matrix2 instance if one was not provided.
   */
  clone(result) {
    return _Matrix2.clone(this, result);
  }
  /**
   * Compares this matrix to the provided matrix componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Matrix2} [right] The right hand side matrix.
   * @returns {boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
   */
  equals(right) {
    return _Matrix2.equals(this, right);
  }
  /**
   * Compares this matrix to the provided matrix componentwise and returns
   * <code>true</code> if they are within the provided epsilon,
   * <code>false</code> otherwise.
   *
   * @param {Matrix2} [right] The right hand side matrix.
   * @param {number} [epsilon=0] The epsilon to use for equality testing.
   * @returns {boolean} <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
   */
  equalsEpsilon(right, epsilon) {
    return _Matrix2.equalsEpsilon(this, right, epsilon);
  }
  /**
   * Creates a string representing this Matrix with each row being
   * on a separate line and in the format '(column0, column1)'.
   *
   * @returns {string} A string representing the provided Matrix with each row being on a separate line and in the format '(column0, column1)'.
   */
  toString() {
    return `(${this[0]}, ${this[2]})
(${this[1]}, ${this[3]})`;
  }
};
Matrix2.packedLength = 4;
Matrix2.fromArray = Matrix2.unpack;
Matrix2.IDENTITY = Object.freeze(new Matrix2(1, 0, 0, 1));
Matrix2.ZERO = Object.freeze(new Matrix2(0, 0, 0, 0));
Matrix2.COLUMN0ROW0 = 0;
Matrix2.COLUMN0ROW1 = 1;
Matrix2.COLUMN1ROW0 = 2;
Matrix2.COLUMN1ROW1 = 3;
var scaleScratch1 = new Cartesian2_default();
var scaleScratch2 = new Cartesian2_default();
var scratchColumn = new Cartesian2_default();
var scaleScratch3 = new Cartesian2_default();
var scaleScratch4 = new Cartesian2_default();
var scaleScratch5 = new Cartesian2_default();
var Matrix2_default = Matrix2;

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
    const existingScale = _Matrix3.getScale(matrix, scaleScratch12);
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
    const existingScale = _Matrix3.getScale(matrix, scaleScratch22);
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
      Cartesian3_default.fromElements(matrix[0], matrix[1], matrix[2], scratchColumn2)
    );
    result.y = Cartesian3_default.magnitude(
      Cartesian3_default.fromElements(matrix[3], matrix[4], matrix[5], scratchColumn2)
    );
    result.z = Cartesian3_default.magnitude(
      Cartesian3_default.fromElements(matrix[6], matrix[7], matrix[8], scratchColumn2)
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
    _Matrix3.getScale(matrix, scaleScratch32);
    return Cartesian3_default.maximumComponent(scaleScratch32);
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
    const scale = _Matrix3.getScale(matrix, scaleScratch42);
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
    const scale = _Matrix3.getScale(matrix, scaleScratch52);
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
var scaleScratch12 = new Cartesian3_default();
var scaleScratch22 = new Cartesian3_default();
var scratchColumn2 = new Cartesian3_default();
var scaleScratch32 = new Cartesian3_default();
var scaleScratch42 = new Cartesian3_default();
var scaleScratch52 = new Cartesian3_default();
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
    const existingScale = _Matrix4.getScale(matrix, scaleScratch13);
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
    const existingScale = _Matrix4.getScale(matrix, scaleScratch23);
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
      Cartesian3_default.fromElements(matrix[0], matrix[1], matrix[2], scratchColumn3)
    );
    result.y = Cartesian3_default.magnitude(
      Cartesian3_default.fromElements(matrix[4], matrix[5], matrix[6], scratchColumn3)
    );
    result.z = Cartesian3_default.magnitude(
      Cartesian3_default.fromElements(matrix[8], matrix[9], matrix[10], scratchColumn3)
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
    _Matrix4.getScale(matrix, scaleScratch33);
    return Cartesian3_default.maximumComponent(scaleScratch33);
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
    const scale = _Matrix4.getScale(matrix, scaleScratch43);
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
    const scale = _Matrix4.getScale(matrix, scaleScratch53);
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
var scaleScratch13 = new Cartesian3_default();
var scaleScratch23 = new Cartesian3_default();
var scratchColumn3 = new Cartesian3_default();
var scaleScratch33 = new Cartesian3_default();
var scaleScratch43 = new Cartesian3_default();
var scaleScratch53 = new Cartesian3_default();
var scratchInverseRotation = new Matrix3_default();
var scratchMatrix3Zero = new Matrix3_default();
var scratchBottomRow = new Cartesian4_default();
var scratchExpectedBottomRow = new Cartesian4_default(0, 0, 0, 1);
var scratchTransposeMatrix2 = new Matrix4();
var Matrix4_default = Matrix4;

// packages/core/Source/AttributeType.js
var AttributeType = {
  /**
   * The attribute is a single component.
   *
   * @type {string}
   * @constant
   */
  SCALAR: "SCALAR",
  /**
   * The attribute is a two-component vector.
   *
   * @type {string}
   * @constant
   */
  VEC2: "VEC2",
  /**
   * The attribute is a three-component vector.
   *
   * @type {string}
   * @constant
   */
  VEC3: "VEC3",
  /**
   * The attribute is a four-component vector.
   *
   * @type {string}
   * @constant
   */
  VEC4: "VEC4",
  /**
   * The attribute is a 2x2 matrix.
   *
   * @type {string}
   * @constant
   */
  MAT2: "MAT2",
  /**
   * The attribute is a 3x3 matrix.
   *
   * @type {string}
   * @constant
   */
  MAT3: "MAT3",
  /**
   * The attribute is a 4x4 matrix.
   *
   * @type {string}
   * @constant
   */
  MAT4: "MAT4"
};
AttributeType.getMathType = function(attributeType) {
  switch (attributeType) {
    case AttributeType.SCALAR:
      return Number;
    case AttributeType.VEC2:
      return Cartesian2_default;
    case AttributeType.VEC3:
      return Cartesian3_default;
    case AttributeType.VEC4:
      return Cartesian4_default;
    case AttributeType.MAT2:
      return Matrix2_default;
    case AttributeType.MAT3:
      return Matrix3_default;
    case AttributeType.MAT4:
      return Matrix4_default;
    //>>includeStart('debug', pragmas.debug);
    default:
      throw new DeveloperError_default("attributeType is not a valid value.");
  }
};
AttributeType.getNumberOfComponents = function(attributeType) {
  switch (attributeType) {
    case AttributeType.SCALAR:
      return 1;
    case AttributeType.VEC2:
      return 2;
    case AttributeType.VEC3:
      return 3;
    case AttributeType.VEC4:
    case AttributeType.MAT2:
      return 4;
    case AttributeType.MAT3:
      return 9;
    case AttributeType.MAT4:
      return 16;
    //>>includeStart('debug', pragmas.debug);
    default:
      throw new DeveloperError_default("attributeType is not a valid value.");
  }
};
AttributeType.getAttributeLocationCount = function(attributeType) {
  switch (attributeType) {
    case AttributeType.SCALAR:
    case AttributeType.VEC2:
    case AttributeType.VEC3:
    case AttributeType.VEC4:
      return 1;
    case AttributeType.MAT2:
      return 2;
    case AttributeType.MAT3:
      return 3;
    case AttributeType.MAT4:
      return 4;
    //>>includeStart('debug', pragmas.debug);
    default:
      throw new DeveloperError_default("attributeType is not a valid value.");
  }
};
AttributeType.getGlslType = function(attributeType) {
  Check_default.typeOf.string("attributeType", attributeType);
  switch (attributeType) {
    case AttributeType.SCALAR:
      return "float";
    case AttributeType.VEC2:
      return "vec2";
    case AttributeType.VEC3:
      return "vec3";
    case AttributeType.VEC4:
      return "vec4";
    case AttributeType.MAT2:
      return "mat2";
    case AttributeType.MAT3:
      return "mat3";
    case AttributeType.MAT4:
      return "mat4";
    //>>includeStart('debug', pragmas.debug);
    default:
      throw new DeveloperError_default("attributeType is not a valid value.");
  }
};
Object.freeze(AttributeType);
var AttributeType_default = AttributeType;

// packages/core/Source/scaleToGeodeticSurface.js
var scaleToGeodeticSurfaceIntersection = new Cartesian3_default();
var scaleToGeodeticSurfaceGradient = new Cartesian3_default();
function scaleToGeodeticSurface(cartesian, oneOverRadii, oneOverRadiiSquared, centerToleranceSquared, result) {
  if (!defined_default(cartesian)) {
    throw new DeveloperError_default("cartesian is required.");
  }
  if (!defined_default(oneOverRadii)) {
    throw new DeveloperError_default("oneOverRadii is required.");
  }
  if (!defined_default(oneOverRadiiSquared)) {
    throw new DeveloperError_default("oneOverRadiiSquared is required.");
  }
  if (!defined_default(centerToleranceSquared)) {
    throw new DeveloperError_default("centerToleranceSquared is required.");
  }
  const positionX = cartesian.x;
  const positionY = cartesian.y;
  const positionZ = cartesian.z;
  const oneOverRadiiX = oneOverRadii.x;
  const oneOverRadiiY = oneOverRadii.y;
  const oneOverRadiiZ = oneOverRadii.z;
  const x2 = positionX * positionX * oneOverRadiiX * oneOverRadiiX;
  const y2 = positionY * positionY * oneOverRadiiY * oneOverRadiiY;
  const z2 = positionZ * positionZ * oneOverRadiiZ * oneOverRadiiZ;
  const squaredNorm = x2 + y2 + z2;
  const ratio = Math.sqrt(1 / squaredNorm);
  const intersection = Cartesian3_default.multiplyByScalar(
    cartesian,
    ratio,
    scaleToGeodeticSurfaceIntersection
  );
  if (squaredNorm < centerToleranceSquared) {
    return !isFinite(ratio) ? void 0 : Cartesian3_default.clone(intersection, result);
  }
  const oneOverRadiiSquaredX = oneOverRadiiSquared.x;
  const oneOverRadiiSquaredY = oneOverRadiiSquared.y;
  const oneOverRadiiSquaredZ = oneOverRadiiSquared.z;
  const gradient = scaleToGeodeticSurfaceGradient;
  gradient.x = intersection.x * oneOverRadiiSquaredX * 2;
  gradient.y = intersection.y * oneOverRadiiSquaredY * 2;
  gradient.z = intersection.z * oneOverRadiiSquaredZ * 2;
  let lambda = (1 - ratio) * Cartesian3_default.magnitude(cartesian) / (0.5 * Cartesian3_default.magnitude(gradient));
  let correction = 0;
  let func;
  let denominator;
  let xMultiplier;
  let yMultiplier;
  let zMultiplier;
  let xMultiplier2;
  let yMultiplier2;
  let zMultiplier2;
  let xMultiplier3;
  let yMultiplier3;
  let zMultiplier3;
  do {
    lambda -= correction;
    xMultiplier = 1 / (1 + lambda * oneOverRadiiSquaredX);
    yMultiplier = 1 / (1 + lambda * oneOverRadiiSquaredY);
    zMultiplier = 1 / (1 + lambda * oneOverRadiiSquaredZ);
    xMultiplier2 = xMultiplier * xMultiplier;
    yMultiplier2 = yMultiplier * yMultiplier;
    zMultiplier2 = zMultiplier * zMultiplier;
    xMultiplier3 = xMultiplier2 * xMultiplier;
    yMultiplier3 = yMultiplier2 * yMultiplier;
    zMultiplier3 = zMultiplier2 * zMultiplier;
    func = x2 * xMultiplier2 + y2 * yMultiplier2 + z2 * zMultiplier2 - 1;
    denominator = x2 * xMultiplier3 * oneOverRadiiSquaredX + y2 * yMultiplier3 * oneOverRadiiSquaredY + z2 * zMultiplier3 * oneOverRadiiSquaredZ;
    const derivative = -2 * denominator;
    correction = func / derivative;
  } while (Math.abs(func) > Math_default.EPSILON12);
  if (!defined_default(result)) {
    return new Cartesian3_default(
      positionX * xMultiplier,
      positionY * yMultiplier,
      positionZ * zMultiplier
    );
  }
  result.x = positionX * xMultiplier;
  result.y = positionY * yMultiplier;
  result.z = positionZ * zMultiplier;
  return result;
}
var scaleToGeodeticSurface_default = scaleToGeodeticSurface;

// packages/core/Source/Cartographic.js
var _Cartographic = class _Cartographic {
  /**
   * @param {number} [longitude=0.0] The longitude, in radians.
   * @param {number} [latitude=0.0] The latitude, in radians.
   * @param {number} [height=0.0] The height, in meters, above the ellipsoid.
   */
  constructor(longitude, latitude, height) {
    this.longitude = longitude ?? 0;
    this.latitude = latitude ?? 0;
    this.height = height ?? 0;
  }
  /**
   * Creates a new Cartographic instance from longitude and latitude
   * specified in radians.
   *
   * @param {number} longitude The longitude, in radians.
   * @param {number} latitude The latitude, in radians.
   * @param {number} [height=0.0] The height, in meters, above the ellipsoid.
   * @param {Cartographic} [result] The object onto which to store the result.
   * @returns {Cartographic} The modified result parameter or a new Cartographic instance if one was not provided.
   */
  static fromRadians(longitude, latitude, height, result) {
    Check_default.typeOf.number("longitude", longitude);
    Check_default.typeOf.number("latitude", latitude);
    height = height ?? 0;
    if (!defined_default(result)) {
      return new _Cartographic(longitude, latitude, height);
    }
    result.longitude = longitude;
    result.latitude = latitude;
    result.height = height;
    return result;
  }
  /**
   * Creates a new Cartographic instance from longitude and latitude
   * specified in degrees.  The values in the resulting object will
   * be in radians.
   *
   * @param {number} longitude The longitude, in degrees.
   * @param {number} latitude The latitude, in degrees.
   * @param {number} [height=0.0] The height, in meters, above the ellipsoid.
   * @param {Cartographic} [result] The object onto which to store the result.
   * @returns {Cartographic} The modified result parameter or a new Cartographic instance if one was not provided.
   */
  static fromDegrees(longitude, latitude, height, result) {
    Check_default.typeOf.number("longitude", longitude);
    Check_default.typeOf.number("latitude", latitude);
    longitude = Math_default.toRadians(longitude);
    latitude = Math_default.toRadians(latitude);
    return _Cartographic.fromRadians(longitude, latitude, height, result);
  }
  /**
   * Creates a new Cartographic instance from a Cartesian position. The values in the
   * resulting object will be in radians.
   *
   * @param {Cartesian3} cartesian The Cartesian position to convert to cartographic representation.
   * @param {Ellipsoid} [ellipsoid=Ellipsoid.default] The ellipsoid on which the position lies.
   * @param {Cartographic} [result] The object onto which to store the result.
   * @returns {Cartographic} The modified result parameter, new Cartographic instance if none was provided, or undefined if the cartesian is at the center of the ellipsoid.
   */
  static fromCartesian(cartesian, ellipsoid, result) {
    const oneOverRadii = defined_default(ellipsoid) ? ellipsoid.oneOverRadii : _Cartographic._ellipsoidOneOverRadii;
    const oneOverRadiiSquared = defined_default(ellipsoid) ? ellipsoid.oneOverRadiiSquared : _Cartographic._ellipsoidOneOverRadiiSquared;
    const centerToleranceSquared = defined_default(ellipsoid) ? ellipsoid._centerToleranceSquared : _Cartographic._ellipsoidCenterToleranceSquared;
    const p = scaleToGeodeticSurface_default(
      cartesian,
      oneOverRadii,
      oneOverRadiiSquared,
      centerToleranceSquared,
      cartesianToCartographicP
    );
    if (!defined_default(p)) {
      return void 0;
    }
    let n = Cartesian3_default.multiplyComponents(
      p,
      oneOverRadiiSquared,
      cartesianToCartographicN
    );
    n = Cartesian3_default.normalize(n, n);
    const h = Cartesian3_default.subtract(cartesian, p, cartesianToCartographicH);
    const longitude = Math.atan2(n.y, n.x);
    const latitude = Math.asin(n.z);
    const height = Math_default.sign(Cartesian3_default.dot(h, cartesian)) * Cartesian3_default.magnitude(h);
    if (!defined_default(result)) {
      return new _Cartographic(longitude, latitude, height);
    }
    result.longitude = longitude;
    result.latitude = latitude;
    result.height = height;
    return result;
  }
  /**
   * Creates a new Cartesian3 instance from a Cartographic input. The values in the inputted
   * object should be in radians.
   *
   * @param {Cartographic} cartographic Input to be converted into a Cartesian3 output.
   * @param {Ellipsoid} [ellipsoid=Ellipsoid.default] The ellipsoid on which the position lies.
   * @param {Cartesian3} [result] The object onto which to store the result.
   * @returns {Cartesian3} The position
   */
  static toCartesian(cartographic, ellipsoid, result) {
    Check_default.defined("cartographic", cartographic);
    return Cartesian3_default.fromRadians(
      cartographic.longitude,
      cartographic.latitude,
      cartographic.height,
      ellipsoid,
      result
    );
  }
  /**
   * Duplicates a Cartographic instance.
   *
   * @param {Cartographic} cartographic The cartographic to duplicate.
   * @param {Cartographic} [result] The object onto which to store the result.
   * @returns {Cartographic} The modified result parameter or a new Cartographic instance if one was not provided. (Returns undefined if cartographic is undefined)
   */
  static clone(cartographic, result) {
    if (!defined_default(cartographic)) {
      return void 0;
    }
    if (!defined_default(result)) {
      return new _Cartographic(
        cartographic.longitude,
        cartographic.latitude,
        cartographic.height
      );
    }
    result.longitude = cartographic.longitude;
    result.latitude = cartographic.latitude;
    result.height = cartographic.height;
    return result;
  }
  /**
   * Compares the provided cartographics componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Cartographic} [left] The first cartographic.
   * @param {Cartographic} [right] The second cartographic.
   * @returns {boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
   */
  static equals(left, right) {
    return left === right || defined_default(left) && defined_default(right) && left.longitude === right.longitude && left.latitude === right.latitude && left.height === right.height;
  }
  /**
   * Compares the provided cartographics componentwise and returns
   * <code>true</code> if they are within the provided epsilon,
   * <code>false</code> otherwise.
   *
   * @param {Cartographic} [left] The first cartographic.
   * @param {Cartographic} [right] The second cartographic.
   * @param {number} [epsilon=0] The epsilon to use for equality testing.
   * @returns {boolean} <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
   */
  static equalsEpsilon(left, right, epsilon) {
    epsilon = epsilon ?? 0;
    return left === right || defined_default(left) && defined_default(right) && Math.abs(left.longitude - right.longitude) <= epsilon && Math.abs(left.latitude - right.latitude) <= epsilon && Math.abs(left.height - right.height) <= epsilon;
  }
  /**
   * Duplicates this instance.
   *
   * @param {Cartographic} [result] The object onto which to store the result.
   * @returns {Cartographic} The modified result parameter or a new Cartographic instance if one was not provided.
   */
  clone(result) {
    return _Cartographic.clone(this, result);
  }
  /**
   * Compares the provided against this cartographic componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Cartographic} [right] The second cartographic.
   * @returns {boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
   */
  equals(right) {
    return _Cartographic.equals(this, right);
  }
  /**
   * Compares the provided against this cartographic componentwise and returns
   * <code>true</code> if they are within the provided epsilon,
   * <code>false</code> otherwise.
   *
   * @param {Cartographic} [right] The second cartographic.
   * @param {number} [epsilon=0] The epsilon to use for equality testing.
   * @returns {boolean} <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
   */
  equalsEpsilon(right, epsilon) {
    return _Cartographic.equalsEpsilon(this, right, epsilon);
  }
  /**
   * Creates a string representing this cartographic in the format '(longitude, latitude, height)'.
   *
   * @returns {string} A string representing the provided cartographic in the format '(longitude, latitude, height)'.
   */
  toString() {
    return `(${this.longitude}, ${this.latitude}, ${this.height})`;
  }
};
// To avoid circular dependencies, these are set by Ellipsoid when Ellipsoid.default is set.
__publicField(_Cartographic, "_ellipsoidOneOverRadii", new Cartesian3_default(
  1 / 6378137,
  1 / 6378137,
  1 / 6356752314245179e-9
));
__publicField(_Cartographic, "_ellipsoidOneOverRadiiSquared", new Cartesian3_default(
  1 / (6378137 * 6378137),
  1 / (6378137 * 6378137),
  1 / (6356752314245179e-9 * 6356752314245179e-9)
));
__publicField(_Cartographic, "_ellipsoidCenterToleranceSquared", Math_default.EPSILON1);
var Cartographic = _Cartographic;
Cartographic.ZERO = Object.freeze(new Cartographic(0, 0, 0));
var cartesianToCartographicN = new Cartesian3_default();
var cartesianToCartographicP = new Cartesian3_default();
var cartesianToCartographicH = new Cartesian3_default();
var Cartographic_default = Cartographic;

// packages/core/Source/Ellipsoid.js
function initialize(ellipsoid, x, y, z) {
  x = x ?? 0;
  y = y ?? 0;
  z = z ?? 0;
  Check_default.typeOf.number.greaterThanOrEquals("x", x, 0);
  Check_default.typeOf.number.greaterThanOrEquals("y", y, 0);
  Check_default.typeOf.number.greaterThanOrEquals("z", z, 0);
  ellipsoid._radii = new Cartesian3_default(x, y, z);
  ellipsoid._radiiSquared = new Cartesian3_default(x * x, y * y, z * z);
  ellipsoid._radiiToTheFourth = new Cartesian3_default(
    x * x * x * x,
    y * y * y * y,
    z * z * z * z
  );
  ellipsoid._oneOverRadii = new Cartesian3_default(
    x === 0 ? 0 : 1 / x,
    y === 0 ? 0 : 1 / y,
    z === 0 ? 0 : 1 / z
  );
  ellipsoid._oneOverRadiiSquared = new Cartesian3_default(
    x === 0 ? 0 : 1 / (x * x),
    y === 0 ? 0 : 1 / (y * y),
    z === 0 ? 0 : 1 / (z * z)
  );
  ellipsoid._minimumRadius = Math.min(x, y, z);
  ellipsoid._maximumRadius = Math.max(x, y, z);
  ellipsoid._centerToleranceSquared = Math_default.EPSILON1;
  if (ellipsoid._radiiSquared.z !== 0) {
    ellipsoid._squaredXOverSquaredZ = ellipsoid._radiiSquared.x / ellipsoid._radiiSquared.z;
  }
}
var Ellipsoid = class _Ellipsoid {
  /**
   * @param {number} [x=0] The radius in the x direction.
   * @param {number} [y=0] The radius in the y direction.
   * @param {number} [z=0] The radius in the z direction.
   *
   * @exception {DeveloperError} All radii components must be greater than or equal to zero.
   */
  constructor(x, y, z) {
    this._radii = void 0;
    this._radiiSquared = void 0;
    this._radiiToTheFourth = void 0;
    this._oneOverRadii = void 0;
    this._oneOverRadiiSquared = void 0;
    this._minimumRadius = void 0;
    this._maximumRadius = void 0;
    this._centerToleranceSquared = void 0;
    this._squaredXOverSquaredZ = void 0;
    initialize(this, x, y, z);
  }
  /**
   * Gets the radii of the ellipsoid.
   * @type {Cartesian3}
   * @readonly
   */
  get radii() {
    return this._radii;
  }
  /**
   * Gets the squared radii of the ellipsoid.
   * @type {Cartesian3}
   * @readonly
   */
  get radiiSquared() {
    return this._radiiSquared;
  }
  /**
   * Gets the radii of the ellipsoid raise to the fourth power.
   * @type {Cartesian3}
   * @readonly
   */
  get radiiToTheFourth() {
    return this._radiiToTheFourth;
  }
  /**
   * Gets one over the radii of the ellipsoid.
   * @type {Cartesian3}
   * @readonly
   */
  get oneOverRadii() {
    return this._oneOverRadii;
  }
  /**
   * Gets one over the squared radii of the ellipsoid.
   * @type {Cartesian3}
   * @readonly
   */
  get oneOverRadiiSquared() {
    return this._oneOverRadiiSquared;
  }
  /**
   * Gets the minimum radius of the ellipsoid.
   * @type {number}
   * @readonly
   */
  get minimumRadius() {
    return this._minimumRadius;
  }
  /**
   * Gets the maximum radius of the ellipsoid.
   * @type {number}
   * @readonly
   */
  get maximumRadius() {
    return this._maximumRadius;
  }
  /**
   * Duplicates an Ellipsoid instance.
   *
   * @param {Ellipsoid} ellipsoid The ellipsoid to duplicate.
   * @param {Ellipsoid} [result] The object onto which to store the result, or undefined if a new
   *                    instance should be created.
   * @returns {Ellipsoid} The cloned Ellipsoid. (Returns undefined if ellipsoid is undefined)
   */
  static clone(ellipsoid, result) {
    if (!defined_default(ellipsoid)) {
      return void 0;
    }
    const radii = ellipsoid._radii;
    if (!defined_default(result)) {
      return new _Ellipsoid(radii.x, radii.y, radii.z);
    }
    Cartesian3_default.clone(radii, result._radii);
    Cartesian3_default.clone(ellipsoid._radiiSquared, result._radiiSquared);
    Cartesian3_default.clone(ellipsoid._radiiToTheFourth, result._radiiToTheFourth);
    Cartesian3_default.clone(ellipsoid._oneOverRadii, result._oneOverRadii);
    Cartesian3_default.clone(
      ellipsoid._oneOverRadiiSquared,
      result._oneOverRadiiSquared
    );
    result._minimumRadius = ellipsoid._minimumRadius;
    result._maximumRadius = ellipsoid._maximumRadius;
    result._centerToleranceSquared = ellipsoid._centerToleranceSquared;
    return result;
  }
  /**
   * Computes an Ellipsoid from a Cartesian specifying the radii in x, y, and z directions.
   *
   * @param {Cartesian3} [cartesian=Cartesian3.ZERO] The ellipsoid's radius in the x, y, and z directions.
   * @param {Ellipsoid} [result] The object onto which to store the result, or undefined if a new
   *                    instance should be created.
   * @returns {Ellipsoid} A new Ellipsoid instance.
   *
   * @exception {DeveloperError} All radii components must be greater than or equal to zero.
   *
   * @see Ellipsoid.WGS84
   * @see Ellipsoid.UNIT_SPHERE
   */
  static fromCartesian3(cartesian, result) {
    if (!defined_default(result)) {
      result = new _Ellipsoid();
    }
    if (!defined_default(cartesian)) {
      return result;
    }
    initialize(result, cartesian.x, cartesian.y, cartesian.z);
    return result;
  }
  /**
   * The default ellipsoid used when not otherwise specified.
   * @type {Ellipsoid}
   * @example
   * Cesium.Ellipsoid.default = Cesium.Ellipsoid.MOON;
   *
   * // Apollo 11 landing site
   * const position = Cesium.Cartesian3.fromRadians(
   *   0.67416,
   *   23.47315,
   * );
   */
  static get default() {
    return _Ellipsoid._default;
  }
  static set default(value) {
    Check_default.typeOf.object("value", value);
    _Ellipsoid._default = value;
    Cartesian3_default._ellipsoidRadiiSquared = value.radiiSquared;
    Cartographic_default._ellipsoidOneOverRadii = value.oneOverRadii;
    Cartographic_default._ellipsoidOneOverRadiiSquared = value.oneOverRadiiSquared;
    Cartographic_default._ellipsoidCenterToleranceSquared = value._centerToleranceSquared;
  }
  /**
   * Duplicates an Ellipsoid instance.
   *
   * @param {Ellipsoid} [result] The object onto which to store the result, or undefined if a new
   *                    instance should be created.
   * @returns {Ellipsoid} The cloned Ellipsoid.
   */
  clone(result) {
    return _Ellipsoid.clone(this, result);
  }
  /**
   * Stores the provided instance into the provided array.
   *
   * @param {Ellipsoid} value The value to pack.
   * @param {number[]} array The array to pack into.
   * @param {number} [startingIndex=0] The index into the array at which to start packing the elements.
   *
   * @returns {number[]} The array that was packed into
   */
  static pack(value, array, startingIndex) {
    Check_default.typeOf.object("value", value);
    Check_default.defined("array", array);
    startingIndex = startingIndex ?? 0;
    Cartesian3_default.pack(value._radii, array, startingIndex);
    return array;
  }
  /**
   * Retrieves an instance from a packed array.
   *
   * @param {number[]} array The packed array.
   * @param {number} [startingIndex=0] The starting index of the element to be unpacked.
   * @param {Ellipsoid} [result] The object into which to store the result.
   * @returns {Ellipsoid} The modified result parameter or a new Ellipsoid instance if one was not provided.
   */
  static unpack(array, startingIndex, result) {
    Check_default.defined("array", array);
    startingIndex = startingIndex ?? 0;
    const radii = Cartesian3_default.unpack(array, startingIndex);
    return _Ellipsoid.fromCartesian3(radii, result);
  }
  /**
   * Computes the normal of the plane tangent to the surface of the ellipsoid at the provided position.
   *
   * @param {Cartographic} cartographic The cartographic position for which to to determine the geodetic normal.
   * @param {Cartesian3} [result] The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if none was provided.
   */
  geodeticSurfaceNormalCartographic(cartographic, result) {
    Check_default.typeOf.object("cartographic", cartographic);
    const longitude = cartographic.longitude;
    const latitude = cartographic.latitude;
    const cosLatitude = Math.cos(latitude);
    const x = cosLatitude * Math.cos(longitude);
    const y = cosLatitude * Math.sin(longitude);
    const z = Math.sin(latitude);
    if (!defined_default(result)) {
      result = new Cartesian3_default();
    }
    result.x = x;
    result.y = y;
    result.z = z;
    return Cartesian3_default.normalize(result, result);
  }
  /**
   * Computes the normal of the plane tangent to the surface of the ellipsoid at the provided position.
   *
   * @param {Cartesian3} cartesian The Cartesian position for which to to determine the surface normal.
   * @param {Cartesian3} [result] The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if none was provided, or undefined if a normal cannot be found.
   */
  geodeticSurfaceNormal(cartesian, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    if (isNaN(cartesian.x) || isNaN(cartesian.y) || isNaN(cartesian.z)) {
      throw new DeveloperError_default("cartesian has a NaN component");
    }
    if (Cartesian3_default.equalsEpsilon(cartesian, Cartesian3_default.ZERO, Math_default.EPSILON14)) {
      return void 0;
    }
    if (!defined_default(result)) {
      result = new Cartesian3_default();
    }
    result = Cartesian3_default.multiplyComponents(
      cartesian,
      this._oneOverRadiiSquared,
      result
    );
    return Cartesian3_default.normalize(result, result);
  }
  /**
   * Converts the provided cartographic to Cartesian representation.
   *
   * @param {Cartographic} cartographic The cartographic position.
   * @param {Cartesian3} [result] The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if none was provided.
   *
   * @example
   * //Create a Cartographic and determine it's Cartesian representation on a WGS84 ellipsoid.
   * const position = new Cesium.Cartographic(Cesium.Math.toRadians(21), Cesium.Math.toRadians(78), 5000);
   * const cartesianPosition = Cesium.Ellipsoid.WGS84.cartographicToCartesian(position);
   */
  cartographicToCartesian(cartographic, result) {
    const n = cartographicToCartesianNormal;
    const k = cartographicToCartesianK;
    this.geodeticSurfaceNormalCartographic(cartographic, n);
    Cartesian3_default.multiplyComponents(this._radiiSquared, n, k);
    const gamma = Math.sqrt(Cartesian3_default.dot(n, k));
    Cartesian3_default.divideByScalar(k, gamma, k);
    Cartesian3_default.multiplyByScalar(n, cartographic.height, n);
    if (!defined_default(result)) {
      result = new Cartesian3_default();
    }
    return Cartesian3_default.add(k, n, result);
  }
  /**
   * Converts the provided array of cartographics to an array of Cartesians.
   *
   * @param {Cartographic[]} cartographics An array of cartographic positions.
   * @param {Cartesian3[]} [result] The object onto which to store the result.
   * @returns {Cartesian3[]} The modified result parameter or a new Array instance if none was provided.
   *
   * @example
   * //Convert an array of Cartographics and determine their Cartesian representation on a WGS84 ellipsoid.
   * const positions = [new Cesium.Cartographic(Cesium.Math.toRadians(21), Cesium.Math.toRadians(78), 0),
   *                  new Cesium.Cartographic(Cesium.Math.toRadians(21.321), Cesium.Math.toRadians(78.123), 100),
   *                  new Cesium.Cartographic(Cesium.Math.toRadians(21.645), Cesium.Math.toRadians(78.456), 250)];
   * const cartesianPositions = Cesium.Ellipsoid.WGS84.cartographicArrayToCartesianArray(positions);
   */
  cartographicArrayToCartesianArray(cartographics, result) {
    Check_default.defined("cartographics", cartographics);
    const length = cartographics.length;
    if (!defined_default(result)) {
      result = new Array(length);
    } else {
      result.length = length;
    }
    for (let i = 0; i < length; i++) {
      result[i] = this.cartographicToCartesian(cartographics[i], result[i]);
    }
    return result;
  }
  /**
   * Converts the provided cartesian to cartographic representation.
   * The cartesian is undefined at the center of the ellipsoid.
   *
   * @param {Cartesian3} cartesian The Cartesian position to convert to cartographic representation.
   * @param {Cartographic} [result] The object onto which to store the result.
   * @returns {Cartographic} The modified result parameter, new Cartographic instance if none was provided, or undefined if the cartesian is at the center of the ellipsoid.
   *
   * @example
   * //Create a Cartesian and determine it's Cartographic representation on a WGS84 ellipsoid.
   * const position = new Cesium.Cartesian3(17832.12, 83234.52, 952313.73);
   * const cartographicPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
   */
  cartesianToCartographic(cartesian, result) {
    const p = this.scaleToGeodeticSurface(cartesian, cartesianToCartographicP2);
    if (!defined_default(p)) {
      return void 0;
    }
    const n = this.geodeticSurfaceNormal(p, cartesianToCartographicN2);
    const h = Cartesian3_default.subtract(cartesian, p, cartesianToCartographicH2);
    const longitude = Math.atan2(n.y, n.x);
    const latitude = Math.asin(n.z);
    const height = Math_default.sign(Cartesian3_default.dot(h, cartesian)) * Cartesian3_default.magnitude(h);
    if (!defined_default(result)) {
      return new Cartographic_default(longitude, latitude, height);
    }
    result.longitude = longitude;
    result.latitude = latitude;
    result.height = height;
    return result;
  }
  /**
   * Converts the provided array of cartesians to an array of cartographics.
   *
   * @param {Cartesian3[]} cartesians An array of Cartesian positions.
   * @param {Cartographic[]} [result] The object onto which to store the result.
   * @returns {Cartographic[]} The modified result parameter or a new Array instance if none was provided.
   *
   * @example
   * //Create an array of Cartesians and determine their Cartographic representation on a WGS84 ellipsoid.
   * const positions = [new Cesium.Cartesian3(17832.12, 83234.52, 952313.73),
   *                  new Cesium.Cartesian3(17832.13, 83234.53, 952313.73),
   *                  new Cesium.Cartesian3(17832.14, 83234.54, 952313.73)]
   * const cartographicPositions = Cesium.Ellipsoid.WGS84.cartesianArrayToCartographicArray(positions);
   */
  cartesianArrayToCartographicArray(cartesians, result) {
    Check_default.defined("cartesians", cartesians);
    const length = cartesians.length;
    if (!defined_default(result)) {
      result = new Array(length);
    } else {
      result.length = length;
    }
    for (let i = 0; i < length; ++i) {
      result[i] = this.cartesianToCartographic(cartesians[i], result[i]);
    }
    return result;
  }
  /**
   * Scales the provided Cartesian position along the geodetic surface normal
   * so that it is on the surface of this ellipsoid.  If the position is
   * at the center of the ellipsoid, this function returns undefined.
   *
   * @param {Cartesian3} cartesian The Cartesian position to scale.
   * @param {Cartesian3} [result] The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter, a new Cartesian3 instance if none was provided, or undefined if the position is at the center.
   */
  scaleToGeodeticSurface(cartesian, result) {
    return scaleToGeodeticSurface_default(
      cartesian,
      this._oneOverRadii,
      this._oneOverRadiiSquared,
      this._centerToleranceSquared,
      result
    );
  }
  /**
   * Scales the provided Cartesian position along the geocentric surface normal
   * so that it is on the surface of this ellipsoid.
   *
   * @param {Cartesian3} cartesian The Cartesian position to scale.
   * @param {Cartesian3} [result] The object onto which to store the result.
   * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if none was provided.
   */
  scaleToGeocentricSurface(cartesian, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    if (!defined_default(result)) {
      result = new Cartesian3_default();
    }
    const positionX = cartesian.x;
    const positionY = cartesian.y;
    const positionZ = cartesian.z;
    const oneOverRadiiSquared = this._oneOverRadiiSquared;
    const beta = 1 / Math.sqrt(
      positionX * positionX * oneOverRadiiSquared.x + positionY * positionY * oneOverRadiiSquared.y + positionZ * positionZ * oneOverRadiiSquared.z
    );
    return Cartesian3_default.multiplyByScalar(cartesian, beta, result);
  }
  /**
   * Transforms a Cartesian X, Y, Z position to the ellipsoid-scaled space by multiplying
   * its components by the result of {@link Ellipsoid#oneOverRadii}.
   *
   * @param {Cartesian3} position The position to transform.
   * @param {Cartesian3} [result] The position to which to copy the result, or undefined to create and
   *        return a new instance.
   * @returns {Cartesian3} The position expressed in the scaled space.  The returned instance is the
   *          one passed as the result parameter if it is not undefined, or a new instance of it is.
   */
  transformPositionToScaledSpace(position, result) {
    if (!defined_default(result)) {
      result = new Cartesian3_default();
    }
    return Cartesian3_default.multiplyComponents(position, this._oneOverRadii, result);
  }
  /**
   * Transforms a Cartesian X, Y, Z position from the ellipsoid-scaled space by multiplying
   * its components by the result of {@link Ellipsoid#radii}.
   *
   * @param {Cartesian3} position The position to transform.
   * @param {Cartesian3} [result] The position to which to copy the result, or undefined to create and
   *        return a new instance.
   * @returns {Cartesian3} The position expressed in the unscaled space.  The returned instance is the
   *          one passed as the result parameter if it is not undefined, or a new instance of it is.
   */
  transformPositionFromScaledSpace(position, result) {
    if (!defined_default(result)) {
      result = new Cartesian3_default();
    }
    return Cartesian3_default.multiplyComponents(position, this._radii, result);
  }
  /**
   * Compares this Ellipsoid against the provided Ellipsoid componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Ellipsoid} [right] The other Ellipsoid.
   * @returns {boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
   */
  equals(right) {
    return this === right || defined_default(right) && Cartesian3_default.equals(this._radii, right._radii);
  }
  /**
   * Creates a string representing this Ellipsoid in the format '(radii.x, radii.y, radii.z)'.
   *
   * @returns {string} A string representing this ellipsoid in the format '(radii.x, radii.y, radii.z)'.
   */
  toString() {
    return this._radii.toString();
  }
  /**
   * Computes a point which is the intersection of the surface normal with the z-axis.
   *
   * @param {Cartesian3} position the position. must be on the surface of the ellipsoid.
   * @param {number} [buffer = 0.0] A buffer to subtract from the ellipsoid size when checking if the point is inside the ellipsoid.
   *                                In earth case, with common earth datums, there is no need for this buffer since the intersection point is always (relatively) very close to the center.
   *                                In WGS84 datum, intersection point is at max z = +-42841.31151331382 (0.673% of z-axis).
   *                                Intersection point could be outside the ellipsoid if the ratio of MajorAxis / AxisOfRotation is bigger than the square root of 2
   * @param {Cartesian3} [result] The cartesian to which to copy the result, or undefined to create and
   *        return a new instance.
   * @returns {Cartesian3 | undefined} the intersection point if it's inside the ellipsoid, undefined otherwise
   *
   * @exception {DeveloperError} position is required.
   * @exception {DeveloperError} Ellipsoid must be an ellipsoid of revolution (radii.x == radii.y).
   * @exception {DeveloperError} Ellipsoid.radii.z must be greater than 0.
   */
  getSurfaceNormalIntersectionWithZAxis(position, buffer, result) {
    Check_default.typeOf.object("position", position);
    if (!Math_default.equalsEpsilon(
      this._radii.x,
      this._radii.y,
      Math_default.EPSILON15
    )) {
      throw new DeveloperError_default(
        "Ellipsoid must be an ellipsoid of revolution (radii.x == radii.y)"
      );
    }
    Check_default.typeOf.number.greaterThan("Ellipsoid.radii.z", this._radii.z, 0);
    buffer = buffer ?? 0;
    const squaredXOverSquaredZ = this._squaredXOverSquaredZ;
    if (!defined_default(result)) {
      result = new Cartesian3_default();
    }
    result.x = 0;
    result.y = 0;
    result.z = position.z * (1 - squaredXOverSquaredZ);
    if (Math.abs(result.z) >= this._radii.z - buffer) {
      return void 0;
    }
    return result;
  }
  /**
   * Computes the ellipsoid curvatures at a given position on the surface.
   *
   * @param {Cartesian3} surfacePosition The position on the ellipsoid surface where curvatures will be calculated.
   * @param {Cartesian2} [result] The cartesian to which to copy the result, or undefined to create and return a new instance.
   * @returns {Cartesian2} The local curvature of the ellipsoid surface at the provided position, in east and north directions.
   *
   * @exception {DeveloperError} position is required.
   */
  getLocalCurvature(surfacePosition, result) {
    Check_default.typeOf.object("surfacePosition", surfacePosition);
    if (!defined_default(result)) {
      result = new Cartesian2_default();
    }
    const primeVerticalEndpoint = this.getSurfaceNormalIntersectionWithZAxis(
      surfacePosition,
      0,
      scratchEndpoint
    );
    const primeVerticalRadius = Cartesian3_default.distance(
      surfacePosition,
      primeVerticalEndpoint
    );
    const radiusRatio = this.minimumRadius * primeVerticalRadius / this.maximumRadius ** 2;
    const meridionalRadius = primeVerticalRadius * radiusRatio ** 2;
    return Cartesian2_default.fromElements(
      1 / primeVerticalRadius,
      1 / meridionalRadius,
      result
    );
  }
  /**
   * Computes an approximation of the surface area of a rectangle on the surface of an ellipsoid using
   * Gauss-Legendre 10th order quadrature.
   *
   * @param {Rectangle} rectangle The rectangle used for computing the surface area.
   * @returns {number} The approximate area of the rectangle on the surface of this ellipsoid.
   */
  surfaceArea(rectangle) {
    Check_default.typeOf.object("rectangle", rectangle);
    const minLongitude = rectangle.west;
    let maxLongitude = rectangle.east;
    const minLatitude = rectangle.south;
    const maxLatitude = rectangle.north;
    while (maxLongitude < minLongitude) {
      maxLongitude += Math_default.TWO_PI;
    }
    const radiiSquared = this._radiiSquared;
    const a2 = radiiSquared.x;
    const b2 = radiiSquared.y;
    const c2 = radiiSquared.z;
    const a2b2 = a2 * b2;
    return gaussLegendreQuadrature(minLatitude, maxLatitude, function(lat) {
      const sinPhi = Math.cos(lat);
      const cosPhi = Math.sin(lat);
      return Math.cos(lat) * gaussLegendreQuadrature(minLongitude, maxLongitude, function(lon) {
        const cosTheta = Math.cos(lon);
        const sinTheta = Math.sin(lon);
        return Math.sqrt(
          a2b2 * cosPhi * cosPhi + c2 * (b2 * cosTheta * cosTheta + a2 * sinTheta * sinTheta) * sinPhi * sinPhi
        );
      });
    });
  }
};
Ellipsoid.WGS84 = Object.freeze(
  new Ellipsoid(6378137, 6378137, 6356752314245179e-9)
);
Ellipsoid.UNIT_SPHERE = Object.freeze(new Ellipsoid(1, 1, 1));
Ellipsoid.MOON = Object.freeze(
  new Ellipsoid(
    Math_default.LUNAR_RADIUS,
    Math_default.LUNAR_RADIUS,
    Math_default.LUNAR_RADIUS
  )
);
Ellipsoid.MARS = Object.freeze(new Ellipsoid(3396190, 3396190, 3376200));
Ellipsoid._default = Ellipsoid.WGS84;
Ellipsoid.packedLength = Cartesian3_default.packedLength;
Ellipsoid.prototype.geocentricSurfaceNormal = Cartesian3_default.normalize;
var cartographicToCartesianNormal = new Cartesian3_default();
var cartographicToCartesianK = new Cartesian3_default();
var cartesianToCartographicN2 = new Cartesian3_default();
var cartesianToCartographicP2 = new Cartesian3_default();
var cartesianToCartographicH2 = new Cartesian3_default();
var scratchEndpoint = new Cartesian3_default();
var abscissas = [
  0.14887433898163,
  0.43339539412925,
  0.67940956829902,
  0.86506336668898,
  0.97390652851717,
  0
];
var weights = [
  0.29552422471475,
  0.26926671930999,
  0.21908636251598,
  0.14945134915058,
  0.066671344308684,
  0
];
function gaussLegendreQuadrature(a, b, func) {
  Check_default.typeOf.number("a", a);
  Check_default.typeOf.number("b", b);
  Check_default.typeOf.func("func", func);
  const xMean = 0.5 * (b + a);
  const xRange = 0.5 * (b - a);
  let sum = 0;
  for (let i = 0; i < 5; i++) {
    const dx = xRange * abscissas[i];
    sum += weights[i] * (func(xMean + dx) + func(xMean - dx));
  }
  sum *= xRange;
  return sum;
}
var Ellipsoid_default = Ellipsoid;

// packages/core/Source/HeadingPitchRoll.js
function HeadingPitchRoll(heading, pitch, roll) {
  this.heading = heading ?? 0;
  this.pitch = pitch ?? 0;
  this.roll = roll ?? 0;
}
HeadingPitchRoll.fromQuaternion = function(quaternion, result) {
  if (!defined_default(quaternion)) {
    throw new DeveloperError_default("quaternion is required");
  }
  if (!defined_default(result)) {
    result = new HeadingPitchRoll();
  }
  const test = 2 * (quaternion.w * quaternion.y - quaternion.z * quaternion.x);
  const denominatorRoll = 1 - 2 * (quaternion.x * quaternion.x + quaternion.y * quaternion.y);
  const numeratorRoll = 2 * (quaternion.w * quaternion.x + quaternion.y * quaternion.z);
  const denominatorHeading = 1 - 2 * (quaternion.y * quaternion.y + quaternion.z * quaternion.z);
  const numeratorHeading = 2 * (quaternion.w * quaternion.z + quaternion.x * quaternion.y);
  result.heading = -Math.atan2(numeratorHeading, denominatorHeading);
  result.roll = Math.atan2(numeratorRoll, denominatorRoll);
  result.pitch = -Math_default.asinClamped(test);
  return result;
};
HeadingPitchRoll.fromDegrees = function(heading, pitch, roll, result) {
  if (!defined_default(heading)) {
    throw new DeveloperError_default("heading is required");
  }
  if (!defined_default(pitch)) {
    throw new DeveloperError_default("pitch is required");
  }
  if (!defined_default(roll)) {
    throw new DeveloperError_default("roll is required");
  }
  if (!defined_default(result)) {
    result = new HeadingPitchRoll();
  }
  result.heading = heading * Math_default.RADIANS_PER_DEGREE;
  result.pitch = pitch * Math_default.RADIANS_PER_DEGREE;
  result.roll = roll * Math_default.RADIANS_PER_DEGREE;
  return result;
};
HeadingPitchRoll.clone = function(headingPitchRoll, result) {
  if (!defined_default(headingPitchRoll)) {
    return void 0;
  }
  if (!defined_default(result)) {
    return new HeadingPitchRoll(
      headingPitchRoll.heading,
      headingPitchRoll.pitch,
      headingPitchRoll.roll
    );
  }
  result.heading = headingPitchRoll.heading;
  result.pitch = headingPitchRoll.pitch;
  result.roll = headingPitchRoll.roll;
  return result;
};
HeadingPitchRoll.equals = function(left, right) {
  return left === right || defined_default(left) && defined_default(right) && left.heading === right.heading && left.pitch === right.pitch && left.roll === right.roll;
};
HeadingPitchRoll.equalsEpsilon = function(left, right, relativeEpsilon, absoluteEpsilon) {
  return left === right || defined_default(left) && defined_default(right) && Math_default.equalsEpsilon(
    left.heading,
    right.heading,
    relativeEpsilon,
    absoluteEpsilon
  ) && Math_default.equalsEpsilon(
    left.pitch,
    right.pitch,
    relativeEpsilon,
    absoluteEpsilon
  ) && Math_default.equalsEpsilon(
    left.roll,
    right.roll,
    relativeEpsilon,
    absoluteEpsilon
  );
};
HeadingPitchRoll.prototype.clone = function(result) {
  return HeadingPitchRoll.clone(this, result);
};
HeadingPitchRoll.prototype.equals = function(right) {
  return HeadingPitchRoll.equals(this, right);
};
HeadingPitchRoll.prototype.equalsEpsilon = function(right, relativeEpsilon, absoluteEpsilon) {
  return HeadingPitchRoll.equalsEpsilon(
    this,
    right,
    relativeEpsilon,
    absoluteEpsilon
  );
};
HeadingPitchRoll.prototype.toString = function() {
  return `(${this.heading}, ${this.pitch}, ${this.roll})`;
};
var HeadingPitchRoll_default = HeadingPitchRoll;

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
var lerpScratch4 = new Quaternion();
Quaternion.lerp = function(start, end, t, result) {
  Check_default.typeOf.object("start", start);
  Check_default.typeOf.object("end", end);
  Check_default.typeOf.number("t", t);
  Check_default.typeOf.object("result", result);
  lerpScratch4 = Quaternion.multiplyByScalar(end, t, lerpScratch4);
  result = Quaternion.multiplyByScalar(start, 1 - t, result);
  return Quaternion.add(lerpScratch4, result, result);
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

// packages/core/Source/FixedFrameTransforms.js
var FixedFrameTransforms = {};
var vectorProductLocalFrame = {
  up: {
    south: "east",
    north: "west",
    west: "south",
    east: "north"
  },
  down: {
    south: "west",
    north: "east",
    west: "north",
    east: "south"
  },
  south: {
    up: "west",
    down: "east",
    west: "down",
    east: "up"
  },
  north: {
    up: "east",
    down: "west",
    west: "up",
    east: "down"
  },
  west: {
    up: "north",
    down: "south",
    north: "down",
    south: "up"
  },
  east: {
    up: "south",
    down: "north",
    north: "up",
    south: "down"
  }
};
var degeneratePositionLocalFrame = {
  north: [-1, 0, 0],
  east: [0, 1, 0],
  up: [0, 0, 1],
  south: [1, 0, 0],
  west: [0, -1, 0],
  down: [0, 0, -1]
};
var localFrameToFixedFrameCache = {};
var scratchCalculateCartesian = {
  east: new Cartesian3_default(),
  north: new Cartesian3_default(),
  up: new Cartesian3_default(),
  west: new Cartesian3_default(),
  south: new Cartesian3_default(),
  down: new Cartesian3_default()
};
var scratchFirstCartesian = new Cartesian3_default();
var scratchSecondCartesian = new Cartesian3_default();
var scratchThirdCartesian = new Cartesian3_default();
FixedFrameTransforms.localFrameToFixedFrameGenerator = function(firstAxis, secondAxis) {
  if (!vectorProductLocalFrame.hasOwnProperty(firstAxis) || !vectorProductLocalFrame[firstAxis].hasOwnProperty(secondAxis)) {
    throw new DeveloperError_default(
      "firstAxis and secondAxis must be east, north, up, west, south or down."
    );
  }
  const thirdAxis = vectorProductLocalFrame[firstAxis][secondAxis];
  const hashAxis = firstAxis + secondAxis;
  if (defined_default(localFrameToFixedFrameCache[hashAxis])) {
    return localFrameToFixedFrameCache[hashAxis];
  }
  const resultat = function(origin, ellipsoid, result) {
    if (!defined_default(origin)) {
      throw new DeveloperError_default("origin is required.");
    }
    if (isNaN(origin.x) || isNaN(origin.y) || isNaN(origin.z)) {
      throw new DeveloperError_default("origin has a NaN component");
    }
    if (!defined_default(result)) {
      result = new Matrix4_default();
    }
    if (Cartesian3_default.equalsEpsilon(origin, Cartesian3_default.ZERO, Math_default.EPSILON14)) {
      Cartesian3_default.unpack(
        degeneratePositionLocalFrame[firstAxis],
        0,
        scratchFirstCartesian
      );
      Cartesian3_default.unpack(
        degeneratePositionLocalFrame[secondAxis],
        0,
        scratchSecondCartesian
      );
      Cartesian3_default.unpack(
        degeneratePositionLocalFrame[thirdAxis],
        0,
        scratchThirdCartesian
      );
    } else if (Math_default.equalsEpsilon(origin.x, 0, Math_default.EPSILON14) && Math_default.equalsEpsilon(origin.y, 0, Math_default.EPSILON14)) {
      const sign2 = Math_default.sign(origin.z);
      Cartesian3_default.unpack(
        degeneratePositionLocalFrame[firstAxis],
        0,
        scratchFirstCartesian
      );
      if (firstAxis !== "east" && firstAxis !== "west") {
        Cartesian3_default.multiplyByScalar(
          scratchFirstCartesian,
          sign2,
          scratchFirstCartesian
        );
      }
      Cartesian3_default.unpack(
        degeneratePositionLocalFrame[secondAxis],
        0,
        scratchSecondCartesian
      );
      if (secondAxis !== "east" && secondAxis !== "west") {
        Cartesian3_default.multiplyByScalar(
          scratchSecondCartesian,
          sign2,
          scratchSecondCartesian
        );
      }
      Cartesian3_default.unpack(
        degeneratePositionLocalFrame[thirdAxis],
        0,
        scratchThirdCartesian
      );
      if (thirdAxis !== "east" && thirdAxis !== "west") {
        Cartesian3_default.multiplyByScalar(
          scratchThirdCartesian,
          sign2,
          scratchThirdCartesian
        );
      }
    } else {
      ellipsoid = ellipsoid ?? Ellipsoid_default.default;
      ellipsoid.geodeticSurfaceNormal(origin, scratchCalculateCartesian.up);
      const up = scratchCalculateCartesian.up;
      const east = scratchCalculateCartesian.east;
      east.x = -origin.y;
      east.y = origin.x;
      east.z = 0;
      Cartesian3_default.normalize(east, scratchCalculateCartesian.east);
      Cartesian3_default.cross(up, east, scratchCalculateCartesian.north);
      Cartesian3_default.multiplyByScalar(
        scratchCalculateCartesian.up,
        -1,
        scratchCalculateCartesian.down
      );
      Cartesian3_default.multiplyByScalar(
        scratchCalculateCartesian.east,
        -1,
        scratchCalculateCartesian.west
      );
      Cartesian3_default.multiplyByScalar(
        scratchCalculateCartesian.north,
        -1,
        scratchCalculateCartesian.south
      );
      scratchFirstCartesian = scratchCalculateCartesian[firstAxis];
      scratchSecondCartesian = scratchCalculateCartesian[secondAxis];
      scratchThirdCartesian = scratchCalculateCartesian[thirdAxis];
    }
    result[0] = scratchFirstCartesian.x;
    result[1] = scratchFirstCartesian.y;
    result[2] = scratchFirstCartesian.z;
    result[3] = 0;
    result[4] = scratchSecondCartesian.x;
    result[5] = scratchSecondCartesian.y;
    result[6] = scratchSecondCartesian.z;
    result[7] = 0;
    result[8] = scratchThirdCartesian.x;
    result[9] = scratchThirdCartesian.y;
    result[10] = scratchThirdCartesian.z;
    result[11] = 0;
    result[12] = origin.x;
    result[13] = origin.y;
    result[14] = origin.z;
    result[15] = 1;
    return result;
  };
  localFrameToFixedFrameCache[hashAxis] = resultat;
  return resultat;
};
FixedFrameTransforms.eastNorthUpToFixedFrame = FixedFrameTransforms.localFrameToFixedFrameGenerator("east", "north");
FixedFrameTransforms.northEastDownToFixedFrame = FixedFrameTransforms.localFrameToFixedFrameGenerator("north", "east");
FixedFrameTransforms.northUpEastToFixedFrame = FixedFrameTransforms.localFrameToFixedFrameGenerator("north", "up");
FixedFrameTransforms.northWestUpToFixedFrame = FixedFrameTransforms.localFrameToFixedFrameGenerator("north", "west");
var scratchHPRQuaternion2 = new Quaternion_default();
var scratchScale = new Cartesian3_default(1, 1, 1);
var scratchHPRMatrix4 = new Matrix4_default();
FixedFrameTransforms.headingPitchRollToFixedFrame = function(origin, headingPitchRoll, ellipsoid, fixedFrameTransform, result) {
  Check_default.typeOf.object("HeadingPitchRoll", headingPitchRoll);
  fixedFrameTransform = fixedFrameTransform ?? FixedFrameTransforms.eastNorthUpToFixedFrame;
  const hprQuaternion = Quaternion_default.fromHeadingPitchRoll(
    headingPitchRoll,
    scratchHPRQuaternion2
  );
  const hprMatrix = Matrix4_default.fromTranslationQuaternionRotationScale(
    Cartesian3_default.ZERO,
    hprQuaternion,
    scratchScale,
    scratchHPRMatrix4
  );
  result = fixedFrameTransform(origin, ellipsoid, result);
  return Matrix4_default.multiply(result, hprMatrix, result);
};
var scratchENUMatrix4 = new Matrix4_default();
var scratchHPRMatrix3 = new Matrix3_default();
FixedFrameTransforms.headingPitchRollQuaternion = function(origin, headingPitchRoll, ellipsoid, fixedFrameTransform, result) {
  Check_default.typeOf.object("HeadingPitchRoll", headingPitchRoll);
  const transform = FixedFrameTransforms.headingPitchRollToFixedFrame(
    origin,
    headingPitchRoll,
    ellipsoid,
    fixedFrameTransform,
    scratchENUMatrix4
  );
  const rotation = Matrix4_default.getMatrix3(transform, scratchHPRMatrix3);
  return Quaternion_default.fromRotationMatrix(rotation, result);
};
var noScale = new Cartesian3_default(1, 1, 1);
var hprCenterScratch = new Cartesian3_default();
var ffScratch = new Matrix4_default();
var hprTransformScratch = new Matrix4_default();
var hprRotationScratch = new Matrix3_default();
var hprQuaternionScratch = new Quaternion_default();
FixedFrameTransforms.fixedFrameToHeadingPitchRoll = function(transform, ellipsoid, fixedFrameTransform, result) {
  Check_default.defined("transform", transform);
  ellipsoid = ellipsoid ?? Ellipsoid_default.default;
  fixedFrameTransform = fixedFrameTransform ?? FixedFrameTransforms.eastNorthUpToFixedFrame;
  if (!defined_default(result)) {
    result = new HeadingPitchRoll_default();
  }
  const center = Matrix4_default.getTranslation(transform, hprCenterScratch);
  if (Cartesian3_default.equals(center, Cartesian3_default.ZERO)) {
    result.heading = 0;
    result.pitch = 0;
    result.roll = 0;
    return result;
  }
  let toFixedFrame = Matrix4_default.inverseTransformation(
    fixedFrameTransform(center, ellipsoid, ffScratch),
    ffScratch
  );
  let transformCopy = Matrix4_default.setScale(transform, noScale, hprTransformScratch);
  transformCopy = Matrix4_default.setTranslation(
    transformCopy,
    Cartesian3_default.ZERO,
    transformCopy
  );
  toFixedFrame = Matrix4_default.multiply(toFixedFrame, transformCopy, toFixedFrame);
  let quaternionRotation = Quaternion_default.fromRotationMatrix(
    Matrix4_default.getMatrix3(toFixedFrame, hprRotationScratch),
    hprQuaternionScratch
  );
  quaternionRotation = Quaternion_default.normalize(
    quaternionRotation,
    quaternionRotation
  );
  return HeadingPitchRoll_default.fromQuaternion(quaternionRotation, result);
};
var pointToWindowCoordinatesTemp = new Cartesian4_default();
FixedFrameTransforms.pointToWindowCoordinates = function(modelViewProjectionMatrix, viewportTransformation, point, result) {
  result = FixedFrameTransforms.pointToGLWindowCoordinates(
    modelViewProjectionMatrix,
    viewportTransformation,
    point,
    result
  );
  result.y = 2 * viewportTransformation[5] - result.y;
  return result;
};
FixedFrameTransforms.pointToGLWindowCoordinates = function(modelViewProjectionMatrix, viewportTransformation, point, result) {
  if (!defined_default(modelViewProjectionMatrix)) {
    throw new DeveloperError_default("modelViewProjectionMatrix is required.");
  }
  if (!defined_default(viewportTransformation)) {
    throw new DeveloperError_default("viewportTransformation is required.");
  }
  if (!defined_default(point)) {
    throw new DeveloperError_default("point is required.");
  }
  if (!defined_default(result)) {
    result = new Cartesian2_default();
  }
  const tmp = pointToWindowCoordinatesTemp;
  Matrix4_default.multiplyByVector(
    modelViewProjectionMatrix,
    Cartesian4_default.fromElements(point.x, point.y, point.z, 1, tmp),
    tmp
  );
  Cartesian4_default.multiplyByScalar(tmp, 1 / tmp.w, tmp);
  Matrix4_default.multiplyByVector(viewportTransformation, tmp, tmp);
  return Cartesian2_default.fromCartesian4(tmp, result);
};
var normalScratch = new Cartesian3_default();
var rightScratch = new Cartesian3_default();
var upScratch = new Cartesian3_default();
FixedFrameTransforms.rotationMatrixFromPositionVelocity = function(position, velocity, ellipsoid, result) {
  if (!defined_default(position)) {
    throw new DeveloperError_default("position is required.");
  }
  if (!defined_default(velocity)) {
    throw new DeveloperError_default("velocity is required.");
  }
  const normal = (ellipsoid ?? Ellipsoid_default.default).geodeticSurfaceNormal(
    position,
    normalScratch
  );
  let right = Cartesian3_default.cross(velocity, normal, rightScratch);
  if (Cartesian3_default.equalsEpsilon(right, Cartesian3_default.ZERO, Math_default.EPSILON6)) {
    right = Cartesian3_default.clone(Cartesian3_default.UNIT_X, right);
  }
  const up = Cartesian3_default.cross(right, velocity, upScratch);
  Cartesian3_default.normalize(up, up);
  Cartesian3_default.cross(velocity, up, right);
  Cartesian3_default.negate(right, right);
  Cartesian3_default.normalize(right, right);
  if (!defined_default(result)) {
    result = new Matrix3_default();
  }
  result[0] = velocity.x;
  result[1] = velocity.y;
  result[2] = velocity.z;
  result[3] = right.x;
  result[4] = right.y;
  result[5] = right.z;
  result[6] = up.x;
  result[7] = up.y;
  result[8] = up.z;
  return result;
};
FixedFrameTransforms.SWIZZLE_3D_TO_2D_MATRIX = Object.freeze(
  new Matrix4_default(
    0,
    0,
    1,
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
    0,
    1
  )
);
var scratchCartographic = new Cartographic_default();
var scratchCartesian3Projection = new Cartesian3_default();
var scratchCenter = new Cartesian3_default();
var scratchRotation = new Matrix3_default();
var scratchFromENU = new Matrix4_default();
var scratchToENU = new Matrix4_default();
FixedFrameTransforms.basisTo2D = function(projection, matrix, result) {
  if (!defined_default(projection)) {
    throw new DeveloperError_default("projection is required.");
  }
  if (!defined_default(matrix)) {
    throw new DeveloperError_default("matrix is required.");
  }
  if (!defined_default(result)) {
    throw new DeveloperError_default("result is required.");
  }
  const rtcCenter = Matrix4_default.getTranslation(matrix, scratchCenter);
  const ellipsoid = projection.ellipsoid;
  let projectedPosition;
  if (Cartesian3_default.equals(rtcCenter, Cartesian3_default.ZERO)) {
    projectedPosition = Cartesian3_default.clone(
      Cartesian3_default.ZERO,
      scratchCartesian3Projection
    );
  } else {
    const cartographic = ellipsoid.cartesianToCartographic(
      rtcCenter,
      scratchCartographic
    );
    projectedPosition = projection.project(
      cartographic,
      scratchCartesian3Projection
    );
    Cartesian3_default.fromElements(
      projectedPosition.z,
      projectedPosition.x,
      projectedPosition.y,
      projectedPosition
    );
  }
  const fromENU = FixedFrameTransforms.eastNorthUpToFixedFrame(
    rtcCenter,
    ellipsoid,
    scratchFromENU
  );
  const toENU = Matrix4_default.inverseTransformation(fromENU, scratchToENU);
  const rotation = Matrix4_default.getMatrix3(matrix, scratchRotation);
  const local = Matrix4_default.multiplyByMatrix3(toENU, rotation, result);
  Matrix4_default.multiply(FixedFrameTransforms.SWIZZLE_3D_TO_2D_MATRIX, local, result);
  Matrix4_default.setTranslation(result, projectedPosition, result);
  return result;
};
FixedFrameTransforms.ellipsoidTo2DModelMatrix = function(projection, center, result) {
  if (!defined_default(projection)) {
    throw new DeveloperError_default("projection is required.");
  }
  if (!defined_default(center)) {
    throw new DeveloperError_default("center is required.");
  }
  if (!defined_default(result)) {
    throw new DeveloperError_default("result is required.");
  }
  const ellipsoid = projection.ellipsoid;
  const fromENU = FixedFrameTransforms.eastNorthUpToFixedFrame(
    center,
    ellipsoid,
    scratchFromENU
  );
  const toENU = Matrix4_default.inverseTransformation(fromENU, scratchToENU);
  const cartographic = ellipsoid.cartesianToCartographic(
    center,
    scratchCartographic
  );
  const projectedPosition = projection.project(
    cartographic,
    scratchCartesian3Projection
  );
  Cartesian3_default.fromElements(
    projectedPosition.z,
    projectedPosition.x,
    projectedPosition.y,
    projectedPosition
  );
  const translation = Matrix4_default.fromTranslation(
    projectedPosition,
    scratchFromENU
  );
  Matrix4_default.multiply(FixedFrameTransforms.SWIZZLE_3D_TO_2D_MATRIX, toENU, result);
  Matrix4_default.multiply(translation, result, result);
  return result;
};
var FixedFrameTransforms_default = FixedFrameTransforms;

// packages/core/Source/Rectangle.js
var Rectangle = class _Rectangle {
  /**
   * @param {number} [west=0.0] The westernmost longitude, in radians, in the range [-Pi, Pi].
   * @param {number} [south=0.0] The southernmost latitude, in radians, in the range [-Pi/2, Pi/2].
   * @param {number} [east=0.0] The easternmost longitude, in radians, in the range [-Pi, Pi].
   * @param {number} [north=0.0] The northernmost latitude, in radians, in the range [-Pi/2, Pi/2].
   */
  constructor(west, south, east, north) {
    this.west = west ?? 0;
    this.south = south ?? 0;
    this.east = east ?? 0;
    this.north = north ?? 0;
  }
  /**
   * Gets the width of the rectangle in radians.
   * @type {number}
   * @readonly
   */
  get width() {
    return _Rectangle.computeWidth(this);
  }
  /**
   * Gets the height of the rectangle in radians.
   * @type {number}
   * @readonly
   */
  get height() {
    return _Rectangle.computeHeight(this);
  }
  /**
   * Stores the provided instance into the provided array.
   *
   * @param {Rectangle} value The value to pack.
   * @param {number[]} array The array to pack into.
   * @param {number} [startingIndex=0] The index into the array at which to start packing the elements.
   *
   * @returns {number[]} The array that was packed into
   */
  static pack(value, array, startingIndex) {
    Check_default.typeOf.object("value", value);
    Check_default.defined("array", array);
    startingIndex = startingIndex ?? 0;
    array[startingIndex++] = value.west;
    array[startingIndex++] = value.south;
    array[startingIndex++] = value.east;
    array[startingIndex] = value.north;
    return array;
  }
  /**
   * Retrieves an instance from a packed array.
   *
   * @param {number[]} array The packed array.
   * @param {number} [startingIndex=0] The starting index of the element to be unpacked.
   * @param {Rectangle} [result] The object into which to store the result.
   * @returns {Rectangle} The modified result parameter or a new Rectangle instance if one was not provided.
   */
  static unpack(array, startingIndex, result) {
    Check_default.defined("array", array);
    startingIndex = startingIndex ?? 0;
    if (!defined_default(result)) {
      result = new _Rectangle();
    }
    result.west = array[startingIndex++];
    result.south = array[startingIndex++];
    result.east = array[startingIndex++];
    result.north = array[startingIndex];
    return result;
  }
  /**
   * Computes the width of a rectangle in radians.
   * @param {Rectangle} rectangle The rectangle to compute the width of.
   * @returns {number} The width.
   */
  static computeWidth(rectangle) {
    Check_default.typeOf.object("rectangle", rectangle);
    let east = rectangle.east;
    const west = rectangle.west;
    if (east < west) {
      east += Math_default.TWO_PI;
    }
    return east - west;
  }
  /**
   * Computes the height of a rectangle in radians.
   * @param {Rectangle} rectangle The rectangle to compute the height of.
   * @returns {number} The height.
   */
  static computeHeight(rectangle) {
    Check_default.typeOf.object("rectangle", rectangle);
    return rectangle.north - rectangle.south;
  }
  /**
   * Creates a rectangle given the boundary longitude and latitude in degrees.
   *
   * @param {number} [west=0.0] The westernmost longitude in degrees in the range [-180.0, 180.0].
   * @param {number} [south=0.0] The southernmost latitude in degrees in the range [-90.0, 90.0].
   * @param {number} [east=0.0] The easternmost longitude in degrees in the range [-180.0, 180.0].
   * @param {number} [north=0.0] The northernmost latitude in degrees in the range [-90.0, 90.0].
   * @param {Rectangle} [result] The object onto which to store the result, or undefined if a new instance should be created.
   * @returns {Rectangle} The modified result parameter or a new Rectangle instance if none was provided.
   *
   * @example
   * const rectangle = Cesium.Rectangle.fromDegrees(0.0, 20.0, 10.0, 30.0);
   */
  static fromDegrees(west, south, east, north, result) {
    west = Math_default.toRadians(west ?? 0);
    south = Math_default.toRadians(south ?? 0);
    east = Math_default.toRadians(east ?? 0);
    north = Math_default.toRadians(north ?? 0);
    if (!defined_default(result)) {
      return new _Rectangle(west, south, east, north);
    }
    result.west = west;
    result.south = south;
    result.east = east;
    result.north = north;
    return result;
  }
  /**
   * Creates a rectangle given the boundary longitude and latitude in radians.
   *
   * @param {number} [west=0.0] The westernmost longitude in radians in the range [-Math.PI, Math.PI].
   * @param {number} [south=0.0] The southernmost latitude in radians in the range [-Math.PI/2, Math.PI/2].
   * @param {number} [east=0.0] The easternmost longitude in radians in the range [-Math.PI, Math.PI].
   * @param {number} [north=0.0] The northernmost latitude in radians in the range [-Math.PI/2, Math.PI/2].
   * @param {Rectangle} [result] The object onto which to store the result, or undefined if a new instance should be created.
   * @returns {Rectangle} The modified result parameter or a new Rectangle instance if none was provided.
   *
   * @example
   * const rectangle = Cesium.Rectangle.fromRadians(0.0, Math.PI/4, Math.PI/8, 3*Math.PI/4);
   */
  static fromRadians(west, south, east, north, result) {
    if (!defined_default(result)) {
      return new _Rectangle(west, south, east, north);
    }
    result.west = west ?? 0;
    result.south = south ?? 0;
    result.east = east ?? 0;
    result.north = north ?? 0;
    return result;
  }
  /**
   * Creates the smallest possible Rectangle that encloses all positions in the provided array.
   *
   * @param {Cartographic[]} cartographics The list of Cartographic instances.
   * @param {Rectangle} [result] The object onto which to store the result, or undefined if a new instance should be created.
   * @returns {Rectangle} The modified result parameter or a new Rectangle instance if none was provided.
   */
  static fromCartographicArray(cartographics, result) {
    Check_default.defined("cartographics", cartographics);
    let west = Number.MAX_VALUE;
    let east = -Number.MAX_VALUE;
    let westOverIDL = Number.MAX_VALUE;
    let eastOverIDL = -Number.MAX_VALUE;
    let south = Number.MAX_VALUE;
    let north = -Number.MAX_VALUE;
    for (let i = 0, len = cartographics.length; i < len; i++) {
      const position = cartographics[i];
      west = Math.min(west, position.longitude);
      east = Math.max(east, position.longitude);
      south = Math.min(south, position.latitude);
      north = Math.max(north, position.latitude);
      const lonAdjusted = position.longitude >= 0 ? position.longitude : position.longitude + Math_default.TWO_PI;
      westOverIDL = Math.min(westOverIDL, lonAdjusted);
      eastOverIDL = Math.max(eastOverIDL, lonAdjusted);
    }
    if (east - west > eastOverIDL - westOverIDL) {
      west = westOverIDL;
      east = eastOverIDL;
      if (east > Math_default.PI) {
        east = east - Math_default.TWO_PI;
      }
      if (west > Math_default.PI) {
        west = west - Math_default.TWO_PI;
      }
    }
    if (!defined_default(result)) {
      return new _Rectangle(west, south, east, north);
    }
    result.west = west;
    result.south = south;
    result.east = east;
    result.north = north;
    return result;
  }
  /**
   * Creates the smallest possible Rectangle that encloses all positions in the provided array.
   *
   * @param {Cartesian3[]} cartesians The list of Cartesian instances.
   * @param {Ellipsoid} [ellipsoid=Ellipsoid.default] The ellipsoid the cartesians are on.
   * @param {Rectangle} [result] The object onto which to store the result, or undefined if a new instance should be created.
   * @returns {Rectangle} The modified result parameter or a new Rectangle instance if none was provided.
   */
  static fromCartesianArray(cartesians, ellipsoid, result) {
    Check_default.defined("cartesians", cartesians);
    ellipsoid = ellipsoid ?? Ellipsoid_default.default;
    let west = Number.MAX_VALUE;
    let east = -Number.MAX_VALUE;
    let westOverIDL = Number.MAX_VALUE;
    let eastOverIDL = -Number.MAX_VALUE;
    let south = Number.MAX_VALUE;
    let north = -Number.MAX_VALUE;
    for (let i = 0, len = cartesians.length; i < len; i++) {
      const position = ellipsoid.cartesianToCartographic(cartesians[i]);
      west = Math.min(west, position.longitude);
      east = Math.max(east, position.longitude);
      south = Math.min(south, position.latitude);
      north = Math.max(north, position.latitude);
      const lonAdjusted = position.longitude >= 0 ? position.longitude : position.longitude + Math_default.TWO_PI;
      westOverIDL = Math.min(westOverIDL, lonAdjusted);
      eastOverIDL = Math.max(eastOverIDL, lonAdjusted);
    }
    if (east - west > eastOverIDL - westOverIDL) {
      west = westOverIDL;
      east = eastOverIDL;
      if (east > Math_default.PI) {
        east = east - Math_default.TWO_PI;
      }
      if (west > Math_default.PI) {
        west = west - Math_default.TWO_PI;
      }
    }
    if (!defined_default(result)) {
      return new _Rectangle(west, south, east, north);
    }
    result.west = west;
    result.south = south;
    result.east = east;
    result.north = north;
    return result;
  }
  /**
   * Create a rectangle from a bounding sphere, ignoring height.
   *
   *
   * @param {BoundingSphere} boundingSphere The bounding sphere.
   * @param {Ellipsoid} [ellipsoid=Ellipsoid.default] The ellipsoid.
   * @param {Rectangle} [result] The object onto which to store the result, or undefined if a new instance should be created.
   * @returns {Rectangle} The modified result parameter or a new Rectangle instance if none was provided.
   */
  static fromBoundingSphere(boundingSphere, ellipsoid, result) {
    Check_default.typeOf.object("boundingSphere", boundingSphere);
    const center = boundingSphere.center;
    const radius = boundingSphere.radius;
    if (!defined_default(ellipsoid)) {
      ellipsoid = Ellipsoid_default.default;
    }
    if (!defined_default(result)) {
      result = new _Rectangle();
    }
    if (Cartesian3_default.equals(center, Cartesian3_default.ZERO)) {
      _Rectangle.clone(_Rectangle.MAX_VALUE, result);
      return result;
    }
    const fromENU = FixedFrameTransforms_default.eastNorthUpToFixedFrame(
      center,
      ellipsoid,
      fromBoundingSphereMatrixScratch
    );
    const east = Matrix4_default.multiplyByPointAsVector(
      fromENU,
      Cartesian3_default.UNIT_X,
      fromBoundingSphereEastScratch
    );
    Cartesian3_default.normalize(east, east);
    const north = Matrix4_default.multiplyByPointAsVector(
      fromENU,
      Cartesian3_default.UNIT_Y,
      fromBoundingSphereNorthScratch
    );
    Cartesian3_default.normalize(north, north);
    Cartesian3_default.multiplyByScalar(north, radius, north);
    Cartesian3_default.multiplyByScalar(east, radius, east);
    const south = Cartesian3_default.negate(north, fromBoundingSphereSouthScratch);
    const west = Cartesian3_default.negate(east, fromBoundingSphereWestScratch);
    const positions = fromBoundingSpherePositionsScratch;
    let corner = positions[0];
    Cartesian3_default.add(center, north, corner);
    corner = positions[1];
    Cartesian3_default.add(center, west, corner);
    corner = positions[2];
    Cartesian3_default.add(center, south, corner);
    corner = positions[3];
    Cartesian3_default.add(center, east, corner);
    positions[4] = center;
    return _Rectangle.fromCartesianArray(positions, ellipsoid, result);
  }
  /**
   * Duplicates a Rectangle.
   *
   * @param {Rectangle} rectangle The rectangle to clone.
   * @param {Rectangle} [result] The object onto which to store the result, or undefined if a new instance should be created.
   * @returns {Rectangle} The modified result parameter or a new Rectangle instance if none was provided. (Returns undefined if rectangle is undefined)
   */
  static clone(rectangle, result) {
    if (!defined_default(rectangle)) {
      return void 0;
    }
    if (!defined_default(result)) {
      return new _Rectangle(
        rectangle.west,
        rectangle.south,
        rectangle.east,
        rectangle.north
      );
    }
    result.west = rectangle.west;
    result.south = rectangle.south;
    result.east = rectangle.east;
    result.north = rectangle.north;
    return result;
  }
  /**
   * Compares the provided Rectangles componentwise and returns
   * <code>true</code> if they pass an absolute or relative tolerance test,
   * <code>false</code> otherwise.
   *
   * @param {Rectangle} [left] The first Rectangle.
   * @param {Rectangle} [right] The second Rectangle.
   * @param {number} [absoluteEpsilon=0] The absolute epsilon tolerance to use for equality testing.
   * @returns {boolean} <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
   */
  static equalsEpsilon(left, right, absoluteEpsilon) {
    absoluteEpsilon = absoluteEpsilon ?? 0;
    return left === right || defined_default(left) && defined_default(right) && Math.abs(left.west - right.west) <= absoluteEpsilon && Math.abs(left.south - right.south) <= absoluteEpsilon && Math.abs(left.east - right.east) <= absoluteEpsilon && Math.abs(left.north - right.north) <= absoluteEpsilon;
  }
  /**
   * Duplicates this Rectangle.
   *
   * @param {Rectangle} [result] The object onto which to store the result.
   * @returns {Rectangle} The modified result parameter or a new Rectangle instance if none was provided.
   */
  clone(result) {
    return _Rectangle.clone(this, result);
  }
  /**
   * Compares the provided Rectangle with this Rectangle componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Rectangle} [other] The Rectangle to compare.
   * @returns {boolean} <code>true</code> if the Rectangles are equal, <code>false</code> otherwise.
   */
  equals(other) {
    return _Rectangle.equals(this, other);
  }
  /**
   * Compares the provided rectangles and returns <code>true</code> if they are equal,
   * <code>false</code> otherwise.
   *
   * @param {Rectangle} [left] The first Rectangle.
   * @param {Rectangle} [right] The second Rectangle.
   * @returns {boolean} <code>true</code> if left and right are equal; otherwise <code>false</code>.
   */
  static equals(left, right) {
    return left === right || defined_default(left) && defined_default(right) && left.west === right.west && left.south === right.south && left.east === right.east && left.north === right.north;
  }
  /**
   * Compares the provided Rectangle with this Rectangle componentwise and returns
   * <code>true</code> if they are within the provided epsilon,
   * <code>false</code> otherwise.
   *
   * @param {Rectangle} [other] The Rectangle to compare.
   * @param {number} [epsilon=0] The epsilon to use for equality testing.
   * @returns {boolean} <code>true</code> if the Rectangles are within the provided epsilon, <code>false</code> otherwise.
   */
  equalsEpsilon(other, epsilon) {
    return _Rectangle.equalsEpsilon(this, other, epsilon);
  }
  /**
   * Checks a Rectangle's properties and throws if they are not in valid ranges.
   *
   * @param {Rectangle} rectangle The rectangle to validate
   *
   * @exception {DeveloperError} <code>north</code> must be in the interval [<code>-Pi/2</code>, <code>Pi/2</code>].
   * @exception {DeveloperError} <code>south</code> must be in the interval [<code>-Pi/2</code>, <code>Pi/2</code>].
   * @exception {DeveloperError} <code>east</code> must be in the interval [<code>-Pi</code>, <code>Pi</code>].
   * @exception {DeveloperError} <code>west</code> must be in the interval [<code>-Pi</code>, <code>Pi</code>].
   * @private
   */
  static _validate(rectangle) {
    Check_default.typeOf.object("rectangle", rectangle);
    const north = rectangle.north;
    Check_default.typeOf.number.greaterThanOrEquals(
      "north",
      north,
      -Math_default.PI_OVER_TWO
    );
    Check_default.typeOf.number.lessThanOrEquals(
      "north",
      north,
      Math_default.PI_OVER_TWO
    );
    const south = rectangle.south;
    Check_default.typeOf.number.greaterThanOrEquals(
      "south",
      south,
      -Math_default.PI_OVER_TWO
    );
    Check_default.typeOf.number.lessThanOrEquals(
      "south",
      south,
      Math_default.PI_OVER_TWO
    );
    const west = rectangle.west;
    Check_default.typeOf.number.greaterThanOrEquals("west", west, -Math.PI);
    Check_default.typeOf.number.lessThanOrEquals("west", west, Math.PI);
    const east = rectangle.east;
    Check_default.typeOf.number.greaterThanOrEquals("east", east, -Math.PI);
    Check_default.typeOf.number.lessThanOrEquals("east", east, Math.PI);
  }
  /**
   * Computes the southwest corner of a rectangle.
   *
   * @param {Rectangle} rectangle The rectangle for which to find the corner
   * @param {Cartographic} [result] The object onto which to store the result.
   * @returns {Cartographic} The modified result parameter or a new Cartographic instance if none was provided.
   */
  static southwest(rectangle, result) {
    Check_default.typeOf.object("rectangle", rectangle);
    if (!defined_default(result)) {
      return new Cartographic_default(rectangle.west, rectangle.south);
    }
    result.longitude = rectangle.west;
    result.latitude = rectangle.south;
    result.height = 0;
    return result;
  }
  /**
   * Computes the northwest corner of a rectangle.
   *
   * @param {Rectangle} rectangle The rectangle for which to find the corner
   * @param {Cartographic} [result] The object onto which to store the result.
   * @returns {Cartographic} The modified result parameter or a new Cartographic instance if none was provided.
   */
  static northwest(rectangle, result) {
    Check_default.typeOf.object("rectangle", rectangle);
    if (!defined_default(result)) {
      return new Cartographic_default(rectangle.west, rectangle.north);
    }
    result.longitude = rectangle.west;
    result.latitude = rectangle.north;
    result.height = 0;
    return result;
  }
  /**
   * Computes the northeast corner of a rectangle.
   *
   * @param {Rectangle} rectangle The rectangle for which to find the corner
   * @param {Cartographic} [result] The object onto which to store the result.
   * @returns {Cartographic} The modified result parameter or a new Cartographic instance if none was provided.
   */
  static northeast(rectangle, result) {
    Check_default.typeOf.object("rectangle", rectangle);
    if (!defined_default(result)) {
      return new Cartographic_default(rectangle.east, rectangle.north);
    }
    result.longitude = rectangle.east;
    result.latitude = rectangle.north;
    result.height = 0;
    return result;
  }
  /**
   * Computes the southeast corner of a rectangle.
   *
   * @param {Rectangle} rectangle The rectangle for which to find the corner
   * @param {Cartographic} [result] The object onto which to store the result.
   * @returns {Cartographic} The modified result parameter or a new Cartographic instance if none was provided.
   */
  static southeast(rectangle, result) {
    Check_default.typeOf.object("rectangle", rectangle);
    if (!defined_default(result)) {
      return new Cartographic_default(rectangle.east, rectangle.south);
    }
    result.longitude = rectangle.east;
    result.latitude = rectangle.south;
    result.height = 0;
    return result;
  }
  /**
   * Computes the center of a rectangle.
   *
   * @param {Rectangle} rectangle The rectangle for which to find the center
   * @param {Cartographic} [result] The object onto which to store the result.
   * @returns {Cartographic} The modified result parameter or a new Cartographic instance if none was provided.
   */
  static center(rectangle, result) {
    Check_default.typeOf.object("rectangle", rectangle);
    let east = rectangle.east;
    const west = rectangle.west;
    if (east < west) {
      east += Math_default.TWO_PI;
    }
    const longitude = Math_default.negativePiToPi((west + east) * 0.5);
    const latitude = (rectangle.south + rectangle.north) * 0.5;
    if (!defined_default(result)) {
      return new Cartographic_default(longitude, latitude);
    }
    result.longitude = longitude;
    result.latitude = latitude;
    result.height = 0;
    return result;
  }
  /**
   * Computes the intersection of two rectangles.  This function assumes that the rectangle's coordinates are
   * latitude and longitude in radians and produces a correct intersection, taking into account the fact that
   * the same angle can be represented with multiple values as well as the wrapping of longitude at the
   * anti-meridian.  For a simple intersection that ignores these factors and can be used with projected
   * coordinates, see {@link Rectangle.simpleIntersection}.
   *
   * @param {Rectangle} rectangle On rectangle to find an intersection
   * @param {Rectangle} otherRectangle Another rectangle to find an intersection
   * @param {Rectangle} [result] The object onto which to store the result.
   * @returns {Rectangle|undefined} The modified result parameter, a new Rectangle instance if none was provided or undefined if there is no intersection.
   */
  static intersection(rectangle, otherRectangle, result) {
    Check_default.typeOf.object("rectangle", rectangle);
    Check_default.typeOf.object("otherRectangle", otherRectangle);
    let rectangleEast = rectangle.east;
    let rectangleWest = rectangle.west;
    let otherRectangleEast = otherRectangle.east;
    let otherRectangleWest = otherRectangle.west;
    if (rectangleEast < rectangleWest && otherRectangleEast > 0) {
      rectangleEast += Math_default.TWO_PI;
    } else if (otherRectangleEast < otherRectangleWest && rectangleEast > 0) {
      otherRectangleEast += Math_default.TWO_PI;
    }
    if (rectangleEast < rectangleWest && otherRectangleWest < 0) {
      otherRectangleWest += Math_default.TWO_PI;
    } else if (otherRectangleEast < otherRectangleWest && rectangleWest < 0) {
      rectangleWest += Math_default.TWO_PI;
    }
    let west = Math_default.negativePiToPi(
      Math.max(rectangleWest, otherRectangleWest)
    );
    const east = Math_default.negativePiToPi(
      Math.min(rectangleEast, otherRectangleEast)
    );
    if (west === Math_default.PI && east < Math_default.PI) {
      west = -Math_default.PI;
    }
    if ((rectangle.west < rectangle.east || otherRectangle.west < otherRectangle.east) && east <= west) {
      return void 0;
    }
    const south = Math.max(rectangle.south, otherRectangle.south);
    const north = Math.min(rectangle.north, otherRectangle.north);
    if (south >= north) {
      return void 0;
    }
    if (!defined_default(result)) {
      return new _Rectangle(west, south, east, north);
    }
    result.west = west;
    result.south = south;
    result.east = east;
    result.north = north;
    return result;
  }
  /**
   * Computes a simple intersection of two rectangles.  Unlike {@link Rectangle.intersection}, this function
   * does not attempt to put the angular coordinates into a consistent range or to account for crossing the
   * anti-meridian.  As such, it can be used for rectangles where the coordinates are not simply latitude
   * and longitude (i.e. projected coordinates).
   *
   * @param {Rectangle} rectangle On rectangle to find an intersection
   * @param {Rectangle} otherRectangle Another rectangle to find an intersection
   * @param {Rectangle} [result] The object onto which to store the result.
   * @returns {Rectangle|undefined} The modified result parameter, a new Rectangle instance if none was provided or undefined if there is no intersection.
   */
  static simpleIntersection(rectangle, otherRectangle, result) {
    Check_default.typeOf.object("rectangle", rectangle);
    Check_default.typeOf.object("otherRectangle", otherRectangle);
    const west = Math.max(rectangle.west, otherRectangle.west);
    const south = Math.max(rectangle.south, otherRectangle.south);
    const east = Math.min(rectangle.east, otherRectangle.east);
    const north = Math.min(rectangle.north, otherRectangle.north);
    if (south >= north || west >= east) {
      return void 0;
    }
    if (!defined_default(result)) {
      return new _Rectangle(west, south, east, north);
    }
    result.west = west;
    result.south = south;
    result.east = east;
    result.north = north;
    return result;
  }
  /**
   * Computes a rectangle that is the union of two rectangles.
   *
   * @param {Rectangle} rectangle A rectangle to enclose in rectangle.
   * @param {Rectangle} otherRectangle A rectangle to enclose in a rectangle.
   * @param {Rectangle} [result] The object onto which to store the result.
   * @returns {Rectangle} The modified result parameter or a new Rectangle instance if none was provided.
   */
  static union(rectangle, otherRectangle, result) {
    Check_default.typeOf.object("rectangle", rectangle);
    Check_default.typeOf.object("otherRectangle", otherRectangle);
    if (!defined_default(result)) {
      result = new _Rectangle();
    }
    let rectangleEast = rectangle.east;
    let rectangleWest = rectangle.west;
    let otherRectangleEast = otherRectangle.east;
    let otherRectangleWest = otherRectangle.west;
    if (rectangleEast < rectangleWest && otherRectangleEast > 0) {
      rectangleEast += Math_default.TWO_PI;
    } else if (otherRectangleEast < otherRectangleWest && rectangleEast > 0) {
      otherRectangleEast += Math_default.TWO_PI;
    }
    if (rectangleEast < rectangleWest && otherRectangleWest < 0) {
      otherRectangleWest += Math_default.TWO_PI;
    } else if (otherRectangleEast < otherRectangleWest && rectangleWest < 0) {
      rectangleWest += Math_default.TWO_PI;
    }
    const west = Math_default.negativePiToPi(
      Math.min(rectangleWest, otherRectangleWest)
    );
    const east = Math_default.negativePiToPi(
      Math.max(rectangleEast, otherRectangleEast)
    );
    result.west = west;
    result.south = Math.min(rectangle.south, otherRectangle.south);
    result.east = east;
    result.north = Math.max(rectangle.north, otherRectangle.north);
    return result;
  }
  /**
   * Computes a rectangle by enlarging the provided rectangle until it contains the provided cartographic.
   *
   * @param {Rectangle} rectangle A rectangle to expand.
   * @param {Cartographic} cartographic A cartographic to enclose in a rectangle.
   * @param {Rectangle} [result] The object onto which to store the result.
   * @returns {Rectangle} The modified result parameter or a new Rectangle instance if one was not provided.
   */
  static expand(rectangle, cartographic, result) {
    Check_default.typeOf.object("rectangle", rectangle);
    Check_default.typeOf.object("cartographic", cartographic);
    if (!defined_default(result)) {
      result = new _Rectangle();
    }
    result.west = Math.min(rectangle.west, cartographic.longitude);
    result.south = Math.min(rectangle.south, cartographic.latitude);
    result.east = Math.max(rectangle.east, cartographic.longitude);
    result.north = Math.max(rectangle.north, cartographic.latitude);
    return result;
  }
  /**
   * Returns true if the cartographic is on or inside the rectangle, false otherwise.
   *
   * @param {Rectangle} rectangle The rectangle
   * @param {Cartographic} cartographic The cartographic to test.
   * @returns {boolean} true if the provided cartographic is inside the rectangle, false otherwise.
   */
  static contains(rectangle, cartographic) {
    Check_default.typeOf.object("rectangle", rectangle);
    Check_default.typeOf.object("cartographic", cartographic);
    let longitude = cartographic.longitude;
    const latitude = cartographic.latitude;
    const west = rectangle.west;
    let east = rectangle.east;
    if (east < west) {
      east += Math_default.TWO_PI;
      if (longitude < 0) {
        longitude += Math_default.TWO_PI;
      }
    }
    return (longitude > west || Math_default.equalsEpsilon(longitude, west, Math_default.EPSILON14)) && (longitude < east || Math_default.equalsEpsilon(longitude, east, Math_default.EPSILON14)) && latitude >= rectangle.south && latitude <= rectangle.north;
  }
  /**
   * Samples a rectangle so that it includes a list of Cartesian points suitable for passing to
   * {@link BoundingSphere#fromPoints}.  Sampling is necessary to account
   * for rectangles that cover the poles or cross the equator.
   *
   * @param {Rectangle} rectangle The rectangle to subsample.
   * @param {Ellipsoid} [ellipsoid=Ellipsoid.default] The ellipsoid to use.
   * @param {number} [surfaceHeight=0.0] The height of the rectangle above the ellipsoid.
   * @param {Cartesian3[]} [result] The array of Cartesians onto which to store the result.
   * @returns {Cartesian3[]} The modified result parameter or a new Array of Cartesians instances if none was provided.
   */
  static subsample(rectangle, ellipsoid, surfaceHeight, result) {
    Check_default.typeOf.object("rectangle", rectangle);
    ellipsoid = ellipsoid ?? Ellipsoid_default.default;
    surfaceHeight = surfaceHeight ?? 0;
    if (!defined_default(result)) {
      result = [];
    }
    let length = 0;
    const north = rectangle.north;
    const south = rectangle.south;
    const east = rectangle.east;
    const west = rectangle.west;
    const lla = subsampleLlaScratch;
    lla.height = surfaceHeight;
    lla.longitude = west;
    lla.latitude = north;
    result[length] = ellipsoid.cartographicToCartesian(lla, result[length]);
    length++;
    lla.longitude = east;
    result[length] = ellipsoid.cartographicToCartesian(lla, result[length]);
    length++;
    lla.latitude = south;
    result[length] = ellipsoid.cartographicToCartesian(lla, result[length]);
    length++;
    lla.longitude = west;
    result[length] = ellipsoid.cartographicToCartesian(lla, result[length]);
    length++;
    if (north < 0) {
      lla.latitude = north;
    } else if (south > 0) {
      lla.latitude = south;
    } else {
      lla.latitude = 0;
    }
    for (let i = 1; i < 8; ++i) {
      lla.longitude = -Math.PI + i * Math_default.PI_OVER_TWO;
      if (_Rectangle.contains(rectangle, lla)) {
        result[length] = ellipsoid.cartographicToCartesian(lla, result[length]);
        length++;
      }
    }
    if (lla.latitude === 0) {
      lla.longitude = west;
      result[length] = ellipsoid.cartographicToCartesian(lla, result[length]);
      length++;
      lla.longitude = east;
      result[length] = ellipsoid.cartographicToCartesian(lla, result[length]);
      length++;
    }
    result.length = length;
    return result;
  }
  /**
   * Computes a subsection of a rectangle from normalized coordinates in the range [0.0, 1.0].
   *
   * @param {Rectangle} rectangle The rectangle to subsection.
   * @param {number} westLerp The west interpolation factor in the range [0.0, 1.0]. Must be less than or equal to eastLerp.
   * @param {number} southLerp The south interpolation factor in the range [0.0, 1.0]. Must be less than or equal to northLerp.
   * @param {number} eastLerp The east interpolation factor in the range [0.0, 1.0]. Must be greater than or equal to westLerp.
   * @param {number} northLerp The north interpolation factor in the range [0.0, 1.0]. Must be greater than or equal to southLerp.
   * @param {Rectangle} [result] The object onto which to store the result.
   * @returns {Rectangle} The modified result parameter or a new Rectangle instance if none was provided.
   */
  static subsection(rectangle, westLerp, southLerp, eastLerp, northLerp, result) {
    Check_default.typeOf.object("rectangle", rectangle);
    Check_default.typeOf.number.greaterThanOrEquals("westLerp", westLerp, 0);
    Check_default.typeOf.number.lessThanOrEquals("westLerp", westLerp, 1);
    Check_default.typeOf.number.greaterThanOrEquals("southLerp", southLerp, 0);
    Check_default.typeOf.number.lessThanOrEquals("southLerp", southLerp, 1);
    Check_default.typeOf.number.greaterThanOrEquals("eastLerp", eastLerp, 0);
    Check_default.typeOf.number.lessThanOrEquals("eastLerp", eastLerp, 1);
    Check_default.typeOf.number.greaterThanOrEquals("northLerp", northLerp, 0);
    Check_default.typeOf.number.lessThanOrEquals("northLerp", northLerp, 1);
    Check_default.typeOf.number.lessThanOrEquals("westLerp", westLerp, eastLerp);
    Check_default.typeOf.number.lessThanOrEquals("southLerp", southLerp, northLerp);
    if (!defined_default(result)) {
      result = new _Rectangle();
    }
    if (rectangle.west <= rectangle.east) {
      const width = rectangle.east - rectangle.west;
      result.west = rectangle.west + westLerp * width;
      result.east = rectangle.west + eastLerp * width;
    } else {
      const width = Math_default.TWO_PI + rectangle.east - rectangle.west;
      result.west = Math_default.negativePiToPi(
        rectangle.west + westLerp * width
      );
      result.east = Math_default.negativePiToPi(
        rectangle.west + eastLerp * width
      );
    }
    const height = rectangle.north - rectangle.south;
    result.south = rectangle.south + southLerp * height;
    result.north = rectangle.south + northLerp * height;
    if (westLerp === 1) {
      result.west = rectangle.east;
    }
    if (eastLerp === 1) {
      result.east = rectangle.east;
    }
    if (southLerp === 1) {
      result.south = rectangle.north;
    }
    if (northLerp === 1) {
      result.north = rectangle.north;
    }
    return result;
  }
};
Rectangle.packedLength = 4;
var fromBoundingSphereMatrixScratch = new Matrix4_default();
var fromBoundingSphereEastScratch = new Cartesian3_default();
var fromBoundingSphereNorthScratch = new Cartesian3_default();
var fromBoundingSphereWestScratch = new Cartesian3_default();
var fromBoundingSphereSouthScratch = new Cartesian3_default();
var fromBoundingSpherePositionsScratch = new Array(5);
for (let n = 0; n < fromBoundingSpherePositionsScratch.length; ++n) {
  fromBoundingSpherePositionsScratch[n] = new Cartesian3_default();
}
var subsampleLlaScratch = new Cartographic_default();
Rectangle.MAX_VALUE = Object.freeze(
  new Rectangle(
    -Math.PI,
    -Math_default.PI_OVER_TWO,
    Math.PI,
    Math_default.PI_OVER_TWO
  )
);
var Rectangle_default = Rectangle;

// packages/core/Source/GeometryType.js
var GeometryType = {
  NONE: 0,
  TRIANGLES: 1,
  LINES: 2,
  POLYLINES: 3
};
Object.freeze(GeometryType);
var GeometryType_default = GeometryType;

// packages/core/Source/PrimitiveType.js
var PrimitiveType = {
  /**
   * Points primitive where each vertex (or index) is a separate point.
   *
   * @type {number}
   * @constant
   */
  POINTS: WebGLConstants_default.POINTS,
  /**
   * Lines primitive where each two vertices (or indices) is a line segment.  Line segments are not necessarily connected.
   *
   * @type {number}
   * @constant
   */
  LINES: WebGLConstants_default.LINES,
  /**
   * Line loop primitive where each vertex (or index) after the first connects a line to
   * the previous vertex, and the last vertex implicitly connects to the first.
   *
   * @type {number}
   * @constant
   */
  LINE_LOOP: WebGLConstants_default.LINE_LOOP,
  /**
   * Line strip primitive where each vertex (or index) after the first connects a line to the previous vertex.
   *
   * @type {number}
   * @constant
   */
  LINE_STRIP: WebGLConstants_default.LINE_STRIP,
  /**
   * Triangles primitive where each three vertices (or indices) is a triangle.  Triangles do not necessarily share edges.
   *
   * @type {number}
   * @constant
   */
  TRIANGLES: WebGLConstants_default.TRIANGLES,
  /**
   * Triangle strip primitive where each vertex (or index) after the first two connect to
   * the previous two vertices forming a triangle.  For example, this can be used to model a wall.
   *
   * @type {number}
   * @constant
   */
  TRIANGLE_STRIP: WebGLConstants_default.TRIANGLE_STRIP,
  /**
   * Triangle fan primitive where each vertex (or index) after the first two connect to
   * the previous vertex and the first vertex forming a triangle.  For example, this can be used
   * to model a cone or circle.
   *
   * @type {number}
   * @constant
   */
  TRIANGLE_FAN: WebGLConstants_default.TRIANGLE_FAN
};
PrimitiveType.isLines = function(primitiveType) {
  return primitiveType === PrimitiveType.LINES || primitiveType === PrimitiveType.LINE_LOOP || primitiveType === PrimitiveType.LINE_STRIP;
};
PrimitiveType.isTriangles = function(primitiveType) {
  return primitiveType === PrimitiveType.TRIANGLES || primitiveType === PrimitiveType.TRIANGLE_STRIP || primitiveType === PrimitiveType.TRIANGLE_FAN;
};
PrimitiveType.validate = function(primitiveType) {
  return primitiveType === PrimitiveType.POINTS || primitiveType === PrimitiveType.LINES || primitiveType === PrimitiveType.LINE_LOOP || primitiveType === PrimitiveType.LINE_STRIP || primitiveType === PrimitiveType.TRIANGLES || primitiveType === PrimitiveType.TRIANGLE_STRIP || primitiveType === PrimitiveType.TRIANGLE_FAN;
};
Object.freeze(PrimitiveType);
var PrimitiveType_default = PrimitiveType;

// packages/core/Source/Geometry.js
function Geometry(options) {
  options = options ?? Frozen_default.EMPTY_OBJECT;
  Check_default.typeOf.object("options.attributes", options.attributes);
  this.attributes = options.attributes;
  this.indices = options.indices;
  this.primitiveType = options.primitiveType ?? PrimitiveType_default.TRIANGLES;
  this.boundingSphere = options.boundingSphere;
  this.geometryType = options.geometryType ?? GeometryType_default.NONE;
  this.boundingSphereCV = options.boundingSphereCV;
  this.offsetAttribute = options.offsetAttribute;
}
Geometry.computeNumberOfVertices = function(geometry) {
  Check_default.typeOf.object("geometry", geometry);
  let numberOfVertices = -1;
  for (const property in geometry.attributes) {
    if (geometry.attributes.hasOwnProperty(property) && defined_default(geometry.attributes[property]) && defined_default(geometry.attributes[property].values)) {
      const attribute = geometry.attributes[property];
      const num = attribute.values.length / attribute.componentsPerAttribute;
      if (numberOfVertices !== num && numberOfVertices !== -1) {
        throw new DeveloperError_default(
          "All attribute lists must have the same number of attributes."
        );
      }
      numberOfVertices = num;
    }
  }
  return numberOfVertices;
};
var rectangleCenterScratch = new Cartographic_default();
var enuCenterScratch = new Cartesian3_default();
var fixedFrameToEnuScratch = new Matrix4_default();
var boundingRectanglePointsCartographicScratch = [
  new Cartographic_default(),
  new Cartographic_default(),
  new Cartographic_default()
];
var boundingRectanglePointsEnuScratch = [
  new Cartesian2_default(),
  new Cartesian2_default(),
  new Cartesian2_default()
];
var points2DScratch = [new Cartesian2_default(), new Cartesian2_default(), new Cartesian2_default()];
var pointEnuScratch = new Cartesian3_default();
var enuRotationScratch = new Quaternion_default();
var enuRotationMatrixScratch = new Matrix4_default();
var rotation2DScratch = new Matrix2_default();
Geometry._textureCoordinateRotationPoints = function(positions, stRotation, ellipsoid, boundingRectangle) {
  let i;
  const rectangleCenter = Rectangle_default.center(
    boundingRectangle,
    rectangleCenterScratch
  );
  const enuCenter = Cartographic_default.toCartesian(
    rectangleCenter,
    ellipsoid,
    enuCenterScratch
  );
  const enuToFixedFrame = FixedFrameTransforms_default.eastNorthUpToFixedFrame(
    enuCenter,
    ellipsoid,
    fixedFrameToEnuScratch
  );
  const fixedFrameToEnu = Matrix4_default.inverse(
    enuToFixedFrame,
    fixedFrameToEnuScratch
  );
  const boundingPointsEnu = boundingRectanglePointsEnuScratch;
  const boundingPointsCarto = boundingRectanglePointsCartographicScratch;
  boundingPointsCarto[0].longitude = boundingRectangle.west;
  boundingPointsCarto[0].latitude = boundingRectangle.south;
  boundingPointsCarto[1].longitude = boundingRectangle.west;
  boundingPointsCarto[1].latitude = boundingRectangle.north;
  boundingPointsCarto[2].longitude = boundingRectangle.east;
  boundingPointsCarto[2].latitude = boundingRectangle.south;
  let posEnu = pointEnuScratch;
  for (i = 0; i < 3; i++) {
    Cartographic_default.toCartesian(boundingPointsCarto[i], ellipsoid, posEnu);
    posEnu = Matrix4_default.multiplyByPointAsVector(fixedFrameToEnu, posEnu, posEnu);
    boundingPointsEnu[i].x = posEnu.x;
    boundingPointsEnu[i].y = posEnu.y;
  }
  const rotation = Quaternion_default.fromAxisAngle(
    Cartesian3_default.UNIT_Z,
    -stRotation,
    enuRotationScratch
  );
  const textureMatrix = Matrix3_default.fromQuaternion(
    rotation,
    enuRotationMatrixScratch
  );
  const positionsLength = positions.length;
  let enuMinX = Number.POSITIVE_INFINITY;
  let enuMinY = Number.POSITIVE_INFINITY;
  let enuMaxX = Number.NEGATIVE_INFINITY;
  let enuMaxY = Number.NEGATIVE_INFINITY;
  for (i = 0; i < positionsLength; i++) {
    posEnu = Matrix4_default.multiplyByPointAsVector(
      fixedFrameToEnu,
      positions[i],
      posEnu
    );
    posEnu = Matrix3_default.multiplyByVector(textureMatrix, posEnu, posEnu);
    enuMinX = Math.min(enuMinX, posEnu.x);
    enuMinY = Math.min(enuMinY, posEnu.y);
    enuMaxX = Math.max(enuMaxX, posEnu.x);
    enuMaxY = Math.max(enuMaxY, posEnu.y);
  }
  const toDesiredInComputed = Matrix2_default.fromRotation(
    stRotation,
    rotation2DScratch
  );
  const points2D = points2DScratch;
  points2D[0].x = enuMinX;
  points2D[0].y = enuMinY;
  points2D[1].x = enuMinX;
  points2D[1].y = enuMaxY;
  points2D[2].x = enuMaxX;
  points2D[2].y = enuMinY;
  const boundingEnuMin = boundingPointsEnu[0];
  const boundingPointsWidth = boundingPointsEnu[2].x - boundingEnuMin.x;
  const boundingPointsHeight = boundingPointsEnu[1].y - boundingEnuMin.y;
  for (i = 0; i < 3; i++) {
    const point2D = points2D[i];
    Matrix2_default.multiplyByVector(toDesiredInComputed, point2D, point2D);
    point2D.x = (point2D.x - boundingEnuMin.x) / boundingPointsWidth;
    point2D.y = (point2D.y - boundingEnuMin.y) / boundingPointsHeight;
  }
  const minXYCorner = points2D[0];
  const maxYCorner = points2D[1];
  const maxXCorner = points2D[2];
  const result = new Array(6);
  Cartesian2_default.pack(minXYCorner, result);
  Cartesian2_default.pack(maxYCorner, result, 2);
  Cartesian2_default.pack(maxXCorner, result, 4);
  return result;
};
var Geometry_default = Geometry;

// packages/core/Source/IndexDatatype.js
var IndexDatatype = {
  /**
   * 8-bit unsigned byte corresponding to <code>UNSIGNED_BYTE</code> and the type
   * of an element in <code>Uint8Array</code>.
   *
   * @type {number}
   * @constant
   */
  UNSIGNED_BYTE: WebGLConstants_default.UNSIGNED_BYTE,
  /**
   * 16-bit unsigned short corresponding to <code>UNSIGNED_SHORT</code> and the type
   * of an element in <code>Uint16Array</code>.
   *
   * @type {number}
   * @constant
   */
  UNSIGNED_SHORT: WebGLConstants_default.UNSIGNED_SHORT,
  /**
   * 32-bit unsigned int corresponding to <code>UNSIGNED_INT</code> and the type
   * of an element in <code>Uint32Array</code>.
   *
   * @type {number}
   * @constant
   */
  UNSIGNED_INT: WebGLConstants_default.UNSIGNED_INT
};
IndexDatatype.getSizeInBytes = function(indexDatatype) {
  switch (indexDatatype) {
    case IndexDatatype.UNSIGNED_BYTE:
      return Uint8Array.BYTES_PER_ELEMENT;
    case IndexDatatype.UNSIGNED_SHORT:
      return Uint16Array.BYTES_PER_ELEMENT;
    case IndexDatatype.UNSIGNED_INT:
      return Uint32Array.BYTES_PER_ELEMENT;
  }
  throw new DeveloperError_default(
    "indexDatatype is required and must be a valid IndexDatatype constant."
  );
};
IndexDatatype.fromSizeInBytes = function(sizeInBytes) {
  switch (sizeInBytes) {
    case 2:
      return IndexDatatype.UNSIGNED_SHORT;
    case 4:
      return IndexDatatype.UNSIGNED_INT;
    case 1:
      return IndexDatatype.UNSIGNED_BYTE;
    //>>includeStart('debug', pragmas.debug);
    default:
      throw new DeveloperError_default(
        "Size in bytes cannot be mapped to an IndexDatatype"
      );
  }
};
IndexDatatype.validate = function(indexDatatype) {
  return defined_default(indexDatatype) && (indexDatatype === IndexDatatype.UNSIGNED_BYTE || indexDatatype === IndexDatatype.UNSIGNED_SHORT || indexDatatype === IndexDatatype.UNSIGNED_INT);
};
IndexDatatype.createTypedArray = function(numberOfVertices, indicesLengthOrArray) {
  if (!defined_default(numberOfVertices)) {
    throw new DeveloperError_default("numberOfVertices is required.");
  }
  if (numberOfVertices >= Math_default.SIXTY_FOUR_KILOBYTES) {
    return new Uint32Array(indicesLengthOrArray);
  }
  return new Uint16Array(indicesLengthOrArray);
};
IndexDatatype.createTypedArrayFromArrayBuffer = function(numberOfVertices, sourceArray, byteOffset, length) {
  if (!defined_default(numberOfVertices)) {
    throw new DeveloperError_default("numberOfVertices is required.");
  }
  if (!defined_default(sourceArray)) {
    throw new DeveloperError_default("sourceArray is required.");
  }
  if (!defined_default(byteOffset)) {
    throw new DeveloperError_default("byteOffset is required.");
  }
  if (numberOfVertices >= Math_default.SIXTY_FOUR_KILOBYTES) {
    return new Uint32Array(sourceArray, byteOffset, length);
  }
  return new Uint16Array(sourceArray, byteOffset, length);
};
IndexDatatype.fromTypedArray = function(array) {
  if (array instanceof Uint8Array) {
    return IndexDatatype.UNSIGNED_BYTE;
  }
  if (array instanceof Uint16Array) {
    return IndexDatatype.UNSIGNED_SHORT;
  }
  if (array instanceof Uint32Array) {
    return IndexDatatype.UNSIGNED_INT;
  }
  throw new DeveloperError_default(
    "array must be a Uint8Array, Uint16Array, or Uint32Array."
  );
};
Object.freeze(IndexDatatype);
var IndexDatatype_default = IndexDatatype;

// packages/core/Source/Color.js
function hue2rgb(m1, m2, h) {
  if (h < 0) {
    h += 1;
  }
  if (h > 1) {
    h -= 1;
  }
  if (h * 6 < 1) {
    return m1 + (m2 - m1) * 6 * h;
  }
  if (h * 2 < 1) {
    return m2;
  }
  if (h * 3 < 2) {
    return m1 + (m2 - m1) * (2 / 3 - h) * 6;
  }
  return m1;
}
var Color = class _Color {
  /**
   * @param {number} [red=1.0] The red component.
   * @param {number} [green=1.0] The green component.
   * @param {number} [blue=1.0] The blue component.
   * @param {number} [alpha=1.0] The alpha component.
   */
  constructor(red, green, blue, alpha) {
    this.red = red ?? 1;
    this.green = green ?? 1;
    this.blue = blue ?? 1;
    this.alpha = alpha ?? 1;
  }
  /**
   * Creates a Color instance from a {@link Cartesian4}. <code>x</code>, <code>y</code>, <code>z</code>,
   * and <code>w</code> map to <code>red</code>, <code>green</code>, <code>blue</code>, and <code>alpha</code>, respectively.
   *
   * @param {Cartesian4} cartesian The source cartesian.
   * @param {Color} [result] The object onto which to store the result.
   * @returns {Color} The modified result parameter or a new Color instance if one was not provided.
   */
  static fromCartesian4(cartesian, result) {
    Check_default.typeOf.object("cartesian", cartesian);
    if (!defined_default(result)) {
      return new _Color(cartesian.x, cartesian.y, cartesian.z, cartesian.w);
    }
    result.red = cartesian.x;
    result.green = cartesian.y;
    result.blue = cartesian.z;
    result.alpha = cartesian.w;
    return result;
  }
  /**
   * Creates a new Color specified using red, green, blue, and alpha values
   * that are in the range of 0 to 255, converting them internally to a range of 0.0 to 1.0.
   *
   * @param {number} [red=255] The red component.
   * @param {number} [green=255] The green component.
   * @param {number} [blue=255] The blue component.
   * @param {number} [alpha=255] The alpha component.
   * @param {Color} [result] The object onto which to store the result.
   * @returns {Color} The modified result parameter or a new Color instance if one was not provided.
   */
  static fromBytes(red, green, blue, alpha, result) {
    red = _Color.byteToFloat(red ?? 255);
    green = _Color.byteToFloat(green ?? 255);
    blue = _Color.byteToFloat(blue ?? 255);
    alpha = _Color.byteToFloat(alpha ?? 255);
    if (!defined_default(result)) {
      return new _Color(red, green, blue, alpha);
    }
    result.red = red;
    result.green = green;
    result.blue = blue;
    result.alpha = alpha;
    return result;
  }
  /**
   * Creates a new Color that has the same red, green, and blue components
   * of the specified color, but with the specified alpha value.
   *
   * @param {Color} color The base color
   * @param {number} alpha The new alpha component.
   * @param {Color} [result] The object onto which to store the result.
   * @returns {Color} The modified result parameter or a new Color instance if one was not provided.
   *
   * @example const translucentRed = Cesium.Color.fromAlpha(Cesium.Color.RED, 0.9);
   */
  static fromAlpha(color, alpha, result) {
    Check_default.typeOf.object("color", color);
    Check_default.typeOf.number("alpha", alpha);
    if (!defined_default(result)) {
      return new _Color(color.red, color.green, color.blue, alpha);
    }
    result.red = color.red;
    result.green = color.green;
    result.blue = color.blue;
    result.alpha = alpha;
    return result;
  }
  /**
   * Creates a new Color from a single numeric unsigned 32-bit RGBA value, using the endianness
   * of the system.
   *
   * @param {number} rgba A single numeric unsigned 32-bit RGBA value.
   * @param {Color} [result] The object to store the result in, if undefined a new instance will be created.
   * @returns {Color} The color object.
   *
   * @example
   * const color = Cesium.Color.fromRgba(0x67ADDFFF);
   *
   * @see Color#toRgba
   */
  static fromRgba(rgba, result) {
    scratchUint32Array[0] = rgba;
    return _Color.fromBytes(
      scratchUint8Array[0],
      scratchUint8Array[1],
      scratchUint8Array[2],
      scratchUint8Array[3],
      result
    );
  }
  /**
   * Creates a Color instance from hue, saturation, and lightness.
   *
   * @param {number} [hue=0] The hue angle 0...1
   * @param {number} [saturation=0] The saturation value 0...1
   * @param {number} [lightness=0] The lightness value 0...1
   * @param {number} [alpha=1.0] The alpha component 0...1
   * @param {Color} [result] The object to store the result in, if undefined a new instance will be created.
   * @returns {Color} The color object.
   *
   * @see {@link http://www.w3.org/TR/css3-color/#hsl-color|CSS color values}
   */
  static fromHsl(hue, saturation, lightness, alpha, result) {
    hue = (hue ?? 0) % 1;
    saturation = saturation ?? 0;
    lightness = lightness ?? 0;
    alpha = alpha ?? 1;
    let red = lightness;
    let green = lightness;
    let blue = lightness;
    if (saturation !== 0) {
      let m2;
      if (lightness < 0.5) {
        m2 = lightness * (1 + saturation);
      } else {
        m2 = lightness + saturation - lightness * saturation;
      }
      const m1 = 2 * lightness - m2;
      red = hue2rgb(m1, m2, hue + 1 / 3);
      green = hue2rgb(m1, m2, hue);
      blue = hue2rgb(m1, m2, hue - 1 / 3);
    }
    if (!defined_default(result)) {
      return new _Color(red, green, blue, alpha);
    }
    result.red = red;
    result.green = green;
    result.blue = blue;
    result.alpha = alpha;
    return result;
  }
  /**
   * Creates a random color using the provided options. For reproducible random colors, you should
   * call {@link CesiumMath#setRandomNumberSeed} once at the beginning of your application.
   *
   * @param {object} [options] Object with the following properties:
   * @param {number} [options.red] If specified, the red component to use instead of a randomized value.
   * @param {number} [options.minimumRed=0.0] The maximum red value to generate if none was specified.
   * @param {number} [options.maximumRed=1.0] The minimum red value to generate if none was specified.
   * @param {number} [options.green] If specified, the green component to use instead of a randomized value.
   * @param {number} [options.minimumGreen=0.0] The maximum green value to generate if none was specified.
   * @param {number} [options.maximumGreen=1.0] The minimum green value to generate if none was specified.
   * @param {number} [options.blue] If specified, the blue component to use instead of a randomized value.
   * @param {number} [options.minimumBlue=0.0] The maximum blue value to generate if none was specified.
   * @param {number} [options.maximumBlue=1.0] The minimum blue value to generate if none was specified.
   * @param {number} [options.alpha] If specified, the alpha component to use instead of a randomized value.
   * @param {number} [options.minimumAlpha=0.0] The maximum alpha value to generate if none was specified.
   * @param {number} [options.maximumAlpha=1.0] The minimum alpha value to generate if none was specified.
   * @param {Color} [result] The object to store the result in, if undefined a new instance will be created.
   * @returns {Color} The modified result parameter or a new instance if result was undefined.
   *
   * @exception {DeveloperError} minimumRed must be less than or equal to maximumRed.
   * @exception {DeveloperError} minimumGreen must be less than or equal to maximumGreen.
   * @exception {DeveloperError} minimumBlue must be less than or equal to maximumBlue.
   * @exception {DeveloperError} minimumAlpha must be less than or equal to maximumAlpha.
   *
   * @example
   * //Create a completely random color
   * const color = Cesium.Color.fromRandom();
   *
   * //Create a random shade of yellow.
   * const color1 = Cesium.Color.fromRandom({
   *     red : 1.0,
   *     green : 1.0,
   *     alpha : 1.0
   * });
   *
   * //Create a random bright color.
   * const color2 = Cesium.Color.fromRandom({
   *     minimumRed : 0.75,
   *     minimumGreen : 0.75,
   *     minimumBlue : 0.75,
   *     alpha : 1.0
   * });
   */
  static fromRandom(options, result) {
    options = options ?? Frozen_default.EMPTY_OBJECT;
    let red = options.red;
    if (!defined_default(red)) {
      const minimumRed = options.minimumRed ?? 0;
      const maximumRed = options.maximumRed ?? 1;
      Check_default.typeOf.number.lessThanOrEquals(
        "minimumRed",
        minimumRed,
        maximumRed
      );
      red = minimumRed + Math_default.nextRandomNumber() * (maximumRed - minimumRed);
    }
    let green = options.green;
    if (!defined_default(green)) {
      const minimumGreen = options.minimumGreen ?? 0;
      const maximumGreen = options.maximumGreen ?? 1;
      Check_default.typeOf.number.lessThanOrEquals(
        "minimumGreen",
        minimumGreen,
        maximumGreen
      );
      green = minimumGreen + Math_default.nextRandomNumber() * (maximumGreen - minimumGreen);
    }
    let blue = options.blue;
    if (!defined_default(blue)) {
      const minimumBlue = options.minimumBlue ?? 0;
      const maximumBlue = options.maximumBlue ?? 1;
      Check_default.typeOf.number.lessThanOrEquals(
        "minimumBlue",
        minimumBlue,
        maximumBlue
      );
      blue = minimumBlue + Math_default.nextRandomNumber() * (maximumBlue - minimumBlue);
    }
    let alpha = options.alpha;
    if (!defined_default(alpha)) {
      const minimumAlpha = options.minimumAlpha ?? 0;
      const maximumAlpha = options.maximumAlpha ?? 1;
      Check_default.typeOf.number.lessThanOrEquals(
        "minimumAlpha",
        minimumAlpha,
        maximumAlpha
      );
      alpha = minimumAlpha + Math_default.nextRandomNumber() * (maximumAlpha - minimumAlpha);
    }
    if (!defined_default(result)) {
      return new _Color(red, green, blue, alpha);
    }
    result.red = red;
    result.green = green;
    result.blue = blue;
    result.alpha = alpha;
    return result;
  }
  /**
   * Creates a Color instance from a CSS color value.
   *
   * @param {string} color The CSS color value in #rgb, #rgba, #rrggbb, #rrggbbaa, rgb(), rgba(), hsl(), or hsla() format.
   * @param {Color} [result] The object to store the result in, if undefined a new instance will be created.
   * @returns {Color} The color object, or undefined if the string was not a valid CSS color.
   *
   *
   * @example
   * const cesiumBlue = Cesium.Color.fromCssColorString('#67ADDF');
   * const green = Cesium.Color.fromCssColorString('green');
   *
   * @see {@link http://www.w3.org/TR/css3-color|CSS color values}
   */
  static fromCssColorString(color, result) {
    Check_default.typeOf.string("color", color);
    if (!defined_default(result)) {
      result = new _Color();
    }
    color = color.trim();
    const namedColor = _Color[color.toUpperCase()];
    if (defined_default(namedColor)) {
      _Color.clone(namedColor, result);
      return result;
    }
    let matches = rgbaMatcher.exec(color);
    if (matches !== null) {
      result.red = parseInt(matches[1], 16) / 15;
      result.green = parseInt(matches[2], 16) / 15;
      result.blue = parseInt(matches[3], 16) / 15;
      result.alpha = parseInt(matches[4] ?? "f", 16) / 15;
      return result;
    }
    matches = rrggbbaaMatcher.exec(color);
    if (matches !== null) {
      result.red = parseInt(matches[1], 16) / 255;
      result.green = parseInt(matches[2], 16) / 255;
      result.blue = parseInt(matches[3], 16) / 255;
      result.alpha = parseInt(matches[4] ?? "ff", 16) / 255;
      return result;
    }
    matches = rgbParenthesesMatcher.exec(color);
    if (matches !== null) {
      result.red = parseFloat(matches[1]) / ("%" === matches[1].substr(-1) ? 100 : 255);
      result.green = parseFloat(matches[2]) / ("%" === matches[2].substr(-1) ? 100 : 255);
      result.blue = parseFloat(matches[3]) / ("%" === matches[3].substr(-1) ? 100 : 255);
      result.alpha = parseFloat(matches[4] ?? "1.0");
      return result;
    }
    matches = hslParenthesesMatcher.exec(color);
    if (matches !== null) {
      return _Color.fromHsl(
        parseFloat(matches[1]) / 360,
        parseFloat(matches[2]) / 100,
        parseFloat(matches[3]) / 100,
        parseFloat(matches[4] ?? "1.0"),
        result
      );
    }
    result = void 0;
    return result;
  }
  /**
   * Stores the provided instance into the provided array.
   *
   * @param {Color} value The value to pack.
   * @param {number[]|TypedArray} array The array to pack into.
   * @param {number} [startingIndex=0] The index into the array at which to start packing the elements.
   *
   * @returns {number[]|TypedArray} The array that was packed into
   */
  static pack(value, array, startingIndex) {
    Check_default.typeOf.object("value", value);
    Check_default.defined("array", array);
    startingIndex = startingIndex ?? 0;
    array[startingIndex++] = value.red;
    array[startingIndex++] = value.green;
    array[startingIndex++] = value.blue;
    array[startingIndex] = value.alpha;
    return array;
  }
  /**
   * Retrieves an instance from a packed array.
   *
   * @param {number[]|TypedArray} array The packed array.
   * @param {number} [startingIndex=0] The starting index of the element to be unpacked.
   * @param {Color} [result] The object into which to store the result.
   * @returns {Color} The modified result parameter or a new Color instance if one was not provided.
   */
  static unpack(array, startingIndex, result) {
    Check_default.defined("array", array);
    startingIndex = startingIndex ?? 0;
    if (!defined_default(result)) {
      result = new _Color();
    }
    result.red = array[startingIndex++];
    result.green = array[startingIndex++];
    result.blue = array[startingIndex++];
    result.alpha = array[startingIndex];
    return result;
  }
  /**
   * Converts a 'byte' color component in the range of 0 to 255 into
   * a 'float' color component in the range of 0 to 1.0.
   *
   * @param {number} number The number to be converted.
   * @returns {number} The converted number.
   */
  static byteToFloat(number) {
    return number / 255;
  }
  /**
   * Converts a 'float' color component in the range of 0 to 1.0 into
   * a 'byte' color component in the range of 0 to 255.
   *
   * @param {number} number The number to be converted.
   * @returns {number} The converted number.
   */
  static floatToByte(number) {
    return number === 1 ? 255 : number * 256 | 0;
  }
  /**
   * Duplicates a Color.
   *
   * @param {Color} color The Color to duplicate.
   * @param {Color} [result] The object to store the result in, if undefined a new instance will be created.
   * @returns {Color} The modified result parameter or a new instance if result was undefined. (Returns undefined if color is undefined)
   */
  static clone(color, result) {
    if (!defined_default(color)) {
      return void 0;
    }
    if (!defined_default(result)) {
      return new _Color(color.red, color.green, color.blue, color.alpha);
    }
    result.red = color.red;
    result.green = color.green;
    result.blue = color.blue;
    result.alpha = color.alpha;
    return result;
  }
  /**
   * Returns true if the first Color equals the second color.
   *
   * @param {Color} [left] The first Color to compare for equality.
   * @param {Color} [right] The second Color to compare for equality.
   * @returns {boolean} <code>true</code> if the Colors are equal; otherwise, <code>false</code>.
   */
  static equals(left, right) {
    return left === right || //
    defined_default(left) && //
    defined_default(right) && //
    left.red === right.red && //
    left.green === right.green && //
    left.blue === right.blue && //
    left.alpha === right.alpha;
  }
  /**
   * Compares the provided Color to the values packed into an array, starting at the provided offset.
   *
   * @param {Color} color The color to compare.
   * @param {number[]} array The packed array.
   * @param {number} offset The offset into the array at which the color starts.
   * @returns {boolean} <code>true</code> if the color matches the packed array values at the offset; otherwise, <code>false</code>.
   * @internal
   */
  static equalsArray(color, array, offset) {
    return color.red === array[offset] && color.green === array[offset + 1] && color.blue === array[offset + 2] && color.alpha === array[offset + 3];
  }
  /**
   * Returns a duplicate of a Color instance.
   *
   * @param {Color} [result] The object to store the result in, if undefined a new instance will be created.
   * @returns {Color} The modified result parameter or a new instance if result was undefined.
   */
  clone(result) {
    return _Color.clone(this, result);
  }
  /**
   * Returns true if this Color equals other.
   *
   * @param {Color} [other] The Color to compare for equality.
   * @returns {boolean} <code>true</code> if the Colors are equal; otherwise, <code>false</code>.
   */
  equals(other) {
    return _Color.equals(this, other);
  }
  /**
   * Returns <code>true</code> if this Color equals other componentwise within the specified epsilon.
   *
   * @param {Color} other The Color to compare for equality.
   * @param {number} [epsilon=0.0] The epsilon to use for equality testing.
   * @returns {boolean} <code>true</code> if the Colors are equal within the specified epsilon; otherwise, <code>false</code>.
   */
  equalsEpsilon(other, epsilon) {
    return this === other || //
    defined_default(other) && //
    Math.abs(this.red - other.red) <= epsilon && //
    Math.abs(this.green - other.green) <= epsilon && //
    Math.abs(this.blue - other.blue) <= epsilon && //
    Math.abs(this.alpha - other.alpha) <= epsilon;
  }
  /**
   * Creates a string representing this Color in the format '(red, green, blue, alpha)'.
   *
   * @returns {string} A string representing this Color in the format '(red, green, blue, alpha)'.
   */
  toString() {
    return `(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }
  /**
   * Creates a string containing the CSS color value for this color.
   *
   * @returns {string} The CSS equivalent of this color.
   *
   * @see {@link http://www.w3.org/TR/css3-color/#rgba-color|CSS RGB or RGBA color values}
   */
  toCssColorString() {
    const red = _Color.floatToByte(this.red);
    const green = _Color.floatToByte(this.green);
    const blue = _Color.floatToByte(this.blue);
    if (this.alpha === 1) {
      return `rgb(${red},${green},${blue})`;
    }
    return `rgba(${red},${green},${blue},${this.alpha})`;
  }
  /**
   * Creates a string containing CSS hex string color value for this color.
   *
   * @returns {string} The CSS hex string equivalent of this color.
   */
  toCssHexString() {
    let r = _Color.floatToByte(this.red).toString(16);
    if (r.length < 2) {
      r = `0${r}`;
    }
    let g = _Color.floatToByte(this.green).toString(16);
    if (g.length < 2) {
      g = `0${g}`;
    }
    let b = _Color.floatToByte(this.blue).toString(16);
    if (b.length < 2) {
      b = `0${b}`;
    }
    if (this.alpha < 1) {
      let hexAlpha = _Color.floatToByte(this.alpha).toString(16);
      if (hexAlpha.length < 2) {
        hexAlpha = `0${hexAlpha}`;
      }
      return `#${r}${g}${b}${hexAlpha}`;
    }
    return `#${r}${g}${b}`;
  }
  /**
   * Converts this color to an array of red, green, blue, and alpha values
   * that are in the range of 0 to 255.
   *
   * @param {number[]} [result] The array to store the result in, if undefined a new instance will be created.
   * @returns {number[]} The modified result parameter or a new instance if result was undefined.
   */
  toBytes(result) {
    const red = _Color.floatToByte(this.red);
    const green = _Color.floatToByte(this.green);
    const blue = _Color.floatToByte(this.blue);
    const alpha = _Color.floatToByte(this.alpha);
    if (!defined_default(result)) {
      return [red, green, blue, alpha];
    }
    result[0] = red;
    result[1] = green;
    result[2] = blue;
    result[3] = alpha;
    return result;
  }
  /**
   * Converts RGBA values in bytes to a single numeric unsigned 32-bit RGBA value, using the endianness
   * of the system.
   *
   * @returns {number} A single numeric unsigned 32-bit RGBA value.
   *
   * @see Color.toRgba
   */
  static bytesToRgba(red, green, blue, alpha) {
    scratchUint8Array[0] = red;
    scratchUint8Array[1] = green;
    scratchUint8Array[2] = blue;
    scratchUint8Array[3] = alpha;
    return scratchUint32Array[0];
  }
  /**
   * Converts this color to a single numeric unsigned 32-bit RGBA value, using the endianness
   * of the system.
   *
   * @returns {number} A single numeric unsigned 32-bit RGBA value.
   *
   *
   * @example
   * const rgba = Cesium.Color.BLUE.toRgba();
   *
   * @see Color.fromRgba
   */
  toRgba() {
    return _Color.bytesToRgba(
      _Color.floatToByte(this.red),
      _Color.floatToByte(this.green),
      _Color.floatToByte(this.blue),
      _Color.floatToByte(this.alpha)
    );
  }
  /**
   * Brightens this color by the provided magnitude.
   *
   * @param {number} magnitude A positive number indicating the amount to brighten.
   * @param {Color} result The object onto which to store the result.
   * @returns {Color} The modified result parameter.
   *
   * @example
   * const brightBlue = Cesium.Color.BLUE.brighten(0.5, new Cesium.Color());
   */
  brighten(magnitude, result) {
    Check_default.typeOf.number("magnitude", magnitude);
    Check_default.typeOf.number.greaterThanOrEquals("magnitude", magnitude, 0);
    Check_default.typeOf.object("result", result);
    magnitude = 1 - magnitude;
    result.red = 1 - (1 - this.red) * magnitude;
    result.green = 1 - (1 - this.green) * magnitude;
    result.blue = 1 - (1 - this.blue) * magnitude;
    result.alpha = this.alpha;
    return result;
  }
  /**
   * Darkens this color by the provided magnitude.
   *
   * @param {number} magnitude A positive number indicating the amount to darken.
   * @param {Color} result The object onto which to store the result.
   * @returns {Color} The modified result parameter.
   *
   * @example
   * const darkBlue = Cesium.Color.BLUE.darken(0.5, new Cesium.Color());
   */
  darken(magnitude, result) {
    Check_default.typeOf.number("magnitude", magnitude);
    Check_default.typeOf.number.greaterThanOrEquals("magnitude", magnitude, 0);
    Check_default.typeOf.object("result", result);
    magnitude = 1 - magnitude;
    result.red = this.red * magnitude;
    result.green = this.green * magnitude;
    result.blue = this.blue * magnitude;
    result.alpha = this.alpha;
    return result;
  }
  /**
   * Creates a new Color that has the same red, green, and blue components
   * as this Color, but with the specified alpha value.
   *
   * @param {number} alpha The new alpha component.
   * @param {Color} [result] The object onto which to store the result.
   * @returns {Color} The modified result parameter or a new Color instance if one was not provided.
   *
   * @example const translucentRed = Cesium.Color.RED.withAlpha(0.9);
   */
  withAlpha(alpha, result) {
    return _Color.fromAlpha(this, alpha, result);
  }
  /**
   * Computes the componentwise sum of two Colors.
   *
   * @param {Color} left The first Color.
   * @param {Color} right The second Color.
   * @param {Color} result The object onto which to store the result.
   * @returns {Color} The modified result parameter.
   */
  static add(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result.red = left.red + right.red;
    result.green = left.green + right.green;
    result.blue = left.blue + right.blue;
    result.alpha = left.alpha + right.alpha;
    return result;
  }
  /**
   * Computes the componentwise difference of two Colors.
   *
   * @param {Color} left The first Color.
   * @param {Color} right The second Color.
   * @param {Color} result The object onto which to store the result.
   * @returns {Color} The modified result parameter.
   */
  static subtract(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result.red = left.red - right.red;
    result.green = left.green - right.green;
    result.blue = left.blue - right.blue;
    result.alpha = left.alpha - right.alpha;
    return result;
  }
  /**
   * Computes the componentwise product of two Colors.
   *
   * @param {Color} left The first Color.
   * @param {Color} right The second Color.
   * @param {Color} result The object onto which to store the result.
   * @returns {Color} The modified result parameter.
   */
  static multiply(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result.red = left.red * right.red;
    result.green = left.green * right.green;
    result.blue = left.blue * right.blue;
    result.alpha = left.alpha * right.alpha;
    return result;
  }
  /**
   * Computes the componentwise quotient of two Colors.
   *
   * @param {Color} left The first Color.
   * @param {Color} right The second Color.
   * @param {Color} result The object onto which to store the result.
   * @returns {Color} The modified result parameter.
   */
  static divide(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result.red = left.red / right.red;
    result.green = left.green / right.green;
    result.blue = left.blue / right.blue;
    result.alpha = left.alpha / right.alpha;
    return result;
  }
  /**
   * Computes the componentwise modulus of two Colors.
   *
   * @param {Color} left The first Color.
   * @param {Color} right The second Color.
   * @param {Color} result The object onto which to store the result.
   * @returns {Color} The modified result parameter.
   */
  static mod(left, right, result) {
    Check_default.typeOf.object("left", left);
    Check_default.typeOf.object("right", right);
    Check_default.typeOf.object("result", result);
    result.red = left.red % right.red;
    result.green = left.green % right.green;
    result.blue = left.blue % right.blue;
    result.alpha = left.alpha % right.alpha;
    return result;
  }
  /**
   * Computes the linear interpolation or extrapolation at t between the provided colors.
   *
   * @param {Color} start The color corresponding to t at 0.0.
   * @param {Color} end The color corresponding to t at 1.0.
   * @param {number} t The point along t at which to interpolate.
   * @param {Color} result The object onto which to store the result.
   * @returns {Color} The modified result parameter.
   */
  static lerp(start, end, t, result) {
    Check_default.typeOf.object("start", start);
    Check_default.typeOf.object("end", end);
    Check_default.typeOf.number("t", t);
    Check_default.typeOf.object("result", result);
    result.red = Math_default.lerp(start.red, end.red, t);
    result.green = Math_default.lerp(start.green, end.green, t);
    result.blue = Math_default.lerp(start.blue, end.blue, t);
    result.alpha = Math_default.lerp(start.alpha, end.alpha, t);
    return result;
  }
  /**
   * Multiplies the provided Color componentwise by the provided scalar.
   *
   * @param {Color} color The Color to be scaled.
   * @param {number} scalar The scalar to multiply with.
   * @param {Color} result The object onto which to store the result.
   * @returns {Color} The modified result parameter.
   */
  static multiplyByScalar(color, scalar, result) {
    Check_default.typeOf.object("color", color);
    Check_default.typeOf.number("scalar", scalar);
    Check_default.typeOf.object("result", result);
    result.red = color.red * scalar;
    result.green = color.green * scalar;
    result.blue = color.blue * scalar;
    result.alpha = color.alpha * scalar;
    return result;
  }
  /**
   * Divides the provided Color componentwise by the provided scalar.
   *
   * @param {Color} color The Color to be divided.
   * @param {number} scalar The scalar to divide with.
   * @param {Color} result The object onto which to store the result.
   * @returns {Color} The modified result parameter.
   */
  static divideByScalar(color, scalar, result) {
    Check_default.typeOf.object("color", color);
    Check_default.typeOf.number("scalar", scalar);
    Check_default.typeOf.object("result", result);
    result.red = color.red / scalar;
    result.green = color.green / scalar;
    result.blue = color.blue / scalar;
    result.alpha = color.alpha / scalar;
    return result;
  }
};
var scratchArrayBuffer = new ArrayBuffer(4);
var scratchUint32Array = new Uint32Array(scratchArrayBuffer);
var scratchUint8Array = new Uint8Array(scratchArrayBuffer);
var rgbaMatcher = /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i;
var rrggbbaaMatcher = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i;
var rgbParenthesesMatcher = /^rgba?\s*\(\s*([0-9.]+%?)\s*[,\s]+\s*([0-9.]+%?)\s*[,\s]+\s*([0-9.]+%?)(?:\s*[,\s/]+\s*([0-9.]+))?\s*\)$/i;
var hslParenthesesMatcher = /^hsla?\s*\(\s*([0-9.]+)\s*[,\s]+\s*([0-9.]+%)\s*[,\s]+\s*([0-9.]+%)(?:\s*[,\s/]+\s*([0-9.]+))?\s*\)$/i;
Color.packedLength = 4;
Color.ALICEBLUE = Object.freeze(Color.fromCssColorString("#F0F8FF"));
Color.ANTIQUEWHITE = Object.freeze(Color.fromCssColorString("#FAEBD7"));
Color.AQUA = Object.freeze(Color.fromCssColorString("#00FFFF"));
Color.AQUAMARINE = Object.freeze(Color.fromCssColorString("#7FFFD4"));
Color.AZURE = Object.freeze(Color.fromCssColorString("#F0FFFF"));
Color.BEIGE = Object.freeze(Color.fromCssColorString("#F5F5DC"));
Color.BISQUE = Object.freeze(Color.fromCssColorString("#FFE4C4"));
Color.BLACK = Object.freeze(Color.fromCssColorString("#000000"));
Color.BLANCHEDALMOND = Object.freeze(Color.fromCssColorString("#FFEBCD"));
Color.BLUE = Object.freeze(Color.fromCssColorString("#0000FF"));
Color.BLUEVIOLET = Object.freeze(Color.fromCssColorString("#8A2BE2"));
Color.BROWN = Object.freeze(Color.fromCssColorString("#A52A2A"));
Color.BURLYWOOD = Object.freeze(Color.fromCssColorString("#DEB887"));
Color.CADETBLUE = Object.freeze(Color.fromCssColorString("#5F9EA0"));
Color.CHARTREUSE = Object.freeze(Color.fromCssColorString("#7FFF00"));
Color.CHOCOLATE = Object.freeze(Color.fromCssColorString("#D2691E"));
Color.CORAL = Object.freeze(Color.fromCssColorString("#FF7F50"));
Color.CORNFLOWERBLUE = Object.freeze(Color.fromCssColorString("#6495ED"));
Color.CORNSILK = Object.freeze(Color.fromCssColorString("#FFF8DC"));
Color.CRIMSON = Object.freeze(Color.fromCssColorString("#DC143C"));
Color.CYAN = Object.freeze(Color.fromCssColorString("#00FFFF"));
Color.DARKBLUE = Object.freeze(Color.fromCssColorString("#00008B"));
Color.DARKCYAN = Object.freeze(Color.fromCssColorString("#008B8B"));
Color.DARKGOLDENROD = Object.freeze(Color.fromCssColorString("#B8860B"));
Color.DARKGRAY = Object.freeze(Color.fromCssColorString("#A9A9A9"));
Color.DARKGREEN = Object.freeze(Color.fromCssColorString("#006400"));
Color.DARKGREY = Color.DARKGRAY;
Color.DARKKHAKI = Object.freeze(Color.fromCssColorString("#BDB76B"));
Color.DARKMAGENTA = Object.freeze(Color.fromCssColorString("#8B008B"));
Color.DARKOLIVEGREEN = Object.freeze(Color.fromCssColorString("#556B2F"));
Color.DARKORANGE = Object.freeze(Color.fromCssColorString("#FF8C00"));
Color.DARKORCHID = Object.freeze(Color.fromCssColorString("#9932CC"));
Color.DARKRED = Object.freeze(Color.fromCssColorString("#8B0000"));
Color.DARKSALMON = Object.freeze(Color.fromCssColorString("#E9967A"));
Color.DARKSEAGREEN = Object.freeze(Color.fromCssColorString("#8FBC8F"));
Color.DARKSLATEBLUE = Object.freeze(Color.fromCssColorString("#483D8B"));
Color.DARKSLATEGRAY = Object.freeze(Color.fromCssColorString("#2F4F4F"));
Color.DARKSLATEGREY = Color.DARKSLATEGRAY;
Color.DARKTURQUOISE = Object.freeze(Color.fromCssColorString("#00CED1"));
Color.DARKVIOLET = Object.freeze(Color.fromCssColorString("#9400D3"));
Color.DEEPPINK = Object.freeze(Color.fromCssColorString("#FF1493"));
Color.DEEPSKYBLUE = Object.freeze(Color.fromCssColorString("#00BFFF"));
Color.DIMGRAY = Object.freeze(Color.fromCssColorString("#696969"));
Color.DIMGREY = Color.DIMGRAY;
Color.DODGERBLUE = Object.freeze(Color.fromCssColorString("#1E90FF"));
Color.FIREBRICK = Object.freeze(Color.fromCssColorString("#B22222"));
Color.FLORALWHITE = Object.freeze(Color.fromCssColorString("#FFFAF0"));
Color.FORESTGREEN = Object.freeze(Color.fromCssColorString("#228B22"));
Color.FUCHSIA = Object.freeze(Color.fromCssColorString("#FF00FF"));
Color.GAINSBORO = Object.freeze(Color.fromCssColorString("#DCDCDC"));
Color.GHOSTWHITE = Object.freeze(Color.fromCssColorString("#F8F8FF"));
Color.GOLD = Object.freeze(Color.fromCssColorString("#FFD700"));
Color.GOLDENROD = Object.freeze(Color.fromCssColorString("#DAA520"));
Color.GRAY = Object.freeze(Color.fromCssColorString("#808080"));
Color.GREEN = Object.freeze(Color.fromCssColorString("#008000"));
Color.GREENYELLOW = Object.freeze(Color.fromCssColorString("#ADFF2F"));
Color.GREY = Color.GRAY;
Color.HONEYDEW = Object.freeze(Color.fromCssColorString("#F0FFF0"));
Color.HOTPINK = Object.freeze(Color.fromCssColorString("#FF69B4"));
Color.INDIANRED = Object.freeze(Color.fromCssColorString("#CD5C5C"));
Color.INDIGO = Object.freeze(Color.fromCssColorString("#4B0082"));
Color.IVORY = Object.freeze(Color.fromCssColorString("#FFFFF0"));
Color.KHAKI = Object.freeze(Color.fromCssColorString("#F0E68C"));
Color.LAVENDER = Object.freeze(Color.fromCssColorString("#E6E6FA"));
Color.LAVENDAR_BLUSH = Object.freeze(Color.fromCssColorString("#FFF0F5"));
Color.LAWNGREEN = Object.freeze(Color.fromCssColorString("#7CFC00"));
Color.LEMONCHIFFON = Object.freeze(Color.fromCssColorString("#FFFACD"));
Color.LIGHTBLUE = Object.freeze(Color.fromCssColorString("#ADD8E6"));
Color.LIGHTCORAL = Object.freeze(Color.fromCssColorString("#F08080"));
Color.LIGHTCYAN = Object.freeze(Color.fromCssColorString("#E0FFFF"));
Color.LIGHTGOLDENRODYELLOW = Object.freeze(Color.fromCssColorString("#FAFAD2"));
Color.LIGHTGRAY = Object.freeze(Color.fromCssColorString("#D3D3D3"));
Color.LIGHTGREEN = Object.freeze(Color.fromCssColorString("#90EE90"));
Color.LIGHTGREY = Color.LIGHTGRAY;
Color.LIGHTPINK = Object.freeze(Color.fromCssColorString("#FFB6C1"));
Color.LIGHTSEAGREEN = Object.freeze(Color.fromCssColorString("#20B2AA"));
Color.LIGHTSKYBLUE = Object.freeze(Color.fromCssColorString("#87CEFA"));
Color.LIGHTSLATEGRAY = Object.freeze(Color.fromCssColorString("#778899"));
Color.LIGHTSLATEGREY = Color.LIGHTSLATEGRAY;
Color.LIGHTSTEELBLUE = Object.freeze(Color.fromCssColorString("#B0C4DE"));
Color.LIGHTYELLOW = Object.freeze(Color.fromCssColorString("#FFFFE0"));
Color.LIME = Object.freeze(Color.fromCssColorString("#00FF00"));
Color.LIMEGREEN = Object.freeze(Color.fromCssColorString("#32CD32"));
Color.LINEN = Object.freeze(Color.fromCssColorString("#FAF0E6"));
Color.MAGENTA = Object.freeze(Color.fromCssColorString("#FF00FF"));
Color.MAROON = Object.freeze(Color.fromCssColorString("#800000"));
Color.MEDIUMAQUAMARINE = Object.freeze(Color.fromCssColorString("#66CDAA"));
Color.MEDIUMBLUE = Object.freeze(Color.fromCssColorString("#0000CD"));
Color.MEDIUMORCHID = Object.freeze(Color.fromCssColorString("#BA55D3"));
Color.MEDIUMPURPLE = Object.freeze(Color.fromCssColorString("#9370DB"));
Color.MEDIUMSEAGREEN = Object.freeze(Color.fromCssColorString("#3CB371"));
Color.MEDIUMSLATEBLUE = Object.freeze(Color.fromCssColorString("#7B68EE"));
Color.MEDIUMSPRINGGREEN = Object.freeze(Color.fromCssColorString("#00FA9A"));
Color.MEDIUMTURQUOISE = Object.freeze(Color.fromCssColorString("#48D1CC"));
Color.MEDIUMVIOLETRED = Object.freeze(Color.fromCssColorString("#C71585"));
Color.MIDNIGHTBLUE = Object.freeze(Color.fromCssColorString("#191970"));
Color.MINTCREAM = Object.freeze(Color.fromCssColorString("#F5FFFA"));
Color.MISTYROSE = Object.freeze(Color.fromCssColorString("#FFE4E1"));
Color.MOCCASIN = Object.freeze(Color.fromCssColorString("#FFE4B5"));
Color.NAVAJOWHITE = Object.freeze(Color.fromCssColorString("#FFDEAD"));
Color.NAVY = Object.freeze(Color.fromCssColorString("#000080"));
Color.OLDLACE = Object.freeze(Color.fromCssColorString("#FDF5E6"));
Color.OLIVE = Object.freeze(Color.fromCssColorString("#808000"));
Color.OLIVEDRAB = Object.freeze(Color.fromCssColorString("#6B8E23"));
Color.ORANGE = Object.freeze(Color.fromCssColorString("#FFA500"));
Color.ORANGERED = Object.freeze(Color.fromCssColorString("#FF4500"));
Color.ORCHID = Object.freeze(Color.fromCssColorString("#DA70D6"));
Color.PALEGOLDENROD = Object.freeze(Color.fromCssColorString("#EEE8AA"));
Color.PALEGREEN = Object.freeze(Color.fromCssColorString("#98FB98"));
Color.PALETURQUOISE = Object.freeze(Color.fromCssColorString("#AFEEEE"));
Color.PALEVIOLETRED = Object.freeze(Color.fromCssColorString("#DB7093"));
Color.PAPAYAWHIP = Object.freeze(Color.fromCssColorString("#FFEFD5"));
Color.PEACHPUFF = Object.freeze(Color.fromCssColorString("#FFDAB9"));
Color.PERU = Object.freeze(Color.fromCssColorString("#CD853F"));
Color.PINK = Object.freeze(Color.fromCssColorString("#FFC0CB"));
Color.PLUM = Object.freeze(Color.fromCssColorString("#DDA0DD"));
Color.POWDERBLUE = Object.freeze(Color.fromCssColorString("#B0E0E6"));
Color.PURPLE = Object.freeze(Color.fromCssColorString("#800080"));
Color.RED = Object.freeze(Color.fromCssColorString("#FF0000"));
Color.ROSYBROWN = Object.freeze(Color.fromCssColorString("#BC8F8F"));
Color.ROYALBLUE = Object.freeze(Color.fromCssColorString("#4169E1"));
Color.SADDLEBROWN = Object.freeze(Color.fromCssColorString("#8B4513"));
Color.SALMON = Object.freeze(Color.fromCssColorString("#FA8072"));
Color.SANDYBROWN = Object.freeze(Color.fromCssColorString("#F4A460"));
Color.SEAGREEN = Object.freeze(Color.fromCssColorString("#2E8B57"));
Color.SEASHELL = Object.freeze(Color.fromCssColorString("#FFF5EE"));
Color.SIENNA = Object.freeze(Color.fromCssColorString("#A0522D"));
Color.SILVER = Object.freeze(Color.fromCssColorString("#C0C0C0"));
Color.SKYBLUE = Object.freeze(Color.fromCssColorString("#87CEEB"));
Color.SLATEBLUE = Object.freeze(Color.fromCssColorString("#6A5ACD"));
Color.SLATEGRAY = Object.freeze(Color.fromCssColorString("#708090"));
Color.SLATEGREY = Color.SLATEGRAY;
Color.SNOW = Object.freeze(Color.fromCssColorString("#FFFAFA"));
Color.SPRINGGREEN = Object.freeze(Color.fromCssColorString("#00FF7F"));
Color.STEELBLUE = Object.freeze(Color.fromCssColorString("#4682B4"));
Color.TAN = Object.freeze(Color.fromCssColorString("#D2B48C"));
Color.TEAL = Object.freeze(Color.fromCssColorString("#008080"));
Color.THISTLE = Object.freeze(Color.fromCssColorString("#D8BFD8"));
Color.TOMATO = Object.freeze(Color.fromCssColorString("#FF6347"));
Color.TURQUOISE = Object.freeze(Color.fromCssColorString("#40E0D0"));
Color.VIOLET = Object.freeze(Color.fromCssColorString("#EE82EE"));
Color.WHEAT = Object.freeze(Color.fromCssColorString("#F5DEB3"));
Color.WHITE = Object.freeze(Color.fromCssColorString("#FFFFFF"));
Color.WHITESMOKE = Object.freeze(Color.fromCssColorString("#F5F5F5"));
Color.YELLOW = Object.freeze(Color.fromCssColorString("#FFFF00"));
Color.YELLOWGREEN = Object.freeze(Color.fromCssColorString("#9ACD32"));
Color.TRANSPARENT = Object.freeze(new Color(0, 0, 0, 0));
var Color_default = Color;

// packages/core/Source/createGuid.js
function createGuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v2 = c === "x" ? r : r & 3 | 8;
    return v2.toString(16);
  });
}
var createGuid_default = createGuid;

// packages/core/Source/destroyObject.js
function returnTrue() {
  return true;
}
function destroyObject(object, message) {
  message = message ?? "This object was destroyed, i.e., destroy() was called.";
  function throwOnDestroyed() {
    throw new DeveloperError_default(message);
  }
  for (const key in object) {
    if (typeof object[key] === "function") {
      object[key] = throwOnDestroyed;
    }
  }
  object.isDestroyed = returnTrue;
  return void 0;
}
var destroyObject_default = destroyObject;

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
    webglValidation: webglValidation2 = false,
    webglStub: webglStub2 = false,
    release: release2 = false,
    debugCanvasWidth: debugCanvasWidth2,
    debugCanvasHeight: debugCanvasHeight2
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
  if (webglValidation2) {
    window.webglValidation = true;
  }
  if (webglStub2) {
    window.webglStub = true;
  }
  window.debugCanvasWidth = debugCanvasWidth2;
  window.debugCanvasHeight = debugCanvasHeight2;
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

// packages/engine/Source/Renderer/BufferUsage.js
var BufferUsage = {
  STREAM_DRAW: WebGLConstants_default.STREAM_DRAW,
  STATIC_DRAW: WebGLConstants_default.STATIC_DRAW,
  DYNAMIC_DRAW: WebGLConstants_default.DYNAMIC_DRAW,
  DYNAMIC_READ: WebGLConstants_default.DYNAMIC_READ
};
BufferUsage.validate = function(bufferUsage) {
  return bufferUsage === BufferUsage.STREAM_DRAW || bufferUsage === BufferUsage.STATIC_DRAW || bufferUsage === BufferUsage.DYNAMIC_DRAW || bufferUsage === BufferUsage.DYNAMIC_READ;
};
Object.freeze(BufferUsage);
var BufferUsage_default = BufferUsage;

// packages/engine/Source/Renderer/ContextLimits.js
var ContextLimits = {
  _maximumCombinedTextureImageUnits: 0,
  _maximumCubeMapSize: 0,
  _maximumFragmentUniformVectors: 0,
  _maximumTextureImageUnits: 0,
  _maximumRenderbufferSize: 0,
  _maximumTextureSize: 0,
  _maximum3DTextureSize: 0,
  _maximumVaryingVectors: 0,
  _maximumVertexAttributes: 0,
  _maximumVertexTextureImageUnits: 0,
  _maximumVertexUniformVectors: 0,
  _minimumAliasedLineWidth: 0,
  _maximumAliasedLineWidth: 0,
  _minimumAliasedPointSize: 0,
  _maximumAliasedPointSize: 0,
  _maximumViewportWidth: 0,
  _maximumViewportHeight: 0,
  _maximumTextureFilterAnisotropy: 0,
  _maximumDrawBuffers: 0,
  _maximumColorAttachments: 0,
  _maximumSamples: 0,
  _highpFloatSupported: false,
  _highpIntSupported: false
};
Object.defineProperties(ContextLimits, {
  /**
   * The maximum number of texture units that can be used from the vertex and fragment
   * shader with this WebGL implementation.
   * If both shaders access the same texture unit, this counts as two texture units.
   * The minimum in WebGL2 contexts is 32, or 8 in WebGL1 contexts.
   * @memberof ContextLimits
   * @type {number}
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glGet.xhtml|glGet in OpenGL ES 3.0} with <code>MAX_COMBINED_TEXTURE_IMAGE_UNITS</code>.
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es2.0/xhtml/glGet.xml|glGet in OpenGL ES 2.0} for WebGL1 contexts.
   */
  maximumCombinedTextureImageUnits: {
    get: function() {
      return ContextLimits._maximumCombinedTextureImageUnits;
    }
  },
  /**
   * The approximate maximum cube map width and height supported by this WebGL implementation.
   * The minimum in WebGL2 contexts is 2048, but most desktop and laptop implementations will support much larger sizes like 8192.
   * The minimum in WebGL1 contexts is 16.
   * @memberof ContextLimits
   * @type {number}
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glGet.xhtml|glGet in OpenGL ES 3.0} with <code>MAX_CUBE_MAP_TEXTURE_SIZE</code>.
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es2.0/xhtml/glGet.xml|glGet in OpenGL ES 2.0} for WebGL1 contexts.
   */
  maximumCubeMapSize: {
    get: function() {
      return ContextLimits._maximumCubeMapSize;
    }
  },
  /**
   * The maximum number of <code>vec4</code>, <code>ivec4</code>, and <code>bvec4</code>
   * uniforms that can be used by a fragment shader with this WebGL implementation.
   * The minimum in WebGL2 contexts is 224, or 16 in WebGL1 contexts.
   * @memberof ContextLimits
   * @type {number}
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glGet.xhtml|glGet in OpenGL ES 3.0} with <code>MAX_FRAGMENT_UNIFORM_VECTORS</code>.
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es2.0/xhtml/glGet.xml|glGet in OpenGL ES 2.0} for WebGL1 contexts.
   */
  maximumFragmentUniformVectors: {
    get: function() {
      return ContextLimits._maximumFragmentUniformVectors;
    }
  },
  /**
   * The maximum number of texture units that can be used from the fragment shader with this WebGL implementation.
   * The minimum in WebGL2 contexts is 16, or 8 in WebGL1 contexts.
   * @memberof ContextLimits
   * @type {number}
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glGet.xhtml|glGet in OpenGL ES 3.0} with <code>MAX_TEXTURE_IMAGE_UNITS</code>.
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es2.0/xhtml/glGet.xml|glGet in OpenGL ES 2.0} for WebGL1 contexts.
   */
  maximumTextureImageUnits: {
    get: function() {
      return ContextLimits._maximumTextureImageUnits;
    }
  },
  /**
   * The maximum renderbuffer width and height supported by this WebGL implementation.
   * The minimum in WebGL2 contexts is 2048, but most desktop and laptop implementations will support much larger sizes like 8192.
   * The minimum in WebGL1 contexts is 1.
   * @memberof ContextLimits
   * @type {number}
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glGet.xhtml|glGet in OpenGL ES 3.0} with <code>MAX_RENDERBUFFER_SIZE</code>.
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es2.0/xhtml/glGet.xml|glGet in OpenGL ES 2.0} for WebGL1 contexts.
   */
  maximumRenderbufferSize: {
    get: function() {
      return ContextLimits._maximumRenderbufferSize;
    }
  },
  /**
   * The approximate maximum texture width and height supported by this WebGL implementation.
   * The minimum in WebGL2 contexts is 2048, but most desktop and laptop implementations will support much larger sizes like 8192.
   * The minimum in WebGL1 contexts is 64.
   * @memberof ContextLimits
   * @type {number}
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glGet.xhtml|glGet in OpenGL ES 3.0} with <code>MAX_TEXTURE_SIZE</code>.
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es2.0/xhtml/glGet.xml|glGet in OpenGL ES 2.0} for WebGL1 contexts.
   */
  maximumTextureSize: {
    get: function() {
      return ContextLimits._maximumTextureSize;
    }
  },
  /**
   * The approximate maximum texture width, height, and depth supported by this WebGL2 implementation.
   * The minimum is 256, but most desktop and laptop implementations will support much larger sizes like 2048.
   * 3D textures are not supported in WebGL1 contexts.
   * @memberof ContextLimits
   * @type {number}
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glGet.xhtml|glGet in OpenGL ES 3.0} with <code>MAX_3D_TEXTURE_SIZE</code>.
   */
  maximum3DTextureSize: {
    get: function() {
      return ContextLimits._maximum3DTextureSize;
    }
  },
  /**
   * The maximum number of <code>vec4</code> varying variables supported by this WebGL implementation.
   * The minimum is 15 in WebGL2 contexts, or 8 in WebGL1 contexts. Matrices and arrays count as multiple <code>vec4</code>s.
   * @memberof ContextLimits
   * @type {number}
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glGet.xhtml|glGet in OpenGL ES 3.0} with <code>MAX_VARYING_VECTORS</code>.
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es2.0/xhtml/glGet.xml|glGet in OpenGL ES 2.0} for WebGL1 contexts.
   */
  maximumVaryingVectors: {
    get: function() {
      return ContextLimits._maximumVaryingVectors;
    }
  },
  /**
   * The maximum number of <code>vec4</code> vertex attributes supported by this WebGL implementation.
   * The minimum is 16 in WebGL2 contexts, or 8 in WebGL1 contexts.
   * @memberof ContextLimits
   * @type {number}
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glGet.xhtml|glGet in OpenGL ES 3.0} with <code>MAX_VERTEX_ATTRIBS</code>.
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es2.0/xhtml/glGet.xml|glGet in OpenGL ES 2.0} for WebGL1 contexts.
   */
  maximumVertexAttributes: {
    get: function() {
      return ContextLimits._maximumVertexAttributes;
    }
  },
  /**
   * The maximum number of texture units that can be used from the vertex shader with this WebGL implementation.
   * The minimum is 16 in WebGL2 contexts, or 0 in WebGL1 contexts.
   * @memberof ContextLimits
   * @type {number}
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glGet.xhtml|glGet in OpenGL ES 3.0} with <code>MAX_VERTEX_TEXTURE_IMAGE_UNITS</code>.
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es2.0/xhtml/glGet.xml|glGet in OpenGL ES 2.0} for WebGL1 contexts.
   */
  maximumVertexTextureImageUnits: {
    get: function() {
      return ContextLimits._maximumVertexTextureImageUnits;
    }
  },
  /**
   * The maximum number of <code>vec4</code>, <code>ivec4</code>, and <code>bvec4</code>
   * uniforms that can be used by a vertex shader with this WebGL implementation.
   * The minimum is 256 in WebGL2 contexts, or 128 in WebGL1 contexts.
   * @memberof ContextLimits
   * @type {number}
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glGet.xhtml|glGet in OpenGL ES 3.0} with <code>MAX_VERTEX_UNIFORM_VECTORS</code>.
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es2.0/xhtml/glGet.xml|glGet in OpenGL ES 2.0} for WebGL1 contexts.
   */
  maximumVertexUniformVectors: {
    get: function() {
      return ContextLimits._maximumVertexUniformVectors;
    }
  },
  /**
   * The minimum aliased line width, in pixels, supported by this WebGL implementation. It will be at most one.
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glGet.xhtml|glGet in OpenGL ES 3.0} with <code>ALIASED_LINE_WIDTH_RANGE</code>.
   * @memberof ContextLimits
   * @type {number}
   */
  minimumAliasedLineWidth: {
    get: function() {
      return ContextLimits._minimumAliasedLineWidth;
    }
  },
  /**
   * The maximum aliased line width, in pixels, supported by this WebGL implementation. It will be at least one.
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glGet.xhtml|glGet in OpenGL ES 3.0} with <code>ALIASED_LINE_WIDTH_RANGE</code>.
   * @memberof ContextLimits
   * @type {number}
   */
  maximumAliasedLineWidth: {
    get: function() {
      return ContextLimits._maximumAliasedLineWidth;
    }
  },
  /**
   * The minimum aliased point size, in pixels, supported by this WebGL implementation. It will be at most one.
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glGet.xhtml|glGet in OpenGL ES 3.0} with <code>ALIASED_POINT_SIZE_RANGE</code>.
   * @memberof ContextLimits
   * @type {number}
   */
  minimumAliasedPointSize: {
    get: function() {
      return ContextLimits._minimumAliasedPointSize;
    }
  },
  /**
   * The maximum aliased point size, in pixels, supported by this WebGL implementation. It will be at least one.
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glGet.xhtml|glGet in OpenGL ES 3.0} with <code>ALIASED_POINT_SIZE_RANGE</code>.
   * @memberof ContextLimits
   * @type {number}
   */
  maximumAliasedPointSize: {
    get: function() {
      return ContextLimits._maximumAliasedPointSize;
    }
  },
  /**
   * The maximum supported width of the viewport. It will be at least as large as the visible width of the associated canvas.
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glGet.xhtml|glGet in OpenGL ES 3.0} with <code>MAX_VIEWPORT_DIMS</code>.
   * @memberof ContextLimits
   * @type {number}
   */
  maximumViewportWidth: {
    get: function() {
      return ContextLimits._maximumViewportWidth;
    }
  },
  /**
   * The maximum supported height of the viewport. It will be at least as large as the visible height of the associated canvas.
   * @see {@link https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glGet.xhtml|glGet in OpenGL ES 3.0} with <code>MAX_VIEWPORT_DIMS</code>.
   * @memberof ContextLimits
   * @type {number}
   */
  maximumViewportHeight: {
    get: function() {
      return ContextLimits._maximumViewportHeight;
    }
  },
  /**
   * The maximum degree of anisotropy for texture filtering
   * @memberof ContextLimits
   * @type {number}
   */
  maximumTextureFilterAnisotropy: {
    get: function() {
      return ContextLimits._maximumTextureFilterAnisotropy;
    }
  },
  /**
   * The maximum number of simultaneous outputs that may be written in a fragment shader.
   * @memberof ContextLimits
   * @type {number}
   */
  maximumDrawBuffers: {
    get: function() {
      return ContextLimits._maximumDrawBuffers;
    }
  },
  /**
   * The maximum number of color attachments supported.
   * @memberof ContextLimits
   * @type {number}
   */
  maximumColorAttachments: {
    get: function() {
      return ContextLimits._maximumColorAttachments;
    }
  },
  /**
   * The maximum number of samples supported for multisampling.
   * @memberof ContextLimits
   * @type {number}
   */
  maximumSamples: {
    get: function() {
      return ContextLimits._maximumSamples;
    }
  },
  /**
   * High precision float supported (<code>highp</code>) in fragment shaders.
   * @memberof ContextLimits
   * @type {boolean}
   */
  highpFloatSupported: {
    get: function() {
      return ContextLimits._highpFloatSupported;
    }
  },
  /**
   * High precision int supported (<code>highp</code>) in fragment shaders.
   * @memberof ContextLimits
   * @type {boolean}
   */
  highpIntSupported: {
    get: function() {
      return ContextLimits._highpIntSupported;
    }
  }
});
var ContextLimits_default = ContextLimits;

// packages/engine/Source/Renderer/Buffer.js
function Buffer2(options) {
  options = options ?? Frozen_default.EMPTY_OBJECT;
  Check_default.defined("options.context", options.context);
  if (!defined_default(options.typedArray) && !defined_default(options.sizeInBytes)) {
    throw new DeveloperError_default(
      "Either options.sizeInBytes or options.typedArray is required."
    );
  }
  if (defined_default(options.typedArray) && defined_default(options.sizeInBytes)) {
    throw new DeveloperError_default(
      "Cannot pass in both options.sizeInBytes and options.typedArray."
    );
  }
  if (defined_default(options.typedArray)) {
    Check_default.typeOf.object("options.typedArray", options.typedArray);
    Check_default.typeOf.number(
      "options.typedArray.byteLength",
      options.typedArray.byteLength
    );
  }
  if (!BufferUsage_default.validate(options.usage)) {
    throw new DeveloperError_default("usage is invalid.");
  }
  const gl = options.context._gl;
  const bufferTarget = options.bufferTarget;
  const typedArray = options.typedArray;
  let sizeInBytes = options.sizeInBytes;
  const usage = options.usage;
  const hasArray = defined_default(typedArray);
  if (hasArray) {
    sizeInBytes = typedArray.byteLength;
  }
  Check_default.typeOf.number.greaterThan("sizeInBytes", sizeInBytes, 0);
  const buffer = gl.createBuffer();
  gl.bindBuffer(bufferTarget, buffer);
  gl.bufferData(bufferTarget, hasArray ? typedArray : sizeInBytes, usage);
  gl.bindBuffer(bufferTarget, null);
  this._id = createGuid_default();
  this._gl = gl;
  this._webgl2 = options.context._webgl2;
  this._bufferTarget = bufferTarget;
  this._sizeInBytes = sizeInBytes;
  this._usage = usage;
  this._buffer = buffer;
  this.vertexArrayDestroyable = true;
}
Buffer2.createPixelBuffer = function(options) {
  Check_default.defined("options.context", options.context);
  if (!options.context._webgl2) {
    throw new DeveloperError_default(
      "A WebGL 2 context is required to create PixelBuffers."
    );
  }
  return new Buffer2({
    context: options.context,
    bufferTarget: WebGLConstants_default.PIXEL_PACK_BUFFER,
    typedArray: options.typedArray,
    sizeInBytes: options.sizeInBytes,
    usage: options.usage
  });
};
Buffer2.createVertexBuffer = function(options) {
  Check_default.defined("options.context", options.context);
  return new Buffer2({
    context: options.context,
    bufferTarget: WebGLConstants_default.ARRAY_BUFFER,
    typedArray: options.typedArray,
    sizeInBytes: options.sizeInBytes,
    usage: options.usage
  });
};
Buffer2.createIndexBuffer = function(options) {
  Check_default.defined("options.context", options.context);
  if (!IndexDatatype_default.validate(options.indexDatatype)) {
    throw new DeveloperError_default("Invalid indexDatatype.");
  }
  if (options.indexDatatype === IndexDatatype_default.UNSIGNED_INT && !options.context.elementIndexUint) {
    throw new DeveloperError_default(
      "IndexDatatype.UNSIGNED_INT requires OES_element_index_uint, which is not supported on this system.  Check context.elementIndexUint."
    );
  }
  const context = options.context;
  const indexDatatype = options.indexDatatype;
  const bytesPerIndex = IndexDatatype_default.getSizeInBytes(indexDatatype);
  const buffer = new Buffer2({
    context,
    bufferTarget: WebGLConstants_default.ELEMENT_ARRAY_BUFFER,
    typedArray: options.typedArray,
    sizeInBytes: options.sizeInBytes,
    usage: options.usage
  });
  const numberOfIndices = buffer.sizeInBytes / bytesPerIndex;
  Object.defineProperties(buffer, {
    indexDatatype: {
      get: function() {
        return indexDatatype;
      }
    },
    bytesPerIndex: {
      get: function() {
        return bytesPerIndex;
      }
    },
    numberOfIndices: {
      get: function() {
        return numberOfIndices;
      }
    }
  });
  return buffer;
};
Object.defineProperties(Buffer2.prototype, {
  sizeInBytes: {
    get: function() {
      return this._sizeInBytes;
    }
  },
  usage: {
    get: function() {
      return this._usage;
    }
  }
});
Buffer2.prototype._getBuffer = function() {
  return this._buffer;
};
Buffer2.prototype._bind = function() {
  const gl = this._gl;
  const target = this._bufferTarget;
  gl.bindBuffer(target, this._buffer);
};
Buffer2.prototype._unBind = function() {
  const gl = this._gl;
  const target = this._bufferTarget;
  gl.bindBuffer(target, null);
};
Buffer2.prototype.copyFromArrayView = function(arrayView, offsetInBytes) {
  offsetInBytes = offsetInBytes ?? 0;
  Check_default.defined("arrayView", arrayView);
  Check_default.typeOf.number.lessThanOrEquals(
    "offsetInBytes + arrayView.byteLength",
    offsetInBytes + arrayView.byteLength,
    this._sizeInBytes
  );
  const gl = this._gl;
  const target = this._bufferTarget;
  gl.bindBuffer(target, this._buffer);
  gl.bufferSubData(target, offsetInBytes, arrayView);
  gl.bindBuffer(target, null);
};
Buffer2.prototype.copyFromBuffer = function(readBuffer, readOffset, writeOffset, sizeInBytes) {
  if (!this._webgl2) {
    throw new DeveloperError_default("A WebGL 2 context is required.");
  }
  if (!defined_default(readBuffer)) {
    throw new DeveloperError_default("readBuffer must be defined.");
  }
  if (!defined_default(sizeInBytes) || sizeInBytes <= 0) {
    throw new DeveloperError_default(
      "sizeInBytes must be defined and be greater than zero."
    );
  }
  if (!defined_default(readOffset) || readOffset < 0 || readOffset + sizeInBytes > readBuffer._sizeInBytes) {
    throw new DeveloperError_default(
      "readOffset must be greater than or equal to zero and readOffset + sizeInBytes must be less than of equal to readBuffer.sizeInBytes."
    );
  }
  if (!defined_default(writeOffset) || writeOffset < 0 || writeOffset + sizeInBytes > this._sizeInBytes) {
    throw new DeveloperError_default(
      "writeOffset must be greater than or equal to zero and writeOffset + sizeInBytes must be less than of equal to this.sizeInBytes."
    );
  }
  if (this._buffer === readBuffer._buffer && (writeOffset >= readOffset && writeOffset < readOffset + sizeInBytes || readOffset > writeOffset && readOffset < writeOffset + sizeInBytes)) {
    throw new DeveloperError_default(
      "When readBuffer is equal to this, the ranges [readOffset + sizeInBytes) and [writeOffset, writeOffset + sizeInBytes) must not overlap."
    );
  }
  if (this._bufferTarget === WebGLConstants_default.ELEMENT_ARRAY_BUFFER && readBuffer._bufferTarget !== WebGLConstants_default.ELEMENT_ARRAY_BUFFER || this._bufferTarget !== WebGLConstants_default.ELEMENT_ARRAY_BUFFER && readBuffer._bufferTarget === WebGLConstants_default.ELEMENT_ARRAY_BUFFER) {
    throw new DeveloperError_default(
      "Can not copy an index buffer into another buffer type."
    );
  }
  const readTarget = WebGLConstants_default.COPY_READ_BUFFER;
  const writeTarget = WebGLConstants_default.COPY_WRITE_BUFFER;
  const gl = this._gl;
  gl.bindBuffer(writeTarget, this._buffer);
  gl.bindBuffer(readTarget, readBuffer._buffer);
  gl.copyBufferSubData(
    readTarget,
    writeTarget,
    readOffset,
    writeOffset,
    sizeInBytes
  );
  gl.bindBuffer(writeTarget, null);
  gl.bindBuffer(readTarget, null);
};
Buffer2.prototype.getBufferData = function(arrayView, sourceOffset, destinationOffset, length) {
  sourceOffset = sourceOffset ?? 0;
  destinationOffset = destinationOffset ?? 0;
  if (!this._webgl2) {
    throw new DeveloperError_default("A WebGL 2 context is required.");
  }
  if (!defined_default(arrayView)) {
    throw new DeveloperError_default("arrayView is required.");
  }
  let copyLength;
  let elementSize;
  let arrayLength = arrayView.byteLength;
  if (!defined_default(length)) {
    if (defined_default(arrayLength)) {
      copyLength = arrayLength - destinationOffset;
      elementSize = 1;
    } else {
      arrayLength = arrayView.length;
      copyLength = arrayLength - destinationOffset;
      elementSize = arrayView.BYTES_PER_ELEMENT;
    }
  } else {
    copyLength = length;
    if (defined_default(arrayLength)) {
      elementSize = 1;
    } else {
      arrayLength = arrayView.length;
      elementSize = arrayView.BYTES_PER_ELEMENT;
    }
  }
  if (destinationOffset < 0 || destinationOffset > arrayLength) {
    throw new DeveloperError_default(
      "destinationOffset must be greater than zero and less than the arrayView length."
    );
  }
  if (destinationOffset + copyLength > arrayLength) {
    throw new DeveloperError_default(
      "destinationOffset + length must be less than or equal to the arrayViewLength."
    );
  }
  if (sourceOffset < 0 || sourceOffset > this._sizeInBytes) {
    throw new DeveloperError_default(
      "sourceOffset must be greater than zero and less than the buffers size."
    );
  }
  if (sourceOffset + copyLength * elementSize > this._sizeInBytes) {
    throw new DeveloperError_default(
      "sourceOffset + length must be less than the buffers size."
    );
  }
  const gl = this._gl;
  const target = WebGLConstants_default.COPY_READ_BUFFER;
  gl.bindBuffer(target, this._buffer);
  gl.getBufferSubData(
    target,
    sourceOffset,
    arrayView,
    destinationOffset,
    length
  );
  gl.bindBuffer(target, null);
};
Buffer2.prototype.isDestroyed = function() {
  return false;
};
Buffer2.prototype.destroy = function() {
  this._gl.deleteBuffer(this._buffer);
  return destroyObject_default(this);
};
var Buffer_default = Buffer2;

// packages/engine/Source/Renderer/VertexArray.js
function addAttribute(attributes, attribute, index, context) {
  const hasVertexBuffer = defined_default(attribute.vertexBuffer);
  const hasValue = defined_default(attribute.value);
  const componentsPerAttribute = attribute.value ? attribute.value.length : attribute.componentsPerAttribute;
  if (!hasVertexBuffer && !hasValue) {
    throw new DeveloperError_default("attribute must have a vertexBuffer or a value.");
  }
  if (hasVertexBuffer && hasValue) {
    throw new DeveloperError_default(
      "attribute cannot have both a vertexBuffer and a value.  It must have either a vertexBuffer property defining per-vertex data or a value property defining data for all vertices."
    );
  }
  if (componentsPerAttribute !== 1 && componentsPerAttribute !== 2 && componentsPerAttribute !== 3 && componentsPerAttribute !== 4) {
    if (hasValue) {
      throw new DeveloperError_default(
        "attribute.value.length must be in the range [1, 4]."
      );
    }
    throw new DeveloperError_default(
      "attribute.componentsPerAttribute must be in the range [1, 4]."
    );
  }
  if (defined_default(attribute.componentDatatype) && !ComponentDatatype_default.validate(attribute.componentDatatype)) {
    throw new DeveloperError_default(
      "attribute must have a valid componentDatatype or not specify it."
    );
  }
  if (defined_default(attribute.strideInBytes) && attribute.strideInBytes > 255) {
    throw new DeveloperError_default(
      "attribute must have a strideInBytes less than or equal to 255 or not specify it."
    );
  }
  if (defined_default(attribute.instanceDivisor) && attribute.instanceDivisor > 0 && !context.instancedArrays) {
    throw new DeveloperError_default("instanced arrays is not supported");
  }
  if (defined_default(attribute.instanceDivisor) && attribute.instanceDivisor < 0) {
    throw new DeveloperError_default(
      "attribute must have an instanceDivisor greater than or equal to zero"
    );
  }
  if (defined_default(attribute.instanceDivisor) && hasValue) {
    throw new DeveloperError_default(
      "attribute cannot have have an instanceDivisor if it is not backed by a buffer"
    );
  }
  if (defined_default(attribute.instanceDivisor) && attribute.instanceDivisor > 0 && attribute.index === 0) {
    throw new DeveloperError_default(
      "attribute zero cannot have an instanceDivisor greater than 0"
    );
  }
  const attr = {
    index: attribute.index ?? index,
    enabled: attribute.enabled ?? true,
    vertexBuffer: attribute.vertexBuffer,
    value: hasValue ? attribute.value.slice(0) : void 0,
    componentsPerAttribute,
    componentDatatype: attribute.componentDatatype ?? ComponentDatatype_default.FLOAT,
    normalize: attribute.normalize ?? false,
    offsetInBytes: attribute.offsetInBytes ?? 0,
    strideInBytes: attribute.strideInBytes ?? 0,
    instanceDivisor: attribute.instanceDivisor ?? 0
  };
  if (hasVertexBuffer) {
    attr.vertexAttrib = function(gl) {
      const index2 = this.index;
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer._getBuffer());
      gl.vertexAttribPointer(
        index2,
        this.componentsPerAttribute,
        this.componentDatatype,
        this.normalize,
        this.strideInBytes,
        this.offsetInBytes
      );
      gl.enableVertexAttribArray(index2);
      if (this.instanceDivisor > 0) {
        context.glVertexAttribDivisor(index2, this.instanceDivisor);
        context._vertexAttribDivisors[index2] = this.instanceDivisor;
        context._previousDrawInstanced = true;
      }
    };
    attr.disableVertexAttribArray = function(gl) {
      gl.disableVertexAttribArray(this.index);
      if (this.instanceDivisor > 0) {
        context.glVertexAttribDivisor(index, 0);
      }
    };
  } else {
    switch (attr.componentsPerAttribute) {
      case 1:
        attr.vertexAttrib = function(gl) {
          gl.vertexAttrib1fv(this.index, this.value);
        };
        break;
      case 2:
        attr.vertexAttrib = function(gl) {
          gl.vertexAttrib2fv(this.index, this.value);
        };
        break;
      case 3:
        attr.vertexAttrib = function(gl) {
          gl.vertexAttrib3fv(this.index, this.value);
        };
        break;
      case 4:
        attr.vertexAttrib = function(gl) {
          gl.vertexAttrib4fv(this.index, this.value);
        };
        break;
    }
    attr.disableVertexAttribArray = function(gl) {
    };
  }
  attributes.push(attr);
}
function bind(gl, attributes, indexBuffer) {
  for (let i = 0; i < attributes.length; ++i) {
    const attribute = attributes[i];
    if (attribute.enabled) {
      attribute.vertexAttrib(gl);
    }
  }
  if (defined_default(indexBuffer)) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer._getBuffer());
  }
}
function VertexArray(options) {
  options = options ?? Frozen_default.EMPTY_OBJECT;
  Check_default.defined("options.context", options.context);
  Check_default.defined("options.attributes", options.attributes);
  const context = options.context;
  const gl = context._gl;
  const attributes = options.attributes;
  const indexBuffer = options.indexBuffer;
  let i;
  const vaAttributes = [];
  let numberOfVertices = 1;
  let hasInstancedAttributes = false;
  let hasConstantAttributes = false;
  let length = attributes.length;
  for (i = 0; i < length; ++i) {
    addAttribute(vaAttributes, attributes[i], i, context);
  }
  length = vaAttributes.length;
  for (i = 0; i < length; ++i) {
    const attribute = vaAttributes[i];
    if (defined_default(attribute.vertexBuffer) && attribute.instanceDivisor === 0) {
      const bytes = attribute.strideInBytes || attribute.componentsPerAttribute * ComponentDatatype_default.getSizeInBytes(attribute.componentDatatype);
      numberOfVertices = attribute.vertexBuffer.sizeInBytes / bytes;
      break;
    }
  }
  for (i = 0; i < length; ++i) {
    if (vaAttributes[i].instanceDivisor > 0) {
      hasInstancedAttributes = true;
    }
    if (defined_default(vaAttributes[i].value)) {
      hasConstantAttributes = true;
    }
  }
  const uniqueIndices = {};
  for (i = 0; i < length; ++i) {
    const index = vaAttributes[i].index;
    if (uniqueIndices[index]) {
      throw new DeveloperError_default(
        `Index ${index} is used by more than one attribute.`
      );
    }
    uniqueIndices[index] = true;
  }
  let vao;
  if (context.vertexArrayObject) {
    vao = context.glCreateVertexArray();
    context.glBindVertexArray(vao);
    bind(gl, vaAttributes, indexBuffer);
    context.glBindVertexArray(null);
  }
  this._numberOfVertices = numberOfVertices;
  this._hasInstancedAttributes = hasInstancedAttributes;
  this._hasConstantAttributes = hasConstantAttributes;
  this._context = context;
  this._gl = gl;
  this._vao = vao;
  this._attributes = vaAttributes;
  this._indexBuffer = indexBuffer;
}
function computeNumberOfVertices(attribute) {
  return attribute.values.length / attribute.componentsPerAttribute;
}
function computeAttributeSizeInBytes(attribute) {
  return ComponentDatatype_default.getSizeInBytes(attribute.componentDatatype) * attribute.componentsPerAttribute;
}
function interleaveAttributes(attributes) {
  let j;
  let name;
  let attribute;
  const names = [];
  for (name in attributes) {
    if (attributes.hasOwnProperty(name) && defined_default(attributes[name]) && defined_default(attributes[name].values)) {
      names.push(name);
      if (attributes[name].componentDatatype === ComponentDatatype_default.DOUBLE) {
        attributes[name].componentDatatype = ComponentDatatype_default.FLOAT;
        attributes[name].values = ComponentDatatype_default.createTypedArray(
          ComponentDatatype_default.FLOAT,
          attributes[name].values
        );
      }
    }
  }
  let numberOfVertices;
  const namesLength = names.length;
  if (namesLength > 0) {
    numberOfVertices = computeNumberOfVertices(attributes[names[0]]);
    for (j = 1; j < namesLength; ++j) {
      const currentNumberOfVertices = computeNumberOfVertices(
        attributes[names[j]]
      );
      if (currentNumberOfVertices !== numberOfVertices) {
        throw new RuntimeError_default(
          `${"Each attribute list must have the same number of vertices.  Attribute "}${names[j]} has a different number of vertices (${currentNumberOfVertices.toString()}) than attribute ${names[0]} (${numberOfVertices.toString()}).`
        );
      }
    }
  }
  names.sort(function(left, right) {
    return ComponentDatatype_default.getSizeInBytes(attributes[right].componentDatatype) - ComponentDatatype_default.getSizeInBytes(attributes[left].componentDatatype);
  });
  let vertexSizeInBytes = 0;
  const offsetsInBytes = {};
  for (j = 0; j < namesLength; ++j) {
    name = names[j];
    attribute = attributes[name];
    offsetsInBytes[name] = vertexSizeInBytes;
    vertexSizeInBytes += computeAttributeSizeInBytes(attribute);
  }
  if (vertexSizeInBytes > 0) {
    const maxComponentSizeInBytes = ComponentDatatype_default.getSizeInBytes(
      attributes[names[0]].componentDatatype
    );
    const remainder = vertexSizeInBytes % maxComponentSizeInBytes;
    if (remainder !== 0) {
      vertexSizeInBytes += maxComponentSizeInBytes - remainder;
    }
    const vertexBufferSizeInBytes = numberOfVertices * vertexSizeInBytes;
    const buffer = new ArrayBuffer(vertexBufferSizeInBytes);
    const views = {};
    for (j = 0; j < namesLength; ++j) {
      name = names[j];
      const sizeInBytes = ComponentDatatype_default.getSizeInBytes(
        attributes[name].componentDatatype
      );
      views[name] = {
        pointer: ComponentDatatype_default.createTypedArray(
          attributes[name].componentDatatype,
          buffer
        ),
        index: offsetsInBytes[name] / sizeInBytes,
        // Offset in ComponentType
        strideInComponentType: vertexSizeInBytes / sizeInBytes
      };
    }
    for (j = 0; j < numberOfVertices; ++j) {
      for (let n = 0; n < namesLength; ++n) {
        name = names[n];
        attribute = attributes[name];
        const values = attribute.values;
        const view = views[name];
        const pointer = view.pointer;
        const numberOfComponents = attribute.componentsPerAttribute;
        for (let k = 0; k < numberOfComponents; ++k) {
          pointer[view.index + k] = values[j * numberOfComponents + k];
        }
        view.index += view.strideInComponentType;
      }
    }
    return {
      buffer,
      offsetsInBytes,
      vertexSizeInBytes
    };
  }
  return void 0;
}
VertexArray.fromGeometry = function(options) {
  options = options ?? Frozen_default.EMPTY_OBJECT;
  Check_default.defined("options.context", options.context);
  const context = options.context;
  const geometry = options.geometry ?? Frozen_default.EMPTY_OBJECT;
  const bufferUsage = options.bufferUsage ?? BufferUsage_default.DYNAMIC_DRAW;
  const attributeLocations = options.attributeLocations ?? Frozen_default.EMPTY_OBJECT;
  const interleave = options.interleave ?? false;
  const createdVAAttributes = options.vertexArrayAttributes;
  let name;
  let attribute;
  let vertexBuffer;
  const vaAttributes = defined_default(createdVAAttributes) ? createdVAAttributes : [];
  const attributes = geometry.attributes;
  if (interleave) {
    const interleavedAttributes = interleaveAttributes(attributes);
    if (defined_default(interleavedAttributes)) {
      vertexBuffer = Buffer_default.createVertexBuffer({
        context,
        typedArray: interleavedAttributes.buffer,
        usage: bufferUsage
      });
      const offsetsInBytes = interleavedAttributes.offsetsInBytes;
      const strideInBytes = interleavedAttributes.vertexSizeInBytes;
      for (name in attributes) {
        if (attributes.hasOwnProperty(name) && defined_default(attributes[name])) {
          attribute = attributes[name];
          if (defined_default(attribute.values)) {
            vaAttributes.push({
              index: attributeLocations[name],
              vertexBuffer,
              componentDatatype: attribute.componentDatatype,
              componentsPerAttribute: attribute.componentsPerAttribute,
              normalize: attribute.normalize,
              offsetInBytes: offsetsInBytes[name],
              strideInBytes
            });
          } else {
            vaAttributes.push({
              index: attributeLocations[name],
              value: attribute.value,
              componentDatatype: attribute.componentDatatype,
              normalize: attribute.normalize
            });
          }
        }
      }
    }
  } else {
    for (name in attributes) {
      if (attributes.hasOwnProperty(name) && defined_default(attributes[name])) {
        attribute = attributes[name];
        let componentDatatype = attribute.componentDatatype;
        if (componentDatatype === ComponentDatatype_default.DOUBLE) {
          componentDatatype = ComponentDatatype_default.FLOAT;
        }
        let attrProps = {};
        if (defined_default(attribute.values)) {
          vertexBuffer = Buffer_default.createVertexBuffer({
            context,
            typedArray: ComponentDatatype_default.createTypedArray(
              componentDatatype,
              attribute.values
            ),
            usage: bufferUsage
          });
          attrProps = {
            index: attributeLocations[name],
            vertexBuffer,
            value: attribute.value,
            componentDatatype,
            componentsPerAttribute: attribute.componentsPerAttribute,
            normalize: attribute.normalize
          };
        }
        if (defined_default(attribute.typedArray)) {
          vertexBuffer = Buffer_default.createVertexBuffer({
            context,
            typedArray: attribute.typedArray,
            usage: bufferUsage
          });
          attrProps = {
            index: attributeLocations[name],
            vertexBuffer,
            value: void 0,
            componentDatatype,
            componentsPerAttribute: AttributeType_default.getNumberOfComponents(
              attribute.type
            ),
            normalize: attribute.normalized,
            instanceDivisor: attribute.instanceDivisor
          };
        }
        vaAttributes.push(attrProps);
      }
    }
  }
  let indexBuffer;
  const indices = geometry.indices;
  if (defined_default(indices)) {
    if (Geometry_default.computeNumberOfVertices(geometry) >= Math_default.SIXTY_FOUR_KILOBYTES && context.elementIndexUint) {
      indexBuffer = Buffer_default.createIndexBuffer({
        context,
        typedArray: new Uint32Array(indices),
        usage: bufferUsage,
        indexDatatype: IndexDatatype_default.UNSIGNED_INT
      });
    } else {
      indexBuffer = Buffer_default.createIndexBuffer({
        context,
        typedArray: new Uint16Array(indices),
        usage: bufferUsage,
        indexDatatype: IndexDatatype_default.UNSIGNED_SHORT
      });
    }
  }
  return new VertexArray({
    context,
    attributes: vaAttributes,
    indexBuffer
  });
};
Object.defineProperties(VertexArray.prototype, {
  numberOfAttributes: {
    get: function() {
      return this._attributes.length;
    }
  },
  numberOfVertices: {
    get: function() {
      return this._numberOfVertices;
    }
  },
  indexBuffer: {
    get: function() {
      return this._indexBuffer;
    }
  }
});
VertexArray.prototype.getAttribute = function(index) {
  Check_default.defined("index", index);
  return this._attributes[index];
};
function setVertexAttribDivisor(vertexArray) {
  const context = vertexArray._context;
  const hasInstancedAttributes = vertexArray._hasInstancedAttributes;
  if (!hasInstancedAttributes && !context._previousDrawInstanced) {
    return;
  }
  context._previousDrawInstanced = hasInstancedAttributes;
  const divisors = context._vertexAttribDivisors;
  const attributes = vertexArray._attributes;
  const maxAttributes = ContextLimits_default.maximumVertexAttributes;
  let i;
  if (hasInstancedAttributes) {
    const length = attributes.length;
    for (i = 0; i < length; ++i) {
      const attribute = attributes[i];
      if (attribute.enabled) {
        const divisor = attribute.instanceDivisor;
        const index = attribute.index;
        if (divisor !== divisors[index]) {
          context.glVertexAttribDivisor(index, divisor);
          divisors[index] = divisor;
        }
      }
    }
  } else {
    for (i = 0; i < maxAttributes; ++i) {
      if (divisors[i] > 0) {
        context.glVertexAttribDivisor(i, 0);
        divisors[i] = 0;
      }
    }
  }
}
function setConstantAttributes(vertexArray, gl) {
  const attributes = vertexArray._attributes;
  const length = attributes.length;
  for (let i = 0; i < length; ++i) {
    const attribute = attributes[i];
    if (attribute.enabled && defined_default(attribute.value)) {
      attribute.vertexAttrib(gl);
    }
  }
}
VertexArray.prototype.copyAttributeFromRange = function(attributeIndex, array, vertexOffset, vertexCount) {
  const attribute = this.getAttribute(attributeIndex);
  const buffer = (
    /** @type {Buffer} */
    attribute.vertexBuffer
  );
  const elementsPerVertex = attribute.componentsPerAttribute;
  assert_default(buffer.sizeInBytes === array.byteLength, "Invalid buffer length");
  const ArrayConstructor = (
    /** @type {TypedArrayConstructor} */
    array.constructor
  );
  const byteOffset = vertexOffset * elementsPerVertex * ArrayConstructor.BYTES_PER_ELEMENT;
  const rangeArrayView = new ArrayConstructor(
    /** @type {ArrayBuffer} */
    array.buffer,
    array.byteOffset + byteOffset,
    vertexCount * elementsPerVertex
  );
  buffer.copyFromArrayView(rangeArrayView, byteOffset);
};
VertexArray.prototype.copyIndexFromRange = function(array, indexOffset, indexCount) {
  const buffer = (
    /** @type {Buffer} */
    this._indexBuffer
  );
  assert_default(buffer.sizeInBytes === array.byteLength, "Invalid buffer length");
  const ArrayConstructor = (
    /** @type {TypedArrayConstructor} */
    array.constructor
  );
  const byteOffset = indexOffset * ArrayConstructor.BYTES_PER_ELEMENT;
  const rangeArrayView = new ArrayConstructor(
    /** @type {ArrayBuffer} */
    array.buffer,
    array.byteOffset + byteOffset,
    indexCount
  );
  buffer.copyFromArrayView(rangeArrayView, byteOffset);
};
VertexArray.prototype._bind = function() {
  if (defined_default(this._vao)) {
    this._context.glBindVertexArray(this._vao);
    if (this._context.instancedArrays) {
      setVertexAttribDivisor(this);
    }
    if (this._hasConstantAttributes) {
      setConstantAttributes(this, this._gl);
    }
  } else {
    bind(this._gl, this._attributes, this._indexBuffer);
  }
};
VertexArray.prototype._unBind = function() {
  if (defined_default(this._vao)) {
    this._context.glBindVertexArray(null);
  } else {
    const attributes = this._attributes;
    const gl = this._gl;
    for (let i = 0; i < attributes.length; ++i) {
      const attribute = attributes[i];
      if (attribute.enabled) {
        attribute.disableVertexAttribArray(gl);
      }
    }
    if (this._indexBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
  }
};
VertexArray.prototype.isDestroyed = function() {
  return false;
};
VertexArray.prototype.destroy = function() {
  const attributes = this._attributes;
  for (let i = 0; i < attributes.length; ++i) {
    const vertexBuffer = attributes[i].vertexBuffer;
    if (defined_default(vertexBuffer) && !vertexBuffer.isDestroyed() && vertexBuffer.vertexArrayDestroyable) {
      vertexBuffer.destroy();
    }
  }
  const indexBuffer = this._indexBuffer;
  if (defined_default(indexBuffer) && !indexBuffer.isDestroyed() && indexBuffer.vertexArrayDestroyable) {
    indexBuffer.destroy();
  }
  if (defined_default(this._vao)) {
    this._context.glDeleteVertexArray(this._vao);
  }
  return destroyObject_default(this);
};
var VertexArray_default = VertexArray;

// packages/engine/Source/Renderer/DrawCommand.js
var Flags = {
  CULL: 1,
  OCCLUDE: 2,
  EXECUTE_IN_CLOSEST_FRUSTUM: 4,
  DEBUG_SHOW_BOUNDING_VOLUME: 8,
  CAST_SHADOWS: 16,
  RECEIVE_SHADOWS: 32,
  PICK_ONLY: 64,
  DEPTH_FOR_TRANSLUCENT_CLASSIFICATION: 128
};
var DrawCommand = class _DrawCommand {
  /**
   * @param {DrawCommandOptions} [options]
   */
  constructor(options = Frozen_default.EMPTY_OBJECT) {
    this._boundingVolume = options.boundingVolume;
    this._orientedBoundingBox = options.orientedBoundingBox;
    this._modelMatrix = options.modelMatrix;
    this._primitiveType = options.primitiveType ?? PrimitiveType_default.TRIANGLES;
    this._vertexArray = options.vertexArray;
    this._count = options.count;
    this._offset = options.offset ?? 0;
    this._instanceCount = options.instanceCount ?? 0;
    this._shaderProgram = options.shaderProgram;
    this._uniformMap = options.uniformMap;
    this._renderState = options.renderState;
    this._framebuffer = options.framebuffer;
    this._pass = options.pass;
    this._owner = options.owner;
    this._debugOverlappingFrustums = 0;
    this._pickId = options.pickId;
    this._snapId = options.snapId;
    this._pickMetadataAllowed = options.pickMetadataAllowed === true;
    this._pickedMetadataInfo = void 0;
    this._flags = 0;
    this.cull = options.cull ?? true;
    this.occlude = options.occlude ?? true;
    this.executeInClosestFrustum = options.executeInClosestFrustum ?? false;
    this.debugShowBoundingVolume = options.debugShowBoundingVolume ?? false;
    this.castShadows = options.castShadows ?? false;
    this.receiveShadows = options.receiveShadows ?? false;
    this.pickOnly = options.pickOnly ?? false;
    this.depthForTranslucentClassification = options.depthForTranslucentClassification ?? false;
    this.dirty = true;
    this.lastDirtyTime = 0;
    this.derivedCommands = {};
  }
  /**
   * The bounding volume of the geometry in world space.  This is used for culling and frustum selection.
   * <p>
   * For best rendering performance, use the tightest possible bounding volume.  Although
   * <code>undefined</code> is allowed, always try to provide a bounding volume to
   * allow the tightest possible near and far planes to be computed for the scene, and
   * minimize the number of frustums needed.
   * </p>
   *
   * @type {object}
   * @default undefined
   *
   * @see DrawCommand#debugShowBoundingVolume
   */
  get boundingVolume() {
    return this._boundingVolume;
  }
  set boundingVolume(value) {
    if (this._boundingVolume !== value) {
      this._boundingVolume = value;
      this.dirty = true;
    }
  }
  /**
   * The oriented bounding box of the geometry in world space. If this is defined, it is used instead of
   * {@link DrawCommand#boundingVolume} for plane intersection testing.
   *
   * @type {OrientedBoundingBox}
   * @default undefined
   *
   * @see DrawCommand#debugShowBoundingVolume
   */
  get orientedBoundingBox() {
    return this._orientedBoundingBox;
  }
  set orientedBoundingBox(value) {
    if (this._orientedBoundingBox !== value) {
      this._orientedBoundingBox = value;
      this.dirty = true;
    }
  }
  /**
   * When <code>true</code>, the renderer frustum and horizon culls the command based on its {@link DrawCommand#boundingVolume}.
   * If the command was already culled, set this to <code>false</code> for a performance improvement.
   *
   * @type {boolean}
   * @default true
   */
  get cull() {
    return hasFlag(this, Flags.CULL);
  }
  set cull(value) {
    if (hasFlag(this, Flags.CULL) !== value) {
      setFlag(this, Flags.CULL, value);
      this.dirty = true;
    }
  }
  /**
   * When <code>true</code>, the horizon culls the command based on its {@link DrawCommand#boundingVolume}.
   * {@link DrawCommand#cull} must also be <code>true</code> in order for the command to be culled.
   *
   * @type {boolean}
   * @default true
   */
  get occlude() {
    return hasFlag(this, Flags.OCCLUDE);
  }
  set occlude(value) {
    if (hasFlag(this, Flags.OCCLUDE) !== value) {
      setFlag(this, Flags.OCCLUDE, value);
      this.dirty = true;
    }
  }
  /**
   * The transformation from the geometry in model space to world space.
   * <p>
   * When <code>undefined</code>, the geometry is assumed to be defined in world space.
   * </p>
   *
   * @type {Matrix4}
   * @default undefined
   */
  get modelMatrix() {
    return this._modelMatrix;
  }
  set modelMatrix(value) {
    if (this._modelMatrix !== value) {
      this._modelMatrix = value;
      this.dirty = true;
    }
  }
  /**
   * The type of geometry in the vertex array.
   *
   * @type {PrimitiveType}
   * @default PrimitiveType.TRIANGLES
   */
  get primitiveType() {
    return this._primitiveType;
  }
  set primitiveType(value) {
    if (this._primitiveType !== value) {
      this._primitiveType = value;
      this.dirty = true;
    }
  }
  /**
   * The vertex array.
   *
   * @type {VertexArray}
   * @default undefined
   */
  get vertexArray() {
    return this._vertexArray;
  }
  set vertexArray(value) {
    if (this._vertexArray !== value) {
      this._vertexArray = value;
      this.dirty = true;
    }
  }
  /**
   * The number of vertices to draw in the vertex array.
   *
   * @type {number}
   * @default undefined
   */
  get count() {
    return this._count;
  }
  set count(value) {
    if (this._count !== value) {
      this._count = value;
      this.dirty = true;
    }
  }
  /**
   * The offset to start drawing in the vertex array.
   *
   * @type {number}
   * @default 0
   */
  get offset() {
    return this._offset;
  }
  set offset(value) {
    if (this._offset !== value) {
      this._offset = value;
      this.dirty = true;
    }
  }
  /**
   * The number of instances to draw.
   *
   * @type {number}
   * @default 0
   */
  get instanceCount() {
    return this._instanceCount;
  }
  set instanceCount(value) {
    if (this._instanceCount !== value) {
      this._instanceCount = value;
      this.dirty = true;
    }
  }
  /**
   * The shader program to apply.
   *
   * @type {ShaderProgram}
   * @default undefined
   */
  get shaderProgram() {
    return this._shaderProgram;
  }
  set shaderProgram(value) {
    if (this._shaderProgram !== value) {
      this._shaderProgram = value;
      this.dirty = true;
    }
  }
  /**
   * Whether this command should cast shadows when shadowing is enabled.
   *
   * @type {boolean}
   * @default false
   */
  get castShadows() {
    return hasFlag(this, Flags.CAST_SHADOWS);
  }
  set castShadows(value) {
    if (hasFlag(this, Flags.CAST_SHADOWS) !== value) {
      setFlag(this, Flags.CAST_SHADOWS, value);
      this.dirty = true;
    }
  }
  /**
   * Whether this command should receive shadows when shadowing is enabled.
   *
   * @type {boolean}
   * @default false
   */
  get receiveShadows() {
    return hasFlag(this, Flags.RECEIVE_SHADOWS);
  }
  set receiveShadows(value) {
    if (hasFlag(this, Flags.RECEIVE_SHADOWS) !== value) {
      setFlag(this, Flags.RECEIVE_SHADOWS, value);
      this.dirty = true;
    }
  }
  /**
   * An object with functions whose names match the uniforms in the shader program
   * and return values to set those uniforms.
   *
   * @type {object}
   * @default undefined
   */
  get uniformMap() {
    return this._uniformMap;
  }
  set uniformMap(value) {
    if (this._uniformMap !== value) {
      this._uniformMap = value;
      this.dirty = true;
    }
  }
  /**
   * The render state.
   *
   * @type {RenderState}
   * @default undefined
   */
  get renderState() {
    return this._renderState;
  }
  set renderState(value) {
    if (this._renderState !== value) {
      this._renderState = value;
      this.dirty = true;
    }
  }
  /**
   * The framebuffer to draw to.
   *
   * @type {Framebuffer}
   * @default undefined
   */
  get framebuffer() {
    return this._framebuffer;
  }
  set framebuffer(value) {
    if (this._framebuffer !== value) {
      this._framebuffer = value;
      this.dirty = true;
    }
  }
  /**
   * The pass when to render.
   *
   * @type {Pass}
   * @default undefined
   */
  get pass() {
    return this._pass;
  }
  set pass(value) {
    if (this._pass !== value) {
      this._pass = value;
      this.dirty = true;
    }
  }
  /**
   * Specifies if this command is only to be executed in the frustum closest
   * to the eye containing the bounding volume. Defaults to <code>false</code>.
   *
   * @type {boolean}
   * @default false
   */
  get executeInClosestFrustum() {
    return hasFlag(this, Flags.EXECUTE_IN_CLOSEST_FRUSTUM);
  }
  set executeInClosestFrustum(value) {
    if (hasFlag(this, Flags.EXECUTE_IN_CLOSEST_FRUSTUM) !== value) {
      setFlag(this, Flags.EXECUTE_IN_CLOSEST_FRUSTUM, value);
      this.dirty = true;
    }
  }
  /**
   * The object who created this command.  This is useful for debugging command
   * execution; it allows us to see who created a command when we only have a
   * reference to the command, and can be used to selectively execute commands
   * with {@link Scene#debugCommandFilter}.
   *
   * @type {object}
   * @default undefined
   *
   * @see Scene#debugCommandFilter
   */
  get owner() {
    return this._owner;
  }
  set owner(value) {
    if (this._owner !== value) {
      this._owner = value;
      this.dirty = true;
    }
  }
  /**
   * This property is for debugging only; it is not for production use nor is it optimized.
   * <p>
   * Draws the {@link DrawCommand#boundingVolume} for this command, assuming it is a sphere, when the command executes.
   * </p>
   *
   * @type {boolean}
   * @default false
   *
   * @see DrawCommand#boundingVolume
   */
  get debugShowBoundingVolume() {
    return hasFlag(this, Flags.DEBUG_SHOW_BOUNDING_VOLUME);
  }
  set debugShowBoundingVolume(value) {
    if (hasFlag(this, Flags.DEBUG_SHOW_BOUNDING_VOLUME) !== value) {
      setFlag(this, Flags.DEBUG_SHOW_BOUNDING_VOLUME, value);
      this.dirty = true;
    }
  }
  /**
   * Used to implement Scene.debugShowFrustums.
   * @ignore
   */
  get debugOverlappingFrustums() {
    return this._debugOverlappingFrustums;
  }
  set debugOverlappingFrustums(value) {
    if (this._debugOverlappingFrustums !== value) {
      this._debugOverlappingFrustums = value;
      this.dirty = true;
    }
  }
  /**
   * A GLSL string that will evaluate to a pick id. When <code>undefined</code>, the command will only draw depth
   * during the pick pass.
   *
   * @type {string|undefined}
   * @default undefined
   */
  get pickId() {
    return this._pickId;
  }
  set pickId(value) {
    if (this._pickId !== value) {
      this._pickId = value;
      this.dirty = true;
    }
  }
  /**
   * A GLSL string that will evaluate to the float snap payload written during
   * a snapping pass (see {@link Scene#snap}). When <code>undefined</code>, the
   * command does not render during a snapping pass.
   *
   * @type {string|undefined}
   * @default undefined
   */
  get snapId() {
    return this._snapId;
  }
  set snapId(value) {
    if (this._snapId !== value) {
      this._snapId = value;
      this.dirty = true;
    }
  }
  /**
   * Whether metadata picking is allowed.
   *
   * This is essentially only set to `true` for draw commands that are
   * part of a `ModelDrawCommand`, to check whether a derived command
   * for metadata picking has to be created.
   *
   * @type {boolean}
   * @default undefined
   * @private
   */
  get pickMetadataAllowed() {
    return this._pickMetadataAllowed;
  }
  /**
   * Information about picked metadata.
   *
   * @type {PickedMetadataInfo|undefined}
   * @default undefined
   */
  get pickedMetadataInfo() {
    return this._pickedMetadataInfo;
  }
  set pickedMetadataInfo(value) {
    if (this._pickedMetadataInfo !== value) {
      this._pickedMetadataInfo = value;
      this.dirty = true;
    }
  }
  /**
   * Whether this command should be executed in the pick pass only.
   *
   * @type {boolean}
   * @default false
   */
  get pickOnly() {
    return hasFlag(this, Flags.PICK_ONLY);
  }
  set pickOnly(value) {
    if (hasFlag(this, Flags.PICK_ONLY) !== value) {
      setFlag(this, Flags.PICK_ONLY, value);
      this.dirty = true;
    }
  }
  /**
   * Whether this command should be derived to draw depth for classification of translucent primitives.
   *
   * @type {boolean}
   * @default false
   */
  get depthForTranslucentClassification() {
    return hasFlag(this, Flags.DEPTH_FOR_TRANSLUCENT_CLASSIFICATION);
  }
  set depthForTranslucentClassification(value) {
    if (hasFlag(this, Flags.DEPTH_FOR_TRANSLUCENT_CLASSIFICATION) !== value) {
      setFlag(this, Flags.DEPTH_FOR_TRANSLUCENT_CLASSIFICATION, value);
      this.dirty = true;
    }
  }
  /**
   * @param {DrawCommand} command
   * @param {DrawCommand} result
   * @returns {DrawCommand}
   * @private
   */
  static shallowClone(command, result) {
    if (!defined_default(command)) {
      return void 0;
    }
    if (!defined_default(result)) {
      result = new _DrawCommand();
    }
    result._boundingVolume = command._boundingVolume;
    result._orientedBoundingBox = command._orientedBoundingBox;
    result._modelMatrix = command._modelMatrix;
    result._primitiveType = command._primitiveType;
    result._vertexArray = command._vertexArray;
    result._count = command._count;
    result._offset = command._offset;
    result._instanceCount = command._instanceCount;
    result._shaderProgram = command._shaderProgram;
    result._uniformMap = command._uniformMap;
    result._renderState = command._renderState;
    result._framebuffer = command._framebuffer;
    result._pass = command._pass;
    result._owner = command._owner;
    result._debugOverlappingFrustums = command._debugOverlappingFrustums;
    result._pickId = command._pickId;
    result._snapId = command._snapId;
    result._pickMetadataAllowed = command._pickMetadataAllowed;
    result._pickedMetadataInfo = command._pickedMetadataInfo;
    result._flags = command._flags;
    result.dirty = true;
    result.lastDirtyTime = 0;
    return result;
  }
  /**
   * Executes the draw command.
   *
   * @param {Context} context The renderer context in which to draw.
   * @param {PassState} [passState] The state for the current render pass.
   */
  execute(context, passState) {
    context.draw(this, passState);
  }
};
function hasFlag(command, flag) {
  return (command._flags & flag) === flag;
}
function setFlag(command, flag, value) {
  if (value) {
    command._flags |= flag;
  } else {
    command._flags &= ~flag;
  }
}
var DrawCommand_default = DrawCommand;

// packages/engine/Source/Renderer/AutomaticUniforms.js
var viewerPositionWCScratch = new Cartesian3_default();
function AutomaticUniform(options) {
  this._size = options.size;
  this._datatype = options.datatype;
  this.getValue = options.getValue;
}
var datatypeToGlsl = {};
datatypeToGlsl[WebGLConstants_default.FLOAT] = "float";
datatypeToGlsl[WebGLConstants_default.FLOAT_VEC2] = "vec2";
datatypeToGlsl[WebGLConstants_default.FLOAT_VEC3] = "vec3";
datatypeToGlsl[WebGLConstants_default.FLOAT_VEC4] = "vec4";
datatypeToGlsl[WebGLConstants_default.INT] = "int";
datatypeToGlsl[WebGLConstants_default.INT_VEC2] = "ivec2";
datatypeToGlsl[WebGLConstants_default.INT_VEC3] = "ivec3";
datatypeToGlsl[WebGLConstants_default.INT_VEC4] = "ivec4";
datatypeToGlsl[WebGLConstants_default.BOOL] = "bool";
datatypeToGlsl[WebGLConstants_default.BOOL_VEC2] = "bvec2";
datatypeToGlsl[WebGLConstants_default.BOOL_VEC3] = "bvec3";
datatypeToGlsl[WebGLConstants_default.BOOL_VEC4] = "bvec4";
datatypeToGlsl[WebGLConstants_default.FLOAT_MAT2] = "mat2";
datatypeToGlsl[WebGLConstants_default.FLOAT_MAT3] = "mat3";
datatypeToGlsl[WebGLConstants_default.FLOAT_MAT4] = "mat4";
datatypeToGlsl[WebGLConstants_default.SAMPLER_2D] = "sampler2D";
datatypeToGlsl[WebGLConstants_default.SAMPLER_CUBE] = "samplerCube";
AutomaticUniform.prototype.getDeclaration = function(name) {
  let declaration = `uniform ${datatypeToGlsl[this._datatype]} ${name}`;
  const size = this._size;
  if (size === 1) {
    declaration += ";";
  } else {
    declaration += `[${size.toString()}];`;
  }
  return declaration;
};
var AutomaticUniforms = {
  /**
   * An automatic GLSL uniform containing the viewport's <code>x</code>, <code>y</code>, <code>width</code>,
   * and <code>height</code> properties in an <code>vec4</code>'s <code>x</code>, <code>y</code>, <code>z</code>,
   * and <code>w</code> components, respectively.
   *
   * @example
   * // GLSL declaration
   * uniform vec4 czm_viewport;
   *
   * // Scale the window coordinate components to [0, 1] by dividing
   * // by the viewport's width and height.
   * vec2 v = gl_FragCoord.xy / czm_viewport.zw;
   *
   * @see Context#getViewport
   */
  czm_viewport: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC4,
    getValue: function(uniformState) {
      return uniformState.viewportCartesian4;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 orthographic projection matrix that
   * transforms window coordinates to clip coordinates.  Clip coordinates is the
   * coordinate system for a vertex shader's <code>gl_Position</code> output.
   * <br /><br />
   * This transform is useful when a vertex shader inputs or manipulates window coordinates
   * as done by {@link BillboardCollection}.
   * <br /><br />
   * Do not confuse {@link czm_viewportTransformation} with <code>czm_viewportOrthographic</code>.
   * The former transforms from normalized device coordinates to window coordinates; the later transforms
   * from window coordinates to clip coordinates, and is often used to assign to <code>gl_Position</code>.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_viewportOrthographic;
   *
   * // Example
   * gl_Position = czm_viewportOrthographic * vec4(windowPosition, 0.0, 1.0);
   *
   * @see UniformState#viewportOrthographic
   * @see czm_viewport
   * @see czm_viewportTransformation
   * @see BillboardCollection
   */
  czm_viewportOrthographic: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.viewportOrthographic;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 transformation matrix that
   * transforms normalized device coordinates to window coordinates.  The context's
   * full viewport is used, and the depth range is assumed to be <code>near = 0</code>
   * and <code>far = 1</code>.
   * <br /><br />
   * This transform is useful when there is a need to manipulate window coordinates
   * in a vertex shader as done by {@link BillboardCollection}.  In many cases,
   * this matrix will not be used directly; instead, {@link czm_modelToWindowCoordinates}
   * will be used to transform directly from model to window coordinates.
   * <br /><br />
   * Do not confuse <code>czm_viewportTransformation</code> with {@link czm_viewportOrthographic}.
   * The former transforms from normalized device coordinates to window coordinates; the later transforms
   * from window coordinates to clip coordinates, and is often used to assign to <code>gl_Position</code>.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_viewportTransformation;
   *
   * // Use czm_viewportTransformation as part of the
   * // transform from model to window coordinates.
   * vec4 q = czm_modelViewProjection * positionMC;               // model to clip coordinates
   * q.xyz /= q.w;                                                // clip to normalized device coordinates (ndc)
   * q.xyz = (czm_viewportTransformation * vec4(q.xyz, 1.0)).xyz; // ndc to window coordinates
   *
   * @see UniformState#viewportTransformation
   * @see czm_viewport
   * @see czm_viewportOrthographic
   * @see czm_modelToWindowCoordinates
   * @see BillboardCollection
   */
  czm_viewportTransformation: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.viewportTransformation;
    }
  }),
  /**
   * An automatic GLSL uniform representing the depth of the scene
   * after the globe pass and then updated after the 3D Tiles pass.
   * The depth is packed into an RGBA texture.
   *
   * @example
   * // GLSL declaration
   * uniform sampler2D czm_globeDepthTexture;
   *
   * // Get the depth at the current fragment
   * vec2 coords = gl_FragCoord.xy / czm_viewport.zw;
   * float depth = czm_unpackDepth(texture(czm_globeDepthTexture, coords));
   */
  czm_globeDepthTexture: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.SAMPLER_2D,
    getValue: function(uniformState) {
      return uniformState.globeDepthTexture;
    }
  }),
  /**
   * An automatic GLSL uniform representing a texture containing edge IDs
   * from the 3D Tiles edge rendering pass. Used for edge detection and
   * avoiding z-fighting between edges and surfaces.
   *
   * @example
   * // GLSL declaration
   * uniform sampler2D czm_edgeIdTexture;
   *
   * // Get the edge ID at the current fragment
   * vec2 coords = gl_FragCoord.xy / czm_viewport.zw;
   * vec4 edgeId = texture(czm_edgeIdTexture, coords);
   */
  czm_edgeIdTexture: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.SAMPLER_2D,
    getValue: function(uniformState) {
      return uniformState.edgeIdTexture;
    }
  }),
  /**
   * An automatic GLSL uniform containing the edge color texture.
   * This texture contains the edge content rendered during the CESIUM_3D_TILE_EDGES pass.
   *
   * @example
   * // GLSL declaration
   * uniform sampler2D czm_edgeColorTexture;
   *
   * // Sample the edge color at the current fragment
   * vec2 coords = gl_FragCoord.xy / czm_viewport.zw;
   * vec4 edgeColor = texture(czm_edgeColorTexture, coords);
   */
  czm_edgeColorTexture: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.SAMPLER_2D,
    getValue: function(uniformState) {
      return uniformState.edgeColorTexture;
    }
  }),
  /**
   * An automatic GLSL uniform containing the packed depth texture produced by the
   * edge visibility pass. The depth is packed via czm_packDepth and should be
   * unpacked with czm_unpackDepth.
   *
   * @example
   * // GLSL declaration
   * uniform sampler2D czm_edgeDepthTexture;
   *
   * vec2 coords = gl_FragCoord.xy / czm_viewport.zw;
   * float d = czm_unpackDepth(texture(czm_edgeDepthTexture, coords));
   */
  czm_edgeDepthTexture: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.SAMPLER_2D,
    getValue: function(uniformState) {
      return uniformState.edgeDepthTexture;
    }
  }),
  /**
   * An automatic GLSL uniform containing the feature-ID texture produced by
   * the planar fill pre-pass (BENTLEY_materials_planar_fill). Non-behind
   * planar fill geometry writes its per-fragment feature ID here so that
   * behind fills can test whether the existing pixel belongs to the same
   * logical object.
   *
   * @example
   * // GLSL declaration
   * uniform sampler2D czm_planarFillIdTexture;
   *
   * // Sample
   * vec2 coords = gl_FragCoord.xy / czm_viewport.zw;
   * float existingFeatureId = texture(czm_planarFillIdTexture, coords).r;
   */
  czm_planarFillIdTexture: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.SAMPLER_2D,
    getValue: function(uniformState) {
      return uniformState.planarFillIdTexture;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 model transformation matrix that
   * transforms model coordinates to world coordinates.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_model;
   *
   * // Example
   * vec4 worldPosition = czm_model * modelPosition;
   *
   * @see UniformState#model
   * @see czm_inverseModel
   * @see czm_modelView
   * @see czm_modelViewProjection
   */
  czm_model: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.model;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 model transformation matrix that
   * transforms world coordinates to model coordinates.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_inverseModel;
   *
   * // Example
   * vec4 modelPosition = czm_inverseModel * worldPosition;
   *
   * @see UniformState#inverseModel
   * @see czm_model
   * @see czm_inverseModelView
   */
  czm_inverseModel: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.inverseModel;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 view transformation matrix that
   * transforms world coordinates to eye coordinates.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_view;
   *
   * // Example
   * vec4 eyePosition = czm_view * worldPosition;
   *
   * @see UniformState#view
   * @see czm_viewRotation
   * @see czm_modelView
   * @see czm_viewProjection
   * @see czm_modelViewProjection
   * @see czm_inverseView
   */
  czm_view: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.view;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 view transformation matrix that
   * transforms 3D world coordinates to eye coordinates.  In 3D mode, this is identical to
   * {@link czm_view}, but in 2D and Columbus View it represents the view matrix
   * as if the camera were at an equivalent location in 3D mode.  This is useful for lighting
   * 2D and Columbus View in the same way that 3D is lit.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_view3D;
   *
   * // Example
   * vec4 eyePosition3D = czm_view3D * worldPosition3D;
   *
   * @see UniformState#view3D
   * @see czm_view
   */
  czm_view3D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.view3D;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 3x3 view rotation matrix that
   * transforms vectors in world coordinates to eye coordinates.
   *
   * @example
   * // GLSL declaration
   * uniform mat3 czm_viewRotation;
   *
   * // Example
   * vec3 eyeVector = czm_viewRotation * worldVector;
   *
   * @see UniformState#viewRotation
   * @see czm_view
   * @see czm_inverseView
   * @see czm_inverseViewRotation
   */
  czm_viewRotation: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT3,
    getValue: function(uniformState) {
      return uniformState.viewRotation;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 3x3 view rotation matrix that
   * transforms vectors in 3D world coordinates to eye coordinates.  In 3D mode, this is identical to
   * {@link czm_viewRotation}, but in 2D and Columbus View it represents the view matrix
   * as if the camera were at an equivalent location in 3D mode.  This is useful for lighting
   * 2D and Columbus View in the same way that 3D is lit.
   *
   * @example
   * // GLSL declaration
   * uniform mat3 czm_viewRotation3D;
   *
   * // Example
   * vec3 eyeVector = czm_viewRotation3D * worldVector;
   *
   * @see UniformState#viewRotation3D
   * @see czm_viewRotation
   */
  czm_viewRotation3D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT3,
    getValue: function(uniformState) {
      return uniformState.viewRotation3D;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 transformation matrix that
   * transforms from eye coordinates to world coordinates.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_inverseView;
   *
   * // Example
   * vec4 worldPosition = czm_inverseView * eyePosition;
   *
   * @see UniformState#inverseView
   * @see czm_view
   * @see czm_inverseNormal
   */
  czm_inverseView: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.inverseView;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 transformation matrix that
   * transforms from 3D eye coordinates to world coordinates.  In 3D mode, this is identical to
   * {@link czm_inverseView}, but in 2D and Columbus View it represents the inverse view matrix
   * as if the camera were at an equivalent location in 3D mode.  This is useful for lighting
   * 2D and Columbus View in the same way that 3D is lit.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_inverseView3D;
   *
   * // Example
   * vec4 worldPosition = czm_inverseView3D * eyePosition;
   *
   * @see UniformState#inverseView3D
   * @see czm_inverseView
   */
  czm_inverseView3D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.inverseView3D;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 3x3 rotation matrix that
   * transforms vectors from eye coordinates to world coordinates.
   *
   * @example
   * // GLSL declaration
   * uniform mat3 czm_inverseViewRotation;
   *
   * // Example
   * vec4 worldVector = czm_inverseViewRotation * eyeVector;
   *
   * @see UniformState#inverseView
   * @see czm_view
   * @see czm_viewRotation
   * @see czm_inverseViewRotation
   */
  czm_inverseViewRotation: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT3,
    getValue: function(uniformState) {
      return uniformState.inverseViewRotation;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 3x3 rotation matrix that
   * transforms vectors from 3D eye coordinates to world coordinates.  In 3D mode, this is identical to
   * {@link czm_inverseViewRotation}, but in 2D and Columbus View it represents the inverse view matrix
   * as if the camera were at an equivalent location in 3D mode.  This is useful for lighting
   * 2D and Columbus View in the same way that 3D is lit.
   *
   * @example
   * // GLSL declaration
   * uniform mat3 czm_inverseViewRotation3D;
   *
   * // Example
   * vec4 worldVector = czm_inverseViewRotation3D * eyeVector;
   *
   * @see UniformState#inverseView3D
   * @see czm_inverseViewRotation
   */
  czm_inverseViewRotation3D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT3,
    getValue: function(uniformState) {
      return uniformState.inverseViewRotation3D;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 projection transformation matrix that
   * transforms eye coordinates to clip coordinates.  Clip coordinates is the
   * coordinate system for a vertex shader's <code>gl_Position</code> output.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_projection;
   *
   * // Example
   * gl_Position = czm_projection * eyePosition;
   *
   * @see UniformState#projection
   * @see czm_viewProjection
   * @see czm_modelViewProjection
   * @see czm_infiniteProjection
   */
  czm_projection: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.projection;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 inverse projection transformation matrix that
   * transforms from clip coordinates to eye coordinates. Clip coordinates is the
   * coordinate system for a vertex shader's <code>gl_Position</code> output.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_inverseProjection;
   *
   * // Example
   * vec4 eyePosition = czm_inverseProjection * clipPosition;
   *
   * @see UniformState#inverseProjection
   * @see czm_projection
   */
  czm_inverseProjection: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.inverseProjection;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 projection transformation matrix with the far plane at infinity,
   * that transforms eye coordinates to clip coordinates.  Clip coordinates is the
   * coordinate system for a vertex shader's <code>gl_Position</code> output.  An infinite far plane is used
   * in algorithms like shadow volumes and GPU ray casting with proxy geometry to ensure that triangles
   * are not clipped by the far plane.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_infiniteProjection;
   *
   * // Example
   * gl_Position = czm_infiniteProjection * eyePosition;
   *
   * @see UniformState#infiniteProjection
   * @see czm_projection
   * @see czm_modelViewInfiniteProjection
   */
  czm_infiniteProjection: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.infiniteProjection;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 model-view transformation matrix that
   * transforms model coordinates to eye coordinates.
   * <br /><br />
   * Positions should be transformed to eye coordinates using <code>czm_modelView</code> and
   * normals should be transformed using {@link czm_normal}.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_modelView;
   *
   * // Example
   * vec4 eyePosition = czm_modelView * modelPosition;
   *
   * // The above is equivalent to, but more efficient than:
   * vec4 eyePosition = czm_view * czm_model * modelPosition;
   *
   * @see UniformState#modelView
   * @see czm_model
   * @see czm_view
   * @see czm_modelViewProjection
   * @see czm_normal
   */
  czm_modelView: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.modelView;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 model-view transformation matrix that
   * transforms 3D model coordinates to eye coordinates.  In 3D mode, this is identical to
   * {@link czm_modelView}, but in 2D and Columbus View it represents the model-view matrix
   * as if the camera were at an equivalent location in 3D mode.  This is useful for lighting
   * 2D and Columbus View in the same way that 3D is lit.
   * <br /><br />
   * Positions should be transformed to eye coordinates using <code>czm_modelView3D</code> and
   * normals should be transformed using {@link czm_normal3D}.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_modelView3D;
   *
   * // Example
   * vec4 eyePosition = czm_modelView3D * modelPosition;
   *
   * // The above is equivalent to, but more efficient than:
   * vec4 eyePosition = czm_view3D * czm_model * modelPosition;
   *
   * @see UniformState#modelView3D
   * @see czm_modelView
   */
  czm_modelView3D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.modelView3D;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 model-view transformation matrix that
   * transforms model coordinates, relative to the eye, to eye coordinates.  This is used
   * in conjunction with {@link czm_translateRelativeToEye}.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_modelViewRelativeToEye;
   *
   * // Example
   * attribute vec3 positionHigh;
   * attribute vec3 positionLow;
   *
   * void main()
   * {
   *   vec4 p = czm_translateRelativeToEye(positionHigh, positionLow);
   *   gl_Position = czm_projection * (czm_modelViewRelativeToEye * p);
   * }
   *
   * @see czm_modelViewProjectionRelativeToEye
   * @see czm_translateRelativeToEye
   * @see EncodedCartesian3
   */
  czm_modelViewRelativeToEye: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.modelViewRelativeToEye;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 transformation matrix that
   * transforms from eye coordinates to model coordinates.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_inverseModelView;
   *
   * // Example
   * vec4 modelPosition = czm_inverseModelView * eyePosition;
   *
   * @see UniformState#inverseModelView
   * @see czm_modelView
   */
  czm_inverseModelView: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.inverseModelView;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 transformation matrix that
   * transforms from eye coordinates to 3D model coordinates.  In 3D mode, this is identical to
   * {@link czm_inverseModelView}, but in 2D and Columbus View it represents the inverse model-view matrix
   * as if the camera were at an equivalent location in 3D mode.  This is useful for lighting
   * 2D and Columbus View in the same way that 3D is lit.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_inverseModelView3D;
   *
   * // Example
   * vec4 modelPosition = czm_inverseModelView3D * eyePosition;
   *
   * @see UniformState#inverseModelView
   * @see czm_inverseModelView
   * @see czm_modelView3D
   */
  czm_inverseModelView3D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.inverseModelView3D;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 view-projection transformation matrix that
   * transforms world coordinates to clip coordinates.  Clip coordinates is the
   * coordinate system for a vertex shader's <code>gl_Position</code> output.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_viewProjection;
   *
   * // Example
   * vec4 gl_Position = czm_viewProjection * czm_model * modelPosition;
   *
   * // The above is equivalent to, but more efficient than:
   * gl_Position = czm_projection * czm_view * czm_model * modelPosition;
   *
   * @see UniformState#viewProjection
   * @see czm_view
   * @see czm_projection
   * @see czm_modelViewProjection
   * @see czm_inverseViewProjection
   */
  czm_viewProjection: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.viewProjection;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 view-projection transformation matrix that
   * transforms clip coordinates to world coordinates.  Clip coordinates is the
   * coordinate system for a vertex shader's <code>gl_Position</code> output.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_inverseViewProjection;
   *
   * // Example
   * vec4 worldPosition = czm_inverseViewProjection * clipPosition;
   *
   * @see UniformState#inverseViewProjection
   * @see czm_viewProjection
   */
  czm_inverseViewProjection: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.inverseViewProjection;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 model-view-projection transformation matrix that
   * transforms model coordinates to clip coordinates.  Clip coordinates is the
   * coordinate system for a vertex shader's <code>gl_Position</code> output.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_modelViewProjection;
   *
   * // Example
   * vec4 gl_Position = czm_modelViewProjection * modelPosition;
   *
   * // The above is equivalent to, but more efficient than:
   * gl_Position = czm_projection * czm_view * czm_model * modelPosition;
   *
   * @see UniformState#modelViewProjection
   * @see czm_model
   * @see czm_view
   * @see czm_projection
   * @see czm_modelView
   * @see czm_viewProjection
   * @see czm_modelViewInfiniteProjection
   * @see czm_inverseModelViewProjection
   */
  czm_modelViewProjection: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.modelViewProjection;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 inverse model-view-projection transformation matrix that
   * transforms clip coordinates to model coordinates.  Clip coordinates is the
   * coordinate system for a vertex shader's <code>gl_Position</code> output.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_inverseModelViewProjection;
   *
   * // Example
   * vec4 modelPosition = czm_inverseModelViewProjection * clipPosition;
   *
   * @see UniformState#modelViewProjection
   * @see czm_modelViewProjection
   */
  czm_inverseModelViewProjection: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.inverseModelViewProjection;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 model-view-projection transformation matrix that
   * transforms model coordinates, relative to the eye, to clip coordinates.  Clip coordinates is the
   * coordinate system for a vertex shader's <code>gl_Position</code> output.  This is used in
   * conjunction with {@link czm_translateRelativeToEye}.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_modelViewProjectionRelativeToEye;
   *
   * // Example
   * attribute vec3 positionHigh;
   * attribute vec3 positionLow;
   *
   * void main()
   * {
   *   vec4 p = czm_translateRelativeToEye(positionHigh, positionLow);
   *   gl_Position = czm_modelViewProjectionRelativeToEye * p;
   * }
   *
   * @see czm_modelViewRelativeToEye
   * @see czm_translateRelativeToEye
   * @see EncodedCartesian3
   */
  czm_modelViewProjectionRelativeToEye: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.modelViewProjectionRelativeToEye;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 4x4 model-view-projection transformation matrix that
   * transforms model coordinates to clip coordinates.  Clip coordinates is the
   * coordinate system for a vertex shader's <code>gl_Position</code> output.  The projection matrix places
   * the far plane at infinity.  This is useful in algorithms like shadow volumes and GPU ray casting with
   * proxy geometry to ensure that triangles are not clipped by the far plane.
   *
   * @example
   * // GLSL declaration
   * uniform mat4 czm_modelViewInfiniteProjection;
   *
   * // Example
   * vec4 gl_Position = czm_modelViewInfiniteProjection * modelPosition;
   *
   * // The above is equivalent to, but more efficient than:
   * gl_Position = czm_infiniteProjection * czm_view * czm_model * modelPosition;
   *
   * @see UniformState#modelViewInfiniteProjection
   * @see czm_model
   * @see czm_view
   * @see czm_infiniteProjection
   * @see czm_modelViewProjection
   */
  czm_modelViewInfiniteProjection: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.modelViewInfiniteProjection;
    }
  }),
  /**
   * An automatic GLSL uniform that indicates if the current camera is orthographic in 3D.
   *
   * @see UniformState#orthographicIn3D
   */
  czm_orthographicIn3D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.orthographicIn3D ? 1 : 0;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 3x3 normal transformation matrix that
   * transforms normal vectors in model coordinates to eye coordinates.
   * <br /><br />
   * Positions should be transformed to eye coordinates using {@link czm_modelView} and
   * normals should be transformed using <code>czm_normal</code>.
   *
   * @example
   * // GLSL declaration
   * uniform mat3 czm_normal;
   *
   * // Example
   * vec3 eyeNormal = czm_normal * normal;
   *
   * @see UniformState#normal
   * @see czm_inverseNormal
   * @see czm_modelView
   */
  czm_normal: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT3,
    getValue: function(uniformState) {
      return uniformState.normal;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 3x3 normal transformation matrix that
   * transforms normal vectors in 3D model coordinates to eye coordinates.
   * In 3D mode, this is identical to
   * {@link czm_normal}, but in 2D and Columbus View it represents the normal transformation
   * matrix as if the camera were at an equivalent location in 3D mode.  This is useful for lighting
   * 2D and Columbus View in the same way that 3D is lit.
   * <br /><br />
   * Positions should be transformed to eye coordinates using {@link czm_modelView3D} and
   * normals should be transformed using <code>czm_normal3D</code>.
   *
   * @example
   * // GLSL declaration
   * uniform mat3 czm_normal3D;
   *
   * // Example
   * vec3 eyeNormal = czm_normal3D * normal;
   *
   * @see UniformState#normal3D
   * @see czm_normal
   */
  czm_normal3D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT3,
    getValue: function(uniformState) {
      return uniformState.normal3D;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 3x3 normal transformation matrix that
   * transforms normal vectors in eye coordinates to model coordinates.  This is
   * the opposite of the transform provided by {@link czm_normal}.
   *
   * @example
   * // GLSL declaration
   * uniform mat3 czm_inverseNormal;
   *
   * // Example
   * vec3 normalMC = czm_inverseNormal * normalEC;
   *
   * @see UniformState#inverseNormal
   * @see czm_normal
   * @see czm_modelView
   * @see czm_inverseView
   */
  czm_inverseNormal: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT3,
    getValue: function(uniformState) {
      return uniformState.inverseNormal;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 3x3 normal transformation matrix that
   * transforms normal vectors in eye coordinates to 3D model coordinates.  This is
   * the opposite of the transform provided by {@link czm_normal}.
   * In 3D mode, this is identical to
   * {@link czm_inverseNormal}, but in 2D and Columbus View it represents the inverse normal transformation
   * matrix as if the camera were at an equivalent location in 3D mode.  This is useful for lighting
   * 2D and Columbus View in the same way that 3D is lit.
   *
   * @example
   * // GLSL declaration
   * uniform mat3 czm_inverseNormal3D;
   *
   * // Example
   * vec3 normalMC = czm_inverseNormal3D * normalEC;
   *
   * @see UniformState#inverseNormal3D
   * @see czm_inverseNormal
   */
  czm_inverseNormal3D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT3,
    getValue: function(uniformState) {
      return uniformState.inverseNormal3D;
    }
  }),
  /**
   * An automatic GLSL uniform containing the height in meters of the
   * eye (camera) above or below the ellipsoid.
   *
   * @see UniformState#eyeHeight
   */
  czm_eyeHeight: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.eyeHeight;
    }
  }),
  /**
   * An automatic GLSL uniform containing the geodetic longitude (<code>x</code>),
   * latitude (<code>y</code>) in radians and height (<code>z</code>) in meters of the
   * eye (camera). The <code>z</code> component matches {@link czm_eyeHeight}.
   * This uniform is only valid when the {@link SceneMode} is <code>SCENE3D</code>.
   *
   * @example
   * // GLSL declaration
   * uniform vec3 czm_eyeCartographic;
   *
   * // Example
   * float cameraLatitude = czm_eyeCartographic.y;
   */
  czm_eyeCartographic: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.eyeCartographic;
    }
  }),
  /**
   * An automatic GLSL uniform containing height (<code>x</code>) and height squared (<code>y</code>)
   * in meters of the eye (camera) above the 2D world plane. This uniform is only valid
   * when the {@link SceneMode} is <code>SCENE2D</code>.
   *
   * @see UniformState#eyeHeight2D
   */
  czm_eyeHeight2D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC2,
    getValue: function(uniformState) {
      return uniformState.eyeHeight2D;
    }
  }),
  /**
   * An automatic GLSL uniform containing the ellipsoid surface normal
   * at the position below the eye (camera), in eye coordinates.
   * This uniform is only valid when the {@link SceneMode} is <code>SCENE3D</code>.
   */
  czm_eyeEllipsoidNormalEC: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.eyeEllipsoidNormalEC;
    }
  }),
  /**
   * An automatic GLSL uniform containing the ellipsoid radii of curvature at the camera position.
   * The .x component is the prime vertical radius of curvature (east-west direction)
   * .y is the meridional radius of curvature (north-south direction)
   * This uniform is only valid when the {@link SceneMode} is <code>SCENE3D</code>.
   */
  czm_eyeEllipsoidCurvature: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC2,
    getValue: function(uniformState) {
      return uniformState.eyeEllipsoidCurvature;
    }
  }),
  /**
   * An automatic GLSL uniform containing a 3x3 rotation from eye coordinates to an
   * east-north-up coordinate system centered at the position on the ellipsoid below
   * the camera.
   * This uniform is only valid when the {@link SceneMode} is <code>SCENE3D</code>.
   *
   * @example
   * // GLSL declaration
   * uniform mat3 czm_eyeToEnu;
   *
   * // Example
   * vec3 enu = czm_eyeToEnu * positionEC;
   */
  czm_eyeToEnu: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT3,
    getValue: function(uniformState) {
      return uniformState.eyeToEnu;
    }
  }),
  /**
   * An automatic GLSL uniform containing the transform from model coordinates
   * to an east-north-up coordinate system centered at the position on the
   * ellipsoid nearest to the camera.
   * This uniform is only valid when the {@link SceneMode} is <code>SCENE3D</code>.
   */
  czm_modelToEnu: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.modelToEnu;
    }
  }),
  /**
   * An automatic GLSL uniform containing the inverse of
   * {@link AutomaticUniforms.czm_modelToEnu}.
   * This uniform is only valid when the {@link SceneMode} is <code>SCENE3D</code>.
   */
  czm_enuToModel: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT4,
    getValue: function(uniformState) {
      return uniformState.enuToModel;
    }
  }),
  /**
   * An automatic GLSL uniform containing the near distance (<code>x</code>) and the far distance (<code>y</code>)
   * of the frustum defined by the camera.  This is the largest possible frustum, not an individual
   * frustum used for multi-frustum rendering.
   *
   * @example
   * // GLSL declaration
   * uniform vec2 czm_entireFrustum;
   *
   * // Example
   * float frustumLength = czm_entireFrustum.y - czm_entireFrustum.x;
   *
   * @see UniformState#entireFrustum
   * @see czm_currentFrustum
   */
  czm_entireFrustum: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC2,
    getValue: function(uniformState) {
      return uniformState.entireFrustum;
    }
  }),
  /**
   * An automatic GLSL uniform containing the near distance (<code>x</code>) and the far distance (<code>y</code>)
   * of the frustum defined by the camera.  This is the individual
   * frustum used for multi-frustum rendering.
   *
   * @example
   * // GLSL declaration
   * uniform vec2 czm_currentFrustum;
   *
   * // Example
   * float frustumLength = czm_currentFrustum.y - czm_currentFrustum.x;
   *
   * @see UniformState#currentFrustum
   * @see czm_entireFrustum
   */
  czm_currentFrustum: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC2,
    getValue: function(uniformState) {
      return uniformState.currentFrustum;
    }
  }),
  /**
   * The distances to the frustum planes. The top, bottom, left and right distances are
   * the x, y, z, and w components, respectively.
   */
  czm_frustumPlanes: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC4,
    getValue: function(uniformState) {
      return uniformState.frustumPlanes;
    }
  }),
  /**
   * Gets the far plane's distance from the near plane, plus 1.0.
   */
  czm_farDepthFromNearPlusOne: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.farDepthFromNearPlusOne;
    }
  }),
  /**
   * Gets the log2 of {@link AutomaticUniforms#czm_farDepthFromNearPlusOne}.
   */
  czm_log2FarDepthFromNearPlusOne: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.log2FarDepthFromNearPlusOne;
    }
  }),
  /**
   * Gets 1.0 divided by {@link AutomaticUniforms#czm_log2FarDepthFromNearPlusOne}.
   */
  czm_oneOverLog2FarDepthFromNearPlusOne: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.oneOverLog2FarDepthFromNearPlusOne;
    }
  }),
  /**
   * An automatic GLSL uniform representing the sun position in world coordinates.
   *
   * @example
   * // GLSL declaration
   * uniform vec3 czm_sunPositionWC;
   *
   * @see UniformState#sunPositionWC
   * @see czm_sunPositionColumbusView
   * @see czm_sunDirectionWC
   */
  czm_sunPositionWC: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.sunPositionWC;
    }
  }),
  /**
   * An automatic GLSL uniform representing the sun position in Columbus view world coordinates.
   *
   * @example
   * // GLSL declaration
   * uniform vec3 czm_sunPositionColumbusView;
   *
   * @see UniformState#sunPositionColumbusView
   * @see czm_sunPositionWC
   */
  czm_sunPositionColumbusView: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.sunPositionColumbusView;
    }
  }),
  /**
   * An automatic GLSL uniform representing the normalized direction to the sun in eye coordinates.
   *
   * @example
   * // GLSL declaration
   * uniform vec3 czm_sunDirectionEC;
   *
   * // Example
   * float diffuse = max(dot(czm_sunDirectionEC, normalEC), 0.0);
   *
   * @see UniformState#sunDirectionEC
   * @see czm_moonDirectionEC
   * @see czm_sunDirectionWC
   */
  czm_sunDirectionEC: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.sunDirectionEC;
    }
  }),
  /**
   * An automatic GLSL uniform representing the normalized direction to the sun in world coordinates.
   *
   * @example
   * // GLSL declaration
   * uniform vec3 czm_sunDirectionWC;
   *
   * // Example
   * float diffuse = max(dot(czm_sunDirectionWC, normalWC), 0.0);
   *
   * @see UniformState#sunDirectionWC
   * @see czm_sunPositionWC
   * @see czm_sunDirectionEC
   */
  czm_sunDirectionWC: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.sunDirectionWC;
    }
  }),
  /**
   * An automatic GLSL uniform representing the normalized direction to the moon in eye coordinates.
   *
   * @example
   * // GLSL declaration
   * uniform vec3 czm_moonDirectionEC;
   *
   * // Example
   * float diffuse = max(dot(czm_moonDirectionEC, normalEC), 0.0);
   *
   * @see UniformState#moonDirectionEC
   * @see czm_sunDirectionEC
   */
  czm_moonDirectionEC: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.moonDirectionEC;
    }
  }),
  /**
   * An automatic GLSL uniform representing the normalized direction to the scene's light source in eye coordinates.
   * This is commonly used for directional lighting computations.
   *
   * @example
   * // GLSL declaration
   * uniform vec3 czm_lightDirectionEC;
   *
   * // Example
   * float diffuse = max(dot(czm_lightDirectionEC, normalEC), 0.0);
   *
   * @see UniformState#lightDirectionEC
   * @see czm_lightDirectionWC
   */
  czm_lightDirectionEC: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.lightDirectionEC;
    }
  }),
  /**
   * An automatic GLSL uniform representing the normalized direction to the scene's light source in world coordinates.
   * This is commonly used for directional lighting computations.
   *
   * @example
   * // GLSL declaration
   * uniform vec3 czm_lightDirectionWC;
   *
   * // Example
   * float diffuse = max(dot(czm_lightDirectionWC, normalWC), 0.0);
   *
   * @see UniformState#lightDirectionWC
   * @see czm_lightDirectionEC
   */
  czm_lightDirectionWC: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.lightDirectionWC;
    }
  }),
  /**
   * An automatic GLSL uniform that represents the color of light emitted by the scene's light source. This
   * is equivalent to the light color multiplied by the light intensity limited to a maximum luminance of 1.0
   * suitable for non-HDR lighting.
   *
   * @example
   * // GLSL declaration
   * uniform vec3 czm_lightColor;
   *
   * // Example
   * vec3 diffuseColor = czm_lightColor * max(dot(czm_lightDirectionWC, normalWC), 0.0);
   *
   * @see UniformState#lightColor
   * @see czm_lightColorHdr
   */
  czm_lightColor: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.lightColor;
    }
  }),
  /**
   * An automatic GLSL uniform that represents the high dynamic range color of light emitted by the scene's light
   * source. This is equivalent to the light color multiplied by the light intensity suitable for HDR lighting.
   *
   * @example
   * // GLSL declaration
   * uniform vec3 czm_lightColorHdr;
   *
   * // Example
   * vec3 diffuseColor = czm_lightColorHdr * max(dot(czm_lightDirectionWC, normalWC), 0.0);
   *
   * @see UniformState#lightColorHdr
   * @see czm_lightColor
   */
  czm_lightColorHdr: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.lightColorHdr;
    }
  }),
  /**
   * An automatic GLSL uniform representing the high bits of the camera position in model
   * coordinates.  This is used for GPU RTE to eliminate jittering artifacts when rendering
   * as described in {@link http://help.agi.com/AGIComponents/html/BlogPrecisionsPrecisions.htm|Precisions, Precisions}.
   *
   * @example
   * // GLSL declaration
   * uniform vec3 czm_encodedCameraPositionMCHigh;
   *
   * @see czm_encodedCameraPositionMCLow
   * @see czm_modelViewRelativeToEye
   * @see czm_modelViewProjectionRelativeToEye
   */
  czm_encodedCameraPositionMCHigh: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.encodedCameraPositionMCHigh;
    }
  }),
  /**
   * An automatic GLSL uniform representing the low bits of the camera position in model
   * coordinates.  This is used for GPU RTE to eliminate jittering artifacts when rendering
   * as described in {@linkhttp://help.agi.com/AGIComponents/html/BlogPrecisionsPrecisions.htm|Precisions, Precisions}.
   *
   * @example
   * // GLSL declaration
   * uniform vec3 czm_encodedCameraPositionMCLow;
   *
   * @see czm_encodedCameraPositionMCHigh
   * @see czm_modelViewRelativeToEye
   * @see czm_modelViewProjectionRelativeToEye
   */
  czm_encodedCameraPositionMCLow: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.encodedCameraPositionMCLow;
    }
  }),
  /**
   * An automatic GLSL uniform representing the position of the viewer (camera) in world coordinates.
   *
   * @example
   * // GLSL declaration
   * uniform vec3 czm_viewerPositionWC;
   */
  czm_viewerPositionWC: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return Matrix4_default.getTranslation(
        uniformState.inverseView,
        viewerPositionWCScratch
      );
    }
  }),
  /**
   * An automatic GLSL uniform representing the frame number. This uniform is automatically incremented
   * every frame.
   *
   * @example
   * // GLSL declaration
   * uniform float czm_frameNumber;
   */
  czm_frameNumber: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.frameState.frameNumber;
    }
  }),
  /**
   * An automatic GLSL uniform representing the current morph transition time between
   * 2D/Columbus View and 3D, with 0.0 being 2D or Columbus View and 1.0 being 3D.
   *
   * @example
   * // GLSL declaration
   * uniform float czm_morphTime;
   *
   * // Example
   * vec4 p = czm_columbusViewMorph(position2D, position3D, czm_morphTime);
   */
  czm_morphTime: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.frameState.morphTime;
    }
  }),
  /**
   * An automatic GLSL uniform representing the current {@link SceneMode}, expressed
   * as a float.
   *
   * @example
   * // GLSL declaration
   * uniform float czm_sceneMode;
   *
   * // Example
   * if (czm_sceneMode == czm_sceneMode2D)
   * {
   *     eyeHeightSq = czm_eyeHeight2D.y;
   * }
   *
   * @see czm_sceneMode2D
   * @see czm_sceneModeColumbusView
   * @see czm_sceneMode3D
   * @see czm_sceneModeMorphing
   */
  czm_sceneMode: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.frameState.mode;
    }
  }),
  /**
   * An automatic GLSL uniform representing the current rendering pass.
   *
   * @example
   * // GLSL declaration
   * uniform float czm_pass;
   *
   * // Example
   * if ((czm_pass == czm_passTranslucent) && isOpaque())
   * {
   *     gl_Position *= 0.0; // Cull opaque geometry in the translucent pass
   * }
   */
  czm_pass: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.pass;
    }
  }),
  /**
   * An automatic GLSL uniform representing the current scene background color.
   *
   * @example
   * // GLSL declaration
   * uniform vec4 czm_backgroundColor;
   *
   * // Example: If the given color's RGB matches the background color, invert it.
   * vec4 adjustColorForContrast(vec4 color)
   * {
   *     if (czm_backgroundColor.rgb == color.rgb)
   *     {
   *         color.rgb = vec3(1.0) - color.rgb;
   *     }
   *
   *     return color;
   * }
   */
  czm_backgroundColor: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC4,
    getValue: function(uniformState) {
      return uniformState.backgroundColor;
    }
  }),
  /**
   * An automatic GLSL uniform containing the BRDF look up texture used for image-based lighting computations.
   *
   * @example
   * // GLSL declaration
   * uniform sampler2D czm_brdfLut;
   *
   * // Example: For a given roughness and NdotV value, find the material's BRDF information in the red and green channels
   * float roughness = 0.5;
   * float NdotV = dot(normal, view);
   * vec2 brdfLut = texture(czm_brdfLut, vec2(NdotV, roughness)).rg;
   */
  czm_brdfLut: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.SAMPLER_2D,
    getValue: function(uniformState) {
      return uniformState.brdfLut;
    }
  }),
  /**
   * An automatic GLSL uniform containing the environment map used within the scene.
   *
   * @example
   * // GLSL declaration
   * uniform samplerCube czm_environmentMap;
   *
   * // Example: Create a perfect reflection of the environment map on a  model
   * float reflected = reflect(view, normal);
   * vec4 reflectedColor = texture(czm_environmentMap, reflected);
   */
  czm_environmentMap: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.SAMPLER_CUBE,
    getValue: function(uniformState) {
      return uniformState.environmentMap;
    }
  }),
  /**
   * An automatic GLSL uniform containing the specular environment cube map used within the scene.
   *
   * @example
   * // GLSL declaration
   * uniform samplerCube czm_specularEnvironmentMaps;
   */
  czm_specularEnvironmentMaps: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.SAMPLER_CUBE,
    getValue: function(uniformState) {
      return uniformState.specularEnvironmentMaps;
    }
  }),
  /**
   * An automatic GLSL uniform containing the maximum valid level-of-detail of the specular environment cube map used within the scene.
   *
   * @example
   * // GLSL declaration
   * uniform float czm_specularEnvironmentMapsMaximumLOD;
   */
  czm_specularEnvironmentMapsMaximumLOD: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.specularEnvironmentMapsMaximumLOD;
    }
  }),
  /**
   * An automatic GLSL uniform containing the spherical harmonic coefficients used within the scene.
   *
   * @example
   * // GLSL declaration
   * uniform vec3[9] czm_sphericalHarmonicCoefficients;
   */
  czm_sphericalHarmonicCoefficients: new AutomaticUniform({
    size: 9,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.sphericalHarmonicCoefficients;
    }
  }),
  /**
   * An automatic GLSL uniform representing a 3x3 rotation matrix that transforms
   * from True Equator Mean Equinox (TEME) axes to the pseudo-fixed axes at the current scene time.
   *
   * @example
   * // GLSL declaration
   * uniform mat3 czm_temeToPseudoFixed;
   *
   * // Example
   * vec3 pseudoFixed = czm_temeToPseudoFixed * teme;
   *
   * @see UniformState#temeToPseudoFixedMatrix
   * @see Transforms.computeTemeToPseudoFixedMatrix
   */
  czm_temeToPseudoFixed: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_MAT3,
    getValue: function(uniformState) {
      return uniformState.temeToPseudoFixedMatrix;
    }
  }),
  /**
   * An automatic GLSL uniform representing the ratio of canvas coordinate space to canvas pixel space.
   *
   * @example
   * uniform float czm_pixelRatio;
   */
  czm_pixelRatio: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.pixelRatio;
    }
  }),
  /**
   * An automatic GLSL uniform scalar used to mix a color with the fog color based on the distance to the camera.
   *
   * @see czm_fog
   */
  czm_fogDensity: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.fogDensity;
    }
  }),
  /**
   * An automatic GLSL uniform scalar used to mix a color with the fog color based on the distance to the camera.
   *
   * @see czm_fog
   */
  czm_fogVisualDensityScalar: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.fogVisualDensityScalar;
    }
  }),
  /**
   * An automatic GLSL uniform scalar used to set a minimum brightness when dynamic lighting is applied to fog.
   *
   * @see czm_fog
   */
  czm_fogMinimumBrightness: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.fogMinimumBrightness;
    }
  }),
  /**
   * An automatic uniform representing the color shift for the atmosphere in HSB color space
   *
   * @example
   * uniform vec3 czm_atmosphereHsbShift;
   */
  czm_atmosphereHsbShift: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.atmosphereHsbShift;
    }
  }),
  /**
   * An automatic uniform representing the intensity of the light that is used for computing the atmosphere color
   *
   * @example
   * uniform float czm_atmosphereLightIntensity;
   */
  czm_atmosphereLightIntensity: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.atmosphereLightIntensity;
    }
  }),
  /**
   * An automatic uniform representing the Rayleigh scattering coefficient used when computing the atmosphere scattering
   *
   * @example
   * uniform vec3 czm_atmosphereRayleighCoefficient;
   */
  czm_atmosphereRayleighCoefficient: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.atmosphereRayleighCoefficient;
    }
  }),
  /**
   * An automatic uniform representing the Rayleigh scale height in meters used for computing atmosphere scattering.
   *
   * @example
   * uniform vec3 czm_atmosphereRayleighScaleHeight;
   */
  czm_atmosphereRayleighScaleHeight: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.atmosphereRayleighScaleHeight;
    }
  }),
  /**
   * An automatic uniform representing the Mie scattering coefficient used when computing atmosphere scattering.
   *
   * @example
   * uniform vec3 czm_atmosphereMieCoefficient;
   */
  czm_atmosphereMieCoefficient: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.atmosphereMieCoefficient;
    }
  }),
  /**
   * An automatic uniform storign the Mie scale height used when computing atmosphere scattering.
   *
   * @example
   * uniform float czm_atmosphereMieScaleHeight;
   */
  czm_atmosphereMieScaleHeight: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.atmosphereMieScaleHeight;
    }
  }),
  /**
   * An automatic uniform representing the anisotropy of the medium to consider for Mie scattering.
   *
   * @example
   * uniform float czm_atmosphereAnisotropy;
   */
  czm_atmosphereMieAnisotropy: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.atmosphereMieAnisotropy;
    }
  }),
  /**
   * An automatic uniform representing which light source to use for dynamic lighting
   *
   * @example
   * uniform float czm_atmosphereDynamicLighting
   */
  czm_atmosphereDynamicLighting: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.atmosphereDynamicLighting;
    }
  }),
  /**
   * An automatic GLSL uniform representing the splitter position to use when rendering with a splitter.
   * This will be in pixel coordinates relative to the canvas.
   *
   * @example
   * // GLSL declaration
   * uniform float czm_splitPosition;
   */
  czm_splitPosition: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.splitPosition;
    }
  }),
  /**
   * An automatic GLSL uniform scalar representing the geometric tolerance per meter
   */
  czm_geometricToleranceOverMeter: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.geometricToleranceOverMeter;
    }
  }),
  /**
   * An automatic GLSL uniform representing the distance from the camera at which to disable the depth test of billboards, labels and points
   * to, for example, prevent clipping against terrain. When set to zero, the depth test should always be applied. When less than zero,
   * the depth test should never be applied.
   */
  czm_minimumDisableDepthTestDistance: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.minimumDisableDepthTestDistance;
    }
  }),
  /**
   * An automatic GLSL uniform that will be the highlight color of unclassified 3D Tiles.
   */
  czm_invertClassificationColor: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC4,
    getValue: function(uniformState) {
      return uniformState.invertClassificationColor;
    }
  }),
  /**
   * An automatic GLSL uniform that is used for gamma correction.
   */
  czm_gamma: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT,
    getValue: function(uniformState) {
      return uniformState.gamma;
    }
  }),
  /**
   * An automatic GLSL uniform that stores the ellipsoid radii.
   */
  czm_ellipsoidRadii: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.ellipsoid.radii;
    }
  }),
  /**
   * An automatic GLSL uniform that stores the ellipsoid inverse radii.
   */
  czm_ellipsoidInverseRadii: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants_default.FLOAT_VEC3,
    getValue: function(uniformState) {
      return uniformState.ellipsoid.oneOverRadii;
    }
  })
};
var AutomaticUniforms_default = AutomaticUniforms;

// packages/engine/Source/Renderer/createUniform.js
function createUniform(gl, activeUniform, uniformName, location) {
  switch (activeUniform.type) {
    case gl.FLOAT:
      return new UniformFloat(gl, activeUniform, uniformName, location);
    case gl.FLOAT_VEC2:
      return new UniformFloatVec2(gl, activeUniform, uniformName, location);
    case gl.FLOAT_VEC3:
      return new UniformFloatVec3(gl, activeUniform, uniformName, location);
    case gl.FLOAT_VEC4:
      return new UniformFloatVec4(gl, activeUniform, uniformName, location);
    case gl.SAMPLER_2D:
    case gl.SAMPLER_3D:
    case gl.SAMPLER_CUBE:
      return new UniformSampler(gl, activeUniform, uniformName, location);
    case gl.UNSIGNED_INT_SAMPLER_2D:
      return new UniformSampler(gl, activeUniform, uniformName, location);
    case gl.INT:
    case gl.BOOL:
      return new UniformInt(gl, activeUniform, uniformName, location);
    case gl.INT_VEC2:
    case gl.BOOL_VEC2:
      return new UniformIntVec2(gl, activeUniform, uniformName, location);
    case gl.INT_VEC3:
    case gl.BOOL_VEC3:
      return new UniformIntVec3(gl, activeUniform, uniformName, location);
    case gl.INT_VEC4:
    case gl.BOOL_VEC4:
      return new UniformIntVec4(gl, activeUniform, uniformName, location);
    case gl.FLOAT_MAT2:
      return new UniformMat2(gl, activeUniform, uniformName, location);
    case gl.FLOAT_MAT3:
      return new UniformMat3(gl, activeUniform, uniformName, location);
    case gl.FLOAT_MAT4:
      return new UniformMat4(gl, activeUniform, uniformName, location);
    default:
      throw new RuntimeError_default(
        `Unrecognized uniform type: ${activeUniform.type} for uniform "${uniformName}".`
      );
  }
}
var UniformFloat = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation} location
   */
  constructor(gl, activeUniform, uniformName, location) {
    this.name = uniformName;
    this.value = void 0;
    this._value = 0;
    this._gl = gl;
    this._location = location;
  }
  set() {
    if (this.value !== this._value) {
      this._value = this.value;
      this._gl.uniform1f(this._location, this.value);
    }
  }
};
var UniformFloatVec2 = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation} location
   */
  constructor(gl, activeUniform, uniformName, location) {
    this.name = uniformName;
    this.value = void 0;
    this._value = new Cartesian2_default();
    this._gl = gl;
    this._location = location;
  }
  set() {
    const v2 = this.value;
    if (!Cartesian2_default.equals(v2, this._value)) {
      Cartesian2_default.clone(v2, this._value);
      this._gl.uniform2f(this._location, v2.x, v2.y);
    }
  }
};
var UniformFloatVec3 = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation} location
   */
  constructor(gl, activeUniform, uniformName, location) {
    this.name = uniformName;
    this.value = void 0;
    this._value = void 0;
    this._gl = gl;
    this._location = location;
  }
  set() {
    const v2 = this.value;
    if (defined_default(v2.red)) {
      if (!Color_default.equals(v2, this._value)) {
        this._value = Color_default.clone(v2, this._value);
        this._gl.uniform3f(this._location, v2.red, v2.green, v2.blue);
      }
    } else if (defined_default(v2.x)) {
      if (!Cartesian3_default.equals(v2, this._value)) {
        this._value = Cartesian3_default.clone(v2, this._value);
        this._gl.uniform3f(this._location, v2.x, v2.y, v2.z);
      }
    } else {
      throw new DeveloperError_default(
        `Invalid vec3 value for uniform "${this.name}".`
      );
    }
  }
};
var UniformFloatVec4 = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation} location
   */
  constructor(gl, activeUniform, uniformName, location) {
    this.name = uniformName;
    this.value = void 0;
    this._value = void 0;
    this._gl = gl;
    this._location = location;
  }
  set() {
    const v2 = this.value;
    if (defined_default(v2.red)) {
      if (!Color_default.equals(v2, this._value)) {
        this._value = Color_default.clone(v2, this._value);
        this._gl.uniform4f(this._location, v2.red, v2.green, v2.blue, v2.alpha);
      }
    } else if (defined_default(v2.x)) {
      if (!Cartesian4_default.equals(v2, this._value)) {
        this._value = Cartesian4_default.clone(v2, this._value);
        this._gl.uniform4f(this._location, v2.x, v2.y, v2.z, v2.w);
      }
    } else {
      throw new DeveloperError_default(
        `Invalid vec4 value for uniform "${this.name}".`
      );
    }
  }
};
var UniformSampler = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation} location
   */
  constructor(gl, activeUniform, uniformName, location) {
    this.name = uniformName;
    this.value = void 0;
    this._gl = gl;
    this._location = location;
    this.textureUnitIndex = void 0;
  }
  set() {
    const gl = this._gl;
    gl.activeTexture(gl.TEXTURE0 + this.textureUnitIndex);
    const v2 = this.value;
    gl.bindTexture(v2._target, v2._texture);
  }
  /**
   * @param {number} textureUnitIndex
   * @returns {number}
   */
  _setSampler(textureUnitIndex) {
    this.textureUnitIndex = textureUnitIndex;
    this._gl.uniform1i(this._location, textureUnitIndex);
    return textureUnitIndex + 1;
  }
};
var UniformInt = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation} location
   */
  constructor(gl, activeUniform, uniformName, location) {
    this.name = uniformName;
    this.value = void 0;
    this._value = 0;
    this._gl = gl;
    this._location = location;
  }
  set() {
    if (this.value !== this._value) {
      this._value = this.value;
      this._gl.uniform1i(this._location, this.value);
    }
  }
};
var UniformIntVec2 = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation} location
   */
  constructor(gl, activeUniform, uniformName, location) {
    this.name = uniformName;
    this.value = void 0;
    this._value = new Cartesian2_default();
    this._gl = gl;
    this._location = location;
  }
  set() {
    const v2 = this.value;
    if (!Cartesian2_default.equals(v2, this._value)) {
      Cartesian2_default.clone(v2, this._value);
      this._gl.uniform2i(this._location, v2.x, v2.y);
    }
  }
};
var UniformIntVec3 = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation} location
   */
  constructor(gl, activeUniform, uniformName, location) {
    this.name = uniformName;
    this.value = void 0;
    this._value = new Cartesian3_default();
    this._gl = gl;
    this._location = location;
  }
  set() {
    const v2 = this.value;
    if (!Cartesian3_default.equals(v2, this._value)) {
      Cartesian3_default.clone(v2, this._value);
      this._gl.uniform3i(this._location, v2.x, v2.y, v2.z);
    }
  }
};
var UniformIntVec4 = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation} location
   */
  constructor(gl, activeUniform, uniformName, location) {
    this.name = uniformName;
    this.value = void 0;
    this._value = new Cartesian4_default();
    this._gl = gl;
    this._location = location;
  }
  set() {
    const v2 = this.value;
    if (!Cartesian4_default.equals(v2, this._value)) {
      Cartesian4_default.clone(v2, this._value);
      this._gl.uniform4i(this._location, v2.x, v2.y, v2.z, v2.w);
    }
  }
};
var scratchUniformArray = new Float32Array(4);
var UniformMat2 = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation} location
   */
  constructor(gl, activeUniform, uniformName, location) {
    this.name = uniformName;
    this.value = void 0;
    this._value = new Matrix2_default();
    this._gl = gl;
    this._location = location;
  }
  set() {
    if (!Matrix2_default.equalsArray(this.value, this._value, 0)) {
      Matrix2_default.clone(this.value, this._value);
      const array = Matrix2_default.toArray(this.value, scratchUniformArray);
      this._gl.uniformMatrix2fv(this._location, false, array);
    }
  }
};
var scratchMat3Array = new Float32Array(9);
var UniformMat3 = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation} location
   */
  constructor(gl, activeUniform, uniformName, location) {
    this.name = uniformName;
    this.value = void 0;
    this._value = new Matrix3_default();
    this._gl = gl;
    this._location = location;
  }
  set() {
    if (!Matrix3_default.equalsArray(this.value, this._value, 0)) {
      Matrix3_default.clone(this.value, this._value);
      const array = Matrix3_default.toArray(this.value, scratchMat3Array);
      this._gl.uniformMatrix3fv(this._location, false, array);
    }
  }
};
var scratchMat4Array = new Float32Array(16);
var UniformMat4 = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation} location
   */
  constructor(gl, activeUniform, uniformName, location) {
    this.name = uniformName;
    this.value = void 0;
    this._value = new Matrix4_default();
    this._gl = gl;
    this._location = location;
  }
  set() {
    if (!Matrix4_default.equalsArray(this.value, this._value, 0)) {
      Matrix4_default.clone(this.value, this._value);
      const array = Matrix4_default.toArray(this.value, scratchMat4Array);
      this._gl.uniformMatrix4fv(this._location, false, array);
    }
  }
};
var createUniform_default = createUniform;

// packages/engine/Source/Renderer/createUniformArray.js
function createUniformArray(gl, activeUniform, uniformName, locations) {
  switch (activeUniform.type) {
    case gl.FLOAT:
      return new UniformArrayFloat(gl, activeUniform, uniformName, locations);
    case gl.FLOAT_VEC2:
      return new UniformArrayFloatVec2(
        gl,
        activeUniform,
        uniformName,
        locations
      );
    case gl.FLOAT_VEC3:
      return new UniformArrayFloatVec3(
        gl,
        activeUniform,
        uniformName,
        locations
      );
    case gl.FLOAT_VEC4:
      return new UniformArrayFloatVec4(
        gl,
        activeUniform,
        uniformName,
        locations
      );
    case gl.SAMPLER_2D:
    case gl.SAMPLER_3D:
    case gl.SAMPLER_CUBE:
      return new UniformArraySampler(gl, activeUniform, uniformName, locations);
    case gl.INT:
    case gl.BOOL:
      return new UniformArrayInt(gl, activeUniform, uniformName, locations);
    case gl.INT_VEC2:
    case gl.BOOL_VEC2:
      return new UniformArrayIntVec2(gl, activeUniform, uniformName, locations);
    case gl.INT_VEC3:
    case gl.BOOL_VEC3:
      return new UniformArrayIntVec3(gl, activeUniform, uniformName, locations);
    case gl.INT_VEC4:
    case gl.BOOL_VEC4:
      return new UniformArrayIntVec4(gl, activeUniform, uniformName, locations);
    case gl.FLOAT_MAT2:
      return new UniformArrayMat2(gl, activeUniform, uniformName, locations);
    case gl.FLOAT_MAT3:
      return new UniformArrayMat3(gl, activeUniform, uniformName, locations);
    case gl.FLOAT_MAT4:
      return new UniformArrayMat4(gl, activeUniform, uniformName, locations);
    default:
      throw new RuntimeError_default(
        `Unrecognized uniform type: ${activeUniform.type} for uniform "${uniformName}".`
      );
  }
}
var UniformArrayFloat = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation[]} locations
   */
  constructor(gl, activeUniform, uniformName, locations) {
    const length = locations.length;
    this.name = uniformName;
    this.value = new Array(length);
    this._value = new Float32Array(length);
    this._gl = gl;
    this._location = locations[0];
  }
  set() {
    const value = this.value;
    const length = value.length;
    const arraybuffer = this._value;
    let changed = false;
    for (let i = 0; i < length; ++i) {
      const v2 = value[i];
      if (v2 !== arraybuffer[i]) {
        arraybuffer[i] = v2;
        changed = true;
      }
    }
    if (changed) {
      this._gl.uniform1fv(this._location, arraybuffer);
    }
  }
};
var UniformArrayFloatVec2 = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation[]} locations
   */
  constructor(gl, activeUniform, uniformName, locations) {
    const length = locations.length;
    this.name = uniformName;
    this.value = new Array(length);
    this._value = new Float32Array(length * 2);
    this._gl = gl;
    this._location = locations[0];
  }
  set() {
    const value = this.value;
    const length = value.length;
    const arraybuffer = this._value;
    let changed = false;
    let j = 0;
    for (let i = 0; i < length; ++i) {
      const v2 = value[i];
      if (!Cartesian2_default.equalsArray(v2, arraybuffer, j)) {
        Cartesian2_default.pack(v2, arraybuffer, j);
        changed = true;
      }
      j += 2;
    }
    if (changed) {
      this._gl.uniform2fv(this._location, arraybuffer);
    }
  }
};
var UniformArrayFloatVec3 = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation[]} locations
   */
  constructor(gl, activeUniform, uniformName, locations) {
    const length = locations.length;
    this.name = uniformName;
    this.value = new Array(length);
    this._value = new Float32Array(length * 3);
    this._gl = gl;
    this._location = locations[0];
  }
  set() {
    const value = this.value;
    const length = value.length;
    const arraybuffer = this._value;
    let changed = false;
    let j = 0;
    for (let i = 0; i < length; ++i) {
      const v2 = value[i];
      if (defined_default(v2.red)) {
        if (v2.red !== arraybuffer[j] || v2.green !== arraybuffer[j + 1] || v2.blue !== arraybuffer[j + 2]) {
          arraybuffer[j] = v2.red;
          arraybuffer[j + 1] = v2.green;
          arraybuffer[j + 2] = v2.blue;
          changed = true;
        }
      } else if (defined_default(v2.x)) {
        if (!Cartesian3_default.equalsArray(v2, arraybuffer, j)) {
          Cartesian3_default.pack(v2, arraybuffer, j);
          changed = true;
        }
      } else {
        throw new DeveloperError_default("Invalid vec3 value.");
      }
      j += 3;
    }
    if (changed) {
      this._gl.uniform3fv(this._location, arraybuffer);
    }
  }
};
var UniformArrayFloatVec4 = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation[]} locations
   */
  constructor(gl, activeUniform, uniformName, locations) {
    const length = locations.length;
    this.name = uniformName;
    this.value = new Array(length);
    this._value = new Float32Array(length * 4);
    this._gl = gl;
    this._location = locations[0];
  }
  set() {
    const value = this.value;
    const length = value.length;
    const arraybuffer = this._value;
    let changed = false;
    let j = 0;
    for (let i = 0; i < length; ++i) {
      const v2 = value[i];
      if (defined_default(v2.red)) {
        if (!Color_default.equalsArray(v2, arraybuffer, j)) {
          Color_default.pack(v2, arraybuffer, j);
          changed = true;
        }
      } else if (defined_default(v2.x)) {
        if (!Cartesian4_default.equalsArray(v2, arraybuffer, j)) {
          Cartesian4_default.pack(v2, arraybuffer, j);
          changed = true;
        }
      } else {
        throw new DeveloperError_default("Invalid vec4 value.");
      }
      j += 4;
    }
    if (changed) {
      this._gl.uniform4fv(this._location, arraybuffer);
    }
  }
};
var UniformArraySampler = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation[]} locations
   */
  constructor(gl, activeUniform, uniformName, locations) {
    const length = locations.length;
    this.name = uniformName;
    this.value = new Array(length);
    this._value = new Float32Array(length);
    this._gl = gl;
    this._locations = locations;
    this.textureUnitIndex = void 0;
  }
  set() {
    const gl = this._gl;
    const textureUnitIndex = gl.TEXTURE0 + this.textureUnitIndex;
    const value = this.value;
    const length = value.length;
    for (let i = 0; i < length; ++i) {
      const v2 = value[i];
      gl.activeTexture(textureUnitIndex + i);
      gl.bindTexture(v2._target, v2._texture);
    }
  }
  /**
   * @param {number} textureUnitIndex
   * @returns {number}
   */
  _setSampler(textureUnitIndex) {
    this.textureUnitIndex = textureUnitIndex;
    const locations = this._locations;
    const length = locations.length;
    for (let i = 0; i < length; ++i) {
      const index = textureUnitIndex + i;
      this._gl.uniform1i(locations[i], index);
    }
    return textureUnitIndex + length;
  }
};
var UniformArrayInt = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation[]} locations
   */
  constructor(gl, activeUniform, uniformName, locations) {
    const length = locations.length;
    this.name = uniformName;
    this.value = new Array(length);
    this._value = new Int32Array(length);
    this._gl = gl;
    this._location = locations[0];
  }
  set() {
    const value = this.value;
    const length = value.length;
    const arraybuffer = this._value;
    let changed = false;
    for (let i = 0; i < length; ++i) {
      const v2 = value[i];
      if (v2 !== arraybuffer[i]) {
        arraybuffer[i] = v2;
        changed = true;
      }
    }
    if (changed) {
      this._gl.uniform1iv(this._location, arraybuffer);
    }
  }
};
var UniformArrayIntVec2 = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation[]} locations
   */
  constructor(gl, activeUniform, uniformName, locations) {
    const length = locations.length;
    this.name = uniformName;
    this.value = new Array(length);
    this._value = new Int32Array(length * 2);
    this._gl = gl;
    this._location = locations[0];
  }
  set() {
    const value = this.value;
    const length = value.length;
    const arraybuffer = this._value;
    let changed = false;
    let j = 0;
    for (let i = 0; i < length; ++i) {
      const v2 = value[i];
      if (!Cartesian2_default.equalsArray(v2, arraybuffer, j)) {
        Cartesian2_default.pack(v2, arraybuffer, j);
        changed = true;
      }
      j += 2;
    }
    if (changed) {
      this._gl.uniform2iv(this._location, arraybuffer);
    }
  }
};
var UniformArrayIntVec3 = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation[]} locations
   */
  constructor(gl, activeUniform, uniformName, locations) {
    const length = locations.length;
    this.name = uniformName;
    this.value = new Array(length);
    this._value = new Int32Array(length * 3);
    this._gl = gl;
    this._location = locations[0];
  }
  set() {
    const value = this.value;
    const length = value.length;
    const arraybuffer = this._value;
    let changed = false;
    let j = 0;
    for (let i = 0; i < length; ++i) {
      const v2 = value[i];
      if (!Cartesian3_default.equalsArray(v2, arraybuffer, j)) {
        Cartesian3_default.pack(v2, arraybuffer, j);
        changed = true;
      }
      j += 3;
    }
    if (changed) {
      this._gl.uniform3iv(this._location, arraybuffer);
    }
  }
};
var UniformArrayIntVec4 = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation[]} locations
   */
  constructor(gl, activeUniform, uniformName, locations) {
    const length = locations.length;
    this.name = uniformName;
    this.value = new Array(length);
    this._value = new Int32Array(length * 4);
    this._gl = gl;
    this._location = locations[0];
  }
  set() {
    const value = this.value;
    const length = value.length;
    const arraybuffer = this._value;
    let changed = false;
    let j = 0;
    for (let i = 0; i < length; ++i) {
      const v2 = value[i];
      if (!Cartesian4_default.equalsArray(v2, arraybuffer, j)) {
        Cartesian4_default.pack(v2, arraybuffer, j);
        changed = true;
      }
      j += 4;
    }
    if (changed) {
      this._gl.uniform4iv(this._location, arraybuffer);
    }
  }
};
var UniformArrayMat2 = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation[]} locations
   */
  constructor(gl, activeUniform, uniformName, locations) {
    const length = locations.length;
    this.name = uniformName;
    this.value = new Array(length);
    this._value = new Float32Array(length * 4);
    this._gl = gl;
    this._location = locations[0];
  }
  set() {
    const value = this.value;
    const length = value.length;
    const arraybuffer = this._value;
    let changed = false;
    let j = 0;
    for (let i = 0; i < length; ++i) {
      const v2 = value[i];
      if (!Matrix2_default.equalsArray(v2, arraybuffer, j)) {
        Matrix2_default.pack(v2, arraybuffer, j);
        changed = true;
      }
      j += 4;
    }
    if (changed) {
      this._gl.uniformMatrix2fv(this._location, false, arraybuffer);
    }
  }
};
var UniformArrayMat3 = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation[]} locations
   */
  constructor(gl, activeUniform, uniformName, locations) {
    const length = locations.length;
    this.name = uniformName;
    this.value = new Array(length);
    this._value = new Float32Array(length * 9);
    this._gl = gl;
    this._location = locations[0];
  }
  set() {
    const value = this.value;
    const length = value.length;
    const arraybuffer = this._value;
    let changed = false;
    let j = 0;
    for (let i = 0; i < length; ++i) {
      const v2 = value[i];
      if (!Matrix3_default.equalsArray(v2, arraybuffer, j)) {
        Matrix3_default.pack(v2, arraybuffer, j);
        changed = true;
      }
      j += 9;
    }
    if (changed) {
      this._gl.uniformMatrix3fv(this._location, false, arraybuffer);
    }
  }
};
var UniformArrayMat4 = class {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {WebGLActiveInfo} activeUniform
   * @param {string} uniformName
   * @param {WebGLUniformLocation[]} locations
   */
  constructor(gl, activeUniform, uniformName, locations) {
    const length = locations.length;
    this.name = uniformName;
    this.value = new Array(length);
    this._value = new Float32Array(length * 16);
    this._gl = gl;
    this._location = locations[0];
  }
  set() {
    const value = this.value;
    const length = value.length;
    const arraybuffer = this._value;
    let changed = false;
    let j = 0;
    for (let i = 0; i < length; ++i) {
      const v2 = value[i];
      if (!Matrix4_default.equalsArray(v2, arraybuffer, j)) {
        Matrix4_default.pack(v2, arraybuffer, j);
        changed = true;
      }
      j += 16;
    }
    if (changed) {
      this._gl.uniformMatrix4fv(this._location, false, arraybuffer);
    }
  }
};
var createUniformArray_default = createUniformArray;

// packages/engine/Source/Renderer/ShaderProgram.js
var nextShaderProgramId = 0;
function ShaderProgram(options) {
  let vertexShaderText = options.vertexShaderText;
  let fragmentShaderText = options.fragmentShaderText;
  if (typeof spector !== "undefined") {
    vertexShaderText = vertexShaderText.replace(/^#line/gm, "//#line");
    fragmentShaderText = fragmentShaderText.replace(/^#line/gm, "//#line");
  }
  const modifiedFS = handleUniformPrecisionMismatches(
    vertexShaderText,
    fragmentShaderText
  );
  this._gl = options.gl;
  this._logShaderCompilation = options.logShaderCompilation;
  this._debugShaders = options.debugShaders;
  this._attributeLocations = options.attributeLocations;
  this._program = void 0;
  this._numberOfVertexAttributes = void 0;
  this._vertexAttributes = void 0;
  this._uniformsByName = void 0;
  this._uniforms = void 0;
  this._automaticUniforms = void 0;
  this._manualUniforms = void 0;
  this._duplicateUniformNames = modifiedFS.duplicateUniformNames;
  this._cachedShader = void 0;
  this.maximumTextureUnitIndex = void 0;
  this._vertexShaderSource = options.vertexShaderSource;
  this._vertexShaderText = options.vertexShaderText;
  this._fragmentShaderSource = options.fragmentShaderSource;
  this._fragmentShaderText = modifiedFS.fragmentShaderText;
  this.id = nextShaderProgramId++;
}
ShaderProgram.fromCache = function(options) {
  options = options ?? Frozen_default.EMPTY_OBJECT;
  Check_default.defined("options.context", options.context);
  return options.context.shaderCache.getShaderProgram(options);
};
ShaderProgram.replaceCache = function(options) {
  options = options ?? Frozen_default.EMPTY_OBJECT;
  Check_default.defined("options.context", options.context);
  return options.context.shaderCache.replaceShaderProgram(options);
};
Object.defineProperties(ShaderProgram.prototype, {
  /**
   * GLSL source for the shader program's vertex shader.
   * @memberof ShaderProgram.prototype
   *
   * @type {ShaderSource}
   * @readonly
   */
  vertexShaderSource: {
    get: function() {
      return this._vertexShaderSource;
    }
  },
  /**
   * GLSL source for the shader program's fragment shader.
   * @memberof ShaderProgram.prototype
   *
   * @type {ShaderSource}
   * @readonly
   */
  fragmentShaderSource: {
    get: function() {
      return this._fragmentShaderSource;
    }
  },
  vertexAttributes: {
    get: function() {
      initialize2(this);
      return this._vertexAttributes;
    }
  },
  numberOfVertexAttributes: {
    get: function() {
      initialize2(this);
      return this._numberOfVertexAttributes;
    }
  },
  allUniforms: {
    get: function() {
      initialize2(this);
      return this._uniformsByName;
    }
  }
});
function extractUniforms(shaderText) {
  const uniformNames = [];
  const uniformLines = shaderText.match(/uniform.*?(?![^{]*})(?=[=\[;])/g);
  if (defined_default(uniformLines)) {
    const len = uniformLines.length;
    for (let i = 0; i < len; i++) {
      const line = uniformLines[i].trim();
      const name = line.slice(line.lastIndexOf(" ") + 1);
      uniformNames.push(name);
    }
  }
  return uniformNames;
}
function handleUniformPrecisionMismatches(vertexShaderText, fragmentShaderText) {
  const duplicateUniformNames = {};
  if (!ContextLimits_default.highpFloatSupported || !ContextLimits_default.highpIntSupported) {
    let i, j;
    let uniformName;
    let duplicateName;
    const vertexShaderUniforms = extractUniforms(vertexShaderText);
    const fragmentShaderUniforms = extractUniforms(fragmentShaderText);
    const vertexUniformsCount = vertexShaderUniforms.length;
    const fragmentUniformsCount = fragmentShaderUniforms.length;
    for (i = 0; i < vertexUniformsCount; i++) {
      for (j = 0; j < fragmentUniformsCount; j++) {
        if (vertexShaderUniforms[i] === fragmentShaderUniforms[j]) {
          uniformName = vertexShaderUniforms[i];
          duplicateName = `czm_mediump_${uniformName}`;
          const re = new RegExp(`${uniformName}\\b`, "g");
          fragmentShaderText = fragmentShaderText.replace(re, duplicateName);
          duplicateUniformNames[duplicateName] = uniformName;
        }
      }
    }
  }
  return {
    fragmentShaderText,
    duplicateUniformNames
  };
}
var consolePrefix = "[Cesium WebGL] ";
function createAndLinkProgram(gl, shader) {
  const vsSource = shader._vertexShaderText;
  const fsSource = shader._fragmentShaderText;
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vsSource);
  gl.compileShader(vertexShader);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fsSource);
  gl.compileShader(fragmentShader);
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  const attributeLocations = shader._attributeLocations;
  if (defined_default(attributeLocations)) {
    for (const attribute in attributeLocations) {
      if (attributeLocations.hasOwnProperty(attribute)) {
        gl.bindAttribLocation(
          program,
          attributeLocations[attribute],
          attribute
        );
      }
    }
  }
  gl.linkProgram(program);
  let log;
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    if (shader._logShaderCompilation) {
      log = gl.getShaderInfoLog(vertexShader);
      if (defined_default(log) && log.length > 0) {
        console.log(`${consolePrefix}Vertex shader compile log: ${log}`);
      }
      log = gl.getShaderInfoLog(fragmentShader);
      if (defined_default(log) && log.length > 0) {
        console.log(`${consolePrefix}Fragment shader compile log: ${log}`);
      }
      log = gl.getProgramInfoLog(program);
      if (defined_default(log) && log.length > 0) {
        console.log(`${consolePrefix}Shader program link log: ${log}`);
      }
    }
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return program;
  }
  let errorMessage;
  const debugShaders = shader._debugShaders;
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    log = gl.getShaderInfoLog(fragmentShader);
    console.error(`${consolePrefix}Fragment shader compile log: ${log}`);
    console.error(`${consolePrefix} Fragment shader source:
${fsSource}`);
    errorMessage = `Fragment shader failed to compile.  Compile log: ${log}`;
  } else if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    log = gl.getShaderInfoLog(vertexShader);
    console.error(`${consolePrefix}Vertex shader compile log: ${log}`);
    console.error(`${consolePrefix} Vertex shader source:
${vsSource}`);
    errorMessage = `Vertex shader failed to compile.  Compile log: ${log}`;
  } else {
    log = gl.getProgramInfoLog(program);
    console.error(`${consolePrefix}Shader program link log: ${log}`);
    logTranslatedSource(vertexShader, "vertex");
    logTranslatedSource(fragmentShader, "fragment");
    errorMessage = `Program failed to link.  Link log: ${log}`;
  }
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  gl.deleteProgram(program);
  throw new RuntimeError_default(errorMessage);
  function logTranslatedSource(compiledShader, name) {
    if (!defined_default(debugShaders)) {
      return;
    }
    const translation = debugShaders.getTranslatedShaderSource(compiledShader);
    if (translation === "") {
      console.error(`${consolePrefix}${name} shader translation failed.`);
      return;
    }
    console.error(
      `${consolePrefix}Translated ${name} shaderSource:
${translation}`
    );
  }
}
function findVertexAttributes(gl, program, numberOfAttributes) {
  const attributes = {};
  for (let i = 0; i < numberOfAttributes; ++i) {
    const attr = gl.getActiveAttrib(program, i);
    const location = gl.getAttribLocation(program, attr.name);
    attributes[attr.name] = {
      name: attr.name,
      type: attr.type,
      index: location
    };
  }
  return attributes;
}
function findUniforms(gl, program) {
  const uniformsByName = {};
  const uniforms = [];
  const samplerUniforms = [];
  const numberOfUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < numberOfUniforms; ++i) {
    const activeUniform = gl.getActiveUniform(program, i);
    const suffix = "[0]";
    const uniformName = activeUniform.name.indexOf(
      suffix,
      activeUniform.name.length - suffix.length
    ) !== -1 ? activeUniform.name.slice(0, activeUniform.name.length - 3) : activeUniform.name;
    if (uniformName.indexOf("gl_") !== 0) {
      if (activeUniform.name.indexOf("[") < 0) {
        const location = gl.getUniformLocation(program, uniformName);
        if (location !== null) {
          const uniform = createUniform_default(
            gl,
            activeUniform,
            uniformName,
            location
          );
          uniformsByName[uniformName] = uniform;
          uniforms.push(uniform);
          if (uniform._setSampler) {
            samplerUniforms.push(uniform);
          }
        }
      } else {
        let uniformArray;
        let locations;
        let value;
        let loc;
        const indexOfBracket = uniformName.indexOf("[");
        if (indexOfBracket >= 0) {
          uniformArray = uniformsByName[uniformName.slice(0, indexOfBracket)];
          if (!defined_default(uniformArray)) {
            continue;
          }
          locations = uniformArray._locations;
          if (locations.length <= 1) {
            value = uniformArray.value;
            loc = gl.getUniformLocation(program, uniformName);
            if (loc !== null) {
              locations.push(loc);
              value.push(gl.getUniform(program, loc));
            }
          }
        } else {
          locations = [];
          for (let j = 0; j < activeUniform.size; ++j) {
            loc = gl.getUniformLocation(program, `${uniformName}[${j}]`);
            if (loc !== null) {
              locations.push(loc);
            }
          }
          uniformArray = createUniformArray_default(
            gl,
            activeUniform,
            uniformName,
            locations
          );
          uniformsByName[uniformName] = uniformArray;
          uniforms.push(uniformArray);
          if (uniformArray._setSampler) {
            samplerUniforms.push(uniformArray);
          }
        }
      }
    }
  }
  return {
    uniformsByName,
    uniforms,
    samplerUniforms
  };
}
function partitionUniforms(shader, uniforms) {
  const automaticUniforms = [];
  const manualUniforms = [];
  for (const uniform in uniforms) {
    if (uniforms.hasOwnProperty(uniform)) {
      const uniformObject = uniforms[uniform];
      let uniformName = uniform;
      const duplicateUniform = shader._duplicateUniformNames[uniformName];
      if (defined_default(duplicateUniform)) {
        uniformObject.name = duplicateUniform;
        uniformName = duplicateUniform;
      }
      const automaticUniform = AutomaticUniforms_default[uniformName];
      if (defined_default(automaticUniform)) {
        automaticUniforms.push({
          uniform: uniformObject,
          automaticUniform
        });
      } else {
        manualUniforms.push(uniformObject);
      }
    }
  }
  return {
    automaticUniforms,
    manualUniforms
  };
}
function setSamplerUniforms(gl, program, samplerUniforms) {
  gl.useProgram(program);
  let textureUnitIndex = 0;
  const length = samplerUniforms.length;
  for (let i = 0; i < length; ++i) {
    textureUnitIndex = samplerUniforms[i]._setSampler(textureUnitIndex);
  }
  gl.useProgram(null);
  return textureUnitIndex;
}
function initialize2(shader) {
  if (defined_default(shader._program)) {
    return;
  }
  reinitialize(shader);
}
function reinitialize(shader) {
  const oldProgram = shader._program;
  const gl = shader._gl;
  const program = createAndLinkProgram(gl, shader, shader._debugShaders);
  const numberOfVertexAttributes = gl.getProgramParameter(
    program,
    gl.ACTIVE_ATTRIBUTES
  );
  const uniforms = findUniforms(gl, program);
  const partitionedUniforms = partitionUniforms(
    shader,
    uniforms.uniformsByName
  );
  shader._program = program;
  shader._numberOfVertexAttributes = numberOfVertexAttributes;
  shader._vertexAttributes = findVertexAttributes(
    gl,
    program,
    numberOfVertexAttributes
  );
  shader._uniformsByName = uniforms.uniformsByName;
  shader._uniforms = uniforms.uniforms;
  shader._automaticUniforms = partitionedUniforms.automaticUniforms;
  shader._manualUniforms = partitionedUniforms.manualUniforms;
  shader.maximumTextureUnitIndex = setSamplerUniforms(
    gl,
    program,
    uniforms.samplerUniforms
  );
  if (oldProgram) {
    shader._gl.deleteProgram(oldProgram);
  }
  if (typeof spector !== "undefined") {
    shader._program.__SPECTOR_rebuildProgram = function(vertexSourceCode, fragmentSourceCode, onCompiled, onError) {
      const originalVS = shader._vertexShaderText;
      const originalFS = shader._fragmentShaderText;
      const regex = / ! = /g;
      shader._vertexShaderText = vertexSourceCode.replace(regex, " != ");
      shader._fragmentShaderText = fragmentSourceCode.replace(regex, " != ");
      try {
        reinitialize(shader);
        onCompiled(shader._program);
      } catch (e) {
        shader._vertexShaderText = originalVS;
        shader._fragmentShaderText = originalFS;
        const errorMatcher = /(?:Compile|Link) error: ([^]*)/;
        const match = errorMatcher.exec(e.message);
        if (match) {
          onError(match[1]);
        } else {
          onError(e.message);
        }
      }
    };
  }
}
ShaderProgram.prototype._bind = function() {
  initialize2(this);
  this._gl.useProgram(this._program);
};
ShaderProgram.prototype._setUniforms = function(uniformMap, uniformState, validate) {
  let len;
  let i;
  if (defined_default(uniformMap)) {
    const manualUniforms = this._manualUniforms;
    len = manualUniforms.length;
    for (i = 0; i < len; ++i) {
      const mu = manualUniforms[i];
      if (!defined_default(uniformMap[mu.name])) {
        throw new DeveloperError_default(`Unknown uniform: ${mu.name}`);
      }
      mu.value = uniformMap[mu.name]();
    }
  }
  const automaticUniforms = this._automaticUniforms;
  len = automaticUniforms.length;
  for (i = 0; i < len; ++i) {
    const au = automaticUniforms[i];
    au.uniform.value = au.automaticUniform.getValue(uniformState);
  }
  const uniforms = this._uniforms;
  len = uniforms.length;
  for (i = 0; i < len; ++i) {
    uniforms[i].set();
  }
  if (validate) {
    const gl = this._gl;
    const program = this._program;
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
      throw new DeveloperError_default(
        `Program validation failed.  Program info log: ${gl.getProgramInfoLog(
          program
        )}`
      );
    }
  }
};
ShaderProgram.prototype.isDestroyed = function() {
  return false;
};
ShaderProgram.prototype.destroy = function() {
  this._cachedShader.cache.releaseShaderProgram(this);
  return void 0;
};
ShaderProgram.prototype.finalDestroy = function() {
  this._gl.deleteProgram(this._program);
  return destroyObject_default(this);
};
var ShaderProgram_default = ShaderProgram;

// packages/engine/Source/Renderer/ClearCommand.js
function ClearCommand(options) {
  options = options ?? Frozen_default.EMPTY_OBJECT;
  this.color = options.color;
  this.depth = options.depth;
  this.stencil = options.stencil;
  this.renderState = options.renderState;
  this.framebuffer = options.framebuffer;
  this.owner = options.owner;
  this.pass = options.pass;
}
ClearCommand.ALL = Object.freeze(
  new ClearCommand({
    color: new Color_default(0, 0, 0, 0),
    depth: 1,
    stencil: 0
  })
);
ClearCommand.prototype.execute = function(context, passState) {
  context.clear(this, passState);
};
var ClearCommand_default = ClearCommand;

// packages/engine/index.js
globalThis.CESIUM_VERSION = "1.146.0";

// Specs/createRendererMatchers.js
function isTypedArray3(o) {
  return ArrayBuffer.isView(o) && !(o instanceof DataView);
}
function typedArrayToArray3(array) {
  if (isTypedArray3(array)) {
    return Array.prototype.slice.call(array, 0);
  }
  return array;
}
function countRenderedPixels(rgba) {
  const pixelCount = rgba.length / 4;
  let count = 0;
  for (let i = 0; i < pixelCount; i++) {
    const index = i * 4;
    if (rgba[index] !== 0 || rgba[index + 1] !== 0 || rgba[index + 2] !== 0 || rgba[index + 3] !== 255) {
      count++;
    }
  }
  return count;
}
function renderAndReadPixels(options) {
  let scene;
  if (defined_default(options.scene)) {
    scene = options.scene;
    const time = options.time;
    scene.initializeFrame();
    if (defined_default(options.primeShadowMap)) {
      scene.render(time);
    }
    scene.render(time);
  } else {
    scene = options;
    scene.initializeFrame();
    scene.render();
  }
  return scene.context.readPixels();
}
function renderEquals(util, actual, expected, expectEqual) {
  const actualRgba = renderAndReadPixels(actual);
  if (!!window.webglStub) {
    return { pass: true };
  }
  const eq = equals_default(util, actualRgba, expected);
  const pass = expectEqual ? eq : !eq;
  let message;
  if (!pass) {
    message = `Expected ${expectEqual ? "" : "not "}to render [${typedArrayToArray3(expected)}], but actually rendered [${typedArrayToArray3(actualRgba)}].`;
  }
  return { pass, message };
}
function pickPrimitiveEquals(actual, expected, x, y, width, height) {
  const scene = actual;
  const windowPosition = new Cartesian2_default(x, y);
  const result = scene.pick(windowPosition, width, height);
  if (!!window.webglStub) {
    return { pass: true };
  }
  let pass;
  let message;
  if (defined_default(expected)) {
    pass = result.primitive === expected;
  } else {
    pass = !defined_default(result);
  }
  if (!pass) {
    message = `Expected to pick ${expected}, but picked: ${result}`;
  }
  return { pass, message };
}
function drillPickPrimitiveEquals(actual, expected, x, y, width, height) {
  const scene = actual;
  const windowPosition = new Cartesian2_default(x, y);
  const result = scene.drillPick(windowPosition, void 0, width, height);
  if (!!window.webglStub) {
    return { pass: true };
  }
  let pass;
  let message;
  if (defined_default(expected)) {
    pass = result.length === expected;
  } else {
    pass = !defined_default(result);
  }
  if (!pass) {
    message = `Expected to pick ${expected}, but picked: ${result}`;
  }
  return { pass, message };
}
function contextRenderAndReadPixels(options) {
  const context = options.context;
  let vs = options.vertexShader;
  const fs = options.fragmentShader;
  let sp = options.shaderProgram;
  const uniformMap = options.uniformMap;
  const modelMatrix = options.modelMatrix;
  const depth = options.depth ?? 0;
  const clear = options.clear ?? true;
  let clearColor;
  if (!defined_default(context)) {
    throw new DeveloperError_default("options.context is required.");
  }
  if (!defined_default(fs) && !defined_default(sp)) {
    throw new DeveloperError_default(
      "options.fragmentShader or options.shaderProgram is required."
    );
  }
  if (defined_default(fs) && defined_default(sp)) {
    throw new DeveloperError_default(
      "Both options.fragmentShader and options.shaderProgram can not be used at the same time."
    );
  }
  if (defined_default(vs) && defined_default(sp)) {
    throw new DeveloperError_default(
      "Both options.vertexShader and options.shaderProgram can not be used at the same time."
    );
  }
  if (!defined_default(sp)) {
    if (!defined_default(vs)) {
      vs = "in vec4 position; void main() { gl_PointSize = 1.0; gl_Position = position; }";
    }
    sp = ShaderProgram_default.fromCache({
      context,
      vertexShaderSource: vs,
      fragmentShaderSource: fs,
      attributeLocations: { position: 0 }
    });
  }
  const va = new VertexArray_default({
    context,
    attributes: [
      {
        index: 0,
        vertexBuffer: Buffer_default.createVertexBuffer({
          context,
          typedArray: new Float32Array([0, 0, depth, 1]),
          usage: BufferUsage_default.STATIC_DRAW
        }),
        componentsPerAttribute: 4
      }
    ]
  });
  if (clear) {
    ClearCommand_default.ALL.execute(context);
    clearColor = context.readPixels();
  }
  const command = new DrawCommand_default({
    primitiveType: PrimitiveType_default.POINTS,
    shaderProgram: sp,
    vertexArray: va,
    uniformMap,
    modelMatrix
  });
  command.execute(context);
  const rgba = context.readPixels();
  sp.destroy();
  va.destroy();
  return { color: rgba, clearColor };
}
function expectContextToRender(actual, expected, expectEqual) {
  const options = actual;
  const context = options.context;
  const clear = options.clear ?? true;
  const epsilon = options.epsilon ?? 0;
  if (!defined_default(expected)) {
    expected = [255, 255, 255, 255];
  }
  const webglStub2 = !!window.webglStub;
  const output = contextRenderAndReadPixels(options);
  if (clear) {
    const clearedRgba = output.clearColor;
    if (!webglStub2) {
      const expectedAlpha = context.options.webgl.alpha ? 0 : 255;
      if (clearedRgba[0] !== 0 || clearedRgba[1] !== 0 || clearedRgba[2] !== 0 || clearedRgba[3] !== expectedAlpha) {
        return {
          pass: false,
          message: `After clearing the framebuffer, expected context to render [0, 0, 0, ${expectedAlpha}], but rendered: ${clearedRgba}`
        };
      }
    }
  }
  const rgba = output.color;
  if (!webglStub2) {
    if (expectEqual) {
      if (!Math_default.equalsEpsilon(rgba[0], expected[0], 0, epsilon) || !Math_default.equalsEpsilon(rgba[1], expected[1], 0, epsilon) || !Math_default.equalsEpsilon(rgba[2], expected[2], 0, epsilon) || !Math_default.equalsEpsilon(rgba[3], expected[3], 0, epsilon)) {
        return {
          pass: false,
          message: `Expected context to render ${expected}, but rendered: ${rgba}`
        };
      }
    } else if (Math_default.equalsEpsilon(rgba[0], expected[0], 0, epsilon) && Math_default.equalsEpsilon(rgba[1], expected[1], 0, epsilon) && Math_default.equalsEpsilon(rgba[2], expected[2], 0, epsilon) && Math_default.equalsEpsilon(rgba[3], expected[3], 0, epsilon)) {
      return {
        pass: false,
        message: `Expected context not to render ${expected}, but rendered: ${rgba}`
      };
    }
  }
  return { pass: true };
}
function createRendererMatchers() {
  return {
    toRender: function(util) {
      return {
        compare: function(actual, expected) {
          return renderEquals(util, actual, expected, true);
        }
      };
    },
    notToRender: function(util) {
      return {
        compare: function(actual, expected) {
          return renderEquals(util, actual, expected, false);
        }
      };
    },
    toRenderAndCall: function(util) {
      return {
        compare: function(actual, expected) {
          const actualRgba = renderAndReadPixels(actual);
          if (!window.webglStub) {
            expected(actualRgba);
          }
          return { pass: true };
        }
      };
    },
    toRenderPixelCountAndCall: function(util) {
      return {
        compare: function(actual, expected) {
          const actualRgba = renderAndReadPixels(actual);
          if (!window.webglStub) {
            expected(countRenderedPixels(actualRgba));
          }
          return { pass: true };
        }
      };
    },
    toPickPrimitive: function(util) {
      return {
        compare: function(actual, expected, x, y, width, height) {
          return pickPrimitiveEquals(actual, expected, x, y, width, height);
        }
      };
    },
    notToPick: function(util) {
      return {
        compare: function(actual, x, y, width, height) {
          return pickPrimitiveEquals(actual, void 0, x, y, width, height);
        }
      };
    },
    toDrillPickPrimitive: function(util) {
      return {
        compare: function(actual, expected, x, y, width, height) {
          return drillPickPrimitiveEquals(actual, 1, x, y, width, height);
        }
      };
    },
    notToDrillPick: function(util) {
      return {
        compare: function(actual, x, y, width, height) {
          return drillPickPrimitiveEquals(actual, 0, x, y, width, height);
        }
      };
    },
    toPickAndCall: function(util) {
      return {
        compare: function(actual, expected, args) {
          const result = actual.pick(args ?? new Cartesian2_default(0, 0));
          if (!window.webglStub) {
            expected(result);
          }
          return { pass: true };
        }
      };
    },
    toSnapAndCall: function(util) {
      return {
        compare: function(actual, expected, args) {
          const result = actual.snap(args ?? new Cartesian2_default(0, 0));
          if (!window.webglStub) {
            expected(result);
          }
          return { pass: true };
        }
      };
    },
    toPickVoxelAndCall: function(util) {
      return {
        compare: function(actual, expected, args) {
          const result = actual.pickVoxel(args ?? new Cartesian2_default(0, 0));
          if (!window.webglStub) {
            expected(result);
          }
          return { pass: true };
        }
      };
    },
    toDrillPickAndCall: function(util) {
      return {
        compare: function(actual, expected, limit) {
          const pickedObjects = actual.drillPick(new Cartesian2_default(0, 0), limit);
          if (!window.webglStub) {
            expected(pickedObjects);
          }
          return { pass: true };
        }
      };
    },
    toPickFromRayAndCall: function(util) {
      return {
        compare: function(actual, expected, ray, objectsToExclude, width) {
          const result = actual.pickFromRay(ray, objectsToExclude, width);
          if (!window.webglStub) {
            expected(result);
          }
          return { pass: true };
        }
      };
    },
    toDrillPickFromRayAndCall: function(util) {
      return {
        compare: function(actual, expected, ray, limit, objectsToExclude, width) {
          const results = actual.drillPickFromRay(
            ray,
            limit,
            objectsToExclude,
            width
          );
          if (!window.webglStub) {
            expected(results);
          }
          return { pass: true };
        }
      };
    },
    toSampleHeightAndCall: function(util) {
      return {
        compare: function(actual, expected, position, objectsToExclude, width) {
          const results = actual.sampleHeight(
            position,
            objectsToExclude,
            width
          );
          if (!window.webglStub) {
            expected(results);
          }
          return { pass: true };
        }
      };
    },
    toClampToHeightAndCall: function(util) {
      return {
        compare: function(actual, expected, cartesian, objectsToExclude, width) {
          const results = actual.clampToHeight(
            cartesian,
            objectsToExclude,
            width
          );
          if (!window.webglStub) {
            expected(results);
          }
          return { pass: true };
        }
      };
    },
    toPickPositionAndCall: function(util) {
      return {
        compare: function(actual, expected, x, y) {
          const canvas = actual.canvas;
          x = x ?? canvas.clientWidth / 2;
          y = y ?? canvas.clientHeight / 2;
          const result = actual.pickPosition(new Cartesian2_default(x, y));
          if (!window.webglStub) {
            expected(result);
          }
          return { pass: true };
        }
      };
    },
    toReadPixels: function(util) {
      return {
        compare: function(actual, expected) {
          let context;
          let framebuffer;
          let epsilon = 0;
          const options = actual;
          if (defined_default(options.context)) {
            context = options.context;
            framebuffer = options.framebuffer;
            epsilon = options.epsilon ?? epsilon;
          } else {
            context = options;
          }
          const rgba = context.readPixels({ framebuffer });
          let pass = true;
          let message;
          if (!window.webglStub) {
            if (!Math_default.equalsEpsilon(rgba[0], expected[0], 0, epsilon) || !Math_default.equalsEpsilon(rgba[1], expected[1], 0, epsilon) || !Math_default.equalsEpsilon(rgba[2], expected[2], 0, epsilon) || !Math_default.equalsEpsilon(rgba[3], expected[3], 0, epsilon)) {
              pass = false;
              message = epsilon === 0 ? `Expected context to render ${expected}, but rendered: ${rgba}` : `Expected context to render ${expected} with epsilon = ${epsilon}, but rendered: ${rgba}`;
            }
          }
          return { pass, message };
        }
      };
    },
    notToReadPixels: function(util) {
      return {
        compare: function(actual, expected) {
          const rgba = actual.readPixels();
          let pass = true;
          let message;
          if (!window.webglStub) {
            if (rgba[0] === expected[0] && rgba[1] === expected[1] && rgba[2] === expected[2] && rgba[3] === expected[3]) {
              pass = false;
              message = `Expected context not to render ${expected}, but rendered: ${rgba}`;
            }
          }
          return { pass, message };
        }
      };
    },
    contextToRenderAndCall: function(util) {
      return {
        compare: function(actual, expected) {
          const actualRgba = contextRenderAndReadPixels(actual).color;
          if (!window.webglStub) {
            expected(actualRgba);
          }
          return { pass: true };
        }
      };
    },
    contextToRender: function(util) {
      return {
        compare: function(actual, expected) {
          return expectContextToRender(actual, expected, true);
        }
      };
    },
    notContextToRender: function(util) {
      return {
        compare: function(actual, expected) {
          return expectContextToRender(actual, expected, false);
        }
      };
    }
  };
}

// Specs/createAsyncMatchers.js
function makeAsyncThrowFunction(debug, Type, name) {
  if (debug) {
    return function(util) {
      return {
        compare: function(actualPromise, message) {
          if (!defined_default(actualPromise) || !defined_default(actualPromise.then)) {
            throw new Error("Expected function to be called on a promise.");
          }
          return actualPromise.then(() => {
            return {
              pass: false,
              message: "Expected a promise to be rejected but it was resolved."
            };
          }).catch((e) => {
            let result = e instanceof Type || e.name === name;
            if (defined_default(message)) {
              if (typeof message === "string") {
                result = result && e.message === message;
              } else {
                result = result && message.test(e.message);
              }
            }
            return {
              pass: result,
              message: result ? `Expected a promise to be rejected with ${name}.` : `Expected a promise to be rejected with ${defined_default(message) ? `${name}: ${message}` : name}, but it was rejected with ${e}`
            };
          });
        }
      };
    };
  }
  return function() {
    return {
      compare: function(actualPromise) {
        return Promise.resolve(actualPromise).then(() => {
          return { pass: true };
        }).catch((e) => {
          return { pass: true };
        });
      },
      negativeCompare: function(actualPromise) {
        return Promise.resolve(actualPromise).then(() => {
          return { pass: true };
        }).catch((e) => {
          return { pass: true };
        });
      }
    };
  };
}
function createAsyncMatchers(debug) {
  return {
    toBeRejectedWithDeveloperError: makeAsyncThrowFunction(
      debug,
      DeveloperError_default,
      "DeveloperError"
    )
  };
}

// packages/engine/Specs/karma-main.js
var includeCategory = "";
var excludeCategory = "";
var webglValidation = false;
var webglStub = false;
var release = false;
var debugCanvasWidth;
var debugCanvasHeight;
if (__karma__.config.args) {
  includeCategory = __karma__.config.args[0];
  excludeCategory = __karma__.config.args[1];
  webglValidation = __karma__.config.args[2];
  webglStub = __karma__.config.args[3];
  release = __karma__.config.args[4];
  debugCanvasWidth = __karma__.config.args[5];
  debugCanvasHeight = __karma__.config.args[6];
}
window.CESIUM_BASE_URL = "base/packages/engine/Build";
jasmine.DEFAULT_TIMEOUT_INTERVAL = 3e4;
var env = jasmine.getEnv();
env.beforeEach(function() {
  const debug = !release;
  env.addMatchers({
    ...createBaseMatchers(debug),
    ...createRendererMatchers()
  });
  env.addAsyncMatchers(createAsyncMatchers(debug));
});
customizeJasmine_default(env, {
  includeCategory,
  excludeCategory,
  webglValidation,
  webglStub,
  release,
  debugCanvasWidth,
  debugCanvasHeight
});
//# sourceMappingURL=karma-main.js.map
