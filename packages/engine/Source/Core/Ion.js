import Resource from "./Resource.js";

const defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IldQb0dGTEdyY2hDejlSMm8iLCJqdGkiOiIxZDlkMWFmZS0wZjY1LTQ2ZGYtOWQ2YS1iNjgxMmZjZTkyM2EiLCJpZCI6MjU5LCJzdWIiOiJDZXNpdW1KUyIsImlzcyI6Imh0dHBzOi8vYXBpLmNlc2l1bS5jb20iLCJhdWQiOiIxLjE0NyBSZWxlYXNlIC0gRGVsZXRlIG9uIEphbnVhcnkgMSwgMjAyNyIsImlhdCI6MTc5MjkwNTEyM30.doKMneDAmgY-6nOogKo5os5i7_xCI_4J3flZv21Uiv4";
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
