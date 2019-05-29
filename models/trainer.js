const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create trainer Schema & model

const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

const TrainerSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"]
  },
  skill: {
    type: String
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
});

const Trainer = mongoose.model("trainer", TrainerSchema);

module.exports = Trainer;
