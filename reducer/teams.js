
var team = require('./team');
import _passChance from '../util/_passChance';
import _getInverseZone from '../util/_getInverseZone';
import _plotHero from '../util/_plotHero';

var __p =  _plotHero;

var teams = function(state, action) {

    switch (action.type) {
        case "GOAL":
            console.log("");
            console.log(("!!!!! Goal !!!!!"));
            console.log("");

            return (Object.assign({}, state, {goal:true}, {
                myTeam: team(state.myTeam, action),
                yourTeam: team(state.yourTeam, action)
            }));
       

        case "KEEPBALL":
            console.log(("OFF keep Ball"));
            console.log("");

            var myTeamAfter = team(state.myTeam, action),
                yourTeamAfter = team(state.yourTeam, action),
                activePlayer = _getActivePlayer(myTeamAfter, yourTeamAfter, action.ballKeeper);

            return (Object.assign({}, state, {
                myTeam: myTeamAfter,
                yourTeam: yourTeamAfter,
                activePlayer: activePlayer
            }));


        case "PASS":
            console.log(__p(action.ballKeeper) + (" pass ball success"));
            console.log("");

            var myTeamAfter = team(state.myTeam, action),
                yourTeamAfter = team(state.yourTeam, action);
            var activePlayer = {};
            if (myTeamAfter.sideOFF) {
                activePlayer = _pass(myTeamAfter, action.ballKeeper);
            } else {
                activePlayer = _pass(yourTeamAfter, action.ballKeeper);
            }

            return ({
                myTeam: myTeamAfter,
                yourTeam: yourTeamAfter,
                activePlayer: activePlayer
            });

            break;

        case "DEF_GET_BALL":
            console.log(("DEF get Ball"));
            console.log("");

            return   {
                myTeam: team(state.myTeam, action),
                yourTeam: team(state.yourTeam, action),
                activePlayer: action.ballKeeper
            };
            break;

        case "BALL_BONUCE":
            console.log(("Ball Bounce"));
            console.log("");

            var catchBallPlayer = _catchBallPlayer(state, action);

            console.log("who get ball?  " + __p(catchBallPlayer));
            return {
                myTeam: team(state.myTeam, Object.assign({},action,{catchBallPlayer:catchBallPlayer})),
                yourTeam: team(state.yourTeam, Object.assign({},action,{catchBallPlayer:catchBallPlayer})),
                activePlayer: catchBallPlayer
            }
            break;

        default:
            return state;
    }
}

var _passPosition = function(_position, _zone) {
    var weights = _passChance(_position, _zone);
    var results = ["FW", "MF", "DF", "GK"]; // values to return

    var num = Math.random(),
        s = 0,
        lastIndex = weights.length - 1;

    for (var i = 0; i < lastIndex; ++i) {
        s += weights[i];
        if (num < s) {
            //console.log("random switch " + results[i]);
            return results[i];
        }
    }
    //console.log("random switch " + results[lastIndex]);
    return results[lastIndex];
}

var _pass = function(team, ballKeeper) {
    var newActivePlayer;

    var position = _passPosition(ballKeeper.position, ballKeeper.zone);
    var name = ballKeeper.name;

    var zonePlayers = team.playerList.filter(function(player) {
        return (player.position === position && player.name !== name);
    });

    if (zonePlayers.length > 0) {
        newActivePlayer = _getOnePlayer(zonePlayers);
    } else {
        console.log("這裡的bug 就是當這區只剩 自己時，一定要把球傳給別區");
        newActivePlayer = _pass(team, ballKeeper);
    }

    console.log("New ActivePlayer is " + __p(newActivePlayer) + " in its zone " + newActivePlayer.zone);
    return newActivePlayer;
}



var _getActivePlayer = function(myTeam, yourTeam, ballKeeper) {
    var Allplayer = myTeam.playerList.concat(yourTeam.playerList);
    var activePlayer = Allplayer.filter(function(p) {
        return p.name === ballKeeper.name
    });
    return activePlayer[0];
}

var _getOnePlayer = function(players) {
    var randomIndex = Math.round(Math.random() * (players.length - 1));
    return players[randomIndex];
}

var _catchBallPlayer = function(state, action) {

    var ActiveZone = action.ballKeeper.zone;
    var AllplayersInZone = [];

    var myPlayerInZone = state.myTeam.playerList.filter(function(_p) {
        return state.myTeam.sideOFF ? _p.zone === ActiveZone : +_getInverseZone(_p.zone) === ActiveZone;
    });
    var yourPlayerInZone = state.yourTeam.playerList.filter(function(_p) {
        return state.yourTeam.sideOFF ? _p.zone === ActiveZone : +_getInverseZone(_p.zone) === ActiveZone;
    });

    AllplayersInZone = myPlayerInZone.concat(yourPlayerInZone);

    var randomIndex = Math.round(Math.random() * (AllplayersInZone.length - 1));
    var catchBallPlayer = AllplayersInZone[randomIndex];

    return catchBallPlayer;
}

module.exports = teams;