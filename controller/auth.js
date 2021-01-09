const { User } = require("../models/User");
const jwt = require("jsonwebtoken")
exports.signUp = (req, res) => {
  let {name,email,password} = req.body
  const user = new User({ name, email, password });
  user.save((error, user) => {
    if (!user || error) {
      return res.status(400).send({
        error: "Unable to Register",
      });
    }
    return res.json(user);
  });
};
exports.signin = (req,res)=>{
    let email = req.body.email
    let password = req.body.password
    
    User.findOne({email},(error,user)=>{
         if(!user || error){
             res.status(401).send({
                error : "User doesn't exist"
             })
         }
         if(password !== user.password){
            res.status(403).send({
               error : "email and password didn't match"
            })
         }

         jwt.sign({id:user._id},process.env.SECRET_KEY,(error,token)=>{
               if(error || !token){
                  return res.status(401).send({
                      error : "Signin failed"
                  })
               }

               return res.json({
                    user_id : user._id,
                    token
               })
         })
    })
}

exports.isSignedIn = (req,res,next)=>{
      if(!req.headers.authorization){
          return res.status(401).send({
              error : "User not Authorised.The token not found."
          })
      }
      const token = req.headers.authorization.split(" ")[1]
      jwt.verify(token,process.env.SECRET_KEY,(error,user)=>{
                if(error || !user){
                   return res.status(401).send({
                       error:"User not Authorised.Please Signin"
                   })
                }
                req.userIdFromToken = user.id
                next()
      })
}

exports.isAuthorized = (req, res, next) => {
  let userIdOfAuthor = req.body.author;
  if (req.userIdFromToken !== userIdOfAuthor) {
    return res.status(403).send({
      error: "User not Authorised.",
    });
  }
  next();
};