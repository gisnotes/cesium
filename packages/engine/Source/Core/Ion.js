import Resource from "./Resource.js";

const defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNThmOGZlYy0yMWRhLTQ1Y2QtOWEzYy1kZDc1OTdkMDFiZmUiLCJpZCI6ODg0MjQsImlhdCI6MTY2OTUxNjY0N30.EnNjIANE_y4A1mB2PjYdWQJ5iqGqgztwUdV7blYGcNo";
/**
 * Default settings for accessing the Cesium ion API.
 *
 * An ion access token is only required if you are using any ion related APIs.
 * A default access token is provided for evaluation purposes only.
 * Sign up for a free ion account and get your own access token at {@link https://cesium.com}
 *
 * @see IonResource
 * @see IonImageryProvider
 * @see IonGeocoderService
 * @see createWorldImagery
 * @see createWorldTerrain
 * @namespace Ion
 */
const Ion = {};

/**
 * Gets or sets the default Cesium ion access token.
 *
 * @type {string}
 */
Ion.defaultAccessToken = defaultAccessToken;

/**
 * Gets or sets the default Cesium ion server.
 *
 * @type {string|Resource}
 * @default https://api.cesium.com
 */
Ion.defaultServer = new Resource({ url: "https://api.cesium.com/" });

Ion.getDefaultTokenCredit = function (providedKey) {
  return undefined;
};
export default Ion;
