const express = require("express")
const userRouter = require("./router/users.router")
const accountRouter = require("./router/accounts.router")
const path = require("path")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const app = express()

app.use(cookieParser())
app.use(fileUpload({
    limits: {fileSize: 1024*1024*40},
    useTempFiles: true,
    tempFileDir: (path.join(__dirname, "../tmp"))
}))
app.use(express.static(path.join(__dirname, "../build")))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.use("/user",userRouter)
app.use("/api", accountRouter)

module.exports = app