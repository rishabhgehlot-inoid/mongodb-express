const { Schema, model } = require("mongoose");

const DesktopSlider = new Schema(
  {
    image: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("DesktopSlider", DesktopSlider);
