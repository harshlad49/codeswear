const sdk = require('api')('@bank-open/v1#1mld74kq6w4cej');

sdk.auth('Bearer Jwt');
sdk.generateToken()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));