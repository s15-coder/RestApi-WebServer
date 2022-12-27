const generateJwt = require('./generate-jwt');
const password = require('./generate-jwt');
const validations = require('./generate-jwt');

module.exports = {
    ...generateJwt,
    ...password,
    ...validations,
}