import Team from './js/Team';
import Plot from './js/Plot';

import gameset from './reducer/gamesetCookie';
import _getInverseZone from './util/_getInverseZone';
import _plotHero from './util/_plotHero';
import HeroDataTable from './js/HeroDataTable'
var queryString = require('query-string');

import cookie from 'js-cookie';
var myplayers = JSON.parse(cookie.get('tst'));
var yourplayers = myplayers.map(function(player,idx){
    return Object.assign({},player,{name:"PC_"+idx});
});


import React, {
    Component
}
from 'react';
import ReactDOM from 'react-dom';
var redux = require('redux');

const _q = queryString.parse(location.search);
var TERMDURATION = typeof _q.term === "undefined" ? 1000 : _q.term;
// CSS class ====================
var style = {};
style.field = {
    position: "relative",
    width: 375,
    height: 500,
    backgroundImage: "url('img/field.jpg')",
    backgroundSize: "375px 500px",
    backgroundRepeat: "no-repeat",
    backgroundColor: "lightgreen",
    top: 0,
    left: 0,
    opacity: 0.9,
    zIndex: -1
}
style.panel = {
    position: "relative",
    width: 375,
    height: 100,
    backgroundColor: "lightgreen",
    top: 0,
    left: 0,
    zIndex: 1

}

style.box = {
    width: 50,
    height: 50,
    backgroundColor: "#EE82EE"
}
style.longbox = {
    width: 100,
    height: 50,
    backgroundColor: "lightyellow"
}

var hide = {
    display: 'none'
};

var show = {
    display: 'block'
}

var chooseActionPanel = hide;
var chooseShootPanel = hide;

var dialog = {};
dialog.all = show;
dialog.gamestart = show;
dialog.goal = hide;
dialog.gameover = hide;


// ==============================


console.log("============ Game Start ==========");
console.log("");

var __p = _plotHero;

var checkRound = function() {
    //__NEXT = readlineSync.question('press any key to continue ...');
    if ((!store.getState().teams.goal) && (store.getState().timePass > 0)) {
        //[1] 一般狀態，下一回合
        
            nextRound();

    } else if ((store.getState().teams.goal) && (store.getState().timePass > 0)) {
        //[2] 射門成功，Reset
        dialog.all = show;
        dialog.goal = show;
        dialog.gamestart = hide;
        
        render();

    } else {
        //[3] 時間到，遊戲結束
        console.log("---------- --------- ---------");
        console.log(("           Game OVER "));
        console.log("---------- --------- ---------");
        dialog.all = show;
        dialog.gameover = show;
        dialog.gamestart = hide;

        render();
    }
};

var __chooseAction;
var __ClearWaitChoose;

var nextRound = function() {

    console.log("---------- --------- ---------");
    console.log(("           Round " + store.getState().count));
    console.log("---------- --------- ---------");

    var teams = store.getState().teams,
        myTeam = teams.myTeam,
        yourTeam = teams.yourTeam,
        activePlayer = teams.activePlayer;

    var DEFteam = (myTeam.sideOFF) ? yourTeam : myTeam;

    var DEFZonePlayers = DEFteam.playerList.filter(function(_p) {
        return activePlayer.zone === +_getInverseZone(_p.zone);
    });

    //plot(myTeam, yourTeam, activePlayer);
    console.log("Now ActivePlayer is " + __p(activePlayer) + " in its zone " + activePlayer.zone);

    var result = {
        type: "",
        ballKeeper: {}
    }

    var action = {
        userAction: store.getState().userAction,
        userShoot: store.getState().userShoot,
        type: activePlayer.switchAction(),
        player: activePlayer,
        DEFteam: DEFteam,
        withoutDEF: (DEFZonePlayers.length <= 0 || activePlayer.position === "GK") ? true : false,
        shootGK: false
    }

    result = activePlayer.exeAction(action);

    console.log(result);
    switch (result.desc) {
        case "userChooseAction":
            dialog.gamestart = hide;
            chooseActionPanel = show;
            render();
            __chooseAction = action;

            break;
        case "userChooseShoot":

            shootGameBegin(action);

            break;
        default:
            store.dispatch({
                act: action.type,
                type: result.desc,
                ballKeeper: result.ballKeeper
            });
            break;
    }

}

