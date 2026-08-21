const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const authMiddleware = require('../middleware/authMiddleware');

router.get("/", async (req, res) => {
  try {
    const restuarant = await Restaurant.find();
    res.status(200).json(restuarant);
  }
  catch (error) {
    res.status(500).json({
      message: "Failed to fetch restaurants ",
      error: error.message
    })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found"
      });
    }

    res.status(200).json(restaurant);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch restaurant",
      error: error.message
    });
  }
});

router.post("/", authMiddleware, async (req, res) => {

  try {

    const { name, city, address, cuisine, rating } = req.body;

    if (!name || !city || !address || !cuisine || !rating) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const restaurant = new Restaurant({
      name,
      city,
      address,
      cuisine,
      rating,

    })
    await restaurant.save();
    res.status(201).json({
      message: "Restaurant created successfully",
      restaurant
    })

  }
  catch (error) {
    res.status(500).json({
      message: "Failed to create restaurant",
      error: error.message
    })
  }
})

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found"
      });
    }

    res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant
    });

  }
  catch (error) {
    res.status(500).json({
      message: "Failed to update restaurant",
      error: error.message

    })
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found"
      });
    }

    res.status(200).json({
      message: "Restaurant deleted successfully",
      restaurant
    });

  }
  catch (error) {
    res.status(500).json({
      message: "Failed to delete restaurant",
      error: error.message

    })
  }
});

module.exports = router;