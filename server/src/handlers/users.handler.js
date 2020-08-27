const {db} = require("../utils/firebase")
const USER_REF = db.collection("users")
const {UserMethods} = require("../utils/methods")

exports.createUser = async(req, res) =>{
    const user = await UserMethods.createUser(req.body)
    try {
        await UserMethods.checkIfUserIsInDB(user.email)
        await USER_REF.add(user)
        res.status(201).json({result: "User is created"})
    } catch (e) {
        res.status(400).json({error: e.message, result: "User wasnt created"})
    }
}

exports.loginUser = async(req, res) =>{
    if(!req.body.email || !req.body.password)
        res.status(400).json({error: "No password or email are provided", result:"Cant login"})
    try {
        const user = await UserMethods.findUserByEmailAndPassword(req.body.email, req.body.password)
        const token = UserMethods.generateAuthToken({email: user.email, id: user.id})
        //Dont forget to set httpOnly back
        res.cookie('token', token, {maxAge: 60*60*1000})
        res.status(201).json({token, result: "logged in"})  
    } catch (e) {
        res.status(400).json({error: e.message, result: "Cant login"})
    }
}

exports.logoutUser = async(req, res) => {
    try {
        await USER_REF.doc(req.userSnapshot.id).update({
            tokens: []
        })
        res.status(200).json({result: "Logged out"})
    } catch (e) {
        res.status(500).json({error: e.message, result: "Cant loggout"})
    }
}

exports.getLogginStatus = async(req, res) => {
    /* const token = UserMethods.generateAuthToken({data: req.user.email, id: req.user.id})
    res.cookie("token", token, {maxAge: 60*60*24}) */
    res.status(200).json({result: "User is logged"})
}

