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
      </div>
    )

export default ListItem;