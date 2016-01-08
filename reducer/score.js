var score = function(state, action) {

    switch (action.type) {
        case "GOAL":
            var myScore = state.my;
            var yourScore = state.your;

            if(action.ballKeeper.isPlayer()) {
                myScore = myScore + 1;
            }else{
                yourScore = yourScore + 1;
            }

            return {my:myScore,your:yourScore};
            break;
        

        default:
            return state;

    }
}
module.exports = score;