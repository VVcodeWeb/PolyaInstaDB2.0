const express = require('express')
const router = new express.Router
const auth = require('../utils/auth')

const { getAllAccounts, 
        uploadFile, 
        findAccount, 
        deleteAccounts, 
        postAccount } = require("../handlers/accounts.handler")

/* TODO: MAKE API PREFIX, RESTRUCTURE DIRS, check for spelling emails etc */

router.get('/accounts', getAllAccounts)
router.get('/account', findAccount)
router.post('/account', auth, postAccount)
router.delete('/account', auth, deleteAccounts)

//TODO: add auth as middleware
router.post("/upload", auth, uploadFile)

module.exports = router 