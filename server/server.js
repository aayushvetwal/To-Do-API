require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
//const port = process.env.PORT || 3000;
const port = process.env.PORT

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  //res.send(req.params);
  var id = req.params.id;

  if(!ObjectID.isValid(id)) return res.status(404).send();

  Todo.findById(id).then((todo) => {
    if(!todo) return res.status(404).send();
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  //get the id
  //validate the id -> not valid? return a 404
  //remove todo by id
      //success -> if no doc send 404; if doc, send back doc with 200
      //error -> send 400 with empty body

  var id = req.params.id;

  if(!ObjectID.isValid(id)) res.status(404).send();

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) return res.status(404).send();
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) res.staus(404).send();

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) return res.status(404).send();
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});


app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login, {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
})


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};

// var newTodo = new Todo({
//   text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//   console.log('Saved Todo', doc);
// }, (e) => {
//   console.log('Unable to save todo');
// });

// var otherTodo = new Todo({
//   text: 'Feed the cat',
//   completed: true,
//   completedAt: 123
// });

// var otherTodo = new Todo({
//   text: 'Edit this video'
// });

// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save', e);
// });

// var user = new User({
//   email: ' av@gmail.com '
// });

// user.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save', e);
// });
