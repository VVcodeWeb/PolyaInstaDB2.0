//libs
const validator = require("validator")
const fs = require("fs")
const csv = require("csv-parser")

//functions
const {db} = require("../utils/firebase")
const {AccountMethods} = require('../utils/methods')
const ACCOUNT_REF = db.collection("accounts")


exports.getAllAccounts = async (req, res) =>{
    try{
        const result = await AccountMethods.getAllAccounts()
        res.json({result})
    }catch(e){
        res.status(500).json({error: e.message, result: "Cant get accounts"})
    }
}
exports.findAccount = async(req, res) => {
    try {
        if(req.query.url){
            req.query.url = AccountMethods.clearGivenUrl(req.query.url)
            const accountRes = await ACCOUNT_REF.where("url", "==", req.query.url).get()
            if(!accountRes.empty){
                var accounts = []
                accountRes.forEach( doc => accounts.push(doc.data()))
                res.json({result: accounts})
            }
            else   
                res.status(404).json({e, result: "Can't find account by given credentials"})
        }
    } catch (e) {
        res.status(400).json({error: e.message, result: "Bad request, try again"})
    }
}

exports.postAccount = async(req, res) => {
    try {
        req.body.url = AccountMethods.clearGivenUrl(req.body.url)
        const nameOfNewDocument = AccountMethods.convertUrlToName(req.body.url)
        await AccountMethods.validateUrl(req.body.url)
        await AccountMethods.checkIfIdIsAlreadyInDB(nameOfNewDocument)
        const newAccount = AccountMethods.createAccount(req.body)
        await ACCOUNT_REF.doc(nameOfNewDocument).set(newAccount)
        res.status(201).json({result: "Account was added"})
    } catch (e) {
        res.status(400).json({error: e.message, result: "Cant add a new account"})
    }
} 

exports.deleteAccount = async(req, res) =>{
    try{
        if(req.query.url){
            await ACCOUNT_REF.doc(AccountMethods.convertUrlToName(req.query.url)).delete()
            res.json({result: "Deleted"})
        }
    }catch(e){
        res.status(400).json({error: e.message, result: "Can't delete document. Check url"})
    }
}


exports.uploadFile = async (req, res) => {
    try {
        var file = req.files.data
        const accounts = []
        /* if(file.mimetype !== "text/csv"){
            console.log("mimetype faiuled")
            throw new Error(`File should be in csv format. Got ${file.mimetype}`)     
        } */
        fs
        .createReadStream(file.tempFilePath)
        .pipe(csv())
        .on("data", (row) => accounts.push(row))
        .on("end", async() => { 
            const informatinoAboutExractedAccs = await AccountMethods.extractValidAccountsFromArray(accounts)
            const {uniqueValidAccounts, repeatedAccounts} = AccountMethods.removeUrlRepetitionsFromArray(informatinoAboutExractedAccs.validAccounts)
            informatinoAboutExractedAccs.numberOfAddedAccounts -= repeatedAccounts.length
            repeatedAccounts.forEach((acc) => informatinoAboutExractedAccs.defectedAccounts.push(acc))
            
            uniqueValidAccounts.forEach(async (account) => {
                if(account){
                    try {
                        const newAccountID = AccountMethods.convertUrlToName(account.url)
                        await ACCOUNT_REF.doc(newAccountID).set(account)
                    } catch (error) {
                        informatinoAboutExractedAccs.defectedAccounts.push({account, reason: "Same url occured earlier"})
                    }
                }
            })
            informatinoAboutExractedAccs.validAccounts = uniqueValidAccounts
            setTimeout(() => deleteFile(file.tempFilePath), time_remaining(Date.now() + 1000 * 30))
            res.json({result: informatinoAboutExractedAccs})
        })

    } catch(e){
        res.status(500).json({error: e.message, result: "File wasn't uploaded"})
    }
}

const time_remaining = date => new Date(date) - new Date();
const deleteFile = filePath => fs.unlink(filePath, (e) => console.log("File deleted " + e))





