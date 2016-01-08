var players = require('./players');

var team = function(state, action) {

    switch (action.type) {
        case "GOAL":
            if (state.sideOFF) {
                return (Object.assign({},state,{goal:true}));
            }
            return state;

        case "PASS": //change active player, then move
        case "KEEPBALL": // 球留著，off全員前進，def跟著防守

            var FW = state.playerList.filter(function(p) {
                    return (p.position === "FW");
                }),
                MF = state.playerList.filter(function(p) {
                    return (p.position === "MF");
                }),
                DF = state.playerList.filter(function(p) {
                    return (p.position === "DF");
                });

            var formation = {
                fwzone: FW[0].zone,
                mfzone: MF[0].zone,
                dfzone: DF[0].zone,
                gkzone: 0
            }

            return Object.assign({}, state, {
                playerList: players(state.playerList, Object.assign({}, action, {
                    sideOFF: state.sideOFF,
                    formation: formation
                }))
            });

            break;

        case "DEF_GET_BALL":

            return Object.assign({}, state, {
                    sideOFF: !state.sideOFF
                });
            break;

         case "BALL_BONUCE":

            var PlayerGetBall = state.playerList.filter(function(_p) {
                return _p.name === action.catchBallPlayer.name;
            });

            return  Object.assign({}, state, {
                    sideOFF: (PlayerGetBall.length > 0) ? true : false
                });
            break;


        default:
            return state;
    }
}
module.exports = team;