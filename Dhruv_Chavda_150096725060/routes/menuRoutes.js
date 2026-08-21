const express = require("express");
const MenuItem = require("../models/MenuItem");
const Restaurant = require("../models/Restaurant");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/restaurants/:id/menu", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found"
      });
    }

    const menuItems = await MenuItem.find({
      restaurantId: req.params.id
    });

    res.status(200).json(menuItems);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch menu",
      error: error.message
    });
  }
});


router.post(
  "/restaurants/:id/menu",
  authMiddleware,
  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.id);

      if (!restaurant) {
        return res.status(404).json({
          message: "Restaurant not found"
        });
      }

      const { name, price, isAvailable } = req.body;

      if (!name || price === undefined) {
        return res.status(400).json({
          message: "Name and price are required"
        });
      }

      const menuItem = new MenuItem({
        restaurantId: req.params.id,
        name,
        price,
        isAvailable
      });

      await menuItem.save();

      res.status(201).json({
        message: "Menu item created successfully",
        menuItem
      });

    } catch (error) {
      res.status(500).json({
        message: "Failed to create menu item",
        error: error.message
      });
    }
  }
);


router.put("/menu/:id", authMiddleware, async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found"
      });
    }

    res.status(200).json({
      message: "Menu item updated successfully",
      menuItem
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update menu item",
      error: error.message
    });
  }
});


router.delete("/menu/:id", authMiddleware, async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(
      req.params.id
    );

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found"
      });
    }

    res.status(200).json({
      message: "Menu item deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete menu item",
      error: error.message
    });
  }
});


module.exports = router;