var googleImageSearch = require('../jej_modules/tools/google-image-search.js');

var imageHandler = function (client, channel, content) {
    googleImageSearch.search(client, channel, content, {});
}

module.exports = imageHandler;
