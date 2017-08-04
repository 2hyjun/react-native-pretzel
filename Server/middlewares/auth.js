const jwt = require('jsonwebtoken');

const config = require('../config');
const authMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'];
    const secret = config.secret;
    
    const verify = (token) => {
        return new Promise((resolve, reject) => {
            if (!token)
                reject({
                    err: 'No auth token in "x-access-token" headers'
                })
            else {
                jwt.verify(token, secret, (err, decoded) => {
                    if (err)
                        reject({
                            err: err.message
                        })
                    else {
                        resolve(decoded);
                    }
                })
            }
        })
    }

    const onVerified = (decoded) => {
        req.decoded = decoded
        next();
    }

    const onError = (err) => {
        console.log(err)
        if (err.err === 'No auth token in "x-access-token" headers ')
            resultCode = 1
        else {
            resultCode = 2
            console.log("err: ", err);
            console.log("token: ", token);
        }
            

        res.send({
            resultCode: resultCode,
            result: err.err
        })
    }

    verify(token)
        .then(onVerified)
        .catch(onError)
}

module.exports = authMiddleware;