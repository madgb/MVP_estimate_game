// for i in {1..343}; do
//     curl -o 'itemdata'$i'.json' 'https://www.thisiswhyimbroke.com/api/lists/clicks_score_amazon_available/'$i'/'
// done
const db = require('./index.js');
const Item = require('./Item.js');
const Score = require('./Score.js');

let firstdata = [{
    idx: 100,
    price: 100,
    errorAverage: 1000000000000000,
    dashed: 5,
    image: 'https://cdn.thisiswhyimbroke.com/images/jewelry-and-eyeglass-cleaner-magnasonic-generic-300x250.jpg',
    link: 'http://www.amazon.com/dp/B001DKDAVW/?tag=097-20&ascsubtag=default',
    name: "Jewelry & Eyeglass Cleaner"
  },
  {
    idx: 100,
    price: 100,
    errorAverage: 1000000000000,
    dashed: 5,
    image: "https://cdn.thisiswhyimbroke.com/images/marvel-infinity-gauntlet-articulated-electronic-fist-avengers-300x250.jpg",
    link: "http://www.amazon.com/dp/B071WT4KLM/?tag=097-20&ascsubtag=default",
    name: "Articulated Infinity Gauntlet Electronic Fist"
  },
  {
    idx: 100,
    price: 100,
    errorAverage: 100000000,
    dashed: 5,
    image: 'someurl',
    link: 'urlimg',
    name: 'omehgn'
  },
  {
    idx: 100,
    price: 100,
    errorAverage: 100000000,
    dashed: 5,
    image: 'someurl',
    link: 'urlimg',
    name: 'omehgn'
  },
  {
    idx: 100,
    price: 100,
    errorAverage: 100000000,
    dashed: 5,
    image: 'someurl',
    link: 'urlimg',
    name: 'omehgn'
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