import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import List from './components/List.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  checkup(arr, id){
      for(let i = 0, len = arr.length; i < len; i++) {
          arr[i].id === id ? true : false;
      }
  }

  componentDidMount() {
      this.getQuestion();
  }

  getQuestion(){
    // axios.get(`/items`,{ headers: { 'crossDomain': true, 'Content-Type': 'application/json'}})
    for(let i = 0; i < 10; i++){
      let x = Math.floor(Math.random() * (321)) + 1;
      axios
        .get(
          `https://s3.us-west-1.amazonaws.com/mvp-estimate/itemData/itemdata${x}.json`,
          { 
            headers: { 
            'crossDomain': true, 
            'Content-Type': 'application/json'
          }
        })
        .then(({ data }) => {
          let itemlists = data.posts;
          let randomIdx = Math.floor(Math.random() * (itemlists.length));
          console.log('id is:',itemlists[randomIdx].id, 'title is:',itemlists[randomIdx].title, 'pageNation is:',x);
          if(!this.checkup(this.state.items, itemlists[randomIdx].id)){
            this.setState({ items: this.state.items.concat(itemlists[randomIdx])});
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }



  render () {
    return (<div>
      {
        this.state.items.length === 10 ? <List items={this.state.items}/> : <div>unexpected error occured. please refresh.</div>
      }
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));