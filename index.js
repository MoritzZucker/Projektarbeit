const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser')
const db = new sqlite3.Database('./db/comment.db');

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));
app.use( express.static( "public" ) );

app.get('/', async (req, res) => {
  db.all('SELECT * FROM comments', (err, comments) => {
    res.render('pages/index', { comments })
  });
});

app.get('/comment', async (req, res) => {
  db.all('SELECT * FROM comments', (err, comments) => {
    res.render('pages/comment', { comments })
  });
});

app.get('/', (req, res) => {
  res.render('pages/', { success: true });
});

app.get('/gallery', (req, res) => {
  res.render('pages/gallery', { success: true });
});

app.get('/anmelden', (req, res) => {
  res.render('pages/anmelden', { success: true });
});

app.get('/partner', (req, res) => {
  res.render('pages/partner', { success: true });
});

app.get('/spenden', (req, res) => {
  res.render('pages/spenden', { success: true });
});

app.get('/unternehmen', (req, res) => {
  res.render('pages/unternehmen', { success: true });
});

app.get('/zieleunderfolge', (req, res) => {
  res.render('pages/zieleunderfolge', { success: true });
});

app.post('/comment', (req, res) => {
  if (req.body.Vorname && req.body.Nachname && req.body.Kommentar) {
    db.run('INSERT INTO comments(Vorname, Nachname, Kommentar) VALUES (?, ?, ?);', [req.body.Vorname, req.body.Nachname, req.body.Kommentar], function (err) {
      if(err) {
        res.json({error: err});
      } else {
        res.json({
         ...req.body, 
         id: this.lastID,
      });
      }
    });
  } else {
    res.json({error: "Request body is not correct"});
    }
});

const server = app.listen(port, () => {
 console.log(`Server listening on port ${port}…`)
});

module.exports = server
