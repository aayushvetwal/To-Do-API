const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5a3bb4f0e4de322ce4f98d712 ';
//
// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo) return console.log('Id not found');
//   console.log('Todo by Id', todo);
// }).catch((e) => {
//   console.log(e);
// });


var id = '5a2e00e4e0b6ab4704e4c6532';

if(!ObjectID.isValid(id)) return console.log('Invalid User ID');

User.findById(id).then((user) => {
  if(!user) console.log('User not found');
  console.log('User by ID',user);
}).catch((e) => {
  console.log(e);
});
