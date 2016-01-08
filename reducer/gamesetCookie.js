var Team = require('../js/Team');
var teams = require('./teams');
var score = require('./score');
var queryString = require('query-string');
var _getInverseZone = require('../util/_getInverseZone');

import cookie from 'js-cookie';
var myplayers = JSON.parse(cookie.get('tst'));
var yourplayers = myplayers.map(function(player,idx){
    return Object.assign({},player,{name:"PC_"+idx});
});

console.log(myplayers);

const _q = queryString.parse(location.search);
var GAMETIME = typeof _q.game === "undefined"?30:(_q.game/1000);


var gameset = function(state, action) {
    var randomStart = Math.round(Math.random() * 1);
    if (typeof state === 'undefined') {
        state = {
            act:"",
            score:{my:0, your:0},
            timePass: GAMETIME,
            timeCounter: -1,
            userAction: "PS",
            userShoot: "MT",
            count: 0,
            teams: {
                myTeam: new Team(myplayers, 'PL', !randomStart),
                yourTeam: new Team(yourplayers, 'PC', !!randomStart)
            },
            align: false
        };

        var startTeam = (!randomStart)?state.teams.myTeam:state.teams.yourTeam;
        state.teams = Object.assign({}, state.teams, {
            activePlayer: _getIniActivePlayer(startTeam)
        });
    }
    switch(action.type) {
        case "timePass":
            return Object.assign({}, state, {
                timePass:timePass(state.timePass, action)
            });

        case "resetTimeCounter":
            return  Object.assign({}, state, {
                timeCounter:resetTimeCounter(state.timeCounter, undefined)
            });

        case "descTimeCounter":
            return  Object.assign({}, state, {
                timeCounter:descTimeCounter(state.timeCounter, undefined)
            });

        case "changeUserAction":

            return Object.assign({}, state, {
                act:act(state.act, action),
                timeCounter: -1,
                userAction:userAction(state.userAction, action)
            });

        case "changeUserShoot":

            return Object.assign({}, state, {
                timeCounter: -1,
                userShoot:userShoot(state.userShoot, action)
            });

        case "reset":

            var resetState = {
                    act:"",
                    teams: {
                        myTeam: new Team(myplayers, 'PL', action.myTeamStart),
                        yourTeam: new Team(yourplayers, 'PC', !action.myTeamStart)
                    },
                    align: false
                };
                var newStartTeam = action.myTeamStart?resetState.teams.myTeam:resetState.teams.yourTeam
                resetState.teams = Object.assign({}, resetState.teams, {
                    activePlayer: _getIniActivePlayer(newStartTeam)
                });

            return Object.assign({}, state, resetState);

        default:
            return Object.assign({}, state, {
                act: act(state.act, action),
                score: score(state.score, action),
                count: count(state.count,'undefined'),
                teams: teams(state.teams, Object.assign({}, action, {
                    align: checkAlign(state.teams, 'undefined')
                }))
            });
    }
}
var timePass = function(state, action) {
    return state - 1 ;
}
var resetTimeCounter = function(state, action) {
    return 3;
}
var descTimeCounter = function(state, action) {
    return (state*10 -1)/10 ;
}
var act = function(state, action){
    return action.act;
}
var userAction = function(state, action){
    return action.userAction;
}
var userShoot = function(state, action){
    return action.userShoot;
}

var count = function(state, action) {
    return state + 1;
}

var checkAlign = function(state, action) {

    var myTeamFwZone = state.myTeam.getPlayersByPosition("FW")[0].zone;
    var yourTeamDfZone = +_getInverseZone(state.yourTeam.getPlayersByPosition("DF")[0].zone);

    return (myTeamFwZone === yourTeamDfZone) ? true : false;
}

var _getIniActivePlayer = function(team) {

    var iniActivePlayers = team.playerList.filter(function(player) {
        return player.position === "FW";
    });

    var randomIndex = Math.round(Math.random() * (iniActivePlayers.length - 1));

    return iniActivePlayers[randomIndex];
}


module.exports = gameset;