var chooseActionExe = function(action){
   
    chooseActionPanel = hide;
    dialog.gamestart = show;

    render();
     var result = action.player.exeAction(Object.assign({}, action, {
        type: store.getState().userAction,
        userAction: store.getState().userAction,
    }));

    if (result.desc === "userChooseShoot") {
        shootGameBegin(action);
    } else {

        store.dispatch({
            type: result.desc,
            act: store.getState().userAction,
            ballKeeper: result.ballKeeper
        });
    }
}

var __ActionShoot;
var __ClearWaitShoot;

var shootGameBegin = function(action) {
    dialog.gamestart = hide;
    chooseShootPanel = show;
    render();

    __ActionShoot = action;
   
}



var shootGameExe = function(action) {
    chooseShootPanel = hide;
    dialog.gamestart = show;
    //styleNext = show;
    var result = action.player.exeAction(Object.assign({}, action, {
        type: "SH",
        shootGK: true,
        userShoot: store.getState().userShoot
    }));

    store.dispatch({
        type: result.desc,
        act: "SH",
        ballKeeper: result.ballKeeper
    });

}

//============================
var userAction = function(act) {
    //chooseActionPanel = hide;
    clearTimeout(__ClearWaitChoose);
    store.dispatch({
        type: "changeUserAction",
        act:act,
        userAction: act
    });
    chooseActionExe(__chooseAction);
}
    //============================
var userShoot = function(target) {
    store.dispatch({
        type: "changeUserShoot",
        userShoot: target
    });
    shootGameExe(__ActionShoot);
}
    //============================

//若要 隨時間進行，則 onclick 就是GameStart
//若要 一步一步進行，則 onclick 要改成 nextRound,並把timeout 的nextRound取消
var GameStart = function() {

    store.dispatch({
        type: "timePass"
    });
    checkRound();
};

var GameReset = function() {

    dialog.goal = hide;
    dialog.gamestart = show;
    var myTeamStart = !store.getState().teams.activePlayer.isPlayer();

    store.dispatch({
        type: "reset",
        myTeamStart: myTeamStart
    });
}


var store = redux.createStore(gameset);

class MainApp extends Component {
    render() {

        return ( 
            <div>
                <div style={style.field}>
                    <Plot act={store.getState().act} teams = {store.getState().teams}/>
                </div>
               
                <div style={style.panel}>
                    <div style={{float:"left",width:200}}>
                        [TST] {store.getState().score.my} : {store.getState().score.your} [PC]
                        
                        <div>Time: {store.getState().timePass}</div>
                       {/*
                        <div>now select: {store.getState().userAction}</div>
                        <div>now shoot: {store.getState().userShoot}</div>
                       */}
                    </div>
                    <div style={{float:"right"}}>
                        <div style={Object.assign({},style.dialog,dialog.all)}>
                            <div style={dialog.gamestart}>
                                <button style={style.longbox} onClick={GameStart}>Next</button>
                            </div>
                            <div style={dialog.gameover}>
                                <button style={style.longbox}  >
                                 GameOver <br/>
                                TST {store.getState().score.my} : {store.getState().score.your} PC 
                                </button>
                            </div>
                            <div style={dialog.goal}>
                                <button style={style.longbox} onClick={GameReset} > 
                                    === Goal ===<br/>
                                    TST {store.getState().score.my} : {store.getState().score.your} PC 
                                </button>
                            </div>
                        </div>
                        <div style={chooseActionPanel}>
                            <button style={style.box} onClick={()=>{userAction("SH")}} > SH </button>
                            <button style={style.box} onClick={()=>{userAction("DR")}} > DR </button>
                            <button style={style.box} onClick={()=>{userAction("PS")}} > PS </button>
                        </div>
                        <div style={chooseShootPanel}>
                            <div>
                                <button style={style.box} onClick={()=>{userShoot("UL")}} > LT </button>
                                <button style={style.box} onClick={()=>{userShoot("UM")}} > MT </button>
                                <button style={style.box} onClick={()=>{userShoot("UR")}} > RT </button>
                            </div>
                            <div>
                                <button style={style.box} onClick={()=>{userShoot("BL")}} > LB </button>
                                <button style={style.box} onClick={()=>{userShoot("BM")}} > MB </button>
                                <button style={style.box} onClick={()=>{userShoot("BR")}} > RB </button>
                            </div>

                        </div>
                    </div>
                </div>

                 <div>
                    <HeroDataTable players={myplayers} />
                    <HeroDataTable players={yourplayers} />
                 </div>

            </div>
        );
    }
}

const render = () => {
    ReactDOM.render( < MainApp / > ,
        document.getElementById('root')
    );
};

//store.subscribe(checkRound);
store.subscribe(render);
render();

