const express = require('express')
const router = new express.Router
const auth = require('../utils/auth')

const { getAllAccounts, 
        uploadFile, 
        findAccount, 
        deleteAccount, 
        postAccount } = require("../handlers/accounts.handler")

/* TODO: MAKE API PREFIX, RESTRUCTURE DIRS, check for spelling emails etc */

router.get('/accounts', getAllAccounts)
router.get('/account', findAccount)
router.post('/account', auth, postAccount)
router.delete('/account', auth, deleteAccount)

//TODO: add auth as middleware
router.post("/upload", uploadFile)

module.exports = router 