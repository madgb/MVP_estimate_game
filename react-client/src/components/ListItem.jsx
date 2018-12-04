import React from 'react';

const ListItem = (props) => (
      <div className = "question">
        <div className = "title">
          { props.item.title }
        </div>
        <div className = "image">
          <img src={props.item.image} />
        </div>
        <div className = "detail">{props.item.content}</div>
        <form onSubmit={props.answer}>
          <div>Price?</div>
          <input type="number" onChange={props.priceCheck}/>
          <button type="Submit">Submit</button>
        </form>
        {
          !props.reveal ?
          <div className="reveal">
            <div className="youdid">You Answered {props.priceO}</div>
            <div className="itwas">Actually it is {props.priceC}</div>
            <div className="scoreIs">You lost {Math.abs(props.priceO - props.priceC).toFixed(2)} points</div>
          </div> : null
        }
      </div>
    )

export default ListItem;