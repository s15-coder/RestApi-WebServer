const jwt = require("jsonwebtoken");

const generateJwt = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SEED,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.log(err);
           reject("Error generando JWT");
        }
         resolve(token);
      }
    );
  });
};

module.exports = { generateJwt };
