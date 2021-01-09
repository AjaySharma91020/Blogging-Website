const mongoose = require("mongoose")
const Blog = require("../models/Blog")
exports.saveBlog = (req,res)=>{
    let title = req.body.title
    let body = req.body.body
    let authorId = req.body.author
    let author = mongoose.Types.ObjectId(authorId)
    const blog = new Blog({title,body,author})
   
    blog.save((error,blog)=>{
          if(error || !blog){
              return res.status(400).send({
                  error: "Bad Request"
              })
          }
          return res.json(blog)
    })
}

exports.getAllBlogs = (req,res)=>{
     Blog.find((error,blogs)=>{
         if(error || !blogs){
             return res.status(404).send({
                 error : "No blogs found"
             })
         }
         return res.json(blogs)
     })
}

exports.getBlogsByAuthorId = (req,res)=>{
     const {AuthorId} = req.params
     Blog.find({author : AuthorId },(error,blogs)=>{
         if(error || !blogs){
             return res.staus(404).send({
                 error : "No blogs found under you."
             })
         }
         return res.json(blogs)
     })
}

exports.getBlogById = (req,res)=>{
    const {blogId} = req.params
    Blog.findOne({_id : blogId},(error,blog)=>{
        if(error || !blog){
            return res.status(400).send({
                error : "Blog not found"
            })
        }
        return res.json(blog)
    })
}