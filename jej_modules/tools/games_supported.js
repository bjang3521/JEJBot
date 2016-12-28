"use strict";

var fs = require('fs');

// Obtain the list of games and separate by newline.
var games = fs.readFileSync('resources/games_supported.txt', 'utf8').split('\n');

/**
 * Check to see if the input name is a part of a larger title. For an example, inputting
 * "league" is a part of "League of Legends" and so "isComponent" would return the title.
 * This function will return an array of all the objects that have that component in their
 * title.
 */
function _findGamesWithString(query) {
    var results = [];

    for (var i = 0; i < games.length; ++i) {
        var curr = games[i];

        if ((curr.toLowerCase()).indexOf(query.toLowerCase()) > -1) {
            results.push(curr);
        }
    }

    return results;
}

/**
 * Return true of false depending on whether the game being queried is a part of the games
 * dictionary contained within this module.
 */
function isSupported(query) {
    var results = _findGamesWithString(query);

    // If only 1 result, that means the correct one was found.
    if (results.length === 1) {
        return true;
    }

    // If any other, shouldn't return true.
    return false;
}

/**
 * Given a component of a game, get the first hit in the dictionary that matches
 * the queried string.
 */
function firstHit(query) {
    var results = _findGamesWithString(query);

    // If there is at least one hit, return the first game.
    if (results.length > 0) {
        // This is Windows-specific, but remove instances of \r
        return results[0].replace(/[\r\t\n]/, '');
    }

    return undefined;

}

module.exports = {
    raw: games,
    pretty: function() {
        var stringify = '';
        for (var title in games) {
            if (games.hasOwnProperty(title) && games[title]) {
                stringify += " - " + title + '\n';
            }
        }

        return stringify;
    },
    isSupported: isSupported,
    findFirstOccurance: firstHit
};