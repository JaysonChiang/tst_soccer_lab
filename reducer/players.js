var player = require('./player');

var players = function(state, action) {

    switch (action.type) {
        case "PASS":
        case "KEEPBALL":
            return state.map(function(p) {
                return player(p, action);
            });
            break;

        default:
            return state;

    }
}
module.exports = players;