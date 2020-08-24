const express = require('express')
const router = new express.Router
const auth = require('../utils/auth')

const {
        createUser,
        loginUser,
        logoutUser,
        getLogginStatus } = require("../handlers/users.handler")

router.post("/", createUser)
router.post("/login", loginUser)
router.delete("/logout", auth, logoutUser)

router.get("/status", auth, getLogginStatus)


module.exports = router