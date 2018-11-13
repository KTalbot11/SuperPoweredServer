const jwt = require('jsonwebtoken')
const User = require('../db').import('../models/user')

const validateSession = (req, res, next) => {
   if (req.method == 'OPTIONS') {
         next()
     }else{
  const token = req.headers.authorization
  console.log("token:", token)
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (!err && decodedToken) {
      User.findOne({ where: { id: decodedToken.id }})
      
        .then(user => { 
          if (!user) throw 'err'
          req.user = user
          return next()
        })
        .catch(err => next(err))
    } else {
      console.log("unauthorized")
      res.status(403).send({ error: "not authorized" })
    }
  })
}
}

module.exports = validateSession