const JWT = require("jsonwebtoken");
const userModel = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Please provide Auth Token",
      });
    }
    
    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized User",
      });
    }

    JWT.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized User",
        });
      } else {
        const user = await userModel.findById(decode.id);
        if (!user) {
          return res.status(401).send({
            success: false,
            message: "Unauthorized User",
          });
        }
        req.user = user; // Set the user to req.user
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Please provide Auth Token",
      error,
    });
  }
};
