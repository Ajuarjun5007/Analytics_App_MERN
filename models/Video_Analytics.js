const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PadelDataSchema = new Schema({
  deadzone: {
    type: Map,
    of: String,
  },
  distance: {
    type: Map,
    of: String,
  },
  heatmap: {
    type: Map,
    of: String,
  },
  shots: [
    {
      id: { type: String, required: true },
      shoot_count: { type: Number, required: true },
    },
  ],
  zonemap_values: [
    {
      yellow_zone: { type: Number, required: true },
      red_zone: { type: Number, required: true },
      green_zone: { type: Number, required: true },
      id: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('PadelData', PadelDataSchema);
