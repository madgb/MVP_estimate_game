import React from 'react';
import axios from 'axios';

import ListItem from './ListItem.jsx';
import Result from './Result.jsx';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      counter: -1,
      done: false,
      start: false,
      price: null,
      score: 0
    }
    this.countUp = this.countUp.bind(this);
    this.sendAnswer = this.sendAnswer.bind(this);
    this.start = this.start.bind(this);
    this.priceCheck = this.priceCheck.bind(this);
  }

  priceCheck(e){
    e.preventDefault();
    let price = e.target.value;
    this.setState({price: price});
  }

  countUp(){
    let item = this.props.items;
    let idx = this.state.counter;
    if(this.state.counter < 8){
      this.setState({
        counter: this.state.counter + 1
      })
      if( -1 < this.state.counter){
        this.setState({
          score: this.state.score + (Math.abs(this.state.price - item[idx].price) / item[idx].price) * 100
        })
      }
    }else if (this.state.counter === 8){
      this.setState({
        counter: this.state.counter + 1,
        done: true
      })
    }
  }

  sendAnswer(e){
    e.preventDefault();
    let item = this.props.items;
    let idx = this.state.counter;
    axios.post('/checkAnswer' , 
      {
        submitPrice: this.state.price,
        itemIdx: item[idx].id,
        realPrice: item[idx].price,
        dashed: 1,
        errorPercent: (Math.abs(this.state.price - item[idx].price) / item[idx].price) * 100
      }
    )
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  start(){
    this.setState({start: true});
    this.countUp();
  }

  render(){
  let item = this.props.items;
  let x = this.state.counter;
  return(<Router>
      <div className="card" >
        {
          !this.state.start ? 
            <div className="start">
              <Link to={`/${item[0].id}`} onClick={() => this.start()}>START</Link> 
            </div>
            : ''
        }
        {
          this.state.start ?
          <Route 
            path   ={`/${item[x].id}`} 
            render ={() => (
              <ListItem 
                key={item[x].id} 
                item={item[x]} 
                answer={e => this.sendAnswer(e)}
                priceCheck={e => this.priceCheck(e)}/>
            )} 
          /> 
          : ''
        }
        {
          this.state.start && !this.state.done ?
          <div className="next">
            <Link to={`/${item[x+1].id}`} onClick={() => this.countUp()}>NEXT</Link> 
          </div>: ''
        }
        {
          this.state.done ?
          <div className="result">
            <Link to="/result">Result</Link>
          </div> : ''

        }
        <Route 
              path   ="/result"
              render = {() => (
                <Result 
                  score={this.state.score}/>
              )} 
            /> 
      </div>
      </Router>
    )
  }
}

export default List;