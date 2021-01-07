const { User } = require("../models/User");
exports.signUp = (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  const user = new User({ name, email, password });
  user.save((error, user) => {
    if (error || !user) {
      return res.status(400).send({
        error: "Unable to Register",
      });
    }
    return res.json(user);
  });
};
