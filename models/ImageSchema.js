const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String },
  desc: { type: String, required: true },
  cover: { type: String, required: true },
});

// Avoid model overwrite error
module.exports = mongoose.models.Image || mongoose.model('Image', ImageSchema);
