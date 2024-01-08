const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: {
    en: String,
    ar: String,
  },
  brand: String,
  part_number: String,
  order_quantity: Number,
  usd: Number,
  LE: Number,
  unit_price_usd_cost: Number,
  store_code: String,
  unit_price_egp_cost: Number,
  notes: String,
  price_end_user: Number,
  price_commercial: Number,
  price_workshop: Number,
  total_sell_quantity: Number,
  stock_quantity: Number,
});

// Virtual property to calculate the total price in USD
storeSchema.virtual('total_price_usd').get(function () {
  if (this.unit_price_usd_cost !== undefined && this.usd !== undefined) {
    return this.unit_price_usd_cost * this.usd * this.order_quantity;
  }
  return null;
});

// Virtual property to calculate the total price in LE
storeSchema.virtual('total_price_LE').get(function () {
  if (this.unit_price_egp_cost !== undefined && this.LE !== undefined) {
    return this.unit_price_egp_cost * this.LE * this.order_quantity;
  }
  return null;
});

// Virtual property to calculate the stock quantity
storeSchema.virtual('calculated_stock_quantity').get(function () {
  if (this.total_sell_quantity !== undefined && this.order_quantity !== undefined) {
    return this.total_sell_quantity - this.order_quantity;
  }
  return null;
});

// Apply the virtual toJSON transformation to include virtuals when converting to JSON
storeSchema.set('toJSON', { virtuals: true });

// Apply the virtual toObject transformation to include virtuals when converting to an object
storeSchema.set('toObject', { virtuals: true });

const Store = mongoose.model('Store', storeSchema);

module.exports = Store