const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

var db;
MongoClient.connect('mongodb://localhost:27017/mateam', (err, client) => {
    if (err) return console.log(err);
    db = client.db('mateam');
    app.listen(3001, () => {
        console.log('listening on 3001')
    });
});

app.get('/', (req, res) => {
    // res.sendFile('/home/haxxy/workaza/nodera/mateam' + '/index.html');
    // res.send('hello there, we are working9')
    db.collection('teams').find().toArray((err, result) => {
        if (err) return console.log(err)

        res.render('index.ejs', {teams: result})
    })
});

app.post('/teams', (req, res) => {
    db.collection('teams').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
    // console.log(req.body);
});