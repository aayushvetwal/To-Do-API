const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });
  //db.close();

  //deleteMany
  // db.collection('Users').deleteMany({name: 'Kai'}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete
  // db.collection('Users').deleteOne({_id: new ObjectID("5a231b7e46ecf91e5c3e38ab")}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete
  db.collection('Users').findOneAndDelete({location: 'Utica'}).then((result) => {
    console.log(result);
  });
});
