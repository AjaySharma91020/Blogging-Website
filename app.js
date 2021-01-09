const express = require("express")
const cors = require("cors")
const connect = require("./db")
require("dotenv").config()
const app = express()
const {signUp, signin, isSignedIn, isAuthorized} = require("./controller/auth")
const { saveBlog, getAllBlogs, getBlogsByAuthorId, getBlogById } = require("./controller/Blog")
app.use(express.json())

connect()


let PORT = 4500
var corsOptions = {
    origin : "*"
}
app.use(cors(corsOptions))

app.post("/SignUp",signUp)

app.post("/Signin",signin)

app.post("/blog",isSignedIn,isAuthorized,saveBlog)

app.get("/blog",getAllBlogs)

app.get("/blog/:AuthorId",getBlogsByAuthorId)

app.get("/:blogId/blog",getBlogById)

app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`)
})