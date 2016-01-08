
var player = function(state, action) {
    switch (action.type) {

        case "PASS":
        case "KEEPBALL":
            return Object.assign({}, state, {
                zone: _movePlayerZone(state.zone, Object.assign({}, action, {
                    playerPosition: state.position
                }))
            });
            break;

        default:
            return state;
    }
}


var _movePlayerZone = function(state, action) {
    if (action.sideOFF) {
        return _moveOFFplayerZone(state, action);
    } else {
        if (action.align) {
            return _moveDEFplayerZone(state, action);
        } else {
            return state;
        }
    }
}

var _moveOFFplayerZone = function(_zone, action) {

    if (_zone === 0) {
        return _zone;
    }

    var afterZone = _zone;
    if (action.formation.fwzone === 6) {
        //[1] FW in the Goal Area? No->ALL +1 
        if (action.formation.mfzone !== 6) {
            if (action.playerPosition == "DF" || action.playerPosition == "MF") {
                afterZone = _zone + 1;
            }
        } else {
            // console.log("<stay>");
        }
    } else {
        if (action.formation.mfzone === 1) {
            //mf在最後一排
            if (action.playerPosition == "MF" || action.playerPosition == "FW") {
                afterZone = _zone + 1;
            }
        } else {
            afterZone = _zone + 1;
        }
    }
    return afterZone;
}

var _moveDEFplayerZone = function(_zone, action) {

    if (_zone === 0) {
        return _zone;
    }

    var afterZone = _zone;
    if (action.formation.dfzone === 1) {
        //[1] FW in the Goal Area? No->ALL +1 
        if (action.formation.mfzone !== 1) {
            if (action.playerPosition == "FW" || action.playerPosition == "MF") {
                afterZone = _zone - 1;
            }
        } else {
            // console.log("<stay>");
        }
    } else {
        if (action.formation.mfzone === 6) {
            //mf在最後一排
            if (action.playerPosition == "MF" || action.playerPosition == "DF") {
                afterZone = _zone - 1;
            }
        } else {
            afterZone = _zone - 1;
        }
    }
    return afterZone;

}

module.exports = player;