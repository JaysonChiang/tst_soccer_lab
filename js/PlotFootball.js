import React, {Component} from 'react';
var style={};
style.football={
  height:"24",
  weight:"24"
};
style.act={
  height:"24",
  weight:"24",
  backgroundColor:"#03a9f4"
};
style.pabs =  {
    position:"absolute",
    zIndex:3
};

class Football extends Component {
  render() {
  	var position = this.props.position;
    return (
    	<div style={Object.assign({},position,style.pabs,{top:this.props.top,left:this.props.left})} >
    	    <span style={style.act} >{this.props.act}</span>
          <img style={style.football} src="./img/football.png" />
        </div>
   );
  }
};

module.exports = Football;