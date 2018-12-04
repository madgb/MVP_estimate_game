// for i in {1..343}; do
//     curl -o 'itemdata'$i'.json' 'https://www.thisiswhyimbroke.com/api/lists/clicks_score_amazon_available/'$i'/'
// done
const db = require('./index.js');
const Item = require('./Item.js');
const Score = require('./Score.js');

let firstdata = [{
    idx: 000,
    price: 100,
    errorAverage: 100,
    dashed: 100
  }]

let scoredata = [
    {
        name: 'John',
        score: 0.3
    },
    {
        name: 'Javier',
        score: 2
    },
    {
        name: 'Rxbar',
        score: 15
    },
    {
        name: 'ViewSonic',
        score: 17
    },
    {
        name: 'TMI',
        score: 21
    }
]

const seed = () => {
    Item.create(firstdata)
        .then(() => db.disconnect());
}

const seed2 = () => {
    Score.insertMany(scoredata)
        .then(() => db.disconnect());
}

seed();
seed2();