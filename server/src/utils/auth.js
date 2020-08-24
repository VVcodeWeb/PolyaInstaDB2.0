const jwt = require('jsonwebtoken')
const {db} = require("./firebase")
const USER_REF = db.collection("users")

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userSnapshot = await USER_REF.doc(decoded.id).get(); 
        if (!userSnapshot.exists){
            throw new Error()
        }
        req.token = token
        req.userSnapshot = userSnapshot
        next()
    } catch (e) {
        res.status(401).json({e:e,  result: 'Please authenticate.'})
    }
}

module.exports = auth



