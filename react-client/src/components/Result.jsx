import React from 'react';
import axios from 'axios';

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            rank: false,
            topten: null,
            final: false,
            fwa: null
        }
        this.getName = this.getName.bind(this);
        this.sendScore = this.sendScore.bind(this);
        this.getTen = this.getTen.bind(this);
        this.getFwa = this.getFwa.bind(this);
    }
    getName(e){
        this.setState({
            name: e.target.value
        })
    }
    getTen(e){
        e.preventDefault();
        axios.get('/topten')
        .then(res => {
            console.log(res.data);
            this.setState({
                topten: res.data
            })
        })
        .catch(err => {
            console.log(err.data);
        })
    }
    getFwa(e){
        e.preventDefault();
        axios.get('/fwa')
        .then(res => {
            console.log(res.data);
            this.setState({
                fwa: res.data
            })
        })
        .catch(err => {
            console.log(err.data);
        })
    }
    final(){
        this.setState({
            final: true
        })
    }
    sendScore(e){
        e.preventDefault();
        this.setState({
            rank: !this.state.rank
        })
        axios.post('/score', 
            {
                name: this.state.name,
                score: this.props.score
            }
        )
        .then(res => {
            if(res.status === 400){
                window.alert(res.data);
            }
          console.log(res.data);
        })
        .catch(err => {
          console.log(err.data);
        })
      }
    render(){
        return(
        <div className="resultCard">
            <form onSubmit={(e) => this.sendScore(e)}>
                <input type="text" placeholder="put your name" onChange={(e) => this.getName(e)}/>
                <button type="Submit">Check My Score</button>
            </form>
        {
            this.state.rank ?
            <div className="myScore">
                <div>My Score: -{this.props.score.toFixed(2)}</div>
                <form onSubmit={(e) => this.getTen(e)}>
                    <button type="Submit">See Top Scores</button>
                </form>
            </div> : ''
        }
        {
            this.state.rank ?
            <div className="getFwa">
                <form onSubmit={(e) => this.getFwa(e)}>
                    <button type="Submit">See FWAs</button>
                </form>
            </div> : ''
        }
        {
            this.state.fwa ?
            <div className="fwa-result">
                {
                    this.state.fwa.map(i => (
                        <div>
                            <div>{i.name}</div>
                            <div>
                                <div>error range</div>
                                <div>${i.errorAverage.toFixed(2)}</div>                                
                            </div>
                            <div>
                                <a href={i.link}>
                                    <img src={i.image} alt=""/>
                                </a>
                            </div>
                        </div>
                    ))
                } 
            </div>: ''
        }
        {
            this.state.topten ?
            <div className="topten">
                <div>TopTen: </div>
                {
                    this.state.topten.map(i => (
                        <div>
                            <div>{i.name}</div>
                            <div>-{i.score.toFixed(2)}</div>
                        </div>
                    ))
                } 
            </div>: ''
        }
        </div>
        )
    }
}
      


export default Result;