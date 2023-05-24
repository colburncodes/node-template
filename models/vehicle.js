const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
  },
  activated: {
    type: Boolean,
    required: false,
  },
  plate: {
    type: String,
    required: true,
    minlength: 6,
  },
  type: {
    type: String,
    required: true,
    enum: ["sm", "md", "lg"],
  },
  capacity: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("vehicle", vehicleSchema);
