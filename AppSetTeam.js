import Plot from './js/setTeamPlot';
import data,{myplayers, yourplayers} from './js/data';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import cookie from 'js-cookie';
var  redux  = require('redux');

var style = {};
style.field = {
    position: "relative",
    width: 375,
    height: 300,
    backgroundImage: "url('img/halffield.jpg')",
    backgroundSize: "375px 300px",
    backgroundRepeat: "no-repeat",
    backgroundColor: "lightgreen",
    top: 0,
    left: 0,
    opacity: 0.9,
    zIndex: -1
};

style.table = {
    border: "1px solid black"
};

//========== reducer ============
var app = function(state, action) {
    if (typeof state === 'undefined') {
        state = {
            players: myplayers,
            setHero: {
                name: "Messi",
                position: "MF",
                alignment: 3,
                skill: {
                    SH: 3,
                    DR: 3,
                    PS: 3,
                    DF: 3,
                }
            }
        };
    }
    switch (action.type) {
        case "addHero":
            return Object.assign({}, state, {
                players: addHero(state.players, action)
            });
        case "removeHero":
            return Object.assign({}, state, {
                players: removeHero(state.players, action)
            });
        case "name":
        case "position":
        case "alignment":
        case "skillSH":
        case "skillDR":
        case "skillPS":
        case "skillDF":
            return Object.assign({}, state, {
                setHero: setHero(state.setHero, action)
            });
        default:
            return state;
    }
    return state;
}

var addHero = function(state, action) {
    switch (action.type) {
        case "addHero":
            return [...state, action.hero];
        default:
            return state;
    }
}

var removeHero = function(state, action) {
    switch (action.type) {
        case "removeHero":
            return [...state.slice(0, action.idx),
                ...state.slice(action.idx + 1)
            ];
        default:
            return state;
    }
}
var setHero = function(state, action) {
    switch (action.type) {
        case "name":
            return Object.assign({}, state, {
                name: action.value
            });
        case "position":
            return Object.assign({}, state, {
                position: action.value
            });
        case "alignment":
            return Object.assign({}, state, {
                alignment: +action.value
            });
        case "skillSH":
        case "skillDR":
        case "skillPS":
        case "skillDF":
            return Object.assign({}, state, {
                skill: setHeroSkill(state.skill, action)
            });
        default:
            return state;
    }
}
var setHeroSkill = function(state, action) {
    switch(action.type){
    case "skillSH":
        return Object.assign({}, state, {
            SH: +action.value
        });
    case "skillDR":
        return Object.assign({}, state, {
            DR: +action.value
        });
    case "skillPS":
        return Object.assign({}, state, {
            PS: +action.value
        });
    case "skillDF":
        return Object.assign({}, state, {
            DF: +action.value
        });
    default:
        return state;
        }
}

//========= render =============
var store = redux.createStore(app);
class SetTeam extends Component {
    handleClick(){
        add(store.getState().setHero);
    };
    handle(e,attr){
        store.dispatch({type:attr, value: e.target.value});
    };
    setCookie(players){
        cookie.set('tst',players,{ expires: 365 });
    };
    render() {
        console.log(this.props.players);
        var setHero = this.props.setHero;
        return (
        <div>
            <div style={style.field}>
                <Plot act={""} team={this.props.players}/>
            </div>
            <br style={{clear:"both"}} />
            <div style={{float:"left",width:"auto"}}>
                <DataTable players={store.getState().players} />
                
            </div>
            <div style={{float:"left"}}>
                <table>
                   <tbody>
                   <tr><td>Name</td><td>
                         <input type="text" name="name" onChange={(e)=>{this.handle(e,"name")}}  value={setHero.name} />
                   </td></tr> 
                   <tr><td>Position</td><td>
                       <input type="radio" name="position" onChange={(e)=>{this.handle(e,"position")}}  value="FW" />FW
                       <input type="radio" name="position" onChange={(e)=>{this.handle(e,"position")}}  value="MF" />MF
                       <input type="radio" name="position" onChange={(e)=>{this.handle(e,"position")}}  value="DF" />DF
                       <input type="radio" name="position" onChange={(e)=>{this.handle(e,"position")}}  value="GK" />GK
                   </td></tr>
                   <tr><td>Alignment</td><td>
                       <input type="radio" name="alignment" onChange={(e)=>{this.handle(e,"alignment")}}  value="1" />L
                       <input type="radio" name="alignment" onChange={(e)=>{this.handle(e,"alignment")}}  value="2" />LC
                       <input type="radio" name="alignment" onChange={(e)=>{this.handle(e,"alignment")}}  value="3" />C
                       <input type="radio" name="alignment" onChange={(e)=>{this.handle(e,"alignment")}}  value="4" />R
                       <input type="radio" name="alignment" onChange={(e)=>{this.handle(e,"alignment")}}  value="5" />RC
                   </td></tr>
                   <tr><td>Shoot</td><td>
                        <input type="number" name="skillSH" onChange={(e)=>{this.handle(e,"skillSH")}}  value={setHero.skill.SH} />
                   </td></tr> 
                   <tr><td>Dribble</td><td>
                        <input type="number" name="skillDR" onChange={(e)=>{this.handle(e,"skillDR")}}  value={setHero.skill.DR} />
                   </td></tr> 
                   <tr><td>Pass</td><td>
                        <input type="number" name="skillPS" onChange={(e)=>{this.handle(e,"skillPS")}}  value={setHero.skill.PS} />
                   </td></tr> 
                   <tr><td>Defend</td><td>
                        <input type="number" name="skillDF" onChange={(e)=>{this.handle(e,"skillDF")}}  value={setHero.skill.DF} />
                   </td></tr> 
                   </tbody>
                </table> 
            </div>
            <button onClick={()=>{this.handleClick()}}> Add </button>
            <div style={{width:400}}>
                <button onClick={()=>{this.setCookie(this.props.players)}}>set Cookie</button>
            </div>
        </div>
        );
    }
}



class DataTable extends Component {
  render() {
    var players = this.props.players;
    return (
      <div>
        <table style={style.table} >
          <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Po</th>
                <th>SH</th>
                <th>DR</th>
                <th>PS</th>
                <th>DF</th>
                <th></th>
            </tr>
          </thead>
          <tbody>
            { players.map(function(p,idx){
              return(          
                  <tr key={p.name+"_"+idx}>
                    <td>{idx}</td>
                    <td>{p.name}</td>
                    <td>{p.position}</td>
                    <td>{p.skill.SH}</td>
                    <td>{p.skill.DR}</td>
                    <td>{p.skill.PS}</td>
                    <td>{p.skill.DF}</td>
                    <td>
                         <button onClick={()=>{remove(idx)}}> - </button>
                    </td>
                  </tr>);
              })
            }
            </tbody>
         </table>
       </div>
   );
  }
};

const add = (input)=>{
    store.dispatch({
        type:"addHero",
        hero:input
    });
}
const remove = (id)=>{
    store.dispatch({
        type:"removeHero",
        idx:id
    });
}

const render = () => {
    var myState = store.getState();
    ReactDOM.render( <SetTeam players={myState.players} setHero={myState.setHero}/> ,
        document.getElementById('setTeam')
    );
};

store.subscribe(render);
render();
