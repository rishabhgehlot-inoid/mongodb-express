const { Schema, model } = require("mongoose");

const MobileSliderSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("MobileSlider", MobileSliderSchema);
