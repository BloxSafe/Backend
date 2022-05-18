/**
 * @description Generate a random string.
 */
module.exports = function main(strLength, charSet) {
    var result = [];
    strLength = strLength || 5;
    charSet =
        charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    while (strLength--) {
        result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
    }
    return result.join("");
};
