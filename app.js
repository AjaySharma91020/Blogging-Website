const express = require("express")
const cors = require("cors")
const connect = require("./db")
const app = express()
const {signUp} = require("./controller/auth")
app.use(express.json())

connect()


let PORT = 4500
var corsOptions = {
    origin : "*"
}
app.use(cors(corsOptions))

app.post("/SignUp",signUp)

app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`)
})