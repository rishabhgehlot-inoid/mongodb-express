const { Schema, model } = require("mongoose");

const GallerySchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Gallery", GallerySchema);
