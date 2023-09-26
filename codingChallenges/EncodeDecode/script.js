/**
 * Encodes a URL to a shortened URL.
 *
 * @param {string} longUrl
 * @return {string}
 */
const urlMap = new Map();
var encode = function (longUrl) {
  const shortUrl = urlMap.size + 1;
  const url = `http://tinyurl.com/${shortUrl}`;
  urlMap.set(url, longUrl);
  return url;
};

/**
 * Decodes a shortened URL to its original URL.
 *
 * @param {string} shortUrl
 * @return {string}
 */
var decode = function (shortUrl) {
  return urlMap.get(shortUrl);
};
/**
 * Your functions will be called as such:
 * decode(encode(url));
 */
