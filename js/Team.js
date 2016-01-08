var Player = require('./Player');


var Team = function(players, user, sideOFF) {

    var PlayerList = players.map(function(player) {
        return new Player(player, user);
    });
    var sideOFF = sideOFF;

    // init Active Player
    var iniActivePlayers = PlayerList.filter(function(player) {
        return player.position === "FW";
    });

    var randomIndex = Math.round(Math.random() * (iniActivePlayers.length - 1));

    var ActivePlayer = iniActivePlayers[randomIndex];
    // end  ActivePlayer


    var getOnePlayer = function(players) {
        var randomIndex = Math.round(Math.random() * (players.length - 1));
        return players[randomIndex];
    }

    return {
        playerList: PlayerList,
        sideOFF :sideOFF,
        goal: false,
        getZonePlayersAll: function(_zone) {
            return this.playerList.filter(function(player) {
                return player.zone === _zone;
            });
        },
        getPlayersByPosition: function(_position) {
            return this.playerList.filter(function(player) {
                return player.position === _position;
            });
        },
        movePosition :function(_players) {
                    _players.forEach(function(player) {
                        player.zone = player.zone + 1;
                        player.DEFzone = +_getInverseZone(player.zone);
                    });
                },
        getOnePlayerInZone: function(zone) {
            var _Players = this.getZonePlayersAll(zone);

            return getOnePlayer(_Players);
        }
    };
}

module.exports = Team;
