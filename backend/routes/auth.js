const express = require("express");
const { registerUser,loginUser } = require("../handlers/auth-handler"); // Corrected the path



const router = express.Router();

router.post("/register", async (req, res) => {
  let model = req.body;

  if (model.name && model.email && model.password) {
    
      await registerUser(model);
      res.send({
        message: "User registered",
      });
    
  } else {
    // Send an error response if required fields are missing
    res.status(400).json({
      error: "Please provide name, email, and password",
    });
  }
});


router.post("/login", async (req, res) => {
    let model = req.body;
  
    if (model.email && model.password) {
      const result = await loginUser(model);
      
      if (result) {
        res.send(result);
      } else {
        res.status(400).json({
          error: "Invalid email or password",
        });
      }
    } else {
      res.status(400).json({
        error: "Please provide email and password",
      });
    }
  });

module.exports = router;
