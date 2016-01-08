var _actionChance = require('../util/_actionChance');
import _getInverseZone from '../util/_getInverseZone';
import _plotHero from '../util/_plotHero';

var __p = _plotHero;

var Player = function(player, user) {
    var playerName = player.name,
        playerSkill = player.skill,
        playerPosition = player.position,
        playerAlignment = player.alignment,
        keepBall = false;

    var _iniZone = function() {
        var position = playerPosition;
        var zone;
        switch (position) {
            case "FW":
                zone = 3
                break;
            case "MF":
                zone = 2
                break;
            case "DF":
                zone = 1
                break;
            case "GK":
                zone = 0
                break
        }
        return zone;
    }


    return {
        name: playerName,
        position: playerPosition,
        skill: playerSkill,
        zone: _iniZone(playerPosition),
        alignment: playerAlignment,
        isPlayer: function() {
            return (user === "PL") ? true : false;
        },

        exeAction: function(action) {

            //var thisType = thisPlayer.switchAction();

            if (action.withoutDEF) {
                console.log(__p(action.player) + "  exeAction [ " + (action.type) + " ] wihoutDEF");
            } else {
                console.log(__p(action.player) + " exeAction [ " + (action.type) + " ]");
            }

            switch (action.type) {
                case "SH":
                    return shoot(action);
                    break;
                case "DR":
                    return dribble(action);
                    break;
                case "PS":
                    return pass(action);
                    break;
                case "PL":
                    if (action.player.isPlayer()) {
                        return (
                            {desc: "userChooseAction"});
                    } else {
                        return playGamePC(action);
                    }
                    break;
                default:
                    return result;
                    break;
            }

        },

        switchAction: function() {
            //TODO: console.log('TODO CHECK Active Zone:' + this.zone);
            var weights = _actionChance(playerPosition, this.zone); // probabilities
            var results = ["SH", "DR", "PS", "PL"]; // values to return

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
    };
};

var getSkillPoint = function(action) {
    return action.player.skill[action.type];
}
var throwDicePoint = function() {
    return Math.round(Math.random() * 5) + 1;
}
var getFieldPoint = function(action) {

    var _z = action.player.zone + "";
    switch (_z) {
        case "6":
            return 1;
        case "5":
            return 0;
        case "4":
            return -1;
        case "3":
            return -2;
        case "2":
            return -3;
        case "1":
            return -4;
        default:
            return 0;
    }
}

var GoalGamePoint = function(action) {

    console.log('');
    console.log('  +-----------------+');
    console.log('  |  1  |  2  |  3  |');
    console.log('  |-----------------|');
    console.log('  |  4  |  5  |  6  |');
    console.log('-----------------------');

    var OFFindex,DEFindex;
    var ShootPosition = ["UL","UM","UR","BL","BM","BR"];
    var randomDice = Math.floor(Math.random() * 6);
    console.log('shoot:'+ randomDice);

    if (action.player.isPlayer()) {
        OFFindex = action.userShoot;
        DEFindex = ShootPosition[randomDice];
    } else {
        OFFindex = ShootPosition[randomDice];
        DEFindex = action.userShoot;
    }

    var point = WhereIsTheBall(DEFindex, OFFindex); //TODO

    return point;
}

var WhereIsTheBall = function(DEFindex, OFFindex) {
    var point = 0;
    var pointMap= {
        UL: {UL: 1, UM:0, UR:-1, BL: 0, BM: 0, BR:-1},
        UM: {UL: 0, UM:1, UR: 0, BL:-1, BM: 0, BR:-1},
        UR: {UL:-1, UM:0, UR: 1, BL:-1, BM: 0, BR: 0},
        BL: {UL: 0, UM:0, UR:-1, BL: 1, BM: 0, BR:-1},
        BM: {UL:-1, UM:0, UR:-1, BL: 0, BM: 1, BR: 0},
        BR: {UL:-1, UM:0, UR: 0, BL:-1, BM: 0, BR: 1},
    }
 
    switch (OFFindex) {
        case "UL":
            point = pointMap.UL[DEFindex];
            break;
        case "UM":
            point = pointMap.UM[DEFindex];
            break;
        case "UR":
            point = pointMap.UR[DEFindex];
            break;
        case "BL":
            point = pointMap.BL[DEFindex];
            break;
        case "BM":
            point = pointMap.BM[DEFindex];
            break;
        case "BR":
            point = pointMap.BR[DEFindex];
            break;
    }
    console.log('OFF [' + OFFindex + '], DEF [' + DEFindex + '], GK point: ' + point);
    return point;
}

var shoot = function(action) {

    if (action.withoutDEF || action.shootGK===true) {
        return shootGK(action);
    } else {
        return PKwithDEF(action);
    }

    return finalResult;
}

var shootGK = function(action) {

    return PKwithDEF(Object.assign(action, {
        shootGK: true
    }));

}


var pass = function(action) {

    if (action.withoutDEF) {
        return {
            desc: "PASS",
            ballKeeper: action.player
        };
    } else {
        return PKwithDEF(action);

    }
}

var dribble = function(action) {

    if (action.withoutDEF) {
        return {
            desc: "KEEPBALL",
            ballKeeper: action.player
        };
    } else {
        return PKwithDEF(action);
    }
}

var playGamePC = function(action) {
    var _player = action.player;

    var playerResult = (Math.floor(Math.random() * 3) + 1) + "";

    switch (playerResult) {
        case "1":
            console.log('you choose 1.Shoot !');
            console.log("[ " + _player.name + " ] exeAction [ " + ("SH") + " ]");

            return shoot(Object.assign(action, {
                type: "SH"
            }));

        case "2":
            console.log('you choose 2.Dribble !');
            console.log("[ " + _player.name + " ] exeAction [ " + ("DR") + " ]");

            return dribble(Object.assign(action, {
                type: "DR"
            }));

        case "3":
            console.log('you choose 3. Pass !');
            console.log("[ " + _player.name + " ] exeAction [ " + ("PS") + " ]");

            return pass(Object.assign(action, {
                type: "PS"
            }));

        default:
            return result;

    }
}

var PKwithDEF = function(action) {

    var _player = action.player;

    var OFF_skill = getSkillPoint(action),
        OFF_dice = throwDicePoint(),
        OFF_field = (action.type === "SH") ? getFieldPoint(action) : 0;
    var OFFPoint = OFF_skill + OFF_dice + OFF_field;

    var DEF_player;

    if (action.shootGK) {
        DEF_player = action.DEFteam.getOnePlayerInZone(0); // Shoot GK
    } else {
        DEF_player = action.DEFteam.getOnePlayerInZone(+_getInverseZone(_player.zone));
    }

    var DEF_skill = DEF_player.skill["DF"],
        DEF_dice = throwDicePoint(),
        DEF_goalGame = (action.shootGK) ? GoalGamePoint(action) : 0;

    var DEFPoint = DEF_skill + DEF_dice + DEF_goalGame;

    if (typeof GK === "undefined") {
        console.log(__p(_player) + " V.S.  " + __p(DEF_player));
    } else {
        console.log("");
        console.log((" !!!!! Shoot !!!!!"));
        console.log("");
        console.log(__p(_player) + " V.S. " + __p(DEF_player));
    }
    console.log("");
    console.log("====   " + __p(_player) + " : " + OFF_skill + " + " + OFF_dice + " + " + OFF_field + " = " + (OFFPoint));
    console.log("====   " + __p(DEF_player) + ": " + DEF_skill + " + " + DEF_dice + " + " + DEF_goalGame + " = " + (DEFPoint));
    console.log("");

    if (OFFPoint > DEFPoint) {

        console.log("winner is " + __p(_player));

        switch (action.type) {
            case "SH":
                if (action.shootGK) {
                    return {
                        desc: "GOAL",
                        ballKeeper: _player
                    };
                } else {
                    //TODO: 這裡還是需要被確認
                    //console.log('TEST1');
                    //console.log(action);
                    return { 
                        desc: "userChooseShoot" 
                    };
                }
                break;
            case "PS":
                return {
                    desc: "PASS",
                    ballKeeper: _player
                };
                break;
            case "DR":
                return {
                    desc: "KEEPBALL",
                    ballKeeper: _player
                };
                break;
            default:
                return result;
        }

    } else if (OFFPoint < DEFPoint) {
        console.log("winner is " + __p(DEF_player));
        return {
            desc: "DEF_GET_BALL",
            ballKeeper: DEF_player
        }

    } else {
        console.log('tie tie tie');
        return {
            desc: "BALL_BONUCE",
            ballKeeper: _player
        } //TODO:先暫時放_player
    }

}

var pause = function(ms) {
    ms += new Date().getTime();
    while (new Date() < ms) {}
}

module.exports = Player;
