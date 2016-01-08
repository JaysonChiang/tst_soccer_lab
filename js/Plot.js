import React, {Component} from 'react';
import _getInverseZone from '../util/_getInverseZone';
import Hero from './PlotHero';
import Football from './PlotFootball';
import {Motion, spring} from 'react-motion';

var _inv = _getInverseZone;

var style = {};
style.container =  {
               "display": "-webkit-flex",
               "display": "flex",
                "height": "60",
      "WebkitAlignItems": "center",
            "AlignItems": "center",
  "WebkitJustifyContent": "center",
        "JustifyContent": "center"
}
style.zone = [380, 320, 260, 200, 140, 80];
style.align= [0, 80, 160, 240, 320 ];

var pre = {}, end = {};

var getBallCoordinate = function(myTeam,yourTeam,getBallPlayer){
    if(myTeam.goal===true){
      pre = {}, end = {};
      return {top:0, left:200};
    }
    if(yourTeam.goal===true){
      pre = {}, end = {};
      return {top:470, left:170};
    }

    var _player = getBallPlayer;
    var _Left = style.align[_player.alignment - 1];

    var _Top;

    if(_player.isPlayer()){
        _Top = (_player.position==="GK")? 420 : style.zone[(_player.zone - 1)];
    }else{
        _Top = (_player.position==="GK")? 20 : style.zone[+_inv(_player.zone) - 1];
    }

    _Left = _player.isPlayer()? _Left-20:_Left;
    _Top = _player.isPlayer()? _Top+10:_Top-10;

    return {top:_Top, left:_Left};
}

var doPlot = function(teams, act) {
      var myTeam = teams.myTeam,
        yourTeam = teams.yourTeam,
        getBallPlayer = teams.activePlayer;
       
    //init
    if(typeof pre.top === "undefined"){
        pre = getBallCoordinate(myTeam,yourTeam,getBallPlayer);
        end = pre
        end.Springtop = pre.top;
        end.Springleft = pre.left;
    }else{
        pre = end;
        end = getBallCoordinate(myTeam,yourTeam,getBallPlayer);
        end.Springtop = spring(end.top);
        end.Springleft = spring(end.left);
    }
    
    var myPlayerList = myTeam.playerList.map(function(p){
      return Object.assign({},p,{sideOFF:myTeam.sideOFF});
    });

    var yourPlayerList = yourTeam.playerList.map(function(p){
      return Object.assign({},p,{sideOFF:yourTeam.sideOFF});
    });

    var Allplayers = myPlayerList.concat(yourPlayerList);
    return (
        <div>
            <div>
                {
                    Allplayers.map(function(player,idx) {
                        var _zone = player.isPlayer()?(player.zone):(+_inv(player.zone)); 
                        return (<Hero coordinate={{zone:_zone, align:player.alignment}} 
                                      key={player.name+"_"+idx} 
                                      player={player} 
                                      sideOFF={player.sideOFF}
                                      getBallPlayerName={getBallPlayer.name}  />);
                    })
                }
                <Motion defaultStyle={{top:pre.top,left:pre.left}} style={{top:end.Springtop,left:end.Springleft}}>
                    {value => 
                    <div>
                        <Football act={act} key="ball" top={value.top} left={value.left} />
                    </div>}
                </Motion>
            </div>
        </div>
    );
}



class Plot extends Component {
  render() {
       var teams = this.props.teams;
       var act = this.props.act;
    return (
       <div>
       {doPlot(teams, act)}
       </div>
   );
  }
}
module.exports = Plot;

