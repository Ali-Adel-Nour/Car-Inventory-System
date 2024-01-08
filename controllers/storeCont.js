const Store = require('../models/storeModel');


const asyncHandler = require('express-async-handler');
const createAStore = asyncHandler(async (req, res) => {
  try {
    const storeData = req.body;

    // Assuming your model is named 'Store' and it has a 'create' method
    const createStore = await Store.create(storeData);

    res.status(200).json({
      status: true,
      message: "Store created successfully",
      createStore,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Failed to create store",
      error: error.message,
    });
  }
});

module.exports = {createAStore};