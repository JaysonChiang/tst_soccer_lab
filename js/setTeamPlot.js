import React, {Component} from 'react';
import _getInverseZone from '../util/_getInverseZone';
import Hero from './setTeamHero';

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
  var _iniZone = function(position) {
      switch (position) {
          case "FW":
              return 3;
          
          case "MF":
               return 2;
    
          case "DF":
               return 1;
 
          case "GK":
               return 0;
      }
  }

var doPlot = function(list) {
    
    var PlayerList = list.map(function(p){
      return Object.assign({},p,{zone:_iniZone(p.position),sideOFF:true});
    });

    return (
        <div>
            <div>
                { 
                  PlayerList.map(function(player, idx) {
                      return (<Hero coordinate={{zone:player.zone, align:player.alignment}} 
                                    key={player.name+"_"+idx} 
                                    player={player} 
                                    sideOFF={player.sideOFF}
                                    getBallPlayerName={""}  />);
                  })
                }
            </div>
        </div>
    );
}


class Plot extends Component {
  render() {
    return (
       <div>
       {doPlot(this.props.team)}
       </div>
   );
  }
}
module.exports = Plot;

