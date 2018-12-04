const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Items = require('../database-mongo/Item.js');
const Score = require('../database-mongo/Score.js');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../react-client/dist'));


app.post('/checkAnswer', (req, res) => {
  let data = req.body;
  Items.find({idx: data.itemIdx})
    .then(res => {
      if(res.length){
        console.log('already there! updating...')
        let currAvg = res[0].errorAverage;
        let currDsd = res[0].dashed;
        let nextErrAvg = (currAvg * currDsd  + data.errorPercent)/(currDsd + 1);
        let nextDsd = currDsd + 1;

        let query = { $set: { 
            dashed: nextDsd,
            errorAverage: nextErrAvg
          }
        };

        Items.findOneAndUpdate(
          { idx : data.itemIdx }, 
          query
        )
        .then(updateRes => {
          console.log('UPDATED: ', updateRes);
        })
        .catch(err => {(console.log(err))});
        ;
      } else {
        console.log('nope! creating..');
        Items.create(
          {
            idx : data.itemIdx, 
            price: data.realPrice,
            errorAverage: data.errorPercent,
            dashed: 1
          }
        )
        .then(createdRes => {
          console.log('created: ', createdRes);
        })
        .catch(err => {(console.log(err))});
        ;
      }
    })
});

app.post('/score', (req, res) => {
  Score.create({
    name: req.body.name,
    score: req.body.score
  })
  // .then(createdRes => {
  //   myId = createdRes._id;
  //   Score.find({"_id": myId},  { score : 1 })
  //   .then((allScore)=>{
  //     myScore = allScore[0].score;
  //     console.log(myScore);
  //     // .throw(new error);
  //     Score.find({ score : { $lt : myScore }}).count()
  //     .then(rank => {
  //       res.send(rank.toString());
  //     })
  //     .catch(err =>{
  //       console.log(err);
  //     });
  //   })
  //   .catch(err =>{
  //     console.log(err);
  //   });
  // })
  .then((res)=>{
    console.log(res);
  })
  .catch(err =>{
    console.log(err);
  });
})

app.get('/topten', (req, res) => {
  console.log('getting..')
  Score.find({},  { "name": "name", "score": "score" }).sort({score: 1}).limit(10)
    .then(rank => {
      console.log(rank);
      res.send(rank);
    })
    .catch(err =>{
      console.log(err);
    });
})

app.get('/fwa', (req, res) => {
  console.log('getting..')
  Items.find({},  { "name": "name", "errorAverage": "errorAverage", "link": "link", "image": "image" }).sort({"errorAverage": -1}).limit(5)
    .then(rank => {
      console.log(rank);
      res.send(rank);
    })
    .catch(err =>{
      console.log(err);
    });
})


app.listen(process.env.PORT || 3000, () => {
  console.log('listening on port 3000');
});

//https://www.thisiswhyimbroke.com/api/lists/clicks_score_amazon_available/342/