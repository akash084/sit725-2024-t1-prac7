const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

//POST
router.post("/postCard", controller.createCard);

//GET
router.get("/Cards", controller.getCards);

module.exports = router;
