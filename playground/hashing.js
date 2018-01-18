const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

/*
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});
*/

var hashedPassword = '$2a$10$drXsU5RU5I22.UAZp0katO.rnp8P40Wfw6tx/aZMy32uqRZuR5zyu';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

/*

var data = {
  id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);

*/

/*
var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`message: ${message}`);
console.log(`hash: ${hash}`);

//JSON Web Support(JWT) or Token based authentication Prototype/sample

var data = {
  id: 4
};
var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecretsalt').toString()
};

//MAN IN THE MIDDLE
// man in the middle doesn't have access to the salt
token.data.id = 5;
token.hash = SHA256(JSON.stringify((token.data))).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecretsalt').toString();

if(resultHash === token.hash){
  console.log('data was not manipulated');
} else{
  console.log('data was manipulated. don\'t trust.');
}
*/
