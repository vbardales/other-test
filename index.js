'use strict';

const test = require('./test');
const express = require('express');
const fs = require('fs');
const Promise = require('bluebird');
Promise.promisifyAll(fs);

console.log('helloworld');

const SEUIL1 = 0.20;
const SEUIL2 = 0.90;
const value = 23;

function result(value) {
  if (value < SEUIL1) {
    console.log('Conflit + réussite');
    return;
  }

  if (value >= SEUIL1 && value < SEUIL2) {
    console.log('Rien');
    return;
  }

  console.log('Réussite critique');
}

for (let i = 0; i < 5; ++i) {
  result(Math.random());
  test.toto();
}

const app = express();

app.get('/', (req, res, next) => {
  // res.json({text:'helloworld'})
  fs.writeFile('test.log', req.query.name, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    fs.writeFileAsync('test2.log', req.query.name)
      .then(() => {
        res.send('coucou' + req.query.name)
      })
      .catch((err) => {
        console.error(err);
      })
    ;
  })

});


app.get('/toto/:name', (req, res, next) => {
  // res.json({text:'helloworld'})
  fs.writeFile('test.log', req.params.name, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    fs.writeFileAsync('test2.log', req.params.name)
      .then(() => {
        res.send('coucou' + req.params.name)
      })
      .catch((err) => {
        console.error(err);
      })
    ;
  })

});

app.listen(5050, () => {
  console.log('Started');
});
