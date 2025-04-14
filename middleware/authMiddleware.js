const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://<TU_DOMINIO_AUTH0>/.well-known/jwks.json`,
  }),
  audience: "<TU_API_IDENTIFIER_EN_AUTH0>",
  issuer: `https://<TU_DOMINIO_AUTH0>/`,
  algorithms: ["RS256"],
});

module.exports = checkJwt;
