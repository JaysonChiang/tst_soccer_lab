import React, {Component} from 'react';

var style={};
style.player =  {
      position:"absolute",
      width: "auto",
      margin: "10"
};

style.zone = [380, 320, 260, 200, 140, 80];
style.align= [0, 80, 160, 240, 320 ];

var cr = {color:"#F8BBD0",textShadow: "2px 2px 4px #000000"}
var cb = {color:"#FFECB3",textShadow: "2px 2px 4px #000000"}

class Hero extends Component {
  render() {
    var player = this.props.player;
    var getBallPlayerName = this.props.getBallPlayerName;

    var cp = player.isPlayer()  ? cb : cr;

    var x = style.align[this.props.coordinate.align - 1];

    var y;
    if(player.position==="GK") {
      y = player.isPlayer()? 420 : 20 ;
    }else{
      y = style.zone[this.props.coordinate.zone - 1];
    }
    x =player.isPlayer()? x-10:x+10;
    y =player.isPlayer()? y+10:y-10;

    var z =this.props.sideOFF? 2 : 1;
    
var playerStyle = Object.assign({},
  style.player,
  {top:y, left:x, zIndex:z ,boxShadow: "2px 2px 1px grey"},
  {backgroundColor:player.isPlayer()?'rgba(255,204,51,0.8)':'rgba(255, 102, 153, 0.8)'})

//console.log(player.name+":"+this.props.coordinate.zone+","+this.props.coordinate.align);
    return (
         <div style={playerStyle} > 
             <div>[{player.position}]</div>
             <strong  style={cp}>{player.name}</strong>
         </div>
   );
  }
}
module.exports = Hero;