import React, {Component} from 'react';

var tableStyle = {
    border: "1px solid black"
}
class HeroDataTable extends Component {

  render() {
    var players = this.props.players;
    return (
      <div style={{float:"left"}}>
        <table style={tableStyle} >
          <thead>
            <tr>
                <th>Name</th>
                <th>Po</th>
                <th>SH</th>
                <th>DR</th>
                <th>PS</th>
                <th>DF</th>
            </tr>
          </thead>
          <tbody>
            { players.map(function(p){
              return(          
                  <tr key={p.name+"_"+p.position}>
                    <td>{p.name}</td>
                    <td>{p.position}</td>
                    <td>{p.skill.SH}</td>
                    <td>{p.skill.DR}</td>
                    <td>{p.skill.PS}</td>
                    <td>{p.skill.DF}</td>
                  </tr>);
              })
            }
            </tbody>
         </table>
       </div>
   );
  }
};

module.exports = HeroDataTable;