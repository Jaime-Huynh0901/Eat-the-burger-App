const express = require("express");
const router = express.Router();
const burger = require("../models/burger");

//home route
router.get("/", (req, res) => {
    burger.selectAll(data => {
        const allBurger = {
            burgers: data
        };
        res.render("index", allBurger);
    });
});

// Add new burger
router.post("/api/burgers", (req, res) => {
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], result => {
        res.json({ id: result.insertId });
    });
});

// update burger devoured status to true.
router.put("/api/burgers/:id", (req, res) => {
    let condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.updateOne({
      devoured: req.body.devoured
    }, condition, result => {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

module.exports = router;